// Testimonials data - exported for use in both client components and server-side schema generation

import type { Locale } from "@/i18n/routing"

export interface Testimonial {
  id: number
  name: string
  role: string
  content: string
  logo: string
  rating: number
  datePublished?: string
  en?: Pick<Testimonial, "role" | "content">
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
    en: {
      role: "Director, Ornella Design",
      content:
        "Great people — they quickly understood what we wanted and helped straight away. The team was brilliant and found fast solutions to any problem. Happy to recommend them!",
    },
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
    en: {
      role: "Founder, The Radar – boutique consultancy",
      content:
        "Working with Website Factory was extremely smooth, even though we worked 100% remotely. Communication was clear, structured and efficient from the start right through to final delivery. The team quickly took on board my feedback about the specifics of a portfolio website — with some unusual elements compared to a commercial site — including video elements that are common in international markets but less usual in Romania. Post-delivery support was just as efficient and prompt, which is why I've already planned an upgrade to the site, again with Website Factory.",
    },
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
    en: {
      role: "Director, Maravo Clinic",
      content:
        "We had a very good experience working with Website Factory and with Ernest on creating our website. Ernest clearly understood the direction we wanted, delivered to the brief, and consistently incorporated our feedback, quickly adjusting the details we needed. We appreciated the promptness, openness and commitment, including the willingness to make changes even at the final stage, with the clear goal of delivering exactly the result we wanted. Thank you for the collaboration and professionalism — we wish you every success!",
    },
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
    en: {
      role: "Founder, YouPlus Agency",
      content:
        "I've been working with Website Factory since 2023 and I'm very happy with the partnership! They're very responsive and quickly implement what we need, but they also bring extra ideas that improve the user experience or the flow. We've worked with them on our own site and on several of our agency clients' sites, and I always recommend them whenever someone needs to build a site or upgrade an existing one. I like that there are great people behind the brand who don't just focus on delivering the technical work, but on building a relationship, a partnership. I'd happily recommend them any time!",
    },
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
    en: {
      role: "Co-founder, artimm.digital",
      content:
        "We worked with Website Factory on building our website and, overall, it was a real success. They understood what we wanted, came up with clear solutions and delivered a modern, clean, easy-to-use site. I liked that they were open to feedback, and we managed to reflect our business vision authentically. If you need a serious team for web design and development, Website Factory is the right choice.",
    },
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
    en: {
      role: "Director, Geonordica",
      content:
        "We worked with Website Factory on building our company's website. They showed seriousness, professionalism and attention to detail. They were responsive to the changes we requested during development, and analysed and corrected or improved the suggestions we brought. They also provided support and maintenance after the site went live. We confidently recommend Website Factory, as they added real value to our company's image.",
    },
  },
  {
    id: 7,
    name: "Călin Bucur",
    role: "Administrator, The Permanent",
    content:
      "Recomand cu toată încrederea! Colaborarea a fost super ușoară de la început: comunicare clară, răbdare și soluții rapide ori de câte ori am avut întrebări sau modificări. Site-ul a ieșit exact cum mi-am dorit — curat, modern și bine optimizat. Se vede că știe ce face și că îi pasă de rezultat, nu doar să ‘bifeze’ proiectul. Mulțumesc mult pentru implicare!",
    logo: "/partners/The-Permanent-logof-scaled.webp",
    rating: 5,
    datePublished: "2024-10-12",
    en: {
      role: "Director, The Permanent",
      content:
        "I recommend them with complete confidence! The collaboration was super easy from the start: clear communication, patience and quick solutions whenever I had questions or changes. The site turned out exactly as I wanted — clean, modern and well optimised. You can tell they know what they're doing and care about the result, not just about ticking off the project. Many thanks for the commitment!",
    },
  },
  {
    id: 8,
    name: "Alex Benchea",
    role: "Administrator, Displayer",
    content:
      "Am colaborat cu această companie pentru dezvoltarea website-ului și rezultatul a fost la nivelul așteptărilor. Procesul a fost bine structurat, comunicarea eficientă, iar livrarea realizată conform termenelor stabilite. Website-ul este modern, funcțional și aliniat obiectivelor noastre de business.",
    logo: "/partners/Logo-Displayer-7.svg",
    rating: 5,
    datePublished: "2024-10-12",
    en: {
      role: "Director, Displayer",
      content:
        "We worked with this company on developing our website and the result met our expectations. The process was well structured, communication was efficient, and delivery was on the agreed schedule. The website is modern, functional and aligned with our business objectives.",
    },
  },
  {
    id: 9,
    name: "Georgian Dumitru",
    role: "Production Manager, Radiotron Tehnologies",
    content:
      "Vă mulțumesc pentru munca depusă în cadrul proiectului de creare si dezvoltare a website-ului nostru. Apreciez în mod special implicarea echipei, deschiderea la feedback și disponibilitatea de a ajusta soluțiile propuse pe parcursul colaborării. Designul general este modern și bine aliniat cu identitatea vizuală discutată, iar structura site-ului este clară și intuitivă pentru utilizator. Echipa a dat dovadă de profesionalism, creativitate și flexibilitate pe tot parcursul procesului. Am apreciat în mod deosebit abordarea modernă de design, deschiderea față de feedback, comunicarea clară și rapidă si respectarea termenelor asumate. Recomand cu încredere echipa pentru proiecte similare și sper să colaborăm și în viitor. Vă mulțumesc încă o dată!",
    logo: "/partners/Logo-full-radiotron-2048x378.webp",
    rating: 5,
    datePublished: "2024-10-12",
    en: {
      role: "Production Manager, Radiotron Tehnologies",
      content:
        "Thank you for the work on creating and developing our website. I particularly appreciate the team's commitment, openness to feedback and willingness to adjust the proposed solutions along the way. The overall design is modern and well aligned with the visual identity we discussed, and the site structure is clear and intuitive for users. The team showed professionalism, creativity and flexibility throughout the process. I especially appreciated the modern design approach, the openness to feedback, the clear and fast communication and the respect for agreed deadlines. I confidently recommend the team for similar projects and hope we'll work together again. Thank you once again!",
    },
  },
  {
    id: 10,
    name: "Dan Brad",
    role: "Administrator, Bradluc și Piscine Timiș",
    content:
      "Recomand cu încredere colaborarea cu Website Factory. Au fost foarte atenți la detalii, deschis la idei și implicați de la început până la final.Comunicarea a fost clară, termenele respectate, iar rezultatul exact ce ne-am dorit.Datorită lor avem acum două site-uri funcționale și bine structurate: 👉 www.bradluc.ro și👉 www.piscinetimis.ro. Mulțumim pentru profesionalism și răbdare. Cu siguranță vom mai colabora!",
    logo: "/partners/bradluc-shop-logo.webp",
    rating: 5,
    datePublished: "2024-10-12",
    en: {
      role: "Director, Bradluc & Piscine Timiș",
      content:
        "I confidently recommend working with Website Factory. They were very attentive to detail, open to ideas and fully involved from start to finish. Communication was clear, deadlines were met, and the result was exactly what we wanted. Thanks to them we now have two well-structured, fully working sites: 👉 www.bradluc.ro and 👉 www.piscinetimis.ro. Thank you for the professionalism and patience — we'll definitely work together again!",
    },
  },
]

export function getTestimonials(locale: Locale): Testimonial[] {
  if (locale !== "en") return testimonials
  return testimonials.map((t) => (t.en ? { ...t, ...t.en } : t))
}
