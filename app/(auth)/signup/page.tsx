"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Mail,
  Lock,
  Eye,
  EyeOff,
  User,
  Phone,
  AlertTriangle,
  FileKey2,
  ChevronRight,
} from "lucide-react";
import { ShaderBackground } from "@/components/effects/shader-background";
import { BRAND } from "@/lib/constants";

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [agreeConsent, setAgreeConsent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeConsent) {
      alert("Please agree to the KYC & terms disclosure before proceeding.");
      return;
    }
    // Redirect to profile/KYC verification page for demo onboarding
    window.location.href = "/dashboard/profile";
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
            Start Your Journey with Institutional Grade Research.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-body-lg text-on-surface-variant mb-12"
          >
            Create an account to complete your KYC onboarding and access SEBI-compliant Research Analyst recommendations.
          </motion.p>

          {/* Interactive Steps Graphics */}
          <div className="space-y-4 max-w-md">
            {[
              { num: "01", title: "Verify KYC", desc: "PAN card & active bank details verify" },
              { num: "02", title: "Risk Profile", desc: "Quick suitability assessment" },
              { num: "03", title: "Unlock Portal", desc: "Gain instant dashboard access" },
            ].map((step, idx) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                key={step.num}
                className="flex items-center gap-4 p-4 rounded-xl bg-surface-container-high/50 border border-white/5"
              >
                <div className="text-headline-md font-bold text-primary bg-primary/10 w-10 h-10 rounded-lg flex items-center justify-center">
                  {step.num}
                </div>
                <div>
                  <h4 className="text-headline-md font-semibold text-on-surface">{step.title}</h4>
                  <p className="text-body-sm text-on-surface-variant">{step.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="relative z-10 flex gap-8 items-center opacity-60">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-primary" />
            <span className="text-label-md">SEBI-Compliant Workflow</span>
          </div>
          <div className="flex items-center gap-2">
            <FileKey2 className="w-5 h-5 text-primary" />
            <span className="text-label-md">256-bit AES Encryption</span>
          </div>
        </div>
      </section>

      {/* Right Section: Sign Up Form */}
      <section className="w-full lg:w-5/12 bg-canvas flex flex-col justify-center items-center p-6 relative overflow-y-auto">
        <div className="w-full max-w-[420px] py-8 space-y-6">
          {/* Mobile Branding (Hidden on Desktop) */}
          <div className="lg:hidden flex flex-col items-center mb-6 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl mb-4 text-on-primary">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1 className="text-headline-lg font-bold text-primary">{BRAND.name}</h1>
            <p className="text-label-sm text-on-surface-variant uppercase tracking-widest mt-1">
              SEBI REGISTERED: {BRAND.sebiRegNo}
            </p>
          </div>

          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-display-md text-on-surface">Create an account</h2>
            <p className="text-body-md text-on-surface-variant">
              Get started with India&apos;s premium investment advisory dashboard.
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-label-md text-on-surface-variant block ml-1">
                Full Name (as per PAN)
              </label>
              <div className="relative group">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors w-5 h-5" />
                <input
                  required
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl pl-12 pr-4 py-3 text-body-md text-on-surface placeholder:text-outline/40 input-focus-glow transition-all"
                  placeholder="Arjun Mehta"
                />
              </div>
            </div>

            <div className="space-y-1.5">
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
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl pl-12 pr-4 py-3 text-body-md text-on-surface placeholder:text-outline/40 input-focus-glow transition-all"
                  placeholder="arjun@company.com"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-label-md text-on-surface-variant block ml-1">
                Phone Number (linked to Aadhaar)
              </label>
              <div className="relative group">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors w-5 h-5" />
                <input
                  required
                  type="tel"
                  pattern="[0-9]{10}"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl pl-12 pr-4 py-3 text-body-md text-on-surface placeholder:text-outline/40 input-focus-glow transition-all"
                  placeholder="9876543210"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-label-md text-on-surface-variant block ml-1">Password</label>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors w-5 h-5" />
                <input
                  required
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl pl-12 pr-12 py-3 text-body-md text-on-surface placeholder:text-outline/40 input-focus-glow transition-all"
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

            {/* KYC and Advisory Consent Checkbox */}
            <div className="flex items-start gap-3 py-2">
              <input
                required
                id="consent-check"
                type="checkbox"
                checked={agreeConsent}
                onChange={(e) => setAgreeConsent(e.target.checked)}
                className="mt-1 w-4.5 h-4.5 accent-primary border border-outline-variant/30 bg-surface-container-low rounded cursor-pointer"
              />
              <label htmlFor="consent-check" className="text-body-sm text-on-surface-variant cursor-pointer select-none">
                I agree to the Terms of Service & Privacy Policy, and authorize {BRAND.fullName} to perform KYC suitability evaluations as required by SEBI regulations.
              </label>
            </div>

            <button
              className="w-full py-4 bg-primary text-on-primary text-label-md font-bold rounded-xl hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
              type="submit"
            >
              Register & Start Onboarding
              <ChevronRight className="w-4 h-4" />
            </button>
          </form>

          {/* Security Notice */}
          <div className="p-4 rounded-xl bg-tertiary/10 border border-tertiary/20 flex gap-4 items-start">
            <AlertTriangle className="w-6 h-6 text-tertiary shrink-0 mt-0.5" />
            <div className="space-y-1">
              <p className="text-label-md text-tertiary font-bold">Regulatory Advisory Notice</p>
              <p className="text-body-sm text-on-surface-variant">
                Investment recommendations will only be active after successful compliance checks and risk questionnaire completion.
              </p>
            </div>
          </div>

          {/* Footer Links */}
          <div className="pt-2 text-center space-y-4">
            <p className="text-body-sm text-on-surface-variant">
              Already have an account?{" "}
              <Link className="text-primary font-bold hover:underline" href="/login">
                Sign In
              </Link>
            </p>
            <div className="flex justify-center gap-6 text-label-sm text-outline">
              <Link className="hover:text-on-surface transition-colors" href="/disclosure">
                Compliance Page
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
