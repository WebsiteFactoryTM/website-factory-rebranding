"use client"

import { useEffect } from "react"
import { hasCategoryConsent, initializeAnalytics, initializeConsentMode } from "@/lib/cookie-consent"

export function AnalyticsLoader() {
  useEffect(() => {
    // Initialize consent mode FIRST on every page load
    // This must happen before GA script loads to ensure proper consent handling
    initializeConsentMode()

    // Then load analytics scripts if consent was already given
    // This runs on client-side only, after component mounts
    const hasAnalytics = hasCategoryConsent("analytics")
    const hasMarketing = hasCategoryConsent("marketing")

    if (hasAnalytics || hasMarketing) {
      // Small delay to ensure consent mode is set up
      const timer = setTimeout(() => {
        initializeAnalytics()
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [])

  // This component doesn't render anything
  // It only initializes scripts on the client side
  return null
}
