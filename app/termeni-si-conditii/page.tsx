import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/seo"
import { Mail, Phone, MapPin } from "lucide-react"

export const metadata: Metadata = generatePageMetadata({
  title: "Termeni și Condiții | Website Factory",
  description:
    "Termeni și condiții de utilizare pentru website-ul Website Factory. Informații despre proprietatea intelectuală, confidențialitate și utilizarea serviciilor noastre.",
  path: "/termeni-si-conditii",
  keywords: [
    "termeni si conditii",
    "politica de utilizare",
    "website factory termeni",
    "conditii utilizare site",
  ],
})

export default function TermeniSiConditiiPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Acasă", url: "/" },
    { name: "Termeni și Condiții", url: "/termeni-si-conditii" },
  ])

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main>
        {/* Hero Section */}
        <section className="pt-24 sm:pt-28 md:pt-32 pb-12 md:pb-16 relative overflow-hidden">
          {/* Background effects */}
          <div className="absolute inset-0 hero-gradient opacity-50" />
          <div className="absolute inset-0 grid-pattern" />

          <div className="container mx-auto px-4 lg:px-8 relative z-10">
            <div className="max-w-3xl mx-auto text-center">
              <span className="inline-block text-sm font-medium text-brand tracking-widest uppercase mb-4">
                Legal
              </span>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                Termeni și <span className="gradient-text">Condiții</span>
              </h1>
              <p className="text-lg text-muted-foreground">
                Ultima actualizare: {new Date().toLocaleDateString("ro-RO", { year: "numeric", month: "long", day: "numeric" })}
              </p>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="py-16 md:py-24 relative">
          <div className="container mx-auto px-4 lg:px-8">
            <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-brand prose-a:no-underline hover:prose-a:underline">
              {/* Introducere */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">1. Introducere</h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Bun venit pe <strong className="text-foreground">www.websitefactory.ro</strong>, website-ul oficial al Website Factory, persoană juridică{" "}
                  <strong className="text-foreground">SC PIXEL FACTORY SRL</strong> cu sediul social în sat. Ghiroda, com. Ghiroda, Str. Bega, Nr. 47, Jud. Timiș înregistrată la O.R.C. Timiș sub nr. J35/154/2023, având cod unic de înregistrare 47452355, ("Compania", "Noi", "Al nostru"). Prin utilizarea acestui site, sunteți de acord cu acești Termeni și Condiții. Dacă nu sunteți de acord cu acești termeni, vă rugăm să nu folosiți acest website.
                </p>
              </div>

              {/* Proprietatea intelectuală */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">2. Proprietatea intelectuală</h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Tot conținutul acestui website, incluzând, dar fără a se limita la text, grafică, logo-uri, pictograme, imagini, clipuri audio, descărcări digitale și software, este proprietatea Website Factory sau a furnizorilor săi de conținut și este protejat prin legislația privind drepturile de autor din România și alte legi internaționale privind drepturile de autor.
                </p>
              </div>

              {/* Utilizarea website-ului */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">3. Utilizarea website-ului</h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                  Puteți accesa și utiliza acest website în conformitate cu acești Termeni și Condiții. Nu aveți dreptul de a utiliza website-ul nostru în moduri care:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-muted-foreground ml-4">
                  <li>Încălcă legislația națională sau internațională;</li>
                  <li>Sunt frauduloase sau au scopuri ilegale;</li>
                  <li>Au scopul de a hărțui, abuza sau intimida orice persoană.</li>
                </ul>
              </div>

              {/* Confidențialitate și protecția datelor */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">4. Confidențialitate și protecția datelor</h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Protecția confidențialității datelor dvs. este o prioritate pentru noi. Prin utilizarea acestui website, sunteți de acord cu colectarea și utilizarea datelor dvs. personale conform Politicii noastre de Confidențialitate. Vă încurajăm să citiți cu atenție Politica noastră de Confidențialitate pentru a înțelege cum colectăm, utilizăm și protejăm datele dvs. personale.
                </p>
              </div>

              {/* Limitarea răspunderii */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">5. Limitarea răspunderii</h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Website-ul și conținutul său sunt furnizate "așa cum sunt" și "după disponibilitate". Nu garantăm că website-ul va fi fără erori, sigur sau disponibil în mod continuu. Website Factory nu este responsabilă pentru orice pierderi sau daune rezultate din utilizarea acestui website.
                </p>
              </div>

              {/* Modificări ale termenilor */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">6. Modificări ale termenilor</h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Ne rezervăm dreptul de a modifica acești Termeni și Condiții în orice moment. Orice modificări vor fi postate pe această pagină, iar continuarea utilizării website-ului după aceste modificări constituie acceptarea termenilor modificați.
                </p>
              </div>

              {/* Legea aplicabilă */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">7. Legea aplicabilă</h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Acești Termeni și Condiții sunt guvernați și interpretați în conformitate cu legile din România. Orice dispută va fi soluționată exclusiv de instanțele competente din România.
                </p>
              </div>

              {/* Contact */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">8. Contact</h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                  Pentru orice întrebări sau solicitări legate de acești Termeni și Condiții, vă rugăm să ne contactați la:
                </p>
                <div className="bg-muted/50 rounded-lg p-6 space-y-4 border border-border/50">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <MapPin className="w-5 h-5 text-brand" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">SC PIXEL FACTORY SRL</p>
                      <p className="text-sm text-muted-foreground">
                        Sat. Ghiroda, com. Ghiroda, Str. Bega, Nr. 47, Jud. Timiș
                      </p>
                      <p className="text-sm text-muted-foreground mt-1">
                        O.R.C. Timiș sub nr. J35/154/2023
                      </p>
                      <p className="text-sm text-muted-foreground">
                        CUI: 47452355
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-5 h-5 text-brand" />
                    </div>
                    <a
                      href="mailto:office@websitefactory.ro"
                      className="text-base text-foreground hover:text-brand transition-colors"
                    >
                      office@websitefactory.ro
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-5 h-5 text-brand" />
                    </div>
                    <a
                      href="tel:+40728567830"
                      className="text-base text-foreground hover:text-brand transition-colors"
                    >
                      +40 728 567 830
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
