"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"
import { ArrowRight, ExternalLink, TrendingUp, ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { featuredProjects } from "@/lib/portfolio-data"
import { generatePortfolioShowcaseAltText } from "@/lib/image-alt-text"

// Get ecommerce projects from featured projects
const ecommerceProjects = featuredProjects
  .filter((project) => project.category === "ecommerce")
  .slice(0, 3)
  .map((project) => {
    const firstResult = project.results[0]
    const outcome = firstResult ? `${firstResult.value} ${firstResult.label}` : "Rezultate măsurabile"
    return {
      slug: project.slug,
      name: project.title,
      category: project.categoryLabel,
      image: project.image,
      results: firstResult?.value || "Rezultate măsurabile",
      platform: project.technologies[0] || "Custom",
      altText: generatePortfolioShowcaseAltText(project.title, project.category, outcome),
    }
  })

export function EcommercePortfolio() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-muted/30">
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Decorative metallic shapes */}
      <div className="absolute top-20 right-20 w-32 h-32 rounded-full metallic-surface opacity-20 morph hidden lg:block" />
      <div className="absolute bottom-20 left-20 w-24 h-24 rounded-2xl metallic-surface opacity-20 morph-reverse hidden lg:block" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div
          ref={ref}
          className={cn(
            "flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-12 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div>
            <span className="inline-block text-sm font-medium text-brand tracking-widest uppercase mb-4">
              Portofoliu eCommerce
            </span>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold">
              Magazine online care <span className="gradient-text">vând</span>
            </h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-xl">
              Rezultate reale pentru clienți reali. Fiecare magazin este optimizat pentru conversie maximă.
            </p>
          </div>
          <Link
            href="/portofoliu"
            className="inline-flex items-center gap-2 text-brand font-semibold hover:gap-3 transition-all group"
          >
            Vezi toate proiectele
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {ecommerceProjects.map((project, index) => (
            <Link
              key={project.slug}
              href={`/portofoliu/${project.slug}`}
              className="group relative"
              style={{
                animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.15}s forwards` : "none",
                opacity: isVisible ? undefined : 0,
              }}
            >
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden mb-4">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.altText || project.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Results badge */}
                <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-green-500/90 text-white text-sm font-semibold flex items-center gap-1.5">
                  <TrendingUp className="w-4 h-4" />
                  {project.results}
                </div>

                {/* Platform badge */}
                <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white text-xs font-medium flex items-center gap-1.5">
                  <ShoppingCart className="w-3 h-3" />
                  {project.platform}
                </div>

                {/* View project */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-4 group-hover:translate-y-0">
                  <span className="text-white font-semibold">Vezi proiectul</span>
                  <ExternalLink className="w-5 h-5 text-white" />
                </div>
              </div>

              <div>
                <p className="text-sm text-brand font-medium mb-1">{project.category}</p>
                <h3 className="font-heading text-lg font-bold group-hover:text-brand transition-colors">
                  {project.name}
                </h3>
              </div>
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
