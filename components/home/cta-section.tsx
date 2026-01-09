"use client"

import Link from "next/link"
import { ArrowRight, MessageCircle, Sparkles } from "lucide-react"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { FloatingElement } from "@/components/ui/floating-element"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"

export function CTASection() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>()

  return (
    <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden">
      {/* Animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-brand via-brand-dark to-brand" />
      <div className="absolute inset-0 hero-gradient opacity-50" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement
          className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/10 blur-[80px]"
          delay={0}
          duration={8}
        />
        <FloatingElement
          className="absolute -bottom-20 -right-20 w-96 h-96 rounded-full bg-glow-cyan/20 blur-[100px]"
          delay={2}
          duration={10}
        />
        <FloatingElement
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-glow-violet/10 blur-[120px]"
          delay={1}
          duration={9}
        />
      </div>

      <div
        className="absolute top-10 right-10 lg:right-20 w-32 h-32 lg:w-48 lg:h-48 rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-20"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.4), rgba(255,255,255,0.1))",
          animation: "morph 15s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-10 left-10 lg:left-20 w-24 h-24 lg:w-36 lg:h-36 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-sm opacity-25"
        style={{
          background: "linear-gradient(135deg, rgba(0,245,255,0.3), rgba(255,255,255,0.2))",
          animation: "morph 12s ease-in-out infinite reverse",
        }}
      />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement
          className="absolute top-20 left-[20%] w-3 h-3 rounded-full bg-white/40 shadow-lg shadow-white/20"
          delay={0}
          duration={5}
          distance={15}
        />
        <FloatingElement
          className="absolute top-32 right-[25%] w-4 h-4 rounded-full bg-glow-cyan/50 shadow-lg shadow-glow-cyan/30"
          delay={1}
          duration={6}
          distance={12}
        />
        <FloatingElement
          className="absolute bottom-24 left-[30%] w-2 h-2 rounded-full bg-white/60"
          delay={2}
          duration={7}
          distance={18}
        />
        <FloatingElement
          className="absolute top-1/3 right-[15%] w-2 h-2 rounded-full bg-glow-violet/50"
          delay={0.5}
          duration={8}
          distance={10}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div
          className={cn(
            "max-w-4xl mx-auto text-center transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
          )}
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-8">
            <Sparkles className="w-4 h-4 text-white animate-pulse" />
            <span className="text-sm font-medium text-white/90">Consultanță gratuită</span>
          </div>

          {/* Heading */}
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-white text-balance leading-tight">
            Gata să-ți transformi{" "}
            <span className="relative inline-block">
              prezența online
              <svg
                className="absolute -bottom-2 left-0 w-full"
                viewBox="0 0 200 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 5.5C47.6667 2.16667 141 -2.4 199 5.5"
                  stroke="rgba(255,255,255,0.5)"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            ?
          </h2>

          <p className="mt-6 text-lg md:text-xl text-white/80 max-w-2xl mx-auto">
            Hai să povestim despre proiectul tău. Abia așteptăm să te cunoaștem!
          </p>

          {/* CTAs */}
          <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton
              className="group relative overflow-hidden px-8 py-4 bg-white text-brand rounded-full font-semibold text-base shadow-2xl hover:shadow-white/20 transition-all duration-300"
              onClick={() => (window.location.href = "/contact")}
            >
              <span className="relative z-10 flex items-center gap-2">
                Solicită ofertă gratuită
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
              </span>
            </MagneticButton>

            <Link
              href="/contact"
              className="group flex items-center gap-3 px-8 py-4 rounded-full border border-white/30 hover:border-white/50 bg-white/5 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
            >
              <MessageCircle className="w-5 h-5 text-white" />
              <span className="font-medium text-white">Discută cu noi</span>
            </Link>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-white/70">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse shadow-lg shadow-green-400/50" />
              Fără obligații
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-glow-cyan shadow-lg shadow-glow-cyan/50" />
              Răspuns în maxim 24h
            </span>
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-glow-violet shadow-lg shadow-glow-violet/50" />
              Ofertă personalizată
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
