/**
 * SEO-friendly image alt text generator
 * Generates descriptive alt text for images to improve SEO and accessibility
 */

interface ProjectAltTextOptions {
  title: string
  client?: string
  category?: string
  categoryLabel?: string
  location?: string
}

interface ServiceAltTextOptions {
  serviceName: string
  location?: string
  context?: string
}

/**
 * Generate SEO-friendly alt text for project images
 */
export function generateProjectAltText({
  title,
  client,
  category,
  categoryLabel,
  location = "Timișoara",
}: ProjectAltTextOptions): string {
  const parts: string[] = []

  // Add project title
  parts.push(title)

  // Add client if available
  if (client) {
    parts.push(`pentru ${client}`)
  }

  // Add category
  if (categoryLabel) {
    parts.push(`- ${categoryLabel}`)
  } else if (category) {
    const categoryMap: Record<string, string> = {
      website: "Website de prezentare",
      ecommerce: "Magazin online",
      app: "Aplicație mobilă",
      custom: "Platformă digitală",
    }
    parts.push(`- ${categoryMap[category] || category}`)
  }

  // Add location for local SEO
  parts.push(`realizat de Website Factory ${location}`)

  return parts.join(" ")
}

/**
 * Generate SEO-friendly alt text for service images
 */
export function generateServiceAltText({
  serviceName,
  location = "Timișoara",
  context,
}: ServiceAltTextOptions): string {
  const parts: string[] = []

  if (context) {
    parts.push(context)
  }

  parts.push(serviceName)
  parts.push(`Website Factory ${location}`)

  return parts.join(" - ")
}

/**
 * Generate SEO-friendly alt text for testimonial logos
 */
export function generateTestimonialLogoAltText(name: string, role: string, company?: string): string {
  const parts: string[] = []

  if (company) {
    parts.push(`Logo ${company}`)
  } else {
    // Extract company from role if available
    const companyMatch = role.match(/(?:,|–|-)\s*(.+)/)
    if (companyMatch) {
      parts.push(`Logo ${companyMatch[1].trim()}`)
    } else {
      parts.push(`Logo partener`)
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
): string {
  const parts: string[] = []

  parts.push(`Proiect ${projectTitle}`)

  const categoryMap: Record<string, string> = {
    website: "website de prezentare",
    ecommerce: "magazin online",
    app: "aplicatie mobilă",
    custom: "platformă digitală",
  }

  parts.push(categoryMap[category] || category)

  if (result) {
    parts.push(`cu ${result}`)
  }

  parts.push(`- portofoliu Website Factory`)

  return parts.join(" ")
}

/**
 * Generate SEO-friendly alt text for team/company images
 */
export function generateTeamImageAltText(context: string, location = "Timișoara"): string {
  return `${context} - Echipa Website Factory ${location} - Web Design și Dezvoltare`
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
export function generatePartnerLogoAltText(partnerName: string): string {
  return `Logo ${partnerName} - Partener Website Factory - Web Design Timișoara`
}

