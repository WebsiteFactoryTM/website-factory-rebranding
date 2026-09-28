# English Locale (`/en`) via next-intl — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Move the whole site under next-intl locale routing so Romanian keeps every current URL unchanged and an unpublished `/en/...` tree exists for the homepage, about, contact, services (+3 sub-pages) and portfolio (+9 case studies), showing Romanian text as placeholder until English copy is written.

**Architecture:** next-intl with `localePrefix: 'as-needed'` (RO unprefixed, `/en` prefixed), localized English slugs via `pathnames`, no locale detection, no automatic hreflang. Every route file moves into `app/[locale]/`; RO-only routes redirect `/en/...` to their RO URL. Short UI strings live in `messages/{ro,en}.json`; long-form copy lives in `{ ro, en }` objects next to the component; portfolio data gets optional `en` fields with RO fallback and an `enOrder` sort key. `/en` ships `noindex`, out of the sitemap, without hreflang.

**Tech Stack:** Next.js 16.0.10 (App Router), React 19, TypeScript, next-intl 4.x, Vitest (new), npm.

**Spec:** `docs/superpowers/specs/2026-09-28-english-locale-next-intl-design.md`

## Global Constraints

- RO URLs must remain byte-identical: no `/ro` prefix, unchanged canonical, `<html lang="ro">`. Verified by `scripts/check-routes.mjs` against `scripts/routes-snapshot.txt`.
- `localePrefix: 'as-needed'`, `localeDetection: false`, `alternateLinks: false` in `i18n/routing.ts`.
- `/en/*` pages: `robots: { index: false, follow: true }`, not in `app/sitemap.ts`, no `alternates.languages` (the `hreflang` flag in `generatePageMetadata` stays `false` everywhere in this phase).
- No pricing on EN pages: no `€`, `EUR`, `lei`, `RON` in any rendered `/en` route (`scripts/check-en.mjs`); price badges, ROI/revenue calculators, the `ecommerce-blob` figure, "Estimează preț"/"Calculează preț" CTAs and every `/pret-website` link render only when `locale === 'ro'`; price-bearing FAQ items are filtered out of the `en` arrays with `withoutPrices()`.
- All EN text in this phase equals the RO text: `messages/en.json` is a byte copy of `messages/ro.json`; copy objects use `{ ro: roCopy, en: roCopy }`; portfolio `en` fields are omitted (RO fallback). Replacing any of these later is a values-only edit.
- Static rendering: **deviation from spec decision 7** — `next/root-params` requires Next ≥ 16.3; the project is on 16.0.10, so use `setRequestLocale(locale)` as the first statement of `app/[locale]/layout.tsx` and every page under `app/[locale]/`. Every route in `next build` output must stay `○` (Static) or `●` (SSG); any `ƒ` is a failure.
- `generateStaticParams` is defined per page, never on the layout: dual-locale pages return both locales; RO-only pages return only `ro` and call `roOnly(locale, '<ro path>')` first.
- **Deviation from spec (file structure):** there is no pass-through `app/layout.tsx`; `app/[locale]/layout.tsx` is the root layout (the official next-intl App Router layout). `app/not-found.tsx` therefore moves to `app/[locale]/not-found.tsx` and unknown paths reach it through `app/[locale]/[...rest]/page.tsx`.
- **Deviation from spec (portfolio data):** `en` blocks are optional with RO fallback instead of duplicated RO text in every project. Output is identical; adding English copy later means adding the `en` block, not editing one.
- Internal links in shared components and in-scope pages use `Link`/`useRouter` from `@/i18n/navigation` with the **internal RO pathname**; links to RO-only routes pass `locale="ro"`; no `window.location.href` navigations remain in in-scope components.
- Case-study links use `{ pathname: '/portofoliu/[slug]', params: { slug } }`.
- hreflang value is `en` (never `en-GB`); OpenGraph locale `en_GB`; `x-default` → RO.
- File moves use `git mv`. Commit messages have no `Co-Authored-By` trailer (user's global rule).
- Do not touch RO-only page copy, `components/cities/*`, `components/price-estimator/*`, `app/api/price-estimate/*`.

## Review Focus

1. `/en/termeni-si-conditii` (any RO-only route under `/en`) must 308 to `/termeni-si-conditii`, never render Romanian under an `/en` URL — pinned in Task 3 (`roOnly` test) and Task 12 (`check-en.mjs`).
2. `/` requested with a `NEXT_LOCALE=en` cookie must still serve Romanian (no cookie redirect) — pinned in Task 12 (`check-en.mjs`).
3. An EN page's canonical must be its own `/en/...` URL, never the RO URL, and must carry `noindex` — pinned in Task 5 (`seo.test.ts`) and Task 12.
4. Links from EN pages to RO-only routes (privacy/terms in the contact form, cookie policy in the consent banner, city pages in the footer) must produce `/politici-de-confidentialitate`, never `/en/politici-de-confidentialitate` — pinned in Task 12 (`check-en.mjs` asserts on `/en/contact` HTML).
5. The EN portfolio must order Fern & Flow → Daylin → Rox → Riders Route → UN:EVENT → Politehnica → Blue Phoenix → La Pinocchio → Sotherm RO → Sotherm IT → Maravo → Merpano → RD Automatim, then the rest in RO order, while RO ordering is unchanged — pinned in Task 7 (`portfolio.test.ts`).

---

## File Structure

**Create**
- `i18n/routing.ts` — `defineRouting` config, `pathnames`, `Locale` type, `DUAL_LOCALE_PATHNAMES`.
- `i18n/navigation.ts` — `Link`, `redirect`, `usePathname`, `useRouter`, `getPathname` from `createNavigation(routing)`.
- `i18n/request.ts` — `getRequestConfig` loading `messages/{locale}.json`.
- `proxy.ts` — next-intl middleware (Next 16 name).
- `global.d.ts` — next-intl `AppConfig` augmentation (typed locale + messages).
- `messages/ro.json`, `messages/en.json` — shared UI strings.
- `lib/i18n/ro-only.ts` — `roOnly()` guard, `roOnlyParams()`, `allLocaleParams()`.
- `lib/i18n/no-prices.ts` — `withoutPrices()` FAQ filter + `PRICE_PATTERN`.
- `app/[locale]/layout.tsx` (moved from `app/layout.tsx`), `app/[locale]/[...rest]/page.tsx`, `app/[locale]/not-found.tsx` (moved).
- `components/layout/language-switcher.tsx`.
- `vitest.config.ts`, `tests/*.test.ts`.
- `scripts/routes-snapshot.txt`, `scripts/check-routes.mjs`, `scripts/check-en.mjs`.

**Modify**
- `next.config.mjs`, `package.json`.
- `lib/seo.ts` — locale-aware `generatePageMetadata`.
- `lib/portfolio-data.ts` — `en?` fields, `enOrder?`, `getProjects(locale)`.
- `lib/content.ts`, `lib/image-alt-text.ts`, `lib/email-templates.tsx`, `app/api/contact/route.ts`.
- Every `app/**/page.tsx` (moved under `[locale]`; in-scope ones get `generateMetadata`).
- `components/layout/header.tsx`, `components/layout/footer.tsx`, `components/services/website/floating-cta.tsx`, `components/theme-toggle.tsx`, `components/consent/consent-banner.tsx`, `components/consent/cookie-settings-button.tsx`.
- In-scope section components under `components/home`, `components/about`, `components/contact`, `components/portfolio`, `components/services/{website,ecommerce,apps}`.

---

### Task 1: Snapshot the current RO routes and add the route checker

**Files:**
- Create: `scripts/routes-snapshot.txt`
- Create: `scripts/check-routes.mjs`

**Interfaces:**
- Produces: `node scripts/check-routes.mjs <baseUrl>` exits 0 when every snapshotted route returns 200 with `<html lang="ro"` and the expected canonical.

- [ ] **Step 1: Write the snapshot (every RO URL that exists today)**

`scripts/routes-snapshot.txt`:
```
/
/portofoliu
/despre-noi
/contact
/pret-website
/servicii
/servicii/creare-website
/servicii/magazin-online
/servicii/dezvoltare-aplicatie
/creare-site-bucuresti
/creare-site-brasov
/creare-site-cluj
/creare-site-constanta
/creare-site-iasi
/termeni-si-conditii
/politici-de-confidentialitate
/politica-cookie
/portofoliu/politehnica-timisoara
/portofoliu/un-event
/portofoliu/riders-route
/portofoliu/la-pinocchio
/portofoliu/fern-and-flow
/portofoliu/daylin-nail-supply
/portofoliu/rox-assignment-solution
/portofoliu/blue-phoenix
/portofoliu/merpano
```

- [ ] **Step 2: Write the checker**

`scripts/check-routes.mjs`:
```js
import { readFileSync } from "node:fs"

const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "")
const routes = readFileSync(new URL("./routes-snapshot.txt", import.meta.url), "utf8")
  .split("\n")
  .map((l) => l.trim())
  .filter(Boolean)

let failures = 0
for (const path of routes) {
  const res = await fetch(base + path, { redirect: "manual" })
  const html = await res.text()
  const expectedCanonical = path === "/" ? "https://websitefactory.ro" : `https://websitefactory.ro${path}`
  const problems = []
  if (res.status !== 200) problems.push(`status ${res.status}`)
  if (!html.includes('<html lang="ro"')) problems.push('missing <html lang="ro">')
  if (!html.includes(`<link rel="canonical" href="${expectedCanonical}"`)) problems.push("canonical mismatch")
  if (html.includes('href="/ro/') || html.includes("websitefactory.ro/ro/")) problems.push("/ro prefix leaked")
  if (problems.length) {
    failures++
    console.error(`FAIL ${path}: ${problems.join(", ")}`)
  } else {
    console.log(`ok   ${path}`)
  }
}
console.log(failures ? `\n${failures} route(s) failed` : "\nAll routes OK")
process.exit(failures ? 1 : 0)
```

- [ ] **Step 3: Run it against the current site to prove the baseline is green**

Run: `npm run build && (npm run start & sleep 5; node scripts/check-routes.mjs http://localhost:3000; kill %1)`
Expected: `All routes OK`, exit 0. If any route fails here, the snapshot is wrong — fix the snapshot, not the site.

- [ ] **Step 4: Commit**

```bash
git add scripts/routes-snapshot.txt scripts/check-routes.mjs
git commit -m "chore: snapshot RO routes and add pre/post-migration route checker"
```

---

### Task 2: Install next-intl + Vitest and add the routing configuration

**Files:**
- Modify: `package.json`, `next.config.mjs`
- Create: `i18n/routing.ts`, `i18n/navigation.ts`, `i18n/request.ts`, `proxy.ts`, `global.d.ts`, `messages/ro.json`, `messages/en.json`, `vitest.config.ts`, `tests/routing.test.ts`

**Interfaces:**
- Produces: `routing` (`locales: ['ro','en']`, `defaultLocale: 'ro'`, `pathnames`), `type Locale = 'ro' | 'en'`, `DUAL_LOCALE_PATHNAMES`, `RO_ONLY_PATHNAMES`, and `{ Link, redirect, usePathname, useRouter, getPathname }` from `@/i18n/navigation`.
- `getPathname({ locale, href })` returns the localized, prefixed path (`/en/about` for `{ locale: 'en', href: '/despre-noi' }`; `/despre-noi` for `ro`).

- [ ] **Step 1: Install dependencies**

Run: `npm install next-intl@^4 && npm install -D vitest@^3`
Expected: both appear in `package.json`; `package-lock.json` updated.

- [ ] **Step 2: Add the test script and Vitest config**

In `package.json` `"scripts"`, add `"test": "vitest run"`.

`vitest.config.ts`:
```ts
import path from "node:path"
import { defineConfig } from "vitest/config"

export default defineConfig({
  test: { include: ["tests/**/*.test.ts"], environment: "node" },
  resolve: { alias: { "@": path.resolve(__dirname) } },
})
```

- [ ] **Step 3: Write the failing routing test**

`tests/routing.test.ts`:
```ts
import { describe, expect, it } from "vitest"
import { routing, DUAL_LOCALE_PATHNAMES, RO_ONLY_PATHNAMES } from "@/i18n/routing"
import { getPathname } from "@/i18n/navigation"

describe("routing config", () => {
  it("keeps RO unprefixed and detection off", () => {
    expect(routing.defaultLocale).toBe("ro")
    expect(routing.localePrefix).toBe("as-needed")
    expect(routing.localeDetection).toBe(false)
    expect(routing.alternateLinks).toBe(false)
  })

  it("maps internal pathnames to localized EN slugs", () => {
    const cases: Array<[string, string]> = [
      ["/", "/en"],
      ["/despre-noi", "/en/about"],
      ["/contact", "/en/contact"],
      ["/servicii", "/en/services"],
      ["/servicii/creare-website", "/en/services/website-development"],
      ["/servicii/magazin-online", "/en/services/ecommerce"],
      ["/servicii/dezvoltare-aplicatie", "/en/services/app-development"],
      ["/portofoliu", "/en/portfolio"],
    ]
    for (const [internal, en] of cases) {
      expect(getPathname({ locale: "en", href: internal as never })).toBe(en)
      expect(getPathname({ locale: "ro", href: internal as never })).toBe(internal)
    }
    expect(
      getPathname({ locale: "en", href: { pathname: "/portofoliu/[slug]", params: { slug: "fern-and-flow" } } }),
    ).toBe("/en/portfolio/fern-and-flow")
  })

  it("classifies every pathname as dual-locale or RO-only, with no overlap", () => {
    const all = Object.keys(routing.pathnames).sort()
    const classified = [...DUAL_LOCALE_PATHNAMES, ...RO_ONLY_PATHNAMES].sort()
    expect(classified).toEqual(all)
    expect(new Set(classified).size).toBe(classified.length)
  })
})
```

- [ ] **Step 4: Run the test to verify it fails**

Run: `npm test -- tests/routing.test.ts`
Expected: FAIL — cannot resolve `@/i18n/routing`.

- [ ] **Step 5: Write the routing config**

`i18n/routing.ts`:
```ts
import { defineRouting } from "next-intl/routing"

export const routing = defineRouting({
  locales: ["ro", "en"],
  defaultLocale: "ro",
  localePrefix: "as-needed",
  localeDetection: false,
  alternateLinks: false,
  pathnames: {
    // Dual-locale routes (RO + EN)
    "/": "/",
    "/despre-noi": { ro: "/despre-noi", en: "/about" },
    "/contact": "/contact",
    "/servicii": { ro: "/servicii", en: "/services" },
    "/servicii/creare-website": { ro: "/servicii/creare-website", en: "/services/website-development" },
    "/servicii/magazin-online": { ro: "/servicii/magazin-online", en: "/services/ecommerce" },
    "/servicii/dezvoltare-aplicatie": { ro: "/servicii/dezvoltare-aplicatie", en: "/services/app-development" },
    "/portofoliu": { ro: "/portofoliu", en: "/portfolio" },
    "/portofoliu/[slug]": { ro: "/portofoliu/[slug]", en: "/portfolio/[slug]" },
    // RO-only routes (identical in both locales; /en/... redirects to RO via roOnly())
    "/pret-website": "/pret-website",
    "/creare-site-bucuresti": "/creare-site-bucuresti",
    "/creare-site-brasov": "/creare-site-brasov",
    "/creare-site-cluj": "/creare-site-cluj",
    "/creare-site-constanta": "/creare-site-constanta",
    "/creare-site-iasi": "/creare-site-iasi",
    "/termeni-si-conditii": "/termeni-si-conditii",
    "/politici-de-confidentialitate": "/politici-de-confidentialitate",
    "/politica-cookie": "/politica-cookie",
  },
})

export type Locale = (typeof routing.locales)[number]
export type Pathname = keyof typeof routing.pathnames

export const DUAL_LOCALE_PATHNAMES: Pathname[] = [
  "/",
  "/despre-noi",
  "/contact",
  "/servicii",
  "/servicii/creare-website",
  "/servicii/magazin-online",
  "/servicii/dezvoltare-aplicatie",
  "/portofoliu",
  "/portofoliu/[slug]",
]

export const RO_ONLY_PATHNAMES: Pathname[] = [
  "/pret-website",
  "/creare-site-bucuresti",
  "/creare-site-brasov",
  "/creare-site-cluj",
  "/creare-site-constanta",
  "/creare-site-iasi",
  "/termeni-si-conditii",
  "/politici-de-confidentialitate",
  "/politica-cookie",
]
```

`i18n/navigation.ts`:
```ts
import { createNavigation } from "next-intl/navigation"
import { routing } from "./routing"

export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation(routing)
```

`i18n/request.ts`:
```ts
import { hasLocale } from "next-intl"
import { getRequestConfig } from "next-intl/server"
import { routing } from "./routing"

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale
  const locale = hasLocale(routing.locales, requested) ? requested : routing.defaultLocale
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  }
})
```

`proxy.ts` (project root, next to `next.config.mjs`):
```ts
import createMiddleware from "next-intl/middleware"
import { routing } from "./i18n/routing"

export default createMiddleware(routing)

export const config = {
  // Skip API routes, Next internals, Vercel internals and any file with an extension (sitemap.xml, images…)
  matcher: "/((?!api|_next|_vercel|.*\\..*).*)",
}
```

`global.d.ts` (project root):
```ts
import type { routing } from "@/i18n/routing"
import type messages from "./messages/ro.json"

declare module "next-intl" {
  interface AppConfig {
    Locale: (typeof routing.locales)[number]
    Messages: typeof messages
  }
}
```

`messages/ro.json` (skeleton; Task 6 fills it):
```json
{
  "common": {
    "skipToContent": "Salt la conținut",
    "home": "Acasă"
  }
}
```

Run: `cp messages/ro.json messages/en.json`

- [ ] **Step 6: Wrap next.config with the next-intl plugin**

In `next.config.mjs`, add at the top:
```js
import createNextIntlPlugin from "next-intl/plugin"
const withNextIntl = createNextIntlPlugin("./i18n/request.ts")
```
and change the last line from `export default nextConfig` to `export default withNextIntl(nextConfig)`.

- [ ] **Step 7: Run the test to verify it passes**

Run: `npm test -- tests/routing.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 8: Confirm the site still builds before the move**

Run: `npm run build`
Expected: build succeeds (the `[locale]` folder does not exist yet; the proxy rewrites `/` → `/ro` internally, which 404s at runtime — that is expected until Task 4 and is why nothing is deployed between tasks).

- [ ] **Step 9: Commit**

```bash
git add package.json package-lock.json next.config.mjs vitest.config.ts i18n proxy.ts global.d.ts messages tests/routing.test.ts
git commit -m "feat(i18n): add next-intl routing config, proxy and Vitest"
```

---

### Task 3: RO-only guard and static-params helpers

**Files:**
- Create: `lib/i18n/ro-only.ts`, `tests/ro-only.test.ts`

**Interfaces:**
- Produces: `roOnly(locale: string, roPath: string): void` (calls `permanentRedirect(roPath)` when `locale !== 'ro'`), `roOnlyParams(): { locale: 'ro' }[]`, `allLocaleParams(): { locale: Locale }[]`.

- [ ] **Step 1: Write the failing test**

`tests/ro-only.test.ts`:
```ts
import { beforeEach, describe, expect, it, vi } from "vitest"

const permanentRedirect = vi.fn((path: string) => {
  throw new Error(`NEXT_REDIRECT:${path}`)
})
vi.mock("next/navigation", () => ({ permanentRedirect }))

const { roOnly, roOnlyParams, allLocaleParams } = await import("@/lib/i18n/ro-only")

describe("roOnly", () => {
  beforeEach(() => permanentRedirect.mockClear())

  it("does nothing for ro", () => {
    expect(() => roOnly("ro", "/termeni-si-conditii")).not.toThrow()
    expect(permanentRedirect).not.toHaveBeenCalled()
  })

  it("permanently redirects en to the RO path", () => {
    expect(() => roOnly("en", "/termeni-si-conditii")).toThrow("NEXT_REDIRECT:/termeni-si-conditii")
    expect(permanentRedirect).toHaveBeenCalledWith("/termeni-si-conditii")
  })

  it("exposes static params helpers", () => {
    expect(roOnlyParams()).toEqual([{ locale: "ro" }])
    expect(allLocaleParams()).toEqual([{ locale: "ro" }, { locale: "en" }])
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- tests/ro-only.test.ts`
Expected: FAIL — cannot resolve `@/lib/i18n/ro-only`.

- [ ] **Step 3: Implement**

`lib/i18n/ro-only.ts`:
```ts
import { permanentRedirect } from "next/navigation"
import { routing, type Locale } from "@/i18n/routing"

// RO-only routes: a request for /en/<path> is sent to the RO URL instead of rendering RO text under /en.
export function roOnly(locale: string, roPath: string): void {
  if (locale !== "ro") permanentRedirect(roPath)
}

export function roOnlyParams(): { locale: "ro" }[] {
  return [{ locale: "ro" }]
}

export function allLocaleParams(): { locale: Locale }[] {
  return routing.locales.map((locale) => ({ locale }))
}
```

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- tests/ro-only.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Commit**

```bash
git add lib/i18n/ro-only.ts tests/ro-only.test.ts
git commit -m "feat(i18n): add roOnly redirect guard and static params helpers"
```

---

### Task 4: Move every route under `app/[locale]` and wire the locale layout

**Files:**
- Move (git mv): `app/layout.tsx` → `app/[locale]/layout.tsx`; `app/not-found.tsx` → `app/[locale]/not-found.tsx`; `app/page.tsx` → `app/[locale]/page.tsx`; every other `app/<route>/` folder except `app/api` → `app/[locale]/<route>/`.
- Stay: `app/api/**`, `app/globals.css`, `app/robots.ts`, `app/sitemap.ts`.
- Create: `app/[locale]/[...rest]/page.tsx`
- Modify: every moved `page.tsx` (add `setRequestLocale` + `generateStaticParams` [+ `roOnly`]).

**Interfaces:**
- Consumes: `roOnly`, `roOnlyParams`, `allLocaleParams` (Task 3); `routing` (Task 2).
- Produces: every page component has signature `async function Page({ params }: { params: Promise<{ locale: string }> })` (slug page: `{ locale: string; slug: string }`), and calls `setRequestLocale(locale)` before rendering.

- [ ] **Step 1: Move the files**

```bash
mkdir -p app/\[locale\]
git mv app/layout.tsx app/\[locale\]/layout.tsx
git mv app/not-found.tsx app/\[locale\]/not-found.tsx
git mv app/page.tsx app/\[locale\]/page.tsx
for d in contact creare-site-brasov creare-site-bucuresti creare-site-cluj creare-site-constanta creare-site-iasi despre-noi politica-cookie politici-de-confidentialitate portofoliu pret-website servicii termeni-si-conditii; do
  git mv "app/$d" "app/[locale]/$d"
done
git status --short | head -40
```
Expected: only renames (`R`) plus nothing left under `app/` except `api/`, `globals.css`, `robots.ts`, `sitemap.ts`, `[locale]/`.

- [ ] **Step 2: Rewrite the locale layout**

Replace the top of `app/[locale]/layout.tsx` so it reads (keep the existing font declarations, `viewport`, `ConsentDefaultScript`, providers, loaders, `FloatingCTA`, AskBot `<Script>` exactly as they are; only the pieces shown change):

```tsx
import type React from "react"
import type { Metadata, Viewport } from "next"
import Script from "next/script"
import { Inter, Manrope } from "next/font/google"
import { notFound } from "next/navigation"
import { hasLocale, NextIntlClientProvider } from "next-intl"
import { getTranslations, setRequestLocale } from "next-intl/server"
import { routing } from "@/i18n/routing"
// ...existing component imports unchanged...
import "../globals.css"

// (font consts unchanged)

const SITE_TITLE = "Creare Site Timișoara - Web Design Timișoara"
const SITE_DESCRIPTION =
  "Servicii profesionale de web design, magazin online si optimizare SEO, vizibilitate locală și națională - De la idee la soluție digitală"

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params
  const isEn = locale === "en"
  return {
    metadataBase: new URL("https://websitefactory.ro"),
    title: { default: SITE_TITLE, template: "%s - Website Factory" },
    description: SITE_DESCRIPTION,
    keywords: [
      "creare site Timișoara",
      "web design Timișoara",
      "dezvoltare site web",
      "site-uri profesionale",
      "magazin online",
      "aplicații mobile",
      "Firmă web design Timișoara",
    ],
    authors: [{ name: "Website Factory" }],
    creator: "Website Factory",
    publisher: "Website Factory",
    robots: isEn
      ? { index: false, follow: true }
      : {
          index: true,
          follow: true,
          googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 },
        },
    openGraph: {
      type: "website",
      locale: isEn ? "en_GB" : "ro_RO",
      url: isEn ? "https://websitefactory.ro/en" : "https://websitefactory.ro",
      siteName: "Website Factory",
      title: `${SITE_TITLE} - Website Factory`,
      description: SITE_DESCRIPTION,
      images: [{ url: "/website-factory-og-square.webp", width: 1080, height: 1080, alt: "Website Factory - Web Design Timișoara", type: "image/webp" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${SITE_TITLE} - Website Factory`,
      description: SITE_DESCRIPTION,
      images: ["/website-factory-og-square.webp"],
    },
    alternates: { canonical: isEn ? "https://websitefactory.ro/en" : "https://websitefactory.ro" },
    icons: {
      icon: [
        { url: "/website-factory-favicon.webp", type: "image/webp" },
        { url: "/website-factory-favicon.ico", sizes: "any" },
      ],
      apple: [{ url: "/website-factory-favicon.webp", type: "image/webp" }],
      shortcut: "/website-factory-favicon.webp",
    },
  }
}

// (viewport export unchanged)

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) notFound()
  setRequestLocale(locale)
  const t = await getTranslations("common")

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${inter.variable} ${manrope.variable} font-sans antialiased`}>
        <ConsentDefaultScript />
        <NextIntlClientProvider>
          <ConsentProvider>
            <ThemeProvider>
              <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-brand focus:text-brand-foreground focus:rounded-md">
                {t("skipToContent")}
              </a>
              <Header />
              <main id="main-content">{children}</main>
              <Footer />
            </ThemeProvider>
            <ConsentBanner />
            <GaLoader />
            <MetaPixelLoader />
            <VercelAnalyticsLoader />
            <PageViewTracker />
            <FloatingCTA />
          </ConsentProvider>
        </NextIntlClientProvider>
        {/* AskBot <Script> unchanged */}
      </body>
    </html>
  )
}
```

Remove the old `export const metadata` object (its values are now inside `generateMetadata`). Delete the now-empty `app/layout.tsx` if git left one behind (there should be none).

- [ ] **Step 3: Add the catch-all**

`app/[locale]/[...rest]/page.tsx`:
```tsx
import { notFound } from "next/navigation"

export default function CatchAllPage() {
  notFound()
}
```

- [ ] **Step 4: Wire each dual-locale page**

For each of `app/[locale]/page.tsx`, `app/[locale]/contact/page.tsx`, `app/[locale]/despre-noi/page.tsx`, `app/[locale]/servicii/page.tsx`, `app/[locale]/servicii/creare-website/page.tsx`, `app/[locale]/servicii/magazin-online/page.tsx`, `app/[locale]/servicii/dezvoltare-aplicatie/page.tsx`, `app/[locale]/portofoliu/page.tsx` apply exactly:

1. Add imports:
```ts
import { setRequestLocale } from "next-intl/server"
import { allLocaleParams } from "@/lib/i18n/ro-only"
```
2. Add above the default export:
```ts
export function generateStaticParams() {
  return allLocaleParams()
}
```
3. Change the component signature and first line, e.g. for the homepage:
```tsx
export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale)
  // ...existing body unchanged...
```
(Keep the existing `export const metadata` for now; Tasks 8–11 convert them.)

For `app/[locale]/portofoliu/[slug]/page.tsx`:
```ts
import { setRequestLocale } from "next-intl/server"
import { routing } from "@/i18n/routing"

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

export async function generateStaticParams() {
  return routing.locales.flatMap((locale) => featuredProjects.map((project) => ({ locale, slug: project.slug })))
}
```
and in both `generateMetadata` and the page component destructure `const { locale, slug } = await params`; call `setRequestLocale(locale)` as the first line of the page component.

- [ ] **Step 5: Wire each RO-only page**

For each of `pret-website`, `creare-site-bucuresti`, `creare-site-brasov`, `creare-site-cluj`, `creare-site-constanta`, `creare-site-iasi`, `termeni-si-conditii`, `politici-de-confidentialitate`, `politica-cookie` (`app/[locale]/<route>/page.tsx`) apply exactly:

```ts
import { setRequestLocale } from "next-intl/server"
import { roOnly, roOnlyParams } from "@/lib/i18n/ro-only"

export const generateStaticParams = roOnlyParams

export default async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  roOnly(locale, "/<route>")   // e.g. "/pret-website"
  setRequestLocale(locale)
  // ...existing body unchanged...
```
Keep each page's existing component name and `export const metadata`.

- [ ] **Step 6: Localize the moved 404 page**

In `app/[locale]/not-found.tsx`: replace `import Link from "next/link"` with `import { Link } from "@/i18n/navigation"`; add `import { useTranslations } from "next-intl"` and make it a client component only if needed — it is a server component today, so use `import { getTranslations } from "next-intl/server"` and `const t = await getTranslations("notFound")` in an `async function NotFound()`. Replace the visible strings with `t("title")`, `t("titleHighlight")`, `t("p1")`, `t("p2")`, `t("backHome")`, `t("buildNew")`, `t("orExplore")`, `t("services")`, `t("portfolio")`, `t("about")`, `t("contact")`. Add these keys to `messages/ro.json` (and copy to `en.json`):

```json
"notFound": {
  "title": "Pagina pe care o cauți",
  "titleHighlight": "nu există",
  "p1": "Uneori, chiar și cei mai buni designeri trebuie să înceapă de la zero. Această pagină a fost mutată, ștearsă sau pur și simplu nu a fost construită încă.",
  "p2": "Dar nu te preocupa — putem construi orice pagină ai nevoie! 🚀",
  "backHome": "Înapoi acasă",
  "buildNew": "Construiește o pagină nouă",
  "orExplore": "Sau explorează:",
  "services": "Servicii",
  "portfolio": "Portofoliu",
  "about": "Despre Noi",
  "contact": "Contact"
}
```
Keep its `metadata` export as-is (RO, `noindex`).

- [ ] **Step 7: Build and check static rendering**

Run: `npm run build 2>&1 | tee /tmp/build.log; grep -E "^\s*(ƒ|○|●)" /tmp/build.log`
Expected: build succeeds; every listed route is `○` or `●`; zero `ƒ` lines. Both `/ro/...` and `/en/...` variants are listed for dual-locale routes; only `ro` for RO-only routes.

- [ ] **Step 8: Prove RO is byte-identical and `/en` redirects**

Run: `(npm run start & sleep 5; node scripts/check-routes.mjs http://localhost:3000; curl -sI http://localhost:3000/en/termeni-si-conditii | head -3; curl -s -o /dev/null -w "%{http_code}\n" http://localhost:3000/en/nu-exista; kill %1)`
Expected: `All routes OK`; the `/en/termeni-si-conditii` response is `308` with `location: /termeni-si-conditii`; `/en/nu-exista` is `404`.

- [ ] **Step 9: Commit**

```bash
git add -A app messages
git commit -m "refactor(routing): move all routes under app/[locale] with static params and RO-only guard"
```

---

### Task 5: Locale-aware `generatePageMetadata`

**Files:**
- Modify: `lib/seo.ts:23-70`
- Create: `tests/seo.test.ts`

**Interfaces:**
- Consumes: `getPathname` (Task 2).
- Produces:
```ts
generatePageMetadata({
  title, description, keywords?, image?,
  locale?: Locale            // default "ro"
  path?: string              // legacy: unprefixed RO path (RO-only pages keep using this)
  href?: PageHref            // dual-locale pages: internal pathname (+ params)
  hreflang?: boolean         // default false — stays false in this phase
}): Metadata
type PageHref = Pathname | { pathname: "/portofoliu/[slug]"; params: { slug: string } }
```

- [ ] **Step 1: Write the failing test**

`tests/seo.test.ts`:
```ts
import { describe, expect, it } from "vitest"
import { generatePageMetadata } from "@/lib/seo"

const base = { title: "Despre Noi", description: "d" }

describe("generatePageMetadata", () => {
  it("keeps legacy RO behaviour for path", () => {
    const m = generatePageMetadata({ ...base, path: "/termeni-si-conditii" })
    expect(m.alternates?.canonical).toBe("https://websitefactory.ro/termeni-si-conditii")
    expect((m.openGraph as { locale?: string }).locale).toBe("ro_RO")
    expect(m.alternates?.languages).toBeUndefined()
    expect(m.robots).toBeUndefined()
  })

  it("canonicalizes EN pages to their own localized URL and marks them noindex", () => {
    const m = generatePageMetadata({ ...base, locale: "en", href: "/despre-noi" })
    expect(m.alternates?.canonical).toBe("https://websitefactory.ro/en/about")
    expect((m.openGraph as { locale?: string; url?: string }).locale).toBe("en_GB")
    expect((m.openGraph as { url?: string }).url).toBe("https://websitefactory.ro/en/about")
    expect(m.robots).toEqual({ index: false, follow: true })
    expect(m.alternates?.languages).toBeUndefined()
  })

  it("canonicalizes RO dual-locale pages to the unprefixed URL", () => {
    const m = generatePageMetadata({ ...base, locale: "ro", href: "/despre-noi" })
    expect(m.alternates?.canonical).toBe("https://websitefactory.ro/despre-noi")
    expect(m.robots).toBeUndefined()
  })

  it("handles the homepage and slug routes", () => {
    expect(generatePageMetadata({ ...base, locale: "ro", href: "/" }).alternates?.canonical).toBe("https://websitefactory.ro")
    expect(generatePageMetadata({ ...base, locale: "en", href: "/" }).alternates?.canonical).toBe("https://websitefactory.ro/en")
    const slug = generatePageMetadata({
      ...base,
      locale: "en",
      href: { pathname: "/portofoliu/[slug]", params: { slug: "fern-and-flow" } },
    })
    expect(slug.alternates?.canonical).toBe("https://websitefactory.ro/en/portfolio/fern-and-flow")
  })

  it("emits mutual hreflang with x-default → RO only when asked", () => {
    const m = generatePageMetadata({ ...base, locale: "en", href: "/despre-noi", hreflang: true })
    expect(m.alternates?.languages).toEqual({
      ro: "https://websitefactory.ro/despre-noi",
      en: "https://websitefactory.ro/en/about",
      "x-default": "https://websitefactory.ro/despre-noi",
    })
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- tests/seo.test.ts`
Expected: FAIL — `locale`/`href` are not accepted; canonical for EN is wrong.

- [ ] **Step 3: Implement**

Replace `generatePageMetadata` in `lib/seo.ts` with:
```ts
import { getPathname } from "@/i18n/navigation"
import type { Locale, Pathname } from "@/i18n/routing"

export type PageHref = Pathname | { pathname: "/portofoliu/[slug]"; params: { slug: string } }

function absoluteUrl(locale: Locale, href: PageHref): string {
  const localized = getPathname({ locale, href: href as never })
  return localized === "/" ? siteConfig.url : `${siteConfig.url}${localized}`
}

export function generatePageMetadata({
  title,
  description,
  path = "",
  href,
  locale = "ro",
  hreflang = false,
  keywords = [],
  image = "/website-factory-og.webp",
}: {
  title: string
  description: string
  path?: string
  href?: PageHref
  locale?: Locale
  hreflang?: boolean
  keywords?: string[]
  image?: string
}): Metadata {
  const url = href ? absoluteUrl(locale, href) : `${siteConfig.url}${path}`
  const isEn = locale === "en"

  return {
    title,
    description,
    keywords: [...keywords, "web design", "creare site", "Website Factory", "dezvoltare website", "creare magazin online"],
    ...(isEn && { robots: { index: false, follow: true } }),
    alternates: {
      canonical: url,
      ...(hreflang &&
        href && {
          languages: {
            ro: absoluteUrl("ro", href),
            en: absoluteUrl("en", href),
            "x-default": absoluteUrl("ro", href),
          },
        }),
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      locale: isEn ? "en_GB" : siteConfig.locale,
      type: "website",
      images: [{ url: image, width: 1200, height: 630, alt: title, type: "image/webp" }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  }
}
```
Leave every other export in `lib/seo.ts` untouched.

- [ ] **Step 4: Run the tests to verify they pass**

Run: `npm test`
Expected: PASS (routing, ro-only, seo).

- [ ] **Step 5: Commit**

```bash
git add lib/seo.ts tests/seo.test.ts
git commit -m "feat(seo): locale-aware page metadata with localized canonical, noindex for EN and gated hreflang"
```

---

### Task 6: Shared UI strings — header, switcher, footer, floating CTA, theme toggle, consent

**Files:**
- Modify: `messages/ro.json`, `messages/en.json`, `components/layout/header.tsx`, `components/layout/footer.tsx`, `components/services/website/floating-cta.tsx`, `components/theme-toggle.tsx:13`, `components/consent/consent-banner.tsx`, `components/consent/cookie-settings-button.tsx`
- Create: `components/layout/language-switcher.tsx`, `tests/messages.test.ts`

**Interfaces:**
- Consumes: `Link`, `useRouter`, `usePathname` (Task 2); `DUAL_LOCALE_PATHNAMES`.
- Produces: message namespaces `common`, `nav`, `switcher`, `footer`, `floatingCta`, `consent`, `notFound`, `breadcrumb`, `contactForm` (contact keys filled in Task 10); `<LanguageSwitcher />`.

- [ ] **Step 1: Write the failing messages test**

`tests/messages.test.ts`:
```ts
import { describe, expect, it } from "vitest"
import ro from "@/messages/ro.json"
import en from "@/messages/en.json"

function keys(obj: Record<string, unknown>, prefix = ""): string[] {
  return Object.entries(obj).flatMap(([k, v]) =>
    v && typeof v === "object" ? keys(v as Record<string, unknown>, `${prefix}${k}.`) : [`${prefix}${k}`],
  )
}

describe("messages", () => {
  it("en has exactly the same keys as ro", () => {
    expect(keys(en).sort()).toEqual(keys(ro).sort())
  })
  it("en is a verbatim copy of ro in this phase", () => {
    expect(en).toEqual(ro)
  })
  it("contains the namespaces the layout and shared components use", () => {
    for (const ns of ["common", "nav", "switcher", "footer", "floatingCta", "consent", "notFound", "breadcrumb"]) {
      expect(ro).toHaveProperty(ns)
    }
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- tests/messages.test.ts`
Expected: FAIL — missing namespaces.

- [ ] **Step 3: Fill `messages/ro.json`**

Merge these namespaces into `messages/ro.json` (keep `common.skipToContent`, `common.home` and the `notFound` block from Task 4):
```json
{
  "common": {
    "skipToContent": "Salt la conținut",
    "home": "Acasă",
    "requestQuote": "Solicită ofertă gratuită",
    "viewPortfolio": "Vezi portofoliul",
    "close": "Închide"
  },
  "nav": {
    "services": "Servicii",
    "createWebsite": "Creare Website",
    "onlineStore": "Magazin Online",
    "appDevelopment": "Dezvoltare Aplicație",
    "portfolio": "Portofoliu",
    "about": "Despre noi",
    "contact": "Contact",
    "chatbot": "Chatbot AI",
    "chatbotAria": "Chatbot AI (se deschide într-o filă nouă)",
    "priceEstimate": "Estimează preț",
    "openMenu": "Deschide meniul",
    "closeMenu": "Închide meniul",
    "logoAlt": "Website Factory - Logo - Creare site și web design Timișoara",
    "toggleTheme": "Schimbă tema"
  },
  "switcher": {
    "label": "Schimbă limba",
    "ro": "RO",
    "en": "EN"
  },
  "footer": {
    "tagline": "Web design profesional în Timișoara. Creăm site-uri SEO-first, optimizate pentru performanță și conversii maxime.",
    "location": "Timișoara, România",
    "servicesHeading": "Servicii",
    "allServices": "Toate serviciile",
    "createWebsite": "Creare website",
    "onlineStore": "Magazin online",
    "appDevelopment": "Dezvoltare aplicație",
    "companyHeading": "Companie",
    "about": "Despre noi",
    "portfolio": "Portofoliu",
    "contact": "Contact",
    "locationsHeading": "Locații",
    "legalHeading": "Legal",
    "terms": "Termeni și condiții",
    "privacy": "Politică de confidențialitate",
    "cookies": "Politică cookie",
    "manageCookies": "Gestionare cookie-uri",
    "rights": "Toate drepturile rezervate.",
    "madeWith": "Creat cu",
    "inCity": "în Timișoara"
  },
  "floatingCta": {
    "title": "Hai să vorbim!",
    "text": "Ai întrebări despre website-ul tău? Suntem aici să te ajutăm.",
    "callNow": "Sună acum",
    "whatsapp": "WhatsApp",
    "contactForm": "Formular contact",
    "open": "Hai să povestim!"
  },
  "consent": {
    "settingsButton": "Setări cookie-uri",
    "closePreferences": "Închide preferințele",
    "enable": "Activează",
    "disable": "Dezactivează",
    "necessaryTitle": "Cookie-uri strict necesare",
    "analyticsTitle": "Cookie-uri de analiză",
    "analyticsDescription": "Ne ajută să înțelegem cum este folosit site-ul (pagini vizitate, surse de trafic) prin date agregate. Furnizori: Google Analytics 4, Vercel Analytics.",
    "marketingTitle": "Cookie-uri de marketing",
    "marketingDescription": "Măsoară eficiența campaniilor și permit remarketing pe alte platforme. Furnizor: Meta Pixel (Facebook)."
  },
  "breadcrumb": {
    "home": "Acasă",
    "contact": "Contact",
    "about": "Despre Noi",
    "services": "Servicii",
    "portfolio": "Portofoliu"
  }
}
```
Then, in `components/consent/consent-banner.tsx`, find every remaining user-visible string literal (banner title/body, "Accept"/"Reject"/"Preferences"/"Save" buttons, category headings, links) and add each as a key under `consent` in `ro.json` — one key per string, camelCase, e.g. `"acceptAll"`, `"rejectAll"`, `"openPreferences"`, `"savePreferences"`, `"bannerTitle"`, `"bannerText"`, `"cookiePolicyLink"`. Finish with `cp messages/ro.json messages/en.json`.

- [ ] **Step 4: Create the language switcher**

`components/layout/language-switcher.tsx`:
```tsx
"use client"

import { useLocale, useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { Link, usePathname } from "@/i18n/navigation"
import { DUAL_LOCALE_PATHNAMES, type Locale, type Pathname } from "@/i18n/routing"
import { cn } from "@/lib/utils"

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale()
  const t = useTranslations("switcher")
  const pathname = usePathname() as Pathname
  const params = useParams()
  const target: Locale = locale === "ro" ? "en" : "ro"

  // RO-only routes have no EN twin: send the visitor to the EN homepage instead.
  const hasTwin = target === "ro" || DUAL_LOCALE_PATHNAMES.includes(pathname)
  const href = hasTwin ? { pathname, params: params as Record<string, string> } : { pathname: "/" as const }

  return (
    <Link
      // @ts-expect-error -- params are only valid for the current dynamic route; next-intl validates at runtime
      href={href}
      locale={target}
      aria-label={t("label")}
      className={cn(
        "inline-flex items-center rounded-full border border-border px-3 py-1.5 text-xs font-semibold tracking-wider text-foreground/70 hover:text-foreground hover:border-brand/50 transition-colors",
        className,
      )}
    >
      {t(target)}
    </Link>
  )
}
```

- [ ] **Step 5: Update the header**

In `components/layout/header.tsx`:
1. Replace `import Link from "next/link"` with `import { Link, useRouter } from "@/i18n/navigation"`; add `import { useLocale, useTranslations } from "next-intl"` and `import { LanguageSwitcher } from "@/components/layout/language-switcher"`.
2. Delete the module-level `services` and `navLinks` arrays. Inside `Header()` add:
```tsx
const t = useTranslations("nav")
const locale = useLocale()
const router = useRouter()
const services = [
  { href: "/servicii/creare-website" as const, label: t("createWebsite") },
  { href: "/servicii/magazin-online" as const, label: t("onlineStore") },
  { href: "/servicii/dezvoltare-aplicatie" as const, label: t("appDevelopment") },
]
const navLinks = [
  { href: "/portofoliu" as const, label: t("portfolio") },
  { href: "/despre-noi" as const, label: t("about") },
  { href: "/contact" as const, label: t("contact") },
]
```
3. Replace literals: logo `alt` → `t("logoAlt")`; the two `Servicii` labels → `t("services")`; `Chatbot AI` → `t("chatbot")`; both `aria-label="Chatbot AI (se deschide într-o filă nouă)"` → `t("chatbotAria")`; menu button `aria-label` → `isMobileMenuOpen ? t("closeMenu") : t("openMenu")`; both `Estimează preț` → `t("priceEstimate")`.
4. Desktop actions (`<div className="hidden lg:flex items-center gap-4">`): insert `<LanguageSwitcher />` before `<ThemeToggle />`, and wrap the `MagneticButton` in `{locale === "ro" && ( ... )}`; change its `onClick` to `() => router.push("/pret-website")`.
5. Mobile: insert `<LanguageSwitcher />` before `<ThemeToggle />` in the `flex lg:hidden` group; wrap the mobile `Button` (the `/pret-website` link, lines ~288–306) in `{locale === "ro" && ( ... )}`.

- [ ] **Step 6: Update the footer**

In `components/layout/footer.tsx`:
1. Replace `import Link from "next/link"` with `import { Link } from "@/i18n/navigation"`; add `import { useTranslations } from "next-intl"`.
2. Delete the module-level `footerLinks`; inside `Footer()` add `const t = useTranslations("footer")` and:
```tsx
const footerLinks = {
  servicii: [
    { href: "/servicii/creare-website" as const, label: t("createWebsite") },
    { href: "/servicii/magazin-online" as const, label: t("onlineStore") },
    { href: "/servicii/dezvoltare-aplicatie" as const, label: t("appDevelopment") },
  ],
  companie: [
    { href: "/despre-noi" as const, label: t("about") },
    { href: "/portofoliu" as const, label: t("portfolio") },
    { href: "/contact" as const, label: t("contact") },
  ],
  legal: [
    { href: "/termeni-si-conditii" as const, label: t("terms") },
    { href: "/politici-de-confidentialitate" as const, label: t("privacy") },
    { href: "/politica-cookie" as const, label: t("cookies") },
  ],
  cities: [
    { href: "/" as const, label: "Timișoara", roOnly: false },
    { href: "/creare-site-bucuresti" as const, label: "București", roOnly: true },
    { href: "/creare-site-cluj" as const, label: "Cluj-Napoca", roOnly: true },
    { href: "/creare-site-brasov" as const, label: "Brașov", roOnly: true },
    { href: "/creare-site-iasi" as const, label: "Iași", roOnly: true },
    { href: "/creare-site-constanta" as const, label: "Constanța", roOnly: true },
  ],
}
```
3. In the `legal` map add `locale="ro"` to the `<Link>`; in the `cities` map add `locale={link.roOnly ? "ro" : undefined}`.
4. Replace literals: logo `alt` → `t("logoAlt")` is not in `footer` — reuse `nav.logoAlt` via `const tNav = useTranslations("nav")`; tagline → `t("tagline")`; `Timișoara, România` → `t("location")`; headings → `t("servicesHeading")`, `t("companyHeading")`, `t("locationsHeading")`, `t("legalHeading")`; `Toate serviciile` → `t("allServices")`; `Gestionare cookie-uri` → `t("manageCookies")`; `Toate drepturile rezervate.` → `t("rights")`; `Creat cu` → `t("madeWith")`; `în Timișoara` → `t("inCity")`. The reCAPTCHA notice is already English — leave it.

- [ ] **Step 7: Update floating CTA, theme toggle, consent**

`components/services/website/floating-cta.tsx`: add `import { useTranslations } from "next-intl"` and `import { Link } from "@/i18n/navigation"`; `const t = useTranslations("floatingCta")`; replace `Hai să vorbim!` → `{t("title")}`, the paragraph → `{t("text")}`, `Sună acum` → `{t("callNow")}`, `WhatsApp` → `{t("whatsapp")}`, `Formular contact` → `{t("contactForm")}`, `aria-label="Închide"` → `aria-label={tCommon("close")}` with `const tCommon = useTranslations("common")`, `Hai să povestim!` → `{t("open")}`; change `<a href="/contact" ...>` to `<Link href="/contact" ...>`.

`components/theme-toggle.tsx:13`: `aria-label="Schimbă tema"` → `aria-label={t("toggleTheme")}` with `const t = useTranslations("nav")` (add the `next-intl` import; the file is already a client component).

`components/consent/cookie-settings-button.tsx`: `Setări cookie-uri` → `{t("settingsButton")}` with `const t = useTranslations("consent")`.

`components/consent/consent-banner.tsx`: replace the `CATEGORY_COPY` titles/descriptions and every string literal you keyed in Step 3 with `t("<key>")` (`const t = useTranslations("consent")`); the `aria-label` on line ~217 becomes `` `${draft[cat] ? t("disable") : t("enable")} ${...}` ``; change the `href="/politica-cookie"` anchor to `<Link href="/politica-cookie" locale="ro">` from `@/i18n/navigation`.

- [ ] **Step 8: Run tests, typecheck and build**

Run: `npm test && npx tsc --noEmit && npm run build 2>&1 | grep -cE "^\s*ƒ"`
Expected: tests PASS; no type errors; the grep prints `0`.

- [ ] **Step 9: Smoke in the browser**

Run: `npm run dev` and open `http://localhost:3000` and `http://localhost:3000/en`.
Expected: header/footer render identically in both; the switcher shows `EN` on RO pages and `RO` on EN pages and round-trips `/despre-noi` ↔ `/en/about`; on `/termeni-si-conditii` the switcher goes to `/en`; "Estimează preț" is absent on `/en`; footer legal links on `/en` point to `/termeni-si-conditii` (no `/en` prefix).

- [ ] **Step 10: Commit**

```bash
git add messages components/layout components/services/website/floating-cta.tsx components/theme-toggle.tsx components/consent tests/messages.test.ts
git commit -m "feat(i18n): localize header, footer, floating CTA and consent strings; add language switcher"
```

---

### Task 7: Portfolio data model, EN ordering and portfolio pages

**Files:**
- Modify: `lib/portfolio-data.ts`, `lib/image-alt-text.ts`, `components/portfolio/featured-projects.tsx`, `components/portfolio/simple-projects-grid.tsx`, `components/portfolio/portfolio-hero.tsx`, `components/portfolio/portfolio-cta.tsx`, `app/[locale]/portofoliu/page.tsx`, `app/[locale]/portofoliu/[slug]/page.tsx`
- Create: `tests/portfolio.test.ts`

**Interfaces:**
- Consumes: `generatePageMetadata` (Task 5), `Link` (Task 2), `breadcrumb` messages (Task 6).
- Produces:
```ts
interface FeaturedProject { ...existing; en?: Partial<Pick<FeaturedProject, "title"|"categoryLabel"|"description"|"shortDescription"|"results"|"challenge"|"solution"|"testimonial">>; enOrder?: number }
interface SimpleProject  { ...existing; en?: Partial<Pick<SimpleProject, "categoryLabel"|"shortDescription">>; enOrder?: number }
getProjects(locale: Locale): { featured: FeaturedProject[]; simple: SimpleProject[] }   // localized + sorted
getCategoryFilters(locale: Locale): { value: string; label: string }[]
```

- [ ] **Step 1: Write the failing test**

`tests/portfolio.test.ts`:
```ts
import { describe, expect, it } from "vitest"
import { featuredProjects, simpleProjects, getProjects } from "@/lib/portfolio-data"

describe("getProjects", () => {
  it("keeps RO order unchanged", () => {
    const { featured, simple } = getProjects("ro")
    expect(featured.map((p) => p.slug)).toEqual(featuredProjects.map((p) => p.slug))
    const expectedSimple = [...simpleProjects].sort((a, b) => (a.order ?? 999) - (b.order ?? 999)).map((p) => p.id)
    expect(simple.map((p) => p.id)).toEqual(expectedSimple)
  })

  it("orders EN featured case studies by priority then RO order", () => {
    const { featured } = getProjects("en")
    expect(featured.map((p) => p.slug)).toEqual([
      "fern-and-flow",
      "daylin-nail-supply",
      "rox-assignment-solution",
      "riders-route",
      "un-event",
      "politehnica-timisoara",
      "blue-phoenix",
      "la-pinocchio",
      "merpano",
    ])
  })

  it("puts the prioritized simple projects first, then the rest in RO order", () => {
    const { simple } = getProjects("en")
    expect(simple.slice(0, 4).map((p) => p.id)).toEqual(["s63", "s67", "s20", "s24"])
    const rest = simple.slice(4).map((p) => p.id)
    const roRest = getProjects("ro").simple.map((p) => p.id).filter((id) => !["s63", "s67", "s20", "s24"].includes(id))
    expect(rest).toEqual(roRest)
  })

  it("falls back to RO text when a project has no en block", () => {
    const ro = getProjects("ro").featured.find((p) => p.slug === "merpano")!
    const en = getProjects("en").featured.find((p) => p.slug === "merpano")!
    expect(en.title).toBe(ro.title)
    expect(en.challenge).toBe(ro.challenge)
  })

  it("applies en overrides when present", () => {
    const project = { ...featuredProjects[0], en: { title: "English title" } }
    const { featured } = getProjects("en", { featured: [project], simple: [] })
    expect(featured[0].title).toBe("English title")
    expect(featured[0].description).toBe(featuredProjects[0].description)
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- tests/portfolio.test.ts`
Expected: FAIL — `getProjects` is not exported.

- [ ] **Step 3: Extend the data model and add `getProjects`**

In `lib/portfolio-data.ts`:

1. Add to `FeaturedProject`:
```ts
  en?: Partial<Pick<FeaturedProject, "title" | "categoryLabel" | "description" | "shortDescription" | "results" | "challenge" | "solution" | "testimonial">>
  enOrder?: number
```
Add to `SimpleProject`:
```ts
  en?: Partial<Pick<SimpleProject, "categoryLabel" | "shortDescription">>
  enOrder?: number
```
2. Set `enOrder` on exactly these entries: `fern-and-flow: 1`, `daylin-nail-supply: 2`, `rox-assignment-solution: 3`, `riders-route: 4`, `un-event: 5`, `politehnica-timisoara: 6`, `blue-phoenix: 7`, `la-pinocchio: 8`, `s63 (Sotherm România): 9`, `s67 (Sotherm Italia): 10`, `s20 (Maravo Clinic): 11`, `merpano: 12`, `s24 (RD Automatim): 13`. No `en` blocks are added in this phase.
3. Replace the trailing `categoryFilters` export with:
```ts
import type { Locale } from "@/i18n/routing"

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
```
(Put the `import type { Locale }` at the top of the file with the other imports.)

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- tests/portfolio.test.ts`
Expected: PASS (5 tests).

- [ ] **Step 5: Localize the alt-text helper**

In `lib/image-alt-text.ts`, add a `locale: Locale = "ro"` option to `generateProjectAltText` and `generateServiceAltText` and route the connector words through a table:
```ts
import type { Locale } from "@/i18n/routing"
const ALT_WORDS = {
  ro: { forClient: "pentru", by: "creat de Website Factory", location: "Timișoara" },
  en: { forClient: "pentru", by: "creat de Website Factory", location: "Timișoara" },
} satisfies Record<Locale, { forClient: string; by: string; location: string }>
```
and replace each hardcoded Romanian connector in the two functions with `ALT_WORDS[locale].<key>` (keep the output byte-identical for `ro`; read the rest of the file to find every connector — there are three: the `pentru ${client}` part, the location default, and the trailing "creat de …" phrase).

- [ ] **Step 6: Update the portfolio components**

`components/portfolio/featured-projects.tsx`:
1. Imports: replace `import Link from "next/link"` with `import { Link } from "@/i18n/navigation"`; replace `featuredProjects, categoryFilters` import with `getProjects, getCategoryFilters, type FeaturedProject`; add `import { useLocale } from "next-intl"`.
2. In `FeaturedProjects()`: `const locale = useLocale()`, `const { featured } = getProjects(locale)`, `const categoryFilters = getCategoryFilters(locale)`, and use `featured` where `featuredProjects` was used.
3. Add the copy object above the component and use it:
```tsx
const roCopy = {
  eyebrow: "Proiecte principale",
  title: "Studii de caz",
  titleHighlight: "detaliate",
  text: "Proiecte complexe cu rezultate măsurabile și povești complete de transformare digitală.",
  viewCaseStudy: "Vezi studiul de caz",
  visitSite: "Vizitează site-ul",
}
const copy = { ro: roCopy, en: roCopy } satisfies Record<Locale, typeof roCopy>
```
(`import type { Locale } from "@/i18n/routing"`), `const t = copy[locale]`, replace the four literals; pass `locale` into `FeaturedProjectCard` (`project: FeaturedProject; index: number; locale: Locale`) so it can call `generateProjectAltText({ ..., locale })` and use `copy[locale]` for the two button labels.
4. The case-study link becomes `<Link href={{ pathname: "/portofoliu/[slug]", params: { slug: project.slug } }}>`.

`components/portfolio/simple-projects-grid.tsx`: same pattern — `useLocale()`, `getProjects(locale).simple` (already sorted; remove the inline `.sort`), copy object with `eyebrow: "Mai multe proiecte"`, `title: "Și alte"`, `titleHighlight: "povești de succes"`, `text: "O selecție din proiectele pe care le-am livrat pentru clienți din diverse industrii."`, `viewProject: "Vezi proiect"`; pass `locale` to `SimpleProjectCard` for alt text and the label.

`components/portfolio/portfolio-hero.tsx` and `portfolio-cta.tsx`: wrap every visible string in the same `roCopy`/`copy` pattern with `useLocale()`; replace `next/link` with `@/i18n/navigation` and `window.location.href` (if present) with `useRouter().push(...)`.

- [ ] **Step 7: Update the two portfolio pages**

`app/[locale]/portofoliu/page.tsx`: replace `export const metadata` with
```ts
export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    href: "/portofoliu",
    title: "Portofoliu - Web design",
    description: "Descoperă proiectele noastre de web design, magazine online și aplicații custom. Portofoliu cu rezultate reale și studii de caz detaliate.",
    keywords: ["portofoliu web design", "proiecte website Timișoara", "studii de caz web", "exemple magazine online", "aplicații mobile România"],
  })
}
```
and in the page body use `const t = await getTranslations("breadcrumb")` for the breadcrumb names (`t("home")`, `t("portfolio")`), set the CollectionPage schema `url` to `getPathname`-based absolute URL (`` `${siteConfig.url}${getPathname({ locale, href: "/portofoliu" })}` `` — for `ro` this equals the current value) and add `inLanguage: locale`.

`app/[locale]/portofoliu/[slug]/page.tsx`:
1. `import { Link, getPathname } from "@/i18n/navigation"` (drop `next/link`), `import { getProjects } from "@/lib/portfolio-data"`, `import { getTranslations } from "next-intl/server"`.
2. `generateMetadata`: `const { locale, slug } = await params; const project = getProjects(locale).featured.find(...)`; call `generatePageMetadata({ locale, href: { pathname: "/portofoliu/[slug]", params: { slug } }, title: ..., description: ..., keywords: ... })`.
3. Page: `const { featured } = getProjects(locale)`; find `project`, `currentIndex`, `prevProject`, `nextProject` from `featured` (so EN prev/next follow `enOrder`); breadcrumb names from `getTranslations("breadcrumb")`; case-study schema `url` via `getPathname`; `inLanguage: locale`.
4. Copy object for the page's own literals: `backToPortfolio: "Înapoi la portofoliu"`, `client: "Client:"`, `visitLive: "Vizitează site-ul live"`, `challenge: "Provocarea"`, `solution: "Soluția noastră"`, `technologies: "Tehnologii folosite"`, `prevProject: "Proiect anterior"`, `nextProject: "Proiect următor"`, `ctaTitle: "Vrei un proiect similar?"`, `ctaText: "Hai să discutăm despre cum putem crea ceva extraordinar împreună."`, `ctaButton: "Solicită ofertă gratuită"`; `const t = copy[locale]`.
5. Links: back link `href="/portofoliu"`, prev/next `href={{ pathname: "/portofoliu/[slug]", params: { slug: prevProject.slug } }}`, CTA `href="/contact"`.

- [ ] **Step 8: Typecheck, test, build, smoke**

Run: `npx tsc --noEmit && npm test && npm run build 2>&1 | grep -cE "^\s*ƒ"`
Expected: no type errors; all tests PASS; `0`.

Run: `npm run dev`; open `/en/portfolio`.
Expected: featured order starts Fern & Flow, Daylin, Rox, Riders Route; simple grid starts Sotherm România, Sotherm Italia, Maravo, RD Automatim; case-study links go to `/en/portfolio/<slug>`; on `/en/portfolio/fern-and-flow` prev/next follow the EN order and "Înapoi la portofoliu" goes to `/en/portfolio`. `/portofoliu` is unchanged.

- [ ] **Step 9: Commit**

```bash
git add lib/portfolio-data.ts lib/image-alt-text.ts components/portfolio app/\[locale\]/portofoliu tests/portfolio.test.ts
git commit -m "feat(portfolio): locale-aware project data with EN ordering and localized portfolio routes"
```

---

### Task 8: Homepage — per-locale metadata, copy objects, price-free EN FAQs

**Files:**
- Create: `lib/i18n/no-prices.ts`, `tests/no-prices.test.ts`
- Modify: `lib/content.ts`, `app/[locale]/page.tsx`, `components/home/hero.tsx`, `components/home/trust-strip.tsx`, `components/home/services-preview.tsx`, `components/home/featured-work.tsx`, `components/home/about-preview.tsx`, `components/home/process.tsx`, `components/home/testimonials.tsx`, `components/home/partners.tsx`, `components/home/faq.tsx`, `components/home/cta-section.tsx`

**Interfaces:**
- Produces: `withoutPrices<T extends { question: string; answer: string }>(faqs: T[]): T[]`, `PRICE_PATTERN = /€|\bEUR\b|\blei\b|\bRON\b/i`; `getFaqs(locale)` from `lib/content.ts`.

- [ ] **Step 1: Write the failing test**

`tests/no-prices.test.ts`:
```ts
import { describe, expect, it } from "vitest"
import { withoutPrices, PRICE_PATTERN } from "@/lib/i18n/no-prices"
import { getFaqs } from "@/lib/content"

