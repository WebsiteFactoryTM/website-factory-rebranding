import type { Metadata } from "next"
import { setRequestLocale, getTranslations } from "next-intl/server"
import type { Locale } from "@/i18n/routing"
import { allLocaleParams } from "@/lib/i18n/ro-only"
import { withoutPrices } from "@/lib/i18n/no-prices"
import { generatePageMetadata, generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo"
import { AppHero } from "@/components/services/apps/app-hero"
import { AppTypes } from "@/components/services/apps/app-types"
import { AppBenefits } from "@/components/services/apps/app-benefits"
import { AppProcess } from "@/components/services/apps/app-process"
import { AppTechStack } from "@/components/services/apps/app-tech-stack"
import { AppFaq } from "@/components/services/apps/app-faq"
import { AppCta } from "@/components/services/apps/app-cta"

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  if (locale === "en") {
    return generatePageMetadata({
      locale,
      href: "/servicii/dezvoltare-aplicatie",
      hreflang: true,
      title: "App Development — Mobile, Web & SaaS",
      description:
        "We build mobile apps with React Native, web apps with Next.js & Payload CMS, and scalable SaaS platforms. Free consultation.",
      keywords: [
        "app development agency",
        "mobile app development",
        "react native development",
        "saas development",
        "custom software development",
        "web app development",
      ],
    })
  }
  return generatePageMetadata({
    locale,
    href: "/servicii/dezvoltare-aplicatie",
    hreflang: true,
    title: "Dezvoltare Aplicație Mobilă & Web - React Native, Next.js, SaaS",
    description:
      "Dezvoltăm aplicații mobile cu React Native, web apps cu Next.js & Payload CMS, platforme SaaS scalabile și soluții de digitalizare. Consultanță gratuită!",
    keywords: [
      "dezvoltare aplicatii mobile timisoara",
      "react native romania",
      "aplicatii web next.js",
      "dezvoltare saas",
      "digitalizare companii",
      "aplicatii custom",
      "payload cms",
      "aplicatii ios android",
      "software development romania",
      "app development timisoara",
    ],
  })
}

const faqsRo = [
  {
    question: "Cât costă să dezvolt o aplicație mobilă?",
    answer:
      "Costul unei aplicații mobile variază mult în funcție de complexitate. O aplicație MVP simplă pornește de la 4.000€, aplicații de complexitate medie între 12.000-40.000€, iar aplicații enterprise pot ajunge la 100.000€+. Oferim consultanță gratuită pentru a stabili exact ce funcționalități ai nevoie și un buget realist.",
  },
  {
    question: "React Native sau aplicații native separate?",
    answer:
      "React Native permite dezvoltarea unei singure baze de cod pentru iOS și Android, reducând costurile cu 30-40% și timpul de dezvoltare. Performanța este aproape identică cu cea nativă (60fps). Recomandăm native separat doar pentru aplicații cu cerințe hardware foarte specifice sau gaming intensiv.",
  },
  {
    question: "Cât durează dezvoltarea unei aplicații?",
    answer:
      "Un MVP funcțional poate fi gata în 8-12 săptămâni. Aplicații complete de complexitate medie durează 12-20 săptămâni, iar platforme SaaS enterprise pot necesita 24-40 săptămâni sau chiar mai mult, în funcție de complexitate. Lucrăm în sprint-uri de 2 săptămâni cu demo-uri regulate.",
  },
  {
    question: "Ce este Payload CMS și de ce îl recomandați?",
    answer:
      "Payload CMS este un headless CMS modern, open-source, construit cu TypeScript și React. Oferă administrare intuitivă, API GraphQL/REST automat, autentificare built-in și este complet customizabil. Este ideal pentru aplicații web care necesită management de conținut flexibil.",
  },
  {
    question: "Puteți dezvolta platforme SaaS cu subscripții?",
    answer:
      "Da! Avem experiență în dezvoltarea de platforme SaaS complete: arhitectură multi-tenant, management subscripții cu Stripe, usage metering, analytics, API management și white-label. Proiectăm pentru scalabilitate de la prima zi.",
  },
  {
    question: "Ce înseamnă digitalizare pentru companii?",
    answer:
      "Digitalizarea implică transformarea proceselor manuale în fluxuri automatizate: dashboards de management, integrări ERP/CRM, automatizări cu n8n, document management, raportare BI și aplicații interne custom. Reducem timpul petrecut pe task-uri repetitive cu până la 70%.",
  },
  {
    question: "Oferiți suport și mentenanță după lansare?",
    answer:
      "Da! Includem 60 de zile suport post-lansare gratuit pentru bug fixes. Apoi oferim pachete de mentenanță lunară: actualizări de securitate, monitorizare, backup, suport tehnic și development continuu. Prețurile pornesc de la 200€/lună în funcție de complexitate.",
  },
  {
    question: "Cum asigurați securitatea aplicațiilor?",
    answer:
      "Implementăm best practices de securitate: autentificare robustă (OAuth 2.0, JWT), criptare date, audit logging, OWASP compliance, penetration testing. Pentru aplicații enterprise oferim SOC 2 compliance și GDPR by design.",
  },
]

