import Link from "next/link";
import { UserX, Mail, ArrowLeft } from "lucide-react";
import { BRAND } from "@/lib/constants";

export default function AccountDisabledPage() {
  return (
    <div className="min-h-screen bg-[#070F1B] text-slate-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-[#112240] border border-slate-800 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto">
          <UserX className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold font-heading text-white">Account Deactivated</h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            Your employee account has been marked inactive by the system administrator. Dashboard access is temporarily suspended.
          </p>
        </div>

        <div className="p-4 bg-[#0B192C] rounded-xl border border-slate-800 text-xs text-slate-400 text-left flex items-start gap-3">
          <Mail className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-slate-300">Need account reactivation?</p>
            <p className="text-[11px] text-slate-500">Contact compliance desk at {BRAND.email.support}</p>
          </div>
        </div>

        <div className="pt-2">
          <Link
            href="/login"
            className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs rounded-xl transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}
