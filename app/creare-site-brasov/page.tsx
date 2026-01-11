import type { Metadata } from "next"
import { BrasovHero } from "@/components/cities/brasov-hero"
import { BrasovContent } from "@/components/cities/brasov-content"
import { CityServices } from "@/components/cities/city-services"
import { CityBenefits } from "@/components/cities/city-benefits"
import { CityFaq } from "@/components/cities/city-faq"
import { CityCTA } from "@/components/cities/city-cta"
import { FeaturedWork } from "@/components/home/featured-work"
import { Testimonials } from "@/components/home/testimonials"
import { Process } from "@/components/home/process"
import {
  generatePageMetadata,
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateServiceSchema,
} from "@/lib/seo"

const cityName = "Brașov"
const citySlug = "brasov"

export const metadata: Metadata = generatePageMetadata({
  title: `Creare Site Brașov - Web Design Brașov - Website Factory`,
  description: `Creare site Brașov: servicii personalizate de web design, magazin online și optimizare SEO pentru vizibilitate locală și națională.`,
  path: `/creare-site-${citySlug}`,
  keywords: [
    "creare site brasov",
    "web design brasov",
    "agentie web brasov",
    "firma web design brasov",
    "creare website brasov",
    "site turism brasov",
    "site pensiune brasov",
    "magazin online brasov",
    "SEO brasov",
    "SEO local brasov",
    "site de prezentare brasov",
    "dezvoltare web brasov",
    "site restaurant brasov",
    "site horeca brasov",
    "web design transilvania",
    "creare site web brasov",
    "web developer brasov",
    "design site brasov",
  ],
})

