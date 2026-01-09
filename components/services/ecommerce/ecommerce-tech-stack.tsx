"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"
import { Check, Zap } from "lucide-react"

const platforms = [
  {
    name: "WooCommerce + WordPress",
    subtitle: "Soluția clasică, flexibilă",
    description: "Perfect pentru magazine mici și medii cu buget controlat și administrare simplă.",
    icon: "🛒",
    color: "from-purple-500 to-violet-600",
    features: [
      { name: "WordPress CMS", desc: "Administrare intuitivă" },
      { name: "WooCommerce Core", desc: "Funcționalități complete" },
      { name: "Teme Premium", desc: "Design personalizabil" },
      { name: "Plugin-uri Pro", desc: "Extindere nelimitată" },
      { name: "PHP & MySQL", desc: "Tehnologie dovedită" },
      { name: "Hosting optimizat", desc: "Performanță garantată" },
    ],
    benefits: ["Cost accesibil", "Administrare ușoară", "Ecosistem vast"],
  },
  {
    name: "Next.js + Payload CMS",
    subtitle: "Tehnologia viitorului",
    description: "Arhitectură headless pentru magazine high-performance cu scalabilitate nelimitată.",
    icon: "⚡",
    color: "from-brand to-cyan-500",
    recommended: true,
    features: [
      { name: "Next.js 15", desc: "React framework #1" },
      { name: "Payload CMS", desc: "Headless modern" },
      { name: "TypeScript", desc: "Cod type-safe" },
      { name: "Vercel Edge", desc: "CDN global rapid" },
      { name: "PostgreSQL", desc: "Database scalabilă" },
      { name: "API REST/GraphQL", desc: "Integrări flexibile" },
    ],
    benefits: ["Viteză <1s", "Scalabilitate nelimitată", "SEO perfect"],
  },
]

const integrations = [
  {
    category: "Plăți",
    items: ["Stripe", "Netopia", "PayU", "EuPlatesc", "Apple Pay", "Google Pay"],
    icon: "💳",
  },
  {
    category: "Curieri",
    items: ["FanCourier", "Sameday", "DPD", "Cargus", "GLS"],
    icon: "📦",
  },
  {
    category: "ERP & Facturare",
    items: ["SmartBill", "Facturis", "SAGA", "Oblio", "FGO"],
    icon: "📊",
  },
  {
    category: "Marketing",
    items: ["Klaviyo", "Mailchimp", "Meta Pixel", "Google Ads", "TikTok Pixel", "Hotjar"],
    icon: "📈",
  },
]

export function EcommerceTechStack() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="relative py-16 sm:py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Decorative blobs */}
      <div className="absolute top-1/4 right-0 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-brand/5 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-glow-violet/10 blur-[120px] pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div
          ref={ref}
          className={cn(
            "text-center mb-10 sm:mb-16 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <span className="inline-block text-xs sm:text-sm font-medium text-brand tracking-widest uppercase mb-3 sm:mb-4">
            Tehnologii
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold px-4">
            Două platforme, <span className="gradient-text">zero compromisuri</span>
          </h2>
          <p className="mt-3 sm:mt-4 text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
            Alegi tu platforma sau te ajutăm noi să decizi în funcție de obiectivele tale.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 sm:gap-8 max-w-5xl mx-auto mb-16 sm:mb-20">
          {platforms.map((platform, index) => (
            <div
              key={platform.name}
              className={cn(
                "relative group rounded-2xl sm:rounded-3xl border transition-all duration-500",
                platform.recommended
                  ? "border-brand/50 bg-gradient-to-b from-brand/10 to-transparent"
                  : "border-border/50 bg-card/50 hover:border-brand/30",
              )}
              style={{
                animation: isVisible ? `fadeInUp 0.6s ease-out ${index * 0.2}s forwards` : "none",
                opacity: isVisible ? undefined : 0,
              }}
            >
              {platform.recommended && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 sm:px-4 py-1 rounded-full bg-brand text-white text-[10px] sm:text-xs font-semibold whitespace-nowrap">
                  Recomandat pentru scalare
                </div>
              )}

              <div className="p-5 sm:p-8">
                {/* Header */}
                <div className="flex items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                  <div
                    className={cn(
                      "flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-gradient-to-br text-xl sm:text-2xl flex-shrink-0",
                      platform.color,
                    )}
                  >
                    {platform.icon}
                  </div>
                  <div>
                    <h3 className="font-heading text-lg sm:text-xl font-bold">{platform.name}</h3>
                    <p className="text-xs sm:text-sm text-muted-foreground">{platform.subtitle}</p>
                  </div>
                </div>

                <p className="text-sm sm:text-base text-foreground/80 mb-4 sm:mb-6">{platform.description}</p>

                <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4 sm:mb-6">
                  {platform.features.map((feature) => (
                    <div
                      key={feature.name}
                      className="flex items-start gap-1.5 sm:gap-2 p-2 sm:p-3 rounded-lg sm:rounded-xl bg-muted/50 border border-border/50"
                    >
                      <Check className="w-3 h-3 sm:w-4 sm:h-4 text-brand mt-0.5 flex-shrink-0" />
                      <div className="min-w-0">
                        <p className="text-xs sm:text-sm font-medium truncate">{feature.name}</p>
                        <p className="text-[10px] sm:text-xs text-muted-foreground truncate">{feature.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Benefits */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {platform.benefits.map((benefit) => (
                    <span
                      key={benefit}
                      className={cn(
                        "inline-flex items-center gap-1 sm:gap-1.5 px-2 sm:px-3 py-1 sm:py-1.5 rounded-full text-[10px] sm:text-xs font-medium bg-gradient-to-r text-white",
                        platform.color,
                      )}
                    >
                      <Zap className="w-2.5 h-2.5 sm:w-3 sm:h-3" />
                      {benefit}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Integrations */}
        <div className="text-center mb-8 sm:mb-12">
          <h3 className="font-heading text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4">
            Integrări <span className="gradient-text">native</span>
          </h3>
          <p className="text-sm sm:text-base text-muted-foreground px-4">
            Conectăm magazinul tău cu toate serviciile necesare pentru automatizare completă.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6 max-w-5xl mx-auto">
          {integrations.map((category, index) => (
            <div
              key={category.category}
              className="glass-premium rounded-xl sm:rounded-2xl p-4 sm:p-6 text-center"
              style={{
                animation: isVisible ? `fadeInUp 0.6s ease-out ${0.4 + index * 0.1}s forwards` : "none",
                opacity: isVisible ? undefined : 0,
              }}
            >
              <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">{category.icon}</div>
              <h4 className="font-heading font-bold text-sm sm:text-base mb-3 sm:mb-4">{category.category}</h4>
              <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                {category.items.map((item) => (
                  <span
                    key={item}
                    className="px-1.5 sm:px-2 py-0.5 sm:py-1 rounded-md bg-muted text-[10px] sm:text-xs font-medium text-muted-foreground"
                  >
                    {item}
                  </span>
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
