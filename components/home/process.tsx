"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { FloatingElement } from "@/components/ui/floating-element"
import { cn } from "@/lib/utils"
import { Search, PenTool, Code, CheckCircle, Rocket, TrendingUp } from "lucide-react"

const processSteps = [
  {
    step: 1,
    title: "Descoperire",
    description: "Analizăm obiectivele tale, publicul țintă și competiția pentru a crea strategia perfectă.",
    icon: Search,
  },
  {
    step: 2,
    title: "Design & Prototip",
    description: "Creăm wireframe-uri și design-uri interactive. Validăm deciziile importante înainte de implementare.",
    icon: PenTool,
  },
  {
    step: 3,
    title: "Dezvoltare",
    description: "Construim site-ul cu tehnologii moderne, cod curat și optimizare SEO în prim plan.",
    icon: Code,
  },
  {
    step: 4,
    title: "Testare & QA",
    description: "Testăm pe toate dispozitivele împreună cu clientul, optimizăm performanța și verificăm securitatea.",
    icon: CheckCircle,
  },
  {
    step: 5,
    title: "Lansare",
    description: "Publicăm site-ul, configurăm analytics și ne asigurăm că totul funcționează perfect.",
    icon: Rocket,
  },
  {
    step: 6,
    title: "Suport & Creștere",
    description: "Unde e cazul, oferim mentenanță continuă, monitorizare și optimizări bazate pe date reale.",
    icon: TrendingUp,
  },
]

export function Process() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>()
  const { ref: stepsRef, isVisible: stepsVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement
          className="absolute top-1/3 right-1/4 w-72 h-72 rounded-full bg-brand/5 blur-[100px]"
          delay={0}
          duration={11}
        />
        <FloatingElement
          className="absolute bottom-1/4 left-1/3 w-56 h-56 rounded-full bg-glow-cyan/8 blur-[80px]"
          delay={1.5}
          duration={9}
        />
      </div>

      <div
        className="absolute top-32 right-10 lg:right-32 w-16 h-16 lg:w-28 lg:h-28 metallic-surface rounded-2xl opacity-15"
        style={{ animation: "morph 12s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-32 left-10 lg:left-32 w-20 h-20 lg:w-32 lg:h-32 rounded-3xl blur-sm opacity-20"
        style={{
          background: "linear-gradient(135deg, var(--brand), var(--glow-violet))",
          animation: "morph 14s ease-in-out infinite reverse",
        }}
      />

      {/* Gradient background accent */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-secondary/30 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={cn(
            "max-w-3xl mx-auto text-center mb-16 lg:mb-20 transition-all duration-700",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <span className="inline-block text-sm font-medium text-brand tracking-widest uppercase mb-4">Cum lucrăm</span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Procesul nostru <span className="gradient-text">în 6 pași</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            O metodologie testată care garantează rezultate. Transparent, eficient, orientat spre obiective.
          </p>
        </div>

        {/* Process Steps Grid */}
        <div ref={stepsRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {processSteps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={step.step}
                className={cn(
                  "group relative p-8 rounded-3xl",
                  "bg-card/80 backdrop-blur-sm border border-border/50",
                  "transition-all duration-500",
                  "hover:border-brand/30 hover:shadow-xl hover:shadow-brand/5",
                  "card-metallic", // Added metallic effect
                  stepsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Step number and icon */}
                <div className="relative flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand to-brand-light flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:shadow-xl group-hover:shadow-brand/30 transition-all duration-500">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-background border-2 border-brand flex items-center justify-center text-xs font-bold text-brand">
                      {step.step}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <h3 className="relative font-heading text-xl font-bold text-foreground mb-3 group-hover:text-brand transition-colors">
                  {step.title}
                </h3>
                <p className="relative text-muted-foreground text-sm leading-relaxed">{step.description}</p>

                {/* Connection line (except last in row) */}
                {(index + 1) % 3 !== 0 && index !== processSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-px bg-gradient-to-r from-border to-transparent" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
