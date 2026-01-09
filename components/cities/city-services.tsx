"use client"

import { Monitor, ShoppingCart, Smartphone, Search, Gauge, Palette } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"
import Link from "next/link"

const services = [
  {
    icon: Monitor,
    title: "Website de Prezentare",
    description: "Site-uri profesionale pentru afaceri din București care doresc o prezență online de impact.",
    href: "/servicii/creare-website",
    features: ["Design responsive", "SEO on-page", "CMS integrat"],
  },
  {
    icon: ShoppingCart,
    title: "Magazin Online",
    description: "Soluții eCommerce performante pentru comercianți din capitală, cu integrări complete.",
    href: "/servicii/magazin-online",
    features: ["WooCommerce / Next.js", "Plăți online", "Integrare curier"],
  },
  {
    icon: Smartphone,
    title: "Aplicații Mobile",
    description: "Aplicații native și cross-platform pentru startup-uri și companii din București.",
    href: "/servicii/dezvoltare-aplicatie",
    features: ["React Native", "iOS & Android", "Backend scalabil"],
  },
  {
    icon: Search,
    title: "SEO București",
    description: "Optimizare pentru motoarele de căutare, targetat pe piața din București și România.",
    href: "/contact",
    features: ["Audit SEO", "Link building", "Content strategy"],
  },
  {
    icon: Gauge,
    title: "Optimizare Performanță",
    description: "Site-uri rapide care convertesc vizitatorii în clienți și îmbunătățesc Core Web Vitals.",
    href: "/contact",
    features: ["Core Web Vitals", "Speed optimization", "CDN setup"],
  },
  {
    icon: Palette,
    title: "Branding & Identitate",
    description: "Identitate vizuală completă pentru branduri care vor să iasă în evidență în București.",
    href: "/contact",
    features: ["Logo design", "Brand guidelines", "Materiale grafice"],
  },
]

interface CityServicesProps {
  cityName: string
}

export function CityServices({ cityName }: CityServicesProps) {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient opacity-50" />
      <div className="absolute inset-0 grid-pattern" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div
          ref={ref}
          className={cn(
            "text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium text-xs sm:text-sm font-medium mb-4">
            Servicii complete
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold">
            Servicii Web Design <span className="gradient-text">{cityName}</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
            Oferim o gamă completă de servicii digitale pentru afaceri din {cityName}, de la website-uri de prezentare
            la soluții eCommerce complexe.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon
            return (
              <Link
                key={service.title}
                href={service.href}
                className={cn(
                  "group relative p-6 sm:p-8 rounded-2xl glass-premium border border-border/30 transition-all duration-500 hover:border-brand/50 card-lift card-metallic",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Icon */}
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-brand/10 flex items-center justify-center mb-4 group-hover:bg-brand/20 transition-colors">
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-brand" />
                </div>

                <h3 className="font-heading text-lg sm:text-xl font-bold mb-2 group-hover:text-brand transition-colors">
                  {service.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{service.description}</p>

                {/* Features */}
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <span key={feature} className="text-xs px-2.5 py-1 rounded-full bg-muted/50 text-muted-foreground">
                      {feature}
                    </span>
                  ))}
                </div>

                {/* Hover arrow */}
                <div className="absolute top-6 right-6 w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <svg className="w-4 h-4 text-brand" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
