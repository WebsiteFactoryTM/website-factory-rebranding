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
 * Initialize analytics scripts based on consent
 * This is called after consent is given to dynamically load scripts
 */
export function initializeAnalytics(): void {
  if (typeof window === "undefined") return

  const consent = getCookieConsent()
  if (!consent) return

  const isDev = process.env.NODE_ENV === 'development'

  // Initialize Google Consent Mode v2 FIRST (before GA script loads)
  if (!window.gtag) {
    window.dataLayer = window.dataLayer || []
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args)
    }
  }

  // Set default consent state (denied until user accepts)
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

  // Update consent based on user preferences
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

  // Google Analytics (GA4)
  if (consent.analytics && !document.querySelector('script[src*="googletagmanager.com/gtag"]')) {
    if (isDev) {
      console.log('[Analytics] Initializing Google Analytics (dev mode)...')
    }

    // Load Google Analytics script
    const gaScript = document.createElement("script")
    gaScript.async = true
    gaScript.src = "https://www.googletagmanager.com/gtag/js?id=G-95D6D580HV"
    gaScript.onload = () => {
      if (isDev) {
        console.log('[Analytics] ✅ Google Analytics script loaded successfully')
      }
    }
    gaScript.onerror = () => {
      if (isDev) {
        console.warn(
          '[Analytics] ⚠️ Failed to load Google Analytics script.\n' +
          'This is normal in development if you have:\n' +
          '  • Ad blockers enabled\n' +
          '  • Browser privacy extensions\n' +
          '  • Strict Content Security Policy\n' +
          'GA will work correctly in production.'
        )
      }
    }
    document.head.appendChild(gaScript)

    // Configure Google Analytics
    try {
      window.gtag("js", new Date())
      window.gtag("config", "G-95D6D580HV", {
        send_page_view: true,
        anonymize_ip: true,
        debug_mode: true
      })
      if (isDev) {
        console.log('[Analytics] Google Analytics configured successfully')
      }
    } catch (error) {
      if (isDev) {
        console.warn('[Analytics] ⚠️ Failed to configure GA:', error)
      }
    }
  }

  // Meta Pixel
  if (consent.marketing && !window.fbq) {
    try {
      // Initialize Meta Pixel function first
      const fbq = function (...args: unknown[]) {
        ;(fbq.q = fbq.q || []).push(args)
      } as ((...args: unknown[]) => void) & { q?: unknown[]; l?: boolean }

      window.fbq = fbq
      fbq.l = true
      fbq("init", "1056620019544195")
      fbq("track", "PageView")

      if (isDev) {
        console.log('[Analytics] ✅ Meta Pixel initialized')
      }

      // Load Meta Pixel script
      const fbScript = document.createElement("script")
      fbScript.async = true
      fbScript.src = "https://connect.facebook.net/en_US/fbevents.js"
      const firstScript = document.getElementsByTagName("script")[0]
      if (firstScript && firstScript.parentNode) {
        firstScript.parentNode.insertBefore(fbScript, firstScript)
      }
    } catch (error) {
      if (isDev) {
        console.warn('[Analytics] ⚠️ Failed to initialize Meta Pixel:', error)
      }
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
    fbq?: ((...args: unknown[]) => void) & { q?: unknown[]; l?: boolean }
    showCookieConsent?: () => void
  }
}
