"use client"

import { useState } from "react"
import { useLocale } from "next-intl"
import type { Locale } from "@/i18n/routing"
import { Smartphone, Monitor, Cloud, Cpu, Check, ArrowRight, ChevronDown } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"
import { Link } from "@/i18n/navigation"

const roCopy = {
  eyebrow: "Tipuri de aplicații",
  headingPre: "Ce fel de ",
  headingHighlight: "aplicație",
  headingEnd: " ai nevoie?",
  subtitle:
    "De la aplicații mobile la platforme SaaS enterprise, dezvoltăm soluții software custom pentru orice nevoie de business.",
  technologiesLabel: "Tehnologii folosite",
  timelineLabel: "Timp estimat",
  idealForLabel: "Ideal pentru",
  requestOffer: "Solicită ofertă",
  timePrefix: "Timp: ",
  types: [
    {
      id: "mobile",
      title: "Aplicații Mobile",
      subtitle: "React Native",
      description:
        "Aplicații native iOS și Android dintr-un singur codebase cu React Native. Performanță nativă, experiență utilizator premium.",
      features: [
        "Cross-platform iOS & Android",
        "Performanță nativă 60fps",
        "Push notifications",
        "Offline support",
        "In-app purchases",
        "Integrare hardware (cameră, GPS, etc.)",
      ],
      technologies: ["React Native", "Expo", "TypeScript", "Firebase"],
      timeline: "8-16 săptămâni",
      idealFor: "Startup-uri, e-commerce, servicii on-demand",
      color: "from-[#61DAFB]/20 to-brand/20",
      borderColor: "border-[#61DAFB]/30",
    },
    {
      id: "webapp",
      title: "Aplicații Web",
      subtitle: "Next.js & Payload CMS",
      description:
        "Aplicații web moderne, rapide și scalabile cu Next.js și Payload CMS. Server-side rendering pentru SEO și performanță optimă.",
      features: [
        "Server-side rendering (SSR)",
        "Static site generation (SSG)",
        "API routes integrate",
        "CMS headless (Payload)",
        "Autentificare & autorizare",
        "Real-time updates",
      ],
      technologies: ["Next.js", "React", "Payload CMS", "PostgreSQL"],
      timeline: "6-12 săptămâni",
      idealFor: "Platforme, dashboards, portale client",
      color: "from-brand/20 to-glow-violet/20",
      borderColor: "border-brand/30",
    },
    {
      id: "saas",
      title: "Platforme SaaS",
      subtitle: "Scalabile & Multi-tenant",
      description:
        "Platforme SaaS complete cu subscripții, multi-tenancy, analytics și API-uri. Arhitectură cloud-native pentru scalabilitate.",
      features: [
        "Multi-tenant architecture",
        "Subscription management",
        "Usage analytics",
        "API management",
        "White-label support",
        "Auto-scaling infrastructure",
      ],
      technologies: ["Next.js", "Stripe", "Vercel", "PostgreSQL"],
      timeline: "12-24 săptămâni",
      idealFor: "Software houses, B2B services, startups",
      color: "from-glow-violet/20 to-glow-cyan/20",
      borderColor: "border-glow-violet/30",
    },
    {
      id: "digitalization",
      title: "Digitalizare",
      subtitle: "Transformare digitală",
      description:
        "Soluții custom pentru digitalizarea proceselor de business. Automatizări, integrări ERP/CRM și dashboards de management.",
      features: [
        "Automatizare procese",
        "Integrări ERP/CRM",
        "Business intelligence",
        "Document management",
        "Workflow automation",
        "Custom dashboards",
      ],
      technologies: ["Next.js", "n8n", "APIs", "Cloud"],
      timeline: "8-20 săptămâni",
      idealFor: "Corporații, IMM-uri în creștere",
      color: "from-glow-cyan/20 to-brand/20",
      borderColor: "border-glow-cyan/30",
    },
  ],
}

