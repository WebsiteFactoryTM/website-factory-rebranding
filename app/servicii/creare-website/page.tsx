import type { Metadata } from "next"
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

export const metadata: Metadata = generatePageMetadata({
  title: "Creare Website Timișoara | Web Design Profesional | Website Factory",
  description:
    "Servicii profesionale de creare website în Timișoara. Design modern, SEO optimizat, performanță excepțională. Site-uri de prezentare care convertesc vizitatori în clienți. Solicită ofertă gratuită!",
  path: "/servicii/creare-website",
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

const serviceFaqs = [
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

export default function CreareWebsitePage() {
  const serviceSchema = generateServiceSchema({
    name: "Creare Website Profesional",
    description:
      "Servicii complete de creare website în Timișoara. Design modern, optimizare SEO, performanță maximă și conversii măsurabile.",
    url: "/servicii/creare-website",
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Acasă", url: "/" },
    { name: "Servicii", url: "/servicii" },
    { name: "Creare Website", url: "/servicii/creare-website" },
  ])

  const faqSchema = generateFAQSchema(serviceFaqs)

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
        <ROICalculator />
        <TechStack />
        <WebsitePortfolio />
        <ServiceFAQ faqs={serviceFaqs} />
        <ServiceCTA />
      </main>
    </>
  )
}
