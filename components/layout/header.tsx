"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ArrowRight, Calculator, ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/theme-toggle"
import { useTheme } from "@/components/theme-provider"
import { MagneticButton } from "@/components/ui/magnetic-button"

const services = [
  { href: "/servicii/creare-website", label: "Creare Website" },
  { href: "/servicii/magazin-online", label: "Magazin Online" },
  { href: "/servicii/dezvoltare-aplicatie", label: "Dezvoltare Aplicație" },
]

const navLinks = [
  { href: "/portofoliu", label: "Portofoliu" },
  { href: "/despre-noi", label: "Despre noi" },
  { href: "/contact", label: "Contact" },
]

export function Header() {
  const [isScrolled, setIsScrolled] = React.useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false)
  const [isServicesOpen, setIsServicesOpen] = React.useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = React.useState(false)
  const { resolvedTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)
  const servicesRef = React.useRef<HTMLDivElement>(null)

  // Prevent hydration mismatch by only using theme after mount
  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  React.useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsMobileMenuOpen(false)
        setIsServicesOpen(false)
      }
    }
    document.addEventListener("keydown", handleEscape)
    return () => document.removeEventListener("keydown", handleEscape)
  }, [])

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (servicesRef.current && !servicesRef.current.contains(e.target as Node)) {
        setIsServicesOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          isScrolled ? "py-3 bg-background/70 backdrop-blur-2xl border-b border-border/50" : "py-5 bg-transparent",
        )}
      >
        <nav className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="relative z-10 flex-shrink-0 group">
              <Image
                src={
                  mounted && resolvedTheme === "dark"
                    ? "/logo-website-factory-horizontal-white.webp"
                    : "/logo-website-factory-horizontal-webp.webp"
                }
                alt="Website Factory - Logo - Creare site și web design Timișoara"
                width={144}
                height={32}
                className="h-7 sm:h-8 w-auto transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              <div ref={servicesRef} className="relative">
                <button
                  onClick={() => setIsServicesOpen(!isServicesOpen)}
                  className="relative px-5 py-2.5 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors group flex items-center gap-1"
                >
                  Servicii
                  <ChevronDown
                    className={cn("w-4 h-4 transition-transform duration-200", isServicesOpen && "rotate-180")}
                  />
                  <span className="absolute bottom-1 left-5 right-5 h-px bg-brand scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </button>

                {/* Dropdown menu */}
                <div
                  className={cn(
                    "absolute top-full left-0 mt-2 w-56 bg-background/95 backdrop-blur-xl border border-border rounded-xl shadow-2xl overflow-hidden transition-all duration-300 origin-top",
                    isServicesOpen
                      ? "opacity-100 scale-100 translate-y-0"
                      : "opacity-0 scale-95 -translate-y-2 pointer-events-none",
                  )}
                >
                  <div className="p-2">
                    {services.map((service) => (
                      <Link
                        key={service.href}
                        href={service.href}
                        onClick={() => setIsServicesOpen(false)}
                        className="block px-4 py-3 text-sm text-foreground/80 hover:text-foreground hover:bg-brand/10 rounded-lg transition-colors"
                      >
                        {service.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>

              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="relative px-5 py-2.5 text-sm font-medium text-foreground/70 hover:text-foreground transition-colors group"
                >
                  {link.label}
                  <span className="absolute bottom-1 left-5 right-5 h-px bg-brand scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
                </Link>
              ))}
            </div>

            {/* Desktop Actions */}
            <div className="hidden lg:flex items-center gap-4">
              <ThemeToggle />
              <MagneticButton
                className="relative overflow-hidden px-6 py-2.5 bg-brand text-brand-foreground rounded-full font-medium text-sm group glow-brand hover:glow-intense transition-all duration-300"
                onClick={() => (window.location.href = "/pret-website")}
              >
                <span className="relative z-10 flex items-center gap-2">
                  <Calculator className="w-4 h-4" />
                  Estimează preț
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </span>
              </MagneticButton>
            </div>

            {/* Mobile Menu Button */}
            <div className="flex lg:hidden items-center gap-3">
              <ThemeToggle />
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="relative z-10 p-2 text-foreground"
                aria-label={isMobileMenuOpen ? "Închide meniul" : "Deschide meniul"}
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-500",
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-background/95 backdrop-blur-2xl"
          onClick={() => setIsMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div className="relative h-full flex flex-col justify-center items-center">
          <nav className="flex flex-col items-center gap-6">
            <div className="flex flex-col items-center">
              <button
                onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                className="text-3xl font-heading font-bold text-foreground hover:text-brand transition-colors flex items-center gap-2"
                style={{
                  transform: isMobileMenuOpen ? "translateY(0)" : "translateY(30px)",
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0ms",
                }}
              >
                Servicii
                <ChevronDown
                  className={cn("w-6 h-6 transition-transform duration-200", isMobileServicesOpen && "rotate-180")}
                />
              </button>

              {/* Mobile services submenu */}
              <div
                className={cn(
                  "flex flex-col items-center gap-3 mt-3 overflow-hidden transition-all duration-300",
                  isMobileServicesOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0",
                )}
              >
                {services.map((service) => (
                  <Link
                    key={service.href}
                    href={service.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="text-lg text-muted-foreground hover:text-brand transition-colors"
                  >
                    {service.label}
                  </Link>
                ))}
              </div>
            </div>

            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-3xl font-heading font-bold text-foreground hover:text-brand transition-colors"
                style={{
                  transform: isMobileMenuOpen ? "translateY(0)" : "translateY(30px)",
                  opacity: isMobileMenuOpen ? 1 : 0,
                  transition: `all 0.5s cubic-bezier(0.16, 1, 0.3, 1) ${(index + 1) * 100}ms`,
                }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <Button
            asChild
            size="lg"
            className="mt-10 bg-brand hover:bg-brand-light text-brand-foreground px-8 glow-brand"
            style={{
              transform: isMobileMenuOpen ? "translateY(0)" : "translateY(30px)",
              opacity: isMobileMenuOpen ? 1 : 0,
              transition: "all 0.5s cubic-bezier(0.16, 1, 0.3, 1) 400ms",
            }}
          >
            <Link
              href="/pret-website"
              onClick={() => setIsMobileMenuOpen(false)}
              className="inline-flex items-center gap-2"
            >
              <Calculator className="w-5 h-5" />
              Estimează preț
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}
