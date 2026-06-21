import { BRAND, FOOTER_LINKS, DISCLAIMER } from "@/lib/constants";
import Link from "next/link";

export function DashboardFooter() {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant mt-8">
      <div className="max-w-[1440px] mx-auto px-6 py-16 flex flex-col gap-4 text-center">
        <p className="text-headline-md text-primary mb-2">{BRAND.fullName}</p>
        <p className="text-label-sm text-on-surface-variant max-w-3xl mx-auto leading-relaxed">
          © {new Date().getFullYear()} {BRAND.fullName}. Research ID:{" "}
          {BRAND.regNo}. {DISCLAIMER}
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          {[...FOOTER_LINKS.quickLinks, ...FOOTER_LINKS.compliance].map(
            (link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-label-sm text-on-surface-variant hover:text-primary transition-all underline"
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      </div>
    </footer>
  );
}
