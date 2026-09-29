# EN Locale Content Localization — Implementation Plan

> **For agentic workers:** This is a content-authoring plan, not a code-TDD plan — there is no separate test suite per string. Each task's "verification" step is what stands in for tests: `pnpm check:en` (the existing route-level guard script), `pnpm build`, and a manual read-through against the Global Constraints below. Execute one phase at a time and stop for the user's review before starting the next — that gate is a hard requirement from the user, not a suggestion.

**Goal:** Translate and localize all `/en` content for a UK small-business audience, in the three phases the user specified (static UI strings → core pages → portfolio), without touching RO content or breaking the existing EN publishing gate (noindex, no hreflang, no sitemap entries) until the user explicitly decides to flip it.

**Architecture:** This is a Next.js 16 + next-intl v4 site. Two mechanisms hold copy:
1. **Global chrome strings** live in `messages/en.json` / `messages/ro.json` and are pulled via `useTranslations()` — header, footer, forms, cookie banner.
2. **Per-page/per-component body copy** is NOT in next-intl messages. Each page/section component defines `const roCopy = {...}`, then `const copy = { ro: roCopy, en: roCopy } satisfies Record<Locale, typeof roCopy>`. Right now **`en` is a literal alias of `roCopy`** everywhere except one partial exception — the EN "translation" work is mechanically: write a real `enCopy` object and change `en: roCopy` to `en: enCopy`.

Portfolio case studies are a third, already-scaffolded mechanism: `lib/portfolio-data.ts` defines each project once with an optional `en?: Partial<...>` override object merged in by `localize()` for EN requests, plus an `enOrder` field already set on all 9 case studies (see Phase 3 — someone already ranked UK-relevance).

**Tech Stack:** Next.js 16 (App Router), next-intl 4.14, TypeScript, Vitest, `scripts/check-en.mjs` (custom route-assertion script), pnpm.

**Spec:** No separate spec file — the user supplied the brief directly in chat (UK/IE/NL tone & language rules, Phases 1–3). The rules are reproduced verbatim in Global Constraints below so this plan is self-contained.

## Global Constraints

- British English spelling/terminology throughout ("optimise", "colour", "mobile") — set at content level per string; there is no framework-level spellchecker, so this is a manual-review requirement on every task.
- Register: professional-but-approachable SMB tone (boutique agency → small business owners). No corporate jargon, no hard-sell language ("revolutionary", "game-changing", "unlock your potential").
- Lead with proof, not adjectives: match the RO site's results-driven voice (Lighthouse/performance scores, delivery time, measurable outcomes). No invented superlatives not backed by a stated fact/metric already present in the RO copy.
- No literal/word-for-word translation — write each string fresh for a UK copywriter's ear, not a transliteration of the RO sentence structure.
- Audience: UK primary, but content must also read naturally for IE/NL visitors — no UK-hyper-specific references (no "Boxing Day", no UK-only regulation call-outs).
- Currency: keep all pricing in EUR, do not convert to GBP. **Open conflict with existing code — see Review Focus.**
- Voice: "we"/"you" direct address, short paragraphs, scannable structure — not corporate "our organisation".
- Do not invent content. Where RO copy is ambiguous or a claim/credential won't transfer, flag it and ask rather than guessing.
- Hreflang/canonical: `lib/seo.ts`'s `generatePageMetadata()` already forces `robots: { index: false, follow: true }` for every EN page unconditionally (the "publishing gate" `scripts/check-en.mjs` asserts against). This is independent of the `hreflang` flag — turning hreflang on for a finished page does **not** make it indexable. Going fully live (flipping that gate) is a separate future decision, out of scope for this plan.

## Review Focus

Five things the brief implies that no single task would catch unless someone owns them explicitly. All five are now resolved (2026-09-29) — decisions below.

