/**
 * Augmentări globale pentru integrarea cu tracking-ul (gtag/dataLayer/fbq)
 * și API-ul de redeschidere a preferințelor din footer/policy.
 */

export {}

declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
    fbq?: ((...args: unknown[]) => void) & { callMethod?: (...args: unknown[]) => void }
    _fbq?: unknown
    /** Redeschide bannerul de preferințe (compat cu link-uri existente). */
    showCookieConsent?: () => void
  }
}
