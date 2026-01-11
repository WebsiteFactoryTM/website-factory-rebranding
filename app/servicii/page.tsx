import type { Metadata } from "next"
import Link from "next/link"
import { Globe, ShoppingCart, Smartphone, ArrowRight, CheckCircle2 } from "lucide-react"
import { generatePageMetadata, generateBreadcrumbSchema, generateServiceSchema } from "@/lib/seo"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export const metadata: Metadata = generatePageMetadata({
  title: "Servicii Web Design Timișoara - Website Factory",
  description:
    "Servicii complete de web design și dezvoltare în Timișoara: creare website, magazin online, aplicații mobile. Soluții profesionale pentru afacerea ta digitală.",
  path: "/servicii",
  keywords: [
    "servicii web design timisoara",
    "creare website timisoara",
    "magazin online timisoara",
    "aplicatii mobile timisoara",
    "dezvoltare aplicatii web",
    "firma web design timisoara",
    "agentie web design",
    "servicii digitale timisoara",
  ],
})

const services = [
  {
    id: "creare-website",
    title: "Creare Website",
    description:
      "Site-uri de prezentare structurate clar, rapide, optimizate SEO și construite să aducă cereri și clienți — nu doar să arate bine.",
    href: "/servicii/creare-website",
    icon: Globe,
    features: [
      "Design modern și responsive",
      "Optimizare SEO completă",
      "Viteză de încărcare optimă",
      "Panou de administrare intuitiv",
      "Suport și mentenanță",
    ],
    gradient: "from-brand to-brand-light",
    price: "De la 450€",
  },
  {
    id: "magazin-online",
    title: "Magazin Online",
    description:
      "E-commerce complet funcțional cu plăți integrate, sisteme de loializare, gestiune stocuri și gândit pentru vânzări și administrare ușoară.",
    href: "/servicii/magazin-online",
    icon: ShoppingCart,
    features: [
      "Plăți + livrare + facturare",
      "Filtre, căutare, variante produse",
      "Checkout optimizat pentru conversii",
      "Sisteme de loializare clienți",
      "Integrare curieri și metode de plată",
    ],
    gradient: "from-glow-violet to-brand",
    price: "De la 1100€",
  },
  {
    id: "dezvoltare-aplicatie",
    title: "Dezvoltare Aplicație",
    description:
      "Aplicații mobile native sau web și cross-platform pentru iOS și Android. UX curat și performanță bună — de la MVP la produs scalabil.",
    href: "/servicii/dezvoltare-aplicatie",
    icon: Smartphone,
    features: [
      "iOS & Android (cross-platform)",
      "Push notifications, conturi, plăți",
      "Publicare în store + mentenanță",
      "MVP rapid pentru startup-uri",
      "Scalabilitate și performanță",
    ],
    gradient: "from-glow-cyan to-glow-violet",
    price: "Personalizat",
  },
]

export default function ServiciiPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Acasă", url: "/" },
    { name: "Servicii", url: "/servicii" },
  ])

  const serviceSchema = generateServiceSchema({
    name: "Servicii Web Design și Dezvoltare",
    description:
      "Servicii complete de web design și dezvoltare în Timișoara: creare website, magazin online, aplicații mobile. Soluții profesionale pentru afacerea ta digitală.",
    url: "/servicii",
  })

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />

      <main>
        {/* Hero Section */}
        <section className="relative pt-24 pb-16 sm:pt-32 sm:pb-24 overflow-hidden">
          <div className="absolute inset-0 hero-gradient opacity-50" />
          <div className="absolute inset-0 grid-pattern opacity-30" />

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block text-sm font-medium text-brand tracking-widest uppercase mb-4">
                Servicii Complete
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Servicii <span className="gradient-text">Web Design</span> Timișoara
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                Oferim soluții complete de web design și dezvoltare pentru afacerea ta digitală. De la website-uri de
                prezentare la magazine online și aplicații mobile — totul gândit pentru rezultate măsurabile.
              </p>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-20 sm:py-28 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full bg-brand/5 blur-[100px]" />
            <div className="absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full bg-glow-violet/8 blur-[80px]" />
          </div>

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="grid lg:grid-cols-3 gap-8 lg:gap-10">
              {services.map((service, index) => {
                const Icon = service.icon
                return (
                  <Link
                    key={service.id}
                    href={service.href}
                    className={cn(
                      "group relative p-8 lg:p-10 rounded-3xl",
                      "bg-card/80 backdrop-blur-sm border border-border/50",
                      "transition-all duration-500 ease-out",
                      "hover:border-brand/30 hover:shadow-2xl hover:shadow-brand/10",
                      "card-lift card-metallic",
                    )}
                  >
                    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-brand/5 via-transparent to-glow-violet/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Icon with gradient background */}
                    <div
                      className={cn(
                        "relative w-16 h-16 rounded-2xl flex items-center justify-center mb-6",
                        "bg-gradient-to-br",
                        service.gradient,
                        "shadow-lg transition-all duration-500 group-hover:scale-110 group-hover:rotate-3",
                        "group-hover:shadow-xl group-hover:shadow-brand/30",
                      )}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </div>

                    {/* Price Badge */}
                    <div className="absolute top-6 right-6">
                      <span className="px-3 py-1.5 rounded-full text-sm font-semibold bg-brand/10 text-brand">
                        {service.price}
                      </span>
                    </div>

                    {/* Content */}
                    <h2 className="relative font-heading text-2xl font-bold text-foreground mb-4 group-hover:text-brand transition-colors">
                      {service.title}
                    </h2>
                    <p className="relative text-muted-foreground leading-relaxed mb-6">{service.description}</p>

                    {/* Features */}
                    <div className="relative space-y-3 mb-8">
                      {service.features.map((feature) => (
                        <div key={feature} className="flex items-start gap-3">
                          <CheckCircle2 className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-foreground">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="relative flex items-center gap-2 text-brand font-semibold group-hover:gap-3 transition-all">
                      <span>Vezi detalii</span>
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 sm:py-28 relative overflow-hidden bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
                Ai nevoie de o <span className="gradient-text">soluție personalizată</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                Fiecare proiect este unic. Oferim consultanță gratuită pentru a înțelege nevoile tale și a propune
                soluția optimă.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="group">
                  <Link href="/contact">
                    Solicită ofertă gratuită
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/portofoliu">Vezi portofoliul</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

