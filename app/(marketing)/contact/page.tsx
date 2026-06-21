"use client";

import { useState } from "react";
import Image from "next/image";
import {
  MapPin,
  Mail,
  Phone,
  Send,
  CheckCircle2,
  ShieldCheck,
  Globe,
  Loader2,
} from "lucide-react";
import { Reveal, GlassCard, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { BRAND } from "@/lib/constants";

export default function ContactPage() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("Equity Research");
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
      <section className="relative min-h-[35vh] flex flex-col items-center justify-center text-center overflow-hidden pt-[120px] lg:pt-[140px] pb-16">
        
        <div className="relative z-10 max-w-4xl px-6">
          <Reveal>
            <h1 className="text-display-lg text-on-surface mb-4 leading-tight">
              Direct Line to <span className="text-primary text-glow">Insight.</span>
            </h1>
            <p className="text-body-lg text-on-surface-variant max-w-2xl mx-auto">
              Connect with our premium research desk for institutional-grade market
              intelligence and bespoke portfolio strategies.
            </p>
          </Reveal>
        </div>
      </section>

      {/* Contact Cards Section */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-20 -mt-16 relative z-20">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Office Address */}
          <StaggerItem>
            <GlassCard className="p-8 flex flex-col items-center text-center rounded-2xl h-full border border-white/5">
              <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-6">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="text-headline-md font-bold mb-3">Office Address</h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                {BRAND.address.line1}
                <br />
                {BRAND.address.line2}
                <br />
                {BRAND.address.line3}
              </p>
            </GlassCard>
          </StaggerItem>

          {/* Direct Email */}
          <StaggerItem>
            <GlassCard className="p-8 flex flex-col items-center text-center rounded-2xl h-full border border-white/5">
              <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-6">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="text-headline-md font-bold mb-3">Direct Email</h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                Institutional: {BRAND.email.institutional}
                <br />
                Support: {BRAND.email.support}
              </p>
            </GlassCard>
          </StaggerItem>

          {/* Hotline */}
          <StaggerItem>
            <GlassCard className="p-8 flex flex-col items-center text-center rounded-2xl h-full border border-white/5">
              <div className="w-12 h-12 flex items-center justify-center bg-primary/10 text-primary rounded-full mb-6">
                <Phone className="w-6 h-6" />
              </div>
              <h3 className="text-headline-md font-bold mb-3">Hotline</h3>
              <p className="text-body-md text-on-surface-variant leading-relaxed">
                Toll Free: {BRAND.phone.tollFree}
                <br />
                Mon - Fri: 9:00 AM - 6:00 PM IST
              </p>
            </GlassCard>
          </StaggerItem>
        </StaggerContainer>
      </section>

      {/* Form and Map Section */}
      <section className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-20 py-24 grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Contact Form */}
        <Reveal className="flex flex-col gap-8" direction="left">
          <div>
            <h2 className="text-display-md mb-2">Send an Inquiry</h2>
            <p className="text-body-md text-on-surface-variant">
              Fill out the form below. Our analyst team typically responds within 4 business hours.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-label-md text-primary ml-1 block">Full Name</label>
                <input
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="bg-surface-container-low border border-outline-variant/30 p-4 rounded-xl text-body-md text-on-surface input-focus-glow transition-all"
                  placeholder="John Doe"
                  type="text"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-label-md text-primary ml-1 block">Email Address</label>
                <input
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-surface-container-low border border-outline-variant/30 p-4 rounded-xl text-body-md text-on-surface input-focus-glow transition-all"
                  placeholder="john@company.com"
                  type="email"
                />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-label-md text-primary ml-1 block">Service of Interest</label>
              <select
                value={interest}
                onChange={(e) => setInterest(e.target.value)}
                className="bg-surface-container-low border border-outline-variant/30 p-4 rounded-xl text-body-md text-on-surface input-focus-glow transition-all cursor-pointer"
              >
                <option>Equity Research</option>
                <option>Portfolio Management</option>
                <option>Institutional Advisory</option>
                <option>Compliance Support</option>
              </select>
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-label-md text-primary ml-1 block">Message</label>
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="bg-surface-container-low border border-outline-variant/30 p-4 rounded-xl text-body-md text-on-surface input-focus-glow transition-all resize-none"
                placeholder="Describe your investment goals or inquiry..."
                rows={6}
              />
            </div>
            
            <button
              className={`w-full py-4 font-bold rounded-xl active:scale-[0.98] transition-all flex items-center justify-center gap-2 text-label-md shadow-lg ${
                status === "success"
                  ? "bg-primary-container text-on-primary-container"
                  : "bg-primary text-on-primary hover:brightness-110 shadow-primary/20"
              }`}
              type="submit"
              disabled={status !== "idle"}
            >
              {status === "idle" && (
                <>
                  Initialize Contact <Send className="w-4 h-4" />
                </>
              )}
              {status === "sending" && (
                <>
                  Processing... <Loader2 className="w-4 h-4 animate-spin" />
                </>
              )}
              {status === "success" && (
                <>
                  Message Sent Successfully <CheckCircle2 className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </Reveal>

        {/* Map Component */}
        <Reveal
          className="relative group rounded-2xl overflow-hidden glass-card border-none shadow-2xl min-h-[500px] aspect-[4/3] w-full"
          direction="right"
        >
          <div className="absolute inset-0 grayscale opacity-60 transition-opacity group-hover:opacity-80">
            <Image
              src="/map.png"
              alt="Map of Hyderabad Financial District"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none" />
          <div className="absolute bottom-6 left-6 right-6 p-6 glass-card rounded-xl border border-white/10 relative z-10">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 bg-primary/20 text-primary flex items-center justify-center rounded-full shrink-0">
                <Globe className="w-5 h-5" />
              </div>
              <div>
                <p className="text-label-md text-primary mb-1 uppercase tracking-wider font-bold">
                  Our Location
                </p>
                <p className="text-body-md text-on-surface">Hyderabad Financial District, IN</p>
                <p className="text-label-sm text-on-surface-variant mt-1">
                  2 min walk from Westin Hotel
                </p>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      {/* Compliance Banner */}
      <section className="bg-surface-container-low py-8 border-y border-outline-variant/30">
        <div className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-20 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-surface-container-high flex items-center justify-center rounded-xl border border-outline-variant/30 text-tertiary">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-label-md text-on-surface font-bold">Corporate Registry</p>
              <p className="text-label-sm text-on-surface-variant">
                Registry ID: {BRAND.regNo}
              </p>
            </div>
          </div>
          <div className="flex gap-8">
            <div className="text-right">
              <p className="text-label-sm text-on-surface-variant">Advisory Compliance</p>
              <p className="text-label-md text-on-surface font-bold">ISO 27001 Certified</p>
            </div>
            <div className="text-right">
              <p className="text-label-sm text-on-surface-variant">Data Privacy</p>
              <p className="text-label-md text-on-surface font-bold">GDPR Compliant</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
