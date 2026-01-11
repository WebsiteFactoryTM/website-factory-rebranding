"use client"

import { Building2, Briefcase, Smartphone } from "lucide-react"
import { CityContent } from "./city-content"

export function BucharestContent() {
  return (
    <CityContent
      cityName="București"
      heroTitle="De ce ai nevoie de un site web profesional pentru afacerea ta din București?"
      heroDescription={
        <>
          În 2026, <strong className="text-foreground">prezența online</strong> este esențială pentru afaceri, mai ales în{" "}
          <strong className="text-foreground">București</strong>, capitala și cel mai mare hub economic al României. Competiția fiind intensă, un{" "}
          <strong className="text-foreground">site web optimizat SEO</strong> te ajută să te diferențiezi, să fii găsit de clienții potențiali pe{" "}
          <strong className="text-foreground">Google</strong> și <strong className="text-foreground">AI Chatbots</strong> și să generezi lead-uri calificate pentru afacerea ta.
        </>
      }
      industries={[
        {
          icon: Building2,
          title: "Corporate & Business",
          description:
            "Site-uri pentru companii din București: consultanță, avocatură, contabilitate, servicii profesionale. Design adaptat identității companiei și funcționalități avansate.",
          color: "from-brand/20 to-brand-light/20",
          iconColor: "brand",
        },
        {
          icon: Briefcase,
          title: "Retail & eCommerce",
          description:
            "Magazine online București, branduri locale, retaileri. Soluții complete cu integrări plăți, transport, curier, facturare automatizată și panou admin intuitiv.",
          color: "from-glow-cyan/20 to-cyan-500/20",
          iconColor: "glow-cyan",
        },
      ]}
      servicesTitle="Servicii de Web Design și Creare Site-uri în București"
      servicesDescription={
        <>
          <strong className="text-foreground">Website Factory</strong> oferă servicii complete de{" "}
          <strong className="text-foreground">creare site-uri web în București</strong>, adaptate nevoilor diverse ale pieței din capitală. Fie că ai o firmă de consultanță în{" "}
          <strong className="text-foreground">zona Pipera</strong>, o clinică medicală în{" "}
          <strong className="text-foreground">Centrul Vechi</strong>, un magazin online sau un startup tech, avem experiența și expertiza necesară să îți creăm soluția digitală perfectă.
        </>
      }
      servicesList={[
        {
          title: "Site-uri moderne",
          description: "Pentru IMM și companii mari din București",
        },
        {
          title: "Magazine Online",
          description: "Soluții eCommerce complete pentru retaileri",
        },
        {
          title: "Site-uri Medicale",
          description: "Pentru clinici private și cabinete medicale",
        },
        {
          title: "Aplicații Web",
          description: "Pentru startup-uri și companii tech",
        },
      ]}
      seoTitle="SEO Local București - Domină Rezultatele Google în Capitală"
      seoDescription={
        <>
          <strong className="text-foreground">SEO local</strong> este crucial pentru afacerile din București. Cu mii de companii care concurează pentru aceiași clienți, trebuie să fii vizibil pe Google și AI Chatbots să te găsească ușor când potențialii tăi clienți caută servicii. Optimizăm site-ul tău pentru termeni relevanți precum "consultanță fiscală bucurești", "clinică stomatologică pipera", "avocat bucurești centru" sau orice alt termen specific industriei tale și zonei în care activezi.
        </>
      }
      seoBenefits={[
        "Vizibilitate maximă pe căutări locale Google București",
        "Mai multe lead-uri calificate și conversii",
        "Poziționare pe Google Maps pentru zone specifice",
        "Avantaj competitiv față de concurență",
      ]}
      whyUsTitle="Website Factory – alegerea potrivită pentru proiecte digitale serioase din București"
      whyUsDescription={
        <>
          Cu peste <strong className="text-foreground">150 de proiecte finalizate</strong> pentru clienți noștri, din diverse industrii (IT, consultanță, medicină, retail, servicii profesionale), înțelegem perfect dinamica pieței din capitală. Oferim:{" "}
          <strong className="text-foreground">design modern la standarde corporative</strong>,{" "}
          <strong className="text-foreground">optimizare SEO avansată</strong> pentru piața competitivă din București, integrări complete cu sisteme business (CRM, ERP, facturare),{" "}
          <strong className="text-foreground">livrare rapidă</strong> (1-8 săptămâni), prețuri transparente și competitive, suport tehnic dedicat în limba română, și experiență cu cerințele specifice ale companiilor din București.
        </>
      }
      specialFeature={{
        icon: Smartphone,
        title: "Tehnologii Moderne & Scalabile",
        description:
          "Folosim cele mai avansate tehnologii web: Next.js 15, React, TypeScript pentru aplicații performante, WordPress/WooCommerce pentru flexibilitate maximă, și soluții cloud (AWS, Vercel) pentru scalabilitate. Perfect pentru startup-uri tech din București care au nevoie de MVP rapid sau companii enterprise cu cerințe complexe. Oferim și consultanță tehnică pentru alegerea stack-ului potrivit și arhitectură scalabilă.",
        iconColor: "glow-cyan",
      }}
      ctaText={
        <>
          Contactează-ne astăzi pentru o <strong className="text-foreground">consultanță gratuită</strong> și un{" "}
          <strong className="text-foreground">proiect personalizat</strong> pentru afacerea ta din București!
        </>
      }
    />
  )
}
