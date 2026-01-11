"use client"

import Image from "next/image"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { Target, Lightbulb, Rocket, Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { generateTeamImageAltText } from "@/lib/image-alt-text"

const storyPoints = [
  {
    icon: Lightbulb,
    title: "Ideea",
    description:
      "O prezență online bună începe cu o fundație clară: obiective, structură, mesaj. Noi transformăm ideea ta într-un produs digital coerent, ușor de folosit și ușor de crescut.",
  },
  {
    icon: Target,
    title: "Misiunea",
    description:
      "Construim soluții web care aduc valoare măsurabilă: mai multe cereri, mai multă încredere, conversii mai bune. Fără promisiuni goale — doar pași clari și execuție solidă.",
  },
  {
    icon: Rocket,
    title: "Viziunea",
    description:
      "Ridicăm standardul pentru web design în România: design curat + tehnic impecabil + SEO făcut corect + comunicare clară. Un web modern, rapid, accesibil și pregătit pentru scalare.",
  },
  {
    icon: Heart,
    title: "Pasiunea",
    description: "Ne pasă de detalii: micro-interacțiuni, performanță, securitate. Pentru noi, „gata” înseamnă testat, optimizat și livrat cu grijă — indiferent de mărimea proiectului.",
  },
]

export function CompanyStory() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal()
  const { ref: imageRef, isVisible: imageVisible } = useScrollReveal()
  const { ref: pointsRef, isVisible: pointsVisible } = useScrollReveal()

  return (
    <section className="pt-16 sm:pt-20 md:pt-24 pb-24 lg:pb-32 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-brand/5 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Section header */}
        <div
          ref={headerRef}
          className={cn(
            "text-center max-w-3xl mx-auto mb-16 lg:mb-20 transition-all duration-1000",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <span className="inline-block text-sm font-medium text-brand tracking-widest uppercase mb-4">
            Povestea noastră
          </span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            O echipă din Timișoara.<br></br> <span className="gradient-text">Un standard global.</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Image with overlay effects */}
          <div
            ref={imageRef}
            className={cn(
              "relative transition-all duration-1000",
              imageVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12",
            )}
          >
            <div className="relative aspect-[3/4] rounded-3xl overflow-hidden">
              <Image
                src="/Alex-Ernest-Website-Factory.webp"
                alt={generateTeamImageAltText("Co-fondatorii Website Factory - Ernest și Alex", "Timișoara")}
                fill
                className="object-cover"
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand/30 via-transparent to-glow-violet/20" />
            </div>

            {/* Floating quote card */}
            <div className="absolute -bottom-8 -right-4 lg:-right-8 max-w-xs">
              <div className="glass-premium rounded-2xl p-6">
                <p className="text-sm italic text-foreground/80 leading-relaxed">
                  "Building the web, one dream at a time"
                </p>
                <p className="mt-3 text-xs font-semibold text-blue-600">— Ernest & Alex, Co-fondatori</p>
              </div>
            </div>

            {/* Decorative elements */}
            <div
              className="absolute -top-6 -left-6 w-24 h-24 metallic-surface rounded-2xl opacity-40"
              style={{ animation: "morph 12s ease-in-out infinite" }}
            />
          </div>

          {/* Right - Story points */}
          <div
            ref={pointsRef}
            className={cn(
              "space-y-6 transition-all duration-1000 delay-200",
              pointsVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12",
            )}
          >
            <p className="text-lg text-muted-foreground leading-relaxed">
              Website Factory s-a născut în Timișoara dintr-o idee simplă: online-ul trebuie să lucreze pentru business, nu doar să arate bine. Din 2023 construim site-uri, magazine online și soluții digitale cu focus pe claritate, viteză și experiență reală pentru utilizator.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Lucrăm transparent, explicăm tehnicul pe înțeles și urmăm un proces clar pentru fiecare proiect — de la strategie și structură, până la design, dezvoltare și lansare. Ne plac deciziile corecte, bazate pe obiective, nu pe „trenduri”.{" "}
              <strong className="text-foreground">
                Fiecare pixel, fiecare linie de cod trebuie să servească un scop de business.
              </strong>
            </p>

            <div className="grid sm:grid-cols-2 gap-4 pt-6">
              {storyPoints.map((point, index) => {
                const Icon = point.icon
                return (
                  <div
                    key={point.title}
                    className="group p-5 rounded-2xl bg-card border border-border/50 card-metallic card-lift"
                    style={{ transitionDelay: `${index * 100}ms` }}
                  >
                    <div className="w-10 h-10 rounded-xl bg-brand/10 flex items-center justify-center mb-3 group-hover:bg-brand/20 transition-colors">
                      <Icon className="w-5 h-5 text-brand" />
                    </div>
                    <h3 className="font-heading font-semibold text-foreground mb-1">{point.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
