"use client"

import { useState } from "react"
import { Check, X, Zap, Shield, TrendingUp, Code, Layers, Rocket } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"

const platforms = [
  {
    id: "woocommerce",
    name: "WooCommerce",
    subtitle: "WordPress + WooCommerce",
    description: "Soluția clasică, stabilă și dovedită pentru magazine online. Ecosistem vast de plugin-uri si teme testate si verificate.",
    icon: Layers,
    color: "from-purple-500 to-indigo-600",
    idealFor: "Magazine mici-medii, buget controlat",
    features: [
      { name: "Timp implementare", value: "5-8 săptămâni", positive: true },
      { name: "Cost inițial", value: "Accesibil", positive: true },
      { name: "Ecosistem plugin-uri", value: "50,000+", positive: true },
      { name: "Scalabilitate", value: "Până la ~7000 produse", positive: true },
      { name: "Performanță", value: "Bună (cu optimizare)", positive: true },
      { name: "Personalizare", value: "Extensivă", positive: true },
      { name: "Mentenanță", value: "Necesită actualizări", positive: false },
      { name: "Securitate", value: "Necesită monitorizare", positive: false },
    ],
    highlights: [
      "Familiar și ușor de administrat",
      "Mii de teme și plugin-uri",
      "Comunitate uriașă",
      "Integrări native cu procesatori plăți RO",
    ],
  },
  {
    id: "nextjs",
    name: "Next.js + Payload",
    subtitle: "React + Headless CMS",
    description:
      "Tehnologie de ultimă generație pentru magazine care cer performanță și scalabilitate enterprise-level.",
    icon: Rocket,
    color: "from-brand to-glow-violet",
    idealFor: "Magazine mari, high-traffic, funcționalități avansate",
    features: [
      { name: "Timp implementare", value: "8-12 săptămâni", positive: true },
      { name: "Cost inițial", value: "Investiție mai mare", positive: false },
      { name: "Ecosistem", value: "Modern, în creștere", positive: true },
      { name: "Scalabilitate", value: "Nelimitată", positive: true },
      { name: "Performanță", value: "Excepțională (sub 1s)", positive: true },
      { name: "Personalizare", value: "100% custom", positive: true },
      { name: "Mentenanță", value: "Minimă", positive: true },
      { name: "Securitate", value: "Enterprise-grade", positive: true },
    ],
    highlights: [
      "Performanță sub 1 secundă",
      "SEO nativ exceptional",
      "Scalabilitate cloud",
      "Zero vulnerabilități WordPress",
    ],
  },
]

