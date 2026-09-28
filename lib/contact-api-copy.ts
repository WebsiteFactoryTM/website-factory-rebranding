import type { Locale } from "@/i18n/routing"

const ro = {
  recaptchaMissing: "Verificare reCAPTCHA lipsă.",
  recaptchaFailed: "Verificare anti-spam eșuată.",
  requiredFields: "Câmpurile nume, email și mesaj sunt obligatorii.",
  invalidEmail: "Format email invalid.",
  adminSubject: (name: string) => `📬 Cerere Nouă de Contact - ${name}`,
  clientSubject: "✅ Am primit mesajul tău - Website Factory",
  success: "Mesajul a fost trimis cu succes!",
  serverError: "A apărut o eroare la trimiterea mesajului. Te rugăm să încerci din nou sau să ne suni direct.",
}

export const CONTACT_API_COPY = { ro, en: ro } satisfies Record<Locale, typeof ro>

export function resolveContactLocale(value: unknown): Locale {
  return value === "en" ? "en" : "ro"
}
