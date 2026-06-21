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
    <main className="flex min-h-screen w-full">
      {/* Left Section: Branding & Trust */}
      <section className="relative hidden lg:flex flex-col w-7/12 p-12 justify-between overflow-hidden border-r border-outline-variant/20 bg-surface-container-lowest">
        <ShaderBackground />

        {/* Branding Header */}
        <div className="relative z-10 flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl text-on-primary">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-headline-lg font-bold text-primary tracking-tight">
              {BRAND.name}
            </h1>
            <p className="text-label-sm text-on-surface-variant uppercase tracking-widest">
              SEBI REGISTERED: {BRAND.sebiRegNo}
            </p>
          </div>
        </div>

        {/* Content Area */}
        <div className="relative z-10 max-w-xl my-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-display-lg mb-6 leading-tight text-on-surface"
          >
            Precision Intelligence for Professional Investors.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-body-lg text-on-surface-variant mb-12"
          >
            Access deep-tier market analysis, institutional-grade portfolio strategies, and real-time research alerts tailored for the Indian equity markets.
          </motion.p>

          {/* Dashboard Preview Mockup */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="glass-card p-6 rounded-2xl shadow-2xl relative border border-white/10"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-error" />
                <div className="w-3 h-3 rounded-full bg-tertiary" />
                <div className="w-3 h-3 rounded-full bg-primary" />
              </div>
              <div className="text-label-sm text-outline">Real-time Pulse</div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-high p-4 rounded-xl border border-white/5">
                <p className="text-label-sm text-outline mb-1">NIFTY 50</p>
                <div className="flex items-end gap-2">
                  <span className="text-headline-lg text-on-surface">22,453.20</span>
                  <span className="text-primary text-label-sm flex items-center mb-1">
                    ▲ 1.24%
                  </span>
                </div>
              </div>
              <div className="bg-surface-container-high p-4 rounded-xl border border-white/5">
                <p className="text-label-sm text-outline mb-1">ACTIVE RESEARCH</p>
                <div className="flex items-end gap-2">
                  <span className="text-headline-lg text-on-surface">14</span>
                  <span className="text-tertiary text-label-sm flex items-center mb-1">
                    Pending Review
                  </span>
                </div>
              </div>
            </div>
            {/* Decorative Chart Lines */}
            <div className="mt-6 h-20 w-full flex items-end gap-1 px-1">
              <div className="flex-1 bg-primary/20 h-1/2 rounded-t" />
              <div className="flex-1 bg-primary/20 h-2/3 rounded-t" />
              <div className="flex-1 bg-primary/20 h-1/3 rounded-t" />
              <div className="flex-1 bg-primary h-5/6 rounded-t shadow-[0_0_15px_rgba(78,222,163,0.3)]" />
              <div className="flex-1 bg-primary/20 h-1/2 rounded-t" />
              <div className="flex-1 bg-primary/20 h-3/4 rounded-t" />
              <div className="flex-1 bg-primary/20 h-2/3 rounded-t" />
              <div className="flex-1 bg-primary h-full rounded-t shadow-[0_0_15px_rgba(78,222,163,0.3)]" />
            </div>
          </motion.div>
        </div>

        {/* Trust Badges */}
        <div className="relative z-10 flex gap-8 items-center opacity-60">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <span className="text-label-md">Bank-grade Security</span>
          </div>
          <div className="flex items-center gap-2">
            <FileKey2 className="w-5 h-5 text-primary" />
            <span className="text-label-md">256-bit AES Encryption</span>
          </div>
        </div>
      </section>

      {/* Right Section: Login Form */}
      <section className="w-full lg:w-5/12 bg-canvas flex flex-col justify-center items-center p-6 relative">
        <div className="w-full max-w-[420px] space-y-8">
          {/* Mobile Branding (Hidden on Desktop) */}
          <div className="lg:hidden flex flex-col items-center mb-8 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl mb-4 text-on-primary">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1 className="text-headline-lg font-bold text-primary">{BRAND.name}</h1>
            <p className="text-label-sm text-on-surface-variant uppercase tracking-widest mt-1">
              SEBI REGISTERED: {BRAND.sebiRegNo}
            </p>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-display-md text-on-surface">Welcome back</h2>
            <p className="text-body-md text-on-surface-variant">
              Sign in to access your research dashboard.
            </p>
          </div>

          {/* SSO Actions */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={() => (window.location.href = "/dashboard")}
              className="flex items-center justify-center gap-2 py-3 px-4 border border-outline-variant/30 rounded-xl hover:bg-surface-container transition-all text-label-md text-on-surface active:scale-[0.98]"
            >
              <img
                alt="Google"
                className="w-5 h-5"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCP3XeRi5QIuhO9OuCtsqxerHC6apCcRdq5xcFpjm147_Yv8qNUtZEW-VzVFHCii31NXI-B_UF0xmle9ysZQxT_Dt6yQl1C1nMD7yZoIqZvLSEbqctyJ41Bn2cIaflBx_dGcn6jgVYjDs5FVljo-_2znE7CMgnEeUJ0zHyvZHUYazegWpcN4SXPFs4w3s34-5NCpK-fdRXHbnMII-jcStGlzxOG0wf35BAlwqPZpfv2fddWzMfU0Csc_GbqbJcbDvOwGJEV6eaZZ8c"
              />
              Google
            </button>
            <button
              onClick={() => (window.location.href = "/dashboard")}
              className="flex items-center justify-center gap-2 py-3 px-4 border border-outline-variant/30 rounded-xl hover:bg-surface-container transition-all text-label-md text-on-surface active:scale-[0.98]"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.989C18.343 21.129 22 16.99 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
              Facebook
            </button>
          </div>

          <div className="flex items-center gap-4">
            <div className="h-[1px] flex-1 bg-outline-variant/30" />
            <span className="text-label-sm text-outline uppercase tracking-widest">
              or continue with email
            </span>
            <div className="h-[1px] flex-1 bg-outline-variant/30" />
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-label-md text-on-surface-variant block ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors w-5 h-5" />
                <input
                  required
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl pl-12 pr-4 py-3.5 text-body-md text-on-surface placeholder:text-outline/40 input-focus-glow transition-all"
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center ml-1">
                <label className="text-label-md text-on-surface-variant">Password</label>
                <Link
                  className="text-label-sm text-primary hover:underline transition-all"
                  href="/forgot-password"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors w-5 h-5" />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl pl-12 pr-12 py-3.5 text-body-md text-on-surface placeholder:text-outline/40 input-focus-glow transition-all"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              className="w-full py-4 bg-primary text-on-primary text-label-md font-bold rounded-xl hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              type="submit"
            >
              Sign In to Dashboard
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>

          {/* Security Notice */}
          <div className="p-4 rounded-xl bg-tertiary/10 border border-tertiary/20 flex gap-4 items-start">
            <AlertTriangle className="w-6 h-6 text-tertiary shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-label-md text-tertiary font-bold">Mandatory KYC Disclosure</p>
              <p className="text-body-sm text-on-surface-variant">
                In compliance with SEBI regulations, all research advisory services require a completed KYC profile and Risk Assessment before investment access is granted.
              </p>
            </div>
          </div>

          {/* Footer Links */}
          <div className="pt-4 text-center space-y-4">
            <p className="text-body-sm text-on-surface-variant">
              Don&apos;t have an account?{" "}
              <Link className="text-primary font-bold hover:underline" href="/signup">
                Create an account
              </Link>
            </p>
            <div className="flex justify-center gap-6 text-label-sm text-outline">
              <Link className="hover:text-on-surface transition-colors" href="/disclosure">
                Compliance
              </Link>
              <span className="opacity-30">|</span>
              <Link className="hover:text-on-surface transition-colors" href="/privacy">
                Privacy Policy
              </Link>
              <span className="opacity-30">|</span>
              <Link className="hover:text-on-surface transition-colors" href="/terms">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>

        {/* SEBI Floating Badge (Bottom Right) */}
        <div className="absolute bottom-6 right-6 p-2 bg-surface-container-high rounded border border-white/5 hidden md:flex items-center gap-2">
          <div className="w-6 h-6 bg-tertiary rounded-full flex items-center justify-center">
            <ShieldCheck className="w-4 h-4 text-on-tertiary" />
          </div>
          <span className="text-label-sm text-on-surface-variant uppercase">
            Certified Research Analyst
          </span>
        </div>
      </section>
    </main>
  );
}
