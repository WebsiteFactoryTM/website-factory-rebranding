# English locale (`/en`) via next-intl — Design

**Date:** 2026-09-28
**Status:** Approved for implementation planning
**Scope:** Add English-language routing to the site with `next-intl`. RO stays the default, unprefixed locale; `/en/...` is added for 8 static routes + all portfolio case studies. Every other route stays Romanian-only. English *copy* is out of scope for this phase: EN content is a verbatim duplicate of the RO text until real English copy is written, and `/en` is not published until then.

## Context — current state

- Next.js 16 App Router, React 19, TypeScript. No CMS. No i18n library, no `proxy.ts`/middleware, no locale segments. `<html lang="ro">` hardcoded in `app/layout.tsx`; `siteConfig.locale = "ro_RO"` in `lib/seo.ts` feeds every page's OpenGraph locale.
- All copy is hardcoded in JSX or in TS data files (`lib/portfolio-data.ts`, `lib/content.ts`, `lib/testimonials-data.ts`).
- `generatePageMetadata()` emits a single `canonical`; no `alternates.languages`. `app/page.tsx` exports no metadata at all and inherits the root layout's hardcoded RO title/description/canonical.
- Internal navigation mixes `next/link`, plain `<a href>`, and raw `window.location.href = "/contact"` / `"/pret-website"` assignments.
- No test runner in the project.

## Decisions (confirmed)

| # | Decision |
|---|---|
| 1 | Library: `next-intl`. Content sourcing = hybrid (Approach B): next-intl for routing + short shared UI strings; long-form copy in colocated `{ ro, en }` objects. |
| 2 | `localePrefix: 'as-needed'` — RO URLs stay byte-identical to today; only `/en/*` is prefixed. |
| 3 | No locale detection: `localeDetection: false` (no accept-language or cookie redirects). RO always served at `/`. |
| 4 | `alternateLinks: false` — no automatic hreflang `Link` headers; hreflang is emitted only via page metadata, only for routes that have both locales, and only once EN copy is real. |
| 5 | Localized English slugs via next-intl `pathnames` (table below). Case-study slugs unchanged. |
| 6 | Requests to `/en/<route without an EN version>` **permanently redirect** to the RO URL (not 404). Unknown paths still 404. |
| 7 | Static rendering via Next 16 `next/root-params` (verify next-intl version support during planning; `setRequestLocale` is the fallback). Every route must remain statically rendered. |
| 8 | Portfolio: EN shows **all** projects, ordered by an explicit `enOrder`; RO ordering untouched. |
| 9 | **No pricing of any kind on EN pages**: no price badges, no "De la 450€"-style figures in prose or FAQs, no ROI/revenue calculators, no price-estimator CTA or `/pret-website` links. See "Price content on EN". |
| 10 | hreflang value `en` (language-only, not `en-GB`); OpenGraph locale `en_GB`; `x-default` → RO. |
| 11 | Contact API receives `locale` and sends EN subjects/templates/errors for EN submissions. |
| 12 | Add Vitest for unit-testable logic (`lib/seo.ts`, portfolio ordering, locale/path helpers). |
| 13 | `/en` ships `noindex`, excluded from sitemap, without hreflang, until English copy is approved (publishing gate). |
| 14 | Testimonials/Review JSON-LD on the EN homepage: emit **no** Review/AggregateRating schema on `/en` for now (RO quotes); revisit with the EN copy. |

## Route scope

### Routes with both locales (localized EN slugs)

| Internal pathname (RO, unchanged) | EN URL |
|---|---|
| `/` | `/en` |
| `/despre-noi` | `/en/about` |
| `/contact` | `/en/contact` |
| `/servicii` | `/en/services` |
| `/servicii/creare-website` | `/en/services/website-development` |
| `/servicii/magazin-online` | `/en/services/ecommerce` |
| `/servicii/dezvoltare-aplicatie` | `/en/services/app-development` |
| `/portofoliu` | `/en/portfolio` |
| `/portofoliu/[slug]` | `/en/portfolio/[slug]` (all 9 featured slugs) |

### RO-only routes (redirect from `/en/...` to RO)

`/pret-website`, `/creare-site-{bucuresti,brasov,cluj,constanta,iasi}`, `/termeni-si-conditii`, `/politici-de-confidentialitate`, `/politica-cookie`, 404 page. `app/api/*`, `sitemap.ts`, `robots.ts` are not locale-scoped and stay where they are.

## Architecture

### Routing config

