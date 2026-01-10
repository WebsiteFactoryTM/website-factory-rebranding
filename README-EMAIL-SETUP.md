# Email Setup Instructions

## Configurare SMTP prin Resend

### 1. Adaugă API Key

Creează fișierul `.env.local` în directorul rădăcină și adaugă:

\`\`\`env
RESEND_API_KEY=re_CfudKxEW_DbEWpJ4vPHkMPvAzRwP93vut
\`\`\`

### 2. Restart Development Server

După adăugarea API key-ului, restart server-ul de development:

\`\`\`bash
npm run dev
\`\`\`

### 3. Funcționalități Implementate

#### Formular Contact (`/contact`)
- Trimite email către admin (`office@websitefactory.ro`) cu toate detaliile din formular
- Trimite email de confirmare către client cu mesaj de mulțumire
- Promisiune de răspuns în maxim 24h

#### Estimator Prețuri (`/pret-website`)
- Trimite email către admin cu toate detaliile proiectului și estimarea automată
- Trimite email de confirmare către client cu estimarea prețului
- Include sumar complet al proiectului selectat

### 4. Template-uri Email

Toate template-urile sunt definite în `lib/email-templates.tsx`:

- `ContactFormAdminEmail` - Notificare admin pentru formular contact
- `ContactFormClientEmail` - Confirmare către client pentru formular contact
- `PriceEstimatorAdminEmail` - Notificare admin pentru estimare preț
- `PriceEstimatorClientEmail` - Confirmare către client cu estimare preț

### 5. API Routes

- `POST /api/contact` - Procesează formularul de contact
- `POST /api/price-estimate` - Procesează estimarea de preț

### 6. Validări

Ambele API routes validează:
- Câmpuri obligatorii (nume, email, message/projectType)
- Format valid de email
- Erori sunt afișate în UI cu mesaje clare

### 7. Configurare Domain Resend

Pentru a folosi un email custom (ex: `noreply@websitefactory.ro`), trebuie să:

1. Accesează [Resend Dashboard](https://resend.com/domains)
2. Adaugă domeniul `websitefactory.ro`
3. Configurează DNS records (SPF, DKIM, DMARC)
4. Verifică domeniul

Până la verificarea domeniului, emailurile vor fi trimise de la domeniul default Resend.

### 8. Testing

Pentru testare locală:

1. Completează formularul de contact sau estimatorul de prețuri
2. Verifică consola browser pentru erori
3. Verifică inbox-ul pentru email-urile trimise
4. Verifică [Resend Dashboard](https://resend.com/emails) pentru log-uri

### 9. Production

În producție, adaugă variabila de mediu în Vercel/platform-ul tău:

\`\`\`
RESEND_API_KEY=re_CfudKxEW_DbEWpJ4vPHkMPvAzRwP93vut
\`\`\`

### 10. Rate Limits

Resend Free Tier:
- 100 emails/day
- 3,000 emails/month

Pentru volum mai mare, upgrade la plan paid.
