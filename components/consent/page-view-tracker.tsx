"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { useConsent } from "./consent-provider"

/**
 * Trimite page_view la navigările SPA (App Router nu re-execută scripturile).
 * Fire doar dacă respectivul semnal e acordat. Prima randare e sărită: view-ul
 * inițial e deja trimis de configul GA / init-ul Meta Pixel.
 */
export function PageViewTracker() {
  const pathname = usePathname()
  const { state } = useConsent()
  const isFirst = React.useRef(true)

  React.useEffect(() => {
    if (isFirst.current) {
      isFirst.current = false
      return
    }

    if (state.analytics && typeof window.gtag === "function") {
      window.gtag("event", "page_view", {
        page_path: pathname,
        page_title: document.title,
        page_location: window.location.href,
      })
    }

    if (state.marketing && typeof window.fbq === "function") {
      window.fbq("track", "PageView")
    }
  }, [pathname, state.analytics, state.marketing])

  return null
}
