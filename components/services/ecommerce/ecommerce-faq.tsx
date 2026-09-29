"use client"

import { useLocale } from "next-intl"
import type { Locale } from "@/i18n/routing"
import { HelpCircle } from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"

const roCopy = {
  eyebrow: "Întrebări frecvente",
  headingPre: "Întrebări despre",
  headingHighlight: " magazine online",
  subtitle: "Răspunsuri la cele mai comune întrebări despre crearea și administrarea unui magazin online.",
}

const enCopy = {
  eyebrow: "FAQ",
  headingPre: "Questions about",
  headingHighlight: " online stores",
  subtitle: "Answers to the most common questions about building and running an online store.",
}

const copy = { ro: roCopy, en: enCopy } satisfies Record<Locale, typeof roCopy>

interface EcommerceFaqProps {
  faqs: { question: string; answer: string }[]
}

export function EcommerceFaq({ faqs }: EcommerceFaqProps) {
  const locale = useLocale()
  const t = copy[locale as Locale]
  const { ref, isVisible } = useScrollReveal()

  return (
    <section ref={ref} className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 hero-gradient opacity-30" />

      {/* Decorative blobs */}
      <div className="absolute top-20 left-10 w-32 h-32 pointer-events-none">
        <div
          className="w-full h-full metallic-surface rounded-3xl opacity-20"
          style={{ animation: "morph 14s ease-in-out infinite" }}
        />
      </div>
      <div className="absolute bottom-20 right-10 w-24 h-24 pointer-events-none">
        <div
          className="w-full h-full bg-gradient-to-br from-glow-cyan/30 to-brand/20 rounded-2xl blur-sm opacity-30"
          style={{ animation: "morph 10s ease-in-out infinite reverse" }}
        />
      </div>

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div
          className={cn(
            "text-center max-w-3xl mx-auto mb-16 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-premium mb-6">
            <HelpCircle className="w-4 h-4 text-brand" />
            <span className="text-sm font-medium">{t.eyebrow}</span>
          </div>
          <h2 className="font-heading text-3xl lg:text-5xl font-bold mb-6">
            {t.headingPre}
            <span className="gradient-text">{t.headingHighlight}</span>
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">{t.subtitle}</p>
        </div>

        {/* FAQ Accordion */}
        <div
          className={cn(
            "max-w-3xl mx-auto transition-all duration-1000 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-card rounded-2xl border border-border/50 px-6 data-[state=open]:border-brand/30 transition-colors"
              >
                <AccordionTrigger className="py-6 text-left font-heading font-semibold hover:no-underline hover:text-brand transition-colors">
                  <div className="flex items-start gap-4">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-brand/10 flex items-center justify-center text-sm font-bold text-brand">
                      {index + 1}
                    </span>
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="pb-6 pl-12 text-muted-foreground leading-relaxed">
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
