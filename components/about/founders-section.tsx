"use client"

import Image from "next/image"
import Link from "next/link"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"
import { Linkedin, Twitter, Mail, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const founders = [
  {
    name: "Ernest Slach",
    role: "Co-Founder & CEO",
    bio: "Ernest, CEO și co-fondator Website Factory, conduce direcția strategică a proiectelor și aliniază fiecare site la obiectivele de business ale clientului. Datorită experienței în antreprenoriat digital, combină strategia, web design-ul și o abordare creativă orientată spre claritate, diferențiere și rezultate.",
    expertise: ["Business Strategy", "Client Relations", "Project Management"],
    image: "/Ernest.webp",
    linkedin: "https://www.linkedin.com/in/ernest-slach-949771106/",
    email: "office@websitefactory.ro",
  },
  {
    name: "Alex Nedelia-Kerekes",
    role: "Co-Founder & CTO",
    bio: "Alex este mintea tehnică din spatele Website Factory. Cu expertiză în dezvoltare full-stack, arhitectură software și optimizare performanță, el transformă cerințele complexe în soluții elegante și scalabile.",
    expertise: ["Full-Stack Development", "Technical Architecture", "Performance Optimization"],
    image: "/Alex-CTO.webp",
    linkedin: "https://www.linkedin.com/in/alex-nedelia-7a6780b3/",
    email: "office@websitefactory.ro",
  },
]

export function FoundersSection() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal()

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-brand/5 to-transparent" />
      <div className="absolute bottom-0 right-0 w-1/3 h-full bg-gradient-to-l from-glow-violet/5 to-transparent" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        {/* Header */}
        <div
          ref={headerRef}
          className={cn(
            "text-center max-w-3xl mx-auto mb-16 lg:mb-20 transition-all duration-1000",
            headerVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <span className="inline-block text-sm font-medium text-brand tracking-widest uppercase mb-4">Echipa</span>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight">
            Oamenii de la butoanele <br></br><span className="gradient-text">Website Factory</span>
          </h2>
          <p className="mt-6 text-lg text-muted-foreground">
            Doi antreprenori cu viziune comună: să aducem web design-ul românesc la standarde internaționale.
          </p>
        </div>

        {/* Founders grid */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {founders.map((founder, index) => (
            <FounderCard key={founder.name} founder={founder} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 lg:mt-20 text-center">
          <p className="text-lg text-muted-foreground mb-6">
            Vrei să ne cunoști mai bine? Hai să povestim despre proiectul tău.
          </p>
          <Button
            asChild
            size="lg"
            className="group bg-brand hover:bg-brand-light text-brand-foreground rounded-full px-8 glow-brand hover:glow-intense transition-all duration-300"
          >
            <Link href="/contact">
              Programează o întâlnire
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}

function FounderCard({ founder, index }: { founder: (typeof founders)[0]; index: number }) {
  const { ref, isVisible } = useScrollReveal()

  return (
    <div
      ref={ref}
      className={cn(
        "group relative transition-all duration-1000",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12",
        index === 1 && "lg:mt-12",
      )}
      style={{ transitionDelay: `${index * 200}ms` }}
    >
      <div className="relative rounded-3xl overflow-hidden bg-card border border-border/50">
        {/* Image container */}
        <div className="relative aspect-[1/1] overflow-hidden">
          <Image
            src={founder.image || "/placeholder.svg"}
            alt={founder.name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/20 to-transparent" />

          {/* Social links overlay */}
          <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0">
            <a
              href={founder.linkedin}
              className="w-10 h-10 rounded-full glass-premium flex items-center justify-center hover:bg-brand/20 transition-colors"
              aria-label={`${founder.name} LinkedIn`}
            >
              <Linkedin className="w-4 h-4 text-foreground" />
            </a>
            <a
              href={`mailto:${founder.email}`}
              className="w-10 h-10 rounded-full glass-premium flex items-center justify-center hover:bg-brand/20 transition-colors"
              aria-label={`Email ${founder.name}`}
            >
              <Mail className="w-4 h-4 text-foreground" />
            </a>
          </div>

          {/* Decorative metallic element */}
          <div
            className="absolute -top-4 -left-4 w-24 h-24 metallic-surface rounded-full opacity-30 blur-sm"
            style={{ animation: `morph ${12 + index * 2}s ease-in-out infinite` }}
          />
        </div>

        {/* Content */}
        <div className="relative p-6 lg:p-8 -mt-24">
          <div className="glass-premium rounded-2xl p-6">
            <span className="inline-block text-xs font-medium text-brand tracking-wider uppercase mb-2">
              {founder.role}
            </span>
            <h3 className="font-heading text-2xl font-bold text-foreground mb-3">{founder.name}</h3>
            <p className="text-muted-foreground leading-relaxed text-sm mb-4">{founder.bio}</p>

            {/* Expertise tags */}
            <div className="flex flex-wrap gap-2">
              {founder.expertise.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1 text-xs font-medium rounded-full bg-brand/10 text-brand border border-brand/20"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
