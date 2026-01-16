import type { Metadata } from "next"
import { ConstantaHero } from "@/components/cities/constanta-hero"
import { ConstantaContent } from "@/components/cities/constanta-content"
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

const cityName = "Constanța"
const citySlug = "constanta"

export const metadata: Metadata = generatePageMetadata({
  title: `Creare Site Constanța - Web Design Constanța`,
  description: `Creare site Constanța: servicii personalizate de web design, magazin online și optimizare SEO pentru vizibilitate locală și națională.`,
  path: `/creare-site-${citySlug}`,
  keywords: [
    "creare site constanta",
    "web design constanta",
    "creare site constanța",
    "web design constanta",
    "agentie web constanta",
    "firma web design constanta",
    "creare website constanta",
    "site hotel constanta",
    "site pensiune litoral",
    "site restaurant constanta",
    "magazin online constanta",
    "SEO constanta",
    "SEO local litoral",
    "dezvoltare web litoral",
    "site turism constanta",
    "rezervari online hotel",
    "web design mamaia",
    "site cazare litoral",
  ],
})

const constantaFaqs = [
  {
    question: "Cât costă realizarea unui site web pentru o afacere turistică din Constanța?",
    answer:
      "Prețurile pentru servicii de creare site Constanța variază în funcție de complexitate și specificul industriei turistice. Un site de prezentare profesional pornește de la 450€, ideal pentru restaurante pe plajă, agenții de turism mici și servicii locale. Un site pentru hotel sau pensiune cu galerii foto și prezentare facilități începe de la 650€. Pentru site-uri cu sistem de rezervări online complet, prețul pornește de la 1100-1500€, incluzând: calendar disponibilitate camere, plăți online securizate, management prețuri sezoniere, notificări automate email/SMS, panou admin pentru gestionare rezervări, integrare cu Booking.com și Airbnb opțional. Pentru restaurante și cluburi de pe litoral oferim soluții cu meniu digital, comenzi online și integrare cu platforme de delivery. Pentru complexe turistice mari și hoteluri boutique: 2000-4000€, cu funcționalități avansate. Oferim și pachete speciale pentru afaceri sezoniere cu plată eșalonată. Consultanță gratuită pentru a stabili exact ce soluție se potrivește afacerii tale de pe litoral.",
  },
  {
    question: "De ce să aleg o agenție de web design pentru afacerea mea turistică din Constanța?",
    answer:
      "Colaborarea cu o agenție web specializată în turism litoral aduce avantaje majore pentru afaceri din Constanța: înțelegem perfect piața turistică din România și comportamentul turiștilor români și străini, cunoaștem specificul sezonalității litoralului românesc (iunie-septembrie), avem experiență cu integrări esențiale pentru turism (rezervări, plăți online, galerii foto), știm cum să optimizăm pentru căutări sezoniere de vârf pe Google, comunicăm în limba română și înțelegem cerințele legale locale, oferim suport rapid în perioada de sezon când ai nevoie cel mai mult. Plus, prețurile noastre sunt competitive și transparente, fără costuri ascunse. Am lucrat cu peste 40 de afaceri de pe litoral: hoteluri în Mamaia, pensiuni în Eforie, restaurante pe plajă în Costinești, agenții de turism, firme de transport maritim. Înțelegem provocările specifice: atragerea turiștilor în sezon, reducerea dependenței de platforme cu comisioane mari (Booking, Airbnb), și fidelizarea clienților pentru revenire.",
  },
  {
    question: "Aveți experiență cu site-uri pentru hoteluri, pensiuni și restaurante de pe litoral?",
    answer:
      "Da, avem o experiență vastă cu afaceri din industria HoReCa și turism de pe litoralul românesc! Am realizat peste 40 de proiecte pentru: hoteluri și hoteluri boutique din Mamaia, Eforie Nord, Neptun, pensiuni și vile de închiriat din zone rezidențiale Constanța, restaurante pe plajă și în stațiuni (Vama Veche, Costinești, Olimp), cluburi de plajă și beach bar-uri, agenții de turism și organizatori de evenimente, firme de transport maritim și servicii nautice. Oferim soluții complete specifice pentru turism litoral: sisteme avansate de rezervări online cu calendar disponibilitate, galerii foto profesionale cu imagini oceanice și facilități hotel, optimizare SEO pentru termeni ca 'hotel mamaia all inclusive', 'cazare litoral 2 mai', 'restaurant peste proaspat constanta', integrare Google Maps cu locație exactă și review-uri, website-uri multilingve pentru turiști străini (engleză, germană, franceză), și sisteme de early booking cu reduceri automate pentru rezervări timpurii. Site-urile noastre ajută hotelurile să crească rezervările directe cu 40-60% și să reducă comisioanele către platforme terțe.",
  },
  {
    question: "Cât durează procesul de creare a unui site web pentru un hotel sau pensiune din Constanța?",
    answer:
      "Durata proiectelor de web design Constanța pentru industria turistică variază astfel: Site simplu prezentare pensiune (galerie + contact): 1-2 săptămâni, ideal pentru lansare rapidă înaintea sezonului. Site hotel cu prezentare camere și facilități: 2-3 săptămâni, incluzând galerii foto profesionale. Site cu sistem rezervări online basic: 3-5 săptămâni, cu testare extensivă a procesului de booking. Site hotel complet cu rezervări avansate: 5-8 săptămâni, incluzând management sezonier prețuri și integrări. Site restaurant cu meniu digital și comenzi: 2-4 săptămâni. Pentru proiecte urgente (pre-sezon) oferim servicii express cu livrare accelerată. Procesul include: consultanță inițială și brief specific turism, ședință foto profesională la locație (opțional), design personalizat cu elemente marine/litorale, dezvoltare și integrare sistem rezervări, testare pe toate device-urile (foarte important pentru turism - 80% rezervări de pe mobil), training pentru administrare conținut și rezervări, lansare și monitorizare în primele 2 săptămâni. Recomandăm să începem proiectul în martie-aprilie pentru lansare optimă înainte de sezonul estival.",
  },
  {
    question: "Cum funcționează SEO local Constanța pentru hoteluri și afaceri turistice?",
    answer:
      "SEO local pentru litoral este crucial pentru afacerile turistice care vor să fie găsite de turiști pe Google. Implementăm: optimizare pentru termeni locali de volum mare ('hotel mamaia', 'cazare constanta', 'pensiune eforie nord', 'restaurant litoral', 'all inclusive mamaia'), SEO sezonier cu pregătire pentru termeni de vârf în mai-iunie ('cazare litoral 2026', 'oferte vacanta mare'), configurare și optimizare Google Business Profile cu locație precisă, poze și review-uri, scheme structurate pentru hoteluri (prețuri, rating, facilități), optimizare pentru căutări mobile ('hotel near me', 'restaurant aproape'), conținut localizat cu referințe la plaje specifice (Plaja Modern, Plaja Reyna, Plaja din Vama Veche), link building cu directoare turistice și bloguri de travel, și integrare review-uri Google, Booking, TripAdvisor. De exemplu, un hotel din Mamaia va apărea în top când turiștii caută 'hotel mamaia cu piscina', 'cazare all inclusive litoral' sau 'hotel 4 stele constanta'. Pentru restaurante optimizăm pentru 'restaurant peste proaspat constanta', 'terasă plajă mamaia', 'restaurant romantic litoral'. Rezultate: hotelurile noastre apar în top 3 pentru termeni cu 5000-20000 căutări/lună în sezon.",
  },
  {
    question: "Puteți integra un sistem complet de rezervări online pentru hotelul meu?",
    answer:
      "Absolut! Oferim sisteme complete de rezervări online, perfect pentru hoteluri, pensiuni și vile de închiriat de pe litoral. Sistemul include: calendar live cu disponibilitate în timp real pentru toate tipele de camere, rezervare și plată online securizată (card, transfer, voucher), management automat prețuri sezoniere (preț diferit pentru weekend, sărbători, iulie-august), sistem de early booking cu reduceri automate pentru rezervări 30/60/90 zile înainte, oferte speciale pentru cazare prelungită (5-7 nopți), notificări automate prin email și SMS pentru client și administrator, panou admin intuitiv pentru gestionarea rezervărilor și camere disponibile, sincronizare cu channel managers pentru integrare cu Booking/Airbnb, rapoarte detaliate și statistici ocupare, și integrare cu facturare electronică. Beneficii concrete: elimini dependența de platforme cu comisioane de 15-20%, crești rezervările directe cu până la 60%, ai control complet asupra prețurilor și politicilor, și oferi experiență superioară clienților tăi. Perfect pentru sezonul de vară când cererile sunt mari și vrei să maximizezi profitul reducând comisioanele către intermediari.",
  },
  {
    question: "Site-ul pentru hotel va fi optimizat pentru turiști străini?",
    answer:
      "Da! Litoralul românesc atrage mii de turiști străini anual, iar site-urile noastre sunt pregătite pentru audiență internațională. Oferim: website-uri multilingve complete (română, engleză, germană, franceză, italiană, rusă) cu traduceri profesionale adaptate turismului, selector de limbă vizibil și ușor de utilizat, prețuri afișate în multiple valute (RON, EUR, USD) cu conversie automată, descrieri detaliate ale camerelor, facilităților și atracțiilor locale în fiecare limbă, galerii foto profesionale care vorbesc universal (ocean, plajă, facilități moderne), informații clare despre acces: distanță de la Aeroportul Mihail Kogălniceanu, gară Constanța, cum se ajunge, integrare Google Maps multilingv cu instrucțiuni de navigare, sistem de plată online cu carduri internaționale (Visa, Mastercard, PayPal), și optimizare SEO internațională pentru termeni în mai multe limbi ('hotel romania black sea', 'resort constanta beach', 'mamaia hotels'). Perfect pentru atragerea turiștilor din Germania, Israel, Franța, Italia și alte țări care vizitează litoralul românesc. Site-ul va avea și informații despre atracții locale: Cazinoul din Constanța, Acvariul, Delfinariul, Plaja Modern.",
  },
  {
    question: "Oferiți mentenanță și suport pentru afaceri sezoniere de pe litoral?",
    answer:
      "Da, oferim pachete flexibile de mentenanță și suport adaptate specificului afacerilor sezoniere de pe litoral. Serviciile includ: Suport Sezonier Intens (Mai-Septembrie): monitorizare 24/7 și intervenție rapidă în sezon de vârf, actualizări zilnice disponibilitate camere și prețuri, optimizare continuă pentru conversii în perioada cu trafic mare, suport prioritar prin telefon/WhatsApp pentru probleme urgente, și backup-uri zilnice în sezonul cu rezervări multe. Mentenanță Off-Season (Octombrie-Aprilie): actualizări de securitate și mentenanță preventivă, pregătire site pentru sezonul următor (content refresh, oferte early booking), optimizare SEO pentru termeni de sezon viitor, și planificare campanii de marketing pentru pre-sezon. Servicii Continue: actualizări conținut (galerii foto, facilități noi, oferte speciale), rapoarte lunare de trafic și rezervări, recomandări pentru optimizare conversii, și integrare cu campanii Google Ads și Facebook pentru sezon. Pentru hoteluri și pensiuni de pe litoral cu activitate sezonieră, mentenanța este esențială pentru a maximiza rezervările în cele 3-4 luni cheie. Prețuri de la 99€/lună cu pachete speciale pentru sezon.",
  },
]

export default function CreareSiteConstantaPage() {
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
              description: `Servicii profesionale de web design și creare site-uri în ${cityName}. Design modern pentru hoteluri, pensiuni, restaurante litoral. Sisteme de rezervări online și optimizare SEO locală pentru top poziții pe Google litoral.`,
              url: `/creare-site-${citySlug}`,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(constantaFaqs)),
        }}
      />

      <main>
        <ConstantaHero />
        <CityServices cityName={cityName} />
        <Process />
        <FeaturedWork />
        <ConstantaContent />
        <Testimonials />
        <CityBenefits cityName={cityName} />
        <CityFaq cityName={cityName} faqs={constantaFaqs} />
        <CityCTA cityName={cityName} />
      </main>
    </>
  )
}
