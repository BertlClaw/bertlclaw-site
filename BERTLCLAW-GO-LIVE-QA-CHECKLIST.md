# BertlClaw Go-Live QA Checklist

Praktische Release-Checkliste für den Livegang von `https://bertlclaw.github.io/bertlclaw-site/`.

Stand der lokalen Prüfung: 2026-03-31  
Basis: aktueller Workspace-Inhalt (`index.html`, Service-/Use-Case-Seiten, `impressum.html`, `datenschutz.html`, `danke.html`, `sitemap.xml`, GitHub-/Brand-Dokumente).

---

## 1) Scope dieser QA

Diese Checkliste ist auf die aktuelle BertlClaw-Seite zugeschnitten:

**Kernseiten**
- `/` (`index.html`)
- `/services.html`
- `/use-cases.html`
- `/landingpages.html`
- `/landingpage-sprint.html`
- `/positionierung-website-texte.html`
- `/digital-clarity-setup.html`
- `/ki-fuer-selbststaendige.html`
- `/mvp-digitale-produktideen.html`
- `/digitale-struktur-systeme.html`
- `/impressum.html`
- `/datenschutz.html`
- `/danke.html`

**Besondere Go-Live-Risiken im aktuellen Build**
- Kontaktformular existiert nur auf `index.html` und sendet via Formspree.
- Chat ist ein lokaler JS-Chat mit Quick Replies und CTA-Weiterleitungen.
- Mehrere Unterseiten haben einen Chat-Button „Projekt anfragen“, aber kein sichtbares `contactForm` auf der Seite → unbedingt real testen, ob der Flow sinnvoll endet.
- JSON-LD / Entity-Signale sind vorhanden und sollten vor Livegang validiert werden.
- Datenschutz ist deutlich verbessert, aber sollte in der Live-Ansicht nochmals gegen echte Kontaktwege geprüft werden.

---

## 2) Test-Setup vor dem Freigeben

## Geräte / Browser

**Desktop**
- Chrome aktuell
- Safari oder Firefox aktuell
- 1440px+ und ca. 1280px Breite testen

**Mobile**
- iPhone Safari (oder Responsive Mode mit 390x844)
- Android Chrome (oder Responsive Mode mit 360x800)

## Testdaten
- Testname: `Max Mustertest`
- Testmail: eine eigene Mailbox, die du wirklich kontrollierst
- Testnachricht: `Testanfrage BertlClaw Go-Live QA – bitte ignorieren.`
- Testthema im Formular: jeweils mindestens 2 verschiedene Optionen prüfen

## Freigabelogik
- **PASS** = sauber, keine offene Blocker-Frage
- **FAIL** = klar kaputt / rechtlich riskant / peinlich für Livegang
- **N/A** = nur wenn Punkt für diese Seite wirklich nicht relevant ist

---

## 3) Release-Gate: harte Stopper

Wenn einer dieser Punkte **FAIL** ist, nicht live gehen:

- Startseite lädt nicht sauber auf Desktop und Mobile
- Kontaktformular sendet nicht zuverlässig zur Danke-Seite
- E-Mail / Telefon / WhatsApp-Links sind fehlerhaft
- Impressum oder Datenschutz fehlen, sind nicht erreichbar oder klar widersprüchlich
- Brand-Schreibweise ist nicht konsistent (`BertlClaw`)
- zentrale Meta-/Canonical-Angaben sind kaputt
- GitHub-Profil / Repo wirkt widersprüchlich zur Website-Identität

---

## 4) Master-Checklist mit Pass/Fail

> Tipp: beim echten Durchlauf je Punkt `PASS`, `FAIL` oder `N/A` ergänzen.

