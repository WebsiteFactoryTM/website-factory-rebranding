"use client"

import { useRouter } from "@/i18n/navigation"
import { useLocale } from "next-intl"
import type { Locale } from "@/i18n/routing"
import { ArrowRight, Phone, Mail, MessageCircle } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { FloatingElement } from "@/components/ui/floating-element"
import { cn } from "@/lib/utils"

const roCopy = {
  headingLine1: "Gata să ai un website",
  headingLine2: "care lucrează pentru tine?",
  subtitle: "Hai să discutăm despre proiectul tău. Consultanță gratuită, fără obligații. Îți răspundem în maxim 24 de ore.",
  ctaPrimary: "Solicită ofertă gratuită",
  ctaCall: "Sună-ne direct",
  whatsapp: "WhatsApp",
  trustResponse: "Răspuns în 24h",
  trustConsulting: "Consultanță gratuită",
  trustNoObligations: "Fără obligații",
}

const enCopy = {
  headingLine1: "Ready for a website",
  headingLine2: "that actually works for you?",
  subtitle: "Let's talk about your project — free consultation, no obligation. We'll get back to you within 24 hours.",
  ctaPrimary: "Get a free quote",
  ctaCall: "Call us directly",
  whatsapp: "WhatsApp",
  trustResponse: "Reply within 24h",
  trustConsulting: "Free consultation",
  trustNoObligations: "No obligation",
}

const copy = { ro: roCopy, en: enCopy } satisfies Record<Locale, typeof roCopy>

export function ServiceCTA() {
  const locale = useLocale()
  const t = copy[locale as Locale]
  const router = useRouter()
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand via-brand-dark to-brand" />
      <div className="absolute inset-0 grid-pattern opacity-10" />
      <div className="absolute inset-0 noise-overlay pointer-events-none opacity-30" />

      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-white/10 blur-[120px]"
          delay={0}
          duration={12}
        />
        <FloatingElement
          className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-glow-cyan/20 blur-[80px]"
          delay={2}
          duration={10}
        />
      </div>

      {/* Decorative metallic shapes */}
      <div className="absolute top-20 right-20 w-32 h-32 hidden lg:block">
        <div
          className="w-full h-full bg-white/10 rounded-3xl backdrop-blur-sm"
          style={{ animation: "morph 14s ease-in-out infinite" }}
        />
      </div>
      <div className="absolute bottom-20 left-20 w-24 h-24 hidden lg:block">
        <div
          className="w-full h-full bg-white/5 rounded-2xl"
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
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white leading-tight">
            {t.headingLine1}
            <br />
            <span className="text-white/80">{t.headingLine2}</span>
          </h2>

          <p className="mt-6 text-lg lg:text-xl text-white/80 max-w-2xl mx-auto">{t.subtitle}</p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              className="group relative overflow-hidden px-8 py-4 bg-white text-brand rounded-full font-semibold text-base shadow-2xl hover:shadow-white/25 transition-all duration-300"
              onClick={() => router.push("/contact")}
            >
              <span className="relative z-10 flex items-center gap-2">
                {t.ctaPrimary}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </MagneticButton>

            <a
              href="tel:+40728567830"
              className="flex items-center gap-3 px-8 py-4 rounded-full border-2 border-white/30 hover:border-white/60 text-white font-semibold transition-all duration-300 hover:bg-white/10"
            >
              <Phone className="w-5 h-5" />
              {t.ctaCall}
            </a>
          </div>

          {/* Contact options */}
          <div className="mt-12 flex flex-wrap justify-center gap-8">
            <a
              href="mailto:office@websitefactory.ro"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <Mail className="w-4 h-4" />
              <span>office@websitefactory.ro</span>
            </a>
            <a
              href="https://wa.me/40728567830"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span>{t.whatsapp}</span>
            </a>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap justify-center gap-6 text-sm text-white/60">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              {t.trustResponse}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              {t.trustConsulting}
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400" />
              {t.trustNoObligations}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
