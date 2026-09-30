"use client"

import { Link, useRouter } from "@/i18n/navigation"
import { useLocale } from "next-intl"
import type { Locale } from "@/i18n/routing"
import { ArrowRight, Phone, MessageCircle, Calendar } from "lucide-react"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { FloatingElement } from "@/components/ui/floating-element"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"

const roCopy = {
  headingLine1: "Pregătit să-ți transformi",
  headingLine2: "ideea în realitate",
  subtitle: "Hai să discutăm despre aplicația ta. Consultanță gratuită și estimare de preț în maxim 48 de ore.",
  ctaPrimary: "Solicită consultanță gratuită",
  callNow: "Sună acum",
  whatsapp: "WhatsApp",
  scheduleMeeting: "Programează întâlnire",
  trustItems: ["Răspuns în 24h", "Consultanță gratuită", "NDA disponibil"],
}

const enCopy = {
  headingLine1: "Ready to turn your",
  headingLine2: "idea into reality",
  subtitle: "Let's talk about your app. We reply within 24 hours, with a free consultation and a price estimate within 48.",
  ctaPrimary: "Get a free consultation",
  callNow: "Call now",
  whatsapp: "WhatsApp",
  scheduleMeeting: "Schedule a call",
  trustItems: ["Reply within 24h", "Free consultation", "NDA available"],
}

const copy = { ro: roCopy, en: enCopy } satisfies Record<Locale, typeof roCopy>

export function AppCta() {
  const locale = useLocale()
  const t = copy[locale as Locale]
  const router = useRouter()
  const { ref, isVisible } = useScrollReveal()

  return (
    <section ref={ref} className="relative py-20 sm:py-28 lg:py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand via-brand-dark to-glow-violet" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      <div className="absolute inset-0 noise-overlay opacity-10" />

      {/* Floating orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement
          className="absolute top-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-white/10 blur-[100px]"
          delay={0}
          duration={12}
        />
        <FloatingElement
          className="absolute bottom-1/4 left-1/4 w-48 sm:w-72 h-48 sm:h-72 rounded-full bg-glow-cyan/20 blur-[80px]"
          delay={2}
          duration={10}
        />
      </div>

      {/* Decorative metallic shapes */}
      <div className="absolute top-20 right-10 lg:right-32 w-20 h-20 lg:w-32 lg:h-32 pointer-events-none hidden sm:block">
        <div
          className="w-full h-full metallic-surface rounded-3xl opacity-20"
          style={{ animation: "morph 14s ease-in-out infinite" }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div
          className={cn(
            "max-w-4xl mx-auto text-center transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-white mb-4 sm:mb-6 leading-tight">
            {t.headingLine1}
            <br />
            <span className="text-glow-cyan">{t.headingLine2}</span>?
          </h2>
          <p className="text-lg sm:text-xl text-white/80 mb-8 sm:mb-10 max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10 sm:mb-12">
            <MagneticButton
              className="group relative overflow-hidden px-8 sm:px-10 py-4 sm:py-5 bg-white text-brand rounded-full font-bold text-base sm:text-lg shadow-2xl hover:shadow-white/25 transition-all duration-300 w-full sm:w-auto"
              onClick={() => router.push("/contact")}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {t.ctaPrimary}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </MagneticButton>

            <a
              href="tel:+40728567830"
              className="group flex items-center justify-center gap-3 px-8 py-4 sm:py-5 rounded-full border-2 border-white/30 hover:border-white/60 text-white transition-all duration-300 w-full sm:w-auto"
            >
              <Phone className="w-5 h-5" />
              <span className="font-semibold">{t.callNow}</span>
            </a>
          </div>

          {/* Quick Contact Options */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            <a
              href="https://wa.me/40728567830"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="text-sm">{t.whatsapp}</span>
            </a>
            <Link href="/contact" className="flex items-center gap-2 text-white/70 hover:text-white transition-colors">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">{t.scheduleMeeting}</span>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="mt-10 sm:mt-12 flex flex-wrap justify-center gap-6 sm:gap-8">
            {t.trustItems.map((text) => (
              <div key={text} className="flex items-center gap-2 text-white/60 text-sm">
                <div className="w-2 h-2 rounded-full bg-glow-cyan" />
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
