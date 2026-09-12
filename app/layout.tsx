import type { Metadata, Viewport } from "next";
import "./globals.css";
import { fraunces, inter } from "./fonts";
import DemoBanner from "@/components/blocks/DemoBanner";
import Navbar from "@/components/blocks/Navbar";
import Footer from "@/components/blocks/Footer";
import WhatsAppFab from "@/components/blocks/WhatsAppFab";
import site from "@/content/site";
import { siteUrl } from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${site.business.name} — ${site.business.tagline}`,
    template: `%s · ${site.business.name}`,
  },
  description: site.business.description,
  applicationName: site.business.name,
  authors: [{ name: site.business.name }],
  creator: site.business.name,
  robots: { index: true, follow: true },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
    apple: [{ url: "/favicon.svg" }],
  },
  // Makes the demo status legible to crawlers and link unfurls too.
  other: { "demo-notice": site.business.demoLabel },
};

export const viewport: Viewport = {
  themeColor: "#FAF7F2",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-IN" className={`${fraunces.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-bg text-ink antialiased">
        <a
          href="#main"
          className="label-caps sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-button focus:bg-ink focus:px-4 focus:py-3 focus:text-bg"
        >
          Skip to content
        </a>

        <DemoBanner />
        <Navbar />

        <main id="main">{children}</main>

        <Footer />
        <WhatsAppFab />
      </body>
    </html>
  );
}
