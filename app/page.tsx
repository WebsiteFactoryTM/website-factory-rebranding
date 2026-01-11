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
  generateLocalBusinessSchemaWithReviews,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateReviewSchema,
} from "@/lib/seo"
import { faqs } from "@/lib/content"
import { testimonials } from "@/lib/testimonials-data"

export default function HomePage() {
  // Generate JSON-LD schemas
  const localBusinessSchema = generateLocalBusinessSchemaWithReviews(testimonials)
  const breadcrumbSchema = generateBreadcrumbSchema([{ name: "Acasă", url: "/" }])
  const faqSchema = generateFAQSchema(faqs)

  // Generate Review schemas for each testimonial
  const reviewSchemas = testimonials.map((testimonial) => generateReviewSchema(testimonial))

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
