"use client"

import { GraduationCap, Stethoscope, Building2 } from "lucide-react"
import { CityContent } from "./city-content"

export function IasiContent() {
  return (
    <CityContent
      cityName="Iași"
      heroTitle="De ce ai nevoie de un site web profesional pentru afacerea ta din Iași?"
      heroDescription={
        <>
          În 2026, <strong className="text-foreground">Iași</strong> este{" "}
          <strong className="text-foreground">capitala culturală și universitară</strong> a României, cu peste 400,000 de locuitori și cel mai important hub educațional din Moldova. Cu peste 100,000 de studenți și un ecosistem de afaceri în creștere accelerată, competiția pentru clienți este intensă. Un{" "}
          <strong className="text-foreground">site web optimizat SEO</strong> te ajută să fii găsit pe{" "}
          <strong className="text-foreground">Google</strong> când potențialii tăi clienți caută servicii medicale, educaționale sau business în Iași și Moldova.
        </>
      }
      industries={[
        {
          icon: Stethoscope,
          title: "Medicină & Sănătate",
          description:
            "Site-uri pentru clinici medicale Iași, cabinete stomatologice, centre de diagnostic, farmacii. Programări online și prezentare servicii medicale.",
          color: "from-cyan-500/20 to-blue-500/20",
          iconColor: "cyan-500",
        },
        {
          icon: GraduationCap,
          title: "Educație & Cultură",
          description:
            "Site-uri educaționale Iași: universități, licee private, muzee, teatre, instituții culturale. Platforme moderne pentru promovare și evenimente.",
          color: "from-brand/20 to-brand-light/20",
          iconColor: "brand",
        },
      ]}
      servicesTitle="Servicii de Web Design și Creare Site-uri în Iași"
      servicesDescription={
        <>
          <strong className="text-foreground">Website Factory</strong> oferă servicii complete de{" "}
          <strong className="text-foreground">creare site-uri web în Iași</strong>, adaptate nevoilor diverse ale pieței moldovenești. Fie că ai o clinică medicală în{" "}
          <strong className="text-foreground">zona Copou</strong>, o firmă de consultanță în{" "}
          <strong className="text-foreground">Centru</strong>, un magazin online sau o instituție culturală, avem experiența și expertiza necesară să îți creăm soluția digitală perfectă.
        </>
      }
      servicesList={[
        {
          title: "Site-uri Clinici Medicale",
          description: "Cu programări online și prezentare medici",
        },
        {
          title: "Site-uri Corporate",
          description: "Pentru companii medii și mari din Iași",
        },
        {
          title: "Site-uri Educaționale",
          description: "Pentru universități și școli private",
        },
        {
          title: "Magazine Online",
          description: "Soluții eCommerce pentru retaileri locali",
        },
      ]}
      seoTitle="SEO Local Iași - Domină Rezultatele Google în Moldova"
      seoDescription={
        <>
          <strong className="text-foreground">SEO local</strong> este crucial pentru afacerile din Iași. Cu mii de companii, clinici medicale și instituții care concurează pentru aceiași clienți, trebuie să fii vizibil pe Google când potențialii tăi clienți caută servicii. Optimizăm site-ul tău pentru termeni relevanți precum "stomatolog iași", "clinică medicală iași centru", "avocat iași", "magazin online iași" sau orice alt termen specific industriei tale și zonei în care activezi (Copou, Păcurari, Nicolina, Centru, Tatarași).
        </>
      }
      seoBenefits={[
        "Vizibilitate maximă pe căutări locale Google Iași & Moldova",
        "Mai multe programări/rezervări pentru clinici medicale",
        "Poziționare pe Google Maps pentru 'near me' searches",
        "Atragere clienți din toată regiunea Moldova",
      ]}
      whyUsTitle="Website Factory – alegerea potrivită pentru proiecte digitale serioase în Iași?"
      whyUsDescription={
        <>
          Cu peste <strong className="text-foreground">150 de proiecte finalizate</strong> pentru clienții noștri, înțelegem perfect dinamica pieței locale și cerințele specifice. Oferim:{" "}
          <strong className="text-foreground">design modern la standarde europene</strong>,{" "}
          <strong className="text-foreground">optimizare SEO avansată</strong> pentru piața competitivă din Iași, integrări complete (programări medicale, rezervări, plăți online),{" "}
          <strong className="text-foreground">livrare rapidă</strong> (1-8 săptămâni), prețuri transparente și competitive, suport tehnic dedicat în limba română, și experiență cu cerințele specifice ale afacerilor, clinicilor medicale și instituțiilor culturale/educaționale din Iași și Moldova.
        </>
      }
      specialFeature={{
        icon: Building2,
        title: "Specializare Medicină & Educație",
        description:
          "Iași fiind cel mai important centru medical și universitar din Moldova, avem experiență vastă cu site-uri pentru clinici medicale, cabinete stomatologice, centre de diagnostic, laboratoare de analize, dar și universități, licee private, muzee, teatre și instituții culturale. Oferim soluții care respectă standardele profesionale ale acestor domenii: design care inspiră încredere pentru domeniul medical, sisteme de programări online pentru clinici, platforme educaționale și de evenimente pentru instituții culturale, și conformitate GDPR pentru protecția datelor sensibile. Perfect pentru profesioniști și instituții din Iași care vor să își consolideze prezența digitală și reputația online.",
        iconColor: "cyan-500",
      }}
      ctaText={
        <>
          Contactează-ne astăzi pentru o <strong className="text-foreground">consultanță gratuită</strong> și un{" "}
          <strong className="text-foreground">proiect personalizat</strong> pentru afacerea sau instituția ta din Iași și Moldova!
        </>
      }
    />
  )
}
