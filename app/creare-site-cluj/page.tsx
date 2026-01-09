import type { Metadata } from "next"
import { ClujHero } from "@/components/cities/cluj-hero"
import { CityServices } from "@/components/cities/city-services"
import { CityBenefits } from "@/components/cities/city-benefits"
import { CityFaq } from "@/components/cities/city-faq"
import { CityCTA } from "@/components/cities/city-cta"
import {
  generatePageMetadata,
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
} from "@/lib/seo"

const cityName = "Cluj-Napoca"
const citySlug = "cluj"

export const metadata: Metadata = generatePageMetadata({
  title: `Creare Site Cluj-Napoca | Web Design Cluj - Agenție Tech`,
  description: `Servicii profesionale de creare site-uri web în Cluj-Napoca. Web design modern pentru startup-uri și companii tech, SEO optimizat, magazine online și aplicații. Solicită ofertă gratuită!`,
  path: `/creare-site-${citySlug}`,
  keywords: [
    "creare site cluj",
    "web design cluj",
    "creare site cluj-napoca",
    "web design cluj-napoca",
    "firma web design cluj",
    "creare website cluj",
    "magazin online cluj",
    "SEO cluj",
    "agentie web cluj",
    "site de prezentare cluj",
    "dezvoltare web cluj",
    "startup web cluj",
  ],
})

const clujFaqs = [
  {
    question: "Cât costă un site web în Cluj-Napoca?",
    answer:
      "Prețurile pentru un site web în Cluj variază în funcție de complexitate. Un site de prezentare pornește de la 450€, un site multi-pagină de la 650€, iar un magazin online de la 1100€. Pentru startup-uri și companii tech oferim pachete personalizate cu funcționalități avansate.",
  },
  {
    question: "Lucrați cu startup-uri din Cluj?",
    answer:
      "Absolut! Cluj-Napoca fiind hub-ul tech al României, avem experiență vastă cu startup-uri locale. Oferim soluții scalabile, MVP-uri rapide și design modern care se potrivește perfect ecosistemului tech din Cluj.",
  },
  {
    question: "Ce tehnologii folosiți pentru proiectele din Cluj?",
    answer:
      "Folosim cele mai moderne tehnologii: Next.js și React pentru aplicații performante, TypeScript pentru cod robust, Payload CMS pentru flexibilitate maximă, și WordPress/WooCommerce pentru proiecte e-commerce. Alegem stack-ul potrivit pentru fiecare proiect.",
  },
  {
    question: "Cât durează dezvoltarea unui site pentru o firmă din Cluj?",
    answer:
      "Timpul de livrare depinde de complexitate. Un site de prezentare: 1-2 săptămâni, un site corporate: 3-4 săptămâni, un magazin online: 4-8 săptămâni, iar pentru aplicații custom sau MVP-uri: 6-12 săptămâni.",
  },
  {
    question: "Oferiți servicii de SEO local pentru Cluj-Napoca?",
    answer:
      "Da, toate site-urile noastre sunt optimizate SEO din construcție. Oferim și servicii dedicate de SEO local pentru Cluj, pentru a te ajuta să apari în top pe căutări precum 'creare site cluj' sau servicii specifice industriei tale în zona Cluj.",
  },
  {
    question: "Puteți dezvolta aplicații web pentru startup-uri?",
    answer:
      "Da, suntem specializați în dezvoltarea de aplicații web moderne pentru startup-uri. Folosim React, Next.js și tehnologii cloud pentru a crea produse scalabile, rapide și ușor de întreținut. Oferim și consultanță tehnică pentru alegerea stack-ului potrivit.",
  },
  {
    question: "Aveți experiență cu companii din industria IT Cluj?",
    answer:
      "Da, am colaborat cu numeroase companii IT și startup-uri din Cluj. Înțelegem cerințele specifice ale industriei tech și oferim soluții la nivelul așteptărilor profesionale din acest sector.",
  },
  {
    question: "Oferiți suport și mentenanță pentru proiecte din Cluj?",
    answer:
      "Da, oferim pachete complete de mentenanță: actualizări de securitate, backup-uri, monitorizare, suport tehnic și dezvoltare continuă. Putem colabora pe termen lung pentru evoluția produsului tău digital.",
  },
]

export default function CreareSiteClujPage() {
  return (
    <>
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateLocalBusinessSchema()),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: "Acasă", url: "/" },
              { name: `Creare Site ${cityName}`, url: `/creare-site-${citySlug}` },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(clujFaqs)),
        }}
      />

      <main>
        <ClujHero />
        <CityServices cityName={cityName} />
        <CityBenefits cityName={cityName} />
        <CityFaq cityName={cityName} faqs={clujFaqs} />
        <CityCTA cityName={cityName} />
      </main>
    </>
  )
}
