"use client"

import { useLocale } from "next-intl"
import type { Locale } from "@/i18n/routing"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { cn } from "@/lib/utils"
import { Clock, Mail, MapPin, Phone } from "lucide-react"

const roCopy = {
  contactDetails: [
    {
      icon: Phone,
      label: "Telefon",
      value: "+40 728 567 830",
      href: "tel:+40728567830",
      description: "Luni - Vineri, 09:00 - 18:00",
    },
    {
      icon: Mail,
      label: "Email",
      value: "office@websitefactory.ro",
      href: "mailto:office@websitefactory.ro",
      description: "Răspundem în max. 24h",
    },
    {
      icon: MapPin,
      label: "Locație",
      value: "Timișoara, România",
      href: "https://maps.google.com/?q=Timisoara",
      description: "Lucrăm remote în toată țara",
    },
    {
      icon: Clock,
      label: "Program",
      value: "Luni - Vineri",
      href: null,
      description: "09:00 - 18:00",
    },
  ],
  followUs: "Urmărește-ne",
  availableNow: "Disponibil acum",
  quickResponse: "Răspundem la mesaje în cel mai scurt timp. Programează o întâlnire sau trimite-ne un mesaj.",
}

const enCopy = {
  contactDetails: [
    {
      icon: Phone,
      label: "Phone",
      value: "+40 728 567 830",
      href: "tel:+40728567830",
      description: "Monday - Friday, 9am - 6pm",
    },
    {
      icon: Mail,
      label: "Email",
      value: "office@websitefactory.ro",
      href: "mailto:office@websitefactory.ro",
      description: "We reply within 24h",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Timișoara, Romania",
      href: "https://maps.google.com/?q=Timisoara",
      description: "We work remotely with clients everywhere",
    },
    {
      icon: Clock,
      label: "Hours",
      value: "Monday - Friday",
      href: null,
      description: "9am - 6pm",
    },
  ],
  followUs: "Follow us",
  availableNow: "Available now",
  quickResponse: "We reply to messages as quickly as we can. Book a call or send us a message.",
}

const copy = { ro: roCopy, en: enCopy } satisfies Record<Locale, typeof roCopy>

const socialLinks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/profile.php?id=100087606842806",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://instagram.com/websitefactorytm",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
      </svg>
    ),
  },
  {
    name: "X (Twitter)",
    href: "https://x.com/websitefactory_",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/websitefactory-tm/",
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
]

export function ContactInfo() {
  const locale = useLocale()
  const t = copy[locale]
  const { ref, isVisible } = useScrollReveal({ threshold: 0.1 })

  return (
    <div
      ref={ref}
      className={cn(
        "space-y-8 transition-all duration-700 delay-200",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      )}
    >
      {/* Contact Cards */}
      <div className="space-y-4">
        {t.contactDetails.map((item, index) => (
          <div
            key={item.label}
            className="group glass-card rounded-2xl p-5 border border-border/50 hover:border-brand/30 transition-all duration-300 card-metallic"
            style={{
              transitionDelay: `${index * 100}ms`,
            }}
          >
            {item.href ? (
              <a
                href={item.href}
                target={item.href.startsWith("http") ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="flex items-start gap-4"
              >
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center group-hover:bg-brand/20 transition-colors">
                  <item.icon className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="font-semibold text-foreground group-hover:text-brand transition-colors">{item.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </div>
              </a>
            ) : (
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-brand/10 flex items-center justify-center">
                  <item.icon className="w-5 h-5 text-brand" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{item.label}</p>
                  <p className="font-semibold text-foreground">{item.value}</p>
                  <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Social Links */}
      <div className="glass-card rounded-2xl p-6 border border-border/50">
        <h3 className="font-heading text-lg font-semibold text-foreground mb-4">{t.followUs}</h3>
        <div className="flex gap-3">
          {socialLinks.map((social) => (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.name}
              className="w-12 h-12 rounded-xl bg-background/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-brand hover:border-brand/50 hover:bg-brand/5 transition-all duration-300"
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Quick response badge */}
      <div className="relative overflow-hidden rounded-2xl p-6 bg-gradient-to-br from-brand/10 via-brand/5 to-glow-violet/10 border border-brand/20">
        <div className="absolute -top-10 -right-10 w-32 h-32 bg-brand/20 rounded-full blur-[40px]" />
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-3">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-medium text-foreground">{t.availableNow}</span>
          </div>
          <p className="text-sm text-muted-foreground">{t.quickResponse}</p>
        </div>
      </div>
    </div>
  )
}
