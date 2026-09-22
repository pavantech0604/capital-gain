"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  TrendingUp,
  DollarSign,
  Send,
  ExternalLink,
  Flame,
  CheckCircle2,
  XCircle,
  Clock,
  Phone,
  FileSpreadsheet,
  Plus,
  RefreshCw,
  HelpCircle,
} from "lucide-react";
import { KpiCard } from "@/components/shared/kpi-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { Lead } from "@/components/telecaller/lead-detail-drawer";
import { ConvertTraderModal } from "@/components/rm/convert-trader-modal";
import { createClient } from "@/lib/supabase/client";

export interface ActiveTrader {
  id: string;
  name: string;
  phone: string;
  total_profit_gained: number;
  total_profit_shared: number;
  current_streak: number;
  last_trade_date: string;
  last_profit_share_date?: string;
  status: string;
}

const demoRmLeads: Lead[] = [
  {
    id: "lead-rm-1",
    name: "Rajesh Khandelwal",
    phone: "+91 94140 12983",
    source: "Website Consultation",
    status: "interested_rm_required",
    investment_capacity: 500000,
    trading_experience: "intermediate",
    preferred_market: "Nifty Weekly Options",
    telecaller_notes: "Has 5L capital, wants dedicated RM for 1-on-1 calls. Very high intent.",
    created_at: new Date(Date.now() - 3600000 * 14).toISOString(),
  },
  {
    id: "lead-rm-2",
    name: "Harish Venkat",
    phone: "+91 98401 55672",
    source: "HNI Inbound",
    status: "rm_contacted",
    investment_capacity: 1500000,
    trading_experience: "advanced",
    preferred_market: "BankNifty Futures & Positional",
    telecaller_notes: "Managing 15L portfolio. Asked for RM strategy explanation call at 4 PM.",
    rm_notes: "Initial strategy call conducted. Account setup in progress.",
    created_at: new Date(Date.now() - 3600000 * 28).toISOString(),
  },
];

const demoActiveTraders: ActiveTrader[] = [
  {
    id: "trader-01",
    name: "Siddharth Verma",
    phone: "+91 98450 77123",
    total_profit_gained: 245000,
    total_profit_shared: 73500,
    current_streak: 6,
    last_trade_date: "2026-08-19",
    last_profit_share_date: "2026-08-18",
    status: "active",
  },
  {
    id: "trader-02",
    name: "Amitabh Sen",
    phone: "+91 98300 22345",
    total_profit_gained: 180000,
    total_profit_shared: 54000,
    current_streak: 4,
    last_trade_date: "2026-08-19",
    last_profit_share_date: "2026-08-16",
    status: "active",
  },
  {
    id: "trader-03",
    name: "Ritu Kapoor",
    phone: "+91 99100 88912",
    total_profit_gained: 95000,
    total_profit_shared: 28500,
    current_streak: 3,
    last_trade_date: "2026-08-17",
    last_profit_share_date: "2026-08-15",
    status: "active",
  },
];

