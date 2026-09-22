"use client";

import React, { useState } from "react";
import { X, CheckCircle2, TrendingUp, ShieldCheck, DollarSign, Calendar } from "lucide-react";
import { Lead } from "@/components/telecaller/lead-detail-drawer";
import { createClient } from "@/lib/supabase/client";

interface ConvertTraderModalProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ConvertTraderModal({
  lead,
  isOpen,
  onClose,
  onSuccess,
}: ConvertTraderModalProps) {
  const [initialCapital, setInitialCapital] = useState(
    lead?.investment_capacity?.toString() || "200000"
  );
  const [traderName, setTraderName] = useState(lead?.name || "");
  const [traderPhone, setTraderPhone] = useState(lead?.phone || "");
  const [strategyTier, setStrategyTier] = useState("High Alpha Intraday & Options");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  React.useEffect(() => {
    if (lead) {
      setTraderName(lead.name);
      setTraderPhone(lead.phone);
      setInitialCapital(lead.investment_capacity?.toString() || "200000");
    }
  }, [lead]);

  if (!isOpen || !lead) return null;

  const supabase = createClient();

  const handleConvert = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();

      // 1. Insert into active_traders
      const { data: traderData, error: traderError } = await supabase
        .from("active_traders")
        .insert({
          lead_id: lead.id,
          rm_assigned_to: user?.id || null,
          name: traderName,
          phone: traderPhone,
          total_profit_gained: 0,
          total_profit_shared: 0,
          current_streak: 0,
          last_trade_date: new Date().toISOString().split("T")[0],
          status: "active",
        })
        .select()
        .single();

      // 2. Update lead status to 'active_trader'
      await supabase
        .from("leads")
        .update({
          status: "active_trader",
          rm_notes: `Activated as live trader on ${new Date().toLocaleDateString()}. Initial capital: ₹${initialCapital}`,
        })
        .eq("id", lead.id);

      onSuccess();
      onClose();
    } catch {
      setErrorMsg("Failed to convert lead to active trader. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative bg-[#0B192C] border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden z-10">
        {/* Header */}
        <div className="p-5 bg-[#112240] border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white font-heading">
                Activate Live Trader
              </h3>
              <p className="text-xs text-slate-400">
                Convert qualified lead into active profit-sharing desk
              </p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-white p-1 rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleConvert} className="p-6 space-y-4">
          {errorMsg && (
            <div className="p-3 bg-red-500/10 border border-red-500/30 rounded-xl text-red-300 text-xs">
              {errorMsg}
            </div>
          )}

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Trader Full Name
            </label>
            <input
              required
              type="text"
              value={traderName}
              onChange={(e) => setTraderName(e.target.value)}
              className="w-full bg-[#112240] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-300 block mb-1">
              Contact Phone Number
            </label>
            <input
              required
              type="tel"
              value={traderPhone}
              onChange={(e) => setTraderPhone(e.target.value)}
              className="w-full bg-[#112240] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-emerald-500"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Deployed Trading Capital (₹)
              </label>
              <input
                required
                type="number"
                value={initialCapital}
                onChange={(e) => setInitialCapital(e.target.value)}
                className="w-full bg-[#112240] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-emerald-500 font-mono"
              />
            </div>
            <div>
              <label className="text-xs font-semibold text-slate-300 block mb-1">
                Advisory Strategy
              </label>
              <select
                value={strategyTier}
                onChange={(e) => setStrategyTier(e.target.value)}
                className="w-full bg-[#112240] border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white focus:border-emerald-500"
              >
                <option value="High Alpha Intraday & Options">Options Intraday Desk</option>
                <option value="Positional Swing Portfolio">Positional Swing</option>
                <option value="HNI Custom Advisory">HNI Custom Desk</option>
              </select>
            </div>
          </div>

          <div className="p-3.5 bg-emerald-950/20 border border-emerald-500/30 rounded-xl text-emerald-300 text-xs space-y-1">
            <div className="flex items-center gap-1.5 font-bold">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              Automated P&L & Profit-Sharing Sync
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Once activated, this trader will appear in your RM portfolio. Profit-share receipts can be uploaded and verified against bank credits.
            </p>
          </div>

          <div className="pt-2 flex items-center justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-400 hover:text-white rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              <CheckCircle2 className="w-4 h-4" />
              Confirm & Activate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
