"use client";

import { BRAND } from "@/lib/constants";
import { Shield } from "lucide-react";

export function TrustBar() {
  return (
    <div className="w-full bg-surface-container-lowest h-10 flex items-center justify-center border-b border-outline-variant/30 px-4 z-[60] relative">
      <p className="text-label-sm text-on-surface-variant flex items-center gap-4 flex-wrap justify-center">
        <span className="text-primary font-bold">
          SEBI Registered Research Analyst
        </span>
        <span className="opacity-30 hidden sm:inline">|</span>
        <span className="hidden sm:inline">Reg No. {BRAND.sebiRegNo}</span>
        <span className="opacity-30 hidden md:inline">|</span>
        <span className="hidden md:flex items-center gap-1">
          <Shield className="w-3.5 h-3.5" />
          Investor-first platform
        </span>
      </p>
    </div>
  );
}
