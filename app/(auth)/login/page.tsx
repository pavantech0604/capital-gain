"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  AlertTriangle,
  FileKey2,
  ChevronRight,
} from "lucide-react";
import { ShaderBackground } from "@/components/effects/shader-background";
import { BRAND } from "@/lib/constants";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to dashboard for demo
    window.location.href = "/dashboard";
  };

  return (
    <main className="flex min-h-screen w-full bg-white overflow-hidden">
      {/* Left Section: Branding & Trust */}
      <section className="relative hidden lg:flex flex-col w-7/12 p-10 justify-between overflow-hidden border-r border-warm-border bg-bg-soft">
        <ShaderBackground />

        {/* Branding Header */}
        <div className="relative z-10 flex items-center gap-3">
          <div className="relative w-10 h-10 transition-transform hover:rotate-6">
            <Image
              src="/logo.png"
              alt={BRAND.name}
              fill
              sizes="40px"
              className="object-contain logo-theme-color"
            />
          </div>
          <div>
            <h1 className="text-[17px] font-heading font-extrabold tracking-wide text-text uppercase leading-none">
              {BRAND.name}
            </h1>
            <p className="text-[9px] font-mono font-semibold tracking-widest text-primary uppercase mt-1">
              RESEARCH ID: {BRAND.regNo}
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative z-10 max-w-xl my-auto">
          <motion.h2
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-display-md mb-4 leading-tight text-text"
          >
            Precision Intelligence for Professional Investors.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-body-md text-text-muted mb-8"
          >
            Access deep-tier market analysis, institutional-grade portfolio strategies, and real-time research alerts tailored for the Indian equity markets.
          </motion.p>

          {/* Dashboard Preview Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="bg-white p-5 rounded-2xl shadow-sm border border-warm-border"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-danger/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-accent/60" />
                <div className="w-2.5 h-2.5 rounded-full bg-primary/60" />
              </div>
              <div className="text-label-sm text-text-muted font-bold font-mono">Real-time Pulse</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-bg-soft p-4 rounded-xl border border-warm-border/50">
                <p className="text-label-sm text-text-muted mb-1">NIFTY 50</p>
                <div className="flex items-end gap-2">
                  <span className="text-headline-lg text-text font-bold">22,453.20</span>
                  <span className="text-primary text-label-sm flex items-center mb-1 font-bold">
                    ▲ 1.24%
                  </span>
                </div>
              </div>
              <div className="bg-bg-soft p-4 rounded-xl border border-warm-border/50">
                <p className="text-label-sm text-text-muted mb-1">ACTIVE RESEARCH</p>
                <div className="flex items-end gap-2">
                  <span className="text-headline-lg text-text font-bold">14</span>
                  <span className="text-accent text-label-sm flex items-center mb-1 font-mono font-bold">
                    Pending
                  </span>
                </div>
              </div>
            </div>
            {/* Decorative Chart Lines */}
            <div className="mt-5 h-16 w-full flex items-end gap-1 px-1">
              <div className="flex-1 bg-primary/10 h-1/2 rounded-t" />
              <div className="flex-1 bg-primary/10 h-2/3 rounded-t" />
              <div className="flex-1 bg-primary/10 h-1/3 rounded-t" />
              <div className="flex-1 bg-primary/30 h-5/6 rounded-t" />
              <div className="flex-1 bg-primary/10 h-1/2 rounded-t" />
              <div className="flex-1 bg-primary/10 h-3/4 rounded-t" />
              <div className="flex-1 bg-primary/10 h-2/3 rounded-t" />
              <div className="flex-1 bg-primary/30 h-full rounded-t" />
            </div>
          </motion.div>
        </div>

        {/* Trust Badges */}
        <div className="relative z-10 flex gap-6 items-center opacity-70 text-text-muted">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-4.5 h-4.5 text-primary" />
            <span className="text-label-sm font-semibold">Bank-grade Security</span>
          </div>
          <div className="flex items-center gap-2">
            <FileKey2 className="w-4.5 h-4.5 text-primary" />
            <span className="text-label-sm font-semibold">256-bit AES Encryption</span>
          </div>
        </div>
      </section>

      {/* Right Section: Login Form */}
      <section className="w-full lg:w-5/12 bg-white flex flex-col justify-center items-center p-6 sm:p-10 relative overflow-y-auto max-h-screen">
        <div className="w-full max-w-[380px] py-4 space-y-5">
          {/* Mobile Branding (Hidden on Desktop) */}
          <div className="lg:hidden flex flex-col items-center mb-6 text-center">
            <div className="relative w-12 h-12 mb-3">
              <Image
                src="/logo.png"
                alt={BRAND.name}
                fill
                sizes="48px"
                className="object-contain logo-theme-color"
              />
            </div>
            <h1 className="text-headline-lg font-heading font-extrabold text-text tracking-wide uppercase leading-tight">{BRAND.name}</h1>
            <p className="text-label-sm text-primary font-mono tracking-widest uppercase mt-1">
              RESEARCH ID: {BRAND.regNo}
            </p>
          </div>

          <div className="space-y-1.5 text-center lg:text-left">
            <h2 className="text-headline-lg text-text font-bold">Welcome back</h2>
            <p className="text-body-sm text-text-muted">
              Sign in to access your research dashboard.
            </p>
          </div>

          {/* SSO Actions - Premium Designed Buttons */}
          <div className="grid grid-cols-2 gap-3.5">
            <button
              onClick={() => (window.location.href = "/dashboard")}
              className="flex items-center justify-center gap-2.5 py-2.5 px-3 bg-white border border-warm-border rounded-xl hover:bg-bg-soft transition-all text-label-sm font-heading font-bold text-text shadow-sm active:scale-[0.98] cursor-pointer"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </button>
            <button
              onClick={() => (window.location.href = "/dashboard")}
              className="flex items-center justify-center gap-2.5 py-2.5 px-3 bg-white border border-warm-border rounded-xl hover:bg-bg-soft transition-all text-label-sm font-heading font-bold text-text shadow-sm active:scale-[0.98] cursor-pointer"
            >
              <svg className="w-4 h-4" fill="#1877F2" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
              Facebook
            </button>
          </div>

          <div className="flex items-center gap-3">
            <div className="h-[1px] flex-1 bg-warm-border" />
            <span className="text-[10px] font-mono text-text-muted uppercase tracking-widest">
              or use credentials
            </span>
            <div className="h-[1px] flex-1 bg-warm-border" />
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-label-sm text-text-muted block ml-1 font-semibold">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors w-4.5 h-4.5" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#FAF8F4] border border-warm-border rounded-xl pl-11 pr-4 py-3 text-body-sm text-text placeholder:text-text-muted/40 focus:bg-white focus:outline-none focus:border-primary/50 transition-all shadow-sm"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between items-center ml-1">
                <label className="text-label-sm text-text-muted font-semibold">Password</label>
                <Link
                  className="text-label-sm text-primary hover:underline transition-all font-bold"
                  href="/forgot-password"
                >
                  Forgot?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors w-4.5 h-4.5" />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-[#FAF8F4] border border-warm-border rounded-xl pl-11 pr-11 py-3 text-body-sm text-text placeholder:text-text-muted/40 focus:bg-white focus:outline-none focus:border-primary/50 transition-all shadow-sm"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-text transition-colors cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4.5 h-4.5" /> : <Eye className="w-4.5 h-4.5" />}
                </button>
              </div>
            </div>

            <button
              className="w-full py-3.5 bg-primary text-white text-label-md font-bold rounded-xl hover:bg-primary-dark active:scale-[0.98] transition-all shadow-md shadow-primary/10 flex items-center justify-center gap-1.5 cursor-pointer mt-2"
              type="submit"
            >
              Sign In to Dashboard
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>

          {/* Security Notice - Compact & Premium */}
          <div className="p-3.5 rounded-xl bg-accent-soft border border-accent/20 flex gap-3.5 items-start">
            <AlertTriangle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <p className="text-[11px] font-heading font-black text-accent tracking-wide uppercase">Mandatory KYC Disclosure</p>
              <p className="text-[11px] text-text-muted leading-relaxed font-medium">
                All research advisory services require a completed KYC profile and Risk Assessment before investment access is granted.
              </p>
            </div>
          </div>

          {/* Footer Links */}
          <div className="pt-2 text-center space-y-3.5">
            <p className="text-body-sm text-text-muted font-medium">
              Don&apos;t have an account?{" "}
              <Link className="text-primary font-bold hover:underline" href="/signup">
                Create an account
              </Link>
            </p>
            <div className="flex justify-center gap-4 text-[10px] font-mono text-text-muted/75 font-semibold">
              <Link className="hover:text-text transition-colors" href="/disclosure">
                Compliance
              </Link>
              <span className="opacity-30">|</span>
              <Link className="hover:text-text transition-colors" href="/privacy">
                Privacy
              </Link>
              <span className="opacity-30">|</span>
              <Link className="hover:text-text transition-colors" href="/terms">
                Terms
              </Link>
            </div>
          </div>
        </div>

        {/* Research Floating Badge (Bottom Right) */}
        <div className="absolute bottom-4 right-4 p-2 bg-bg-soft rounded border border-warm-border hidden md:flex items-center gap-2 shadow-sm">
          <div className="w-5 h-5 bg-accent-soft border border-accent/20 rounded-full flex items-center justify-center">
            <ShieldCheck className="w-3.5 h-3.5 text-accent" />
          </div>
          <span className="text-[9px] font-mono font-bold text-text-muted uppercase tracking-wider">
            Verified Research Desk
          </span>
        </div>
      </section>
    </main>
  );
}
