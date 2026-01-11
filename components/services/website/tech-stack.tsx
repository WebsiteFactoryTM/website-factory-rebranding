"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { FloatingElement } from "@/components/ui/floating-element"
import { cn } from "@/lib/utils"

const technologies = [
  {
    category: "Frontend",
    items: [
      { name: "Next.js", description: "Framework React pentru performanță maximă" },
      { name: "React", description: "Librăria #1 pentru interfețe moderne" },
      { name: "TypeScript", description: "Cod sigur și ușor de întreținut" },
      { name: "Tailwind CSS", description: "Design system rapid și consistent" },
    ],
  },
  {
    category: "Performance",
    items: [
      { name: "Vercel", description: "Hosting global cu CDN inclus" },
      { name: "Image Optimization", description: "Imagini comprimate automat" },
      { name: "Code Splitting", description: "Încărcare inteligentă a codului" },
      { name: "Caching Avansat", description: "Răspunsuri rapide din cache" },
    ],
  },
  {
    category: "SEO & Analytics",
    items: [
      { name: "Schema Markup", description: "Date structurate pentru Google" },
      { name: "Core Web Vitals", description: "Metrici optimizate pentru ranking" },
      { name: "Google Analytics 4", description: "Tracking complet al vizitatorilor" },
      { name: "Search Console", description: "Monitorizare indexare Google" },
    ],
  },
]

export function TechStack() {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-muted/30">
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Decorative blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none hidden lg:block">
        <FloatingElement className="w-full h-full rounded-full bg-brand/5 blur-[150px]" delay={0} duration={20}>
          <div />
        </FloatingElement>
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div
          ref={ref}
          className={cn(
            "text-center mb-16 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <span className="inline-block text-sm font-medium text-brand tracking-widest uppercase mb-4">Tehnologii</span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold">
            Stack-ul <span className="gradient-text">modern</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Folosim cele mai noi și performante tehnologii pentru rezultate excepționale.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {technologies.map((category, catIndex) => (
            <div
              key={category.category}
              className="glass-premium rounded-3xl p-6 lg:p-8"
              style={{
                animation: isVisible ? `fadeInUp 0.6s ease-out ${catIndex * 0.15}s forwards` : "none",
                opacity: isVisible ? undefined : 0,
              }}
            >
              <h3 className="font-heading text-lg font-bold mb-6 flex items-center gap-3">
                <span className="w-2 h-2 rounded-full bg-brand" />
                {category.category}
              </h3>

              <div className="space-y-4">
                {category.items.map((tech, techIndex) => (
                  <div
                    key={tech.name}
                    className="group p-4 rounded-xl bg-card/50 border border-border/50 hover:border-brand/30 transition-all duration-300 hover:translate-x-1"
                  >
                    <p className="font-semibold text-foreground group-hover:text-brand transition-colors">
                      {tech.name}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">{tech.description}</p>
                  </div>
                ))}
              </div>
            </div>
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