| ID | Bereich | Zu prüfen auf | Testschritte | PASS wenn | Status |
|---|---|---|---|---|---|
| D-01 | Desktop / Layout | Startseite | Startseite in Chrome bei 1440px laden | Hero, Nav, CTA, Kontaktbereich, Footer ohne Layoutbruch sichtbar | [ ] |
| D-02 | Desktop / Layout | Startseite | Auf 1280px und 1024px verkleinern | Keine abgeschnittenen Buttons, kein Text-Overflow, kein horizontaler Scroll | [ ] |
| D-03 | Desktop / Navigation | alle Hauptseiten | Nav-/Footer-Links durchklicken | Jede Seite lädt, keine Sackgassen, kein 404 | [ ] |
| D-04 | Desktop / Visuals | alle Hauptseiten | Alle Bilder und Logos prüfen | Keine fehlenden Bilder, kein verzerrtes Logo, kein kaputter Hero | [ ] |
| D-05 | Desktop / CTAs | Startseite + Unterseiten | Alle primären CTAs klicken | Mailto/WhatsApp/interne Links führen jeweils korrekt zum erwarteten Ziel | [ ] |
| M-01 | Mobile / Layout | Startseite | Auf 390x844 laden | Hero lesbar, Buttons gut tappable, Sticky-Nav stört nicht | [ ] |
| M-02 | Mobile / Layout | Unterseiten | 3–5 Unterseiten mobil öffnen | Keine überlappenden Cards, keine abgeschnittenen Textblöcke | [ ] |
| M-03 | Mobile / Navigation | Startseite | Mobile Nav Chips testen | Chips funktionieren, Zeile scrollt nutzbar, kein versehentliches Abschneiden | [ ] |
| M-04 | Mobile / Floating UI | alle Seiten mit Chat | Chat-Button auf Mobil öffnen/schließen | Chat verdeckt keine kritischen Inhalte dauerhaft, lässt sich sauber schließen | [ ] |
| F-01 | Formular | Startseite | Formular leer absenden | Browser-Validierung greift sinnvoll | [ ] |
| F-02 | Formular | Startseite | Formular vollständig mit Testdaten absenden | Erfolgreiche Weiterleitung auf `danke.html` | [ ] |
| F-03 | Formular | Startseite | Prüfen, ob Testmail bei Formspree / Zielkanal ankommt | Anfrage landet vollständig mit Name, Mail, Thema, Nachricht | [ ] |
| F-04 | Formular | Startseite | Sonderzeichen testen (`ä ö ü ß & ?`) | Umlaute werden korrekt übertragen | [ ] |
| F-05 | Formular | Startseite | Datenschutz-Hinweis unter Formular prüfen | Hinweis ist sichtbar, verständlich und zu `datenschutz.html` verlinkt | [ ] |
| F-06 | Formular | Startseite | `_next`-Flow testen | Erfolgsfall landet stabil auf `/danke.html` und nicht auf fremder/roher Formspree-Seite | [ ] |
| C-01 | Chat | Startseite | Chat öffnen, Quick Question klicken | Antwort erscheint sofort und inhaltlich passend | [ ] |
| C-02 | Chat | Startseite | Freitextfrage stellen | Antwort erscheint ohne JS-Fehler; Text bleibt lesbar | [ ] |
| C-03 | Chat → Formular | Startseite | „Frage ins Formular übernehmen“ testen | Nachricht wird ins Formular übernommen und Nutzer landet sinnvoll im Kontaktbereich | [ ] |
| C-04 | Chat / Unterseiten | `services`, `use-cases`, Angebotsseiten | Auf jeder Unterseite „Projekt anfragen“ im Chat testen | Flow endet sinnvoll; kein toter Button / kein stilles Nichtstun | [ ] |
| C-05 | Chat / Links | alle Seiten mit Chat | WhatsApp / Mail / Telefon aus dem Chat klicken | Jede Aktion öffnet korrekt den passenden Kanal | [ ] |
| L-01 | Legal | Footer aller Seiten | Prüfen, ob `Impressum` und `Datenschutz` überall erreichbar sind | Beide Links sind überall vorhanden und funktionieren | [ ] |
| L-02 | Impressum | `impressum.html` | Inhalt gegen sichtbare Kontaktangaben der Website prüfen | Name, Anschrift, Mail, Telefon, Verantwortlichkeit konsistent | [ ] |
| L-03 | Datenschutz | `datenschutz.html` | Text gegen reale Flows prüfen | GitHub Pages, Formspree, E-Mail, Telefon, WhatsApp werden passend genannt | [ ] |
| L-04 | Datenschutz am Erhebungspunkt | Startseite | Formularbereich prüfen | Datenschutz-Hinweis steht direkt beim Absenden, nicht nur im Footer | [ ] |
| L-05 | Danke-Seite | `danke.html` | Nach Formularversand prüfen | Danke-Seite bestätigt erfolgreich, wirkt seriös, bietet sinnvolle nächste Schritte | [ ] |
| B-01 | Brand-Konsistenz | Website gesamt | Schreibweise scannen | Überall `BertlClaw`, keine abweichenden Varianten | [ ] |
| B-02 | Brand-Konsistenz | Website + Legal | Betreiberbezug prüfen | Dominic Reisenbichler, MSc. ist konsistent als Betreiber zugeordnet | [ ] |
| B-03 | Brand-Konsistenz | Website + GitHub | Logo / Bildwelt vergleichen | Hauptlogo und Brand-Anmutung passen zusammen | [ ] |
| B-04 | Angebotsklarheit | Startseite + Services | Kernbotschaft in 5 Sekunden prüfen | Klar erkennbar: Landingpages, Website-Texte, Positionierung, digitale Struktur | [ ] |
| S-01 | SEO Basics | alle indexierbaren Seiten | Seitentitel und Meta Description ansehen | Jede Kernseite hat passenden, eindeutigen Title + Description | [ ] |
| S-02 | SEO Basics | alle Kernseiten | Canonical prüfen | Canonical zeigt auf die jeweilige Live-URL, ohne Widerspruch | [ ] |
| S-03 | SEO Basics | Social Preview | OG/Twitter-Tags stichprobenartig prüfen | Titel, Beschreibung und Bild sind sinnvoll und markenkonsistent | [ ] |
| S-04 | Crawlability | Root | `robots.txt` und `sitemap.xml` aufrufen | Beide erreichbar; Sitemap verweist auf Live-URLs | [ ] |
| S-05 | Sitemap-Hygiene | `sitemap.xml` | Alle URLs stichprobenartig öffnen | Keine toten Seiten, keine falschen Dateinamen | [ ] |
| S-06 | Index Hygiene | Search Console | Property / Verifizierung prüfen | Google-Verifizierung vorhanden, Property korrekt eingerichtet | [ ] |
| E-01 | Entity / JSON-LD | Startseite | Rich Results / Schema Validator nutzen | JSON-LD ohne grobe Syntaxfehler; Person/Organization/Website logisch | [ ] |
| E-02 | Entity / Konsistenz | Startseite + GitHub | `sameAs`, Name, Betreiber prüfen | Website und GitHub beschreiben dieselbe Entity ohne Widerspruch | [ ] |
| E-03 | Entity / Realitätscheck | Startseite | SearchAction / strukturierte Daten prüfen | Nur Felder verwenden, die auf der Seite real existieren und funktionieren | [ ] |
| G-01 | GitHub Profil | `github.com/BertlClaw` | Profil bio, Name, Avatar prüfen | Bio, Name, Bild passen zur Website-Positionierung | [ ] |
| G-02 | GitHub Repo | `github.com/BertlClaw/bertlclaw` | Repo Description, README, Links prüfen | Repo wirkt wie öffentliche Brand-/Website-Präsenz, nicht widersprüchlich | [ ] |
| G-03 | GitHub ↔ Website | Profil + Repo + Site | Links in beide Richtungen prüfen | Website, Profil und Repo verlinken plausibel aufeinander | [ ] |
| G-04 | Öffentlicher Eindruck | Profil gesamt | Als neuer Besucher draufschauen | Kein verwirrendes Mischsignal aus Person / Tool / Agentur / Bot-Fassade | [ ] |

