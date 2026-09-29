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
  it("contains the namespaces the layout and shared components use", () => {
    for (const ns of ["common", "nav", "switcher", "footer", "floatingCta", "consent", "notFound", "breadcrumb"]) {
      expect(ro).toHaveProperty(ns)
    }
  })
})
