"use client"

import { Settings } from "lucide-react"
import { useConsent } from "./consent-provider"

/**
 * Buton reutilizabil care redeschide panoul de preferințe cookie.
 * Folosit în pagina de politică (retragere la fel de ușoară ca acordarea).
 */
export function CookieSettingsButton({ className }: { className?: string }) {
  const { openPreferences } = useConsent()
  return (
    <button
      onClick={openPreferences}
      className={
        className ??
        "inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-brand text-brand-foreground font-medium text-sm hover:opacity-90 transition-opacity"
      }
    >
      <Settings className="w-4 h-4" aria-hidden="true" />
      Setări cookie-uri
    </button>
  )
}