1. **RESOLVED — No pricing shown on EN pages.** Keep the existing `withoutPrices()` gate philosophy (`lib/i18n/no-prices.ts`) and extend it everywhere, not just the contact FAQ. Concretely, on top of the existing `contact-faq.tsx` usage:
   - `components/home/faq.tsx` — apply `withoutPrices()` to its FAQ list the same way `contact-faq.tsx` already does (it has the identical pricing FAQ entry).
   - `app/[locale]/servicii/page.tsx` `serviceMeta` — the `price: "De la 450€"` / `"De la 1100€"` / `"Personalizat"` fields are rendered unconditionally today (a real gap against the current `check-en.mjs` "no price tokens" assertion). For EN, don't render the `price` field on the service cards at all — the RO fields stay as they are, EN just omits that line.
   - `app/[locale]/servicii/creare-website/page.tsx`, `magazin-online/page.tsx`, `dezvoltare-aplicatie/page.tsx` — each has an FAQ entry stating a cost range (450–650 EUR, 1100–1700 EUR, 4000–100000+ EUR, monthly maintenance rates). Apply `withoutPrices()` to each page's FAQ list for EN.
   - **Not in scope for this decision:** `components/services/ecommerce/revenue-calculator.tsx` and `components/services/website/roi-calculator.tsx` are interactive tools that use € as a unit for the *visitor's own* revenue/ROI numbers, not our service pricing. Leave these as-is for now; flag to the user during Task 2.4 whether they should exist on EN at all (separate question from "our pricing," not resolved here).
2. **RESOLVED — Keep "150+" as-is.** The user confirmed: use the exact same "150+ clients" / "150+ projects delivered" framing as the RO site, unchanged, across all 7 locations (`components/home/trust-strip.tsx`, `components/home/about-preview.tsx`, `components/about/about-hero.tsx`, `components/portfolio/portfolio-hero.tsx`, `components/services/website/service-hero.tsx` trust badges, `components/services/website/interactive-process.tsx`, `lib/content.ts`). Translate the surrounding label text naturally; do not change the number or add scope qualifiers.
3. **RESOLVED — Remove the "Google Partner" trust badge from EN.** In `components/services/website/service-hero.tsx`, the `trustBadges` array is `["150+ site-uri livrate", "100% clienți mulțumiți", "Google Partner"]`. For the EN `enCopy` version of this array, drop the "Google Partner" entry (2 badges instead of 3). **RO copy is unchanged/out of scope** — this is an EN-only omission, not a claim to retract site-wide; if the user wants it removed from RO too, that's a separate request.
4. **RESOLVED — RO-only content confirmed out of scope, no action needed**, just documented here per the brief's "note what's being left untranslated" instruction: `/pret-website`, the five city landing pages (`creare-site-bucuresti/brasov/cluj/constanta/iasi`), `/termeni-si-conditii`, `/politici-de-confidentialitate`, `/politica-cookie`. These redirect `/en/<path>` → the RO URL via `roOnly()` and are not part of any phase below.
5. **RESOLVED — proceed with updating `scripts/check-en.mjs` in lockstep.** `scripts/check-en.mjs` currently asserts hreflang is ABSENT on every EN route (`"hreflang emitted before publishing gate"` failure). As soon as any task below turns `hreflang: true` on for a page, that page's assertion in this script must be updated in the same commit, or `pnpm check:en` will start failing for a correct reason. Treat this script as living documentation of the gate, not a fixed contract.

---

## Phase 1 — Static content & UI labels

**Scope:** `messages/en.json` only. Confirmed by inspection: `components/layout/header.tsx`, `footer.tsx`, `language-switcher.tsx`, and `components/contact/contact-form.tsx` all already source their strings via `useTranslations()` from this file — there are no other hardcoded static/chrome strings to hunt down. Validation errors use native HTML5 `required`, not a separate message set. There is no separate "validation message" file.

### Task 1.1 — Translate `messages/en.json`

**Files:**
- Modify: `messages/en.json` (currently a byte-for-byte copy of `messages/ro.json`, 136 lines)
- Reference (do not modify): `messages/ro.json`

