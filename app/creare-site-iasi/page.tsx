import type { Metadata } from "next"
import { IasiHero } from "@/components/cities/iasi-hero"
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

const cityName = "Iași"
const citySlug = "iasi"

export const metadata: Metadata = generatePageMetadata({
  title: `Creare Site Iași | Web Design Iași - Agenție Profesională`,
  description: `Servicii profesionale de creare site-uri web în Iași. Web design modern pentru afaceri din Moldova, SEO optimizat, magazine online și aplicații. Solicită ofertă gratuită!`,
  path: `/creare-site-${citySlug}`,
  keywords: [
    "creare site iasi",
    "web design iasi",
    "creare site iași",
    "web design iași",
    "firma web design iasi",
    "creare website iasi",
    "magazin online iasi",
    "SEO iasi",
    "agentie web iasi",
    "site de prezentare iasi",
    "dezvoltare web iasi",
    "web design moldova",
  ],
})

const iasiFaqs = [
  {
    question: "Cât costă un site web în Iași?",
    answer:
      "Prețurile pentru un site web în Iași variază în funcție de complexitate. Un site de prezentare pornește de la 450€, un site multi-pagină de la 650€, iar un magazin online de la 1100€. Oferim soluții personalizate pentru toate tipurile de afaceri din Moldova.",
  },
  {
    question: "Lucrați cu afaceri din toată regiunea Moldova?",
    answer:
      "Da, deși suntem o agenție națională, avem experiență solidă cu clienți din Iași și întreaga regiune Moldova. Colaborăm remote eficient și oferim suport complet pentru proiecte din Suceava, Bacău, Piatra Neamț și alte orașe din zonă.",
  },
  {
    question: "Ce tehnologii folosiți pentru proiectele din Iași?",
    answer:
      "Folosim cele mai moderne tehnologii: Next.js și React pentru aplicații performante, TypeScript pentru cod robust, Payload CMS pentru flexibilitate maximă, și WordPress/WooCommerce pentru proiecte e-commerce. Alegem stack-ul potrivit pentru fiecare proiect.",
  },
  {
    question: "Cât durează dezvoltarea unui site pentru o firmă din Iași?",
    answer:
      "Timpul de livrare depinde de complexitate. Un site de prezentare: 1-2 săptămâni, un site corporate: 3-4 săptămâni, un magazin online: 4-8 săptămâni. Comunicăm transparent pe tot parcursul proiectului.",
  },
  {
    question: "Oferiți servicii de SEO local pentru Iași?",
    answer:
      "Da, toate site-urile noastre sunt optimizate SEO din construcție. Oferim și servicii dedicate de SEO local pentru Iași și Moldova, pentru a te ajuta să apari în top pe căutări precum 'creare site iași' sau servicii specifice industriei tale.",
  },
  {
    question: "Puteți crea site-uri pentru instituții culturale și educaționale?",
    answer:
      "Absolut! Iași fiind un important centru universitar și cultural, avem experiență cu site-uri pentru instituții de învățământ, muzee, teatre și organizații culturale. Creăm soluții care reflectă prestigiul și valorile acestor instituții.",
  },
  {
    question: "Cum funcționează colaborarea la distanță?",
    answer:
      "Colaborăm eficient remote cu clienții din Iași și Moldova. Folosim instrumente moderne pentru comunicare (Zoom, Slack), management de proiect și partajare fișiere. Programăm întâlniri video regulate și suntem mereu disponibili pentru suport.",
  },
  {
    question: "Oferiți suport și mentenanță pentru proiecte din Iași?",
    answer:
      "Da, oferim pachete complete de mentenanță: actualizări de securitate, backup-uri, monitorizare, suport tehnic și dezvoltare continuă. Suntem partenerul tău digital pe termen lung.",
  },
]

export default function CreareSiteIasiPage() {
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
          __html: JSON.stringify(generateFAQSchema(iasiFaqs)),
        }}
      />

      <main>
        <IasiHero />
        <CityServices cityName={cityName} />
        <CityBenefits cityName={cityName} />
        <CityFaq cityName={cityName} faqs={iasiFaqs} />
        <CityCTA cityName={cityName} />
      </main>
    </>
  )
}
