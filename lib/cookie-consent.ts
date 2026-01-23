"use client"

export type CookieCategory = "necessary" | "analytics" | "marketing"

export interface CookieConsent {
  necessary: boolean
  analytics: boolean
  marketing: boolean
  timestamp: number
}

const CONSENT_STORAGE_KEY = "cookie-consent"
const CONSENT_VERSION = "1.0"

/**
 * Get current cookie consent preferences
 */
export function getCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null

  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY)
    if (!stored) return null

    const parsed = JSON.parse(stored)
    // Check if version matches (for future migrations)
    if (parsed.version !== CONSENT_VERSION) return null

    return parsed.consent as CookieConsent
  } catch {
    return null
  }
}

/**
 * Save cookie consent preferences
 */
export function setCookieConsent(consent: Partial<CookieConsent>): void {
  if (typeof window === "undefined") return

  try {
    const existing = getCookieConsent() || {
      necessary: true, // Always true, required for site functionality
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
    }

    const updated: CookieConsent = {
      ...existing,
      ...consent,
      necessary: true, // Always required
      timestamp: Date.now(),
    }

    localStorage.setItem(
      CONSENT_STORAGE_KEY,
      JSON.stringify({
        version: CONSENT_VERSION,
        consent: updated,
      }),
    )
  } catch (error) {
    console.error("Failed to save cookie consent:", error)
  }
}

/**
 * Check if user has given consent (any consent, not necessarily all)
 */
export function hasConsent(): boolean {
  const consent = getCookieConsent()
  return consent !== null
}

/**
 * Check if specific category is consented
 */
export function hasCategoryConsent(category: CookieCategory): boolean {
  const consent = getCookieConsent()
  if (!consent) return false

  if (category === "necessary") return true // Always required

  return consent[category] === true
}

/**
 * Initialize Google Consent Mode v2 BEFORE any tracking scripts load
 * This should be called as early as possible on page load
 */
export function initializeConsentMode(): void {
  if (typeof window === "undefined") return

  const isDev = process.env.NODE_ENV === 'development'

  // Initialize dataLayer and gtag function
  window.dataLayer = window.dataLayer || []
  if (!window.gtag) {
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args)
    }
  }

  // Set default consent state (denied until user accepts) - REQUIRED FIRST
  try {
    window.gtag("consent", "default", {
      ad_storage: "denied",
      analytics_storage: "denied",
      ad_user_data: "denied",
      ad_personalization: "denied",
      wait_for_update: 500,
    })
    if (isDev) {
      console.log('[Analytics] ✅ Google Consent Mode v2 default set (all denied)')
    }
  } catch (error) {
    if (isDev) {
      console.warn('[Analytics] ⚠️ Failed to set consent default:', error)
    }
  }

  // Check if user has existing consent preferences and update accordingly
  const consent = getCookieConsent()
  if (consent) {
    try {
      window.gtag("consent", "update", {
        analytics_storage: consent.analytics ? "granted" : "denied",
        ad_storage: consent.marketing ? "granted" : "denied",
        ad_user_data: consent.marketing ? "granted" : "denied",
        ad_personalization: consent.marketing ? "granted" : "denied",
      })
      if (isDev) {
        console.log('[Analytics] ✅ Consent restored from storage', {
          analytics_storage: consent.analytics ? "granted" : "denied",
          ad_storage: consent.marketing ? "granted" : "denied",
        })
      }
    } catch (error) {
      if (isDev) {
        console.warn('[Analytics] ⚠️ Failed to update consent:', error)
      }
    }
  }
}

/**
 * Load analytics scripts based on consent
 * This updates the consent mode when user accepts/changes preferences
 */
export function initializeAnalytics(): void {
  if (typeof window === "undefined") return

  const consent = getCookieConsent()
  if (!consent) return

  const isDev = process.env.NODE_ENV === 'development'

  // Update consent based on user preferences
  if (!window.gtag) return // Safety check

  try {
    window.gtag("consent", "update", {
      analytics_storage: consent.analytics ? "granted" : "denied",
      ad_storage: consent.marketing ? "granted" : "denied",
      ad_user_data: consent.marketing ? "granted" : "denied",
      ad_personalization: consent.marketing ? "granted" : "denied",
    })
    if (isDev) {
      console.log('[Analytics] ✅ Consent updated based on user preferences', {
        analytics_storage: consent.analytics ? "granted" : "denied",
        ad_storage: consent.marketing ? "granted" : "denied",
      })
    }
  } catch (error) {
    if (isDev) {
      console.warn('[Analytics] ⚠️ Failed to update consent:', error)
    }
  }
}

/**
 * Clear cookie consent (for testing or user request to change preferences)
 */
export function clearCookieConsent(): void {
  if (typeof window === "undefined") return
  localStorage.removeItem(CONSENT_STORAGE_KEY)
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    dataLayer: unknown[]
    gtag?: (...args: unknown[]) => void
    showCookieConsent?: () => void
  }
}
