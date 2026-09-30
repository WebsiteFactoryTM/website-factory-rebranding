"use client"

import { useLocale } from "next-intl"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { FloatingElement } from "@/components/ui/floating-element"
import { cn } from "@/lib/utils"
import { getProjects } from "@/lib/portfolio-data"
import type { Locale } from "@/i18n/routing"

const roCopy = {
  eyebrow: "Portofoliu Website Factory",
  titlePrefix: "O parte din",
  titleHighlight: "proiectele noastre",
  titleSuffix: "finalizate.",
  text: "Soluții digitale construite pentru nevoi reale de business. Aici sunt câteva dintre ele.",
  stats: [
    { value: "+150", label: "Proiecte finalizate" },
    { value: "95%", label: "Livrat la timp" },
    { value: "∞", label: "Posibilități" },
  ],
  scrollLabel: "Explorează proiectele",
}
const enCopy = {
  eyebrow: "Website Factory Portfolio",
  titlePrefix: "A look at",
  titleHighlight: "projects we've shipped",
  titleSuffix: "and the results behind them.",
  text: "Digital work built for real business needs. Here are a few of the projects we're proud of.",
  stats: [
    { value: "150+", label: "Projects delivered" },
    { value: "95%", label: "Delivered on time" },
    { value: "100%", label: "SEO-first builds" },
  ],
  scrollLabel: "Explore the projects",
}
const copy = { ro: roCopy, en: enCopy } satisfies Record<Locale, typeof roCopy>

export function PortfolioHero() {
  const locale = useLocale()
  const t = copy[locale]
  const { ref: titleRef, isVisible: titleVisible } = useScrollReveal()
  const { featured, simple } = getProjects(locale)
  const totalProjects = featured.length + simple.length

  return (
    <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden pt-24 pb-24 md:pb-32">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-brand/10 blur-[100px]"
          delay={0}
          duration={10}
        />
        <FloatingElement
          className="absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full bg-glow-violet/15 blur-[80px]"
          delay={2}
          duration={8}
        />
        <FloatingElement
          className="absolute top-1/2 left-1/4 w-48 h-48 rounded-full bg-glow-cyan/10 blur-[60px]"
          delay={1}
          duration={12}
        />
      </div>

      {/* Decorative metallic shapes */}
      <div className="absolute top-20 right-10 md:right-20 w-20 h-20 md:w-32 md:h-32">
        <div
          className="w-full h-full metallic-surface rounded-3xl opacity-40"
          style={{ animation: "morph 14s ease-in-out infinite" }}
        />
      </div>
      <div className="absolute bottom-20 left-10 md:left-20 w-16 h-16 md:w-24 md:h-24">
        <div
          className="w-full h-full bg-gradient-to-br from-glow-cyan/40 to-brand/30 rounded-2xl blur-sm opacity-50"
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
            {t.eyebrow}
          </span>

          <h1 className="font-heading text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight">
            {t.titlePrefix} <span className="gradient-text-animated">{t.titleHighlight}</span> {t.titleSuffix}
          </h1>

          <p className="mt-8 text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto text-pretty">
            {t.text}
          </p>

          {/* Stats row */}
          <div className="mt-12 flex flex-wrap justify-center gap-8 md:gap-16">
            {t.stats.map((stat, index) => (
              <div
                key={stat.label}
                className="text-center"
                style={{
                  animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.6 + index * 0.1}s forwards`,
                  opacity: 0,
                }}
              >
                <p className="font-heading text-3xl md:text-4xl font-bold gradient-text">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none">
        <span className="text-[10px] sm:text-xs text-muted-foreground tracking-widest uppercase bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full">
          {t.scrollLabel}
        </span>
        <div className="w-px h-8 sm:h-12 bg-gradient-to-b from-brand to-transparent" />
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
