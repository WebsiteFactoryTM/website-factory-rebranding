"use client"

import { useLocale } from "next-intl"
import type { Locale } from "@/i18n/routing"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"
import { Smartphone, Monitor, Cloud, Database, Cpu, Lock } from "lucide-react"

const roCopy = {
  eyebrow: "Stack tehnologic",
  headingPre: "Tehnologii ",
  headingHighlight: "de ultimă generație",
  subtitle: "Folosim cele mai moderne tehnologii pentru aplicații performante, scalabile și ușor de întreținut.",
  securityBadge: "Securitate enterprise-grade • GDPR compliant • SOC 2 ready",
  categories: [
    {
      title: "Mobile Development",
      description: "Cross-platform nativ",
      technologies: [
        { name: "React Native", description: "Framework principal" },
        { name: "Expo", description: "Tooling & build" },
        { name: "TypeScript", description: "Type safety" },
        { name: "React Navigation", description: "Routing nativ" },
      ],
    },
    {
      title: "Web Applications",
      description: "Full-stack modern",
      technologies: [
        { name: "Next.js 15", description: "React framework" },
        { name: "Payload CMS", description: "Headless CMS" },
        { name: "TailwindCSS", description: "Styling" },
        { name: "Vercel", description: "Hosting & CDN" },
      ],
    },
    {
      title: "Backend & APIs",
      description: "Scalabil & securizat",
      technologies: [
        { name: "Node.js", description: "Runtime" },
        { name: "PostgreSQL", description: "Database" },
        { name: "Redis", description: "Cache & sessions" },
        { name: "GraphQL / REST", description: "API layer" },
      ],
    },
    {
      title: "Cloud & DevOps",
      description: "Infrastructură modernă",
      technologies: [
        { name: "Vercel / AWS", description: "Cloud hosting" },
        { name: "Docker", description: "Containerization" },
        { name: "GitHub Actions", description: "CI/CD" },
        { name: "Sentry", description: "Error tracking" },
      ],
    },
  ],
}

const copy = { ro: roCopy, en: roCopy } satisfies Record<Locale, typeof roCopy>

const categoryIcons = [Smartphone, Monitor, Database, Cloud]

export function AppTechStack() {
  const locale = useLocale()
  const t = copy[locale as Locale]
  const techCategories = t.categories.map((c, i) => ({ ...c, icon: categoryIcons[i] }))
  const { ref, isVisible } = useScrollReveal()

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
            <Cpu className="w-4 h-4 text-brand" />
            {t.eyebrow}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            {t.headingPre}
            <span className="gradient-text">{t.headingHighlight}</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground text-pretty">{t.subtitle}</p>
        </div>

        {/* Tech Grid */}
        <div
          className={cn(
            "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 transition-all duration-700 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          {techCategories.map((category, index) => {
            const Icon = category.icon
            return (
              <div
                key={category.title}
                className="group p-5 sm:p-6 rounded-2xl bg-card border border-border/50 hover:border-brand/30 transition-all duration-300 card-metallic"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand/10 flex items-center justify-center group-hover:bg-brand/20 transition-colors">
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-brand" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm sm:text-base">{category.title}</h3>
                    <p className="text-xs text-muted-foreground">{category.description}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {category.technologies.map((tech) => (
                    <div
                      key={tech.name}
                      className="flex items-center justify-between p-2.5 rounded-lg bg-muted/50 group-hover:bg-brand/5 transition-colors"
                    >
                      <span className="font-medium text-sm">{tech.name}</span>
                      <span className="text-xs text-muted-foreground">{tech.description}</span>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Security Badge */}
        <div
          className={cn(
            "mt-12 flex justify-center transition-all duration-700 delay-400",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full glass-premium">
            <Lock className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium">{t.securityBadge}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