---

## 5) Konkrete Prüfanleitung nach Bereich

## A. Desktop QA

### A1. Startseite
1. `index.html` live öffnen.
2. Prüfen, ob Hero-Text sofort verständlich ist.
3. Nav anklicken: `Leistungen`, `Warum BertlClaw`, `Anwendungsfälle`, `Kontakt`.
4. Auf Darstellung der Metrics, Cards, Angebotsblöcke und Kontaktsektion achten.
5. Footer-Links komplett durchklicken.

**PASS wenn**
- Seite hochwertig und stabil wirkt
- kein sichtbarer CSS-Bruch
- Kontaktblock unten gut erreichbar bleibt

### A2. Unterseiten
Stichprobe mindestens:
- `services.html`
- `use-cases.html`
- `landingpage-sprint.html`
- `positionierung-website-texte.html`
- `digital-clarity-setup.html`

**Prüfen**
- Headline verständlich
- CTA vorhanden
- Footer vollständig
- Chat-Button korrekt positioniert

---

## B. Mobile QA

### B1. iPhone/Android-Flow
Auf Mobilgeräten nacheinander testen:
1. Startseite laden
2. nach unten scrollen
3. Chat öffnen/schließen
4. CTA tippen
5. Kontaktformular ausfüllen
6. Danke-Seite lesen
7. Zurück zur Startseite

**PASS wenn**
- alles mit Daumen bedienbar ist
- der Chat nicht nervig im Weg hängt
- Formularfelder nicht gezoomt/zerhackt wirken

---

## C. Formular- und Leadflow-QA

### C1. Positiver Happy Path
1. Startseite öffnen.
2. Formular komplett ausfüllen.
3. Absenden.
4. Weiterleitung auf `danke.html` prüfen.
5. Eingang der Anfrage im Zielsystem bestätigen.

