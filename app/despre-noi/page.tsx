import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema, siteConfig } from "@/lib/seo"
import { AboutHero } from "@/components/about/about-hero"
import { CompanyStory } from "@/components/about/company-story"
import { FoundersSection } from "@/components/about/founders-section"
import { ValuesSection } from "@/components/about/values-section"
import { TimelineSection } from "@/components/about/timeline-section"
import { AboutCTA } from "@/components/about/about-cta"

export const metadata: Metadata = generatePageMetadata({
  title: "Despre Noi",
  description:
    "Descoperiți povestea Website Factory - agenție de web design din Timișoara fondată în 2023. Cunoașteți echipa noastră și valorile care ne ghidează în fiecare proiect.",
  path: "/despre-noi",
  keywords: [
    "despre website factory",
    "agenție web design timișoara",
    "echipa web design",
    "Ernest Slach",
    "Alex Nedelia-Kerekeș",
    "creare site timișoara",
  ],
})

export default function DespreNoiPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Acasă", url: "/" },
    { name: "Despre Noi", url: "/despre-noi" },
  ])

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    description: siteConfig.description,
    foundingDate: "2021",
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
