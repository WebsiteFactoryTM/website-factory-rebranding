"use client"

import { useLocale } from "next-intl"
import type { Locale } from "@/i18n/routing"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"
import { HelpCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

const roCopy = {
  eyebrow: "Întrebări frecvente",
  headingPre: "Ai ",
  headingHighlight: "întrebări",
  headingEnd: "?",
  subtitle: "Răspunsuri la cele mai frecvente întrebări despre dezvoltarea de aplicații.",
}

const enCopy = {
  eyebrow: "FAQ",
  headingPre: "Got ",
  headingHighlight: "questions",
  headingEnd: "?",
  subtitle: "Answers to the most common questions about app development.",
}

const copy = { ro: roCopy, en: enCopy } satisfies Record<Locale, typeof roCopy>

interface AppFaqProps {
  faqs: { question: string; answer: string }[]
}

export function AppFaq({ faqs }: AppFaqProps) {
  const locale = useLocale()
  const t = copy[locale as Locale]
  const { ref, isVisible } = useScrollReveal()

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
            <HelpCircle className="w-4 h-4 text-brand" />
            {t.eyebrow}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            {t.headingPre}
            <span className="gradient-text">{t.headingHighlight}</span>
            {t.headingEnd}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground text-pretty">{t.subtitle}</p>
        </div>

        {/* FAQ Accordion */}
        <div
          className={cn(
            "max-w-3xl mx-auto transition-all duration-700 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card/80 border border-border/50 rounded-2xl px-5 sm:px-6 overflow-hidden data-[state=open]:border-brand/30 transition-colors"
              >
                <AccordionTrigger className="py-5 sm:py-6 text-left hover:no-underline group">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <span className="flex-shrink-0 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-brand/10 flex items-center justify-center text-xs sm:text-sm font-bold text-brand group-hover:bg-brand/20 transition-colors">
                      {index + 1}
                    </span>
                    <span className="font-semibold text-sm sm:text-base pr-4">{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-5 sm:pb-6 pl-10 sm:pl-12 text-muted-foreground text-sm sm:text-base leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
