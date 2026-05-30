import type { Metadata } from "next";
import { DM_Sans, Oswald } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { MobileBottomNav } from "@/components/layout/MobileBottomNav";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { AppProviders } from "@/components/providers/AppProviders";
import { getSiteConfig } from "@/utils/products";
import { buildSiteMetadata } from "@/utils/seo";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  weight: ["500", "600", "700"],
});

const site = getSiteConfig();

const isProduction = process.env.NODE_ENV === "production";

const CONTENT_SECURITY_POLICY = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "frame-src https://www.youtube.com https://www.youtube-nocookie.com",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
].join("; ");

export const metadata: Metadata = buildSiteMetadata(site);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} ${oswald.variable} h-full`}>
      <head>
        {isProduction ? (
          <meta
            httpEquiv="Content-Security-Policy"
            content={CONTENT_SECURITY_POLICY}
          />
        ) : null}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body className="flex min-h-full flex-col bg-background font-sans text-slate-900 antialiased">
        <AppProviders>
          <Header site={site} />
          <main className="flex-1 pb-[4.5rem] md:pb-0">{children}</main>
          <Footer site={site} />
          <div className="hidden md:block">
            <WhatsAppFloat site={site} />
          </div>
          <MobileBottomNav site={site} />
        </AppProviders>
      </body>
    </html>
  );
}
