import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/seo"
import { Mail, MapPin, Info } from "lucide-react"

export const metadata: Metadata = generatePageMetadata({
  title: "Politică cookie | Website Factory",
  description:
    "Politica de utilizare a cookie-urilor pentru Website Factory. Informații despre tipurile de cookie-uri utilizate, scopul acestora și modalitățile de gestionare conform GDPR.",
  path: "/politica-cookie",
  keywords: [
    "politica cookie",
    "cookie-uri website",
    "GDPR cookie",
    "gestionare cookie-uri",
    "cookie consent",
  ],
})

export default function PoliticaCookiePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Acasă", url: "/" },
    { name: "Politică cookie", url: "/politica-cookie" },
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
                Politică <span className="gradient-text">cookie</span>
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
            <div className="max-w-4xl mx-auto prose prose-lg dark:prose-invert prose-headings:font-heading prose-headings:text-foreground prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-brand prose-a:no-underline hover:prose-a:underline prose-ul:text-muted-foreground">
              {/* 1. Ce sunt cookie-urile */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                  1. Ce sunt cookie-urile?
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                  Cookie-urile sunt fișiere text mici care sunt stocate pe dispozitivul dumneavoastră (computer, tabletă sau telefon mobil) când accesați un site web. Cookie-urile permit site-ului să-și amintească acțiunile și preferințele dumneavoastră (cum ar fi preferința de temă, limba selectată etc.) pentru o perioadă de timp, astfel încât să nu fie nevoie să le reintroduceți de fiecare dată când reveniți pe site sau navigați de la o pagină la alta.
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Cookie-urile conțin informații care sunt transferate pe dispozitivul dumneavoastră. Cookie-urile nu pot dăuna dispozitivului dumneavoastră și nu conțin virusi. Majoritatea cookie-urilor sunt complet "pasive" și nu conțin software, viruși sau spyware și nu pot accesa informațiile de pe hard disk-ul dumneavoastră.
                </p>
              </div>

              {/* 2. Tipuri de cookie-uri utilizate */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                  2. Tipuri de cookie-uri utilizate pe site-ul nostru
                </h2>
                
                {/* Strictly Necessary Cookies */}
                <div className="mb-8">
                  <h3 className="text-xl md:text-2xl font-heading font-semibold text-foreground mb-3">
                    2.1. Cookie-uri strict necesare
                  </h3>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
                    Aceste cookie-uri sunt esențiale pentru funcționarea site-ului și nu pot fi dezactivate în sistemele noastre. Ele sunt de obicei setate doar ca răspuns la acțiuni pe care le-ați efectuat și care echivalează cu o solicitare de servicii, cum ar fi setarea preferințelor de confidențialitate, conectarea sau completarea formularelor.
                  </p>
                  <div className="bg-muted/30 rounded-lg p-4 border border-border/50 mb-3">
                    <p className="text-sm md:text-base text-muted-foreground mb-2">
                      <strong className="text-foreground">Exemplu:</strong> Preferințe de temă (mod întunecat/clar)
                    </p>
                    <p className="text-sm md:text-base text-muted-foreground">
                      <strong className="text-foreground">Durată:</strong> Persistent (până la ștergere manuală)
                    </p>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="mb-8">
                  <h3 className="text-xl md:text-2xl font-heading font-semibold text-foreground mb-3">
                    2.2. Cookie-uri de analiză și performanță
                  </h3>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
                    Aceste cookie-uri ne permit să numărăm vizitele și sursele de trafic, astfel încât să putem măsura și îmbunătăți performanța site-ului nostru. Ele ne ajută să știm ce pagini sunt cele mai populare și mai puțin populare și să vedem cum vizitatorii navighează pe site.
                  </p>
                  
                  <div className="space-y-4">
                    <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                      <p className="text-sm md:text-base font-semibold text-foreground mb-2">
                        Google Analytics 4
                      </p>
                      <p className="text-sm md:text-base text-muted-foreground mb-2">
                        <strong className="text-foreground">Furnizor:</strong> Google LLC
                      </p>
                      <p className="text-sm md:text-base text-muted-foreground mb-2">
                        <strong className="text-foreground">Scop:</strong> Analiză comportament utilizatori, statistici trafic, îmbunătățirea experienței utilizatorului
                      </p>
                      <p className="text-sm md:text-base text-muted-foreground mb-2">
                        <strong className="text-foreground">Cookie-uri utilizate:</strong>
                      </p>
                      <ul className="list-disc list-inside text-sm md:text-base text-muted-foreground ml-4 space-y-1">
                        <li><code className="bg-muted px-1.5 py-0.5 rounded text-xs">_ga</code> - Identifică utilizatorii (durată: 2 ani)</li>
                        <li><code className="bg-muted px-1.5 py-0.5 rounded text-xs">_ga_*</code> - Stochează starea sesiunii (durată: 2 ani)</li>
                        <li><code className="bg-muted px-1.5 py-0.5 rounded text-xs">_gid</code> - Identifică utilizatorii (durată: 24 ore)</li>
                        <li><code className="bg-muted px-1.5 py-0.5 rounded text-xs">_gat</code> - Limitează rata de solicitare (durată: 1 minut)</li>
                      </ul>
                      <p className="text-sm md:text-base text-muted-foreground mt-2">
                        <strong className="text-foreground">Politica de confidențialitate Google:</strong>{" "}
                        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
                          https://policies.google.com/privacy
                        </a>
                      </p>
                    </div>

                    <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                      <p className="text-sm md:text-base font-semibold text-foreground mb-2">
                        Vercel Analytics
                      </p>
                      <p className="text-sm md:text-base text-muted-foreground mb-2">
                        <strong className="text-foreground">Furnizor:</strong> Vercel Inc.
                      </p>
                      <p className="text-sm md:text-base text-muted-foreground mb-2">
                        <strong className="text-foreground">Scop:</strong> Analiză performanță site, metrici tehnice, optimizare
                      </p>
                      <p className="text-sm md:text-base text-muted-foreground">
                        <strong className="text-foreground">Politica de confidențialitate Vercel:</strong>{" "}
                        <a href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
                          https://vercel.com/legal/privacy-policy
                        </a>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="mb-8">
                  <h3 className="text-xl md:text-2xl font-heading font-semibold text-foreground mb-3">
                    2.3. Cookie-uri de marketing și publicitate
                  </h3>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
                    Aceste cookie-uri pot fi setate prin site-ul nostru de către partenerii noștri de publicitate pentru a vă construi un profil al intereselor dumneavoastră și pentru a vă afișa reclame relevante pe alte site-uri. Ele nu stochează direct informații personale, ci se bazează pe identificarea unică a browser-ului și a dispozitivului dumneavoastră.
                  </p>
                  
                  <div className="bg-muted/30 rounded-lg p-4 border border-border/50">
                    <p className="text-sm md:text-base font-semibold text-foreground mb-2">
                      Meta Pixel (Facebook Pixel)
                    </p>
                    <p className="text-sm md:text-base text-muted-foreground mb-2">
                      <strong className="text-foreground">Furnizor:</strong> Meta Platforms Ireland Limited
                    </p>
                    <p className="text-sm md:text-base text-muted-foreground mb-2">
                      <strong className="text-foreground">Scop:</strong> Măsurare eficiență campanii publicitare, retargeting, analiză conversii
                    </p>
                    <p className="text-sm md:text-base text-muted-foreground mb-2">
                      <strong className="text-foreground">Cookie-uri utilizate:</strong>
                    </p>
                    <ul className="list-disc list-inside text-sm md:text-base text-muted-foreground ml-4 space-y-1">
                      <li><code className="bg-muted px-1.5 py-0.5 rounded text-xs">_fbp</code> - Identifică browser-ul pentru servicii de publicitate (durată: 3 luni)</li>
                      <li><code className="bg-muted px-1.5 py-0.5 rounded text-xs">fr</code> - Cookie de autentificare și securitate (durată: 3 luni)</li>
                      <li><code className="bg-muted px-1.5 py-0.5 rounded text-xs">sb</code> - Cookie de securitate (durată: 2 ani)</li>
                    </ul>
                    <p className="text-sm md:text-base text-muted-foreground mt-2">
                      <strong className="text-foreground">Politica de confidențialitate Meta:</strong>{" "}
                      <a href="https://www.facebook.com/privacy/explanation" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
                        https://www.facebook.com/privacy/explanation
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              {/* 3. Gestionarea cookie-urilor */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                  3. Gestionarea și ștergerea cookie-urilor
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                  Majoritatea browserelor web acceptă automat cookie-urile, dar puteți modifica setările browser-ului pentru a refuza cookie-urile dacă preferați. Vă rugăm să rețineți că, dacă alegeți să blocați sau ștergeți cookie-urile, este posibil ca unele funcționalități ale site-ului să nu funcționeze corect.
                </p>
                
                <div className="bg-blue-50 dark:bg-blue-950/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800 mb-4">
                  <div className="flex items-start gap-3">
                    <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm md:text-base font-semibold text-blue-900 dark:text-blue-100 mb-2">
                        Instrucțiuni pentru gestionarea cookie-urilor în browser-ul dumneavoastră:
                      </p>
                      <ul className="list-disc list-inside text-sm md:text-base text-blue-800 dark:text-blue-200 ml-4 space-y-1">
                        <li>
                          <strong>Google Chrome:</strong> Setări → Confidențialitate și securitate → Cookie-uri și alte date ale site-urilor
                        </li>
                        <li>
                          <strong>Mozilla Firefox:</strong> Opțiuni → Confidențialitate și securitate → Cookie-uri și date ale site-urilor
                        </li>
                        <li>
                          <strong>Safari:</strong> Preferințe → Confidențialitate → Cookie-uri și date ale site-urilor web
                        </li>
                        <li>
                          <strong>Microsoft Edge:</strong> Setări → Cookie-uri și permisiuni site → Cookie-uri și date ale site-urilor
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-xl md:text-2xl font-heading font-semibold text-foreground mb-3">
                    3.1. Dezactivarea cookie-urilor de analiză
                  </h3>
                  <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-3">
                    Puteți dezactiva cookie-urile de analiză prin următoarele metode:
                  </p>
                  <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-muted-foreground ml-4">
                    <li>
                      <strong className="text-foreground">Google Analytics:</strong> Instalați{" "}
                      <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
                        Google Analytics Opt-out Browser Add-on
                      </a>
                    </li>
                    <li>
                      <strong className="text-foreground">Meta Pixel:</strong> Vizitați{" "}
                      <a href="https://www.facebook.com/settings?tab=ads" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
                        Setările de publicitate Facebook
                      </a>{" "}
                      pentru a gestiona preferințele dvs.
                    </li>
                  </ul>
                </div>
              </div>

              {/* 4. Consimțământ */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                  4. Consimțământul dumneavoastră
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                  Prin continuarea navigării pe site-ul nostru după ce ați văzut banner-ul de informare despre cookie-uri sau prin utilizarea site-ului nostru, sunteți de acord cu utilizarea cookie-urilor în conformitate cu această politică.
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Dacă nu sunteți de acord cu utilizarea cookie-urilor, vă rugăm să setați browser-ul dumneavoastră pentru a refuza cookie-urile sau să încetați utilizarea site-ului nostru. Rețineți că, dacă alegeți să refuzați cookie-urile, este posibil ca unele funcționalități ale site-ului să nu fie disponibile.
                </p>
              </div>

              {/* 5. Modificări */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                  5. Modificări ale politicii de cookie-uri
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Ne rezervăm dreptul de a modifica această Politică de cookie-uri în orice moment. Orice modificări vor fi publicate pe această pagină cu o dată de actualizare revizuită. Vă recomandăm să verificați periodic această pagină pentru a fi la curent cu orice modificări.
                </p>
              </div>

              {/* 6. Contact */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">6. Contact</h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                  Pentru orice întrebări sau solicitări legate de utilizarea cookie-urilor pe site-ul nostru, vă rugăm să ne contactați:
                </p>
                <div className="bg-muted/50 rounded-lg p-6 space-y-4 border border-border/50">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand/10 flex items-center justify-center flex-shrink-0 mt-1">
                      <MapPin className="w-5 h-5 text-brand" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground mb-1">SC PIXEL FACTORY SRL</p>
                      <p className="text-sm text-muted-foreground">
                        Str. Bega, nr. 47, Ghiroda, Timiș, România
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
                </div>
              </div>

              {/* Additional Resources */}
              <div className="bg-muted/30 rounded-lg p-6 border border-border/50">
                <h3 className="text-lg md:text-xl font-heading font-semibold text-foreground mb-3">
                  Resurse suplimentare
                </h3>
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed mb-3">
                  Pentru mai multe informații despre cookie-uri și gestionarea acestora, vă recomandăm următoarele resurse:
                </p>
                <ul className="list-disc list-inside space-y-1 text-sm md:text-base text-muted-foreground ml-4">
                  <li>
                    <a href="https://www.allaboutcookies.org" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
                      All About Cookies
                    </a>{" "}
                    - Ghid complet despre cookie-uri
                  </li>
                  <li>
                    <a href="https://www.youronlinechoices.com/ro/" target="_blank" rel="noopener noreferrer" className="text-brand hover:underline">
                      Your Online Choices
                    </a>{" "}
                    - Platformă pentru gestionarea preferințelor de publicitate online
                  </li>
                  <li>
                    <a href="/politici-de-confidentialitate" className="text-brand hover:underline">
                      Politica noastră de confidențialitate
                    </a>{" "}
                    - Informații despre prelucrarea datelor personale
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}

