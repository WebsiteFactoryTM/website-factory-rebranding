import type { Metadata } from "next"
import { notFound } from "next/navigation"
import Image from "next/image"
import { ArrowLeft, ArrowRight, ExternalLink, Quote, CheckCircle2 } from "lucide-react"
import { setRequestLocale, getTranslations } from "next-intl/server"
import { routing, type Locale } from "@/i18n/routing"
import { Link, getPathname } from "@/i18n/navigation"
import { generatePageMetadata, generateBreadcrumbSchema, siteConfig } from "@/lib/seo"
import { getProjects } from "@/lib/portfolio-data"
import { Button } from "@/components/ui/button"
import { generateProjectAltText } from "@/lib/image-alt-text"

interface Props {
  params: Promise<{ locale: string; slug: string }>
}

const roCopy = {
  backToPortfolio: "Înapoi la portofoliu",
  client: "Client:",
  visitLive: "Vizitează site-ul live",
  challenge: "Provocarea",
  solution: "Soluția noastră",
  technologies: "Tehnologii folosite",
  prevProject: "Proiect anterior",
  nextProject: "Proiect următor",
  ctaTitle: "Vrei un proiect similar?",
  ctaText: "Hai să discutăm despre cum putem crea ceva extraordinar împreună.",
  ctaButton: "Solicită ofertă gratuită",
}
const copy = { ro: roCopy, en: roCopy } satisfies Record<Locale, typeof roCopy>

export async function generateStaticParams() {
  const { featured } = getProjects("ro")
  return routing.locales.flatMap((locale) => featured.map((project) => ({ locale, slug: project.slug })))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const project = getProjects(locale as Locale).featured.find((p) => p.slug === slug)

  if (!project) {
    return {}
  }

  return generatePageMetadata({
    locale: locale as Locale,
    href: { pathname: "/portofoliu/[slug]", params: { slug } },
    title: `${project.title} - Studiu de caz - Web design`,
    description: project.description,
    keywords: [project.categoryLabel, project.client, "studiu de caz", "portofoliu web design"],
  })
}