export default function RmDashboardPage() {
  const [activeTab, setActiveTab] = useState<"leads" | "traders" | "upload">("leads");
  const [leads, setLeads] = useState<Lead[]>(demoRmLeads);
  const [traders, setTraders] = useState<ActiveTrader[]>(demoActiveTraders);
  const [selectedLeadForConvert, setSelectedLeadForConvert] = useState<Lead | null>(null);
  const [convertModalOpen, setConvertModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  const fetchData = async () => {
    setLoading(true);
    try {
      // 1. Fetch leads for RM
      const { data: leadData } = await supabase
        .from("leads")
        .select("*")
        .in("status", ["interested_rm_required", "rm_contacted"])
        .order("created_at", { ascending: false });

      if (leadData && leadData.length > 0) {
        setLeads(leadData);
      }

      // 2. Fetch active traders
      const { data: traderData } = await supabase
        .from("active_traders")
        .select("*")
        .order("total_profit_shared", { ascending: false });

      if (traderData && traderData.length > 0) {
        setTraders(traderData);
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Update lead status
  const handleMarkContacted = async (leadId: string) => {
    setLeads((prev) =>
      prev.map((l) => (l.id === leadId ? { ...l, status: "rm_contacted" } : l))
    );
    await supabase.from("leads").update({ status: "rm_contacted" }).eq("id", leadId);
  };

  const handleMarkLost = async (leadId: string) => {
    setLeads((prev) => prev.filter((l) => l.id !== leadId));
    await supabase.from("leads").update({ status: "lost" }).eq("id", leadId);
  };

  // Metrics
  const pendingRmLeadsCount = leads.filter(
    (l) => l.status === "interested_rm_required" || l.status === "rm_contacted"
  ).length;
  const activeTradersCount = traders.length;
  const totalProfitSharedSum = traders.reduce(
    (acc, curr) => acc + Number(curr.total_profit_shared || 0),
    0
  );

  const googleFormUrl =
    "https://docs.google.com/forms/d/e/1FAIpQLScMockGoogleFormCapitalGrowProfitUpload/viewform";

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
            Relationship Manager Desk
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Convert qualified leads, monitor portfolio P&L, and upload client profit-sharing proof for verification.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchData}
            className="flex items-center gap-2 px-4 py-2 bg-[#112240] hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-all cursor-pointer"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
            Refresh Desk
          </button>
          
          <a
            href={googleFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-600/20 transition-all cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            Upload Profit Received
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <KpiCard
          title="Leads Pending RM Action"
          value={pendingRmLeadsCount}
          subtitle="Forwarded from telecallers"
          icon={Users}
          variant="blue"
        />
        <KpiCard
          title="My Active Traders"
          value={activeTradersCount}
          subtitle="Live trading accounts under desk"
          icon={TrendingUp}
          variant="emerald"
        />
        <KpiCard
          title="Total Profit Received"
          value={`₹${totalProfitSharedSum.toLocaleString()}`}
          subtitle="From verified profit-sharing"
          icon={DollarSign}
          variant="gold"
        />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800 gap-6 text-sm font-semibold">
        <button
          onClick={() => setActiveTab("leads")}
          className={`pb-3 relative transition-colors cursor-pointer ${
            activeTab === "leads"
              ? "text-blue-400 font-bold"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Leads for RM ({leads.length})
          {activeTab === "leads" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-500 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("traders")}
          className={`pb-3 relative transition-colors cursor-pointer ${
            activeTab === "traders"
              ? "text-emerald-400 font-bold"
              : "text-slate-400 hover:text-white"
          }`}
        >
          My Active Traders ({traders.length})
          {activeTab === "traders" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500 rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab("upload")}
          className={`pb-3 relative transition-colors cursor-pointer ${
            activeTab === "upload"
              ? "text-amber-400 font-bold"
              : "text-slate-400 hover:text-white"
          }`}
        >
          Upload Profit (Google Form)
          {activeTab === "upload" && (
            <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-amber-500 rounded-full" />
          )}
        </button>
      </div>

      {/* Tab 1: Leads for RM */}
      {activeTab === "leads" && (
        <div className="space-y-4">
          {leads.length === 0 ? (
            <div className="p-12 text-center bg-[#112240] rounded-2xl border border-slate-800 text-slate-400">
              No pending leads requiring RM action. Check back later.
            </div>
          ) : (
            leads.map((lead) => (
              <div
                key={lead.id}
                className="bg-[#112240] rounded-2xl border border-slate-800 p-6 space-y-4 shadow-lg hover:border-slate-700 transition-all"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800/80 pb-4">
                  <div>
                    <div className="flex items-center gap-2.5">
                      <h3 className="text-lg font-bold text-white font-heading">{lead.name}</h3>
                      <StatusBadge status={lead.status} size="sm" />
                    </div>
                    <p className="text-xs text-slate-400 font-mono mt-0.5">
                      Contact: {lead.phone} • Forwarded on {new Date(lead.created_at).toLocaleDateString()}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <a
                      href={`tel:${lead.phone}`}
                      className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5" /> Call Lead
                    </a>
                    {lead.status !== "rm_contacted" && (
                      <button
                        onClick={() => handleMarkContacted(lead.id)}
                        className="px-3.5 py-1.5 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                      >
                        Mark Contacted
                      </button>
                    )}
                    <button
                      onClick={() => {
                        setSelectedLeadForConvert(lead);
                        setConvertModalOpen(true);
                      }}
                      className="px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold shadow-md shadow-emerald-600/20 transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <TrendingUp className="w-3.5 h-3.5" /> Convert to Active Trader
                    </button>
                    <button
                      onClick={() => handleMarkLost(lead.id)}
                      className="p-1.5 text-slate-500 hover:text-red-400 rounded-lg"
                      title="Mark as Lost"
                    >
                      <XCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Telecaller Captured Details */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 bg-[#0B192C] p-4 rounded-xl border border-slate-800">
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold text-slate-500 block">
                      Investment Capital
                    </span>
                    <span className="text-sm font-bold text-emerald-400 font-mono">
                      ₹{Number(lead.investment_capacity || 0).toLocaleString()}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold text-slate-500 block">
                      Experience
                    </span>
                    <span className="text-xs font-semibold text-slate-300 capitalize">
                      {lead.trading_experience || "Intermediate"}
                    </span>
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-mono font-bold text-slate-500 block">
                      Preferred Market
                    </span>
                    <span className="text-xs font-semibold text-purple-300">
                      {lead.preferred_market || "Nifty / Options"}
                    </span>
                  </div>
                </div>

                {lead.telecaller_notes && (
                  <div className="text-xs text-slate-300 bg-slate-900/50 p-3 rounded-lg border border-slate-800/80">
                    <span className="text-teal-400 font-bold font-mono mr-2">Telecaller Notes:</span>
                    {lead.telecaller_notes}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}

      {/* Tab 2: My Active Traders */}
      {activeTab === "traders" && (
        <div className="bg-[#112240] rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#0B192C] text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
                <tr>
                  <th className="py-3.5 px-5">Trader Name</th>
                  <th className="py-3.5 px-5">Phone</th>
                  <th className="py-3.5 px-5">Profit Gained</th>
                  <th className="py-3.5 px-5">Profit Shared (30%)</th>
                  <th className="py-3.5 px-5">Streak</th>
                  <th className="py-3.5 px-5">Last Share Date</th>
                  <th className="py-3.5 px-5 text-right">Profit Form Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-slate-300 font-sans">
                {traders.map((trader) => (
                  <tr key={trader.id} className="hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-5">
                      <div className="font-bold text-white">{trader.name}</div>
                      <span className="text-[10px] text-emerald-400 font-mono">Live Advisory</span>
                    </td>
                    <td className="py-4 px-5 font-mono text-slate-300">{trader.phone}</td>
                    <td className="py-4 px-5 font-mono font-bold text-emerald-400">
                      ₹{trader.total_profit_gained.toLocaleString()}
                    </td>
                    <td className="py-4 px-5 font-mono font-bold text-amber-400">
                      ₹{trader.total_profit_shared.toLocaleString()}
                    </td>
                    <td className="py-4 px-5 font-mono">
                      <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full text-xs font-bold">
                        <Flame className="w-3 h-3 fill-amber-400" /> {trader.current_streak} days
                      </span>
                    </td>
                    <td className="py-4 px-5 font-mono text-slate-400">
                      {trader.last_profit_share_date || "—"}
                    </td>
                    <td className="py-4 px-5 text-right">
                      <a
                        href={`${googleFormUrl}?entry.trader=${encodeURIComponent(
                          trader.name
                        )}&entry.phone=${encodeURIComponent(trader.phone)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-1.5 px-3 bg-blue-500/10 hover:bg-blue-500/20 text-blue-300 border border-blue-500/30 rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-1"
                      >
                        Upload Profit <ExternalLink className="w-3 h-3" />
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab 3: Upload Profit Form info */}
      {activeTab === "upload" && (
        <div className="bg-[#112240] rounded-2xl border border-slate-800 p-8 max-w-2xl space-y-6 shadow-xl">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl text-blue-400">
              <FileSpreadsheet className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white font-heading">
                Client Profit-Share Upload Gateway
              </h2>
              <p className="text-xs text-slate-400">
                Official Google Form linked automatically to Excel (OneDrive/SharePoint) & Admin Verification.
              </p>
            </div>
          </div>

          <div className="space-y-3 bg-[#0B192C] p-5 rounded-xl border border-slate-800 text-xs text-slate-300 leading-relaxed">
            <h4 className="font-bold text-white font-mono uppercase text-[11px]">
              Mandatory Fields in Google Form:
            </h4>
            <ul className="list-disc pl-4 space-y-1.5 text-slate-400">
              <li>Trader Name & Phone number</li>
              <li>Profit Amount Shared (₹)</li>
              <li>Payment Mode (UPI, IMPS, NEFT)</li>
              <li>Bank UTR / Transaction Reference ID (Mandatory)</li>
              <li>Transaction Date & Timestamp</li>
              <li>Payment Screenshot (Required upload)</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={googleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-3 px-6 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-blue-600/20 text-center flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              Open Google Form <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        </div>
      )}

      {/* Convert Modal */}
      <ConvertTraderModal
        lead={selectedLeadForConvert}
        isOpen={convertModalOpen}
        onClose={() => setConvertModalOpen(false)}
        onSuccess={fetchData}
      />
    </div>
  );
}
