"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock, ShieldCheck, Mail, ArrowLeft, CheckCircle2 } from "lucide-react";
import { BRAND } from "@/lib/constants";

export default function PendingApprovalPage() {
  return (
    <main className="min-h-screen bg-[#070F1B] text-slate-100 flex items-center justify-center p-4 sm:p-6 font-sans relative overflow-hidden">
      {/* Background glow decorative effects */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full relative z-10 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-emerald-500 shadow-xl shadow-blue-500/20 mb-2 border border-white/10">
            <ShieldCheck className="w-7 h-7 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white uppercase font-heading">
            Capital <span className="text-emerald-400">Grow</span>
          </h1>
          <p className="text-xs font-mono text-slate-400 uppercase tracking-widest font-semibold">
            Employee Security Gateway
          </p>
        </div>

        {/* Card */}
        <div className="bg-[#112240]/90 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-black/60 text-center space-y-6">
          <div className="w-16 h-16 rounded-3xl bg-amber-500/10 border border-amber-500/30 text-amber-400 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/10">
            <Clock className="w-8 h-8 animate-pulse" />
          </div>

          <div className="space-y-2">
            <h2 className="text-xl font-bold text-white font-heading">
              Application Under Review
            </h2>
            <p className="text-xs text-slate-300 leading-relaxed">
              Your employee registration has been securely received. An administrator is reviewing your account to assign your operational role (Admin, Telecaller, or Relationship Manager).
            </p>
          </div>

          {/* Onboarding Stages */}
          <div className="bg-[#0B192C] p-4 rounded-2xl border border-slate-800 space-y-3 text-left">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="text-xs text-slate-300">Registration credentials received</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full border-2 border-amber-400 border-t-transparent animate-spin shrink-0" />
              <span className="text-xs text-amber-300 font-semibold">
                Admin role assignment & verification
              </span>
            </div>
            <div className="flex items-center gap-3 opacity-50">
              <div className="w-4 h-4 rounded-full bg-slate-700 shrink-0" />
              <span className="text-xs text-slate-400">Dashboard workspace activation</span>
            </div>
          </div>

          {/* Support desk */}
          <div className="p-4 bg-[#070F1B] rounded-2xl border border-slate-800 text-xs text-slate-400 text-left flex items-start gap-3">
            <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-slate-200">Need expedited onboarding?</p>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Contact the compliance desk at{" "}
                <a href={`mailto:${BRAND.email.support}`} className="text-blue-400 hover:underline">
                  {BRAND.email.support}
                </a>
              </p>
            </div>
          </div>

          {/* Return to login */}
          <Link
            href="/login"
            className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Staff Sign In
          </Link>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-center gap-2 text-slate-500 text-[11px] font-mono">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span>Strict Role-Based Access Control • RLS Isolated</span>
        </div>
      </div>
    </main>
  );
}
