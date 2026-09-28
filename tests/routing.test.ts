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
