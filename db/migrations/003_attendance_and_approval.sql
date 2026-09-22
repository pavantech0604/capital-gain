-- Migration: 003_attendance_and_approval.sql
-- Description: Employee Onboarding Approval Flow, Role Assignment, User Presence & Attendance Logs Tracking

-- 1. Extend Profiles Table for Approval Workflow
ALTER TABLE IF EXISTS public.profiles
  ADD COLUMN IF NOT EXISTS approval_status TEXT NOT NULL DEFAULT 'pending_admin_review'
    CHECK (approval_status IN ('pending_admin_review', 'approved', 'rejected')),
  ADD COLUMN IF NOT EXISTS approved_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS approved_at TIMESTAMPTZ,
  ADD COLUMN IF NOT EXISTS rejection_reason TEXT;

-- Update role constraint to allow 'pending'
ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE public.profiles 
  ADD CONSTRAINT profiles_role_check 
  CHECK (role IN ('pending', 'admin', 'telecaller', 'relationship_manager'));

-- 2. Create Attendance Logs Table
CREATE TABLE IF NOT EXISTS public.attendance_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL CHECK (
    event_type IN (
      'login',
      'logout',
      'break_start',
      'break_end',
      'lunch_start',
      'lunch_end'
    )
  ),
  event_time TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  status_before TEXT, -- 'offline', 'online', 'on_break', 'on_lunch'
  status_after TEXT,  -- 'online', 'on_break', 'on_lunch', 'offline'
  metadata JSONB
);

CREATE INDEX IF NOT EXISTS idx_attendance_logs_user_time 
  ON public.attendance_logs(user_id, event_time DESC);

-- 3. Create User Presence Table for Live Status
CREATE TABLE IF NOT EXISTS public.user_presence (
  user_id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  current_status TEXT NOT NULL DEFAULT 'offline' CHECK (
    current_status IN ('offline', 'online', 'on_break', 'on_lunch')
  ),
  last_status_change TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  today_login_time TIMESTAMPTZ,
  today_logout_time TIMESTAMPTZ,
  total_break_minutes INT NOT NULL DEFAULT 0,
  total_lunch_minutes INT NOT NULL DEFAULT 0
);

-- 4. Automated User Signup Trigger (Sets role to 'pending' & is_active to false)
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    full_name,
    email,
    phone,
    role,
    is_active,
    approval_status
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NEW.email,
    NEW.raw_user_meta_data->>'phone',
    'pending',
    false,
    'pending_admin_review'
  )
  ON CONFLICT (id) DO UPDATE
  SET email = EXCLUDED.email;

  -- Create initial offline presence
  INSERT INTO public.user_presence (user_id, current_status, last_status_change)
  VALUES (NEW.id, 'offline', NOW())
  ON CONFLICT (user_id) DO NOTHING;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- 5. Row Level Security for Attendance & Presence
ALTER TABLE public.attendance_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_presence ENABLE ROW LEVEL SECURITY;

-- Attendance Logs Policies
DROP POLICY IF EXISTS "Users can insert own attendance logs" ON public.attendance_logs;
CREATE POLICY "Users can insert own attendance logs"
  ON public.attendance_logs
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can read own attendance logs" ON public.attendance_logs;
CREATE POLICY "Users can read own attendance logs"
  ON public.attendance_logs
  FOR SELECT
  USING (
    auth.uid() = user_id OR
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- User Presence Policies
DROP POLICY IF EXISTS "Users can upsert own presence" ON public.user_presence;
CREATE POLICY "Users can upsert own presence"
  ON public.user_presence
  FOR ALL
  USING (
    auth.uid() = user_id OR
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  )
  WITH CHECK (
    auth.uid() = user_id OR
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );
