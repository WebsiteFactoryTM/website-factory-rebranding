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
