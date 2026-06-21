"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BRAND, NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Menu, X, Landmark, ShieldCheck } from "lucide-react";

export function MainNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[1280px] z-50 rounded-2xl border border-outline-variant/20 glass-card-solid shadow-[0_12px_40px_rgba(0,0,0,0.5)] backdrop-blur-xl transition-all duration-300">
      <nav className="flex justify-between items-center px-8 h-20 w-full">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 group"
        >
          <div className="relative w-11 h-11 transition-all duration-300 group-hover:rotate-12 group-hover:scale-110">
            <Image
              src="/logo.png"
              alt={BRAND.name}
              fill
              sizes="44px"
              className="object-contain"
            />
          </div>
          <div className="flex flex-col justify-center">
            <span className="text-headline-md font-bold tracking-[0.1em] text-on-surface uppercase group-hover:text-primary transition-colors duration-200 leading-tight">
              Capital Gain
            </span>
            <span className="text-[9px] font-semibold tracking-[0.18em] text-primary/80 uppercase leading-none mt-0.5">
              Research Analyst
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "text-body-md transition-colors duration-200 active:scale-95",
                  isActive
                    ? "text-primary font-bold border-b-2 border-primary pb-1"
                    : "text-on-surface-variant hover:text-primary"
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </div>

        {/* Desktop CTAs */}
        <div className="hidden lg:flex items-center gap-4">
          <Link
            href="/login"
            className="text-label-md text-on-surface-variant px-4 py-2 hover:text-primary transition-all"
          >
            Login
          </Link>
          <Link
            href="/services"
            className="bg-primary-container text-on-primary-container text-label-md px-6 py-2 rounded font-bold hover:brightness-110 active:scale-95 transition-all"
          >
            Explore Research
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="lg:hidden p-2 text-on-surface-variant hover:text-primary transition-colors"
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </nav>

      {/* Mobile Menu */}
      <div
        className={cn(
          "lg:hidden glass-card-solid border-t border-outline-variant/30 rounded-b-2xl overflow-hidden transition-all duration-300 ease-in-out",
          mobileOpen
            ? "max-h-[500px] opacity-100"
            : "max-h-0 opacity-0 border-t-transparent"
        )}
      >
        <div className="max-w-[1440px] mx-auto px-6 py-4 flex flex-col gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "py-3 px-4 rounded transition-colors",
                  isActive
                    ? "text-primary font-bold bg-primary/10"
                    : "text-on-surface-variant hover:text-primary hover:bg-surface-container-high"
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="flex gap-3 mt-2 pt-4 border-t border-outline-variant/30">
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="flex-1 text-center py-3 text-label-md text-on-surface-variant border border-outline-variant rounded hover:text-primary transition-all"
            >
              Login
            </Link>
            <Link
              href="/services"
              onClick={() => setMobileOpen(false)}
              className="flex-1 text-center py-3 bg-primary-container text-on-primary-container text-label-md rounded font-bold hover:brightness-110 transition-all"
            >
              Explore Research
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
