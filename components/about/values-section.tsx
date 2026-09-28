"use client"

import { useLocale } from "next-intl"
import type { Locale } from "@/i18n/routing"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"
import { Zap, Shield, Users, TrendingUp, Code, Palette } from "lucide-react"

const valuesMeta = [
  { icon: Zap, color: "from-yellow-500/20 to-orange-500/20" },
  { icon: Shield, color: "from-green-500/20 to-emerald-500/20" },
  { icon: Users, color: "from-blue-500/20 to-cyan-500/20" },
  { icon: TrendingUp, color: "from-brand/20 to-glow-violet/20" },
  { icon: Code, color: "from-pink-500/20 to-rose-500/20" },
  { icon: Palette, color: "from-purple-500/20 to-indigo-500/20" },
]

const roCopy = {
  sectionLabel: "Valorile noastre",
  headingPrefix: "Principii care ne",
  headingHighlight: "ghidează",
  headingSuffix: "în fiecare proiect",
  subtitle: "Aceste valori definesc modul în care lucrăm și relațiile pe care le construim cu clienții noștri.",
  values: [
    {
      title: "Performanță",
      description:
        "Site-uri rapide și stabile, optimizate pentru Core Web Vitals, SEO tehnic și o experiență fluentă mobile-first.",
    },
    {
      title: "Transparență",
      description:
        "Comunicare deschisă și livrabile clare. Știi ce facem, de ce facem și cât costă — fără costuri ascunse..",
    },
    {
      title: "Parteneriat",
      description: "Nu „livrăm și plecăm”. Gândim împreună soluția, prioritizăm corect și te ghidăm în decizii.",
    },
    {
      title: "Rezultate",
      description:
        "Setăm obiective și măsurăm impactul: trafic relevant, cereri, conversii. Deciziile sunt ghidate de date, nu de presupuneri.",
    },
    {
      title: "Inovație",
      description:
        "Folosim tehnologiile potrivite proiectului — nu trenduri. Alegem ce e stabil, scalabil și ușor de întreținut.",
    },
    {
      title: "Creativitate",
      description: "Design coerent cu brandul tău: clar, memorabil și construit să comunice rapid valoarea.",
    },
  ],
}

const copy = { ro: roCopy, en: roCopy } satisfies Record<Locale, typeof roCopy>

export function ValuesSection() {
  const locale = useLocale()
  const t = copy[locale]
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>()
  const { ref: gridRef, isVisible: gridVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden bg-muted/30">
      {/* Background decorations */}
      <div className="absolute inset-0 grid-pattern opacity-50" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-brand/5 blur-[150px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className={cn(
            "text-center max-w-3xl mx-auto mb-16 transition-all duration-1000",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <span className="inline-block text-sm font-medium text-brand tracking-widest uppercase mb-4">
            {t.sectionLabel}
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            {t.headingPrefix} <span className="gradient-text">{t.headingHighlight}</span> {t.headingSuffix}
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            {t.subtitle}
          </p>
        </div>

        {/* Values grid */}
        <div
          ref={gridRef}
          className={cn(
            "grid sm:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000",
            gridVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
          )}
        >
          {t.values.map((value, index) => {
            const meta = valuesMeta[index]
            const Icon = meta.icon
            return (
              <div
                key={value.title}
                className="group relative p-6 lg:p-8 rounded-3xl bg-card border border-border/50 card-metallic overflow-hidden"
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Background gradient on hover */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    meta.color,
                  )}
                />

                <div className="relative z-10">
                  <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-7 h-7 text-brand" />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-foreground mb-3">{value.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{value.description}</p>
                </div>

                {/* Corner decoration */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-brand/10 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
