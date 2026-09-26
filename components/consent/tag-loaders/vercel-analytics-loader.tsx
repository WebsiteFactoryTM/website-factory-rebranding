"use client"

import { Analytics } from "@vercel/analytics/next"
import { useConsent } from "../consent-provider"

/**
 * Vercel Analytics — gate-uit pe consimțământ `analytics` pentru consistență cu
 * bannerul (care îl listează la categoria de analiză). Cookieless, dar tratat
 * la fel ca restul tool-urilor de analiză.
 */
export function VercelAnalyticsLoader() {
  const { state } = useConsent()
  if (!state.analytics) return null
  return <Analytics />
}
