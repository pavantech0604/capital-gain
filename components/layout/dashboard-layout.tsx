"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, ShieldCheck } from "lucide-react";
import { Sidebar } from "./sidebar";
import { DashboardFooter } from "./dashboard-footer";
import { BRAND } from "@/lib/constants";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Sidebar
        mobileOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Mobile top header — visible only on screens < lg where sidebar is hidden */}
      <header className="lg:hidden fixed top-0 left-0 right-0 z-30 h-16 bg-surface-container-low/90 backdrop-blur-xl border-b border-outline-variant/30 flex items-center justify-between px-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 text-on-surface-variant hover:text-primary transition-colors"
          aria-label="Open navigation"
        >
          <Menu className="w-6 h-6" />
        </button>
        <Link href="/dashboard" className="flex items-center gap-2">
          <span className="text-headline-md font-bold text-on-surface">
            {BRAND.name}
          </span>
        </Link>
        <div className="flex items-center gap-1 text-primary">
          <ShieldCheck className="w-4 h-4" />
        </div>
      </header>

      {/* Main content area — pushed right on lg+ for sidebar, pushed down on mobile for header */}
      <main className="lg:ml-[280px] min-h-screen bg-canvas pt-16 lg:pt-0">
        <div className="p-4 sm:p-6 lg:p-8">{children}</div>
        <DashboardFooter />
      </main>
    </>
  );
}
