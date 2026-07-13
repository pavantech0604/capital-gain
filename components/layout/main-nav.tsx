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
            ? "py-2 md:py-3 px-4 sm:px-6 md:px-12 bg-white/95 backdrop-blur-lg border-b border-warm-border shadow-[0_1px_3px_rgba(0,0,0,0.06)]" 
            : "py-3 md:py-4 px-4 sm:px-6 md:px-12 bg-transparent"
        )}
      >
        <div className="max-w-[1440px] mx-auto flex justify-between items-center h-12 md:h-14">
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
            </div>
            <div className="flex flex-col justify-center">
              <span className="text-[15px] md:text-[18px] font-heading font-extrabold tracking-[0.08em] text-text uppercase group-hover:text-primary transition-colors duration-300 leading-tight">
                Capital Gain
              </span>
              <span className="text-[8px] md:text-[9px] font-mono font-semibold tracking-[0.16em] text-primary uppercase leading-none mt-0.5">
                Equity Research
              </span>
            </div>
          </Link>

          {/* Desktop Nav Items */}
          <div className="hidden lg:flex items-center gap-1.5 bg-surface/60 border border-warm-border rounded-full p-1.5 backdrop-blur-sm">
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
                      className="absolute inset-0 bg-primary/10 border border-primary/20 rounded-full z-0"
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
              className="relative inline-flex items-center justify-center px-6 py-2.5 overflow-hidden text-label-sm font-semibold rounded-full bg-gradient-to-br from-primary to-primary-dark text-white hover:shadow-[0_8px_20px_rgba(230,126,34,0.3)] transition-all duration-300 active:scale-95"
            >
              Explore Research
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden relative z-50 p-2 md:p-2.5 bg-surface/50 border border-warm-border hover:border-primary/50 rounded-xl text-text-muted hover:text-primary transition-all duration-300"
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 lg:hidden bg-white px-4 sm:px-6 pt-[80px] pb-6 flex flex-col justify-between overflow-y-auto"
          >
            <div className="flex flex-col gap-4 mt-4">
              <span className="text-[10px] font-mono font-bold tracking-widest text-text-muted uppercase px-2 mb-1">
                Navigation Menu
              </span>
              <motion.div 
                className="flex flex-col gap-2.5"
                variants={{
                  show: { transition: { staggerChildren: 0.05 } }
                }}
                initial="hidden"
                animate="show"
              >
                {NAV_ITEMS.map((item, idx) => {
                  const isActive = pathname === item.href;
                  return (
                    <motion.div
                      key={item.href}
                      variants={{
                        hidden: { opacity: 0, x: -10 },
                        show: { opacity: 1, x: 0 }
                      }}
                    >
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                        className={cn(
                          "flex items-center justify-between py-3.5 px-5 rounded-2xl border transition-all duration-300",
                          isActive
                            ? "bg-primary/10 border-primary/20 text-primary font-bold shadow-sm"
                            : "bg-[#FAF8F4] border-warm-border/60 text-text hover:text-primary hover:bg-white"
                        )}
                      >
                        <span className="text-[15px] font-heading font-semibold">{item.label}</span>
                        <ChevronRight className="w-4 h-4 opacity-50" />
                      </Link>
                    </motion.div>
                  );
                })}
              </motion.div>
            </div>

            <div className="flex flex-col gap-5 mt-8 pb-4">
              <div className="flex flex-col gap-3">
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center py-3.5 text-label-md font-bold text-text border border-warm-border rounded-xl hover:text-primary hover:border-primary/50 transition-all duration-300 bg-white shadow-sm"
                >
                  Member Login
                </Link>
                <Link
                  href="/services"
                  onClick={() => setMobileOpen(false)}
                  className="w-full text-center py-3.5 bg-primary text-white text-label-md font-bold rounded-xl hover:bg-primary-dark active:scale-[0.98] transition-all duration-300 shadow-md shadow-primary/15"
                >
                  Explore Research
                </Link>
              </div>

              {/* Regulatory metadata at the bottom of drawer */}
              <div className="pt-5 border-t border-warm-border flex flex-col gap-2 text-center text-[10px] font-mono text-text-muted">
                <p className="font-semibold text-text">SEBI Registered Research Analyst</p>
                <p>Registration No. {BRAND.regNo}</p>
                <p className="opacity-75">Support: {BRAND.email.support}</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
