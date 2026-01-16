import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Manrope } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { ThemeProvider } from "@/components/theme-provider"
import { Header } from "@/components/layout/header"
import { Footer } from "@/components/layout/footer"
import { CookieConsent } from "@/components/cookie-consent"
import { AnalyticsLoader } from "@/components/analytics-loader"
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
    default: "Creare Site Timișoara - Web Design Timișoara - Website Factory",
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
        {/* Analytics - Only loaded after consent */}
        <AnalyticsLoader />
        
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
        
        {/* Cookie Consent Banner */}
        <CookieConsent />
        
        {/* Floating Contact CTA - Appears on all pages */}
        <FloatingCTA />
        
        {/* Vercel Analytics - Privacy-focused, always enabled */}
        <Analytics />
      </body>
    </html>
  )
}
