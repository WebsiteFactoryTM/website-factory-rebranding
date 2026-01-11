"use client"

import { TrendingUp, Clock, Search, Users } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useCounter } from "@/hooks/use-counter"
import { cn } from "@/lib/utils"

interface CityBenefitsProps {
  cityName: string
}

const getBenefits = (cityName: string) => {
  const isBrasov = cityName === "Brașov"
  const isBucharest = cityName === "București"
  const isCluj = cityName.includes("Cluj")
  const isConstanta = cityName === "Constanța"
  const isIasi = cityName === "Iași"

  return [
    {
      icon: TrendingUp,
      stat: 50,
      suffix: "%",
      label: "Creștere medie performanță",
      description: `Clienții noștri din ${cityName} văd o creștere semnificativă a performanței site-ului`,
    },
    {
      icon: Clock,
      stat: 1.2,
      suffix: "s",
      decimals: 1,
      label: "Timp  mediu de încărcare",
      description: "Site-uri ultra-rapide optimizate pentru Core Web Vitals",
    },
    {
      icon: Search,
      stat: 100,
      suffix: "%",
      decimals: 1,
      label: "Scor SEO",
      description: "Optimizare completă pentru motoarele de căutare",
    },
    {
      icon: Users,
      stat: isBrasov ? 30 : isBucharest ? 30 : isCluj ? 40 : isConstanta ? 30 : 35,
      suffix: "%",
      label: `Creștere conversie ${cityName}`,
      description: isBrasov
        ? "Design UX optimizat pentru Pensiuni, restaurante și afaceri locale din Brașov"
        : isBucharest
          ? "Design UX optimizat pentru afaceri din capitală"
          : isCluj
            ? "Design UX optimizat pentru Startup-uri și companii tech din Cluj"
            : isConstanta
              ? "Design UX optimizat pentru Hoteluri, restaurante și afaceri de pe litoral"
              : "Design UX optimizat pentru Clinici medicale, afaceri și instituții din Iași",
    },
  ]
}

function AnimatedStat({ end, decimals = 0, suffix = "" }: { end: number; decimals?: number; suffix?: string }) {
  const { count, ref } = useCounter({ start: 0, end, duration: 2000, startOnView: true })

  return (
    <span ref={ref} className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold gradient-text tabular-nums">
      {typeof count === "number" ? count.toFixed(decimals) : count}
      {suffix}
    </span>
  )
}

export function CityBenefits({ cityName }: CityBenefitsProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>()
  const benefits = getBenefits(cityName)
  const isBrasov = cityName === "Brașov"

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden bg-muted/30">
      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-brand/10 blur-[80px]" />
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-glow-violet/10 blur-[100px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div
          ref={ref}
          className={cn(
            "text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold">
            De ce să alegi <span className="gradient-text">Website Factory</span> în {cityName}?
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            {isBrasov
              ? "Rezultate măsurabile pentru afacerea ta din inima Transilvaniei."
              : cityName === "București"
                ? "Rezultate măsurabile și garanții concrete pentru afacerea ta din capitală."
                : cityName.includes("Cluj")
                  ? "Rezultate măsurabile pentru startup-uri și companii tech din Cluj."
                  : cityName === "Constanța"
                    ? "Rezultate măsurabile pentru afaceri turistice de pe litoralul românesc."
                    : "Rezultate măsurabile pentru clinici medicale și afaceri din Iași și Moldova."}
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div
                key={benefit.label}
                className={cn(
                  "relative p-6 sm:p-8 rounded-2xl glass-premium border border-border/30 text-center transition-all duration-500",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 rounded-xl bg-brand/10 flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-7 h-7 text-brand" />
                </div>

                <AnimatedStat end={benefit.stat} decimals={benefit.decimals || 0} suffix={benefit.suffix} />

                <h3 className="font-semibold text-foreground mt-2 mb-1">{benefit.label}</h3>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
