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
} from "lucide-react";
import { Reveal, GlassCard, StaggerContainer, StaggerItem } from "@/components/ui/motion";
import { BRAND } from "@/lib/constants";

export default function AboutPage() {
  return (
    <>
      {/* ═══ HERO ═══ */}
      <section className="relative min-h-[40vh] flex flex-col items-center justify-center text-center overflow-hidden pt-[120px] lg:pt-[140px] pb-16">
        
        <div className="relative z-10 max-w-4xl px-6">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-1 bg-primary/10 text-primary border border-primary/20 rounded-full text-label-sm mb-6 uppercase tracking-wider"
          >
            Analytical Excellence
          </motion.span>
          
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7 }}
            className="text-display-lg mb-6 leading-tight"
          >
            Pioneering <span className="text-primary text-glow">Institutional-Grade Research</span>
            <br />
            for Individual Investors.
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.7 }}
            className="text-body-lg text-on-surface-variant mb-8 max-w-2xl mx-auto"
          >
            Bridging the gap between sophisticated algorithmic analysis and retail accessibility. We provide clarity in a volatile market through data-driven conviction.
          </motion.p>
        </div>
      </section>

      {/* ═══ FOUNDER SECTION (Editorial Layout) ═══ */}
      <section className="py-24 bg-surface-container-lowest border-y border-outline-variant/30 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Image Container */}
            <Reveal className="col-span-12 lg:col-span-5 relative group" direction="left">
              <div className="absolute inset-0 lg:-inset-4 bg-primary/5 rounded-2xl transition-all group-hover:bg-primary/10" />
              <div className="relative z-10 aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-2xl border border-white/10">
                <Image
                  src="/founder.png"
                  alt="Arjun Vardhan, CFA"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
                  priority
                />
              </div>
              <div className="absolute bottom-4 right-4 lg:-bottom-6 lg:-right-6 glass-card p-6 z-20 max-w-[260px] border border-white/10">
                <div className="flex items-center gap-2 mb-2 text-tertiary">
                  <ShieldCheck className="w-5 h-5" />
                  <span className="text-label-md uppercase font-bold">Corporate Desk</span>
                </div>
                <p className="text-label-sm text-on-surface-variant">
                  Registry ID: {BRAND.regNo}
                </p>
              </div>
            </Reveal>

            {/* Bio Details */}
            <Reveal className="col-span-12 lg:col-span-6 lg:col-start-7" direction="right">
              <h2 className="text-label-md text-primary uppercase mb-2 font-bold tracking-wider">
                The Visionary Lead
              </h2>
              <h3 className="text-display-md mb-6">Arjun Vardhan, CFA</h3>
              <div className="space-y-6 text-body-lg text-on-surface-variant">
                <p>
                  With over fifteen years in quant-driven equity research, Vardhan established{" "}
                  {BRAND.name} to democratize the precision typically reserved for the world&apos;s
                  largest hedge funds.
                </p>
                <p className="border-l-4 border-primary pl-6 italic text-on-surface bg-surface-container-low/50 py-4 rounded-r-xl">
                  &quot;Our philosophy is simple: Market noise is temporary, but fundamental data is
                  persistent. We don&apos;t chase trends; we identify the structural shifts that precede them.
                  Integrity isn&apos;t just a value—it&apos;s our primary competitive advantage in an industry
                  built on trust.&quot;
                </p>
                <div className="pt-8 grid grid-cols-3 gap-6">
                  <div>
                    <div className="text-display-md text-on-surface font-bold">15+</div>
                    <div className="text-label-sm uppercase text-outline">Years Exp.</div>
                  </div>
                  <div>
                    <div className="text-display-md text-on-surface font-bold">450+</div>
                    <div className="text-label-sm uppercase text-outline">Analyses</div>
                  </div>
                  <div>
                    <div className="text-display-md text-on-surface font-bold">92%</div>
                    <div className="text-label-sm uppercase text-outline">Conviction</div>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ═══ TIMELINE SECTION ═══ */}
      <section className="py-24 max-w-[1200px] mx-auto px-6 md:px-12 xl:px-20 overflow-hidden">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-display-md mb-4">Our Journey</h2>
            <p className="text-body-lg text-on-surface-variant">
              Building a legacy of compliance and performance.
            </p>
          </div>
        </Reveal>

        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-outline-variant/30 -translate-x-1/2 hidden md:block" />

          <div className="space-y-16">
            {[
              {
                date: "Oct 24, 2019",
                title: "Advisory Inception",
                desc: "Formally established our investment research desk, marking our commitment to research excellence and transparency.",
                color: "bg-primary",
                icon: Calendar,
                side: "left",
              },
              {
                date: "Aug 2021",
                title: "Quant Engine Launch",
                desc: "Deployment of our proprietary AI-assisted equity scanning engine, designed to process 10k+ data points daily.",
                color: "bg-secondary",
                icon: Layers,
                side: "right",
              },
              {
                date: "Today",
                title: "Institutional Access",
                desc: "Opening our exclusive research portal to a selected group of HNI and retail investors seeking disciplined growth.",
                color: "bg-tertiary",
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
                  {/* Left or Right text card */}
                  <div className="w-full md:w-1/2 px-4 md:px-12 text-left md:text-right md:odd:text-right md:even:text-left">
                    <div className="inline-flex items-center gap-2 mb-2">
                      <span className="text-label-md text-primary font-bold">{item.date}</span>
                    </div>
                    <h3 className="text-headline-md text-on-surface font-semibold mb-2">
                      {item.title}
                    </h3>
                    <p className="text-body-md text-on-surface-variant">{item.desc}</p>
                  </div>

                  {/* Bullet center dot */}
                  <div className="absolute left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-surface-container border border-outline-variant/40 flex items-center justify-center z-10 hidden md:flex shadow-xl">
                    <SideIcon className="w-5 h-5 text-primary" />
                  </div>

                  {/* Empty side placeholder */}
                  <div className="w-full md:w-1/2 hidden md:block" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══ VALUES SECTION ═══ */}
      <section className="py-24 bg-surface-container-low border-t border-outline-variant/30 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-6 md:px-12 xl:px-20">
          <Reveal>
            <div className="max-w-2xl mb-16">
              <h2 className="text-display-md mb-4">Our Foundations</h2>
              <p className="text-body-lg text-on-surface-variant">
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
                color: "text-secondary border-secondary/20 bg-secondary/10",
                title: "Transparency",
                desc: "Full disclosure of methodology and past performance. We believe informed investors are the most successful ones.",
              },
              {
                icon: Shield,
                color: "text-tertiary border-tertiary/20 bg-tertiary/10",
                title: "Compliance",
                desc: "Rigorous adherence to institutional compliance and fiduciary standards to ensure the safety and security of your financial interests.",
              },
            ].map((value) => (
              <StaggerItem key={value.title}>
                <GlassCard className="p-8 flex flex-col items-start h-full border border-white/5 hover:border-primary/20 transition-all">
                  <div
                    className={`w-14 h-14 rounded-full border flex items-center justify-center mb-6 ${value.color}`}
                  >
                    <value.icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-headline-md text-on-surface font-semibold mb-3">
                    {value.title}
                  </h3>
                  <p className="text-body-md text-on-surface-variant">{value.desc}</p>
                </GlassCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* ═══ CTA SECTION ═══ */}
      <section className="py-24 relative overflow-hidden bg-canvas">
        
        <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
          <GlassCard className="p-12 md:p-16 !rounded-3xl border-primary/20">
            <h2 className="text-display-md mb-6">Ready for a deeper perspective?</h2>
            <p className="text-body-lg text-on-surface-variant mb-10 max-w-xl mx-auto">
              Join a community of investors who value research over rumors.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                href="/services"
                className="bg-primary text-on-primary px-8 py-4 rounded-xl text-headline-md hover:shadow-[0_0_30px_rgba(78,222,163,0.3)] transition-all active:scale-95 text-center"
              >
                Explore Our Plans
              </Link>
              <Link
                href="/disclosure"
                className="border border-outline-variant text-on-surface px-8 py-4 rounded-xl text-headline-md hover:bg-white/5 transition-all active:scale-95 text-center"
              >
                View Disclosures
              </Link>
            </div>
          </GlassCard>
        </div>
      </section>
    </>
  );
}
