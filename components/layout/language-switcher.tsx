"use client"

import NextLink from "next/link"
import { useLocale, useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { usePathname, getPathname } from "@/i18n/navigation"
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
  const internalHref = hasTwin
    ? { pathname, params: params as Record<string, string> }
    : { pathname: "/" as const }

  // Resolve the fully-localized destination URL ourselves, then hand it to plain
  // `next/link` rather than next-intl's `<Link>`. next-intl's `<Link>` always re-derives
  // the pathname from `locale` prop `|| the CURRENT locale` internally, so a pre-resolved
  // string href that happens to also be a valid internal pathname key (e.g. our own RO
  // pathnames, like "/despre-noi") gets silently re-localized back to the *current*
  // locale, undoing this computation entirely. Passing `locale={target}` instead (the
  // naive fix) has the opposite problem: next-intl's `<Link>` forces a prefix onto ANY
  // explicitly-passed locale, even the default one, sending RO destinations through an
  // unnecessary `/ro/...` redirect hop (same defect already fixed in
  // footer.tsx/consent-banner.tsx). `getPathname` alone gives the correct per-locale
  // template *and* the correct as-needed prefixing (no prefix for default "ro"), so
  // rendering it through plain `next/link` — which never reinterprets its `href` — is
  // the only way to get a link that's both correctly localized and correctly prefixed.
  const href = getPathname({
    // @ts-expect-error -- params are only valid for the current dynamic route; next-intl validates at runtime
    href: internalHref,
    locale: target,
  })

  return (
    <NextLink
      href={href}
      hrefLang={target}
      aria-label={t("label")}
      className={cn(
        "inline-flex items-center rounded-full border border-border px-3 py-1.5 text-xs font-semibold tracking-wider text-foreground/70 hover:text-foreground hover:border-brand/50 transition-colors",
        className,
      )}
    >
      {t(target)}
    </NextLink>
  )
}