const enCopy = {
  eyebrow: "App Types",
  headingPre: "What kind of ",
  headingHighlight: "app",
  headingEnd: " do you need?",
  subtitle: "From mobile apps to enterprise SaaS platforms, we build custom software for whatever your business needs.",
  technologiesLabel: "Technology used",
  timelineLabel: "Estimated time",
  idealForLabel: "Best for",
  requestOffer: "Request a quote",
  timePrefix: "Time: ",
  types: [
    {
      id: "mobile",
      title: "Mobile Apps",
      subtitle: "React Native",
      description:
        "Native iOS and Android apps from a single React Native codebase — native performance, a premium user experience.",
      features: [
        "Cross-platform iOS & Android",
        "60fps native performance",
        "Push notifications",
        "Offline support",
        "In-app purchases",
        "Hardware integration (camera, GPS, etc.)",
      ],
      technologies: ["React Native", "Expo", "TypeScript", "Firebase"],
      timeline: "8–16 weeks",
      idealFor: "Startups, e-commerce, on-demand services",
      color: "from-[#61DAFB]/20 to-brand/20",
      borderColor: "border-[#61DAFB]/30",
    },
    {
      id: "webapp",
      title: "Web Apps",
      subtitle: "Next.js & Payload CMS",
      description:
        "Modern, fast, scalable web apps built with Next.js and Payload CMS — server-side rendering for SEO and top performance.",
      features: [
        "Server-side rendering (SSR)",
        "Static site generation (SSG)",
        "Built-in API routes",
        "Headless CMS (Payload)",
        "Authentication & authorisation",
        "Real-time updates",
      ],
      technologies: ["Next.js", "React", "Payload CMS", "PostgreSQL"],
      timeline: "6–12 weeks",
      idealFor: "Platforms, dashboards, client portals",
      color: "from-brand/20 to-glow-violet/20",
      borderColor: "border-brand/30",
    },
    {
      id: "saas",
      title: "SaaS Platforms",
      subtitle: "Scalable & Multi-tenant",
      description:
        "Complete SaaS platforms with subscriptions, multi-tenancy, analytics and APIs — cloud-native architecture built to scale.",
      features: [
        "Multi-tenant architecture",
        "Subscription management",
        "Usage analytics",
        "API management",
        "White-label support",
        "Auto-scaling infrastructure",
      ],
      technologies: ["Next.js", "Stripe", "Vercel", "PostgreSQL"],
      timeline: "12–24 weeks",
      idealFor: "Software houses, B2B services, startups",
      color: "from-glow-violet/20 to-glow-cyan/20",
      borderColor: "border-glow-violet/30",
    },
    {
      id: "digitalization",
      title: "Digital Transformation",
      subtitle: "Modernise your operations",
      description:
        "Custom solutions for digitising business processes — automation, ERP/CRM integrations, and management dashboards.",
      features: [
        "Process automation",
        "ERP/CRM integrations",
        "Business intelligence",
        "Document management",
        "Workflow automation",
        "Custom dashboards",
      ],
      technologies: ["Next.js", "n8n", "APIs", "Cloud"],
      timeline: "8–20 weeks",
      idealFor: "Corporations, growing SMEs",
      color: "from-glow-cyan/20 to-brand/20",
      borderColor: "border-glow-cyan/30",
    },
  ],
}

const copy = { ro: roCopy, en: enCopy } satisfies Record<Locale, typeof roCopy>

const typeIcons = [Smartphone, Monitor, Cloud, Cpu]

