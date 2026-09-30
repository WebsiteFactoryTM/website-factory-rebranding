/**
 * SEO-friendly image alt text generator
 * Generates descriptive alt text for images to improve SEO and accessibility
 */

import type { Locale } from "@/i18n/routing"

const ALT_WORDS = {
  ro: {
    forClient: "pentru",
    by: "realizat de Website Factory",
    location: "Timișoara",
    project: "Proiect",
    with: "cu",
    portfolio: "portofoliu Website Factory",
    team: "Echipa Website Factory",
    teamTagline: "Web Design și Dezvoltare",
    partnerLogo: "Logo partener",
    partnerOf: "Partener Website Factory - Web Design Timișoara",
    categories: {
      website: "Website de prezentare",
      ecommerce: "Magazin online",
      app: "Aplicație mobilă",
      custom: "Platformă digitală",
    },
    categoriesLower: {
      website: "website de prezentare",
      ecommerce: "magazin online",
      app: "aplicație mobilă",
      custom: "platformă digitală",
    },
  },
  en: {
    forClient: "for",
    by: "built by Website Factory",
    location: "Timișoara",
    project: "Project",
    with: "with",
    portfolio: "Website Factory portfolio",
    team: "The Website Factory team",
    teamTagline: "Web Design & Development",
    partnerLogo: "Partner logo",
    partnerOf: "Website Factory partner - Web Design",
    categories: {
      website: "Business website",
      ecommerce: "Online store",
      app: "Mobile app",
      custom: "Digital platform",
    },
    categoriesLower: {
      website: "business website",
      ecommerce: "online store",
      app: "mobile app",
      custom: "digital platform",
    },
  },
} satisfies Record<Locale, unknown>

interface ProjectAltTextOptions {
  title: string
  client?: string
  category?: string
  categoryLabel?: string
  location?: string
  locale?: Locale
}

interface ServiceAltTextOptions {
  serviceName: string
  location?: string
  context?: string
  locale?: Locale
}

/**
 * Generate SEO-friendly alt text for project images
 */
export function generateProjectAltText({
  title,
  client,
  category,
  categoryLabel,
  location,
  locale = "ro",
}: ProjectAltTextOptions): string {
  const words = ALT_WORDS[locale]
  const parts: string[] = []

  parts.push(title)

  if (client) {
    parts.push(`${words.forClient} ${client}`)
  }

  if (categoryLabel) {
    parts.push(`- ${categoryLabel}`)
  } else if (category) {
    parts.push(`- ${(words.categories as Record<string, string>)[category] || category}`)
  }

  parts.push(`${words.by} ${location ?? words.location}`)

  return parts.join(" ")
}

/**
 * Generate SEO-friendly alt text for service images
 */
export function generateServiceAltText({
  serviceName,
  location,
  context,
  locale = "ro",
}: ServiceAltTextOptions): string {
  const words = ALT_WORDS[locale]
  const parts: string[] = []

  if (context) {
    parts.push(context)
  }

  parts.push(serviceName)
  parts.push(`Website Factory ${location ?? words.location}`)

  return parts.join(" - ")
}

/**
 * Generate SEO-friendly alt text for testimonial logos
 */
export function generateTestimonialLogoAltText(
  name: string,
  role: string,
  company?: string,
  locale: Locale = "ro",
): string {
  const words = ALT_WORDS[locale]
  const parts: string[] = []

  if (company) {
    parts.push(`Logo ${company}`)
  } else {
    const companyMatch = role.match(/(?:,|–|-)\s*(.+)/)
    if (companyMatch) {
      parts.push(`Logo ${companyMatch[1].trim()}`)
    } else {
      parts.push(words.partnerLogo)
    }
  }

  parts.push(`- testimonial ${name}`)
  parts.push(`Website Factory`)

  return parts.join(" ")
}

/**
 * Generate SEO-friendly alt text for portfolio showcase images
 */
export function generatePortfolioShowcaseAltText(
  projectTitle: string,
  category: string,
  result?: string,
  locale: Locale = "ro",
): string {
  const words = ALT_WORDS[locale]
  const parts: string[] = []

  parts.push(`${words.project} ${projectTitle}`)
  parts.push((words.categoriesLower as Record<string, string>)[category] || category)

  if (result) {
    parts.push(`${words.with} ${result}`)
  }

  parts.push(`- ${words.portfolio}`)

  return parts.join(" ")
}

/**
 * Generate SEO-friendly alt text for team/company images
 */
export function generateTeamImageAltText(context: string, location = "Timișoara", locale: Locale = "ro"): string {
  const words = ALT_WORDS[locale]
  return `${context} - ${words.team} ${location} - ${words.teamTagline}`
}

/**
 * Generate SEO-friendly alt text for city/landmark images
 */
export function generateCityImageAltText(landmark: string, city: string, context?: string): string {
  const parts: string[] = []

  if (context) {
    parts.push(context)
  }

  parts.push(landmark)
  parts.push(city)
  parts.push(`- servicii web design Website Factory`)

  return parts.join(" ")
}

/**
 * Generate SEO-friendly alt text for partner logos
 */
export function generatePartnerLogoAltText(partnerName: string, locale: Locale = "ro"): string {
  const words = ALT_WORDS[locale]
  return `Logo ${partnerName} - ${words.partnerOf}`
}
