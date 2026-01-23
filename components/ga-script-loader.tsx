"use client"

import Script from "next/script"
import { hasCategoryConsent } from "@/lib/cookie-consent"

/**
 * GA Script Loader Component
 * Uses Next.js Script component for optimized loading
 * Scripts only render when analytics consent is given
 */
export function GAScriptLoader() {
  const hasAnalyticsConsent = hasCategoryConsent("analytics")

  // Only render if user has given analytics consent
  if (!hasAnalyticsConsent) {
    return null
  }

  return (
    <>
      {/* Google Analytics Script - afterInteractive strategy for optimal performance */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-95D6D580HV"
        strategy="afterInteractive"
        onLoad={() => {
          console.log('[Analytics] ✅ GA script loaded via Next.js Script component')
        }}
        onError={() => {
          console.warn('[Analytics] ⚠️ Failed to load GA script via Next.js')
        }}
      />

      {/* Google Analytics Configuration */}
      <Script
        id="ga-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            try {
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-95D6D580HV', {
                send_page_view: true,
                anonymize_ip: true,
                debug_mode: ${process.env.NODE_ENV === 'development' ? 'true' : 'false'}
              });
              console.log('[Analytics] ✅ GA configured via Next.js Script');
            } catch (error) {
              console.warn('[Analytics] ⚠️ Failed to configure GA:', error);
            }
          `,
        }}
      />
    </>
  )
}
