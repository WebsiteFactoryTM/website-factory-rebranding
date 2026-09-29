"use client"

import { useRouter } from "@/i18n/navigation"
import { useLocale } from "next-intl"
import type { Locale } from "@/i18n/routing"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { FloatingElement } from "@/components/ui/floating-element"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { cn } from "@/lib/utils"
import { ArrowRight, MessageSquare, Phone } from "lucide-react"

const roCopy = {
  badge: "Hai să colaborăm",
  headingPrefix: "Pregătit să-ți",
  headingHighlight: "transformi",
  headingSuffix: "prezența online?",
  paragraph:
    "Contactează-ne pentru o consultație gratuită. Vom analiza nevoile tale și vom propune cea mai bună soluție pentru afacerea ta.",
  ctaPrimary: "Solicită ofertă gratuită",
  ctaSecondary: "Sună-ne direct",
  trustResponse: "Răspundem în 24h",
  trustConsultation: "Consultație gratuită",
  trustNoObligation: "Fără obligații",
}

const enCopy = {
  badge: "Let's work together",
  headingPrefix: "Ready to give your",
  headingHighlight: "online presence",
  headingSuffix: "a boost?",
  paragraph:
    "Get in touch for a free consultation. We'll look at what you need and recommend the best way forward for your business.",
  ctaPrimary: "Get a free quote",
  ctaSecondary: "Call us directly",
  trustResponse: "We reply within 24h",
  trustConsultation: "Free consultation",
  trustNoObligation: "No obligation",
}

const copy = { ro: roCopy, en: enCopy } satisfies Record<Locale, typeof roCopy>

export function AboutCTA() {
  const locale = useLocale()
  const t = copy[locale]
  const router = useRouter()
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-background to-glow-violet/10" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-brand/20 blur-[100px]"
          delay={0}
          duration={10}
        >
          <div />
        </FloatingElement>
        <FloatingElement
          className="absolute bottom-1/4 right-1/4 w-48 h-48 rounded-full bg-glow-violet/20 blur-[80px]"
          delay={2}
          duration={8}
        >
          <div />
        </FloatingElement>
        <FloatingElement
          className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full bg-glow-cyan/15 blur-[60px]"
          delay={1}
          duration={12}
        >
          <div />
        </FloatingElement>
      </div>

      {/* Decorative metallic shapes */}
      <div
        className="absolute top-10 right-10 lg:right-20 w-32 h-32 lg:w-48 lg:h-48 metallic-surface rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-30"
        style={{ animation: "morph 15s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-10 left-10 lg:left-20 w-24 h-24 lg:w-36 lg:h-36 bg-gradient-to-br from-glow-cyan/40 to-brand/30 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-sm opacity-40"
        style={{ animation: "morph 12s ease-in-out infinite reverse" }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div
          ref={ref}
          className={cn(
            "max-w-4xl mx-auto text-center transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
          )}
        >
          <span className="inline-block text-sm font-medium text-brand tracking-widest uppercase mb-6">
            {t.badge}
          </span>

          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
            {t.headingPrefix} <span className="gradient-text-animated">{t.headingHighlight}</span> {t.headingSuffix}
          </h2>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            {t.paragraph}
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              className="group relative overflow-hidden w-full sm:w-auto px-8 py-4 bg-brand text-brand-foreground rounded-full font-semibold text-base glow-brand hover:glow-intense transition-all duration-300"
              onClick={() => router.push("/contact")}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <MessageSquare className="w-5 h-5" />
                {t.ctaPrimary}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-brand-light to-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </MagneticButton>

            <a
              className="group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-full border border-border/50 hover:border-brand/50 glass-premium transition-all duration-300 hover:glow-subtle"
              href="tel:+40728567830"
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-full bg-brand/10 group-hover:bg-brand/20 transition-colors">
                <Phone className="w-4 h-4 text-brand" />
              </span>
              <span className="font-medium text-foreground">{t.ctaSecondary}</span>
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              {t.trustResponse}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand" />
              {t.trustConsultation}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-glow-violet" />
              {t.trustNoObligation}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
