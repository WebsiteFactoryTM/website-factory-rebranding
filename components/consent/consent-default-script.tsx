import Script from "next/script"
import { buildConsentDefaultScript } from "@/lib/consent/signal-script"

/**
 * Injectează Consent Mode v2 „default denied" + restore din cookie în <head>,
 * `beforeInteractive` — înaintea hidratării React și a oricărui tag de tracking.
 *
 * A se randa în <head>-ul din app/layout.tsx. NU e client component: e un
 * <Script> server-rendered al cărui conținut rulează cât mai devreme posibil.
 */
export function ConsentDefaultScript() {
  return (
    <Script
      id="consent-default"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: buildConsentDefaultScript() }}
    />
  )
}
