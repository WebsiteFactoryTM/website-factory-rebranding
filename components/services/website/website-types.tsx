"use client"

import { useState } from "react"
import { Link } from "@/i18n/navigation"
import { useLocale } from "next-intl"
import type { Locale } from "@/i18n/routing"
import { FileText, Layers, Briefcase, Rocket, ArrowRight, Check } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"

const roCopy = {
  eyebrow: "Tipuri de Website",
  heading: "Ce tip de website ai nevoie?",
  subtitle:
    "Alege varianta potrivită pentru afacerea ta. Fiecare proiect este personalizat pentru obiectivele tale specifice.",
  popular: "Popular",
  timeLabel: "Timp: ",
  idealLabel: "Ideal: ",
  calculatePrice: "Calculează preț",
  includesTitle: "Ce include:",
  types: [
    {
      id: "one-page",
      title: "One Page",
      subtitle: "Perfect pentru start",
      description:
        "O singură pagină cu tot ce ai nevoie: prezentare, servicii, contact. Ideal pentru freelanceri, consultanți sau lansări rapide.",
      features: ["Design premium", "Formular contact", "SEO de bază", "Mobile responsive", "Încărcare rapidă"],
      idealFor: "Freelanceri, consultanți, start-up-uri",
      timeline: "5-7 zile",
      popular: false,
    },
    {
      id: "prezentare",
      title: "Site Prezentare",
      subtitle: "Cel mai popular",
      description:
        "Website complet cu multiple pagini: acasă, despre, servicii, portofoliu, contact. Soluția completă pentru afaceri în creștere.",
      features: [
        "5-10 pagini",
        "Blog integrat",
        "SEO avansat",
        "Galerie foto/video",
        "Integrare social media",
        "Analytics setup",
      ],
      idealFor: "IMM-uri, agenții, companii",
      timeline: "2-3 săptămâni",
      popular: true,
    },
    {
      id: "corporate",
      title: "Corporate",
      subtitle: "Pentru companii mari",
      description:
        "Soluție enterprise cu arhitectură complexă, multiple secțiuni, integrări CRM și funcționalități avansate.",
      features: ["15+ pagini", "CMS avansat", "Multi-limbă", "Integrări CRM", "Portal clienți", "Securitate avansată"],
      idealFor: "Corporații, instituții, holdinguri",
      timeline: "4-8 săptămâni",
      popular: false,
    },
    {
      id: "custom",
      title: "Custom / Aplicație",
      subtitle: "Fără limite",
      description:
        "Dezvoltare personalizată pentru nevoi unice: platforme, dashboards, aplicații web complexe cu funcționalități la comandă.",
      features: [
        "Funcționalități unice",
        "Arhitectură scalabilă",
        "API integrations",
        "User management",
        "Raportare avansată",
        "Suport dedicat",
      ],
      idealFor: "Proiecte inovative, SaaS, platforme",
      timeline: "6-12 săptămâni",
      popular: false,
    },
  ],
}

const enCopy = {
  eyebrow: "Website Types",
  heading: "Which kind of website fits your business?",
  subtitle: "Pick the option that matches where you are — every project is shaped around your specific goals.",
  popular: "Most popular",
  timeLabel: "Timeline: ",
  idealLabel: "Best for: ",
  calculatePrice: "Calculate price",
  includesTitle: "What's included:",
  types: [
    {
      id: "one-page",
      title: "One Page",
      subtitle: "Great for getting started",
      description:
        "Everything on one page — an introduction, your services, and a way to get in touch. Ideal for freelancers, consultants, or a quick launch.",
      features: ["Premium design", "Contact form", "Basic SEO", "Mobile responsive", "Fast loading"],
      idealFor: "Freelancers, consultants, startups",
      timeline: "5–7 days",
      popular: false,
    },
    {
      id: "prezentare",
      title: "Business Website",
      subtitle: "Most popular",
      description:
        "A complete multi-page site — home, about, services, portfolio, contact. The full package for a growing business.",
      features: [
        "5–10 pages",
        "Built-in blog",
        "Advanced SEO",
        "Photo/video gallery",
        "Social media integration",
        "Analytics setup",
      ],
      idealFor: "SMEs, agencies, established businesses",
      timeline: "2–3 weeks",
      popular: true,
    },
    {
      id: "corporate",
      title: "Corporate",
      subtitle: "For larger organisations",
      description:
        "An enterprise-grade build — complex architecture, multiple sections, CRM integrations, and advanced functionality.",
      features: ["15+ pages", "Advanced CMS", "Multi-language", "CRM integrations", "Client portal", "Advanced security"],
      idealFor: "Corporations, institutions, larger groups",
      timeline: "4–8 weeks",
      popular: false,
    },
    {
      id: "custom",
      title: "Custom / App",
      subtitle: "No limits",
      description:
        "Bespoke development for anything that doesn't fit a template — platforms, dashboards, complex web apps built to spec.",
      features: [
        "Bespoke functionality",
        "Scalable architecture",
        "API integrations",
        "User management",
        "Advanced reporting",
        "Dedicated support",
      ],
      idealFor: "Innovative projects, SaaS, platforms",
      timeline: "6–12 weeks",
      popular: false,
    },
  ],
}

