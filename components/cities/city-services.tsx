"use client"

import { Monitor, ShoppingCart, Smartphone, Search, Gauge, Palette } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"
import Link from "next/link"

interface CityServicesProps {
  cityName: string
}

const getServices = (cityName: string) => {
  const isBrasov = cityName === "Brașov"
  const isBucharest = cityName === "București"
  const isCluj = cityName.includes("Cluj")
  const isConstanta = cityName === "Constanța"
  const isIasi = cityName === "Iași"

  return [
    {
      icon: Monitor,
      title: "Website de Prezentare",
      description: isBrasov
        ? "Site-uri profesionale pentru pensiuni, restaurante și afaceri locale din Brașov și zona Poiană."
        : isBucharest
          ? "Site-uri profesionale pentru afaceri din București care doresc o prezență online puternică."
          : isCluj
            ? "Site-uri profesionale pentru startup-uri și companii tech din Cluj-Napoca."
            : isConstanta
              ? "Site-uri profesionale pentru hoteluri, restaurante și afaceri de pe litoral."
              : "Site-uri profesionale pentru clinici medicale, afaceri și instituții culturale din Iași.",
      href: "/servicii/creare-website",
      features: ["Design responsive", "SEO on-page", "CMS integrat"],
    },
    {
      icon: ShoppingCart,
      title: "Magazin Online",
      description: isBrasov
        ? "Magazine online pentru produse tradiționale, suveniruri și comercianți locali din Brașov."
        : isBucharest
          ? "Soluții eCommerce performante pentru comercianți din capitală, cu integrări complete."
          : isCluj
            ? "Platforme eCommerce scalabile pentru startup-uri și business-uri tech din Cluj."
            : isConstanta
              ? "Magazine online pentru produse maritime, suveniruri și comercianți de pe litoral."
              : "Magazine online pentru retaileri locali din Iași, cu integrări complete de plată și transport.",
      href: "/servicii/magazin-online",
      features: ["WooCommerce / Next.js", "Plăți online", "Integrare curier"],
    },
    {
      icon: Smartphone,
      title: "Soluții Web & Mobile Specializate",
      description: isBrasov
        ? "Site-uri specializate pentru pensiuni, hoteluri, agenții de turism și activități outdoor în Brașov."
        : isBucharest
          ? "Aplicații native și cross-platform pentru startup-uri și companii din București."
          : isCluj
            ? "Aplicații web moderne și MVP-uri pentru startup-uri tech din ecosistemul Cluj."
            : isConstanta
              ? "Site-uri specializate pentru hoteluri, pensiuni, restaurante și afaceri turistice pe litoral."
              : "Site-uri pentru clinici medicale, cabinete stomatologice și centre de diagnostic din Iași.",
      href: isBrasov || isConstanta || isIasi ? "/contact" : "/servicii/dezvoltare-aplicatie",
      features:
        isBrasov || isConstanta
          ? ["Sistem rezervări", "Galerii foto", "Google Maps"]
          : isIasi
            ? ["Programări online", "Prezentare medici", "Istoric pacienți"]
            : ["React Native", "iOS & Android", "Backend scalabil"],
    },
    {
      icon: Search,
      title: `SEO ${isBrasov ? "Brașov" : isBucharest ? "București" : isCluj ? "Cluj" : isConstanta ? "Constanța" : "Iași"}`,
      description: isBrasov
        ? "Optimizare SEO locală pentru Brașov - apari în top când turiștii caută cazare și servicii."
        : isBucharest
          ? "Optimizare pentru motoarele de căutare, targetat pe piața din București și România."
          : isCluj
            ? "Optimizare SEO avansată pentru piața tech și business din Cluj-Napoca."
            : isConstanta
              ? "Optimizare SEO pentru litoral - fii găsit când turiștii caută hoteluri și restaurante pe litoral."
              : "Optimizare SEO locală pentru Iași și Moldova - domină rezultatele pentru clinici și servicii.",
      href: "/contact",
      features: ["Audit SEO", "Link building", "Content strategy"],
    },
    {
      icon: Gauge,
      title: "Optimizare Performanță",
      description:
        "Site-uri rapide care convertesc vizitatorii în clienți și îmbunătățesc Core Web Vitals.",
      href: "/contact",
      features: ["Core Web Vitals", "Speed optimization", "CDN setup"],
    },
    {
      icon: Palette,
      title: "Branding & Identitate",
      description: isBrasov
        ? "Identitate vizuală pentru pensiuni, restaurante și branduri locale din zona Brașov."
        : isIasi
          ? "Identitate vizuală pentru clinici medicale și branduri locale din Iași."
          : `Identitate vizuală completă pentru branduri care vor să iasă în evidență în ${cityName}.`,
      href: "/contact",
      features: ["Logo design", "Brand guidelines", "Materiale grafice"],
    },
  ]
}

export function CityServices({ cityName }: CityServicesProps) {
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>()
  const services = getServices(cityName)

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
