-- 001_profiles_and_audit_system.sql
-- Capital Grow Enterprise Role-Based Architecture

-- 1. Create or ensure profiles table linked directly to auth.users
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  role TEXT NOT NULL CHECK (role IN ('admin', 'telecaller', 'relationship_manager')),
  is_active BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Backward compatibility alias view for 'users' if existing queries query public.users
CREATE OR REPLACE VIEW public.users AS
  SELECT 
    id,
    full_name AS name,
    email,
    phone,
    role,
    is_active,
    created_at,
    updated_at
  FROM public.profiles;

-- 2. Create audit_logs table
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  actor_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id UUID,
  old_data JSONB,
  new_data JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 3. Leads Table
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  source TEXT DEFAULT 'Website',
  assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  rm_assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (
    status IN (
      'new',
      'called',
      'not_interested',
      'follow_up_later',
      'interested_rm_required',
      'rm_contacted',
      'active_trader',
      'lost'
    )
  ),
  telecaller_notes TEXT,
  rm_notes TEXT,
  investment_capacity NUMERIC,
  trading_experience TEXT CHECK (trading_experience IN ('beginner', 'intermediate', 'advanced') OR trading_experience IS NULL),
  preferred_market TEXT,
  has_trading_account BOOLEAN DEFAULT false,
  ready_to_start_estimate TEXT,
  next_follow_up_at TIMESTAMPTZ,
  forwarded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 4. Active Traders Table
CREATE TABLE IF NOT EXISTS public.active_traders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID UNIQUE REFERENCES public.leads(id) ON DELETE SET NULL,
  rm_assigned_to UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  name TEXT NOT NULL,
  phone TEXT NOT NULL,
  joined_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  total_profit_gained NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  total_profit_shared NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  current_streak INTEGER NOT NULL DEFAULT 0,
  last_trade_date DATE,
  last_profit_share_date DATE,
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'paused')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 5. Trading Days Table
CREATE TABLE IF NOT EXISTS public.trading_days (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trader_id UUID NOT NULL REFERENCES public.active_traders(id) ON DELETE CASCADE,
  trade_date DATE NOT NULL,
  pnl NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  profit_shared NUMERIC(12, 2) NOT NULL DEFAULT 0.00,
  status TEXT NOT NULL DEFAULT 'profit' CHECK (status IN ('profit', 'loss', 'breakeven')),
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 6. Payments Table (Profit-Share Submissions)
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  trader_id UUID REFERENCES public.active_traders(id) ON DELETE SET NULL,
  rm_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  trader_name TEXT,
  trader_phone TEXT,
  amount NUMERIC(12, 2) NOT NULL,
  payment_mode TEXT NOT NULL DEFAULT 'UPI' CHECK (payment_mode IN ('UPI', 'Bank Transfer', 'Other')),
  utr_number TEXT,
  transaction_at TIMESTAMPTZ,
  screenshot_url TEXT,
  remarks TEXT,
  status TEXT NOT NULL DEFAULT 'pending_verification' CHECK (
    status IN ('pending_verification', 'approved', 'rejected', 'duplicate', 'needs_clarification')
  ),
  verified_at TIMESTAMPTZ,
  verified_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  verification_remark TEXT,
  checklist_result JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 7. Expenses Table
CREATE TABLE IF NOT EXISTS public.expenses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category TEXT NOT NULL,
  amount NUMERIC(12, 2) NOT NULL,
  description TEXT,
  date DATE NOT NULL DEFAULT CURRENT_DATE,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 8. Auto-update timestamp function & triggers
CREATE OR REPLACE FUNCTION update_timestamp_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS tr_profiles_updated_at ON public.profiles;
CREATE TRIGGER tr_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

DROP TRIGGER IF EXISTS tr_leads_updated_at ON public.leads;
CREATE TRIGGER tr_leads_updated_at BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

DROP TRIGGER IF EXISTS tr_active_traders_updated_at ON public.active_traders;
CREATE TRIGGER tr_active_traders_updated_at BEFORE UPDATE ON public.active_traders FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();

DROP TRIGGER IF EXISTS tr_payments_updated_at ON public.payments;
CREATE TRIGGER tr_payments_updated_at BEFORE UPDATE ON public.payments FOR EACH ROW EXECUTE FUNCTION update_timestamp_column();
