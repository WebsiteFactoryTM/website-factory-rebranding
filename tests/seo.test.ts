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
