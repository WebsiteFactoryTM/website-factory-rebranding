import type { Locale } from "@/i18n/routing"
import { withoutPrices } from "@/lib/i18n/no-prices"

// Homepage content
export const heroContent = {
  h1: "Creare site Timișoara. Web design care vinde.",
  subtitle:
    "Transformăm viziunea ta într-un site web care atrage clienți, convertește vizitatori și domină rezultatele Google.",
  ctaPrimary: "Cere ofertă",
  ctaSecondary: "Vezi portofoliu",
  proofLine: "SEO-first · Performanță maximă · Conversii măsurabile",
}

export const trustMetrics = [
  { value: "150+", label: "Proiecte livrate" },
  { value: "8+", label: "Ani experiență" },
  { value: "100%", label: "SEO-first approach" },
  { value: "TM", label: "Bazați în Timișoara" },
]

export const services = [
  {
    id: "creare-website",
    title: "Creare website",
    description:
      "Site-uri de prezentare care convertesc vizitatori în clienți. Design modern, SEO optimizat, performanță excepțională.",
    href: "/servicii/creare-website",
    icon: "globe",
    outcomes: ["Vizibilitate în Google", "Design responsive", "Încărcare rapidă"],
  },
  {
    id: "magazin-online",
    title: "Magazin online",
    description:
      "E-commerce complet funcțional cu plăți integrate, gestiune stocuri și optimizare pentru vânzări maxime.",
    href: "/servicii/magazin-online",
    icon: "shopping-cart",
    outcomes: ["Plăți securizate", "Gestiune ușoară", "Conversii optimizate"],
  },
  {
    id: "aplicatie-mobile",
    title: "Aplicație mobilă",
    description:
      "Aplicații native și cross-platform pentru iOS și Android. Experiență utilizator perfectă pe orice dispozitiv.",
    href: "/servicii/aplicatie-mobile",
    icon: "smartphone",
    outcomes: ["iOS & Android", "Performanță nativă", "UX premium"],
  },
]

export const caseStudies = [
  {
    id: "case-1",
    title: "Platform E-Learning",
    industry: "Educație",
    outcome: "+340% utilizatori în 6 luni",
    image: "/modern-elearning-dashboard.png",
    href: "/portofoliu/platform-elearning",
  },
  {
    id: "case-2",
    title: "Magazin Fashion Online",
    industry: "E-commerce",
    outcome: "+180% conversii",
    image: "/luxury-fashion-ecommerce.png",
    href: "/portofoliu/magazin-fashion",
  },
  {
    id: "case-3",
    title: "App Livrări Restaurant",
    industry: "Food & Delivery",
    outcome: "50k+ descărcări",
    image: "/food-delivery-app.png",
    href: "/portofoliu/app-livrari",
  },
]

export const processSteps = [
  {
    step: 1,
    title: "Descoperire",
    description: "Analizăm obiectivele tale, publicul țintă și competiția pentru a crea strategia perfectă.",
  },
  {
    step: 2,
    title: "Design & Prototip",
    description: "Creăm wireframe-uri și design-uri interactive. Validăm fiecare decizie înainte de implementare.",
  },
  {
    step: 3,
    title: "Dezvoltare",
    description: "Construim site-ul cu tehnologii moderne, cod curat și optimizare SEO din prima zi.",
  },
  {
    step: 4,
    title: "Testare & QA",
    description: "Testăm pe toate dispozitivele, optimizăm performanța și verificăm securitatea.",
  },
  {
    step: 5,
    title: "Lansare",
    description: "Publicăm site-ul, configurăm analytics și ne asigurăm că totul funcționează perfect.",
  },
  {
    step: 6,
    title: "Suport & Creștere",
    description: "Oferim mentenanță continuă, monitorizare și optimizări bazate pe date reale.",
  },
]

export const testimonials = [
  {
    id: 1,
    name: "Alexandru Popescu",
    role: "CEO, TechStart SRL",
    content:
      "Website Factory ne-a transformat complet prezența online. Site-ul nou a generat de 3 ori mai multe lead-uri în prima lună.",
    avatar: "/professional-man-portrait.png",
  },
  {
    id: 2,
    name: "Maria Ionescu",
    role: "Fondator, Boutique Elena",
    content:
      "Magazinul online creat de ei a depășit toate așteptările. Vânzările au crescut cu 200% și clienții adoră experiența de cumpărare.",
    avatar: "/images/woman-portrait.png",
  },
  {
    id: 3,
    name: "Dan Gheorghe",
    role: "Director Marketing, HealthPlus",
    content:
      "Profesionalism de top! Au înțeles exact ce ne trebuie și au livrat un site care ne-a poziționat pe primul loc în Google pentru termenii cheie.",
    avatar: "/professional-man-suit-portrait.jpg",
  },
]

const faqsRo = [
  {
    question: "Cât costă crearea unui site web în Timișoara?",
    answer:
      "Prețul variază în funcție de complexitate. Un site de prezentare începe de la 1500 EUR, iar un magazin online de la 3000 EUR. Oferim consultanță gratuită pentru a stabili exact ce ai nevoie și un preț personalizat.",
  },
  {
    question: "Cât durează să creați un website?",
    answer:
      "Un site de prezentare standard este gata în 2-4 săptămâni. Proiectele complexe precum magazinele online sau aplicațiile custom pot dura 6-12 săptămâni. Respectăm întotdeauna deadline-urile agreate.",
  },
  {
    question: "Oferiți servicii SEO pentru site-uri în Timișoara?",
    answer:
      "Da! Toate site-urile noastre sunt construite SEO-first. Implementăm optimizări on-page, structură corectă de headings, meta tags, schema markup și performanță optimizată - toate incluse în preț.",
  },
  {
    question: "Pot să îmi administrez singur site-ul după lansare?",
    answer:
      "Absolut. Predăm site-uri cu panou de administrare intuitiv și oferim training gratuit. Dacă preferi, avem și pachete de mentenanță lunară pentru gestionarea completă.",
  },
  {
    question: "Ce tehnologii folosiți pentru dezvoltare?",
    answer:
      "Folosim tehnologii moderne: Next.js, React, TypeScript pentru frontend, și diverse soluții backend în funcție de proiect. Alegem întotdeauna stack-ul optim pentru obiectivele tale specifice.",
  },
]

const faqsByLocale = { ro: faqsRo, en: withoutPrices(faqsRo) } satisfies Record<Locale, typeof faqsRo>

export function getFaqs(locale: Locale) {
  return faqsByLocale[locale]
}

export const ctaSection = {
  title: "Gata să-ți transformi prezența online?",
  subtitle: "Hai să discutăm despre proiectul tău. Consultanță gratuită, fără obligații.",
  cta: "Solicită ofertă gratuită",
}
