/**
 * Construiește scriptul inline care rulează în <head> `beforeInteractive`.
 *
 * IMPORTANT: acest cod devine string și se execută ÎNAINTE de hidratarea React
 * și înaintea oricărui tag de tracking. Nu poate importa nimic — de aceea
 * validarea (versiune + expirare) e reimplementată aici în JS simplu, din
 * aceleași constante ca `types.ts`.
 *
 * Ce face, în ordine:
 *  1. inițializează dataLayer + gtag;
 *  2. `consent default` = totul denied + wait_for_update + ads_data_redaction + url_passthrough;
 *  3. citește cookie-ul `consent_state`; dacă e valid (versiune ok + < 6 luni),
 *     trimite `consent update` cu semnalele salvate → fără flash, fără race.
 */

import {
  CONSENT_COOKIE_NAME,
  CONSENT_MAX_AGE_MS,
  CONSENT_VERSION,
} from "./types"

export function buildConsentDefaultScript(): string {
  // Valorile sunt injectate ca literali în string.
  const cookieName = CONSENT_COOKIE_NAME
  const version = CONSENT_VERSION
  const maxAgeMs = CONSENT_MAX_AGE_MS

  return `
(function () {
  try {
    window.dataLayer = window.dataLayer || [];
    function gtag(){ window.dataLayer.push(arguments); }
    window.gtag = window.gtag || gtag;

    gtag('consent', 'default', {
      ad_storage: 'denied',
      analytics_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      wait_for_update: 500
    });
    gtag('set', 'ads_data_redaction', true);
    gtag('set', 'url_passthrough', true);

    var name = ${JSON.stringify(cookieName)};
    var m = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
    if (m) {
      var rec = JSON.parse(decodeURIComponent(m[1]));
      var fresh = rec && rec.version === ${JSON.stringify(version)} &&
        typeof rec.timestamp === 'number' &&
        (Date.now() - rec.timestamp) <= ${maxAgeMs};
      if (fresh) {
        gtag('consent', 'update', {
          analytics_storage: rec.analytics ? 'granted' : 'denied',
          ad_storage: rec.marketing ? 'granted' : 'denied',
          ad_user_data: rec.marketing ? 'granted' : 'denied',
          ad_personalization: rec.marketing ? 'granted' : 'denied'
        });
      }
    }
  } catch (e) { /* fail closed: rămâne totul denied */ }
})();
`.trim()
}
