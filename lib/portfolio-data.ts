// Portfolio data - Featured projects have dedicated pages, others are external links only

import type { Locale } from "@/i18n/routing"

export interface FeaturedProject {
  id: string
  slug: string
  title: string
  client: string
  category: "website" | "ecommerce" | "app" | "custom"
  categoryLabel: string
  description: string
  shortDescription: string
  image: string
  results: { label: string; value: string }[]
  technologies: string[]
  year: string
  testimonial?: {
    quote: string
    author: string
    role: string
  }
  challenge: string
  solution: string
  liveUrl?: string
  en?: Partial<
    Pick<
      FeaturedProject,
      "title" | "categoryLabel" | "description" | "shortDescription" | "results" | "challenge" | "solution" | "testimonial"
    >
  >
  enOrder?: number
}

export interface SimpleProject {
  id: string
  title: string
  client: string
  category: "website" | "ecommerce" | "app" | "custom"
  categoryLabel: string
  image: string
  liveUrl: string
  year: string
  shortDescription?: string
  order?: number // For custom sorting in grid
  en?: Partial<Pick<SimpleProject, "categoryLabel" | "shortDescription">>
  enOrder?: number
}

export const featuredProjects: FeaturedProject[] = [
  {
    id: "1",
    slug: "politehnica-timisoara",
    title: "Politehnica Timișoara – Platforma digitală oficială a clubului",
    client: "Politehnica Timișoara",
    category: "custom",
    categoryLabel: "Platformă digitală",
    description:
      "Platforma digitală oficială a clubului de fotbal Politehnica Timișoara: știri, echipe, meciuri, bilete și shop oficial, într-o singură experiență rapidă și coerentă. Rezultatele, programul competițional și clasamentul se actualizează automat printr-o integrare API dedicată, iar arhitectura Next.js livrează conținutul aproape instant, pe orice dispozitiv.",
    shortDescription:
      "Platforma digitală oficială a clubului Politehnica Timișoara — știri, meciuri, bilete și shop, cu rezultate și clasament actualizate automat prin API.",
    image: "/projects/website-platforma-politehnica-timisoara.webp",
    results: [
      { label: "Core Web Vitals", value: "3/3" },
      { label: "Încărcare pagină", value: "Instant" },
      { label: "Rezultate & clasament", value: "API live" },
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Headless CMS",
      "Integrare API rezultate & clasament",
      "ISR & Edge Caching",
      "Vercel",
      "SEO tehnic",
      "Dezvoltare agentică",
    ],
    year: "2026",
    enOrder: 6,
    challenge:
      "Un club cu peste 100 de ani de istorie și zeci de mii de suporteri avea nevoie de un singur punct digital oficial: știri publicate zilnic, trei echipe, program competițional, bilete și shop — toate într-o platformă care să reziste vârfurilor de trafic din zilele de meci și să se încarce instant pe mobil, acolo unde stă majoritatea audienței.",
    solution:
      "Am construit platforma pe Next.js, cu randare pe server și cache la nivel de rută, astfel încât navigarea între secțiuni să fie percepută ca instantanee. Rezultatele meciurilor, programul și clasamentul sunt preluate automat printr-o integrare API dedicată, eliminând complet actualizările manuale. Editorii publică știri și conținut direct din CMS, iar structura semantică, datele structurate și optimizarea imaginilor asigură Core Web Vitals 3/3 și vizibilitate maximă în căutări. Întregul proiect a fost livrat printr-un flux de dezvoltare agentic, care a scurtat radical drumul de la concept la producție.",
    liveUrl: "https://www.politehnicatimisoara.com/",
  },
  {
    id: "2",
    slug: "un-event",
    title: "UN:EVENT – Platformă pentru locații, servicii și evenimente",
    client: "PIXEL FACTORY SRL",
    category: "custom",
    categoryLabel: "Platformă digitală",
    description:
      "Platformă digitală care conectează locații, furnizori și organizatori de evenimente într-un singur ecosistem. Filtrare inteligentă, listări validate, vizibilitate reală și alte sisteme integrate.",
    shortDescription: "Platformă digitală pentru simplificarea găsirii de locații, servicii și evenimente.",
    image: "/projects/UnEvent.webp",
    results: [
      { label: "Listări în prima lună", value: "61+" },
      { label: "Viteză încărcare", value: "0.4s" },
      { label: "Core Web Vitals - SEO", value: "100%" },
    ],
    technologies: ["Next.js", "Tailwind CSS", "TypeScript", "Railway", "Vercel", "Resend", "Sentry", "Payload CMS", "PostgreSQL", "Map Integration", "Scalable marketplace logic"],
    year: "2025",
    enOrder: 5,
    testimonial: {
      quote:
        "UN:EVENT este un produs propriu aflat în dezvoltare activă. Recenziile provin de la parteneri și utilizatori care folosesc deja platforma în primele etape.",
      author: "Ernest Slach",
      role: "Co-Fonator, UN:EVENT & Website Factory",
    },
    challenge:
      "Organizatorii de evenimente pierd timp căutând locații și furnizori pe multiple platforme, iar furnizorii nu au un canal clar și eficient de vizibilitate online.",
    solution:
      "Am construit UN:EVENT — o platformă digitală care centralizează locații, servicii și evenimente, cu filtre inteligente, listări validate și o experiență gândită pentru decizii rapide și vizibilitate reală.",
    liveUrl: "https://unevent.ro",
  },
  {
    id: "3",
    slug: "riders-route",
    title: "Rider's Route – Aplicație mobilă și platformă web pentru motocicliști",
    client: "Rider's Route S.R.L.",
    category: "app",
    categoryLabel: "Aplicație mobilă & website",
    description:
      "Ecosistem digital construit pentru motocicliști: o aplicație mobilă React Native cu navigație turn-by-turn, înregistrare GPS a turelor, garaj digital și buton SOS, dublată de o platformă web Next.js unde traseele pot fi descoperite, salvate și partajate. Comunitate, hărți și statistici de rulaj — același produs, pe iOS, Android și web.",
    shortDescription:
      "Aplicație mobilă React Native și platformă web pentru descoperirea, înregistrarea și partajarea traseelor moto.",
    image: "/projects/website-si-aplicatie-mobila-riders-route.webp",
    results: [
      { label: "Platforme livrate", value: "3" },
      { label: "Navigație & tracking GPS", value: "Real-time" },
      { label: "Cod partajat iOS/Android", value: "100%" },
    ],
    technologies: [
      "React Native",
      "Expo",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Hărți & GPS tracking",
      "OpenStreetMap",
      "PostgreSQL",
      "Push notifications",
      "Vercel",
    ],
    year: "2026",
    enOrder: 4,
    challenge:
      "Motocicliștii folosesc aplicații de navigație generaliste, care nu înțeleg nevoile reale ale unei ture: trasee alese pentru viraje, profil de altitudine, statistici de rulaj, întreținerea motocicletei și siguranța pe drum. Provocarea a fost să construim un produs care funcționează identic pe telefon și pe web, cu hărți performante și date sincronizate în timp real.",
    solution:
      "Am dezvoltat aplicația mobilă în React Native — un singur cod sursă pentru iOS și Android — și platforma web în Next.js, ambele conectate la același API și la aceeași bază de date. Motociclistul pornește un Free Ride sau navighează turn-by-turn către o destinație, iar aplicația înregistrează distanța, viteza, altitudinea și traseul complet. În jurul acestui nucleu am construit garajul digital (revizii, ITP, asigurări), feed-ul de comunitate cu ture partajate și butonul SOS accesibil în timpul rulajului. Site-ul expune rutele publice optimizat pentru căutări și devine astfel principalul canal de achiziție pentru aplicație.",
    liveUrl: "https://ridersroute.app/",
  },
  {
    id: "4",
    slug: "la-pinocchio",
    title: "La Pinocchio – Redesign complet al magazinului online de comenzi",
    client: "Pizza Oscar DM SRL",
    category: "ecommerce",
    categoryLabel: "Magazin online",
    description:
      "Redesign complet al platformei de comenzi online pentru La Pinocchio, restaurantul din Piața Traian, Timișoara, activ din 2004. Am mutat întreaga experiență pe un stack modern Next.js, cu meniu digital pe categorii, Meniul Zilei, oferte, coș rapid, conturi de client și plată online — gândită pentru o comandă finalizată în câteva atingeri, direct de pe telefon. În spate, un panou de control dedicat le permite celor din restaurant să dispeceze comenzile în timp real, iar noua arhitectură a adus o creștere de performanță de 60% față de vechea platformă.",
    shortDescription:
      "Redesign modern al magazinului online de comenzi pentru restaurantul La Pinocchio din Timișoara, cu panou de dispecerat comenzi și performanță cu 60% mai bună.",
    image: "/projects/redesign-ecommerce-clatite-la-pinocchio.webp",
    results: [
      { label: "Creștere performanță", value: "+60%" },
      { label: "Încărcare pagină", value: "Instant" },
      { label: "Panou dispecerat comenzi", value: "Real-time" },
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Coș & checkout custom",
      "Netopia Payments",
      "Conturi clienți",
      "Panou dispecerat comenzi",
      "SEO local",
      "Vercel",
    ],
    year: "2026",
    enOrder: 8,
    challenge:
      "Vechea platformă de comenzi arăta datat și punea prea multe obstacole între client și butonul de comandă: meniu greu de parcurs pe mobil, imagini lente, checkout lung. Într-un oraș în care decizia de livrare se ia în câteva secunde, fiecare pas în plus însemna o comandă pierdută.",
    solution:
      "Am reconstruit platforma de la zero, cu o identitate vizuală caldă, fotografie de produs pusă în valoare și o ierarhie clară: categorii, Meniul Zilei, oferte și recomandări. Meniul este optimizat mobile-first, cu adăugare în coș dintr-un singur tap și un checkout scurt, cu plată online prin Netopia sau ramburs. Imaginile sunt servite optimizat prin Next.js, iar rescrierea completă a front-end-ului a adus o creștere de performanță de 60% față de vechea platformă, cu o încărcare percepută ca instantanee pe mobil. Pentru echipa restaurantului am construit un panou de control dedicat, din care comenzile sunt preluate, dispecerizate și urmărite în timp real, iar meniul, prețurile și ofertele se actualizează fără intervenție tehnică. Paginile de categorie și de produs sunt structurate pentru căutările locale — de la clătite în Timișoara până la livrare pizza în zona Pieței Traian.",
    liveUrl: "https://clatite-pinochio.ro/",
  },
  {
    id: "5",
    slug: "fern-and-flow",
    title: "Fern & Flow Hair – Website de prezentare pentru un salon din Londra",
    client: "Fern & Flow Hair Salon, Beckenham – London",
    category: "website",
    categoryLabel: "Website de prezentare",
    description:
      "Website de prezentare pentru un salon independent din Beckenham, South London, specializat în îngrijire organică a părului. Design editorial, natural, cu programare online integrată, carduri cadou digitale, listă de prețuri, galerie de lucrări și recenzii — construit în Next.js și livrat cu 97/100 la performance și 100/100 la SEO.",
    shortDescription:
      "Website premium pentru un salon de coafură organic din Londra, cu programare online și carduri cadou digitale.",
    image: "/projects/website-de-prezentare-salon-londra-fern-and-flow.webp",
    results: [
      { label: "Performance", value: "97/100" },
      { label: "SEO", value: "100/100" },
      { label: "Programări online", value: "24/7" },
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Integrare sistem de rezervări",
      "Stripe (e-gift cards)",
      "Vercel",
      "SEO local UK",
    ],
    year: "2026",
    enOrder: 1,
    challenge:
      "Într-o zonă cu zeci de saloane, Fern & Flow avea nevoie de o prezență online care să comunice instant poziționarea premium și filosofia organică a brandului — și, în același timp, să transforme vizitatorul în programare, fără să-l trimită într-un sistem extern greoi.",
    solution:
      "Am construit un website editorial, cu paletă naturală, tipografie elegantă și fotografie reală din salon, în care fiecare secțiune conduce spre o singură acțiune: rezervarea. Programarea se face prin integrarea cu sistemul de booking al salonului, iar cardurile cadou se cumpără online, cu plată securizată prin Stripe. Lista de prețuri, prezentarea echipei, galeria de lucrări și recenziile verificate construiesc încrederea înainte de rezervare. Optimizarea tehnică — imagini servite adaptiv, fonturi preîncărcate, structură semantică și date structurate LocalBusiness — a dus site-ul la 97/100 performance și 100/100 SEO.",
    liveUrl: "https://www.fernandflowhairsalon.co.uk/",
    en: {
      title: "Fern & Flow Hair – A Website for a London Hair Salon",
      categoryLabel: "Business website",
      description:
        "A website for an independent hair salon in Beckenham, South London, specialising in organic hair care. Editorial, natural design with integrated online booking, digital gift cards, a price list, a portfolio gallery and reviews — built in Next.js and delivered at 97/100 performance and 100/100 SEO.",
      shortDescription:
        "A premium website for a London organic hair salon, with online booking and digital gift cards.",
      results: [
        { label: "Performance", value: "97/100" },
        { label: "SEO", value: "100/100" },
        { label: "Online booking", value: "24/7" },
      ],
      challenge:
        "In an area with dozens of competing salons, Fern & Flow needed a site that could instantly communicate its premium, organic positioning — and turn a visitor into a booking without routing them through a clunky third-party system.",
      solution:
        "We built an editorial-style website with a natural colour palette, elegant typography and real salon photography, where every section leads toward one action: booking. Appointments run through the salon's own booking system, and gift cards are sold online with secure payment via Stripe. The price list, team profiles, work gallery and verified reviews build trust before someone books. Technical work — adaptive image delivery, preloaded fonts, semantic structure and LocalBusiness structured data — brought the site to 97/100 performance and 100/100 SEO.",
    },
  },
  {
    id: "6",
    slug: "daylin-nail-supply",
    title: "Daylin Nail Supply – Magazin online de cosmetice profesionale, Dublin",
    client: "Daylin Nail Supply, Dublin – Irlanda",
    category: "ecommerce",
    categoryLabel: "Magazin online",
    description:
      "Magazin online construit în Next.js pentru un distribuitor irlandez de produse profesionale de manichiură, fondat în 2018 de Diana, tehnician de unghii care testează personal fiecare produs din catalog. Structură pe categorii și branduri, conturi PRO cu beneficii pentru saloane, secțiune de academie și expediere în 48h din Dublin — cu 93/100 la performance pe mobil.",
    shortDescription:
      "Magazin online premium de cosmetice profesionale pentru manichiură, cu conturi PRO pentru saloane și livrare în Irlanda.",
    image: "/projects/magazin-online-cosmetice-manichiura-dublin-daylin.webp",
    results: [
      { label: "Performance mobil", value: "93/100" },
      { label: "Expediere comenzi", value: "48h" },
      { label: "Conturi & prețuri", value: "B2C + B2B" },
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Checkout & plăți online",
      "Conturi PRO (B2B)",
      "Gestiune catalog & stocuri",
      "Vercel",
      "SEO Irlanda",
    ],
    year: "2026",
    enOrder: 2,
    challenge:
      "Daylin vinde simultan către tehnicieni profesioniști și către clienți finali, cu un catalog amplu, împărțit pe branduri și tipuri de produse. Era nevoie de un magazin care să arate premium, să se încarce rapid pe mobil — de unde vine majoritatea comenzilor — și să servească două tipuri de public, cu prețuri și beneficii diferite, fără să complice experiența niciunuia.",
    solution:
      "Am construit magazinul în Next.js, cu o estetică editorială și discretă, care lasă produsele în prim-plan. Catalogul este organizat pe categorii și branduri, cu filtre și pagini de produs clare, iar conturile PRO oferă saloanelor prețuri și avantaje dedicate, separat de fluxul clientului obișnuit. Bara de anunțuri comunică livrarea gratuită peste 80€, reducerea la prima comandă și înscrierile la Daylin Academy. Optimizarea imaginilor, încărcarea progresivă și structura mobile-first au dus scorul de performance pe mobil la 93/100.",
    liveUrl: "https://www.daylin.ie/",
    en: {
      title: "Daylin Nail Supply – Online Store for a Dublin Beauty Brand",
      categoryLabel: "Online store",
      description:
        "An online store built in Next.js for an Irish professional nail-care distributor, founded in 2018 by Diana, a nail technician who personally tests every product in the catalogue. Structured by category and brand, with PRO accounts for salons, an academy section, and 48-hour dispatch from Dublin — delivered at 93/100 mobile performance.",
      shortDescription:
        "A premium online store for professional nail-care products, with PRO accounts for salons and delivery across Ireland.",
      results: [
        { label: "Mobile performance", value: "93/100" },
        { label: "Order dispatch", value: "48h" },
        { label: "Accounts & pricing", value: "B2C + B2B" },
      ],
      challenge:
        "Daylin sells to professional technicians and end customers at the same time, across a large catalogue split by brand and product type. The store needed to look premium, load fast on mobile — where most orders come from — and serve two different audiences, each with their own pricing and perks, without complicating either one's experience.",
      solution:
        "We built the store in Next.js with a discreet, editorial look that keeps the products front and centre. The catalogue is organised by category and brand with clear filters and product pages, and PRO accounts give salons dedicated pricing and perks, kept separate from the regular customer flow. The announcement bar promotes free delivery over a set spend, a first-order discount, and sign-ups to the Daylin Academy. Image optimisation, progressive loading and a mobile-first build pushed mobile performance to 93/100.",
    },
  },
  {
    id: "7",
    slug: "rox-assignment-solution",
    title: "Rox Assignment Solution – Platformă de suport academic, UK",
    client: "Roxana Assignment Solution Ltd, Londra",
    category: "custom",
    categoryLabel: "Platformă digitală",
    description:
      "Platformă web pentru o companie britanică de suport academic: studentul trimite brief-ul și materialele, primește o ofertă personalizată, plătește securizat prin Revolut Pay sau PayPal și urmărește progresul comenzii într-un dashboard dedicat. În spate, un panou de control complet permite administrarea platformei — cereri, oferte, comenzi și conținut — fără intervenție tehnică. Construită în Next.js, cu autentificare și contact rapid prin WhatsApp — la 94/100 performance pe mobil.",
    shortDescription:
      "Platformă de suport academic cu panou de administrare complet, plăți securizate prin Revolut Pay și PayPal și urmărirea comenzilor în timp real.",
    image: "/projects/platforma-online-academica-rox-assignment-solution.webp",
    results: [
      { label: "Performance mobil", value: "94/100" },
      { label: "Panou de administrare", value: "Complet" },
      { label: "Plăți securizate", value: "Revolut & PayPal" },
    ],
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Autentificare & conturi",
      "Upload fișiere",
      "Revolut Pay",
      "PayPal",
      "Panou de administrare",
      "Dashboard comenzi",
      "Integrare WhatsApp",
      "Vercel",
    ],
    year: "2026",
    enOrder: 3,
    challenge:
      "Întregul proces se desfășura pe canale disparate — mesaje, e-mailuri și fișiere trimise manual — ceea ce încetinea ofertarea și lăsa clientul fără vizibilitate asupra stadiului lucrării. Într-o piață în care încrederea decide totul, platforma trebuia să comunice clar legitimitatea serviciului și să aducă tot fluxul într-un singur loc.",
    solution:
      "Am digitalizat fluxul complet: studentul completează brief-ul, încarcă materialele și primește o ofertă detaliată, fără plată în avans. După acceptare, plata se face securizat prin Revolut Pay sau PayPal, iar comanda poate fi urmărită în timp real din contul de client, de la alocarea expertului până la livrare. Pentru echipă am construit un panou de control din care se administrează întreaga platformă: cererile primite, ofertele trimise, statusul comenzilor, conturile clienților și conținutul paginilor — totul dintr-un singur loc, fără intervenție tehnică. Am construit pagini dedicate pentru fiecare tip de serviciu și domeniu academic, optimizate pentru căutări specifice, plus contact instant prin WhatsApp. Designul dark-gold și comunicarea transparentă a politicii de utilizare susțin poziționarea premium și credibilitatea serviciului.",
    liveUrl: "https://www.roxassignmentsolution.com/",
    en: {
      title: "Rox Assignment Solution – Academic Support Platform, UK",
      categoryLabel: "Digital platform",
      description:
        "A web platform for a UK academic support company: students submit a brief and materials, receive a tailored quote, pay securely via Revolut Pay or PayPal, and track progress in a dedicated dashboard. Behind the scenes, a full admin panel handles the whole platform — requests, quotes, orders and content — with no technical intervention needed. Built in Next.js, with authentication and instant WhatsApp contact — at 94/100 mobile performance.",
      shortDescription:
        "An academic support platform with a complete admin panel, secure payments via Revolut Pay and PayPal, and real-time order tracking.",
      results: [
        { label: "Mobile performance", value: "94/100" },
        { label: "Admin panel", value: "Complete" },
        { label: "Secure payments", value: "Revolut & PayPal" },
      ],
      challenge:
        "The whole process ran across scattered channels — messages, emails and files sent manually — which slowed down quoting and left clients with no visibility into progress. In a market where trust decides everything, the platform needed to clearly signal legitimacy and bring the entire flow into one place.",
      solution:
        "We digitised the full flow: the student fills in a brief, uploads materials, and receives a detailed quote with no upfront payment. Once accepted, payment is handled securely via Revolut Pay or PayPal, and the order can be tracked in real time from the client account — from expert assignment through to delivery. For the team, we built an admin panel that runs the whole platform: incoming requests, quotes sent, order status, client accounts and page content, all from one place, with no technical intervention needed. We built dedicated pages for each service type and academic subject, optimised for specific searches, plus instant contact via WhatsApp. The dark-gold design and transparent communication of the usage policy support the platform's premium positioning and credibility.",
    },
  },
  {
    id: "8",
    slug: "blue-phoenix",
    title: "Blue Phoenix – Stil de viață indonezian în România",
    client: "Blue Phoenix Rising Thriving Blooming SRL",
    category: "ecommerce",
    categoryLabel: "Magazin online",
    description:
      "Un magazin online care importă și pune în valoare produse naturale, ceaiuri, cafea de specialitate și suplimente tradiționale din Java, Indonezia — orientat spre consumatori interesați de well-being și alimentație sănătoasă. Unul dintre cei mai vechi parteneri ai Website Factory - Mentenanță din Martie 2023.",
    shortDescription: "Magazin online cu produse naturale din Indonezia. Optimizat pentru conversii și fidelizare.",
    image: "/projects/blue-phoenix.webp",
    results: [
      { label: "Conversii", value: "+120%" },
      { label: "Creștere % în 2 ani", value: "2329%" },
      { label: "Rată abandon", value: "-70%" },
    ],
    technologies: ["Wordpress", "WooCommerce", "MySQL", "Netopia Payments", "Sameday Courier", "Easybox", "SmartBill", "Klaviyo", "Meta Pixel", "Google Ads"],
    year: "2023",
    enOrder: 7,
    challenge: "Brandul avea nevoie de o prezență online premium care să vorbească despre originea produselor, valorile culturale și beneficiile naturale — combinând narativul cu un magazin ușor de folosit.",
    solution:
      "Am modernizat prezența online a brandului printr-un design curat, adaptat identității vizuale Blue Phoenix, cu accent pe claritate, coerență și experiență de navigare. Platforma este optimizată pentru viteză de încărcare și utilizare fluentă pe toate dispozitivele, iar structura paginilor este gândită pentru a susține conversia — de la descoperirea produselor până la achiziție. Arhitectura permite extinderea ulterioară a funcționalităților, fără a compromite performanța sau simplitatea experienței.",
    liveUrl: "https://blue-phoenix.ro/",
  },
  {
    id: "9",
    slug: "merpano",
    title: "Merpano - Website de prezentare companie",
    client: "Merpano SRL",
    category: "website",
    categoryLabel: "Website de prezentare",
    description:
      "Merpano este o companie importantă din industria agricolă din Vestul României, activă în furnizarea de echipamente, soluții și consultanță pentru fermieri și parteneri din domeniu. Website-ul servește ca unul dintre punctele principale de contact digital: prezentare corporate, portofoliu produse, servicii, echipă și valori.",
    shortDescription: "Website de prezentare pentru o companie importantă din industria agricolă.",
    image: "/projects/merpano-proiect.webp",
    results: [
      { label: "Core Web Vitals - SEO ", value: "100%" },
      { label: "Timp mediu petrecut pe site", value: "2:04 min" },
      { label: "Retenție", value: "68%" },
    ],
    technologies: ["Wordpress", "Elementor", "SEO"],
    year: "2024",
    enOrder: 12,
    challenge:
      "Website-ul existent nu reflecta pe deplin nivelul și profesionalismul companiei: structură depășită, vizual neconectat la brand și UX neoptimizat. Era nevoie de o prezență digitală modernă, coerentă și orientată spre încredere, care să pună în valoare portofoliul larg de produse și expertiza echipei.",
    solution:
      "Am reconceput site-ul Merpano din temelii cu un focus puternic pe modernizare, profesionalism și adaptare vizuală la poziționarea companiei. Am construit un design curat și coerent, ferit de elemente învechite, astfel încât fiecare secțiune — de la servicii și produse până la echipă — să fie ușor de parcurs, intuitivă și credibilă vizual. Structura paginilor și elementele interactive sunt gândite pentru a susține claritatea mesajului și încrederea vizitatorului, în timp ce viteza de încărcare, navigarea și experiența pe mobil asigură o interacțiune eficientă pentru toți utilizatorii. Implementarea pe WordPress cu Elementor personalizat permite gestionarea facilă a conținutului și scalabilitate pe termen lung.",
    liveUrl: "https://merpano.ro/",
  },
  
]


