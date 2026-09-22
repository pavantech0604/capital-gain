"use client";

import React, { useState, useEffect } from "react";
import {
  ShieldCheck,
  Search,
  Filter,
  CheckCircle2,
  XCircle,
  Clock,
  ExternalLink,
  ArrowUpRight,
  AlertTriangle,
  RefreshCw,
  Copy,
  DollarSign,
} from "lucide-react";
import { KpiCard } from "@/components/shared/kpi-card";
import { StatusBadge } from "@/components/shared/status-badge";
import {
  PaymentDetailDrawer,
  PaymentRecord,
} from "@/components/admin/payment-detail-drawer";
import { createClient } from "@/lib/supabase/client";

const demoPayments: PaymentRecord[] = [
  {
    id: "pay-101",
    trader_name: "Siddharth Verma",
    trader_phone: "+91 98450 77123",
    rm_name: "Kunal Singhania",
    amount: 73500,
    payment_mode: "UPI",
    utr_number: "UPI/623411890212/CR",
    transaction_at: new Date(Date.now() - 3600000 * 3).toISOString(),
    status: "pending_verification",
    remarks: "Profit share from 18th Aug BankNifty expiry calls",
    created_at: new Date(Date.now() - 3600000 * 3).toISOString(),
  },
  {
    id: "pay-102",
    trader_name: "Amitabh Sen",
    trader_phone: "+91 98300 22345",
    rm_name: "Priya Sundaram",
    amount: 54000,
    payment_mode: "Bank Transfer",
    utr_number: "HDFC00001239841",
    transaction_at: new Date(Date.now() - 3600000 * 24).toISOString(),
    status: "approved",
    verified_at: new Date(Date.now() - 3600000 * 20).toISOString(),
    verification_remark: "Verified against HDFC Current A/C statement",
    created_at: new Date(Date.now() - 3600000 * 24).toISOString(),
  },
  {
    id: "pay-103",
    trader_name: "Gaurav Mehta",
    trader_phone: "+91 98190 66543",
    rm_name: "Kunal Singhania",
    amount: 32000,
    payment_mode: "UPI",
    utr_number: "UPI/FAKE99920199/CR",
    transaction_at: new Date(Date.now() - 3600000 * 48).toISOString(),
    status: "rejected",
    verified_at: new Date(Date.now() - 3600000 * 40).toISOString(),
    verification_remark: "UTR not found in bank logs. Manipulated screenshot detected.",
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
  {
    id: "pay-104",
    trader_name: "Ritu Kapoor",
    trader_phone: "+91 99100 88912",
    rm_name: "Priya Sundaram",
    amount: 28500,
    payment_mode: "UPI",
    utr_number: "UPI/623190844122/CR",
    transaction_at: new Date(Date.now() - 3600000 * 6).toISOString(),
    status: "pending_verification",
    remarks: "Options weekly profit share submission",
    created_at: new Date(Date.now() - 3600000 * 6).toISOString(),
  },
];

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<PaymentRecord[]>(demoPayments);
  const [selectedPayment, setSelectedPayment] = useState<PaymentRecord | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  const fetchPayments = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("payments")
        .select("*")
        .order("created_at", { ascending: false });

      if (data && data.length > 0) {
        setPayments(data);
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const filteredPayments = payments.filter((payment) => {
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    const matchesSearch =
      payment.trader_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.utr_number?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.trader_phone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  // Calculate Metrics
  const pendingCount = payments.filter((p) => p.status === "pending_verification").length;
  const pendingVolume = payments
    .filter((p) => p.status === "pending_verification")
    .reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
  const approvedVolume = payments
    .filter((p) => p.status === "approved")
    .reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
  const rejectedCount = payments.filter((p) => p.status === "rejected").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading flex items-center gap-2.5">
            Payment Verification Desk
            <span className="text-xs font-mono font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2.5 py-1 rounded-full uppercase">
              Anti-Fraud Control
            </span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Authenticate incoming profit-sharing payments, verify bank UTR references, and eliminate forged screenshots.
          </p>
        </div>

        <button
          onClick={fetchPayments}
          className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 bg-[#112240] hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-all cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh Records
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Pending Verification"
          value={pendingCount}
          subtitle={`₹${pendingVolume.toLocaleString()} awaiting check`}
          icon={Clock}
          variant="amber"
        />
        <KpiCard
          title="Verified Volume"
          value={`₹${approvedVolume.toLocaleString()}`}
          subtitle="Legitimate bank credits"
          icon={ShieldCheck}
          variant="emerald"
        />
        <KpiCard
          title="Fake / Rejected"
          value={rejectedCount}
          subtitle="Flagged submissions"
          icon={XCircle}
          variant="default"
        />
        <KpiCard
          title="Total Submissions"
          value={payments.length}
          subtitle="Lifetime profit logs"
          icon={DollarSign}
          variant="gold"
        />
      </div>

      {/* Anti-fraud advisory banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-amber-950/40 to-slate-900 border border-amber-500/30 flex items-start gap-3.5">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p className="text-xs font-bold text-amber-300 font-mono uppercase">
            Mandatory Verification Standard Operating Procedure
          </p>
          <p className="text-xs text-slate-300 leading-relaxed">
            1. Copy the UTR. 2. Search UTR in your bank merchant console / UPI statement. 3. Confirm matching sender name and time before approving.
          </p>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-[#112240] rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        {/* Filter and Search Bar */}
        <div className="p-5 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Payments" },
              { id: "pending_verification", label: `Pending (${pendingCount})` },
              { id: "approved", label: "Approved" },
              { id: "rejected", label: "Rejected" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  statusFilter === tab.id
                    ? "bg-amber-500 text-black font-bold shadow-xs"
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
              placeholder="Search by Trader, UTR..."
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
                <th className="py-3.5 px-5">Trader / RM</th>
                <th className="py-3.5 px-5">Amount (₹)</th>
                <th className="py-3.5 px-5">Mode & UTR</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5">Submitted At</th>
                <th className="py-3.5 px-5">Verification Audit</th>
                <th className="py-3.5 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300 font-sans">
              {filteredPayments.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    No payment records found.
                  </td>
                </tr>
              ) : (
                filteredPayments.map((payment) => (
                  <tr
                    key={payment.id}
                    className="hover:bg-slate-800/30 transition-colors group cursor-pointer"
                    onClick={() => {
                      setSelectedPayment(payment);
                      setDrawerOpen(true);
                    }}
                  >
                    <td className="py-4 px-5">
                      <div className="font-bold text-white group-hover:text-amber-400 transition-colors">
                        {payment.trader_name}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        RM: {payment.rm_name || "Assigned RM"} • {payment.trader_phone}
                      </div>
                    </td>
                    <td className="py-4 px-5 font-mono font-bold text-emerald-400 text-sm">
                      ₹{Number(payment.amount).toLocaleString()}
                    </td>
                    <td className="py-4 px-5">
                      <div className="text-white font-medium">{payment.payment_mode}</div>
                      <div className="text-[10px] text-amber-300 font-mono truncate max-w-[150px]">
                        {payment.utr_number || "No UTR"}
                      </div>
                    </td>
                    <td className="py-4 px-5">
                      <StatusBadge status={payment.status} size="sm" />
                    </td>
                    <td className="py-4 px-5 font-mono text-slate-400">
                      {new Date(payment.created_at).toLocaleDateString([], {
                        month: "short",
                        day: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </td>
                    <td className="py-4 px-5 max-w-xs truncate text-slate-400">
                      {payment.verification_remark ? (
                        <span className="text-slate-300 text-[11px]">
                          {payment.verification_remark}
                        </span>
                      ) : (
                        <span className="text-slate-600 italic">Unverified</span>
                      )}
                    </td>
                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPayment(payment);
                          setDrawerOpen(true);
                        }}
                        className="py-1.5 px-3 bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-1 cursor-pointer"
                      >
                        Inspect & Verify <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Payment Inspection Drawer */}
      <PaymentDetailDrawer
        payment={selectedPayment}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onPaymentUpdated={fetchPayments}
      />
    </div>
  );
}
