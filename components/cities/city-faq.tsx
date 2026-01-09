"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

interface CityFaqProps {
  cityName: string
  faqs: { question: string; answer: string }[]
}

export function CityFaq({ cityName, faqs }: CityFaqProps) {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 grid-pattern opacity-50" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div
          ref={ref}
          className={cn(
            "text-center max-w-3xl mx-auto mb-12 sm:mb-16 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold">
            Întrebări frecvente despre <span className="gradient-text">web design {cityName}</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-base sm:text-lg">
            Răspunsuri la cele mai comune întrebări despre serviciile noastre în {cityName}.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`faq-${index}`}
                className={cn(
                  "border border-border/50 rounded-xl px-6 glass-premium transition-all duration-500",
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4",
                )}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <AccordionTrigger className="text-left font-semibold hover:text-brand transition-colors py-5">
                  <div className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 rounded-full bg-brand/10 flex items-center justify-center text-xs font-bold text-brand">
                      {index + 1}
                    </span>
                    <span>{faq.question}</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5 pl-10">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
