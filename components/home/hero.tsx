"use client"

import * as React from "react"
import Link from "next/link"
import { ArrowRight, Play, Sparkles } from "lucide-react"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { FloatingElement } from "@/components/ui/floating-element"
import { LiquidBlob } from "@/components/ui/liquid-blob"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"

export function Hero() {
  const { ref: badgeRef, isVisible: badgeVisible } = useScrollReveal()
  const { ref: ctaRef, isVisible: ctaVisible } = useScrollReveal()
  
  // Generate stable random values for floating particles to prevent hydration mismatch
  // Use deterministic values for SSR, then update with random values on client
  const [floatingParticles, setFloatingParticles] = React.useState(() => {
    // Deterministic values for SSR (prevents hydration mismatch)
    return Array.from({ length: 6 }, (_, i) => ({
      top: 15 + (i * 11.67) % 70,
      left: 5 + (i * 6.67) % 40,
      duration: 4 + (i * 0.5) % 3,
      distance: 8 + (i * 1.67) % 10,
    }))
  })

  React.useEffect(() => {
    // Generate random values only on client after mount
    setFloatingParticles(
      Array.from({ length: 6 }, () => ({
        top: 15 + Math.random() * 70,
        left: 5 + Math.random() * 40,
        duration: 4 + Math.random() * 3,
        distance: 8 + Math.random() * 10,
      }))
    )
  }, [])

  return (
    <section className="relative min-h-[100svh] flex items-center justify-center overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-gradient" />
      <div className="absolute inset-0 grid-pattern" />

      {/* Noise overlay for texture */}
      <div className="absolute inset-0 noise-overlay pointer-events-none" />

      <div className="absolute inset-0 flex items-center justify-center lg:right-0 lg:left-auto lg:w-1/2 pointer-events-none lg:pointer-events-auto">
        {/* Mobile: centered behind content, semi-transparent */}
        {/* Desktop: right side, fully interactive */}
        <div className="w-[280px] h-[280px] sm:w-[350px] sm:h-[350px] md:w-[400px] md:h-[400px] lg:w-full lg:h-full lg:max-w-2xl lg:max-h-2xl opacity-40 sm:opacity-50 lg:opacity-100">
          <LiquidBlob interactive className="scale-100" />
        </div>
      </div>

      {/* Animated gradient orbs - repositioned for balance */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement
          className="absolute top-1/4 -left-20 w-48 h-48 md:w-64 md:h-64 rounded-full bg-brand/10 blur-[60px] md:blur-[80px]"
          delay={0}
          duration={8}
        />
        <FloatingElement
          className="absolute bottom-1/3 left-1/4 w-32 h-32 md:w-48 md:h-48 rounded-full bg-glow-cyan/10 blur-[40px] md:blur-[60px]"
          delay={1}
          duration={10}
        />
      </div>

      {/* Decorative floating particles - fewer on mobile */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none hidden sm:block">
        {floatingParticles.map((particle, i) => (
          <FloatingElement
            key={i}
            className={cn(
              "absolute w-1 h-1 rounded-full",
              i % 3 === 0 ? "bg-brand/60" : i % 3 === 1 ? "bg-glow-violet/60" : "bg-glow-cyan/40",
            )}
            style={{
              top: `${particle.top}%`,
              left: `${particle.left}%`,
            }}
            delay={i * 0.5}
            duration={particle.duration}
            distance={particle.distance}
          />
        ))}
      </div>

      {/* Main Content - Left aligned on desktop, centered on mobile */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20 relative z-10">
        <div className="max-w-3xl lg:max-w-2xl mx-auto lg:mx-0 text-center lg:text-left py-2">
          {/* Badge */}
          <div
            ref={badgeRef}
            className={cn(
              "inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full glass-premium mb-6 sm:mb-8 md:mb-10 transition-all duration-700",
              badgeVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
            )}
          >
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand animate-pulse" />
            <span className="text-xs sm:text-sm font-medium text-foreground/80">
              Web design in Timisoara
            </span>
          </div>

          <h1 className="font-heading text-5xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight">
            <span className="text-foreground">De la idee la soluție</span>
            <br />
            <span className="text-foreground">digitală pentru</span>
            <br />
            <span
              className="gradient-text-animated"
              style={{
                animation: "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.9s forwards",
                opacity: 0,
                transform: "translateY(20px)",
              }}
            >
              afacerea ta.
              {/* Decorative underline */}
              <svg
                className="w-full h-2 sm:h-3 mt-1"
                viewBox="0 0 100 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                preserveAspectRatio="none"
              >
                <path
                  d="M1 5.5C25 2 75 2 99 5.5"
                  stroke="url(#underlineGrad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  className="animate-[dash_2s_ease-in-out_infinite]"
                  strokeDasharray="100"
                  strokeDashoffset="0"
                />
                <defs>
                  <linearGradient id="underlineGrad" x1="0" y1="0" x2="100" y2="0" gradientUnits="userSpaceOnUse">
                    <stop stopColor="oklch(0.4 0.2 270)" />
                    <stop offset="0.5" stopColor="oklch(0.7 0.22 290)" />
                    <stop offset="1" stopColor="oklch(0.8 0.18 195)" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>

          {/* Subtitle */}
          <div className="mt-5 sm:mt-6 md:mt-8 max-w-xl mx-auto lg:mx-0">
            <p
              className="text-base sm:text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty"
              style={{
                animation: "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.1s forwards",
                opacity: 0,
                transform: "translateY(20px)",
              }}
            >
              Transformăm viziunea ta într-un site care atrage clienți, convertește vizitatori și crește vizibilitatea în Google.
            </p>
          </div>

          {/* CTAs - Stack on mobile */}
          <div
            ref={ctaRef}
            className={cn(
              "mt-8 sm:mt-10 md:mt-12 flex flex-col sm:flex-row items-center lg:items-start gap-3 sm:gap-4 transition-all duration-700 delay-500",
              ctaVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
            )}
          >
            <MagneticButton
              className="group relative overflow-hidden w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-brand text-brand-foreground rounded-full font-semibold text-sm sm:text-base glow-brand hover:glow-intense transition-all duration-300"
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
              className="group flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 rounded-full border border-border/50 hover:border-brand/50 glass-premium transition-all duration-300 hover:glow-subtle"
            >
              <span className="flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-brand/10 group-hover:bg-brand/20 transition-colors">
                <Play className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-brand ml-0.5" />
              </span>
              <span className="font-medium text-sm sm:text-base text-foreground">Vezi portofoliu</span>
            </Link>
          </div>

          {/* Proof Line - horizontal scroll on mobile */}
          <div
            className="mt-10 sm:mt-12 md:mt-16 flex flex-wrap justify-center lg:justify-start items-center gap-x-4 sm:gap-x-6 md:gap-x-8 gap-y-2 sm:gap-y-3 text-xs sm:text-sm text-muted-foreground"
            style={{
              animation: "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 1.4s forwards",
              opacity: 0,
              transform: "translateY(20px)",
            }}
          >
            <span className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-green-500 animate-pulse" />
              SEO - în prim plan
            </span>
            <span className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-brand" />
              Performanță maximă
            </span>
            <span className="flex items-center gap-1.5 sm:gap-2">
              <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-glow-violet" />
              Conversii măsurabile
            </span>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-24 sm:bottom-28 left-1/2 -translate-x-1/2 flex lg:hidden items-center gap-2 text-xs text-muted-foreground/60"
        style={{
          animation: "fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) 2s forwards",
          opacity: 0,
        }}
      >
        <span className="inline-block w-6 h-6 rounded-full border border-muted-foreground/30 animate-pulse" />
        <span>Atinge sfera</span>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 sm:gap-2">
        <span className="text-[10px] sm:text-xs text-muted-foreground tracking-widest uppercase">Scroll</span>
        <div className="w-px h-8 sm:h-12 bg-gradient-to-b from-brand to-transparent" />
      </div>

      {/* Keyframe animations */}
      <style jsx>{`
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes dash {
          0%, 100% {
            stroke-dashoffset: 0;
          }
          50% {
            stroke-dashoffset: 50;
          }
        }
      `}</style>
    </section>
  )
}
