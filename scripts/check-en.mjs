const base = (process.argv[2] ?? "http://localhost:3000").replace(/\/$/, "")
const PRICE = /€|\d\s*\b(?:EUR|lei|RON)\b|\b(?:EUR|lei|RON)\b\s*\d/i
const slugs = [
  "politehnica-timisoara", "un-event", "riders-route", "la-pinocchio", "fern-and-flow",
  "daylin-nail-supply", "rox-assignment-solution", "blue-phoenix", "merpano",
]
const enRoutes = [
  "/en", "/en/about", "/en/contact", "/en/services", "/en/services/website-development",
  "/en/services/ecommerce", "/en/services/app-development", "/en/portfolio",
  ...slugs.map((s) => `/en/portfolio/${s}`),
]

let failures = 0
const fail = (route, msg) => { failures++; console.error(`FAIL ${route}: ${msg}`) }

for (const route of enRoutes) {
  const res = await fetch(base + route, { redirect: "manual" })
  const html = await res.text()
  if (res.status !== 200) fail(route, `status ${res.status}`)
  if (!html.includes('<html lang="en"')) fail(route, 'missing <html lang="en">')
  if (!html.includes(`<link rel="canonical" href="https://websitefactory.ro${route}"`)) fail(route, "canonical is not the EN URL")
  if (!/<meta name="robots" content="noindex/.test(html)) fail(route, "missing noindex")
  if (html.includes('hreflang=')) fail(route, "hreflang emitted before publishing gate")
  const body = html.split("<body")[1] ?? html
  if (PRICE.test(body)) fail(route, "price token found")
  if (/href="\/en\/(pret-website|politici-de-confidentialitate|termeni-si-conditii|politica-cookie|creare-site-)/.test(html)) fail(route, "link to RO-only route carries /en prefix")
  if (route === "/en" && html.includes('"@type":"Review"')) fail(route, "Review schema emitted on EN homepage")
  if (!failures) console.log(`ok   ${route}`)
}

// RO-only route under /en → 308 to RO
{
  const res = await fetch(`${base}/en/termeni-si-conditii`, { redirect: "manual" })
  if (res.status !== 308 || res.headers.get("location") !== "/termeni-si-conditii") fail("/en/termeni-si-conditii", `expected 308 → /termeni-si-conditii, got ${res.status} → ${res.headers.get("location")}`)
  else console.log("ok   /en/termeni-si-conditii → 308 /termeni-si-conditii")
}
// Unknown path → 404
{
  const res = await fetch(`${base}/en/nu-exista`, { redirect: "manual" })
  if (res.status !== 404) fail("/en/nu-exista", `expected 404, got ${res.status}`)
  else console.log("ok   /en/nu-exista → 404")
}
// Cookie must not redirect RO home
{
  const res = await fetch(`${base}/`, { redirect: "manual", headers: { cookie: "NEXT_LOCALE=en" } })
  const html = await res.text()
  if (res.status !== 200 || !html.includes('<html lang="ro"')) fail("/ with NEXT_LOCALE=en", `expected RO 200, got ${res.status}`)
  else console.log("ok   / ignores NEXT_LOCALE cookie")
}
// EN contact page links to RO legal pages without prefix
{
  const html = await (await fetch(`${base}/en/contact`)).text()
  if (!html.includes('href="/politici-de-confidentialitate"') || !html.includes('href="/termeni-si-conditii"')) fail("/en/contact", "legal links must point to unprefixed RO URLs")
  else console.log("ok   /en/contact legal links → RO")
}
// Sitemap must not list EN URLs yet
{
  const xml = await (await fetch(`${base}/sitemap.xml`)).text()
  if (xml.includes("websitefactory.ro/en")) fail("/sitemap.xml", "EN URLs present before publishing gate")
  else console.log("ok   sitemap has no EN URLs")
}

console.log(failures ? `\n${failures} check(s) failed` : "\nAll EN checks OK")
process.exit(failures ? 1 : 0)
