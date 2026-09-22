"use client";

import React, { useState, useEffect } from "react";
import { TrendingUp, Search, Flame, RefreshCw } from "lucide-react";
import { ActiveTrader } from "@/app/rm/dashboard/page";
import { createClient } from "@/lib/supabase/client";

const demoAllTraders: ActiveTrader[] = [
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

export default function AdminTradersPage() {
  const [traders, setTraders] = useState<ActiveTrader[]>(demoAllTraders);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const supabase = createClient();

  const fetchTraders = async () => {
    setLoading(true);
    try {
      const { data } = await supabase
        .from("active_traders")
        .select("*")
        .order("total_profit_shared", { ascending: false });

      if (data && data.length > 0) {
        setTraders(data);
      }
    } catch {
      // Fallback
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTraders();
  }, []);

  const filtered = traders.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
            Active Traders Portfolio
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Real-time tracking of active clients, cumulative P&L gains, profit-sharing compliance, and streaks.
          </p>
        </div>

        <button
          onClick={fetchTraders}
          className="flex items-center gap-2 px-4 py-2 bg-[#112240] hover:bg-slate-800 border border-slate-700 text-slate-300 rounded-xl text-xs font-semibold"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${loading ? "animate-spin" : ""}`} />
          Refresh Traders
        </button>
      </div>

      <div className="bg-[#112240] rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="p-5 border-b border-slate-800 flex justify-between items-center">
          <h3 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
            All Active Trading Desks ({filtered.length})
          </h3>

          <div className="relative w-64">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search trader..."
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
                <th className="py-3.5 px-5">Trader</th>
                <th className="py-3.5 px-5">Phone</th>
                <th className="py-3.5 px-5">Total Profit Generated</th>
                <th className="py-3.5 px-5">Profit Shared (30%)</th>
                <th className="py-3.5 px-5">Winning Streak</th>
                <th className="py-3.5 px-5">Last Share Date</th>
                <th className="py-3.5 px-5">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {filtered.map((trader) => (
                <tr key={trader.id} className="hover:bg-slate-800/30">
                  <td className="py-4 px-5 font-bold text-white">{trader.name}</td>
                  <td className="py-4 px-5 font-mono text-slate-300">{trader.phone}</td>
                  <td className="py-4 px-5 font-mono font-bold text-emerald-400">
                    ₹{trader.total_profit_gained.toLocaleString()}
                  </td>
                  <td className="py-4 px-5 font-mono font-bold text-amber-400">
                    ₹{trader.total_profit_shared.toLocaleString()}
                  </td>
                  <td className="py-4 px-5">
                    <span className="inline-flex items-center gap-1 bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full text-xs font-bold font-mono">
                      <Flame className="w-3 h-3 fill-amber-400" /> {trader.current_streak} days
                    </span>
                  </td>
                  <td className="py-4 px-5 font-mono text-slate-400">
                    {trader.last_profit_share_date || "—"}
                  </td>
                  <td className="py-4 px-5">
                    <span className="text-emerald-400 text-xs font-semibold">● Active</span>
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
