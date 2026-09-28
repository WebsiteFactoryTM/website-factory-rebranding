"use client"

import type React from "react"

import { useState } from "react"
import { useLocale, useTranslations } from "next-intl"
import { Link } from "@/i18n/navigation"
import { useScrollReveal } from "@/hooks/use-scroll-reveal"
import { useRecaptcha } from "@/hooks/use-recaptcha"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MagneticButton } from "@/components/ui/magnetic-button"
import { cn } from "@/lib/utils"
import { ArrowRight, CheckCircle2, Loader2, Send } from "lucide-react"

export function ContactForm() {
  const t = useTranslations("contactForm")
  const locale = useLocale()
  const roOnlyLocale = locale === "ro" ? undefined : "ro"
  const projectTypes = [
    { value: "website", label: t("projectTypes.website") },
    { value: "magazin", label: t("projectTypes.magazin") },
    { value: "aplicatie", label: t("projectTypes.aplicatie") },
    { value: "altul", label: t("projectTypes.altul") },
  ]
  const { ref, isVisible } = useScrollReveal<HTMLDivElement>()
  const { executeRecaptcha } = useRecaptcha()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    nume: "",
    email: "",
    telefon: "",
    tipProiect: "",
    companie: "",
    mesaj: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    try {
      const gRecaptchaToken = await executeRecaptcha("contact")

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.nume,
          email: formData.email,
          phone: formData.telefon,
          company: formData.companie || undefined,
          message: formData.mesaj,
          gRecaptchaToken,
          locale,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || t("sendError"))
      }

      setIsSubmitted(true)
    } catch (err) {
      console.error("Form submission error:", err)
      setError(err instanceof Error ? err.message : t("genericError"))
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  if (isSubmitted) {
    return (
      <div
        ref={ref}
        className={cn(
          "glass-card rounded-3xl p-8 md:p-12 border border-border/50 transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
        )}
      >
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/10 mb-6">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          <h3 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-4">{t("successTitle")}</h3>
          <p className="text-muted-foreground max-w-md mx-auto">{t("successText")}</p>
          <button
            onClick={() => {
              setIsSubmitted(false)
              setFormData({
                nume: "",
                email: "",
                telefon: "",
                tipProiect: "",
                companie: "",
                mesaj: "",
              })
            }}
            className="mt-8 text-brand hover:text-brand-light transition-colors font-medium inline-flex items-center gap-2"
          >
            {t("sendAnother")}
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div
      ref={ref}
      className={cn(
        "glass-card rounded-3xl p-8 md:p-12 border border-border/50 relative overflow-hidden transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8",
      )}
    >
      {/* Decorative corner accent */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-brand/10 rounded-full blur-[60px]" />
      <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-glow-violet/10 rounded-full blur-[60px]" />

      <div className="relative z-10">
        <div className="mb-8">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">{t("title")}</h2>
          <p className="text-muted-foreground">{t("intro")}</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Row 1: Nume & Email */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="nume" className="text-sm font-medium text-foreground">
                {t("fullName")} <span className="text-brand">*</span>
              </label>
              <Input
                id="nume"
                type="text"
                placeholder={t("fullNamePlaceholder")}
                required
                value={formData.nume}
                onChange={(e) => handleChange("nume", e.target.value)}
                className="h-12 rounded-xl bg-background/50 border-border/50 focus:border-brand focus:ring-brand/20"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium text-foreground">
                {t("email")} <span className="text-brand">*</span>
              </label>
              <Input
                id="email"
                type="email"
                placeholder={t("emailPlaceholder")}
                required
                value={formData.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="h-12 rounded-xl bg-background/50 border-border/50 focus:border-brand focus:ring-brand/20"
              />
            </div>
          </div>

          {/* Row 2: Telefon & Tip Proiect */}
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label htmlFor="telefon" className="text-sm font-medium text-foreground">
                {t("phone")} <span className="text-brand">*</span>
              </label>
              <Input
                id="telefon"
                type="tel"
                placeholder={t("phonePlaceholder")}
                required
                value={formData.telefon}
                onChange={(e) => handleChange("telefon", e.target.value)}
                className="h-12 rounded-xl bg-background/50 border-border/50 focus:border-brand focus:ring-brand/20"
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="tipProiect" className="text-sm font-medium text-foreground">
                {t("projectType")} <span className="text-brand">*</span>
              </label>
              <Select value={formData.tipProiect} onValueChange={(value) => handleChange("tipProiect", value)} required>
                <SelectTrigger className="h-12 w-full rounded-xl bg-background/50 border-border/50 focus:border-brand focus:ring-brand/20">
                  <SelectValue placeholder={t("projectTypePlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  {projectTypes.map((type) => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Row 3: Companie (optional) */}
          <div className="space-y-2">
            <label htmlFor="companie" className="text-sm font-medium text-foreground">
              {t("company")} <span className="text-muted-foreground text-xs">{t("optional")}</span>
            </label>
            <Input
              id="companie"
              type="text"
              placeholder={t("companyPlaceholder")}
              value={formData.companie}
              onChange={(e) => handleChange("companie", e.target.value)}
              className="h-12 rounded-xl bg-background/50 border-border/50 focus:border-brand focus:ring-brand/20"
            />
          </div>

          {/* Row 4: Message */}
          <div className="space-y-2">
            <label htmlFor="mesaj" className="text-sm font-medium text-foreground">
              {t("message")} <span className="text-brand">*</span>
            </label>
            <Textarea
              id="mesaj"
              placeholder={t("messagePlaceholder")}
              required
              rows={5}
              value={formData.mesaj}
              onChange={(e) => handleChange("mesaj", e.target.value)}
              className="rounded-xl bg-background/50 border-border/50 focus:border-brand focus:ring-brand/20 resize-none"
            />
          </div>

          {/* Privacy notice */}
          <p className="text-xs text-muted-foreground">
            {t("privacyPrefix")}{" "}
            <Link href="/politici-de-confidentialitate" locale={roOnlyLocale} className="text-brand hover:underline">
              {t("privacyPolicy")}
            </Link>{" "}
            {t("and")}{" "}
            <Link href="/termeni-si-conditii" locale={roOnlyLocale} className="text-brand hover:underline">
              {t("terms")}
            </Link>
            .
          </p>

          {/* Error message */}
          {error && (
            <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 text-sm">
              {error}
            </div>
          )}

          {/* Submit Button */}
          <MagneticButton className="w-full sm:w-auto" intensity={0.2} as="div">
            <button
              type="submit"
              disabled={isSubmitting}
              className="group relative w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl bg-brand text-brand-foreground font-semibold text-base shadow-lg hover:shadow-brand/30 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed overflow-hidden"
            >
              {/* Animated gradient overlay */}
              <span
                className="absolute inset-0 bg-gradient-to-r from-brand via-brand-light to-brand bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ animation: "gradient-shift 3s ease infinite" }}
              />

              <span className="relative z-10 flex items-center gap-3">
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    {t("sending")}
                  </>
                ) : (
                  <>
                    {t("submit")}
                    <Send className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
                  </>
                )}
              </span>
            </button>
          </MagneticButton>
        </form>
      </div>
    </div>
  )
}
