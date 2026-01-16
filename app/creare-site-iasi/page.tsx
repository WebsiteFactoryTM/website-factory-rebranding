import type { Metadata } from "next"
import { IasiHero } from "@/components/cities/iasi-hero"
import { IasiContent } from "@/components/cities/iasi-content"
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

const cityName = "Iași"
const citySlug = "iasi"

export const metadata: Metadata = generatePageMetadata({
  title: `Creare Site Iași - Web Design Iași`,
  description: `Creare site Iași: servicii personalizate de web design, magazin online și optimizare SEO pentru vizibilitate locală și națională.`,
  path: `/creare-site-${citySlug}`,
  keywords: [
    "creare site iasi",
    "web design iasi",
    "creare site iasi",
    "web design iasi",
    "agentie web iasi",
    "firma web design iasi",
    "creare website iasi",
    "site clinica medicala iasi",
    "magazin online iasi",
    "SEO iasi",
    "SEO local iasi",
    "dezvoltare web iasi",
    "web design moldova",
    "site prezentare iasi",
    "aplicatie web iasi",
    "design site iasi",
    "web developer iasi",
  ],
})

const iasiFaqs = [
  {
    question: "Cât costă realizarea unui site web pentru o afacere sau instituție din Iași?",
    answer:
      "Prețurile pentru servicii de creare site Iași variază în funcție de complexitate și tipul afacerii. Un site de prezentare profesional pornește de la 450€, ideal pentru cabinete medicale, avocați, consultanți, freelanceri și firme mici. Un site corporate multi-pagină cu design personalizat începe de la 650€, potrivit pentru companii medii din Iași. Pentru magazine online, prețul pornește de la 1100€, incluzând integrări complete de plată și transport. Site-uri pentru clinici medicale private cu programări online: 800-1500€, incluzând sistem de management pacienți și calendar medici. Site-uri pentru instituții educaționale și culturale (universități, muzee, teatre): 1000-2500€, cu funcționalități specifice (evenimente, publicații, galerii). Aplicații web custom: 2000-5000€, pentru proiecte cu cerințe complexe. Pentru instituțiile de învățământ și culturale din Iași oferim prețuri speciale și posibilități de parteneriat. Oferim consultanță gratuită pentru a stabili exact ce soluție se potrivește afacerii sau instituției tale din Moldova.",
  },
  {
    question: "De ce să aleg o agenție de web design din România pentru proiectul meu din Iași?",
    answer:
      "Colaborarea cu o agenție web din România, cu experiență pe piața din Iași și Moldova, aduce avantaje majore: înțelegem perfect cultura și mentalitatea locală din Moldova, cunoaștem specificul afacerilor și instituțiilor din Iași (medicină privată, educație, cultură, business local), comunicăm în limba română fără bariere lingvistice, oferim suport tehnic în fusul orar local cu disponibilitate rapidă, avem experiență cu integrări locale esențiale (plăți online românești, facturare electronică, legislație GDPR), și înțelegem provocările specifice pieței moldovenești. Plus, prețurile noastre sunt competitive și transparente, fără costuri ascunse. Am lucrat cu numeroase afaceri și instituții din Iași: clinici medicale și cabinete stomatologice, firme de consultanță și servicii profesionale, magazine online și retaileri locali, instituții culturale și educaționale, restaurante și afaceri HoReCa. Înțelegem provocările specifice: competiția locală intensă, atragerea clienților din întreaga regiune Moldova (Suceava, Bacău, Piatra Neamț, Roman, Botoșani), și promovarea valorilor culturale și academice specifice Iașului.",
  },
  {
    question: "Aveți experiență cu site-uri pentru clinici medicale și cabinete din Iași?",
    answer:
      "Da, avem o experiență vastă cu afaceri din domeniul medical din Iași, unul dintre cele mai importante centre medicale din Moldova! Am realizat peste 35 de proiecte pentru: clinici medicale private și centre de diagnostic, cabinete stomatologice și ortodonție, cabinete medicină de familie și specialități (cardiologie, dermatologie, pediatrie), laboratoare de analize medicale, centre de kinetoterapie și recuperare medicală, și farmacii și magazine online cu produse medicale. Oferim soluții complete specifice pentru domeniul medical: site-uri moderne și profesionale care inspiră încredere, sistem de programări online cu calendar medici și specialități, prezentare detaliată servicii medicale și echipă medicală, integrare cu platforme de telemedicină (opțional), optimizare SEO pentru termeni ca 'stomatolog iași', 'clinică medicală iași centru', 'dermatolog iași', galerii foto cabinet și echipamente medicale, secțiuni cu articole medicale și sfaturi pentru pacienți, și conformitate GDPR pentru protecția datelor pacienților. Site-urile noastre ajută clinicile să crească numărul de programări cu 40-60% și să-și consolideze reputația online. Perfect pentru medici și clinici care vor să atragă pacienți din Iași și întreaga regiune Moldova.",
  },
  {
    question: "Cât durează procesul de creare a unui site web pentru o companie sau instituție din Iași?",
    answer:
      "Durata proiectelor de web design Iași variază astfel: Site simplu de prezentare (5-8 pagini): 1-2 săptămâni de la aprobare, ideal pentru cabinete medicale, avocați, consultanți. Site corporate pentru companii medii: 3-4 săptămâni, incluzând secțiuni despre companie, servicii, portofoliu, blog. Site pentru clinică medicală cu programări: 3-5 săptămâni, cu sistem de booking și prezentare medici. Magazin online (50-200 produse): 4-8 săptămâni, cu toate integrările necesare. Site pentru instituții educaționale/culturale: 5-10 săptămâni, în funcție de complexitate (evenimente, publicații, galerii). Aplicație web sau platformă custom: 8-16 săptămâni. Pentru proiecte urgente oferim servicii express cu livrare accelerată. Procesul include: consultanță inițială și brief detaliat, research competiție și piață Iași/Moldova, design personalizat (2-3 variante vizuale), dezvoltare și integrări tehnice, testare pe toate device-urile și browsere, training pentru administrare conținut, lansare și monitorizare performanță. Comunicăm transparent și oferim rapoarte săptămânale de progres. Pentru instituții mari (universități, spitale) procesul poate dura mai mult datorită cerințelor specifice și aprobărilor necesare.",
  },
  {
    question: "Cum funcționează SEO local Iași pentru afaceri și servicii medicale?",
    answer:
      "SEO local Iași înseamnă optimizarea site-ului tău să apară în top pe Google când cineva caută servicii în zona Iași și Moldova. Implementăm: optimizare pentru termeni locali relevanți ('stomatolog iași', 'clinică medicală iași', 'avocat iași', 'magazin online iași', 'restaurant iași centru'), configurare și optimizare Google Business Profile cu locație precisă și recenzii, scheme structurate (JSON-LD) pentru afaceri locale și servicii medicale, integrare Google Maps și optimizare pentru căutări cu hartă, optimizare pentru căutări mobile ('clinică aproape', 'stomatolog near me'), conținut localizat cu referințe la zone specifice (Centru, Păcurari, Copou, Nicolina, Tatarași, Tudor Vladimirescu), link building local cu directoare românești și medicale, și rapoarte lunare de performanță cu poziții în Google. De exemplu, o clinică stomatologică din zona Copou va apărea în top când pacienții caută 'stomatolog iași copou', 'cabinet stomatologic iași centru' sau 'ortodont iași'. Pentru magazine online optimizăm pentru 'magazin online iași', 'cumpără [produs] iași'. Pentru restaurante: 'restaurant iași centru', 'terasă iași'. SEO local este crucial pentru afaceri din Iași care deservesc clienți din întreaga regiune Moldova (Suceava, Bacău, Piatra Neamț, Vaslui, Botoșani).",
  },
  {
    question: "Puteți crea site-uri pentru instituții culturale, educaționale și universități din Iași?",
    answer:
      "Absolut! Iași fiind capitala culturală și universitară a Moldovei, avem experiență solidă cu instituții educaționale și culturale. Am lucrat cu: universități și facultăți (prezentare programe de studiu, admitere, cercetare), licee și școli private (prezentare instituție, activități, rezultate), muzee și centre culturale (colecții virtuale, evenimente, expoziții), teatre și instituții artistice (program spectacole, bilete online, galerii foto), biblioteci și centre de documentare, și ONG-uri și fundații culturale. Oferim soluții complete: design elegant și profesional care reflectă prestigiul instituției, arhitectură informațională complexă pentru conținut vast, sistem de management evenimente culturale și educaționale, galerii foto și video pentru expoziții și activități, secțiuni pentru publicații științifice și articole, integrare cu platforme de ticketing pentru evenimente, prezentare echipă (profesori, cercetători, artiști), optimizare pentru studenți și cercetători (interfață intuitivă), și conformitate cu standardele academice și culturale. Perfect pentru instituții din Iași care vor să-și promoveze valorile și activitățile la nivel național și internațional. Site-urile pentru educație pot include și portaluri pentru studenți, materiale de curs, și platforme de e-learning.",
  },
  {
    question: "Lucrați cu afaceri din toată regiunea Moldova (Suceava, Bacău, Piatra Neamț)?",
    answer:
      "Da, deși ne concentrăm pe Iași, lucrăm cu clienți din întreaga regiune Moldova și din toată România. Avem experiență cu proiecte din: Iași și zona metropolitană (Târgu Frumos, Podu Iloaiei, Hârlău), Suceava și zona Bucovinei (Rădăuți, Fălticeni, Câmpulung Moldovenesc, Vatra Dornei), Bacău și județele limitrofe (Onești, Moinești, Comănești), Piatra Neamț și Neamț (Târgu Neamț, Bicaz, Roznov), Roman, Botoșani, Vaslui, și alte orașe din Moldova. Colaborăm eficient la distanță folosind: videoconferințe pentru briefing și prezentări (Zoom, Google Meet), platforme de project management pentru tracking progres (Trello, Asana), comunicare continuă prin email, telefon, WhatsApp, partajare și aprobare design-uri online, și deplasări la locație când e necesar (pentru fotografii, întâlniri importante). Pentru instituții și companii mari din Moldova oferim și întâlniri față-în-față la sediul lor. Înțelegem specificul fiecărei zone: turismul din Bucovina (Suceava), industria din Bacău, cultura și educația din Iași. Oferim prețuri competitive și servicii de calitate pentru toată regiunea Moldova.",
  },
  {
    question: "Oferiți mentenanță și suport tehnic pentru afaceri și instituții din Iași?",
    answer:
      "Da, oferim pachete complete de mentenanță și suport tehnic dedicat pentru clienții din Iași și Moldova. Serviciile includ: Mentenanță Tehnică: monitorizare 24/7 uptime și performanță cu alertă instant în caz de probleme, backup-uri zilnice automate cu stocare în cloud securizat, actualizări de securitate și patch-uri pentru WordPress/plugin-uri, optimizare continuă pentru viteză și Core Web Vitals, și fix-uri rapide pentru bug-uri și probleme tehnice. Suport pentru Conținut: actualizări regulate de conținut (texte, imagii, prețuri, servicii noi), adăugare articole pe blog și secțiuni noi, actualizare galerii foto și prezentări, și modificări de design minor. Suport Specializat: pentru clinici medicale - actualizare program medici, servicii medicale noi, articole medicale, pentru instituții culturale - management evenimente, expoziții, spectacole, publicații, pentru magazine online - adăugare produse noi, campanii promoționale, integrări noi. Analytics & SEO: rapoarte lunare de trafic și performanță SEO, recomandări pentru optimizare conversii, ajustări SEO pentru menținere poziții top, și tracking KPI-uri business. Perfect pentru clinici, instituții culturale, companii și organizații din Iași care au nevoie de un partener digital de încredere pe termen lung. Prețuri de la 49€/lună pentru mentenanță basic, până la pachete enterprise personalizate.",
  },
]

export default function CreareSiteIasiPage() {
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
              description: `Servicii profesionale de web design și creare site-uri în ${cityName}. Design modern pentru clinici medicale, afaceri locale, educație și cultură. Optimizare SEO locală pentru top poziții pe Google ${cityName} și Moldova.`,
              url: `/creare-site-${citySlug}`,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(iasiFaqs)),
        }}
      />

      <main>
        <IasiHero />
        <CityServices cityName={cityName} />
        <Process />
        <FeaturedWork />
        <IasiContent />
        <Testimonials />
        <CityBenefits cityName={cityName} />
        <CityFaq cityName={cityName} faqs={iasiFaqs} />
        <CityCTA cityName={cityName} />
      </main>
    </>
  )
}