### C2. Negative Tests
- Pflichtfelder leer lassen
- ungültige E-Mail eingeben
- sehr kurze Nachricht testen
- Sonderzeichen / Zeilenumbrüche testen

**PASS wenn**
- Validierung sauber greift
- erfolgreiche Übermittlung verlässlich ankommt
- Nutzer nie im Unklaren bleibt, ob die Anfrage gesendet wurde

---

## D. Chat-QA

Der BertlClaw-Chat ist aktuell kein echter Backend-Chat, sondern ein lokaler Antwort-/CTA-Assistent. Genau deshalb muss er besonders sauber wirken.

### D1. Was testen
- Panel öffnet/schließt sauber
- Quick Replies liefern sinnvolle Antworttexte
- Freitext liefert Antwort, nicht leere Box
- Chat-Links zu WhatsApp / Mail / Tel stimmen
- „Frage ins Formular übernehmen“ funktioniert wirklich auf der Startseite

### D2. Kritischer Sondertest auf Unterseiten
Viele Unterseiten haben den Chat-CTA `Projekt anfragen`, aber kein sichtbares Kontaktformular.

**Deshalb explizit prüfen:**
1. Unterseite öffnen, z. B. `services.html`
2. Chat öffnen
3. Freitext eingeben
4. `Projekt anfragen` klicken
5. Beobachten, was passiert

**FAIL wenn**
- gar nichts sichtbar passiert
- Nutzer denkt, der Button sei kaputt
- Flow auf Unterseiten anders versprochen wird als technisch geliefert

**Empfohlene Go-Live-Entscheidung**
- Entweder diesen CTA auf Unterseiten auf Mail/WhatsApp umbiegen
- oder dort tatsächlich einen Kontaktabschnitt ergänzen
- oder Button-Label ändern, damit kein Formular-Transfer versprochen wird

---

## E. Legal QA

### E1. Impressum
Prüfen gegen tatsächlich sichtbare Kontaktkanäle:
- Name: Dominic Reisenbichler, MSc.
- Anschrift
- E-Mail
- Telefon
- Betreiber-/Verantwortlichkeitsrolle
- inhaltlicher Schwerpunkt / Angebot

### E2. Datenschutz
Gegen reale Flows spiegeln:
- GitHub Pages Hosting
- Formspree Kontaktformular
- Mailkontakt
- Telefonkontakt
- WhatsApp-Link / Meta-Bezug
- Speicherdauer
- Betroffenenrechte / DSB-Hinweis

### E3. Mikroprüfung im HTML
Aktuell auffällig: In `datenschutz.html` steht im Formspree-Aufzählungsblock ein doppeltes `<li>`-Fragment.

**Live prüfen:**
- Wird die Liste im Browser trotzdem sauber gerendert?
- Falls nein: vor Livegang HTML bereinigen.

**PASS wenn**
- Legal-Seiten vollständig, erreichbar und vertrauenswürdig wirken
- es keinen sichtbaren Bastel-/Vorlagen-Eindruck gibt

---

## F. Brand- und Messaging-QA

### F1. Was ein neuer Besucher sofort verstehen sollte
Innerhalb von 5–10 Sekunden muss klar sein:
- BertlClaw ist die Marke
- Dominic Reisenbichler ist die zugeordnete Person / Betreiber
- es geht um Landingpages, Website-Texte, Positionierung, digitale Struktur
- die Seite ist deutschsprachig und für reale Anfragen gedacht

### F2. Widerspruchsprüfung
Prüfen, ob BertlClaw irgendwo zugleich unstimmig erscheint als:
- Person
- Bot-Produkt
- reine Software
- Agentur-Fassade
- Dienstleistungsmarke

**PASS wenn**
- die Hauptlinie überall gleich bleibt: Marke + Betreiber + Angebote

---

## G. SEO- und Entity-QA

### G1. Onpage Basics
Je Kernseite prüfen:
- einzigartiger `<title>`
- brauchbare Meta Description
- passender Canonical
- OG-Bild vorhanden
- kein offensichtlicher Copy-Paste-Title

### G2. Sitemap / Indexierung
`sitemap.xml` enthält aktuell u. a.:
- `/`
- `/services.html`
- `/use-cases.html`
- `/impressum.html`
- `/datenschutz.html`
- mehrere SEO-/Angebotsseiten

**PASS wenn**
- jede gelistete URL wirklich live existiert
- keine veralteten Dateinamen drin sind
- Search Console Property stimmt

