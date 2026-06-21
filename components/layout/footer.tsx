import Link from "next/link";
import Image from "next/image";
import { BRAND, FOOTER_LINKS, DISCLAIMER } from "@/lib/constants";
import { Globe, Share2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant/30">
      <div className="max-w-[1440px] mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1">
            <Link
              href="/"
              className="text-headline-md text-primary font-bold mb-6 block"
            >
              {BRAND.name}
            </Link>
            <p className="text-label-sm text-on-surface-variant leading-relaxed">
              Precision research for the modern investor.
              <br />
              Empowering wealth creation through transparency.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-label-md text-on-surface mb-6">Quick Links</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.quickLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-label-sm text-on-surface-variant hover:text-primary transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Compliance */}
          <div>
            <h4 className="text-label-md text-on-surface mb-6">Compliance</h4>
            <ul className="space-y-2">
              {FOOTER_LINKS.compliance.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-label-sm text-on-surface-variant hover:text-primary transition-all"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-label-md text-on-surface mb-6">Contact</h4>
            <p className="text-label-sm text-on-surface-variant">
              {BRAND.email.compliance}
            </p>
            <p className="text-label-sm text-on-surface-variant">
              +91 {BRAND.phone.tollFree}
            </p>
            <div className="mt-4 flex gap-2">
              <a
                href={BRAND.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center hover:text-primary cursor-pointer transition-all"
                aria-label="Twitter / X"
              >
                <Share2 className="w-4 h-4" />
              </a>
              <a
                href={BRAND.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-surface-container-high flex items-center justify-center hover:text-primary cursor-pointer transition-all"
                aria-label="LinkedIn"
              >
                <Globe className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-outline-variant/20 text-center">
          <p className="text-label-sm text-on-surface-variant mb-4 max-w-4xl mx-auto opacity-70">
            © {new Date().getFullYear()} {BRAND.fullName}. SEBI Reg No:{" "}
            {BRAND.sebiRegNo}. {DISCLAIMER}
          </p>
          <div className="inline-block px-6 py-2 bg-surface-container-low rounded-lg border border-outline-variant/30">
            <p className="text-label-sm text-primary">
              Registration: {BRAND.sebiRegNo}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
