/**
 * Google Consent Mode v2 — helperi client-side.
 *
 * Maparea categorii → cele 4 semnale e izolată aici, astfel încât o eventuală
 * migrare la GTM să nu atingă restul aplicației.
 */

import type { ConsentSignals, ConsentState } from "./types"

/** Categoriile de consimțământ → semnalele Consent Mode v2. */
export function mapCategoriesToSignals(state: Pick<ConsentState, "analytics" | "marketing">): ConsentSignals {
  return {
    analytics_storage: state.analytics ? "granted" : "denied",
    ad_storage: state.marketing ? "granted" : "denied",
    ad_user_data: state.marketing ? "granted" : "denied",
    ad_personalization: state.marketing ? "granted" : "denied",
  }
}

/** Asigură existența `dataLayer` + `gtag` (idempotent). */
function ensureGtag(): NonNullable<Window["gtag"]> | null {
  if (typeof window === "undefined") return null
  window.dataLayer = window.dataLayer || []
  if (!window.gtag) {
    window.gtag = function gtag() {
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments)
    }
  }
  return window.gtag
}

/**
 * Trimite un `consent update` cu semnalele corespunzătoare stării.
 * Apelat la fiecare schimbare de alegere (accept/reject/save/withdraw).
 */
export function updateConsentSignals(state: Pick<ConsentState, "analytics" | "marketing">): void {
  const gtag = ensureGtag()
  if (!gtag) return
  gtag("consent", "update", mapCategoriesToSignals(state))
}
