import type { Metadata } from "next"
import { BrasovHero } from "@/components/cities/brasov-hero"
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

const cityName = "Brașov"
const citySlug = "brasov"

export const metadata: Metadata = generatePageMetadata({
  title: `Creare Site Brașov | Web Design Brașov | Website Factory`,
  description: `Servicii profesionale de creare site-uri web în Brașov. Web design modern pentru turism, HoReCa și afaceri locale. Site-uri optimizate SEO în inima Transilvaniei.`,
  path: `/creare-site-${citySlug}`,
  keywords: [
    "creare site brasov",
    "web design brasov",
    "firma web design brasov",
    "creare website brasov",
    "magazin online brasov",
    "SEO brasov",
    "agentie web brasov",
    "site de prezentare brasov",
    "dezvoltare web brasov",
    "site turism brasov",
    "site horeca brasov",
    "web design transilvania",
  ],
})

const brasovFaqs = [
  {
    question: "Cât costă un site web în Brașov?",
    answer:
      "Prețurile pentru un site web în Brașov variază în funcție de complexitate și specificul afacerii. Un site de prezentare pornește de la 450€, un site corporate cu mai multe pagini de la 650€, iar un magazin online de la 1100€. Pentru afaceri din turism și HoReCa oferim pachete personalizate cu funcționalități de rezervări și galerii foto optimizate.",
  },
  {
    question: "Aveți experiență cu site-uri pentru turism și HoReCa în Brașov?",
    answer:
      "Da! Având în vedere specificul turistic al Brașovului, am dezvoltat numeroase site-uri pentru pensiuni, hoteluri, restaurante, agenții de turism și ghiduri turistici. Oferim soluții cu sisteme de rezervări online, galerii foto impresionante și optimizare SEO pentru atragerea turiștilor.",
  },
  {
    question: "Cât durează crearea unui site web pentru o afacere din Brașov?",
    answer:
      "Timpul de livrare depinde de complexitatea proiectului. Un site simplu de prezentare poate fi gata în 1-2 săptămâni, un site pentru pensiune/restaurant cu rezervări în 3-5 săptămâni, iar un magazin online complet în 4-8 săptămâni. Lucrăm rapid fără să compromitem calitatea.",
  },
  {
    question: "Oferiți servicii de SEO local pentru Brașov?",
    answer:
      "Absolut! Toate site-urile noastre sunt optimizate SEO din construcție, cu focus special pe SEO local pentru Brașov. Te ajutăm să apari în top pe căutări precum 'cazare brașov', 'restaurant brașov' sau servicii specifice industriei tale în zona Brașov și împrejurimi.",
  },
  {
    question: "Puteți integra sisteme de rezervări online?",
    answer:
      "Da, integrăm sisteme moderne de rezervări online pentru pensiuni, hoteluri, restaurante sau activități turistice. Oferim soluții complete care permit clienților să rezerve și să plătească direct de pe site-ul tău, cu sincronizare automată a disponibilității.",
  },
  {
    question: "Lucrați doar cu afaceri din Brașov?",
    answer:
      "Nu, lucrăm cu clienți din toată România și internațional. Având sediul în Timișoara, oferim servicii premium de web design pentru Brașov și zona Transilvaniei, cu aceeași calitate și atenție la detalii ca pentru toți clienții noștri.",
  },
  {
    question: "Site-ul va fi optimizat pentru turism internațional?",
    answer:
      "Da! Putem crea site-uri multilingve (română, engleză, germană etc.) pentru a ajunge la turiștii străini. Implementăm și best practices pentru atragerea vizitatorilor internaționali: galerii foto profesionale, hartă interactivă, informații despre atracții locale și sistem de rezervări internațional.",
  },
  {
    question: "Oferiți suport și mentenanță după lansare?",
    answer:
      "Da, oferim pachete complete de mentenanță lunară care includ actualizări de conținut (prețuri, meniu, disponibilitate camere), backup-uri regulate, monitorizare uptime și suport tehnic prioritar. Perfect pentru afaceri din turism care au nevoie de actualizări frecvente.",
  },
]

export default function CreareSiteBrasovPage() {
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
          __html: JSON.stringify(generateFAQSchema(brasovFaqs)),
        }}
      />

      <main>
        <BrasovHero />
        <CityServices cityName={cityName} />
        <CityBenefits cityName={cityName} />
        <CityFaq cityName={cityName} faqs={brasovFaqs} />
        <CityCTA cityName={cityName} />
      </main>
    </>
  )
}

