"use client"

import { Mountain, Briefcase, TrendingUp, Smartphone } from "lucide-react"
import { CityContent } from "./city-content"

export function BrasovContent() {
  return (
    <CityContent
      cityName="Brașov"
      heroTitle="De ce ai nevoie de un site web profesional pentru afacerea ta din Brașov?"
      heroDescription={
        <>
          În 2026, <strong className="text-foreground">prezența online</strong> nu mai este opțională pentru
          afacerile din <strong className="text-foreground">Brașov și Transilvania</strong>. Cu peste 2 milioane de
          turiști anual care vizitează orașul, majoritatea căutărilor pentru servicii locale încep pe{" "}
          <strong className="text-foreground">Google</strong>. Un <strong className="text-foreground">site web optimizat SEO</strong>{" "}
          te ajută să fii găsit de clienții potențiali exact când caută serviciile tale.
        </>
      }
      industries={[
        {
          icon: Mountain,
          title: "Turism & HoReCa",
          description:
            "Site-uri pentru pensiuni Brașov, restaurante, cafenele și agenții de turism. Sisteme de rezervări online și galerii foto pentru atragerea turiștilor.",
          color: "from-amber-500/20 to-orange-500/20",
          iconColor: "amber-500",
        },
        {
          icon: Briefcase,
          title: "Business Local",
          description:
            "Magazine online Brașov, firme de servicii, cabinete medicale, saloane de înfrumusețare. Soluții complete pentru afaceri locale.",
          color: "from-brand/20 to-brand-light/20",
          iconColor: "brand",
        },
      ]}
      servicesTitle="Servicii de Web Design și Creare Site-uri în Brașov"
      servicesDescription={
        <>
          <strong className="text-foreground">Website Factory</strong> oferă servicii complete de{" "}
          <strong className="text-foreground">creare site-uri web în Brașov</strong>, adaptate specificului local.
          Fie că ai o pensiune în <strong className="text-foreground">Poiana Brașov</strong>, un restaurant în{" "}
          <strong className="text-foreground">Centrul Vechi</strong>, sau o afacere în zonele Noua, Tractorul sau
          Astra, avem soluția potrivită pentru tine.
        </>
      }
      servicesList={[
        {
          title: "Site-uri de Prezentare",
          description: "Perfect pentru IMM, freelanceri și profesioniști din Brașov",
        },
        {
          title: "Magazine Online",
          description: "Soluții eCommerce complete cu plăți online și integrări curier",
        },
        {
          title: "Site-uri pentru Pensiuni",
          description: "Sisteme de rezervări, galerii foto și optimizare pentru turism",
        },
        {
          title: "Site-uri Restaurant",
          description: "Meniu digital, comenzi online și integrare cu platforme delivery",
        },
      ]}
      seoTitle="SEO Local Brașov - Apari în Top pe Google"
      seoDescription={
        <>
          <strong className="text-foreground">SEO local</strong> este esențial pentru afacerile din Brașov. Optimizăm
          site-ul tău să apară în top pe Google când clienții caută servicii în zona ta. Fie că vrei să rankezi pentru
          "cazare brașov", "restaurant brașov centru", "pensiune poiana brasov" sau orice alt termen specific afacerii
          tale, avem experiența necesară să te aducem în primele poziții.
        </>
      }
      seoBenefits={[
        "Vizibilitate crescută pe căutări locale Google",
        "Mai mulți clienți și rezervări de pe site",
        "Reducerea dependenței de platforme cu comisioane mari",
        "Poziționare pe Google Maps și recenzii",
      ]}
      whyUsTitle="Website Factory – alegerea potrivită pentru proiecte digitale serioase din Brașov"
      whyUsDescription={
        <>
          Cu peste <strong className="text-foreground">150 de proiecte finalizate</strong> pentru clienții noștrii, știm exact ce funcționează pe piața locală. Oferim:{" "}
          <strong className="text-foreground">design modern și responsive</strong>,{" "}
          <strong className="text-foreground">optimizare SEO avansată</strong>, integrări complete (rezervări, plăți,
          hărți), <strong className="text-foreground">livrare rapidă</strong> (1-8 săptămâni), prețuri competitive și
          transparente, suport tehnic dedicat în limba română, și înțelegere profundă a specificului local și a
          industriei turistice din Brașov.
        </>
      }
      specialFeature={{
        icon: Smartphone,
        title: "Design Responsive & Mobile-First",
        description:
          "Peste 70% din vizitatorii site-urilor din turism vin de pe telefon. Toate site-urile noastre sunt optimizate perfect pentru mobile, tabletă și desktop. Site-ul tău va arăta impecabil pe orice dispozitiv, oferind turiștilor o experiență plăcută când caută cazare sau servicii în Brașov.",
        iconColor: "amber-500",
      }}
      ctaText={
        <>
          Contactează-ne astăzi pentru o <strong className="text-foreground">consultanță gratuită</strong> și un{" "}
          <strong className="text-foreground">proiect personalizat</strong> pentru afacerea ta din Brașov!
        </>
      }
    />
  )
}