export function AppTypes() {
  const locale = useLocale()
  const t = copy[locale as Locale]
  const appTypes = t.types.map((type, i) => ({ ...type, icon: typeIcons[i] }))
  const { ref, isVisible } = useScrollReveal()
  const [activeType, setActiveType] = useState("mobile")
  const [expandedMobile, setExpandedMobile] = useState<string | null>("mobile")

  const activeApp = appTypes.find((type) => type.id === activeType) || appTypes[0]

  return (
    <section ref={ref} className="relative py-20 sm:py-28 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient opacity-50" />
      <div className="absolute inset-0 grid-pattern" />

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
            {t.headingEnd}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground text-pretty">{t.subtitle}</p>
        </div>

        {/* Desktop: Tab Selector */}
        <div
          className={cn(
            "hidden lg:flex justify-center gap-2 mb-12 transition-all duration-700 delay-100",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          {appTypes.map((type) => {
            const Icon = type.icon
            const isActive = activeType === type.id
            return (
              <button
                key={type.id}
                onClick={() => setActiveType(type.id)}
                className={cn(
                  "flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all duration-300",
                  isActive
                    ? "bg-brand/10 border-brand/50 text-foreground"
                    : "bg-card/50 border-border/50 text-muted-foreground hover:border-brand/30 hover:text-foreground",
                )}
              >
                <Icon className={cn("w-5 h-5", isActive && "text-brand")} />
                <div className="text-left">
                  <div className="font-semibold text-sm">{type.title}</div>
                  <div className="text-xs text-muted-foreground">{type.subtitle}</div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Desktop: Active Type Content */}
        <div
          className={cn(
            "hidden lg:block transition-all duration-700 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div
            className={cn("rounded-3xl border-2 p-8 lg:p-10 bg-gradient-to-br", activeApp.color, activeApp.borderColor)}
          >
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
              {/* Left: Info */}
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-brand/10 flex items-center justify-center">
                    <activeApp.icon className="w-8 h-8 text-brand" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">{activeApp.title}</h3>
                    <p className="text-muted-foreground">{activeApp.subtitle}</p>
                  </div>
                </div>
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">{activeApp.description}</p>
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {activeApp.features.map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check className="w-4 h-4 text-green-500 flex-shrink-0" />
                      <span className="text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-brand-foreground rounded-full font-semibold hover:bg-brand-light transition-colors group"
                >
                  {t.requestOffer}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>

              {/* Right: Meta */}
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-card/80 border border-border/50">
                  <h4 className="font-semibold mb-3">{t.technologiesLabel}</h4>
                  <div className="flex flex-wrap gap-2">
                    {activeApp.technologies.map((tech) => (
                      <span key={tech} className="px-3 py-1.5 rounded-full bg-brand/10 text-sm font-medium">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="p-6 rounded-2xl bg-card/80 border border-border/50">
                  <h4 className="font-semibold mb-2">{t.timelineLabel}</h4>
                  <p className="text-2xl font-bold text-brand">{activeApp.timeline}</p>
                </div>
                <div className="p-6 rounded-2xl bg-card/80 border border-border/50">
                  <h4 className="font-semibold mb-2">{t.idealForLabel}</h4>
                  <p className="text-muted-foreground">{activeApp.idealFor}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet: Accordion */}
        <div className="lg:hidden space-y-3">
          {appTypes.map((type, index) => {
            const Icon = type.icon
            const isExpanded = expandedMobile === type.id
            return (
              <div
                key={type.id}
                className={cn(
                  "rounded-2xl border-2 overflow-hidden transition-all duration-500",
                  type.borderColor,
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <button
                  onClick={() => setExpandedMobile(isExpanded ? null : type.id)}
                  className={cn("w-full flex items-center justify-between p-4 sm:p-5 bg-gradient-to-r", type.color)}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-brand/10 flex items-center justify-center">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-brand" />
                    </div>
                    <div className="text-left">
                      <h3 className="font-bold text-sm sm:text-base">{type.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground">{type.subtitle}</p>
                    </div>
                  </div>
                  <ChevronDown
                    className={cn("w-5 h-5 text-muted-foreground transition-transform", isExpanded && "rotate-180")}
                  />
                </button>

                <div
                  className={cn("grid transition-all duration-500", isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
                >
                  <div className="overflow-hidden">
                    <div className="p-4 sm:p-5 space-y-4 bg-card/50">
                      <p className="text-sm text-muted-foreground">{type.description}</p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {type.features.slice(0, 4).map((feature) => (
                          <div key={feature} className="flex items-center gap-2">
                            <Check className="w-3.5 h-3.5 text-green-500 flex-shrink-0" />
                            <span className="text-xs sm:text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {type.technologies.map((tech) => (
                          <span key={tech} className="px-2.5 py-1 rounded-full bg-brand/10 text-xs font-medium">
                            {tech}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-sm text-muted-foreground">
                          {t.timePrefix}
                          <span className="font-semibold text-foreground">{type.timeline}</span>
                        </span>
                        <Link
                          href="/contact"
                          className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:text-brand-light transition-colors"
                        >
                          {t.requestOffer}
                          <ArrowRight className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