export function PlatformComparison() {
  const { ref, isVisible } = useScrollReveal()
  const [activePlatform, setActivePlatform] = useState("woocommerce")

  const selectedPlatform = platforms.find((p) => p.id === activePlatform)!

  return (
    <section ref={ref} className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient opacity-50" />
      <div className="absolute inset-0 grid-pattern" />

      {/* Decorative blobs */}
      <div className="absolute top-20 right-20 w-64 h-64 rounded-full bg-brand/10 blur-[100px] pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-48 h-48 rounded-full bg-glow-violet/15 blur-[80px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div
          className={cn(
            "text-center max-w-3xl mx-auto mb-10 sm:mb-16 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium mb-4 sm:mb-6">
            <Code className="w-4 h-4 text-brand" />
            <span className="text-xs sm:text-sm font-medium">Tehnologii eCommerce</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6">
            Alege platforma
            <span className="gradient-text"> potrivită</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed px-4">
            Oferim două direcții tehnologice pentru magazinul tău online. Fiecare cu avantaje specifice, în funcție de
            nevoi și buget.
          </p>
        </div>

        <div
          className={cn(
            "flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 transition-all duration-1000 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          {platforms.map((platform) => {
            const Icon = platform.icon
            const isActive = activePlatform === platform.id
            return (
              <button
                key={platform.id}
                onClick={() => setActivePlatform(platform.id)}
                className={cn(
                  "group relative px-4 sm:px-6 py-3 sm:py-4 rounded-xl sm:rounded-2xl border transition-all duration-500",
                  isActive
                    ? "bg-card border-brand/50 shadow-lg shadow-brand/10"
                    : "bg-card/50 border-border/50 hover:border-brand/30",
                )}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      "w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center bg-gradient-to-br transition-all duration-300",
                      platform.color,
                      isActive ? "opacity-100" : "opacity-60 group-hover:opacity-80",
                    )}
                  >
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <div
                      className={cn("font-semibold text-sm sm:text-base transition-colors", isActive && "text-brand")}
                    >
                      {platform.name}
                    </div>
                    <div className="text-xs text-muted-foreground">{platform.subtitle}</div>
                  </div>
                </div>
                {isActive && (
                  <div className="absolute -bottom-px left-4 sm:left-6 right-4 sm:right-6 h-0.5 bg-gradient-to-r from-brand to-glow-violet rounded-full" />
                )}
              </button>
            )
          })}
        </div>

        <div
          className={cn(
            "grid lg:grid-cols-2 gap-6 sm:gap-8 transition-all duration-1000 delay-300",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          {/* Features Card */}
          <div className="bg-card rounded-2xl sm:rounded-3xl border border-border/50 p-5 sm:p-8 card-metallic">
            <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
              <div
                className={cn(
                  "w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl flex items-center justify-center bg-gradient-to-br",
                  selectedPlatform.color,
                )}
              >
                <selectedPlatform.icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold">{selectedPlatform.name}</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">{selectedPlatform.idealFor}</p>
              </div>
            </div>

            <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8">{selectedPlatform.description}</p>

            <div className="space-y-3 sm:space-y-4">
              {selectedPlatform.features.map((feature) => (
                <div
                  key={feature.name}
                  className="flex items-center justify-between py-2.5 sm:py-3 border-b border-border/30 last:border-0"
                >
                  <span className="text-xs sm:text-sm text-muted-foreground">{feature.name}</span>
                  <div className="flex items-center gap-2">
                    <span
                      className={cn(
                        "text-xs sm:text-sm font-medium",
                        feature.positive ? "text-foreground" : "text-muted-foreground",
                      )}
                    >
                      {feature.value}
                    </span>
                    {feature.positive ? (
                      <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-green-500" />
                    ) : (
                      <X className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-muted-foreground/50" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Highlights Card */}
          <div className="space-y-4 sm:space-y-6">
            <div className="bg-card rounded-2xl sm:rounded-3xl border border-border/50 p-5 sm:p-8">
              <h4 className="font-heading text-lg sm:text-xl font-bold mb-4 sm:mb-6 flex items-center gap-2">
                <Zap className="w-4 h-4 sm:w-5 sm:h-5 text-brand" />
                Avantaje cheie
              </h4>
              <div className="grid gap-3 sm:gap-4">
                {selectedPlatform.highlights.map((highlight, index) => (
                  <div
                    key={highlight}
                    className="flex items-start gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl bg-muted/50 border border-border/30"
                    style={{
                      animation: isVisible ? `fadeInUp 0.5s ease ${index * 0.1}s forwards` : "none",
                      opacity: 0,
                    }}
                  >
                    <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-brand/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-brand" />
                    </div>
                    <span className="text-xs sm:text-sm leading-relaxed">{highlight}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendation Card */}
            <div className="bg-gradient-to-br from-brand/10 to-glow-violet/10 rounded-2xl sm:rounded-3xl border border-brand/20 p-5 sm:p-8">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-brand" />
                <h4 className="font-heading text-base sm:text-lg font-bold">Recomandarea noastră</h4>
              </div>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                {activePlatform === "woocommerce"
                  ? "WooCommerce este alegerea ideală pentru magazine cu până la 7000 de produse și buget controlat. Oferă flexibilitate excelentă și o curbă de învățare redusă pentru administrare."
                  : "Next.js + Payload este recomandat pentru branduri care vizează creștere rapidă, volume mari de trafic și doresc o experiență de cumpărare ultra-rapidă pe orice dispozitiv."}
              </p>
              <div className="mt-3 sm:mt-4 flex items-center gap-2 text-xs sm:text-sm text-brand font-medium">
                <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>
                  {activePlatform === "woocommerce" ? "Perfect pentru lansare rapidă" : "Investiție pe termen lung"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
