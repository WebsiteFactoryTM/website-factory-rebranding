"use client"

import { useEffect } from "react"
import { initializeConsentMode, initializeAnalytics } from "@/lib/cookie-consent"
import { GAScriptLoader } from "./ga-script-loader"
import { MetaPixelScriptLoader } from "./meta-pixel-loader"

export function AnalyticsLoader() {
  useEffect(() => {
    // Initialize consent mode FIRST on every page load
    // This must happen before GA script loads to ensure proper consent handling
    initializeConsentMode()

    // Small delay to allow consent mode to be set up before other analytics initialization
    const timer = setTimeout(() => {
      initializeAnalytics()
    }, 100)

    return () => clearTimeout(timer)
  }, [])

  return (
    <>
      {/* Google Analytics Scripts - loaded via Next.js Script component */}
      <GAScriptLoader />
      
      {/* Meta Pixel Scripts - loaded via Next.js Script component */}
      <MetaPixelScriptLoader />
    </>
  )
}
