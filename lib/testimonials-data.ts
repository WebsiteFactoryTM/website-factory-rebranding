// Testimonials data - exported for use in both client components and server-side schema generation

export interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  logo: string
  rating: number
  datePublished?: string
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Cordin Ștefănescu",
    role: "Administrator, Ornella Design",
    content:
      "Oameni faini, au înțeles rapid ce ne dorim și ne-au ajutat imediat. Echipa a fost super ok și a găsit soluții rapid la orice problemă. Recomandăm cu drag!",
    logo: "/partners/ornella.webp",
    rating: 5,
    datePublished: "2024-03-15",
  },
  {
    id: 2,
    name: "Raluca Brăgarea",
    role: "fondator The Radar – boutique consultancy",
    content:
      "Colaborarea cu Website Factory a fost una extrem de fluentă, chiar dacă am lucrat 100% remote. Comunicarea a fost clară, structurată și eficientă de la început până la livrarea finală. Echipa a integrat rapid feedback-ul meu privind specificul unui website de portofoliu – cu elemente atipice, prin comparație cu un site comercial – inclusiv utilizarea de elemente video frecvent întâlnite pe piețele internaționale, dar mai puțin uzuale în România. Suportul post-livrare a fost la fel de eficient și prompt, motiv pentru care am planificat deja un upgrade al site-ului, pe care îl voi realiza tot împreună cu Website Factory.",
    logo: "/partners/logo-no-background-2-copy.webp",
    rating: 5,
    datePublished: "2024-06-20",
  },
  {
    id: 3,
    name: "Radu Voinescu",
    role: "Director, Maravo Clinic",
    content:
      "Am avut o colaborare foarte bună cu Website Factory și cu Ernest în procesul de creare a site-ului nostru. Ernest a înțeles clar direcția dorită, a livrat conform brief-ului și a integrat constant feedbackul primit, ajustând rapid detaliile necesare. Am apreciat promptitudinea, deschiderea și implicarea, inclusiv disponibilitatea de a face modificări chiar în etapa finală, cu obiectivul clar de a livra exact rezultatul dorit. Mulțumim pentru colaborare și profesionalism. Mult succes în continuare!",
    logo: "/partners/maravo-logo-landscape.webp",
    rating: 5,
    datePublished: "2024-08-10",
  },
    {
    id: 4,
    name: "Cristina Eros",
    role: "Fondator, YouPlus Agency",
    content:
      "Lucrez cu cei de la Website Factory încă din 2023 și sunt foarte mulțumită de parteneriatul cu ei! Sunt foarte prompți și implementează rapid ce avem noi nevoie, dar vin și cu idei extra, care ar ajuta la creșterea user experience sau pt un flow mai bun.  Am colaborat cu ei atât pentru site-ul nostru, cât și pentru al câtorva clienți din agenție și întotdeauna îi recomand când cineva are nevoie să își construiască un site sau să facă un upgrade la cel existent.  Îmi place ca sunt oameni faini în spatele brandului și nu se axează doar pe a livra tehnic, ci și pe a construi o relație, un parteneriat. Îi recomand cu drag oricând!",
    logo: "/partners/youplus-partner.webp",
    rating: 5,
    datePublished: "2024-08-10",
  },
  {
    id: 5,
    name: "Nicolae Chirteș",
    role: "Co-fondator, artimm.digital",
    content:
      "Am lucrat cu Website Factory la realizarea website-ului nostru și, per total, a fost o experiență de succes. Au înțeles ce ne dorim, au venit cu soluții clare și au livrat un site modern, curat și ușor de folosit. Mi-a plăcut că au fost deschiși la feedback și am reusit sa oglindim intr-o forma autentica viziunea noastra de business.  Dacă ai nevoie de o echipă serioasă pentru web design și dezvoltare, Website Factory este alegerea potrivita.",
    logo: "/partners/Logo-artimm-scaled.webp",
    rating: 5,
    datePublished: "2024-09-05",
  },
  {
    id: 6,
    name: "Adrian Dascălu",
    role: "Administrator, Geonordica",
    content:
      "Am colaborat cu societatea Website Factory pentru realizarea paginii web a societatii noastre. Au dat dovada de seriozitate, profesionalism si atentie la detalii. Au fost receptivi la modificarile solcitate pe parcursul dezvoltarii website-ului, au analizat si corectat/imbunatatit propunerile cu care am venit. Totodata, ne-au oferit asistenta si mentenanta si dupa incarcarea site-ului in versiune live. Recomandam cu incredere societatea Website Factory intrucat au adus un plus valoare imaginii firmei noastre.",
    logo: "/partners/geonordica-black-color.webp",
    rating: 5,
    datePublished: "2024-10-12",
  },
]

