"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  ShieldCheck,
  CheckCircle,
  Users,
  TrendingUp,
  CreditCard,
  Receipt,
  FileSpreadsheet,
  Headset,
  PhoneCall,
  LogOut,
  X,
  ExternalLink,
  UserCog,
} from "lucide-react";
import { BRAND } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";

export type UserRole = "admin" | "telecaller" | "relationship_manager";

interface RoleSidebarProps {
  role: UserRole;
  userName?: string;
  userEmail?: string;
  mobileOpen: boolean;
  onClose: () => void;
}

const navigationByRole: Record<
  UserRole,
  {
    roleLabel: string;
    roleColor: string;
    items: { label: string; href: string; icon: React.ElementType; external?: boolean }[];
  }
> = {
  admin: {
    roleLabel: "Admin Portal",
    roleColor: "text-amber-400 bg-amber-500/10 border-amber-500/30",
    items: [
      { label: "Overview", href: "/admin/dashboard", icon: LayoutDashboard },
      { label: "Payment Verification", href: "/admin/payments", icon: ShieldCheck },
      { label: "Leads Master", href: "/admin/leads", icon: Users },
      { label: "Active Traders", href: "/admin/traders", icon: TrendingUp },
      { label: "Expenses", href: "/admin/expenses", icon: Receipt },
      { label: "Employees", href: "/admin/employees", icon: UserCog },
    ],
  },
  telecaller: {
    roleLabel: "Telecaller Desk",
    roleColor: "text-teal-400 bg-teal-500/10 border-teal-500/30",
    items: [
      { label: "My Leads Pipeline", href: "/telecaller/dashboard", icon: PhoneCall },
      { label: "Follow-up Queue", href: "/telecaller/dashboard?tab=followup", icon: Headset },
    ],
  },
  relationship_manager: {
    roleLabel: "Relationship Manager",
    roleColor: "text-blue-400 bg-blue-500/10 border-blue-500/30",
    items: [
      { label: "RM Dashboard", href: "/rm/dashboard", icon: LayoutDashboard },
      { label: "Leads for RM", href: "/rm/dashboard?tab=leads", icon: Users },
      { label: "My Active Traders", href: "/rm/dashboard?tab=traders", icon: TrendingUp },
      { label: "Upload Profit (Form)", href: "/rm/dashboard?tab=upload", icon: FileSpreadsheet },
    ],
  },
};

export function RoleSidebar({
  role,
  userName = "Staff User",
  userEmail = "staff@capitalgrow.in",
  mobileOpen,
  onClose,
}: RoleSidebarProps) {
  const pathname = usePathname();
  const supabase = createClient();
  const roleConfig = navigationByRole[role];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/login";
  };

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/80 backdrop-blur-xs lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar Desktop/Drawer */}
      <aside
        className={`fixed left-0 top-0 h-full w-[270px] bg-[#0B192C] border-r border-slate-800 flex flex-col py-6 z-50 transition-transform duration-300 ease-in-out ${
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        }`}
      >
        {/* Brand */}
        <div className="px-5 mb-6 flex items-center justify-between">
          <Link href={`/${role === "relationship_manager" ? "rm" : role}/dashboard`} className="flex items-center gap-2.5">
            <div className="relative w-9 h-9 shrink-0">
              <Image
                src="/logo-mark.png"
                alt={BRAND.name}
                fill
                unoptimized
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col justify-center">
              <div className="flex items-center text-[16px] font-heading font-extrabold tracking-wider leading-none uppercase">
                <span className="text-white">CAPITAL</span>
                <span className="text-emerald-500 ml-1">GROW</span>
              </div>
              <span className="text-[7.5px] font-mono font-bold tracking-[0.14em] text-[#D4AF37] uppercase leading-none mt-1">
                EQUITY DESK
              </span>
            </div>
          </Link>

          <button
            onClick={onClose}
            className="lg:hidden p-1 text-slate-400 hover:text-white"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Role Badge Indicator */}
        <div className="px-5 mb-5">
          <div className={`flex items-center justify-between px-3 py-2 rounded-xl border ${roleConfig.roleColor}`}>
            <span className="text-xs font-bold font-mono tracking-wide uppercase">
              {roleConfig.roleLabel}
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </div>
        </div>

        {/* Navigation items */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {roleConfig.items.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href.includes("?") && pathname === item.href.split("?")[0]);

            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={`flex items-center justify-between px-3.5 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-slate-800/80 text-white font-semibold border-l-3 border-emerald-500 shadow-xs"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/40"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className={`w-4 h-4 ${isActive ? "text-emerald-400" : "text-slate-400"}`} />
                  <span>{item.label}</span>
                </div>
                {item.external && <ExternalLink className="w-3.5 h-3.5 text-slate-500" />}
              </Link>
            );
          })}
        </nav>

        {/* User profile & Logout */}
        <div className="px-4 mt-auto pt-4 border-t border-slate-800/80">
          <div className="flex items-center gap-3 px-2 py-2 mb-2 bg-[#112240] rounded-xl border border-slate-800">
            <div className="w-8 h-8 rounded-full bg-emerald-600/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-xs uppercase">
              {userName.substring(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{userName}</p>
              <p className="text-[10px] text-slate-400 truncate">{userEmail}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 py-2 px-3 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 rounded-xl transition-all cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </aside>
    </>
  );
}
