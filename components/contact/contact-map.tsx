"use client"

import { useLocale } from "next-intl"
import type { Locale } from "@/i18n/routing"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"
import { MapPin } from "lucide-react"

const roCopy = {
  label: "Locația noastră",
  heading: "Unde ne găsești",
  subtitle: "Suntem din în Timișoara, dar lucrăm cu clienți din toată România și nu numai.",
  cardTitle: "Website Factory",
  addressLine1: "Timișoara, Timiș",
  addressLine2: "România",
  openMaps: "Deschide în Google Maps",
}

const enCopy = {
  label: "Our location",
  heading: "Where to find us",
  subtitle: "We're based in Timișoara, and work with clients across Romania and beyond.",
  cardTitle: "Website Factory",
  addressLine1: "Timișoara, Timiș",
  addressLine2: "Romania",
  openMaps: "Open in Google Maps",
}

const copy = { ro: roCopy, en: enCopy } satisfies Record<Locale, typeof roCopy>

export function ContactMap() {
  const locale = useLocale()
  const t = copy[locale]
  const { ref, isVisible } = useScrollReveal()

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 lg:px-8">
        <div
          ref={ref}
          className={cn(
            "text-center mb-12 transition-all duration-700",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          <span className="inline-flex items-center gap-2 text-sm font-medium text-brand tracking-widest uppercase mb-4">
            <MapPin className="w-4 h-4" />
            {t.label}
          </span>
          <h2 className="font-heading text-3xl md:text-4xl font-bold text-foreground mb-4">{t.heading}</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">{t.subtitle}</p>
        </div>

        <div
          className={cn(
            "relative rounded-3xl overflow-hidden border border-border/50 shadow-2xl transition-all duration-700 delay-200",
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
          )}
        >
          {/* Map placeholder with styling */}
          <div className="relative h-[400px] md:h-[500px] bg-muted">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d89217.96028586812!2d21.17377395!3d45.74887645!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4745677dcb0fb5a7%3A0x537faf6473936749!2sTimi%C8%99oara!5e0!3m2!1sen!2sro!4v1704800000000!5m2!1sen!2sro"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Website Factory Location - Timișoara"
              className="grayscale hover:grayscale-0 transition-all duration-500"
            />

            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
          </div>

          {/* Location card overlay */}
          <div className="absolute bottom-6 left-6 right-6 md:right-auto md:max-w-sm">
            <div className="glass-premium rounded-2xl p-5">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand flex items-center justify-center">
                  <MapPin className="w-6 h-6 text-brand-foreground" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-1">{t.cardTitle}</h3>
                  <p className="text-sm text-muted-foreground">
                    {t.addressLine1}
                    <br />
                    {t.addressLine2}
                  </p>
                  <a
                    href="https://maps.google.com/?q=Timisoara"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-brand hover:text-brand-light transition-colors"
                  >
                    {t.openMaps}
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
