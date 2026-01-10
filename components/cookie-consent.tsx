"use client"

import * as React from "react"
import { X, Settings, Check, Cookie } from "lucide-react"
import { getCookieConsent, setCookieConsent, hasConsent, type CookieCategory } from "@/lib/cookie-consent"
import { cn } from "@/lib/utils"
import Link from "next/link"

export function CookieConsent() {
  const [isVisible, setIsVisible] = React.useState(false)
  const [showDetails, setShowDetails] = React.useState(false)
  const [consent, setConsentState] = React.useState({
    necessary: true,
    analytics: false,
    marketing: false,
  })

  React.useEffect(() => {
    // Check if user has already given consent
    if (!hasConsent()) {
      // Show banner after a short delay to not block initial render
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 500)
      return () => clearTimeout(timer)
    }

    // Load existing consent preferences if available
    const existingConsent = getCookieConsent()
    if (existingConsent) {
      setConsentState({
        necessary: existingConsent.necessary,
        analytics: existingConsent.analytics,
        marketing: existingConsent.marketing,
      })
    }

    // Expose function to show consent banner from outside (e.g., footer link)
    window.showCookieConsent = () => {
      setIsVisible(true)
      setShowDetails(true)
    }

    return () => {
      delete window.showCookieConsent
    }
  }, [])

  const handleAcceptAll = () => {
    const newConsent = {
      necessary: true,
      analytics: true,
      marketing: true,
    }
    setCookieConsent(newConsent)
    setConsentState(newConsent)
    setIsVisible(false)
    // Reload to initialize analytics
    if (typeof window !== "undefined") {
      window.location.reload()
    }
  }

  const handleRejectAll = () => {
    const newConsent = {
      necessary: true,
      analytics: false,
      marketing: false,
    }
    setCookieConsent(newConsent)
    setConsentState(newConsent)
    setIsVisible(false)
  }

  const handleSavePreferences = () => {
    setCookieConsent(consent)
    setIsVisible(false)
    // Reload to apply changes
    if (typeof window !== "undefined") {
      window.location.reload()
    }
  }

  const toggleCategory = (category: CookieCategory) => {
    if (category === "necessary") return // Cannot disable necessary cookies
    setConsentState((prev) => ({
      ...prev,
      [category]: !prev[category],
    }))
  }

  if (!isVisible) return null

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[9998] transition-opacity duration-300"
        onClick={() => !showDetails && setIsVisible(false)}
        aria-hidden="true"
      />

      {/* Consent Banner */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-[9999] transform transition-all duration-300 ease-out",
          isVisible ? "translate-y-0" : "translate-y-full",
        )}
      >
        <div className="bg-card border-t border-border shadow-2xl">
          <div className="container mx-auto px-4 lg:px-8 py-6">
            {!showDetails ? (
              // Simple Banner View
              <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-6">
                <div className="flex-1">
                  <div className="flex items-start gap-3 mb-2">
                    <Cookie className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                    <h3 className="text-lg font-heading font-semibold text-foreground">
                      Utilizăm cookie-uri pentru a îmbunătăți experiența dumneavoastră
                    </h3>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Acest site folosește cookie-uri pentru a analiza traficul și pentru a personaliza conținutul. Puteți accepta toate cookie-urile sau alege preferințele dvs.{" "}
                    <Link href="/politica-cookie" className="text-brand hover:underline font-medium">
                      Aflați mai multe
                    </Link>
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
                  <button
                    onClick={handleRejectAll}
                    className="px-5 py-2.5 rounded-full border border-border hover:border-foreground/20 bg-background text-foreground font-medium text-sm transition-colors"
                  >
                    Respinge toate
                  </button>
                  <button
                    onClick={() => setShowDetails(true)}
                    className="px-5 py-2.5 rounded-full border border-border hover:border-brand/50 bg-background text-foreground font-medium text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <Settings className="w-4 h-4" />
                    Preferințe
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="px-5 py-2.5 rounded-full bg-brand text-brand-foreground font-medium text-sm hover:opacity-90 transition-opacity"
                  >
                    Acceptă toate
                  </button>
                </div>
              </div>
            ) : (
              // Detailed Preferences View
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-heading font-semibold text-foreground mb-1">
                      Preferințe cookie-uri
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Selectați tipurile de cookie-uri pe care doriți să le acceptați
                    </p>
                  </div>
                  <button
                    onClick={() => setShowDetails(false)}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Închide"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* Necessary Cookies */}
                  <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h4 className="font-semibold text-foreground">Cookie-uri strict necesare</h4>
                          <span className="text-xs px-2 py-0.5 rounded-full bg-brand/10 text-brand font-medium">
                            Obligatoriu
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          Aceste cookie-uri sunt esențiale pentru funcționarea site-ului și nu pot fi dezactivate. Ele includ preferințele de temă și alte setări de bază.
                        </p>
                      </div>
                      <div className="flex items-center">
                        <div className="w-10 h-6 rounded-full bg-brand flex items-center justify-end px-1">
                          <Check className="w-4 h-4 text-brand-foreground" />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Analytics Cookies */}
                  <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-2">Cookie-uri de analiză</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                          Aceste cookie-uri ne ajută să înțelegem cum vizitatorii interacționează cu site-ul prin colectarea de informații anonime. Folosim Google Analytics și Vercel Analytics.
                        </p>
                        <Link href="/politica-cookie" className="text-xs text-brand hover:underline">
                          Aflați mai multe →
                        </Link>
                      </div>
                      <button
                        onClick={() => toggleCategory("analytics")}
                        className={cn(
                          "relative w-11 h-6 rounded-full transition-colors flex-shrink-0",
                          consent.analytics ? "bg-brand" : "bg-muted-foreground/30",
                        )}
                        aria-label={consent.analytics ? "Dezactivează cookie-uri de analiză" : "Activează cookie-uri de analiză"}
                      >
                        <span
                          className={cn(
                            "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-background transition-transform shadow-sm",
                            consent.analytics ? "translate-x-5" : "translate-x-0",
                          )}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Marketing Cookies */}
                  <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h4 className="font-semibold text-foreground mb-2">Cookie-uri de marketing</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-2">
                          Aceste cookie-uri sunt folosite pentru a afișa reclame relevante și pentru a măsura eficiența campaniilor publicitare. Folosim Meta Pixel (Facebook).
                        </p>
                        <Link href="/politica-cookie" className="text-xs text-brand hover:underline">
                          Aflați mai multe →
                        </Link>
                      </div>
                      <button
                        onClick={() => toggleCategory("marketing")}
                        className={cn(
                          "relative w-11 h-6 rounded-full transition-colors flex-shrink-0",
                          consent.marketing ? "bg-brand" : "bg-muted-foreground/30",
                        )}
                        aria-label={consent.marketing ? "Dezactivează cookie-uri de marketing" : "Activează cookie-uri de marketing"}
                      >
                        <span
                          className={cn(
                            "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-background transition-transform shadow-sm",
                            consent.marketing ? "translate-x-5" : "translate-x-0",
                          )}
                        />
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
                  <button
                    onClick={handleRejectAll}
                    className="px-5 py-2.5 rounded-full border border-border hover:border-foreground/20 bg-background text-foreground font-medium text-sm transition-colors"
                  >
                    Respinge toate
                  </button>
                  <button
                    onClick={handleAcceptAll}
                    className="px-5 py-2.5 rounded-full border border-border hover:border-brand/50 bg-background text-foreground font-medium text-sm transition-colors"
                  >
                    Acceptă toate
                  </button>
                  <button
                    onClick={handleSavePreferences}
                    className="px-5 py-2.5 rounded-full bg-brand text-brand-foreground font-medium text-sm hover:opacity-90 transition-opacity flex-1 sm:flex-initial"
                  >
                    Salvează preferințele
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
