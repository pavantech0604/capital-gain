"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  ArrowUpRight,
  ChevronDown,
  ChevronRight,
  Activity,
  Zap,
  Lock,
  Layers
} from "lucide-react";
import { Reveal, GlassCard, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { BRAND, PLANS, DISCLAIMER } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Recent Research recommendations mock data
const RECENT_SIGNALS = [
  {
    company: "Tata Motors Ltd.",
    ticker: "TATAMOTORS",
    type: "Swing Trade",
    entry: 910,
    target: 985,
    stopLoss: 870,
    status: "Target Met",
    gain: "+8.2%",
    color: "success"
  },
  {
    company: "Infosys Ltd.",
    ticker: "INFY",
    type: "Sectoral Alpha",
    entry: 1480,
    target: 1620,
    stopLoss: 1420,
    status: "Target Met",
    gain: "+9.5%",
    color: "success"
  },
  {
    company: "Reliance Industries",
    ticker: "RELIANCE",
    type: "Core Growth",
    entry: 2420,
    target: 2700,
    stopLoss: 2310,
    status: "Active",
    gain: "+3.1%",
    color: "primary"
  }
];

// FAQS data
const FAQS = [
  {
    q: "What is the core methodology of Capital Gain?",
    a: "We employ quantitative and fundamental models to identify high-probability swing and growth setups in Indian equities. Our research process is fully system-driven to eliminate emotional bias."
  },
  {
    q: "How are recommendations delivered?",
    a: "All active stock recommendations and deep research reports are instantly pushed to your premium dashboard. You will also receive real-time notifications via email and priority SMS/WhatsApp alerts."
  },
  {
    q: "Do you offer guaranteed returns or portfolio management?",
    a: "No. We operate purely as a research publisher. We do not offer personalized investment advice, guaranteed returns, or portfolio fund management. All trades involve market risk and are executed at the investor's discretion."
  },
  {
    q: "What is your refund policy?",
    a: "We maintain a transparent refund policy. Please refer to our Refund Policy page. As research insights are delivered immediately, we recommend starting with shorter-duration trial plans."
  }
];

export default function HomePage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const toggleFaq = (idx: number) => {
    setActiveFaq(activeFaq === idx ? null : idx);
  };

  return (
    <div className="relative min-h-screen bg-bg overflow-hidden">
      
      {/* ═══ DECORATIVE BACKGROUNDS ═══ */}
      <div className="blur-blob-gold top-[30%] -right-40" />
      <div className="blur-blob-teal top-[60%] left-[-20%]" />

      {/* ═══ HERO SECTION ═══ */}
      <section className="relative z-10 pt-[120px] md:pt-[140px] lg:pt-[180px] pb-16 md:pb-24 px-4 sm:px-6 md:px-12 xl:px-20 max-w-[1440px] mx-auto flex flex-col items-center justify-center text-center overflow-hidden">
        
        {/* Animated Background Stock Chart Line */}
        <div className="absolute inset-0 z-0 opacity-20 overflow-hidden select-none pointer-events-none flex items-center justify-center">
          <svg className="w-[120%] h-[70%] min-w-[1000px] text-primary" viewBox="0 0 1000 300" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="chartGlow" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="var(--primary)" stopOpacity="0.1" />
                <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.35" />
                <stop offset="100%" stopColor="var(--primary)" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            {/* Live Chart Line Path */}
            <motion.path
              d="M0,180 Q100,100 200,200 T400,120 T600,240 T800,90 T1000,180"
              stroke="url(#chartGlow)"
              strokeWidth="2"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 4, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
            />
            {/* Glowing nodes at major peaks */}
            <circle cx="200" cy="200" r="3.5" fill="var(--primary)" className="animate-pulse" />
            <circle cx="400" cy="120" r="3.5" fill="var(--accent)" className="animate-pulse" />
            <circle cx="600" cy="240" r="3.5" fill="var(--primary)" className="animate-pulse" />
            <circle cx="800" cy="90" r="3.5" fill="var(--accent)" className="animate-pulse" />
          </svg>
        </div>

        {/* Subtle grid and candlestick overlays */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none opacity-40 z-0" />

        {/* Left Margin Candlesticks */}
        <div className="absolute left-10 top-1/4 h-64 w-12 hidden xl:flex flex-col gap-5 opacity-10 select-none pointer-events-none z-0">
          <div className="w-[1.5px] h-16 bg-success rounded-full mx-auto relative">
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3.5 h-8 bg-success/80 border border-success/45 rounded-sm" />
          </div>
          <div className="w-[1.5px] h-20 bg-danger rounded-full mx-auto relative">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3.5 h-12 bg-danger/80 border border-danger/45 rounded-sm" />
          </div>
        </div>
        {/* Right Margin Candlesticks */}
        <div className="absolute right-10 top-1/3 h-64 w-12 hidden xl:flex flex-col gap-5 opacity-10 select-none pointer-events-none z-0">
          <div className="w-[1.5px] h-20 bg-success rounded-full mx-auto relative">
            <div className="absolute top-5 left-1/2 -translate-x-1/2 w-3.5 h-10 bg-success/80 border border-success/45 rounded-sm" />
          </div>
          <div className="w-[1.5px] h-16 bg-danger rounded-full mx-auto relative">
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-3.5 h-8 bg-danger/80 border border-danger/45 rounded-sm" />
          </div>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-4xl flex flex-col items-center">
          
          {/* Live Indicator */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/30 rounded-full text-[10px] font-mono text-primary font-bold mb-4 shadow-[0_0_10px_rgba(14,165,164,0.15)]"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            <span className="tracking-widest uppercase">Live Market Insights Active</span>
          </motion.div>

          {/* Trust Badge */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95, filter: "blur(5px)" }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="inline-flex items-center gap-2 px-4 py-1.5 bg-accent-soft border border-accent/30 rounded-full text-label-sm text-accent mb-8 shadow-[0_0_15px_rgba(212,166,71,0.1)]"
          >
            <Shield className="w-3.5 h-3.5 text-accent animate-pulse-subtle" />
            <span className="font-semibold tracking-wider">PREMIUM EQUITY RESEARCH & STRATEGY</span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            initial={{ opacity: 0, y: 30, filter: "blur(10px)", scale: 0.98 }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            transition={{ delay: 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-display-lg mb-6 leading-[1.08] tracking-tight relative z-10"
          >
            Institutional-Grade Research.<br />
            <span className="animated-gradient-text text-glow-strong">
              Wealth Strategy Perfected.
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-body-lg text-text-muted mb-10 max-w-2xl font-medium relative z-10"
          >
            Empowering serious investors with data-driven equity models, clear entry-exit frameworks, and absolute transparency in compliance with institutional risk standards.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15, filter: "blur(6px)", scale: 0.98 }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)", scale: 1 }}
            transition={{ delay: 0.45, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col sm:flex-row items-center gap-4 sm:gap-5 mb-16 md:mb-24 w-full justify-center relative z-10"
          >
            <Link
              href="/services"
              className="btn-accent px-6 sm:px-10 py-4 sm:py-4.5 rounded-2xl text-headline-md w-full sm:w-auto text-center flex items-center justify-center gap-2 group transition-all duration-300 active:scale-95"
            >
              <span>Subscribe to Research</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
            </Link>
            <Link
              href="/about"
              className="btn-secondary px-6 sm:px-10 py-4 sm:py-4.5 rounded-2xl text-headline-md w-full sm:w-auto text-center flex items-center justify-center gap-2 transition-all duration-300 active:scale-95 bg-surface/30 border border-border/60 hover:bg-surface-strong/50"
            >
              <span>Performance Track</span>
            </Link>
          </motion.div>
        </div>

        {/* ═══ FLOATING STAT WIDGETS & PREVIEW ═══ */}
        <div className="relative w-full max-w-[800px] xl:max-w-[1000px] 2xl:max-w-[1200px] mt-8 md:mt-16 lg:mt-28 mb-12 lg:mb-16 mx-auto flex flex-col items-center">
          
          {/* Responsive Widgets Container (Grid on mobile, Absolute on Desktop) */}
          <div className="grid grid-cols-2 gap-3 md:gap-4 w-full max-w-[500px] mb-10 lg:mb-0 lg:max-w-none lg:block z-20">
            {/* Floating Widget 1: Accuracy Rate */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:absolute lg:left-[-40px] xl:left-[-80px] 2xl:left-[-120px] lg:top-[15%]"
            >
              <div className="w-full lg:w-52 p-4 lg:p-5 glass-card rounded-2xl lg:rounded-3xl lg:animate-float-slow shadow-xl lg:shadow-2xl flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left gap-3 lg:gap-4 hover-glow-card">
                <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-xl lg:rounded-2xl bg-success/10 border border-success/30 flex items-center justify-center text-success shrink-0">
                  <TrendingUp className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] lg:text-[11px] font-mono text-text-muted uppercase tracking-wider">Avg Accuracy</p>
                  <p className="text-headline-md font-bold text-success mt-0.5">89.2%</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Widget 2: Active Traders */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="lg:absolute lg:right-[-40px] xl:right-[-80px] 2xl:right-[-120px] lg:top-[25%]"
            >
              <div className="w-full lg:w-52 p-4 lg:p-5 glass-card rounded-2xl lg:rounded-3xl lg:animate-float-medium shadow-xl lg:shadow-2xl flex flex-col lg:flex-row items-center lg:items-start text-center lg:text-left gap-3 lg:gap-4 hover-glow-card">
                <div className="w-10 h-10 lg:w-11 lg:h-11 rounded-xl lg:rounded-2xl bg-primary/10 border border-primary/30 flex items-center justify-center text-primary shrink-0">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[10px] lg:text-[11px] font-mono text-text-muted uppercase tracking-wider">Active Traders</p>
                  <p className="text-headline-md font-bold text-primary mt-0.5">15k+</p>
                </div>
              </div>
            </motion.div>

            {/* Floating Widget 3: Live Signals */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.0, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="col-span-2 lg:col-span-1 lg:absolute lg:left-[-30px] xl:left-[-60px] 2xl:left-[-90px] lg:bottom-[20%]"
            >
              <div className="w-full lg:w-60 p-4 lg:p-4.5 glass-card rounded-2xl lg:rounded-3xl lg:animate-float-medium shadow-xl lg:shadow-2xl flex items-center gap-3.5 hover-glow-card">
                <span className="relative flex h-3 w-3 shrink-0">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
                </span>
                <div className="flex-1 text-left">
                  <p className="text-[10px] lg:text-[11px] font-mono text-text-muted uppercase tracking-wider">Real-time Signals</p>
                  <p className="text-body-sm font-semibold text-text mt-0.5">TATAMOTORS Target Met</p>
                </div>
                <ArrowUpRight className="w-4 h-4 text-primary shrink-0" />
              </div>
            </motion.div>

            {/* Floating Widget 4: Compliance Integrity */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="hidden lg:block lg:absolute lg:right-[-30px] xl:right-[-60px] 2xl:right-[-100px] lg:bottom-[15%]"
            >
              <div className="w-56 p-5 glass-card rounded-3xl animate-float-slow shadow-2xl flex items-center gap-4 hover-glow-card-gold">
                <div className="w-11 h-11 rounded-2xl bg-accent-soft border border-accent/20 flex items-center justify-center text-accent shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-[11px] font-mono text-text-muted uppercase tracking-wider">Audit Trail</p>
                  <p className="text-body-sm font-bold text-accent mt-0.5">100% Verified</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Dashboard Preview Box */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full relative z-10"
          >
            <div className="glass-card-solid rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-border/40">
              {/* Browser Header Bar */}
              <div className="bg-[#0b1020] h-14 flex items-center px-6 justify-between border-b border-border/40">
                <div className="flex gap-2">
                  <div className="w-3.5 h-3.5 rounded-full bg-danger/70" />
                  <div className="w-3.5 h-3.5 rounded-full bg-accent/70" />
                  <div className="w-3.5 h-3.5 rounded-full bg-primary/70" />
                </div>
                <div className="bg-surface-strong/50 px-8 py-1.5 rounded-lg border border-border/20 max-w-sm w-full text-text-muted text-label-sm text-center opacity-70">
                  capitalgain.in/dashboard/insights
                </div>
                <div className="w-10 h-2 bg-transparent" /> {/* Spacer */}
              </div>

              {/* Dashboard Content Mock */}
              <div className="p-6 md:p-8 bg-surface-strong/20 grid grid-cols-12 gap-6 min-h-[350px]">
                
                {/* Stats Sidebar */}
                <div className="col-span-12 md:col-span-4 flex flex-col gap-4">
                  <div className="bg-surface-strong/40 rounded-2xl p-5 border border-border/30 hover:border-primary/20 transition-colors">
                    <p className="text-[11px] font-mono text-text-muted uppercase tracking-wider">Research Coverage</p>
                    <p className="text-display-md font-bold text-primary mt-1">₹42,85,200</p>
                    <span className="text-body-sm text-success font-medium flex items-center gap-1 mt-1">
                      <TrendingUp className="w-4 h-4" /> Portfolio allocation indicator
                    </span>
                  </div>
                  <div className="bg-surface-strong/40 rounded-2xl p-5 border border-border/30 hover:border-primary/20 transition-colors">
                    <p className="text-[11px] font-mono text-text-muted uppercase tracking-wider">Recommendations Today</p>
                    <p className="text-display-md font-bold text-accent mt-1">+₹18,400</p>
                    <span className="text-body-sm text-accent/80 font-medium">Intraday / Swing Alpha</span>
                  </div>
                </div>

                {/* Central Graph Box */}
                <div className="col-span-12 md:col-span-8 bg-surface-strong/30 rounded-2xl border border-border/30 p-6 flex flex-col justify-between relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-primary" />
                      <span className="text-body-sm font-heading font-bold text-text">Live Equities Analytics</span>
                    </div>
                    <div className="flex gap-2">
                      <span className="px-2.5 py-1 bg-primary/10 border border-primary/20 rounded-md text-[10px] font-mono text-primary font-bold">1M</span>
                      <span className="px-2.5 py-1 bg-surface-strong rounded-md text-[10px] font-mono text-text-muted">3M</span>
                      <span className="px-2.5 py-1 bg-surface-strong rounded-md text-[10px] font-mono text-text-muted">YTD</span>
                    </div>
                  </div>

                  {/* Chart Line Visualization */}
                  <div className="w-full h-40 border-b border-border/20 relative mt-4">
                    <svg className="w-full h-full" viewBox="0 0 500 100" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="#0ea5a4" stopOpacity="0.25" />
                          <stop offset="100%" stopColor="#0ea5a4" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M0 80 Q 75 35, 150 65 T 300 20 T 450 50 T 500 15"
                        fill="none"
                        stroke="#0ea5a4"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        className="drop-shadow-[0_0_8px_rgba(14,165,164,0.6)]"
                      />
                      <path
                        d="M0 80 Q 75 35, 150 65 T 300 20 T 450 50 T 500 15 L 500 100 L 0 100 Z"
                        fill="url(#chartGradient)"
                      />
                    </svg>
                  </div>
                  <div className="mt-4 flex justify-between text-[10px] font-mono text-text-muted">
                    <span>Jun 01</span>
                    <span>Jun 07</span>
                    <span>Jun 14</span>
                    <span>Jun 21 (Today)</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ═══ TRUST METRICS STRIP ═══ */}
      <section className="py-16 md:py-20 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 xl:px-20 relative z-10">
        <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
          {[
            {
              icon: Calendar,
              color: "text-primary border-primary/20 bg-primary/5",
              title: "Est. Registered Analyst",
              desc: "Providing disciplined market analysis cycle over cycle.",
            },
            {
              icon: Eye,
              color: "text-accent border-accent/20 bg-accent/5",
              title: "100% Verified Track",
              desc: "All historical recommendations stored with clear entry-exit targets.",
            },
            {
              icon: ShieldCheck,
              color: "text-success border-success/20 bg-success/5",
              title: "Official Bank Channels Only",
              desc: "Strictly compliant payments via corporate channels.",
            },
          ].map((item) => (
            <StaggerItem key={item.title}>
              <GlassCard className="p-6 md:p-8 flex gap-4 md:gap-6 hover-glow-card items-start">
                <div
                  className={`w-14 h-14 rounded-2xl border flex items-center justify-center shrink-0 ${item.color}`}
                >
                  <item.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-headline-md font-bold text-text mb-1">
                    {item.title}
                  </h3>
                  <p className="text-body-sm text-text-muted">
                    {item.desc}
                  </p>
                </div>
              </GlassCard>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </section>

      {/* ═══ THREE-STEP GETTING STARTED ═══ */}
      <section className="py-16 md:py-24 bg-surface-strong/20 border-y border-border/40 relative z-10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 xl:px-20">
          <div className="text-center mb-12 md:mb-16 max-w-xl mx-auto">
            <Reveal>
              <h2 className="text-display-md text-text mb-4">
                Access Premium Research
              </h2>
              <p className="text-body-md text-text-muted">
                Begin your journey toward disciplined capital growth in three structured phases.
              </p>
            </Reveal>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                num: "01",
                icon: UserPlus,
                title: "KYC & Registration",
                desc: "Complete your basic profile configuration and KYC checklist in compliance with risk management guidelines.",
              },
              {
                num: "02",
                icon: CreditCard,
                title: "Select Research Tier",
                desc: "Choose an equity advisory framework that aligns with your capital allocations and portfolio strategy.",
              },
              {
                num: "03",
                icon: BarChart3,
                title: "Access Dashboard",
                desc: "Get immediate access to active swing recommendations, long-term portfolios, and research files.",
              },
            ].map((step, i) => (
              <StaggerItem key={step.num}>
                <div className="relative group h-full">
                  {/* Floating Giant Number Back */}
                  <div className="text-[100px] font-heading font-extrabold text-primary/5 absolute -top-14 -left-4 pointer-events-none select-none transition-colors group-hover:text-primary/10">
                    {step.num}
                  </div>
                  <GlassCard className="p-6 md:p-8 relative z-10 border-b-2 hover-glow-card !border-b-primary/50 group-hover:!border-b-primary h-full flex flex-col justify-between">
                    <div>
                      <step.icon className="w-8 h-8 text-primary mb-6 group-hover:scale-105 transition-transform" />
                      <h3 className="text-headline-md font-bold text-text mb-3">
                        {step.title}
                      </h3>
                      <p className="text-body-sm text-text-muted">
                        {step.desc}
                      </p>
                    </div>
                  </GlassCard>
                  {i < 2 && (
                    <div className="hidden lg:flex absolute top-[40%] -right-5 text-primary/20 z-20 animate-pulse-subtle">
                      <ArrowRight className="w-8 h-8" />
                    </div>
                  )}
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ WHY CHOOSE US (BENTO GRID STYLE) ═══ */}
      <section className="py-16 md:py-24 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 xl:px-20 relative z-10">
        <div className="text-center mb-12 md:mb-16 max-w-xl mx-auto">
          <Reveal>
            <h2 className="text-display-md text-text mb-4">
              A Framework Built on <span className="text-primary text-glow font-bold">Integrity</span>
            </h2>
            <p className="text-body-md text-text-muted">
              We stand apart from speculative signal setups. We operate as a professional research publisher.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4 md:gap-6 lg:auto-rows-[220px]">
          {/* Grid Item 1: Standard Compliance Details */}
          <Reveal className="col-span-1 md:col-span-2 lg:col-span-7 h-full">
            <GlassCard className="p-6 md:p-8 flex flex-col justify-between h-full hover-glow-card-gold relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-accent/5 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="w-10 h-10 rounded-xl bg-accent-soft border border-accent/20 flex items-center justify-center text-accent mb-4">
                  <Shield className="w-5 h-5" />
                </div>
                <h3 className="text-headline-lg font-bold text-text mb-2">Compliance & Risk Standards</h3>
                <p className="text-body-sm text-text-muted max-w-lg">
                  Strict compliance with institutional risk standards. All research parameters are verified by qualified risk personnel before publishing.
                </p>
              </div>
            </GlassCard>
          </Reveal>

          {/* Grid Item 2: Zero Conflict */}
          <Reveal delay={0.1} className="col-span-1 md:col-span-1 lg:col-span-5 h-full">
            <GlassCard className="p-6 md:p-8 flex flex-col justify-between h-full hover-glow-card relative">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                  <Lock className="w-5 h-5" />
                </div>
                <h3 className="text-headline-lg font-bold text-text mb-2">Zero Conflict Model</h3>
                <p className="text-body-sm text-text-muted">
                  We do not execute client funds or trade against recommendations. We are purely research publishers.
                </p>
              </div>
            </GlassCard>
          </Reveal>

          {/* Grid Item 3: Deep Expertise */}
          <Reveal delay={0.15} className="col-span-1 md:col-span-1 lg:col-span-4 h-full">
            <GlassCard className="p-6 md:p-8 flex flex-col justify-between h-full hover-glow-card relative">
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                  <Brain className="w-5 h-5" />
                </div>
                <h3 className="text-headline-lg font-bold text-text mb-2">Quantitative Models</h3>
                <p className="text-body-sm text-text-muted">
                  Algorithms backtested across business cycles to generate high probability swing setups.
                </p>
              </div>
            </GlassCard>
          </Reveal>

          {/* Grid Item 4: Support Desk */}
          <Reveal delay={0.2} className="col-span-1 md:col-span-2 lg:col-span-8 h-full">
            <GlassCard className="p-6 md:p-8 flex flex-col justify-between h-full hover-glow-card relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl pointer-events-none" />
              <div>
                <div className="w-10 h-10 rounded-xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                  <HeadphonesIcon className="w-5 h-5" />
                </div>
                <h3 className="text-headline-lg font-bold text-text mb-2">Priority Support Desk</h3>
                <p className="text-body-sm text-text-muted max-w-lg">
                  Dedicated desk access for Institutional and HNI members. Instant synchronization via client portals.
                </p>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* ═══ RECENT RECOMMENDATIONS / SIGNALS LOG ═══ */}
      <section className="py-16 md:py-24 bg-[#0a0f1e] border-y border-border/40 relative z-10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 xl:px-20">
          <div className="text-center mb-12 md:mb-16 max-w-xl mx-auto">
            <Reveal>
              <h2 className="text-display-md text-text mb-4">
                Recent Recommendations Log
              </h2>
              <p className="text-body-md text-text-muted">
                Transparent verification of recent research setups published on our platform.
              </p>
            </Reveal>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {RECENT_SIGNALS.map((sig) => (
              <StaggerItem key={sig.ticker}>
                <div className="p-[1px] rounded-3xl bg-gradient-to-b from-border/50 via-border/20 to-transparent hover:from-primary/30 transition-all duration-300">
                  <div className="bg-surface-strong/35 backdrop-blur-md p-5 sm:p-6.5 rounded-[23px] border border-border/10 flex flex-col justify-between h-full">
                    <div>
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <p className="text-[12px] font-mono text-text-muted">{sig.ticker}</p>
                          <h4 className="text-headline-md font-bold text-text mt-0.5">{sig.company}</h4>
                        </div>
                        <span className={`px-3 py-1.5 rounded-full text-label-sm font-bold uppercase tracking-wider text-[10px] ${
                          sig.status === "Target Met" 
                            ? "bg-success/10 text-success border border-success/20" 
                            : "bg-primary/10 text-primary border border-primary/20"
                        }`}>
                          {sig.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2 py-4 border-y border-border/20 my-4 text-center">
                        <div>
                          <p className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Entry</p>
                          <p className="text-body-sm font-bold text-text mt-1">₹{sig.entry}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Target</p>
                          <p className="text-body-sm font-bold text-primary mt-1">₹{sig.target}</p>
                        </div>
                        <div>
                          <p className="text-[10px] font-mono text-text-muted uppercase tracking-wider">Stop Loss</p>
                          <p className="text-body-sm font-bold text-danger mt-1">₹{sig.stopLoss}</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-2">
                      <span className="text-body-sm text-text-muted font-medium">{sig.type}</span>
                      <span className="text-headline-md font-extrabold text-success text-glow">{sig.gain}</span>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ THE ANALYST DASHBOARD SHOWCASE (BENTO) ═══ */}
      <section className="py-16 md:py-24 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 xl:px-20 relative z-10">
        <div className="text-center mb-12 md:mb-16 max-w-xl mx-auto">
          <Reveal>
            <h2 className="text-display-md text-text mb-4">
              The Analyst Dashboard
            </h2>
            <p className="text-body-md text-text-muted">
              Discover the terminal interface loaded with real-time research pipelines.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 lg:auto-rows-[280px]">
          {/* Main Feed Card */}
          <Reveal className="col-span-1 md:col-span-12 lg:col-span-8">
            <GlassCard className="p-6 md:p-8 overflow-hidden relative group h-full hover-glow-card">
              <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent z-0 pointer-events-none" />
              <div className="relative z-10 flex flex-col justify-between h-full">
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-5">
                    <Rss className="w-5 h-5" />
                  </div>
                  <h3 className="text-headline-lg font-bold text-text mb-3">
                    Real-time Recommendation Feed
                  </h3>
                  <p className="text-body-sm text-text-muted max-w-md mb-6 lg:mb-0">
                    Instant setups detailing precise price boundaries, active technical chart triggers, and direct analyst annotations.
                  </p>
                </div>
                <div className="flex items-center gap-2 text-primary font-heading font-semibold text-body-sm group-hover:translate-x-1.5 transition-transform cursor-pointer">
                  <span>Explore dashboard features</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>

              {/* Decorative Mock Overlay */}
              <div className="absolute bottom-0 right-0 w-80 h-44 bg-bg-soft rounded-tl-3xl border-l border-t border-border/40 p-4.5 translate-y-12 transition-transform group-hover:translate-y-4 hidden md:block z-10">
                <div className="space-y-3 text-body-sm">
                  <div className="flex justify-between items-center bg-[#070b16] border border-border/40 p-2.5 rounded-xl">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-success" />
                      <span className="font-mono text-xs text-text">INFY Target Met</span>
                    </div>
                    <span className="text-xs font-bold text-success">+9.5%</span>
                  </div>
                  <div className="flex justify-between items-center bg-[#070b16] border border-border/40 p-2.5 rounded-xl opacity-50">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-primary" />
                      <span className="font-mono text-xs text-text">RELIANCE Active</span>
                    </div>
                    <span className="text-xs font-bold text-primary">+3.1%</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </Reveal>

          {/* Research Library */}
          <Reveal delay={0.1} className="col-span-1 md:col-span-6 lg:col-span-4">
            <GlassCard className="p-6 md:p-8 flex flex-col justify-between h-full hover-glow-card-gold text-center items-center">
              <div className="w-14 h-14 bg-accent-soft rounded-2xl border border-accent/20 flex items-center justify-center text-accent mx-auto">
                <BookOpen className="w-6 h-6" />
              </div>
              <div className="my-6 lg:my-0">
                <h3 className="text-headline-lg font-bold text-text mb-2">Report Library</h3>
                <p className="text-body-sm text-text-muted">
                  Over 500+ deep-dive sectoral analyses, thematic papers, and macro-equity models.
                </p>
              </div>
              <span className="text-xs font-mono text-accent font-semibold tracking-wider uppercase">Institutional Access</span>
            </GlassCard>
          </Reveal>

          {/* Compliance Card */}
          <Reveal delay={0.15} className="col-span-1 md:col-span-6 lg:col-span-4">
            <GlassCard className="p-6 md:p-8 flex flex-col justify-between h-full hover-glow-card text-center items-center">
              <div className="w-14 h-14 bg-primary/10 rounded-2xl border border-primary/20 flex items-center justify-center text-primary mx-auto">
                <ClipboardCheck className="w-6 h-6" />
              </div>
              <div className="my-6 lg:my-0">
                <h3 className="text-headline-lg font-bold text-text mb-2">Audit Compliance</h3>
                <p className="text-body-sm text-text-muted">
                  Verifiable advisory history records automatically archived to protect client integrity.
                </p>
              </div>
              <span className="text-xs font-mono text-primary font-semibold tracking-wider uppercase">Audit Log Ready</span>
            </GlassCard>
          </Reveal>

          {/* Mobile sync Card */}
          <Reveal delay={0.2} className="col-span-1 md:col-span-12 lg:col-span-8">
            <GlassCard className="p-6 md:p-8 flex flex-col md:flex-row gap-6 md:gap-8 items-center h-full hover-glow-card relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-t from-primary/5 to-transparent z-0 pointer-events-none" />
              <div className="flex-1 z-10 flex flex-col justify-between h-full">
                <div>
                  <div className="w-11 h-11 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4">
                    <Layers className="w-5 h-5" />
                  </div>
                  <h3 className="text-headline-lg font-bold text-text mb-2">
                    Multi-Device Sync
                  </h3>
                  <p className="text-body-sm text-text-muted mb-6 md:mb-0">
                    Your research is synchronized instantly across desktop, browser, and mobile alerts. Zero latency alerts on the go.
                  </p>
                </div>
                <p className="text-xs text-text-muted/60 font-mono hidden md:block">Optimized for Vercel edge deployment</p>
              </div>
              
              {/* Decorative Mock phone */}
              <div className="w-full md:w-48 aspect-[16/9] md:aspect-[9/15] bg-[#070b16] rounded-2xl border border-border/60 overflow-hidden relative z-10 shrink-0">
                <div className="absolute top-0 inset-x-0 h-4 bg-bg flex items-center justify-center">
                  <div className="w-12 h-1.5 rounded-full bg-border/40" />
                </div>
                <div className="p-4 pt-8 space-y-3">
                  <div className="h-3 w-1/2 bg-primary/20 rounded-md" />
                  <div className="h-10 w-full bg-surface-strong/50 rounded-xl border border-border/20 p-2 text-[9px] font-mono text-text-muted flex justify-between items-center">
                    <span>ALERT: INFY Buy</span>
                    <ChevronRight className="w-2.5 h-2.5" />
                  </div>
                  <div className="h-3 w-3/4 bg-border/25 rounded-md" />
                </div>
              </div>
            </GlassCard>
          </Reveal>
        </div>
      </section>

      {/* ═══ SUBSCRIPTION PLANS ═══ */}
      <section className="py-16 md:py-24 bg-[#0a0f1e] border-y border-border/40 relative z-10">
        <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 xl:px-20">
          <Reveal>
            <div className="text-center mb-12 md:mb-16 max-w-xl mx-auto">
              <h2 className="text-display-md text-text mb-4">Subscription Plans</h2>
              <p className="text-body-md text-text-muted">
                Choose the research framework matching your capital boundaries.
              </p>
            </div>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
            {PLANS.map((plan) => (
              <StaggerItem key={plan.id} className="h-full">
                <div
                  className={cn(
                    "p-8 rounded-3xl flex flex-col justify-between h-full transition-all duration-300",
                    plan.isPopular
                      ? "gradient-border-gold relative shadow-[0_20px_40px_rgba(212,166,71,0.12)] scale-105 z-10"
                      : "glass-card hover-glow-card"
                  )}
                >
                  {plan.isPopular && (
                    <div className="absolute -top-4.5 left-1/2 -translate-x-1/2 bg-accent text-bg px-5 py-1 rounded-full text-label-sm font-black tracking-widest uppercase">
                      MOST POPULAR
                    </div>
                  )}

                  <div>
                    <p
                      className={cn(
                        "text-label-md uppercase tracking-wider mb-4 font-bold",
                        plan.isPopular ? "text-accent text-glow-gold" : "text-text-muted"
                      )}
                    >
                      {plan.name}
                    </p>
                    <h3 className="text-display-md text-text mb-8 flex items-baseline gap-1">
                      {plan.price ? `₹${plan.price.toLocaleString("en-IN")}` : "Custom"}
                      <span className="text-label-md text-text-muted font-normal lowercase">
                        /{plan.period}
                      </span>
                    </h3>

                    <ul className="space-y-4 mb-10">
                      {plan.features.map((feature) => (
                        <li
                          key={feature}
                          className="flex items-center gap-3 text-body-sm text-text"
                        >
                          <CheckCircle2 className="w-5 h-5 text-primary shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Link
                    href={plan.id === "hni-alpha" ? "/contact" : "/services"}
                    className={cn(
                      "w-full py-4 rounded-2xl text-headline-md text-center block transition-all duration-300 active:scale-95 font-bold font-heading",
                      plan.isPopular
                        ? "btn-accent shadow-lg shadow-accent/20"
                        : "btn-secondary bg-surface/30 hover:bg-surface-strong/50 border border-border/50"
                    )}
                  >
                    {plan.cta}
                  </Link>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ INTERACTIVE COLLAPSIBLE FAQ SECTION ═══ */}
      <section className="py-16 md:py-24 max-w-[1000px] mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="text-display-md text-text mb-4">Frequently Asked Questions</h2>
            <p className="text-body-md text-text-muted">
              Get answers regarding our research methodology, compliance structures, and operations.
            </p>
          </Reveal>
        </div>

        <div className="space-y-4">
          {FAQS.map((faq, idx) => {
            const isOpen = activeFaq === idx;
            return (
              <Reveal key={idx} delay={idx * 0.05}>
                <div className="glass-card rounded-2xl overflow-hidden border border-border/40 transition-all duration-350">
                  <button
                    onClick={() => toggleFaq(idx)}
                    className="w-full p-6 flex justify-between items-center text-left hover:bg-surface-strong/20 transition-colors"
                  >
                    <span className="text-headline-md font-bold text-text pr-4">{faq.q}</span>
                    <ChevronDown className={cn("w-5 h-5 text-primary shrink-0 transition-transform duration-300", isOpen && "rotate-180")} />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-6 pt-0 border-t border-border/20 text-body-sm text-text-muted leading-relaxed">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ═══ COMPLIANCE SPOTLIGHT CARD ═══ */}
      <section className="py-12 md:py-16 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 xl:px-20 relative z-10">
        <Reveal>
          <GlassCard className="p-8 md:p-12 !rounded-3xl border-l-4 !border-l-accent overflow-hidden relative" hover={false}>
            <div className="absolute inset-0 bg-gradient-to-r from-accent/5 to-transparent z-0 pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
              <div className="max-w-2xl">
                <h2 className="text-headline-lg font-bold text-text mb-4">
                  Research Accountability & Quality Spotlight
                </h2>
                <p className="text-body-sm text-text-muted leading-relaxed">
                  {BRAND.fullName} operates as a publisher of financial analytics. We issue research publications and reports in strict compliance with internal audit parameters. We do not participate in portfolio execution or promise target guarantees.
                </p>
              </div>
              <div className="shrink-0 w-full md:w-auto">
                <div className="bg-surface-strong/60 p-6 rounded-2xl border border-border/30">
                  <p className="text-[10px] font-mono text-accent font-bold uppercase tracking-wider mb-1">
                    VERIFIED AUDIT ID
                  </p>
                  <p className="text-headline-lg font-extrabold text-text font-mono">
                    {BRAND.regNo}
                  </p>
                </div>
              </div>
            </div>
          </GlassCard>
        </Reveal>
      </section>

      {/* ═══ PAYMENT SAFETY ALERT ═══ */}
      <section className="pb-16 md:pb-24 max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 xl:px-20 relative z-10">
        <Reveal>
          <div className="bg-danger/10 border border-danger/30 p-6 md:p-8 rounded-3xl flex items-start gap-5 flex-col md:flex-row shadow-[0_10px_30px_rgba(239,68,68,0.08)]">
            <div className="w-12 h-12 rounded-2xl bg-danger/15 border border-danger/30 flex items-center justify-center text-danger shrink-0">
              <AlertTriangle className="w-6 h-6 animate-pulse-subtle" />
            </div>
            <div>
              <h3 className="text-headline-md font-bold text-danger mb-2 uppercase tracking-wider">
                Payment Safety Warning
              </h3>
              <p className="text-body-sm text-text-muted leading-relaxed">
                Always ensure payments are made only to the official corporate bank account of &quot;{BRAND.fullName}&quot; through our secure website integration. We NEVER request payments via personal UPI IDs, Telegram channel administrators, or third-party wallets.
              </p>
            </div>
          </div>
        </Reveal>
      </section>

    </div>
  );
}
