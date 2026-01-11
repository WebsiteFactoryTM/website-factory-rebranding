"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, ArrowUpRight } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { FloatingElement } from "@/components/ui/floating-element"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { featuredProjects } from "@/lib/portfolio-data"
import { generatePortfolioShowcaseAltText } from "@/lib/image-alt-text"

// Map category to color gradient
const getColorByCategory = (category: string): string => {
  switch (category) {
    case "custom":
      return "from-brand to-brand-light"
    case "ecommerce":
      return "from-glow-violet to-brand"
    case "website":
      return "from-glow-cyan to-glow-violet"
    case "app":
      return "from-glow-cyan to-brand"
    default:
      return "from-brand to-brand-light"
  }
}

// Transform featured projects to case studies format
const caseStudies = featuredProjects.slice(0, 3).map((project) => {
  const firstResult = project.results[0]
  const outcome = firstResult
    ? `${firstResult.value} ${firstResult.label}`
    : "Rezultate măsurabile"

  return {
    id: project.id,
    title: project.title,
    industry: project.categoryLabel,
    outcome,
    description: project.shortDescription || project.description,
    image: project.image,
    href: `/portofoliu/${project.slug}`,
    color: getColorByCategory(project.category),
    altText: generatePortfolioShowcaseAltText(
      project.title,
      project.category,
      outcome,
    ),
  }
})

export function FeaturedWork() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>()
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-secondary/20">
      {/* Background pattern */}
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement
          className="absolute top-1/4 left-1/4 w-80 h-80 rounded-full bg-brand/8 blur-[100px]"
          delay={0}
          duration={12}
        />
        <FloatingElement
          className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-glow-violet/10 blur-[80px]"
          delay={2}
          duration={10}
        />
      </div>

      <div
        className="absolute top-10 left-10 lg:left-20 w-24 h-24 lg:w-40 lg:h-40 metallic-surface rounded-[40%_60%_70%_30%/40%_50%_60%_50%] opacity-15"
        style={{ animation: "morph 16s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-20 right-10 lg:right-20 w-20 h-20 lg:w-32 lg:h-32 rounded-[60%_40%_30%_70%/60%_30%_70%_40%] blur-sm opacity-20"
        style={{
          background: "linear-gradient(135deg, var(--glow-cyan), var(--glow-violet))",
          animation: "morph 13s ease-in-out infinite reverse",
        }}
      />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={cn(
            "flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 lg:mb-20 transition-all duration-700",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="max-w-2xl">
            <span className="inline-block text-sm font-medium text-brand tracking-widest uppercase mb-4">
              Portofoliu
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              Proiecte care <span className="gradient-text">generează rezultate</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground">
              Rezultate măsurabile pentru clienți din diverse industrii.
            </p>
          </div>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="self-start lg:self-auto group border-border/50 hover:border-brand/50 hover:glow-subtle bg-transparent"
          >
            <Link href="/portofoliu">
              Vezi toate proiectele
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>

        {/* Case Studies Grid */}
        <div ref={gridRef} className="grid lg:grid-cols-3 gap-6 lg:gap-8">
          {caseStudies.map((study, index) => (
            <Link
              key={study.id}
              href={study.href}
              className={cn(
                "group relative rounded-3xl overflow-hidden",
                "bg-card border border-border/50",
                "transition-all duration-500 ease-out",
                "hover:border-brand/30 hover:shadow-2xl hover:shadow-brand/5",
                "card-lift",
                gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
              )}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Image */}
              <div className="aspect-[4/3] relative overflow-hidden">
                <Image
                  src={study.image || "/placeholder.svg"}
                  alt={study.altText || study.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                {/* Gradient overlay */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent",
                    "opacity-60 group-hover:opacity-80 transition-opacity duration-500",
                  )}
                />

                {/* Industry badge */}
                <div className="absolute top-4 left-4">
                  <span
                    className={cn(
                      "px-3 py-1.5 rounded-full text-xs font-medium text-white",
                      "bg-gradient-to-r",
                      study.color,
                      "shadow-lg",
                    )}
                  >
                    {study.industry}
                  </span>
                </div>

                {/* Arrow indicator */}
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:scale-110">
                  <ArrowUpRight className="w-5 h-5 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 lg:p-8">
                <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-brand transition-colors">
                  {study.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{study.description}</p>
                <div
                  className={cn(
                    "inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold",
                    "bg-gradient-to-r",
                    study.color,
                    "text-white",
                  )}
                >
                  {study.outcome}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