// Manual array of all projects - edit titles, descriptions, URLs, and order here
export const simpleProjects: SimpleProject[] = [
  // Website de prezentare
    {
    id: "s1",
    title: "artimm.digital",
    client: "Artimm Digital SRL",
    category: "website",
    categoryLabel: "Website de prezentare",
    image: "/projects/website-de-prezentare-artimm-digital.webp",
    liveUrl: "https://artimm.digital/",
    year: "2025",
    shortDescription: "Website de prezentare companie de consultanță digitală, Web design, Web development, SEO",
    order: 1,
  },
  {
    id: "s45",
    title: "Bradluc - Mentenanță Piscine",
    client: "Bradluc M & D SRL",
    category: "website",
    categoryLabel: "Website de prezentare",
    image: "/projects/website-de-prezentare-timisoara-bradluc_curatenie.webp",
    liveUrl: "https://piscinetimis.ro/",
    year: "2024",
    shortDescription: "Website de prezentare - Servicii de curățenie și mentenanță piscine, Web design, Web development",
    order: 45,
  },
  {
    id: "s2",
    title: "Thermo Solar Energy",
    client: "Thermo Solar SRL",
    category: "website",
    categoryLabel: "Website de prezentare",
    image: "/projects/proiect-website-prezentare-thermo-solar-energy.webp",
    liveUrl: "http://thermosolarenergy.ro/",
    year: "2023",
    shortDescription: "Website de prezentare compamnie vanzare de panouri fotovoltaice, Web Design, Mentenanță, Găzduire domeniu, SEO",
    order: 64
  },
  {
    id: "s3",
    title: "Revelio Medical Global",
    client: "Relive Care SRL",
    category: "website",
    categoryLabel: "Website de prezentare",
    image: "/projects/website-de-prezentare-Revelio.webp",
    liveUrl: "https://reveliomedical.com/",
    year: "2024",
    shortDescription: "Website de prezentare și achiziție abonamente medicale și descărcare aplicație mobilă, Web design, Web development, Mentenanță, domeniu, SEO",
    order: 20,
  },
  {
    id: "s4",
    title: "NN News Media",
    client: "Internațional",
    category: "website",
    categoryLabel: "Website Știri",
    image: "/projects/website-stiri-blog-NN News Media.webp",
    liveUrl: "https://nnnewsmedia.com/",
    year: "2024",
    shortDescription: "Website de știri - Nigeria, Web Design, Design Grafic, Mentenanță, Găzduire domeniu, SEO",
    order: 43,
  },
  {
    id: "s5",
    title: "Hobby Art Afterschool",
    client: "Hobby Art SRL",
    category: "website",
    categoryLabel: "Website de prezentare",
    image: "/projects/proiect-website-prezentare-afterschool-dumbravita-hobby-art.webp",
    liveUrl: "https://afterschool-dumbravita.ro/",
    year: "2023",
    shortDescription: "Website de prezentare afterschool, Web Design, Mentenanță, Găzduire domeniu, SEO",
    order: 50,
  },
  {
    id: "s6",
    title: "Proval",
    client: "Proval Just SRL",
    category: "website",
    categoryLabel: "Website de prezentare",
    image: "/projects/website-de-prezentare-timisoara-Proval.webp",
    liveUrl: "https://proval.ro/",
    year: "2024",
    shortDescription: "Website de prezentare evaluator + formular de evaluare rapida cu plata online, Web design, Web Development, SEO",
    order: 6,
  },
  {
    id: "s7",
    title: "Luxury Cleaning",
    client: "PFA - Confidențial",
    category: "website",
    categoryLabel: "Website de prezentare",
    image: "/projects/website-de-prezentare-timisoara-Luxury Cleaning.webp",
    liveUrl: "http://luxurycleaning.ro/",
    year: "2024",
    shortDescription: "Website de prezentare firmă de curățenie, Web Design, SEO",
    order: 61,
  },
  {
    id: "s8",
    title: "DezzignIst",
    client: "Confidențial",
    category: "website",
    categoryLabel: "Website de prezentare",
    image: "/projects/website-de-prezentare-dezzign.webp",
    liveUrl: "https://dezzign.ist/",
    year: "2024",
    shortDescription: "Pagină de prezentare - Designer de interior, Web design, Web development, SEO",
    order: 67,
  },
  {
    id: "s11",
    title: "TheRadar",
    client: "PFA - Confidențial",
    category: "website",
    categoryLabel: "Website de prezentare",
    image: "/projects/website-de-prezentare-TheRadar.webp",
    liveUrl: "https://theradar.info/",
    year: "2025",
    shortDescription: "Website de prezentare - Change agent, Web design, Web development, SEO, Mentenanta",
    order: 63,
  },
  {
    id: "s12",
    title: "Youplus Agency",
    client: "YouPlus Agency SRL",
    category: "website",
    categoryLabel: "Website de prezentare",
    image: "/projects/website-de-prezentare-Youplus.webp",
    liveUrl: "https://youplusagency.ro/",
    year: "2025",
    shortDescription: "Website de prezentare și achiziții cursuri - Agenție de marketing, Web design, Web development, Achiziție în rate cursuri, Design Grafic, SEO",
    order: 9,
  },
  {
    id: "s13",
    title: "ATP Apitherapie Austria",
    client: "PFA - Confidențial",
    category: "website",
    categoryLabel: "Website de prezentare",
    image: "/projects/website-de-prezentare-ATP.webp",
    liveUrl: "https://atp-apitherapie.com/",
    year: "2023",
    shortDescription: "Design landing page, Găzduire domeniu, SEO",
    order: 67,
  },
  {
    id: "s15",
    title: "Best Tim Travel",
    client: "Best Tim Travel SRL",
    category: "website",
    categoryLabel: "Website de prezentare",
    image: "/projects/website-de-prezentare-Best Tim Travel.webp",
    liveUrl: "https://timtravel.ro/",
    year: "2025",
    shortDescription: "Website de prezentare - Agenție de turism, Web design, Web development, Design Grafic, SEO",
    order: 15,
  },
  {
    id: "s18",
    title: "eDrones",
    client: "Confidențial",
    category: "website",
    categoryLabel: "Website de prezentare",
    image: "/projects/website-de-prezentare-timisoara-e-Drones.webp",
    liveUrl: "https://edrones.ro/",
    year: "2024",
    shortDescription: "Website de preszentare - Drone agricole, Web design, Web Development, SEO",
    order: 13,
  },
  {
    id: "s20",
    title: "Maravo Clinic",
    client: "Maravo SRL",
    category: "website",
    categoryLabel: "Website de prezentare",
    image: "/projects/website-de-prezentare-Maravo.webp",
    liveUrl: "https://maravoclinic.ro/",
    year: "2025",
    shortDescription: "Website de prezentare clinică de înfrumusețare, Web design, Graphic design, Consultanta, Web development, Mentenanță, domeniu, SEO",
    order: 3,
    enOrder: 11,
  },
  {
    id: "s21",
    title: "PowerJet Wash",
    client: "NAGY Evolution Construct SRL",
    category: "website",
    categoryLabel: "Website de prezentare",
    image: "/projects/website-de-prezentare-timisoara-NAGY EVOLUTION CONSTRUCT.webp",
    liveUrl: "https://powerjetwash.ro/",
    year: "2023",
    shortDescription: "Website de prezentare - Servicii curățenie pavaje, Web design, Web development, Design Grafic",
    order: 21,
  },
  {
    id: "s23",
    title: "Horvel Cleaning Services",
    client: "Horvel Cleaning Services SRL",
    category: "website",
    categoryLabel: "Website de prezentare",
    image: "/projects/website-de-prezentare-timisoara-curatenie-Horvel.webp",
    liveUrl: "https://horvel.ro/",
    year: "2024",
    shortDescription: "Website de prezentare - Firmă de curățenie, Web design, Web development, Formular complex de rezervări, Design Grafic, SEO",
    order: 23,
  },
  {
    id: "s24",
    title: "RD Automatim",
    client: "R & D Automatim SRL",
    category: "website",
    categoryLabel: "Website de prezentare",
    image: "/projects/website-de-prezentare-rdautomatim.webp",
    liveUrl: "https://rdautomatim.com/",
    year: "2025",
    shortDescription: "Website de prezentare - Automatizări industriale, Web design, Web development, SEO",
    order: 24,
    enOrder: 13,
  },
  {
    id: "s25",
    title: "Radiotron Tehnologies",
    client: "Radiotron Tehnologies SRL",
    category: "website",
    categoryLabel: "Website de prezentare",
    image: "/projects/website-de-prezentare-radiotron.webp",
    liveUrl: "https://radiotron.ro/",
    year: "2025",
    shortDescription: "Website de prezentare - Medicină nucleară, Web design, Web development, SEO",
    order: 25,
  },
  {
    id: "s26",
    title: "OK Auto",
    client: "OK Auto SRL",
    category: "website",
    categoryLabel: "Website auto",
    image: "/projects/website-auto-okauto.webp",
    liveUrl: "https://okautotm.ro/",
    year: "2025",
    shortDescription: "Website de prezentare - Website de prezetare și vânzare auto, Web design, Web Development, SEO, Mentenanță",
    order: 26,
  },
  {
    id: "s27",
    title: "Therapy Energy",
    client: "Confidențial",
    category: "website",
    categoryLabel: "Website de prezentare",
    image: "/projects/website-de-prezentare-terapie-energetica.webp",
    liveUrl: "https://terapia-energetica.ro/",
    year: "2024",
    shortDescription: "Website prezentare - Terapie Energetică, Web design, Web development, Design Grafic",
    order: 27,
  },
  {
    id: "s28",
    title: "Restaurant Evoratest",
    client: "Evoratest SRL",
    category: "website",
    categoryLabel: "Website de prezentare",
    image: "/projects/website-de-prezentare-timisoara-Evoratest.webp",
    liveUrl: "https://evoratest.ro/",
    year: "2024",
    shortDescription: "Website de prezentare restaurant, Pagină meniu, QR, Web design, Web development, Design Grafic",
    order: 28,
  },
  {
    id: "s29",
    title: "Pâinea pe Ape",
    client: " Asociatia umanitara ,,Painea pe ape “",
    category: "website",
    categoryLabel: "Website asociație",
    image: "/projects/website-asociatie-donatii-Painea pe ape.webp",
    liveUrl: "https://paineapeape.ro",
    year: "2024",
    shortDescription: "Website ONG, Sitem donație, Web design, Web development, Design Grafic",
    order: 29,
  },
  {
    id: "s30",
    title: "BimTim Design",
    client: "Bimtim Design SRL",
    category: "website",
    categoryLabel: "Website de prezentare",
    image: "/projects/website-de-prezentare-bimtim.webp",
    liveUrl: "https://bimtim.com/",
    year: "2025",
    shortDescription: "Website de prezentare - Proiectare digitală clădiri, Web design, Web development, Portofoliu, Design Grafic, SEO",
    order: 14,
  },
  {
    id: "s31",
    title: "AC Green Power Consulting",
    client: "AC Green Power Consulting SRL",
    category: "website",
    categoryLabel: "Website de prezentare",
    image: "/projects/website-de-prezentare-AC green.webp",
    liveUrl: "https://ac-green-power.eu/",
    year: "2025",
    shortDescription: "Website de prezentare consultanță și proiectare sisteme green power, Web design, Web development, Design grafic, SEO",
    order: 31,
  },
  {
    id: "s32",
    title: "Mobile Spa",
    client: "Confidențial",
    category: "website",
    categoryLabel: "Website de prezentare",
    image: "/projects/website-de-prezentare-mobileSpa.webp",
    liveUrl: "https://mobilespa.ro/",
    year: "2025",
    shortDescription: "Pagină de prezentare - Închirierea ciubăr mobil, Web design, Web development, SEO, Design Logo și Branding",
    order: 32,
  },
  {
    id: "s34",
    title: "Avocat Jurjut-Mart",
    client: "Confidențial",
    category: "website",
    categoryLabel: "Website de prezentare",
    image: "/projects/website-de-prezentare-timisoara-avocat-Jurjut.webp",
    liveUrl: "https://jurjut-mart.ro/",
    year: "2023",
    shortDescription: "Website de prezentare avocați, Web design, Mentenanță, Găzduire domeniu, Design Logo, SEO",
    order: 15,
  },
  {
    id: "s35",
    title: "Cika România",
    client: "Cika SRL",
    category: "website",
    categoryLabel: "Website de prezentare",
    image: "/projects/website-de-prezentare-Cika.webp",
    liveUrl: "https://www.cika-romania.ro/",
    year: "2025",
    shortDescription: "Website de preszentare - Companie produse alimentare pentru industria Horeca, Web design, Web Development, SEO",
    order: 35,
  },
  {
    id: "s38",
    title: "Vici Evolution",
    client: "Vici Evolution SRL",
    category: "website",
    categoryLabel: "Website de prezentare",
    image: "/projects/website-de-prezentare-vici-evolution.webp",
    liveUrl: "https://vicievolution.ro/",
    year: "2024",
    shortDescription: "Website de prezentare companie de medicina nucleara, Web design, Web development, SEO",
    order: 38,
  },
  {
    id: "s39",
    title: "ONG Ame de Vie",
    client: "Asociația Ame de Vie",
    category: "website",
    categoryLabel: "Website de prezentare",
    image: "/projects/website-de-prezentare-ong-ame-de-vie.webp",
    liveUrl: "https://amedevie.ro/",
    year: "2025",
    shortDescription: "Website de prezentare asociație ONG, Web design, Web development, SEO, Găzduire domeniu",
    order: 39,
  },
  {
    id: "s40",
    title: "Move Auto",
    client: "Confidențial",
    category: "website",
    categoryLabel: "Website auto",
    image: "/projects/website-de-prezentare-move-auto.webp",
    liveUrl: "https://moveauto.ro/",
    year: "2025",
    shortDescription: "Website de prezentare, Web Design, Web development, Design Logo, Găzduire domeniu, SEO",
    order: 40,
  },
  {
    id: "s41",
    title: "Lami Ing Eur",
    client: "Lami Ing Eur SRL",
    category: "website",
    categoryLabel: "Website de prezentare",
    image: "/projects/website-de-prezentare-lami-ing.webp",
    liveUrl: "https://lami-ingeur.ro/",
    year: "2025",
    shortDescription: "Website de prezentare companie de automatizari industriale, Web design, Web development, SEO",
    order: 41,
  },
  {
    id: "s42",
    title: "Înființare SRL",
    client: "Prime Smart Innovations SRL",
    category: "website",
    categoryLabel: "Website de prezentare",
    image: "/projects/website-de-prezentare-infiintare-srl.webp",
    liveUrl: "https://infiintaresrl-nou.ro/",
    year: "2025",
    shortDescription: "Website de prezentare, Web design, Web development, Design Logo,",
    order: 42,
  },
  {
    id: "s43",
    title: "Geonordica",
    client: "Geonordica SRL",
    category: "website",
    categoryLabel: "Website de prezentare",
    image: "/projects/website-de-prezentare-geonordica.webp",
    liveUrl: "https://www.geonordica.ro/",
    year: "2025",
    shortDescription: "Website de prezentare firma topografica Iași, Web design, Web development, Mentenanță, Găzduire, SEO",
    order: 4,
  },
  {
    id: "s44",
    title: "Avocat Hinda",
    client: "Confidențial",
    category: "website",
    categoryLabel: "Website de prezentare",
    image: "/projects/website-de-prezentare-avocat-hinda.webp",
    liveUrl: "https://avocathinda.ro/",
    year: "2025",
    shortDescription: "Website de prezentare avocat, Web design, Mentenanță, Găzduire domeniu, Design Logo, SEO",
    order: 44,
  },
  {
    id: "s46",
    title: "Arpeggio Clinic",
    client: "Arpeggio Clinic AB",
    category: "website",
    categoryLabel: "Website de prezentare",
    image: "/projects/website-de-prezentare-arpeggio-clinic.webp",
    liveUrl: "#",
    year: "2025",
    shortDescription: "Website de prezentare clinică terapeutică suedeză, Web Design, Web Development, Graphic design, SEO",
    order: 46,
  },
  // Magazine online
  {
    id: "s47",
    title: "DKP Solutions",
    client: "DPK Solutions SRL",
    category: "ecommerce",
    categoryLabel: "Magazin online",
    image: "/projects/magazin-online-timisoara-DPK.webp",
    liveUrl: "https://dkpsolutions.ro/",
    year: "2024",
    shortDescription: "Magazin online si inchiriere scule Timișoara, Web design, Web development, Design grafic, Mentenanță, SEO",
    order: 47,
  },
  // La Pinocchio a fost promovat în studiile de caz (vezi featuredProjects → /portofoliu/la-pinocchio)
  {
    id: "s49",
    title: "Scar Influence",
    client: "Confidențial",
    category: "ecommerce",
    categoryLabel: "Magazin online",
    image: "/projects/magazin-online-Scar.webp",
    liveUrl: "Aplicație online de vânzare haine adolescenți, Scanare QR unic Web design, Web Development, Next.js - React, Găzduire, SEO, Mentenanta",
    year: "2025",
    shortDescription: "Aplicație online de vânzare haine adolescenți, Scanare QR unic Web design, Web Development, Next.js - React, Găzduire, SEO, Mentenanta",
    order: 5,
  },
  {
    id: "s51",
    title: "Rigolabeton.ro",
    client: "Confidențial",
    category: "ecommerce",
    categoryLabel: "Magazin online",
    image: "/projects/magazin-online-Rigolabeton.webp",
    liveUrl: "https://rigolabeton.ro/",
    year: "2024",
    shortDescription: "Magazin online - Firmă de construcții, Web design, Mentenanță, Design Logo, SEO",
    order: 51,
  },
  {
    id: "s52",
    title: "Frentzy Supermarket",
    client: "Frentzy Fresh Carn SRL",
    category: "ecommerce",
    categoryLabel: "Magazin online",
    image: "/projects/magazin-online-timisoara-Frentzy.webp",
    liveUrl: "https://frentzy.ro/",
    year: "2023",
    shortDescription: "Supermarket Online, Web design, Web development, Administrare, Design grafic, Marketing digital, SEO",
    order: 52,
  },
  {
    id: "s53",
    title: "Bradluc - Magazin online",
    client: "Bradluc M & D SRL",
    category: "ecommerce",
    categoryLabel: "Magazin online",
    image: "/projects/magazin-online-timisoara-bradluc.webp",
    liveUrl: "https://bradluc.ro/",
    year: "2024",
    shortDescription: "Magazin online produse piscină, Web design, Web development",
    order: 53,
  },
  {
    id: "s54",
    title: "Ornella Fusion Gallery",
    client: "Ornella Fusion Gallery SRL",
    category: "ecommerce",
    categoryLabel: "Magazin online",
    image: "/projects/magazin-online-timisoara-Ornella Gallery.webp",
    liveUrl: "https://ornellafusiongallery.com/",
    year: "2024",
    shortDescription: "Magazin Online - Galerie de Artă, Web design, Web development, SEO",
    order: 54,
  },
  {
    id: "s55",
    title: "Ornella Design",
    client: "Ornella Design SRL",
    category: "ecommerce",
    categoryLabel: "Magazin online",
    image: "/projects/magazin-online-timisoara-Ornella.webp",
    liveUrl: "https://ornelladesign.ro/",
    year: "2023",
    shortDescription: "Magazin Online - Print Shop, Web design, Web Development, SEO",
    order: 55,
  },
  {
    id: "s61",
    title: "Restaurant Gloria",
    client: "URBAN KITCHEN SRL",
    category: "ecommerce",
    categoryLabel: "Magazin online",
    image: "/projects/magazin-online-timisoara-Gloria.webp",
    liveUrl: "https://restaurant-gloria.ro/",
    year: "2024",
    shortDescription: "Magazin online - restaurant comenzi la domiciliu, Mentenanță, Marketing Digital, Web Design, Web Development, Design grafic, SEO",
    order: 7,
  },
  {
    id: "s62",
    title: "ExtensioMob",
    client: "Confidential",
    category: "ecommerce",
    categoryLabel: "Magazin online",
    image: "/projects/magazin-online-ExtensioMob.webp",
    liveUrl: "https://extensiomob.ro/",
    year: "2025",
    shortDescription: "Magazin online - mobilă transformabilă, Web design, Web Development, SEO",
    order: 62,
  },
  {
    id: "s63",
    title: "Sotherm România",
    client: "Sotherm SRL",
    category: "ecommerce",
    categoryLabel: "Magazin online",
    image: "/projects/magazin-online-Sotherm.webp",
    liveUrl: "https://sotherm.ro/",
    year: "2025",
    shortDescription: "Magazin Online - Companie italiană de produse cosmetice, Web design, Web development, SEO",
    order: 10,
    enOrder: 9,
  },
  {
    id: "s64",
    title: "PV System",
    client: "PV System SRL",
    category: "ecommerce",
    categoryLabel: "Magazin online",
    image: "/projects/magazin-online-PVsystems.webp",
    liveUrl: "https://pvsystem.ro/",
    year: "2025",
    shortDescription: "Magazin online și calculator sisteme panouri fotovoltaice complete, sistem prețuri în funcție de rolul utilizatorului, Web design, Web development, Mentenanță, domeniu, SEO",
    order: 2,
  },
  {
    id: "s65",
    title: "Ceramiqa",
    client: "Ceramiqa SRL",
    category: "ecommerce",
    categoryLabel: "Magazin online",
    image: "/projects/magazin-online-Ceramiqa.webp",
    liveUrl: "https://ceramiqa.ro/",
    year: "2025",
    shortDescription: "Magazin online produse sanitare și decor, Web design, Web development, Design grafic, Mentenanță, SEO, Logo & Branding design",
    order: 65,
  },
  {
    id: "s66",
    title: "Pet Zaniverse",
    client: "Zaniverse SRL",
    category: "ecommerce",
    categoryLabel: "Magazin online",
    image: "/projects/magazin-online-zaniverse.webp",
    liveUrl: "http://petzaniverse.ro/",
    year: "2026",
    shortDescription: "Magazin online pet shop, Web design, Web development, Design grafic, Mentenanță, SEO, Logo & Branding design",
    order: 12,
  },
  {
    id: "s67",
    title: "Sotherm Italia",
    client: "Sotherm Italia SRL",
    category: "ecommerce",
    categoryLabel: "Magazin online",
    image: "/projects/magazin-online-sotherm-italia.webp",
    liveUrl: "https://sotherm.it/",
    year: "2025",
    shortDescription: "Platformă online pentru organizarea evenimentelor, Web design, Web development, React-Next.js, Mentenanță, Găzduire, Logo & Branding design, SEO",
    order: 11,
    enOrder: 10,
  },
  {
    id: "s68",
    title: "The Permanent",
    client: "Beauty That Lasts LTD",
    category: "ecommerce",
    categoryLabel: "Magazin online",
    image: "/projects/magazin-online-the-permanent.webp",
    liveUrl: "https://the-permanent.com/",
    year: "2025",
    shortDescription: "Magazin online pentru produse cosmetice, sistem de fidelizare clienți, Web design, Web development, Mentenanță, SEO",
    order: 8,
  },
  // Platforme custom
  {
    id: "s70",
    title: "Document Rapid",
    client: "Team-Cad Vest SRL",
    category: "custom",
    categoryLabel: "Platformă custom",
    image: "/projects/platforma-online-extrasCF-documentrapid.webp",
    liveUrl: "https://documentrapid.ro/",
    year: "2025",
    shortDescription: "Platformă online pentru achizitionarea extraselor CF ANCPI, Web design, Web development, Mentenanță, Găzduire, SEO",
    order: 17,
  },
  {
    id: "s71",
    title: "Displayer",
    client: "Displayer SRL",
    category: "ecommerce",
    categoryLabel: "Catalog online",
    image: "/projects/catalog-online-magazin-displayer.webp",
    liveUrl: "https://www.displayer.ro/",
    year: "2025",
    shortDescription: "Website de prezentare standuri expo, Web design, Web development, Mentenanță, SEO",
    order: 18,
  },
]

