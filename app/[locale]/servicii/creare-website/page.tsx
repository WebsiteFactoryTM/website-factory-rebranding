import type { Metadata } from "next"
import { setRequestLocale, getTranslations } from "next-intl/server"
import type { Locale } from "@/i18n/routing"
import { allLocaleParams } from "@/lib/i18n/ro-only"
import { withoutPrices } from "@/lib/i18n/no-prices"
import { generatePageMetadata, generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo"
import { ServiceHero } from "@/components/services/website/service-hero"
import { WebsiteTypes } from "@/components/services/website/website-types"
import { BenefitsShowcase } from "@/components/services/website/benefits-showcase"
import { InteractiveProcess } from "@/components/services/website/interactive-process"
import { TechStack } from "@/components/services/website/tech-stack"
import { ROICalculator } from "@/components/services/website/roi-calculator"
import { WebsitePortfolio } from "@/components/services/website/website-portfolio"
import { ServiceFAQ } from "@/components/services/website/service-faq"
import { ServiceCTA } from "@/components/services/website/service-cta"

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  if (locale === "en") {
    return generatePageMetadata({
      locale,
      href: "/servicii/creare-website",
      hreflang: true,
      title: "Website Development Services",
      description:
        "Professional website development — modern design, SEO-first, built for performance. Business websites that turn visitors into customers. Get a free quote.",
      keywords: [
        "website development",
        "web design agency",
        "business website design",
        "responsive web design",
        "professional website",
        "small business website",
      ],
    })
  }
  return generatePageMetadata({
    locale,
    href: "/servicii/creare-website",
    hreflang: true,
    title: "Creare Website Timișoara - Web design",
    description:
      "Servicii profesionale de creare website în Timișoara. Design modern, SEO optimizat, performanță excepțională. Site-uri de prezentare care convertesc vizitatori în clienți. Solicită ofertă gratuită!",
    keywords: [
      "creare website timisoara",
      "web design timisoara",
      "creare site timisoara",
      "firma web design",
      "dezvoltare website",
      "site prezentare",
      "design responsive",
      "website profesional",
      "agentie web design",
      "creare pagina web",
    ],
  })
}

const faqsRo = [
  {
    question: "Cât costă crearea unui website în Timișoara?",
    answer:
      "Prețul variază în funcție de complexitate. Un pagină de prezentare simplă (one-page) poate începe de la 450 EUR, iar un website de prezentare complet (multi-page) de la 650 EUR. Oferim consultanță gratuită pentru a stabili exact ce ai nevoie și un preț în funcție de specificațiile proiectului.",
  },
  {
    question: "Cât durează să creați un website?",
    answer:
      "Un site de prezentare standard este gata în 2-4 săptămâni. Proiectele complexe precum magazinele online sau aplicațiile custom pot dura 5-12 săptămâni. Respectăm întotdeauna deadline-urile agreate.",
  },
  {
    question: "Site-ul meu va fi optimizat pentru Google (SEO)?",
    answer:
      "Absolut! Toate site-urile noastre sunt construite cu abordare SEO-first. Implementăm optimizări on-page complete: structură corectă de headings, meta tags, schema markup, sitemap XML, viteza de încărcare optimizată și mobile-first design - toate incluse în preț.",
  },
  {
    question: "Pot să îmi administrez singur site-ul după lansare?",
    answer:
      "Da! Predăm site-uri cu panou de administrare intuitiv (CMS) care îți permite să modifici texte, imagini și să adaugi conținut nou fără cunoștințe tehnice. Oferim și training gratuit la predare.",
  },
  {
    question: "Ce se întâmplă dacă am nevoie de modificări după lansare?",
    answer:
      "Oferim 30 de zile suport gratuit după lansare pentru orice ajustări minore. Pentru modificări ulterioare, avem pachete de mentenanță lunară sau poți solicita modificări punctuale la tarife preferențiale pentru clienții existenți.",
  },
  {
    question: "Site-ul va funcționa pe telefon și tabletă?",
    answer:
      "100%! Toate site-urile noastre sunt responsive by design - arată și funcționează perfect pe orice dispozitiv: desktop, laptop, tabletă sau telefon. Testăm pe multiple device-uri înainte de lansare.",
  },
  {
    question: "Oferiți hosting și domeniu?",
    answer:
      "Da, lucrăm cu parteneri testați și de încredere pentru hosting și domeniu. Oferim o ofertă transparentă și personalizată pentru fiecare proiect.",
  },
  {
    question: "Ce tehnologii folosiți pentru dezvoltare?",
    answer:
      "Folosim cele mai moderne tehnologii: Next.js, React pentru frontend performant, Tailwind CSS pentru design, și diverse soluții backend în funcție de nevoi. De asemenea, putem folosi si WordPress pentru proiecte unde nu este nevoie de o platforma custom. Alegem întotdeauna stack-ul optim pentru obiectivele tale specifice.",
  },
]

