"use client"

import { Rocket, Code2, Zap } from "lucide-react"
import { CityContent } from "./city-content"

export function ClujContent() {
  return (
    <CityContent
      cityName="Cluj-Napoca"
      heroTitle="Website Factory – alegerea potrivită pentru proiecte digitale serioase în Cluj-Napoca?"
      heroDescription={
        <>
          În 2026, <strong className="text-foreground">Cluj-Napoca</strong> este recunoscut ca{" "}
          <strong className="text-foreground">"Silicon Valley-ul României"</strong>, cu cel mai dinamic ecosistem tech din țară. Cu peste 150,000 de profesioniști IT, sute de startup-uri și companii tech globale, competiția pentru talente și clienți este intensă. Un{" "}
          <strong className="text-foreground">site web modern sau aplicație web</strong> te ajută să te diferențiezi, să atragi investitori, să validezi rapid ideea pe piață și să scalezi eficient.
        </>
      }
      industries={[
        {
          icon: Rocket,
          title: "Startup-uri Tech",
          description:
            "MVP-uri rapide pentru startup-uri Cluj: SaaS, fintech, edtech, healthtech. Validare rapidă pe piață și scalare pentru creștere.",
          color: "from-violet-500/20 to-purple-500/20",
          iconColor: "violet-500",
        },
        {
          icon: Code2,
          title: "Companii IT & SaaS",
          description:
            "Site-uri corporate și aplicații web Cluj pentru companii IT, software houses, agenții digitale. Design modern și tehnologii scalabile.",
          color: "from-brand/20 to-brand-light/20",
          iconColor: "brand",
        },
      ]}
      servicesTitle="Servicii de Web Design și Dezvoltare Aplicații în Cluj-Napoca"
      servicesDescription={
        <>
          <strong className="text-foreground">Website Factory</strong> oferă servicii complete de{" "}
          <strong className="text-foreground">creare site-uri web și aplicații în Cluj-Napoca</strong>, specializate pentru ecosistemul tech local. Fie că ai un startup în fază de idee și ai nevoie de un{" "}
          <strong className="text-foreground">MVP rapid</strong>, o companie SaaS care vrea să scaleze, sau o agenție IT care are nevoie de un site corporate impresionant, avem experiența și stack-ul tehnologic potrivit pentru tine.
        </>
      }
      servicesList={[
        {
          title: "MVP pentru Startup-uri",
          description: "Validare rapidă în 4-8 săptămâni",
        },
        {
          title: "Aplicații Web SaaS",
          description: "Platforme scalabile și performante",
        },
        {
          title: "Site-uri pentru IT",
          description: "Corporate sites pentru companii tech",
        },
        {
          title: "Platforme Marketplace",
          description: "Conectare buyers și sellers",
        },
      ]}
      seoTitle="SEO Local Cluj-Napoca - Domină Piața Tech din Transilvania"
      seoDescription={
        <>
          <strong className="text-foreground">SEO local Cluj</strong> este esențial pentru startup-uri și companii tech care vor să fie găsite de clienți, investitori și talente. Optimizăm site-ul tău pentru termeni relevanți precum "dezvoltare software cluj", "startup tech cluj-napoca", "companie IT cluj", "web development cluj" sau orice alt termen specific industriei tale. Cu sute de companii tech în Cluj, trebuie să fii vizibil pe Google când potențialii clienți sau investitorii caută servicii.
        </>
      }
      seoBenefits={[
        "Vizibilitate maximă în ecosistemul tech Cluj",
        "Atragere investitori și parteneri strategici",
        "Recrutare talente tech din Cluj-Napoca",
        "Lead-uri B2B de la companii locale",
      ]}
      whyUsTitle="De ce să alegi Website Factory pentru startup-ul tău din Cluj?"
      whyUsDescription={
        <>
          Cu peste <strong className="text-foreground">40 de proiecte finalizate</strong> pentru startup-uri și companii tech din Cluj-Napoca, înțelegem perfect dinamica ecosistemului local. Colaborăm cu acceleratoare (Innovation Labs, Cluj Innovation City), participăm la evenimente tech (Techsylvania, How to Web) și cunoaștem provocările startup-urilor românești. Oferim:{" "}
          <strong className="text-foreground">stack modern și scalabil</strong> (Next.js, React, TypeScript),{" "}
          <strong className="text-foreground">MVP rapid</strong> pentru validare piață (4-8 săptămâni), arhitectură pentru scalare de la 100 la 100,000+ utilizatori,{" "}
          <strong className="text-foreground">prețuri competitive</strong> și opțiuni de plată eșalonată, consultanță tehnică pentru alegerea stack-ului potrivit, și suport dedicat pentru dezvoltare continuă.
        </>
      }
      specialFeature={{
        icon: Zap,
        title: "Stack Modern & Scalabil pentru Startup-uri",
        description:
          "Folosim cele mai avansate tehnologii web pentru startup-uri tech din Cluj: Next.js 15 și React 19 pentru aplicații ultra-performante, TypeScript pentru cod type-safe și mentenabil, Node.js și Python pentru backend scalabil, PostgreSQL și MongoDB pentru database, și cloud infrastructure (AWS, Vercel, Supabase) pentru deployment instant și scalare automată. Perfect pentru startup-uri care au nevoie de time-to-market rapid, arhitectură scalabilă pentru creștere exponențială, și cod de calitate pentru atragerea investitorilor și dezvoltare viitoare.",
        iconColor: "brand",
      }}
      ctaText={
        <>
          Contactează-ne astăzi pentru o <strong className="text-foreground">consultanță tehnică gratuită</strong>{" "}
          și un <strong className="text-foreground">plan personalizat</strong> pentru startup-ul tău din Cluj-Napoca!
        </>
      }
    />
  )
}
