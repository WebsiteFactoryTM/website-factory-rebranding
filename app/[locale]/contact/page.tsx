import type { Metadata } from "next"
import { setRequestLocale, getTranslations } from "next-intl/server"
import type { Locale } from "@/i18n/routing"
import { allLocaleParams } from "@/lib/i18n/ro-only"
import { generatePageMetadata, generateBreadcrumbSchema, generateLocalBusinessSchema } from "@/lib/seo"
import { ContactHero } from "@/components/contact/contact-hero"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import { ContactMap } from "@/components/contact/contact-map"
import { ContactFaq } from "@/components/contact/contact-faq"

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  if (locale === "en") {
    return generatePageMetadata({
      locale,
      href: "/contact",
      title: "Contact Us",
      description:
        "Get in touch for a free quote. We build websites, online stores and mobile apps — tell us what you're building and we'll get back to you within 24 hours.",
      keywords: ["contact web design agency", "get a website quote", "web design consultation"],
    })
  }
  return generatePageMetadata({
    locale,
    href: "/contact",
    title: "Contact",
    description:
      "Contactează-ne pentru o ofertă gratuită. Suntem aici să transformăm viziunea ta digitală în realitate. Creare site-uri web, magazine online și aplicații mobile în Timișoara.",
    keywords: [
      "contact web design",
      "creare site timișoara contact",
      "ofertă website",
      "consultanță web",
      "agenție web timișoara",
    ],
  })
}

export function generateStaticParams() {
  return allLocaleParams()
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = await getTranslations("breadcrumb")
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: t("home"), url: "/" },
    { name: t("contact"), url: "/contact" },
  ])

  const localBusinessSchema = generateLocalBusinessSchema(locale as Locale)

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
