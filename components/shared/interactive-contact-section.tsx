"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Mail,
  Phone,
  CheckCircle2,
  Loader2,
  Sparkles,
  TrendingUp,
  Layers,
  BarChart3,
  Clock,
  ShieldCheck,
} from "lucide-react";
import { BRAND } from "@/lib/constants";
import { Reveal, GlassCard } from "@/components/ui/motion";

const FOCUS_AREAS = [
  { id: "swing", label: "Swing & Momentum", icon: TrendingUp },
  { id: "portfolio", label: "Portfolio Allocation", icon: Layers },
  { id: "hni", label: "HNI Alpha Desk", icon: Sparkles },
  { id: "custom", label: "Custom Analytics", icon: BarChart3 },
];

export function InteractiveContactSection() {
  const [selectedTopic, setSelectedTopic] = useState("Swing & Momentum");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [feedback, setFeedback] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fullName: name,
          email,
          phone,
          interest: selectedTopic,
          message,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setFeedback(data.message || "Thank you! Your inquiry has been successfully sent to our advisory desk. We will reach out to you shortly.");
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
      } else {
        setStatus("error");
        setFeedback(data.error || "Unable to send inquiry. Please reach out to us at capitalgrow8651@gmail.com or call +91 7659801348.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setFeedback("Network connection error. Please email us at capitalgrow8651@gmail.com or call +91 7659801348.");
    }
  };

  return (
    <section className="py-16 md:py-24 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 xl:px-20 relative z-10 scroll-mt-20" id="contact">
      <Reveal>
        <div className="bg-white rounded-3xl md:rounded-[2.5rem] border border-warm-border p-6 sm:p-10 md:p-16 shadow-[0_20px_50px_rgba(0,0,0,0.05)] relative overflow-hidden">
          {/* Subtle glow background */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center relative z-10">
            {/* Left: Desk Overview */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider">
                <Sparkles className="w-3.5 h-3.5" /> Direct Advisory Desk
              </div>

              <h2 className="text-display-md md:text-display-lg font-bold text-text leading-tight">
                Connect with Our <span className="text-primary text-glow">Research Desk</span>
              </h2>

              <p className="text-body-md text-text-muted leading-relaxed">
                Have questions about our market models, swing signals, or portfolio frameworks? Submit your inquiry below and our analysts will review your requirements and respond promptly.
              </p>

              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#FAF8F4] border border-warm-border/80">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                    <Clock className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-text">Fast Desk Turnaround</p>
                    <p className="text-[11px] text-text-muted">Direct review within 4 business hours</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#FAF8F4] border border-warm-border/80">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 text-primary flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-text">100% Conflict-Free Models</p>
                    <p className="text-[11px] text-text-muted">Zero proprietary trading bias</p>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#FAF8F4] border border-warm-border/80">
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center shrink-0">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-text">Direct Mailbox</p>
                    <a href={`mailto:${BRAND.email.support}`} className="text-[11px] text-primary font-mono font-bold hover:underline truncate block">
                      {BRAND.email.support}
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#FAF8F4] border border-warm-border/80">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div className="overflow-hidden">
                    <p className="text-xs font-bold text-text">Direct Phone Hotline</p>
                    <a href={`tel:${BRAND.phone.direct}`} className="text-[11px] text-emerald-700 font-mono font-bold hover:underline truncate block">
                      {BRAND.phone.direct}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Interactive Inquiry Form */}
            <div className="lg:col-span-7 bg-[#FAF8F4] p-6 sm:p-8 md:p-10 rounded-3xl border border-warm-border shadow-sm">
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Topic selection */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text uppercase tracking-wider block">
                    Choose Advisory Focus
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {FOCUS_AREAS.map((topic) => {
                      const Icon = topic.icon;
                      const isSelected = selectedTopic === topic.label;
                      return (
                        <button
                          key={topic.id}
                          type="button"
                          onClick={() => setSelectedTopic(topic.label)}
                          className={`p-2.5 rounded-xl border text-left flex items-center gap-2 transition-all text-xs font-semibold ${
                            isSelected
                              ? "bg-primary text-white border-primary shadow-sm shadow-primary/20 scale-[1.01]"
                              : "bg-white text-text border-warm-border hover:border-primary/40 hover:bg-white"
                          }`}
                        >
                          <Icon className={`w-3.5 h-3.5 shrink-0 ${isSelected ? "text-white" : "text-primary"}`} />
                          <span className="truncate">{topic.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-text ml-0.5">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Suresh Kumar"
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
                    placeholder="suresh@example.com"
                    className="w-full bg-white border border-warm-border rounded-xl px-4 py-3 text-sm text-text focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-text ml-0.5">Message / Requirements *</label>
                  <textarea
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us about your portfolio size, time horizon, or specific stocks..."
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
                      Dispatching to Desk... <Loader2 className="w-4 h-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      Transmit to Research Desk <Send className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>

              {/* Feedback Alert */}
              <AnimatePresence>
                {status === "success" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="font-bold">Inquiry Transmitted!</p>
                      <p className="mt-0.5 text-emerald-700">{feedback}</p>
                    </div>
                  </motion.div>
                )}

                {status === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-4 p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs"
                  >
                    {feedback}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
