"use client"

import { useRouter } from "@/i18n/navigation"
import { useLocale } from "next-intl"
import type { Locale } from "@/i18n/routing"
import { ArrowRight, Phone, ShoppingCart } from "lucide-react"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"

const roCopy = {
  headingLine1: "Gata să-ți lansezi",
  headingLine2: "magazinul online?",
  subtitle:
    "Contactează-ne pentru o consultație gratuită și află cum putem transforma viziunea ta într-un magazin online de succes.",
  ctaPrimary: "Solicită ofertă gratuită",
  callNow: "Sună acum",
  trustConsulting: "Consultație gratuită",
  trustResponse: "Răspuns în 24h",
  trustNoObligations: "Fără obligații",
}

const copy = { ro: roCopy, en: roCopy } satisfies Record<Locale, typeof roCopy>

export function EcommerceCta() {
  const locale = useLocale()
  const t = copy[locale as Locale]
  const router = useRouter()
  const { ref, isVisible } = useScrollReveal()

  return (
    <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand via-brand-dark to-glow-violet" />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-20" />

      {/* Animated orbs */}
      <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-glow-cyan/20 blur-[100px] animate-pulse pointer-events-none" />
      <div
        className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-glow-violet/30 blur-[80px] animate-pulse pointer-events-none"
        style={{ animationDelay: "1s" }}
      />

      {/* Metallic decorations */}
      <div className="absolute top-20 right-20 w-24 h-24 pointer-events-none">
        <div
          className="w-full h-full metallic-surface rounded-3xl opacity-30"
          style={{ animation: "morph 12s ease-in-out infinite" }}
        />
      </div>
      <div className="absolute bottom-20 left-20 w-20 h-20 pointer-events-none">
        <div
          className="w-full h-full metallic-surface rounded-2xl opacity-25"
          style={{ animation: "morph 10s ease-in-out infinite reverse" }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div
          className={cn(
            "text-center max-w-4xl mx-auto transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          {/* Icon */}
          <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-white/10 backdrop-blur-sm flex items-center justify-center">
            <ShoppingCart className="w-10 h-10 text-white" />
          </div>

          {/* Heading */}
          <h2 className="font-heading text-3xl lg:text-5xl xl:text-6xl font-bold text-white mb-6 leading-tight">
            {t.headingLine1}
            <br />
            <span className="text-glow-cyan">{t.headingLine2}</span>
          </h2>

          {/* Subtitle */}
          <p className="text-lg lg:text-xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">{t.subtitle}</p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              className="group relative overflow-hidden px-8 py-4 bg-white text-brand rounded-full font-semibold text-base shadow-2xl hover:shadow-white/20 transition-all duration-300"
              onClick={() => router.push("/contact")}
            >
              <span className="relative z-10 flex items-center gap-2">
                {t.ctaPrimary}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </MagneticButton>

            <a
              href="tel:+40728567830"
              className="group flex items-center gap-3 px-8 py-4 rounded-full border border-white/30 hover:border-white/60 text-white transition-all duration-300"
            >
              <Phone className="w-5 h-5" />
              <span className="font-medium">{t.callNow}</span>
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span>{t.trustConsulting}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span>{t.trustResponse}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span>{t.trustNoObligations}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
