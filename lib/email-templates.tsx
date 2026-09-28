import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components"
import type { Locale } from "@/i18n/routing"

const CLIENT_EMAIL_COPY_RO = {
  preview: "Am primit mesajul tău - Website Factory",
  heading: "✅ Mesaj primit cu succes!",
  greeting: (name: string) => `Bună, ${name}! 👋`,
  intro:
    "Mulțumim că ne-ai contactat! Am primit mesajul tău și suntem entuziasmați să discutăm despre proiectul tău.",
  responseTimeLabel: "⏰ Timp de răspuns:",
  responseTimeRest: "Îți vom răspunde în maxim",
  responseTimeHours: "24 de ore",
  responseTimeSuffix: "în zilele lucrătoare.",
  urgentQuestion: "În cazul în care ai întrebări urgente sau vrei să discutăm direct, ne poți suna la:",
  tagline: "Web Design Profesional în Timișoara",
}

const CLIENT_EMAIL_COPY = { ro: CLIENT_EMAIL_COPY_RO, en: CLIENT_EMAIL_COPY_RO } satisfies Record<
  Locale,
  typeof CLIENT_EMAIL_COPY_RO
>

// Contact Form - Email to Admin
export const ContactFormAdminEmail = ({
  name,
  email,
  phone,
  company,
  message,
}: {
  name: string
  email: string
  phone?: string
  company?: string
  message: string
}) => {
  const timestamp = new Date().toLocaleString("ro-RO", { timeZone: "Europe/Bucharest" })

  return (
    <Html>
      <Head />
      <Preview>Cerere nouă de contact de la {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={headerTitle}>📬 Cerere Nouă de Contact</Heading>
            <Text style={headerSubtitle}>Formular completat pe websitefactory.ro</Text>
          </Section>

          <Section style={content}>
            <div style={field}>
              <Text style={label}>👤 Nume:</Text>
              <Text style={value}>{name}</Text>
            </div>

            <div style={field}>
              <Text style={label}>📧 Email:</Text>
              <Link href={`mailto:${email}`} style={linkStyle}>
                {email}
              </Link>
            </div>

            {phone && (
              <div style={field}>
                <Text style={label}>📱 Telefon:</Text>
                <Link href={`tel:${phone}`} style={linkStyle}>
                  {phone}
                </Link>
              </div>
            )}

            {company && (
              <div style={field}>
                <Text style={label}>🏢 Companie:</Text>
                <Text style={value}>{company}</Text>
              </div>
            )}

            <div style={field}>
              <Text style={label}>💬 Mesaj:</Text>
              <Text style={valueMessage}>{message}</Text>
            </div>

            <Hr style={hr} />

            <Text style={footer}>
              <strong>⚡ Răspunde cât mai repede!</strong> Clientul așteaptă un răspuns în maxim 24h.
            </Text>
            <Text style={footerSmall}>Data primirii: {timestamp}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Contact Form - Confirmation Email to Client
export const ContactFormClientEmail = ({ name, locale = "ro" }: { name: string; locale?: Locale }) => {
  const t = CLIENT_EMAIL_COPY[locale]

  return (
    <Html>
      <Head />
      <Preview>{t.preview}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={header}>
            <Heading style={headerTitle}>{t.heading}</Heading>
          </Section>

          <Section style={content}>
            <Text style={greeting}>{t.greeting(name)}</Text>

            <Text style={paragraph}>{t.intro}</Text>

            <Section style={highlight}>
              <Text style={highlightText}>
                <strong>{t.responseTimeLabel}</strong> {t.responseTimeRest} <strong>{t.responseTimeHours}</strong>{" "}
                {t.responseTimeSuffix}
              </Text>
            </Section>

            <Text style={paragraph}>{t.urgentQuestion}</Text>

            <Text style={phoneNumber}>
              📞 <Link href="tel:+40728567830" style={linkStyle}>+40 728 567 830</Link>
            </Text>

            <Hr style={hr} />

            <Text style={footerText}>
              <strong>Website Factory</strong>
            </Text>
            <Text style={footerText}>{t.tagline}</Text>
            <Text style={footerSmall}>
              📧 <Link href="mailto:office@websitefactory.ro" style={linkStyle}>office@websitefactory.ro</Link>
              <br />
              🌐 <Link href="https://websitefactory.ro" style={linkStyle}>websitefactory.ro</Link>
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Price Estimator - Email to Admin
export const PriceEstimatorAdminEmail = ({
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
}: {
  name: string
  email: string
  phone?: string
  company?: string
  projectType: string
  budget?: string
  timeline?: string
  features?: string[]
  details?: string
  estimatedPrice?: string
}) => {
  const timestamp = new Date().toLocaleString("ro-RO", { timeZone: "Europe/Bucharest" })

  return (
    <Html>
      <Head />
      <Preview>Cerere estimare preț de la {name}</Preview>
      <Body style={main}>
        <Container style={container}>
          <Section style={headerGreen}>
            <Heading style={headerTitle}>💰 Cerere Estimare Preț</Heading>
            <Text style={headerSubtitle}>Formular completat pe websitefactory.ro/pret-website</Text>
          </Section>

          <Section style={content}>
            {estimatedPrice && (
              <Section style={priceHighlight}>
                <Text style={priceLabel}>PREȚ ESTIMAT AUTOMAT</Text>
                <Text style={priceValue}>{estimatedPrice}</Text>
              </Section>
            )}

            <Heading as="h2" style={sectionHeading}>
              📋 Detalii Client
            </Heading>

            <div style={field}>
              <Text style={label}>👤 Nume:</Text>
              <Text style={value}>{name}</Text>
            </div>

            <div style={field}>
              <Text style={label}>📧 Email:</Text>
              <Link href={`mailto:${email}`} style={linkStyle}>
                {email}
              </Link>
            </div>

            {phone && (
              <div style={field}>
                <Text style={label}>📱 Telefon:</Text>
                <Link href={`tel:${phone}`} style={linkStyle}>
                  {phone}
                </Link>
              </div>
            )}

            {company && (
              <div style={field}>
                <Text style={label}>🏢 Companie:</Text>
                <Text style={value}>{company}</Text>
              </div>
            )}

            <Heading as="h2" style={sectionHeading}>
              🎯 Detalii Proiect
            </Heading>

            <div style={field}>
              <Text style={label}>📦 Tip Proiect:</Text>
              <Text style={value}>{projectType}</Text>
            </div>

            {budget && (
              <div style={field}>
                <Text style={label}>💵 Buget:</Text>
                <Text style={value}>{budget}</Text>
              </div>
            )}

            {timeline && (
              <div style={field}>
                <Text style={label}>⏱️ Timeline:</Text>
                <Text style={value}>{timeline}</Text>
              </div>
            )}

            {features && features.length > 0 && (
              <div style={field}>
                <Text style={label}>✨ Funcționalități solicitate:</Text>
                {features.map((feature, index) => (
                  <Text key={index} style={featureItem}>
                    ✓ {feature}
                  </Text>
                ))}
              </div>
            )}

            {details && (
              <div style={field}>
                <Text style={label}>📝 Detalii suplimentare:</Text>
                <Text style={valueMessage}>{details}</Text>
              </div>
            )}

            <Hr style={hr} />

            <Text style={footer}>
              <strong>⚡ Pregătește oferta!</strong> Clientul așteaptă un răspuns în maxim 24h.
            </Text>
            <Text style={footerSmall}>Data primirii: {timestamp}</Text>
          </Section>
        </Container>
      </Body>
    </Html>
  )
}

// Price Estimator - Confirmation Email to Client
export const PriceEstimatorClientEmail = ({
  name,
  estimatedPrice,
}: {
  name: string
  estimatedPrice?: string
}) => (
  <Html>
    <Head />
    <Preview>Cererea ta de estimare preț a fost primită - Website Factory</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={headerGreen}>
          <Heading style={headerTitle}>✅ Cererea ta a fost primită!</Heading>
        </Section>

        <Section style={content}>
          <Text style={greeting}>Bună, {name}! 👋</Text>

          <Text style={paragraph}>
            Mulțumim pentru interesul acordat! Am primit cererea ta de estimare de preț și echipa noastră o
            analizează în acest moment.
          </Text>

          {estimatedPrice && (
            <Section style={priceBox}>
              <Text style={priceBoxLabel}>Estimare Orientativă</Text>
              <Text style={priceBoxValue}>{estimatedPrice}</Text>
              <Text style={priceBoxNote}>
                *Prețul final va fi ajustat în funcție de cerințele specifice ale proiectului
              </Text>
            </Section>
          )}

          <Section style={highlight}>
            <Text style={highlightText}>
              <strong>📞 Următorul pas:</strong> Un consultant din echipa noastră te va contacta în maxim{" "}
              <strong>24 de ore</strong> pentru a discuta detaliile proiectului și pentru a-ți oferi o
              ofertă personalizată.
            </Text>
          </Section>

          <Text style={paragraph}>
            Între timp, poți explora proiectele noastre anterioare sau ne poți suna direct pentru întrebări
            urgente:
          </Text>

          <Text style={phoneNumber}>
            📞 <Link href="tel:+40728567830" style={linkStyle}>+40 728 567 830</Link>
          </Text>

          <Hr style={hr} />

          <Text style={footerText}>
            <strong>Website Factory</strong>
          </Text>
          <Text style={footerText}>Web Design Profesional în Timișoara</Text>
          <Text style={footerSmall}>
            📧 <Link href="mailto:office@websitefactory.ro" style={linkStyle}>office@websitefactory.ro</Link>
            <br />
            🌐 <Link href="https://websitefactory.ro" style={linkStyle}>websitefactory.ro</Link>
          </Text>
        </Section>
      </Container>
    </Body>
  </Html>
)

// Styles
const main = {
  backgroundColor: "#f6f9fc",
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif',
}

const container = {
  backgroundColor: "#ffffff",
  margin: "0 auto",
  padding: "20px 0",
  marginBottom: "64px",
  maxWidth: "600px",
}

const header = {
  background: "linear-gradient(135deg, #3028b2 0%, #5a4fcf 100%)",
  color: "#ffffff",
  padding: "30px",
  borderRadius: "8px 8px 0 0",
}

const headerGreen = {
  background: "linear-gradient(135deg, #059669 0%, #10b981 100%)",
  color: "#ffffff",
  padding: "30px",
  borderRadius: "8px 8px 0 0",
}

const headerTitle = {
  margin: "0",
  fontSize: "24px",
  color: "#ffffff",
}

const headerSubtitle = {
  margin: "10px 0 0",
  opacity: "0.9",
  color: "#ffffff",
  fontSize: "14px",
}

const content = {
  padding: "30px",
  border: "1px solid #e5e7eb",
  borderTop: "none",
  borderRadius: "0 0 8px 8px",
}

const field = {
  marginBottom: "20px",
}

const label = {
  fontWeight: "600",
  color: "#374151",
  marginBottom: "5px",
  fontSize: "14px",
}

const value = {
  color: "#1f2937",
  backgroundColor: "#f9fafb",
  padding: "10px",
  borderRadius: "4px",
  fontSize: "14px",
}

const valueMessage = {
  color: "#1f2937",
  backgroundColor: "#f9fafb",
  padding: "10px",
  borderRadius: "4px",
  whiteSpace: "pre-wrap" as const,
  fontSize: "14px",
}

const linkStyle = {
  color: "#3028b2",
  textDecoration: "none",
}

const greeting = {
  fontSize: "18px",
  color: "#1f2937",
  marginBottom: "20px",
}

const paragraph = {
  color: "#4b5563",
  lineHeight: "1.6",
  fontSize: "14px",
}

const highlight = {
  backgroundColor: "#f0f7ff",
  borderLeft: "4px solid #3028b2",
  padding: "20px",
  margin: "20px 0",
  borderRadius: "4px",
}

const highlightText = {
  margin: "0",
  fontSize: "14px",
  color: "#1f2937",
}

const phoneNumber = {
  fontSize: "18px",
  color: "#3028b2",
  fontWeight: "600",
  margin: "15px 0",
  textAlign: "center" as const,
}

const hr = {
  borderColor: "#e5e7eb",
  margin: "20px 0",
}

const footer = {
  color: "#6b7280",
  fontSize: "14px",
  marginTop: "20px",
}

const footerSmall = {
  color: "#6b7280",
  fontSize: "12px",
  marginTop: "10px",
}

const footerText = {
  textAlign: "center" as const,
  color: "#6b7280",
  fontSize: "14px",
  margin: "5px 0",
}

const priceHighlight = {
  backgroundColor: "#dcfce7",
  border: "2px solid #10b981",
  padding: "20px",
  borderRadius: "8px",
  textAlign: "center" as const,
  margin: "20px 0",
}

const priceLabel = {
  margin: "0",
  fontSize: "12px",
  color: "#065f46",
  fontWeight: "600",
}

const priceValue = {
  margin: "10px 0 0",
  fontSize: "32px",
  color: "#059669",
  fontWeight: "bold",
}

const priceBox = {
  background: "linear-gradient(135deg, #dcfce7 0%, #d1fae5 100%)",
  border: "2px solid #10b981",
  padding: "30px",
  borderRadius: "8px",
  textAlign: "center" as const,
  margin: "30px 0",
}

const priceBoxLabel = {
  margin: "0",
  fontSize: "14px",
  color: "#065f46",
  fontWeight: "600",
  textTransform: "uppercase" as const,
}

const priceBoxValue = {
  margin: "15px 0",
  fontSize: "36px",
  color: "#059669",
  fontWeight: "bold",
}

const priceBoxNote = {
  margin: "0",
  fontSize: "13px",
  color: "#047857",
}

const sectionHeading = {
  color: "#374151",
  fontSize: "18px",
  marginBottom: "15px",
  marginTop: "30px",
}

const featureItem = {
  padding: "8px 0",
  borderBottom: "1px solid #e5e7eb",
  fontSize: "14px",
  color: "#1f2937",
}
