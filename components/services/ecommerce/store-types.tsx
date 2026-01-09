"use client"

import { useState } from "react"
import { ShoppingBag, Store, Building2, Sparkles, Check, ArrowRight, ChevronDown } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"
import Link from "next/link"

const storeTypes = [
  {
    id: "startup",
    icon: ShoppingBag,
    name: "Magazin Start-up",
    description: "Pentru antreprenori la început de drum care vor să vândă online rapid și eficient.",
    features: [
      "Până la 100 produse",
      "Design template premium",
      "Plăți card + ramburs",
      "Integrare curier (FanCourier/Sameday)",
      "Administrare simplă",
      "SSL & GDPR incluse",
    ],
    idealFor: "Afaceri noi, testare piață, produse de nișă",
    timeline: "3-4 săptămâni",
    platform: "WooCommerce",
  },
  {
    id: "growth",
    icon: Store,
    name: "Magazin Business",
    description: "Soluția completă pentru afaceri în creștere care doresc funcționalități avansate.",
    features: [
      "Până la 1000 produse",
      "Design personalizat",
      "Multiple metode de plată",
      "Sistem de reduceri avansat",
      "Program de loializare clienți",
      "Integrări ERP/facturare",
      "Analytics & rapoarte",
      "Email marketing integrat",
    ],
    idealFor: "Afaceri în creștere, multiple categorii, echipă dedicată",
    timeline: "6-8 săptămâni",
    platform: "WooCommerce / Next.js",
    popular: true,
  },
  {
    id: "enterprise",
    icon: Building2,
    name: "Magazin Enterprise",
    description: "Platformă eCommerce scalabilă pentru volume mari și cerințe complexe.",
    features: [
      "Produse nelimitate",
      "Design & UX 100% custom",
      "Multi-vendor marketplace",
      "B2B + B2C în aceeași platformă",
      "API pentru integrări",
      "Multi-limbă & multi-valută",
      "Performance optimizat (sub 1s)",
      "Infrastructură cloud scalabilă",
      "SLA & suport dedicat",
    ],
    idealFor: "Companii cu vechime, marketplace-uri, volume mari de tranzacții",
    timeline: "8-12 săptămâni",
    platform: "Next.js + Payload CMS",
  },
]

export function StoreTypes() {
  const { ref, isVisible } = useScrollReveal()
  const [activeType, setActiveType] = useState("growth")
  const [expandedMobile, setExpandedMobile] = useState<string | null>("growth")

  return (
    <section ref={ref} className="pt-20 sm:pt-28 lg:pt-36 pb-16 sm:pb-24 lg:pb-32 bg-muted/30 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-72 sm:w-96 h-72 sm:h-96 bg-brand/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 sm:w-72 h-48 sm:h-72 bg-glow-violet/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10 overflow-visible">
        {/* Header */}
        <div
          className={cn(
            "text-center max-w-3xl mx-auto mb-10 sm:mb-16 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium mb-4 sm:mb-6">
            <Sparkles className="w-4 h-4 text-brand" />
            <span className="text-xs sm:text-sm font-medium">Tipuri de magazine</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Ce tip de magazin
            <span className="gradient-text"> ai nevoie?</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed px-4">
            Indiferent de dimensiunea afacerii tale, avem soluția potrivită. De la magazine mici la platforme
            enterprise.
          </p>
        </div>

        <div
          className={cn(
            "grid md:grid-cols-3 gap-4 sm:gap-6 transition-all duration-1000 delay-200 overflow-visible",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          {storeTypes.map((type, index) => {
            const Icon = type.icon
            const isActive = activeType === type.id
            const isExpanded = expandedMobile === type.id
            return (
              <div
                key={type.id}
                className={cn(
                  "group relative bg-card rounded-2xl sm:rounded-3xl border transition-all duration-500 cursor-pointer card-metallic overflow-visible",
                  type.popular ? "pt-7 sm:pt-8 pb-5 sm:pb-8 px-5 sm:px-8" : "p-5 sm:p-8",
                  isActive
                    ? "border-brand/50 shadow-xl shadow-brand/10 md:scale-[1.02]"
                    : "border-border/50 hover:border-brand/30",
                  type.popular && "ring-2 ring-brand/20",
                )}
                onClick={() => {
                  setActiveType(type.id)
                  setExpandedMobile(expandedMobile === type.id ? null : type.id)
                }}
                style={{
                  animationDelay: `${index * 100}ms`,
                }}
              >
                {/* Popular badge */}
                {type.popular && (
                  <div className="absolute -top-2.5 sm:-top-3 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-1 rounded-full bg-brand text-brand-foreground text-[10px] sm:text-xs font-semibold whitespace-nowrap z-20 shadow-lg">
                    Cel mai popular
                  </div>
                )}

                {/* Header Row - always visible */}
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 sm:gap-4">
                    {/* Icon */}
                    <div
                      className={cn(
                        "w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl flex items-center justify-center transition-all duration-300 flex-shrink-0",
                        isActive ? "bg-gradient-to-br from-brand to-glow-violet" : "bg-muted group-hover:bg-brand/10",
                      )}
                    >
                      <Icon
                        className={cn(
                          "w-6 h-6 sm:w-8 sm:h-8 transition-colors",
                          isActive ? "text-white" : "text-brand",
                        )}
                      />
                    </div>
                    <div>
                      <h3 className="font-heading text-lg sm:text-xl font-bold">{type.name}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-1 line-clamp-2 md:line-clamp-none">
                        {type.description}
                      </p>
                    </div>
                  </div>
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-muted-foreground transition-transform md:hidden flex-shrink-0",
                      isExpanded && "rotate-180",
                    )}
                  />
                </div>

                <div
                  className={cn(
                    "overflow-hidden transition-all duration-500 md:overflow-visible",
                    isExpanded
                      ? "max-h-[800px] opacity-100 mt-4 sm:mt-6"
                      : "max-h-0 opacity-0 md:max-h-none md:opacity-100 md:mt-6",
                  )}
                >
                  {/* Features */}
                  <ul className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    {type.features.slice(0, isActive ? type.features.length : 4).map((feature) => (
                      <li key={feature} className="flex items-start gap-2 text-xs sm:text-sm">
                        <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                    {!isActive && type.features.length > 4 && (
                      <li className="text-xs sm:text-sm text-brand font-medium">
                        + {type.features.length - 4} mai multe...
                      </li>
                    )}
                  </ul>

                  {/* Meta info */}
                  <div className="pt-4 sm:pt-6 border-t border-border/50 space-y-2 sm:space-y-3">
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground">Platformă</span>
                      <span className="font-medium">{type.platform}</span>
                    </div>
                    <div className="flex justify-between text-xs sm:text-sm">
                      <span className="text-muted-foreground">Timp livrare</span>
                      <span className="font-medium">{type.timeline}</span>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:justify-between text-xs sm:text-sm gap-1">
                      <span className="text-muted-foreground">Ideal pentru</span>
                      <span className="font-medium sm:text-right sm:max-w-[60%]">{type.idealFor}</span>
                    </div>
                  </div>

                  {/* CTA */}
                  {isActive && (
                    <Link
                      href="/contact"
                      className="mt-4 sm:mt-6 w-full flex items-center justify-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-brand text-brand-foreground font-semibold text-xs sm:text-sm hover:bg-brand-light transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      Solicită ofertă
                      <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </Link>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
