"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, ExternalLink } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"
import { featuredProjects } from "@/lib/portfolio-data"
import { generatePortfolioShowcaseAltText } from "@/lib/image-alt-text"

// Get website projects from featured projects
const websiteProjects = featuredProjects
  .filter((project) => project.category === "website")
  .slice(0, 3)
  .map((project) => {
    const firstResult = project.results[0]
    const outcome = firstResult ? `${firstResult.value} ${firstResult.label}` : "Rezultate măsurabile"
    return {
      title: project.title,
      category: project.categoryLabel,
      image: project.image,
      results: firstResult?.value || "Rezultate măsurabile",
      href: `/portofoliu/${project.slug}`,
      altText: generatePortfolioShowcaseAltText(project.title, project.category, outcome),
    }
  })

export function WebsitePortfolio() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div
          ref={ref}
          className={cn(
            "flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-16 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div>
            <span className="inline-block text-sm font-medium text-brand tracking-widest uppercase mb-4">
              Portofoliu
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold">
              Website-uri <span className="gradient-text">de succes</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl">
              Exemple reale de website-uri create de noi care generează rezultate pentru clienți.
            </p>
          </div>

          <Link
            href="/portofoliu"
            className="inline-flex items-center gap-2 text-brand font-semibold hover:gap-3 transition-all group"
          >
            Vezi toate proiectele
            <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {websiteProjects.map((project, index) => (
            <Link
              key={project.title}
              href={project.href}
              className="group relative rounded-3xl overflow-hidden bg-card border border-border/50 hover:border-brand/30 transition-all duration-500 hover:shadow-2xl"
              style={{
                animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.15}s forwards` : "none",
                opacity: isVisible ? undefined : 0,
              }}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.altText || project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />

                {/* Results badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-green-500/90 text-white text-sm font-semibold">
                  {project.results}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <p className="text-sm text-brand font-medium mb-2">{project.category}</p>
                <h3 className="font-heading text-xl font-bold group-hover:text-brand transition-colors flex items-center gap-2">
                  {project.title}
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
              </div>

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-brand/5 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </Link>
          ))}
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
