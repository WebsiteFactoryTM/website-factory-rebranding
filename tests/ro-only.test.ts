import { beforeEach, describe, expect, it, vi } from "vitest"

const { permanentRedirect } = vi.hoisted(() => ({
  permanentRedirect: vi.fn((path: string) => {
    throw new Error(`NEXT_REDIRECT:${path}`)
  }),
}))
vi.mock("next/navigation", () => ({ permanentRedirect }))

const { roOnly, roOnlyParams, allLocaleParams } = await import("@/lib/i18n/ro-only")

describe("roOnly", () => {
  beforeEach(() => {
    permanentRedirect.mockClear()
  })

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
