"use client"

import Script from "next/script"
import { hasCategoryConsent } from "@/lib/cookie-consent"

/**
 * Meta Pixel Script Loader Component
 * Uses Next.js Script component for optimized loading
 * Scripts only render when marketing consent is given
 */
export function MetaPixelScriptLoader() {
  const hasMarketingConsent = hasCategoryConsent("marketing")

  // Only render if user has given marketing consent
  if (!hasMarketingConsent) {
    return null
  }

  return (
    <>
      {/* Meta Pixel Initialization */}
      <Script
        id="meta-pixel-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            try {
              // Initialize fbq function
              !(function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)})(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              
              fbq('init', '1056620019544195');
              fbq('track', 'PageView');
              console.log('[Analytics] ✅ Meta Pixel initialized');
            } catch (error) {
              console.warn('[Analytics] ⚠️ Failed to initialize Meta Pixel:', error);
            }
          `,
        }}
        onLoad={() => {
          console.log('[Analytics] ✅ Meta Pixel script loaded via Next.js Script component')
        }}
        onError={() => {
          console.warn('[Analytics] ⚠️ Failed to load Meta Pixel script')
        }}
      />

      {/* Meta Pixel noscript fallback */}
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src="https://www.facebook.com/tr?id=1056620019544195&ev=PageView&noscript=1"
        />
      </noscript>
    </>
  )
}
