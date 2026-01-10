import { NextResponse } from "next/server"
import { resend, ADMIN_EMAIL, FROM_EMAIL } from "@/lib/resend"
import { PriceEstimatorAdminEmail, PriceEstimatorClientEmail } from "@/lib/email-templates"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      name,
      email,
      phone,
      company,
      projectType,
      budget,
      timeline,
      features,
      details,
      estimatedPrice,
    } = body

    // Validate required fields
    if (!name || !email || !projectType) {
      return NextResponse.json(
        { error: "Câmpurile nume, email și tip proiect sunt obligatorii." },
        { status: 400 }
      )
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Format email invalid." }, { status: 400 })
    }

    // Send email to admin with all project details
    const adminEmailResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: ADMIN_EMAIL,
      subject: `💰 Cerere Estimare Preț - ${name} (${projectType})`,
      react: PriceEstimatorAdminEmail({
        name,
        email,
        phone,
        company,
        projectType,
        budget,
        timeline,
        features,
        details,
        estimatedPrice,
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
      subject: "✅ Cererea ta de estimare preț a fost primită - Website Factory",
      react: PriceEstimatorClientEmail({
        name,
        estimatedPrice,
      }),
    })

    if (clientEmailResult.error) {
      console.error("Error sending client email:", clientEmailResult.error)
      // Don't fail the request if client email fails
    }

    return NextResponse.json(
      {
        success: true,
        message: "Cererea de estimare a fost trimisă cu succes!",
        adminEmailId: adminEmailResult.data?.id,
        clientEmailId: clientEmailResult.data?.id,
      },
      { status: 200 }
    )
  } catch (error) {
    console.error("Price estimate error:", error)
    return NextResponse.json(
      {
        error: "A apărut o eroare la trimiterea cererii. Te rugăm să încerci din nou sau să ne suni direct.",
      },
      { status: 500 }
    )
  }
}