const faqsEn = [
  {
    question: "How much does it cost to develop a mobile app?",
    answer:
      "Cost varies a lot depending on complexity. A simple MVP starts from €4,000, mid-complexity apps range from €12,000–40,000, and enterprise apps can reach €100,000+. Get in touch for a free consultation to work out exactly what you need and a realistic budget.",
  },
  {
    question: "React Native or separate native apps?",
    answer:
      "React Native lets us build one codebase for iOS and Android, cutting costs by 30–40% and speeding up development. Performance is nearly identical to native (60fps). We only recommend separate native builds for apps with very specific hardware requirements or intensive gaming.",
  },
  {
    question: "How long does app development take?",
    answer:
      "A working MVP can be ready in 8–12 weeks. Full mid-complexity apps take 12–20 weeks, and enterprise SaaS platforms can need 24–40 weeks or more, depending on complexity. We work in 2-week sprints with regular demos.",
  },
  {
    question: "What is Payload CMS, and why do you recommend it?",
    answer:
      "Payload CMS is a modern, open-source headless CMS built with TypeScript and React. It offers an intuitive admin panel, automatic GraphQL/REST APIs, built-in authentication, and full customisability — ideal for web apps that need flexible content management.",
  },
  {
    question: "Can you build SaaS platforms with subscriptions?",
    answer:
      "Yes. We have experience building complete SaaS platforms: multi-tenant architecture, subscription management with Stripe, usage metering, analytics, API management and white-labelling. We design for scale from day one.",
  },
  {
    question: "What does digital transformation mean for a business?",
    answer:
      "It means turning manual processes into automated workflows — management dashboards, ERP/CRM integrations, automation with n8n, document management, BI reporting, and custom internal tools. It can cut time spent on repetitive tasks by up to 70%.",
  },
  {
    question: "Do you offer support and maintenance after launch?",
    answer:
      "Yes. We include 60 days of free post-launch support for bug fixes. After that, we offer monthly maintenance plans: security updates, monitoring, backups, technical support and ongoing development.",
  },
  {
    question: "How do you ensure application security?",
    answer:
      "We follow security best practices: robust authentication (OAuth 2.0, JWT), data encryption, audit logging, OWASP compliance, and penetration testing. For enterprise apps, we offer SOC 2 compliance and GDPR by design.",
  },
]

const faqs = { ro: faqsRo, en: withoutPrices(faqsEn) } satisfies Record<Locale, typeof faqsRo>

export function generateStaticParams() {
  return allLocaleParams()
}

export default async function DezvoltareAplicatiePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const loc = locale as Locale
  const pageFaqs = faqs[loc]

  const serviceSchema = {
    ...generateServiceSchema(
      locale === "en"
        ? {
            name: "Mobile & Web App Development",
            description:
              "Mobile app development with React Native, web apps with Next.js & Payload CMS, and scalable SaaS platforms for growing companies.",
            url: "/servicii/dezvoltare-aplicatie",
          }
        : {
            name: "Dezvoltare Aplicații Mobile & Web",
            description:
              "Dezvoltare aplicații mobile cu React Native, web apps cu Next.js & Payload CMS, platforme SaaS scalabile și soluții de digitalizare pentru companii.",
            url: "/servicii/dezvoltare-aplicatie",
          },
    ),
    inLanguage: locale,
  }

  const tBreadcrumb = await getTranslations("breadcrumb")
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: tBreadcrumb("home"), url: "/" },
    { name: tBreadcrumb("services"), url: "/servicii" },
    { name: locale === "en" ? "App Development" : "Dezvoltare Aplicații", url: "/servicii/dezvoltare-aplicatie" },
  ])

  const faqSchema = generateFAQSchema(pageFaqs)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main>
        <AppHero />
        <AppTypes />
        <AppBenefits />
        <AppProcess />
        <AppTechStack />
        <AppFaq faqs={pageFaqs} />
        <AppCta />
      </main>
    </>
  )
}
