import type { Metadata } from "next"
import { ConstantaHero } from "@/components/cities/constanta-hero"
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

const cityName = "Constanța"
const citySlug = "constanta"

export const metadata: Metadata = generatePageMetadata({
  title: `Creare Site Constanța | Web Design Constanța - Agenție Profesională`,
  description: `Servicii profesionale de creare site-uri web în Constanța. Web design modern pentru turism, HoReCa și afaceri de pe litoral, SEO optimizat, magazine online. Solicită ofertă gratuită!`,
  path: `/creare-site-${citySlug}`,
  keywords: [
    "creare site constanta",
    "web design constanta",
    "creare site constanța",
    "web design constanța",
    "firma web design constanta",
    "creare website constanta",
    "magazin online constanta",
    "SEO constanta",
    "agentie web constanta",
    "site de prezentare constanta",
    "dezvoltare web litoral",
    "web design turism",
    "site hotel constanta",
    "site restaurant litoral",
  ],
})

const constantaFaqs = [
  {
    question: "Cât costă un site web în Constanța?",
    answer:
      "Prețurile pentru un site web în Constanța variază în funcție de complexitate. Un site de prezentare pornește de la 450€, un site multi-pagină de la 650€, iar un magazin online de la 1100€. Oferim soluții specializate pentru industria turistică și HoReCa de pe litoral.",
  },
  {
    question: "Creați site-uri pentru hoteluri și pensiuni de pe litoral?",
    answer:
      "Da, avem experiență solidă în crearea de site-uri pentru industria HoReCa: hoteluri, pensiuni, restaurante, cluburi și alte afaceri turistice. Implementăm sisteme de rezervări online, galerii foto profesionale și integrări cu platforme de booking.",
  },
  {
    question: "Ce tehnologii folosiți pentru proiectele din Constanța?",
    answer:
      "Folosim cele mai moderne tehnologii: Next.js și React pentru aplicații performante, TypeScript pentru cod robust, Payload CMS pentru flexibilitate maximă, și WordPress/WooCommerce pentru proiecte e-commerce. Alegem stack-ul potrivit pentru fiecare proiect.",
  },
  {
    question: "Oferiți optimizare SEO pentru căutări locale în Constanța?",
    answer:
      "Da, toate site-urile noastre sunt optimizate SEO din construcție. Oferim optimizare specifică pentru căutări locale precum 'hotel constanța', 'restaurant litoral', 'cazare mamaia' sau servicii specifice industriei tale din zona litoralului.",
  },
  {
    question: "Cât durează dezvoltarea unui site pentru o afacere din Constanța?",
    answer:
      "Timpul de livrare depinde de complexitate. Un site de prezentare: 1-2 săptămâni, un site corporate: 3-4 săptămâni, un magazin online sau sistem de rezervări: 4-8 săptămâni. Comunicăm transparent pe tot parcursul proiectului.",
  },
  {
    question: "Puteți integra sisteme de rezervări online?",
    answer:
      "Absolut! Implementăm sisteme complete de rezervări pentru hoteluri, pensiuni, restaurante și servicii turistice. Integrăm cu platforme precum Booking.com, Airbnb, sau creăm soluții custom pentru gestionarea directă a rezervărilor.",
  },
  {
    question: "Lucrați cu afaceri sezoniere de pe litoral?",
    answer:
      "Da, înțelegem specificul afacerilor sezoniere de pe litoral. Oferim pachete flexibile de mentenanță, strategii SEO pregătite pentru sezonul estival, și soluții care maximizează vizibilitatea în perioada de vârf turistic.",
  },
  {
    question: "Oferiți suport și mentenanță pentru proiecte din Constanța?",
    answer:
      "Da, oferim pachete complete de mentenanță: actualizări de securitate, backup-uri, monitorizare, suport tehnic și dezvoltare continuă. Suntem partenerul tău digital pe termen lung, inclusiv în sezonul de vârf.",
  },
]

export default function CreareSiteConstantaPage() {
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
          __html: JSON.stringify(generateFAQSchema(constantaFaqs)),
        }}
      />

      <main>
        <ConstantaHero />
        <CityServices cityName={cityName} />
        <CityBenefits cityName={cityName} />
        <CityFaq cityName={cityName} faqs={constantaFaqs} />
        <CityCTA cityName={cityName} />
      </main>
    </>
  )
}
