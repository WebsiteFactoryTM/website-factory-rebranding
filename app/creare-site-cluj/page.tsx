import type { Metadata } from "next"
import { ClujHero } from "@/components/cities/cluj-hero"
import { ClujContent } from "@/components/cities/cluj-content"
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

const cityName = "Cluj-Napoca"
const citySlug = "cluj"

export const metadata: Metadata = generatePageMetadata({
  title: `Creare Site Cluj - Web Design Cluj-Napoca - Website Factory`,
  description: `Creare site Cluj: servicii personalizate de web design, magazin online și optimizare SEO pentru vizibilitate locală și națională.`,
  path: `/creare-site-${citySlug}`,
  keywords: [
    "creare site cluj",
    "web design cluj",
    "creare site cluj-napoca",
    "web design cluj-napoca",
    "agentie web cluj",
    "firma web design cluj",
    "creare website cluj",
    "aplicatie web cluj",
    "MVP cluj",
    "startup web cluj",
    "magazin online cluj",
    "SEO cluj",
    "SEO local cluj",
    "dezvoltare web cluj",
    "site de prezentare cluj",
    "web developer cluj",
    "design site cluj",
    "agentie digitala cluj",
  ],
})

const clujFaqs = [
  {
    question: "Cât costă realizarea unui site web sau aplicație pentru un startup din Cluj-Napoca?",
    answer:
      "Prețurile pentru servicii de creare site Cluj-Napoca variază în funcție de complexitate și obiectivele startup-ului. Un site de prezentare profesional pornește de la 450€, ideal pentru freelanceri tech și consultanți. Un site corporate cu design modern începe de la 650€, potrivit pentru companii IT și SaaS. Pentru magazine online, prețul pornește de la 1100€, cu integrări complete. MVP (Minimum Viable Product) pentru startup-uri tech: 2500-5000€, incluzând design, dezvoltare, testare și deployment. Aplicații web custom și platforme SaaS: 5000-15000€, în funcție de complexitate și funcționalități. Pentru startup-uri din ecosistemul tech Cluj oferim pachete speciale: consultanță tehnică gratuită pentru alegerea stack-ului, arhitectură scalabilă pentru creștere rapidă, integrări cu API-uri și servicii cloud, și posibilitate de plată eșalonată pentru proiecte mari. Oferim consultanță gratuită pentru a stabili exact ce soluție se potrivește startup-ului tău și bugetului disponibil.",
  },
  {
    question: "De ce să aleg o agenție de web design din România pentru startup-ul meu din Cluj?",
    answer:
      "Colaborarea cu o agenție web din România, cu experiență în ecosistemul tech Cluj, aduce avantaje majore pentru startup-uri: înțelegem perfect piața tech din Cluj și cultura startup-urilor locale, cunoaștem investitorii, acceleratoarele și evenimentele din ecosistem (Cluj Innovation City, Innovation Labs, Techsylvania), comunicăm în limba română fără bariere și înțelegem contextul local, oferim prețuri competitive față de agențiile internaționale (30-50% mai ieftine), suntem în același fus orar pentru colaborare eficientă, avem experiență cu integrări locale (plăți online românești, facturare electronică), și înțelegem provocările specifice startup-urilor românești (fundraising, scalare, validare piață). Plus, putem oferi consultanță pentru aplicații la programe de finanțare (Start-up Nation, POC, fonduri europene) și conectare cu ecosistemul local de investitori și mentori. Lucrăm cu numeroase startup-uri tech din Cluj din diverse domenii: SaaS, fintech, edtech, healthtech, marketplace-uri.",
  },
  {
    question: "Aveți experiență cu startup-uri tech și companii IT din Cluj-Napoca?",
    answer:
      "Da, avem o experiență vastă cu startup-uri și companii tech din Cluj-Napoca, hub-ul IT al României! Am realizat peste 40 de proiecte pentru: startup-uri tech în fază early-stage (MVP-uri, landing pages, platforme beta), companii SaaS (dashboards, aplicații web, integrări API), agenții de software development (site-uri corporate, portaluri clienți), companii fintech și healthtech (platforme conforme GDPR, integrări securizate), marketplace-uri și platforme de matching, și companii IT corporate (site-uri enterprise, intranets). Oferim soluții complete: dezvoltare MVP rapid (4-8 săptămâni) pentru validare piață, arhitectură scalabilă pentru creștere de la 100 la 10,000+ utilizatori, stack modern (Next.js, React, TypeScript, Node.js, Python), integrări cloud (AWS, Google Cloud, Vercel, Supabase), design UX/UI optimizat pentru conversii, și consultanță tehnică pentru alegerea tehnologiilor potrivite. Înțelegem cerințele specifice ale startup-urilor tech: time-to-market rapid, costuri controlate, scalabilitate, și cod mentenabil pentru dezvoltare viitoare.",
  },
  {
    question: "Cât durează dezvoltarea unui MVP sau aplicație web pentru un startup din Cluj?",
    answer:
      "Durata proiectelor de web development Cluj variază astfel: Landing page pentru validare idee: 3-5 zile, perfect pentru testare rapidă. Site de prezentare startup (5-8 pagini): 1-2 săptămâni, ideal pentru pitch-uri și investitori. MVP (Minimum Viable Product) simplu: 4-6 săptămâni, cu funcționalități core pentru validare. MVP complex cu integrări: 8-12 săptămâni, incluzând autentificare, plăți, dashboard. Aplicație web SaaS completă: 12-20 săptămâni, cu toate funcționalitățile necesare. Platformă marketplace sau social: 16-24 săptămâni, în funcție de complexitate. Pentru startup-uri cu deadline-uri strânse oferim servicii express și dezvoltare agile cu sprint-uri de 2 săptămâni. Procesul include: discovery workshop și definire MVP scope, design UX/UI cu focus pe user journey, dezvoltare iterativă cu demo-uri săptămânale, testare automată și manuală, deployment pe cloud (AWS/Vercel/Railway), și training pentru echipa ta. Folosim metodologii agile pentru flexibilitate maximă și adaptare rapidă la feedback.",
  },
  {
    question: "Cum funcționează SEO local Cluj-Napoca pentru companii tech și startup-uri?",
    answer:
      "SEO local Cluj-Napoca pentru companii tech înseamnă optimizarea site-ului să apară în top pe Google când cineva caută servicii tech în Cluj. Implementăm: optimizare pentru termeni locali relevanți ('dezvoltare software cluj', 'companie IT cluj-napoca', 'startup tech cluj', 'web development cluj'), configurare Google Business Profile pentru vizibilitate Maps, scheme structurate pentru companii tech și servicii software, optimizare pentru căutări B2B și recrutare talente tech, conținut localizat cu referințe la ecosistemul Cluj (Innovation Labs, Tetarom, Cluj Innovation City), link building cu hub-uri tech locale și directoare IT, și rapoarte de performanță cu KPI-uri relevante. Pentru companii SaaS și tech, optimizăm și pentru: termeni de industrie specifici ('SaaS company cluj', 'fintech startup romania'), căutări internaționale (engleză) pentru atragere investitori, și SEO tehnic avansat (Core Web Vitals, structured data). De exemplu, un startup SaaS din Cluj va apărea în top când investitorii sau clienții caută 'software development cluj' sau 'tech companies cluj-napoca'. Oferim și consultanță pentru content marketing tech (blog tehnic, case studies, whitepapers).",
  },
  {
    question: "Ce stack tehnologic modern folosiți pentru startup-uri din Cluj?",
    answer:
      "Folosim cele mai avansate tehnologii web, perfect pentru startup-uri tech din Cluj care au nevoie de scalabilitate și performanță: Frontend: Next.js 15 (React framework) pentru SEO și performanță maximă, React 19 cu Server Components pentru aplicații moderne, TypeScript pentru cod type-safe și mentenabil, Tailwind CSS pentru design rapid și consistent. Backend: Node.js și Express pentru API-uri RESTful rapide, Python (FastAPI/Django) pentru ML și data processing, Supabase sau Firebase pentru backend-as-a-service rapid, tRPC pentru type-safe API-uri end-to-end. Database: PostgreSQL pentru date relaționale robuste, MongoDB pentru flexibilitate NoSQL, Redis pentru caching și real-time features. Cloud & DevOps: Vercel sau Netlify pentru deployment instant, AWS sau Google Cloud pentru infrastructură scalabilă, Docker pentru containerizare, GitHub Actions pentru CI/CD automat. Alegem stack-ul potrivit în funcție de: cerințele specifice ale produsului, experiența echipei tale tehnice, bugetul și timeline-ul, și planurile de scalare viitoare. Pentru startup-uri oferim și consultanță tehnică: code review, arhitectură scalabilă, best practices pentru security și performance.",
  },
  {
    question: "Puteți ajuta cu integrări API, autentificare și plăți online pentru startup-uri?",
    answer:
      "Absolut! Oferim integrări complete pentru toate nevoile unui startup tech modern: Autentificare & User Management: Auth0, Supabase Auth, NextAuth.js pentru login social (Google, Facebook, LinkedIn), autentificare multi-factor (2FA), și management roluri/permisiuni. Plăți Online: Stripe pentru plăți internaționale (subscripții, one-time, usage-based), Netopia/Euplatesc pentru piața românească, PayPal, și integrări custom pentru marketplace-uri. API-uri & Integrări: REST APIs și GraphQL pentru comunicare între servicii, integrări cu CRM-uri (HubSpot, Salesforce, Pipedrive), email marketing (Mailchimp, SendGrid, Postmark), analytics (Google Analytics, Mixpanel, Amplitude), și API-uri custom pentru conectare cu alte platforme. Cloud Services: AWS S3 pentru storage, Cloudflare pentru CDN și security, SendGrid/AWS SES pentru email transactional, și Twilio pentru SMS/notificări. Aceste integrări permit: automatizare completă a proceselor business, scalabilitate pentru mii de utilizatori, securitate la standarde enterprise, și monitorizare real-time a performanței. Perfect pentru startup-uri SaaS din Cluj care vor să se concentreze pe product, nu pe infrastructură.",
  },
  {
    question: "Oferiți mentenanță, suport tehnic și dezvoltare continuă pentru startup-uri din Cluj?",
    answer:
      "Da, oferim pachete complete de mentenanță și suport tehnic dedicat pentru startup-uri din Cluj-Napoca și toată România. Serviciile includ: Mentenanță Tehnică: monitorizare 24/7 uptime și performanță (alertă instant în caz de probleme), backup-uri zilnice automate cu disaster recovery, actualizări de securitate și patch-uri pentru dependențe, optimizare continuă pentru viteză și scalabilitate, și fix-uri rapide pentru bug-uri critice. Dezvoltare Continuă: dezvoltare de features noi bazate pe feedback utilizatori, A/B testing pentru optimizare conversii, integrări noi cu servicii terțe, și refactoring pentru îmbunătățire cod. Suport Tehnic: suport prioritar prin Slack/Discord/email în program 9-18, intervenție rapidă pentru probleme critice (SLA < 2h), consultanță tehnică pentru decizii de arhitectură, și code review pentru echipa ta internă. Analytics & Raportare: rapoarte lunare de performanță (uptime, speed, errors), analytics utilizatori și comportament, recomandări pentru optimizare, și tracking KPI-uri business. Pentru startup-uri în creștere oferim și: scaling infrastructure când crești de la 100 la 10,000+ utilizatori, security audits și penetration testing, și consultanță pentru fundraising (documentație tehnică pentru investitori). Prețuri de la 199€/lună pentru mentenanță basic, până la pachete enterprise personalizate cu SLA garantat.",
  },
]

export default function CreareSiteClujPage() {
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
              description: `Servicii profesionale de web design și dezvoltare aplicații în ${cityName}. MVP-uri rapide pentru startup-uri tech, aplicații web SaaS și site-uri corporate. Optimizare SEO locală pentru top poziții pe Google ${cityName}.`,
              url: `/creare-site-${citySlug}`,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(generateFAQSchema(clujFaqs)),
        }}
      />

      <main>
        <ClujHero />
        <CityServices cityName={cityName} />
        <Process />
        <FeaturedWork />
        <ClujContent />
        <Testimonials />
        <CityBenefits cityName={cityName} />
        <CityFaq cityName={cityName} faqs={clujFaqs} />
        <CityCTA cityName={cityName} />
      </main>
    </>
  )
}