const brasovFaqs = [
  {
    question: "Cât costă realizarea unui site web pentru o afacere din Brașov?",
    answer:
      "Prețurile pentru servicii de creare site Brașov variază în funcție de complexitate și specificul afacerii. Un site de prezentare profesional pornește de la 450€, ideal pentru freelanceri și afaceri mici. Un site corporate multi-pagină cu design personalizat începe de la 650€. Pentru magazine online, prețul pornește de la 1100€, incluzând integrări de plată și transport. Pensiunile și restaurantele din Brașov beneficiază de pachete speciale cu sisteme de rezervări online, galerii foto optimizate și integrare Google Maps pentru atragerea turiștilor. Oferim și consultanță gratuită pentru a stabili exact ce soluție se potrivește afacerii tale din Brașov și zona Poiană Brașov.",
  },
  {
    question: "De ce să aleg o agenție de web design din România pentru proiectul meu din Brașov?",
    answer:
      "Colaborarea cu o agenție web din România, specializată pe piața din Brașov, aduce avantaje majore: înțelegem perfect piața locală și comportamentul consumatorilor români, cunoaștem specificul industriei turistice din Brașov și Transilvania, comunicăm în limba română fără bariere lingvistice, oferim suport tehnic în fusul orar local, și avem experiență cu integrări locale (plăți online românești, sisteme de curierat autohton, legislație GDPR). Plus, prețurile noastre sunt competitive față de agențiile internaționale, fără a compromite calitatea.",
  },
  {
    question: "Aveți experiență cu website-uri pentru turism, pensiuni și restaurante din Brașov?",
    answer:
      "Da, avem o experiență vastă cu afaceri din industria HoReCa și turism din Brașov! Am realizat peste 35 de proiecte pentru pensiuni din zona Poiană Brașov, restaurante din centrul vechi, cafenele, agenții de turism și ghiduri montane. Oferim soluții complete: sisteme avansate de rezervări online integrate cu calendare de disponibilitate, galerii foto profesionale care prezintă frumusețea locației și a zonei Brașov, optimizare SEO locală pentru termeni ca 'cazare brașov', 'pensiune poiana brasov', 'restaurant brasov centru', integrare cu platforme de recenzii (Google, Booking, TripAdvisor), și hărți interactive cu atracții turistice (Biserica Neagră, Tâmpa, Poiana Brașov). Site-urile noastre ajută pensiunile să crească rezervările directe și să reducă comisioanele către platforme terțe.",
  },
  {
    question: "Cât durează procesul de creare a unui site web pentru o firmă din Brașov?",
    answer:
      "Durata proiectelor de web design Brașov variază astfel: Site simplu de prezentare (5-8 pagini): 1-2 săptămâni de la aprobare. Site pentru pensiune/hotel cu rezervări: 3-5 săptămâni, incluzând testarea sistemului de booking. Site restaurant cu meniu digital și comenzi online: 2-4 săptămâni. Magazin online complet (50-100 produse): 4-8 săptămâni, cu integrări complete. Pentru proiecte urgente oferim servicii express cu livrare mai rapidă. Procesul include: consultanță inițială și brief, design personalizat (2-3 variante), dezvoltare și integrări, testare pe toate device-urile, training pentru administrare, lansare și monitorizare. Comunicăm transparent pe tot parcursul proiectului.",
  },
  {
    question: "Cum funcționează SEO local Brașov și cum mă ajută să fiu găsit pe Google?",
    answer:
      "SEO local Brașov înseamnă optimizarea site-ului tău să apară în top pe Google când cineva caută servicii în zona Brașov. Implementăm: optimizare pentru termeni locali ('creare site brașov', 'pensiune brasov', 'restaurant brasov centru'), configurare și optimizare Google Business Profile cu locație precisă, scheme structurate (JSON-LD) pentru afaceri locale, integrare Google Maps și recenzii Google, optimizare pentru căutări mobile ('near me', 'în apropiere'), conținut localizat cu referințe la zone specifice (Centru Vechi, Tâmpa, Poiana Brașov, Șcheii Brașovului), link building local cu directoare românești, și rapoarte lunare de performanță. De exemplu, o pensiune din Poiana Brașov va apărea în top când turiștii caută 'cazare poiana brasov' sau 'pensiune langa partie brasov'.",
  },
  {
    question: "Puteți integra un sistem de rezervări online pentru pensiunea mea din Brașov?",
    answer:
      "Absolut! Oferim sisteme complete de rezervări online, perfect pentru pensiuni, hoteluri și case de vacanță din zona Brașov și Poiana Brașov. Sistemul include: calendar live cu disponibilitate în timp real pentru camere, posibilitate de rezervare și plată online (card bancar, transfer bancar), management automat al prețurilor (sezon, weekend, sărbători), sistem de early booking și reduceri pentru grupuri, notificări automate prin email pentru tine și clienți, integrare cu channel managers pentru sincronizare cu Booking/Airbnb, panou admin intuitiv pentru gestionarea rezervărilor, rapoarte și statistici detaliate, și integrare cu facturare electronică. Acest sistem elimină dependența de platforme cu comisioane mari și îți crește rezervările directe cu până la 40%. Perfect pentru sezonul de schi la Poiana Brașov sau turism de vară.",
  },
  {
    question: "Site-ul meu va fi optimizat pentru turiști străini care vizitează Brașovul?",
    answer:
      "Da! Brașovul fiind o destinație turistică internațională majoră, site-urile noastre sunt pregătite pentru vizitatori din toată lumea. Oferim: versiuni multilingve complete (română, engleză, germană, franceză, maghiară etc.) cu traduceri profesionale, nu Google Translate automat, selector de limbă vizibil și ușor de utilizat, prețuri afișate în multiple valute (RON, EUR, USD), galerii foto profesionale care prezintă frumusețea Brașovului și Carpaților, informații despre obiective turistice din apropiere (Biserica Neagră, Castelul Bran, Tâmpa), instrucțiuni clare de acces din aeroport/gară, integrare cu Google Maps și Waze pentru navigație, sistem de plată online cu carduri internaționale, și optimizare SEO internațională pentru termeni în mai multe limbi. Perfect pentru atragerea turiștilor europeni și nu numai!",
  },
  {
    question: "Oferiți mentenanță și suport tehnic pentru site-uri web în Brașov?",
    answer:
      "Da, oferim pachete complete de mentenanță și suport tehnic dedicat pentru clienții din Brașov și zona Transilvaniei. Serviciile includ: actualizări regulate de conținut (prețuri camere, meniu restaurant, disponibilitate, evenimente), backup-uri zilnice automate cu stocare în cloud, monitorizare 24/7 uptime și performanță, actualizări de securitate și plugin-uri WordPress/WooCommerce, optimizare continuă pentru viteză și SEO, suport tehnic prioritar prin telefon/email/WhatsApp, rapoarte lunare de trafic și performanță SEO, adaptări sezoniere pentru afaceri turistice (bannere pentru sezon de schi, evenimente locale), și intervenție rapidă în caz de probleme. Pentru afaceri din turism și HoReCa care au nevoie de actualizări frecvente (meniu, evenimente, oferte speciale), mentenanța este esențială. Prețuri de la 49€/lună.",
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
          __html: JSON.stringify(
            generateServiceSchema({
              name: `Creare Site Web ${cityName}`,
              description: `Servicii profesionale de web design și creare site-uri în ${cityName}. Design modern pentru turism, HoReCa, pensiuni și afaceri locale. Optimizare SEO locală pentru top poziții pe Google ${cityName}.`,
              url: `/creare-site-${citySlug}`,
            }),
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
        <Process />
        <FeaturedWork />
        <BrasovContent />
        <Testimonials />
        <CityBenefits cityName={cityName} />
        <CityFaq cityName={cityName} faqs={brasovFaqs} />
        <CityCTA cityName={cityName} />
      </main>
    </>
  )
}
