import { NextResponse } from "next/server"
import { resend, ADMIN_EMAIL, FROM_EMAIL } from "@/lib/resend"
import { ContactFormAdminEmail, ContactFormClientEmail } from "@/lib/email-templates"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, phone, company, message } = body

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Câmpurile nume, email și mesaj sunt obligatorii." },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Format email invalid." }, { status: 400 })
    }

    // Send email to admin
    const adminEmailResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `📬 Cerere Nouă de Contact - ${name}`,
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
      subject: "✅ Am primit mesajul tău - Website Factory",
      react: ContactFormClientEmail({ name }),
    })

    if (clientEmailResult.error) {
      console.error("Error sending client email:", clientEmailResult.error)
      // Don't fail the request if client email fails
      // The admin notification is more important
    }

    return NextResponse.json(
      {
        success: true,
        message: "Mesajul a fost trimis cu succes!",
        adminEmailId: adminEmailResult.data?.id,
        clientEmailId: clientEmailResult.data?.id,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json(
      {
        error: "A apărut o eroare la trimiterea mesajului. Te rugăm să încerci din nou sau să ne suni direct.",
      },
      { status: 500 }
    )
  }
}
