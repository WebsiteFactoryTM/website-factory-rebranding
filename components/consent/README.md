# Cookie Consent (GDPR + Google Consent Mode v2)

Sistem custom (fără CMP extern) pentru consimțământ cookie conform GDPR / ePrivacy / Legea RO 506/2004, cu Google Consent Mode v2.

## Arhitectură

```
lib/consent/
  types.ts          categorii, ConsentState/Record, CONSENT_VERSION, expirare
  storage.ts        cookie first-party `consent_state` (SameSite=Lax, 180z) + validare
  consent-mode.ts   mapare categorii → 4 semnale + gtag consent update
  signal-script.ts  string inline pt <head> (default denied + restore)

components/consent/
  consent-default-script.tsx   <Script beforeInteractive> în <head>
  consent-provider.tsx         context reactiv (accept/reject/save/withdraw)
  consent-banner.tsx           banner accesibil (role=dialog, focus trap, ESC)
  page-view-tracker.tsx        SPA page_view pe schimbare rută
  cookie-settings-button.tsx   buton reopen (folosit în pagina de politică)
  tag-loaders/{ga,meta-pixel,vercel-analytics}-loader.tsx   trackere hard-gated
```

## Mapare categorii → semnale

| Categorie   | Semnale Consent Mode v2                                   | Tool-uri              |
|-------------|----------------------------------------------------------|-----------------------|
| necessary   | — (mereu ON)                                             | temă, consent_state   |
| analytics   | `analytics_storage`                                      | GA4, Vercel Analytics |
| marketing   | `ad_storage`, `ad_user_data`, `ad_personalization`       | Meta Pixel            |

## Env

```
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
NEXT_PUBLIC_META_PIXEL_ID=1234567890123456
```

Dacă un ID lipsește, loaderul respectiv nu se randează. În producție, setează-le în
Vercel → Project Settings → Environment Variables.

## Testare manuală

Deschide DevTools → Application (Cookies) + Network + Console.

1. **Prima vizită (incognito):** bannerul apare. În `<head>` există scriptul
   `#consent-default` cu `consent default` = toate `denied`.
2. **Respinge toate:** bannerul dispare. Verifică:
   - `document.cookie` conține `consent_state` cu `analytics:false, marketing:false`;
   - NU apar `_ga`, `_gid`, `_fbp`;
   - Network: fără requesturi către `google-analytics.com`, `facebook.net/tr`.
3. **Reload:** bannerul NU reapare; tracking rămâne oprit.
4. **Acceptă toate** (din footer → „Gestionare cookie-uri"): apar requesturile
   GA/Meta; `dataLayer` conține `consent update` cu `granted`.
5. **Retragere marketing** (Preferințe → oprește Marketing → Salvează): `_fbp/_fbc`
   dispar imediat, fără reload; pixelul se demontează.
6. **Navigare SPA:** schimbă pagina → un singur `page_view` nou (doar dacă analytics on).
7. **Expirare / versiune:** modifică `CONSENT_VERSION` în `lib/consent/types.ts` →
   bannerul reapare la următorul load.

## Verificare cu Google Tag Assistant

Default = `denied` pentru toate 4 semnalele înainte de orice tag → după accept,
`update` = `granted`.
