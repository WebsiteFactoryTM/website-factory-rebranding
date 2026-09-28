"use client"

import { useLocale, useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { Link, usePathname } from "@/i18n/navigation"
import { DUAL_LOCALE_PATHNAMES, type Locale, type Pathname } from "@/i18n/routing"
import { cn } from "@/lib/utils"

export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale()
  const t = useTranslations("switcher")
  const pathname = usePathname() as Pathname
  const params = useParams()
  const target: Locale = locale === "ro" ? "en" : "ro"

  // RO-only routes have no EN twin: send the visitor to the EN homepage instead.
  const hasTwin = target === "ro" || DUAL_LOCALE_PATHNAMES.includes(pathname)
  const href = hasTwin ? { pathname, params: params as Record<string, string> } : { pathname: "/" as const }

  return (
    <Link
      // @ts-expect-error -- params are only valid for the current dynamic route; next-intl validates at runtime
      href={href}
      locale={target}
      aria-label={t("label")}
      className={cn(
        "inline-flex items-center rounded-full border border-border px-3 py-1.5 text-xs font-semibold tracking-wider text-foreground/70 hover:text-foreground hover:border-brand/50 transition-colors",
        className,
      )}
    >
      {t(target)}
    </Link>
  )
}
