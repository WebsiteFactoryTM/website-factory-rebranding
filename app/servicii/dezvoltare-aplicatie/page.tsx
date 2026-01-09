import type { Metadata } from "next"
import { generatePageMetadata, generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo"
import { AppHero } from "@/components/services/apps/app-hero"
import { AppTypes } from "@/components/services/apps/app-types"
import { AppBenefits } from "@/components/services/apps/app-benefits"
import { AppProcess } from "@/components/services/apps/app-process"
import { AppTechStack } from "@/components/services/apps/app-tech-stack"
import { AppFaq } from "@/components/services/apps/app-faq"
import { AppCta } from "@/components/services/apps/app-cta"

export const metadata: Metadata = generatePageMetadata({
  title: "Dezvoltare Aplicații Mobile & Web | React Native, Next.js, SaaS | Website Factory",
  description:
    "Dezvoltăm aplicații mobile cu React Native, web apps cu Next.js & Payload CMS, platforme SaaS scalabile și soluții de digitalizare. Consultanță gratuită!",
  path: "/servicii/dezvoltare-aplicatie",
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

const appFaqs = [
  {
    question: "Cât costă să dezvolt o aplicație mobilă?",
    answer:
      "Costul unei aplicații mobile variază în funcție de complexitate. O aplicație MVP simplă pornește de la 8.000€, aplicații de complexitate medie între 15.000-40.000€, iar aplicații enterprise pot ajunge la 100.000€+. Oferim consultanță gratuită pentru a stabili exact ce funcționalități ai nevoie și un buget realist.",
  },
  {
    question: "React Native sau aplicații native separate?",
    answer:
      "React Native permite dezvoltarea unei singure baze de cod pentru iOS și Android, reducând costurile cu 30-40% și timpul de dezvoltare. Performanța este aproape identică cu cea nativă (60fps). Recomandăm native separat doar pentru aplicații cu cerințe hardware foarte specifice sau gaming intensiv.",
  },
  {
    question: "Cât durează dezvoltarea unei aplicații?",
    answer:
      "Un MVP funcțional poate fi gata în 8-12 săptămâni. Aplicații complete de complexitate medie durează 12-20 săptămâni, iar platforme SaaS enterprise pot necesita 24-40 săptămâni. Lucrăm în sprint-uri de 2 săptămâni cu demo-uri regulate.",
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

export default function DezvoltareAplicatiePage() {
  const serviceSchema = generateServiceSchema({
    name: "Dezvoltare Aplicații Mobile & Web",
    description:
      "Dezvoltare aplicații mobile cu React Native, web apps cu Next.js & Payload CMS, platforme SaaS scalabile și soluții de digitalizare pentru companii.",
    url: "/servicii/dezvoltare-aplicatie",
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Acasă", url: "/" },
    { name: "Servicii", url: "/servicii" },
    { name: "Dezvoltare Aplicații", url: "/servicii/dezvoltare-aplicatie" },
  ])

  const faqSchema = generateFAQSchema(appFaqs)

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
        <AppFaq faqs={appFaqs} />
        <AppCta />
      </main>
    </>
  )
}
