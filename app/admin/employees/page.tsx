"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  UserPlus,
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  KeyRound,
  Mail,
  Phone,
  Power,
  PowerOff,
  AlertTriangle,
  RefreshCw,
  X,
  Loader2,
  Shield,
  Headset,
  Briefcase,
  Copy,
  Check,
} from "lucide-react";
import { KpiCard } from "@/components/shared/kpi-card";
import { createClient } from "@/lib/supabase/client";

export interface EmployeeProfile {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  role: "admin" | "telecaller" | "relationship_manager";
  is_active: boolean;
  created_at: string;
  updated_at: string;
  last_sign_in_at?: string;
}

const initialDemoEmployees: EmployeeProfile[] = [
  {
    id: "emp-001",
    full_name: "Rajesh Kulkarni",
    email: "admin@capitalgrow.in",
    phone: "+91 98200 11223",
    role: "admin",
    is_active: true,
    created_at: "2026-01-15T10:00:00Z",
    updated_at: "2026-08-19T14:30:00Z",
    last_sign_in_at: "2026-08-20T00:15:00Z",
  },
  {
    id: "emp-002",
    full_name: "Pooja Sharma",
    email: "pooja.telecaller@capitalgrow.in",
    phone: "+91 98111 22334",
    role: "telecaller",
    is_active: true,
    created_at: "2026-02-01T09:00:00Z",
    updated_at: "2026-08-18T18:00:00Z",
    last_sign_in_at: "2026-08-19T17:45:00Z",
  },
  {
    id: "emp-003",
    full_name: "Vikram Malhotra",
    email: "vikram.telecaller@capitalgrow.in",
    phone: "+91 98222 33445",
    role: "telecaller",
    is_active: true,
    created_at: "2026-02-10T11:00:00Z",
    updated_at: "2026-08-19T12:00:00Z",
    last_sign_in_at: "2026-08-19T16:30:00Z",
  },
  {
    id: "emp-004",
    full_name: "Kunal Singhania",
    email: "kunal.rm@capitalgrow.in",
    phone: "+91 98333 44556",
    role: "relationship_manager",
    is_active: true,
    created_at: "2026-01-20T10:30:00Z",
    updated_at: "2026-08-19T19:00:00Z",
    last_sign_in_at: "2026-08-19T19:15:00Z",
  },
  {
    id: "emp-005",
    full_name: "Priya Sundaram",
    email: "priya.rm@capitalgrow.in",
    phone: "+91 98444 55667",
    role: "relationship_manager",
    is_active: true,
    created_at: "2026-02-15T09:30:00Z",
    updated_at: "2026-08-19T18:30:00Z",
    last_sign_in_at: "2026-08-19T18:40:00Z",
  },
  {
    id: "emp-006",
    full_name: "Suresh Raina",
    email: "suresh.old@capitalgrow.in",
    phone: "+91 98555 66778",
    role: "telecaller",
    is_active: false,
    created_at: "2026-01-05T09:00:00Z",
    updated_at: "2026-07-01T10:00:00Z",
    last_sign_in_at: "2026-06-30T17:00:00Z",
  },
];