```
i18n/routing.ts     defineRouting({ locales: ['ro','en'], defaultLocale: 'ro',
                     localePrefix: 'as-needed', localeDetection: false,
                     alternateLinks: false, pathnames: { ...table above } })
i18n/navigation.ts  createNavigation(routing) → Link, redirect, usePathname, useRouter, getPathname
i18n/request.ts     getRequestConfig → loads messages/{locale}.json
proxy.ts            createMiddleware(routing); matcher excludes /api, /_next, static files
next.config.mjs     wrapped with createNextIntlPlugin('./i18n/request.ts')
messages/ro.json    shared UI strings
messages/en.json    same keys (values = RO copy until EN copy exists)
```

### File structure

Every route moves one level down with `git mv` (history preserved):

```
app/layout.tsx                      pass-through root layout (returns children)
app/[locale]/layout.tsx             former root layout: <html lang={locale}>, fonts, ThemeProvider,
                                    Header/Footer, consent + analytics loaders, AskBot; generateMetadata
                                    per locale; validates locale with hasLocale() → notFound()
app/[locale]/page.tsx               homepage (+ new per-locale generateMetadata)
app/[locale]/despre-noi/page.tsx    ... and so on for every existing route
app/[locale]/portofoliu/[slug]/page.tsx
app/[locale]/not-found.tsx          moved from app/not-found.tsx, localized
app/[locale]/[...rest]/page.tsx     catch-all → notFound()
```

### Static generation and RO-only guard

`generateStaticParams` is defined **per page**, not on the layout:

- Dual-locale pages return `routing.locales.map(locale => ({ locale }))` (× slugs for the portfolio route).
- RO-only pages return `[{ locale: 'ro' }]` and call a shared guard as their first statement:

```ts
// lib/i18n/ro-only.ts
export function roOnly(locale: string, roPath: string) {
  if (locale !== 'ro') permanentRedirect(roPath)
}
```

So the build prerenders exactly the pages that should exist; a request to `/en/termeni-si-conditii` is rendered on demand, hits the guard, and 308s to `/termeni-si-conditii`. Verification: every route in `next build` output stays static (`○`/`●`); any `ƒ` is a regression.

### Content sourcing (Approach B)

- **Shared UI strings** → `messages/*.json`, consumed with `useTranslations()` / `getTranslations()`: header/footer nav, language switcher, buttons/CTAs, form labels/placeholders/select options/success/error text, consent banner + cookie settings button, FloatingCTA, skip link, 404 page, aria-labels (menu, chatbot, theme toggle), `categoryFilters`, image alt-text templates (`lib/image-alt-text.ts`), breadcrumb labels ("Acasă"/"Home").
- **Long-form copy** → colocated `const copy = { ro: {...}, en: {...} }` at the top of each section component of the in-scope pages (`components/home/*`, `components/about/*`, `components/contact/*`, `components/portfolio/*`, the `services` array and JSX in `app/[locale]/servicii/**`), selected with `useLocale()` / the root `locale()` param. `lib/content.ts` (FAQs) becomes `{ ro, en }` keyed.
- `en` values are a copy of the RO text in this phase. Replacing them later is a values-only edit — no structural change.

### Portfolio data model

`lib/portfolio-data.ts`:

- `FeaturedProject` gains `en: { title, categoryLabel, description, shortDescription, results: {label}[], challenge, solution, testimonial? }` (values duplicated from RO now) and `enOrder: number`.
- `SimpleProject` gains `en: { categoryLabel, shortDescription }` and `enOrder: number`.
- A single `getProjects(locale)` helper returns the merged, locale-resolved objects sorted by `order` (RO, current behavior) or `enOrder` (EN). The case-study page's prev/next navigation and both grids use this helper, so EN ordering is consistent everywhere.
- `enOrder` priority: Fern & Flow → Daylin Nail Supply → Rox Assignment Solution → Riders Route → UN:EVENT → Politehnica Timișoara → Blue Phoenix → La Pinocchio → Sotherm România → Sotherm Italia → Maravo Clinic → Merpano → RD Automatim → all remaining projects in their current RO relative order.

### SEO and metadata

- `generatePageMetadata()` takes `locale` and an optional `alternates` flag. It emits: locale-correct `canonical` (EN pages canonicalize to their own `/en/...` URL, never to RO), `openGraph.locale` (`ro_RO` / `en_GB`), and — only when the flag is on — `alternates.languages: { ro, en, 'x-default': ro }` pointing at each other. The flag is off in this phase (publishing gate) and is turned on per route when EN copy is approved.
- `app/[locale]/layout.tsx` exports `generateMetadata` so the default title/description/OG and `metadataBase` are per locale; `app/[locale]/page.tsx` gets its own `generateMetadata` (today it has none).
- JSON-LD generators (`generateBreadcrumbSchema`, Organization/Service/FAQ/CollectionPage/CreativeWork blocks in pages) take locale-aware labels; `inLanguage` set per locale. No Review/AggregateRating schema on `/en` (decision 14).
- `app/sitemap.ts`: unchanged in this phase (RO only). When the gate opens, add the EN URLs for dual-locale routes only.
- `/en` pages carry `robots: { index: false, follow: true }` until the gate opens.

