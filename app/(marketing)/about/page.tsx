"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  TrendingUp,
  Brain,
  Shield,
  Eye,
  Award,
  Calendar,
  Layers,
  ArrowRight,
} from "lucide-react";
import { Reveal, GlassCard, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { BRAND } from "@/lib/constants";

export default function AboutPage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative flex flex-col items-center justify-center text-center overflow-hidden min-h-screen pt-[100px] pb-16 bg-white">
        
        <div className="relative z-10 max-w-6xl px-6 flex flex-col items-center">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-label-sm mb-6 uppercase tracking-wider font-bold"
          >
            Analytical Excellence
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-display-lg mb-6 leading-tight text-text"
          >
            Pioneering <span className="text-primary font-bold">Institutional-Grade Research</span>
            <br />
            for Individual Investors.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="text-body-lg text-text-muted mb-8 max-w-3xl mx-auto"
          >
            Bridging the gap between sophisticated algorithmic analysis and retail accessibility. We provide clarity in a volatile market through data-driven conviction.
          </motion.p>
        </div>
      </section>

      {/* ═══ FOUNDER SECTION (Editorial Layout) ═══ */}
      <section className="py-24 bg-[#FAF8F4] border-t border-warm-border overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Image Container */}
            <Reveal className="col-span-12 lg:col-span-5 relative group" direction="left">
              <div className="absolute inset-0 lg:-inset-4 bg-primary/5 rounded-2xl transition-all group-hover:bg-primary/10" />
              <div className="relative z-10 aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-lg border border-warm-border">
                <Image
                  src="/founder.png"
                  alt="Arjun Vardhan, CFA"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                  priority
                />
              </div>
              <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 lg:-bottom-6 lg:-right-6 bg-white/95 backdrop-blur-sm p-3.5 sm:p-5 lg:p-6 z-20 max-w-[190px] sm:max-w-[260px] border border-warm-border rounded-2xl shadow-md transition-all">
                <div className="flex items-center gap-2 mb-1.5 text-primary">
                  <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                  <span className="text-[10px] sm:text-label-md uppercase font-bold tracking-wider">Corporate Desk</span>
                </div>
                <p className="text-[9px] sm:text-label-sm text-text-muted font-mono leading-none">
                  Reg ID: {BRAND.regNo}
                </p>
              </div>
            </Reveal>

            {/* Bio Details */}
            <Reveal className="col-span-12 lg:col-span-6 lg:col-start-7" direction="right">
              <h2 className="text-label-md text-primary uppercase mb-2 font-bold tracking-wider">
                The Visionary Lead
              </h2>
              <h3 className="text-display-md mb-6 text-text">Arjun Vardhan, CFA</h3>
              <div className="space-y-6 text-body-lg text-text-muted">
                <p>
                  With over fifteen years in quant-driven equity research, Vardhan established{" "}
                  {BRAND.name} to democratize the precision typically reserved for the world&apos;s
                  largest hedge funds.
                </p>
                <p className="border-l-4 border-primary pl-6 italic text-text bg-white border border-warm-border py-4 rounded-r-xl shadow-sm">
                  &quot;Our philosophy is simple: Market noise is temporary, but fundamental data is
                  persistent. We don&apos;t chase trends; we identify the structural shifts that precede them.
                  Integrity isn&apos;t just a value—it&apos;s our primary competitive advantage in an industry
                  built on trust.&quot;
                </p>
                <div className="pt-8 grid grid-cols-3 gap-6">
                  <div>
                    <div className="text-display-md text-text font-bold">15+</div>
                    <div className="text-label-sm uppercase text-text-muted">Years Exp.</div>
                  </div>
                  <div>
                    <div className="text-display-md text-text font-bold">450+</div>
                    <div className="text-label-sm uppercase text-text-muted">Analyses</div>
                  </div>
                  <div>
                    <div className="text-display-md text-text font-bold">92%</div>
                    <div className="text-label-sm uppercase text-text-muted">Conviction</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE SECTION ═══ */}
      <section className="py-24 bg-white border-t border-warm-border overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 xl:px-20">
          <Reveal>
            <div className="text-center mb-16">
              <h2 className="text-display-md mb-4 text-text">Our Journey</h2>
              <p className="text-body-lg text-text-muted">
                Building a legacy of compliance and performance.
              </p>
            </div>
          </Reveal>

          <div className="relative">
            {/* Vertical timeline line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-warm-border -translate-x-1/2 hidden md:block" />

            <div className="space-y-12">
              {[
                {
                  date: "Oct 24, 2019",
                  title: "Advisory Inception",
                  desc: "Formally established our investment research desk, marking our commitment to research excellence and transparency.",
                  icon: Calendar,
                  side: "left",
                },
                {
                  date: "Aug 2021",
                  title: "Quant Engine Launch",
                  desc: "Deployment of our proprietary AI-assisted equity scanning engine, designed to process 10k+ data points daily.",
                  icon: Layers,
                  side: "right",
                },
                {
                  date: "Today",
                  title: "Institutional Access",
                  desc: "Opening our exclusive research portal to a selected group of HNI and retail investors seeking disciplined growth.",
                  icon: Award,
                  side: "left",
                },
              ].map((item, idx) => {
                const SideIcon = item.icon;
                return (
                  <div
                    key={idx}
                    className={`flex flex-col md:flex-row items-center gap-8 relative ${
                      item.side === "right" ? "md:flex-row-reverse" : ""
                    }`}
                  >
                    {/* Left or Right text card wrapped in premium card styling */}
                    <div className={`w-full md:w-1/2 ${item.side === "left" ? "md:pr-12" : "md:pl-12"}`}>
                      <div className={`p-5 sm:p-6 md:p-8 rounded-2xl bg-[#FAF8F4] border border-warm-border shadow-sm hover:shadow-md transition-all duration-300 text-left ${
                        item.side === "left" ? "md:text-right" : "md:text-left"
                      }`}>
                        <span className="inline-block px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-md text-[10px] font-mono font-bold mb-3 uppercase tracking-wider">
                          {item.date}
                        </span>
                        <h3 className="text-headline-md text-text font-bold mb-2">
                          {item.title}
                        </h3>
                        <p className="text-body-sm text-text-muted leading-relaxed">{item.desc}</p>
                      </div>
                    </div>

                    {/* Bullet center dot */}
                    <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-white border border-primary/25 flex items-center justify-center z-10 hidden md:flex shadow-sm">
                      <SideIcon className="w-5 h-5 text-primary" />
                    </div>

                    {/* Empty side placeholder */}
                    <div className="w-full md:w-1/2 hidden md:block" />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ VALUES SECTION ═══ */}
      <section className="py-24 bg-[#FAF8F4] border-t border-warm-border overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 xl:px-20">
          <Reveal>
            <div className="max-w-2xl mb-16">
              <h2 className="text-display-md mb-4 text-text">Our Foundations</h2>
              <p className="text-body-lg text-text-muted">
                The core principles that govern every analysis and recommendation we publish.
              </p>
            </div>
          </Reveal>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: ShieldCheck,
                color: "text-primary border-primary/20 bg-primary/10",
                title: "Integrity",
                desc: "We maintain absolute objectivity. Our research is never influenced by third-party commissions or hidden agendas.",
              },
              {
                icon: Eye,
                color: "text-primary border-primary/25 bg-primary/5",
                title: "Transparency",
                desc: "Full disclosure of methodology and past performance. We believe informed investors are the most successful ones.",
              },
              {
                icon: Shield,
                color: "text-accent border-accent/20 bg-accent-soft",
                title: "Compliance",
                desc: "Rigorous adherence to institutional compliance and fiduciary standards to ensure the safety and security of your financial interests.",
              },
            ].map((value) => (
              <StaggerItem key={value.title}>
                <div className="p-5 sm:p-7 md:p-8 flex flex-col items-start h-full border border-warm-border rounded-2xl shadow-sm hover:shadow-md transition-all bg-white hover:border-primary/25 group duration-300">
                  <div
                    className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl border flex items-center justify-center mb-5 sm:mb-6 group-hover:scale-105 transition-transform ${value.color}`}
                  >
                    <value.icon className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
                  </div>
                  <h3 className="text-headline-md text-text font-bold mb-2.5">
                    {value.title}
                  </h3>
                  <p className="text-body-sm text-text-muted leading-relaxed">{value.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ CTA SECTION ═══ */}
      <section className="py-24 relative overflow-hidden bg-white border-t border-warm-border">
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="p-6 sm:p-12 md:p-16 rounded-3xl border border-warm-border bg-gradient-to-b from-[#FAF8F4] to-white shadow-sm">
            <h2 className="text-display-md mb-4 sm:mb-6 text-text">Ready for a deeper perspective?</h2>
            <p className="text-body-md sm:text-body-lg text-text-muted mb-8 sm:mb-10 max-w-xl mx-auto">
              Join a community of investors who value research over rumors.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/services"
                className="bg-primary text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-headline-md hover:shadow-[0_8px_20px_rgba(230,126,34,0.15)] hover:bg-primary-dark transition-all active:scale-95 text-center font-bold flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Our Plans</span>
                <ArrowRight className="w-4.5 h-4.5" />
              </Link>
              <Link
                href="/disclosure"
                className="border border-warm-border text-text bg-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl text-headline-md hover:bg-[#FAF8F4] transition-all active:scale-95 text-center font-bold cursor-pointer"
              >
                View Disclosures
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
