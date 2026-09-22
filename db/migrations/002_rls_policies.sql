-- 002_rls_policies.sql
-- Row-Level Security (RLS) for Capital Grow Enterprise Role-Based Architecture

-- Helper function to fetch current authenticated user's role securely
CREATE OR REPLACE FUNCTION public.get_auth_role()
RETURNS TEXT AS $$
  SELECT role FROM public.profiles WHERE id = auth.uid() AND is_active = true LIMIT 1;
$$ LANGUAGE sql SECURITY DEFINER STABLE;

-- 1. Enable RLS on all tables
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.active_traders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trading_days ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.expenses ENABLE ROW LEVEL SECURITY;

-- =========================================================================
-- PROFILES POLICIES
-- =========================================================================
DROP POLICY IF EXISTS "Admin can manage all profiles" ON public.profiles;
CREATE POLICY "Admin can manage all profiles"
  ON public.profiles FOR ALL
  TO authenticated
  USING (public.get_auth_role() = 'admin')
  WITH CHECK (public.get_auth_role() = 'admin');

DROP POLICY IF EXISTS "Users can read own profile" ON public.profiles;
CREATE POLICY "Users can read own profile"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (id = auth.uid());

DROP POLICY IF EXISTS "Staff can view active colleague profiles for assignment" ON public.profiles;
CREATE POLICY "Staff can view active colleague profiles for assignment"
  ON public.profiles FOR SELECT
  TO authenticated
  USING (is_active = true);

-- Prevent employees from changing their own role or active status
DROP POLICY IF EXISTS "Employees cannot update role or status" ON public.profiles;
-- (Covered because only Admin has UPDATE policy for other profiles, and users only have SELECT)

-- =========================================================================
-- LEADS POLICIES
-- =========================================================================
DROP POLICY IF EXISTS "Admin has full access to leads" ON public.leads;
CREATE POLICY "Admin has full access to leads"
  ON public.leads FOR ALL
  TO authenticated
  USING (public.get_auth_role() = 'admin')
  WITH CHECK (public.get_auth_role() = 'admin');

DROP POLICY IF EXISTS "Telecaller can select own assigned leads" ON public.leads;
CREATE POLICY "Telecaller can select own assigned leads"
  ON public.leads FOR SELECT
  TO authenticated
  USING (
    public.get_auth_role() = 'telecaller' AND assigned_to = auth.uid()
  );

DROP POLICY IF EXISTS "Telecaller can update own assigned leads" ON public.leads;
CREATE POLICY "Telecaller can update own assigned leads"
  ON public.leads FOR UPDATE
  TO authenticated
  USING (
    public.get_auth_role() = 'telecaller' AND assigned_to = auth.uid()
  )
  WITH CHECK (
    public.get_auth_role() = 'telecaller' AND assigned_to = auth.uid()
  );

DROP POLICY IF EXISTS "Telecaller can insert leads" ON public.leads;
CREATE POLICY "Telecaller can insert leads"
  ON public.leads FOR INSERT
  TO authenticated
  WITH CHECK (
    public.get_auth_role() = 'telecaller'
  );

DROP POLICY IF EXISTS "RM can view leads assigned to them" ON public.leads;
CREATE POLICY "RM can view leads assigned to them"
  ON public.leads FOR SELECT
  TO authenticated
  USING (
    public.get_auth_role() = 'relationship_manager' AND rm_assigned_to = auth.uid()
  );

DROP POLICY IF EXISTS "RM can update leads assigned to them" ON public.leads;
CREATE POLICY "RM can update leads assigned to them"
  ON public.leads FOR UPDATE
  TO authenticated
  USING (
    public.get_auth_role() = 'relationship_manager' AND rm_assigned_to = auth.uid()
  )
  WITH CHECK (
    public.get_auth_role() = 'relationship_manager' AND rm_assigned_to = auth.uid()
  );

-- =========================================================================
-- ACTIVE TRADERS POLICIES
-- =========================================================================
DROP POLICY IF EXISTS "Admin has full access to active_traders" ON public.active_traders;
CREATE POLICY "Admin has full access to active_traders"
  ON public.active_traders FOR ALL
  TO authenticated
  USING (public.get_auth_role() = 'admin')
  WITH CHECK (public.get_auth_role() = 'admin');

