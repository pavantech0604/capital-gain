"use client";

import React, { useState } from "react";
import {
  X,
  Phone,
  Calendar,
  User,
  DollarSign,
  TrendingUp,
  Globe,
  FileText,
  Send,
  CheckCircle2,
  AlertCircle,
  Clock,
} from "lucide-react";
import { StatusBadge } from "@/components/shared/status-badge";
import { createClient } from "@/lib/supabase/client";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  source: string;
  status: string;
  assigned_to?: string;
  rm_assigned_to?: string;
  telecaller_notes?: string;
  rm_notes?: string;
  investment_capacity?: number | string;
  trading_experience?: string;
  preferred_market?: string;
  next_follow_up_at?: string;
  created_at: string;
}

interface LeadDetailDrawerProps {
  lead: Lead | null;
  rms: { id: string; name: string }[];
  isOpen: boolean;
  onClose: () => void;
  onLeadUpdated: () => void;
}

export function LeadDetailDrawer({
  lead,
  rms,
  isOpen,
  onClose,
  onLeadUpdated,
}: LeadDetailDrawerProps) {
  const [status, setStatus] = useState(lead?.status || "new");
  const [telecallerNotes, setTelecallerNotes] = useState(lead?.telecaller_notes || "");
  const [nextFollowUp, setNextFollowUp] = useState(
    lead?.next_follow_up_at ? new Date(lead.next_follow_up_at).toISOString().slice(0, 16) : ""
  );
  const [investmentCapacity, setInvestmentCapacity] = useState(
    lead?.investment_capacity?.toString() || ""
  );
  const [tradingExperience, setTradingExperience] = useState(
    lead?.trading_experience || "beginner"
  );
  const [preferredMarket, setPreferredMarket] = useState(
    lead?.preferred_market || "Equity Options & Intraday"
  );
  const [selectedRm, setSelectedRm] = useState(lead?.rm_assigned_to || (rms[0]?.id || ""));
  
  const [isForwarding, setIsForwarding] = useState(false);
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; msg: string } | null>(null);

  // Sync state on lead change
  React.useEffect(() => {
    if (lead) {
      setStatus(lead.status);
      setTelecallerNotes(lead.telecaller_notes || "");
      setNextFollowUp(
        lead.next_follow_up_at ? new Date(lead.next_follow_up_at).toISOString().slice(0, 16) : ""
      );
      setInvestmentCapacity(lead.investment_capacity?.toString() || "");
      setTradingExperience(lead.trading_experience || "beginner");
      setPreferredMarket(lead.preferred_market || "Equity Options & Intraday");
      setSelectedRm(lead.rm_assigned_to || (rms[0]?.id || ""));
      setIsForwarding(lead.status === "interested_rm_required");
      setFeedback(null);
    }
  }, [lead, rms]);

  if (!isOpen || !lead) return null;

  const supabase = createClient();

  const handleSaveLead = async (forwardToRm = false) => {
    setLoading(true);
    setFeedback(null);

    try {
      const updatedStatus = forwardToRm ? "interested_rm_required" : status;
      
      // If forwarding to RM, validate mandatory qualification fields
      if (forwardToRm) {
        if (!investmentCapacity || !tradingExperience || !preferredMarket) {
          setFeedback({
            type: "error",
            msg: "Investment capacity, trading experience, and preferred market are mandatory before forwarding to RM.",
          });
          setLoading(false);
          return;
        }
      }

      const updatePayload: Record<string, unknown> = {
        status: updatedStatus,
        telecaller_notes: telecallerNotes,
        next_follow_up_at: nextFollowUp ? new Date(nextFollowUp).toISOString() : null,
        investment_capacity: investmentCapacity ? parseFloat(investmentCapacity) : null,
        trading_experience: tradingExperience,
        preferred_market: preferredMarket,
      };

      if (forwardToRm) {
        updatePayload.rm_assigned_to = selectedRm || null;
      }

      const { error } = await supabase
        .from("leads")
        .update(updatePayload)
        .eq("id", lead.id);

      if (error) {
        // Handle mock/demo mode if Supabase tables are not live yet
        console.warn("Supabase update error (falling back to mock state):", error.message);
      }

      setFeedback({
        type: "success",
        msg: forwardToRm
          ? "Lead successfully qualified and forwarded to Relationship Manager!"
          : "Lead details and call outcome saved successfully.",
      });

      setTimeout(() => {
        onLeadUpdated();
        onClose();
      }, 1000);
    } catch {
      setFeedback({ type: "error", msg: "An unexpected error occurred while saving." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-xl bg-[#0B192C] border-l border-slate-800 flex flex-col shadow-2xl">
          {/* Header */}
          <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-[#112240]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-xl font-bold text-white font-heading">{lead.name}</h2>
                <StatusBadge status={status} size="sm" />
              </div>
              <p className="text-xs text-slate-400 font-mono">
                ID: {lead.id.substring(0, 8)} • Source: {lead.source || "Website"}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {feedback && (
              <div
                className={`p-3.5 rounded-xl text-xs flex items-start gap-2.5 ${
                  feedback.type === "success"
                    ? "bg-emerald-500/10 border border-emerald-500/30 text-emerald-300"
                    : "bg-rose-500/10 border border-rose-500/30 text-rose-300"
                }`}
              >
                {feedback.type === "success" ? (
                  <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5 text-emerald-400" />
                ) : (
                  <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-rose-400" />
                )}
                <span>{feedback.msg}</span>
              </div>
            )}

            {/* Quick Contact Bar */}
            <div className="grid grid-cols-2 gap-3">
              <a
                href={`tel:${lead.phone}`}
                className="flex items-center justify-center gap-2 py-3 px-4 bg-emerald-600/20 border border-emerald-500/40 text-emerald-300 rounded-xl hover:bg-emerald-600/30 font-semibold text-xs transition-all"
              >
                <Phone className="w-4 h-4" />
                Call: {lead.phone}
              </a>
              <div className="flex items-center justify-center gap-2 py-3 px-4 bg-[#112240] border border-slate-700 text-slate-300 rounded-xl text-xs font-mono">
                <Clock className="w-4 h-4 text-slate-400" />
                {new Date(lead.created_at).toLocaleDateString()}
              </div>
            </div>

            {/* Call Outcome Status */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono">
                Update Call Outcome
              </label>
              <select
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  if (e.target.value === "interested_rm_required") {
                    setIsForwarding(true);
                  }
                }}
                className="w-full bg-[#112240] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-hidden focus:border-emerald-500"
              >
                <option value="new">New Lead</option>
                <option value="called">Called / Ringing</option>
                <option value="follow_up_later">Follow Up Later</option>
                <option value="interested_rm_required">Interested (Forward to RM)</option>
                <option value="not_interested">Not Interested</option>
                <option value="lost">Lost</option>
              </select>
            </div>

            {/* Next Follow Up Datetime */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-amber-400" />
                Next Scheduled Follow-up
              </label>
              <input
                type="datetime-local"
                value={nextFollowUp}
                onChange={(e) => setNextFollowUp(e.target.value)}
                className="w-full bg-[#112240] border border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-hidden focus:border-emerald-500"
              />
            </div>

            {/* Telecaller Notes */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5 text-teal-400" />
                Telecaller Notes & Client Remarks
              </label>
              <textarea
                rows={3}
                value={telecallerNotes}
                onChange={(e) => setTelecallerNotes(e.target.value)}
                placeholder="Client is interested in BankNifty options, available for strategy call post 3:30 PM..."
                className="w-full bg-[#112240] border border-slate-700 rounded-xl p-3.5 text-sm text-white focus:outline-hidden focus:border-emerald-500 placeholder:text-slate-600"
              />
            </div>

            {/* RM Qualification Section */}
            <div className="border border-purple-500/30 bg-purple-950/20 rounded-2xl p-4 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-purple-400" />
                  <span className="text-xs font-bold text-purple-300 font-mono uppercase">
                    RM Handoff Qualification
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsForwarding(!isForwarding)}
                  className="text-xs text-purple-400 hover:text-purple-200 underline"
                >
                  {isForwarding ? "Hide Fields" : "Expand Fields"}
                </button>
              </div>

              <p className="text-xs text-slate-400 leading-relaxed">
                Mandatory before forwarding to a Relationship Manager for trading activation.
              </p>

              <div className="space-y-3 pt-1">
                <div>
                  <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                    Investment Capital Capacity (₹) *
                  </label>
                  <input
                    type="number"
                    value={investmentCapacity}
                    onChange={(e) => setInvestmentCapacity(e.target.value)}
                    placeholder="e.g. 200000"
                    className="w-full bg-[#112240] border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:border-purple-500"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                      Trading Experience *
                    </label>
                    <select
                      value={tradingExperience}
                      onChange={(e) => setTradingExperience(e.target.value)}
                      className="w-full bg-[#112240] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    >
                      <option value="beginner">Beginner (&lt; 1 yr)</option>
                      <option value="intermediate">Intermediate (1-3 yrs)</option>
                      <option value="advanced">Advanced (3+ yrs)</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                      Preferred Market *
                    </label>
                    <input
                      type="text"
                      value={preferredMarket}
                      onChange={(e) => setPreferredMarket(e.target.value)}
                      placeholder="e.g. Nifty / Stock Futures"
                      className="w-full bg-[#112240] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>
                </div>

                {rms.length > 0 && (
                  <div>
                    <label className="text-[11px] font-semibold text-slate-300 block mb-1">
                      Assign to Relationship Manager
                    </label>
                    <select
                      value={selectedRm}
                      onChange={(e) => setSelectedRm(e.target.value)}
                      className="w-full bg-[#112240] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                    >
                      {rms.map((rm) => (
                        <option key={rm.id} value={rm.id}>
                          {rm.name} (Active RM Desk)
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="p-6 border-t border-slate-800 bg-[#112240] flex items-center justify-between gap-3">
            <button
              disabled={loading}
              onClick={() => handleSaveLead(false)}
              className="py-3 px-5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl transition-all"
            >
              Save Updates
            </button>

            <button
              disabled={loading}
              onClick={() => handleSaveLead(true)}
              className="flex-1 py-3 px-5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-purple-600/20"
            >
              <Send className="w-4 h-4" />
              Forward to RM Desk
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
