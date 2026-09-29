import type { Metadata } from "next"
import { setRequestLocale, getTranslations } from "next-intl/server"
import type { Locale } from "@/i18n/routing"
import { allLocaleParams } from "@/lib/i18n/ro-only"
import { Hero } from "@/components/home/hero"
import { TrustStrip } from "@/components/home/trust-strip"
import { ServicesPreview } from "@/components/home/services-preview"
import { FeaturedWork } from "@/components/home/featured-work"
import { AboutPreview } from "@/components/home/about-preview"
import { Process } from "@/components/home/process"
import { Testimonials } from "@/components/home/testimonials"
import { Partners } from "@/components/home/partners"
import { FAQ } from "@/components/home/faq"
import { CTASection } from "@/components/home/cta-section"
import {
  generatePageMetadata,
  generateLocalBusinessSchema,
  generateLocalBusinessSchemaWithReviews,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateReviewSchema,
} from "@/lib/seo"
import { getFaqs } from "@/lib/content"
import { testimonials } from "@/lib/testimonials-data"

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  if (locale === "en") {
    return generatePageMetadata({
      locale,
      href: "/",
      hreflang: true,
      title: "Website Design & Development for Small Businesses",
      description:
        "We build fast, SEO-first websites that help small businesses attract customers and grow online — from idea to launch.",
      image: "/website-factory-og-square.webp",
      imageWidth: 1080,
      imageHeight: 1080,
      ogTitle: "Website Design & Development for Small Businesses | Website Factory",
      imageAlt: "Website Factory - web design for small businesses",
      keywords: [
        "web design agency",
        "website design for small business",
        "website development",
        "e-commerce website design",
        "mobile app development",
        "SEO-first web design",
      ],
    })
  }
  return generatePageMetadata({
    locale,
    href: "/",
    hreflang: true,
    title: "Creare Site Timișoara - Web Design Timișoara",
    description:
      "Servicii profesionale de web design, magazin online si optimizare SEO, vizibilitate locală și națională - De la idee la soluție digitală",
    image: "/website-factory-og-square.webp",
    imageWidth: 1080,
    imageHeight: 1080,
    ogTitle: "Creare Site Timișoara - Web Design Timișoara - Website Factory",
    imageAlt: "Website Factory - Web Design Timișoara",
    keywords: [
      "creare site Timișoara",
      "web design Timișoara",
      "dezvoltare site web",
      "site-uri profesionale",
      "magazin online",
      "aplicații mobile",
      "Firmă web design Timișoara",
    ],
  })
}

export function generateStaticParams() {
  return allLocaleParams()
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = await getTranslations("breadcrumb")
  // Generate JSON-LD schemas
  const localBusinessSchema =
    locale === "ro" ? generateLocalBusinessSchemaWithReviews(testimonials) : generateLocalBusinessSchema("en")
  const breadcrumbSchema = generateBreadcrumbSchema([{ name: t("home"), url: "/" }])
  const faqSchema = generateFAQSchema(getFaqs(locale as Locale))

  // Generate Review schemas for each testimonial (RO only, per spec decision 14)
  const reviewSchemas = locale === "ro" ? testimonials.map((testimonial) => generateReviewSchema(testimonial)) : []

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      {/* Review Schemas */}
      {reviewSchemas.map((reviewSchema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
        />
      ))}

      {/* Page Sections */}
      <Hero />
      <TrustStrip />
      <ServicesPreview />
      <FeaturedWork />
      <AboutPreview />
      <Process />
      <Testimonials />
      <Partners />
      <FAQ />
      <CTASection />
    </>
  )
}
