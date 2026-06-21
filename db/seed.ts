import { PLANS } from "../lib/constants";

// This file serves as a reference/documentation of the initial dataset seeded into the PG database.
// It reflects the exact parameters shown in our premium Stitch UI dashboard mockups.

export const SEED_PLANS = PLANS.map((p) => ({
  id: p.id,
  name: p.name,
  slug: p.id,
  price: p.price,
  period: p.period,
  features: p.features,
  isPopular: p.isPopular,
  tier: p.tier,
}));

export const SEED_RECOMMENDATIONS = [
  {
    symbol: "RELIANCE",
    companyName: "Reliance Industries Ltd.",
    type: "Long-term",
    action: "BUY",
    entryRange: "₹2,840 - 2,860",
    target: "₹3,120",
    stopLoss: "₹2,710",
    riskLevel: "Moderate",
    confidence: "High",
    sector: "Energy & Infra",
    timeHorizon: "Long Term",
    rationale: "Reliance Industries is currently demonstrating a classic breakout pattern on the weekly charts, supported by heavy volumes in the O2C segment and expanding margins in the Retail vertical. Our proprietary momentum indicator suggests a fresh bullish cycle commencing from the 2,840 base.",
    tier: "starter",
  },
  {
    symbol: "HDFCBANK",
    companyName: "HDFC Bank Ltd.",
    type: "Positional",
    action: "ACCUMULATE",
    entryRange: "₹1,420 - 1,440",
    target: "₹1,580",
    stopLoss: "₹1,385",
    riskLevel: "Low",
    confidence: "High",
    sector: "BFSI",
    timeHorizon: "Mid Term",
    rationale: "HDFC Bank merger integration synergies are starting to reflect in NIM expansion. Credit growth remains stable at 16% YoY, and asset quality indicators (GNPA) continue to improve. Valuation is extremely attractive at current historical multiples.",
    tier: "professional",
  },
  {
    symbol: "TCS",
    companyName: "Tata Consultancy Services Ltd.",
    type: "Swing Trade",
    action: "HOLD",
    entryRange: "₹3,850 - 3,900",
    target: "₹4,100",
    stopLoss: "₹3,750",
    riskLevel: "High",
    confidence: "Medium",
    sector: "Information Technology",
    timeHorizon: "Short Term",
    rationale: "IT spending remains muted globally. However, TCS is winning mega deals that provide robust revenue visibility for the next 2-3 years. Maintain Hold at current levels pending Q1 execution visibility.",
    tier: "starter",
  },
];

export const SEED_RESEARCH_REPORTS = [
  {
    title: "IT Services: 2026 Outlook",
    slug: "it-services-2026-outlook",
    type: "sectorial",
    sector: "Information Technology",
    coverImageUrl: "/report_it.png",
    fileSize: "12.4 MB",
  },
  {
    title: "Hedging in Volatile Markets",
    slug: "hedging-in-volatile-markets",
    type: "strategy",
    sector: "Strategy Focus",
    coverImageUrl: "/report_strategy.png",
    fileSize: "8.1 MB",
  },
  {
    title: "Commercial REITs Analysis",
    slug: "commercial-reits-analysis",
    type: "real estate",
    sector: "Real Estate Focus",
    coverImageUrl: "/report_it.png",
    fileSize: "15.6 MB",
  },
  {
    title: "Q4 Earnings Masterclass",
    slug: "q4-earnings-masterclass",
    type: "quarterly",
    sector: "Market Overview",
    coverImageUrl: "/report_strategy.png",
    fileSize: "22.0 MB",
  },
];

export const SEED_DISCLOSURE_TRACKER = [
  {
    monthYear: "January 2026",
    complaintsReceived: 0,
    resolved: 0,
    status: "compliant",
  },
  {
    monthYear: "December 2025",
    complaintsReceived: 0,
    resolved: 0,
    status: "compliant",
  },
  {
    monthYear: "November 2025",
    complaintsReceived: 1,
    resolved: 1,
    status: "compliant",
  },
];
