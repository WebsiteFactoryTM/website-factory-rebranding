"use client"

import Link from "next/link"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"
import { Rocket, Users, Award, Globe, Target, Zap } from "lucide-react"

const milestones = [
  {
    year: "2023",
    title: "Începutul",
    description: "Website Factory ia naștere în Timișoara. Primele 21 proiecte livrate.",
    icon: Rocket,
  },
  {
    year: "2024",
    title: "Creștere",
    description: "Echipa se extinde. Cifra de afaceri crește cu 171%. Primii clienți din străinătate.",
    icon: Users,
  },
  {
    year: "2025",
    title: "Inovație",
    description: (
      <>
        Menținem proiectele, continuăm să livrăm proiecte de calitate. Lansăm{" "}
        <Link
          href="https://unevent.ro"
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand hover:underline font-medium"
        >
          UN:EVENT - Platforma de evenimente
        </Link>
        .
      </>
    ),
    icon: Target,
  },
  {
    year: "Viitor",
    title: "Viziune",
    description: "Continuăm să inovăm și să ajutăm afacerile să își dezvolte proiectele în spațiul digital.",
    icon: Zap,
  },
]

export function TimelineSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal()

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-muted/30">
      {/* Background */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className={cn(
            "text-center max-w-3xl mx-auto mb-16 lg:mb-20 transition-all duration-1000",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <span className="inline-block text-sm font-medium text-brand tracking-widest uppercase mb-4">
            Evoluția noastră
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            De la startup la <span className="gradient-text">lider regional</span>
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-brand via-glow-violet to-glow-cyan md:-translate-x-1/2" />

          {/* Milestones */}
          <div className="space-y-12">
            {milestones.map((milestone, index) => (
              <TimelineItem key={milestone.year} milestone={milestone} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function TimelineItem({
  milestone,
  index,
}: {
  milestone: (typeof milestones)[0]
  index: number
}) {
  const { ref, isVisible } = useScrollReveal()
  const Icon = milestone.icon
  const isEven = index % 2 === 0

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex items-start gap-8 transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        "pl-12 md:pl-0",
        isEven ? "md:flex-row" : "md:flex-row-reverse",
      )}
      style={{ transitionDelay: `${index * 150}ms` }}
    >
      {/* Content */}
      <div className={cn("flex-1", isEven ? "md:text-right md:pr-12" : "md:pl-12")}>
        <div
          className={cn(
            "inline-block p-6 rounded-2xl bg-card border border-border/50 card-metallic",
            isEven ? "md:ml-auto" : "",
          )}
        >
          <span className="font-heading text-2xl font-bold gradient-text">{milestone.year}</span>
          <h3 className="font-heading text-lg font-semibold text-foreground mt-2 mb-2">{milestone.title}</h3>
          <div className="text-sm text-muted-foreground leading-relaxed max-w-xs">
            {milestone.description}
          </div>
        </div>
      </div>

      {/* Center icon - positioned on the line */}
      <div className="absolute left-0 md:left-1/2 md:-translate-x-1/2 w-8 h-8 rounded-full bg-brand flex items-center justify-center glow-brand z-10">
        <Icon className="w-4 h-4 text-brand-foreground" />
      </div>

      {/* Empty space for the other side */}
      <div className="hidden md:block flex-1" />
    </div>
  )
}
