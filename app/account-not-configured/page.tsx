import Link from "next/link";
import { UserCheck, ArrowLeft } from "lucide-react";

export default function AccountNotConfiguredPage() {
  return (
    <div className="min-h-screen bg-[#070F1B] text-slate-100 flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-[#112240] border border-slate-800 rounded-2xl p-8 text-center space-y-6 shadow-2xl">
        <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center mx-auto">
          <UserCheck className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold font-heading text-white">Profile Pending Setup</h1>
          <p className="text-xs text-slate-400 leading-relaxed">
            Your Supabase authentication credentials are valid, but an employee profile record has not been provisioned in the database yet.
          </p>
        </div>

        <p className="text-[11px] text-slate-500 font-mono">
          Please ask your system administrator to assign an employee role (Admin / Telecaller / RM) in the Profiles registry.
        </p>

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