const faqsEn = [
  {
    question: "What does a new website cost?",
    answer:
      "It depends on complexity. A simple one-page site can start from €450, and a full multi-page business website from €650. Get in touch for a free consultation and a price scoped to your project.",
  },
  {
    question: "How long does a website take to build?",
    answer:
      "A standard business website is ready in 2–4 weeks. Bigger builds — online stores or custom apps — can take 5–12 weeks. We always stick to agreed deadlines.",
  },
  {
    question: "Will my site be optimised for Google?",
    answer:
      "Yes, by default. Every site is built SEO-first: correct heading structure, meta tags, schema markup, an XML sitemap, optimised load speed and mobile-first design — all included, not sold as an extra.",
  },
  {
    question: "Can I manage the site myself after launch?",
    answer:
      "Yes. We hand over sites with an intuitive admin panel (CMS) that lets you update text, images and add new content with no technical knowledge — plus free training when we hand it over.",
  },
  {
    question: "What if I need changes after launch?",
    answer:
      "We include 30 days of free support after launch for minor tweaks. After that, we offer monthly maintenance plans, or you can request one-off changes at preferential rates as an existing client.",
  },
  {
    question: "Will the site work on mobile and tablet?",
    answer:
      "Yes, completely. Every site is responsive by design — it looks and works exactly as it should on desktop, laptop, tablet or phone. We test across multiple devices before launch.",
  },
  {
    question: "Do you provide hosting and a domain?",
    answer:
      "Yes, we work with trusted, vetted hosting and domain partners, and put together a transparent, tailored setup for each project.",
  },
  {
    question: "What technology do you build with?",
    answer:
      "Mostly Next.js and React for a fast front end, Tailwind CSS for design, and whichever back end fits the project. We can also use WordPress for projects that don't need a custom platform — we pick the stack that matches your goals.",
  },
]

const faqs = { ro: faqsRo, en: withoutPrices(faqsEn) } satisfies Record<Locale, typeof faqsRo>

export function generateStaticParams() {
  return allLocaleParams()
}

export default async function CreareWebsitePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const loc = locale as Locale
  const pageFaqs = faqs[loc]

  const serviceSchema = {
    ...generateServiceSchema(
      locale === "en"
        ? {
            name: "Professional Website Development",
            description:
              "Complete website development services. Modern design, SEO optimisation, maximum performance and measurable conversions.",
            url: "/servicii/creare-website",
          }
        : {
            name: "Creare Website Profesional",
            description:
              "Servicii complete de creare website în Timișoara. Design modern, optimizare SEO, performanță maximă și conversii măsurabile.",
            url: "/servicii/creare-website",
          },
      locale as Locale,
    ),
    inLanguage: locale,
  }

  const tBreadcrumb = await getTranslations("breadcrumb")
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: tBreadcrumb("home"), url: "/" },
    { name: tBreadcrumb("services"), url: "/servicii" },
    { name: locale === "en" ? "Website Development" : "Creare Website", url: "/servicii/creare-website" },
  ])

  const faqSchema = generateFAQSchema(pageFaqs)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main>
        <ServiceHero />
        <WebsiteTypes />
        <BenefitsShowcase />
        <InteractiveProcess />
        {loc === "ro" && <ROICalculator />}
        <TechStack />
        <WebsitePortfolio />
        <ServiceFAQ faqs={pageFaqs} />
        <ServiceCTA />
      </main>
    </>
  )
}
