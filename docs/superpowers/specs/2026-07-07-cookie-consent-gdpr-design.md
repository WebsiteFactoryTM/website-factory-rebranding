# Cookie Consent GDPR + Google Consent Mode v2 — Design

**Data:** 2026-07-07
**Status:** Aprobat pentru implementare
**Scope:** Rescriere sistem cookie consent custom (fără CMP extern), compliant GDPR (UE 2016/679) + ePrivacy / Legea RO 506/2004 + practica ANSPDCP, cu Google Consent Mode v2.

## Context — starea actuală (ce se repară)

Stack real de tracking: **GA4** (`G-95D6D580HV`, direct via gtag) + **Meta Pixel** (`1056620019544195`, hard-gated) + **Vercel Analytics** (mereu on) + **AskBot** widget (funcțional). **Nu există GTM, Hotjar sau Google Ads.**

Fișiere existente: `lib/cookie-consent.ts`, `components/cookie-consent.tsx`, `components/analytics-loader.tsx`, `components/ga-script-loader.tsx`, `components/meta-pixel-loader.tsx`, `app/politica-cookie/page.tsx`, buton footer `window.showCookieConsent`.

### Probleme de conformitate / tehnice identificate
1. **Consent Mode default în `useEffect`** (`AnalyticsLoader`) → race cu scripturile de tracking. Trebuie `beforeInteractive` în `<head>`.
2. **Fără expirare** — consimțământul e valabil pe veci; nu se re-solicită la 6 luni.
3. **Persistență doar în `localStorage`**, nu cookie first-party.
4. **Retragere neefectivă live** — loaderele nu se re-randează la schimbarea consimțământului (nu există context reactiv); pixelul rămâne montat până la reload; `_fbp/_fbc` nu se șterg.
5. **Fără SPA `page_view`** la schimbarea rutei (App Router).
6. **Accesibilitate incompletă** — fără `role="dialog"`, focus trap, `aria-modal`, ESC.
7. **Prominență inegală** Accept vs. Respinge.
8. **Vercel Analytics** listat ca „analytics" dar rulează necondiționat.
9. **Politica cookie** — Secțiunea 4 folosește „continued browsing = consent" (non-compliant); lipsă buton reopen + tabel sumar.

## Decizii (confirmate cu utilizatorul)
- **Fix pe stack-ul actual** (GA4 direct + Meta Pixel hard-gated). Fără GTM/Hotjar/Ads. Structură pregătită pentru GTM ulterior prin izolarea mapării categorii→semnale.
- **Vercel Analytics gate-uit** pe consimțământ `analytics`.
- **Politica cookie: update** (nu rescriere) — fix limbaj + tabel + buton.

## Arhitectură

### Mapare categorii → semnale Consent Mode v2
- `necessary` → (niciun semnal; mereu ON, blocat)
- `analytics` → `analytics_storage` (GA4, Vercel Analytics)
- `marketing` → `ad_storage` + `ad_user_data` + `ad_personalization` (Meta Pixel)

Model: **hard gating** pentru toate tool-urile non-esențiale (scriptul nu se injectează până la consimțământ). Consent Mode v2 setat suplimentar pentru GA4 (semnalele modelează comportamentul Google).

### Fișiere noi
```
lib/consent/
  types.ts          ConsentCategory, ConsentState, ConsentRecord, CONSENT_VERSION, CONSENT_MAX_AGE_MS
  storage.ts        read/write cookie `consent_state` (SameSite=Lax, 180z); isValid() (expirare 6 luni + versiune); readConsentClient()
  consent-mode.ts   setConsentDefault(), updateConsentSignals(state), mapCategoriesToSignals(state)
  signal-script.ts  buildConsentDefaultScript(): string — inline pt <head>, rulează beforeInteractive

components/consent/
  consent-default-script.tsx    <Script beforeInteractive> cu buildConsentDefaultScript()
  consent-provider.tsx          Context: state + { acceptAll, rejectAll, save, withdraw, openPreferences, isBannerOpen }
  consent-banner.tsx            banner + panou preferințe, accesibil
  page-view-tracker.tsx         usePathname → gtag page_view dacă analytics granted
  tag-loaders/
    ga-loader.tsx               GA4, randare condiționată reactiv (analytics)
    meta-pixel-loader.tsx       Meta Pixel, randare condiționată reactiv (marketing)
    vercel-analytics-loader.tsx <Analytics/> gate pe analytics
```

### Fișiere modificate
- `app/layout.tsx` — `<head>`: `ConsentDefaultScript` (beforeInteractive). `<body>`: `ConsentProvider` înfășoară totul; înăuntru loaderele + `ConsentBanner` + `PageViewTracker`. Se elimină `<AnalyticsLoader/>` și `<Analytics/>` direct.
- `components/layout/footer.tsx` — butonul „Gestionare cookie-uri" folosește provider-ul (păstrăm `window.showCookieConsent` ca fallback pentru backward-compat).
- `app/politica-cookie/page.tsx` — fix Secțiunea 4 (consimțământ explicit + retragere), tabel-sumar, buton „Setări cookie-uri".

