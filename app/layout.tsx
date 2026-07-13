import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
  display: "swap",
  preload: false,
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500"],
  preload: false,
});

export const metadata: Metadata = {
  title: {
    default: "Capital Gain Research | Professional Equity Analysis",
    template: "%s | Capital Gain Research",
  },
  description:
    "Professional equity insights for the serious investor. We provide data-driven market analysis to help you navigate Indian equities with confidence.",
  keywords: [
    "equity research analyst",
    "Indian equity research",
    "stock recommendations",
    "market analysis",
    "investment research",
    "Capital Gain",
  ],
  authors: [{ name: "Capital Gain Research" }],
  openGraph: {
    title: "Capital Gain Research | Professional Equity Analysis",
    description:
      "Professional research for the modern investor. High-conviction swing and growth ideas.",
    type: "website",
    locale: "en_IN",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
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
      className={`${inter.variable} ${outfit.variable} ${jetbrainsMono.variable} dark`}
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className="min-h-screen antialiased"
        style={{
          fontFamily: "var(--font-inter), var(--font-sans)",
        }}
      >
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function(registrations) {
                  for(let registration of registrations) {
                    registration.unregister();
                  }
                });
              }
            `,
          }}
        />
        {children}
      </body>
    </html>
  );
}
