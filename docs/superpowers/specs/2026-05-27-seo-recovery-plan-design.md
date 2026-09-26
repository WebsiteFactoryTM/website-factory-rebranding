# SEO Recovery & Growth Plan — Website Factory

**Date:** 2026-05-27
**Status:** Approved design, ready for implementation planning
**Owner:** Website Factory team
**Estimated effort:** 19-22 zile dev + content, calendar de 6 săptămâni

---

## 1. Context & problem statement

Website Factory (`websitefactory.ro`) a fost relansat în ianuarie 2026 cu un site nou pe Next.js 16. Între ianuarie 2023 și iarna 2025-2026, site-ul a deținut pozițiile 1-3 pe Google pentru cuvintele cheie principale:

- `creare site Timisoara`
- `web design Timisoara`
- `firma web design Timisoara`
- `realizare website Timisoara`

În mai 2026, pozițiile au scăzut la 4-6 pentru aceleași cuvinte cheie. Lead-urile organice au scăzut considerabil. Site-ul are Domain Rating 50 pe Ahrefs (198 linking domains, 87K backlinks).

### Date concrete din GSC (90 zile, până 2026-05-27)

| Query | Impresii | Click-uri | CTR | Poziție estimată |
|---|---|---|---|---|
| `website factory` | 1,312 | 187 | 14.3% | 1-2 (brand) |
| `web design timisoara` | 4,570 | 77 | 1.7% | 6-10 |
| `creare site timisoara` | 2,026 | 26 | 1.3% | 7-10 |
| `creare site bucuresti` | 9,464 | 19 | 0.2% | 15-25 |
| `creare site web` | 14,285 | 15 | 0.1% | 20+ |
| `creare website` | 8,542 | 11 | 0.13% | 20+ |
| `webdesign timisoara` | 1,106 | 10 | 0.9% | 8-12 |
| `creare site iasi` | 419 | 9 | 2.1% | 5-8 |

**Average CTR:** 0.3% | **Average position:** 39.2 | **Total clicks (90d):** 777 | **Total impressions (90d):** 285K

### Trending pozitiv (ultimele 28 zile)

- Home page (Timișoara): **+31%** click-uri
- `/creare-site-bucuresti`: **+300%** click-uri

Recuperarea naturală e deja în curs, dar lentă. Trebuie accelerată.

### Cauze identificate

1. **Relansarea ianuarie 2026** a dezechilibrat semnalele Google (deși structura URL-urilor a fost păstrată)
2. **Lipsă pagină dedicată `/creare-site-timisoara`** — competitorii au URL exact match
3. **City pages folosesc același template** `<CityContent>` → risc near-duplicate signal
4. **Blog subțire (5 articole)** pentru un DR 50 — sub potențial topical authority
5. **Title tags slabe** — CTR 0.3% indică SERP appearance care nu atrage click-uri
6. **`llms.txt` are link rupt** către `/creare-site-timisoara` (pagina nu există)
7. **Conținutul nu e suficient localizat** — referințe vagi la orașe, fără cartiere, industrii, exemple concrete

---

## 2. Strategie & abordare aleasă

**Abordare aleasă:** A + elemente B/O (recovery rapid + pagini autor + content cluster Timișoara).

**Principiul director:** impact × ușurință. Quick wins tehnice primii (săptămâna 1-2), conținut și autoritate după.

**Anti-pattern explicit evitate:**
- Programmatic SEO la scară (risc doorway pages)
- Conținut templated repetat între orașe
- Title stuffing keyword-uri
- Lansare masivă în paralel (preferăm graduală pentru monitorizare)

**Tradeoff acceptat:** sacrificăm puțin viteza pentru calitate — 6 pagini foarte bune > 30 pagini thin.

---

## 3. Faze & livrabile

### Faza 1 — Quick wins tehnice (Săptămâna 1-2)

#### 3.1.1 Pagina dedicată `/creare-site-timisoara`

**Fișiere noi:**
- `app/creare-site-timisoara/page.tsx`
- `components/cities/timisoara-hero.tsx`
- `components/cities/timisoara-content.tsx`
- `components/cities/timisoara-blob.tsx` (opțional, pentru consistență vizuală)

