"use client"

import * as React from "react"
import { Link } from "@/i18n/navigation"
import NextLink from "next/link"
import { useLocale, useTranslations } from "next-intl"
import Image from "next/image"
import { useTheme } from "@/components/theme-provider"
import { useConsent } from "@/components/consent/consent-provider"
import { ArrowUpRight, MapPin, Mail, Phone } from "lucide-react"

export function Footer() {
  const t = useTranslations("footer")
  const tNav = useTranslations("nav")
  const locale = useLocale()
  const footerLinks = {
    servicii: [
      { href: "/servicii/creare-website" as const, label: t("createWebsite") },
      { href: "/servicii/magazin-online" as const, label: t("onlineStore") },
      { href: "/servicii/dezvoltare-aplicatie" as const, label: t("appDevelopment") },
    ],
    companie: [
      { href: "/despre-noi" as const, label: t("about") },
      { href: "/portofoliu" as const, label: t("portfolio") },
      { href: "/contact" as const, label: t("contact") },
    ],
    legal: [
      { href: "/termeni-si-conditii" as const, label: t("terms") },
      { href: "/politici-de-confidentialitate" as const, label: t("privacy") },
      { href: "/politica-cookie" as const, label: t("cookies") },
    ],
    cities: [
      { href: "/" as const, label: "Timișoara", roOnly: false },
      { href: "/creare-site-bucuresti" as const, label: "București", roOnly: true },
      { href: "/creare-site-cluj" as const, label: "Cluj-Napoca", roOnly: true },
      { href: "/creare-site-brasov" as const, label: "Brașov", roOnly: true },
      { href: "/creare-site-iasi" as const, label: "Iași", roOnly: true },
      { href: "/creare-site-constanta" as const, label: "Constanța", roOnly: true },
    ],
  }
  const currentYear = new Date().getFullYear()
  const { resolvedTheme } = useTheme()
  const { openPreferences } = useConsent()
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
                alt={tNav("logoAlt")}
                width={180}
                height={40}
                className="h-9 w-auto transition-transform duration-300 group-hover:scale-105"
              />
            </Link>
            <p className="mt-6 text-muted-foreground leading-relaxed max-w-sm">{t("tagline")}</p>

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
                {t("location")}
              </div>
            </div>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-5">{t("servicesHeading")}</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/servicii"
                  className="text-sm font-medium text-foreground hover:text-brand transition-colors inline-flex items-center gap-1 group"
                >
                  {t("allServices")}
                  <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                </Link>
              </li>
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
            <h3 className="font-heading font-semibold text-foreground mb-5">{t("companyHeading")}</h3>
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

          {locale === "ro" && (
            <div>
              <h3 className="font-heading font-semibold text-foreground mb-5">{t("locationsHeading")}</h3>
              <ul className="space-y-3">
                {footerLinks.cities.map((link) =>
                  link.roOnly ? (
                    <li key={link.href}>
                      <NextLink
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-brand transition-colors inline-flex items-center gap-1 group"
                      >
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                      </NextLink>
                    </li>
                  ) : (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-sm text-muted-foreground hover:text-brand transition-colors inline-flex items-center gap-1 group"
                      >
                        {link.label}
                        <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}

          {/* Legal Links */}
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-5">{t("legalHeading")}</h3>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <NextLink
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-brand transition-colors inline-flex items-center gap-1 group"
                  >
                    {link.label}
                    <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                  </NextLink>
                </li>
              ))}
              <li>
                <button
                  onClick={openPreferences}
                  className="text-sm text-muted-foreground hover:text-brand transition-colors inline-flex items-center gap-1 group"
                >
                  {t("manageCookies")}
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
              © {currentYear} Website Factory. {t("rights")}
            </p>
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              {t("madeWith")}
              <span className="inline-block animate-pulse text-red-500">❤</span>
              {t("inCity")}
            </p>
          </div>
          <div className="mt-4 text-center text-xs text-muted-foreground/60">
            This site is protected by reCAPTCHA and the Google{" "}
            <a href="https://policies.google.com/privacy" className="hover:text-brand transition-colors">
              Privacy Policy
            </a>{" "}
            and{" "}
            <a href="https://policies.google.com/terms" className="hover:text-brand transition-colors">
              Terms of Service
            </a>{" "}
            apply.
          </div>
        </div>
      </div>
    </footer>
  )
}
