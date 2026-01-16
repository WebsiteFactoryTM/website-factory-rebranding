import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/seo"
import { PriceEstimatorHero } from "@/components/price-estimator/price-hero"
import { PriceEstimatorWizard } from "@/components/price-estimator/price-wizard"

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: "Preț Website - Web design",
    description:
      "Calculează prețul site-ului tău în 60 de secunde. Estimator gratuit pentru website de prezentare, magazin online sau aplicație web. Obține o cotație personalizată instant.",
    path: "/pret-website",
    keywords: [
      "pret website",
      "calculator pret site",
      "cost website",
      "pret magazin online",
      "estimare pret web design",
      "cat costa un site",
      "pret creare site",
    ],
  }),
}

export default function PretWebsitePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Acasă", url: "/" },
    { name: "Calculator Preț Website", url: "/pret-website" },
  ])

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Cât costă un website de prezentare?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Un website de prezentare începe de la 650€ pentru 5 pagini. Prețul crește cu 50€ pentru fiecare pagină adițională și cu modulele extra selectate.",
        },
      },
      {
        "@type": "Question",
        name: "Cât costă un magazin online?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Un magazin online începe de la 1100€ pentru până la 150 de produse. Prețul variază în funcție de numărul de produse și integrările necesare.",
        },
      },
      {
        "@type": "Question",
        name: "Este estimarea finală?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Estimarea oferită este orientativă. Prețul final va fi stabilit după o discuție detaliată despre cerințele specifice ale proiectului.",
        },
      },
    ],
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <main>
        <PriceEstimatorHero />
        <PriceEstimatorWizard />
      </main>
    </>
  )
}