**Cerințe conținut:**
- Minimum 1,800 cuvinte unice
- Conținut **complet diferit** de home page (nu copy-paste)
- Home page rămâne tot Timișoara-targetată, dar pe brand/general
- Referințe locale: Iulius, UVT, Politehnica, zona Lipovei, Dumbrăvița, Centrul Vechi
- Industrii dominante Timișoara: IT (>500 firme), automotive, retail, manufacturing
- Adăugare în `sitemap.ts` cu priority 1.0

**Integrare:**
- Internal link prominent din home page către `/creare-site-timisoara`
- Update `lib/seo.ts` `areaServed` cu Timișoara prima poziție

#### 3.1.2 Rewrite title tags & meta descriptions pentru CTR

**Reguli:**
- Maxim 60 caractere pe title (Google taie peste)
- Număr/an/preț/diferențiator în primele 30 caractere
- Title-ul nu duplică H1 (H1 mai expresiv)
- Meta description 120-155 caractere cu CTA + USP

**Pattern propus (exemple):**

```
Vechi: "Creare Site Timișoara - Web Design Timișoara"
Nou:   "Creare Site Timișoara de la 450€ | Website Factory ★ 4.9"

Vechi: "Creare Site București - Web Design București"
Nou:   "Creare Site București 2026 ✓ Web Design Profesional"

Vechi: "Optimizare SEO pentru Website-uri: Ghid Complet 2026"
Nou:   "Ghid SEO 2026: 12 Tactici Care Cresc Trafic în 90 Zile"
```

**Scope:** toate paginile principale (home, 6 city pages, 4 servicii, 5 blog posts, despre, contact, pret-website).

#### 3.1.3 Reparare `llms.txt`

Link rupt actual: `/creare-site-timisoara` se rezolvă după ce creăm pagina (3.1.1). Plus extindem cu pagini autor după 3.2.2.

#### 3.1.4 Schema enrichment

**În `lib/seo.ts`, adăugăm funcții noi:**

```ts
// Offer / Price schema pentru servicii
generateServiceWithOfferSchema({
  name, description, url,
  priceFrom: 450,
  priceCurrency: "EUR"
})

// GeoCircle pentru raze de servire
generateAreaServedGeoCircle({
  lat: 45.7489, lng: 21.2087, radiusKm: 50
})

// Person schema cu E-E-A-T
generatePersonSchemaFull({
  name, jobTitle, image, sameAs[],
  knowsAbout: ["Web Design", "SEO", "Next.js"],
  alumniOf: "..."
})

// Article schema (pentru blog posts)
generateArticleSchema({
  headline, datePublished, dateModified,
  authorSlug, image, description
})
```

**Aplicate pe:**
- City pages → `ServiceWithOffer` cu price range (450€-5000€)
- Home page → `LocalBusiness` + `GeoCircle`
- Pagini autor noi → `Person` completă
- Blog posts → `Article` cu `author.@type: Person` legat la `/despre-noi/[author]`

#### 3.1.5 Fix-uri tehnice rapide

- Verificare canonical pe toate paginile
- Sitemap update cu URL-uri noi + ultim modified
- Robots.txt verificare (nu blochează imagini/CSS)
- **NU adăugăm hreflang** (singură limbă, ro)

### Faza 2 — De-templatizare city pages + pagini autor (Săptămâna 2-4)

#### 3.2.1 Component nou `<CityLocalDeepDive>`

Sub-componente noi:
- `components/cities/city-local-deep-dive.tsx` (părinte)
- `components/cities/city-zones.tsx`
- `components/cities/city-industries-deep.tsx`
- `components/cities/city-case-study.tsx`
- `components/cities/city-faq-extended.tsx`

**Structură per oraș (unic, nu template):**
- "Zone & Cartiere" — 5-8 zone cu nume, profil, exemple
- "Industrii dominante" — 3-5 industrii cu context local
- "Case study local" — 1 proiect real (sau exemplu) per oraș
- "FAQ locale specifice" — minimum 10 Q&A unice/oraș (nu refolosite între orașe)
- "Resurse locale" — link-uri externe către camere de comerț, cluster IT, etc.

