# SEO Recovery Plan — Website Factory — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Recuperare pozițiilor organice Google (1-3) pentru "creare site / web design Timișoara" și expansiunea autorității topical prin pagini orașe de-templatizate, content cluster Timișoara, pagini autor E-E-A-T și AEO/llms enhancements.

**Architecture:** Next.js 16 App Router cu fișiere de date TypeScript per oraș / autor (`lib/cities-data.ts`, `lib/authors-data.ts`), componente reutilizabile pentru deep-dive locale, MDX pentru blog posts, JSON-LD schemas extinse în `lib/seo.ts`. Lansare graduală cu commits frecvente pentru monitorizare GSC.

**Tech Stack:** Next.js 16, React 19, TypeScript, Tailwind 4, MDX (next-mdx-remote), JSON-LD schema.org, Lucide icons.

**Reference spec:** `docs/superpowers/specs/2026-05-27-seo-recovery-plan-design.md`

**Verification approach:** Proiectul nu are framework de testare configurat (no jest/vitest/playwright). Verificarea fiecărei task-uri folosește:
- `npm run build` — verifică build success (no TS errors)
- `npx tsc --noEmit` — type checking standalone
- Google Rich Results Test (https://search.google.com/test/rich-results) — schema validation
- Lighthouse (Chrome DevTools sau `npx lighthouse <url>`) — SEO score ≥ 95
- Visual check pe `npm run dev` la `localhost:3000`

---

## Task 1: Baseline measurement — capture current state

**De ce:** Trebuie să avem un baseline înainte să atingem ceva, ca să măsurăm impactul.

**Files:**
- Create: `docs/seo-tracking/baseline-2026-05-27.md`
- Create: `docs/seo-tracking/deployment-log.md`

- [ ] **Step 1: Create tracking folder structure**

```powershell
New-Item -ItemType Directory -Force -Path "docs/seo-tracking" | Out-Null
```

- [ ] **Step 2: Create baseline snapshot file**

Create `docs/seo-tracking/baseline-2026-05-27.md`:

```markdown
# SEO Baseline Snapshot — 2026-05-27

## Google Search Console (90 zile până 2026-05-27)
- Total clicks: 777
- Total impressions: 285,000
- Average CTR: 0.3%
- Average position: 39.2

## Top queries
| Query | Impressions | Clicks | CTR | Est. Position |
|---|---|---|---|---|
| website factory | 1,312 | 187 | 14.3% | 1-2 |
| web design timisoara | 4,570 | 77 | 1.7% | 6-10 |
| creare site timisoara | 2,026 | 26 | 1.3% | 7-10 |
| web factory | 68 | 24 | 35% | 1-2 |
| creare site bucuresti | 9,464 | 19 | 0.2% | 15-25 |
| creare site web | 14,285 | 15 | 0.1% | 20+ |
| websitefactory | 77 | 14 | 18% | 1 |
| creare website | 8,542 | 11 | 0.13% | 20+ |
| webdesign timisoara | 1,106 | 10 | 0.9% | 8-12 |
| creare site iasi | 419 | 9 | 2.1% | 5-8 |

## Ahrefs
- Domain Rating: 50
- Backlinks: 87,000
- Linking websites: 198 (31% dofollow ≈ 61 dofollow domains)

## Trending up (28 zile)
- Home page (Timișoara): +31% clicks
- /creare-site-bucuresti: +300% clicks
- /creare-site-constanta: stable

## Pagini indexate
- TODO: Verifică în GSC > Indexing > Pages — completează după prima rulare

## Core Web Vitals
- TODO: Rulează Lighthouse pe home + 2 city pages — completează după măsurătoare
```

- [ ] **Step 3: Create deployment log**

Create `docs/seo-tracking/deployment-log.md`:

```markdown
# SEO Recovery — Deployment Log

| Date | Task | Files changed | Notes |
|---|---|---|---|
| 2026-05-27 | Baseline captured | docs/seo-tracking/baseline-2026-05-27.md | Start of recovery project |
```

- [ ] **Step 4: Verify files exist**

Run: `Test-Path "docs/seo-tracking/baseline-2026-05-27.md" -and (Test-Path "docs/seo-tracking/deployment-log.md")`
Expected: `True`

- [ ] **Step 5: Commit**

```powershell
git add docs/seo-tracking/
git commit -m "docs(seo): add baseline measurement snapshot 2026-05-27"
```

---

## Task 2: Schema enrichment — extend lib/seo.ts

**De ce:** Schema mai bogată = rich results mai bune + semnal de autoritate pentru AEO/AI.

**Files:**
- Modify: `lib/seo.ts` (adăugare funcții la final)

- [ ] **Step 1: Read current lib/seo.ts to understand structure**

Run: `Get-Content lib/seo.ts | Measure-Object -Line`
Verifică că ai citit fișierul complet (272 linii actualmente).

- [ ] **Step 2: Add `generateServiceWithOfferSchema` function**

Adaugă la final în `lib/seo.ts`:

```ts
// Service schema with Offer/Price for city pages
export function generateServiceWithOfferSchema({
  name,
  description,
  url,
  priceFrom,
  priceCurrency = "EUR",
  areaServed = "România",
}: {
  name: string
  description: string
  url: string
  priceFrom: number
  priceCurrency?: string
  areaServed?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    url: `${siteConfig.url}${url}`,
    provider: {
      "@type": "LocalBusiness",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    areaServed: {
      "@type": "Place",
      name: areaServed,
    },
    offers: {
      "@type": "Offer",
      price: priceFrom,
      priceCurrency,
      priceSpecification: {
        "@type": "PriceSpecification",
        minPrice: priceFrom,
        priceCurrency,
        valueAddedTaxIncluded: false,
      },
      availability: "https://schema.org/InStock",
    },
  }
}
```

- [ ] **Step 3: Add `generatePersonSchemaFull` function**

Adaugă în `lib/seo.ts`:

```ts
// Extended Person schema with E-E-A-T signals
export function generatePersonSchemaFull({
  name,
  jobTitle,
  description,
  image,
  url,
  sameAs = [],
  knowsAbout = [],
  alumniOf,
}: {
  name: string
  jobTitle: string
  description: string
  image?: string
  url: string
  sameAs?: string[]
  knowsAbout?: string[]
  alumniOf?: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name,
    jobTitle,
    description,
    url: `${siteConfig.url}${url}`,
    image: image ? `${siteConfig.url}${image}` : undefined,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    knowsAbout,
    sameAs,
    ...(alumniOf && {
      alumniOf: {
        "@type": "EducationalOrganization",
        name: alumniOf,
      },
    }),
  }
}
```

- [ ] **Step 4: Add `generateArticleSchema` function**

Adaugă în `lib/seo.ts`:

```ts
// Article schema for blog posts with Person author ref
export function generateArticleSchema({
  headline,
  description,
  datePublished,
  dateModified,
  authorName,
  authorSlug,
  image,
  url,
}: {
  headline: string
  description: string
  datePublished: string
  dateModified?: string
  authorName: string
  authorSlug: string
  image: string
  url: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline,
    description,
    image: `${siteConfig.url}${image}`,
    datePublished,
    dateModified: dateModified || datePublished,
    author: {
      "@type": "Person",
      name: authorName,
      url: `${siteConfig.url}/despre-noi/${authorSlug}`,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}${url}`,
    },
  }
}
```

- [ ] **Step 5: Add `generateGeoCircleAreaServed` function**

Adaugă în `lib/seo.ts`:

```ts
// GeoCircle for service area
export function generateGeoCircleAreaServed({
  latitude = 45.7489,
  longitude = 21.2087,
  radiusKm = 50,
}: {
  latitude?: number
  longitude?: number
  radiusKm?: number
} = {}) {
  return {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude,
      longitude,
    },
    geoRadius: radiusKm * 1000,
  }
}
```

- [ ] **Step 6: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 7: Verify build passes**

Run: `npm run build`
Expected: build successful, no schema-related errors.

- [ ] **Step 8: Commit**

```powershell
git add lib/seo.ts
git commit -m "feat(seo): add ServiceOffer, PersonFull, Article, GeoCircle schemas"
```

---

## Task 3: Repair llms.txt + create placeholder for /creare-site-timisoara link

**De ce:** llms.txt are link rupt către /creare-site-timisoara. Reparăm acum, pagina o creăm în Task 5.

**Files:**
- Modify: `public/llms.txt` (validate links)

- [ ] **Step 1: Read current llms.txt**

Run: `Get-Content public/llms.txt`
Verifică linkurile către site.

- [ ] **Step 2: No edit needed yet — link will work after Task 5 creates page**

Notă: Lăsăm link-ul ca atare. După Task 5 (creare pagină Timișoara), link-ul devine funcțional. Validare în Task 5.

- [ ] **Step 3: Add deployment log entry**

Append to `docs/seo-tracking/deployment-log.md`:

```markdown
| 2026-05-27 | Task 2: Schema functions added | lib/seo.ts | ServiceOffer, PersonFull, Article, GeoCircle |
```

- [ ] **Step 4: Commit log update**

```powershell
git add docs/seo-tracking/deployment-log.md
git commit -m "docs(seo): log Task 2 completion"
```

---

## Task 4: Create cities-data.ts with localized content per city

**De ce:** Source of truth pentru date locale care alimentează componentele de-templatizate. Conținut unic, nu boilerplate.

**Files:**
- Create: `lib/cities-data.ts`

- [ ] **Step 1: Create cities-data.ts with Timișoara entry (cea mai detaliată, model pentru restul)**

Create `lib/cities-data.ts`:

```ts
export interface CityZone {
  name: string
  description: string
  industries?: string[]
}

export interface CityIndustry {
  name: string
  description: string
  examples: string[]
  keywordHint: string
}

export interface CityFaq {
  question: string
  answer: string
}

export interface CityResource {
  name: string
  url: string
  description: string
}

export interface CityData {
  slug: string
  name: string
  nameGenitive: string
  region: string
  population: string
  geo: { lat: number; lng: number }
  hook: string
  intro: string
  zones: CityZone[]
  industries: CityIndustry[]
  faqs: CityFaq[]
  resources: CityResource[]
  caseStudyTeaser: {
    industry: string
    challenge: string
    result: string
  }
}

