"use client"

import { useState } from "react"
import { useLocale } from "next-intl"
import type { Locale } from "@/i18n/routing"
import { Lightbulb, PenTool, Code2, TestTube, Rocket, Headphones, ChevronDown } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"

const roCopy = {
  eyebrow: "Proces de dezvoltare",
  headingPre: "Cum dezvoltăm ",
  headingHighlight: "aplicația ta",
  subtitle: "Proces Agile structurat cu transparență totală și livrări predictibile.",
  stepLabel: "Pasul ",
  whatYouGet: "Ce primești:",
  durationLabel: "Durată: ",
  steps: [
    {
      title: "Discovery & Analiză",
      duration: "1-2 săptămâni",
      description: "Analizăm cerințele, definim funcționalitățile și creăm specificațiile tehnice.",
      deliverables: ["PRD Document", "User Stories", "Wireframes", "Estimare"],
    },
    {
      title: "UX/UI Design",
      duration: "2-3 săptămâni",
      description: "Design centrat pe utilizator cu prototipuri interactive și sistem de design.",
      deliverables: ["Figma Designs", "Prototip interactiv", "Design System", "Assets"],
    },
    {
      title: "Dezvoltare",
      duration: "4-12 săptămâni",
      description: "Dezvoltare iterativă cu sprint-uri de 2 săptămâni și demo-uri regulate.",
      deliverables: ["Cod sursă", "API Documentation", "Sprint Reviews", "Builds"],
    },
    {
      title: "QA & Testing",
      duration: "1-2 săptămâni",
      description: "Testare completă: unit tests, integration tests, UAT și performance testing.",
      deliverables: ["Test Reports", "Bug Fixes", "Performance Audit", "Security Scan"],
    },
    {
      title: "Lansare",
      duration: "3-5 zile",
      description: "Deploy pe App Store/Google Play sau server de producție cu monitorizare.",
      deliverables: ["Store Submission", "CI/CD Setup", "Monitoring", "Documentation"],
    },
    {
      title: "Suport & Evoluție",
      duration: "Continuu",
      description: "Mentenanță, actualizări și dezvoltare de noi funcționalități.",
      deliverables: ["Updates", "Analytics", "Optimizări", "New Features"],
    },
  ],
}

const enCopy = {
  eyebrow: "Development Process",
  headingPre: "How we build ",
  headingHighlight: "your app",
  subtitle: "A structured Agile process with full transparency and predictable delivery.",
  stepLabel: "Step ",
  whatYouGet: "What you get:",
  durationLabel: "Estimated time: ",
  steps: [
    {
      title: "Discovery & Analysis",
      duration: "1–2 weeks",
      description: "We analyse requirements, define the feature set, and write the technical specification.",
      deliverables: ["Requirements document", "User stories", "Wireframes", "Estimate"],
    },
    {
      title: "UX/UI Design",
      duration: "2–3 weeks",
      description: "User-centred design with interactive prototypes and a proper design system.",
      deliverables: ["Figma designs", "Interactive prototype", "Design system", "Assets"],
    },
    {
      title: "Development",
      duration: "4–12 weeks",
      description: "Iterative development in 2-week sprints with regular demos.",
      deliverables: ["Source code", "API documentation", "Sprint reviews", "Builds"],
    },
    {
      title: "QA & Testing",
      duration: "1–2 weeks",
      description: "Full testing: unit tests, integration tests, UAT and performance testing.",
      deliverables: ["Test reports", "Bug fixes", "Performance audit", "Security scan"],
    },
    {
      title: "Launch",
      duration: "3–5 days",
      description: "Deployed to the App Store/Google Play or your production server, with monitoring in place.",
      deliverables: ["Store submission", "CI/CD setup", "Monitoring", "Documentation"],
    },
    {
      title: "Support & Evolution",
      duration: "Ongoing",
      description: "Maintenance, updates, and new features as your product grows.",
      deliverables: ["Updates", "Analytics", "Optimisations", "New features"],
    },
  ],
}

const copy = { ro: roCopy, en: enCopy } satisfies Record<Locale, typeof roCopy>

const stepIcons = [Lightbulb, PenTool, Code2, TestTube, Rocket, Headphones]

