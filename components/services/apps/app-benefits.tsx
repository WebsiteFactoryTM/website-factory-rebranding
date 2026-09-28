"use client"

import { useEffect, useRef, useState } from "react"
import { useLocale } from "next-intl"
import type { Locale } from "@/i18n/routing"
import { Zap, TrendingUp, Clock, Users } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useCounter } from "@/hooks/use-counter"
import { cn } from "@/lib/utils"

const roCopy = {
  eyebrow: "Rezultate măsurabile",
  headingPre: "De ce să alegi ",
  headingHighlight: "aplicații custom",
  headingEnd: "?",
  subtitle: "Aplicațiile dezvoltate de noi generează rezultate concrete pentru clienții noștri.",
  stats: [
    {
      value: 280,
      suffix: "%",
      label: "Creștere engagement",
      description: "Aplicațiile mobile cresc interacțiunea",
    },
    {
      value: 99.9,
      suffix: "%",
      label: "Uptime garantat",
      description: "Infrastructură cloud redundantă",
      decimals: 1,
    },
    {
      value: 50,
      suffix: "K+",
      label: "Utilizatori activi",
      description: "În aplicațiile dezvoltate de noi",
    },
    {
      value: 0.8,
      suffix: "s",
      label: "Timp de încărcare",
      description: "Performanță optimizată",
      decimals: 1,
    },
  ],
}

const copy = { ro: roCopy, en: roCopy } satisfies Record<Locale, typeof roCopy>

const statIcons = [TrendingUp, Clock, Users, Zap]

function AnimatedStat({
  stat,
  isActive,
}: {
  stat: (typeof roCopy.stats)[0] & { icon: (typeof statIcons)[number] }
  isActive: boolean
}) {
  const { count, ref } = useCounter({
    start: 0,
    end: stat.value,
    duration: 2000,
    startOnView: true,
  })
  const Icon = stat.icon

  return (
    <div
      ref={ref}
      className={cn(
        "relative p-6 sm:p-8 rounded-2xl border transition-all duration-500 group overflow-hidden",
        isActive ? "bg-brand/5 border-brand/30 scale-[1.02]" : "bg-card/50 border-border/50 hover:border-brand/20",
      )}
    >
      {/* Animated border */}
      {isActive && (
        <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ borderRadius: "inherit" }}>
          <rect
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            rx="15"
            ry="15"
            fill="none"
            stroke="url(#borderGradientApps)"
            strokeWidth="2"
            strokeDasharray="1000"
            strokeDashoffset="1000"
            style={{
              animation: "drawBorder 4s linear forwards",
            }}
          />
          <defs>
            <linearGradient id="borderGradientApps" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="oklch(0.4 0.2 270)" />
              <stop offset="50%" stopColor="oklch(0.8 0.18 195)" />
              <stop offset="100%" stopColor="oklch(0.7 0.22 290)" />
            </linearGradient>
          </defs>
        </svg>
      )}

      <div className="relative z-10">
        <div
          className={cn(
            "w-12 h-12 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300",
            isActive ? "bg-brand/20" : "bg-muted",
          )}
        >
          <Icon
            className={cn("w-6 h-6 sm:w-7 sm:h-7 transition-colors", isActive ? "text-brand" : "text-muted-foreground")}
          />
        </div>
        <div className="flex items-baseline gap-1 mb-2">
          <span className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
            {stat.decimals ? count.toFixed(stat.decimals) : Math.round(count)}
          </span>
          <span className="text-xl sm:text-2xl font-bold text-brand">{stat.suffix}</span>
        </div>
        <h3 className="font-semibold text-base sm:text-lg mb-1">{stat.label}</h3>
        <p className="text-sm text-muted-foreground">{stat.description}</p>
      </div>

      {/* Corner glow */}
      {isActive && (
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand/20 rounded-full blur-3xl pointer-events-none" />
      )}

      <style jsx>{`
        @keyframes drawBorder {
          to {
            stroke-dashoffset: 0;
          }
        }
      `}</style>
    </div>
  )
}

export function AppBenefits() {
  const locale = useLocale()
  const t = copy[locale as Locale]
  const stats = t.stats.map((s, i) => ({ ...s, icon: statIcons[i] }))
  const { ref, isVisible } = useScrollReveal()
  const [activeIndex, setActiveIndex] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | undefined>(undefined)

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stats.length)
    }, 4000)
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [stats.length])

  const handleHover = (index: number) => {
    setActiveIndex(index)
    if (intervalRef.current) clearInterval(intervalRef.current)
  }

  return (
    <section ref={ref} className="relative py-20 sm:py-28 lg:py-32 overflow-hidden bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={cn(
            "text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4 text-brand" />
            {t.eyebrow}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            {t.headingPre}
            <span className="gradient-text">{t.headingHighlight}</span>
            {t.headingEnd}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground text-pretty">{t.subtitle}</p>
        </div>

        {/* Stats Grid */}
        <div
          className={cn(
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 transition-all duration-700 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          {stats.map((stat, index) => (
            <div key={stat.label} onMouseEnter={() => handleHover(index)} onTouchStart={() => handleHover(index)}>
              <AnimatedStat stat={stat} isActive={activeIndex === index} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