export const citiesData: Record<string, CityData> = {
  timisoara: {
    slug: "timisoara",
    name: "Timișoara",
    nameGenitive: "Timișoarei",
    region: "Banat",
    population: "320,000+",
    geo: { lat: 45.7489, lng: 21.2087 },
    hook: "Hub-ul IT al Vestului României, cu peste 500 firme tech și două universități tehnice de top",
    intro:
      "Timișoara este al treilea hub tehnologic al României, cu o economie dominată de IT, automotive și manufacturing. Capitala Europeană a Culturii 2023 atrage anual investiții străine și are una dintre cele mai dinamice scene de startup-uri din țară.",
    zones: [
      {
        name: "Iulius Town & Dumbrăvița",
        description: "Zona corporate și retail premium. Birouri pentru multinationale IT, clienți B2B premium, eCommerce activ.",
        industries: ["IT", "Retail", "Corporate"],
      },
      {
        name: "Centrul Vechi & Piața Unirii",
        description: "Inima istorică a orașului. Restaurante, hoteluri boutique, magazine specializate, servicii premium pentru turiști și locali.",
        industries: ["HoReCa", "Turism", "Retail boutique"],
      },
      {
        name: "Soarelui & Lipovei",
        description: "Zonele rezidențiale dezvoltate. Multe cabinete medicale private, saloane, servicii pentru familii.",
        industries: ["Medical", "Servicii", "Educație"],
      },
      {
        name: "UVT & Politehnica (Complexul Studențesc)",
        description: "Zona academică. Servicii pentru studenți, ed-tech, startup-uri spin-off din universitate.",
        industries: ["EdTech", "Startup", "Servicii studenți"],
      },
      {
        name: "Zona industrială Calea Aradului",
        description: "Parcurile industriale: Continental, Hella, Flex. Furnizori B2B, logistică, manufacturing tech.",
        industries: ["Automotive", "Manufacturing", "B2B"],
      },
    ],
    industries: [
      {
        name: "IT & Software",
        description:
          "Peste 500 de firme tech, de la outsourcing (Continental, Visma) la startup-uri SaaS. Cerere pentru landing pages premium, site-uri career, platforme produs.",
        examples: ["Continental Automotive", "Visma", "Hella", "Bitdefender Lab", "Plenty of Romanian startups"],
        keywordHint: "creare site firma IT timisoara",
      },
      {
        name: "Automotive & Manufacturing",
        description:
          "Polul industrial al regiunii. Furnizori auto pentru Volkswagen, Mercedes, Ford. Au nevoie de site-uri B2B profesionale, secțiuni cariere, conformitate ISO.",
        examples: ["Continental", "Hella", "Yazaki", "Litens"],
        keywordHint: "site corporate furnizor auto timisoara",
      },
      {
        name: "Medical & Cabinete private",
        description:
          "Densitate mare de clinici stomatologice, ginecologice, estetice, fizioterapie. Cer site-uri cu programări online, integrare calendar, recenzii.",
        examples: ["Clinici private Soarelui, Dumbrăvița", "Cabinete stomato Centrul Vechi"],
        keywordHint: "creare site clinica timisoara",
      },
      {
        name: "Retail & eCommerce local",
        description:
          "Magazine specializate care extind online. Mai ales modă, accesorii, produse artizanale, alimente bio.",
        examples: ["Boutique-uri Centrul Vechi", "Producători Banat (vin, brânzeturi)"],
        keywordHint: "magazin online timisoara",
      },
    ],
    faqs: [
      {
        question: "Cât costă crearea unui site web în Timișoara?",
        answer:
          "În Timișoara, prețurile pornesc de la 450€ pentru un site de prezentare (5-8 pagini), 650€ pentru un site corporate multi-pagină, și 1100€ pentru un magazin online cu integrări complete. Pentru firme IT, automotive sau medicale cu cerințe specifice, soluțiile custom încep de la 1500€. Oferim consultanță gratuită pentru a stabili exact ce ai nevoie.",
      },
      {
        question: "Pe ce industrii din Timișoara aveți cea mai multă experiență?",
        answer:
          "Lucrăm intensiv cu firme IT (outsourcing și startup-uri din UVT/Politehnica), furnizori auto (Continental, Hella, supply chain), cabinete medicale private din Soarelui și Dumbrăvița, și producători locali Banat (vin, alimente, artizanat). Înțelegem cerințele specifice ale fiecărei industrii — de la integrări ERP pentru manufacturing la sisteme de programări pentru clinici.",
      },
      {
        question: "Cum mă ajută SEO local pentru o firmă din Iulius / Dumbrăvița / Centrul Vechi?",
        answer:
          "Optimizăm site-ul tău pentru căutări cu specific de zonă: 'cabinet stomatologic Dumbrăvița', 'salon înfrumusețare Soarelui', 'firmă IT Iulius Town'. Configurăm Google Business Profile cu pin exact pe locație, adăugăm scheme structurate pentru zona ta, și creăm conținut localizat pe pagini. Pentru o clinică din Soarelui, de exemplu, urcăm pe primele poziții când cineva caută servicii similare în acea zonă.",
      },
      {
        question: "Aveți experiență cu firmele IT și startup-urile din Timișoara?",
        answer:
          "Da, am livrat zeci de proiecte pentru ecosistemul tech timișorean — landing pages pentru produs SaaS, site-uri career pentru recrutare developeri, platforme MVP pentru startup-uri spin-off UVT/Politehnica, site-uri investor relations. Folosim Next.js, React, TypeScript — același stack pe care îl folosesc echipele tech din oraș, ceea ce facilitează colaborarea tehnică ulterioară.",
      },
      {
        question: "Cum lucrați cu furnizorii auto din zonele industriale (Continental, Hella, etc.)?",
        answer:
          "Pentru furnizori automotive avem un proces adaptat cerințelor lor: conformitate cu standardele ISO/TS 16949, secțiuni 'Cariere' optimizate (recrutează masiv), prezentare profesională a capabilităților tehnice, integrare cu sisteme ERP existente, multilingv (engleză, germană, română). Înțelegem că audiența este B2B internațional și design-ul reflectă asta.",
      },
      {
        question: "Cât durează un proiect de creare site pentru o firmă din Timișoara?",
        answer:
          "Site simplu de prezentare: 1-2 săptămâni. Site corporate (10-20 pagini): 3-4 săptămâni. Site pentru clinică cu programări: 3-5 săptămâni. Magazin online: 4-8 săptămâni. Aplicație web custom pentru startup: 8-16 săptămâni. Comunicăm transparent săptămânal și respectăm deadline-urile.",
      },
      {
        question: "Faceți și mentenanță după lansare?",
        answer:
          "Da, oferim pachete de mentenanță de la 49€/lună (basic) până la SLA enterprise. Acoperim: actualizări de conținut, backup-uri zilnice, monitorizare uptime 24/7, patch-uri securitate, rapoarte lunare de performanță. Pentru clinici și magazine online cu volum mare, oferim suport prioritar cu intervenție rapidă în caz de probleme.",
      },
      {
        question: "Lucrați și cu firme din afara Timișoarei?",
        answer:
          "Da, deservim toată România din Timișoara. Avem clienți activi în București, Cluj, Brașov, Iași, Constanța. Procesul nostru e 100% remote-friendly: comunicare prin video calls, design în Figma, dezvoltare în GitHub. Pentru companii care preferă întâlniri fizice, suntem disponibili în Timișoara sau ne deplasăm pentru proiecte majore.",
      },
      {
        question: "Site WordPress sau custom development — ce recomandați pentru o firmă timișoreană?",
        answer:
          "Depinde de obiective. WordPress (cu WooCommerce pentru shop) e perfect pentru afaceri care vor administrare ușoară, conținut actualizat des, costuri rezonabile — recomandat pentru majoritatea firmelor mici și medii. Custom development (Next.js) este pentru cei care vor performanță maximă, design unic, scalabilitate enterprise — recomandat pentru startup-uri tech, platforme SaaS, site-uri cu trafic mare. Discutăm cu tine ce se potrivește.",
      },
      {
        question: "Cum mă diferențiez de competiția din Timișoara pe Google?",
        answer:
          "Trei piloni: (1) conținut unic și valoros — Google penalizează duplicarea, mai ales pe pagini de servicii; (2) viteză excelentă (Core Web Vitals) — un site rapid urcă; (3) backlinks din ecosistemul local — directoare Banat, presa locală (Tion, Banatul Azi), parteneriate cu IT Cluster. Combinate cu SEO on-page solid, te plasează deasupra agențiilor care doar copiază templates.",
      },
    ],
    resources: [
      {
        name: "Camera de Comerț Timiș",
        url: "https://cciat.ro",
        description: "Cameră de Comerț, Industrie și Agricultură Timiș — listare pentru credibilitate locală",
      },
      {
        name: "IT Cluster Timișoara",
        url: "https://itclustertm.ro",
        description: "Cluster IT regional — membership pentru firme tech din zonă",
      },
      {
        name: "ADTM (Asociația Dezvoltarea Timișoara)",
        url: "https://adtm.ro",
        description: "Asociația de dezvoltare metropolitană",
      },
    ],
    caseStudyTeaser: {
      industry: "Clinică medicală privată",
      challenge: "Programări manuale pe telefon, fără prezență Google, pierdere pacienți către clinicile concurente din zonă",
      result: "Site nou cu sistem booking, +180% programări online în 3 luni, poziția 2 pe Google pentru 'clinică privată Dumbrăvița'",
    },
  },
}
```

- [ ] **Step 2: Verify TypeScript compiles**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit Timișoara data**

```powershell
git add lib/cities-data.ts
git commit -m "feat(seo): add Timisoara city data with zones, industries, FAQs"
```

- [ ] **Step 4: Note for subsequent tasks**

Datele pentru București, Cluj, Brașov, Iași, Constanța se adaugă în task-uri separate (Task 4b-4f) folosind același tip `CityData`. Pentru a păstra plan-ul focalizat și commit-urile granulare, fiecare oraș primește commit propriu cu task-uri parallel-executable.

---

## Task 4b-4f: Add city data for remaining 5 cities

**De ce:** Fiecare oraș primește date locale unice. Aceste task-uri se pot face în paralel.

**Files:**
- Modify: `lib/cities-data.ts` (adăugare entries pentru fiecare oraș)

**Structură per oraș (folosit ca ghid de scriere):**

```
- slug, name, nameGenitive, region
- population, geo (lat/lng)
- hook (1 propoziție unică)
- intro (3-4 propoziții cu context economic local)
- zones: 4-6 zone cheie cu industries și descriere
- industries: 3-5 industrii dominante cu exemple reale
- faqs: minimum 10 Q&A unice (NU refolosite între orașe)
- resources: 2-4 link-uri externe utile
- caseStudyTeaser: 1 mini case study credibil
```

- [ ] **Task 4b: Add București data**

Adaugă în `citiesData`:

Seed:
- Region: Sud-Muntenia
- Population: 1.8M (metropolitan area 2.4M)
- Geo: 44.4268, 26.1025
- Hook: "Capitala și cel mai mare hub economic al României, cu cea mai mare densitate de companii multinationale și startup-uri tech"
- Zone-cheie: Pipera (corporate IT/fintech), Băneasa (lifestyle/retail), Centrul Vechi (HoReCa/turism), Floreasca (corporate/medical), Militari (rezidențial/servicii)
- Industrii: Corporate multinational, Finanțe & Real Estate, IT & Fintech, Medical privat, HoReCa
- Resources: Camera de Comerț București, ANIS, Romanian American Foundation

Scrie complet conform structurii din Task 4 step 1. Minimum 10 FAQ unice pentru București (referențiind zone, prețuri București — mai mari decât TM, particularități corporate).

Commit: `feat(seo): add Bucuresti city data`

- [ ] **Task 4c: Add Cluj-Napoca data**

Seed:
- Region: Nord-Vest
- Population: 320,000+
- Geo: 46.7712, 23.6236
- Hook: "Silicon Valley al României — cea mai mare densitate de startup-uri tech pe cap de locuitor"
- Zone-cheie: Mărăști (corporate tech), Mănăștur (rezidențial), Zorilor (medical), Florești (rezidențial expansiune), Centru (HoReCa/turism)
- Industrii: IT & SaaS, Fintech, Educație tech (UTCN, UBB), Medical privat, Manufacturing
- Resources: Cluj IT Cluster, Transilvania IT, Camera de Comerț Cluj

Commit: `feat(seo): add Cluj-Napoca city data`

- [ ] **Task 4d: Add Brașov data**

Seed:
- Region: Centru
- Population: 250,000
- Geo: 45.6427, 25.5887
- Hook: "Poarta Transilvaniei — turism, manufacturing tradițional și hub-uri logistice"
- Zone-cheie: Centrul Vechi (turism/HoReCa), Tractorul (industrial), Bartolomeu (rezidențial), Răcădău (medical), Drumul Poienii (lifestyle)
- Industrii: Turism, Automotive (Schaeffler, Continental), Logistică, HoReCa, Retail
- Resources: Camera de Comerț Brașov, Brașov Business Club

Commit: `feat(seo): add Brasov city data`

- [ ] **Task 4e: Add Iași data**

Seed:
- Region: Moldova
- Population: 290,000
- Geo: 47.1585, 27.6014
- Hook: "Cel mai mare hub tech din estul României, capitala istorică a Moldovei"
- Zone-cheie: Copou (academic UAIC), Tătărași (rezidențial), Palas (corporate/lifestyle), Păcurari (educational), Centru
- Industrii: IT outsourcing (Continental, Endava), Educație (UAIC, TUIASI), Medical, Servicii financiare
- Resources: Camera de Comerț Iași, Iași Tech Hub

Commit: `feat(seo): add Iasi city data`

- [ ] **Task 4f: Add Constanța data**

Seed:
- Region: Sud-Est
- Population: 263,000
- Geo: 44.1598, 28.6348
- Hook: "Singurul port major al României — logistică maritimă și turism sezonier"
- Zone-cheie: Mamaia (turism), Tomis (centru istoric), Faleză (lifestyle), Tomis Nord (rezidențial), Port (logistică)
- Industrii: Logistică maritimă, Turism (sezonier intens), HoReCa, Construcții, Servicii portuare
- Resources: Camera de Comerț Constanța, Asociația Portuară

Commit: `feat(seo): add Constanta city data`

- [ ] **Verification step pentru toate cele 5 task-uri:**

Run: `npx tsc --noEmit`
Expected: no errors.

Run: `npm run build`
Expected: build successful.

---

## Task 5: Create CityLocalDeepDive components (reusable, data-driven)

**De ce:** Componente care iau `CityData` și randează secțiunile localizate. Reutilizat pe toate city pages.

**Files:**
- Create: `components/cities/city-zones.tsx`
- Create: `components/cities/city-industries-deep.tsx`
- Create: `components/cities/city-case-study.tsx`
- Create: `components/cities/city-faq-extended.tsx`
- Create: `components/cities/city-local-deep-dive.tsx`

- [ ] **Step 1: Create CityZones component**

Create `components/cities/city-zones.tsx`:

```tsx
import { MapPin } from "lucide-react"
import type { CityZone } from "@/lib/cities-data"

