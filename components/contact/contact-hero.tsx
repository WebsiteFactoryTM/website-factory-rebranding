"use client"

import { useLocale } from "next-intl"
import type { Locale } from "@/i18n/routing"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { FloatingElement } from "@/components/ui/floating-element"
import { cn } from "@/lib/utils"

const roCopy = {
  badge: "Hai să vorbim",
  title: "Contactează-ne",
  paragraph: "ESpune-ne ce vrei să construiești. Trimite detaliile și revenim rapid cu o propunere personalizată.",
  phoneValue: "+40 728 567 830",
  emailValue: "office@websitefactory.ro",
}

const enCopy = {
  badge: "Let's talk",
  title: "Get in touch",
  paragraph: "Tell us what you want to build. Send us the details and we'll come back quickly with a tailored proposal.",
  phoneValue: "+40 728 567 830",
  emailValue: "office@websitefactory.ro",
}

const copy = { ro: roCopy, en: enCopy } satisfies Record<Locale, typeof roCopy>

export function ContactHero() {
  const locale = useLocale()
  const t = copy[locale]
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal()

  return (
    <section className="relative min-h-[50vh] flex items-center justify-center overflow-hidden pt-24 pb-16">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement
          className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-brand/10 blur-[100px]"
          delay={0}
          duration={10}
        />
        <FloatingElement
          className="absolute bottom-1/3 left-1/3 w-56 h-56 rounded-full bg-glow-violet/15 blur-[80px]"
          delay={2}
          duration={8}
        />
      </div>

      {/* Decorative metallic shapes */}
      <div className="absolute top-20 right-10 md:right-32 w-16 h-16 md:w-24 md:h-24">
        <div
          className="w-full h-full metallic-surface rounded-2xl opacity-40"
          style={{ animation: "morph 14s ease-in-out infinite" }}
        />
      </div>
      <div className="absolute bottom-20 left-10 md:left-32 w-12 h-12 md:w-20 md:h-20">
        <div
          className="w-full h-full bg-gradient-to-br from-glow-cyan/40 to-brand/30 rounded-xl blur-sm opacity-50"
          style={{ animation: "morph 10s ease-in-out infinite reverse" }}
        />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div
          ref={titleRef}
          className={cn(
            "max-w-4xl mx-auto text-center transition-all duration-1000",
            titleVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          {/* Breadcrumb style label */}
          <span className="inline-block text-sm font-medium text-brand tracking-widest uppercase mb-6">
            {t.badge}
          </span>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
            {t.title}
          </h1>

          <p className="mt-6 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty">
            {t.paragraph}
          </p>

          {/* Quick contact badges */}
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="tel:+40728567830"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card border border-border/50 hover:border-brand/50 transition-all duration-300 group"
            >
              <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span className="text-sm font-medium text-foreground group-hover:text-brand transition-colors">
                {t.phoneValue}
              </span>
            </a>
            <a
              href="mailto:office@websitefactory.ro"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-card border border-border/50 hover:border-brand/50 transition-all duration-300 group"
            >
              <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span className="text-sm font-medium text-foreground group-hover:text-brand transition-colors">
                {t.emailValue}
              </span>
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
