"use client"

import { useEffect } from "react"
import { hasCategoryConsent, initializeAnalytics } from "@/lib/cookie-consent"

export function AnalyticsLoader() {
  useEffect(() => {
    // Initialize analytics if consent was already given
    // This runs on client-side only, after component mounts
    const hasAnalytics = hasCategoryConsent("analytics")
    const hasMarketing = hasCategoryConsent("marketing")

    if (hasAnalytics || hasMarketing) {
      // Initialize immediately - no delay needed
      initializeAnalytics()
    }
  }, [])

  // This component doesn't render anything
  // It only initializes scripts on the client side
  return null
}
