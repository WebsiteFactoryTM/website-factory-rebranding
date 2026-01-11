"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "@/components/theme-provider"
import { ArrowUpRight, MapPin, Mail, Phone } from "lucide-react"

const footerLinks = {
  servicii: [
    { href: "/servicii/creare-website", label: "Creare website" },
    { href: "/servicii/magazin-online", label: "Magazin online" },
    { href: "/servicii/dezvoltare-aplicatie", label: "Dezvoltare aplicație" },
  ],
  companie: [
    { href: "/despre-noi", label: "Despre noi" },
    { href: "/portofoliu", label: "Portofoliu" },
    { href: "/contact", label: "Contact" },
  ],
  legal: [
    { href: "/termeni-si-conditii", label: "Termeni și condiții" },
    { href: "/politici-de-confidentialitate", label: "Politică de confidențialitate" },
    { href: "/politica-cookie", label: "Politică cookie" },
  ],
  cities: [
    { href: "/", label: "Timișoara" },
    { href: "/creare-site-bucuresti", label: "București" },
    { href: "/creare-site-cluj", label: "Cluj-Napoca" },
    { href: "/creare-site-brasov", label: "Brașov" },
    { href: "/creare-site-iasi", label: "Iași" },
    { href: "/creare-site-constanta", label: "Constanța" },
  ],
}

export function Footer() {
  const currentYear = new Date().getFullYear()
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // Prevent hydration mismatch by only using theme after mount
  React.useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <footer className="relative overflow-hidden bg-card border-t border-border" role="contentinfo">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-secondary/50 to-transparent pointer-events-none" />

      {/* Main footer content */}
      <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-20 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8">
          {/* Brand Column - spans 2 cols */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block group">
              <Image
                src={
                  mounted && resolvedTheme === "dark"
                    ? "/logo-website-factory-horizontal-white.webp"
                    : "/logo-website-factory-horizontal-webp.webp"
                }
                alt="Website Factory - Logo - Creare site și web design Timișoara"
                width={180}
                height={40}
                className="h-9 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-sm">
              Web design profesional în Timișoara. Creăm site-uri SEO-first, optimizate pentru performanță și conversii
              maxime.
            </p>

            {/* Contact info */}
            <div className="mt-6 space-y-3">
              <a
                href="mailto:office@websitefactory.ro"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-brand transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center group-hover:bg-brand/20 transition-colors">
                  <Mail className="w-4 h-4 text-brand" />
                </div>
                office@websitefactory.ro
              </a>
              <a
                href="tel:+40728567830"
                className="flex items-center gap-3 text-sm text-muted-foreground hover:text-brand transition-colors group"
              >
                <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center group-hover:bg-brand/20 transition-colors">
                  <Phone className="w-4 h-4 text-brand" />
                </div>
                +40 728 567 830
              </a>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="w-8 h-8 rounded-lg bg-brand/10 flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-brand" />
                </div>
                Timișoara, România
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-5">Servicii</h3>
            <ul className="space-y-3">
              {footerLinks.servicii.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-brand transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-5">Companie</h3>
            <ul className="space-y-3">
              {footerLinks.companie.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-brand transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-heading font-semibold text-foreground mb-5">Locații</h3>
            <ul className="space-y-3">
              {footerLinks.cities.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-brand transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal Links */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-5">Legal</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-brand transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </Link>
                </li>
              ))}
              <li>
                <button
                  onClick={() => {
                    if (typeof window !== "undefined" && window.showCookieConsent) {
                      window.showCookieConsent()
                    }
                  }}
                  className="text-sm text-muted-foreground hover:text-brand transition-colors inline-flex items-center gap-1 group"
                >
                  Gestionare cookie-uri
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Website Factory. Toate drepturile rezervate.
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              Creat cu
              <span className="inline-block animate-pulse text-red-500">❤</span>
              în Timișoara
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
