"use client"

import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"
import { GraduationCap, Stethoscope, TrendingUp, Building2 } from "lucide-react"

export function IasiContent() {
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
                De ce ai nevoie de un site web profesional pentru afacerea ta din Iași?
              </h2>

              <p className="text-muted-foreground leading-relaxed mb-6">
                În 2026, <strong className="text-foreground">Iași</strong> este{" "}
                <strong className="text-foreground">capitala culturală și universitară</strong> a României, cu peste
                400,000 de locuitori și cel mai important hub educațional din Moldova. Cu peste 100,000 de studenți
                și un ecosistem de afaceri în creștere accelerată, competiția pentru clienți este intensă. Un{" "}
                <strong className="text-foreground">site web optimizat SEO</strong> te ajută să fii găsit pe{" "}
                <strong className="text-foreground">Google</strong> când potențialii tăi clienți caută servicii
                medicale, educaționale sau business în Iași și Moldova.
              </p>
            </div>

            {/* Industry Focus Cards */}
            <div className="grid sm:grid-cols-2 gap-6 my-12 not-prose">
              <div className="p-6 rounded-xl glass-premium border border-border/30">
                <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center mb-4">
                  <Stethoscope className="w-6 h-6 text-cyan-500" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Medicină & Sănătate</h3>
                <p className="text-sm text-muted-foreground">
                  Site-uri pentru <strong>clinici medicale Iași</strong>, cabinete stomatologice, centre de
                  diagnostic, farmacii. Programări online și prezentare servicii medicale.
                </p>
              </div>

              <div className="p-6 rounded-xl glass-premium border border-border/30">
                <div className="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center mb-4">
                  <GraduationCap className="w-6 h-6 text-brand" />
                </div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-2">Educație & Cultură</h3>
                <p className="text-sm text-muted-foreground">
                  <strong>Site-uri educaționale Iași</strong>: universități, licee private, muzee, teatre,
                  instituții culturale. Platforme moderne pentru promovare și evenimente.
                </p>
              </div>
            </div>

            <div className="max-w-4xl mb-8">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground mt-12 mb-4">
                Servicii de Web Design și Creare Site-uri în Iași
              </h3>

              <p className="text-muted-foreground leading-relaxed mb-6">
                <strong className="text-foreground">Website Factory</strong> oferă servicii complete de{" "}
                <strong className="text-foreground">creare site-uri web în Iași</strong>, adaptate nevoilor diverse
                ale pieței moldovenești. Fie că ai o clinică medicală în{" "}
                <strong className="text-foreground">zona Copou</strong>, o firmă de consultanță în{" "}
                <strong className="text-foreground">Centru</strong>, un magazin online sau o instituție culturală,
                avem experiența și expertiza necesară să îți creăm soluția digitală perfectă.
              </p>
            </div>

            {/* Services List */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 my-8 not-prose">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Site-uri Clinici Medicale</h4>
                  <p className="text-sm text-muted-foreground">
                    Cu programări online și prezentare medici
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Site-uri Corporate</h4>
                  <p className="text-sm text-muted-foreground">
                    Pentru companii medii și mari din Iași
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Site-uri Educaționale</h4>
                  <p className="text-sm text-muted-foreground">
                    Pentru universități și școli private
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-brand mt-2 flex-shrink-0" />
                <div>
                  <h4 className="font-semibold text-foreground mb-1">Magazine Online</h4>
                  <p className="text-sm text-muted-foreground">
                    Soluții eCommerce pentru retaileri locali
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mb-8 mt-12">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-4">
                SEO Local Iași - Domină Rezultatele Google în Moldova
              </h3>

              <p className="text-muted-foreground leading-relaxed mb-6">
                <strong className="text-foreground">SEO local</strong> este crucial pentru afacerile din Iași. Cu mii
                de companii, clinici medicale și instituții care concurează pentru aceiași clienți, trebuie să fii
                vizibil pe Google când potențialii tăi clienți caută servicii. Optimizăm site-ul tău pentru termeni
                relevanți precum "stomatolog iași", "clinică medicală iași centru", "avocat iași", "magazin online
                iași" sau orice alt termen specific industriei tale și zonei în care activezi (Copou, Păcurari,
                Nicolina, Centru, Tatarași).
              </p>
            </div>

            {/* SEO Benefits */}
            <div className="p-6 rounded-xl bg-gradient-to-br from-brand/5 to-cyan-500/5 border border-brand/20 my-8 not-prose max-w-4xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0">
                  <TrendingUp className="w-6 h-6 text-brand" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Beneficii SEO Local Iași:</h4>
                  <ul className="space-y-2 text-sm text-muted-foreground">
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-brand" />
                      Vizibilitate maximă pe căutări locale Google Iași & Moldova
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-brand" />
                      Mai multe programări/rezervări pentru clinici medicale
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-brand" />
                      Poziționare pe Google Maps pentru "near me" searches
                    </li>
                    <li className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-brand" />
                      Atragere clienți din toată regiunea Moldova
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mb-8 mt-12">
              <h3 className="font-heading text-xl sm:text-2xl font-bold text-foreground mb-4">
                De ce să alegi Website Factory pentru proiectul tău din Iași?
              </h3>

              <p className="text-muted-foreground leading-relaxed mb-6">
                Cu peste <strong className="text-foreground">35 de proiecte finalizate</strong> pentru clienți din
                Iași și regiunea Moldova, înțelegem perfect dinamica pieței locale și cerințele specifice. Oferim:{" "}
                <strong className="text-foreground">design modern la standarde europene</strong>,{" "}
                <strong className="text-foreground">optimizare SEO avansată</strong> pentru piața competitivă din
                Iași, integrări complete (programări medicale, rezervări, plăți online),{" "}
                <strong className="text-foreground">livrare rapidă</strong> (1-8 săptămâni), prețuri transparente și
                competitive, suport tehnic dedicat în limba română, și experiență cu cerințele specifice ale
                afacerilor, clinicilor medicale și instituțiilor culturale/educaționale din Iași și Moldova.
              </p>
            </div>

            {/* Medical Focus */}
            <div className="p-6 rounded-xl glass-premium border border-border/30 my-8 not-prose max-w-4xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-cyan-500/10 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-cyan-500" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Specializare Medicină & Educație</h4>
                  <p className="text-sm text-muted-foreground">
                    Iași fiind cel mai important centru medical și universitar din Moldova, avem experiență vastă cu
                    site-uri pentru clinici medicale, cabinete stomatologice, centre de diagnostic, laboratoare de
                    analize, dar și universități, licee private, muzee, teatre și instituții culturale. Oferim
                    soluții care respectă standardele profesionale ale acestor domenii: design care inspiră încredere
                    pentru domeniul medical, sisteme de programări online pentru clinici, platforme educaționale și de
                    evenimente pentru instituții culturale, și conformitate GDPR pentru protecția datelor sensibile.
                    Perfect pentru profesioniști și instituții din Iași care vor să își consolideze prezența digitală
                    și reputația online.
                  </p>
                </div>
              </div>
            </div>

            <div className="max-w-4xl mt-8">
              <p className="text-muted-foreground leading-relaxed">
                Contactează-ne astăzi pentru o <strong className="text-foreground">consultanță gratuită</strong> și
                un <strong className="text-foreground">proiect personalizat</strong> pentru afacerea sau instituția ta
                din Iași și Moldova!
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