export default async function CaseStudyPage({ params }: Props) {
  const { locale, slug } = await params
  setRequestLocale(locale as Locale)
  const t = copy[locale as Locale]
  const tBreadcrumb = await getTranslations("breadcrumb")

  const { featured } = getProjects(locale as Locale)
  const project = featured.find((p) => p.slug === slug)

  if (!project) {
    notFound()
  }

  const currentIndex = featured.findIndex((p) => p.slug === slug)
  const prevProject = currentIndex > 0 ? featured[currentIndex - 1] : null
  const nextProject = currentIndex < featured.length - 1 ? featured[currentIndex + 1] : null

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: tBreadcrumb("home"), url: "/" },
    { name: tBreadcrumb("portfolio"), url: "/portofoliu" },
    { name: project.title, url: `/portofoliu/${project.slug}` },
  ])

  const caseStudySchema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    url: `${siteConfig.url}${getPathname({
      locale: locale as Locale,
      href: { pathname: "/portofoliu/[slug]", params: { slug: project.slug } },
    })}`,
    inLanguage: locale,
    dateCreated: project.year,
    creator: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    about: {
      "@type": "Organization",
      name: project.client,
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(caseStudySchema) }} />

      <main className="min-h-screen">
        {/* Hero */}
        <section className="relative pt-24 pb-16 overflow-hidden">
          <div className="absolute inset-0 hero-gradient" />
          <div className="absolute inset-0 grid-pattern opacity-50" />

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            {/* Back link */}
            <Link
              href="/portofoliu"
              className="inline-flex items-center gap-2 text-muted-foreground hover:text-brand transition-colors mb-8"
            >
              <ArrowLeft className="h-4 w-4" />
              {t.backToPortfolio}
            </Link>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="px-3 py-1 text-sm font-medium bg-brand/10 text-brand rounded-full">
                    {project.categoryLabel}
                  </span>
                  <span className="text-sm text-muted-foreground">{project.year}</span>
                </div>

                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground">
                  {project.title}
                </h1>

                <p className="text-sm text-muted-foreground">
                  {t.client} <span className="text-foreground font-medium">{project.client}</span>
                </p>

                <p className="text-lg text-muted-foreground leading-relaxed">{project.description}</p>

                {/* Results */}
                <div className="grid grid-cols-3 gap-4 p-6 rounded-2xl glass-card">
                  {project.results.map((result) => (
                    <div key={result.label} className="text-center">
                      <p className="text-2xl md:text-3xl font-bold gradient-text">{result.value}</p>
                      <p className="text-sm text-muted-foreground mt-1">{result.label}</p>
                    </div>
                  ))}
                </div>

                {project.liveUrl && (
                  <Button asChild size="lg">
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      {t.visitLive}
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>

              {/* Image */}
              <div className="relative">
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden glass-premium">
                  <div className="absolute inset-0 border-2 border-brand/20 rounded-2xl z-10 pointer-events-none" />
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={generateProjectAltText({
                      title: project.title,
                      client: project.client,
                      category: project.category,
                      categoryLabel: project.categoryLabel,
                      locale: locale as Locale,
                    })}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Challenge & Solution */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Challenge */}
              <div className="space-y-4">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">{t.challenge}</h2>
                <p className="text-muted-foreground leading-relaxed">{project.challenge}</p>
              </div>

              {/* Solution */}
              <div className="space-y-4">
                <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">{t.solution}</h2>
                <p className="text-muted-foreground leading-relaxed">{project.solution}</p>
              </div>
            </div>
          </div>
        </section>

        {/* Technologies */}
        <section className="py-20">
          <div className="container mx-auto px-4 lg:px-8">
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground text-center mb-8">
              {t.technologies}
            </h2>
            <div className="flex flex-wrap justify-center gap-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-full text-foreground"
                >
                  <CheckCircle2 className="h-4 w-4 text-brand" />
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonial */}
        {project.testimonial && (
          <section className="py-20 bg-gradient-to-br from-brand/5 to-glow-violet/5">
            <div className="container mx-auto px-4 lg:px-8">
              <div className="max-w-3xl mx-auto text-center">
                <Quote className="h-12 w-12 text-brand/30 mx-auto mb-6" />
                <blockquote className="text-xl md:text-2xl text-foreground leading-relaxed italic">
                  "{project.testimonial.quote}"
                </blockquote>
                <div className="mt-6">
                  <p className="font-semibold text-foreground">{project.testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">{project.testimonial.role}</p>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* Navigation */}
        <section className="py-16 border-t border-border">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
              {prevProject ? (
                <Link
                  href={{ pathname: "/portofoliu/[slug]", params: { slug: prevProject.slug } }}
                  className="flex items-center gap-3 text-muted-foreground hover:text-brand transition-colors group"
                >
                  <ArrowLeft className="h-5 w-5 transition-transform group-hover:-translate-x-1" />
                  <div className="text-left">
                    <span className="text-xs uppercase tracking-wider">{t.prevProject}</span>
                    <p className="font-medium text-foreground">{prevProject.title}</p>
                  </div>
                </Link>
              ) : (
                <div />
              )}

              {nextProject ? (
                <Link
                  href={{ pathname: "/portofoliu/[slug]", params: { slug: nextProject.slug } }}
                  className="flex items-center gap-3 text-muted-foreground hover:text-brand transition-colors group"
                >
                  <div className="text-right">
                    <span className="text-xs uppercase tracking-wider">{t.nextProject}</span>
                    <p className="font-medium text-foreground">{nextProject.title}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              ) : (
                <div />
              )}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 bg-brand">
          <div className="container mx-auto px-4 lg:px-8 text-center">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">{t.ctaTitle}</h2>
            <p className="text-white/80 mb-8 max-w-xl mx-auto">{t.ctaText}</p>
            <Button asChild size="lg" className="bg-white text-brand hover:bg-white/90">
              <Link href="/contact">
                {t.ctaButton}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </>
  )
}
