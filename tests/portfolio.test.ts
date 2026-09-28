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
