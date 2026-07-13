"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Rocket,
  CreditCard,
  Terminal,
  ArrowRight,
  ShieldCheck,
  Mail,
  MapPin,
  FileCheck2,
  ExternalLink,
  Gavel,
  ShieldAlert,
  Loader2,
  CheckCircle2,
} from "lucide-react";
import { Reveal, GlassCard, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { BRAND } from "@/lib/constants";

export default function SupportPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Technical Assistance");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        setStatus("idle");
        setFullName("");
        setEmail("");
        setMessage("");
      }, 3000);
    }, 1500);
  };

  return (
    <>
      <section className="relative flex flex-col items-center justify-center text-center overflow-hidden pt-[120px] lg:pt-[140px] pb-16">
        
        
        <div className="relative z-10 max-w-4xl px-6">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-label-sm mb-6 uppercase tracking-wider"
          >
            Investor Care
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-display-lg mb-6 leading-tight"
          >
            Investor First <span className="text-primary text-glow">Support</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="text-body-lg text-on-surface-variant mb-10 max-w-2xl mx-auto"
          >
            Our dedicated compliance and support team ensures that your investment journey is
            transparent, secure, and fully assisted at every step.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex items-center justify-center gap-4 flex-wrap"
          >
            <a
              href="#grievance"
              className="bg-primary text-on-primary px-8 py-4 rounded-xl text-headline-md hover:shadow-[0_0_30px_rgba(78,222,163,0.3)] transition-all active:scale-95"
            >
              Report a Grievance
            </a>
            <a
              href="#contact"
              className="border border-secondary text-secondary px-8 py-4 rounded-xl text-headline-md hover:bg-secondary/10 transition-all active:scale-95"
            >
              Direct Message
            </a>
          </motion.div>
        </div>
      </section>

      {/* Quick Help Cards */}
      <section className="py-24 bg-surface-container-lowest border-y border-outline-variant/30">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-20">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <StaggerItem>
              <GlassCard className="p-8 flex flex-col justify-between h-full border border-white/5 group">
                <div>
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary border border-primary/20">
                    <Rocket className="w-6 h-6" />
                  </div>
                  <h3 className="text-headline-md font-bold mb-3">Onboarding</h3>
                  <p className="text-body-sm text-on-surface-variant mb-6 leading-relaxed">
                    Need help setting up your analyst profile or completing KYC? Our team assists with institutional-grade documentation.
                  </p>
                </div>
                <Link
                  href="/signup"
                  className="text-primary font-bold text-label-md flex items-center gap-1 group-hover:gap-2 transition-all mt-4"
                >
                  Explore Guides <ArrowRight className="w-4 h-4" />
                </Link>
              </GlassCard>
            </StaggerItem>

            {/* Card 2 */}
            <StaggerItem>
              <GlassCard className="p-8 flex flex-col justify-between h-full border border-white/5 group">
                <div>
                  <div className="w-12 h-12 bg-tertiary/10 rounded-xl flex items-center justify-center mb-6 text-tertiary border border-tertiary/20">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <h3 className="text-headline-md font-bold mb-3">Subscription Help</h3>
                  <p className="text-body-sm text-on-surface-variant mb-6 leading-relaxed">
                    Manage your premium research access, billing queries, and renewal schedules through our simplified portal.
                  </p>
                </div>
                <Link
                  href="/dashboard/billing"
                  className="text-tertiary font-bold text-label-md flex items-center gap-1 group-hover:gap-2 transition-all mt-4"
                >
                  Billing Portal <ArrowRight className="w-4 h-4" />
                </Link>
              </GlassCard>
            </StaggerItem>

            {/* Card 3 */}
            <StaggerItem>
              <GlassCard className="p-8 flex flex-col justify-between h-full border border-white/5 group">
                <div>
                  <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-6 text-secondary border border-secondary/20">
                    <Terminal className="w-6 h-6" />
                  </div>
                  <h3 className="text-headline-md font-bold mb-3">Technical Support</h3>
                  <p className="text-body-sm text-on-surface-variant mb-6 leading-relaxed">
                    Facing issues with data visualization tools or dashboard access? Get real-time fixes for technical bottlenecks.
                  </p>
                </div>
                <a
                  href="#contact"
                  className="text-secondary font-bold text-label-md flex items-center gap-1 group-hover:gap-2 transition-all mt-4"
                >
                  Open Support Ticket <ArrowRight className="w-4 h-4" />
                </a>
              </GlassCard>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Grievance Redressal */}
      <section className="py-24 max-w-[1440px] mx-auto px-6 md:px-12 xl:px-20 scroll-mt-24" id="grievance">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          <Reveal className="flex flex-col" direction="left">
            <h2 className="text-display-md mb-6 font-bold">Grievance Redressal Process</h2>
            <p className="text-body-lg text-on-surface-variant mb-12">
              We value our clients and have a structured mechanism to address any concerns. In case
              of any dissatisfaction, please follow this escalation matrix.
            </p>

            <div className="space-y-10">
              <div className="relative pl-12">
                <div className="absolute left-0 top-0 w-8 h-8 bg-primary/20 text-primary border border-primary/30 rounded-full flex items-center justify-center font-bold font-mono">
                  1
                </div>
                <h4 className="text-headline-md text-on-surface font-semibold">Level 1: Compliance Support</h4>
                <p className="text-body-md text-on-surface-variant mt-2">
                  Reach out to our primary support desk at {BRAND.email.support}. Response within 48 business hours.
                </p>
              </div>

              <div className="relative pl-12">
                <div className="absolute left-0 top-0 w-8 h-8 bg-tertiary/20 text-tertiary border border-tertiary/30 rounded-full flex items-center justify-center font-bold font-mono">
                  2
                </div>
                <h4 className="text-headline-md text-on-surface font-semibold">Level 2: Compliance Officer</h4>
                <p className="text-body-md text-on-surface-variant mt-2">
                  If unresolved within 7 days, escalate to our Compliance Officer, {BRAND.complianceOfficer.name} at {BRAND.complianceOfficer.email}.
                </p>
              </div>

              <div className="relative pl-12">
                <div className="absolute left-0 top-0 w-8 h-8 bg-secondary/20 text-secondary border border-secondary/30 rounded-full flex items-center justify-center font-bold font-mono">
                  3
                </div>
                <h4 className="text-headline-md text-on-surface font-semibold">Level 3: External Resolution Desk</h4>
                <p className="text-body-md text-on-surface-variant mt-2">
                  If still not satisfied, you may lodge a formal arbitration request through our corporate resolution partners.
                </p>
                <Link
                  className="mt-4 inline-flex items-center gap-2 bg-surface-container-high px-5 py-2.5 rounded-xl border border-outline-variant/30 hover:border-primary transition-all text-label-sm text-primary font-bold animate-pulse-subtle"
                  href="/disclosure"
                >
                  Visit Disclosures <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Compliance Officer Card */}
          <Reveal className="h-full" direction="right">
            <GlassCard className="p-8 h-full flex flex-col justify-between border border-white/5" hover={false}>
              <div>
                <div className="flex items-center gap-4 mb-8">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-primary relative shrink-0">
                    <Image
                      src="/compliance_officer.png"
                      alt={BRAND.complianceOfficer.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-headline-md font-bold text-on-surface">
                      {BRAND.complianceOfficer.name}
                    </h4>
                    <p className="text-primary font-label-sm uppercase tracking-wider font-bold">
                      {BRAND.complianceOfficer.designation}
                    </p>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <MapPin className="w-5 h-5 text-outline mt-0.5 shrink-0" />
                    <div>
                      <p className="text-on-surface font-bold text-body-md">Registered Office</p>
                      <p className="text-on-surface-variant text-body-sm mt-0.5">
                        {BRAND.address.full}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <FileCheck2 className="w-5 h-5 text-outline mt-0.5 shrink-0" />
                    <div>
                      <p className="text-on-surface font-bold text-body-md">Registry No</p>
                      <p className="text-label-md text-primary font-bold mt-0.5">
                        {BRAND.regNo}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <Mail className="w-5 h-5 text-outline mt-0.5 shrink-0" />
                    <div>
                      <p className="text-on-surface font-bold text-body-md">Direct Email</p>
                      <p className="text-on-surface-variant text-body-sm mt-0.5">
                        {BRAND.complianceOfficer.email}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-12 pt-6 border-t border-outline-variant/30 text-body-sm text-on-surface-variant leading-relaxed">
                Registry Code: {BRAND.regNo}. In case of any grievances, investors can also
                contact our compliance officer directly at {BRAND.complianceOfficer.email}.
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 border-y border-outline-variant/30 bg-surface-container-low">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-20">
          <div className="flex flex-wrap justify-center items-center gap-12 opacity-60 hover:opacity-100 transition-all duration-500">
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-5 h-5 text-primary" />
              <span className="text-label-sm text-on-surface uppercase tracking-wider font-bold">
                ISO 27001 Certified
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Gavel className="w-5 h-5 text-primary" />
              <span className="text-label-sm text-on-surface uppercase tracking-wider font-bold">
                Compliance First Architecture
              </span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-primary" />
              <span className="text-label-sm text-on-surface uppercase tracking-wider font-bold">
                Corporate Registry
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Support Form Section */}
      <section className="py-24 relative scroll-mt-24" id="contact">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-20 relative z-10">
          <div className="flex flex-col lg:flex-row gap-16">
            <Reveal className="lg:w-1/3 flex flex-col gap-6" direction="left">
              <div>
                <h2 className="text-display-md mb-2">Direct Support</h2>
                <p className="text-body-md text-on-surface-variant">
                  Fill out the form below for any non-urgent queries or technical assistance requests.
                </p>
              </div>
              <div className="space-y-4">
                <div className="glass-card p-5 rounded-xl border-l-4 border-primary">
                  <p className="text-on-surface font-bold text-body-md">Standard SLA</p>
                  <p className="text-body-sm text-on-surface-variant mt-1">
                    Response within 24 business hours
                  </p>
                </div>
                <div className="glass-card p-5 rounded-xl border-l-4 border-secondary">
                  <p className="text-on-surface font-bold text-body-md">Priority Support</p>
                  <p className="text-body-sm text-on-surface-variant mt-1">
                    For Institutional &amp; HNI clients
                  </p>
                </div>
              </div>
            </Reveal>

            <Reveal className="lg:w-2/3 glass-card p-8 md:p-12 rounded-3xl" direction="right">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-label-md text-on-surface-variant ml-1">Full Name</label>
                  <input
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="bg-background border border-outline-variant/30 rounded-xl p-4 text-on-surface focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="John Doe"
                    type="text"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-label-md text-on-surface-variant ml-1">Email Address</label>
                  <input
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-background border border-outline-variant/30 rounded-xl p-4 text-on-surface focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all"
                    placeholder="john@example.com"
                    type="email"
                  />
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-label-md text-on-surface-variant ml-1">Subject</label>
                  <select
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="bg-background border border-outline-variant/30 rounded-xl p-4 text-on-surface focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all cursor-pointer"
                  >
                    <option>Technical Assistance</option>
                    <option>Subscription Query</option>
                    <option>Feedback</option>
                    <option>Others</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2 md:col-span-2">
                  <label className="text-label-md text-on-surface-variant ml-1">Your Message</label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="bg-background border border-outline-variant/30 rounded-xl p-4 text-on-surface focus:ring-1 focus:ring-primary focus:border-primary outline-none transition-all resize-none"
                    placeholder="How can we help you today?"
                    rows={5}
                  />
                </div>
                <div className="md:col-span-2 flex justify-end">
                  <button
                    className={`px-8 py-4 font-bold rounded-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-label-md shadow-lg ${
                      status === "success"
                        ? "bg-primary-container text-on-primary-container"
                        : "bg-primary text-on-primary hover:brightness-110 shadow-primary/20"
                    }`}
                    type="submit"
                    disabled={status !== "idle"}
                  >
                    {status === "idle" && "Send Inquiry"}
                    {status === "sending" && (
                      <>
                        Processing... <Loader2 className="w-4 h-4 animate-spin" />
                      </>
                    )}
                    {status === "success" && (
                      <>
                        Sent Successfully <CheckCircle2 className="w-4 h-4" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}
