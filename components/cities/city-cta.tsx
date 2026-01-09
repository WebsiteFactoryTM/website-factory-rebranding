"use client"

import Link from "next/link"
import { ArrowRight, Phone } from "lucide-react"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { FloatingElement } from "@/components/ui/floating-element"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"

interface CityCTAProps {
  cityName: string
}

export function CityCTA({ cityName }: CityCTAProps) {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-background to-glow-violet/10" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Decorative blobs */}
      <FloatingElement
        className="absolute top-10 left-10 w-64 h-64 rounded-full bg-brand/20 blur-[100px]"
        delay={0}
        duration={10}
      />
      <FloatingElement
        className="absolute bottom-10 right-10 w-48 h-48 rounded-full bg-glow-cyan/15 blur-[80px]"
        delay={1}
        duration={12}
      />

      {/* Metallic shapes */}
      <div className="absolute top-20 right-20 w-24 h-24 pointer-events-none hidden lg:block">
        <div
          className="w-full h-full metallic-surface rounded-2xl opacity-40"
          style={{ animation: "morph 12s ease-in-out infinite" }}
        />
      </div>
      <div className="absolute bottom-20 left-20 w-16 h-16 pointer-events-none hidden lg:block">
        <div
          className="w-full h-full bg-gradient-to-br from-glow-cyan/50 to-brand/40 rounded-xl blur-sm opacity-50"
          style={{ animation: "morph 10s ease-in-out infinite reverse" }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div
          ref={ref}
          className={cn(
            "max-w-4xl mx-auto text-center transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold mb-6">
            Pregătit să-ți transformi <span className="gradient-text-animated">afacerea din {cityName}?</span>
          </h2>
          <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Hai să discutăm despre proiectul tău. Oferim consultanță gratuită și o estimare personalizată pentru nevoile
            afacerii tale.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <MagneticButton
              className="group relative overflow-hidden w-full sm:w-auto px-8 py-4 bg-brand text-brand-foreground rounded-full font-semibold text-base glow-brand hover:glow-intense transition-all duration-300"
              onClick={() => (window.location.href = "/contact")}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Solicită ofertă gratuită
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-brand-light to-brand opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </MagneticButton>

            <Link
              href="tel:+40700000000"
              className="group flex items-center justify-center gap-3 w-full sm:w-auto px-8 py-4 rounded-full border border-border/50 hover:border-brand/50 glass-premium transition-all duration-300"
            >
              <Phone className="w-5 h-5 text-brand" />
              <span className="font-medium">Sună-ne direct</span>
            </Link>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Răspuns în 24h
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-brand" />
              Consultanță gratuită
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-glow-violet" />
              Fără obligații
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
