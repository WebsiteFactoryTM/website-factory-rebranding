/**
 * Cookie consent — tipuri și constante partajate.
 *
 * O singură sursă de adevăr pentru categorii, forma stării salvate,
 * versiunea textului de consimțământ și fereastra de expirare.
 */

export type ConsentCategory = "necessary" | "analytics" | "marketing"

/** Alegerea efectivă a utilizatorului pe categorii. `necessary` e mereu true. */
export interface ConsentState {
  necessary: true
  analytics: boolean
  marketing: boolean
}

/** Ce se persistă în cookie-ul first-party (dovadă = alegeri + timp + versiune). */
export interface ConsentRecord extends ConsentState {
  /** Epoch ms al ultimei alegeri — folosit pentru expirare. */
  timestamp: number
  /** Versiunea textului/politicii la momentul alegerii. */
  version: string
}

/**
 * Bump la această valoare când textul de consimțământ sau lista de furnizori
 * se schimbă material → utilizatorii sunt re-întrebați.
 */
export const CONSENT_VERSION = "2025-07"

/** Numele cookie-ului first-party de consimțământ. */
export const CONSENT_COOKIE_NAME = "consent_state"

/** Durata de viață a cookie-ului: ~180 de zile. */
export const CONSENT_COOKIE_MAX_AGE_SECONDS = 180 * 24 * 60 * 60

/**
 * Fereastra maximă de valabilitate a consimțământului: 6 luni.
 * După depășire, bannerul reapare (re-solicitare conform EDPB/ANSPDCP).
 */
export const CONSENT_MAX_AGE_MS = 6 * 30 * 24 * 60 * 60 * 1000

/** Starea implicită: totul refuzat, nimic pre-bifat. */
export const DEFAULT_CONSENT: ConsentState = {
  necessary: true,
  analytics: false,
  marketing: false,
}

/** Semnalele Google Consent Mode v2. */
export interface ConsentSignals {
  analytics_storage: "granted" | "denied"
  ad_storage: "granted" | "denied"
  ad_user_data: "granted" | "denied"
  ad_personalization: "granted" | "denied"
}
