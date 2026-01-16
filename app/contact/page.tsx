import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema, generateLocalBusinessSchema } from "@/lib/seo"
import { ContactHero } from "@/components/contact/contact-hero"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import { ContactMap } from "@/components/contact/contact-map"
import { ContactFaq } from "@/components/contact/contact-faq"

export const metadata: Metadata = generatePageMetadata({
  title: "Contact",
  description:
    "Contactează-ne pentru o ofertă gratuită. Suntem aici să transformăm viziunea ta digitală în realitate. Creare site-uri web, magazine online și aplicații mobile în Timișoara.",
  path: "/contact",
  keywords: [
    "contact web design",
    "creare site timișoara contact",
    "ofertă website",
    "consultanță web",
    "agenție web timișoara",
  ],
})

export default function ContactPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Acasă", url: "/" },
    { name: "Contact", url: "/contact" },
  ])

  const localBusinessSchema = generateLocalBusinessSchema()

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <main>
        <ContactHero />

        <section className="py-16 md:py-24 relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 hero-gradient opacity-50" />
          <div className="absolute inset-0 grid-pattern" />

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-5 gap-12 lg:gap-16">
              {/* Contact Form - Takes more space */}
              <div className="lg:col-span-3">
                <ContactForm />
              </div>

              {/* Contact Info Sidebar */}
              <div className="lg:col-span-2">
                <ContactInfo />
              </div>
            </div>
          </div>
        </section>

        <ContactMap />
        <ContactFaq />
      </main>
    </>
  )
}
