"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  Send,
  CheckCircle2,
  Loader2,
  Sparkles,
  ArrowLeft,
  Clock,
  ShieldCheck,
  TrendingUp,
  BarChart3,
  Layers,
} from "lucide-react";
import { ShaderBackground } from "@/components/effects/shader-background";
import { BRAND } from "@/lib/constants";

const INTEREST_OPTIONS = [
  { id: "swing", label: "Swing Trading Setups", icon: TrendingUp },
  { id: "portfolio", label: "Long-Term Portfolio", icon: Layers },
  { id: "hni", label: "HNI Alpha Advisory", icon: Sparkles },
  { id: "custom", label: "Custom Research Desk", icon: BarChart3 },
];

export default function LoginPage() {
  const [selectedInterest, setSelectedInterest] = useState("Swing Trading Setups");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [responseMsg, setResponseMsg] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName,
          email,
          phone,
          interest: selectedInterest,
          message,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setResponseMsg(data.message || "Thank you! Your inquiry has been successfully sent to our advisory desk. We will reach out shortly.");
        setTimeout(() => {
          setFullName("");
          setEmail("");
          setPhone("");
          setMessage("");
        }, 1000);
      } else {
        setStatus("error");
        setResponseMsg(data.error || "Unable to send. Please contact capitalgrow8651@gmail.com or call +91 7659801348 directly.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setResponseMsg("Network issue. Please email our desk directly at capitalgrow8651@gmail.com or call +91 7659801348.");
    }
  };

  return (
    <main className="flex min-h-screen w-full bg-[#FAF8F4] relative selection:bg-[#C5A028] selection:text-black">
      {/* Left Section: Institutional Value & Desk Info */}
      <section className="relative hidden lg:flex flex-col w-5/12 p-12 xl:p-16 justify-between overflow-hidden border-r border-warm-border bg-white shadow-sm">
        <ShaderBackground />

        {/* Top Brand Header */}
        <div className="relative z-10 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative w-11 h-11 shrink-0 transition-transform duration-300 group-hover:scale-105">
              <Image
                src="/logo-mark.png"
                alt={BRAND.name}
                fill
                unoptimized
                className="object-contain logo-premium"
                priority
              />
            </div>
            <div className="flex flex-col text-left">
              <div className="flex items-center text-[20px] font-heading font-black tracking-wider leading-none uppercase">
                <span className="text-[#0B192C]">CAPITAL</span>
                <span className="text-[#16A34A] ml-1">GROW</span>
              </div>
              <span className="text-[8px] font-mono font-extrabold tracking-[0.14em] text-[#D4AF37] uppercase leading-none mt-1">
                EQUITY RESEARCH
              </span>
            </div>
          </Link>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-[10px] font-mono font-bold uppercase tracking-wider">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Desk Active
          </span>
        </div>

        {/* Hero Narrative */}
        <div className="relative z-10 max-w-lg my-auto space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-mono font-bold text-primary tracking-widest uppercase mb-2 block">
              ADVISORY &amp; RESEARCH INQUIRY
            </span>
            <h1 className="text-display-md font-bold text-text leading-tight mb-3">
              Direct Contact Desk
            </h1>
            <p className="text-body-md text-text-muted leading-relaxed">
              Connect directly with our quantitative equity research desk. Whether you require swing setups, long-term portfolio restructuring, or institutional analytics, we are ready to assist.
            </p>
          </motion.div>

          {/* Value Pillars */}
          <div className="space-y-3 pt-2">
            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#FAF8F4] border border-warm-border/80">
              <div className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-text">Fast Desk Turnaround</p>
                <p className="text-[11px] text-text-muted">Inquiries reviewed within 4 business hours</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#FAF8F4] border border-warm-border/80">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-text">100% Conflict-Free Models</p>
                <p className="text-[11px] text-text-muted">Pure mathematical screening, no third-party incentives</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-xl bg-[#FAF8F4] border border-warm-border/80">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="overflow-hidden">
                <p className="text-xs font-bold text-text">Direct Dispatch Mailbox</p>
                <p className="text-[11px] text-text-muted font-mono truncate">{BRAND.email.support}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Back Link */}
        <div className="relative z-10 flex items-center justify-between text-xs text-text-muted pt-6 border-t border-warm-border">
          <Link href="/" className="inline-flex items-center gap-1.5 font-semibold text-primary hover:underline">
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Homepage
          </Link>
          <span className="font-mono text-[10px] opacity-75">{BRAND.coverage}</span>
        </div>
      </section>

      {/* Right Section: Interactive Contact Form */}
      <section className="w-full lg:w-7/12 flex flex-col justify-center items-center p-6 sm:p-10 lg:p-12 overflow-y-auto">
        <div className="w-full max-w-xl py-6 space-y-6">
          {/* Mobile Header */}
          <div className="lg:hidden flex items-center justify-between pb-4 border-b border-warm-border">
            <Link href="/" className="flex items-center gap-2">
              <div className="relative w-8 h-8">
                <Image src="/logo-mark.png" alt={BRAND.name} fill unoptimized className="object-contain" priority />
              </div>
              <span className="text-base font-heading font-black text-[#0B192C]">CAPITAL GROW</span>
            </Link>
            <Link href="/" className="text-xs text-primary font-semibold flex items-center gap-1">
              <ArrowLeft className="w-3 h-3" /> Home
            </Link>
          </div>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5" /> Direct Advisory Desk
            </div>
            <h2 className="text-headline-lg font-bold text-text">Get in Touch with Our Analysts</h2>
            <p className="text-body-sm text-text-muted">
              Submit your details below. Form updates are instantly dispatched to our desk at{" "}
              <strong className="text-text font-mono">Naresh1955.nk@gmail.com</strong>.
            </p>
          </div>

          {/* Interactive Interest Picker */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-text uppercase tracking-wider block">
              Select Your Focus Area
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {INTEREST_OPTIONS.map((item) => {
                const Icon = item.icon;
                const isSelected = selectedInterest === item.label;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setSelectedInterest(item.label)}
                    className={`p-3 rounded-xl border text-left flex items-center gap-2.5 transition-all text-xs font-semibold ${
                      isSelected
                        ? "bg-primary text-white border-primary shadow-sm shadow-primary/20 scale-[1.01]"
                        : "bg-white text-text border-warm-border hover:border-primary/40 hover:bg-white"
                    }`}
                  >
                    <Icon className={`w-4 h-4 shrink-0 ${isSelected ? "text-white" : "text-primary"}`} />
                    <span className="truncate">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text ml-0.5">Full Name *</label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Rahul Sharma"
                  className="w-full bg-white border border-warm-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-bold text-text ml-0.5">Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-white border border-warm-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text ml-0.5">Email Address *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="rahul@example.com"
                className="w-full bg-white border border-warm-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-text ml-0.5">Your Inquiry / Portfolio Overview *</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Share your current portfolio size, investment horizon, or specific questions..."
                className="w-full bg-white border border-warm-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "sending"}
              className="w-full py-4 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark active:scale-[0.99] transition-all shadow-md shadow-primary/20 flex items-center justify-center gap-2 text-sm disabled:opacity-75"
            >
              {status === "sending" ? (
                <>
                  Transmitting Inquiry... <Loader2 className="w-4 h-4 animate-spin" />
                </>
              ) : (
                <>
                  Send Inquiry to Research Desk <Send className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Feedback message */}
          <AnimatePresence>
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2.5"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Inquiry Sent Successfully!</p>
                  <p className="mt-0.5 text-emerald-700">{responseMsg}</p>
                </div>
              </motion.div>
            )}

            {status === "error" && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs flex items-start gap-2.5"
              >
                <div className="font-bold">Notice:</div>
                <div>{responseMsg}</div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Direct Contact Bar */}
          <div className="pt-4 border-t border-warm-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-muted">
            <div className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-primary" />
              <span>Direct Email:</span>
              <a href={`mailto:${BRAND.email.support}`} className="font-mono font-bold text-text hover:text-primary transition-colors">
                {BRAND.email.support}
              </a>
            </div>
            <div className="flex items-center gap-2">
              <Phone className="w-4 h-4 text-primary" />
              <span>Desk Line:</span>
              <a href={`tel:${BRAND.phone.direct}`} className="font-bold text-text hover:text-primary transition-colors">
                {BRAND.phone.direct}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
