"use client"

import * as React from "react"
import Link from "next/link"
import { Cookie, Settings, Check, X } from "lucide-react"
import { cn } from "@/lib/utils"
import { useConsent } from "./consent-provider"

const CATEGORY_COPY = {
  analytics: {
    title: "Cookie-uri de analiză",
    description:
      "Ne ajută să înțelegem cum este folosit site-ul (pagini vizitate, surse de trafic) prin date agregate. Furnizori: Google Analytics 4, Vercel Analytics.",
  },
  marketing: {
    title: "Cookie-uri de marketing",
    description:
      "Măsoară eficiența campaniilor și permit remarketing pe alte platforme. Furnizor: Meta Pixel (Facebook).",
  },
} as const

export function ConsentBanner() {
  const { state, hasDecided, isBannerOpen, acceptAll, rejectAll, save, close } = useConsent()

  const [showDetails, setShowDetails] = React.useState(false)
  const [draft, setDraft] = React.useState({ analytics: state.analytics, marketing: state.marketing })
  const dialogRef = React.useRef<HTMLDivElement>(null)
  const previousFocus = React.useRef<HTMLElement | null>(null)

  // Sincronizează draft-ul cu starea salvată la (re)deschidere.
  React.useEffect(() => {
    if (isBannerOpen) {
      setDraft({ analytics: state.analytics, marketing: state.marketing })
      setShowDetails(hasDecided) // dacă a mai ales o dată, deschidem direct în preferințe
    }
  }, [isBannerOpen, hasDecided, state.analytics, state.marketing])

  // Focus management + focus trap + ESC.
  React.useEffect(() => {
    if (!isBannerOpen) return

    previousFocus.current = document.activeElement as HTMLElement | null
    const node = dialogRef.current
    const focusables = () =>
      node
        ? Array.from(
            node.querySelectorAll<HTMLElement>(
              'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
            ),
          ).filter((el) => !el.hasAttribute("disabled"))
        : []

    // Focus pe primul element interactiv.
    focusables()[0]?.focus()

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        // ESC nu echivalează cu accept; închide doar dacă există deja o alegere.
        if (hasDecided) close()
        return
      }
      if (e.key !== "Tab") return
      const items = focusables()
      if (items.length === 0) return
      const first = items[0]
      const last = items[items.length - 1]
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault()
        last.focus()
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", onKeyDown)
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      previousFocus.current?.focus?.()
    }
  }, [isBannerOpen, hasDecided, close, showDetails])

  if (!isBannerOpen) return null

  const toggle = (cat: "analytics" | "marketing") =>
    setDraft((prev) => ({ ...prev, [cat]: !prev[cat] }))

  return (
    <div
      className="fixed inset-0 z-[9998] flex items-end justify-center sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-labelledby="consent-title"
      aria-describedby="consent-desc"
    >
      {/* Backdrop — click NU închide înainte de o alegere (fără dark pattern implicit). */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
        onClick={() => hasDecided && close()}
      />

      <div
        ref={dialogRef}
        className="relative z-10 w-full sm:max-w-2xl bg-card border border-border shadow-2xl sm:rounded-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 sm:p-8">
          {!showDetails ? (
            /* ---------- Primul strat ---------- */
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <Cookie className="w-6 h-6 text-brand flex-shrink-0 mt-0.5" aria-hidden="true" />
                <div>
                  <h2 id="consent-title" className="text-lg font-heading font-semibold text-foreground">
                    Respectăm confidențialitatea ta
                  </h2>
                  <p id="consent-desc" className="text-sm text-muted-foreground leading-relaxed mt-1">
                    Folosim cookie-uri strict necesare pentru funcționarea site-ului și, doar cu acordul
                    tău, cookie-uri de analiză și marketing. Poți accepta, respinge sau alege în detaliu.{" "}
                    <Link href="/politica-cookie" className="text-brand hover:underline font-medium">
                      Politica de cookie-uri
                    </Link>
                    .
                  </p>
                </div>
              </div>

              {/* Accept / Respinge — aceeași prominență (egale ca stil și dimensiune). */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={rejectAll}
                  className="px-5 py-3 rounded-full bg-muted text-foreground font-medium text-sm hover:bg-muted/80 transition-colors"
                >
                  Respinge toate
                </button>
                <button
                  onClick={acceptAll}
                  className="px-5 py-3 rounded-full bg-brand text-brand-foreground font-medium text-sm hover:opacity-90 transition-opacity"
                >
                  Acceptă toate
                </button>
              </div>
              <button
                onClick={() => setShowDetails(true)}
                className="w-full px-5 py-2.5 rounded-full border border-border hover:border-brand/50 bg-background text-foreground font-medium text-sm transition-colors flex items-center justify-center gap-2"
              >
                <Settings className="w-4 h-4" aria-hidden="true" />
                Preferințe
              </button>
            </div>
          ) : (
            /* ---------- Panoul de preferințe ---------- */
            <div className="space-y-6">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 id="consent-title" className="text-xl font-heading font-semibold text-foreground">
                    Preferințe cookie-uri
                  </h2>
                  <p id="consent-desc" className="text-sm text-muted-foreground mt-1">
                    Alege ce categorii accepți. Cele strict necesare nu pot fi dezactivate.
                  </p>
                </div>
                {hasDecided && (
                  <button
                    onClick={close}
                    className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                    aria-label="Închide preferințele"
                  >
                    <X className="w-5 h-5" aria-hidden="true" />
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {/* Necesare — mereu ON, blocat. */}
                <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">Cookie-uri strict necesare</h3>
                        <span className="text-xs px-2 py-0.5 rounded-full bg-brand/10 text-brand font-medium">
                          Mereu active
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Esențiale pentru funcționarea site-ului: preferința de temă, salvarea alegerii de
                        consimțământ, securitate de bază. Nu pot fi dezactivate.
                      </p>
                    </div>
                    <div
                      className="w-11 h-6 rounded-full bg-brand flex items-center justify-end px-1 flex-shrink-0"
                      aria-hidden="true"
                    >
                      <Check className="w-4 h-4 text-brand-foreground" />
                    </div>
                  </div>
                </div>

                {/* Analytics + Marketing — toggle. */}
                {(["analytics", "marketing"] as const).map((cat) => (
                  <div key={cat} className="bg-muted/30 rounded-lg p-4 border border-border/50">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        <h3 className="font-semibold text-foreground mb-1">{CATEGORY_COPY[cat].title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">
                          {CATEGORY_COPY[cat].description}
                        </p>
                      </div>
                      <button
                        role="switch"
                        aria-checked={draft[cat]}
                        onClick={() => toggle(cat)}
                        className={cn(
                          "relative w-11 h-6 rounded-full transition-colors flex-shrink-0",
                          draft[cat] ? "bg-brand" : "bg-muted-foreground/30",
                        )}
                        aria-label={`${draft[cat] ? "Dezactivează" : "Activează"} ${CATEGORY_COPY[cat].title.toLowerCase()}`}
                      >
                        <span
                          className={cn(
                            "absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-background transition-transform shadow-sm",
                            draft[cat] ? "translate-x-5" : "translate-x-0",
                          )}
                        />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={rejectAll}
                  className="px-5 py-3 rounded-full bg-muted text-foreground font-medium text-sm hover:bg-muted/80 transition-colors"
                >
                  Respinge toate
                </button>
                <button
                  onClick={acceptAll}
                  className="px-5 py-3 rounded-full border border-border hover:border-brand/50 bg-background text-foreground font-medium text-sm transition-colors"
                >
                  Acceptă toate
                </button>
                <button
                  onClick={() => save(draft)}
                  className="px-5 py-3 rounded-full bg-brand text-brand-foreground font-medium text-sm hover:opacity-90 transition-opacity flex-1"
                >
                  Salvează preferințele
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
