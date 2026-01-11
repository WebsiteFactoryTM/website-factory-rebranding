import type { Metadata } from "next"
import { BucharestHero } from "@/components/cities/bucharest-hero"
import { BucharestContent } from "@/components/cities/bucharest-content"
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

const cityName = "București"
const citySlug = "bucuresti"

export const metadata: Metadata = generatePageMetadata({
  title: `Creare Site București - Web Design București - Website Factory`,
  description: `Creare site București: servicii personalizate de web design, magazin online și optimizare SEO pentru vizibilitate locală și națională.`,
  path: `/creare-site-${citySlug}`,
  keywords: [
    "creare site bucuresti",
    "web design bucuresti",
    "agentie web bucuresti",
    "firma web design bucuresti",
    "creare website bucuresti",
    "site de prezentare bucuresti",
    "magazin online bucuresti",
    "SEO bucuresti",
    "SEO local bucuresti",
    "dezvoltare web bucuresti",
    "servicii web bucuresti",
    "web developer bucuresti",
    "design site bucuresti",
    "creare site web bucuresti",
    "agentie digitala bucuresti",
    "aplicatie web bucuresti",
    "site corporate bucuresti",
    "optimizare site bucuresti",
  ],
})

const bucharestFaqs = [
  {
    question: "Cât costă realizarea unui site web pentru o afacere din București?",
    answer:
      "Prețurile pentru servicii de creare site București variază în funcție de complexitate și cerințele afacerii tale. Un site de prezentare profesional pornește de la 450€, ideal pentru freelanceri, cabinete medicale, saloane, avocați și consultanți. Un site corporate multi-pagină cu design personalizat începe de la 650€, potrivit pentru firme medii și mari din București. Pentru magazine online, prețul pornește de la 1100€, incluzând integrări complete de plată online (card, transfer bancar), transport (FAN Courier, Cargus, Sameday), facturare electronică și panou admin intuitiv. Companiile din sectoarele IT, real estate, consultanță sau servicii premium beneficiază de soluții custom cu funcționalități avansate. Oferim consultanță gratuită pentru a stabili exact ce soluție se potrivește afacerii tale din București și bugetului disponibil.",
  },
  {
    question: "De ce să aleg o agenție de web design din România pentru proiectul meu din București?",
    answer:
      "Colaborarea cu o agenție web din România, cu experiență pe piața din București, aduce avantaje majore: înțelegem perfect piața locală și comportamentul consumatorilor români din capitală, cunoaștem specificul industriilor dominante în București (IT, real estate, servicii profesionale, retail), comunicăm în limba română fără bariere lingvistice și cultural, oferim suport tehnic în fusul orar local cu disponibilitate rapidă, avem experiență cu integrări locale esențiale (plăți online românești - Netopia, Euplatesc, sisteme de curierat autohton, facturare electronică conform legislației), și respectăm legislația GDPR și cerințele legale românești. Plus, prețurile noastre sunt competitive față de agențiile internaționale, fără a compromite calitatea. Lucrăm cu numeroase companii din București din diverse sectoare: IT, consultanță, medicină privată, imobiliare, servicii juridice.",
  },
  {
    question: "Aveți experiență cu website-uri pentru companii și startup-uri din București?",
    answer:
      "Da, avem o experiență vastă cu afaceri din București, de la startup-uri tech la corporații! Am realizat peste 50 de proiecte pentru companii din capitală: site-uri corporate pentru firme de consultanță, avocatură, contabilitate, site-uri pentru clinici medicale private și cabinete stomatologice, platforme eCommerce pentru retaileri și branduri locale, aplicații web pentru startup-uri tech și SaaS, site-uri pentru agenții imobiliare și dezvoltatori, portaluri pentru firme de recrutare și HR. Oferim soluții complete: design modern și profesional care reflectă brandul companiei, sisteme CRM și integrări cu software-uri business (ERP, facturare), optimizare SEO locală pentru termeni ca 'consultanță București', 'clinică privată București', 'apartamente noi București', integrare cu platforme de marketing (Google Ads, Facebook Ads, email marketing), și dashboard-uri analytics pentru monitorizare performanță. Înțelegem cerințele specifice ale pieței din București și livrăm soluții la standarde corporative.",
  },
  {
    question: "Cât durează procesul de creare a unui site web pentru o firmă din București?",
    answer:
      "Durata proiectelor de web design București variază astfel: Site simplu de prezentare (5-8 pagini): 1-2 săptămâni de la aprobare, ideal pentru freelanceri și firme mici. Site corporate (10-20 pagini): 3-4 săptămâni, incluzând secțiuni despre companie, servicii, portofoliu, blog. Site pentru clinică medicală cu programări online: 3-5 săptămâni, cu sistem de booking și integrare calendar. Magazin online (50-200 produse): 4-8 săptămâni, cu toate integrările necesare. Aplicație web custom sau platformă SaaS: 8-16 săptămâni, în funcție de complexitate. Pentru proiecte urgente oferim servicii express cu livrare accelerată. Procesul include: consultanță inițială și brief detaliat, research competiție și piață București, design personalizat (2-3 variante vizuale), dezvoltare și integrări tehnice, testare pe toate device-urile și browsere, training pentru administrare conținut, lansare și monitorizare performanță. Comunicăm transparent și oferim rapoarte săptămânale de progres.",
  },
  {
    question: "Cum funcționează SEO local București și cum mă ajută să fiu găsit pe Google?",
    answer:
      "SEO local București înseamnă optimizarea site-ului tău să apară în top pe Google când cineva caută servicii în zona București. Implementăm: optimizare pentru termeni locali relevanți ('creare site bucurești', 'avocat bucurești', 'clinică stomatologică bucurești', 'apartamente noi bucurești'), configurare și optimizare Google Business Profile cu locație precisă și recenzii, scheme structurate (JSON-LD) pentru afaceri locale și servicii, integrare Google Maps și optimizare pentru căutări cu hartă, optimizare pentru căutări mobile ('near me', 'în apropiere'), conținut localizat cu referințe la zone specifice (Centru Vechi, Pipera, Floreasca, Băneasa, Militari), link building local cu directoare românești și parteneriate locale, și rapoarte lunare de performanță cu poziții în Google. De exemplu, o clinică din zona Pipera va apărea în top când pacienții caută 'clinică medicală Pipera' sau 'stomatolog București Nord'. Pentru companii B2B, optimizăm pentru termeni specifici industriei: 'consultanță fiscală București', 'dezvoltator imobiliar București', 'firma IT București'.",
  },
  {
    question: "Ce tehnologii moderne folosiți pentru site-urile din București?",
    answer:
      "Folosim cele mai avansate tehnologii web pentru a livra site-uri rapide, sigure și scalabile: Next.js 15 și React pentru aplicații web ultra-performante și SEO-friendly, TypeScript pentru cod robust și mentenabil, WordPress/WooCommerce pentru magazine online și site-uri cu management ușor de conținut, Payload CMS pentru proiecte enterprise cu cerințe complexe, Tailwind CSS pentru design modern și responsive perfect, Node.js și Python pentru backend și API-uri, integrări cloud (AWS, Vercel, Cloudflare) pentru performanță maximă, și sisteme de plată online românești (Netopia Payments, Euplatesc, Stripe). Alegem stack-ul tehnologic potrivit în funcție de: obiectivele business-ului tău, bugetul disponibil, necesitatea de scalabilitate viitoare, și complexitatea funcționalităților dorite. Pentru startup-uri tech din București oferim consultanță tehnică pentru alegerea arhitecturii potrivite și dezvoltare MVP (Minimum Viable Product) pentru validare rapidă pe piață.",
  },
  {
    question: "Puteți integra sisteme CRM, ERP sau alte software-uri business?",
    answer:
      "Absolut! Oferim integrări complete cu sistemele software pe care le folosește deja compania ta: CRM-uri populare (Salesforce, HubSpot, Pipedrive, Zoho CRM) pentru sincronizare lead-uri și clienți, sisteme ERP și facturare (SAP, Oracle, SmartBill, Facturis, ObioSoft), platforme de email marketing (Mailchimp, SendGrid, ActiveCampaign), sisteme de ticketing și support (Zendesk, Freshdesk, Intercom), integrări cu Google Workspace și Microsoft 365, API-uri custom pentru conectare cu software-uri proprietare, și sisteme de business intelligence pentru raportare. Aceste integrări automatizează procesele business, elimină introducerea manuală a datelor, sincronizează informații în timp real între platforme, și oferă o vedere unitară asupra clienților și operațiunilor. Perfect pentru companii medii și mari din București care vor să eficientizeze operațiunile și să reducă erorile umane. Oferim și consultanță pentru optimizarea workflow-urilor digitale.",
  },
  {
    question: "Oferiți mentenanță și suport tehnic pentru site-uri web în București?",
    answer:
      "Da, oferim pachete complete de mentenanță și suport tehnic dedicat pentru clienții din București și toată România. Serviciile includ: actualizări regulate de conținut (texte, imagini, prețuri, produse noi), backup-uri zilnice automate cu stocare în cloud securizat, monitorizare 24/7 uptime și performanță (alertă imediată în caz de probleme), actualizări de securitate și patch-uri pentru WordPress/plugin-uri, optimizare continuă pentru viteză și Core Web Vitals, suport tehnic prioritar prin telefon/email/WhatsApp în program 9-18, rapoarte lunare de trafic, performanță SEO și conversii, asistență pentru campanii de marketing (landing pages, bannere, A/B testing), și intervenție rapidă în caz de probleme tehnice sau atacuri. Pentru companii din București cu site-uri critice pentru business (eCommerce, platforme SaaS, site-uri corporate mari), oferim SLA garantat și suport 24/7. Prețuri de la 49€/lună pentru mentenanță basic, până la pachete enterprise personalizate.",
  },
]

export default function CreareSiteBucurestiPage() {
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
              description: `Servicii profesionale de web design și creare site-uri în ${cityName}. Design modern pentru business, magazine online, aplicații web și site-uri corporate. Optimizare SEO locală pentru top poziții pe Google ${cityName}.`,
              url: `/creare-site-${citySlug}`,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(bucharestFaqs)),
        }}
      />

      <main>
        <BucharestHero />
        <CityServices cityName={cityName} />
        <Process />
        <FeaturedWork />
        <BucharestContent />
        <Testimonials />
        <CityBenefits cityName={cityName} />
        <CityFaq cityName={cityName} faqs={bucharestFaqs} />
        <CityCTA cityName={cityName} />
      </main>
    </>
  )
}
