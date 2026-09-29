"use client"

import { useEffect, useState } from "react"
import { Link, useRouter } from "@/i18n/navigation"
import { useLocale, useTranslations } from "next-intl"
import type { Locale } from "@/i18n/routing"
import { ArrowRight, Check, Play, Sparkles, Globe, Zap, TrendingUp, Shield } from "lucide-react"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { FloatingElement } from "@/components/ui/floating-element"
import { WebsiteBlob } from "@/components/services/website/website-blob"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"

const roCopy = {
  breadcrumbCurrent: "Creare Website",
  badge: "Serviciu #1 cerut în Timișoara",
  h1Line1: "Creare Website",
  h1Highlight: "Profesional",
  h1Line2: "în Timișoara",
  subtitlePre: "Transformăm ideile în website-uri care ",
  subtitleBold1: "atrag clienți",
  subtitleMid1: ", ",
  subtitleBold2: "convertesc vizitatori",
  subtitleMid2: " și ",
  subtitleBold3: " cu vizibilitate crescută în motoarele de căutare",
  subtitleEnd: ". Design modern, performanță excepțională, rezultate măsurabile.",
  features: [
    { label: "Design Responsive" },
    { label: "Încărcare Rapidă" },
    { label: "SEO Optimizat" },
    { label: "Securitate SSL" },
  ],
  ctaPrimary: "Solicită ofertă gratuită",
  ctaSecondary: "Vezi exemple",
  trustBadges: ["150+ site-uri livrate", "100% clienți mulțumiți", "Google Partner"],
  scrollHint: "Descoperă mai mult",
}

const enCopy = {
  breadcrumbCurrent: "Website Development",
  badge: "Our Most Popular Service",
  h1Line1: "Website Development",
  h1Highlight: "That Works",
  h1Line2: "For Your Business",
  subtitlePre: "We build websites that ",
  subtitleBold1: "bring in customers",
  subtitleMid1: ", ",
  subtitleBold2: "convert visitors",
  subtitleMid2: ", and ",
  subtitleBold3: "climb higher in search results",
  subtitleEnd: " — modern design, exceptional performance, results you can measure.",
  features: [
    { label: "Responsive Design" },
    { label: "Fast Loading" },
    { label: "SEO Optimised" },
    { label: "SSL Security" },
  ],
  ctaPrimary: "Get a free quote",
  ctaSecondary: "See examples",
  trustBadges: ["150+ websites delivered", "100% client satisfaction"],
  scrollHint: "See more",
}

const copy = { ro: roCopy, en: enCopy } satisfies Record<Locale, typeof roCopy>

const heroFeatureIcons = [Globe, Zap, TrendingUp, Shield]

