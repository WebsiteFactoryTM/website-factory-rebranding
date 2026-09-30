import type { Metadata } from "next"
import { setRequestLocale, getTranslations } from "next-intl/server"
import type { Locale } from "@/i18n/routing"
import { allLocaleParams } from "@/lib/i18n/ro-only"
import { withoutPrices } from "@/lib/i18n/no-prices"
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

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  if (locale === "en") {
    return generatePageMetadata({
      locale,
      href: "/servicii/magazin-online",
      hreflang: true,
      title: "Online Store & E-commerce Development",
      description:
        "High-performance online store development. Customer loyalty features, optimised checkout, secure payments, easy to manage.",
      keywords: [
        "online store development",
        "e-commerce website design",
        "woocommerce development",
        "next.js ecommerce",
        "headless commerce",
        "custom online shop",
      ],
    })
  }
  return generatePageMetadata({
    locale,
    href: "/servicii/magazin-online",
    hreflang: true,
    title: "Creare Magazin Online Timișoara - Web design",
    description:
      "Dezvoltare magazin online performant. Funcționalități de loializare clienți, checkout optimizat, plăți securizate, ușor de administrat.",
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
}

const faqsRo = [
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

const faqsEn = [
  {
    question: "What does an online store cost?",
    answer:
      "Pricing starts from €1,100 for a startup store with up to 100 products. Business stores with advanced features (loyalty, ERP, marketing automation) start from €1,700, and enterprise headless builds are quoted individually. Get in touch for a free consultation to work out exactly what you need.",
  },
  {
    question: "WooCommerce or Next.js — which should I choose?",
    answer:
      "WooCommerce is ideal for small to medium stores (up to around 7,000 products) with a controlled budget and simple admin needs. Next.js + Payload CMS suits larger, high-traffic stores that need sub-1-second performance and unlimited scalability. We'll help you pick the right option for your goals.",
  },
  {
    question: "What payment methods can you integrate?",
    answer:
      "We integrate the major payment methods for your market — card payments via providers like Stripe, cash on delivery, bank transfer, buy-now-pay-later, Apple Pay and Google Pay. Every transaction is secured with SSL and PCI-DSS compliance.",
  },
  {
    question: "How long does it take for the store to be ready?",
    answer:
      "A startup store is ready in 3–4 weeks. Business stores with advanced functionality take 6–8 weeks. Enterprise projects with a custom architecture take 8–12 weeks. We stick to deadlines and keep you updated on progress.",
  },
  {
    question: "Can you add customer loyalty features?",
    answer:
      "Absolutely. We build complete loyalty systems: points, referral programmes, VIP tiers, personalised discounts, smart wishlists, recurring subscriptions and gamification. These features can lift retention by up to 40%.",
  },
  {
    question: "Will the store be optimised for SEO?",
    answer:
      "Yes. Every store includes full SEO optimisation: friendly URLs, product meta tags, schema markup for rich snippets in Google, an XML sitemap, optimised performance, and an SEO-friendly category structure.",
  },
  {
    question: "Which couriers can you integrate?",
    answer:
      "We integrate with the courier services relevant to your market, calculating delivery costs automatically and generating shipping labels straight from the dashboard.",
  },
  {
    question: "Do you offer support and maintenance after launch?",
    answer:
      "Yes. We include 60 days of free support after launch, then — if needed — monthly maintenance plans covering security updates, backups, uptime monitoring, technical support and optimisation guidance.",
  },
]

const faqs = { ro: faqsRo, en: withoutPrices(faqsEn) } satisfies Record<Locale, typeof faqsRo>

export function generateStaticParams() {
  return allLocaleParams()
}

export default async function MagazinOnlinePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const loc = locale as Locale
  const pageFaqs = faqs[loc]

  const serviceSchema = {
    ...generateServiceSchema(
      locale === "en"
        ? {
            name: "Professional Online Store Development",
            description:
              "Online store development with WooCommerce and Next.js + Payload CMS. Customer loyalty features, optimised checkout and unlimited scalability.",
            url: "/servicii/magazin-online",
          }
        : {
            name: "Creare Magazin Online Profesional",
            description:
              "Dezvoltare magazine online cu WooCommerce și Next.js + Payload CMS. Funcționalități de loializare clienți, checkout optimizat și scalabilitate nelimitată.",
            url: "/servicii/magazin-online",
          },
      locale as Locale,
    ),
    inLanguage: locale,
  }

  const tBreadcrumb = await getTranslations("breadcrumb")
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: tBreadcrumb("home"), url: "/" },
    { name: tBreadcrumb("services"), url: "/servicii" },
    { name: locale === "en" ? "Online Store" : "Magazin Online", url: "/servicii/magazin-online" },
  ])

  const faqSchema = generateFAQSchema(pageFaqs)

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
        {loc === "ro" && <RevenueCalculator />}
        <EcommercePortfolio />
        <EcommerceFaq faqs={pageFaqs} />
        <EcommerceCta />
      </main>
    </>
  )
}
