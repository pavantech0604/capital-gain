"use client";

import { useState } from "react";
import {
  MapPin,
  Mail,
  Phone,
  Send,
  CheckCircle2,
  ShieldCheck,
  Loader2,
  Sparkles,
  Clock,
  TrendingUp,
} from "lucide-react";
import { Reveal, GlassCard, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { BRAND } from "@/lib/constants";

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("Equity Research");
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
          fullName,
          email,
          phone,
          interest,
          message,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setFeedback(data.message || "Thank you! Your inquiry has been successfully sent to our advisory desk. We will reach out to you promptly.");
        setTimeout(() => {
          setFullName("");
          setEmail("");
          setPhone("");
          setMessage("");
        }, 800);
      } else {
        setStatus("error");
        setFeedback(data.error || "Unable to send. Please email capitalgrow8651@gmail.com or call +91 7659801348 directly.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setFeedback("Network connection error. Please email capitalgrow8651@gmail.com or call +91 7659801348 directly.");
    }
  };

  return (
    <>
      <section className="relative flex flex-col items-center justify-center text-center overflow-hidden pt-[120px] lg:pt-[140px] pb-16">
        <div className="relative z-10 max-w-4xl px-6">
          <Reveal>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5" /> Direct Analyst Communication
            </div>
            <h1 className="text-display-lg text-on-surface mb-4 leading-tight font-bold">
              Direct Line to <span className="text-primary text-glow">Market Insight.</span>
            </h1>
            <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Connect with our quantitative equity research desk. We deliver data-backed market analysis, swing frameworks, and rapid advisory support.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact Cards Section */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-20 -mt-10 relative z-20">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Direct Email */}
          <StaggerItem>
            <GlassCard className="p-7 flex flex-col items-center text-center rounded-2xl h-full border border-warm-border/80 hover:border-primary/40 transition-all">
              <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-4">
                <Mail className="w-5 h-5" />
              </div>
              <h3 className="text-headline-md font-bold mb-2">Direct Mailbox</h3>
              <p className="text-body-sm text-on-surface-variant font-mono mb-3">
                {BRAND.email.support}
              </p>
              <a
                href={`mailto:${BRAND.email.support}`}
                className="text-xs font-bold text-primary hover:underline mt-auto"
              >
                Send Email Directly &rarr;
              </a>
            </GlassCard>
          </StaggerItem>

          {/* Hotline */}
          <StaggerItem>
            <GlassCard className="p-7 flex flex-col items-center text-center rounded-2xl h-full border border-warm-border/80 hover:border-primary/40 transition-all">
              <div className="w-12 h-12 flex items-center justify-center bg-emerald-500/10 text-emerald-600 rounded-full mb-4">
                <Phone className="w-5 h-5" />
              </div>
              <h3 className="text-headline-md font-bold mb-2">Research Desk</h3>
              <p className="text-body-sm text-on-surface-variant font-mono mb-3">
                {BRAND.phone.direct}
              </p>
              <a
                href={`tel:${BRAND.phone.direct}`}
                className="text-xs font-bold text-emerald-600 hover:underline mt-auto"
              >
                Call Analyst Desk &rarr;
              </a>
            </GlassCard>
          </StaggerItem>

          {/* Operating Hours */}
          <StaggerItem>
            <GlassCard className="p-7 flex flex-col items-center text-center rounded-2xl h-full border border-warm-border/80 hover:border-primary/40 transition-all">
              <div className="w-12 h-12 flex items-center justify-center bg-blue-500/10 text-blue-600 rounded-full mb-4">
                <Clock className="w-5 h-5" />
              </div>
              <h3 className="text-headline-md font-bold mb-2">Market Hours</h3>
              <p className="text-body-sm text-on-surface-variant mb-3">
                Mon - Fri: {BRAND.marketHours}
              </p>
              <span className="text-xs font-bold text-blue-600 mt-auto flex items-center justify-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" />
                NSE &amp; BSE Live Coverage
              </span>
            </GlassCard>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* Form Section */}
      <section className="max-w-[768px] mx-auto px-6 md:px-12 xl:px-20 py-20 flex flex-col gap-12 items-center">
        <Reveal className="flex flex-col gap-8 w-full" direction="up">
          <div className="text-center">
            <h2 className="text-display-md mb-2 font-bold">Submit Your Inquiry</h2>
            <p className="text-body-md text-on-surface-variant">
              Fill out the form below. Inquiries are instantly routed to our advisory desk for rapid review and response.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-5 bg-white p-6 sm:p-8 rounded-3xl border border-warm-border shadow-sm">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-primary ml-1 block uppercase tracking-wider">Full Name *</label>
                <input
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-surface-container-low border border-outline-variant/30 p-4 rounded-xl text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  placeholder="e.g. Anand K"
                  type="text"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-primary ml-1 block uppercase tracking-wider">Phone Number</label>
                <input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="bg-surface-container-low border border-outline-variant/30 p-4 rounded-xl text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                  placeholder="+91 98765 43210"
                  type="tel"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-primary ml-1 block uppercase tracking-wider">Email Address *</label>
              <input
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-surface-container-low border border-outline-variant/30 p-4 rounded-xl text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
                placeholder="anand@example.com"
                type="email"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-primary ml-1 block uppercase tracking-wider">Service of Interest</label>
              <select
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="bg-surface-container-low border border-outline-variant/30 p-4 rounded-xl text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all cursor-pointer"
              >
                <option>Equity Research (Swing &amp; Momentum)</option>
                <option>Long-Term Portfolio Restructuring</option>
                <option>HNI Alpha Advisory Desk</option>
                <option>Institutional Research Access</option>
                <option>General Market Inquiry</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-xs font-bold text-primary ml-1 block uppercase tracking-wider">Message *</label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-surface-container-low border border-outline-variant/30 p-4 rounded-xl text-body-md text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all resize-none"
                placeholder="Describe your capital allocation, trading style, or specific research requirement..."
                rows={5}
              />
            </div>

            <button
              className="w-full py-4 font-bold rounded-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-label-md shadow-lg bg-primary text-on-primary hover:brightness-110 shadow-primary/20 disabled:opacity-75"
              type="submit"
              disabled={status === "sending"}
            >
              {status === "idle" && (
                <>
                  Transmit Inquiry to Desk <Send className="w-4 h-4" />
                </>
              )}
              {status === "sending" && (
                <>
                  Dispatching to Desk... <Loader2 className="w-4 h-4 animate-spin" />
                </>
              )}
              {status === "success" && (
                <>
                  Inquiry Dispatched Successfully <CheckCircle2 className="w-4 h-4" />
                </>
              )}
              {status === "error" && (
                <>
                  Retry Transmission <Send className="w-4 h-4" />
                </>
              )}
            </button>

            {status === "success" && (
              <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 text-xs flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <p className="font-bold">Transmission Confirmed</p>
                  <p className="text-emerald-700 mt-0.5">{feedback}</p>
                </div>
              </div>
            )}

            {status === "error" && (
              <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-900 text-xs">
                {feedback}
              </div>
            )}
          </form>
        </Reveal>
      </section>

      {/* Desk Status Banner */}
      <section className="bg-surface-container-low py-8 border-y border-outline-variant/30">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-20 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-surface-container-high flex items-center justify-center rounded-xl border border-outline-variant/30 text-primary">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-label-md text-on-surface font-bold">Equity Research Desk</p>
              <p className="text-label-sm text-emerald-600 font-semibold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                Active Market Coverage • 09:15 - 15:30 IST
              </p>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="text-right">
              <p className="text-label-sm text-on-surface-variant">Response SLA</p>
              <p className="text-label-md text-on-surface font-bold">&lt; 4 Business Hours</p>
            </div>
            <div className="text-right">
              <p className="text-label-sm text-on-surface-variant">Mailbox</p>
              <p className="text-label-md text-on-surface font-mono font-bold text-xs">{BRAND.email.support}</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
