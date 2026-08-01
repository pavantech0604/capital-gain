"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
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
      <header className="lg:hidden fixed top-0 left-0 right-0 z-30 h-20 bg-surface-container-low/95 backdrop-blur-xl border-b border-outline-variant/30 flex items-center justify-between px-4">
        <button
          onClick={() => setSidebarOpen(true)}
          className="p-2 text-on-surface-variant hover:text-primary transition-colors"
          aria-label="Open navigation"
        >
          <Menu className="w-6 h-6" />
        </button>
        <Link href="/dashboard" className="flex items-center gap-2 py-1">
          <div className="relative w-8.5 h-8.5 shrink-0">
            <Image
              src="/logo-mark.png"
              alt={BRAND.name}
              fill
              unoptimized
              className="object-contain logo-premium"
              priority
            />
          </div>
          <div className="flex flex-col justify-center">
            <div className="flex items-center text-[15px] font-heading font-extrabold tracking-wider leading-none uppercase">
              <span className="text-[#0B192C]">CAPITAL</span>
              <span className="text-[#16A34A] ml-1">GROW</span>
            </div>
            <span className="text-[7px] font-mono font-bold tracking-[0.14em] text-[#D4AF37] uppercase leading-none mt-1">
              RESEARCH DESK
            </span>
          </div>
        </Link>
        <div className="flex items-center gap-1 text-primary">
          <ShieldCheck className="w-5 h-5" />
        </div>
      </header>

      {/* Main content area — pushed right on lg+ for sidebar, pushed down on mobile for header */}
      <main className="lg:ml-[280px] min-h-screen bg-canvas pt-16 lg:pt-0 flex flex-col justify-between">
        <div className="p-4 sm:p-6 lg:p-8 max-w-[1440px] w-full mx-auto flex-1">{children}</div>
        <DashboardFooter />
      </main>
    </>
  );
}