**Date seed pe oraș (în `lib/cities-data.ts`):**

| Oraș | Zone-cheie | Industrii top | Hook unic |
|---|---|---|---|
| Timișoara | Iulius, Dumbrăvița, Centrul Vechi, Lipovei, Soarelui | IT (>500 firme), automotive, retail | Hub IT Vest, UVT/Politehnica |
| București | Pipera, Băneasa, Centrul Vechi, Floreasca, Militari | Corporate, finanțe, real estate | Capitală, hub multinational |
| Cluj | Mărăști, Zorilor, Mănăștur, Florești, Centru | IT, startup-uri, fintech | "Silicon Valley of RO" |
| Brașov | Centrul Vechi, Tractorul, Bartolomeu, Răcădău | Turism, automotive, manufacturing | Poarta Transilvaniei |
| Iași | Copou, Tătărași, Palas, Păcurari | IT, academic, medical | Cel mai mare hub tech estic |
| Constanța | Mamaia, Tomis, Faleză, Tomis Nord | Logistică, port, turism | Singurul port mare RO |

**Cerință:** fiecare city page urcă la minimum 1,800 cuvinte total (existing + new content).

#### 3.2.2 Pagini autor

**Fișiere noi:**
- `app/despre-noi/ernest-slach/page.tsx`
- `app/despre-noi/alex-nedelia-kerekes/page.tsx`

**Conținut per pagină (minimum 1,500 cuvinte total):**
- Bio profesional 400-600 cuvinte
- Background tehnic + ani experiență + tehnologii dominante
- Articole semnate (auto-list cu interlink + scurte excerpts)
- 3-5 proiecte recente notabile (cu link la portofoliu)
- Filozofie/quote profesional + abordare client
- Skills & expertise (cu detalii)
- `Person` schema completă (jobTitle, alumniOf, knowsAbout, sameAs LinkedIn/Twitter/GitHub)

**Date în `lib/authors-data.ts`:**
- Bio, jobTitle, sameAs, knowsAbout, image, articleSlugs

#### 3.2.3 Update blog post structure

- `app/blog/[slug]/page.tsx`: byline cu link către `/despre-noi/[author]`
- "Despre autor" box la finalul fiecărui articol
- `Article` schema cu `author.@type: Person` ref către pagina autorului
- `blog-data.ts` update: `authorSlug` field nou pentru leak la pagină

### Faza 3 — Content cluster Timișoara (Săptămâna 3-5)

#### 3.3.1 Articole noi (3 + 1 update)

**Articol 1: Prețuri**
- **Slug:** `/blog/preturi-creare-site-timisoara-2026`
- **Target keyword:** "preț creare site timisoara", "cat costa un site timisoara"
- **Intent:** transactional / commercial investigation
- **Lungime:** 2,500-3,000 cuvinte
- **Structură:** TL;DR range prețuri → factori → comparație (freelancer/agenție/DIY) → pricing tiers → calculator embed → FAQ + Schema FAQPage
- **CTA primar:** "Calculează prețul tău" → `/pret-website`

**Articol 2: Magazin online Timișoara**
- **Slug:** `/blog/magazin-online-timisoara-ghid-complet`
- **Target keyword:** "magazin online timisoara", "ecommerce timisoara"
- **Intent:** informational + commercial
- **Lungime:** 3,000-3,500 cuvinte
- **Highlights:** integrări locale (Netopia, Euplatesc, FAN Courier, Cargus, Sameday), facturare e-Factura, particularități piața Timișoara
- **CTA primar:** "Cere ofertă magazin online" → `/contact`

**Articol 3: SEO local**
- **Slug:** `/blog/seo-local-timisoara-google-business-profile`
- **Target keyword:** "seo local timisoara", "optimizare google maps timisoara"
- **Intent:** informational
- **Lungime:** 2,500 cuvinte
- **Conținut:** GBP setup, citations, NAP consistency, recenzii, schema LocalBusiness
- **CTA primar:** "Auditare SEO local gratuită" → `/contact`

