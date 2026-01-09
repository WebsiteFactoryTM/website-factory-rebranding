"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Check, Play, Sparkles, ShoppingCart, TrendingUp, Shield, CreditCard } from "lucide-react"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { FloatingElement } from "@/components/ui/floating-element"
import { EcommerceBlob } from "@/components/services/ecommerce/ecommerce-blob"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"

const heroFeatures = [
  { icon: ShoppingCart, label: "Checkout Optimizat" },
  { icon: CreditCard, label: "Plăți Securizate" },
  { icon: TrendingUp, label: "Conversii Crescute" },
  { icon: Shield, label: "GDPR Compliant" },
]

const trustBadges = ["Sisteme de loializare", "Filtre și căutare avansate", "Experiență de cumpărare fluidă"]

export function EcommerceHero() {
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal()
  const [activeFeature, setActiveFeature] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveFeature((prev) => (prev + 1) % heroFeatures.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement
          className="absolute top-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-brand/15 blur-[120px]"
          delay={0}
          duration={12}
        />
        <FloatingElement
          className="absolute bottom-1/4 left-1/4 w-48 sm:w-72 h-48 sm:h-72 rounded-full bg-glow-violet/20 blur-[100px]"
          delay={2}
          duration={10}
        />
        <FloatingElement
          className="absolute top-1/2 right-1/3 w-40 sm:w-64 h-40 sm:h-64 rounded-full bg-glow-cyan/15 blur-[80px]"
          delay={1}
          duration={14}
        />
      </div>

      {/* Decorative metallic shapes */}
      <div className="absolute top-32 right-4 sm:right-10 lg:right-32 w-12 h-12 sm:w-20 sm:h-20 lg:w-32 lg:h-32 pointer-events-none">
        <div
          className="w-full h-full metallic-surface rounded-3xl opacity-30"
          style={{ animation: "morph 14s ease-in-out infinite" }}
        />
      </div>
      <div className="absolute bottom-32 left-4 sm:left-10 lg:left-32 w-10 h-10 sm:w-16 sm:h-16 lg:w-24 lg:h-24 pointer-events-none">
        <div
          className="w-full h-full bg-gradient-to-br from-glow-cyan/40 to-brand/30 rounded-2xl blur-sm opacity-40"
          style={{ animation: "morph 10s ease-in-out infinite reverse" }}
        />
      </div>

      {/* Mobile/Tablet: Behind content with reduced opacity */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none lg:hidden">
        <div className="w-full h-full max-w-md opacity-40">
          <EcommerceBlob className="w-full h-full" size="sm" />
        </div>
      </div>

      {/* Desktop: Full size on right side */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[55%] h-[80%] hidden lg:flex items-center justify-center pointer-events-auto">
        <EcommerceBlob className="w-full h-full" size="lg" />
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
          <nav className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground mb-4 sm:mb-6">
            <Link href="/" className="hover:text-brand transition-colors">
              Acasă
            </Link>
            <span>/</span>
            <Link href="/servicii" className="hover:text-brand transition-colors">
              Servicii
            </Link>
            <span>/</span>
            <span className="text-foreground">Magazin Online</span>
          </nav>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full glass-premium mb-6 sm:mb-8">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand animate-pulse" />
            <span className="text-xs sm:text-sm font-medium">eCommerce de performanță în România</span>
          </div>

          {/* Main Heading */}
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1]">
            <span className="text-foreground">Creare</span>
            <br />
            <span className="gradient-text-animated">Magazin Online</span>
            <br />
            <span className="text-foreground/80">rapid și ușor de administrat</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl text-pretty">
            Dezvoltăm magazine online <strong className="text-foreground">WooCommerce</strong> și tehnologii moderne{" "}
            <strong className="text-foreground">Next.js + Payload CMS</strong>. Funcționalități de loializare clienți,
            checkout optimizat și scalabilitate nelimitată.
          </p>

          <div className="mt-6 sm:mt-8 grid grid-cols-2 sm:flex sm:flex-wrap gap-2 sm:gap-3">
            {heroFeatures.map((feature, index) => {
              const Icon = feature.icon
              const isActive = index === activeFeature
              return (
                <div
                  key={feature.label}
                  className={cn(
                    "flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full border transition-all duration-500 cursor-default",
                    isActive
                      ? "bg-brand/10 border-brand/50 text-foreground scale-105"
                      : "bg-background/50 border-border/50 text-muted-foreground",
                  )}
                  onMouseEnter={() => setActiveFeature(index)}
                  onTouchStart={() => setActiveFeature(index)}
                >
                  <Icon
                    className={cn(
                      "w-3.5 h-3.5 sm:w-4 sm:h-4 transition-colors flex-shrink-0",
                      isActive && "text-brand",
                    )}
                  />
                  <span className="text-xs sm:text-sm font-medium truncate">{feature.label}</span>
                  {isActive && (
                    <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 animate-in fade-in duration-300 flex-shrink-0 hidden sm:block" />
                  )}
                </div>
              )
            })}
          </div>

          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-start gap-3 sm:gap-4">
            <MagneticButton
              className="group relative overflow-hidden px-6 sm:px-8 py-3.5 sm:py-4 bg-brand text-brand-foreground rounded-full font-semibold text-sm sm:text-base glow-brand hover:glow-intense transition-all duration-300 w-full sm:w-auto justify-center"
              onClick={() => (window.location.href = "/contact")}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Solicită ofertă magazin
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-brand-light to-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </MagneticButton>

            <Link
              href="/portofoliu?category=magazin-online"
              className="group flex items-center justify-center gap-2.5 px-8 py-4 rounded-full border border-border/50 hover:border-brand/50 glass-premium transition-all duration-300"
            >
              <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-brand/10 group-hover:bg-brand/20 transition-colors">
                <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand ml-0.5" />
              </span>
              <span className="font-medium text-base">Vezi magazine lansate</span>
            </Link>
          </div>

          <div className="mt-8 sm:mt-12 flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-3 sm:gap-6">
            {trustBadges.map((badge, index) => (
              <div
                key={badge}
                className="flex items-center gap-2 text-xs sm:text-sm text-muted-foreground"
                style={{
                  animation: `fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${0.8 + index * 0.1}s forwards`,
                  opacity: 0,
                }}
              >
                <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 flex-shrink-0" />
                <span>{badge}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll Indicator - hidden on mobile */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden sm:flex">
        <span className="text-xs text-muted-foreground tracking-widest uppercase">Descoperă mai mult</span>
        <div className="w-px h-12 bg-gradient-to-b from-brand to-transparent" />
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
