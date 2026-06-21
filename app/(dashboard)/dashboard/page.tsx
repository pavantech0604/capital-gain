"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  TrendingUp,
  Bookmark,
  Activity,
  User,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Download,
  Gavel,
  ExternalLink,
  Lock,
  Check,
  Star,
} from "lucide-react";
import { GlassCard, Reveal, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { BRAND } from "@/lib/constants";

export default function DashboardPage() {
  const recommendations = [
    {
      symbol: "RELIANCE",
      name: "Rel. Industries Ltd.",
      type: "Long-term",
      action: "BUY",
      target: "₹3,420",
      risk: "Moderate",
      date: "May 24, 2026",
      actionColor: "text-primary bg-primary/10 border-primary/20",
    },
    {
      symbol: "HDFCBANK",
      name: "HDFC Bank Ltd.",
      type: "Positional",
      action: "ACCUMULATE",
      target: "₹1,750",
      risk: "Low",
      date: "May 23, 2026",
      actionColor: "text-primary bg-primary/10 border-primary/20",
    },
    {
      symbol: "TCS",
      name: "Tata Consultancy",
      type: "Swing Trade",
      action: "HOLD",
      target: "₹4,100",
      risk: "High",
      date: "May 20, 2026",
      actionColor: "text-tertiary bg-tertiary/10 border-tertiary/20",
    },
  ];

  const reports = [
    {
      title: "IT Services: 2026 Outlook",
      desc: "Deep dive into mid-cap IT stocks and emerging AI trends in the Indian ecosystem.",
      tag: "SECTORIAL",
      tagColor: "text-primary",
      image: "/report_it.png",
      size: "12.4 MB",
    },
    {
      title: "Hedging in Volatile Markets",
      desc: "Institutional strategies for risk mitigation during election periods and rate hikes.",
      tag: "STRATEGY",
      tagColor: "text-tertiary",
      image: "/report_strategy.png",
      size: "8.1 MB",
    },
    {
      title: "Commercial REITs Analysis",
      desc: "Evaluation of rental yields and capital appreciation in Grade A commercial properties.",
      tag: "REAL ESTATE",
      tagColor: "text-secondary",
      image: "/report_it.png",
      size: "15.6 MB",
    },
    {
      title: "Q4 Earnings Masterclass",
      desc: "Comprehensive summary of the Nifty 50 earnings reports and forward guidance.",
      tag: "QUARTERLY",
      tagColor: "text-on-surface",
      image: "/report_strategy.png",
      size: "22.0 MB",
    },
  ];

  return (
    <div className="space-y-8">
      {/* Top Header Nav */}
      <header className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 border-b border-outline-variant/30 pb-6">
        <div>
          <h2 className="text-display-md text-on-surface font-bold">Good Morning, Rohan</h2>
          <div className="flex items-center gap-3 mt-1 flex-wrap">
            <div className="flex items-center px-3 py-0.5 bg-primary/10 border border-primary/20 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse mr-2" />
              <span className="text-label-sm text-primary uppercase font-bold tracking-wider">
                Active: Equity Pro
              </span>
            </div>
            <span className="text-on-surface-variant text-body-sm pl-3 border-l border-outline-variant/30">
              Subscription valid until Dec 2026
            </span>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-body-md text-on-surface font-semibold block">Verified Identity</span>
            <span className="text-label-sm text-primary font-bold">KYC Completed</span>
          </div>
          <div className="w-12 h-12 rounded-full border border-outline-variant/30 overflow-hidden relative">
            <Image src="/rohan.png" alt="Rohan profile avatar" fill sizes="48px" className="object-cover" />
          </div>
        </div>
      </header>

      {/* Summary KPI Grid */}
      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard className="p-6 relative overflow-hidden group border border-white/5 hover:border-primary/20">
          <div className="absolute top-4 right-4 text-primary/10 group-hover:text-primary/20 transition-all">
            <TrendingUp className="w-14 h-14" />
          </div>
          <p className="text-label-sm text-on-surface-variant mb-1 font-bold uppercase tracking-wider">
            Active Recommendations
          </p>
          <h3 className="text-display-md text-on-surface font-bold">14</h3>
          <p className="mt-2 text-label-sm text-primary flex items-center gap-1 font-semibold">
            ▲ +3 Since yesterday
          </p>
        </GlassCard>

        <GlassCard className="p-6 relative overflow-hidden group border border-white/5 hover:border-primary/20">
          <div className="absolute top-4 right-4 text-secondary/10 group-hover:text-secondary/20 transition-all">
            <Bookmark className="w-14 h-14" />
          </div>
          <p className="text-label-sm text-on-surface-variant mb-1 font-bold uppercase tracking-wider">
            Saved Reports
          </p>
          <h3 className="text-display-md text-on-surface font-bold">08</h3>
          <p className="mt-2 text-label-sm text-on-surface-variant font-semibold">
            Archived for review
          </p>
        </GlassCard>

        <GlassCard className="p-6 relative overflow-hidden group border border-white/5 hover:border-primary/20">
          <div className="absolute top-4 right-4 text-tertiary/10 group-hover:text-tertiary/20 transition-all">
            <Activity className="w-14 h-14" />
          </div>
          <p className="text-label-sm text-on-surface-variant mb-1 font-bold uppercase tracking-wider">
            Portfolio Beta
          </p>
          <h3 className="text-display-md text-on-surface font-bold">1.12</h3>
          <p className="mt-2 text-label-sm text-tertiary font-semibold">
            Market-aligned risk
          </p>
        </GlassCard>

        <GlassCard className="p-6 relative overflow-hidden border-l-4 !border-l-primary bg-primary/5 hover:bg-primary/8 border border-white/5">
          <p className="text-label-sm text-on-surface-variant mb-1 font-bold uppercase tracking-wider">
            Market Pulse
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-display-md text-primary font-bold">22,410</h3>
            <span className="text-label-sm text-primary font-bold">+0.85%</span>
          </div>
          <p className="mt-2 text-label-sm text-on-surface-variant">NIFTY 50 • LIVE</p>
        </GlassCard>
      </section>

      {/* Main Content Split: Recommendations Table + Side Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Recommendation Feed */}
        <section className="lg:col-span-8 glass-card rounded-2xl border border-white/5 overflow-hidden">
          <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-low/40">
            <h4 className="text-headline-md font-bold text-on-surface">Research Recommendations</h4>
            <Link href="/research" className="text-label-sm text-primary font-bold hover:underline">
              View All Research
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-surface-container-low/60 border-b border-outline-variant/20">
                <tr>
                  <th className="text-left text-label-sm text-on-surface-variant py-4 px-6 uppercase tracking-wider font-bold">
                    Symbol
                  </th>
                  <th className="text-left text-label-sm text-on-surface-variant py-4 px-6 uppercase tracking-wider font-bold">
                    Type
                  </th>
                  <th className="text-left text-label-sm text-on-surface-variant py-4 px-6 uppercase tracking-wider font-bold">
                    Action
                  </th>
                  <th className="text-left text-label-sm text-on-surface-variant py-4 px-6 uppercase tracking-wider font-bold">
                    Target
                  </th>
                  <th className="text-left text-label-sm text-on-surface-variant py-4 px-6 uppercase tracking-wider font-bold">
                    Risk
                  </th>
                  <th className="text-right text-label-sm text-on-surface-variant py-4 px-6 uppercase tracking-wider font-bold">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recommendations.map((rec) => (
                  <tr
                    key={rec.symbol}
                    className="hover:bg-white/2 transition-colors cursor-pointer"
                    onClick={() => (window.location.href = "/research")}
                  >
                    <td className="py-4 px-6">
                      <span className="text-headline-md font-bold text-on-surface block leading-tight">
                        {rec.symbol}
                      </span>
                      <span className="text-label-sm text-on-surface-variant">{rec.name}</span>
                    </td>
                    <td className="py-4 px-6 text-body-md text-on-surface">{rec.type}</td>
                    <td className="py-4 px-6">
                      <span
                        className={`px-3 py-1 border rounded text-[10px] font-bold tracking-wider uppercase ${rec.actionColor}`}
                      >
                        {rec.action}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-body-md text-primary font-mono font-semibold">
                      {rec.target}
                    </td>
                    <td className="py-4 px-6 text-body-md text-on-surface-variant">{rec.risk}</td>
                    <td className="py-4 px-6 text-right text-label-sm text-on-surface-variant">
                      {rec.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Compliance & Profile Side Panel */}
        <aside className="lg:col-span-4 flex flex-col gap-6">
          {/* Compliance Corner */}
          <GlassCard className="p-6 border border-white/5" hover={false}>
            <div className="flex items-center gap-3 mb-4">
              <Gavel className="w-6 h-6 text-tertiary" />
              <h4 className="text-headline-md font-bold text-on-surface">Compliance Corner</h4>
            </div>
            <p className="text-body-sm text-on-surface-variant mb-6 leading-relaxed">
              Investment in securities market are subject to market risks. Read all the related
              documents carefully before investing.
            </p>
            <div className="space-y-3">
              <Link
                href="/support#grievance"
                className="flex justify-between items-center p-3.5 rounded-xl bg-surface-container border border-outline-variant/30 hover:border-primary/50 transition-all group text-body-sm"
              >
                <span>Grievance Redressal</span>
                <ExternalLink className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" />
              </Link>
              <Link
                href="/disclosure"
                className="flex justify-between items-center p-3.5 rounded-xl bg-surface-container border border-outline-variant/30 hover:border-primary/50 transition-all group text-body-sm"
              >
                <span>Standard Disclosures</span>
                <ExternalLink className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" />
              </Link>
              <a
                href="https://scores.sebi.gov.in"
                target="_blank"
                rel="noopener noreferrer"
                className="flex justify-between items-center p-3.5 rounded-xl bg-surface-container border border-outline-variant/30 hover:border-primary/50 transition-all group text-body-sm"
              >
                <span>SEBI SCORES Portal</span>
                <ExternalLink className="w-4 h-4 text-on-surface-variant group-hover:text-primary transition-colors" />
              </a>
            </div>
          </GlassCard>

          {/* Profile Security */}
          <GlassCard
            className="p-6 border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent"
            hover={false}
          >
            <h4 className="text-label-sm text-primary uppercase font-bold tracking-wider mb-4 block">
              Profile Security
            </h4>
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-surface-container-high border border-primary/50 flex items-center justify-center text-primary">
                  <User className="w-6 h-6" />
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center border-2 border-canvas">
                  <Check className="w-3 h-3 text-on-primary stroke-[3]" />
                </div>
              </div>
              <div>
                <p className="text-body-md font-bold text-on-surface">Tier 2 Verification</p>
                <p className="text-label-sm text-on-surface-variant">Liveness Check: Active</p>
              </div>
            </div>
            <Link
              href="/dashboard/profile"
              className="w-full mt-6 py-2.5 border border-outline hover:bg-surface-variant transition-all rounded-xl text-label-sm font-bold block text-center"
            >
              Manage Security
            </Link>
          </GlassCard>
        </aside>
      </div>

      {/* Recent Strategic Reports */}
      <section className="space-y-6">
        <div className="flex justify-between items-end">
          <h4 className="text-headline-md font-bold text-on-surface">Recent Strategic Reports</h4>
          <div className="flex gap-2">
            <button
              onClick={() => {
                const el = document.getElementById('reports-scroll');
                if (el) el.scrollBy({ left: -320, behavior: 'smooth' });
              }}
              className="p-2 bg-surface-container-high rounded-xl hover:text-primary transition-all border border-white/5 active:scale-95"
              aria-label="Scroll reports left"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => {
                const el = document.getElementById('reports-scroll');
                if (el) el.scrollBy({ left: 320, behavior: 'smooth' });
              }}
              className="p-2 bg-surface-container-high rounded-xl hover:text-primary transition-all border border-white/5 active:scale-95"
              aria-label="Scroll reports right"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div id="reports-scroll" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reports.map((report, idx) => (
            <Link
              key={idx}
              href="/research"
              className="block"
            >
              <GlassCard
                className="rounded-2xl overflow-hidden group cursor-pointer flex flex-col h-full border border-white/5 hover:border-primary/20"
              >
                <div className="h-40 relative overflow-hidden bg-surface-container-highest">
                  <Image
                    src={report.image}
                    alt={report.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-canvas to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span
                      className={`px-2.5 py-1 bg-surface-container-lowest/80 backdrop-blur rounded-lg text-label-sm font-bold uppercase tracking-wider ${report.tagColor}`}
                    >
                      {report.tag}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <h5 className="text-headline-md font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">
                    {report.title}
                  </h5>
                  <p className="text-body-sm text-on-surface-variant mb-6 line-clamp-2 leading-relaxed">
                    {report.desc}
                  </p>
                  <div className="mt-auto flex justify-between items-center pt-4 border-t border-outline-variant/30 text-label-sm text-on-surface-variant">
                    <span>{report.size}</span>
                    <Download className="w-4 h-4 text-primary group-hover:translate-y-0.5 transition-transform" />
                  </div>
                </div>
              </GlassCard>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
