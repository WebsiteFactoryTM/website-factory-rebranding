import { Resend } from "resend"

if (!process.env.RESEND_API_KEY) {
  throw new Error("RESEND_API_KEY is not defined in environment variables")
}

export const resend = new Resend(process.env.RESEND_API_KEY)

export const ADMIN_EMAIL = "office@websitefactory.ro"
export const FROM_EMAIL = "Website Factory <noreply@websitefactory.ro>"
