import Link from "next/link";
import Image from "next/image";
import { BRAND, FOOTER_LINKS, DISCLAIMER } from "@/lib/constants";
import { Shield, CheckCircle } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-bg-soft border-t border-warm-border relative overflow-hidden">
      {/* Decorative Blur Blob */}
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-primary/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-accent/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-12 xl:px-20 pt-12 md:pt-16 pb-6 md:pb-8 relative z-10">
        {/* Main Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 lg:gap-10 mb-12 sm:mb-16">
          {/* Brand Column */}
          <div className="col-span-1 sm:col-span-6 lg:col-span-4 flex flex-col gap-4 sm:gap-5">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-9 h-9">
                <Image
                  src="/logo.png"
                  alt={BRAND.name}
                  fill
                  sizes="36px"
                  className="object-contain logo-theme-color"
                />
              </div>
              <div className="flex flex-col justify-center">
                <span className="text-[17px] font-heading font-extrabold tracking-wide text-text uppercase group-hover:text-primary transition-colors leading-tight">
                  Capital Gain
                </span>
                <span className="text-[9px] font-mono font-semibold tracking-wider text-primary uppercase leading-none mt-0.5">
                  Equity Research
                </span>
              </div>
            </Link>
            <p className="text-body-sm text-text-muted leading-relaxed max-w-sm">
              A premier equity research and investment analysis platform. We deliver data-backed, institutional-grade insights for retail and HNI investors across Indian equities.
            </p>
            {/* Social Icons */}
            <div className="flex gap-3 mt-1.5">
              <a
                href={BRAND.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-warm-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/50 transition-all duration-300 active:scale-95 shadow-sm"
                aria-label="Twitter / X"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a
                href={BRAND.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl bg-white border border-warm-border flex items-center justify-center text-text-muted hover:text-primary hover:border-primary/50 transition-all duration-300 active:scale-95 shadow-sm"
                aria-label="LinkedIn"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Links Columns Container (Side by Side on mobile/tablet) */}
          <div className="col-span-1 sm:col-span-6 lg:col-span-4 grid grid-cols-2 gap-6 sm:gap-8">
            {/* Links Column 1 */}
            <div>
              <h4 className="text-headline-md font-bold text-text mb-4 sm:mb-5">Quick Links</h4>
              <ul className="space-y-2.5">
                {FOOTER_LINKS.quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-body-sm text-text-muted hover:text-primary transition-colors duration-250 block py-0.5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Links Column 2 */}
            <div>
              <h4 className="text-headline-md font-bold text-text mb-4 sm:mb-5">Compliance</h4>
              <ul className="space-y-2.5">
                {FOOTER_LINKS.compliance.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-body-sm text-text-muted hover:text-primary transition-colors duration-250 block py-0.5"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Compliance Officer Card */}
          <div className="col-span-1 sm:col-span-12 lg:col-span-4 bg-white border border-warm-border p-5 sm:p-6 rounded-2xl shadow-sm">
            <h4 className="text-headline-md font-bold text-text mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" />
              Compliance Officer
            </h4>
            <div className="space-y-3 text-body-sm text-text-muted">
              <div>
                <p className="text-xs text-text-muted/60 leading-none">Name</p>
                <p className="font-semibold text-text mt-1">{BRAND.complianceOfficer.name}</p>
              </div>
              <div>
                <p className="text-xs text-text-muted/60 leading-none">Email</p>
                <p className="font-mono hover:text-primary transition-colors mt-1">
                  <a href={`mailto:${BRAND.complianceOfficer.email}`}>{BRAND.complianceOfficer.email}</a>
                </p>
              </div>
              <div className="pt-2 border-t border-warm-border flex gap-2 items-center">
                <CheckCircle className="w-4 h-4 text-success shrink-0" />
                <span className="text-[10px] font-semibold text-success uppercase tracking-wider font-mono">Research ID: {BRAND.regNo}</span>
              </div>
            </div>
          </div>
        </div>



        {/* Legal Disclaimer Box */}
        <div className="text-center md:text-left space-y-4">
          <div className="p-5 bg-white border border-warm-border rounded-xl shadow-sm">
            <p className="text-[11px] text-text-muted leading-relaxed text-center font-medium">
              <span className="text-primary font-bold uppercase tracking-wider block mb-1">Statutory Risk Disclaimer</span>
              {DISCLAIMER}
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-4 text-[11px] text-text-muted/65">
            <p>© {new Date().getFullYear()} {BRAND.fullName}. All rights reserved.</p>
            <p className="flex items-center gap-2">
              <span>Release Code Date: {BRAND.regDate}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-warm-border" />
              <span>Entity: {BRAND.entityType}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