### Fișiere șterse
`lib/cookie-consent.ts`, `components/cookie-consent.tsx`, `components/analytics-loader.tsx`, `components/ga-script-loader.tsx`, `components/meta-pixel-loader.tsx`.

### Env / config
- `NEXT_PUBLIC_GA_ID` (= `G-95D6D580HV`), `NEXT_PUBLIC_META_PIXEL_ID` (= `1056620019544195`).
- `.env.example` cu placeholders + comentarii.
- Loaderele nu randează dacă env-ul lipsește.

## Model de date & persistență

```ts
interface ConsentState { necessary: true; analytics: boolean; marketing: boolean }
interface ConsentRecord extends ConsentState { timestamp: number; version: string }
```

- Cookie `consent_state` = JSON.stringify(ConsentRecord), `SameSite=Lax; Path=/; Max-Age=15552000` (180 zile), `Secure` în prod.
- Re-solicitare dacă: cookie absent **SAU** `Date.now() - timestamp > 6 luni (15768000000ms)` **SAU** `version !== CONSENT_VERSION`.
- `necessary` mereu `true`; nicio pre-bifare pentru analytics/marketing.

## Fluxul de execuție

1. **`<head>` beforeInteractive:** init `dataLayer`/`gtag`; `gtag('consent','default', { ad_storage:'denied', analytics_storage:'denied', ad_user_data:'denied', ad_personalization:'denied', wait_for_update:500 })` + `ads_data_redaction:true` + `url_passthrough:true`; apoi citește cookie-ul și, dacă e valid, `gtag('consent','update', ...)` cu semnalele salvate. Totul înainte de hidratare → fără flash, fără race.
2. **Client mount (provider):** citește starea din cookie; dacă invalid/absent → `isBannerOpen=true`.
3. **Acțiuni utilizator:**
   - `acceptAll` / `rejectAll` / `save(state)` → scrie cookie + `updateConsentSignals()` + închide banner.
   - `withdraw`/marketing OFF → `updateConsentSignals()` (denied) + demontează loaderul (via state reactiv) + șterge `_fbp`, `_fbc` (document.cookie expirat pe domeniu + parent domain).
   - `openPreferences` → deschide panoul (apelat din footer/policy).
4. **Loadere:** citesc starea din provider (reactiv). GA4/Meta/Vercel se montează doar când categoria e granted; se demontează la retragere.
5. **SPA page_view:** `PageViewTracker` ascultă `usePathname`; dacă `analytics` granted → `gtag('event','page_view', { page_path, page_title })`.

## Accesibilitate
`role="dialog"`, `aria-modal="true"`, `aria-labelledby`/`aria-describedby`, focus trap (focus pe primul buton la deschidere, ciclare Tab), ESC închide panoul de preferințe (nu și primul strat, ca să nu fie „dismiss = consent"), navigare completă tastatură, contrast AA. Butoanele Accept/Respinge — aceeași dimensiune, aceeași prominență vizuală pe primul strat.

## UI banner (primul strat)
Trei acțiuni egale ca prominență: **Acceptă toate** / **Respinge toate** / **Preferințe**. Text scurt + link „Politica de cookie-uri". Fără dark patterns, fără buton de închidere care echivalează cu accept.

## Non-goals (YAGNI)
- GTM, Hotjar, Google Ads — nu se adaugă.
- AskBot rămâne neschimbat (widget funcțional, nu tracking cross-site).
- Fără backend de „consent proof" server-side (proof-ul e în cookie-ul first-party cu timestamp + versiune).

## Checklist de verificare (Definition of Done)
- [ ] Respins: fără requesturi cu cookie către googletagmanager/google-analytics, facebook.net/tr; fără `_ga/_gid/_fbp` în `document.cookie`.
- [ ] `dataLayer`: `consent default denied` înainte de orice tag (verificabil în head).
- [ ] Accept → `consent update granted`; loaderele se montează.
- [ ] Retragere marketing → pixel demontat + `_fbp/_fbc` șterse, live, fără reload.
- [ ] Respinge persistă (reload → banner nu reapare, tracking oprit).
- [ ] Accept/Reject aceeași prominență; panou navigabil tastatură + focus trap + ESC.
- [ ] >6 luni sau bump `CONSENT_VERSION` → banner reapare.
- [ ] `next build` fără warning-uri de hidratare.
- [ ] Politica cookie: fără „continued browsing = consent"; tabel + buton setări prezente.