**What to do:** Translate every leaf string in the JSON, key-by-key, preserving the exact key structure (`common`, `nav`, `switcher`, `footer`, `floatingCta`, `consent`, `breadcrumb`, `contactForm` incl. nested `projectTypes`, `notFound`). Apply Global Constraints: British spelling, natural UK phrasing (not literal RO translation), short/plain register. Two keys need care, not translation:
- `switcher.ro` / `switcher.en` are the switcher's own labels ("RO"/"EN") — leave as-is.
- `footer.location` / `footer.inCity` reference "Timișoara" — this is a real fact (company address), keep the city name, translate only the surrounding words ("Timișoara, Romania" not "Timișoara, România").

- [x] **Step 1:** Draft the translated JSON, keeping key order and nesting identical to `ro.json` so a diff is easy to review.
- [x] **Step 2:** Validate JSON syntax — confirmed valid, and key-parity script confirmed 114/114 keys match between `en.json`/`ro.json`.
- [x] **Step 3:** Run `pnpm test` (Vitest) — `tests/messages.test.ts` had a placeholder assertion (`en is a verbatim copy of ro in this phase`) pinning the pre-translation state; removed that one test (it's now obsolete by design) and kept the key-parity test. All 23 tests pass.
- [x] **Step 4:** Ran `pnpm build && pnpm start`, curled `/en`, `/en/contact`, `/en/nu-exista` — header/footer/cookie-banner/contact-form/404 all render the translated strings correctly (including the UK phone placeholder `+44 7XXX XXXXXX`).
- [x] **Step 4b (not in original plan, added during execution):** Ran `pnpm check:en` — all 29 existing route-level guard assertions still pass (noindex, no hreflang yet, no price leaks, RO-only redirects, sitemap exclusion). Phase 1 didn't touch any of that.
- [ ] **Step 5:** Present the diff of `messages/en.json` to the user for review (this is the "translation file to scan" deliverable the brief asked for). **Stop here — do not start Phase 2 until approved.**
- [x] **Step 6:** Committed as `e3bc7a0`.

---

## Phase 2 — Core page copy: Homepage, Despre noi (About), Servicii (Services)

**Pattern for every task in this phase:** each file has `const roCopy = {...}` then `const copy = { ro: roCopy, en: roCopy } satisfies Record<Locale, typeof roCopy>`. The task is: write `const enCopy = {...}` with the same shape as `roCopy` (TypeScript's `satisfies Record<Locale, typeof roCopy>` will error if a key is missing or mistyped — that's the built-in check), then change the line to `const copy = { ro: roCopy, en: enCopy } satisfies Record<Locale, typeof roCopy>`.

**Metadata gap to close on all three index pages:** `generateMetadata()` in `page.tsx` for `/`, `/despre-noi`, `/servicii` currently passes the *same* RO `title`/`description`/`keywords` regardless of `locale` — EN pages are silently rendering RO `<title>` and meta description today. Each page task below includes branching this on `locale === "en"`.

### Task 2.1 — Homepage components

**Files (each gets its own `enCopy`, same mechanical pattern):**
- `components/home/hero.tsx`
- `components/home/trust-strip.tsx` — contains the "150+ Clienți mulțumiți" stat; keep "150+" unchanged per Review Focus #2, translate the label only ("Happy clients")
- `components/home/services-preview.tsx`
- `components/home/featured-work.tsx`
- `components/home/about-preview.tsx` — also contains a "150+" stat, keep unchanged per #2
- `components/home/process.tsx`
- `components/home/testimonials.tsx` — RO-only per existing code (`generateReviewSchema`/testimonials are gated to `locale === "ro"` in `app/[locale]/page.tsx`); confirm with the user whether EN should show translated testimonials or none — flag, don't assume
- `components/home/partners.tsx`
- `components/home/faq.tsx` — check `lib/content.ts`'s `getFaqs(locale)` first; this component may source FAQ data externally rather than local `roCopy`. It has the same pricing FAQ entry as `contact-faq.tsx` — apply `withoutPrices()` to its EN list the same way, per Review Focus #1
- `components/home/cta-section.tsx`

- [ ] **Step 1:** For each file, read the full `roCopy` object, draft `enCopy` per Global Constraints.
- [ ] **Step 2:** Resolve the "150+" stat per the user's Review Focus #2 decision and apply identically across `trust-strip.tsx` and `about-preview.tsx`.
- [ ] **Step 3:** `pnpm exec tsc --noEmit` — the `satisfies Record<Locale, typeof roCopy>` constraint will fail the build if `enCopy`'s shape drifts from `roCopy`.
- [ ] **Step 4:** Commit per file or as one homepage-components commit.

### Task 2.2 — Homepage page-level metadata (`app/[locale]/page.tsx`)

**Files:**
- Modify: `app/[locale]/page.tsx:26-49` (`generateMetadata`)

**What to do:** Branch `title`/`description`/`ogTitle`/`imageAlt`/`keywords` on `locale`. Write a UK-facing title/meta description/keyword set targeting phrases like "web design agency" / "small business website UK" per the brief — natural phrasing, not keyword-stuffed. Leave `hreflang` off for now (default `false`); turn it on in Task 2.5 once Phase 2 copy is approved.

- [ ] **Step 1:** Add the EN title/description/keywords branch.
- [ ] **Step 2:** `pnpm build` to confirm metadata generation doesn't throw.
- [ ] **Step 3:** Commit.

### Task 2.3 — Despre noi / About

**Files:**
- `app/[locale]/despre-noi/page.tsx:14-29` (`generateMetadata` — same locale-branch gap as Task 2.2; also flag the `keywords` array's `"Ernest Slach"`, `"Alex Nedelia-Kerekeș"` — real people's names, fine to keep, not a RO-specific credential)
- `components/about/about-hero.tsx` — contains a "150+ Proiecte livrate" stat, keep "150+" unchanged per Review Focus #2
- `components/about/company-story.tsx`
- `components/about/founders-section.tsx` — founder bios; translate bios naturally, keep names/roles/social links unchanged
- `components/about/values-section.tsx`
- `components/about/timeline-section.tsx` — **read this file first and flag any RO-specific milestone** (e.g. a Romanian award, a RO-only certification, a CUI/registration reference) to the user before translating, per the brief's instruction to flag RO-specific credentials rather than translate them
- `components/about/about-cta.tsx`

- [ ] **Step 1:** Read `timeline-section.tsx` in full; list any RO-specific claim and ask the user how to handle it before drafting `enCopy` for that file.
- [ ] **Step 2:** Draft `enCopy` for the remaining files per the standard pattern.
- [ ] **Step 3:** Branch `generateMetadata` on locale (title/description/keywords for a UK "about a web design agency" search intent).
- [ ] **Step 4:** `pnpm exec tsc --noEmit`.
- [ ] **Step 5:** Commit.

### Task 2.4 — Servicii / Services (index + 3 sub-pages)

**Files — index page:**
- `app/[locale]/servicii/page.tsx:11-28` (`generateMetadata`, same gap as above)
- `app/[locale]/servicii/page.tsx:31-91` (`roCopy`/`copy` block — hero + 3 service summaries + CTA)
- `app/[locale]/servicii/page.tsx` `serviceMeta` array + its render at `services.map((service, i) => ({ ...service, ...serviceMeta[i] }))` — per Review Focus #1, EN must not render the `price` field (`"De la 450€"`, `"De la 1100€"`, `"Personalizat"`). Don't remove `price` from `serviceMeta` itself (RO still needs it) — instead, in the JSX that renders the service cards, wrap the price display in `locale === "ro" &&` (or equivalent) so EN cards render without a price line.

**Files — 3 sub-pages, each with its own `generateMetadata` (same locale-branch gap) plus a cluster of section components, all following the identical `roCopy`/`copy` pattern:**
- `/servicii/creare-website` (`app/[locale]/servicii/creare-website/page.tsx` [FAQ has a cost-range entry — apply `withoutPrices()` to its EN FAQ list per #1] + `components/services/website/*.tsx`: `service-hero.tsx` [contains "150+ site-uri livrate" trust badge — keep unchanged per #2 — and "Google Partner" — drop from the EN `trustBadges` array per #3], `tech-stack.tsx`, `service-faq.tsx`, `interactive-process.tsx` [contains "150+ proiecte" — keep unchanged per #2], `website-types.tsx`, `service-cta.tsx`, `website-portfolio.tsx`, `benefits-showcase.tsx`)
- `/servicii/magazin-online` (`app/[locale]/servicii/magazin-online/page.tsx` [FAQ has a cost-range entry — apply `withoutPrices()` per #1] + `components/services/ecommerce/*.tsx`: `ecommerce-hero.tsx`, `ecommerce-faq.tsx`, `ecommerce-portfolio.tsx`, `loyalty-features.tsx`, `ecommerce-cta.tsx`, `ecommerce-process.tsx`, `store-types.tsx`, `platform-comparison.tsx`, `ecommerce-tech-stack.tsx`; also decide with the user whether `revenue-calculator.tsx` (an interactive € ROI tool, not our pricing — not covered by decision #1) ships on EN at all)
- `/servicii/dezvoltare-aplicatie` (`app/[locale]/servicii/dezvoltare-aplicatie/page.tsx` [FAQ has a cost-range entry — apply `withoutPrices()` per #1] + `components/services/apps/*.tsx`: `app-types.tsx`, `app-benefits.tsx`, `app-tech-stack.tsx`, `app-cta.tsx`, `app-faq.tsx`, `app-hero.tsx`, `app-process.tsx`)

Note: `components/services/website/roi-calculator.tsx` is the same kind of interactive € tool as `revenue-calculator.tsx` above — same "ship on EN or not" question, ask the user during this task rather than assuming.

- [ ] **Step 1:** Draft `enCopy` for the index page hero/services/CTA block; branch `generateMetadata`; wrap the price display for EN per #1.
- [ ] **Step 2:** For each of the 3 sub-pages: branch `generateMetadata`, apply `withoutPrices()` to the FAQ list, draft `enCopy` for every other component in its cluster, keep "150+" unchanged (#2), drop "Google Partner" from EN `trustBadges` (#3).
- [ ] **Step 3:** Ask the user whether the ROI/revenue calculator widgets appear on the two pages that have them, before finalizing those two clusters.
- [ ] **Step 4:** `pnpm exec tsc --noEmit` after each sub-page's cluster.
- [ ] **Step 5:** Commit per sub-page (4 commits: index, website, ecommerce, apps) to keep review manageable.

### Task 2.5 — Hreflang + canonical for Phase 2 pages, and check-en.mjs update

**Files:**
- Modify: `app/[locale]/page.tsx`, `app/[locale]/despre-noi/page.tsx`, `app/[locale]/servicii/page.tsx` (and its 3 sub-pages) — set `hreflang: true` in each `generatePageMetadata()` call now that EN copy for these pages exists
- Modify: `scripts/check-en.mjs:23` — the blanket "hreflang emitted before publishing gate" assertion needs to become per-route: still assert absence for any page not yet in this list, but assert *presence and correctness* (`ro`/`en`/`x-default` all point to the right URLs) for `/en`, `/en/about`, `/en/services` (+3 sub-routes)

- [ ] **Step 1:** Flip `hreflang: true` on the 5 Phase-2 routes.
- [ ] **Step 2:** Update `check-en.mjs` per-route assertions.
- [ ] **Step 3:** `pnpm build && pnpm start` in one terminal, `pnpm check:en` in another — must pass.
- [ ] **Step 4:** Commit.

### Task 2.6 — Phase 2 review gate

- [ ] Present all Phase 2 copy (homepage, about, services index + 3 sub-pages) to the user, along with the resolved Review Focus decisions (#1 pricing, #2 "150+" framing, #3 Google Partner, any RO-specific flags surfaced in Task 2.3 Step 1). **Do not start Phase 3 until the user confirms.**

---

## Phase 3 — Portfolio

**Structural head start:** `lib/portfolio-data.ts` already has an `en?: Partial<...>` override field on both `FeaturedProject` and `SimpleProject`, and all 9 featured (dedicated-page) case studies already have an `enOrder` set. That existing ranking (1 = most EN-relevant) already lines up with an outcomes-based read of the RO copy:

| enOrder | slug | Client location | Why it ranks here |
|---|---|---|---|
| 1 | `fern-and-flow` | Beckenham, London (UK) | **Strong** — UK client, legible metrics (97/100 performance, 100/100 SEO), no RO-brand dependency |
| 2 | `daylin-nail-supply` | Dublin (IE) | **Strong** — IE client, 93/100 mobile performance; already has a partial `en` override (Task 3.1 precedent) |
| 3 | `rox-assignment-solution` | London (UK) | **Strong** — UK client, 94/100 mobile performance, full admin/payments feature set |
| 4 | `riders-route` | Romania, but product is a generic motorcycling app | **Moderate** — internationally legible metrics (3 platforms, real-time GPS), no RO-brand dependency, but client is RO |
| 5 | `un-event` | Romania (own product) | **Weak-moderate** — good metrics (0.4s load, 100% CWV/SEO) but RO-only marketplace, testimonial names a RO founder |
| 6 | `politehnica-timisoara` | Romania (football club) | **Weak** — strong technical metrics but zero brand recognition outside Romania |
| 7 | `blue-phoenix` | Romania (imports Indonesian goods) | **Weak-moderate** — striking conversion stats (+120%, 2329% growth) but RO market, oddly-specific positioning for a UK reader |
| 8 | `la-pinocchio` | Timișoara restaurant | **Weak** — hyper-local RO business, +60% performance is a good stat but the client has zero relevance to a UK reader |
| 12 | `merpano` | Romania (agriculture) | **Weak** — RO-only industry and brand, WordPress build, no internationally-legible metric |

This table is a starting recommendation, not a final call — present it to the user in Task 3.5 and let them decide inclusion, per the brief.

### Task 3.1 — Translate the 3 strong case studies

**Files:** `lib/portfolio-data.ts` — add/complete `en: {...}` overrides for `fern-and-flow` (currently has none), `daylin-nail-supply` (currently has a partial `en.solution` override that is *still Romanian text*, just with the price detail genericised — replace it with real English), `rox-assignment-solution` (currently has none).

**What to do:** For each, write English `title`, `categoryLabel`, `description`, `shortDescription`, `results` (translate the `label` values only — `value` fields like "97/100" or "48h" are numeric/unit and don't need translation), `challenge`, `solution`, and `testimonial` if present. Match the register rules — these are the flagship UK-facing case studies, so give them the most editorial attention.

- [ ] **Step 1:** Draft the 3 `en` override objects.
- [ ] **Step 2:** `pnpm exec tsc --noEmit` (the `Partial<Pick<FeaturedProject, ...>>` type will catch typos in override keys).
- [ ] **Step 3:** `pnpm dev`, visually check `/en/portfolio/fern-and-flow`, `/en/portfolio/daylin-nail-supply`, `/en/portfolio/rox-assignment-solution`.
- [ ] **Step 4:** Commit.

### Task 3.2 — Case-study page chrome

**Files:**
- `app/[locale]/portofoliu/[slug]/page.tsx:16-27` (`roCopy`/`copy` — labels: "Back to portfolio", "Client:", "Visit live site", "The challenge", "Our solution", "Technologies used", "Previous/Next project", CTA)
- `app/[locale]/portofoliu/[slug]/page.tsx:39-47` (`generateMetadata` — already locale-aware for `title`/`description` since it reads from `project.title`/`project.description`, which resolve through `getProjects(locale)`; only `keywords` needs a look since it references `project.categoryLabel` which is also already locale-resolved — likely no change needed here, verify)

- [ ] **Step 1:** Translate the `roCopy` chrome labels (one-time, applies to every case study page regardless of which projects are included).
- [ ] **Step 2:** Confirm `generateMetadata` produces correct EN output once Task 3.1's `en` overrides exist (no separate title/description hardcoding to fix here — this page already reads from the data layer correctly).
- [ ] **Step 3:** Commit.

### Task 3.3 — Remaining 6 case studies (author only after Task 3.5 decides inclusion)

**Files:** `lib/portfolio-data.ts` — `en` overrides for whichever of `riders-route`, `un-event`, `politehnica-timisoara`, `blue-phoenix`, `la-pinocchio`, `merpano` the user decides to include.

- [ ] Repeat Task 3.1's steps for each included project.

### Task 3.4 — Portfolio index page

**Files:**
- `app/[locale]/portofoliu/page.tsx:12-27` (`generateMetadata` — same RO-hardcoded gap as Phase 2 pages; write UK title/meta/keywords for "web design portfolio" / "case studies" search intent)
- `components/portfolio/portfolio-hero.tsx` — contains "+150 Proiecte finalizate" stat, keep unchanged per Review Focus #2
- `components/portfolio/featured-projects.tsx`
- `components/portfolio/portfolio-cta.tsx`
- `components/portfolio/simple-projects-grid.tsx` — renders `simpleProjects` (53 entries, grid cards only, no dedicated page); each has an optional `en?: Partial<Pick<SimpleProject, "categoryLabel" | "shortDescription">>` override. **Do not translate all 53** — most are hyper-local RO SMBs with no dedicated page or internationally-legible detail. Ask the user whether the EN grid should (a) show only a curated subset with `en` overrides + `enOrder` set, or (b) hide `simpleProjects` entirely on EN and only show the featured case studies.

- [ ] **Step 1:** Resolve the `simpleProjects` inclusion question with the user before writing any of the 53 potential overrides.
- [ ] **Step 2:** Draft `enCopy` for `portfolio-hero.tsx`, `featured-projects.tsx`, `portfolio-cta.tsx` per standard pattern.
- [ ] **Step 3:** Add `en` overrides only for the curated `simpleProjects` subset (if the user chooses option a).
- [ ] **Step 4:** Branch `generateMetadata`.
- [ ] **Step 5:** Commit.

### Task 3.5 — Present portfolio recommendation + inclusion decision

- [ ] Show the user the strong/weak table from above (with any refinements from actually drafting the copy), and the `simpleProjects` question from Task 3.4. Get their inclusion decisions before Task 3.3 and Task 3.4 Step 3 proceed.

### Task 3.6 — Hreflang + canonical for portfolio, final check-en.mjs update

**Files:**
- Modify: `app/[locale]/portofoliu/page.tsx`, `app/[locale]/portofoliu/[slug]/page.tsx` — `hreflang: true`
- Modify: `scripts/check-en.mjs` — extend the per-route hreflang assertions to `/en/portfolio` and `/en/portfolio/<included-slugs>`; the script's `slugs` array at the top only needs to include slugs actually shipped in EN

- [ ] **Step 1:** Flip `hreflang: true` on the portfolio routes.
- [ ] **Step 2:** Update `check-en.mjs`.
- [ ] **Step 3:** `pnpm build && pnpm start` + `pnpm check:en` — must pass.
- [ ] **Step 4:** Commit.

### Task 3.7 — Phase 3 review gate

- [ ] Present the finished portfolio work (case studies, index page, inclusion decisions applied) to the user for final review.

---

## Self-Review Notes

- **Spec coverage:** All three phases from the brief are covered (static strings / homepage+about+services / portfolio), plus the cross-cutting hreflang+canonical requirement (done per-phase as pages are approved, not as one big-bang task) and the "note what's RO-only" requirement (Review Focus #4).
- **Placeholder scan:** No task says "translate appropriately" without naming the exact file and exact mechanical change; where the actual English sentences aren't written out, it's because the remaining open items (RO-specific timeline claims in Task 2.3, portfolio inclusion in Task 3.5, the two calculator widgets in Task 2.4) still need a user decision — writing invented copy ahead of those would violate the brief's "don't guess" rule directly. The five original Review Focus items are now resolved and folded into the relevant tasks as concrete steps.
- **Type consistency:** The `enCopy`/`copy`/`satisfies Record<Locale, typeof roCopy>` pattern is named identically in every task because it's a literal copy-paste convention already established in the codebase (`contact-faq.tsx` is the one existing precedent, and even that one's `enCopy` isn't real English yet — noted in Task 3.1's parallel for `daylin-nail-supply`).
- **Review Focus coverage:** All five items are resolved and each has an owning task where the decision becomes a concrete step (#1 → 2.1/2.4, #2 → 2.1/2.3/2.4/3.4 — kept unchanged everywhere, #3 → 2.4, #4 → this document's own callout, #5 → 2.5/3.6).
