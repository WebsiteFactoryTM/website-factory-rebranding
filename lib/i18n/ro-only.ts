import { permanentRedirect } from "next/navigation"
import { routing, type Locale } from "@/i18n/routing"

// RO-only routes: a request for /en/<path> is sent to the RO URL instead of rendering RO text under /en.
export function roOnly(locale: string, roPath: string): void {
  if (locale !== "ro") permanentRedirect(roPath)
}

export function roOnlyParams(): { locale: "ro" }[] {
  return [{ locale: "ro" }]
}

export function allLocaleParams(): { locale: Locale }[] {
  return routing.locales.map((locale) => ({ locale }))
}