export function CityZones({ cityName, zones }: { cityName: string; zones: CityZone[] }) {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Zone & Cartiere din {cityName} pe care le acoperim
          </h2>
          <p className="text-lg text-muted-foreground">
            Cunoaștem specificul fiecărei zone din {cityName} — de la audiența țintă la concurența locală.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {zones.map((zone) => (
            <div
              key={zone.name}
              className="glass-premium rounded-2xl p-6 hover:glow-subtle transition-all duration-300"
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-brand" />
                </div>
                <h3 className="font-heading text-xl font-bold">{zone.name}</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{zone.description}</p>
              {zone.industries && zone.industries.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {zone.industries.map((ind) => (
                    <span
                      key={ind}
                      className="text-xs px-2.5 py-1 rounded-full bg-brand/10 text-brand font-medium"
                    >
                      {ind}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Create CityIndustriesDeep component**

Create `components/cities/city-industries-deep.tsx`:

```tsx
import { Briefcase } from "lucide-react"
import type { CityIndustry } from "@/lib/cities-data"

export function CityIndustriesDeep({
  cityName,
  industries,
}: {
  cityName: string
  industries: CityIndustry[]
}) {
  return (
    <section className="py-16 sm:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            Industrii pe care le cunoaștem în {cityName}
          </h2>
          <p className="text-lg text-muted-foreground">
            Nu vorbim generalități. Iată sectoarele cu care lucrăm activ în {cityName} și pe care le înțelegem în profunzime.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {industries.map((industry) => (
            <div key={industry.name} className="glass-premium rounded-2xl p-8">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 rounded-xl bg-glow-cyan/10 flex items-center justify-center flex-shrink-0">
                  <Briefcase className="w-6 h-6 text-glow-cyan" />
                </div>
                <h3 className="font-heading text-2xl font-bold">{industry.name}</h3>
              </div>
              <p className="text-base text-muted-foreground leading-relaxed mb-4">{industry.description}</p>
              {industry.examples.length > 0 && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                    Exemple
                  </p>
                  <p className="text-sm text-foreground/80">{industry.examples.join(" · ")}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create CityCaseStudy component**

Create `components/cities/city-case-study.tsx`:

```tsx
import { TrendingUp, Target, CheckCircle2 } from "lucide-react"
import type { CityData } from "@/lib/cities-data"

export function CityCaseStudy({ cityName, caseStudy }: { cityName: string; caseStudy: CityData["caseStudyTeaser"] }) {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
              Studiu de caz
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mt-2 mb-4">
              Cum am ajutat o afacere din {cityName}
            </h2>
          </div>

          <div className="glass-premium rounded-3xl p-8 lg:p-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-brand" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Industrie
                  </span>
                </div>
                <p className="font-heading text-lg font-bold">{caseStudy.industry}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle2 className="w-5 h-5 text-glow-cyan" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Provocare
                  </span>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{caseStudy.challenge}</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="w-5 h-5 text-green-500" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Rezultat
                  </span>
                </div>
                <p className="text-sm font-medium text-foreground">{caseStudy.result}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 4: Create CityFaqExtended component**

Create `components/cities/city-faq-extended.tsx`:

```tsx
"use client"

import * as React from "react"
import { ChevronDown } from "lucide-react"
import type { CityFaq } from "@/lib/cities-data"
import { cn } from "@/lib/utils"

export function CityFaqExtended({ cityName, faqs }: { cityName: string; faqs: CityFaq[] }) {
  const [openIndex, setOpenIndex] = React.useState<number | null>(0)

  return (
    <section className="py-16 sm:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Întrebări frecvente — {cityName}
            </h2>
            <p className="text-lg text-muted-foreground">
              Răspunsuri directe la cele mai comune întrebări de la afacerile din {cityName}.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => {
              const isOpen = openIndex === idx
              return (
                <div
                  key={faq.question}
                  className="glass-premium rounded-2xl overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : idx)}
                    className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 hover:bg-brand/5 transition-colors"
                    aria-expanded={isOpen}
                  >
                    <h3 className="font-heading text-base sm:text-lg font-semibold pr-4">
                      {faq.question}
                    </h3>
                    <ChevronDown
                      className={cn(
                        "w-5 h-5 flex-shrink-0 transition-transform duration-300",
                        isOpen && "rotate-180",
                      )}
                    />
                  </button>
                  <div
                    className={cn(
                      "grid transition-all duration-300 ease-in-out",
                      isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="overflow-hidden">
                      <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-sm sm:text-base text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 5: Create CityLocalDeepDive parent component**

Create `components/cities/city-local-deep-dive.tsx`:

```tsx
import type { CityData } from "@/lib/cities-data"
import { CityZones } from "./city-zones"
import { CityIndustriesDeep } from "./city-industries-deep"
import { CityCaseStudy } from "./city-case-study"
import { CityFaqExtended } from "./city-faq-extended"

export function CityLocalDeepDive({ data }: { data: CityData }) {
  return (
    <>
      <CityZones cityName={data.name} zones={data.zones} />
      <CityIndustriesDeep cityName={data.name} industries={data.industries} />
      <CityCaseStudy cityName={data.name} caseStudy={data.caseStudyTeaser} />
      <CityFaqExtended cityName={data.name} faqs={data.faqs} />
    </>
  )
}
```

- [ ] **Step 6: Verify build**

Run: `npx tsc --noEmit && npm run build`
Expected: no errors.

- [ ] **Step 7: Commit**

```powershell
git add components/cities/city-zones.tsx components/cities/city-industries-deep.tsx components/cities/city-case-study.tsx components/cities/city-faq-extended.tsx components/cities/city-local-deep-dive.tsx
git commit -m "feat(cities): add reusable LocalDeepDive components"
```

---

## Task 6: Create Timișoara dedicated page

**De ce:** Pagina lipsă — competitorii au URL exact match `/creare-site-timisoara`. Cea mai importantă pagină nouă din proiect.

**Files:**
- Create: `app/creare-site-timisoara/page.tsx`
- Create: `components/cities/timisoara-hero.tsx`
- Create: `components/cities/timisoara-content.tsx`

- [ ] **Step 1: Create TimisoaraHero component**

Studiază `components/cities/bucharest-hero.tsx` ca referință de stil/structură. Apoi creează `components/cities/timisoara-hero.tsx` cu același pattern dar text complet diferit:

H1: "Creare site Timișoara — agenția locală cu rezultate dovedite"
Subtitle: "150+ proiecte livrate pentru afaceri din Timișoara. Site-uri și magazine online care urcă în top Google și aduc clienți reali, nu doar trafic."
Badge: "Bazați în Timișoara · Sediul în Centrul Vechi"
CTA primary: "Solicită ofertă gratuită" → /contact
CTA secondary: "Vezi prețuri" → /pret-website

- [ ] **Step 2: Create TimisoaraContent component (using CityContent template)**

Studiază `components/cities/bucharest-content.tsx`. Creează `components/cities/timisoara-content.tsx` care folosește `<CityContent>` cu conținut localizat profund pentru Timișoara — diferit de home page și diferit de Bucharest content.

Focus pe:
- De ce conțează SEO pentru firme timișorene (concurența din IT cluster, etc.)
- Industriile dominante din TM (referință la `citiesData.timisoara.industries`)
- SEO local cu zone Timișoara (Iulius, Dumbrăvița, Centrul Vechi, etc.)
- De ce Website Factory e ales locală (bazați în TM, înțeleg piața)

- [ ] **Step 3: Create page.tsx**

Create `app/creare-site-timisoara/page.tsx`:

```tsx
import type { Metadata } from "next"
import { TimisoaraHero } from "@/components/cities/timisoara-hero"
import { TimisoaraContent } from "@/components/cities/timisoara-content"
import { CityServices } from "@/components/cities/city-services"
import { CityBenefits } from "@/components/cities/city-benefits"
import { CityCTA } from "@/components/cities/city-cta"
import { CityLocalDeepDive } from "@/components/cities/city-local-deep-dive"
import { FeaturedWork } from "@/components/home/featured-work"
import { Testimonials } from "@/components/home/testimonials"
import { Process } from "@/components/home/process"
import { citiesData } from "@/lib/cities-data"
import {
  generatePageMetadata,
  generateLocalBusinessSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateServiceWithOfferSchema,
} from "@/lib/seo"

const cityData = citiesData.timisoara
const cityName = cityData.name

export const metadata: Metadata = generatePageMetadata({
  title: `Creare Site Timișoara de la 450€ | Website Factory ★ 4.9`,
  description: `Creare site Timișoara: 150+ proiecte livrate, prețuri de la 450€, SEO inclus. Agenție locală din Centrul Vechi. Cere ofertă gratuită.`,
  path: `/creare-site-timisoara`,
  keywords: [
    "creare site timisoara",
    "web design timisoara",
    "firma web design timisoara",
    "agentie web timisoara",
    "realizare site timisoara",
    "magazin online timisoara",
    "SEO timisoara",
    "site profesional timisoara",
  ],
})

export default function CreareSiteTimisoaraPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateLocalBusinessSchema()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: "Acasă", url: "/" },
              { name: `Creare Site ${cityName}`, url: `/creare-site-timisoara` },
            ]),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateServiceWithOfferSchema({
              name: `Creare Site Web ${cityName}`,
              description: `Servicii profesionale de web design și creare site-uri în ${cityName}. SEO inclus, design custom, suport tehnic.`,
              url: `/creare-site-timisoara`,
              priceFrom: 450,
              areaServed: cityName,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(cityData.faqs)) }}
      />

      <main>
        <TimisoaraHero />
        <CityServices cityName={cityName} />
        <Process />
        <FeaturedWork />
        <TimisoaraContent />
        <CityLocalDeepDive data={cityData} />
        <Testimonials />
        <CityBenefits cityName={cityName} />
        <CityCTA cityName={cityName} />
      </main>
    </>
  )
}
```

- [ ] **Step 4: Update sitemap to include /creare-site-timisoara**

Edit `app/sitemap.ts` — add entry in city section:

```ts
{
  url: `${baseUrl}/creare-site-timisoara`,
  lastModified: currentDate,
  changeFrequency: "weekly",
  priority: 1.0,
},
```

Plaseaz-o ca prima city page (priority 1.0 vs 0.9 pentru celelalte).

- [ ] **Step 5: Add link from home page to /creare-site-timisoara**

Edit `app/page.tsx` — strategy: adăugare unei mențiuni discrete în Hero sau în secțiune după hero. Sau adăugare CTA secundar care duce la pagina locală Timișoara. Decizie: adăugare în Hero proof line, înlocuind "Web design in Timisoara" badge cu un link.

În `components/home/hero.tsx`, line ~103, înlocuiește:
```tsx
<span className="text-xs sm:text-sm font-medium text-foreground/80">
  Web design in Timisoara
</span>
```
cu:
```tsx
<Link href="/creare-site-timisoara" className="text-xs sm:text-sm font-medium text-foreground/80 hover:text-brand transition-colors">
  Creare site Timișoara — vezi servicii →
</Link>
```

(Adaugă `import Link from "next/link"` dacă lipsește.)

- [ ] **Step 6: Verify build + visit page**

Run: `npm run build`
Expected: build success.

Run: `npm run dev` (background), apoi vizitează `http://localhost:3000/creare-site-timisoara`
Expected: pagina se randează, toate secțiunile vizibile.

- [ ] **Step 7: Validate schema on deployed/local URL**

Folosește https://validator.schema.org/ — paste URL local (sau deployed preview) sau paste HTML source.
Expected: 4 schema-uri valide (LocalBusiness, Breadcrumb, ServiceWithOffer, FAQPage).

- [ ] **Step 8: Lighthouse SEO check**

Run în Chrome DevTools sau: `npx lighthouse http://localhost:3000/creare-site-timisoara --only-categories=seo --output=json --output-path=./tmp-lighthouse.json`
Expected: SEO score ≥ 95.

- [ ] **Step 9: Commit**

```powershell
git add app/creare-site-timisoara components/cities/timisoara-hero.tsx components/cities/timisoara-content.tsx app/sitemap.ts components/home/hero.tsx
git commit -m "feat(seo): add dedicated /creare-site-timisoara page with local depth"
```

- [ ] **Step 10: Update deployment log**

Append to `docs/seo-tracking/deployment-log.md`:
```
| 2026-05-27 | Task 6: Timisoara dedicated page | app/creare-site-timisoara/*, sitemap, hero | NEW page, priority 1.0 |
```

---

## Task 7: Integrate CityLocalDeepDive into existing 5 city pages

**De ce:** De-templatizare. Fiecare oraș primește deep-dive unic înainte de FAQ-ul existent.

**Files:**
- Modify: `app/creare-site-bucuresti/page.tsx`
- Modify: `app/creare-site-cluj/page.tsx`
- Modify: `app/creare-site-brasov/page.tsx`
- Modify: `app/creare-site-iasi/page.tsx`
- Modify: `app/creare-site-constanta/page.tsx`

- [ ] **Step 1: Update Bucharest page**

Edit `app/creare-site-bucuresti/page.tsx`:

```tsx
// La imports adaugă:
import { CityLocalDeepDive } from "@/components/cities/city-local-deep-dive"
import { citiesData } from "@/lib/cities-data"

const cityDataExt = citiesData.bucuresti

// În JSX, plasează <CityLocalDeepDive data={cityDataExt} /> 
// IMEDIAT DUPĂ <BucharestContent /> și ÎNAINTE de <Testimonials />
```

Înlocuiește array-ul `bucharestFaqs` cu `cityDataExt.faqs` în schema FAQ și în `<CityFaq>`:

```tsx
// Schema:
generateFAQSchema(cityDataExt.faqs)

// În JSX:
<CityFaq cityName={cityName} faqs={cityDataExt.faqs} />
```

Update meta title la pattern nou:
```tsx
title: `Creare Site București 2026 ✓ Web Design Profesional`,
description: `Creare site București: 150+ proiecte, prețuri de la 450€, SEO inclus. Specialiști pentru Pipera, Floreasca, Centrul Vechi. Cere ofertă.`,
```

Update Service schema la `generateServiceWithOfferSchema` cu priceFrom 450.

- [ ] **Step 2: Update Cluj page (same pattern)**

Title: `Creare Site Cluj 2026 ✓ Agenție Web Design Profesional`
Description: `Creare site Cluj-Napoca: specialiști pentru ecosistemul tech din Mărăști și Florești. Prețuri de la 450€, SEO inclus, livrare rapidă.`

- [ ] **Step 3: Update Brașov page (same pattern)**

Title: `Creare Site Brașov 2026 ✓ Web Design pentru Afaceri Locale`
Description: `Creare site Brașov: 150+ proiecte livrate. Specialiști turism, automotive, retail. Prețuri de la 450€, SEO și mobile-first inclus.`

- [ ] **Step 4: Update Iași page (same pattern)**

Title: `Creare Site Iași 2026 ✓ Agenție Web Design Moldova`
Description: `Creare site Iași: web design pentru hub-ul tech estic. Specialiști IT, medical, retail. De la 450€, SEO inclus, suport în română.`

- [ ] **Step 5: Update Constanța page (same pattern)**

Title: `Creare Site Constanța 2026 ✓ Web Design pentru Litoral & Port`
Description: `Creare site Constanța: specialiști pentru turism Mamaia, logistică portuară, HoReCa. De la 450€, SEO local inclus, livrare rapidă.`

- [ ] **Step 6: Verify build**

Run: `npm run build`
Expected: build successful.

- [ ] **Step 7: Visual check each city page**

Run: `npm run dev`
Visit: `/creare-site-bucuresti`, `/creare-site-cluj`, `/creare-site-brasov`, `/creare-site-iasi`, `/creare-site-constanta`
Expected: fiecare are secțiunile noi vizibile (Zones, Industries Deep, Case Study, FAQ Extended).

- [ ] **Step 8: Commit all 5 updates**

```powershell
git add app/creare-site-bucuresti app/creare-site-cluj app/creare-site-brasov app/creare-site-iasi app/creare-site-constanta
git commit -m "feat(cities): integrate LocalDeepDive into 5 existing city pages"
```

---

## Task 8: Update layout.tsx default title & meta description

**De ce:** Home page title actual e generic. Update conform CTR strategy.

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 1: Update default title in metadata**

Edit `app/layout.tsx` lines 27-32:

```tsx
title: {
  default: "Creare Site Timișoara de la 450€ | Website Factory ★ 4.9",
  template: "%s | Website Factory",
},
description:
  "Creare site Timișoara — 150+ proiecte, prețuri de la 450€, SEO inclus. Agenție web locală din Centrul Vechi. Cere ofertă gratuită.",
```

Notă: template-ul este `%s | Website Factory` (cu separator `|` în loc de `-` pentru consistență).

Update și OpenGraph și Twitter title/description corespunzător.

- [ ] **Step 2: Verify build**

Run: `npm run build`
Expected: success.

- [ ] **Step 3: Commit**

```powershell
git add app/layout.tsx
git commit -m "feat(seo): rewrite default title/description for CTR optimization"
```

---

## Task 9: Create authors-data.ts

**De ce:** Source of truth pentru pagini autor + Person schema.

**Files:**
- Create: `lib/authors-data.ts`

- [ ] **Step 1: Create file**

Create `lib/authors-data.ts`:

```ts
export interface AuthorData {
  slug: string
  name: string
  jobTitle: string
  description: string
  bio: string
  image: string
  email?: string
  sameAs: string[]
  knowsAbout: string[]
  alumniOf?: string
  philosophy: string
  skills: { category: string; items: string[] }[]
  notableProjects: { name: string; description: string; slug?: string }[]
}

export const authorsData: Record<string, AuthorData> = {
  "ernest-slach": {
    slug: "ernest-slach",
    name: "Ernest Slach",
    jobTitle: "Co-Fondator & Lead Designer/Developer",
    description: "Co-fondator Website Factory, specialist UI/UX și frontend development. 10+ ani experiență în crearea de site-uri și aplicații web pentru afaceri locale și internaționale.",
    bio: `[400-600 cuvinte bio profesional. Include: background tehnic, ani experiență, specializări, abordare design+development, ce-l motivează în lucrul cu clienții. Conținut va fi draft-uit de Claude la executare task, review user înainte de commit.]`,
    image: "/team/ernest-slach.webp",
    sameAs: [
      "https://www.linkedin.com/in/ernest-slach/",
      // adaugă alte profile dacă există
    ],
    knowsAbout: [
      "Web Design",
      "UI/UX Design",
      "Next.js",
      "React",
      "TypeScript",
      "Tailwind CSS",
      "Figma",
      "Frontend Performance",
    ],
    alumniOf: "Universitatea Politehnica Timișoara",
    philosophy: "[Quote profesional 50-100 cuvinte despre abordarea design + development pe care o practică]",
    skills: [
      {
        category: "Design",
        items: ["UI/UX Design", "Wireframing", "Prototyping", "Design Systems", "Figma"],
      },
      {
        category: "Frontend",
        items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"],
      },
      {
        category: "Performance",
        items: ["Core Web Vitals", "Lighthouse optimization", "Bundle analysis"],
      },
    ],
    notableProjects: [
      // Lista de 3-5 proiecte cu name, description scurtă, slug către portofoliu dacă există
    ],
  },
  "alex-nedelia-kerekes": {
    slug: "alex-nedelia-kerekes",
    name: "Alex Nedelia-Kerekeș",
    jobTitle: "Co-Fondator & SEO/Technical Lead",
    description: "Co-fondator Website Factory, specialist SEO și backend development. 10+ ani experiență în optimizare SEO și arhitectură tehnică pentru site-uri performante.",
    bio: `[400-600 cuvinte bio profesional. Background SEO + tehnic, abordare data-driven, focus pe rezultate măsurabile.]`,
    image: "/team/alex-nedelia-kerekes.webp",
    sameAs: [
      "https://www.linkedin.com/in/alex-nedelia-kerekes/",
    ],
    knowsAbout: [
      "SEO",
      "Technical SEO",
      "Google Search Console",
      "Schema.org",
      "Core Web Vitals",
      "Node.js",
      "Python",
      "Analytics",
    ],
    alumniOf: "Universitatea Politehnica Timișoara",
    philosophy: "[Quote profesional 50-100 cuvinte despre SEO și abordarea tehnică]",
    skills: [
      {
        category: "SEO",
        items: ["Technical SEO", "On-page optimization", "Schema markup", "Link building strategy", "Local SEO"],
      },
      {
        category: "Backend",
        items: ["Node.js", "Python", "API design", "Database optimization"],
      },
      {
        category: "Analytics",
        items: ["GA4", "GSC", "Looker Studio", "Server logs analysis"],
      },
    ],
    notableProjects: [],
  },
}

export function getAuthorBySlug(slug: string): AuthorData | undefined {
  return authorsData[slug]
}

export function getAuthorArticles(authorSlug: string): string[] {
  // Returnează slug-urile articolelor scrise de autor — implementat în Task 11 după update blog-data.ts
  return []
}
```

NOTĂ: Bio și philosophy sunt placeholders care SE COMPLETEAZĂ ÎN TASK-UL ACESTA prin draft Claude + review user. Nu lăsa ca placeholder în production code. Genereaz ca parte din execuția task-ului.

- [ ] **Step 2: Verify TypeScript**

Run: `npx tsc --noEmit`
Expected: no errors.

- [ ] **Step 3: Commit**

```powershell
git add lib/authors-data.ts
git commit -m "feat(seo): add authors-data with E-E-A-T bio + Person schema fields"
```

---

## Task 10: Create author pages

**De ce:** Person schema linkable URLs pentru E-E-A-T signal. Centru pentru "Despre autor" în blog posts.

**Files:**
- Create: `app/despre-noi/ernest-slach/page.tsx`
- Create: `app/despre-noi/alex-nedelia-kerekes/page.tsx`
- Create: `components/authors/author-profile.tsx`

- [ ] **Step 1: Create AuthorProfile component**

Create `components/authors/author-profile.tsx`:

```tsx
import Image from "next/image"
import Link from "next/link"
import { Linkedin, ExternalLink, Mail } from "lucide-react"
import type { AuthorData } from "@/lib/authors-data"

export function AuthorProfile({ author }: { author: AuthorData }) {
  return (
    <article className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 max-w-4xl">
      {/* Header */}
      <header className="text-center mb-12">
        {author.image && (
          <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-6 rounded-full overflow-hidden ring-4 ring-brand/20">
            <Image
              src={author.image}
              alt={author.name}
              width={160}
              height={160}
              className="w-full h-full object-cover"
              priority
            />
          </div>
        )}
        <h1 className="font-heading text-4xl sm:text-5xl font-bold mb-2">{author.name}</h1>
        <p className="text-lg text-muted-foreground mb-4">{author.jobTitle}</p>
        <p className="text-base text-muted-foreground max-w-2xl mx-auto">{author.description}</p>

        {/* Social links */}
        <div className="flex justify-center gap-3 mt-6">
          {author.sameAs.map((url) => (
            <a
              key={url}
              href={url}
              target="_blank"
              rel="noopener noreferrer me"
              className="w-10 h-10 rounded-full glass-premium flex items-center justify-center hover:glow-subtle transition-all"
              aria-label={`${author.name} on ${new URL(url).hostname}`}
            >
              {url.includes("linkedin") ? (
                <Linkedin className="w-5 h-5" />
              ) : (
                <ExternalLink className="w-5 h-5" />
              )}
            </a>
          ))}
        </div>
      </header>

      {/* Bio */}
      <section className="prose prose-lg mx-auto mb-12">
        <h2 className="font-heading text-3xl font-bold mb-4">Despre {author.name.split(" ")[0]}</h2>
        <div className="text-base leading-relaxed whitespace-pre-line">{author.bio}</div>
      </section>

      {/* Philosophy */}
      {author.philosophy && (
        <section className="my-12">
          <blockquote className="glass-premium rounded-2xl p-8 lg:p-12 text-center">
            <p className="text-xl sm:text-2xl font-heading italic leading-relaxed">"{author.philosophy}"</p>
            <footer className="mt-4 text-sm text-muted-foreground">— {author.name}</footer>
          </blockquote>
        </section>
      )}

      {/* Skills */}
      <section className="my-12">
        <h2 className="font-heading text-3xl font-bold mb-6 text-center">Expertiză</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {author.skills.map((group) => (
            <div key={group.category} className="glass-premium rounded-2xl p-6">
              <h3 className="font-heading text-lg font-bold mb-3">{group.category}</h3>
              <ul className="space-y-1.5">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-muted-foreground">
                    · {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* Notable projects */}
      {author.notableProjects.length > 0 && (
        <section className="my-12">
          <h2 className="font-heading text-3xl font-bold mb-6 text-center">Proiecte notabile</h2>
          <div className="space-y-4">
            {author.notableProjects.map((proj) => (
              <div key={proj.name} className="glass-premium rounded-xl p-6">
                <h3 className="font-heading text-lg font-bold mb-2">
                  {proj.slug ? (
                    <Link href={`/portofoliu/${proj.slug}`} className="hover:text-brand transition-colors">
                      {proj.name}
                    </Link>
                  ) : (
                    proj.name
                  )}
                </h3>
                <p className="text-sm text-muted-foreground">{proj.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="text-center mt-16">
        <Link
          href="/contact"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-brand-foreground rounded-full font-semibold hover:glow-intense transition-all"
        >
          <Mail className="w-4 h-4" />
          Discută cu {author.name.split(" ")[0]}
        </Link>
      </section>
    </article>
  )
}
```

- [ ] **Step 2: Create Ernest Slach page**

Create `app/despre-noi/ernest-slach/page.tsx`:

```tsx
import type { Metadata } from "next"
import { AuthorProfile } from "@/components/authors/author-profile"
import { authorsData } from "@/lib/authors-data"
import {
  generatePageMetadata,
  generatePersonSchemaFull,
  generateBreadcrumbSchema,
} from "@/lib/seo"

const author = authorsData["ernest-slach"]

export const metadata: Metadata = generatePageMetadata({
  title: `${author.name} — ${author.jobTitle}`,
  description: author.description,
  path: `/despre-noi/${author.slug}`,
  image: author.image,
})

export default function ErnestSlachPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generatePersonSchemaFull({
              name: author.name,
              jobTitle: author.jobTitle,
              description: author.description,
              image: author.image,
              url: `/despre-noi/${author.slug}`,
              sameAs: author.sameAs,
              knowsAbout: author.knowsAbout,
              alumniOf: author.alumniOf,
            }),
          ),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            generateBreadcrumbSchema([
              { name: "Acasă", url: "/" },
              { name: "Despre noi", url: "/despre-noi" },
              { name: author.name, url: `/despre-noi/${author.slug}` },
            ]),
          ),
        }}
      />

      <main>
        <AuthorProfile author={author} />
      </main>
    </>
  )
}
```

- [ ] **Step 3: Create Alex Nedelia-Kerekeș page (same pattern)**

Create `app/despre-noi/alex-nedelia-kerekes/page.tsx` — identic cu Ernest dar `const author = authorsData["alex-nedelia-kerekes"]`.

- [ ] **Step 4: Add author pages to sitemap**

Edit `app/sitemap.ts` — adaugă în staticPages:

```ts
{
  url: `${baseUrl}/despre-noi/ernest-slach`,
  lastModified: currentDate,
  changeFrequency: "monthly",
  priority: 0.7,
},
{
  url: `${baseUrl}/despre-noi/alex-nedelia-kerekes`,
  lastModified: currentDate,
  changeFrequency: "monthly",
  priority: 0.7,
},
```

- [ ] **Step 5: Verify build + visit**

Run: `npm run build && npm run dev`
Visit: `/despre-noi/ernest-slach` și `/despre-noi/alex-nedelia-kerekes`
Expected: ambele se randează.

- [ ] **Step 6: Validate Person schema**

Folosește Rich Results Test pe URL local sau HTML source.
Expected: Person schema valid, no errors.

- [ ] **Step 7: Commit**

```powershell
git add app/despre-noi components/authors lib/authors-data.ts app/sitemap.ts
git commit -m "feat(seo): add author pages with E-E-A-T Person schema"
```

---

## Task 11: Update blog post structure with author byline + Article schema

**De ce:** Linkare articole → pagini autor. Article schema cu Person ref. E-E-A-T signal fundamental.

**Files:**
- Modify: `lib/blog-data.ts` (adăugare `authorSlug` field)
- Modify: `app/blog/[slug]/page.tsx` (byline link + author box + Article schema)

- [ ] **Step 1: Add authorSlug to BlogMetadata interface**

Edit `lib/blog-data.ts` — adaugă în interface:

```ts
export interface BlogMetadata {
  // ... existing fields
  authorSlug: string  // NEW - links to /despre-noi/[slug]
}
```

Update fiecare blog post existing cu `authorSlug`:
- "tendinte-web-design-2026" → `authorSlug: "ernest-slach"`
- "optimizare-seo-website-ghid-complet" → `authorSlug: "alex-nedelia-kerekes"`
- "core-web-vitals-performanta-website" → `authorSlug: "ernest-slach"`
- "wordpress-vs-custom-development" → `authorSlug: "alex-nedelia-kerekes"`

- [ ] **Step 2: Update blog/[slug]/page.tsx with Article schema**

Edit `app/blog/[slug]/page.tsx` — adaugă import `generateArticleSchema`:

```tsx
import { generateArticleSchema, generateBreadcrumbSchema } from "@/lib/seo"
```

În component, după obținerea post-ului, adaugă schema injection:

```tsx
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify(
      generateArticleSchema({
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        authorName: post.author,
        authorSlug: post.authorSlug,
        image: post.image,
        url: `/blog/${post.slug}`,
      }),
    ),
  }}
/>
```

- [ ] **Step 3: Add author byline + box in blog post template**

Edit `app/blog/[slug]/page.tsx` — modifică byline section să fie link către pagina autor:

```tsx
import Link from "next/link"
// În JSX, înlocuiește textul autor cu link:
<Link href={`/despre-noi/${post.authorSlug}`} className="font-medium hover:text-brand transition-colors">
  {post.author}
</Link>
```

Adaugă la finalul articolului (înainte de related posts):

```tsx
{/* Author box */}
<aside className="glass-premium rounded-2xl p-6 my-12">
  <div className="flex items-start gap-4">
    <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0">
      {/* Avatar - obține din authorsData dacă există image */}
    </div>
    <div>
      <h3 className="font-heading text-lg font-bold mb-1">
        <Link href={`/despre-noi/${post.authorSlug}`} className="hover:text-brand transition-colors">
          {post.author}
        </Link>
      </h3>
      <p className="text-sm text-muted-foreground mb-2">{post.authorRole}</p>
      <Link href={`/despre-noi/${post.authorSlug}`} className="text-sm text-brand hover:underline">
        Vezi profilul complet →
      </Link>
    </div>
  </div>
</aside>
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: success.

- [ ] **Step 5: Visit a blog post and verify**

Visit `/blog/tendinte-web-design-2026`
Expected: byline e link către `/despre-noi/ernest-slach`, author box vizibil la final, Article schema în source.

- [ ] **Step 6: Commit**

```powershell
git add lib/blog-data.ts app/blog/[slug]/page.tsx
git commit -m "feat(seo): add author byline links + Article schema to blog posts"
```

---

## Task 12: Write blog post — "Prețuri creare site Timișoara 2026"

**De ce:** Content cluster spoke #1. Target keyword commercial intent.

**Files:**
- Create: `content/blog/preturi-creare-site-timisoara-2026.mdx`
- Modify: `lib/blog-data.ts` (entry nou)
- Create: `public/blog/preturi-creare-site-timisoara-2026.webp` (imagine cover — placeholder OK pentru initial commit)

- [ ] **Step 1: Draft MDX content (2,500-3,000 cuvinte)**

Create `content/blog/preturi-creare-site-timisoara-2026.mdx`:

Frontmatter:
```mdx
---
title: "Prețuri creare site Timișoara 2026: ghid complet cu exemple reale"
description: "Cât costă un site web în Timișoara în 2026? Ghid complet cu prețuri pentru site de prezentare, magazin online, aplicație web. Cu exemple și factori de cost."
slug: "preturi-creare-site-timisoara-2026"
date: "2026-05-28"
tags: ["preturi", "timișoara", "creare site", "buget", "ghid"]
---
```

Structură (titluri H2 conform AEO):

1. **AEO answer box** (primul paragraf, 50-80 cuvinte):
   > În Timișoara, prețurile pentru un site web variază între **450€ și 5,000€+**, în funcție de complexitate. Un site de prezentare pornește de la 450€, un site corporate de la 650€, iar magazinele online de la 1,100€. Aplicațiile web custom pot ajunge la 10,000€+.

2. **H2: Tabelă comparativă rapidă (prețuri pe tip)** - tabel markdown cu tipuri, prețuri start, durată, ce include

3. **H2: Ce influențează prețul unui site web în Timișoara?** - 5-7 factori: număr pagini, design custom vs template, funcționalități, integrări, SEO inclus, mentenanță, urgență

4. **H2: Tipuri de site-uri și prețuri** - secțiuni detaliate:
   - Site de prezentare (450-800€) — pentru cine, ce include, exemple
   - Site corporate (650-1500€) — pentru cine, ce include
   - Magazin online (1100-3500€) — integrări, complexitate
   - Site clinică medicală (800-2000€) — booking, GDPR
   - Aplicație web / SaaS (3000-15000€) — MVP, scalabilitate

5. **H2: Freelancer, agenție sau DIY — ce alegi?** - tabel comparativ cu pro/contra fiecare

6. **H2: Costuri ascunse de care să ții cont** - hosting, domain, mentenanță, actualizări, SEO ongoing

7. **H2: Cât costă SEO inclus în prețul site-ului?** - clarificare ce înseamnă "SEO inclus" la Website Factory

8. **H2: Cum stabilim împreună bugetul potrivit pentru afacerea ta?** - procesul nostru de discovery

9. **H2: Întrebări frecvente despre prețuri** - 5-6 Q&A cu FAQPage schema

10. **CTA final** — buton către `/pret-website` (calculator)

Reguli scriere:
- Voce activă, claritate înainte de eleganță
- Tabele markdown unde aplicabil
- Bold pentru cifre/prețuri cheie
- 3 internal links: către `/creare-site-timisoara`, `/servicii/magazin-online`, `/pret-website`
- 1-2 external links autoritative

**Notă pentru executare:** Conținutul efectiv este draft-uit de Claude la executare task, review user înainte de publish. Nu lăsa placeholders în .mdx final.

- [ ] **Step 2: Add entry to blog-data.ts**

Edit `lib/blog-data.ts` — adaugă la începutul array-ului `blogPosts`:

```ts
{
  slug: "preturi-creare-site-timisoara-2026",
  title: "Prețuri creare site Timișoara 2026: ghid complet cu exemple reale",
  description: "Cât costă un site web în Timișoara în 2026? Ghid complet cu prețuri pentru site de prezentare, magazin online, aplicație web. Cu exemple și factori de cost.",
  date: "2026-05-28",
  author: "Alex Nedelia-Kerekeș",
  authorRole: "Co-Fondator & SEO Specialist, Website Factory",
  authorSlug: "alex-nedelia-kerekes",
  category: "general",
  categoryLabel: "Ghiduri",
  tags: ["prețuri", "timișoara", "creare site", "ghid", "buget"],
  image: "/blog/preturi-creare-site-timisoara-2026.webp",
  imageAlt: "Tabel cu prețuri și pachete pentru creare site web în Timișoara",
  featured: true,
  readingTime: 11,
  excerpt:
    "Câți bani îți trebuie pentru un site web în Timișoara? Răspuns clar pe tipuri de site-uri, cu exemple reale, factori de cost și tabel comparativ. Plus cum eviți costurile ascunse.",
},
```

- [ ] **Step 3: Add placeholder image**

Folosește orice imagine .webp ca placeholder pentru `/public/blog/preturi-creare-site-timisoara-2026.webp`. În producție, înlocuiește cu cover custom.

- [ ] **Step 4: Verify build + visit post**

Run: `npm run build && npm run dev`
Visit: `/blog/preturi-creare-site-timisoara-2026`
Expected: render successful, AEO answer box vizibil în primul paragraf, schema Article + FAQ în source.

- [ ] **Step 5: Commit**

```powershell
git add content/blog/preturi-creare-site-timisoara-2026.mdx lib/blog-data.ts public/blog/preturi-creare-site-timisoara-2026.webp
git commit -m "feat(content): add 'Prețuri creare site Timișoara 2026' blog post"
```

---

## Task 13: Write blog post — "Magazin online Timișoara: ghid complet"

**De ce:** Content cluster spoke #2. Commercial + informational intent.

**Files:**
- Create: `content/blog/magazin-online-timisoara-ghid-complet.mdx`
- Modify: `lib/blog-data.ts`
- Create: `public/blog/magazin-online-timisoara-ghid-complet.webp` (placeholder OK)

- [ ] **Step 1: Draft MDX (3,000-3,500 cuvinte)**

Structura H2:
1. AEO answer box: "Cât costă un magazin online în Timișoara?"
2. **H2: De ce să lansezi un magazin online în Timișoara în 2026?** — context piață locală, eCommerce growth RO
3. **H2: Platforme — WooCommerce, Shopify, sau custom?** — comparație detaliată cu recomandare per tip business
4. **H2: Integrări obligatorii pentru un magazin online românesc** — Netopia, Euplatesc, Stripe; FAN Courier, Cargus, Sameday; e-Factura (din 2024 obligatoriu); ANAF, SmartBill
5. **H2: Particularități piața Timișoara pentru eCommerce** — audiență, comportament cumpărător, sezonalitate
6. **H2: Pașii de la idee la magazin lansat** — 8 pași concrete cu durate
7. **H2: SEO pentru magazine online — ce să nu uiți** — schema Product, OG product, internal linking, blog
8. **H2: Costuri lunare după lansare** — hosting, payment fees, marketing, mentenanță
9. **H2: Greșeli comune pe care le evităm** — 5-7 anti-patterns
10. **H2: Întrebări frecvente** — FAQPage schema
11. CTA: `/contact` pentru ofertă magazin

Frontmatter, author = Alex (SEO specialist), authorSlug = "alex-nedelia-kerekes".

- [ ] **Step 2: Add to blog-data.ts**

```ts
{
  slug: "magazin-online-timisoara-ghid-complet",
  title: "Magazin online Timișoara: ghid complet pentru afaceri locale 2026",
  description: "Cum lansezi un magazin online profesional în Timișoara: platforme, integrări locale (Netopia, FAN Courier, e-Factura), prețuri, SEO și greșeli de evitat.",
  date: "2026-06-04",
  author: "Alex Nedelia-Kerekeș",
  authorRole: "Co-Fondator & SEO Specialist, Website Factory",
  authorSlug: "alex-nedelia-kerekes",
  category: "web-development",
  categoryLabel: "Web Development",
  tags: ["magazin online", "ecommerce", "timișoara", "woocommerce", "integrări"],
  image: "/blog/magazin-online-timisoara-ghid-complet.webp",
  imageAlt: "Dashboard magazin online cu produse și statistici de vânzări",
  featured: true,
  readingTime: 14,
  excerpt:
    "De la idee la primul produs vândut: ghidul nostru complet pentru a lansa un magazin online în Timișoara. Cu integrări românești obligatorii, prețuri reale și greșeli pe care să le eviți.",
},
```

- [ ] **Step 3: Verify + commit**

```powershell
npm run build
git add content/blog/magazin-online-timisoara-ghid-complet.mdx lib/blog-data.ts public/blog/magazin-online-timisoara-ghid-complet.webp
git commit -m "feat(content): add 'Magazin online Timișoara ghid complet' blog post"
```

---

## Task 14: Write blog post — "SEO local Timișoara: Google Business Profile"

**De ce:** Content cluster spoke #3. Informational, targetare lung-tail SEO local.

**Files:**
- Create: `content/blog/seo-local-timisoara-google-business-profile.mdx`
- Modify: `lib/blog-data.ts`
- Create: `public/blog/seo-local-timisoara-google-business-profile.webp` (placeholder)

- [ ] **Step 1: Draft MDX (2,500 cuvinte)**

Structură:
1. AEO answer box: "Ce este SEO local Timișoara și cum apar firmele în Google Maps?"
2. **H2: De ce SEO local conțează pentru o firmă din Timișoara**
3. **H2: Google Business Profile — setup pas-cu-pas**
4. **H2: Citations & NAP consistency** — directoare RO (Lista Firme, Pagini Aurii, Yelp RO)
5. **H2: Recenzii Google — cum le obții și de ce conțează**
6. **H2: Optimizare on-page pentru SEO local Timișoara**
7. **H2: Schema markup LocalBusiness pentru clinici / restaurante / servicii**
8. **H2: Cum monitorizezi rezultatele**
9. **H2: Întrebări frecvente** — FAQPage schema
10. CTA: audit SEO gratuit → `/contact`

Author: Alex (SEO specialist).

- [ ] **Step 2: Add to blog-data.ts** (pattern similar Task 13)

- [ ] **Step 3: Verify + commit**

```powershell
npm run build
git add content/blog/seo-local-timisoara-google-business-profile.mdx lib/blog-data.ts public/blog/seo-local-timisoara-google-business-profile.webp
git commit -m "feat(content): add 'SEO local Timișoara Google Business' blog post"
```

---

## Task 15: Update existing Timișoara blog post (`web-design-timisoara-ghid-complet-firme-locale`)

**De ce:** Refresh + interlink cluster. Articol existent este punct de intrare important.

**Files:**
- Modify: `content/blog/web-design-timisoara-ghid-complet-firme-locale.mdx`

- [ ] **Step 1: Update content**

- Adăugare în partea de sus a articolului: linkuri către cele 3 articole noi din cluster:
  ```mdx
  > **Ghiduri conexe:**
  > - [Prețuri creare site Timișoara 2026](/blog/preturi-creare-site-timisoara-2026)
  > - [Magazin online Timișoara: ghid complet](/blog/magazin-online-timisoara-ghid-complet)
  > - [SEO local Timișoara: Google Business Profile](/blog/seo-local-timisoara-google-business-profile)
  ```

- Adăugare CTA prominent spre `/creare-site-timisoara` în prima secțiune
- Extindere FAQ existent cu 3-5 întrebări noi
- Adăugare secțiune nouă "H2: e-Factura și obligațiile fiscale pentru magazinele online (din 2024)"
- Adăugare secțiune "H2: AI Search și viitorul SEO local"
- Update date dacă e cazul

- [ ] **Step 2: Commit**

```powershell
git add content/blog/web-design-timisoara-ghid-complet-firme-locale.mdx
git commit -m "feat(content): refresh Timișoara web design guide with cluster interlinks"
```

---

## Task 16: Create internal-links.ts + RelatedContent component

**De ce:** Internal linking strategic, scalabil. Hub-and-spoke wiring.

**Files:**
- Create: `lib/internal-links.ts`
- Create: `components/related-content.tsx`

- [ ] **Step 1: Create internal-links.ts**

Create `lib/internal-links.ts`:

```ts
import { blogPosts } from "@/lib/blog-data"
import { citiesData } from "@/lib/cities-data"

export interface RelatedItem {
  title: string
  description: string
  href: string
  type: "city" | "service" | "blog" | "page"
}

export interface RelatedContentContext {
  pageType: "city" | "service" | "blog" | "home"
  citySlug?: string
  serviceSlug?: string
  blogSlug?: string
  blogCategory?: string
}

const SERVICES: RelatedItem[] = [
  { title: "Creare website", description: "Site-uri de prezentare profesionale", href: "/servicii/creare-website", type: "service" },
  { title: "Magazin online", description: "eCommerce complet cu integrări locale", href: "/servicii/magazin-online", type: "service" },
  { title: "Dezvoltare aplicație web", description: "SaaS, MVP, soluții custom", href: "/servicii/dezvoltare-aplicatie", type: "service" },
]

const CITIES: RelatedItem[] = Object.values(citiesData).map((city) => ({
  title: `Creare site ${city.name}`,
  description: city.hook,
  href: `/creare-site-${city.slug}`,
  type: "city" as const,
}))

export function getRelatedContent(ctx: RelatedContentContext): RelatedItem[] {
  switch (ctx.pageType) {
    case "city": {
      // Pentru city pages: 2 servicii + 2 articole blog relevante
      const blogPicks: RelatedItem[] = blogPosts
        .filter((p) => p.tags?.some((t) => t.toLowerCase().includes(ctx.citySlug?.toLowerCase() || "") || t === "creare site"))
        .slice(0, 2)
        .map((p) => ({
          title: p.title,
          description: p.description,
          href: `/blog/${p.slug}`,
          type: "blog" as const,
        }))
      return [...SERVICES.slice(0, 2), ...blogPicks]
    }
    case "service": {
      // Pentru service pages: 3 city pages prioritare
      return CITIES.slice(0, 3)
    }
    case "blog": {
      // Pentru blog: 2 city pages + 1 service relevant
      const blogPost = blogPosts.find((p) => p.slug === ctx.blogSlug)
      const isCitySpecific = blogPost?.tags?.some((t) => Object.keys(citiesData).includes(t.toLowerCase()))
      if (isCitySpecific) {
        const cityTag = blogPost?.tags?.find((t) => Object.keys(citiesData).includes(t.toLowerCase()))
        const matchingCity = cityTag ? citiesData[cityTag.toLowerCase()] : null
        if (matchingCity) {
          return [
            {
              title: `Creare site ${matchingCity.name}`,
              description: matchingCity.hook,
              href: `/creare-site-${matchingCity.slug}`,
              type: "city",
            },
            ...SERVICES.slice(0, 2),
          ]
        }
      }
      return [...CITIES.slice(0, 2), SERVICES[0]]
    }
    case "home":
    default:
      return [...CITIES.slice(0, 3), SERVICES[0]]
  }
}
```

- [ ] **Step 2: Create RelatedContent component**

Create `components/related-content.tsx`:

```tsx
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getRelatedContent, type RelatedContentContext } from "@/lib/internal-links"

export function RelatedContent(props: RelatedContentContext) {
  const items = getRelatedContent(props)
  if (items.length === 0) return null

  return (
    <section className="py-16 sm:py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8 text-center">
            Continuă cu...
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="glass-premium rounded-2xl p-6 hover:glow-subtle transition-all duration-300 group"
              >
                <span className="text-xs font-medium uppercase tracking-wider text-brand/80 mb-2 block">
                  {item.type === "city" && "Pagină locală"}
                  {item.type === "service" && "Serviciu"}
                  {item.type === "blog" && "Articol blog"}
                  {item.type === "page" && "Pagină"}
                </span>
                <h3 className="font-heading text-lg font-bold mb-2 group-hover:text-brand transition-colors">
                  {item.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{item.description}</p>
                <span className="text-sm text-brand inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Vezi mai mult
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Integrate RelatedContent on key pages**

În `app/page.tsx`, înainte de `<CTASection />`:
```tsx
import { RelatedContent } from "@/components/related-content"
// În JSX:
<RelatedContent pageType="home" />
```

În `app/creare-site-timisoara/page.tsx`, înainte de `<CityCTA />`:
```tsx
<RelatedContent pageType="city" citySlug="timisoara" />
```

Similar pe celelalte city pages.

În `app/blog/[slug]/page.tsx`, după author box:
```tsx
<RelatedContent pageType="blog" blogSlug={params.slug} />
```

În `app/servicii/[*]/page.tsx`, înainte de CTA final:
```tsx
<RelatedContent pageType="service" serviceSlug="..." />
```

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: success.

- [ ] **Step 5: Visual check pages**

Run: `npm run dev`
Visit home, /creare-site-timisoara, /blog/[any-post]
Expected: RelatedContent secțiune vizibilă cu link-uri relevante.

- [ ] **Step 6: Commit**

```powershell
git add lib/internal-links.ts components/related-content.tsx app/page.tsx app/creare-site-timisoara app/blog/[slug]/page.tsx app/servicii
git commit -m "feat(seo): add RelatedContent component + internal linking strategy"
```

---

## Task 17: Footer rewrite with structured sections

**De ce:** Footer-ul actual e plat. Restructurare pe intent + adăugare pagini autor.

**Files:**
- Modify: `components/layout/footer.tsx`

- [ ] **Step 1: Read current footer**

Run: `Get-Content components/layout/footer.tsx`
Înțelege structura actuală.

- [ ] **Step 2: Restructurare în 4 coloane**

Edit `components/layout/footer.tsx` cu structura:

**Coloana 1 — Servicii:**
- Creare website → /servicii/creare-website
- Magazin online → /servicii/magazin-online
- Dezvoltare aplicație → /servicii/dezvoltare-aplicatie
- Toate serviciile → /servicii

**Coloana 2 — Pentru orașul tău:**
- Creare site Timișoara → /creare-site-timisoara (prima!)
- Creare site București → /creare-site-bucuresti
- Creare site Cluj → /creare-site-cluj
- Creare site Brașov → /creare-site-brasov
- Creare site Iași → /creare-site-iasi
- Creare site Constanța → /creare-site-constanta

**Coloana 3 — Resurse:**
- Blog → /blog
- Calculator preț → /pret-website
- Portofoliu → /portofoliu
- Ghid SEO 2026 → /blog/optimizare-seo-website-ghid-complet

**Coloana 4 — Despre:**
- Despre noi → /despre-noi
- Ernest Slach → /despre-noi/ernest-slach
- Alex Nedelia-Kerekeș → /despre-noi/alex-nedelia-kerekes
- Contact → /contact

Plus bottom row cu Termeni, Politică confidențialitate, Politică cookie, copyright.

- [ ] **Step 3: Verify + visual check**

Run: `npm run build && npm run dev`
Verifică footer pe mobile + desktop, link-uri funcționale.

- [ ] **Step 4: Commit**

```powershell
git add components/layout/footer.tsx
git commit -m "feat(layout): restructure footer with intent-based sections + author links"
```

---

## Task 18: Add AEO answer boxes to top pages

**De ce:** Featured snippets + AI citations. Răspuns direct la întrebare în primele 100 cuvinte.

**Files:**
- Modify: `components/cities/timisoara-hero.tsx` sau primă secțiune după hero
- Modify: alte componente city după model

- [ ] **Step 1: Create reusable AnswerBox component**

Create `components/ui/answer-box.tsx`:

```tsx
import type { ReactNode } from "react"
import { Sparkle } from "lucide-react"

export function AnswerBox({
  question,
  children,
}: {
  question: string
  children: ReactNode
}) {
  return (
    <div className="glass-premium rounded-2xl p-6 lg:p-8 max-w-3xl mx-auto my-8">
      <div className="flex items-start gap-3 mb-3">
        <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0">
          <Sparkle className="w-4 h-4 text-brand" />
        </div>
        <h2 className="font-heading text-xl sm:text-2xl font-bold">{question}</h2>
      </div>
      <div className="text-base sm:text-lg text-foreground/90 leading-relaxed pl-11">
        {children}
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Integrate on key pages**

Pe `/creare-site-timisoara` (after hero, before services):
```tsx
<AnswerBox question="Cât costă un site web în Timișoara?">
  <p>
    <strong>În Timișoara, un site profesional costă între 450€ și 5,000€</strong> — 
    site de prezentare de la 450€, magazin online de la 1,100€, aplicație web custom de la 3,000€. 
    Prețul depinde de complexitate, design custom vs template și funcționalități. 
    SEO inclus în toate pachetele.
  </p>
</AnswerBox>
```

Similar pe celelalte 5 city pages cu întrebări adaptate (în loc de Timișoara → orașul respectiv, prețuri adaptate dacă diferă).

Pe blog posts cluster Timișoara: deja inclus în Task 12-15 ca primul paragraf.

- [ ] **Step 3: Verify build + visual**

Run: `npm run build && npm run dev`
Visit paginile, verifică AnswerBox vizibil în primele 100 cuvinte de conținut.

- [ ] **Step 4: Commit**

```powershell
git add components/ui/answer-box.tsx app/creare-site-timisoara app/creare-site-*
git commit -m "feat(aeo): add AnswerBox component for featured snippets"
```

---

## Task 19: Rewrite llms-full.txt

**De ce:** Knowledge base AI-friendly pentru ChatGPT/Perplexity/Gemini citations.

**Files:**
- Modify: `public/llms-full.txt`

- [ ] **Step 1: Read current llms-full.txt**

Run: `Get-Content public/llms-full.txt | Measure-Object -Line`
Vezi structura actuală.

- [ ] **Step 2: Rewrite with structured format**

Înlocuiește conținutul cu structură optimizată (8,000-12,000 cuvinte total):

```markdown
# Website Factory — Knowledge Base pentru asistenți AI

## Identitate

- **Nume oficial:** Website Factory
- **Tip:** Agenție de web design și dezvoltare web
- **Locație principală:** Timișoara, România (Piața Unirii 1, 300085)
- **Înființare:** 2018
- **Specializare:** SEO-first web design, magazine online, aplicații web
- **Limbi de lucru:** Română, Engleză
- **Website:** https://websitefactory.ro
- **Contact:** office@websitefactory.ro, +40728567830

## Servicii cu prețuri

### Creare site de prezentare
- **Preț:** de la 450€
- **Durată:** 1-2 săptămâni
- **Pentru cine:** Freelanceri, cabinete, firme mici, profesioniști
- **Include:** design custom, SEO on-page, hosting setup, training admin, suport 30 zile

### Site corporate (multi-pagină)
- **Preț:** de la 650€
- **Durată:** 3-4 săptămâni
- **Pentru cine:** Firme medii și mari, B2B, consultanță

### Magazin online (eCommerce)
- **Preț:** de la 1,100€
- **Durată:** 4-8 săptămâni
- **Integrări incluse:** Netopia Payments, Euplatesc, Stripe (plăți), FAN Courier, Cargus, Sameday (curier), SmartBill, e-Factura (facturare ANAF)

### Aplicație web / SaaS
- **Preț:** de la 3,000€ (MVP) — 15,000€+ (produs complet)
- **Durată:** 8-16 săptămâni

### Optimizare SEO
- Inclusă în toate pachetele
- Audit SEO standalone disponibil

## Acoperire geografică

- **Sediu:** Timișoara (servicii on-site + remote)
- **Pagini dedicate orașe:** Timișoara, București, Cluj-Napoca, Brașov, Iași, Constanța
- **Raza servicii:** toată România, proiecte internaționale on-demand

## Tehnologii folosite

- **Frontend:** Next.js 16, React 19, TypeScript, Tailwind CSS 4
- **Backend:** Node.js, Python
- **CMS:** WordPress, Payload CMS, headless options
- **Hosting:** Vercel, AWS, Cloudflare
- **Integrări plată:** Netopia, Euplatesc, Stripe
- **Analytics:** Google Analytics 4, Google Search Console
- **SEO tools:** Ahrefs, Lighthouse, Schema.org

## Persoane cheie

### Ernest Slach
- **Rol:** Co-Fondator, Lead Designer/Developer
- **Specializare:** UI/UX, frontend, Next.js/React, design systems
- **Profil:** https://websitefactory.ro/despre-noi/ernest-slach

### Alex Nedelia-Kerekeș
- **Rol:** Co-Fondator, SEO/Technical Lead
- **Specializare:** Technical SEO, schema markup, backend, analytics
- **Profil:** https://websitefactory.ro/despre-noi/alex-nedelia-kerekes

## Diferențiatori

1. **SEO inclus în toate pachetele** (nu add-on)
2. **Bazați în Timișoara** — cunoaștere piață locală
3. **150+ proiecte livrate** din 2018
4. **Stack tehnic modern** — Next.js, React, performance-first
5. **Comunicare în română** — fără bariere de limbă
6. **Integrări românești** — Netopia, e-Factura, ANAF, FAN Courier
7. **Mentenanță & suport** — pachete dedicate disponibile

## Întrebări frecvente (50+ Q&A)

### Despre prețuri și buget

**Q: Cât costă un site web la Website Factory?**
A: Prețurile pornesc de la 450€ pentru site de prezentare, 650€ pentru corporate, 1,100€ pentru magazin online, 3,000€ pentru aplicație web custom. Toate includ SEO și suport inițial.

**Q: Există costuri ascunse?**
A: Nu. Prețul agreat în ofertă include tot ce s-a stabilit. Hosting și domain pot fi separat (~50-150€/an), opțional pachete de mentenanță (de la 49€/lună).

**Q: Acceptați plata în rate?**
A: Da, standard este 50% avans + 50% la livrare. Pentru proiecte mari, plan personalizat în 3-4 tranșe.

[Continuă cu 50+ Q&A pe categorii: timpi de livrare, tehnologii, SEO, mentenanță, integrări, design process, comunicare client, garanții, modificări post-launch, hosting, securitate, GDPR, mobile, multilingv, redesign vs new, etc.]

[Notă pentru implementare: lista completă de 50+ Q&A va fi generată în task-ul actual de către Claude, review user înainte de publish. Acoperă realmente cele mai întrebate aspecte. Nu lăsa placeholder în production.]

## Procesul de lucru

1. **Discovery call** (gratuit, 30-60 min) — discutăm obiective, audiență, buget
2. **Ofertă scrisă** (3-5 zile) — propunere detaliată cu preț fix
3. **Discovery extinsă & brief** (1 săptămână) — research, sitemap, content strategy
4. **Design** (1-2 săptămâni) — wireframes, design mockups, iterații
5. **Dezvoltare** (2-8 săptămâni în funcție de complexitate)
6. **Testare & QA** (1 săptămână) — cross-browser, mobile, performance, SEO
7. **Lansare** — go-live, training admin, analytics setup
8. **Suport post-lansare** (30 zile incluse) — fix-uri rapide, ajustări

## Tipuri de clienți reprezentativi

- **IT & Tech:** startup-uri SaaS, firme outsourcing, dev shops
- **Medical:** clinici private, cabinete stomatologice, fizioterapie
- **Legal & consultanță:** avocați, consultanți fiscali, contabili
- **Retail:** magazine fashion, boutique-uri, producători locali
- **HoReCa:** restaurante, hoteluri, pensiuni, cafenele
- **Real Estate:** agenții imobiliare, dezvoltatori
- **Educație:** centre de formare, școli private, after-school

## Acreditări & parteneri

- Membri IT Cluster Timișoara
- Parteneri Google (Analytics 4 certified)
- WordPress agency partner

## Termeni cheie pentru AI / SEO

- creare site Timișoara
- web design Timișoara
- realizare site profesional
- magazin online România
- SEO local Timișoara
- agenție web Timișoara
- Next.js development România
- creare site corporate
- aplicații web custom
- site clinică medicală
```

NOTĂ EXECUȚIE: Lista 50+ Q&A este draft-uită complet de Claude la executare task. Nu rămâne placeholder.

- [ ] **Step 3: Update llms.txt for consistency**

Reflectă în `public/llms.txt` orice schimbare la URL-uri (după Task 6, /creare-site-timisoara funcționează).

- [ ] **Step 4: Verify accessible**

Run: `npm run dev`
Visit: `http://localhost:3000/llms-full.txt`
Expected: file served correctly.

- [ ] **Step 5: Commit**

```powershell
git add public/llms-full.txt public/llms.txt
git commit -m "feat(aeo): rewrite llms-full.txt as structured AI knowledge base"
```

---

## Task 20: Final QA + baseline measurement update

**De ce:** Lock în starea finală, verify entire site, prepare for monitoring.

**Files:**
- Modify: `docs/seo-tracking/deployment-log.md`
- Create: `docs/seo-tracking/weekly-positions.csv` (template)

- [ ] **Step 1: Full build & QA**

Run: `npm run build`
Expected: success, zero errors.

Run: `npx tsc --noEmit`
Expected: zero TS errors.

- [ ] **Step 2: Lighthouse audit pe pagini-cheie**

Pentru fiecare URL:
- /
- /creare-site-timisoara
- /creare-site-bucuresti
- /blog/preturi-creare-site-timisoara-2026
- /despre-noi/ernest-slach

Run: `npx lighthouse <url> --only-categories=seo,performance --output=html --output-path=./tmp-lighthouse-<page>.html`

Expected: SEO ≥ 95 pe toate.

Salvează HTML reports în `docs/seo-tracking/lighthouse-2026-05-27/`.

- [ ] **Step 3: Schema validation**

Pentru fiecare URL cu schema, rulează prin Rich Results Test (https://search.google.com/test/rich-results).
Expected: toate schema-urile validate, zero erori.

- [ ] **Step 4: Sitemap check**

Visit `/sitemap.xml`
Verifică:
- /creare-site-timisoara prezent
- /despre-noi/ernest-slach prezent
- /despre-noi/alex-nedelia-kerekes prezent
- 3 articole noi prezente
- Toate URL-urile sunt 200 (no 404)

- [ ] **Step 5: Submit sitemap în GSC**

Manual: în Google Search Console > Sitemaps, submit sitemap.xml dacă nu e deja.

Request indexing manual pentru:
- /creare-site-timisoara
- /despre-noi/ernest-slach
- /despre-noi/alex-nedelia-kerekes
- 3 articole noi

- [ ] **Step 6: Create weekly-positions.csv template**

Create `docs/seo-tracking/weekly-positions.csv`:

```csv
date,query,position,impressions,clicks,ctr
2026-05-27,creare site timisoara,9,2026,26,0.0128
2026-05-27,web design timisoara,7,4570,77,0.0168
2026-05-27,creare site bucuresti,20,9464,19,0.0020
2026-05-27,creare site cluj,,,,
2026-05-27,creare site brasov,,,,
2026-05-27,creare site iasi,5,419,9,0.0214
2026-05-27,creare site constanta,,,,
2026-05-27,firma web design timisoara,,,,
2026-05-27,realizare website timisoara,,,,
2026-05-27,creare website,22,8542,11,0.0013
```

(Update săptămânal după baseline.)

- [ ] **Step 7: Update deployment log**

Append to `docs/seo-tracking/deployment-log.md`:

```markdown
| 2026-05-27 → ~2026-07-08 | All tasks 1-20 deployed | (all files) | Recovery plan implementation complete |
```

- [ ] **Step 8: Final commit**

```powershell
git add docs/seo-tracking/
git commit -m "docs(seo): finalize tracking + Lighthouse reports baseline"
```

- [ ] **Step 9: Tag release**

```powershell
git tag -a v-seo-recovery-2026-05 -m "SEO recovery plan implementation complete"
```

(Push tag separat când e ready: `git push origin v-seo-recovery-2026-05`)

---

## Self-review checklist (efectuat de Claude la final)

Spec coverage:
- ✅ Faza 1 (tech quick wins): Tasks 1-8
- ✅ Faza 2 (de-templatizare + autor): Tasks 4-11
- ✅ Faza 3 (content cluster): Tasks 12-15
- ✅ Faza 4 (AEO + measurement): Tasks 16-20
- ✅ /creare-site-timisoara: Task 6
- ✅ Title rewrite: Tasks 7-8
- ✅ Schema enrichment: Task 2
- ✅ llms.txt + llms-full.txt: Tasks 3, 19
- ✅ City de-templatize: Tasks 4-7
- ✅ Pagini autor: Tasks 9-10
- ✅ Blog cluster + Article schema: Tasks 11-15
- ✅ Internal linking + RelatedContent: Task 16
- ✅ Footer rewrite: Task 17
- ✅ AEO answer boxes: Task 18
- ✅ Baseline + KPIs: Tasks 1, 20

---

## Execution handoff

Plan complete și saved la `docs/superpowers/plans/2026-05-27-seo-recovery-plan.md`. Două opțiuni de execuție:

**1. Subagent-Driven (recomandat)** — Dispatch fresh subagent per task, review între task-uri, iterație rapidă. Bun pentru această execuție pe că task-urile sunt independente (orașe diferite, articole diferite).

**2. Inline Execution** — Execută task-urile în sesiunea aceasta cu `executing-plans`, batch execution cu checkpoint-uri pentru review.

Care abordare preferi?