const copy = { ro: roCopy, en: enCopy } satisfies Record<Locale, typeof roCopy>

const typeIcons = [FileText, Layers, Briefcase, Rocket]

export function WebsiteTypes() {
  const locale = useLocale()
  const t = copy[locale as Locale]
  const websiteTypes = t.types.map((type, i) => ({ ...type, icon: typeIcons[i] }))
  const [activeType, setActiveType] = useState("prezentare")
  const { ref, isVisible } = useScrollReveal()
  const selectedType = websiteTypes.find((type) => type.id === activeType)!

  return (
    <section className="relative pt-16 sm:pt-20 md:pt-24 pb-24 lg:pb-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/30 to-background" />
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div
          ref={ref}
          className={cn(
            "text-center mb-16 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <span className="inline-block text-sm font-medium text-brand tracking-widest uppercase mb-4">
            {t.eyebrow}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold">{t.heading}</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Interactive Selector */}
        <div className="max-w-6xl mx-auto">
          {/* Type Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {websiteTypes.map((type) => {
              const Icon = type.icon
              const isActive = activeType === type.id
              return (
                <button
                  key={type.id}
                  onClick={() => setActiveType(type.id)}
                  className={cn(
                    "group relative flex items-center gap-3 px-6 py-4 rounded-2xl border transition-all duration-300",
                    isActive
                      ? "bg-brand text-brand-foreground border-brand glow-brand"
                      : "bg-card hover:bg-accent border-border hover:border-brand/50",
                  )}
                >
                  {type.popular && (
                    <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-green-500 text-white text-xs font-bold rounded-full">
                      {t.popular}
                    </span>
                  )}
                  <Icon className={cn("w-5 h-5", isActive ? "text-brand-foreground" : "text-brand")} />
                  <div className="text-left">
                    <p className="font-semibold">{type.title}</p>
                    <p className={cn("text-xs", isActive ? "text-brand-foreground/80" : "text-muted-foreground")}>
                      {type.subtitle}
                    </p>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Selected Type Details */}
          <div
            key={selectedType.id}
            className="grid lg:grid-cols-2 gap-8 items-center animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            {/* Info Card */}
            <div className="glass-premium rounded-3xl p-8 lg:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center justify-center w-14 h-14 rounded-2xl bg-brand/10">
                  <selectedType.icon className="w-7 h-7 text-brand" />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold">{selectedType.title}</h3>
                  <p className="text-muted-foreground">{selectedType.subtitle}</p>
                </div>
              </div>

              <p className="text-foreground/80 leading-relaxed mb-6">{selectedType.description}</p>

              <div className="flex flex-wrap gap-4 mb-6 text-sm">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-brand" />
                  <span className="text-muted-foreground">
                    {t.timeLabel}
                    <strong className="text-foreground">{selectedType.timeline}</strong>
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500" />
                  <span className="text-muted-foreground">
                    {t.idealLabel}
                    <strong className="text-foreground">{selectedType.idealFor}</strong>
                  </span>
                </div>
              </div>

              {locale === "ro" && (
                <Link
                  href="/pret-website"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-brand text-brand-foreground rounded-full font-semibold hover:bg-brand-light transition-colors group"
                >
                  {t.calculatePrice}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>

            {/* Features List */}
            <div className="space-y-4">
              <h4 className="font-heading text-lg font-semibold mb-6">{t.includesTitle}</h4>
              {selectedType.features.map((feature, index) => (
                <div
                  key={feature}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-brand/30 transition-colors group"
                  style={{
                    animation: `fadeInRight 0.4s ease-out ${index * 0.08}s forwards`,
                    opacity: 0,
                  }}
                >
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-green-500/10 group-hover:bg-green-500/20 transition-colors">
                    <Check className="w-4 h-4 text-green-500" />
                  </div>
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  )
}
