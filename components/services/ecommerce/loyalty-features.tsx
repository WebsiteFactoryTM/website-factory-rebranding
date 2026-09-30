"use client"

import { useLocale } from "next-intl"
import type { Locale } from "@/i18n/routing"
import { Heart, Gift, Star, Users, Percent, Trophy, Repeat, BadgeCheck } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"

const roCopy = {
  eyebrow: "Customer Loyalty",
  headingPre: "Funcționalități de",
  headingHighlight: " loializare clienți",
  subtitle:
    "Transformă cumpărătorii ocazionali în clienți fideli cu sistemele noastre avansate de loializare și recompense.",
  bottomText: "Toate funcționalitățile sunt complet personalizabile și se integrează perfect cu magazinul tău.",
  tags: ["WooCommerce Ready", "Next.js Compatible", "API First"],
  features: [
    {
      title: "Sistem de puncte",
      description:
        "Clienții acumulează puncte la fiecare achiziție pe care le pot converti în reduceri sau produse gratuite.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Recompense & cadouri",
      description:
        "Surprinde clienții fideli cu cadouri la anumite praguri sau ocazii speciale (ziua de naștere, aniversări).",
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Reduceri exclusive",
      description: "Oferă discount-uri personalizate bazate pe comportamentul de cumpărare și istoricul clientului.",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Niveluri VIP",
      description: "Creează tiers de loialitate (Bronze, Silver, Gold, Platinum) cu beneficii crescătoare.",
      color: "from-brand to-glow-violet",
    },
    {
      title: "Program de referral",
      description: "Încurajează clienții să recomande prieteni în schimbul unor recompense atractive.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Subscripții recurente",
      description: "Automatizează comenzile recurente cu discount pentru produsele consumabile.",
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: "Gamification",
      description: "Badge-uri, achievements și challenges pentru a crește engagementul și timpul petrecut în magazin.",
      color: "from-teal-500 to-green-500",
    },
    {
      title: "Wishlist smart",
      description: "Notifică automat clienții când produsele favorite intră în stoc sau au reducere.",
      color: "from-red-500 to-pink-500",
    },
  ],
}

const enCopy = {
  eyebrow: "Customer Loyalty",
  headingPre: "Features that build",
  headingHighlight: " customer loyalty",
  subtitle: "Turn one-off buyers into repeat customers with our loyalty and rewards systems.",
  bottomText: "Every feature is fully customisable and integrates cleanly with your store.",
  tags: ["WooCommerce Ready", "Next.js Compatible", "API First"],
  features: [
    {
      title: "Points system",
      description: "Customers earn points on every purchase, which they can redeem for discounts or free products.",
      color: "from-yellow-500 to-orange-500",
    },
    {
      title: "Rewards & gifts",
      description: "Surprise loyal customers with gifts at certain milestones or special occasions — birthdays, anniversaries.",
      color: "from-pink-500 to-rose-500",
    },
    {
      title: "Exclusive discounts",
      description: "Offer personalised discounts based on a customer's buying behaviour and history.",
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "VIP tiers",
      description: "Build loyalty tiers — Bronze, Silver, Gold, Platinum — with benefits that grow at each level.",
      color: "from-brand to-glow-violet",
    },
    {
      title: "Referral programme",
      description: "Encourage customers to refer friends in exchange for attractive rewards.",
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "Recurring subscriptions",
      description: "Automate recurring orders with a discount on consumable products.",
      color: "from-purple-500 to-indigo-500",
    },
    {
      title: "Gamification",
      description: "Badges, achievements and challenges that boost engagement and time spent on your store.",
      color: "from-teal-500 to-green-500",
    },
    {
      title: "Smart wishlist",
      description: "Automatically notify customers when their favourite products are back in stock or on offer.",
      color: "from-red-500 to-pink-500",
    },
  ],
}

const copy = { ro: roCopy, en: enCopy } satisfies Record<Locale, typeof roCopy>

const featureIcons = [Star, Gift, Percent, Trophy, Users, Repeat, BadgeCheck, Heart]

export function LoyaltyFeatures() {
  const locale = useLocale()
  const t = copy[locale as Locale]
  const loyaltyFeatures = t.features.map((f, i) => ({ ...f, icon: featureIcons[i] }))
  const { ref, isVisible } = useScrollReveal()

  return (
    <section ref={ref} className="py-16 sm:py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient opacity-30" />

      {/* Decorative elements */}
      <div className="absolute top-1/4 left-0 w-24 sm:w-32 h-24 sm:h-32 pointer-events-none">
        <div
          className="w-full h-full metallic-surface rounded-3xl opacity-20"
          style={{ animation: "morph 14s ease-in-out infinite" }}
        />
      </div>
      <div className="absolute bottom-1/4 right-0 w-16 sm:w-24 h-16 sm:h-24 pointer-events-none">
        <div
          className="w-full h-full bg-gradient-to-br from-glow-cyan/30 to-brand/20 rounded-2xl blur-sm opacity-30"
          style={{ animation: "morph 10s ease-in-out infinite reverse" }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div
          className={cn(
            "text-center max-w-3xl mx-auto mb-10 sm:mb-16 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium mb-4 sm:mb-6">
            <Heart className="w-4 h-4 text-brand" />
            <span className="text-xs sm:text-sm font-medium">{t.eyebrow}</span>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-5xl font-bold mb-4 sm:mb-6">
            {t.headingPre}
            <span className="gradient-text">{t.headingHighlight}</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed px-4">{t.subtitle}</p>
        </div>

        <div
          className={cn(
            "grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6 transition-all duration-1000 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          {loyaltyFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={feature.title}
                className="group relative bg-card rounded-xl sm:rounded-2xl border border-border/50 p-4 sm:p-6 hover:border-brand/30 transition-all duration-500 card-metallic card-lift"
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                {/* Icon */}
                <div
                  className={cn(
                    "w-10 h-10 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl flex items-center justify-center mb-3 sm:mb-4 bg-gradient-to-br transition-transform duration-300 group-hover:scale-110",
                    feature.color,
                  )}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>

                {/* Content */}
                <h3 className="font-heading text-sm sm:text-lg font-bold mb-1 sm:mb-2 group-hover:text-brand transition-colors">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3 sm:line-clamp-none">
                  {feature.description}
                </p>

                {/* Hover glow */}
                <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-br from-brand/5 to-glow-violet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
              </div>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div
          className={cn(
            "mt-10 sm:mt-16 text-center transition-all duration-1000 delay-400",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <p className="text-sm sm:text-base text-muted-foreground mb-3 sm:mb-4 px-4">{t.bottomText}</p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-4 text-xs sm:text-sm">
            {t.tags.map((tag) => (
              <span key={tag} className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-muted border border-border/50">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
