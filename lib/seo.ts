import type { Metadata } from "next"
import { getPathname } from "@/i18n/navigation"
import type { Locale, Pathname } from "@/i18n/routing"

// Base URL for the site
export const siteConfig = {
  name: "Website Factory",
  url: "https://websitefactory.ro",
  description:
    "Creare site web profesional în Timișoara. Web design și optimizare SEO, performanță și conversii măsurabile.",
  locale: "ro_RO",
  address: {
    streetAddress: "Piața Unirii 1",
    addressLocality: "Timișoara",
    addressRegion: "Timiș",
    postalCode: "300085",
    addressCountry: "RO",
  },
  contact: {
    telephone: "+40728567830",
    email: "office@websitefactory.ro",
  },
}

export type PageHref = Pathname | { pathname: "/portofoliu/[slug]"; params: { slug: string } }

function absoluteUrl(locale: Locale, href: PageHref): string {
  const localized = getPathname({ locale, href: href as never })
  return localized === "/" ? siteConfig.url : `${siteConfig.url}${localized}`
}

// Generate page-specific metadata
export function generatePageMetadata({
  title,
  description,
  path = "",
  href,
  locale = "ro",
  hreflang = false,
  keywords = [],
  image = "/website-factory-og.webp",
  imageWidth = 1200,
  imageHeight = 630,
  ogTitle = title,
  imageAlt = title,
}: {
  title: string
  description: string
  path?: string
  href?: PageHref
  locale?: Locale
  hreflang?: boolean
  keywords?: string[]
  image?: string
  imageWidth?: number
  imageHeight?: number
  ogTitle?: string
  imageAlt?: string
}): Metadata {
  const url = href ? absoluteUrl(locale, href) : `${siteConfig.url}${path}`
  const isEn = locale === "en"

  return {
    title,
    description,
    keywords: [
      ...keywords,
      "web design",
      "Website Factory",
      ...(isEn ? [] : ["creare site", "dezvoltare website", "creare magazin online"]),
    ],
    ...(isEn && { robots: { index: false, follow: true } }),
    alternates: {
      canonical: url,
      ...(hreflang &&
        href && {
          languages: {
            ro: absoluteUrl("ro", href),
            en: absoluteUrl("en", href),
            "x-default": absoluteUrl("ro", href),
          },
        }),
    },
    openGraph: {
      title: ogTitle,
      description,
      url,
      siteName: siteConfig.name,
      locale: isEn ? "en_GB" : siteConfig.locale,
      type: "website",
      images: [
        {
          url: image,
          width: imageWidth,
          height: imageHeight,
          alt: imageAlt,
          type: "image/webp",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description,
      images: [image],
    },
  }
}

// JSON-LD Schema generators
export function generateLocalBusinessSchema(locale: Locale = "ro") {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    description:
      locale === "en"
        ? "Professional website design and development, based in Timișoara. We build SEO-first websites optimised for performance and conversions."
        : siteConfig.description,
    url: siteConfig.url,
    logo: `${siteConfig.url}/logo.png`,
    image: `${siteConfig.url}/website-factory-og.webp`,
    telephone: siteConfig.contact.telephone,
    email: siteConfig.contact.email,
    address: {
      "@type": "PostalAddress",
      ...siteConfig.address,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 45.7489,
      longitude: 21.2087,
    },
    areaServed: [
      { "@type": "City", name: "Timișoara" },
      { "@type": "City", name: "Cluj-Napoca" },
      { "@type": "City", name: "București" },
      { "@type": "City", name: "Brașov" },
      { "@type": "City", name: "Iași" },
      { "@type": "City", name: "Constanța" },
    ],
    priceRange: "$$",
    openingHours: "Mo-Fr 09:00-18:00",
    sameAs: [
      "https://www.facebook.com/profile.php?id=100087606842806",
      "https://instagram.com/websitefactorytm",
      "https://x.com/websitefactory_",
      "https://www.linkedin.com/company/websitefactory-tm/",
    ],
  }
}

export function generateBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: `${siteConfig.url}${item.url}`,
    })),
  }
}

export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  }
}

export function generateServiceSchema({
  name,
  description,
  url,
}: {
  name: string
  description: string
  url: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    url: `${siteConfig.url}${url}`,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      "@type": "Country",
      name: "România",
    },
  }
}

export function generatePersonSchema({
  name,
  jobTitle,
  description,
  image,
  url,
  sameAs = [],
}: {
  name: string
  jobTitle: string
  description: string
  image?: string
  url: string
  sameAs?: string[]
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    description,
    url: `${siteConfig.url}${url}`,
    image: image ? `${siteConfig.url}${image}` : undefined,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    sameAs,
  }
}

// Review Schema for testimonials
export interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  rating: number
  datePublished?: string
}

export function generateReviewSchema(testimonial: Testimonial) {
  // Extract company name from role if available
  const companyMatch = testimonial.role.match(/(?:,|–|-)\s*(.+)/)
  const companyName = companyMatch ? companyMatch[1].trim() : undefined

  return {
    "@context": "https://schema.org",
    "@type": "Review",
    author: {
      "@type": "Person",
      name: testimonial.name,
      jobTitle: testimonial.role.split(/,|–|-/)[0]?.trim() || testimonial.role,
      ...(companyName && {
        worksFor: {
          "@type": "Organization",
          name: companyName,
        },
      }),
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: testimonial.rating,
      bestRating: 5,
      worstRating: 1,
    },
    reviewBody: testimonial.content,
    datePublished: testimonial.datePublished || new Date().toISOString().split("T")[0],
    itemReviewed: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.url,
    },
  }
}

export function generateAggregateRatingSchema(testimonials: Testimonial[]) {
  if (testimonials.length === 0) return null

  const totalRating = testimonials.reduce((sum, t) => sum + t.rating, 0)
  const averageRating = totalRating / testimonials.length
  const reviewCount = testimonials.length

  return {
    "@type": "AggregateRating",
    ratingValue: averageRating.toFixed(1),
    bestRating: "5",
    worstRating: "1",
    ratingCount: reviewCount,
  }
}

// Updated LocalBusiness schema with aggregateRating
export function generateLocalBusinessSchemaWithReviews(testimonials: Testimonial[] = []) {
  const baseSchema = generateLocalBusinessSchema()
  const aggregateRating = generateAggregateRatingSchema(testimonials)

  return {
    ...baseSchema,
    ...(aggregateRating && { aggregateRating }),
  }
}
