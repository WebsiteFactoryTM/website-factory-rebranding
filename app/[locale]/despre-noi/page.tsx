import type { Metadata } from "next"
import { setRequestLocale, getTranslations } from "next-intl/server"
import type { Locale } from "@/i18n/routing"
import { allLocaleParams } from "@/lib/i18n/ro-only"
import { generatePageMetadata, generateBreadcrumbSchema, siteConfig } from "@/lib/seo"
import { AboutHero } from "@/components/about/about-hero"
import { CompanyStory } from "@/components/about/company-story"
import { FoundersSection } from "@/components/about/founders-section"
import { ValuesSection } from "@/components/about/values-section"
import { TimelineSection } from "@/components/about/timeline-section"
import { AboutCTA } from "@/components/about/about-cta"

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    href: "/despre-noi",
    title: "Despre Noi",
    description:
      "Descoperiți povestea Website Factory - agenție de web design din Timișoara fondată în 2023. Cunoașteți echipa noastră și valorile care ne ghidează în fiecare proiect.",
    keywords: [
      "despre website factory",
      "agenție web design timișoara",
      "echipa web design",
      "Ernest Slach",
      "Alex Nedelia-Kerekeș",
      "creare site timișoara",
    ],
  })
}

export function generateStaticParams() {
  return allLocaleParams()
}

export default async function DespreNoiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = await getTranslations("breadcrumb")
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: t("home"), url: "/" },
    { name: t("about"), url: "/despre-noi" },
  ])

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    foundingDate: "2021",
    inLanguage: locale,
    founders: [
      {
        "@type": "Person",
        name: "Ernest Slach",
        jobTitle: "Co-Founder & CEO",
      },
      {
        "@type": "Person",
        name: "Alex Nedelia-Kereks",
        jobTitle: "Co-Founder & CTO",
      },
    ],
    address: {
      "@type": "PostalAddress",
      ...siteConfig.address,
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: siteConfig.contact.telephone,
      email: siteConfig.contact.email,
      contactType: "customer service",
    },
    areaServed: "România",
    sameAs: [
      "https://www.facebook.com/profile.php?id=100087606842806",
      "https://instagram.com/websitefactorytm",
      "https://x.com/websitefactory_",
      "https://www.linkedin.com/company/websitefactory-tm/",
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
      <main>
        <AboutHero />
        <CompanyStory />
        <ValuesSection />
        <FoundersSection />
        <TimelineSection />
        <AboutCTA />
      </main>
    </>
  )
}
