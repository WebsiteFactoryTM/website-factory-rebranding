"use client"

import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Users, Award, Clock, Zap, Code2 } from "lucide-react"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const stats = [
  { icon: Users, value: "150+", label: "Clienți mulțumiți" },
  { icon: Award, value: "5+", label: "Ani experiență" },
  { icon: Clock, value: "24h", label: "Timp răspuns" },
  { icon: Zap, value: "+95%", label: "Proiecte livrate la timp" },
]

export function AboutPreview() {
  const { ref: headerRef, isVisible: headerVisible } = useScrollReveal<HTMLDivElement>()
  const { ref: contentRef, isVisible: contentVisible } = useScrollReveal<HTMLDivElement>()
  const { ref: statsRef, isVisible: statsVisible } = useScrollReveal<HTMLDivElement>()

  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-1/2 -right-40 w-80 h-80 rounded-full bg-brand/5 blur-[100px]" />
      <div className="absolute bottom-0 left-1/4 w-60 h-60 rounded-full bg-glow-violet/5 blur-[80px]" />

      <div className="container mx-auto px-4 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left - Visual element with metallic accent */}
          <div
            ref={headerRef}
            className={cn(
              "relative transition-all duration-1000",
              headerVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-12",
            )}
          >
            {/* Main image container with glass effect */}
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden glass-premium">
              <Image src="/despre-websitefactory-timisoara.webp" alt="Echipa Website Factory" fill className="object-cover" />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-brand/40 via-transparent to-glow-violet/20" />

              {/* Floating badge */}
              <div className="absolute bottom-6 left-6 right-6">
                <div className="glass-premium rounded-2xl p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-brand/20 flex items-center justify-center">
                    <Code2 className="w-6 h-6 text-brand" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-black">Web Design & Development</p>
                    <p className="text-xs text-black">Timișoara, România</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative metallic blob - small accent */}
            <div
              className="absolute -top-8 -right-8 w-32 h-32 rounded-full metallic-surface opacity-60 blur-sm"
              style={{ animation: "morph 10s ease-in-out infinite" }}
            />
            <div
              className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full bg-gradient-to-br from-glow-cyan/40 to-brand/30 blur-lg"
              style={{ animation: "scale-pulse 4s ease-in-out infinite" }}
            />
          </div>

          {/* Right - Content */}
          <div
            ref={contentRef}
            className={cn(
              "transition-all duration-1000 delay-200",
              contentVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-12",
            )}
          >
            <span className="inline-block text-sm font-medium text-brand tracking-widest uppercase mb-4">
              Despre noi
            </span>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-balance leading-tight">
              Soluții <span className="gradient-text">personalizate</span> pentru ideile tale
            </h2>
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              Suntem o echipă din Timișoara, iar de peste 5 ani ajutăm companii din România și Europa să-și digitalizeze prezența online.
            </p>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Lucrăm transparent, îți explicăm pe înțeles fiecare etapă și te ținem la curent cu progresul. Avem un <strong className="text-foreground">proces clar pentru fiecare proiect, </strong>astfel încât să știi mereu ce urmează și de ce..
            </p>

            {/* CTA Button */}
            <div className="mt-8">
              <Button
                asChild
                size="lg"
                className="group bg-brand hover:bg-brand-light text-brand-foreground rounded-full px-8 glow-brand hover:glow-intense transition-all duration-300"
              >
                <Link href="/despre-noi">
                  Vezi detalii
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats row */}
        <div
          ref={statsRef}
          className={cn(
            "mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 delay-400",
            statsVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className={cn(
                  "relative p-6 rounded-2xl text-center",
                  "bg-card border border-border/50",
                  "card-metallic card-lift",
                  "transition-all duration-500",
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-brand/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-brand" />
                </div>
                <p className="font-heading text-3xl font-bold text-foreground gradient-text">{stat.value}</p>
                <p className="mt-1 text-sm text-muted-foreground">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
