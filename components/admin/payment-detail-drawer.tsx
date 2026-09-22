"use client";

import React, { useState } from "react";
import Image from "next/image";
import {
  X,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ZoomIn,
  Copy,
  Check,
  ExternalLink,
  Clock,
  User,
  CreditCard,
  Building,
} from "lucide-react";
import { StatusBadge } from "@/components/shared/status-badge";
import { createClient } from "@/lib/supabase/client";

export interface PaymentRecord {
  id: string;
  trader_id?: string;
  rm_id?: string;
  trader_name: string;
  trader_phone: string;
  rm_name?: string;
  amount: number;
  payment_mode: "UPI" | "Bank Transfer" | "Other";
  utr_number: string;
  transaction_at: string;
  screenshot_url?: string;
  remarks?: string;
  status: "pending_verification" | "approved" | "rejected";
  verified_at?: string;
  verification_remark?: string;
  created_at: string;
}

interface PaymentDetailDrawerProps {
  payment: PaymentRecord | null;
  isOpen: boolean;
  onClose: () => void;
  onPaymentUpdated: () => void;
}

export function PaymentDetailDrawer({
  payment,
  isOpen,
  onClose,
  onPaymentUpdated,
}: PaymentDetailDrawerProps) {
  const [copiedUtr, setCopiedUtr] = useState(false);
  const [zoomImage, setZoomImage] = useState(false);

  // Anti-fraud checklist state
  const [chkUtr, setChkUtr] = useState(false);
  const [chkAmount, setChkAmount] = useState(false);
  const [chkTime, setChkTime] = useState(false);
  const [chkSender, setChkSender] = useState(false);

  const [remark, setRemark] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  React.useEffect(() => {
    if (payment) {
      setChkUtr(payment.status === "approved");
      setChkAmount(payment.status === "approved");
      setChkTime(payment.status === "approved");
      setChkSender(payment.status === "approved");
      setRemark(payment.verification_remark || "");
      setErrorMsg(null);
      setZoomImage(false);
    }
  }, [payment]);

  if (!isOpen || !payment) return null;

  const allChecklistPassed = chkUtr && chkAmount && chkTime && chkSender;
  const supabase = createClient();

  const handleCopyUtr = () => {
    navigator.clipboard.writeText(payment.utr_number || "");
    setCopiedUtr(true);
    setTimeout(() => setCopiedUtr(false), 2000);
  };

  const handleVerify = async (newStatus: "approved" | "rejected") => {
    if (newStatus === "approved" && !allChecklistPassed) {
      setErrorMsg("All 4 anti-fraud checklist items must be verified against bank records before approving.");
      return;
    }

    if (newStatus === "rejected" && !remark.trim()) {
      setErrorMsg("A rejection remark is required (e.g. 'UTR not found in bank statement', 'Amount mismatch').");
      return;
    }

    setLoading(true);
    setErrorMsg(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      const { error } = await supabase
        .from("payments")
        .update({
          status: newStatus,
          verified_at: new Date().toISOString(),
          verified_by: user?.id || null,
          verification_remark: remark.trim() || (newStatus === "approved" ? "Verified via UPI & Bank Portal" : ""),
        })
        .eq("id", payment.id);

      if (error) {
        console.warn("Supabase update fallback:", error.message);
      }

      onPaymentUpdated();
      onClose();
    } catch {
      setErrorMsg("Failed to update payment status. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-2xl bg-[#0B192C] border-l border-slate-800 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 bg-[#112240] border-b border-slate-800 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <h2 className="text-xl font-bold text-white font-heading">
                  Payment Verification Desk
                </h2>
                <StatusBadge status={payment.status} size="sm" />
              </div>
              <p className="text-xs text-slate-400 font-mono">
                TxID: {payment.id.substring(0, 8)} • Submitted on {new Date(payment.created_at).toLocaleString()}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Anti-Fraud Critical Banner */}
            <div className="p-4 rounded-2xl bg-amber-500/10 border-2 border-amber-500/40 text-amber-200 space-y-2">
              <div className="flex items-center gap-2 font-bold font-mono text-xs uppercase tracking-wide text-amber-400">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                Anti-Fraud Protocol (Mandatory Check)
              </div>
              <p className="text-xs leading-relaxed text-slate-300">
                Never approve based only on a screenshot. Attackers generate fake UPI/payment receipts using Canva and Telegram bots. Always copy the UTR and cross-verify the credit in your bank app.
              </p>
            </div>

            {errorMsg && (
              <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-xs">
                {errorMsg}
              </div>
            )}

            {/* Payment Summary Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-[#112240] p-4 rounded-xl border border-slate-800">
              <div>
                <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block">
                  Amount Received
                </span>
                <span className="text-xl font-bold text-emerald-400 font-mono">
                  ₹{Number(payment.amount).toLocaleString()}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block">
                  Payment Mode
                </span>
                <span className="text-xs font-semibold text-white">
                  {payment.payment_mode || "UPI"}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase font-mono font-bold text-slate-400 block">
                  Trader Name
                </span>
                <span className="text-xs font-semibold text-white">
                  {payment.trader_name}
                </span>
              </div>
            </div>

            {/* UTR Copy Bar */}
            <div className="p-4 bg-[#070F1B] rounded-xl border border-slate-700/80 flex items-center justify-between gap-4">
              <div>
                <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block mb-0.5">
                  Bank Reference / UTR Number
                </span>
                <span className="text-sm font-mono font-bold text-amber-300 tracking-wider">
                  {payment.utr_number || "NO_UTR_PROVIDED"}
                </span>
              </div>

              <button
                type="button"
                onClick={handleCopyUtr}
                className="py-2 px-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {copiedUtr ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-400" /> Copied UTR
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-400" /> Copy UTR
                  </>
                )}
              </button>
            </div>

            {/* Screenshot Verification Viewer */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                  Uploaded Payment Receipt Screenshot
                </label>
                <button
                  type="button"
                  onClick={() => setZoomImage(!zoomImage)}
                  className="text-xs text-blue-400 hover:text-blue-200 flex items-center gap-1"
                >
                  <ZoomIn className="w-3.5 h-3.5" />
                  {zoomImage ? "Standard View" : "Enlarge Screenshot"}
                </button>
              </div>

              <div
                className={`relative bg-[#070F1B] rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center p-3 transition-all ${
                  zoomImage ? "h-96" : "h-64"
                }`}
              >
                {payment.screenshot_url ? (
                  <img
                    src={payment.screenshot_url}
                    alt="Payment Receipt"
                    className="max-h-full max-w-full object-contain rounded-lg shadow-md"
                  />
                ) : (
                  <div className="text-center p-6 space-y-2 text-slate-500">
                    <CreditCard className="w-10 h-10 mx-auto text-slate-600" />
                    <p className="text-xs">Receipt attachment preview (Google Drive sync)</p>
                    <span className="text-[10px] font-mono text-slate-600">
                      UTR: {payment.utr_number}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Anti-Fraud Mandatory 4-Step Checklist */}
            <div className="p-5 rounded-2xl bg-[#112240] border border-slate-700/80 space-y-3.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white font-mono uppercase tracking-wide">
                  Bank Verification Checklist (4/4 Required)
                </span>
                <span
                  className={`text-[11px] font-bold font-mono px-2 py-0.5 rounded-full ${
                    allChecklistPassed
                      ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                      : "bg-slate-800 text-slate-400"
                  }`}
                >
                  {allChecklistPassed ? "All Passed ✓" : "Pending Check"}
                </span>
              </div>

              <div className="space-y-2.5">
                {[
                  {
                    id: "chk-utr",
                    label: `UTR "${payment.utr_number || 'N/A'}" verified in Bank / UPI merchant statement`,
                    checked: chkUtr,
                    setter: setChkUtr,
                  },
                  {
                    id: "chk-amt",
                    label: `Amount ₹${Number(payment.amount).toLocaleString()} exactly matches credit entry`,
                    checked: chkAmount,
                    setter: setChkAmount,
                  },
                  {
                    id: "chk-time",
                    label: `Transaction time and date match banking logs`,
                    checked: chkTime,
                    setter: setChkTime,
                  },
                  {
                    id: "chk-sender",
                    label: `Sender account name corresponds to trader "${payment.trader_name}"`,
                    checked: chkSender,
                    setter: setChkSender,
                  },
                ].map((item) => (
                  <label
                    key={item.id}
                    className="flex items-start gap-3 p-2.5 rounded-xl hover:bg-slate-800/40 cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={item.checked}
                      onChange={(e) => item.setter(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded-sm bg-[#0B192C] border-slate-600 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span className="text-xs text-slate-300 font-medium">
                      {item.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Admin Verification Remark */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                Verification Remarks / Rejection Reason
              </label>
              <textarea
                rows={2}
                value={remark}
                onChange={(e) => setRemark(e.target.value)}
                placeholder="e.g. Verified against HDFC Current A/C #4412 statement..."
                className="w-full bg-[#112240] border border-slate-700 rounded-xl p-3 text-xs text-white focus:border-emerald-500 placeholder:text-slate-600"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 bg-[#112240] border-t border-slate-800 flex items-center justify-between gap-3">
            <button
              disabled={loading}
              onClick={() => handleVerify("rejected")}
              className="py-3 px-5 bg-rose-600/20 hover:bg-rose-600/30 text-rose-300 border border-rose-500/40 text-xs font-bold rounded-xl transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <XCircle className="w-4 h-4" /> Reject (Fake / Unverified)
            </button>

            <button
              disabled={loading || !allChecklistPassed}
              onClick={() => handleVerify("approved")}
              className="flex-1 py-3 px-5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <CheckCircle2 className="w-4 h-4" />
              Approve Verified Payment (₹{Number(payment.amount).toLocaleString()})
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
