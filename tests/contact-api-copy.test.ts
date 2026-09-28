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
