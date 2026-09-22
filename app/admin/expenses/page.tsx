"use client";

import React, { useState } from "react";
import { Receipt, Plus, DollarSign, Calendar, Tag, FileText } from "lucide-react";

interface Expense {
  id: string;
  category: string;
  amount: number;
  description: string;
  date: string;
}

const initialExpenses: Expense[] = [
  {
    id: "exp-01",
    category: "Software & API",
    amount: 18500,
    description: "Bloomberg / NSE Realtime Datafeed Subscription",
    date: "2026-08-01",
  },
  {
    id: "exp-02",
    category: "Marketing",
    amount: 32000,
    description: "Meta & Google Ads Campaign for Advisory Leads",
    date: "2026-08-05",
  },
  {
    id: "exp-03",
    category: "Operational",
    amount: 14500,
    description: "Telecaller VoIP Trunk & CRM Infrastructure",
    date: "2026-08-10",
  },
];

export default function AdminExpensesPage() {
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [category, setCategory] = useState("Marketing");
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [modalOpen, setModalOpen] = useState(false);

  const totalExpense = expenses.reduce((acc, curr) => acc + curr.amount, 0);

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || !description) return;

    const newExp: Expense = {
      id: `exp-${Date.now()}`,
      category,
      amount: parseFloat(amount),
      description,
      date,
    };

    setExpenses([newExp, ...expenses]);
    setAmount("");
    setDescription("");
    setModalOpen(false);
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight font-heading">
            Operational Expenses & P&L
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Track business operating costs, marketing spends, and infrastructure expenses to calculate net profitability.
          </p>
        </div>

        <button
          onClick={() => setModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl text-xs shadow-lg shadow-amber-500/20 transition-all cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Log New Expense
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#112240] p-5 rounded-2xl border border-slate-800 space-y-1">
          <p className="text-xs font-mono font-bold text-slate-400 uppercase">
            Total Logged Expenses (Month)
          </p>
          <h3 className="text-2xl font-bold text-rose-400 font-mono">
            ₹{totalExpense.toLocaleString()}
          </h3>
        </div>
        <div className="bg-[#112240] p-5 rounded-2xl border border-slate-800 space-y-1">
          <p className="text-xs font-mono font-bold text-slate-400 uppercase">
            Total Operational Categories
          </p>
          <h3 className="text-2xl font-bold text-white font-mono">
            3 Active Categories
          </h3>
        </div>
      </div>

      <div className="bg-[#112240] rounded-2xl border border-slate-800 shadow-xl overflow-hidden">
        <div className="p-5 border-b border-slate-800">
          <h3 className="text-xs font-mono font-bold uppercase text-white tracking-wider">
            Expense Ledger ({expenses.length})
          </h3>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#0B192C] text-slate-400 font-mono uppercase text-[11px] border-b border-slate-800">
              <tr>
                <th className="py-3.5 px-5">Date</th>
                <th className="py-3.5 px-5">Category</th>
                <th className="py-3.5 px-5">Description</th>
                <th className="py-3.5 px-5 text-right">Amount (₹)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-slate-300">
              {expenses.map((exp) => (
                <tr key={exp.id} className="hover:bg-slate-800/30">
                  <td className="py-4 px-5 font-mono text-slate-400">{exp.date}</td>
                  <td className="py-4 px-5">
                    <span className="bg-slate-800 text-slate-300 px-2.5 py-1 rounded-md text-[11px] font-semibold">
                      {exp.category}
                    </span>
                  </td>
                  <td className="py-4 px-5 text-white font-medium">{exp.description}</td>
                  <td className="py-4 px-5 font-mono font-bold text-rose-400 text-right text-sm">
                    ₹{exp.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/80 backdrop-blur-xs" onClick={() => setModalOpen(false)} />
          <div className="relative bg-[#0B192C] border border-slate-700 rounded-2xl w-full max-w-md p-6 space-y-4 z-10 shadow-2xl">
            <h3 className="text-base font-bold text-white font-heading">Record New Expense</h3>
            <form onSubmit={handleAddExpense} className="space-y-3">
              <div>
                <label className="text-xs text-slate-300 block mb-1">Category</label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full bg-[#112240] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="Marketing">Marketing / Ads</option>
                  <option value="Software & API">Software & Datafeeds</option>
                  <option value="Operational">Operational / Office</option>
                  <option value="Staff Salaries">Staff / Commissions</option>
                </select>
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Amount (₹)</label>
                <input
                  required
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="e.g. 15000"
                  className="w-full bg-[#112240] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Description</label>
                <input
                  required
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g. Google Search Ads Campaign"
                  className="w-full bg-[#112240] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 block mb-1">Date</label>
                <input
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full bg-[#112240] border border-slate-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 text-xs text-slate-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 text-black font-bold text-xs rounded-xl"
                >
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