describe("withoutPrices", () => {
  it("drops FAQ items whose question or answer mentions a price", () => {
    const faqs = [
      { question: "Cât costă?", answer: "De la 450€." },
      { question: "Preț?", answer: "Începe de la 650 EUR." },
      { question: "Cât durează?", answer: "4-6 săptămâni." },
      { question: "Plătesc în lei?", answer: "Da." },
    ]
    expect(withoutPrices(faqs).map((f) => f.question)).toEqual(["Cât durează?"])
  })

  it("matches the tokens the EN check script uses", () => {
    for (const s of ["450€", "650 EUR", "100 lei", "500 RON"]) expect(PRICE_PATTERN.test(s)).toBe(true)
    expect(PRICE_PATTERN.test("Relevant text")).toBe(false)
  })

  it("EN homepage FAQs contain no prices while RO ones are untouched", () => {
    expect(getFaqs("ro").some((f) => PRICE_PATTERN.test(f.answer))).toBe(true)
    expect(getFaqs("en").some((f) => PRICE_PATTERN.test(f.question + f.answer))).toBe(false)
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- tests/no-prices.test.ts`
Expected: FAIL — modules/exports missing.

- [ ] **Step 3: Implement the filter and locale-keyed FAQs**

`lib/i18n/no-prices.ts`:
```ts
export const PRICE_PATTERN = /€|\bEUR\b|\blei\b|\bRON\b/i

export function withoutPrices<T extends { question: string; answer: string }>(faqs: T[]): T[] {
  return faqs.filter((f) => !PRICE_PATTERN.test(`${f.question} ${f.answer}`))
}
```

In `lib/content.ts`: rename the existing `export const faqs = [...]` to `const faqsRo = [...]` and add:
```ts
import type { Locale } from "@/i18n/routing"
import { withoutPrices } from "@/lib/i18n/no-prices"

const faqsByLocale = { ro: faqsRo, en: withoutPrices(faqsRo) } satisfies Record<Locale, typeof faqsRo>

export function getFaqs(locale: Locale) {
  return faqsByLocale[locale]
}
```
Update `app/[locale]/page.tsx` to `import { getFaqs } from "@/lib/content"` and `generateFAQSchema(getFaqs(locale))`.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- tests/no-prices.test.ts`
Expected: PASS (3 tests).

- [ ] **Step 5: Homepage metadata and schema**

In `app/[locale]/page.tsx` add:
```ts
import type { Metadata } from "next"
import { getTranslations } from "next-intl/server"
import type { Locale } from "@/i18n/routing"

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  return generatePageMetadata({
    locale,
    href: "/",
    title: "Creare Site Timișoara - Web Design Timișoara",
    description:
      "Servicii profesionale de web design, magazin online si optimizare SEO, vizibilitate locală și națională - De la idee la soluție digitală",
    image: "/website-factory-og-square.webp",
  })
}
```
In the page body: breadcrumb name from `(await getTranslations("breadcrumb"))("home")`; emit the LocalBusiness-with-reviews schema and the per-testimonial Review schemas only when `locale === "ro"` — for `en` emit `generateLocalBusinessSchema()` (no `aggregateRating`) and no Review scripts (spec decision 14).

- [ ] **Step 6: Copy objects in the ten home components**

For each file in `components/home/` (`hero.tsx`, `trust-strip.tsx`, `services-preview.tsx`, `featured-work.tsx`, `about-preview.tsx`, `process.tsx`, `testimonials.tsx`, `partners.tsx`, `faq.tsx`, `cta-section.tsx`) apply this exact transformation:

1. Add imports:
```ts
import { useLocale } from "next-intl"
import type { Locale } from "@/i18n/routing"
```
2. Above the component, collect **every** user-visible string literal in the file (JSX text, `aria-label`, `alt`, `placeholder`, and the fields of any module-level content array such as `faqs`, `steps`, `stats`) into one object named `roCopy`, with descriptive camelCase keys (arrays stay arrays, e.g. `steps: [{ title, description }]`). Then:
```ts
const copy = { ro: roCopy, en: roCopy } satisfies Record<Locale, typeof roCopy>
```
3. In the component body: `const locale = useLocale()` and `const t = copy[locale]`; replace each literal with `{t.key}` (or `t.steps.map(...)`). Client components (`"use client"`) call `useLocale()` directly; if a file is a server component, use `const locale = await getLocale()` from `next-intl/server` and make it `async`.
4. Replace `import Link from "next/link"` with `import { Link } from "@/i18n/navigation"`. Replace every `window.location.href = "/contact"` (`hero.tsx:174`, `cta-section.tsx:132`) with `router.push("/contact")` using `const router = useRouter()` from `@/i18n/navigation`.
5. `components/home/faq.tsx`: its own `faqs` array becomes `roCopy.faqs`, and the `en` variant is `{ ...roCopy, faqs: withoutPrices(roCopy.faqs) }` (import `withoutPrices`), so the rendered EN FAQ list drops the price item, matching the schema list in `lib/content.ts`.
6. `components/home/featured-work.tsx`: source projects through `getProjects(locale).featured` (Task 7) and link with `{ pathname: "/portofoliu/[slug]", params: { slug } }`.
7. `components/home/testimonials.tsx`: keep the RO quotes as-is (they are the placeholder for EN too).

Byte-identical RO output is the acceptance criterion for each file: diff the rendered `/` HTML before and after (save `curl -s http://localhost:3000/ > /tmp/home-before.html` before starting this step and `diff` against the after-state; only the `lang`, script and hash noise may differ).

- [ ] **Step 7: Typecheck, test, build, smoke**

Run: `npx tsc --noEmit && npm test && npm run build 2>&1 | grep -cE "^\s*ƒ"`
Expected: no errors; all PASS; `0`.

Run: `npm run dev`; open `/` and `/en`.
Expected: identical sections in both; `/en` FAQ has one fewer item (the price one); `/en` `<head>` has `<link rel="canonical" href="https://websitefactory.ro/en">` and `<meta name="robots" content="noindex, follow">`; `/en` contains no `€`/`EUR`.

- [ ] **Step 8: Commit**

```bash
git add lib/i18n/no-prices.ts lib/content.ts app/\[locale\]/page.tsx components/home tests/no-prices.test.ts
git commit -m "feat(home): per-locale homepage metadata and copy objects; price-free EN FAQs"
```

---

### Task 9: Despre noi (`/en/about`)

**Files:**
- Modify: `app/[locale]/despre-noi/page.tsx`, `components/about/about-hero.tsx`, `components/about/company-story.tsx`, `components/about/values-section.tsx`, `components/about/founders-section.tsx`, `components/about/timeline-section.tsx`, `components/about/about-cta.tsx`

- [ ] **Step 1: Metadata**

Replace `export const metadata` in `app/[locale]/despre-noi/page.tsx` with `generateMetadata` calling `generatePageMetadata({ locale, href: "/despre-noi", title: "Despre Noi", description: <existing>, keywords: <existing> })` (same shape as Task 8 Step 5). Breadcrumb names via `getTranslations("breadcrumb")` (`home`, `about`). Add `inLanguage: locale` to the Organization schema; leave `areaServed`, founders and address as they are.

- [ ] **Step 2: Copy objects in the six about components**

Apply the Task 8 Step 6 transformation (imports, `roCopy`/`copy`, `useLocale()`, `@/i18n/navigation` `Link`, `router.push("/contact")` for `about-cta.tsx:79`) to every file listed above.

- [ ] **Step 3: Verify**

Run: `npx tsc --noEmit && npm run build 2>&1 | grep -cE "^\s*ƒ"` → no errors, `0`.
Run: `npm run dev`; `/despre-noi` renders as before; `/en/about` renders the same sections with canonical `https://websitefactory.ro/en/about` and `noindex`; CTA buttons go to `/en/contact`.

- [ ] **Step 4: Commit**

```bash
git add app/\[locale\]/despre-noi components/about
git commit -m "feat(about): localized route /en/about with copy objects"
```

---

### Task 10: Contact page, form, API and emails

**Files:**
- Modify: `messages/ro.json`, `messages/en.json`, `app/[locale]/contact/page.tsx`, `components/contact/contact-hero.tsx`, `components/contact/contact-form.tsx`, `components/contact/contact-info.tsx`, `components/contact/contact-map.tsx`, `components/contact/contact-faq.tsx`, `app/api/contact/route.ts`, `lib/email-templates.tsx:89-139`
- Create: `lib/contact-api-copy.ts`, `tests/contact-api-copy.test.ts`

**Interfaces:**
- Produces: `POST /api/contact` accepts `locale?: "ro" | "en"` (default `ro`); `CONTACT_API_COPY[locale]` with keys `recaptchaMissing`, `recaptchaFailed`, `requiredFields`, `invalidEmail`, `adminSubject(name)`, `clientSubject`, `success`, `serverError`; `ContactFormClientEmail({ name, locale })`.

- [ ] **Step 1: Write the failing test**

`tests/contact-api-copy.test.ts`:
```ts
import { describe, expect, it } from "vitest"
import { CONTACT_API_COPY, resolveContactLocale } from "@/lib/contact-api-copy"

describe("contact API copy", () => {
  it("defaults to ro and accepts en", () => {
    expect(resolveContactLocale(undefined)).toBe("ro")
    expect(resolveContactLocale("xx")).toBe("ro")
    expect(resolveContactLocale("en")).toBe("en")
  })
  it("has the same keys for both locales", () => {
    expect(Object.keys(CONTACT_API_COPY.en).sort()).toEqual(Object.keys(CONTACT_API_COPY.ro).sort())
    expect(CONTACT_API_COPY.ro.adminSubject("Ana")).toBe("📬 Cerere Nouă de Contact - Ana")
  })
})
```

- [ ] **Step 2: Run the test to verify it fails**

Run: `npm test -- tests/contact-api-copy.test.ts`
Expected: FAIL — module missing.

- [ ] **Step 3: Implement the API copy module and use it**

`lib/contact-api-copy.ts`:
```ts
import type { Locale } from "@/i18n/routing"

const ro = {
  recaptchaMissing: "Verificare reCAPTCHA lipsă.",
  recaptchaFailed: "Verificare anti-spam eșuată.",
  requiredFields: "Câmpurile nume, email și mesaj sunt obligatorii.",
  invalidEmail: "Format email invalid.",
  adminSubject: (name: string) => `📬 Cerere Nouă de Contact - ${name}`,
  clientSubject: "✅ Am primit mesajul tău - Website Factory",
  success: "Mesajul a fost trimis cu succes!",
  serverError: "A apărut o eroare la trimiterea mesajului. Te rugăm să încerci din nou sau să ne suni direct.",
}

export const CONTACT_API_COPY = { ro, en: ro } satisfies Record<Locale, typeof ro>

export function resolveContactLocale(value: unknown): Locale {
  return value === "en" ? "en" : "ro"
}
```

In `app/api/contact/route.ts`: read `locale` from the body (`const { name, email, phone, company, message, gRecaptchaToken, locale: rawLocale } = body; const locale = resolveContactLocale(rawLocale); const t = CONTACT_API_COPY[locale]`) and replace each hardcoded string with the matching `t.*` (`t.adminSubject(name)`, `t.clientSubject`, etc.). Pass `locale` to `ContactFormClientEmail({ name, locale })`.

In `lib/email-templates.tsx`, change `ContactFormClientEmail` to accept `{ name, locale = "ro" }: { name: string; locale?: Locale }` and move its visible strings (preview, heading, greeting, response-time sentence, tagline) into a `CLIENT_EMAIL_COPY = { ro, en: ro }` object at the top of the file, selected by `locale`. Leave the admin template unchanged.

- [ ] **Step 4: Run the test to verify it passes**

Run: `npm test -- tests/contact-api-copy.test.ts`
Expected: PASS.

- [ ] **Step 5: Contact form strings → messages**

Add to `messages/ro.json` (then `cp` to `en.json`):
```json
"contactForm": {
  "title": "Solicită o ofertă gratuită",
  "intro": "Completează formularul și vom reveni cu o propunere personalizată pentru proiectul tău.",
  "fullName": "Nume complet",
  "fullNamePlaceholder": "Ion Popescu",
  "email": "Adresă email",
  "emailPlaceholder": "ion@exemplu.ro",
  "phone": "Număr de telefon",
  "phonePlaceholder": "+40 7XX XXX XXX",
  "projectType": "Tip proiect",
  "projectTypePlaceholder": "Selectează tipul proiectului",
  "projectTypes": {
    "website": "Website de prezentare",
    "magazin": "Magazin online (E-commerce)",
    "aplicatie": "Aplicație web / mobilă",
    "altul": "Alt tip de proiect"
  },
  "company": "Companie",
  "optional": "(opțional)",
  "companyPlaceholder": "Numele companiei tale",
  "message": "Cu ce te putem ajuta?",
  "messagePlaceholder": "Descrie pe scurt proiectul tău, obiectivele și orice alte detalii relevante...",
  "privacyPrefix": "Prin trimiterea acestui formular, ești de acord cu",
  "privacyPolicy": "Politica de confidențialitate",
  "and": "și",
  "terms": "Termenii și condițiile",
  "sending": "Se trimite...",
  "submit": "Trimite mesajul",
  "successTitle": "Mesaj trimis cu succes!",
  "successText": "Mulțumim pentru mesaj! Echipa noastră te va contacta în cel mai scurt timp posibil, de obicei în maxim 24 de ore.",
  "sendAnother": "Trimite alt mesaj",
  "genericError": "A apărut o eroare. Te rugăm să încerci din nou.",
  "sendError": "Eroare la trimiterea mesajului"
}
```
In `components/contact/contact-form.tsx`: `const t = useTranslations("contactForm")`, `const locale = useLocale()`; replace every literal with `t(...)`; build `projectTypes` inside the component from `t("projectTypes.website")` etc.; include `locale` in the JSON body of the `fetch("/api/contact")` call; replace the two `<a href="/politici-de-confidentialitate">` / `<a href="/termeni-si-conditii">` anchors with `<Link href="..." locale="ro" className="text-brand hover:underline">` from `@/i18n/navigation`.

- [ ] **Step 6: Page and remaining components**

`app/[locale]/contact/page.tsx`: `generateMetadata` with `generatePageMetadata({ locale, href: "/contact", title: "Contact", description: <existing>, keywords: <existing> })`; breadcrumb names via `getTranslations("breadcrumb")` (`home`, `contact`).

`contact-hero.tsx`, `contact-info.tsx`, `contact-map.tsx`, `contact-faq.tsx`: Task 8 Step 6 transformation. `contact-faq.tsx`: `en` variant uses `withoutPrices(roCopy.faqs)` (drops the "Care este prețul pentru un website?" item).

- [ ] **Step 7: Verify**

Run: `npx tsc --noEmit && npm test && npm run build 2>&1 | grep -cE "^\s*ƒ"` → no errors, PASS, `0`.
Run: `npm run dev`; on `/en/contact` the privacy/terms links point to `/politici-de-confidentialitate` and `/termeni-si-conditii` (no `/en`), the FAQ has no price item; submit the form on `/en/contact` with the Network tab open and confirm the request body contains `"locale":"en"`.

- [ ] **Step 8: Commit**

```bash
git add messages lib/contact-api-copy.ts lib/email-templates.tsx app/api/contact/route.ts app/\[locale\]/contact components/contact tests/contact-api-copy.test.ts
git commit -m "feat(contact): localized contact route, form strings and locale-aware contact API"
```

---

### Task 11: Servicii index + three sub-pages, with all pricing hidden on EN

**Files:**
- Modify: `app/[locale]/servicii/page.tsx`, `app/[locale]/servicii/creare-website/page.tsx`, `app/[locale]/servicii/magazin-online/page.tsx`, `app/[locale]/servicii/dezvoltare-aplicatie/page.tsx`, `components/services/website/website-types.tsx:172-178`, `components/services/website/service-hero.tsx:153`, `components/services/website/service-cta.tsx:70`, `components/services/ecommerce/ecommerce-hero.tsx:162`, `components/services/ecommerce/ecommerce-cta.tsx:70`, `components/services/ecommerce/ecommerce-blob.tsx:377`, `components/services/apps/app-hero.tsx:163`, `components/services/apps/app-cta.tsx:62`, and every other component under `components/services/{website,ecommerce,apps}` for copy objects.

- [ ] **Step 1: Services index page**

In `app/[locale]/servicii/page.tsx`:
1. `generateMetadata` with `generatePageMetadata({ locale, href: "/servicii", title: "Servicii Web Design Timișoara", description: <existing>, keywords: <existing> })`.
2. Move the `services` array into `roCopy.services` (with `hero.eyebrow`, `hero.title`, `hero.titleHighlight`, `hero.city`, `hero.text`, `viewDetails: "Vezi detalii"`, `cta.title`, `cta.titleHighlight`, `cta.text`, `cta.primary`, `cta.secondary`) and `const copy = { ro: roCopy, en: roCopy }`; `const t = copy[locale]`.
3. Price badge: wrap the `<div className="absolute top-6 right-6">…{service.price}…</div>` in `{locale === "ro" && ( ... )}`.
4. `import { Link, getPathname } from "@/i18n/navigation"`; the service card `href` values are the internal pathnames already (`/servicii/creare-website` …) — keep them; CTA links `/contact`, `/portofoliu`.
5. Breadcrumb via `getTranslations("breadcrumb")`; Service schema gets `inLanguage: locale`.

- [ ] **Step 2: Three sub-pages**

For each of `creare-website`, `magazin-online`, `dezvoltare-aplicatie` `page.tsx`:
1. `generateMetadata` with `href: "/servicii/creare-website"` (resp. `/servicii/magazin-online`, `/servicii/dezvoltare-aplicatie`) and the existing title/description/keywords.
2. Rename the module-level FAQ array (`serviceFaqs` / `ecommerceFaqs` / `appFaqs`) to `faqsRo` and add `const faqs = { ro: faqsRo, en: withoutPrices(faqsRo) }`; pass `faqs[locale]` to both the `<ServiceFAQ|EcommerceFaq|AppFaq faqs=…>` component and `generateFAQSchema(...)`.
3. Hide calculators on EN: `{locale === "ro" && <ROICalculator />}` (creare-website) and `{locale === "ro" && <RevenueCalculator />}` (magazin-online).
4. Breadcrumb names via `getTranslations("breadcrumb")` (`home`, `services`, plus the page's own title as today); Service schema `inLanguage: locale`.

- [ ] **Step 3: Component fixes**

- `components/services/website/website-types.tsx:172-178`: `import { useLocale } from "next-intl"`, `const locale = useLocale()`, wrap the `<Link href="/pret-website">Calculează preț…</Link>` block in `{locale === "ro" && ( ... )}`; switch `Link` to `@/i18n/navigation`.
- `components/services/ecommerce/ecommerce-blob.tsx:377`: wrap the element containing `€12,847` (the whole stat tile it belongs to) in `{locale === "ro" && ( ... )}` with `useLocale()`.
- Replace `window.location.href = "/contact"` with `router.push("/contact")` (`useRouter` from `@/i18n/navigation`) in `service-hero.tsx:153`, `service-cta.tsx:70`, `ecommerce-hero.tsx:162`, `ecommerce-cta.tsx:70`, `app-hero.tsx:163`, `app-cta.tsx:62`.
- Apply the Task 8 Step 6 copy-object transformation to every component under `components/services/website`, `components/services/ecommerce`, `components/services/apps` that the three pages import (skip `floating-cta.tsx`, done in Task 6; `floating-cta-apps.tsx` and `floating-cta-ecommerce.tsx` get the same `useTranslations("floatingCta")` treatment as Task 6 Step 7 if they are rendered by the pages — check the page imports; if unused, leave them). `ecommerce-portfolio.tsx` / `website-portfolio.tsx`: source projects via `getProjects(locale)` and link case studies with `{ pathname: "/portofoliu/[slug]", params: { slug } }`.

- [ ] **Step 4: Verify**

Run: `npx tsc --noEmit && npm test && npm run build 2>&1 | grep -cE "^\s*ƒ"` → no errors, PASS, `0`.
Run: `npm run dev`; open `/en/services`, `/en/services/website-development`, `/en/services/ecommerce`, `/en/services/app-development`: no price badges, no calculators, no "Calculează preț" button, FAQs without price items; `curl -s http://localhost:3000/en/services/ecommerce | grep -cE "€|EUR"` prints `0`. RO pages unchanged.

- [ ] **Step 5: Commit**

```bash
git add app/\[locale\]/servicii components/services
git commit -m "feat(services): localized service routes with all pricing hidden on EN"
```

---

### Task 12: EN verification script and final migration checks

**Files:**
- Create: `scripts/check-en.mjs`
- Modify: `package.json` (add `"check:routes"` and `"check:en"` scripts)

- [ ] **Step 1: Write the EN checker**

`scripts/check-en.mjs`:
```js
const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "")
const PRICE = /€|\bEUR\b|\blei\b|\bRON\b/i
const slugs = [
  "politehnica-timisoara", "un-event", "riders-route", "la-pinocchio", "fern-and-flow",
  "daylin-nail-supply", "rox-assignment-solution", "blue-phoenix", "merpano",
]
const enRoutes = [
  "/en", "/en/about", "/en/contact", "/en/services", "/en/services/website-development",
  "/en/services/ecommerce", "/en/services/app-development", "/en/portfolio",
  ...slugs.map((s) => `/en/portfolio/${s}`),
]

let failures = 0
const fail = (route, msg) => { failures++; console.error(`FAIL ${route}: ${msg}`) }

for (const route of enRoutes) {
  const res = await fetch(base + route, { redirect: "manual" })
  const html = await res.text()
  if (res.status !== 200) fail(route, `status ${res.status}`)
  if (!html.includes('<html lang="en"')) fail(route, 'missing <html lang="en">')
  if (!html.includes(`<link rel="canonical" href="https://websitefactory.ro${route}"`)) fail(route, "canonical is not the EN URL")
  if (!/<meta name="robots" content="noindex/.test(html)) fail(route, "missing noindex")
  if (html.includes('hreflang=')) fail(route, "hreflang emitted before publishing gate")
  const body = html.split("<body")[1] ?? html
  if (PRICE.test(body)) fail(route, "price token found")
  if (/href="\/en\/(pret-website|politici-de-confidentialitate|termeni-si-conditii|politica-cookie|creare-site-)/.test(html)) fail(route, "link to RO-only route carries /en prefix")
  if (route === "/en" && html.includes('"@type":"Review"')) fail(route, "Review schema emitted on EN homepage")
  if (!failures) console.log(`ok   ${route}`)
}

// RO-only route under /en → 308 to RO
{
  const res = await fetch(`${base}/en/termeni-si-conditii`, { redirect: "manual" })
  if (res.status !== 308 || res.headers.get("location") !== "/termeni-si-conditii") fail("/en/termeni-si-conditii", `expected 308 → /termeni-si-conditii, got ${res.status} → ${res.headers.get("location")}`)
  else console.log("ok   /en/termeni-si-conditii → 308 /termeni-si-conditii")
}
// Unknown path → 404
{
  const res = await fetch(`${base}/en/nu-exista`, { redirect: "manual" })
  if (res.status !== 404) fail("/en/nu-exista", `expected 404, got ${res.status}`)
  else console.log("ok   /en/nu-exista → 404")
}
// Cookie must not redirect RO home
{
  const res = await fetch(`${base}/`, { redirect: "manual", headers: { cookie: "NEXT_LOCALE=en" } })
  const html = await res.text()
  if (res.status !== 200 || !html.includes('<html lang="ro"')) fail("/ with NEXT_LOCALE=en", `expected RO 200, got ${res.status}`)
  else console.log("ok   / ignores NEXT_LOCALE cookie")
}
// EN contact page links to RO legal pages without prefix
{
  const html = await (await fetch(`${base}/en/contact`)).text()
  if (!html.includes('href="/politici-de-confidentialitate"') || !html.includes('href="/termeni-si-conditii"')) fail("/en/contact", "legal links must point to unprefixed RO URLs")
  else console.log("ok   /en/contact legal links → RO")
}
// Sitemap must not list EN URLs yet
{
  const xml = await (await fetch(`${base}/sitemap.xml`)).text()
  if (xml.includes("websitefactory.ro/en")) fail("/sitemap.xml", "EN URLs present before publishing gate")
  else console.log("ok   sitemap has no EN URLs")
}

console.log(failures ? `\n${failures} check(s) failed` : "\nAll EN checks OK")
process.exit(failures ? 1 : 0)
```

Add to `package.json` scripts: `"check:routes": "node scripts/check-routes.mjs"`, `"check:en": "node scripts/check-en.mjs"`.

- [ ] **Step 2: Run the full verification**

Run: `npm test && npx tsc --noEmit && npm run build 2>&1 | tee /tmp/build.log && grep -cE "^\s*ƒ" /tmp/build.log; (npm run start & sleep 5; npm run check:routes; npm run check:en; kill %1)`
Expected: all tests PASS; no type errors; `0` dynamic routes; `All routes OK`; `All EN checks OK`.

- [ ] **Step 3: Manual smoke checklist**

With `npm run start` running, confirm in a browser:
- Consent banner appears on `/en` and `/`, both in the same (RO) text; accepting on one and reloading the other keeps the choice.
- GA/Meta loaders and the AskBot widget mount on `/en/about` (Network tab shows `gtag`/`fbevents`/`askbot` after consent).
- Language switcher round-trips `/servicii/magazin-online` ↔ `/en/services/ecommerce` and `/portofoliu/fern-and-flow` ↔ `/en/portfolio/fern-and-flow`.
- `/en/portfolio` order matches Review Focus #5.
- Theme toggle, mobile menu and the 404 page (`/en/nu-exista`, `/nu-exista`) render with header/footer.

- [ ] **Step 4: Commit**

```bash
git add scripts/check-en.mjs package.json
git commit -m "chore: add EN verification script and wire route checks into npm scripts"
```

---

## Self-review notes

- Spec coverage: routing (T2), redirect for RO-only (T3/T4), static rendering (T4, via `setRequestLocale` — deviation from decision 7 recorded in Global Constraints), content sourcing (T6–T11), portfolio model/order (T7), SEO/metadata/noindex/no-hreflang/no-sitemap (T4, T5, T12), navigation/link policy/switcher (T6), price-free EN (T8, T10, T11, T12), contact API locale (T10), consent/floating CTA/404/aria strings (T4, T6), migration safety (T1, T4, T12), tests (T2, T3, T5, T6, T7, T8, T10).
- Not in this plan by design (spec "Out of scope"): English copy, opening the publishing gate (flip `hreflang: true`, remove EN `noindex`, add EN URLs to `app/sitemap.ts`), AskBot language.
- Naming used consistently: `roOnly`, `roOnlyParams`, `allLocaleParams`, `getProjects`, `getCategoryFilters`, `getFaqs`, `withoutPrices`, `PRICE_PATTERN`, `CONTACT_API_COPY`, `resolveContactLocale`, `generatePageMetadata({ locale, href, hreflang })`, `DUAL_LOCALE_PATHNAMES`, `RO_ONLY_PATHNAMES`.
