import type { Metadata } from "next"
import Link from "next/link"
import { Home, ArrowRight, Code, Palette, Zap, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FloatingElement } from "@/components/ui/floating-element"
import { generatePageMetadata } from "@/lib/seo"

export const metadata: Metadata = {
  ...generatePageMetadata({
    title: "404 - Pagină Negăsită | Website Factory",
    description:
      "Pagina pe care o cauți nu există. Uneori chiar și cei mai buni designeri trebuie să înceapă de la zero. Dar putem construi orice pagină ai nevoie!",
    path: "/404",
    keywords: ["404", "pagina negasita", "eroare", "website factory"],
  }),
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 md:pt-24 lg:pt-28">
      {/* Background Effects */}
      <div className="absolute inset-0 hero-gradient opacity-50" />
      <div className="absolute inset-0 grid-pattern opacity-30" />
      
      {/* Floating Elements */}
      <FloatingElement
        className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-brand/10 blur-[80px]"
        delay={0}
        duration={12}
      >
        <div />
      </FloatingElement>
      <FloatingElement
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-glow-violet/10 blur-[100px]"
        delay={2}
        duration={10}
      >
        <div />
      </FloatingElement>
      <FloatingElement
        className="absolute top-1/2 left-1/2 w-48 h-48 rounded-full bg-glow-cyan/10 blur-[60px] -translate-x-1/2 -translate-y-1/2"
        delay={4}
        duration={14}
      >
        <div />
      </FloatingElement>

      <div className="container mx-auto px-4 lg:px-8 relative z-10 py-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* 404 Number - Creative Design */}
          <div className="relative mb-8">
            <div className="font-heading text-[12rem] md:text-[16rem] lg:text-[20rem] font-bold leading-none">
              <span className="gradient-text-animated">404</span>
            </div>
            
            {/* Decorative Code Elements */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
              {/* HTML Comment Style */}
              <div className="absolute top-8 left-8 text-xs md:text-sm font-mono text-muted-foreground/30 dark:text-muted-foreground/20">
                &lt;!-- Page Not Found --&gt;
              </div>
              
              {/* CSS Style */}
              <div className="absolute bottom-8 right-8 text-xs md:text-sm font-mono text-muted-foreground/30 dark:text-muted-foreground/20">
                .page {'{'} display: none; {'}'}
              </div>
              
              {/* Error Style */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xs md:text-sm font-mono text-brand/40 dark:text-brand/30">
                Error: 404
              </div>
            </div>
          </div>

          {/* Main Message */}
          <div className="space-y-6 mb-12">
            <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
              Pagina pe care o cauți{" "}
              <span className="gradient-text">nu există</span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Uneori, chiar și cei mai buni designeri trebuie să înceapă de la zero. 
              Această pagină a fost mutată, ștearsă sau pur și simplu nu a fost construită încă.
            </p>
            
            <p className="text-base text-muted-foreground/80 max-w-xl mx-auto">
              Dar nu te preocupa — putem construi orice pagină ai nevoie! 🚀
            </p>
          </div>

          {/* Creative Elements Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-2xl mx-auto">
            <div className="group relative p-6 rounded-2xl glass-card border border-border/50 hover:border-brand/50 transition-all duration-300 hover:scale-105">
              <Code className="w-8 h-8 mx-auto mb-2 text-brand group-hover:scale-110 transition-transform" />
              <p className="text-xs font-medium text-muted-foreground">Code</p>
            </div>
            
            <div className="group relative p-6 rounded-2xl glass-card border border-border/50 hover:border-brand/50 transition-all duration-300 hover:scale-105">
              <Palette className="w-8 h-8 mx-auto mb-2 text-glow-violet group-hover:scale-110 transition-transform" />
              <p className="text-xs font-medium text-muted-foreground">Design</p>
            </div>
            
            <div className="group relative p-6 rounded-2xl glass-card border border-border/50 hover:border-brand/50 transition-all duration-300 hover:scale-105">
              <Zap className="w-8 h-8 mx-auto mb-2 text-glow-cyan group-hover:scale-110 transition-transform" />
              <p className="text-xs font-medium text-muted-foreground">Build</p>
            </div>
            
            <div className="group relative p-6 rounded-2xl glass-card border border-border/50 hover:border-brand/50 transition-all duration-300 hover:scale-105">
              <Search className="w-8 h-8 mx-auto mb-2 text-brand group-hover:scale-110 transition-transform" />
              <p className="text-xs font-medium text-muted-foreground">Search</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild size="lg" className="group">
              <Link href="/">
                <Home className="mr-2 h-5 w-5" />
                Înapoi acasă
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            
            <Button asChild variant="outline" size="lg" className="group">
              <Link href="/contact">
                Construiește o pagină nouă
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Quick Links */}
          <div className="mt-16 pt-8 border-t border-border/50">
            <p className="text-sm text-muted-foreground mb-4">Sau explorează:</p>
            <div className="flex flex-wrap justify-center gap-4 text-sm">
              <Link
                href="/servicii"
                className="text-brand hover:text-brand-light transition-colors underline-offset-4 hover:underline"
              >
                Servicii
              </Link>
              <span className="text-muted-foreground/50">•</span>
              <Link
                href="/portofoliu"
                className="text-brand hover:text-brand-light transition-colors underline-offset-4 hover:underline"
              >
                Portofoliu
              </Link>
              <span className="text-muted-foreground/50">•</span>
              <Link
                href="/despre-noi"
                className="text-brand hover:text-brand-light transition-colors underline-offset-4 hover:underline"
              >
                Despre Noi
              </Link>
              <span className="text-muted-foreground/50">•</span>
              <Link
                href="/contact"
                className="text-brand hover:text-brand-light transition-colors underline-offset-4 hover:underline"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Grid Lines - Decorative */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand/20 to-transparent" />
        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-glow-violet/20 to-transparent" />
        <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-glow-cyan/20 to-transparent" />
        
        <div className="absolute top-0 left-1/4 h-full w-px bg-gradient-to-b from-transparent via-brand/20 to-transparent" />
        <div className="absolute top-0 left-1/2 h-full w-px bg-gradient-to-b from-transparent via-glow-violet/20 to-transparent" />
        <div className="absolute top-0 left-3/4 h-full w-px bg-gradient-to-b from-transparent via-glow-cyan/20 to-transparent" />
      </div>
    </main>
  )
}

