"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  PhoneCall,
  Calendar,
  Send,
  Search,
  Filter,
  ArrowUpRight,
  TrendingUp,
  Plus,
  RefreshCw,
  Clock,
} from "lucide-react";
import { KpiCard } from "@/components/shared/kpi-card";
import { StatusBadge } from "@/components/shared/status-badge";
import { LeadDetailDrawer, Lead } from "@/components/telecaller/lead-detail-drawer";
import { createClient } from "@/lib/supabase/client";

// Demo data for initial render or fallback
const initialDemoLeads: Lead[] = [
  {
    id: "lead-001",
    name: "Vikram Malhotra",
    phone: "+91 98201 44512",
    source: "Google Ads",
    status: "new",
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    telecaller_notes: "Downloaded HNI Strategy Report",
  },
  {
    id: "lead-002",
    name: "Ananya Sharma",
    phone: "+91 97110 88234",
    source: "Instagram Campaign",
    status: "called",
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
    telecaller_notes: "Asked to call back in the evening after market hours.",
    next_follow_up_at: new Date(Date.now() + 3600000 * 4).toISOString(),
  },
  {
    id: "lead-003",
    name: "Rajesh Khandelwal",
    phone: "+91 94140 12983",
    source: "Website Consultation",
    status: "interested_rm_required",
    investment_capacity: 500000,
    trading_experience: "intermediate",
    preferred_market: "Nifty Weekly Options",
    telecaller_notes: "Has 5L capital, wants dedicated RM for 1-on-1 calls.",
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: "lead-004",
    name: "Siddharth Verma",
    phone: "+91 98450 77123",
    source: "Referral",
    status: "active_trader",
    investment_capacity: 1000000,
    trading_experience: "advanced",
    preferred_market: "Futures & BankNifty",
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
  {
    id: "lead-005",
    name: "Pooja Reddy",
    phone: "+91 80080 33412",
    source: "Website Form",
    status: "follow_up_later",
    created_at: new Date(Date.now() - 3600000 * 8).toISOString(),
    next_follow_up_at: new Date(Date.now() + 3600000 * 24).toISOString(),
    telecaller_notes: "Travelling, will review advisory performance sheet on weekend.",
  },
];

const mockRms = [
  { id: "rm-101", name: "Kunal Singhania" },
  { id: "rm-102", name: "Priya Sundaram" },
];

export default function TelecallerDashboardPage() {
  const [leads, setLeads] = useState<Lead[]>(initialDemoLeads);
  const [rms, setRms] = useState<{ id: string; name: string }[]>(mockRms);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (data && data.length > 0) {
        setLeads(data);
      }

      // Fetch active RMs
      const { data: rmData } = await supabase
        .from("users")
        .select("id, name")
        .eq("role", "relationship_manager");

      if (rmData && rmData.length > 0) {
        setRms(rmData);
      }
    } catch {
      // Fallback demo state is preserved
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  // Filtered Leads
  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery) ||
      (lead.telecaller_notes && lead.telecaller_notes.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesStatus && matchesSearch;
  });

  // Calculate Metrics
  const leadsTodayCount = leads.length;
  const forwardedCount = leads.filter((l) => l.status === "interested_rm_required" || l.status === "active_trader").length;
  const convertedCount = leads.filter((l) => l.status === "active_trader").length;
  const followUpCount = leads.filter((l) => l.status === "follow_up_later" || l.status === "called").length;

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
            Telecaller Pipeline Desk
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Manage your daily calling queue, record client feedback, and qualify leads for RM assignment.
          </p>
        </div>

        <button
          onClick={fetchLeads}
          className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 bg-[#112240] hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-xl text-xs font-semibold transition-all cursor-pointer"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh Pipeline
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Assigned Leads"
          value={leadsTodayCount}
          subtitle="Total allocated leads"
          icon={Users}
          variant="teal"
        />
        <KpiCard
          title="Forwarded to RM"
          value={forwardedCount}
          subtitle="Qualified high-intent leads"
          icon={Send}
          variant="blue"
        />
        <KpiCard
          title="Converted Traders"
          value={convertedCount}
          subtitle="Activated trading accounts"
          icon={TrendingUp}
          variant="emerald"
        />
        <KpiCard
          title="Follow-Up Queue"
          value={followUpCount}
          subtitle="Scheduled callbacks"
          icon={Clock}
          variant="amber"
        />
      </div>

      {/* Main Table Card */}
      <div className="bg-[#112240] rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        {/* Filter and Search Bar */}
        <div className="p-5 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: "All Leads" },
              { id: "new", label: "New" },
              { id: "called", label: "Called" },
              { id: "follow_up_later", label: "Follow Up" },
              { id: "interested_rm_required", label: "RM Required" },
              { id: "active_trader", label: "Active Trader" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setStatusFilter(tab.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  statusFilter === tab.id
                    ? "bg-teal-500 text-black font-bold shadow-xs"
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
              placeholder="Search by name, phone..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0B192C] border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white placeholder:text-slate-500 focus:outline-hidden focus:border-teal-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B192C] text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-5">Lead Name</th>
                <th className="py-3.5 px-5">Contact</th>
                <th className="py-3.5 px-5">Source</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5">Notes / Qualification</th>
                <th className="py-3.5 px-5">Next Follow-up</th>
                <th className="py-3.5 px-5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300 font-sans">
              {filteredLeads.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-500">
                    No leads found matching your criteria.
                  </td>
                </tr>
              ) : (
                filteredLeads.map((lead) => (
                  <tr
                    key={lead.id}
                    className="hover:bg-slate-800/30 transition-colors group cursor-pointer"
                    onClick={() => {
                      setSelectedLead(lead);
                      setDrawerOpen(true);
                    }}
                  >
                    <td className="py-4 px-5">
                      <div className="font-bold text-white group-hover:text-teal-400 transition-colors">
                        {lead.name}
                      </div>
                      <div className="text-[10px] text-slate-500 font-mono">
                        {new Date(lead.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                    </td>
                    <td className="py-4 px-5 font-mono text-slate-300">
                      {lead.phone}
                    </td>
                    <td className="py-4 px-5 text-slate-400">
                      {lead.source || "Website"}
                    </td>
                    <td className="py-4 px-5">
                      <StatusBadge status={lead.status} size="sm" />
                    </td>
                    <td className="py-4 px-5 max-w-xs truncate text-slate-400">
                      {lead.telecaller_notes || (
                        <span className="text-slate-600 italic">No notes yet</span>
                      )}
                    </td>
                    <td className="py-4 px-5 font-mono text-slate-400">
                      {lead.next_follow_up_at ? (
                        <span className="text-amber-400 flex items-center gap-1 font-semibold">
                          <Calendar className="w-3 h-3" />
                          {new Date(lead.next_follow_up_at).toLocaleDateString([], { month: "short", day: "numeric" })}
                        </span>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="py-4 px-5 text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedLead(lead);
                          setDrawerOpen(true);
                        }}
                        className="py-1.5 px-3 bg-teal-500/10 hover:bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-lg text-xs font-semibold transition-all inline-flex items-center gap-1"
                      >
                        Manage <ArrowUpRight className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Detail & Action Drawer */}
      <LeadDetailDrawer
        lead={selectedLead}
        rms={rms}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onLeadUpdated={fetchLeads}
      />
    </div>
  );
}
