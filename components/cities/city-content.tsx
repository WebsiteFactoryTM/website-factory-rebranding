"use client"

import type React from "react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { FloatingElement } from "@/components/ui/floating-element"
import { cn } from "@/lib/utils"
import { CheckCircle2, TrendingUp } from "lucide-react"

interface IndustryCard {
  icon: React.ComponentType<{ className?: string }>
  title: string
  description: string
  color: string
  iconColor: string
}

interface ServiceItem {
  title: string
  description: string
}

interface CityContentProps {
  cityName: string
  heroTitle: string
  heroDescription: React.ReactNode
  industries: IndustryCard[]
  servicesTitle: string
  servicesDescription: React.ReactNode
  servicesList: ServiceItem[]
  seoTitle: string
  seoDescription: React.ReactNode
  seoBenefits: string[]
  whyUsTitle: string
  whyUsDescription: React.ReactNode
  specialFeature?: {
    icon: React.ComponentType<{ className?: string }>
    title: string
    description: string
    iconColor: string
  }
  ctaText: React.ReactNode
}

export function CityContent({
  cityName,
  heroTitle,
  heroDescription,
  industries,
  servicesTitle,
  servicesDescription,
  servicesList,
  seoTitle,
  seoDescription,
  seoBenefits,
  whyUsTitle,
  whyUsDescription,
  specialFeature,
  ctaText,
}: CityContentProps) {
  const { ref: heroRef, isVisible: heroVisible } = useScrollReveal<HTMLDivElement>()
  const { ref: industriesRef, isVisible: industriesVisible } = useScrollReveal<HTMLDivElement>()
  const { ref: servicesRef, isVisible: servicesVisible } = useScrollReveal<HTMLDivElement>()
  const { ref: seoRef, isVisible: seoVisible } = useScrollReveal<HTMLDivElement>()
  const { ref: whyUsRef, isVisible: whyUsVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-gradient opacity-30" />
      <div className="absolute inset-0 grid-pattern opacity-20" />
      
      {/* Floating Elements */}
      <FloatingElement
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-brand/5 blur-[120px]"
        delay={0}
        duration={14}
      >
        <div />
      </FloatingElement>
      <FloatingElement
        className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full bg-glow-violet/5 blur-[100px]"
        delay={2}
        duration={12}
      >
        <div />
      </FloatingElement>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Hero Section */}
        <div
          ref={heroRef}
          className={cn(
            "max-w-4xl mx-auto text-center mb-20 transition-all duration-700",
            heroVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            {heroTitle}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
            {heroDescription}
          </p>
        </div>

        {/* Industry Cards */}
        <div
          ref={industriesRef}
          className={cn(
            "grid sm:grid-cols-2 gap-6 lg:gap-8 mb-20 transition-all duration-700",
            industriesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
          )}
        >
          {industries.map((industry, index) => {
            const Icon = industry.icon
            return (
              <div
                key={industry.title}
                className={cn(
                  "group relative p-8 lg:p-10 rounded-3xl",
                  "bg-card/80 backdrop-blur-sm border border-border/50",
                  "transition-all duration-500 hover:duration-300",
                  "hover:border-brand/50 hover:shadow-2xl hover:shadow-brand/10",
                  "card-lift",
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                {/* Gradient overlay on hover */}
                <div
                  className={cn(
                    "absolute inset-0 rounded-3xl bg-gradient-to-br opacity-0 group-hover:opacity-100 transition-opacity duration-500",
                    industry.color,
                  )}
                />
                
                <div className="relative z-10">
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300"
                    style={{
                      backgroundColor:
                        industry.iconColor === "amber-500"
                          ? "rgba(245, 158, 11, 0.1)"
                          : industry.iconColor === "brand"
                            ? "rgba(48, 40, 178, 0.1)"
                            : industry.iconColor === "cyan-500"
                              ? "rgba(6, 182, 212, 0.1)"
                              : industry.iconColor === "violet-500"
                                ? "rgba(139, 92, 246, 0.1)"
                                : industry.iconColor === "glow-cyan"
                                  ? "rgba(6, 182, 212, 0.1)"
                                  : "rgba(48, 40, 178, 0.1)",
                    }}
                  >
                    <Icon
                      className="w-8 h-8"
                      style={{
                        color:
                          industry.iconColor === "amber-500"
                            ? "#f59e0b"
                            : industry.iconColor === "brand"
                              ? "#3028b2"
                              : industry.iconColor === "cyan-500"
                                ? "#06b6d4"
                                : industry.iconColor === "violet-500"
                                  ? "#8b5cf6"
                                  : industry.iconColor === "glow-cyan"
                                    ? "#06b6d4"
                                    : "#3028b2",
                      }}
                    />
                  </div>
                  <h3 className="font-heading text-xl lg:text-2xl font-bold text-foreground mb-3 group-hover:text-brand transition-colors">
                    {industry.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">{industry.description}</p>
                </div>

                {/* Corner accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-brand/10 to-transparent rounded-bl-[100px] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            )
          })}
        </div>

        {/* Services Section */}
        <div
          ref={servicesRef}
          className={cn(
            "mb-20 transition-all duration-700",
            servicesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
          )}
        >
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
              {servicesTitle}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed">{servicesDescription}</p>
          </div>

          {/* Services Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {servicesList.map((service, index) => (
              <div
                key={service.title}
                className={cn(
                  "group relative p-6 rounded-2xl",
                  "bg-card/60 backdrop-blur-sm border border-border/30",
                  "transition-all duration-300",
                  "hover:border-brand/50 hover:bg-card/80 hover:shadow-lg",
                  "hover:-translate-y-1",
                )}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="flex items-start gap-4">
                  <div className="w-2 h-2 rounded-full bg-brand mt-2 flex-shrink-0 group-hover:scale-150 transition-transform" />
                  <div className="flex-1">
                    <h4 className="font-heading text-lg font-bold text-foreground mb-2 group-hover:text-brand transition-colors">
                      {service.title}
                    </h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SEO Section */}
        <div
          ref={seoRef}
          className={cn(
            "mb-20 transition-all duration-700",
            seoVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
          )}
        >
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
                {seoTitle}
              </h3>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                {seoDescription}
              </p>
            </div>

            {/* SEO Benefits Card */}
            <div className="relative p-8 lg:p-10 rounded-3xl bg-gradient-to-br from-brand/10 via-glow-violet/5 to-glow-cyan/10 border border-brand/20 overflow-hidden">
              {/* Decorative elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-brand/5 rounded-full blur-[100px]" />
              <div className="absolute bottom-0 left-0 w-48 h-48 bg-glow-cyan/5 rounded-full blur-[80px]" />
              
              <div className="relative z-10">
                <div className="flex items-start gap-6 mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-brand/20 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-8 h-8 text-brand" />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-heading text-xl font-bold text-foreground mb-4">
                      Beneficii SEO Local {cityName}:
                    </h4>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {seoBenefits.map((benefit, index) => (
                        <div
                          key={index}
                          className="flex items-start gap-3 group"
                        >
                          <CheckCircle2 className="w-5 h-5 text-brand mt-0.5 flex-shrink-0 group-hover:scale-110 transition-transform" />
                          <span className="text-muted-foreground group-hover:text-foreground transition-colors">
                            {benefit}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Why Us Section */}
        <div
          ref={whyUsRef}
          className={cn(
            "mb-12 transition-all duration-700",
            whyUsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
          )}
        >
          <div className="max-w-4xl mx-auto">
            <h3 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6 text-center">
              {whyUsTitle}
            </h3>
            <p className="text-lg text-muted-foreground leading-relaxed mb-8 text-center">
              {whyUsDescription}
            </p>
          </div>
        </div>

        {/* Special Feature Card */}
        {specialFeature && (
          <div className="max-w-4xl mx-auto mb-12">
            <div className="relative p-8 lg:p-10 rounded-3xl glass-premium border border-border/50 overflow-hidden group hover:border-brand/50 transition-all duration-500">
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-brand/5 via-transparent to-glow-violet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex items-start gap-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300"
                  style={{
                    backgroundColor:
                      specialFeature.iconColor === "amber-500"
                        ? "rgba(245, 158, 11, 0.1)"
                        : specialFeature.iconColor === "brand"
                          ? "rgba(48, 40, 178, 0.1)"
                          : specialFeature.iconColor === "cyan-500"
                            ? "rgba(6, 182, 212, 0.1)"
                            : specialFeature.iconColor === "glow-cyan"
                              ? "rgba(6, 182, 212, 0.1)"
                              : "rgba(48, 40, 178, 0.1)",
                  }}
                >
                  {(() => {
                    const Icon = specialFeature.icon
                    return (
                      <Icon
                        className="w-8 h-8"
                        style={{
                          color:
                            specialFeature.iconColor === "amber-500"
                              ? "#f59e0b"
                              : specialFeature.iconColor === "brand"
                                ? "#3028b2"
                                : specialFeature.iconColor === "cyan-500"
                                  ? "#06b6d4"
                                  : specialFeature.iconColor === "glow-cyan"
                                    ? "#06b6d4"
                                    : "#3028b2",
                        }}
                      />
                    )
                  })()}
                </div>
                <div className="flex-1">
                  <h4 className="font-heading text-xl font-bold text-foreground mb-3 group-hover:text-brand transition-colors">
                    {specialFeature.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed">{specialFeature.description}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CTA Section */}
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-lg text-muted-foreground leading-relaxed">
            {ctaText}
          </p>
        </div>
      </div>
    </section>
  )
}