export function AppProcess() {
  const locale = useLocale()
  const t = copy[locale as Locale]
  const processSteps = t.steps.map((step, i) => ({ ...step, icon: stepIcons[i] }))
  const { ref, isVisible } = useScrollReveal()
  const [activeStep, setActiveStep] = useState(0)
  const [expandedMobile, setExpandedMobile] = useState<number | null>(0)

  return (
    <section ref={ref} className="relative py-20 sm:py-28 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient opacity-30" />
      <div className="absolute inset-0 grid-pattern" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section Header */}
        <div
          className={cn(
            "text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium text-sm font-medium mb-6">
            <Code2 className="w-4 h-4 text-brand" />
            {t.eyebrow}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            {t.headingPre}
            <span className="gradient-text">{t.headingHighlight}</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground text-pretty">{t.subtitle}</p>
        </div>

        {/* Desktop: Timeline */}
        <div className="hidden lg:block">
          {/* Progress Bar */}
          <div
            className={cn(
              "relative h-1 bg-border rounded-full mb-12 mx-8 transition-all duration-700 delay-100",
              isVisible ? "opacity-100" : "opacity-0",
            )}
          >
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-brand via-glow-cyan to-glow-violet rounded-full transition-all duration-500"
              style={{ width: `${((activeStep + 1) / processSteps.length) * 100}%` }}
            />
            {/* Step Indicators */}
            <div className="absolute inset-0 flex justify-between -top-3">
              {processSteps.map((step, index) => {
                const Icon = step.icon
                const isCompleted = index <= activeStep
                return (
                  <button
                    key={index}
                    onClick={() => setActiveStep(index)}
                    className={cn(
                      "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 border-2",
                      isCompleted
                        ? "bg-brand border-brand text-brand-foreground scale-110"
                        : "bg-card border-border text-muted-foreground hover:border-brand/50",
                    )}
                  >
                    <Icon className="w-4 h-4" />
                  </button>
                )
              })}
            </div>
          </div>

          {/* Active Step Content */}
          <div
            className={cn(
              "transition-all duration-700 delay-200",
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            )}
          >
            <div className="bg-card/80 border border-border/50 rounded-3xl p-8 lg:p-10">
              <div className="grid lg:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-14 h-14 rounded-2xl bg-brand/10 flex items-center justify-center">
                      {(() => {
                        const Icon = processSteps[activeStep].icon
                        return <Icon className="w-7 h-7 text-brand" />
                      })()}
                    </div>
                    <div>
                      <span className="text-sm text-brand font-medium">{`${t.stepLabel}${activeStep + 1}`}</span>
                      <h3 className="text-2xl font-bold">{processSteps[activeStep].title}</h3>
                    </div>
                  </div>
                  <p className="text-lg text-muted-foreground mb-4">{processSteps[activeStep].description}</p>
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand/10 text-brand font-medium">
                    <span>{`${t.durationLabel}${processSteps[activeStep].duration}`}</span>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold mb-4">{t.whatYouGet}</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {processSteps[activeStep].deliverables.map((item) => (
                      <div
                        key={item}
                        className="px-4 py-3 rounded-xl bg-gradient-to-r from-brand/5 to-glow-cyan/5 border border-brand/10"
                      >
                        <span className="text-sm font-medium">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile/Tablet: Accordion */}
        <div className="lg:hidden space-y-3">
          {processSteps.map((step, index) => {
            const Icon = step.icon
            const isExpanded = expandedMobile === index
            return (
              <div
                key={index}
                className={cn(
                  "rounded-2xl border overflow-hidden transition-all duration-500",
                  isExpanded ? "border-brand/30 bg-brand/5" : "border-border/50 bg-card/50",
                )}
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? "translateY(0)" : "translateY(20px)",
                  transitionDelay: `${index * 100}ms`,
                }}
              >
                <button
                  onClick={() => setExpandedMobile(isExpanded ? null : index)}
                  className="w-full flex items-center justify-between p-4 sm:p-5"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={cn(
                        "w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center transition-colors",
                        isExpanded ? "bg-brand/20" : "bg-muted",
                      )}
                    >
                      <Icon
                        className={cn("w-5 h-5 sm:w-6 sm:h-6", isExpanded ? "text-brand" : "text-muted-foreground")}
                      />
                    </div>
                    <div className="text-left">
                      <span className="text-xs text-brand font-medium">{`${t.stepLabel}${index + 1}`}</span>
                      <h3 className="font-bold text-sm sm:text-base">{step.title}</h3>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground hidden sm:block">{step.duration}</span>
                    <ChevronDown
                      className={cn("w-5 h-5 text-muted-foreground transition-transform", isExpanded && "rotate-180")}
                    />
                  </div>
                </button>

                <div
                  className={cn("grid transition-all duration-500", isExpanded ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
                >
                  <div className="overflow-hidden">
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 space-y-3">
                      <p className="text-sm text-muted-foreground">{step.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {step.deliverables.map((item) => (
                          <span
                            key={item}
                            className="px-3 py-1.5 rounded-full bg-gradient-to-r from-brand/10 to-glow-cyan/10 text-xs font-medium"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
