import type { Metadata } from "next"
import { generatePageMetadata, generateServiceSchema, generateBreadcrumbSchema, generateFAQSchema } from "@/lib/seo"
import { EcommerceHero } from "@/components/services/ecommerce/ecommerce-hero"
import { PlatformComparison } from "@/components/services/ecommerce/platform-comparison"
import { StoreTypes } from "@/components/services/ecommerce/store-types"
import { LoyaltyFeatures } from "@/components/services/ecommerce/loyalty-features"
import { RevenueCalculator } from "@/components/services/ecommerce/revenue-calculator"
import { EcommerceProcess } from "@/components/services/ecommerce/ecommerce-process"
import { EcommerceTechStack } from "@/components/services/ecommerce/ecommerce-tech-stack"
import { EcommercePortfolio } from "@/components/services/ecommerce/ecommerce-portfolio"
import { EcommerceFaq } from "@/components/services/ecommerce/ecommerce-faq"
import { EcommerceCta } from "@/components/services/ecommerce/ecommerce-cta"

export const metadata: Metadata = generatePageMetadata({
  title: "Creare Magazin Online Timișoara - Web design",
  description:
    "Dezvoltare magazin online performant. Funcționalități de loializare clienți, checkout optimizat, plăți securizate, ușor de administrat.",
  path: "/servicii/magazin-online",
  keywords: [
    "creare magazin online timisoara",
    "ecommerce timisoara",
    "woocommerce romania",
    "magazin online wordpress",
    "next.js ecommerce",
    "payload cms shop",
    "dezvoltare magazin online",
    "platforma vanzari online",
    "shop online profesional",
    "comert electronic romania",
  ],
})

const ecommerceFaqs = [
  {
    question: "Cât costă să creez un magazin online?",
    answer:
      "Prețurile pentru un magazin online încep de la 1100€ pentru un shop startup cu până la 100 de produse. Magazinele business cu funcționalități avansate (loializare, ERP, marketing automation) pornesc de la 1700€, iar soluțiile enterprise cu arhitectură headless sunt cotate individual. Oferim consultanță gratuită pentru a stabili exact ce ai nevoie.",
  },
  {
    question: "WooCommerce sau Next.js - ce să aleg?",
    answer:
      "WooCommerce este ideal pentru magazine mici-medii (până la 7000 produse), cu buget controlat și nevoie de administrare simplă. Next.js + Payload CMS este recomandat pentru magazine mari, high-traffic, care cer performanță sub 1 secundă și scalabilitate nelimitată. Te ajutăm să alegi varianta potrivită în funcție de obiectivele tale.",
  },
  {
    question: "Ce metode de plată pot integra?",
    answer:
      "Integrăm toate metodele de plată populare în România: card bancar (Stripe, Netopia, PayU), plată la livrare (ramburs), transfer bancar, rate fără dobândă (TBI Bank, BRD Finance), Apple Pay, Google Pay. Toate tranzacțiile sunt securizate cu certificat SSL și conformitate PCI-DSS.",
  },
  {
    question: "Cât durează să fie gata magazinul?",
    answer:
      "Un magazin startup este gata în 3-4 săptămâni. Magazinele business cu funcționalități avanzate necesită 6-8 săptămâni. Proiectele enterprise cu arhitectură custom durează 8-12 săptămâni. Respectăm deadline-urile și te ținem la curent cu progresul.",
  },
  {
    question: "Pot să adaug funcții de loializare clienți?",
    answer:
      "Absolut! Implementăm sisteme complete de loializare: puncte de fidelitate, programe de referral, niveluri VIP, reduceri personalizate, wishlist smart, subscripții recurente și gamification. Aceste funcții pot crește rata de retenție cu până la 40%.",
  },
  {
    question: "Magazinul va fi optimizat pentru SEO?",
    answer:
      "Da! Toate magazinele includ optimizare SEO completă: URL-uri prietenoase, meta tags pentru produse, schema markup pentru rich snippets în Google, sitemap XML, performanță optimizată și structură de categorii SEO-friendly.",
  },
  {
    question: "Ce curieri pot integra?",
    answer:
      "Integrăm nativ cei mai populari curieri din România: FanCourier, Sameday (easybox), Cargus, DPD, GLS. Sistemul calculează automat costul livrării și generează AWB-uri direct din dashboard.",
  },
  {
    question: "Oferiți suport și mentenanță după lansare?",
    answer:
      "Da! Oferim 60 de zile suport gratuit post-lansare, apoi, (dacă e nevoie) pachete de mentenanță lunară care includ: actualizări de securitate, backup-uri, monitorizare uptime, suport tehnic și consultanță pentru optimizări. Prețurile pornesc de la 70€/lună.",
  },
]

export default function MagazinOnlinePage() {
  const serviceSchema = generateServiceSchema({
    name: "Creare Magazin Online Profesional",
    description:
      "Dezvoltare magazine online cu WooCommerce și Next.js + Payload CMS. Funcționalități de loializare clienți, checkout optimizat și scalabilitate nelimitată.",
    url: "/servicii/magazin-online",
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Acasă", url: "/" },
    { name: "Servicii", url: "/servicii" },
    { name: "Magazin Online", url: "/servicii/magazin-online" },
  ])

  const faqSchema = generateFAQSchema(ecommerceFaqs)

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main>
        <EcommerceHero />
        <PlatformComparison />
        <StoreTypes />
        <LoyaltyFeatures />
        <EcommerceProcess />
        <EcommerceTechStack />
        <RevenueCalculator />
        <EcommercePortfolio />
        <EcommerceFaq faqs={ecommerceFaqs} />
        <EcommerceCta />
      </main>
    </>
  )
}
