"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Users,
  TrendingUp,
  DollarSign,
  ShieldCheck,
  AlertTriangle,
  ArrowUpRight,
  Receipt,
  FileCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
} from "lucide-react";
import { KpiCard } from "@/components/shared/kpi-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { createClient } from "@/lib/supabase/client";

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    totalLeads: 128,
    activeTraders: 42,
    monthlyProfitShared: 485000,
    expensesTotal: 65000,
    pendingPaymentsCount: 3,
    pendingPaymentsVolume: 102000,
    staleLeadsCount: 4,
  });

  const supabase = createClient();

  useEffect(() => {
    async function loadStats() {
      try {
        // Fetch leads count
        const { count: leadCount } = await supabase
          .from("leads")
          .select("*", { count: "exact", head: true });

        // Fetch traders count
        const { count: traderCount } = await supabase
          .from("active_traders")
          .select("*", { count: "exact", head: true });

        // Fetch pending payments
        const { data: pendingPayments } = await supabase
          .from("payments")
          .select("amount")
          .eq("status", "pending_verification");

        const pendingVol = (pendingPayments || []).reduce(
          (acc, p) => acc + Number(p.amount || 0),
          0
        );

        if (leadCount !== null) {
          setStats((prev) => ({
            ...prev,
            totalLeads: leadCount || prev.totalLeads,
            activeTraders: traderCount || prev.activeTraders,
            pendingPaymentsCount: pendingPayments?.length ?? prev.pendingPaymentsCount,
            pendingPaymentsVolume: pendingVol || prev.pendingPaymentsVolume,
          }));
        }
      } catch {
        // Fallback demo state
      }
    }
    loadStats();
  }, [supabase]);

  const netProfit = stats.monthlyProfitShared - stats.expensesTotal;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
            Executive Admin Overview
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Global oversight across lead generation, desk operations, revenue share, and banking reconciliation.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/employees"
            className="flex items-center gap-2 px-4 py-2 bg-[#112240] hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold rounded-xl text-xs transition-all"
          >
            <Users className="w-4 h-4 text-amber-400" />
            Manage Staff
          </Link>
          <Link
            href="/admin/payments"
            className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl text-xs shadow-lg shadow-amber-500/20 transition-all"
          >
            <ShieldCheck className="w-4 h-4" />
            Verify Payments ({stats.pendingPaymentsCount})
          </Link>
        </div>
      </div>

      {/* Critical Alerts Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stats.pendingPaymentsCount > 0 && (
          <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-amber-500/20 text-amber-400 rounded-xl">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-amber-300 font-mono uppercase">
                  Payments Pending Verification
                </h4>
                <p className="text-xs text-slate-300">
                  {stats.pendingPaymentsCount} submission(s) totaling ₹{stats.pendingPaymentsVolume.toLocaleString()} require bank verification.
                </p>
              </div>
            </div>
            <Link
              href="/admin/payments"
              className="px-3 py-1.5 bg-amber-500 text-black font-bold text-xs rounded-lg hover:bg-amber-400 transition-colors shrink-0"
            >
              Review
            </Link>
          </div>
        )}

        {stats.staleLeadsCount > 0 && (
          <div className="p-4 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-rose-500/20 text-rose-400 rounded-xl">
                <AlertTriangle className="w-5 h-5 text-rose-400" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-rose-300 font-mono uppercase">
                  RM Handoff Delay Alert
                </h4>
                <p className="text-xs text-slate-300">
                  {stats.staleLeadsCount} high-intent leads pending RM contact for over 24 hours.
                </p>
              </div>
            </div>
            <Link
              href="/admin/leads"
              className="px-3 py-1.5 bg-rose-600 text-white font-bold text-xs rounded-lg hover:bg-rose-500 transition-colors shrink-0"
            >
              Audit Leads
            </Link>
          </div>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Total Leads"
          value={stats.totalLeads}
          subtitle="+14 today across channels"
          trend={{ value: "18.4%", isPositive: true }}
          icon={Users}
          variant="teal"
        />
        <KpiCard
          title="Active Traders"
          value={stats.activeTraders}
          subtitle="Live trading accounts"
          trend={{ value: "8.2%", isPositive: true }}
          icon={TrendingUp}
          variant="emerald"
        />
        <KpiCard
          title="Profit Shared (Month)"
          value={`₹${stats.monthlyProfitShared.toLocaleString()}`}
          subtitle="Gross 30% profit cut"
          icon={DollarSign}
          variant="gold"
        />
        <KpiCard
          title="Net Desk Profit"
          value={`₹${netProfit.toLocaleString()}`}
          subtitle="Approved shares minus expenses"
          icon={Receipt}
          variant="blue"
        />
      </div>

      {/* Analytics & Funnel Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Lead Funnel Stage Breakdown */}
        <div className="bg-[#112240] p-6 rounded-2xl border border-slate-800 space-y-5 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wide">
              Lead Conversion Funnel
            </h3>
            <span className="text-[10px] font-mono text-slate-400">Current Month</span>
          </div>

          <div className="space-y-3.5">
            {[
              { stage: "New Inbound Leads", count: 128, pct: 100, color: "bg-blue-500" },
              { stage: "Called by Telecallers", count: 96, pct: 75, color: "bg-cyan-500" },
              { stage: "Qualified & Sent to RM", count: 64, pct: 50, color: "bg-purple-500" },
              { stage: "RM Strategy Session", count: 51, pct: 40, color: "bg-amber-500" },
              { stage: "Active Live Traders", count: 42, pct: 33, color: "bg-emerald-500" },
            ].map((item) => (
              <div key={item.stage} className="space-y-1">
                <div className="flex justify-between text-xs font-semibold">
                  <span className="text-slate-300">{item.stage}</span>
                  <span className="text-white font-mono">{item.count} ({item.pct}%)</span>
                </div>
                <div className="w-full bg-[#0B192C] h-2 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${item.color} rounded-full transition-all duration-500`}
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Desks Performance */}
        <div className="bg-[#112240] p-6 rounded-2xl border border-slate-800 space-y-5 shadow-xl lg:col-span-2">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white font-mono uppercase tracking-wide">
              Relationship Manager Desk Leaderboard
            </h3>
            <Link
              href="/admin/traders"
              className="text-xs text-amber-400 hover:underline flex items-center gap-1 font-semibold"
            >
              View Traders <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0B192C] text-slate-400 font-mono uppercase text-[10px] border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">RM Specialist</th>
                  <th className="py-3 px-4">Active Traders</th>
                  <th className="py-3 px-4">Total Profit Generated</th>
                  <th className="py-3 px-4">Share Received (₹)</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300">
                {[
                  {
                    name: "Kunal Singhania",
                    traders: 24,
                    profit: "₹8,40,000",
                    share: "₹2,52,000",
                    rating: "Top Performer",
                  },
                  {
                    name: "Priya Sundaram",
                    traders: 18,
                    profit: "₹6,10,000",
                    share: "₹1,83,000",
                    rating: "Strong Growth",
                  },
                ].map((rm) => (
                  <tr key={rm.name} className="hover:bg-slate-800/20">
                    <td className="py-3.5 px-4 font-bold text-white">{rm.name}</td>
                    <td className="py-3.5 px-4 font-mono">{rm.traders} accounts</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-emerald-400">{rm.profit}</td>
                    <td className="py-3.5 px-4 font-mono font-bold text-amber-400">{rm.share}</td>
                    <td className="py-3.5 px-4">
                      <span className="text-[10px] font-mono font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-full">
                        {rm.rating}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="pt-2 flex items-center justify-between text-xs text-slate-400 border-t border-slate-800">
            <span>Bank reconciliation synchronized</span>
            <span className="font-mono text-emerald-400">● Ledger Reconciliation Verified</span>
          </div>
        </div>
      </div>
    </div>
  );
}
