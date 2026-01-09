"use client"

import { useState, useEffect } from "react"
import { Phone, X, MessageCircle, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"

export function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isDismissed, setIsDismissed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling 500px
      if (window.scrollY > 500 && !isDismissed) {
        setIsVisible(true)
      }
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [isDismissed])

  if (!isVisible) return null

  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 transition-all duration-500",
        isVisible ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0",
      )}
    >
      {/* Expanded panel */}
      {isExpanded && (
        <div className="absolute bottom-full right-0 mb-4 w-72 glass-premium rounded-2xl p-5 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-300">
          <button
            onClick={() => setIsExpanded(false)}
            className="absolute top-3 right-3 p-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <p className="font-heading font-bold text-lg mb-3">Hai să vorbim!</p>
          <p className="text-sm text-muted-foreground mb-4">
            Ai întrebări despre website-ul tău? Suntem aici să te ajutăm.
          </p>

          <div className="space-y-2">
            <a
              href="tel:+40728567830"
              className="flex items-center gap-3 p-3 rounded-xl bg-brand text-brand-foreground font-medium hover:bg-brand-light transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span>Sună acum</span>
            </a>
            <a
              href="https://wa.me/40728567830"
              className="flex items-center gap-3 p-3 rounded-xl bg-green-500 text-white font-medium hover:bg-green-600 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp</span>
            </a>
            <a
              href="/contact"
              className="flex items-center gap-3 p-3 rounded-xl border border-border hover:border-brand/50 font-medium transition-colors group"
            >
              <ArrowRight className="w-5 h-5 text-brand" />
              <span>Formular contact</span>
            </a>
          </div>
        </div>
      )}

      {/* Main button */}
      <div className="flex items-center gap-2">
        <button
          onClick={() => {
            setIsDismissed(true)
            setIsVisible(false)
          }}
          className="p-2 rounded-full bg-card border border-border text-muted-foreground hover:text-foreground transition-colors"
          aria-label="Închide"
        >
          <X className="w-4 h-4" />
        </button>

        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={cn(
            "flex items-center gap-3 px-6 py-4 rounded-full font-semibold shadow-2xl transition-all duration-300",
            isExpanded
              ? "bg-card text-foreground border border-brand"
              : "bg-brand text-brand-foreground glow-brand hover:glow-intense",
          )}
        >
          <Phone className={cn("w-5 h-5", !isExpanded && "animate-bounce")} />
          <span className="hidden sm:inline">Hai să povestim!</span>
        </button>
      </div>
    </div>
  )
}
