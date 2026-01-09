import type { Metadata } from "next"
import { BucharestHero } from "@/components/cities/bucharest-hero"
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

const cityName = "București"
const citySlug = "bucuresti"

export const metadata: Metadata = generatePageMetadata({
  title: `Creare Site București | Web Design București - Agenție Profesională`,
  description: `Servicii profesionale de creare site-uri web în București. Web design modern, SEO optimizat, magazine online și aplicații mobile pentru afaceri din capitală. Solicită ofertă gratuită!`,
  path: `/creare-site-${citySlug}`,
  keywords: [
    "creare site bucuresti",
    "web design bucuresti",
    "firma web design bucuresti",
    "creare website bucuresti",
    "magazin online bucuresti",
    "SEO bucuresti",
    "agentie web bucuresti",
    "site de prezentare bucuresti",
    "dezvoltare web bucuresti",
    "servicii web bucuresti",
  ],
})

const bucharestFaqs = [
  {
    question: "Cât costă un site web în București?",
    answer:
      "Prețurile pentru un site web în București variază în funcție de complexitate. Un site de prezentare pornește de la 450€, un site cu mai multe pagini de la 650€, iar un magazin online de la 1100€. Oferim consultanță gratuită pentru a stabili exact ce ai nevoie.",
  },
  {
    question: "Cât durează crearea unui site web pentru o firmă din București?",
    answer:
      "Timpul de livrare depinde de complexitatea proiectului. Un site simplu de prezentare poate fi gata în 1-2 săptămâni, un site corporate în 3-4 săptămâni, iar un magazin online complet în 4-8 săptămâni.",
  },
  {
    question: "Oferiți servicii de SEO pentru București?",
    answer:
      "Da, toate site-urile noastre sunt optimizate SEO din construcție. Oferim și servicii dedicate de SEO local pentru București, pentru a te ajuta să apari în top pe căutări precum 'creare site bucurești' sau servicii specifice industriei tale.",
  },
  {
    question: "Lucrați doar cu firme din București?",
    answer:
      "Nu, lucrăm cu clienți din toată România și internațional. Având sediul în Timișoara, oferim servicii premium de web design pentru București și alte orașe majore, cu același nivel de calitate și atenție la detalii.",
  },
  {
    question: "Ce tehnologii folosiți pentru site-urile din București?",
    answer:
      "Folosim cele mai moderne tehnologii: Next.js și React pentru performanță maximă, WordPress/WooCommerce pentru flexibilitate, și Payload CMS pentru proiecte custom. Alegem tehnologia potrivită în funcție de nevoile specifice ale proiectului.",
  },
  {
    question: "Oferiți suport și mentenanță după lansare?",
    answer:
      "Da, oferim pachete de mentenanță lunară care includ actualizări de securitate, backup-uri regulate, monitorizare uptime și suport tehnic prioritar. Poți opta și pentru suport punctual la cerere.",
  },
  {
    question: "Cum funcționează procesul de colaborare la distanță?",
    answer:
      "Colaborăm eficient prin videoconferințe, email și platforme de project management. Folosim feedback live pe design-uri, rapoarte săptămânale și comunicare transparentă pe tot parcursul proiectului.",
  },
  {
    question: "Puteți face redesign pentru un site existent?",
    answer:
      "Absolut! Oferim servicii de redesign și modernizare pentru site-uri existente. Analizăm site-ul actual, identificăm punctele de îmbunătățire și propunem o soluție care să păstreze ce funcționează bine și să optimizeze restul.",
  },
]

export default function CreareSiteBucurestiPage() {
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
          __html: JSON.stringify(generateFAQSchema(bucharestFaqs)),
        }}
      />

      <main>
        <BucharestHero />
        <CityServices cityName={cityName} />
        <CityBenefits cityName={cityName} />
        <CityFaq cityName={cityName} faqs={bucharestFaqs} />
        <CityCTA cityName={cityName} />
      </main>
    </>
  )
}
