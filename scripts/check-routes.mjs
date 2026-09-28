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
