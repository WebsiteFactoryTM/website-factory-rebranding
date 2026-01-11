"use client"

import { ExternalLink } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { FloatingElement } from "@/components/ui/floating-element"
import { cn } from "@/lib/utils"
import { simpleProjects } from "@/lib/portfolio-data"
import Image from "next/image"
import { generateProjectAltText } from "@/lib/image-alt-text"

export function SimpleProjectsGrid() {
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient opacity-50" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement
          className="absolute top-20 right-1/4 w-64 h-64 rounded-full bg-glow-cyan/10 blur-[80px]"
          delay={1}
          duration={10}
        >
          <div />
        </FloatingElement>
        <div className="absolute bottom-20 left-10 w-24 h-24">
          <div
            className="w-full h-full metallic-surface rounded-2xl opacity-30"
            style={{ animation: "morph 12s ease-in-out infinite" }}
          />
        </div>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div
          ref={sectionRef}
          className={cn(
            "text-center mb-16 transition-all duration-1000",
            sectionVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <span className="inline-block text-sm font-medium text-brand tracking-widest uppercase mb-4">
            Mai multe proiecte
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Și alte <span className="gradient-text">povești de succes</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            O selecție din proiectele pe care le-am livrat pentru clienți din diverse industrii.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8">
          {[...simpleProjects]
            .sort((a, b) => (a.order ?? 999) - (b.order ?? 999))
            .map((project, index) => (
              <SimpleProjectCard key={project.id} project={project} index={index} />
            ))}
        </div>
      </div>
    </section>
  )
}

function SimpleProjectCard({
  project,
  index,
}: {
  project: (typeof simpleProjects)[0]
  index: number
}) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>({ threshold: 0.1 })

  return (
    <article
      ref={ref}
      className={cn(
        "group relative transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      )}
      style={{ transitionDelay: `${index * 80}ms` }}
    >
      <a
        href={project.liveUrl && project.liveUrl !== "#" ? project.liveUrl : undefined}
        target={project.liveUrl && project.liveUrl !== "#" ? "_blank" : undefined}
        rel={project.liveUrl && project.liveUrl !== "#" ? "noopener noreferrer" : undefined}
        className={cn(
          "block",
          (!project.liveUrl || project.liveUrl === "#") && "cursor-default pointer-events-none"
        )}
      >
        {/* Device mockup frame */}
        <div className="relative rounded-xl overflow-hidden glass-card card-lift">
          {/* Glow effect on hover */}
          <div className="absolute -inset-2 bg-gradient-to-br from-brand/30 via-glow-violet/20 to-glow-cyan/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-xl -z-10" />

          {/* Image container with device frame aesthetic - optimized for 4000x2500px PNG */}
          <div className="relative aspect-[8/5] overflow-hidden" style={{ backgroundColor: "#F3F3F3" }}>
            <Image
              src={project.image || "/placeholder.svg"}
              alt={generateProjectAltText({
                title: project.title,
                client: project.client,
                category: project.category,
                categoryLabel: project.categoryLabel,
              })}
              fill
              className="object-contain transition-transform duration-700 group-hover:scale-105"
            />

            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* External link indicator - only show if liveUrl is valid */}
            {project.liveUrl && project.liveUrl !== "#" && (
              <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                <span className="flex items-center gap-2 px-3 py-1.5 bg-white/90 dark:bg-black/80 text-foreground text-sm font-medium rounded-full backdrop-blur-sm">
                  Vezi proiect
                  <ExternalLink className="h-3.5 w-3.5" />
                </span>
              </div>
            )}

            {/* Category badge */}
            <div className="absolute top-3 left-3">
              <span className="px-2 py-1 text-xs font-medium bg-brand/90 text-white rounded-full">
                {project.categoryLabel}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            <div className="flex items-start justify-between gap-2 mb-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-heading font-semibold text-foreground group-hover:text-brand transition-colors duration-300 line-clamp-2">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mt-0.5 line-clamp-1">{project.client}</p>
              </div>
              <span className="text-xs text-muted-foreground flex-shrink-0 ml-2">{project.year}</span>
            </div>
            {project.shortDescription && (
              <p className="text-xs text-muted-foreground/80 line-clamp-2 mt-2 leading-relaxed">
                {project.shortDescription}
              </p>
            )}
          </div>
        </div>
      </a>
    </article>
  )
}
