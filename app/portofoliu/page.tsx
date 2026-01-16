import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema, siteConfig } from "@/lib/seo"
import { PortfolioHero } from "@/components/portfolio/portfolio-hero"
import { FeaturedProjects } from "@/components/portfolio/featured-projects"
import { SimpleProjectsGrid } from "@/components/portfolio/simple-projects-grid"
import { PortfolioCta } from "@/components/portfolio/portfolio-cta"

export const metadata: Metadata = generatePageMetadata({
  title: "Portofoliu - Web design",
  description:
    "Descoperă proiectele noastre de web design, magazine online și aplicații custom. Portofoliu cu rezultate reale și studii de caz detaliate.",
  path: "/portofoliu",
  keywords: [
    "portofoliu web design",
    "proiecte website Timișoara",
    "studii de caz web",
    "exemple magazine online",
    "aplicații mobile România",
  ],
})

export default function PortfolioPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Acasă", url: "/" },
    { name: "Portofoliu", url: "/portofoliu" },
  ])

  const portfolioSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Portofoliu Website Factory",
    description: "Colecție de proiecte web design, magazine online și aplicații mobile create de Website Factory.",
    url: `${siteConfig.url}/portofoliu`,
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
