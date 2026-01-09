"use client"

import { useState } from "react"
import {
  Search,
  Palette,
  Database,
  ShoppingBag,
  CreditCard,
  TestTube,
  Rocket,
  HeartHandshake,
  ChevronDown,
  Check,
} from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"

const processSteps = [
  {
    step: 1,
    icon: Search,
    title: "Analiză & Strategie",
    shortTitle: "Analiză",
    duration: "Ziua 1-3",
    description:
      "Analizăm piața, competiția și publicul țintă. Definim strategia de vânzare, categoriile de produse și fluxul ideal de checkout pentru maximizarea conversiilor.",
    deliverables: ["Audit competiție", "Strategie pricing", "Arhitectura magazin"],
    color: "from-blue-500 to-cyan-500",
  },
  {
    step: 2,
    icon: Palette,
    title: "Design UX/UI",
    shortTitle: "Design",
    duration: "Ziua 4-12",
    description:
      "Creăm un design orientat pe conversie: homepage atractiv, pagini de produs optimizate, coș de cumpărături intuitiv și checkout simplificat pentru mobile.",
    deliverables: ["Wireframes UX", "Design complet", "Prototip interactiv"],
    color: "from-violet-500 to-purple-500",
  },
  {
    step: 3,
    icon: Database,
    title: "Setup Catalog",
    shortTitle: "Catalog",
    duration: "Ziua 13-20",
    description:
      "Structurăm catalogul de produse, setăm categorii, filtre și atribute. Importăm produsele și optimizăm descrierile pentru SEO și conversie.",
    deliverables: ["Structură categorii", "Import produse", "SEO produse"],
    color: "from-brand to-indigo-500",
  },
  {
    step: 4,
    icon: CreditCard,
    title: "Plăți & Livrare",
    shortTitle: "Integrări",
    duration: "Ziua 21-25",
    description:
      "Integrăm procesatorii de plăți (card, ramburs, rate), curierii (FanCourier, Sameday, DPD) și sistemele de facturare. Totul automatizat.",
    deliverables: ["Gateway plăți", "Integrare curieri", "Facturare automată"],
    color: "from-green-500 to-emerald-500",
  },
  {
    step: 5,
    icon: ShoppingBag,
    title: "Funcționalități Extra",
    shortTitle: "Features",
    duration: "Ziua 26-30",
    description:
      "Implementăm funcțiile de loializare: puncte de fidelitate, programe referral, wishlist smart, notificări stoc, subscripții și marketing automation.",
    deliverables: ["Sistem loializare", "Marketing automation", "Notificări email"],
    color: "from-amber-500 to-orange-500",
  },
  {
    step: 6,
    icon: TestTube,
    title: "Testare & QA",
    shortTitle: "Test",
    duration: "Ziua 31-35",
    description:
      "Testăm riguros fluxul complet de cumpărare pe toate dispozitivele. Verificăm plățile, livrările, email-urile automate și performanța.",
    deliverables: ["Teste checkout", "Teste plăți", "Optimizare viteză"],
    color: "from-rose-500 to-pink-500",
  },
  {
    step: 7,
    icon: Rocket,
    title: "Lansare",
    shortTitle: "Launch",
    duration: "Ziua 36-37",
    description:
      "Lansăm magazinul live, configurăm Google Analytics eCommerce, setăm tracking conversii și te instruim cum să gestionezi comenzile zilnice.",
    deliverables: ["Magazin live", "Analytics eCommerce", "Training complet"],
    color: "from-cyan-500 to-teal-500",
  },
  {
    step: 8,
    icon: HeartHandshake,
    title: "Suport & Creștere",
    shortTitle: "Suport",
    duration: "Ongoing",
    description:
      "30 zile suport gratuit. Monitorizăm vânzările, rata de abandon coș, optimizăm conversiile și te ajutăm să scalezi afacerea.",
    deliverables: ["Suport 30 zile", "Rapoarte vânzări", "Optimizări CRO"],
    color: "from-brand-light to-brand",
  },
]