**Update articol existent: `web-design-timisoara-ghid-complet-firme-locale`**
- Refresh data 2026
- Adăugare interlink-uri spre noile 3 articole
- Adăugare CTA prominent spre `/creare-site-timisoara`
- Extindere FAQ
- 2-3 secțiuni noi (e-Factura, AI search, mobile-first)

#### 3.3.2 Reguli de scriere blog

- **Format AEO:** întrebare → răspuns direct în primul paragraf, apoi detalii
- **Listicle + tabele** unde relevant (Featured Snippets + AI Overviews)
- **Author byline link** către `/despre-noi/[autor]`
- **Minimum 5 imagini** custom (nu stock generic), alt text descriptiv
- **Minimum 3 interlink-uri** spre alte pagini ale site-ului per articol
- **1-2 link-uri externe** către surse autoritative

#### 3.3.3 Schema markup blog enhanced

Update `app/blog/[slug]/page.tsx` cu:
- `Article` schema cu author Person ref
- `BreadcrumbList`
- `FAQPage` pentru articolele cu FAQ
- `HowTo` pentru ghiduri pas-cu-pas (dacă aplicabil)

### Faza 4 — Internal linking + AEO depth (Săptămâna 4-6)

#### 3.4.1 Component `<RelatedContent />`

Auto-suggester de link-uri contextuale per pagină:

```ts
// lib/internal-links.ts
export function getRelatedContent({
  pageType: "city" | "service" | "blog" | "home",
  citySlug?: string,
  serviceSlug?: string,
  blogCategory?: string,
}): RelatedItem[]
```

Returnează 3-5 link-uri relevante. Folosit jos pe pagini, deasupra footer-ului.

#### 3.4.2 Footer rewrite

Footer-ul actual e modificat la rebrand. Rescriere cu secțiuni pe intent:
- "Servicii" — 4 servicii
- "Pentru orașul tău" — 6 city pages (Timișoara incluse, prima)
- "Resurse" — blog hub + 3 articole top
- "Despre" — pagina principală + 2 pagini autor noi

#### 3.4.3 Anchor text strategy

- Anchor-uri descriptive cu keyword variation, nu "click aici"
- Maxim 1 exact match keyword anchor per pagină per destinație
- Audit manual pe paginile principale; auto-corecție în RelatedContent component

#### 3.4.4 Extindere `llms-full.txt`

Restructurare cu format optimizat pentru AI parsing:
- Identitate (cine suntem)
- Servicii cu prețuri concrete
- 50+ Q&A real-world structurate
- Acoperire geografică
- Persoane cheie (link la pagini autor)

**Target:** 8,000-12,000 cuvinte, knowledge base style, nu marketing copy.

#### 3.4.5 AEO answer boxes

În fiecare city page + blog post, prima secțiune răspunde direct la întrebarea principală:

```jsx
<div className="answer-box">
  <h2>Cât costă un site web în Timișoara?</h2>
  <p className="lead">
    <strong>În Timișoara, un site de prezentare costă între 450-1500€</strong>,
    în funcție de complexitate. Site-urile corporate pornesc de la 650€,
    iar magazinele online de la 1100€.
  </p>
</div>
```

Format: titlu = întrebare, primul paragraf = răspuns direct (40-60 cuvinte), apoi detalii.

#### 3.4.6 People Also Ask integration

Pentru fiecare keyword target principal, identificăm întrebări PAA Google și le includem ca H2 în pagini relevante. Lista inițială (urmează să fie augmentată cu data reală din SERP audit):

**Pentru "creare site Timișoara":**
- Cât costă un site web în Timișoara?
- Cât durează crearea unui site profesional?
- Ce trebuie să conțină un site bun pentru o firmă locală?
- Cum aleg agenția potrivită din Timișoara?
- Site WordPress sau custom — ce alegi?

**Pentru "web design Timișoara":**
- Ce înseamnă web design profesional?
- Cum recunosc un design slab?
- Ce este SEO-friendly design?

---

## 4. Structura fișierelor afectate

