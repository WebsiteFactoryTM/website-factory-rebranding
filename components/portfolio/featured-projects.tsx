"use client"

import { useState } from "react"
import { Link } from "@/i18n/navigation"
import Image from "next/image"
import { useLocale } from "next-intl"
import { ArrowRight, ExternalLink } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { FloatingElement } from "@/components/ui/floating-element"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { getProjects, getCategoryFilters, type FeaturedProject } from "@/lib/portfolio-data"
import { generateProjectAltText } from "@/lib/image-alt-text"
import type { Locale } from "@/i18n/routing"

const roCopy = {
  eyebrow: "Proiecte principale",
  title: "Studii de caz",
  titleHighlight: "detaliate",
  text: "Proiecte complexe cu rezultate măsurabile și povești complete de transformare digitală.",
  viewCaseStudy: "Vezi studiul de caz",
  visitSite: "Vizitează site-ul",
}
const enCopy = {
  eyebrow: "Flagship projects",
  title: "In-depth",
  titleHighlight: "case studies",
  text: "Complex projects with measurable results and the full story behind each one.",
  viewCaseStudy: "View case study",
  visitSite: "Visit live site",
}
const copy = { ro: roCopy, en: enCopy } satisfies Record<Locale, typeof roCopy>

export function FeaturedProjects() {
  const locale = useLocale()
  const { featured } = getProjects(locale)
  const categoryFilters = getCategoryFilters(locale)
  const t = copy[locale]
  const { ref: sectionRef, isVisible: sectionVisible } = useScrollReveal()
  const [activeFilter, setActiveFilter] = useState("all")

  const filteredProjects = activeFilter === "all" ? featured : featured.filter((p) => p.category === activeFilter)

  return (
    <section className="relative pt-16 sm:pt-20 md:pt-24 pb-24 md:pb-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/30" />
      <div className="absolute inset-0 grid-pattern opacity-50" />

      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement
          className="absolute top-1/4 left-0 w-72 h-72 rounded-full bg-brand/5 blur-[100px]"
          delay={0}
          duration={12}
        />
        <FloatingElement
          className="absolute bottom-1/4 right-0 w-96 h-96 rounded-full bg-glow-violet/8 blur-[120px]"
          delay={3}
          duration={15}
        />
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
            {t.eyebrow}
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            {t.title} <span className="gradient-text">{t.titleHighlight}</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{t.text}</p>

          {/* Filter buttons */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {categoryFilters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setActiveFilter(filter.value)}
                className={cn(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
                  activeFilter === filter.value
                    ? "bg-brand text-white shadow-lg shadow-brand/25"
                    : "bg-card hover:bg-accent text-muted-foreground hover:text-foreground border border-border",
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid gap-8 md:gap-12">
          {filteredProjects.map((project, index) => (
            <FeaturedProjectCard key={project.id} project={project} index={index} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturedProjectCard({
  project,
  index,
  locale,
}: {
  project: FeaturedProject
  index: number
  locale: Locale
}) {
  const t = copy[locale]
  const { ref, isVisible } = useScrollReveal({ threshold: 0.2 })
  const isEven = index % 2 === 0

  return (
    <article
      ref={ref}
      className={cn(
        "group relative grid md:grid-cols-2 gap-8 items-center transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
      )}
      style={{ transitionDelay: `${(index % 3) * 100}ms` }}
    >
      {/* Image */}
      <div className={cn("relative", !isEven && "md:order-2")}>
        <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-premium">
          {/* Frame decoration */}
          <div className="absolute inset-0 border-2 border-brand/20 rounded-2xl z-10 pointer-events-none" />
          <div className="absolute -inset-1 bg-gradient-to-br from-brand/20 via-transparent to-glow-violet/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 blur-xl" />

          <Image
            src={project.image || "/placeholder.svg"}
            alt={generateProjectAltText({
              title: project.title,
              client: project.client,
              category: project.category,
              categoryLabel: project.categoryLabel,
              locale,
            })}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />

          {/* Overlay with quick stats */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="absolute bottom-6 left-6 right-6 flex justify-between items-end">
              {project.results.slice(0, 3).map((result) => (
                <div key={result.label} className="text-center">
                  <p className="text-2xl font-bold text-white">{result.value}</p>
                  <p className="text-xs text-white/70">{result.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Category badge */}
          <div className="absolute top-4 left-4 z-20">
            <span className="px-3 py-1 text-xs font-medium bg-brand/90 text-white rounded-full backdrop-blur-sm">
              {project.categoryLabel}
            </span>
          </div>

          {/* Year badge */}
          <div className="absolute top-4 right-4 z-20">
            <span className="px-3 py-1 text-xs font-medium bg-black/50 text-white rounded-full backdrop-blur-sm">
              {project.year}
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className={cn("space-y-6", !isEven && "md:order-1")}>
        <div>
          <p className="text-sm text-brand font-medium mb-2">{project.client}</p>
          <h3 className="font-heading text-2xl md:text-3xl lg:text-4xl font-bold text-foreground group-hover:gradient-text transition-all duration-300">
            {project.title}
          </h3>
        </div>

        <p className="text-muted-foreground leading-relaxed">{project.description}</p>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs font-medium bg-secondary text-secondary-foreground rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Results preview */}
        <div className="grid grid-cols-3 gap-4 p-4 rounded-xl bg-card border border-border">
          {project.results.map((result) => (
            <div key={result.label} className="text-center">
              <p className="text-xl md:text-2xl font-bold gradient-text">{result.value}</p>
              <p className="text-xs text-muted-foreground mt-1">{result.label}</p>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-4">
          <Button asChild className="group/btn">
            <Link href={{ pathname: "/portofoliu/[slug]", params: { slug: project.slug } }}>
              {t.viewCaseStudy}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
          {project.liveUrl && (
            <Button variant="outline" asChild>
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                {t.visitSite}
                <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
          )}
        </div>
      </div>
    </article>
  )
}