DROP POLICY IF EXISTS "RM can view own active traders" ON public.active_traders;
CREATE POLICY "RM can view own active traders"
  ON public.active_traders FOR SELECT
  TO authenticated
  USING (
    public.get_auth_role() = 'relationship_manager' AND rm_assigned_to = auth.uid()
  );

DROP POLICY IF EXISTS "RM can insert active traders" ON public.active_traders;
CREATE POLICY "RM can insert active traders"
  ON public.active_traders FOR INSERT
  TO authenticated
  WITH CHECK (
    public.get_auth_role() = 'relationship_manager' AND rm_assigned_to = auth.uid()
  );

DROP POLICY IF EXISTS "RM can update own active traders" ON public.active_traders;
CREATE POLICY "RM can update own active traders"
  ON public.active_traders FOR UPDATE
  TO authenticated
  USING (
    public.get_auth_role() = 'relationship_manager' AND rm_assigned_to = auth.uid()
  )
  WITH CHECK (
    public.get_auth_role() = 'relationship_manager' AND rm_assigned_to = auth.uid()
  );

-- =========================================================================
-- TRADING DAYS POLICIES
-- =========================================================================
DROP POLICY IF EXISTS "Admin has full access to trading_days" ON public.trading_days;
CREATE POLICY "Admin has full access to trading_days"
  ON public.trading_days FOR ALL
  TO authenticated
  USING (public.get_auth_role() = 'admin')
  WITH CHECK (public.get_auth_role() = 'admin');

DROP POLICY IF EXISTS "RM can manage trading days of their traders" ON public.trading_days;
CREATE POLICY "RM can manage trading days of their traders"
  ON public.trading_days FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM public.active_traders
      WHERE active_traders.id = trading_days.trader_id
      AND active_traders.rm_assigned_to = auth.uid()
    )
  );

-- =========================================================================
-- PAYMENTS POLICIES
-- =========================================================================
DROP POLICY IF EXISTS "Admin has full access to payments" ON public.payments;
CREATE POLICY "Admin has full access to payments"
  ON public.payments FOR ALL
  TO authenticated
  USING (public.get_auth_role() = 'admin')
  WITH CHECK (public.get_auth_role() = 'admin');

DROP POLICY IF EXISTS "RM can view payments of their traders" ON public.payments;
CREATE POLICY "RM can view payments of their traders"
  ON public.payments FOR SELECT
  TO authenticated
  USING (
    public.get_auth_role() = 'relationship_manager' AND rm_id = auth.uid()
  );

DROP POLICY IF EXISTS "RM can insert payments for their traders" ON public.payments;
CREATE POLICY "RM can insert payments for their traders"
  ON public.payments FOR INSERT
  TO authenticated
  WITH CHECK (
    public.get_auth_role() = 'relationship_manager' AND rm_id = auth.uid()
  );

-- =========================================================================
-- EXPENSES POLICIES (Admin Only)
-- =========================================================================
DROP POLICY IF EXISTS "Admin has full access to expenses" ON public.expenses;
CREATE POLICY "Admin has full access to expenses"
  ON public.expenses FOR ALL
  TO authenticated
  USING (public.get_auth_role() = 'admin')
  WITH CHECK (public.get_auth_role() = 'admin');

-- =========================================================================
-- AUDIT LOGS POLICIES
-- =========================================================================
DROP POLICY IF EXISTS "Admin has full access to audit_logs" ON public.audit_logs;
CREATE POLICY "Admin has full access to audit_logs"
  ON public.audit_logs FOR ALL
  TO authenticated
  USING (public.get_auth_role() = 'admin');

DROP POLICY IF EXISTS "Authenticated users can insert audit logs" ON public.audit_logs;
CREATE POLICY "Authenticated users can insert audit logs"
  ON public.audit_logs FOR INSERT
  TO authenticated
  WITH CHECK (actor_id = auth.uid());
