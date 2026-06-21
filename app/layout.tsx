import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Capital Gain Research | SEBI Registered Research Analyst",
    template: "%s | Capital Gain Research",
  },
  description:
    "SEBI-registered insights for the serious investor. We provide data-driven market analysis to help you navigate Indian equities with confidence. Reg No: INH000017259",
  keywords: [
    "SEBI registered research analyst",
    "Indian equity research",
    "stock recommendations",
    "market analysis",
    "investment research",
    "Capital Gain",
  ],
  authors: [{ name: "Capital Gain Research Analyst" }],
  openGraph: {
    title: "Capital Gain Research | SEBI Registered Research Analyst",
    description:
      "Professional research for the modern investor. SEBI Reg No: INH000017259",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${jetbrainsMono.variable} dark`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className="min-h-screen antialiased"
        style={{
          fontFamily: "var(--font-inter), var(--font-sans)",
        }}
      >
        {children}
      </body>
    </html>
  );
}
