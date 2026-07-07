"use client"

import * as React from "react"
import { readConsentRecord, isRecordValid, writeConsentRecord } from "@/lib/consent/storage"
import { updateConsentSignals } from "@/lib/consent/consent-mode"
import { DEFAULT_CONSENT, type ConsentState } from "@/lib/consent/types"

interface ConsentContextValue {
  /** Starea curentă (necessary mereu true). */
  state: ConsentState
  /** true dacă utilizatorul a făcut deja o alegere validă (nu expirată). */
  hasDecided: boolean
  /** Bannerul (primul strat sau panoul de preferințe) e vizibil. */
  isBannerOpen: boolean
  acceptAll: () => void
  rejectAll: () => void
  /** Salvează o alegere granulară din panoul de preferințe. */
  save: (next: Pick<ConsentState, "analytics" | "marketing">) => void
  /** Deschide bannerul la panoul de preferințe (footer / pagina de politică). */
  openPreferences: () => void
  /** Închide bannerul fără a schimba alegerea (doar dacă există deja o alegere). */
  close: () => void
}

const ConsentContext = React.createContext<ConsentContextValue | null>(null)

/** Șterge cookie-urile Meta (_fbp/_fbc) pe domeniu și pe domeniul-părinte. */
function deleteMetaCookies() {
  if (typeof document === "undefined") return
  const host = location.hostname
  const parent = host.split(".").slice(-2).join(".")
  const domains = [undefined, host, "." + host, "." + parent]
  for (const name of ["_fbp", "_fbc"]) {
    for (const domain of domains) {
      document.cookie =
        `${name}=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT` +
        (domain ? `; Domain=${domain}` : "")
    }
  }
  if (window.fbq) {
    try {
      window.fbq("consent", "revoke")
    } catch {
      /* noop */
    }
  }
}

export function ConsentProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = React.useState<ConsentState>(DEFAULT_CONSENT)
  const [hasDecided, setHasDecided] = React.useState(false)
  const [isBannerOpen, setIsBannerOpen] = React.useState(false)

  // La montare: restaurează din cookie sau deschide bannerul.
  React.useEffect(() => {
    const record = readConsentRecord()
    if (isRecordValid(record)) {
      setState({ necessary: true, analytics: record.analytics, marketing: record.marketing })
      setHasDecided(true)
    } else {
      setIsBannerOpen(true)
    }

    window.showCookieConsent = () => setIsBannerOpen(true)
    return () => {
      delete window.showCookieConsent
    }
  }, [])

  const commit = React.useCallback((next: Pick<ConsentState, "analytics" | "marketing">) => {
    const prevMarketing = state.marketing
    const full: ConsentState = { necessary: true, analytics: next.analytics, marketing: next.marketing }

    writeConsentRecord(full)
    updateConsentSignals(full)

    // Retragere marketing → curăță cookie-urile Meta imediat.
    if (prevMarketing && !next.marketing) {
      deleteMetaCookies()
    }

    setState(full)
    setHasDecided(true)
    setIsBannerOpen(false)
  }, [state.marketing])

  const acceptAll = React.useCallback(() => commit({ analytics: true, marketing: true }), [commit])
  const rejectAll = React.useCallback(() => commit({ analytics: false, marketing: false }), [commit])
  const save = commit

  const openPreferences = React.useCallback(() => setIsBannerOpen(true), [])
  const close = React.useCallback(() => {
    // Nu permitem închiderea „goală" înainte de prima alegere (fără dark pattern).
    setIsBannerOpen((open) => (hasDecided ? false : open))
  }, [hasDecided])

  const value = React.useMemo<ConsentContextValue>(
    () => ({ state, hasDecided, isBannerOpen, acceptAll, rejectAll, save, openPreferences, close }),
    [state, hasDecided, isBannerOpen, acceptAll, rejectAll, save, openPreferences, close],
  )

  return <ConsentContext.Provider value={value}>{children}</ConsentContext.Provider>
}

export function useConsent(): ConsentContextValue {
  const ctx = React.useContext(ConsentContext)
  if (!ctx) throw new Error("useConsent must be used within <ConsentProvider>")
  return ctx
}
