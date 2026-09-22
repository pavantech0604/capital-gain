# Capital Grow — Role-Based Access System & Architecture

This guide explains how roles, permissions, database migrations, and authentication routing work across the **Capital Grow** platform.

---

## 1. Role Matrix & Permissions

| Feature / Area | Admin | Telecaller | Relationship Manager (RM) |
|---|---|---|---|
| **Login Redirect** | `/admin/dashboard` | `/telecaller/dashboard` | `/rm/dashboard` |
| **All Leads Access** | Full View & Manage | Assigned to Telecaller only | Assigned to RM only |
| **Call Outcome & Notes** | View / Edit | Add Telecaller Notes & Follow-up | View Telecaller Notes |
| **Forward Lead to RM** | Manage | Qualify & Forward with Capital Info | Receive qualified leads |
| **Convert to Active Trader** | Yes | No | Convert qualified lead to Trader |
| **Active Traders Desk** | View all portfolio P&L | No Access | View own traders & streaks |
| **Profit Upload Form** | Audit & Ledger | No Access | Upload & prefill for client |
| **Payment Anti-Fraud Verification** | Full Verification Desk | No Access | Read status of own traders |
| **Expenses & Net Profit** | Full View & Entry | No Access | No Access |

---

## 2. Database Migration Execution

Run the provided SQL migrations inside your **Supabase SQL Editor**:

1. [001_role_system.sql](file:///e:/Capital%20Grow/capital-gain-app/db/migrations/001_role_system.sql):
   - Adds `role` check constraint (`admin`, `telecaller`, `relationship_manager`) on `users` table.
   - Creates `leads`, `active_traders`, `trading_days`, `payments`, and `expenses` tables.
   - Sets up automatic timestamp triggers.

2. [002_rls_policies.sql](file:///e:/Capital%20Grow/capital-gain-app/db/migrations/002_rls_policies.sql):
   - Enables Row-Level Security (RLS) on all tables.
   - Enforces strict data isolation so Telecallers and RMs can only read/mutate their assigned leads and traders.
   - Grants Admin full system access.

---

## 3. Creating & Assigning Users with Roles

In Supabase:
1. Create user account via **Authentication → Users → Add User** (Email + Password).
2. Insert or update the user record in `public.users`:
```sql
-- Example: Promote user to Admin
UPDATE public.users 
SET role = 'admin' 
WHERE email = 'admin@capitalgrow.in';

-- Example: Set user as Telecaller
INSERT INTO public.users (id, email, name, phone, role)
VALUES ('<supabase-auth-user-uuid>', 'caller1@capitalgrow.in', 'Vikram Lead Specialist', '+919876543210', 'telecaller')
ON CONFLICT (id) DO UPDATE SET role = 'telecaller';

-- Example: Set user as Relationship Manager
UPDATE public.users 
SET role = 'relationship_manager' 
WHERE email = 'rm1@capitalgrow.in';
```

---

## 4. Middleware & Route Protection

Next.js `middleware.ts` intercepts all requests:
- Reads user session via `@supabase/ssr` cookies.
- Queries `users.role` from the database (never trusts client claims).
- Redirects unauthorized roles:
  - `/admin/*` → non-admins redirected to their role dashboard or `/login`.
  - `/telecaller/*` → non-telecallers redirected to their role dashboard.
  - `/rm/*` → non-RMs redirected to their role dashboard.
  - Logged-in users visiting `/login` are automatically redirected to their role workspace.
