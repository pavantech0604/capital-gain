"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  Bell,
  SlidersHorizontal,
  ChevronDown,
  TrendingUp,
  ShieldCheck,
  TrendingDown,
  Lock,
  ArrowRight,
  PlusCircle,
  TrendingUpIcon,
  ChevronRight,
  Download,
  Share2,
  X,
  Star,
  CheckCircle2,
  AlertTriangle,
} from "lucide-react";
import { GlassCard, Reveal } from "@/components/ui/motion";
import { BRAND } from "@/lib/constants";

export default function ResearchPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedSector, setSelectedSector] = useState("All Sectors");
  const [selectedHorizon, setSelectedHorizon] = useState("All");
  const [activeSort, setActiveSort] = useState("Latest");
  const [showNotification, setShowNotification] = useState(false);

  const openReport = () => setIsModalOpen(true);
  const closeReport = () => setIsModalOpen(false);

  const watchlist = [
    { symbol: "TATA MOTORS", price: "984.20", change: "-0.45%", isUp: false },
    { symbol: "INFOSYS", price: "1,620.15", change: "+2.15%", isUp: true },
    { symbol: "ICICI BANK", price: "1,084.50", change: "+1.10%", isUp: true },
  ];

  return (
    <div className="space-y-8">
      {/* Top Header Search & Live Ticker */}
      <header className="flex flex-col xl:flex-row justify-between items-center gap-6 border-b border-outline-variant/30 pb-6 sticky top-0 bg-canvas/80 backdrop-blur-xl z-40">
        <div className="w-full xl:max-w-2xl relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant w-5 h-5" />
          <input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-surface-container-low border border-outline-variant/30 rounded-full py-3.5 pl-12 pr-6 text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all text-on-surface placeholder:text-on-surface-variant/40"
            placeholder="Search sectors, companies, or reports..."
          />
        </div>
        <div className="flex items-center justify-between xl:justify-end gap-6 w-full xl:w-auto">
          <div className="flex items-center gap-2 bg-surface-container-high px-4 py-1.5 rounded-full border border-outline-variant/30">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="text-label-sm text-primary uppercase font-bold tracking-wider">
              Nifty 50: 22,453.20 (+1.2%)
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                setShowNotification(!showNotification);
                alert("You have 3 new research alerts. Notification preferences can be managed in Settings.");
              }}
              className="text-on-surface-variant hover:text-primary transition-colors relative"
              aria-label="Notifications"
            >
              <Bell className="w-6 h-6" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-primary rounded-full" />
            </button>
            <div className="w-10 h-10 rounded-full border border-outline-variant/30 overflow-hidden relative">
              <Image src="/rohan.png" alt="Rohan profile avatar" fill sizes="40px" className="object-cover" />
            </div>
          </div>
        </div>
      </header>

      {/* Main Grid split */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
        {/* Research Feed list */}
        <section className="xl:col-span-8 space-y-6">
          <div className="flex justify-between items-center flex-wrap gap-4">
            <div>
              <h2 className="text-display-md text-on-surface font-bold">Research Feed</h2>
              <p className="text-body-sm text-on-surface-variant">
                Latest investment recommendations from our analyst desk
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setActiveSort("Latest")}
                className={`px-4 py-2 rounded-xl border text-label-sm font-bold flex items-center gap-2 transition-colors ${activeSort === "Latest" ? "bg-primary/10 text-primary border-primary/30" : "bg-surface-container-high border-outline-variant/30 hover:bg-surface-variant/50"}`}
              >
                Latest
              </button>
              <button
                onClick={() => setActiveSort("Filtered")}
                className={`px-4 py-2 rounded-xl border text-label-sm font-bold flex items-center gap-2 transition-colors ${activeSort === "Filtered" ? "bg-primary/10 text-primary border-primary/30" : "bg-surface-container-high border-outline-variant/30 hover:bg-surface-variant/50"}`}
              >
                <SlidersHorizontal className="w-4 h-4" /> Filter
              </button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Card 1: Reliance (Active Pro Recommendation) */}
            <GlassCard
              className="p-6 flex flex-col gap-6 group border border-white/5 hover:border-primary/30 transition-all rounded-2xl"
              hover={true}
            >
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-surface-container-high rounded-xl flex items-center justify-center border border-outline-variant/30 font-bold text-primary">
                    RELI
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-headline-md font-bold text-on-surface">RELIANCE INDUSTRIES</h3>
                      <span className="bg-primary/20 text-primary text-[10px] font-bold px-2 py-0.5 rounded-lg border border-primary/30 uppercase tracking-widest">
                        BUY
                      </span>
                    </div>
                    <p className="text-label-sm text-on-surface-variant">
                      NSE: RELIANCE • Energy &amp; Retail
                    </p>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-label-md font-bold text-primary block">Long Term</span>
                  <p className="text-label-sm text-on-surface-variant mt-0.5">Published 2h ago</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-surface-container-lowest/50 p-4 rounded-xl border border-outline-variant/10">
                <div>
                  <p className="text-label-sm text-on-surface-variant uppercase text-[10px] tracking-wider">
                    Entry Range
                  </p>
                  <p className="text-label-md text-on-surface font-semibold font-mono mt-0.5">
                    ₹2,840 - 2,860
                  </p>
                </div>
                <div>
                  <p className="text-label-sm text-on-surface-variant uppercase text-[10px] tracking-wider">
                    Target 1
                  </p>
                  <p className="text-label-md text-primary font-semibold font-mono mt-0.5">₹3,120</p>
                </div>
                <div>
                  <p className="text-label-sm text-on-surface-variant uppercase text-[10px] tracking-wider">
                    Stop Loss
                  </p>
                  <p className="text-label-md text-error font-semibold font-mono mt-0.5">₹2,710</p>
                </div>
                <div className="flex flex-col gap-1.5">
                  <p className="text-label-sm text-on-surface-variant uppercase text-[10px] tracking-wider">
                    Risk Profile
                  </p>
                  <div className="w-full h-1.5 risk-gradient rounded-full relative mt-1.5">
                    <div className="absolute w-2 h-4 bg-white -top-1 rounded-full shadow-lg left-[30%] -translate-x-1/2" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-outline-variant/20 pt-4 flex-wrap gap-4">
                <div className="flex items-center gap-6 flex-wrap">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className="w-5 h-5 text-primary" />
                    <span className="text-label-md text-on-surface">Potential Upside: 12.5%</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-5 h-5 text-secondary" />
                    <span className="text-label-md text-on-surface">Confidence: High</span>
                  </div>
                </div>
                <button
                  onClick={openReport}
                  className="bg-primary text-on-primary px-6 py-2.5 rounded-xl font-bold text-label-md hover:brightness-110 active:scale-95 transition-all flex items-center gap-1.5"
                >
                  Read Full Report
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </GlassCard>

            {/* Card 2: HDFC (Locked Recommendation / Action overlay) */}
            <GlassCard className="p-6 flex flex-col gap-6 border-l-4 !border-l-tertiary relative overflow-hidden">
              <div className="flex justify-between items-start flex-wrap gap-4">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-surface-container-high rounded-xl flex items-center justify-center border border-outline-variant/30 font-bold text-tertiary">
                    HDFC
                  </div>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-headline-md font-bold text-on-surface">HDFC BANK LTD</h3>
                      <span className="bg-tertiary/20 text-tertiary text-[10px] font-bold px-2 py-0.5 rounded-lg border border-tertiary/30 uppercase tracking-widest">
                        ACCUMULATE
                      </span>
                    </div>
                    <p className="text-label-sm text-on-surface-variant">NSE: HDFCBANK • BFSI</p>
                  </div>
                </div>
                <div className="text-left sm:text-right">
                  <span className="text-label-md font-bold text-tertiary block">Mid Term</span>
                  <p className="text-label-sm text-on-surface-variant mt-0.5">Published 5h ago</p>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-surface-container-lowest/50 p-4 rounded-xl">
                <div>
                  <p className="text-label-sm text-on-surface-variant uppercase text-[10px]">Entry Range</p>
                  <p className="text-label-md text-on-surface font-semibold font-mono mt-0.5">₹1,420 - 1,440</p>
                </div>
                <div>
                  <p className="text-label-sm text-on-surface-variant uppercase text-[10px]">Target 1</p>
                  <p className="text-label-md text-primary font-semibold font-mono mt-0.5">₹1,580</p>
                </div>
                <div>
                  <p className="text-label-sm text-on-surface-variant uppercase text-[10px]">Stop Loss</p>
                  <p className="text-label-md text-error font-semibold font-mono mt-0.5">₹1,385</p>
                </div>
                <div className="flex flex-col gap-1">
                  <p className="text-label-sm text-on-surface-variant uppercase text-[10px]">Risk Profile</p>
                  <div className="w-full h-1.5 risk-gradient rounded-full relative mt-1.5">
                    <div className="absolute w-2 h-4 bg-white -top-1 rounded-full shadow-lg left-[65%] -translate-x-1/2" />
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between border-t border-outline-variant/20 pt-4 flex-wrap gap-4">
                <div className="flex items-center gap-2 text-on-surface-variant">
                  <Lock className="w-4 h-4 text-tertiary" />
                  <span className="text-body-sm">Detailed rationale requires Pro Subscription</span>
                </div>
                <button
                  onClick={() => (window.location.href = "/dashboard/billing")}
                  className="bg-surface-variant text-on-surface px-6 py-2.5 rounded-xl font-bold text-label-md border border-outline-variant/30 hover:bg-surface-bright active:scale-95 transition-all"
                >
                  Unlock Insights
                </button>
              </div>
            </GlassCard>
          </div>
        </section>

        {/* Sidebar Filters & Watchlist */}
        <aside className="xl:col-span-4 flex flex-col gap-6 w-full">
          {/* Advanced Filters */}
          <GlassCard className="p-6 space-y-6 border border-white/5" hover={false}>
            <h3 className="text-headline-md font-bold text-on-surface flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-primary" />
              Precision Filters
            </h3>
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-label-sm text-on-surface-variant uppercase font-bold tracking-wider block">
                  Sector Focus
                </label>
                <select
                  value={selectedSector}
                  onChange={(e) => setSelectedSector(e.target.value)}
                  className="w-full bg-surface-container-low border border-outline-variant/30 rounded-xl p-3.5 text-body-sm focus:border-primary outline-none cursor-pointer"
                >
                  <option>All Sectors</option>
                  <option>BFSI</option>
                  <option>Information Technology</option>
                  <option>Energy &amp; Infra</option>
                  <option>FMCG</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-label-sm text-on-surface-variant uppercase font-bold tracking-wider block">
                  Time Horizon
                </label>
                <div className="flex flex-wrap gap-2">
                  {["All", "Short Term", "Mid Term", "Long Term"].map((h) => (
                    <span
                      key={h}
                      onClick={() => setSelectedHorizon(h)}
                      className={`px-3 py-1.5 rounded-lg text-label-sm cursor-pointer transition-all border ${
                        selectedHorizon === h
                          ? "bg-primary/10 text-primary border-primary/30 font-bold"
                          : "bg-surface-container-high border-outline-variant/30 text-on-surface-variant hover:bg-surface-variant"
                      }`}
                    >
                      {h}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-label-sm text-on-surface-variant uppercase font-bold tracking-wider block">
                  Subscription Tier
                </label>
                <div className="space-y-2">
                  {["Standard Research", "Pro Exclusive", "Analyst's Corner"].map((tier, idx) => (
                    <label key={tier} className="flex items-center gap-3 cursor-pointer group">
                      <input
                        defaultChecked={idx === 0}
                        className="w-4.5 h-4.5 text-primary rounded bg-surface-container-low border-outline-variant/30 focus:ring-primary accent-primary"
                        type="checkbox"
                      />
                      <span className="text-body-sm text-on-surface-variant group-hover:text-primary transition-colors">
                        {tier}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setSelectedSector("All Sectors");
                setSelectedHorizon("All");
              }}
              className="w-full border border-primary/50 text-primary font-bold text-label-md py-3 rounded-xl hover:bg-primary/10 transition-all active:scale-95"
            >
              Reset All Filters
            </button>
          </GlassCard>

          {/* Top Watchlist */}
          <GlassCard className="overflow-hidden flex flex-col border border-white/5" hover={false}>
            <div className="p-6 border-b border-outline-variant/30 flex justify-between items-center bg-surface-container-high">
              <h3 className="text-headline-md font-bold text-on-surface">Top Watchlist</h3>
              <PlusCircle className="w-5 h-5 text-on-surface-variant cursor-pointer hover:text-primary" />
            </div>
            <div className="divide-y divide-outline-variant/10">
              {watchlist.map((asset) => (
                <div
                  key={asset.symbol}
                  className="p-4 hover:bg-surface-variant/40 transition-colors flex items-center justify-between cursor-pointer group"
                >
                  <div>
                    <p className="font-bold text-on-surface group-hover:text-primary transition-colors">
                      {asset.symbol}
                    </p>
                    <p className="text-label-sm text-on-surface-variant">
                      {asset.price}{" "}
                      <span className={asset.isUp ? "text-primary" : "text-error"}>
                        {asset.change}
                      </span>
                    </p>
                  </div>
                  <div
                    className={`w-14 h-7 rounded flex items-center justify-center ${
                      asset.isUp ? "bg-primary/10 text-primary" : "bg-error/10 text-error"
                    }`}
                  >
                    {asset.isUp ? (
                      <TrendingUpIcon className="w-4 h-4" />
                    ) : (
                      <TrendingDown className="w-4 h-4" />
                    )}
                  </div>
                </div>
              ))}
            </div>
            <div className="p-4 bg-surface-container-low text-center border-t border-outline-variant/10">
              <Link href="/dashboard/portfolio" className="font-bold text-label-md text-primary hover:underline">
                View All Assets (12)
              </Link>
            </div>
          </GlassCard>

          {/* Performance Snippet */}
          <GlassCard
            className="p-6 bg-gradient-to-br from-primary/5 to-transparent border border-primary/20"
            hover={false}
          >
            <p className="text-label-sm text-on-surface-variant font-bold uppercase tracking-wider mb-4 block">
              Analyst Desk Performance
            </p>
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <h4 className="text-display-md text-primary font-bold">84%</h4>
                <p className="text-body-sm text-on-surface-variant">Hit Rate (Last 30 Days)</p>
              </div>
              <div className="flex-1 h-16 flex items-end gap-1 shrink-0">
                <div className="w-full bg-primary/20 rounded-t h-[40%]" />
                <div className="w-full bg-primary/30 rounded-t h-[60%]" />
                <div className="w-full bg-primary/50 rounded-t h-[80%]" />
                <div className="w-full bg-primary rounded-t h-[95%] shadow-[0_0_10px_rgba(78,222,163,0.3)]" />
              </div>
            </div>
          </GlassCard>
        </aside>
      </div>

      {/* Modal: Reading Panel (Deep Dive Analysis) */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-[60] bg-black/80 flex justify-end transition-opacity duration-300"
          onClick={(e) => { if (e.target === e.currentTarget) closeReport(); }}
        >
          <div className="w-full max-w-3xl bg-surface h-full shadow-2xl flex flex-col relative z-20 border-l border-white/10 overflow-y-auto">
            <header className="p-6 border-b border-outline-variant/30 flex items-center justify-between sticky top-0 bg-surface/90 backdrop-blur-md z-10">
              <div className="flex items-center gap-4">
                <button onClick={closeReport} className="text-on-surface hover:text-primary transition-colors">
                  <X className="w-6 h-6" />
                </button>
                <h2 className="text-headline-lg font-bold text-on-surface">
                  Deep Dive: Reliance Industries
                </h2>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => alert("Download started. Your report will be saved to Downloads.")}
                  className="text-on-surface hover:text-primary transition-colors"
                  aria-label="Download report"
                >
                  <Download className="w-5 h-5" />
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href + "?report=reliance");
                    alert("Report link copied to clipboard!");
                  }}
                  className="text-on-surface hover:text-primary transition-colors"
                  aria-label="Share report"
                >
                  <Share2 className="w-5 h-5" />
                </button>
              </div>
            </header>

            <div className="p-8 space-y-8 flex-1">
              <div className="aspect-video w-full rounded-2xl overflow-hidden mb-6 relative border border-white/5">
                <Image
                  src="/chart_fibonacci.png"
                  alt="Reliance Price trajectory chart"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              <div className="space-y-4">
                <h3 className="text-headline-lg text-primary font-bold">Executive Rationale</h3>
                <p className="text-body-lg text-on-surface-variant leading-relaxed">
                  Reliance Industries is currently demonstrating a classic breakout pattern on the
                  weekly charts, supported by heavy volumes in the O2C segment and expanding margins
                  in the Retail vertical. Our proprietary momentum indicator suggests a fresh bullish
                  cycle commencing from the 2,840 base.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <GlassCard className="p-6 border border-white/5" hover={false}>
                  <h4 className="text-label-sm text-primary uppercase font-bold tracking-wider mb-3">
                    Bull Case
                  </h4>
                  <ul className="text-body-sm text-on-surface-variant space-y-2 list-disc pl-5">
                    <li>Green Hydrogen commercialization timeline acceleration.</li>
                    <li>Strong ARPU growth in Jio&apos;s 5G rollout.</li>
                    <li>Valuation multiple re-rating for the Retail business.</li>
                  </ul>
                </GlassCard>

                <GlassCard className="p-6 border border-white/5 border-l-error/40" hover={false}>
                  <h4 className="text-label-sm text-error uppercase font-bold tracking-wider mb-3">
                    Bear Case
                  </h4>
                  <ul className="text-body-sm text-on-surface-variant space-y-2 list-disc pl-5">
                    <li>Global crude volatility impacting refining margins.</li>
                    <li>Regulatory shifts in consumer data protection.</li>
                  </ul>
                </GlassCard>
              </div>

              <div className="bg-surface-container-high/40 p-6 rounded-2xl border border-white/5">
                <h3 className="text-headline-md font-bold mb-4">Technical Parameters</h3>
                <table className="w-full text-left font-mono text-body-sm">
                  <tbody>
                    <tr className="border-b border-outline-variant/20 h-12">
                      <td className="text-on-surface-variant font-sans">RSI (14 Days)</td>
                      <td className="text-primary font-bold">62.5 (Bullish)</td>
                    </tr>
                    <tr className="border-b border-outline-variant/20 h-12">
                      <td className="text-on-surface-variant font-sans">50-Day EMA</td>
                      <td className="text-on-surface">₹2,790</td>
                    </tr>
                    <tr className="h-12">
                      <td className="text-on-surface-variant font-sans">Support Zone</td>
                      <td className="text-on-surface">₹2,800 - 2,820</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <footer className="p-6 bg-surface-container-low border-t border-outline-variant/30 flex gap-4 sticky bottom-0 bg-surface/90 backdrop-blur-md">
              <button
                onClick={closeReport}
                className="flex-1 bg-primary text-on-primary py-4 rounded-xl font-bold hover:brightness-110 active:scale-95 transition-all text-center block"
              >
                Invest Now
              </button>
              <button
                onClick={closeReport}
                className="flex-1 bg-surface-variant border border-outline-variant/30 py-4 rounded-xl text-on-surface font-bold hover:bg-surface-bright active:scale-95 transition-all text-center block"
              >
                Save to Portfolio
              </button>
            </footer>
          </div>
        </div>
      )}
    </div>
  );
}