export function EcommerceProcess() {
  const [activeStep, setActiveStep] = useState(0)
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 })
  const currentStep = processSteps[activeStep]

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-muted/30">
      <div className="absolute inset-0 grid-pattern opacity-30" />

      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-64 h-64 rounded-full bg-brand/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-10 w-64 h-64 rounded-full bg-glow-cyan/10 blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div
          ref={ref}
          className={cn(
            "text-center mb-12 lg:mb-16 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <span className="inline-block text-sm font-medium text-brand tracking-widest uppercase mb-4">
            Procesul Nostru
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold">
            Cum construim <span className="gradient-text">magazinul tău online</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
            Un proces transparent de 30 de zile, de la concept la vânzări.
          </p>
        </div>

        {/* Mobile Accordion */}
        <div className="lg:hidden space-y-3">
          {processSteps.map((step, index) => {
            const Icon = step.icon
            const isActive = index === activeStep
            const isPast = index < activeStep

            return (
              <div
                key={step.step}
                className={cn(
                  "rounded-2xl border transition-all duration-300 overflow-hidden",
                  isActive ? "border-brand/50 bg-card shadow-lg shadow-brand/10" : "border-border/50 bg-card/50",
                )}
              >
                <button onClick={() => setActiveStep(index)} className="w-full flex items-center gap-4 p-4 text-left">
                  <div
                    className={cn(
                      "relative flex-shrink-0 flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300",
                      isActive
                        ? `bg-gradient-to-br ${step.color} text-white shadow-lg`
                        : isPast
                          ? "bg-brand/20 text-brand border border-brand/30"
                          : "bg-muted text-muted-foreground border border-border",
                    )}
                  >
                    {isPast ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-muted-foreground">Pasul {step.step}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs font-medium text-brand">{step.duration}</span>
                    </div>
                    <h3
                      className={cn(
                        "font-heading font-semibold truncate transition-colors",
                        isActive ? "text-foreground" : "text-foreground/80",
                      )}
                    >
                      {step.title}
                    </h3>
                  </div>

                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0",
                      isActive && "rotate-180 text-brand",
                    )}
                  />
                </button>

                <div
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-4 pt-0 space-y-4">
                      <p className="text-sm text-foreground/80 leading-relaxed">{step.description}</p>
                      <div className="space-y-2">
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          Ce primești:
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {step.deliverables.map((item) => (
                            <span
                              key={item}
                              className={cn(
                                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-gradient-to-r",
                                step.color,
                                "text-white",
                              )}
                            >
                              <Check className="w-3 h-3" />
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block max-w-6xl mx-auto">
          {/* Step Indicators */}
          <div className="relative mb-12">
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-border">
              <div
                className="h-full bg-gradient-to-r from-brand to-glow-cyan transition-all duration-500"
                style={{ width: `${(activeStep / (processSteps.length - 1)) * 100}%` }}
              />
            </div>

            <div className="flex justify-between">
              {processSteps.map((step, index) => {
                const Icon = step.icon
                const isActive = index === activeStep
                const isPast = index < activeStep

                return (
                  <button
                    key={step.step}
                    onClick={() => setActiveStep(index)}
                    className={cn(
                      "flex flex-col items-center gap-2 transition-all duration-300",
                      isActive ? "scale-110" : "hover:scale-105",
                    )}
                  >
                    <div
                      className={cn(
                        "relative flex items-center justify-center w-12 h-12 rounded-full border-2 transition-all duration-300",
                        isActive
                          ? "bg-brand border-brand text-brand-foreground scale-110 glow-brand"
                          : isPast
                            ? "bg-brand/20 border-brand text-brand"
                            : "bg-card border-border text-muted-foreground hover:border-brand/50",
                      )}
                    >
                      {isPast ? <Check className="w-5 h-5" /> : <Icon className="w-5 h-5" />}
                    </div>
                    <div className="text-center max-w-[80px]">
                      <p
                        className={cn(
                          "text-xs font-semibold transition-colors leading-tight",
                          isActive ? "text-brand" : "text-muted-foreground",
                        )}
                      >
                        {step.shortTitle}
                      </p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Active Step Details */}
          <div
            key={currentStep.step}
            className="grid lg:grid-cols-2 gap-8 animate-in fade-in slide-in-from-bottom-4 duration-500"
          >
            <div className="glass-premium rounded-3xl p-8 lg:p-10">
              <div className="flex items-center gap-4 mb-6">
                <div
                  className={cn(
                    "flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br",
                    currentStep.color,
                  )}
                >
                  <currentStep.icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Pasul {currentStep.step}</p>
                  <h3 className="font-heading text-2xl font-bold">{currentStep.title}</h3>
                </div>
              </div>

              <p className="text-foreground/80 leading-relaxed mb-6">{currentStep.description}</p>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-brand" />
                <span>
                  Durată estimată: <strong className="text-foreground">{currentStep.duration}</strong>
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="font-heading text-lg font-semibold mb-6">Ce primești:</h4>
              {currentStep.deliverables.map((item, index) => (
                <div
                  key={item}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border/50 hover:border-brand/30 transition-colors group"
                  style={{
                    animation: `fadeInRight 0.4s ease-out ${index * 0.1}s forwards`,
                    opacity: 0,
                  }}
                >
                  <div
                    className={cn(
                      "flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br",
                      currentStep.color,
                    )}
                  >
                    <span className="text-white font-bold">{index + 1}</span>
                  </div>
                  <span className="font-medium">{item}</span>
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
