"use client"

import Script from "next/script"
import { useConsent } from "../consent-provider"

const GA_ID = process.env.NEXT_PUBLIC_GA_ID

/**
 * Google Analytics 4 — hard-gated pe consimțământ `analytics`.
 * Consent Mode v2 (default denied) e setat deja în <head>, deci chiar și după
 * montare GA respectă semnalele; suplimentar, scriptul nu se injectează deloc
 * până la acord (reactiv prin provider → demontare la retragere).
 */
export function GaLoader() {
  const { state } = useConsent()

  if (!GA_ID || !state.analytics) return null

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script
        id="ga-config"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            window.gtag = window.gtag || gtag;
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              anonymize_ip: true,
              send_page_view: true
            });
          `,
        }}
      />
    </>
  )
}
