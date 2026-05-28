import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { WhatsAppFloat } from "@/components/layout/WhatsAppFloat";
import { getSiteConfig } from "@/utils/products";
import { buildSiteMetadata } from "@/utils/seo";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
});

const site = getSiteConfig();

export const metadata: Metadata = buildSiteMetadata(site);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${dmSans.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-white font-sans text-slate-900 antialiased">
        <Header site={site} />
        <main className="flex-1">{children}</main>
        <Footer site={site} />
        <WhatsAppFloat site={site} />
      </body>
    </html>
  );
}
