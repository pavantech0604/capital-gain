"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND, DASHBOARD_NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Wallet,
  BarChart3,
  Star,
  FileText,
  Settings,
  HelpCircle,
  LogOut,
  ShieldCheck,
  X,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  LayoutDashboard,
  Wallet,
  BarChart3,
  Star,
  FileText,
  Settings,
};

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const pathname = usePathname();

  const handleLogout = () => {
    // Stub: redirect to login for demo purposes
    window.location.href = "/login";
  };

  return (
    <>
      {/* Mobile overlay backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 h-full w-[280px] bg-surface-container-low border-r border-outline-variant flex flex-col py-6 z-50 transition-transform duration-300 ease-in-out",
          // On mobile: slide in/out. On lg+: always visible.
          mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        {/* Brand */}
        <div className="px-6 mb-12 flex items-center justify-between">
          <Link href="/dashboard" className="block" onClick={onClose}>
            <h1 className="text-headline-md text-on-surface font-semibold">
              {BRAND.name}
            </h1>
            <div className="mt-2 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span className="text-label-sm text-on-surface-variant">
                SEBI Reg: {BRAND.sebiRegNo}
              </span>
            </div>
          </Link>
          {/* Close button visible only on mobile */}
          <button
            onClick={onClose}
            className="lg:hidden p-2 text-on-surface-variant hover:text-primary transition-colors"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 space-y-1 overflow-y-auto">
          {DASHBOARD_NAV_ITEMS.map((item) => {
            const Icon = iconMap[item.icon] || LayoutDashboard;
            const isActive =
              pathname === item.href ||
              (item.href !== "/dashboard" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "group flex items-center px-6 py-4 transition-all",
                  isActive
                    ? "text-primary font-bold bg-surface-container-high border-r-4 border-primary"
                    : "text-on-surface-variant hover:bg-surface-variant hover:text-on-surface"
                )}
              >
                <Icon className="w-5 h-5 mr-4" />
                <span className="text-label-md">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Pro Upgrade Card */}
        <div className="px-6 mt-auto">
          <div className="p-4 rounded-xl bg-primary/10 border border-primary/20 mb-8">
            <p className="text-label-sm text-primary mb-1 font-bold">
              PRO ACCOUNT
            </p>
            <p className="text-body-sm text-on-surface-variant mb-3">
              Access to institutional grade data and early signals.
            </p>
            <Link
              href="/billing"
              onClick={onClose}
              className="block w-full py-2 bg-primary text-on-primary font-bold rounded-lg text-label-md text-center hover:brightness-110 transition-all"
            >
              Upgrade to Pro
            </Link>
          </div>

          {/* Bottom Links */}
          <div className="space-y-1 border-t border-outline-variant pt-6">
            <Link
              href="/support"
              onClick={onClose}
              className="group flex items-center py-2 text-on-surface-variant hover:text-primary transition-all"
            >
              <HelpCircle className="w-5 h-5 mr-4" />
              <span className="text-label-sm">Help Center</span>
            </Link>
            <button
              onClick={handleLogout}
              className="group flex items-center py-2 text-on-surface-variant hover:text-error transition-all w-full"
            >
              <LogOut className="w-5 h-5 mr-4" />
              <span className="text-label-sm">Logout</span>
            </button>
          </div>
        </div>
      </aside>
    </>
  );
}
