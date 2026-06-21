"use client";

import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import {
  CheckCircle2,
  XCircle,
  HelpCircle,
  ChevronDown,
  TrendingUp,
  Brain,
  ShieldCheck,
  Award,
  BookOpen,
  ArrowRight,
  Landmark,
  ShieldAlert,
} from "lucide-react";
import { Reveal, GlassCard, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { PLANS, BRAND } from "@/lib/constants";

export default function ServicesPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const faqs = [
    {
      q: "How do I receive the research calls?",
      a: "Calls are delivered via our proprietary dashboard and real-time Telegram channel for Professional and HNI members. Starter members receive them via Email and SMS alerts.",
    },
    {
      q: "Can I switch plans mid-quarter?",
      a: "Yes, you can upgrade to a higher tier at any time. The remaining balance of your current plan will be adjusted pro-rata against the new subscription cost.",
    },
    {
      q: "Do you offer 1-on-1 portfolio advice?",
      a: "Personalized advice is exclusively available to HNI Alpha plan members under a specific advisory agreement, strictly following our internal research regulations.",
    },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-20 w-full relative z-10 pt-[96px] lg:pt-[120px]">
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-120px)] gap-10">
      {/* Side Navigation Bar (Hidden on small screens) */}
      <aside className="w-full lg:w-[280px] shrink-0 bg-surface-container-low border-b lg:border-b-0 lg:border-r border-outline-variant/30 py-8 px-6 lg:sticky lg:top-[120px] lg:h-[calc(100vh-120px)] flex flex-col justify-between z-30">
        <div>
          <div className="mb-8">
            <h3 className="text-headline-md font-bold text-on-surface">Corporate Registry</h3>
            <p className="text-label-sm text-on-surface-variant">Registry ID: {BRAND.regNo}</p>
          </div>
          <nav className="space-y-1">
            <Link
              href="/dashboard"
              className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all rounded-xl text-label-md"
            >
              <span>Dashboard</span>
            </Link>
            <div className="flex items-center gap-3 px-4 py-3 text-primary font-bold bg-surface-container border-r-4 border-primary rounded-l-none rounded-xl text-label-md">
              <span>Market Analysis</span>
            </div>
            <Link
              href="/dashboard/portfolio"
              className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all rounded-xl text-label-md"
            >
              <span>Portfolio</span>
            </Link>
            <Link
              href="/research"
              className="flex items-center gap-3 px-4 py-3 text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-all rounded-xl text-label-md"
            >
              <span>Premium Insights</span>
            </Link>
          </nav>
        </div>

        <div className="mt-8 lg:mt-auto space-y-4">
          <div className="bg-primary/5 p-4 rounded-xl border border-primary/20">
            <p className="text-primary font-bold text-label-sm mb-1 uppercase tracking-wider">
              Professional Access
            </p>
            <p className="text-body-sm text-on-surface-variant mb-4">
              Unlock full sectoral depth and real-time research feed.
            </p>
            <Link
              href="/billing"
              className="block w-full text-center bg-primary text-on-primary py-2.5 rounded-lg font-bold text-label-sm hover:brightness-110 active:scale-95 transition-all"
            >
              Upgrade to Pro
            </Link>
          </div>
          <div className="border-t border-outline-variant/30 pt-4">
            <Link
              href="/support"
              className="flex items-center gap-3 px-4 py-2 text-on-surface-variant hover:text-primary transition-all text-label-sm"
            >
              <HelpCircle className="w-4 h-4" />
              <span>Help Center</span>
            </Link>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 py-12 lg:py-16 overflow-hidden">
        {/* Hero Section */}
        <section className="mb-16 text-center lg:text-left">
          <Reveal>
            <span className="text-label-md text-primary tracking-widest uppercase block mb-3 font-bold">
              Institutional Grade Research
            </span>
            <h1 className="text-display-lg max-w-4xl leading-tight mb-4">
              Expert Analysis for Every{" "}
              <span className="text-primary text-glow">Investor Type.</span>
            </h1>
            <p className="text-body-lg text-on-surface-variant max-w-2xl">
              Precision insights designed for the Indian equity markets. Move from curiosity to
              conviction with verified research analytics.
            </p>
          </Reveal>
        </section>

        {/* Pricing Grid */}
        <section className="mb-24">
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8 items-stretch">
            {PLANS.map((plan) => {
              const isPopular = plan.isPopular;
              return (
                <StaggerItem key={plan.id}>
                  <div
                    className={`p-8 rounded-3xl flex flex-col h-full transition-all duration-300 relative ${
                      isPopular
                        ? "bg-surface-container-high border-2 border-primary shadow-2xl scale-102 z-10"
                        : "glass-card border border-white/5 hover:border-primary/20"
                    }`}
                  >
                    {isPopular && (
                      <div className="absolute top-4 right-4 bg-primary text-on-primary px-3 py-1 rounded-full text-label-sm font-bold tracking-wider uppercase">
                        Recommended
                      </div>
                    )}
                    <div className="mb-6">
                      <span className="text-label-md text-primary px-2.5 py-1 bg-primary/10 rounded-lg font-bold uppercase tracking-wider">
                        {plan.name}
                      </span>
                      <h3 className="text-headline-lg mt-4 font-bold">{plan.altName}</h3>
                      <p className="text-body-sm text-on-surface-variant mt-1">
                        {plan.id === "starter" && "For individual long-term investors."}
                        {plan.id === "institutional" && "Active traders and portfolio managers."}
                        {plan.id === "hni-alpha" && "HNI, Family Offices & Corporates."}
                      </p>
                    </div>

                    <div className="text-display-md mb-8 flex items-baseline gap-1">
                      {plan.altPrice ? `₹${plan.altPrice.toLocaleString("en-IN")}` : "Custom"}
                      <span className="text-body-sm text-on-surface-variant">/{plan.period}</span>
                    </div>

                    <ul className="space-y-4 mb-8 flex-1">
                      {plan.altFeatures.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-body-sm text-on-surface">
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Link
                      href={plan.id === "hni-alpha" ? "/contact" : "/signup"}
                      className={`w-full py-4 rounded-xl text-headline-md font-bold text-center block transition-all ${
                        isPopular
                          ? "bg-primary text-on-primary hover:brightness-110 shadow-lg shadow-primary/20 active:scale-95"
                          : "border border-outline hover:bg-white/5 active:scale-95"
                      }`}
                    >
                      {plan.id === "hni-alpha" ? "Contact Sales" : "Subscribe Now"}
                    </Link>
                  </div>
                </StaggerItem>
              );
            })}
          </StaggerContainer>
        </section>

        {/* Service Breakdown (Bento Style) */}
        <section className="mb-24">
          <Reveal>
            <h2 className="text-headline-lg font-bold mb-8 pl-4 border-l-4 border-primary">
              Core Research Modules
            </h2>
          </Reveal>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:auto-rows-[280px]">
            {/* Cash Equity */}
            <div className="md:col-span-2 glass-card p-8 rounded-2xl flex flex-col justify-between group overflow-hidden relative border border-white/5 hover:border-primary/20 transition-all">
              <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:scale-110 transition-transform w-36 h-36 flex items-center justify-center">
                <TrendingUp className="w-full h-full text-primary" />
              </div>
              <div>
                <div className="h-12 w-12 bg-primary/10 rounded-xl flex items-center justify-center mb-6 text-primary border border-primary/20">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h4 className="text-headline-md font-bold mb-2">Cash Equity</h4>
                <p className="text-body-sm text-on-surface-variant max-w-sm">
                  Fundamental and technical analysis for blue-chip and mid-cap Indian stocks. Focused on capital preservation and steady growth.
                </p>
              </div>
              <Link href="/research" className="text-primary font-bold text-label-md flex items-center gap-1 group">
                Explore Module <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Derivatives */}
            <div className="md:col-span-2 glass-card p-8 rounded-2xl flex flex-col justify-between group overflow-hidden relative border border-white/5 hover:border-secondary/20 transition-all">
              <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:scale-110 transition-transform w-36 h-36 flex items-center justify-center">
                <Brain className="w-full h-full text-secondary" />
              </div>
              <div>
                <div className="h-12 w-12 bg-secondary/10 rounded-xl flex items-center justify-center mb-6 text-secondary border border-secondary/20">
                  <Brain className="w-6 h-6" />
                </div>
                <h4 className="text-headline-md font-bold mb-2">F&amp;O Strategies</h4>
                <p className="text-body-sm text-on-surface-variant max-w-sm">
                  Delta-neutral strategies, option greeks analysis, and high-probability derivative calls for sophisticated traders.
                </p>
              </div>
              <Link href="/research" className="text-secondary font-bold text-label-md flex items-center gap-1 group">
                View F&amp;O Tools <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Commodity */}
            <div className="md:col-span-1 glass-card p-6 rounded-2xl flex flex-col items-center text-center justify-center gap-3 border border-white/5 hover:border-tertiary/20 transition-all">
              <Award className="w-10 h-10 text-tertiary" />
              <h4 className="text-headline-md font-bold">Commodities</h4>
              <p className="text-label-sm text-on-surface-variant">Global exposure via MCX/NCDEX.</p>
            </div>

            {/* Tech/Algo */}
            <div className="md:col-span-1 glass-card p-6 rounded-2xl flex flex-col items-center text-center justify-center gap-3 border border-white/5 hover:border-primary/20 transition-all">
              <ShieldCheck className="w-10 h-10 text-primary" />
              <h4 className="text-headline-md font-bold">Algo Signals</h4>
              <p className="text-label-sm text-on-surface-variant">Quantitative driven research.</p>
            </div>

            {/* Reports */}
            <div className="md:col-span-2 glass-card p-8 rounded-2xl flex items-center gap-6 bg-gradient-to-r from-surface-container-high to-background border border-white/5">
              <div className="flex-1">
                <h4 className="text-headline-md font-bold mb-1">Daily Market Wrap</h4>
                <p className="text-body-sm text-on-surface-variant">
                  Every trading day at 4:30 PM IST. Direct to your inbox.
                </p>
              </div>
              <div className="w-20 h-20 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-primary">
                <BookOpen className="w-8 h-8" />
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="mb-24 p-12 rounded-3xl bg-surface-container-low border border-white/5 text-center">
          <ShieldCheck className="w-16 h-16 text-primary mx-auto mb-4" />
          <h2 className="text-headline-lg font-bold mb-3">Strict Compliance &amp; Safe Payments</h2>
          <p className="text-body-md text-on-surface-variant mb-8 max-w-2xl mx-auto">
            Investment in securities are subject to market risks. We only accept payments through official corporate bank accounts listed on our portal. Never share your OTP or PIN.
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60 hover:opacity-100 transition-all">
            <div className="flex items-center gap-2">
              <Landmark className="w-5 h-5 text-primary" />
              <span className="text-label-md font-bold">HDFC BANK</span>
            </div>
            <div className="flex items-center gap-2">
              <Landmark className="w-5 h-5 text-primary" />
              <span className="text-label-md font-bold">ICICI BANK</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-primary" />
              <span className="text-label-md font-bold">RAZORPAY SECURE</span>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="max-w-3xl mx-auto">
          <Reveal>
            <h2 className="text-display-md text-center mb-12">Frequently Asked Questions</h2>
          </Reveal>
          <div className="space-y-4">
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div key={idx} className="glass-card rounded-xl border border-white/5 overflow-hidden">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="flex justify-between items-center w-full p-6 text-left hover:bg-white/2 transition-colors cursor-pointer"
                  >
                    <span className="text-headline-md font-semibold text-on-surface">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-on-surface-variant transition-transform duration-300 ${
                        isOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-6 pb-6 pt-2 text-on-surface-variant text-body-md border-t border-white/5">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      </main>
      </div>
    </div>
  );
}