```
app/
├─ creare-site-timisoara/page.tsx                          [NOU]
├─ creare-site-bucuresti/page.tsx                          [UPDATE]
├─ creare-site-cluj/page.tsx                               [UPDATE]
├─ creare-site-brasov/page.tsx                             [UPDATE]
├─ creare-site-iasi/page.tsx                               [UPDATE]
├─ creare-site-constanta/page.tsx                          [UPDATE]
├─ despre-noi/
│  ├─ ernest-slach/page.tsx                                [NOU]
│  └─ alex-nedelia-kerekes/page.tsx                        [NOU]
├─ blog/[slug]/page.tsx                                    [UPDATE - byline + author box + Article schema]
├─ sitemap.ts                                              [UPDATE - URL-uri noi]
├─ layout.tsx                                              [UPDATE - title default]
└─ page.tsx                                                [UPDATE - link la /creare-site-timisoara]

components/
├─ cities/
│  ├─ city-local-deep-dive.tsx                             [NOU]
│  ├─ city-zones.tsx                                       [NOU]
│  ├─ city-industries-deep.tsx                             [NOU]
│  ├─ city-case-study.tsx                                  [NOU]
│  ├─ city-faq-extended.tsx                                [NOU]
│  ├─ timisoara-hero.tsx                                   [NOU]
│  ├─ timisoara-content.tsx                                [NOU]
│  └─ timisoara-blob.tsx                                   [NOU - opțional]
├─ layout/footer.tsx                                       [UPDATE]
└─ related-content.tsx                                     [NOU]

lib/
├─ seo.ts                                                  [UPDATE - schema nouă]
├─ blog-data.ts                                            [UPDATE - authorSlug field]
├─ cities-data.ts                                          [NOU - date locale]
├─ authors-data.ts                                         [NOU - bio + schema]
└─ internal-links.ts                                       [NOU - related content logic]

content/blog/
├─ preturi-creare-site-timisoara-2026.mdx                  [NOU]
├─ magazin-online-timisoara-ghid-complet.mdx               [NOU]
├─ seo-local-timisoara-google-business-profile.mdx         [NOU]
└─ web-design-timisoara-ghid-complet-firme-locale.mdx      [UPDATE]

public/
├─ llms.txt                                                [UPDATE]
└─ llms-full.txt                                           [REWRITE major]

docs/seo-tracking/
├─ baseline-2026-05-27.csv                                 [NOU]
├─ weekly-positions.csv                                    [NOU]
├─ weekly-ctr.csv                                          [NOU]
└─ deployment-log.md                                       [NOU]
```

---

## 5. Măsurare, KPIs & quality gates

### 5.1 Baseline (2026-05-27)

| Metric | Valoare | Sursă |
|---|---|---|
| Average position | 39.2 | GSC |
| Average CTR | 0.3% | GSC |
| Total impressions (90d) | 285K | GSC |
| Total clicks (90d) | 777 | GSC |
| DR Ahrefs | 50 | Ahrefs |
| Linking domains | 198 | Ahrefs |

Snapshot complet salvat în `docs/seo-tracking/baseline-2026-05-27.csv` (CSV export GSC + Ahrefs).

### 5.2 KPIs țintă (90 zile după finalizarea implementării — așteptat ~2026-10-06)

| Metric | Conservator | Ambițios |
|---|---|---|
| Average position | < 25 | < 15 |
| Average CTR | > 1.0% | > 2.0% |
| `creare site timisoara` poziție | 3-5 | 1-3 |
| `creare site bucuresti` poziție | 8-12 | 4-6 |
| Click-uri organice / lună | +50% vs baseline | +120% vs baseline |
| Lead-uri organice / lună | +30% | +80% |
| Pagini cu impresii > 100 | +40% | +100% |

**Notă:** SEO are inertie 6-12 săptămâni după modificări majore. Măsurătoare reală abia după săptămâna 8-10.

### 5.3 Quality gates pre-deploy (per schimbare)

- [ ] Lighthouse SEO ≥ 95
- [ ] Title 40-60 caractere
- [ ] Meta description 120-155 caractere
- [ ] H1 unic, conține keyword target
- [ ] Schema validat cu schema.org validator + Rich Results Test
- [ ] Canonical corect
- [ ] OG image specificat
- [ ] Internal links ≥ 3 spre pagini relevante
- [ ] Alt text pe toate imaginile
- [ ] Core Web Vitals preview verificat (LCP < 2.5s, CLS < 0.1, INP < 200ms)

