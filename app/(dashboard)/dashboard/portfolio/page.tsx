"use client";

import { ComingSoon } from "@/components/ui/coming-soon";

export default function PortfolioPage() {
  return (
    <ComingSoon
      title="Portfolio Tracker"
      description="Your personalized portfolio dashboard is under development. Track holdings, P&L, sector allocation, and performance metrics — all in one view."
      backHref="/dashboard"
      backLabel="Back to Dashboard"
    />
  );
}
