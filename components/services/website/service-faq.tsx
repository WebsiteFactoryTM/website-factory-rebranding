"use client"

import { useLocale } from "next-intl"
import type { Locale } from "@/i18n/routing"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { HelpCircle } from "lucide-react"
import { cn } from "@/lib/utils"

const roCopy = {
  eyebrow: "Întrebări frecvente",
  headingPre: "Ai ",
  headingHighlight: "întrebări",
  headingEnd: "?",
  subtitle: "Răspundem la cele mai comune întrebări despre crearea website-urilor.",
}

const copy = { ro: roCopy, en: roCopy } satisfies Record<Locale, typeof roCopy>

interface ServiceFAQProps {
  faqs: { question: string; answer: string }[]
}

export function ServiceFAQ({ faqs }: ServiceFAQProps) {
  const locale = useLocale()
  const t = copy[locale as Locale]
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="relative py-24 lg:py-32 overflow-hidden bg-muted/30">
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div
          ref={ref}
          className={cn(
            "text-center mb-16 transition-all duration-1000",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <span className="inline-flex items-center gap-2 text-sm font-medium text-brand tracking-widest uppercase mb-4">
            <HelpCircle className="w-4 h-4" />
            {t.eyebrow}
          </span>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold">
            {t.headingPre}
            <span className="gradient-text">{t.headingHighlight}</span>
            {t.headingEnd}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="glass-premium rounded-2xl border-none px-6 overflow-hidden"
                style={{
                  animation: isVisible ? `fadeInUp 0.5s ease-out ${index * 0.08}s forwards` : "none",
                  opacity: isVisible ? undefined : 0,
                }}
              >
                <AccordionTrigger className="py-5 text-left font-semibold hover:text-brand transition-colors [&[data-state=open]]:text-brand">
                  <span className="flex items-center gap-3">
                    <span className="flex-shrink-0 flex items-center justify-center w-8 h-8 rounded-lg bg-brand/10 text-brand text-sm font-bold">
                      {index + 1}
                    </span>
                    {faq.question}
                  </span>
                </AccordionTrigger>
                <AccordionContent className="pb-5 text-muted-foreground leading-relaxed pl-11">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
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