**Pentru blog adăugăm:**
- [ ] Author Person schema linkat
- [ ] AEO answer box în primele 100 cuvinte
- [ ] FAQ schema dacă are FAQ
- [ ] Reading time vizibil

### 5.4 Monitorizare săptămânală

**Process:**
1. **Luni:** export queries GSC + position changes → `weekly-positions.csv`
2. Update `deployment-log.md` cu ce s-a lansat
3. Analiză rapidă: a crescut sau a scăzut?
4. **Vineri:** orice pagină cu drop >5 poziții → investigare

### 5.5 Risk management

| Risc | Mitigare |
|---|---|
| Schimbări masive disrupta ranking temporar | Lansare graduală, săptămânal nu zilnic, monitor post-deploy |
| Conținut auto-generat → AI detection penalty | User revizuiește fiecare draft, adaugă voce umană + exemple reale |
| Schema invalid → rich results pierdute | Validare schema.org + Rich Results Test la fiecare schimbare |
| Pagini noi considerate thin | City pages min 1,800 cuvinte unice, autor min 1,500, blog min 2,500; internal linking solid |
| Title change duce la CTR drop temporar | Păstrăm versiuni vechi în repo, putem reverta rapid |

### 5.6 Definition of Done

Proiect complet când:
- ✅ Toate fișierele noi din plan în production
- ✅ Toate city pages minimum 1,800 cuvinte unice
- ✅ 3 articole blog noi publicate + 1 update
- ✅ 2 pagini autor live cu Person schema validă
- ✅ Baseline + minimum 1 raport weekly în `docs/seo-tracking/`
- ✅ Lighthouse SEO ≥ 95 pe toate paginile modificate
- ✅ Validare schema 100% pass pe Rich Results Test

---

## 6. Out of scope (deliberat exclus)

Ce **nu** facem în acest plan, ca să rămână focusat:

- ❌ Programmatic SEO (pagini industrie × oraș la scară) — risc doorway pages
- ❌ Pagini cartier individuale (`/creare-site-timisoara/dumbravita`) — pentru fază viitoare
- ❌ Schimbarea stack-ului tehnic (Next.js 16 e excelent, păstrăm)
- ❌ Migrare la alt CMS — content rămâne în MDX + hardcoded data
- ❌ Backlink building campaign — focus pe on-page primă
- ❌ Google Ads optimization — separat de SEO organic
- ❌ Redesign vizual — păstrăm look-ul actual
- ❌ Hreflang (singură limbă)
- ❌ Wikipedia/Wikidata entries — fază viitoare AEO

Aceste elemente pot fi adăugate într-un plan ulterior odată ce recovery-ul de bază e atins.

---

## 7. Effort total & timeline

| Fază | Săpt | Effort dev | Notă |
|---|---|---|---|
| 1 - Tech quick wins | 1-2 | ~3 zile | High impact, low effort |
| 2 - De-templatizare + autor | 2-4 | ~6.5 zile | Content writing intensiv |
| 3 - Content cluster | 3-5 | ~5.5 zile | 3 articole noi + update |
| 4 - AEO + measurement | 4-6 | ~4.5 zile | Foundation pentru viitor |

**Total:** ~19.5 zile dev + content. Cu 1 dev FT și content review din partea echipei, fezabil în 6 săptămâni calendar.

---

## 8. Dependențe & decisions luate

- **Content writing:** Claude face drafturi, user revizuiește (autenticitate locală)
- **URL structure relansare 2026:** nu s-a schimbat (deci nu e cauza drop-ului)
- **Stack:** Next.js 16 + React 19 + Tailwind 4 + MDX (păstrat)
- **Hosting:** Vercel (asumat din `@vercel/analytics`)
- **Localizare:** doar `ro`, no hreflang

---

## 9. Next step

După aprobarea acestui spec, invocăm skill-ul `writing-plans` pentru a crea planul de implementare pas-cu-pas pentru cele 4 faze.
