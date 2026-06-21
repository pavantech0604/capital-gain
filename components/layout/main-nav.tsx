"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { BRAND, NAV_ITEMS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronRight, Landmark } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function MainNav() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out",
          isScrolled || mobileOpen
            ? "py-3 md:py-4 px-4 sm:px-6 md:px-12 bg-bg/90 backdrop-blur-lg border-b border-border/40 shadow-[0_4px_30px_rgba(0,0,0,0.4)]" 
            : "py-4 md:py-6 px-4 sm:px-6 md:px-12 bg-transparent"
        )}
      >
        <div className="max-w-[1440px] mx-auto flex justify-between items-center h-14 md:h-16">
          {/* Logo Container */}
          <Link
            href="/"
            className="flex items-center gap-2.5 md:gap-3 group relative z-50"
            onClick={() => setMobileOpen(false)}
          >
            <div className="relative w-8 h-8 md:w-10 md:h-10 transition-all duration-500 group-hover:rotate-12 group-hover:scale-105">
              <Image
                src="/logo.png"
                alt={BRAND.name}
                fill
                sizes="(max-width: 768px) 32px, 40px"
                className="object-contain logo-theme-color"
              />
              <div className="absolute inset-0 bg-primary/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[15px] md:text-[18px] font-heading font-extrabold tracking-[0.08em] text-text uppercase group-hover:text-primary transition-colors duration-300 leading-tight">
                Capital Gain
              </span>
              <span className="text-[8px] md:text-[9px] font-mono font-semibold tracking-[0.16em] text-accent uppercase leading-none mt-0.5">
                Equity Research
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1.5 bg-surface-strong/40 border border-border/30 rounded-full p-1.5 backdrop-blur-sm">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative px-5 py-2.5 rounded-full text-body-sm font-heading font-medium tracking-wide transition-all duration-300",
                    isActive
                      ? "text-text font-semibold"
                      : "text-text-muted hover:text-text"
                  )}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavBackground"
                      className="absolute inset-0 bg-primary/15 border border-primary/20 rounded-full z-0"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/login"
              className="text-label-md text-text-muted px-4 py-2 hover:text-primary transition-all duration-300 font-semibold"
            >
              Login
            </Link>
            <Link
              href="/services"
              className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-label-sm font-semibold rounded-full group bg-gradient-to-br from-primary to-accent group-hover:from-primary group-hover:to-accent hover:text-white focus:ring-2 focus:outline-none focus:ring-primary/50 transition-all duration-300 active:scale-95"
            >
              <span className="relative px-6 py-2 transition-all ease-in duration-75 bg-bg rounded-full group-hover:bg-opacity-0">
                Explore Research
              </span>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative z-50 p-2 md:p-2.5 bg-surface-strong/50 border border-border/40 hover:border-primary/50 rounded-xl text-text-muted hover:text-primary transition-all duration-300"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-5 h-5 md:w-5 md:h-5" /> : <Menu className="w-5 h-5 md:w-5 md:h-5" />}
          </button>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 top-[68px] md:top-[80px] z-40 lg:hidden bg-bg/98 backdrop-blur-xl px-4 sm:px-6 py-6 flex flex-col justify-between overflow-y-auto"
          >
            <div className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center justify-between py-4 px-5 rounded-2xl border transition-all duration-300",
                      isActive
                        ? "bg-primary/10 border-primary/30 text-primary font-bold"
                        : "bg-surface/30 border-border/30 text-text-muted hover:text-text hover:bg-surface-strong/30"
                    )}
                  >
                    <span className="text-headline-md">{item.label}</span>
                    <ChevronRight className="w-5 h-5 opacity-50" />
                  </Link>
                );
              })}
            </div>

            <div className="flex flex-col gap-4 mt-8 pb-10">
              <Link
                href="/login"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-4 text-headline-md font-semibold text-text border border-border/50 rounded-2xl hover:text-primary hover:border-primary/50 transition-all duration-300"
              >
                Member Login
              </Link>
              <Link
                href="/services"
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-4 bg-primary text-white text-headline-md font-bold rounded-2xl hover:brightness-110 shadow-lg shadow-primary/20 active:scale-95 transition-all duration-300"
              >
                Explore Research
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
