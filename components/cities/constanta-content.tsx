"use client"

import { Waves, UtensilsCrossed, Ship } from "lucide-react"
import { CityContent } from "./city-content"

export function ConstantaContent() {
  return (
    <CityContent
      cityName="Constanța"
      heroTitle="De ce ai nevoie de un site web profesional pentru afacerea ta turistică din Constanța?"
      heroDescription={
        <>
          În 2026, <strong className="text-foreground">Constanța și litoralul românesc</strong> atrag peste 3 milioane de turiști anual, cu peste <strong className="text-foreground">80% din rezervări</strong>{" "}
          realizate online. Majoritatea turiștilor caută pe <strong className="text-foreground">Google</strong>{" "}
          termeni precum "hotel mamaia", "cazare litoral" sau "restaurant pe plajă constanța" înainte să rezerve. Un <strong className="text-foreground">site web optimizat SEO</strong> cu{" "}
          <strong className="text-foreground">sistem de rezervări online</strong> te ajută să fii găsit de turiști și să crești rezervările directe, reducând comisioanele către Booking.com și Airbnb.
        </>
      }
      industries={[
        {
          icon: Waves,
          title: "Turism & Cazare Litoral",
          description:
            "Site-uri pentru hoteluri Constanța, pensiuni Mamaia, vile de închiriat, complexe all-inclusive. Sisteme de rezervări și galerii foto pentru atragerea turiștilor.",
          color: "from-cyan-500/20 to-blue-500/20",
          iconColor: "cyan-500",
        },
        {
          icon: UtensilsCrossed,
          title: "HoReCa & Restaurante Plajă",
          description:
            "Restaurante litoral, cluburi de plajă, beach bar-uri, terase pe faleza Cazinoul. Meniu digital, comenzi online și integrare delivery.",
          color: "from-amber-500/20 to-orange-500/20",
          iconColor: "amber-500",
        },
      ]}
      servicesTitle="Servicii de Web Design și Creare Site-uri în Constanța"
      servicesDescription={
        <>
          <strong className="text-foreground">Website Factory</strong> oferă servicii complete de{" "}
          <strong className="text-foreground">creare site-uri web în Constanța</strong>, specializate pentru industria turistică de pe litoral. Fie că ai un hotel în{" "}
          <strong className="text-foreground">Mamaia</strong>, o pensiune în{" "}
          <strong className="text-foreground">Eforie Nord</strong>, un restaurant pe plaja din{" "}
          <strong className="text-foreground">Vama Veche</strong>, sau o agenție de turism, avem experiența și soluțiile potrivite pentru a-ți maximiza rezervările și vizibilitatea online.
        </>
      }
      servicesList={[
        {
          title: "Site-uri Hoteluri",
          description: "Cu rezervări online și galerii foto",
        },
        {
          title: "Site-uri Pensiuni",
          description: "Pentru vile și cazare familie",
        },
        {
          title: "Site-uri Restaurante",
          description: "Meniu digital și comenzi online",
        },
        {
          title: "Agenții Turism",
          description: "Pentru organizatori evenimente litoral",
        },
      ]}
      seoTitle="SEO Local Constanța - Domină Căutările pentru Litoral"
      seoDescription={
        <>
          <strong className="text-foreground">SEO local pentru litoral</strong> este crucial pentru hoteluri și afaceri turistice. În sezon (iunie-septembrie), termeni precum "cazare mamaia", "hotel constanta all inclusive", "pensiune eforie nord" sau "restaurant litoral" sunt căutați de zeci de mii de ori pe Google. Optimizăm site-ul tău să apară în top când turiștii caută, crescând rezervările directe cu 40-60% și reducând dependența de platforme cu comisioane mari.
        </>
      }
      seoBenefits={[
        "Vizibilitate maximă pe Google în sezonul de vârf",
        "Mai multe rezervări directe, mai puține comisioane",
        "Poziționare pe Google Maps pentru 'hotel near me'",
        "Atragere turiști români și străini",
      ]}
      whyUsTitle="Website Factory – alegerea potrivită pentru proiecte digitale serioase în Constanța?"
      whyUsDescription={
        <>
          Cu peste <strong className="text-foreground">150 de proiecte finalizate</strong> pentru clienții noștri, înțelegem perfect dinamica turismului sezonier și cerințele industriei HoReCa. Oferim: <strong className="text-foreground">design modern și responsive</strong> optimizat pentru mobile (80% din rezervări), <strong className="text-foreground">sisteme complete de rezervări</strong>{" "}
          cu calendar și plăți online, <strong className="text-foreground">optimizare SEO sezonieră</strong>{" "}
          pentru termeni de vârf, galerii foto profesionale care vând experiența litoralului,{" "}
          <strong className="text-foreground">website-uri multilingve</strong> pentru turiști străini, integrări cu Booking.com și Airbnb (opțional), și suport dedicat în sezonul de vârf când ai nevoie cel mai mult.
        </>
      }
      specialFeature={{
        icon: Ship,
        title: "Suport Sezonier Dedicat",
        description:
          "Înțelegem specificul afacerilor sezoniere de pe litoral. Oferim suport intensiv în perioada mai-septembrie când traficul și rezervările sunt la maxim, actualizări rapide de disponibilitate și prețuri, și monitorizare 24/7 pentru a te asigura că nu pierzi nicio rezervare. În off-season pregătim site-ul pentru sezonul următor și optimizăm pentru early booking. Perfect pentru hoteluri și pensiuni care vor să maximizeze profitul în cele 3-4 luni cheie ale anului.",
        iconColor: "amber-500",
      }}
      ctaText={
        <>
          Contactează-ne astăzi pentru o <strong className="text-foreground">consultanță gratuită</strong> și un{" "}
          <strong className="text-foreground">proiect personalizat</strong> pentru afacerea ta de pe litoralul românesc!
        </>
      }
    />
  )
}
