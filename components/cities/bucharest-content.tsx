"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"
import { Building2, Briefcase, TrendingUp, Smartphone } from "lucide-react"

export function BucharestContent() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-muted/20" />
      <div className="absolute inset-0 grid-pattern opacity-30" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div
          ref={ref}
          className={cn(
            "transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          {/* Main Content */}
          <div className="prose prose-lg dark:prose-invert max-w-none">
            <div className="max-w-4xl mb-12">
              <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-6">
                De ce ai nevoie de un site web profesional pentru afacerea ta din București?
              </h2>

              <p className="text-muted-foreground leading-relaxed mb-6">
                În 2026, <strong className="text-foreground">prezența online</strong> este esențială pentru
                afacerile din <strong className="text-foreground">București</strong>, capitala și cel mai mare hub
                economic al României. Cu peste 2 milioane de locuitori și mii de companii active, competiția este
                intensă. Un <strong className="text-foreground">site web optimizat SEO</strong> te ajută să te
                diferențiezi, să fii găsit de clienții potențiali pe <strong className="text-foreground">Google</strong>{" "}
                și să generezi lead-uri calificate pentru afacerea ta.
              </p>
            </div>

            {/* Industry Focus Cards */}
            <div className="grid sm:grid-cols-2 gap-6 my-12 not-prose">
              <div className="p-6 rounded-xl glass-premium border border-border/30">
                <div className="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center mb-4">
                  <Building2 className="w-6 h-6 text-brand" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Corporate & Business</h3>
                <p className="text-sm text-muted-foreground">
                  Site-uri pentru <strong>companii din București</strong>: consultanță, avocatură, contabilitate,
                  servicii profesionale. Design corporate și funcționalități avansate.
                </p>
              </div>

              <div className="p-6 rounded-xl glass-premium border border-border/30">
                <div className="w-12 h-12 rounded-lg bg-glow-cyan/10 flex items-center justify-center mb-4">
                  <Briefcase className="w-6 h-6 text-glow-cyan" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Retail & eCommerce</h3>
                <p className="text-sm text-muted-foreground">
                  <strong>Magazine online București</strong>, branduri locale, retaileri. Soluții complete cu
                  integrări plăți, transport și facturare electronică.
                </p>
              </div>
            </div>

            <div className="max-w-4xl mb-8">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground mt-12 mb-4">
                Servicii de Web Design și Creare Site-uri în București
              </h3>

              <p className="text-muted-foreground leading-relaxed mb-6">
                <strong className="text-foreground">Website Factory</strong> oferă servicii complete de{" "}
                <strong className="text-foreground">creare site-uri web în București</strong>, adaptate nevoilor
                diverse ale pieței din capitală. Fie că ai o firmă de consultanță în{" "}
                <strong className="text-foreground">zona Pipera</strong>, o clinică medicală în{" "}
                <strong className="text-foreground">Centrul Vechi</strong>, un magazin online sau un startup tech,
                avem experiența și expertiza necesară să îți creăm soluția digitală perfectă.
              </p>
            </div>

            {/* Services List */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8 not-prose">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Site-uri Corporate</h4>
                  <p className="text-sm text-muted-foreground">
                    Pentru companii medii și mari din București
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Magazine Online</h4>
                  <p className="text-sm text-muted-foreground">
                    Soluții eCommerce complete pentru retaileri
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Site-uri Medicale</h4>
                  <p className="text-sm text-muted-foreground">
                    Pentru clinici private și cabinete medicale
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Aplicații Web</h4>
                  <p className="text-sm text-muted-foreground">
                    Pentru startup-uri și companii tech
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mb-8 mt-12">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-4">
                SEO Local București - Domină Rezultatele Google în Capitală
              </h3>

              <p className="text-muted-foreground leading-relaxed mb-6">
                <strong className="text-foreground">SEO local</strong> este crucial pentru afacerile din București.
                Cu mii de companii care concurează pentru aceiași clienți, trebuie să fii vizibil pe Google când
                potențialii tăi clienți caută servicii. Optimizăm site-ul tău pentru termeni relevanți precum
                "consultanță fiscală bucurești", "clinică stomatologică pipera", "avocat bucurești centru" sau orice
                alt termen specific industriei tale și zonei în care activezi.
              </p>
            </div>

            {/* SEO Benefits */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-brand/5 to-glow-cyan/5 border border-brand/20 my-8 not-prose max-w-4xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-brand" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Beneficii SEO Local București:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-brand" />
                      Vizibilitate maximă pe căutări locale Google București
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-brand" />
                      Mai multe lead-uri calificate și conversii
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-brand" />
                      Poziționare pe Google Maps pentru zone specifice
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-brand" />
                      Avantaj competitiv față de concurență
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mb-8 mt-12">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-4">
                De ce să alegi Website Factory pentru proiectul tău din București?
              </h3>

              <p className="text-muted-foreground leading-relaxed mb-6">
                Cu peste <strong className="text-foreground">50 de proiecte finalizate</strong> pentru clienți din
                București, din diverse industrii (IT, consultanță, medicină, retail, servicii profesionale), înțelegem
                perfect dinamica pieței din capitală. Oferim:{" "}
                <strong className="text-foreground">design modern la standarde corporative</strong>,{" "}
                <strong className="text-foreground">optimizare SEO avansată</strong> pentru piața competitivă din
                București, integrări complete cu sisteme business (CRM, ERP, facturare),{" "}
                <strong className="text-foreground">livrare rapidă</strong> (1-8 săptămâni), prețuri transparente și
                competitive, suport tehnic dedicat în limba română, și experiență cu cerințele specifice ale
                companiilor din București.
              </p>
            </div>

            {/* Technology Focus */}
            <div className="p-6 rounded-xl glass-premium border border-border/30 my-8 not-prose max-w-4xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-glow-cyan/10 flex items-center justify-center flex-shrink-0">
                  <Smartphone className="w-6 h-6 text-glow-cyan" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Tehnologii Moderne & Scalabile</h4>
                  <p className="text-sm text-muted-foreground">
                    Folosim cele mai avansate tehnologii web: Next.js 15, React, TypeScript pentru aplicații
                    performante, WordPress/WooCommerce pentru flexibilitate maximă, și soluții cloud (AWS, Vercel)
                    pentru scalabilitate. Perfect pentru startup-uri tech din București care au nevoie de MVP rapid
                    sau companii enterprise cu cerințe complexe. Oferim și consultanță tehnică pentru alegerea
                    stack-ului potrivit și arhitectură scalabilă.
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mt-8">
              <p className="text-muted-foreground leading-relaxed">
                Contactează-ne astăzi pentru o <strong className="text-foreground">consultanță gratuită</strong> și
                un <strong className="text-foreground">proiect personalizat</strong> pentru afacerea ta din București!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