### G3. Strukturierte Daten
Auf Startseite und Stichprobe von Unterseiten validieren.

Besonders prüfen:
- `Organization` = BertlClaw
- `founder` / Bezug zu Dominic Reisenbichler
- `sameAs` verweist korrekt auf GitHub-Profil und Repo
- kein Schema-Feld suggeriert Funktionen, die es real nicht gibt

**Auffälliger Prüfpunkt:**
Auf der Startseite ist eine `SearchAction` hinterlegt. Wenn es keine echte Site Search gibt, sollte das als potenziell irreführend gelten und vor Livegang validiert bzw. entfernt werden.

---

## H. GitHub- und Public-Profile-QA

### H1. GitHub Profil prüfen
Soll-Zustand laut vorhandenen lokalen Docs:
- Name: `BertlClaw`
- konsistente Bio zur Website
- Avatar bevorzugt `logo-512.png` oder `logo-180.png`
- Website-Feld zeigt auf GitHub Pages-Seite
- keine widersprüchliche Bot-/Software-only-Selbstdarstellung

### H2. Repo prüfen
Repo `BertlClaw/bertlclaw` sollte:
- Description passend zur Website haben
- README als öffentliche Brand-/Projektbeschreibung nutzen
- nicht wie ein unverbundenes Code-Experiment wirken

### H3. Öffentlicher Eindruck
Frage für den finalen Check:
> Wenn jemand zuerst GitHub sieht und danach die Website öffnet – wirkt es wie dieselbe Marke?

**PASS wenn**
- Name, Logo, Kurzbeschreibung und Linkstruktur zusammenpassen

---

## 6) Empfohlener 30-Minuten Smoke Test direkt vor Go-Live

## Runde 1 – 10 Minuten
- Startseite Desktop prüfen
- Startseite Mobil prüfen
- Formular Testsendung durchführen
- Danke-Seite prüfen

## Runde 2 – 10 Minuten
- `services.html`
- `use-cases.html`
- `landingpage-sprint.html`
- `positionierung-website-texte.html`
- Chat-CTA auf 2 Unterseiten testen

## Runde 3 – 10 Minuten
- `impressum.html`
- `datenschutz.html`
- `robots.txt`
- `sitemap.xml`
- GitHub Profil + Repo + Website gegenseitig abgleichen

---

## 7) Aktuelle Vorab-Risiken aus der lokalen Sichtung

Diese Punkte sind noch keine endgültigen FAILs, aber vor Livegang aktiv zu prüfen:

1. **Chat-Unterseiten-CTA wahrscheinlich unklar**  
   Mehrere Unterseiten referenzieren `chatbotToForm`, haben aber kein sichtbares `contactForm`. Das riecht nach totem oder zumindest unlogischem UX-Flow.

2. **`SearchAction` in JSON-LD auf der Startseite**  
   Wenn keine echte Seitensuche existiert, ist das eher ein Entfernungs- als ein Nice-to-have-Kandidat.

3. **Datenschutz-HTML enthält ein Listen-Markup-Problem**  
   Im Formspree-Abschnitt ist ein doppeltes `<li>` sichtbar. Wahrscheinlich klein, aber unsauber.

4. **Sitemap / SEO-Landingpages vollständig gegen echte Live-Dateinamen prüfen**  
   BertlClaw hat mehrere ähnliche Dateinamen rund um Positionierung/Texte. Vor Go-Live sicherstellen, dass nichts veraltet oder doppelt wirkt.

5. **GitHub Public Presence vor Launch angleichen**  
   Website, Profilbio, Repo Description und README sollten gleichzeitig konsistent live sein – nicht nacheinander über Tage verteilt.

---

## 8) Go-Live-Freigabe

**Freigeben nur wenn alle folgenden Aussagen mit Ja beantwortet sind:**

- Ja, die Seite wirkt auf Desktop und Mobil stabil.
- Ja, mindestens eine echte Testanfrage wurde erfolgreich gesendet und empfangen.
- Ja, Chat und CTAs führen nie in Sackgassen.
- Ja, Impressum und Datenschutz sind sauber erreichbar und plausibel.
- Ja, BertlClaw ist als Marke überall konsistent beschrieben.
- Ja, GitHub und Website erzählen dieselbe öffentliche Geschichte.
- Ja, Sitemap, Canonicals und strukturierte Daten sind plausibel.

Wenn 1–2 kleine Schönheitsfehler offen sind, kann man live gehen.  
Wenn Leadflow, Legal, Brand-Klarheit oder Chat-UX wackeln: **noch nicht veröffentlichen**.
