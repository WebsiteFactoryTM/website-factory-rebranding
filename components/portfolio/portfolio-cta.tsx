"use client"

import { Link } from "@/i18n/navigation"
import { useLocale } from "next-intl"
import { ArrowRight, Phone, MessageSquare } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { FloatingElement } from "@/components/ui/floating-element"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { Locale } from "@/i18n/routing"

const roCopy = {
  badge: "Disponibili pentru proiecte noi",
  title: "Vrei un proiect ca acestea?",
  text: "Hai să discutăm despre cum putem transforma viziunea ta într-o realitate digitală de succes. Consultanță gratuită, fără obligații.",
  ctaButton: "Solicită ofertă gratuită",
  callButton: "Sună-ne direct",
  trust: ["Răspuns în 24h", "Consultanță gratuită", "Fără obligații"],
}
const copy = { ro: roCopy, en: roCopy } satisfies Record<Locale, typeof roCopy>

export function PortfolioCta() {
  const locale = useLocale()
  const t = copy[locale]
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Premium gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand via-brand-dark to-brand" />
      <div className="absolute inset-0 hero-gradient opacity-50" />
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement
          className="absolute top-0 right-1/4 w-96 h-96 rounded-full bg-glow-cyan/20 blur-[120px]"
          delay={0}
          duration={12}
        />
        <FloatingElement
          className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full bg-glow-violet/25 blur-[100px]"
          delay={2}
          duration={10}
        />
        <FloatingElement
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white/5 blur-[80px]"
          delay={1}
          duration={8}
        />
      </div>

      {/* Decorative metallic shapes */}
      <div className="absolute top-10 left-10 md:left-20 w-20 h-20 md:w-28 md:h-28">
        <div
          className="w-full h-full metallic-surface rounded-3xl opacity-30"
          style={{ animation: "morph 14s ease-in-out infinite" }}
        />
      </div>
      <div className="absolute bottom-10 right-10 md:right-20 w-16 h-16 md:w-24 md:h-24">
        <div
          className="w-full h-full bg-gradient-to-br from-glow-cyan/40 to-white/20 rounded-2xl blur-sm opacity-40"
          style={{ animation: "morph 10s ease-in-out infinite reverse" }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div
          ref={ref}
          className={cn(
            "max-w-4xl mx-auto text-center transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          {/* Badge */}
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm text-white/90 text-sm font-medium mb-8">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            {t.badge}
          </span>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {t.title}
          </h2>

          <p className="mt-6 text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mx-auto text-pretty">
            {t.text}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton>
              <Button
                asChild
                size="lg"
                className="bg-white text-brand hover:bg-white/90 shadow-2xl shadow-black/20 px-8 h-14 text-base font-semibold group"
              >
                <Link href="/contact">
                  <MessageSquare className="mr-2 h-5 w-5" />
                  {t.ctaButton}
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </MagneticButton>

            <MagneticButton>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 hover:text-white px-8 h-14 text-base font-semibold bg-transparent"
              >
                <a href="tel:+40728567830">
                  <Phone className="mr-2 h-5 w-5" />
                  {t.callButton}
                </a>
              </Button>
            </MagneticButton>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-white/60 text-sm">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400" />
              {t.trust[0]}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              {t.trust[1]}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-violet-400" />
              {t.trust[2]}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
