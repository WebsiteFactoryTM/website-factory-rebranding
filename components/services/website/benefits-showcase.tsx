"use client"

import { useEffect, useState } from "react"
import { TrendingUp, Users, Clock, Search, Smartphone, Shield, Gauge, Award } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useCounter } from "@/hooks/use-counter"
import { FloatingElement } from "@/components/ui/floating-element"
import { cn } from "@/lib/utils"

const benefits = [
  {
    icon: TrendingUp,
    stat: 50,
    suffix: "%",
    label: "Creștere prerformață medie",
    description: "Clienții noștri văd o creștere semnificativă a performanței site-ului.",
    color: "text-green-500",
    bgColor: "bg-green-500/10",
  },
  {
    icon: Users,
    stat: 30,
    suffix: "%",
    label: "Rată de conversie",
    description: "Design-ul nostru UX este optimizat pentru a transforma vizitatori în clienți.",
    color: "text-brand",
    bgColor: "bg-brand/10",
  },
  {
    icon: Clock,
    stat: 1.2,
    suffix: "s",
    label: "Timp încărcare mediu",
    description: "Site-uri ultra-rapide care nu pierd vizitatori din cauza vitezei.",
    color: "text-glow-cyan",
    bgColor: "bg-glow-cyan/10",
  },
  {
    icon: Search,
    stat: 100,
    suffix: "%",
    label: "Scor SEO",
    description: "Optimizare completă pentru motoarele de căutare din prima zi.",
    color: "text-glow-violet",
    bgColor: "bg-glow-violet/10",
  },
]

const additionalBenefits = [
  { icon: Smartphone, label: "100% Responsive" },
  { icon: Shield, label: "SSL Securizat" },
  { icon: Gauge, label: "Core Web Vitals" },
  { icon: Award, label: "Best Practices" },
]

function AnimatedStat({ value, suffix, isVisible }: { value: number; suffix: string; isVisible: boolean }) {
  const { count } = useCounter({
    start: 0,
    end: isVisible ? value : 0,
    duration: 2000,
    startOnView: false,
  })
  return (
    <span className="font-heading text-4xl lg:text-5xl font-bold">
      {value < 10 ? count.toFixed(1) : Math.round(count)}
      {suffix}
    </span>
  )
}

export function BenefitsShowcase() {
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 })
  const [activeIndex, setActiveIndex] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (!isVisible) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % benefits.length)
      setProgress(0)
    }, 4000)
    return () => clearInterval(interval)
  }, [isVisible])

  useEffect(() => {
    if (!isVisible) return
    const startTime = Date.now()
    const duration = 4000

    const animate = () => {
      const elapsed = Date.now() - startTime
      const newProgress = Math.min(elapsed / duration, 1)
      setProgress(newProgress)
      if (newProgress < 1) {
        requestAnimationFrame(animate)
      }
    }
    requestAnimationFrame(animate)
  }, [activeIndex, isVisible])

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement
          className="absolute top-1/4 right-1/4 w-80 h-80 rounded-full bg-brand/5 blur-[100px]"
          delay={0}
          duration={15}
        />
        <FloatingElement
          className="absolute bottom-1/4 left-1/4 w-64 h-64 rounded-full bg-glow-violet/10 blur-[80px]"
          delay={2}
          duration={12}
        />
      </div>

      {/* Decorative metallic shapes */}
      <div className="absolute top-20 left-10 w-24 h-24 pointer-events-none hidden lg:block">
        <div
          className="w-full h-full metallic-surface rounded-3xl opacity-20"
          style={{ animation: "morph 16s ease-in-out infinite" }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div
          ref={ref}
          className={cn(
            "text-center mb-16 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <span className="inline-block text-sm font-medium text-brand tracking-widest uppercase mb-4">De ce noi?</span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold">
            Rezultate <span className="gradient-text">măsurabile</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Nu promitem - livrăm. Iată ce obțin clienții noștri în medie după lansarea site-ului.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            const isActive = index === activeIndex
            return (
              <div key={benefit.label} className="relative">
                {isActive && (
                  <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ zIndex: 10 }}>
                    <rect
                      x="1"
                      y="1"
                      width="calc(100% - 2px)"
                      height="calc(100% - 2px)"
                      rx="24"
                      ry="24"
                      fill="none"
                      stroke="url(#borderGradient)"
                      strokeWidth="2"
                      strokeDasharray="1000"
                      strokeDashoffset={1000 - progress * 1000}
                      className="transition-none"
                    />
                    <defs>
                      <linearGradient id="borderGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="hsl(var(--brand))" />
                        <stop offset="50%" stopColor="hsl(var(--glow-cyan))" />
                        <stop offset="100%" stopColor="hsl(var(--glow-violet))" />
                      </linearGradient>
                    </defs>
                  </svg>
                )}

                <div
                  className={cn(
                    "group relative p-6 lg:p-8 rounded-3xl border transition-all duration-500 cursor-default h-full",
                    isActive
                      ? "bg-card border-transparent shadow-xl scale-[1.02]"
                      : "bg-card/50 border-border hover:border-brand/30",
                  )}
                  onMouseEnter={() => {
                    setActiveIndex(index)
                    setProgress(0)
                  }}
                  style={{
                    animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.1}s forwards` : "none",
                    opacity: isVisible ? undefined : 0,
                  }}
                >
                  {isActive && (
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand/5 to-transparent pointer-events-none" />
                  )}

                  <div
                    className={cn(
                      "inline-flex items-center justify-center w-12 h-12 rounded-2xl mb-4 transition-transform duration-300",
                      benefit.bgColor,
                      isActive && "scale-110",
                    )}
                  >
                    <Icon className={cn("w-6 h-6", benefit.color)} />
                  </div>

                  <div className={cn("transition-colors", isActive ? benefit.color : "text-foreground")}>
                    <AnimatedStat value={benefit.stat} suffix={benefit.suffix} isVisible={isVisible} />
                  </div>

                  <p className="mt-2 font-semibold text-foreground">{benefit.label}</p>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{benefit.description}</p>
                </div>
              </div>
            )
          })}
        </div>

        {/* Additional Benefits Row */}
        <div className="flex flex-wrap justify-center gap-4">
          {additionalBenefits.map((item, index) => {
            const Icon = item.icon
            return (
              <div
                key={item.label}
                className="flex items-center gap-2 px-5 py-3 rounded-full glass-premium"
                style={{
                  animation: isVisible ? `fadeInUp 0.5s ease-out ${0.5 + index * 0.1}s forwards` : "none",
                  opacity: isVisible ? undefined : 0,
                }}
              >
                <Icon className="w-4 h-4 text-brand" />
                <span className="text-sm font-medium">{item.label}</span>
              </div>
            )
          })}
        </div>
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
