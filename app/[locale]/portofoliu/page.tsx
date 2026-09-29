import type { Metadata } from "next"
import { setRequestLocale, getTranslations } from "next-intl/server"
import type { Locale } from "@/i18n/routing"
import { getPathname } from "@/i18n/navigation"
import { allLocaleParams } from "@/lib/i18n/ro-only"
import { generatePageMetadata, generateBreadcrumbSchema, siteConfig } from "@/lib/seo"
import { PortfolioHero } from "@/components/portfolio/portfolio-hero"
import { FeaturedProjects } from "@/components/portfolio/featured-projects"
import { SimpleProjectsGrid } from "@/components/portfolio/simple-projects-grid"
import { PortfolioCta } from "@/components/portfolio/portfolio-cta"

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  if (locale === "en") {
    return generatePageMetadata({
      locale,
      href: "/portofoliu",
      hreflang: true,
      title: "Portfolio - Web Design Case Studies",
      description:
        "Real websites, online stores and custom apps we've built — with measurable results and full case studies.",
      keywords: [
        "web design portfolio",
        "website case studies",
        "e-commerce examples",
        "web design agency portfolio",
      ],
    })
  }
  return generatePageMetadata({
    locale,
    href: "/portofoliu",
    hreflang: true,
    title: "Portofoliu - Web design",
    description:
      "Descoperă proiectele noastre de web design, magazine online și aplicații custom. Portofoliu cu rezultate reale și studii de caz detaliate.",
    keywords: [
      "portofoliu web design",
      "proiecte website Timișoara",
      "studii de caz web",
      "exemple magazine online",
      "aplicații mobile România",
    ],
  })
}

export function generateStaticParams() {
  return allLocaleParams()
}

export default async function PortfolioPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = await getTranslations("breadcrumb")
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: t("home"), url: "/" },
    { name: t("portfolio"), url: "/portofoliu" },
  ])

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: locale === "en" ? "Website Factory Portfolio" : "Portofoliu Website Factory",
    description:
      locale === "en"
        ? "A collection of web design, online store and mobile app projects built by Website Factory."
        : "Colecție de proiecte web design, magazine online și aplicații mobile create de Website Factory.",
    url: `${siteConfig.url}${getPathname({ locale: locale as Locale, href: "/portofoliu" })}`,
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(portfolioSchema) }} />

      <main>
        <PortfolioHero />
        <FeaturedProjects />
        <SimpleProjectsGrid />
        <PortfolioCta />
      </main>
    </>
  )
}
