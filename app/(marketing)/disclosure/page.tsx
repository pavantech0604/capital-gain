"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  AlertTriangle,
  ShieldAlert,
  Gavel,
  Scale,
  CreditCard,
  CheckCircle2,
  TrendingUp,
  Bookmark,
} from "lucide-react";
import { Reveal, GlassCard, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { BRAND, DISCLAIMER } from "@/lib/constants";

export default function DisclosurePage() {
  const [activeSection, setActiveSection] = useState("summary");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["summary", "litigation", "conflict", "compensation", "obligations"];
      const scrollPosition = window.scrollY + 160;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.clientHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Summary", href: "summary" },
    { label: "Material Litigations", href: "litigation" },
    { label: "Conflict of Interest", href: "conflict" },
    { label: "Compensation", href: "compensation" },
    { label: "Monthly Disclosures", href: "obligations" },
  ];

  return (
    <div className="max-w-[1440px] mx-auto px-6 md:px-12 xl:px-20 w-full relative z-10 pt-[96px] lg:pt-[120px]">
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-120px)] gap-10">
      {/* Sidebar Navigation (Sticky) */}
      <aside className="w-full lg:w-[280px] shrink-0 bg-surface-container-low border-b lg:border-b-0 lg:border-r border-outline-variant/30 py-8 px-6 lg:sticky lg:top-[120px] lg:h-[calc(100vh-120px)] flex flex-col justify-between z-30">
        <div>
          <div className="mb-8">
            <div className="flex items-center gap-2 mb-2 text-tertiary">
              <ShieldCheck className="w-5 h-5" />
              <h3 className="text-headline-md font-bold text-on-surface">Corporate Registry</h3>
            </div>
            <p className="text-label-sm text-on-surface-variant">Registry Code: {BRAND.regNo}</p>
          </div>
          <nav className="space-y-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={`#${link.href}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(link.href)?.scrollIntoView({ behavior: "smooth" });
                  setActiveSection(link.href);
                }}
                className={`group flex items-center px-4 py-3 rounded-xl transition-all text-label-md cursor-pointer ${
                  activeSection === link.href
                    ? "text-primary font-bold bg-surface-container border-r-4 border-primary"
                    : "text-on-surface-variant hover:bg-surface-container/50 hover:text-on-surface"
                }`}
              >
                <span>{link.label}</span>
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-8 lg:mt-auto">
          <Link
            href="/services"
            className="w-full py-3 bg-secondary text-on-secondary rounded-xl font-bold flex items-center justify-center gap-2 hover:brightness-110 active:scale-95 transition-all text-label-sm"
          >
            Explore Plans
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 py-12 lg:py-16 overflow-hidden">
        {/* Hero Header */}
        <header className="mb-16 relative">
          <Reveal>
            <h1 className="text-display-lg text-on-surface mb-4 leading-tight">
              Transparency &amp; <span className="text-primary text-glow">Disclosures</span>
            </h1>
            <p className="text-body-lg text-on-surface-variant max-w-2xl">
              {BRAND.fullName} maintains the highest standards of regulatory compliance and
              institutional integrity. Here you will find our comprehensive disclosure profile as
              part of our code of ethics.
            </p>
          </Reveal>
        </header>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Summary Card (Bento Large) */}
          <section className="lg:col-span-8 space-y-8" id="summary">
            <Reveal>
              <GlassCard className="p-8 relative overflow-hidden" hover={false}>
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                  <div>
                    <span className="text-label-sm text-primary tracking-widest uppercase block mb-1 font-bold">
                      Registry Profile
                    </span>
                    <h2 className="text-headline-lg text-on-surface font-semibold">
                      Registration Details
                    </h2>
                  </div>
                  <div className="px-4 py-1.5 bg-primary/10 border border-primary/20 rounded-full flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-primary" />
                    <span className="text-label-md text-primary font-bold">Active Standing</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                  <div className="p-4 bg-surface-container-high rounded-xl border border-white/5">
                    <p className="text-label-sm text-on-surface-variant mb-1">Registry No.</p>
                    <p className="text-headline-md text-on-surface font-mono font-bold">
                      {BRAND.regNo}
                    </p>
                  </div>
                  <div className="p-4 bg-surface-container-high rounded-xl border border-white/5">
                    <p className="text-label-sm text-on-surface-variant mb-1">Reg. Date</p>
                    <p className="text-headline-md text-on-surface font-bold">
                      {BRAND.regDate}
                    </p>
                  </div>
                  <div className="p-4 bg-surface-container-high rounded-xl border border-white/5">
                    <p className="text-label-sm text-on-surface-variant mb-1">Entity Type</p>
                    <p className="text-headline-md text-on-surface font-bold">
                      {BRAND.entityType}
                    </p>
                  </div>
                </div>

                <div className="mt-8 flex items-center gap-3 text-on-surface-variant">
                  <Bookmark className="w-5 h-5 text-primary shrink-0" />
                  <p className="text-body-sm italic">
                    Status verified as of latest internal audit cycle.
                  </p>
                </div>
              </GlassCard>
            </Reveal>

            {/* Litigations */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Reveal id="litigation" className="scroll-mt-32">
                <GlassCard className="p-8 h-full" hover={false}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary border border-white/5">
                      <Gavel className="w-6 h-6" />
                    </div>
                    <h3 className="text-headline-md font-bold">No Material Litigations</h3>
                  </div>
                  <p className="text-body-sm text-on-surface-variant mb-6 leading-relaxed">
                    The Research Analyst or his relatives or his associates do not have any material
                    litigations or outstanding disputes against them that could impact recommendations.
                  </p>
                  <span className="text-label-sm text-outline px-3 py-1 bg-surface-container rounded-lg border border-white/5">
                    Last Checked: 24 Hours Ago
                  </span>
                </GlassCard>
              </Reveal>

              <Reveal id="conflict" className="scroll-mt-32">
                <GlassCard className="p-8 h-full" hover={false}>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary border border-white/5">
                      <Scale className="w-6 h-6" />
                    </div>
                    <h3 className="text-headline-md font-bold">No Conflict of Interest</h3>
                  </div>
                  <p className="text-body-sm text-on-surface-variant mb-6 leading-relaxed">
                    We do not have any financial interest or actual/beneficial ownership of 1% or
                    more in the securities of subject companies. Your results are our only focus.
                  </p>
                  <span className="text-label-sm text-outline px-3 py-1 bg-surface-container rounded-lg border border-white/5">
                    Compliance ID: CG-COI-001
                  </span>
                </GlassCard>
              </Reveal>
            </div>
          </section>

          {/* Warning Panels (Bento Small) */}
          <section className="lg:col-span-4 flex flex-col gap-6">
            <Reveal>
              <div id="disclaimer" className="bg-error-container/10 border border-error/20 p-6 rounded-2xl scroll-mt-32">
                <div className="flex items-center gap-2 mb-4 text-error">
                  <AlertTriangle className="w-6 h-6 shrink-0" />
                  <span className="text-headline-md font-bold">Market Risk</span>
                </div>
                <p className="text-body-sm text-on-error-container leading-relaxed">
                  {DISCLAIMER}
                </p>
              </div>
            </Reveal>

            <Reveal>
              <div className="bg-tertiary-container/10 border border-tertiary/20 p-6 rounded-2xl">
                <div className="flex items-center gap-2 mb-4 text-tertiary">
                  <ShieldAlert className="w-6 h-6 shrink-0" />
                  <span className="text-headline-md font-bold">Payment Safety</span>
                </div>
                <p className="text-body-sm text-on-tertiary-container leading-relaxed">
                  Always ensure payments are made directly to the official corporate entity account.
                  Never share OTPs or passwords. We do not provide profit sharing services.
                </p>
              </div>
            </Reveal>
          </section>

          {/* Compensation Section */}
          <section className="lg:col-span-12 scroll-mt-32" id="compensation">
            <Reveal>
              <GlassCard className="p-8" hover={false}>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center text-primary border border-white/5">
                    <CreditCard className="w-6 h-6" />
                  </div>
                  <h3 className="text-headline-lg font-bold">Compensation Disclosures</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-body-md text-on-surface-variant">
                        No compensation received from subject companies in the past 12 months.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-body-md text-on-surface-variant">
                        No investment banking or brokerage services offered to subject companies.
                      </span>
                    </li>
                  </ul>
                  <ul className="space-y-4">
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-body-md text-on-surface-variant">
                        Research Analyst has not served as an officer or director of the subject company.
                      </span>
                    </li>
                    <li className="flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-body-md text-on-surface-variant">
                        Research Analyst has not been engaged in market making activity for subject companies.
                      </span>
                    </li>
                  </ul>
                </div>
              </GlassCard>
            </Reveal>
          </section>

          {/* Monthly Obligations (Table Style) */}
          <section className="lg:col-span-12 scroll-mt-32" id="obligations">
            <Reveal>
              <GlassCard className="p-8" hover={false}>
                <div className="flex justify-between items-center mb-8">
                  <h3 className="text-headline-lg font-bold">Monthly Disclosure Tracker</h3>
                  <span className="text-primary text-label-sm font-bold uppercase tracking-wider">
                    Compliant status
                  </span>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead className="border-b border-outline-variant/30">
                      <tr>
                        <th className="pb-4 px-4 text-label-md text-on-surface-variant uppercase tracking-wider">
                          Month/Year
                        </th>
                        <th className="pb-4 px-4 text-label-md text-on-surface-variant uppercase tracking-wider">
                          Complaints Received
                        </th>
                        <th className="pb-4 px-4 text-label-md text-on-surface-variant uppercase tracking-wider">
                          Resolved
                        </th>
                        <th className="pb-4 px-4 text-label-md text-on-surface-variant uppercase tracking-wider">
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5 font-mono">
                      {[
                        { month: "January 2026", rec: 0, res: 0 },
                        { month: "December 2025", rec: 0, res: 0 },
                        { month: "November 2025", rec: 1, res: 1 },
                      ].map((row, idx) => (
                        <tr key={idx} className="hover:bg-white/2 transition-colors">
                          <td className="py-4 px-4 text-body-md text-on-surface font-sans">
                            {row.month}
                          </td>
                          <td className="py-4 px-4 text-body-md text-on-surface-variant">
                            {row.rec}
                          </td>
                          <td className="py-4 px-4 text-body-md text-on-surface-variant">
                            {row.res}
                          </td>
                          <td className="py-4 px-4">
                            <span className="px-2.5 py-1 bg-primary/20 text-primary text-[10px] rounded-lg uppercase font-bold tracking-wider font-sans">
                              Compliant
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </GlassCard>
            </Reveal>
          </section>

          {/* Editorial Bottom Image */}
          <section className="lg:col-span-12 rounded-2xl overflow-hidden relative group aspect-auto min-h-[320px] md:aspect-[21/9] border border-white/5">
            <div className="absolute inset-0 z-0">
              <Image
                src="/workspace.png"
                alt="Modern financial workspace at twilight"
                fill
                sizes="100vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent z-10 flex flex-col justify-end p-8 md:p-12">
              <h4 className="text-display-md text-white mb-2">Commitment to Excellence</h4>
              <p className="text-body-lg text-on-surface-variant max-w-xl">
                Our research process is independent, unbiased, and strictly governed by our internal research
              regulations.
              </p>
            </div>
          </section>
        </div>
      </main>
      </div>
    </div>
  );
}
