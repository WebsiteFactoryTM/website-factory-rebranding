import type { Metadata } from "next"
import { generatePageMetadata, generateBreadcrumbSchema } from "@/lib/seo"
import { Mail, MapPin } from "lucide-react"

export const metadata: Metadata = generatePageMetadata({
  title: "Politică de confidențialitate",
  description:
    "Politica de confidențialitate și prelucrare a datelor cu caracter personal pentru Website Factory. Informații despre colectarea, utilizarea și protecția datelor personale conform GDPR.",
  path: "/politici-de-confidentialitate",
  keywords: [
    "politica de confidentialitate",
    "protectia datelor personale",
    "GDPR",
    "prelucrare date personale",
    "confidentialitate website factory",
  ],
})

export default function PoliticiDeConfidentialitatePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Acasă", url: "/" },
    { name: "Politică de confidențialitate", url: "/politici-de-confidentialitate" },
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
                Politică de <span className="gradient-text">confidențialitate</span>
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
              {/* 1. Politica prelucrarii datelor cu caracter personal */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                  1. Politica prelucrării datelor cu caracter personal
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                  <strong className="text-foreground">SC PIXEL FACTORY SRL</strong> în calitate de autor, proprietar și administrator al site-ului web{" "}
                  <strong className="text-foreground">www.websitefactory.ro</strong> respectă caracterul privat și securitatea prelucrării datelor cu caracter personal al fiecărei persoane care accesează site-ul web în vederea efectuării de comenzi online.
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                  În conformitate cu dispozițiile Regulamentului UE 679/2016 privind protecția datelor cu caracter personal, care abrogă Legea nr. 677/2001 pentru protecția persoanelor cu privire la prelucrarea datelor cu caracter personal și libera circulație a acestor date, <strong className="text-foreground">SC PIXEL FACTORY SRL</strong> are obligația de a administra în condiții de siguranță și numai pentru scopurile prezentate mai jos, datele personale care ne sunt furnizate.
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                  Societatea noastră se obligă să păstreze confidențialitatea datelor personale furnizate prin intermediul site-ului <strong className="text-foreground">www.websitefactory.ro</strong>, așa cum prevăd dispozițiile Regulamentului UE 679/2016 privind protecția datelor personale.
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                  Prin citirea prezentei Politici ați luat la cunoștință de faptul că vă sunt garantate drepturile prevăzute de lege. În conformitate cu dispozițiile Regulamentului UE 679/2016, persoanele înregistrate, în calitate de persoane vizate, au următoarele drepturi:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-muted-foreground ml-4 mb-4">
                  <li>Dreptul la informare;</li>
                  <li>Dreptul de acces la date cu caracter personal;</li>
                  <li>Dreptul de intervenție asupra datelor cu caracter personal;</li>
                  <li>Dreptul de opoziție;</li>
                  <li>Dreptul de a nu fi supus unei decizii individuale;</li>
                  <li>Dreptul de a se adresa justiției.</li>
                </ul>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                  Vă puteți exercita aceste drepturi trimițând un e-mail către <strong className="text-foreground">SC PIXEL FACTORY SRL</strong> folosind formularul de contact de pe site sau ne puteți scrie la următoarea adresă poștală: <strong className="text-foreground">Str. Bega, nr. 47, Ghiroda, Timiș, România</strong>
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                  Orice informație furnizată de dumneavoastră va fi considerată și va reprezenta consimțământul dumneavoastră expres ca datele dumneavoastră personale să fie folosite de <strong className="text-foreground">SC PIXEL FACTORY SRL</strong> în conformitate cu scopurile menționate mai jos.
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                  Dacă doriți ca datele dumneavoastră personale să fie actualizate sau scoase din baza de date, ori aveți întrebări legate de confidențialitatea datelor, ne puteți contacta / notifica oricând utilizând datele de contact existente pe site.
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Dacă nu doriți ca datele dumneavoastră să fie colectate, vă rugăm să nu ni le furnizați.
                </p>
              </div>

              {/* 2. Scopul colectarii datelor */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                  2. Scopul colectării datelor
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                  Datele cu caracter personal sunt colectate și prelucrate în următoarele scopuri:
                </p>
                <ul className="list-disc list-inside space-y-3 text-base md:text-lg text-muted-foreground ml-4 mb-4">
                  <li>
                    <strong className="text-foreground">Oferirea serviciilor solicitate de dumneavoastră;</strong> pentru activități comerciale de vânzări de servicii, cuprinzând realizare, administrare și dezvoltare vânzări; cercetare / studii de piață, statistică. Date colectate: nume, prenume, adresă (domiciliu/reședința), cod numeric personal, e-mail, data și locul nașterii, adrese de livrare.
                  </li>
                  <li>
                    <strong className="text-foreground">Pentru a vă confirma serviciile</strong> pe care le-ați comandat în sistem on-line și a vă furniza informații suplimentare cu privire la acestea.
                  </li>
                  <li>
                    <strong className="text-foreground">Transmiterea de oferte, mesaje publicitare și de marketing;</strong> pentru reclamă, marketing și publicitate, activități de promovare a serviciilor SC PIXEL FACTORY SRL, desfășurarea companiilor promoționale, transmiterea de newslettere (buletine informative), de urmărire și monitorizare a vânzărilor și comportamentului consumatorului. Date colectate: nume și prenume, data și locul nașterii, telefon/fax, e-mail, adresă (domiciliu/reședința), obișnuințe/ preferințe/ comportament.
                  </li>
                  <li>
                    <strong className="text-foreground">În scop probatoriu</strong> în legătura cu activitățile de mai sus și de arhivare: stocarea de date cu caracter personal menționate la scopurile de mai sus în vederea menținerii evidențelor legate de activitățile desfășurate, pentru protejarea drepturilor în justiție și exercitarea altor drepturi conform legii și contractelor încheiate, îndeplinirea eventualelor cerințe de arhivare, în acord cu dispozițiile legale.
                  </li>
                </ul>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                  Datele cu caracter personal care beneficiază de un regim special de protecție cum ar fi codul numeric personal, seria și numărul actului de identitate, vor fi colectate și prelucrate în condiții limitative și în concordanță cu dispozițiile legale pentru asigurarea respectării regulilor aplicabile în domeniul protecției datelor cu privire la acestea.
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Furnizarea datelor cu caracter personal este necesară pentru ca societatea <strong className="text-foreground">SC PIXEL FACTORY SRL</strong> să realizeze activitățile listate conform celor de mai sus. Un refuz din partea dvs. de a ne furniza aceste date ar putea atrage imposibilitatea din partea Website Factory de a vă furniza respectivele servicii, informații, de a răspunde solicitărilor dvs. sau de a realiza orice alte activități din cele listate mai sus.
                </p>
              </div>

              {/* 3. Cui dezvăluim datele */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                  3. Cui dezvăluim datele dvs. cu caracter personal
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                  În vederea realizării unuia sau mai multor scopuri din cele menționate mai sus, <strong className="text-foreground">SC PIXEL FACTORY SRL</strong> poate dezvălui datele dumneavoastră cu caracter personal următoarelor categorii de destinatari:
                </p>
                <ul className="list-disc list-inside space-y-2 text-base md:text-lg text-muted-foreground ml-4">
                  <li>Partenerilor contractuali ai SC PIXEL FACTORY SRL (cum este cazul companiilor cu care Website Factory se află în relații de parteneriat, dar numai în temeiul unui angajament de confidențialitate din partea acestora, prin care garantează că aceste date sunt păstrate în siguranță și că furnizarea acestor informații personale se face conform legislației în vigoare);</li>
                  <li>Furnizori de servicii (de marketing, servicii de plată / bancare sau alte servicii), inclusiv entități care asistă SC PIXEL FACTORY SRL în prelucrarea de date în calitate de împuterniciți;</li>
                  <li>Asiguratori, autorități publice (Parchet, Poliție, instanțele judecătorești și altor organe abilitate ale statului), în baza și în limitele prevederilor legale și ca urmare a unor cereri expres formulate;</li>
                  <li>Altor companii din același grup cu SC PIXEL FACTORY SRL precum și dvs. ca persoană vizată în contextul.</li>
                </ul>
              </div>

              {/* 4. Securitatea datelor */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                  4. Securitatea datelor colectate și procesate
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                  <strong className="text-foreground">SC PIXEL FACTORY SRL</strong> utilizează metode și tehnologii de securitate avansate, împreună cu politici stricte aplicate salariaților și procedurilor de lucru, incluzând audit-ul periodic pentru a proteja datele cu caracter personal, colectate și procesate conform prevederilor legale în vigoare.
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                  Echipamentul de tip server pe care este găzduit site-ul web prin intermediul căruia colectăm date cu caracter personal este protejat atât la accesul fizic cât și la accesul de la distanță (limitat), fiind instalat într-un centru de date și supus periodic unui audit de securitate.
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Depunem toate eforturile rezonabile, justificate comercial pentru a vă proteja datele cu caracter personal colectate, analizăm noile tehnologii în domeniu și, atunci și dacă este cazul, le aplicăm în vederea upgrade-ului sistemelor noastre de securitate.
                </p>
              </div>

              {/* 5. Durata prelucrării datelor */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                  5. Durata prelucrării datelor
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                  Va fi determinată în general de momentul exercitării dreptului dumneavoastră la opoziție, în condițiile Regulamentului UE 679/2016. <strong className="text-foreground">Excepție:</strong> Pentru datele declarate în cadrul serviciului call center, durata prelucrării datelor este de <strong className="text-foreground">5 ani</strong>, ca regulă, sau până la exercitarea dreptului de opoziție.
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                  De asemenea, <strong className="text-foreground">SC PIXEL FACTORY SRL</strong> poate stoca datele cu caracter personal pe o astfel de durată mai îndelungată, în scop probatoriu și de arhivare.
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Totodată, stocarea datelor personale pentru o perioadă mai îndelungată de timp se poate realiza pentru realizarea de statistici, îmbunătățirea serviciilor, administrarea conturilor clienților, cercetare / studii de piață.
                </p>
              </div>

              {/* 6. Alte informații */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                  6. Alte informații
                </h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                  Vă rugăm să verificați la fiecare utilizare a website-ului nostru prezenta Politică de prelucrare a datelor cu caracter personal pentru a fi tot timpul informați în legătură cu aceasta.
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-4">
                  La încheierea operațiunilor de prelucrare, datele înregistrate vor putea fi transferate, integral ori parțial, oricărei alte persoane juridice cu respectarea legislației speciale în vigoare, în condițiile în care acestea vor fi folosite în scopuri similare cu cele prevăzute în acest document.
                </p>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                  Pentru înregistrarea eronată a datelor personale cauzată de softul de indexare a datelor, <strong className="text-foreground">SC PIXEL FACTORY SRL</strong> nu își asumă nicio responsabilitate.
                </p>
              </div>

              {/* 7. Definitii */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-4">
                  7. Definiții
                </h2>
                <div className="space-y-4">
                  <div>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-2">
                      <strong className="text-foreground">Date cu caracter personal:</strong> Orice informații referitoare la o persoană fizică identificată sau identificabilă; o persoană identificabilă este acea persoană care poate fi identificată, direct sau indirect, în mod particular prin referire la un număr de identificare ori la unul sau la mai mulți factori specifici identității sale fizice, fiziologice, psihice, economice, culturale sau sociale.
                    </p>
                  </div>
                  <div>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-2">
                      <strong className="text-foreground">Prelucrarea datelor cu caracter personal:</strong> Orice operațiune sau set de operațiuni care se efectuează asupra datelor cu caracter personal, prin mijloace automate sau neautomate, cum ar fi colectarea, înregistrarea, organizarea, stocarea, adaptarea ori modificarea, extragerea, consultarea, utilizarea, dezvăluirea către terți prin transmitere, diseminare sau în orice alt mod, alăturarea ori combinarea, blocarea, ștergerea sau distrugerea.
                    </p>
                  </div>
                  <div>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-2">
                      <strong className="text-foreground">Stocarea:</strong> Păstrarea pe orice fel de suport a datelor cu caracter personal culese.
                    </p>
                  </div>
                  <div>
                    <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
                      <strong className="text-foreground">Operator:</strong> Orice persoană fizică sau juridică, de drept privat ori de drept public, inclusiv autoritățile publice, instituțiile și structurile teritoriale ale acestora, care stabilește scopul și mijloacele de prelucrare a datelor cu caracter personal.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="mb-12">
                <h2 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-6">Contact</h2>
                <p className="text-base md:text-lg text-muted-foreground leading-relaxed mb-6">
                  Orice notificare poate fi adresată în format electronic sau în scris la:
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

              {/* Disclaimer */}
              <div className="bg-muted/30 rounded-lg p-6 border border-border/50">
                <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">SC PIXEL FACTORY SRL</strong> își rezervă dreptul de a aduce modificări acestei declarații cu privire la prelucrarea datelor cu caracter personal fără a instiința în prealabil, publicând pe site versiunea actualizată.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
