"use client"

import { useState } from "react"
import { useLocale } from "next-intl"
import type { Locale } from "@/i18n/routing"
import { Search, PenTool, Code2, TestTube, Rocket, HeartHandshake, ChevronDown, Check } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"

const roCopy = {
  eyebrow: "Procesul Nostru",
  headingPre: "Cum creăm ",
  headingHighlight: "website-ul tău",
  subtitle: "Un proces transparent, testat pe 150+ proiecte. Știi exact ce se întâmplă în fiecare etapă.",
  stepLabel: "Pasul ",
  whatYouGet: "Ce primești:",
  durationLabel: "Durată estimată: ",
  steps: [
    {
      step: 1,
      title: "Descoperire",
      shortTitle: "Brief",
      duration: "Ziua 1-2",
      description:
        "Începem cu o întâlnire de discovery unde înțelegem afacerea ta, obiectivele, publicul țintă și competiția. Analizăm ce funcționează și ce nu în industria ta.",
      deliverables: ["Brief de proiect", "Analiza competiție", "Propunere soluție"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      step: 2,
      title: "Design & Prototip",
      shortTitle: "Design",
      duration: "Ziua 3-7",
      description:
        "Creăm wireframe-uri și mockup-uri interactive. Validăm fiecare decizie de design cu tine înainte de a trece la implementare. Revizuiri nelimitate până ești mulțumit.",
      deliverables: ["Wireframes", "Design UI complet", "Prototip interactiv"],
      color: "from-violet-500 to-purple-500",
    },
    {
      step: 3,
      title: "Dezvoltare",
      shortTitle: "Code",
      duration: "Ziua 8-14",
      description:
        "Construim site-ul folosind cele mai noi tehnologii. Cod curat, performant, optimizat SEO din prima zi. Fiecare linie de cod este scrisă pentru viteză și scalabilitate.",
      deliverables: ["Frontend responsive", "Integrare CMS", "Optimizare performanță"],
      color: "from-brand to-indigo-500",
    },
    {
      step: 4,
      title: "Testare & QA",
      shortTitle: "Test",
      duration: "Ziua 15-17",
      description:
        "Testăm riguros pe toate browserele și dispozitivele. Verificăm performanța, securitatea și funcționalitățile. Corectăm orice problemă înainte de lansare.",
      deliverables: ["Raport testare", "Optimizări finale", "Checklist lansare"],
      color: "from-amber-500 to-orange-500",
    },
    {
      step: 5,
      title: "Lansare",
      shortTitle: "Launch",
      duration: "Ziua 18-20",
      description:
        "Configurăm hosting, domeniu și SSL. Lansăm site-ul live, setăm Google Analytics și Search Console. Te ghidăm prin toate setările importante.",
      deliverables: ["Site live", "Analytics setup", "Training administrare"],
      color: "from-green-500 to-emerald-500",
    },
    {
      step: 6,
      title: "Suport & Creștere",
      shortTitle: "Suport",
      duration: "Ongoing",
      description:
        "30 de zile suport gratuit post-lansare. Monitorizăm performanța, oferim recomandări de optimizare și suntem aici pentru orice întrebare sau ajustare.",
      deliverables: ["Suport 30 zile", "Rapoarte performanță", "Consultanță SEO"],
      color: "from-pink-500 to-rose-500",
    },
  ],
}

const copy = { ro: roCopy, en: roCopy } satisfies Record<Locale, typeof roCopy>

const stepIcons = [Search, PenTool, Code2, TestTube, Rocket, HeartHandshake]

export function InteractiveProcess() {
  const locale = useLocale()
  const t = copy[locale as Locale]
  const processSteps = t.steps.map((step, i) => ({ ...step, icon: stepIcons[i] }))
  const [activeStep, setActiveStep] = useState(0)
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 })
  const currentStep = processSteps[activeStep]

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-muted/30">
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div
          ref={ref}
          className={cn(
            "text-center mb-12 lg:mb-16 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <span className="inline-block text-sm font-medium text-brand tracking-widest uppercase mb-4">
            {t.eyebrow}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold">
            {t.headingPre}
            <span className="gradient-text">{t.headingHighlight}</span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

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
                {/* Step Header - Always visible, clickable */}
                <button onClick={() => setActiveStep(index)} className="w-full flex items-center gap-4 p-4 text-left">
                  {/* Step number with icon */}
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

                  {/* Step info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-muted-foreground">{`${t.stepLabel}${step.step}`}</span>
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

                  {/* Expand icon */}
                  <ChevronDown
                    className={cn(
                      "w-5 h-5 text-muted-foreground transition-transform duration-300 flex-shrink-0",
                      isActive && "rotate-180 text-brand",
                    )}
                  />
                </button>

                {/* Expandable content */}
                <div
                  className={cn(
                    "grid transition-all duration-300 ease-in-out",
                    isActive ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-4 pt-0 space-y-4">
                      {/* Description */}
                      <p className="text-sm text-foreground/80 leading-relaxed">{step.description}</p>

                      {/* Deliverables */}
                      <div className="space-y-2">
                        <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                          {t.whatYouGet}
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

        <div className="hidden lg:block max-w-6xl mx-auto">
          {/* Step Indicators */}
          <div className="relative mb-12">
            {/* Progress line */}
            <div className="absolute top-6 left-0 right-0 h-0.5 bg-border">
              <div
                className="h-full bg-gradient-to-r from-brand to-brand-light transition-all duration-500"
                style={{ width: `${(activeStep / (processSteps.length - 1)) * 100}%` }}
              />
            </div>

            {/* Steps */}
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
                      "flex flex-col items-center gap-3 transition-all duration-300",
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
                    <div className="text-center">
                      <p
                        className={cn(
                          "text-sm font-semibold transition-colors",
                          isActive ? "text-brand" : "text-muted-foreground",
                        )}
                      >
                        {step.title}
                      </p>
                      <p className="text-xs text-muted-foreground">{step.duration}</p>
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
            {/* Info */}
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
                  <p className="text-sm text-muted-foreground">{`${t.stepLabel}${currentStep.step}`}</p>
                  <h3 className="font-heading text-2xl font-bold">{currentStep.title}</h3>
                </div>
              </div>

              <p className="text-foreground/80 leading-relaxed mb-6">{currentStep.description}</p>

              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-brand" />
                <span>
                  {t.durationLabel}
                  <strong className="text-foreground">{currentStep.duration}</strong>
                </span>
              </div>
            </div>

            {/* Deliverables */}
            <div className="space-y-4">
              <h4 className="font-heading text-lg font-semibold mb-6">{t.whatYouGet}</h4>
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
