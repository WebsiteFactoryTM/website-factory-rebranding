import type { Metadata } from "next"
import { Globe, ShoppingCart, Smartphone, ArrowRight, CheckCircle2 } from "lucide-react"
import { setRequestLocale, getTranslations } from "next-intl/server"
import type { Locale } from "@/i18n/routing"
import { allLocaleParams } from "@/lib/i18n/ro-only"
import { Link } from "@/i18n/navigation"
import { generatePageMetadata, generateBreadcrumbSchema, generateServiceSchema } from "@/lib/seo"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params
  if (locale === "en") {
    return generatePageMetadata({
      locale,
      href: "/servicii",
      hreflang: true,
      title: "Web Design & Development Services",
      description:
        "Business websites, online stores and mobile apps — built SEO-first, optimised for performance, and designed to bring in enquiries.",
      keywords: [
        "web design agency",
        "website design services",
        "e-commerce website development",
        "mobile app development",
        "SEO-first web design",
        "small business website design",
      ],
    })
  }
  return generatePageMetadata({
    locale,
    href: "/servicii",
    hreflang: true,
    title: "Servicii Web Design Timișoara",
    description:
      "Servicii complete de web design și dezvoltare în Timișoara: creare website, magazin online, aplicații mobile. Soluții profesionale pentru afacerea ta digitală.",
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
}

const roCopy = {
  hero: {
    eyebrow: "Servicii Complete",
    title: "Servicii ",
    titleHighlight: "Web Design",
    city: " Timișoara",
    text: "Oferim soluții complete de web design și dezvoltare pentru afacerea ta digitală. De la website-uri de prezentare la magazine online și aplicații mobile — totul gândit pentru rezultate măsurabile.",
  },
  services: [
    {
      id: "creare-website",
      title: "Creare Website",
      description:
        "Site-uri de prezentare structurate clar, rapide, optimizate SEO și construite să aducă cereri și clienți — nu doar să arate bine.",
      features: [
        "Design modern și responsive",
        "Optimizare SEO completă",
        "Viteză de încărcare optimă",
        "Panou de administrare intuitiv",
        "Suport și mentenanță",
      ],
    },
    {
      id: "magazin-online",
      title: "Magazin Online",
      description:
        "E-commerce complet funcțional cu plăți integrate, sisteme de loializare, gestiune stocuri și gândit pentru vânzări și administrare ușoară.",
      features: [
        "Plăți + livrare + facturare",
        "Filtre, căutare, variante produse",
        "Checkout optimizat pentru conversii",
        "Sisteme de loializare clienți",
        "Integrare curieri și metode de plată",
      ],
    },
    {
      id: "dezvoltare-aplicatie",
      title: "Dezvoltare Aplicație",
      description:
        "Aplicații mobile native sau web și cross-platform pentru iOS și Android. UX curat și performanță bună — de la MVP la produs scalabil.",
      features: [
        "iOS & Android (cross-platform)",
        "Push notifications, conturi, plăți",
        "Publicare în store + mentenanță",
        "MVP rapid pentru startup-uri",
        "Scalabilitate și performanță",
      ],
    },
  ],
  viewDetails: "Vezi detalii",
  cta: {
    title: "Ai nevoie de o ",
    titleHighlight: "soluție personalizată",
    text: "Fiecare proiect este unic. Oferim consultanță gratuită pentru a înțelege nevoile tale și a propune soluția optimă.",
    primary: "Solicită ofertă gratuită",
    secondary: "Vezi portofoliul",
  },
}

const enCopy = {
  hero: {
    eyebrow: "Full-Service Web Design",
    title: "Web Design &",
    titleHighlight: " Development",
    city: " Services",
    text: "From business websites to online stores and mobile apps, we build the tools your business needs to grow online — all engineered with one thing in mind: measurable results.",
  },
  services: [
    {
      id: "creare-website",
      title: "Website Development",
      description:
        "A clear, fast, SEO-optimised website — built to bring in enquiries, not just to look the part.",
      features: [
        "Modern, responsive design",
        "Complete SEO optimisation",
        "Fast, optimised loading",
        "Intuitive admin panel",
        "Ongoing support & maintenance",
      ],
    },
    {
      id: "magazin-online",
      title: "Online Store",
      description:
        "A fully working online store — integrated payments, loyalty tools, stock management — built around easy admin and even easier selling.",
      features: [
        "Payments, delivery & invoicing handled",
        "Filters, search & product variants",
        "Checkout built to convert",
        "Customer loyalty schemes",
        "Courier & payment method integrations",
      ],
    },
    {
      id: "dezvoltare-aplicatie",
      title: "App Development",
      description:
        "Native or cross-platform apps for iOS and Android. Clean UX, strong performance — from first MVP to a product ready to scale.",
      features: [
        "iOS & Android (cross-platform)",
        "Push notifications, accounts & payments",
        "App store publishing & maintenance",
        "Fast MVPs for startups",
        "Built to scale",
      ],
    },
  ],
  viewDetails: "See details",
  cta: {
    title: "Not sure which service",
    titleHighlight: " fits your business",
    text: "That's what the free consultation is for — we'll look at what you need and point you to the right option.",
    primary: "Get a free quote",
    secondary: "View our portfolio",
  },
}

const copy = { ro: roCopy, en: enCopy } satisfies Record<Locale, typeof roCopy>

const serviceMeta = [
  {
    id: "creare-website",
    href: "/servicii/creare-website" as const,
    icon: Globe,
    gradient: "from-brand to-brand-light",
    price: "De la 450€",
  },
  {
    id: "magazin-online",
    href: "/servicii/magazin-online" as const,
    icon: ShoppingCart,
    gradient: "from-glow-violet to-brand",
    price: "De la 1100€",
  },
  {
    id: "dezvoltare-aplicatie",
    href: "/servicii/dezvoltare-aplicatie" as const,
    icon: Smartphone,
    gradient: "from-glow-cyan to-glow-violet",
    price: "Personalizat",
  },
]

export function generateStaticParams() {
  return allLocaleParams()
}

export default async function ServiciiPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  setRequestLocale(locale as Locale)
  const t = copy[locale as Locale]
  const services = t.services.map((service, i) => ({ ...service, ...serviceMeta[i] }))

  const tBreadcrumb = await getTranslations("breadcrumb")
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: tBreadcrumb("home"), url: "/" },
    { name: tBreadcrumb("services"), url: "/servicii" },
  ])

  const serviceSchema = {
    ...generateServiceSchema(
      locale === "en"
        ? {
            name: "Web Design & Development Services",
            description:
              "Business websites, online stores and mobile apps — built SEO-first, optimised for performance, and designed to bring in enquiries.",
            url: "/servicii",
          }
        : {
            name: "Servicii Web Design și Dezvoltare",
            description:
              "Servicii complete de web design și dezvoltare în Timișoara: creare website, magazin online, aplicații mobile. Soluții profesionale pentru afacerea ta digitală.",
            url: "/servicii",
          },
      locale as Locale,
    ),
    inLanguage: locale,
  }

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
                {t.hero.eyebrow}
              </span>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                {t.hero.title}
                <span className="gradient-text">{t.hero.titleHighlight}</span>
                {t.hero.city}
              </h1>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                {t.hero.text}
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
              {services.map((service) => {
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
                    {locale === "ro" && (
                      <div className="absolute top-6 right-6">
                        <span className="px-3 py-1.5 rounded-full text-sm font-semibold bg-brand/10 text-brand">
                          {service.price}
                        </span>
                      </div>
                    )}

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
                      <span>{t.viewDetails}</span>
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
                {t.cta.title}
                <span className="gradient-text">{t.cta.titleHighlight}</span>?
              </h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">{t.cta.text}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" className="group">
                  <Link href="/contact">
                    {t.cta.primary}
                    <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/portofoliu">{t.cta.secondary}</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
