"use client";

import React, { useState, useEffect } from "react";
import { Users, Search, Filter, RefreshCw, ArrowUpRight, Calendar } from "lucide-react";
import { StatusBadge } from "@/components/shared/status-badge";
import { Lead } from "@/components/telecaller/lead-detail-drawer";
import { createClient } from "@/lib/supabase/client";

const demoAllLeads: Lead[] = [
  {
    id: "lead-a1",
    name: "Vikram Malhotra",
    phone: "+91 98201 44512",
    source: "Google Ads",
    status: "new",
    created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    telecaller_notes: "Downloaded HNI Strategy Report",
  },
  {
    id: "lead-a2",
    name: "Rajesh Khandelwal",
    phone: "+91 94140 12983",
    source: "Website Consultation",
    status: "interested_rm_required",
    investment_capacity: 500000,
    trading_experience: "intermediate",
    preferred_market: "Nifty Weekly Options",
    telecaller_notes: "Has 5L capital, forwarded to RM Kunal",
    created_at: new Date(Date.now() - 3600000 * 12).toISOString(),
  },
  {
    id: "lead-a3",
    name: "Siddharth Verma",
    phone: "+91 98450 77123",
    source: "Referral",
    status: "active_trader",
    investment_capacity: 1000000,
    trading_experience: "advanced",
    preferred_market: "BankNifty Futures",
    created_at: new Date(Date.now() - 3600000 * 48).toISOString(),
  },
  {
    id: "lead-a4",
    name: "Ananya Sharma",
    phone: "+91 97110 88234",
    source: "Instagram Campaign",
    status: "called",
    created_at: new Date(Date.now() - 3600000 * 5).toISOString(),
    next_follow_up_at: new Date(Date.now() + 3600000 * 4).toISOString(),
  },
];

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>(demoAllLeads);
  const [statusFilter, setStatusFilter] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  const fetchLeads = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });

      if (data && data.length > 0) {
        setLeads(data);
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, []);

  const filteredLeads = leads.filter((lead) => {
    const matchesStatus = statusFilter === "all" || lead.status === statusFilter;
    const matchesSearch =
      lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      lead.phone.includes(searchQuery);
    return matchesStatus && matchesSearch;
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
            Global Leads Master
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Complete database of all leads, source attribution, assigned telecallers, and RM status.
          </p>
        </div>

        <button
          onClick={fetchLeads}
          className="flex items-center gap-2 px-4 py-2 bg-[#112240] hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh Leads
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-[#112240] rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {["all", "new", "called", "interested_rm_required", "active_trader", "lost"].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold capitalize ${
                  statusFilter === st
                    ? "bg-amber-500 text-black font-bold"
                    : "text-slate-400 hover:text-white bg-slate-800/40"
                }`}
              >
                {st.replace(/_/g, " ")}
              </button>
            ))}
          </div>

          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#0B192C] border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs text-white"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B192C] text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-5">Lead Details</th>
                <th className="py-3.5 px-5">Contact</th>
                <th className="py-3.5 px-5">Source</th>
                <th className="py-3.5 px-5">Status</th>
                <th className="py-3.5 px-5">Capital Capacity</th>
                <th className="py-3.5 px-5">Created At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300 font-sans">
              {filteredLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-slate-800/30">
                  <td className="py-4 px-5">
                    <div className="font-bold text-white">{lead.name}</div>
                    <div className="text-[10px] text-slate-400">{lead.preferred_market || "Equity"}</div>
                  </td>
                  <td className="py-4 px-5 font-mono text-slate-300">{lead.phone}</td>
                  <td className="py-4 px-5 text-slate-400">{lead.source}</td>
                  <td className="py-4 px-5">
                    <StatusBadge status={lead.status} size="sm" />
                  </td>
                  <td className="py-4 px-5 font-mono font-bold text-emerald-400">
                    {lead.investment_capacity ? `₹${Number(lead.investment_capacity).toLocaleString()}` : "—"}
                  </td>
                  <td className="py-4 px-5 font-mono text-slate-400">
                    {new Date(lead.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
