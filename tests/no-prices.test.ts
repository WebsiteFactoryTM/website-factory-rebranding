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