### Navigation and link policy

- All internal links in shared components and in-scope pages use `Link` from `i18n/navigation.ts` with the **internal (RO) pathname**; next-intl maps it to the localized EN slug and prefix automatically.
- Raw `window.location.href = "/contact"` in `hero.tsx`, `about-cta.tsx`, `cta-section.tsx`, `header.tsx` (and city/service hero variants that are RO-only but share the pattern) are replaced with `Link`/`useRouter` from `i18n/navigation.ts`.
- Links to RO-only routes from any page (legal links in contact form, consent banner → `/politica-cookie`, footer) pass `locale="ro"` explicitly so they never produce `/en/...` URLs.
- Header/footer: "Estimează preț" CTA and the `/pret-website` link in `components/services/website/website-types.tsx` render only when `locale === 'ro'`.

### Price content on EN

EN pages show no pricing. Two mechanisms, chosen per element:

- **Structural elements** render only when `locale === 'ro'`: the `price` badge on the services grid (`app/[locale]/servicii/page.tsx`), the ROI calculator (`components/services/website/roi-calculator.tsx`), the revenue calculator (`components/services/ecommerce/revenue-calculator.tsx`), the price figure in `components/services/ecommerce/ecommerce-blob.tsx`, the "Estimează preț" header CTA, and every `/pret-website` link.
- **Prose containing figures** is dropped from the `en` copy rather than rendered conditionally: the pricing/maintenance FAQ items in `app/[locale]/servicii/{creare-website,magazin-online,dezvoltare-aplicatie}/page.tsx`, and any price-bearing items in `lib/content.ts`, `components/home/faq.tsx`, `components/contact/contact-faq.tsx`, `components/services/apps/app-cta.tsx`, `components/services/ecommerce/ecommerce-process.tsx`. The `en` FAQ arrays simply omit those entries; the RO arrays are untouched.
- Guard: a unit test greps the rendered EN routes for `€`, `EUR`, `lei`, `RON` and fails on any hit, so a future edit cannot leak a price back in.
- Language switcher component (header, desktop + mobile): uses `usePathname()` + `Link` with `locale` prop to swap locales on dual-locale routes; on RO-only routes the EN link targets `/` (EN homepage). Labels: "RO" / "EN".

### Contact API

`components/contact/contact-form.tsx` posts `locale`; `app/api/contact/route.ts` picks subject lines, email templates (admin notification + auto-reply) and error strings per locale. EN strings are RO duplicates in this phase; the wiring is what ships.

## Migration safety

1. Work on a branch/worktree; nothing merges to `main` until the checks below pass. `/en` stays unpublished (decision 13) even after merge.
2. Before moving anything, snapshot the current URL set: `app/sitemap.ts` output + `next build` route list → committed as `scripts/routes-snapshot.txt`.
3. After migration, a script fetches every snapshotted RO URL on a preview deploy and asserts: HTTP 200, unchanged `<link rel="canonical">`, `<html lang="ro">`, and no `/ro` prefix anywhere.
4. `next build` output: every route static; no unexpected `ƒ`.
5. Manual smoke: the 8 EN routes + a sample of EN case studies render; switcher round-trips both ways on dual-locale pages and falls back to `/en` on RO-only pages; `/en/termeni-si-conditii` 308s to RO; `/en/does-not-exist` 404s with the localized 404 page; consent banner, GA/Meta loaders, AskBot mount on both trees.
6. hreflang wiring is exercised in unit tests only (flag on), since it is off in production for this phase.

## Testing

- Add Vitest (`vitest`, `@vitejs/plugin-react` if components are tested). Unit tests for: `generatePageMetadata` (canonical per locale, OG locale, `alternates.languages` shape when flag on/off, `noindex` on EN), `getProjects()` ordering for both locales, `roOnly()` guard, switcher path mapping, `pathnames` round-trip (`/despre-noi` ↔ `/en/about`), and the EN price-leak check (rendered EN routes contain no `€`/`EUR`/`lei`/`RON`).
- The route-snapshot fetch script from Migration safety is a repeatable `scripts/` check, not a one-off.

## Out of scope / deferred

- Writing English copy (all pages, portfolio, emails, consent banner).
- Publishing `/en`: turning off `noindex`, enabling hreflang, adding EN URLs to the sitemap.
- Localizing RO-only routes (blog-type pages, legal pages, city pages, price estimator).
- AskBot widget language (external script; check vendor config when EN goes live).
- Pre-existing inconsistency: `despre-noi` Organization schema `foundingDate: "2021"` vs. page copy — unrelated cleanup.