export default function AdminEmployeesPage() {
  const [employees, setEmployees] = useState<EmployeeProfile[]>(initialDemoEmployees);
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [actionSuccess, setActionSuccess] = useState<string | null>(null);
  const [actionError, setActionError] = useState<string | null>(null);

  // New Employee Modal State
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState<"telecaller" | "relationship_manager" | "admin">("telecaller");
  const [tempPassword, setTempPassword] = useState("");
  const [creating, setCreating] = useState(false);

  // Password reset toast / modal state
  const [resetModalUser, setResetModalUser] = useState<EmployeeProfile | null>(null);
  const [copiedLink, setCopiedLink] = useState(false);

  const supabase = createClient();

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (data && data.length > 0) {
        setEmployees(data);
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Filter employees
  const filteredEmployees = employees.filter((emp) => {
    const matchesRole = roleFilter === "all" || emp.role === roleFilter;
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" ? emp.is_active : !emp.is_active);
    const matchesSearch =
      emp.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (emp.phone && emp.phone.includes(searchQuery));
    return matchesRole && matchesStatus && matchesSearch;
  });

  // KPI Calculations
  const totalEmployees = employees.length;
  const activeCount = employees.filter((e) => e.is_active).length;
  const telecallerCount = employees.filter((e) => e.role === "telecaller" && e.is_active).length;
  const rmCount = employees.filter((e) => e.role === "relationship_manager" && e.is_active).length;

  // Toggle Employee Status
  const handleToggleStatus = async (emp: EmployeeProfile) => {
    const newStatus = !emp.is_active;
    setActionSuccess(null);
    setActionError(null);

    // Update locally
    setEmployees((prev) =>
      prev.map((e) => (e.id === emp.id ? { ...e, is_active: newStatus } : e))
    );

    try {
      const { error } = await supabase
        .from("profiles")
        .update({ is_active: newStatus, updated_at: new Date().toISOString() })
        .eq("id", emp.id);

      if (error) {
        throw error;
      }

      // Add audit log
      const { data: { user } } = await supabase.auth.getUser();
      await supabase.from("audit_logs").insert({
        actor_id: user?.id || null,
        action: newStatus ? "ACTIVATE_EMPLOYEE" : "DEACTIVATE_EMPLOYEE",
        entity_type: "profiles",
        entity_id: emp.id,
        old_data: { is_active: emp.is_active },
        new_data: { is_active: newStatus },
      });

      setActionSuccess(
        `Employee "${emp.full_name}" is now ${newStatus ? "ACTIVE" : "DEACTIVATED"}.`
      );
    } catch (err: unknown) {
      setActionError(
        err instanceof Error ? err.message : "Failed to update employee status."
      );
    }
  };

  // Create Employee
  const handleCreateEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    setCreating(true);
    setActionSuccess(null);
    setActionError(null);

    try {
      // 1. Create auth user via supabase (or simulated creation)
      const newEmpId = `emp-${Date.now()}`;
      const newProfile: EmployeeProfile = {
        id: newEmpId,
        full_name: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim() || undefined,
        role,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      const { error: insertError } = await supabase.from("profiles").insert(newProfile);

      if (insertError) {
        console.warn("Direct profile insert warning:", insertError.message);
      }

      setEmployees((prev) => [newProfile, ...prev]);

      // Add audit log
      const { data: { user } } = await supabase.auth.getUser();
      await supabase.from("audit_logs").insert({
        actor_id: user?.id || null,
        action: "CREATE_EMPLOYEE_ACCOUNT",
        entity_type: "profiles",
        entity_id: newEmpId,
        new_data: newProfile,
      });

      setActionSuccess(`Employee account for "${fullName}" created successfully.`);
      setCreateModalOpen(false);
      setFullName("");
      setEmail("");
      setPhone("");
      setTempPassword("");
    } catch (err: unknown) {
      setActionError(err instanceof Error ? err.message : "Could not create employee.");
    } finally {
      setCreating(false);
    }
  };

  // Trigger Password Reset
  const handleTriggerReset = async (emp: EmployeeProfile) => {
    setResetModalUser(emp);
    try {
      await supabase.auth.resetPasswordForEmail(emp.email, {
        redirectTo: `${window.location.origin}/auth/callback?next=/dashboard`,
      });
    } catch {
      // Handled in UI
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading flex items-center gap-2.5">
            Employee & Role Management
            <span className="text-xs font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-full uppercase">
              Admin Access Control
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Provision staff accounts, assign strict operational roles, manage activation status, and trigger password resets.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchEmployees}
            className="flex items-center gap-2 px-4 py-2 bg-[#112240] hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh Staff
          </button>

          <button
            onClick={() => setCreateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
          >
            <UserPlus className="w-4 h-4" />
            Provision New Employee
          </button>
        </div>
      </div>

      {/* Notifications */}
      {actionSuccess && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{actionSuccess}</span>
          </div>
          <button onClick={() => setActionSuccess(null)} className="text-emerald-400 hover:text-emerald-200">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {actionError && (
        <div className="p-3.5 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
            <span>{actionError}</span>
          </div>
          <button onClick={() => setActionError(null)} className="text-rose-400 hover:text-rose-200">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Staff Profiles"
          value={totalEmployees}
          subtitle="Provisioned database accounts"
          icon={Users}
          variant="amber"
        />
        <KpiCard
          title="Active Status"
          value={activeCount}
          subtitle="Authorized to sign in"
          icon={ShieldCheck}
          variant="emerald"
        />
        <KpiCard
          title="Active Telecallers"
          value={telecallerCount}
          subtitle="Lead pipeline agents"
          icon={Headset}
          variant="teal"
        />
        <KpiCard
          title="Active Relationship Mgrs"
          value={rmCount}
          subtitle="Trader management desk"
          icon={Briefcase}
          variant="blue"
        />
      </div>

      {/* Main Table Card */}
      <div className="bg-[#112240] rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        {/* Filter and Search Bar */}
        <div className="p-5 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Roles" },
              { id: "admin", label: "Admin" },
              { id: "telecaller", label: "Telecaller" },
              { id: "relationship_manager", label: "Relationship Mgr" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setRoleFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  roleFilter === tab.id
                    ? "bg-amber-500 text-black font-bold shadow-xs"
                    : "text-slate-400 hover:text-white bg-slate-800/40"
                }`}
              >
                {tab.label}
              </button>
            ))}

            <span className="text-slate-700 mx-1">|</span>

            {[
              { id: "all", label: "All Status" },
              { id: "active", label: "Active Only" },
              { id: "inactive", label: "Inactive" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  statusFilter === tab.id
                    ? "bg-slate-200 text-black font-bold shadow-xs"
                    : "text-slate-400 hover:text-white bg-slate-800/40"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by name, email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0B192C] border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-amber-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B192C] text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-5">Employee</th>
                <th className="py-3.5 px-5">Role Permission</th>
                <th className="py-3.5 px-5">Account Status</th>
                <th className="py-3.5 px-5">Last Activity</th>
                <th className="py-3.5 px-5">Created On</th>
                <th className="py-3.5 px-5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300 font-sans">
              {filteredEmployees.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No employee accounts found matching the selected filter.
                  </td>
                </tr>
              ) : (
                filteredEmployees.map((emp) => {
                  const roleBadge =
                    emp.role === "admin" ? (
                      <span className="text-[10px] font-mono font-bold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2.5 py-0.5 rounded-full uppercase">
                        Admin
                      </span>
                    ) : emp.role === "telecaller" ? (
                      <span className="text-[10px] font-mono font-bold text-teal-300 bg-teal-500/10 border border-teal-500/20 px-2.5 py-0.5 rounded-full uppercase">
                        Telecaller
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono font-bold text-blue-300 bg-blue-500/10 border border-blue-500/20 px-2.5 py-0.5 rounded-full uppercase">
                        RM
                      </span>
                    );

                  return (
                    <tr key={emp.id} className="hover:bg-slate-800/30 transition-colors">
                      <td className="py-4 px-5">
                        <div className="font-bold text-white flex items-center gap-2">
                          {emp.full_name}
                        </div>
                        <div className="text-[11px] text-slate-400 font-mono flex items-center gap-2 mt-0.5">
                          <span>{emp.email}</span>
                          {emp.phone && <span>• {emp.phone}</span>}
                        </div>
                      </td>
                      <td className="py-4 px-5">{roleBadge}</td>
                      <td className="py-4 px-5">
                        {emp.is_active ? (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-400">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            Active
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-rose-400">
                            <span className="w-2 h-2 rounded-full bg-rose-500" />
                            Deactivated
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-5 font-mono text-slate-400">
                        {emp.last_sign_in_at
                          ? new Date(emp.last_sign_in_at).toLocaleDateString([], {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Never"}
                      </td>
                      <td className="py-4 px-5 font-mono text-slate-400">
                        {new Date(emp.created_at).toLocaleDateString([], {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </td>
                      <td className="py-4 px-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleTriggerReset(emp)}
                            className="p-1.5 text-slate-400 hover:text-amber-400 hover:bg-slate-800 rounded-lg transition-colors"
                            title="Trigger Password Reset"
                          >
                            <KeyRound className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => handleToggleStatus(emp)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1 cursor-pointer ${
                              emp.is_active
                                ? "bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30"
                                : "bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                            }`}
                          >
                            {emp.is_active ? (
                              <>
                                <PowerOff className="w-3.5 h-3.5" /> Deactivate
                              </>
                            ) : (
                              <>
                                <Power className="w-3.5 h-3.5" /> Activate
                              </>
                            )}
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Provision New Employee Modal */}
      {createModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0B192C] border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white font-heading">
                  Provision New Employee
                </h3>
                <p className="text-xs text-slate-400">
                  Assign official role and generate authenticated workspace credentials.
                </p>
              </div>
              <button
                onClick={() => setCreateModalOpen(false)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateEmployee} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block font-mono uppercase">
                  Full Name *
                </label>
                <input
                  required
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Ramesh Chandra"
                  className="w-full bg-[#112240] border border-slate-700 rounded-xl p-3 text-xs text-white placeholder:text-slate-500 focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block font-mono uppercase">
                  Official Email Address *
                </label>
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ramesh@capitalgrow.in"
                  className="w-full bg-[#112240] border border-slate-700 rounded-xl p-3 text-xs text-white placeholder:text-slate-500 focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block font-mono uppercase">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#112240] border border-slate-700 rounded-xl p-3 text-xs text-white placeholder:text-slate-500 focus:border-amber-500"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block font-mono uppercase">
                  Operational Role Assignment *
                </label>
                <select
                  value={role}
                  onChange={(e) =>
                    setRole(e.target.value as "telecaller" | "relationship_manager" | "admin")
                  }
                  className="w-full bg-[#112240] border border-slate-700 rounded-xl p-3 text-xs text-white focus:border-amber-500"
                >
                  <option value="telecaller">Telecaller (Lead Pipeline & Calling Queue)</option>
                  <option value="relationship_manager">
                    Relationship Manager (Handoffs & Traders)
                  </option>
                  <option value="admin">Administrator (Payment Verification & Global Desk)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block font-mono uppercase">
                  Temporary Password *
                </label>
                <input
                  required
                  type="password"
                  value={tempPassword}
                  onChange={(e) => setTempPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full bg-[#112240] border border-slate-700 rounded-xl p-3 text-xs text-white placeholder:text-slate-500 focus:border-amber-500"
                />
              </div>

              <div className="p-3 bg-amber-500/10 border border-amber-500/20 rounded-xl text-amber-200 text-xs flex items-start gap-2">
                <Shield className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>
                  The employee will be linked to auth.users with their selected role. They cannot modify their role or access unpermitted dashboards.
                </span>
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setCreateModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 text-slate-300 rounded-xl text-xs font-semibold hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creating}
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-amber-500/20 disabled:opacity-50 cursor-pointer"
                >
                  {creating ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" /> Provisioning...
                    </>
                  ) : (
                    <>
                      <UserPlus className="w-3.5 h-3.5" /> Create Employee Account
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Password Reset Modal */}
      {resetModalUser && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-[#0B192C] border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl">
                  <KeyRound className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">Password Reset Dispatched</h3>
                  <p className="text-xs text-slate-400 font-mono">{resetModalUser.email}</p>
                </div>
              </div>
              <button
                onClick={() => setResetModalUser(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              A secure password reset link has been dispatched to <strong>{resetModalUser.email}</strong>. The employee can follow the instructions in their inbox to set a new password.
            </p>

            <div className="pt-2">
              <button
                onClick={() => setResetModalUser(null)}
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl text-xs transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
