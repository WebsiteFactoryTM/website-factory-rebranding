"use client"

import { useLocale } from "next-intl"
import type { Locale } from "@/i18n/routing"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"
import { HelpCircle } from "lucide-react"
import { withoutPrices } from "@/lib/i18n/no-prices"

const roCopy = {
  sectionLabel: "FAQ",
  headingPrefix: "Întrebări",
  headingHighlight: "frecvente",
  subtitle: "Răspunsuri la cele mai comune întrebări despre serviciile noastre de web design în Timișoara.",
  faqs: [
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
  ],
}

const enCopy = {
  sectionLabel: "FAQ",
  headingPrefix: "Questions",
  headingHighlight: "we hear often",
  subtitle: "Straight answers to what people usually ask before starting a project with us.",
  faqs: [
    {
      question: "What does a website cost?",
      answer:
        "It depends on what you need. A business website starts around €650; an online store from €1,000. Get in touch for a free consultation and a price scoped to your project.",
    },
    {
      question: "How quickly can you build my site?",
      answer:
        "Most business websites are live within 2–4 weeks. Bigger builds — online stores, custom apps — typically take 5–12 weeks. Whatever we agree on, we stick to it.",
    },
    {
      question: "Is SEO included?",
      answer:
        "Yes, by default. Every site we build has on-page SEO, proper heading structure, meta tags and schema markup baked in — not sold as an add-on.",
    },
    {
      question: "Will I be able to update the site myself?",
      answer:
        "Yes. You get an easy-to-use admin panel and a walkthrough once it's live. If you'd rather not deal with it, we also offer monthly maintenance plans.",
    },
    {
      question: "What do you build with?",
      answer:
        "Mostly Next.js, React and TypeScript, paired with whichever back end fits the job. For simpler sites that don't need a custom build, WordPress can be the better call — we pick the stack to match the project, not the other way round.",
    },
  ],
}

const copy = {
  ro: roCopy,
  en: { ...enCopy, faqs: withoutPrices(enCopy.faqs) },
} satisfies Record<Locale, typeof roCopy>

export function FAQ() {
  const locale = useLocale()
  const t = copy[locale]
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
            <span className="inline-block text-sm font-medium text-brand tracking-widest uppercase mb-4">{t.sectionLabel}</span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance">
              {t.headingPrefix} <span className="gradient-text">{t.headingHighlight}</span>
            </h2>
            <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
              {t.subtitle}
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
              {t.faqs.map((faq, index) => (
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
