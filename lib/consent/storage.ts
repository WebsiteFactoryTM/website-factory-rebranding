/**
 * Persistență consimțământ în cookie first-party `consent_state`.
 *
 * Cookie (nu doar localStorage) pentru că:
 *  - poate fi citit sincron în scriptul inline din <head> (beforeInteractive),
 *    eliminând flash-ul și race-ul cu Consent Mode;
 *  - e dovada cu timestamp + versiune, trimisă și către server dacă e nevoie.
 */

import {
  CONSENT_COOKIE_MAX_AGE_SECONDS,
  CONSENT_COOKIE_NAME,
  CONSENT_MAX_AGE_MS,
  CONSENT_VERSION,
  type ConsentRecord,
  type ConsentState,
} from "./types"

/** Citește un cookie brut după nume (client-side). */
function readRawCookie(name: string): string | null {
  if (typeof document === "undefined") return null
  const match = document.cookie.match(
    new RegExp("(?:^|; )" + name.replace(/[.$?*|{}()[\]\\/+^]/g, "\\$&") + "=([^;]*)"),
  )
  return match ? decodeURIComponent(match[1]) : null
}

/**
 * Un record este valid (nu necesită re-solicitare) dacă:
 *  - versiunea coincide cu cea curentă ȘI
 *  - nu a expirat fereastra de 6 luni.
 */
export function isRecordValid(record: ConsentRecord | null): record is ConsentRecord {
  if (!record) return false
  if (record.version !== CONSENT_VERSION) return false
  if (typeof record.timestamp !== "number") return false
  if (Date.now() - record.timestamp > CONSENT_MAX_AGE_MS) return false
  return true
}

/** Parsează în siguranță un record din string-ul cookie-ului. */
export function parseConsentRecord(raw: string | null): ConsentRecord | null {
  if (!raw) return null
  try {
    const parsed = JSON.parse(raw) as Partial<ConsentRecord>
    if (
      typeof parsed !== "object" ||
      parsed === null ||
      typeof parsed.analytics !== "boolean" ||
      typeof parsed.marketing !== "boolean"
    ) {
      return null
    }
    return {
      necessary: true,
      analytics: parsed.analytics,
      marketing: parsed.marketing,
      timestamp: typeof parsed.timestamp === "number" ? parsed.timestamp : 0,
      version: typeof parsed.version === "string" ? parsed.version : "",
    }
  } catch {
    return null
  }
}

/** Citește record-ul curent din cookie (client-side). Nu validează expirarea. */
export function readConsentRecord(): ConsentRecord | null {
  return parseConsentRecord(readRawCookie(CONSENT_COOKIE_NAME))
}

/** Scrie starea în cookie-ul first-party, cu timestamp + versiune curente. */
export function writeConsentRecord(state: ConsentState): ConsentRecord {
  const record: ConsentRecord = {
    necessary: true,
    analytics: state.analytics,
    marketing: state.marketing,
    timestamp: Date.now(),
    version: CONSENT_VERSION,
  }

  if (typeof document !== "undefined") {
    const secure = typeof location !== "undefined" && location.protocol === "https:" ? "; Secure" : ""
    document.cookie =
      `${CONSENT_COOKIE_NAME}=${encodeURIComponent(JSON.stringify(record))}` +
      `; Path=/; Max-Age=${CONSENT_COOKIE_MAX_AGE_SECONDS}; SameSite=Lax${secure}`
  }

  return record
}
