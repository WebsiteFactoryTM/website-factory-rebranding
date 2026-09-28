import { NextResponse } from "next/server"
import { resend, ADMIN_EMAIL, FROM_EMAIL } from "@/lib/resend"
import { ContactFormAdminEmail, ContactFormClientEmail } from "@/lib/email-templates"
import { CONTACT_API_COPY, resolveContactLocale } from "@/lib/contact-api-copy"
import type { Locale } from "@/i18n/routing"

export async function POST(request: Request) {
  let locale: Locale = "ro"
  try {
    const body = await request.json()
    const { name, email, phone, company, message, gRecaptchaToken, locale: rawLocale } = body
    locale = resolveContactLocale(rawLocale)
    const t = CONTACT_API_COPY[locale]

    // Validate reCAPTCHA
    if (!gRecaptchaToken) {
      return NextResponse.json({ error: t.recaptchaMissing }, { status: 400 })
    }

    const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY || "6Le14kcsAAAAAGkruan7Y-XLwuw0UwrVBdvLik5a"
    const recaptchaRes = await fetch("https://www.google.com/recaptcha/api/siteverify", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `secret=${recaptchaSecret}&response=${gRecaptchaToken}`,
    })
    const recaptchaData = await recaptchaRes.json()

    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      console.error("reCAPTCHA failed:", recaptchaData)
      return NextResponse.json({ error: t.recaptchaFailed }, { status: 400 })
    }

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: t.requiredFields },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: t.invalidEmail }, { status: 400 })
    }

    // Send email to admin
    const adminEmailResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: t.adminSubject(name),
      react: ContactFormAdminEmail({
        name,
        email,
        phone,
        company,
        message,
      }),
    })

    if (adminEmailResult.error) {
      console.error("Error sending admin email:", adminEmailResult.error)
      throw new Error("Failed to send admin notification")
    }

    // Send confirmation email to client
    const clientEmailResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: email,
      subject: t.clientSubject,
      react: ContactFormClientEmail({ name, locale }),
    })

    if (clientEmailResult.error) {
      console.error("Error sending client email:", clientEmailResult.error)
      // Don't fail the request if client email fails
      // The admin notification is more important
    }

    return NextResponse.json(
      {
        success: true,
        message: t.success,
        adminEmailId: adminEmailResult.data?.id,
        clientEmailId: clientEmailResult.data?.id,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      {
        error: CONTACT_API_COPY[locale].serverError,
      },
      { status: 500 }
    )
  }
}
