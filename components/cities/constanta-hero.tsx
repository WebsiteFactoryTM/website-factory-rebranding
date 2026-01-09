"use client"

import Link from "next/link"
import { ArrowRight, Play, MapPin, Check, Anchor } from "lucide-react"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { FloatingElement } from "@/components/ui/floating-element"
import { ConstantaBlob } from "@/components/cities/constanta-blob"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"

const trustBadges = ["SEO optimizat Constanța", "Design premium", "Suport dedicat"]

export function ConstantaHero() {
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal()

  return (
    <section className="relative min-h-[100svh] flex items-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 grid-pattern" />
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      {/* Animated gradient orbs - turquoise/sea themed */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement
          className="absolute top-1/4 right-1/4 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-cyan-500/15 blur-[120px]"
          delay={0}
          duration={12}
        />
        <FloatingElement
          className="absolute bottom-1/4 left-1/4 w-48 sm:w-72 h-48 sm:h-72 rounded-full bg-brand/20 blur-[100px]"
          delay={2}
          duration={10}
        />
      </div>

      {/* Decorative metallic shapes */}
      <div className="absolute top-32 right-4 sm:right-10 lg:right-32 w-12 h-12 sm:w-20 sm:h-20 lg:w-32 lg:h-32 pointer-events-none">
        <div
          className="w-full h-full metallic-surface rounded-3xl opacity-30"
          style={{ animation: "morph 14s ease-in-out infinite" }}
        />
      </div>

      {/* Mobile/Tablet: Behind content */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none lg:hidden">
        <div className="w-full h-full max-w-md opacity-30">
          <ConstantaBlob className="w-full h-full" size="sm" />
        </div>
      </div>

      {/* Desktop: Full size on right side */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[55%] h-[80%] hidden lg:flex items-center justify-center pointer-events-auto">
        <ConstantaBlob className="w-full h-full" size="lg" />
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
          {/* Location Badge */}
          <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full glass-premium mb-6 sm:mb-8">
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-500" />
            <span className="text-xs sm:text-sm font-medium">Servicii web design pentru Constanța</span>
            <Anchor className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-blue-500" />
          </div>

          {/* Main Heading - SEO H1 */}
          <h1 className="font-heading text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-[1.1]">
            <span className="text-foreground">Creare Site</span>
            <br />
            <span className="gradient-text-animated">Constanța</span>
            <br />
            <span className="text-foreground/80 text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Web Design Litoral</span>
          </h1>

          {/* Subtitle */}
          <p className="mt-4 sm:mt-6 text-base sm:text-lg lg:text-xl text-muted-foreground leading-relaxed max-w-2xl text-pretty">
            Agenție de web design specializată în soluții digitale pentru{" "}
            <strong className="text-foreground">afaceri din Constanța și litoralul românesc</strong>. Site-uri moderne
            pentru turism, HoReCa, transport maritim și servicii locale.
          </p>

          {/* Stats */}
          <div className="mt-6 sm:mt-8 grid grid-cols-3 gap-4 sm:gap-6 max-w-lg">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text">40+</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Proiecte Litoral</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text">98%</div>
              <div className="text-xs sm:text-sm text-muted-foreground">Satisfacție</div>
            </div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold gradient-text">Top 3</div>
              <div className="text-xs sm:text-sm text-muted-foreground">SEO Rankings</div>
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-stretch sm:items-start gap-3 sm:gap-4">
            <MagneticButton
              className="group relative overflow-hidden px-6 sm:px-8 py-3.5 sm:py-4 bg-brand text-brand-foreground rounded-full font-semibold text-sm sm:text-base glow-brand hover:glow-intense transition-all duration-300 w-full sm:w-auto justify-center"
              onClick={() => (window.location.href = "/contact")}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Solicită ofertă gratuită
                <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-brand-light to-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </MagneticButton>

            <Link
              href="/portofoliu"
              className="group flex items-center justify-center gap-3 px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border border-border/50 hover:border-cyan-500/50 glass-premium transition-all duration-300"
            >
              <span className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors">
                <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-500 ml-0.5" />
              </span>
              <span className="font-medium text-sm sm:text-base">Vezi portofoliu</span>
            </Link>
          </div>

          {/* Trust badges */}
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

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex-col items-center gap-2 hidden sm:flex">
        <span className="text-xs text-muted-foreground tracking-widest uppercase">Descoperă</span>
        <div className="w-px h-12 bg-gradient-to-b from-cyan-500 to-transparent" />
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
