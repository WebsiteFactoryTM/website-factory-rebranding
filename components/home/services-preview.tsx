"use client"

import Link from "next/link"
import { Globe, ShoppingCart, Smartphone, ArrowUpRight } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { FloatingElement } from "@/components/ui/floating-element"
import { cn } from "@/lib/utils"

const services = [
  {
    id: "creare-website",
    title: "Creare website",
    description:
      "Site-uri de prezentare structurate clar, rapide, optimizate SEO și construite să aducă cereri și clienți — nu doar să arate bine.",
    href: "/servicii/creare-website",
    icon: Globe,
    outcomes: ["Vizibilitate crescută în Google", "Design responsive", "Încărcare rapidă"],
    gradient: "from-brand to-brand-light",
  },
  {
    id: "magazin-online",
    title: "Magazin online",
    description:
      "E-commerce complet funcțional cu plăți integrate, sisteme de loializare, gestiune stocuri și gândit pentru vânzări și administrare ușoară.",
    href: "/servicii/magazin-online",
    icon: ShoppingCart,
    outcomes: ["Plăți + livrare + facturare", "Filtre, căutare, variante produse", "Checkout optimizat pentru conversii"],
    gradient: "from-glow-violet to-brand",
  },
  {
    id: "aplicatie-mobile",
    title: "Aplicație mobilă",
    description:
      "Aplicații mobile native sau web și cross-platform pentru iOS și Android. UX curat și performanță bună — de la MVP la produs scalabil.",
    href: "/servicii/aplicatie-mobile",
    icon: Smartphone,
    outcomes: ["iOS & Android (cross-platform)", "Push, conturi, plăți (la nevoie)", "Publicare în store + mentenanță"],
    gradient: "from-glow-cyan to-glow-violet",
  },
]

export function ServicesPreview() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>()
  const { ref: cardsRef, isVisible: cardsVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <FloatingElement
          className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-brand/5 blur-[100px]"
          delay={0}
          duration={10}
        />
        <FloatingElement
          className="absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full bg-glow-violet/8 blur-[80px]"
          delay={2}
          duration={8}
        />
        <FloatingElement
          className="absolute top-1/2 left-1/4 w-48 h-48 rounded-full bg-glow-cyan/5 blur-[60px]"
          delay={1}
          duration={12}
        />
      </div>

      <div
        className="absolute top-20 right-10 md:right-20 w-20 h-20 md:w-32 md:h-32 metallic-surface rounded-3xl opacity-20"
        style={{ animation: "morph 14s ease-in-out infinite" }}
      />
      <div
        className="absolute bottom-20 left-10 md:left-20 w-16 h-16 md:w-24 md:h-24 rounded-2xl blur-sm opacity-30"
        style={{
          background: "linear-gradient(135deg, var(--glow-cyan), var(--brand))",
          animation: "morph 10s ease-in-out infinite reverse",
        }}
      />

      {/* Grid pattern */}
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          ref={headerRef}
          className={cn(
            "max-w-3xl mx-auto text-center mb-16 lg:mb-20 transition-all duration-700",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <span className="inline-block text-sm font-medium text-brand tracking-widest uppercase mb-4">Servicii</span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
            Soluții complete pentru <span className="gradient-text">prezența ta digitală</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            De la site-uri de prezentare și magazine online la aplicații mobile complexe. Alegem tehnologia potrivită în funcție de proiectul tău.
          </p>
        </div>

        {/* Service Cards */}
        <div ref={cardsRef} className="grid lg:grid-cols-3 gap-6 lg:gap-8 perspective-container">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Link
                key={service.id}
                href={service.href}
                className={cn(
                  "group relative p-8 lg:p-10 rounded-3xl",
                  "bg-card/80 backdrop-blur-sm border border-border/50",
                  "transition-all duration-500 ease-out",
                  "hover:border-brand/30 hover:shadow-2xl hover:shadow-brand/10",
                  "card-lift card-metallic card-3d",
                  cardsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand/5 via-transparent to-glow-violet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Icon with gradient background and glow */}
                <div
                  className={cn(
                    "relative w-16 h-16 rounded-2xl flex items-center justify-center mb-8",
                    "bg-gradient-to-br",
                    service.gradient,
                    "shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3",
                    "group-hover:shadow-xl group-hover:shadow-brand/30",
                  )}
                >
                  <Icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="relative font-heading text-2xl font-bold text-foreground mb-4 group-hover:text-brand transition-colors">
                  {service.title}
                </h3>
                <p className="relative text-muted-foreground leading-relaxed mb-8">{service.description}</p>

                {/* Outcomes */}
                <ul className="relative space-y-3 mb-8">
                  {service.outcomes.map((outcome, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-foreground/80">
                      <span className={cn("w-1.5 h-1.5 rounded-full bg-gradient-to-r shadow-sm", service.gradient)} />
                      {outcome}
                    </li>
                  ))}
                </ul>

                {/* Link indicator */}
                <div className="relative flex items-center text-brand text-sm font-semibold">
                  <span className="mr-2 animated-underline">Află mai multe</span>
                  <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                </div>

                <div
                  className={cn(
                    "absolute -top-4 -right-4 w-24 h-24 rounded-full opacity-0 group-hover:opacity-50 transition-opacity duration-500 pointer-events-none",
                    "bg-gradient-to-br",
                    service.gradient,
                    "blur-3xl",
                  )}
                />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