const categoryFiltersRo = [
  { value: "all", label: "Toate proiectele" },
  { value: "website", label: "Website-uri" },
  { value: "ecommerce", label: "Magazine online" },
  { value: "app", label: "Aplicații mobile" },
  { value: "custom", label: "Platforme custom" },
]
const categoryFilters = { ro: categoryFiltersRo, en: categoryFiltersRo } satisfies Record<Locale, typeof categoryFiltersRo>

export function getCategoryFilters(locale: Locale) {
  return categoryFilters[locale]
}

function localize<T extends { en?: Partial<T> }>(project: T, locale: Locale): T {
  if (locale !== "en" || !project.en) return project
  return { ...project, ...project.en }
}

export function getProjects(
  locale: Locale,
  source: { featured: FeaturedProject[]; simple: SimpleProject[] } = { featured: featuredProjects, simple: simpleProjects },
): { featured: FeaturedProject[]; simple: SimpleProject[] } {
  if (locale === "ro") {
    return {
      featured: source.featured,
      simple: [...source.simple].sort((a, b) => (a.order ?? 999) - (b.order ?? 999)),
    }
  }
  const featured = source.featured
    .map((p, index) => ({ p, key: p.enOrder ?? 1000 + index }))
    .sort((a, b) => a.key - b.key)
    .map(({ p }) => localize(p, locale))
  const simple = source.simple
    .map((p) => ({ p, key: p.enOrder ?? 1000 + (p.order ?? 999) }))
    .sort((a, b) => a.key - b.key)
    .map(({ p }) => localize(p, locale))
  return { featured, simple }
}
