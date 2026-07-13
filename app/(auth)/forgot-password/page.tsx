"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowLeft, ShieldCheck, ChevronRight } from "lucide-react";
import { useState } from "react";
import { ShaderBackground } from "@/components/effects/shader-background";
import { BRAND } from "@/lib/constants";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Stub: simulate sending reset email
    setTimeout(() => {
      setStatus("sent");
    }, 1500);
  };

  return (
    <main className="flex min-h-screen w-full">
      {/* Left Section: Branding */}
      <section className="relative hidden lg:flex flex-col w-7/12 p-12 justify-between overflow-hidden border-r border-outline-variant/20 bg-surface-container-lowest">
        <ShaderBackground />
        <div className="relative z-10 flex items-center gap-4">
          <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl text-on-primary">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h1 className="text-headline-lg font-bold text-primary tracking-tight">
              {BRAND.name}
            </h1>
            <p className="text-label-sm text-on-surface-variant uppercase tracking-widest">
              RESEARCH ID: {BRAND.regNo}
            </p>
          </div>
        </div>
        <div className="relative z-10 max-w-xl my-auto">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-display-lg mb-6 leading-tight text-on-surface"
          >
            Secure Account Recovery
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="text-body-lg text-on-surface-variant"
          >
            We take your account security seriously. Enter your registered email and we&apos;ll send you a secure reset link.
          </motion.p>
        </div>
        <div className="relative z-10 flex gap-8 items-center opacity-60">
          <div className="flex items-center gap-2">
            <Lock className="w-5 h-5 text-primary" />
            <span className="text-label-md">Bank-grade Security</span>
          </div>
        </div>
      </section>

      {/* Right Section: Form */}
      <section className="w-full lg:w-5/12 bg-canvas flex flex-col justify-center items-center p-6 relative">
        <div className="w-full max-w-[420px] space-y-8">
          {/* Mobile Branding */}
          <div className="lg:hidden flex flex-col items-center mb-8 text-center">
            <div className="flex items-center justify-center w-12 h-12 bg-primary rounded-xl mb-4 text-on-primary">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <h1 className="text-headline-lg font-bold text-primary">{BRAND.name}</h1>
          </div>

          <Link
            href="/login"
            className="inline-flex items-center gap-2 text-label-sm text-on-surface-variant hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Sign In
          </Link>

          <div className="space-y-2">
            <h2 className="text-display-md text-on-surface">Reset Password</h2>
            <p className="text-body-md text-on-surface-variant">
              Enter your email to receive a password reset link.
            </p>
          </div>

          {status === "sent" ? (
            <div className="p-6 glass-card rounded-2xl text-center space-y-4">
              <div className="w-16 h-16 bg-primary/20 border border-primary/30 text-primary rounded-full flex items-center justify-center mx-auto">
                <Mail className="w-8 h-8" />
              </div>
              <h3 className="text-headline-md font-bold text-on-surface">Check Your Inbox</h3>
              <p className="text-body-sm text-on-surface-variant">
                We&apos;ve sent a password reset link to <strong className="text-on-surface">{email}</strong>.
                Please check your inbox and follow the instructions.
              </p>
              <Link
                href="/login"
                className="inline-flex items-center gap-2 bg-primary text-on-primary px-6 py-3 rounded-xl text-label-md font-bold hover:brightness-110 transition-all mt-4"
              >
                Return to Sign In
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-label-md text-on-surface-variant block ml-1">
                  Registered Email Address
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

              <button
                className="w-full py-4 bg-primary text-on-primary text-label-md font-bold rounded-xl hover:brightness-110 active:scale-[0.98] transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2 disabled:opacity-60"
                type="submit"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : "Send Reset Link"}
                <ChevronRight className="w-4 h-4" />
              </button>
            </form>
          )}

          <div className="pt-4 text-center">
            <p className="text-body-sm text-on-surface-variant">
              Remember your password?{" "}
              <Link className="text-primary font-bold hover:underline" href="/login">
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
