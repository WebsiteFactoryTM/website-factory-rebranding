import type React from "react"
import type { Metadata, Viewport } from "next"
import Script from "next/script"
import { Inter, Manrope } from "next/font/google"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { notFound } from "next/navigation"
import { routing } from "@/i18n/routing"
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
import "../globals.css"

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

const SITE_TITLE = "Creare Site Timișoara - Web Design Timișoara"
const SITE_DESCRIPTION =
  "Servicii profesionale de web design, magazin online si optimizare SEO, vizibilitate locală și națională - De la idee la soluție digitală"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === "en"
  return {
    metadataBase: new URL("https://websitefactory.ro"),
    title: { default: SITE_TITLE, template: "%s - Website Factory" },
    description: SITE_DESCRIPTION,
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
    robots: isEn
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
        },
    openGraph: {
      type: "website",
      locale: isEn ? "en_GB" : "ro_RO",
      url: isEn ? "https://websitefactory.ro/en" : "https://websitefactory.ro",
      siteName: "Website Factory",
      title: `${SITE_TITLE} - Website Factory`,
      description: SITE_DESCRIPTION,
      images: [{ url: "/website-factory-og-square.webp", width: 1080, height: 1080, alt: "Website Factory - Web Design Timișoara", type: "image/webp" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_TITLE} - Website Factory`,
      description: SITE_DESCRIPTION,
      images: ["/website-factory-og-square.webp"],
    },
    alternates: { canonical: isEn ? "https://websitefactory.ro/en" : "https://websitefactory.ro" },
    icons: {
      icon: [
        { url: "/website-factory-favicon.webp", type: "image/webp" },
        { url: "/website-factory-favicon.ico", sizes: "any" },
      ],
      apple: [{ url: "/website-factory-favicon.webp", type: "image/webp" }],
      shortcut: "/website-factory-favicon.webp",
    },
  }
}

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1625" },
  ],
  width: "device-width",
  initialScale: 1,
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const t = await getTranslations("common")

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} ${manrope.variable} font-sans antialiased`}>
        {/* Google Consent Mode v2 — default denied + restore din cookie.
            beforeInteractive: rulează în <head> înaintea hidratării și a oricărui tag. */}
        <ConsentDefaultScript />

        <NextIntlClientProvider>
          <ConsentProvider>
            <ThemeProvider>
              {/* Skip to content link for accessibility */}
              <a
                href="#main-content"
                className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand focus:text-brand-foreground focus:rounded-md"
              >
                {t("skipToContent")}
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
        </NextIntlClientProvider>

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
