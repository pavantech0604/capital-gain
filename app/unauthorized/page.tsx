import Link from "next/link";
import { ShieldAlert, ArrowLeft } from "lucide-react";

export default function UnauthorizedPage() {
  return (
    <div className="min-h-screen bg-[#070F1B] text-slate-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-[#112240] border border-slate-800 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-400 flex items-center justify-center mx-auto">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold font-heading text-white">403 — Unauthorized Access</h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            Your authenticated staff role does not have permission to view this module. Role privileges are strictly bounded by policy.
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-3">
          <Link
            href="/dashboard"
            className="w-full py-3 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Return to Authorized Dashboard
          </Link>
          <Link
            href="/login"
            className="text-xs text-slate-500 hover:text-slate-400 font-mono"
          >
            Switch Staff Account
          </Link>
        </div>
      </div>
    </div>
  );
}