export function ServiceHero() {
  const locale = useLocale()
  const t = copy[locale as Locale]
  const tBreadcrumb = useTranslations("breadcrumb")
  const router = useRouter()
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal()
  const [activeFeature, setActiveFeature] = useState(0)
  const heroFeatures = t.features.map((f, i) => ({ ...f, icon: heroFeatureIcons[i] }))

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % heroFeatures.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [heroFeatures.length])

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden pb-24 md:pb-32">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-brand/15 blur-[120px]"
          delay={0}
          duration={12}
        />
        <FloatingElement
          className="absolute bottom-1/4 left-1/4 w-72 h-72 rounded-full bg-glow-violet/20 blur-[100px]"
          delay={2}
          duration={10}
        />
        <FloatingElement
          className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-glow-cyan/15 blur-[80px]"
          delay={1}
          duration={14}
        />
      </div>

      {/* Decorative metallic shapes */}
      <div className="absolute top-32 right-10 lg:right-32 w-20 h-20 lg:w-32 lg:h-32 pointer-events-none">
        <div
          className="w-full h-full metallic-surface rounded-3xl opacity-30"
          style={{ animation: "morph 14s ease-in-out infinite" }}
        />
      </div>
      <div className="absolute bottom-32 left-10 lg:left-32 w-16 h-16 lg:w-24 lg:h-24 pointer-events-none">
        <div
          className="w-full h-full bg-gradient-to-br from-glow-cyan/40 to-brand/30 rounded-2xl blur-sm opacity-40"
          style={{ animation: "morph 10s ease-in-out infinite reverse" }}
        />
      </div>

      <div className="absolute inset-0 flex items-center justify-center pointer-events-none lg:hidden opacity-30">
        <WebsiteBlob className="w-full h-full max-w-md" size="sm" />
      </div>

      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[55%] h-[80%] hidden lg:flex items-center justify-center pointer-events-auto">
        <WebsiteBlob className="w-full h-full" size="lg" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 lg:px-8 pt-28 pb-20 relative z-10">
        <div
          ref={contentRef}
          className={cn(
            "max-w-3xl transition-all duration-1000",
            contentVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          {/* Breadcrumb */}
          <nav className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
            <Link href="/" className="hover:text-brand transition-colors">
              {tBreadcrumb("home")}
            </Link>
            <span>/</span>
            <Link href="/servicii" className="hover:text-brand transition-colors">
              {tBreadcrumb("services")}
            </Link>
            <span>/</span>
            <span className="text-foreground">{t.breadcrumbCurrent}</span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full glass-premium mb-8">
            <Sparkles className="w-4 h-4 text-brand animate-pulse" />
            <span className="text-sm font-medium">{t.badge}</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1]">
            <span className="text-foreground">{t.h1Line1}</span>
            <br />
            <span className="gradient-text-animated">{t.h1Highlight}</span>
            <br />
            <span className="text-foreground/80">{t.h1Line2}</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl text-pretty">
            {t.subtitlePre}
            <strong className="text-foreground">{t.subtitleBold1}</strong>
            {t.subtitleMid1}
            <strong className="text-foreground">{t.subtitleBold2}</strong>
            {t.subtitleMid2}
            <strong className="text-foreground">{t.subtitleBold3}</strong>
            {t.subtitleEnd}
          </p>

          <div className="mt-8 grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
            {heroFeatures.map((feature, index) => {
              const Icon = feature.icon
              const isActive = index === activeFeature
              return (
                <div
                  key={feature.label}
                  className={cn(
                    "flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border transition-all duration-500 cursor-default",
                    isActive
                      ? "bg-brand/10 border-brand/50 text-foreground scale-105"
                      : "bg-background/50 border-border/50 text-muted-foreground",
                  )}
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <Icon className={cn("w-4 h-4 transition-colors flex-shrink-0", isActive && "text-brand")} />
                  <span className="text-xs sm:text-sm font-medium truncate">{feature.label}</span>
                  {isActive && (
                    <Check className="w-4 h-4 text-green-500 animate-in fade-in duration-300 hidden sm:block" />
                  )}
                </div>
              )
            })}
          </div>

          <div className="mt-10 flex flex-col sm:flex-row items-stretch sm:items-start gap-4">
            <MagneticButton
              className="group relative overflow-hidden px-8 py-4 bg-brand text-brand-foreground rounded-full font-semibold text-base glow-brand hover:glow-intense transition-all duration-300 w-full sm:w-auto text-center justify-center"
              onClick={() => router.push("/contact")}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {t.ctaPrimary}
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-brand-light to-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </MagneticButton>

            <Link
              href="/portofoliu"
              className="group flex items-center justify-center gap-2.5 px-8 py-4 rounded-full border border-border/50 hover:border-brand/50 glass-premium transition-all duration-300"
            >
              <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-brand/10 group-hover:bg-brand/20 transition-colors">
                <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand ml-0.5" />
              </span>
              <span className="font-medium text-base">{t.ctaSecondary}</span>
            </Link>
          </div>

          <div className="mt-12 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-6">
            {t.trustBadges.map((badge, index) => (
              <div
                key={badge}
                className="flex items-center gap-2 text-sm text-muted-foreground"
                style={{
                  animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.8 + index * 0.1}s forwards`,
                  opacity: 0,
                }}
              >
                <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-6 sm:bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20 pointer-events-none">
        <span className="text-[10px] sm:text-xs text-muted-foreground tracking-widest uppercase bg-background/80 backdrop-blur-sm px-3 py-1 rounded-full">
          {t.scrollHint}
        </span>
        <div className="w-px h-8 sm:h-12 bg-gradient-to-b from-brand to-transparent" />
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
