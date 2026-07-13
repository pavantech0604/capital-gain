// ─── Brand ───────────────────────────────────────────────────────────
export const BRAND = {
  name: "Capital Gain",
  fullName: "Capital Gain Research",
  tagline: "Precision research for the modern investor.",
  regNo: "CGR-2024-0012",
  regDate: "Oct 24, 2024",
  entityType: "Equity Research Desk",
  foundedYear: 2024,
  email: {
    compliance: "compliance@capitalgain.in",
    support: "support@capitalgain.in",
    institutional: "research@capitalgain.in",
  },
  phone: {
    tollFree: "1800-456-7890",
    direct: "+91 40-6789-0123",
  },
  address: {
    line1: "Level 12, Financial District",
    line2: "Gachibowli, Hyderabad",
    line3: "Telangana, 500032",
    full: "Level 12, Financial District, Gachibowli, Hyderabad, Telangana 500032",
  },
  social: {
    // TODO: Replace with actual social media URLs when available
    twitter: "https://twitter.com",
    linkedin: "https://linkedin.com",
  },
  complianceOfficer: {
    name: "Arjun Mehta",
    email: "arjun.mehta@capitalgain.in",
    designation: "Compliance Officer",
  },
} as const;

// ─── Navigation ──────────────────────────────────────────────────────
export const NAV_ITEMS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Disclosure", href: "/disclosure" },
  { label: "Contact", href: "/contact" },
] as const;

export const DASHBOARD_NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: "LayoutDashboard" },
  { label: "Portfolio", href: "/dashboard/portfolio", icon: "Wallet" },
  { label: "Market Analysis", href: "/dashboard/analysis", icon: "BarChart3" },
  { label: "Premium Insights", href: "/research", icon: "Star" },
  { label: "Reports", href: "/dashboard/reports", icon: "FileText" },
  { label: "Settings", href: "/dashboard/settings", icon: "Settings" },
] as const;

// Route path mapping note: All dashboard sub-routes resolve under
// app/(dashboard)/dashboard/* to match the route group structure.

// ─── Plans ───────────────────────────────────────────────────────────
export const PLANS = [
  {
    id: "starter",
    name: "Starter",
    altName: "Retail Alpha",
    price: 2499,
    altPrice: 4999,
    period: "quarter",
    isPopular: false,
    tier: "starter",
    features: [
      "Daily Market Insights",
      "2 Stock Recommendations/mo",
      "Email Support",
    ],
    altFeatures: [
      "2 Daily Intraday Calls",
      "Weekly Macro Report",
      "Email Support",
      "1-on-1 Strategy Call",
    ],
    cta: "Select Plan",
  },
  {
    id: "institutional",
    name: "Institutional",
    altName: "Market Pro",
    price: 9999,
    altPrice: 12499,
    period: "quarter",
    isPopular: true,
    tier: "professional",
    features: [
      "All Starter Features",
      "8-10 Stock Recommendations/mo",
      "Priority WhatsApp Desk",
      "Quarterly Portfolio Review",
    ],
    altFeatures: [
      "5-8 Multi-segment Calls",
      "Bi-weekly Sectoral Deep-dives",
      "Real-time Telegram Alerts",
      "Monthly Review Meeting",
    ],
    cta: "Get Started Now",
  },
  {
    id: "hni-alpha",
    name: "HNI Alpha",
    altName: "Global Wealth",
    price: null,
    altPrice: 49999,
    period: "annual",
    isPopular: false,
    tier: "institutional",
    features: [
      "Specialized Sector Focus",
      "Direct Analyst Access",
      "Custom Research Requests",
    ],
    altFeatures: [
      "Custom Strategy Research",
      "All Market Segments Covered",
      "1-on-1 Dedicated Support",
      "Direct Analyst Desk Access",
    ],
    cta: "Contact Us",
  },
] as const;

// ─── Footer Links ────────────────────────────────────────────────────
export const FOOTER_LINKS = {
  quickLinks: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Refund Policy", href: "/refund" },
  ],
  compliance: [
    { label: "Standard Disclosures", href: "/disclosure" },
    { label: "Advisory Disclaimer", href: "/disclosure#disclaimer" },
    { label: "Compliance Officer", href: "/contact" },
  ],
} as const;
// Note: /privacy, /terms, /refund routes created as stub pages.
// /disclosure#disclaimer requires id="disclaimer" on the target section.

// ─── Compliance Disclaimer ──────────────────────────────────────────
export const DISCLAIMER =
  "Investment in securities market are subject to market risks. Read all the related documents carefully before investing. Past performance does not guarantee future results. Research findings are for educational and informational purposes.";
