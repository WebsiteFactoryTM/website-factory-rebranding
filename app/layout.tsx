import type React from "react"
import type { Metadata, Viewport } from "next"
import Script from "next/script"
import { Inter, Manrope } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { ConsentDefaultScript } from "@/components/consent/consent-default-script"
import { ConsentProvider } from "@/components/consent/consent-provider"
import { ConsentBanner } from "@/components/consent/consent-banner"
import { GaLoader } from "@/components/consent/tag-loaders/ga-loader"
import { MetaPixelLoader } from "@/components/consent/tag-loaders/meta-pixel-loader"
import { VercelAnalyticsLoader } from "@/components/consent/tag-loaders/vercel-analytics-loader"
import { PageViewTracker } from "@/components/consent/page-view-tracker"
import { FloatingCTA } from "@/components/services/website/floating-cta"
import "./globals.css"

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
})

const manrope = Manrope({
  subsets: ["latin", "latin-ext"],
  variable: "--font-manrope",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://websitefactory.ro"),
  title: {
    default: "Creare Site Timișoara - Web Design Timișoara",
    template: "%s - Website Factory",
  },
  description:
    "Servicii profesionale de web design, magazin online si optimizare SEO, vizibilitate locală și națională - De la idee la soluție digitală",
  keywords: [
    "creare site Timișoara",
    "web design Timișoara",
    "dezvoltare site web",
    "site-uri profesionale",
    "magazin online",
    "aplicații mobile",
    "Firmă web design Timișoara",
  ],
  authors: [{ name: "Website Factory" }],
  creator: "Website Factory",
  publisher: "Website Factory",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "ro_RO",
    url: "https://websitefactory.ro",
    siteName: "Website Factory",
    title: "Creare Site Timișoara - Web Design Timișoara - Website Factory",
    description:
      "Servicii profesionale de web design, magazin online si optimizare SEO, vizibilitate locală și națională - De la idee la soluție digitală",
    images: [
      {
        url: "/website-factory-og-square.webp",
        width: 1080,
        height: 1080,
        alt: "Website Factory - Web Design Timișoara",
        type: "image/webp",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Creare Site Timișoara - Web Design Timișoara - Website Factory",
    description: "Servicii profesionale de web design, magazin online si optimizare SEO, vizibilitate locală și națională - De la idee la soluție digitală",
    images: ["/website-factory-og-square.webp"],
  },
  alternates: {
    canonical: "https://websitefactory.ro",
  },
  icons: {
    icon: [
      { url: "/website-factory-favicon.webp", type: "image/webp" },
      { url: "/website-factory-favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/website-factory-favicon.webp", type: "image/webp" },
    ],
    shortcut: "/website-factory-favicon.webp",
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1625" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ro" suppressHydrationWarning>
      <body className={`${inter.variable} ${manrope.variable} font-sans antialiased`}>
        {/* Google Consent Mode v2 — default denied + restore din cookie.
            beforeInteractive: rulează în <head> înaintea hidratării și a oricărui tag. */}
        <ConsentDefaultScript />

        <ConsentProvider>
          <ThemeProvider>
            {/* Skip to content link for accessibility */}
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand focus:text-brand-foreground focus:rounded-md"
            >
              Salt la conținut
            </a>
            <Header />
            <main id="main-content">{children}</main>
            <Footer />
          </ThemeProvider>

          {/* Cookie consent banner */}
          <ConsentBanner />

          {/* Trackere hard-gated — se montează doar cu consimțământul corespunzător */}
          <GaLoader />
          <MetaPixelLoader />
          <VercelAnalyticsLoader />
          <PageViewTracker />

          {/* Floating Contact CTA - Appears on all pages */}
          <FloatingCTA />
        </ConsentProvider>

        {/* AskBot chat widget - funcțional, încărcat pe fiecare pagină */}
        <Script
          src="https://askbot.ro/widget/v1/widget.min.js"
          data-api-key="wf_live_nNvWDyNhhjIGleayb-xUr89PhNCB7uFdyhCPdOA6jsw"
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}
