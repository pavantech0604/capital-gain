"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  Calendar,
  Eye,
  ShieldCheck,
  UserPlus,
  CreditCard,
  BarChart3,
  HeadphonesIcon,
  Brain,
  Shield,
  TrendingUp,
  Rss,
  BookOpen,
  ClipboardCheck,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
} from "lucide-react";
import { ShaderBackground } from "@/components/effects/shader-background";
import { Reveal, GlassCard, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { BRAND, PLANS, DISCLAIMER } from "@/lib/constants";

export default function HomePage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden -mt-[128px] pt-[180px]">
        <ShaderBackground />

        <div className="relative z-10 max-w-4xl px-6">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-label-sm mb-6"
          >
            SEBI REGISTERED RESEARCH ANALYST
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-display-lg mb-4 leading-tight"
          >
            Professional Research.
            <br />
            <span className="text-primary text-glow">Informed Decisions.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="text-body-lg text-on-surface-variant mb-16 max-w-2xl mx-auto"
          >
            SEBI-registered insights for the serious investor. We provide
            data-driven market analysis to help you navigate Indian equities
            with confidence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="flex items-center justify-center gap-4 mb-16 flex-wrap"
          >
            <Link
              href="/services"
              className="bg-primary text-on-primary px-8 py-4 rounded-xl text-headline-md hover:shadow-[0_0_30px_rgba(78,222,163,0.3)] transition-all active:scale-95"
            >
              Start Free Trial
            </Link>
            <Link
              href="/about"
              className="border border-secondary text-secondary px-8 py-4 rounded-xl text-headline-md hover:bg-secondary/10 transition-all active:scale-95"
            >
              View Performance
            </Link>
          </motion.div>

          {/* Dashboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.9 }}
            className="relative w-full max-w-[1440px] mx-auto mt-8 hidden md:block"
          >
            <div className="glass-card rounded-t-2xl overflow-hidden shadow-2xl">
              {/* Browser Bar */}
              <div className="bg-surface-container-high h-12 flex items-center px-6 gap-4 border-b border-white/10">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-error" />
                  <div className="w-3 h-3 rounded-full bg-tertiary" />
                  <div className="w-3 h-3 rounded-full bg-primary" />
                </div>
                <div className="bg-surface-container-low px-4 py-1 rounded flex-grow max-w-md mx-auto text-on-surface-variant text-label-sm text-left opacity-60">
                  capitalgain.in/dashboard/analytics
                </div>
              </div>

              {/* Dashboard Mock Content */}
              <div className="p-6 bg-surface-container-low grid grid-cols-12 gap-6 h-[400px]">
                {/* Left KPIs */}
                <div className="col-span-3 flex flex-col gap-4">
                  <div className="h-24 bg-surface-container-high rounded-xl p-4 border border-white/5">
                    <p className="text-label-sm text-on-surface-variant opacity-60">
                      Portfolio Value
                    </p>
                    <p className="text-headline-md text-primary mt-1">
                      ₹42,85,200
                    </p>
                  </div>
                  <div className="h-24 bg-surface-container-high rounded-xl p-4 border border-white/5">
                    <p className="text-label-sm text-on-surface-variant opacity-60">
                      Today&apos;s P&amp;L
                    </p>
                    <p className="text-headline-md text-primary mt-1">
                      +₹18,400{" "}
                      <span className="text-label-sm">(1.2%)</span>
                    </p>
                  </div>
                  <div className="flex-grow bg-surface-container-high rounded-xl border border-white/5" />
                </div>

                {/* Center Chart */}
                <div className="col-span-6 bg-surface-container-high rounded-xl border border-white/5 relative p-6">
                  <div className="flex justify-between mb-6">
                    <div className="w-32 h-6 bg-surface-variant rounded-full" />
                    <div className="flex gap-2">
                      <div className="w-8 h-8 rounded bg-surface-variant" />
                      <div className="w-8 h-8 rounded bg-surface-variant" />
                    </div>
                  </div>
                  <div className="w-full h-48 border-b border-white/10 relative">
                    <svg className="w-full h-full" viewBox="0 0 400 100">
                      <path
                        d="M0 80 Q 50 20, 100 60 T 200 10 T 300 50 T 400 30"
                        fill="none"
                        stroke="#4edea3"
                        strokeWidth="3"
                      />
                    </svg>
                  </div>
                  <div className="mt-6 grid grid-cols-4 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="h-4 bg-surface-variant rounded-full"
                      />
                    ))}
                  </div>
                </div>

                {/* Right Research List */}
                <div className="col-span-3 flex flex-col gap-4">
                  <div className="h-full bg-surface-container-high rounded-xl border border-white/5 p-4">
                    <p className="text-label-md text-on-surface mb-4 font-bold">
                      Latest Research
                    </p>
                    <div className="space-y-2">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="h-10 bg-surface-variant/50 rounded p-1 flex items-center gap-2"
                        >
                          <div className="w-2 h-2 rounded-full bg-primary" />
                          <div className="h-2 w-full bg-on-surface-variant/30 rounded-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ TRUST METRICS ═══ */}
      <section className="py-16 max-w-[1440px] mx-auto px-6">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: Calendar,
              color: "text-primary",
              bgColor: "bg-primary/10",
              title: "Registered since 2024",
              desc: "Long-term market perspective and stability.",
            },
            {
              icon: Eye,
              color: "text-secondary",
              bgColor: "bg-secondary/10",
              title: "100% Transparent",
              desc: "Open disclosure of tracking and performance metrics.",
            },
            {
              icon: ShieldCheck,
              color: "text-tertiary",
              bgColor: "bg-tertiary/10",
              title: "Official Payments",
              desc: "Strict compliance with official banking channels only.",
            },
          ].map((item) => (
            <StaggerItem key={item.title}>
              <GlassCard className="p-8 flex items-center gap-6">
                <div
                  className={`w-16 h-16 rounded-full ${item.bgColor} flex items-center justify-center ${item.color} shrink-0`}
                >
                  <item.icon className="w-7 h-7" />
                </div>
                <div>
                  <h3 className="text-headline-md text-on-surface">
                    {item.title}
                  </h3>
                  <p className="text-body-sm text-on-surface-variant">
                    {item.desc}
                  </p>
                </div>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ═══ GETTING STARTED ═══ */}
      <section className="py-16 bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-[1440px] mx-auto px-6 text-center mb-12">
          <Reveal>
            <h2 className="text-display-md text-on-surface mb-4">
              Getting Started
            </h2>
            <p className="text-body-lg text-on-surface-variant">
              Access premium research in three simple steps.
            </p>
          </Reveal>
        </div>
        <StaggerContainer className="max-w-[1440px] mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-12">
          {[
            {
              num: "01",
              icon: UserPlus,
              title: "Register Account",
              desc: "Create your profile and verify your KYC details for regulatory compliance.",
            },
            {
              num: "02",
              icon: CreditCard,
              title: "Subscribe",
              desc: "Choose a plan that fits your investing style and complete official payment.",
            },
            {
              num: "03",
              icon: BarChart3,
              title: "Access Research",
              desc: "Gain instant access to our real-time dashboard and deep research reports.",
            },
          ].map((step, i) => (
            <StaggerItem key={step.num}>
              <div className="relative group">
                <div className="text-[120px] font-bold text-primary/5 absolute -top-16 -left-4 pointer-events-none select-none">
                  {step.num}
                </div>
                <GlassCard className="p-8 relative z-10 border-b-4 !border-b-primary transition-transform group-hover:-translate-y-2">
                  <step.icon className="w-9 h-9 text-primary mb-4" />
                  <h3 className="text-headline-md text-on-surface mb-2">
                    {step.title}
                  </h3>
                  <p className="text-body-md text-on-surface-variant">
                    {step.desc}
                  </p>
                </GlassCard>
                {i < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-8 text-primary/30 z-20">
                    <ArrowRight className="w-12 h-12" />
                  </div>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ═══ WHY CHOOSE US ═══ */}
      <section className="py-16 max-w-[1440px] mx-auto px-6 grid grid-cols-12 gap-12 items-center">
        <Reveal className="col-span-12 lg:col-span-5">
          <h2 className="text-display-md text-on-surface mb-6">
            A Framework Built on{" "}
            <span className="text-primary">Integrity</span>
          </h2>
          <p className="text-body-lg text-on-surface-variant mb-8">
            We aren&apos;t just another signal provider. We are a research
            institution dedicated to the highest standards of financial analysis
            and investor protection.
          </p>
          <div className="space-y-6">
            {[
              {
                icon: CheckCircle2,
                title: "SEBI Registration",
                desc: "Strict adherence to Regulation 20 of SEBI (Research Analysts) Regulations, 2014.",
              },
              {
                icon: Shield,
                title: "Zero Conflict",
                desc: "We do not manage funds or trade against our recommendations. Your success is our only KPI.",
              },
            ].map((item) => (
              <div key={item.title} className="flex gap-4">
                <item.icon className="w-5 h-5 text-primary mt-1 shrink-0" />
                <div>
                  <h4 className="text-headline-md text-on-surface">
                    {item.title}
                  </h4>
                  <p className="text-body-sm text-on-surface-variant">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal
          delay={0.2}
          className="col-span-12 lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6"
        >
          {[
            {
              icon: HeadphonesIcon,
              title: "24/7 Support",
              desc: "Priority desk for all institutional and retail premium members.",
              h: "h-auto min-h-[220px] md:h-64",
            },
            {
              icon: Brain,
              title: "Deep Expertise",
              desc: "Analytic models backtested across multiple market cycles and regimes.",
              h: "h-auto min-h-[220px] md:h-72 md:translate-y-6",
            },
            {
              icon: Shield,
              title: "Compliance First",
              desc: "Full audit trail for every recommendation published.",
              h: "h-auto min-h-[220px] md:h-64",
            },
            {
              icon: TrendingUp,
              title: "Actionable Alpha",
              desc: "High-conviction ideas with clear entry, exit, and risk parameters.",
              h: "h-auto min-h-[220px] md:h-72 md:translate-y-6",
            },
          ].map((card) => (
            <GlassCard
              key={card.title}
              className={`p-6 ${card.h} flex flex-col justify-end group transition-colors hover:bg-surface-container-high`}
            >
              <card.icon className="w-6 h-6 text-primary mb-4 transition-transform group-hover:scale-110" />
              <h3 className="text-headline-md mb-2">{card.title}</h3>
              <p className="text-body-sm text-on-surface-variant">
                {card.desc}
              </p>
            </GlassCard>
          ))}
        </Reveal>
      </section>

      {/* ═══ PRODUCT SHOWCASE (BENTO) ═══ */}
      <section className="py-16 bg-surface-container-low/50">
        <div className="max-w-[1440px] mx-auto px-6">
          <Reveal>
            <h2 className="text-display-md text-center mb-12">
              The Analyst Dashboard
            </h2>
          </Reveal>

          <div className="grid grid-cols-12 gap-6 md:auto-rows-[280px]">
            <Reveal className="col-span-12 md:col-span-8">
              <GlassCard className="!rounded-3xl p-8 overflow-hidden relative group h-full">
                <div className="relative z-10 flex flex-col h-full">
                  <Rss className="w-9 h-9 text-primary mb-4" />
                  <h3 className="text-headline-lg mb-4">
                    Real-time Recommendation Feed
                  </h3>
                  <p className="text-body-lg text-on-surface-variant max-w-md">
                    Institutional-grade alerts with precise price targets and
                    stop-losses, pushed directly to your dashboard.
                  </p>
                </div>
                <div className="absolute bottom-0 right-0 w-1/2 h-full bg-surface-container-high rounded-tl-3xl border-l border-t border-white/10 p-4 translate-y-12 transition-transform group-hover:translate-y-4 hidden md:block">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center bg-surface-container-low p-2 rounded-lg">
                      <div className="w-12 h-4 bg-primary/20 rounded" />
                      <div className="w-8 h-4 bg-primary rounded" />
                    </div>
                    <div className="flex justify-between items-center bg-surface-container-low p-2 rounded-lg opacity-50">
                      <div className="w-16 h-4 bg-on-surface-variant/20 rounded" />
                      <div className="w-8 h-4 bg-on-surface-variant/20 rounded" />
                    </div>
                  </div>
                </div>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.15} className="col-span-12 md:col-span-4">
              <GlassCard className="!rounded-3xl p-8 flex flex-col justify-center text-center h-full">
                <div className="w-20 h-20 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <BookOpen className="w-9 h-9 text-secondary" />
                </div>
                <h3 className="text-headline-lg mb-4">Report Library</h3>
                <p className="text-body-md text-on-surface-variant">
                  Over 500+ deep-dive sectoral and thematic research papers.
                </p>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.2} className="col-span-12 md:col-span-4">
              <GlassCard className="!rounded-3xl p-8 flex flex-col items-center justify-center text-center h-full">
                <div className="w-20 h-20 bg-tertiary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <ClipboardCheck className="w-9 h-9 text-tertiary" />
                </div>
                <h3 className="text-headline-lg mb-4">Compliance Center</h3>
                <p className="text-body-md text-on-surface-variant">
                  Automated record-keeping for your investment advisory history.
                </p>
              </GlassCard>
            </Reveal>

            <Reveal delay={0.25} className="col-span-12 md:col-span-8">
              <GlassCard className="!rounded-3xl p-8 flex flex-col md:flex-row gap-8 items-center h-full">
                <div className="flex-1">
                  <h3 className="text-headline-lg mb-4">
                    Mobile-Ready Analysis
                  </h3>
                  <p className="text-body-md text-on-surface-variant">
                    Access your research on the go. Optimized for desktop
                    performance with lightning-fast mobile syncing.
                  </p>
                </div>
                <div className="w-full md:w-1/3 aspect-[9/16] bg-surface-container-high rounded-2xl border border-white/10 overflow-hidden relative max-h-[200px]">
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent" />
                  <div className="p-4 space-y-4">
                    <div className="h-4 w-1/2 bg-on-surface-variant/20 rounded" />
                    <div className="h-24 w-full bg-surface-container-low rounded-lg" />
                    <div className="h-4 w-3/4 bg-on-surface-variant/20 rounded" />
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ SUBSCRIPTION PLANS ═══ */}
      <section className="py-16 max-w-[1440px] mx-auto px-6">
        <Reveal>
          <div className="text-center mb-12">
            <h2 className="text-display-md mb-4">Subscription Plans</h2>
            <p className="text-body-lg text-on-surface-variant">
              Choose the research access that matches your portfolio size.
            </p>
          </div>
        </Reveal>

        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {PLANS.map((plan) => (
            <StaggerItem key={plan.id}>
              <div
                className={`p-8 rounded-3xl flex flex-col h-full ${
                  plan.isPopular
                    ? "bg-surface-container-high border-2 border-primary relative shadow-2xl scale-105 z-10"
                    : "glass-card border border-white/5"
                }`}
              >
                {plan.isPopular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-primary text-on-primary px-6 py-1 rounded-full text-label-sm font-bold">
                    MOST POPULAR
                  </div>
                )}
                <p
                  className={`text-label-md mb-4 uppercase ${
                    plan.isPopular
                      ? "text-primary"
                      : "text-on-surface-variant"
                  }`}
                >
                  {plan.name}
                </p>
                <h3 className="text-display-md mb-8">
                  {plan.price ? `₹${plan.price.toLocaleString("en-IN")}` : "Custom"}
                  <span className="text-label-md text-on-surface-variant">
                    /{plan.period}
                  </span>
                </h3>
                <ul className="space-y-4 mb-12 flex-grow">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-center gap-2 ${
                        plan.isPopular
                          ? "text-on-surface"
                          : "text-on-surface-variant"
                      }`}
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link
                  href={plan.id === "hni-alpha" ? "/contact" : "/services"}
                  className={`w-full py-4 rounded-xl text-headline-md text-center block transition-all ${
                    plan.isPopular
                      ? "bg-primary text-on-primary hover:brightness-110 shadow-lg shadow-primary/20"
                      : "border border-outline hover:bg-white/5"
                  }`}
                >
                  {plan.cta}
                </Link>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ═══ COMPLIANCE SPOTLIGHT ═══ */}
      <section className="py-16 bg-surface-container-lowest">
        <div className="max-w-[1440px] mx-auto px-6">
          <Reveal>
            <GlassCard className="p-12 !rounded-3xl border-l-4 !border-l-primary" hover={false}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                <div className="max-w-2xl">
                  <h2 className="text-headline-lg text-on-surface mb-4">
                    Compliance Spotlight
                  </h2>
                  <p className="text-body-md text-on-surface-variant">
                    {BRAND.fullName} is a SEBI Registered Research Analyst (Reg
                    No: {BRAND.sebiRegNo}). We do not engage in any activities
                    related to fund management or trading that could present a
                    conflict of interest with our published research. All
                    recommendations are based on fundamental and technical
                    analysis performed by qualified professionals.
                  </p>
                </div>
                <div className="text-left md:text-right shrink-0">
                  <div className="bg-surface-container-high p-6 rounded-xl inline-block border border-outline-variant">
                    <p className="text-label-sm text-primary mb-1">
                      SEBI REGISTRATION NO.
                    </p>
                    <p className="text-headline-md text-on-surface">
                      {BRAND.sebiRegNo}
                    </p>
                  </div>
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* ═══ PAYMENT SAFETY ═══ */}
      <section className="py-8">
        <div className="max-w-[1440px] mx-auto px-6">
          <Reveal>
            <div className="bg-error-container/10 border border-error/20 p-8 rounded-2xl flex items-start md:items-center gap-6 flex-col md:flex-row">
              <AlertTriangle className="w-16 h-16 text-error shrink-0" />
              <div>
                <h3 className="text-headline-md text-error mb-2 uppercase tracking-wider">
                  Payment Safety Warning
                </h3>
                <p className="text-body-md text-on-error-container">
                  Always ensure payments are made only to the official company
                  bank account of &quot;{BRAND.fullName}&quot;. We NEVER request
                  payments via personal UPI IDs, Telegram bots, or third-party
                  wallets. If you receive such a request, report it immediately
                  to our compliance officer.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
