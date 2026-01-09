"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"
import { HelpCircle } from "lucide-react"

const faqs = [
  {
    question: "Cât costă crearea unui site web în Timișoara?",
    answer:
      "Prețul variază în funcție de complexitate. Un site de prezentare poate începe de la 650 EUR, iar un magazin online de la 1000 EUR. Oferim consultanță gratuită pentru a stabili exact ce ai nevoie și un preț în funcție de specificațiile proiectului.",
  },
  {
    question: "Cât durează să creați un website?",
    answer:
      "Un site de prezentare standard este gata în 2-4 săptămâni. Proiectele complexe precum magazinele online sau aplicațiile custom pot dura 5-12 săptămâni. Respectăm întotdeauna deadline-urile agreate.",
  },
  {
    question: "Oferiți servicii SEO pentru site-uri în Timișoara?",
    answer:
      "Da! Toate site-urile noastre sunt construite SEO-first. Implementăm optimizări on-page, structură corectă de headings, meta tags, schema markup și performanță optimizată - toate incluse în preț.",
  },
  {
    question: "Pot să îmi administrez singur site-ul după lansare?",
    answer:
      "Absolut. Predăm site-uri cu panou de administrare intuitiv și prezentarea platformei. Dacă preferi, avem și pachete de mentenanță lunară pentru gestionarea completă.",
  },
  {
    question: "Ce tehnologii folosiți pentru dezvoltare?",
    answer:
      "Folosim tehnologii moderne: Next.js, React, TypeScript pentru frontend, și diverse soluții backend în funcție de proiect. De asemenea, putem folosi si WordPress pentru proiecte unde nu este nevoie de o platforma custom. Alegem întotdeauna stack-ul optim pentru obiectivele tale specifice.",
  },
]

export function FAQ() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>()
  const { ref: faqRef, isVisible: faqVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand/5 rounded-full blur-[150px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <div
            ref={headerRef}
            className={cn(
              "text-center mb-16 transition-all duration-700",
              headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            )}
          >
            <span className="inline-block text-sm font-medium text-brand tracking-widest uppercase mb-4">FAQ</span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              Întrebări <span className="gradient-text">frecvente</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              Răspunsuri la cele mai comune întrebări despre serviciile noastre de web design în Timișoara.
            </p>
          </div>

          {/* FAQ Accordion */}
          <div
            ref={faqRef}
            className={cn(
              "transition-all duration-700 delay-200",
              faqVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
            )}
          >
            <Accordion type="single" collapsible className="w-full space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className={cn(
                    "px-6 lg:px-8 rounded-2xl border border-border/50 bg-card",
                    "data-[state=open]:border-brand/30 data-[state=open]:shadow-lg data-[state=open]:shadow-brand/5",
                    "transition-all duration-300",
                  )}
                >
                  <AccordionTrigger className="py-6 text-left font-heading font-semibold text-foreground hover:text-brand hover:no-underline [&[data-state=open]]:text-brand">
                    <div className="flex items-center gap-4">
                      <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center">
                        <HelpCircle className="w-5 h-5 text-brand" />
                      </div>
                      <span className="text-base lg:text-lg">{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 pl-14 text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </div>
    </section>
  )
}
