"use client"

import { useCounter } from "@/hooks/use-counter"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"

const metrics = [
  { value: 150, suffix: "+", label: "Proiecte livrate" },
  { value: 5, suffix: "+", label: "Ani experiență" },
  { value: 100, suffix: "%", label: "SEO - în prim plan" },
  { value: 150, suffix: "+", label: "Clienți mulțumiți" },
]

const marqueeWords = [
  "Web Design",
  "E-Commerce",
  "Optimizare SEO",
  "UI/UX Design",
  "Aplicații mobile",
  "Identitate de brand",
  "Performanță",
  "Conversii",
  "Timișoara",
  "România",
]

function CounterItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const { count, ref } = useCounter({ end: value, duration: 2000 })

  return (
    <div ref={ref} className="text-center group">
      <div className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold counter-animate">
        <span className="bg-gradient-to-r from-brand via-brand-light to-glow-violet bg-clip-text text-transparent bg-[length:200%_auto] animate-[gradient-shift_4s_ease_infinite]">
          {count}
          {suffix}
        </span>
      </div>
      <div className="mt-2 text-sm md:text-base text-muted-foreground group-hover:text-foreground transition-colors">
        {label}
      </div>
    </div>
  )
}

export function TrustStrip() {
  const { ref, isVisible } = useScrollReveal<HTMLElement>()

  return (
    <section
      ref={ref}
      className={cn(
        "py-16 lg:py-24 relative overflow-hidden transition-all duration-1000",
        isVisible ? "opacity-100" : "opacity-0",
      )}
    >
      {/* Subtle background */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/30 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section label */}
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-brand tracking-widest uppercase">De ce să ne alegi</span>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {metrics.map((metric, index) => (
            <div
              key={metric.label}
              style={{
                transitionDelay: `${index * 100}ms`,
              }}
              className={cn(
                "transition-all duration-700",
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
              )}
            >
              <CounterItem {...metric} />
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />

        {/* Marquee container */}
        <div className="overflow-hidden">
          <div className="marquee-infinite whitespace-nowrap">
            {/* Duplicate content for seamless loop */}
            {[...Array(2)].map((_, setIndex) => (
              <div key={setIndex} className="inline-flex items-center">
                {marqueeWords.map((word, index) => (
                  <span key={`${setIndex}-${index}`} className="inline-flex items-center mx-8">
                    <span className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-outline text-muted-foreground/20 hover:text-foreground transition-colors duration-300 cursor-default">
                      {word}
                    </span>
                    <span className="mx-8 w-2 h-2 rounded-full bg-gradient-to-r from-brand to-glow-violet" />
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
