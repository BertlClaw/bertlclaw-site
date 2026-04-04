# BertlClaw — Detailstrategien für Abschnitte 7–10

*Stand: 2026-04-04 | Basierend auf: LEGAL_REVIEW_BERTLCLAW.md, BERTLCLAW-COMPLIANCE-IMPLEMENTATION-PACK-2026-04-02.md, BERTLCLAW-SYSTEM-ARCHITECTURE.md, BERTLCLAW-GITHUB-ORG-MIGRATION-PLAN.md, BERTLCLAW-SEO-STATUS.md, BERTLCLAW-COM-SETUP-INSTRUCTIONS.md, BERTLCLAW-REFERRAL-SCRIPT.md, BERTLCLAW-FIRST-30-DAYS-ACQUISITION-PLAN.md, BERTLCLAW-LONGTERM-COMMERCIAL-STRATEGY.md, BERTLCLAW-GROWTH-ROADMAP.md*

---

## SECTION 7 — RECHTLICHES & COMPLIANCE

---

### 7.1 Gewerbeanmeldung prüfen / sicherstellen

**Status:** Offen
**Priorität:** Hoch
**Zeitrahmen:** Sofort

**Strategie:**
Für die angebotenen Leistungen (Landingpages, Website-Texte, Positionierung, Digitale Struktur) ist in Österreich zu klären, ob ein freies Gewerbe oder ein gebundenes Gewerbe (z. B. Werbeagentur, IT-Dienstleistung) vorliegt. Ohne gültige Gewerbeberechtigung dürfen Leistungen nicht gewerbsmäßig angeboten werden — das ist ein echter rechtlicher Risikobereich. Die einfachste erste Maßnahme: bei der WKO Steiermark bzw. der zuständigen Bezirksverwaltungsbehörde telefonisch nachfragen, welche Gewerbeart für das konkrete Tätigkeitsprofil passt. Bei reinen Textleistungen und Konzeptarbeit ohne technische Umsetzung ist oft ein freies Gewerbe möglich; technische Webentwicklung kann anders eingestuft werden.

**Konkrete nächste Schritte:**
- [ ] Tätigkeiten konkret auflisten (Landingpages konzipieren, Texte schreiben, Positionierung erarbeiten, digitale Struktur beraten) und mit WKO-Gewerbekatalog abgleichen
- [ ] Telefonische Kurzberatung bei WKO Steiermark: 0316 601-0 oder online Erstberatung beantragen
- [ ] Falls Gewerbe noch nicht angemeldet: sofort über GISA (Gewerbeinformationssystem Austria) oder über die Bezirksverwaltungsbehörde Weiz anmelden
- [ ] Ergebnis in LEGAL_REVIEW_BERTLCLAW.md und Impressum nachtragen (Behörde, Kammer, UID falls relevant)

**Erfolgskriterium:**
Schriftliche Bestätigung einer aktiven Gewerbeberechtigung für die tatsächlich ausgeübten Tätigkeiten liegt vor. Eintrag in Impressum.html ist korrekt und vollständig.

---

### 7.2 AGB (Allgemeine Geschäftsbedingungen) erstellen

**Status:** Offen
**Priorität:** Hoch
**Zeitrahmen:** 1–2 Wochen

**Strategie:**
Ohne AGB gilt bei Projekten österreichisches Allgemeines bürgerliches Gesetzbuch (ABGB) als Auffangnetz — das ist oft nachteilig, weil Scope-Creep, Zahlungsfristen, Urheberrecht und Haftung undefiniert bleiben. Für BertlClaw als Kleinunternehmer mit Projektgeschäft braucht es keine komplexen AGB, aber eine klare, einfache Basis: Leistungsumfang, Zahlungsbedingungen (Anzahlung, Fälligkeit), Urheberrecht (Nutzungsrechte nach Bezahlung), Haftungsbeschränkung, Stornobedingungen. Ein guter Startpunkt ist das WKO-AGB-Muster für Werbe-/IT-Dienstleister, das kostenlos zugänglich ist. Die AGB müssen vor Vertragsschluss zugänglich sein — als Link in Angeboten, im Impressum und optional auf der Website.

**Konkrete nächste Schritte:**
- [ ] WKO-Muster-AGB für einschlägige Branche herunterladen und auf BertlClaw-Situation anpassen (Leistungsarten, Preisstruktur, Anzahlung 50%)
- [ ] AGB als separates Dokument (PDF + HTML-Seite `agb.html`) aufbereiten
- [ ] AGB in alle Angebotsvorlagen und Rechnungsvorlagen als Link/Verweis einbauen
- [ ] Footer auf allen Website-Seiten um AGB-Link ergänzen
- [ ] Juristischen Kurzcheck optional: bei WKO-Rechtsservice oder via Gründer-Erstberatung

**Erfolgskriterium:**
AGB-Dokument ist online auf `bertlclaw.at/agb.html` abrufbar, in allen Angebotsvorlagen verlinkt, und im Website-Footer verlinkt.

---

### 7.3 Datenschutzkonzept vollständig umsetzen (DSGVO)

**Status:** Teilweise erledigt
**Priorität:** Hoch
**Zeitrahmen:** Sofort

**Strategie:**
Die Datenschutzerklärung existiert und wurde mit dem Compliance Pack vom 2026-04-02 bereits deutlich verbessert — Formspree-Abschnitt, WhatsApp-Abschnitt und GitHub-Pages-Hosting sind konkretisiert. Die kritischste noch offene Lücke: die vollständige Version muss live auf `bertlclaw.at/datenschutz.html` deployed sein, und der Datenschutzhinweis direkt am Formular muss aktiv funktionieren. GoatCounter Analytics ist eingebaut, aber die Datenschutzerklärung muss GoatCounter als Analyse-Tool klar benennen — sobald die E-Mail-Verifikation erfolgt ist und Daten erhoben werden. Bei jedem künftigen Tool-Einbau gilt die intern dokumentierte Consent-Trigger-Matrix.

**Konkrete nächste Schritte:**
- [ ] Datenschutzerklärung mit den Compliance-Pack-Texten live deployen (aktueller Workspace-Stand auf Website pushen)
- [ ] GoatCounter-Abschnitt in `datenschutz.html` ergänzen (cookiefreies Analytics, Anbieter GoatCounter, kein Consent-Banner nötig, aber transparente Erwähnung)
- [ ] Sicherstellen, dass Datenschutzerklärung und Impressum auf jeder Seite im Footer verlinkt sind
- [ ] GoatCounter-E-Mail-Verifikation abschließen
- [ ] Interne Regel dokumentieren: vor Einbau jedes neuen Tools die Consent-Trigger-Matrix aus dem Compliance Pack durchlaufen

**Erfolgskriterium:**
`datenschutz.html` bildet alle aktiven Datenflüsse (GitHub Pages, Formspree, GoatCounter, WhatsApp, E-Mail, Telefon) konkret und rechtsgrundlagenbasiert ab. Formular-Hinweis am Submit-Button ist aktiv. Kein neues Tool wird ohne Compliance-Check live gesetzt.

---

### 7.4 Vertragsvorlagen für Projektvereinbarungen

**Status:** Offen
**Priorität:** Mittel
**Zeitrahmen:** 1–2 Wochen

**Strategie:**
Neben AGB braucht es projektspezifische Vertragsvorlagen, die den individuellen Scope, Deliverables, Zeitplan und Preis festhalten. Das können einfache 1–2-seitige Dokumente sein — kein Rechtsgutachten, aber klare schriftliche Vereinbarung. Für die drei BertlClaw-Kernangebote (Landingpage Sprint, Positionierung & Website-Texte, Digitale Ordnung) sollte je eine Vorlage existieren, die als Auftrag/Angebot dient und vom Kunden bestätigt wird. Die bestehenden Angebotsvorlagen im Workspace sind eine gute Basis — sie brauchen nur einen formalen Rahmen (Auftraggeberdaten, Auftragnehmer, Datum, Unterschriftsfeld oder digitale Bestätigung per E-Mail).

**Konkrete nächste Schritte:**
- [ ] Bestehende Angebots-Templates um formalen Vertragsrahmen ergänzen (Parteien, Datum, Leistungsumfang, Preis, Zahlungsbedingungen, Verweis auf AGB)
- [ ] Je eine finale Vorlage pro Kernangebot als PDF-Vorlage vorbereiten
- [ ] E-Mail-Bestätigung als gültige Auftragserteilung definieren (in AGB und Angeboten verankern)
- [ ] Optional: digitale Signatur via einfachem Dienst (z. B. DocuSign Free / Adobe Sign Free) für sauberere Dokumentation

**Erfolgskriterium:**
Für jedes neue Projekt liegt vor Arbeitsbeginn ein schriftliches, vom Kunden bestätigtes Dokument (E-Mail-Bestätigung oder signiertes PDF) vor, das Scope, Preis und Zeitplan klar definiert.

---

### 7.5 Urheberrecht: Lizenzen für Inhalte und Deliverables klären

**Status:** Offen
**Priorität:** Mittel
**Zeitrahmen:** 1–2 Wochen

**Strategie:**
Bei Textleistungen, Konzepten und Landingpage-Designs stellt sich immer die Frage: Wem gehört was? Nach österreichischem Urheberrecht verbleiben Urheberrechte grundsätzlich beim Schöpfer (Dominic), bis eine explizite Übertragung/Lizenzierung stattfindet. Die AGB sollten klar regeln: Nutzungsrecht geht nach vollständiger Bezahlung auf den Kunden über; Dominic behält das Recht, die Arbeit als Referenzbeispiel (anonym oder namentlich mit Einverständnis) zu verwenden. Für verwendete Drittinhalte (Stock-Fotos, Fonts, Icons) muss je nach Lizenz sichergestellt werden, dass kommerzielle Nutzung erlaubt ist.

**Konkrete nächste Schritte:**
- [ ] Urheberrechts-Klausel in AGB einbauen: Nutzungsrecht nach Bezahlung, Referenzrecht für BertlClaw
- [ ] Prozess definieren: bei Verwendung von Drittinhalten (Bilder, Fonts, Icons) immer Lizenzdokumentation festhalten
- [ ] Bei Case Studies / Proof-Seite: Kundeneinverständnis explizit einholen und dokumentieren (kurze schriftliche Bestätigung per E-Mail reicht)
- [ ] Intern: Checkliste für Projektabschluss um „Urheberrecht und Referenzfreigabe" ergänzen

**Erfolgskriterium:**
AGB enthalten klare Urheberrechts-/Lizenzklausel. Jede auf der Proof-Seite veröffentlichte Referenz hat eine dokumentierte Freigabe des Kunden.

---

### 7.6 Versicherung prüfen (Berufshaftpflicht)

**Status:** Offen
**Priorität:** Mittel
**Zeitrahmen:** 1–3 Monate

**Strategie:**
Eine Berufshaftpflichtversicherung ist für Beratungs- und Konzeptleistungen zwar nicht gesetzlich vorgeschrieben, aber in der Praxis sinnvoll — besonders wenn Kunden auf Basis von BertlClaw-Konzepten Investitionen tätigen. Die Versicherungsprämie für Kleinunternehmer mit geringem Umsatz ist oft niedrig (€100–400/Jahr). Vor Abschluss: Angebote einholen bei WKO-Versicherungsservice, Ergo, Generali oder einem unabhängigen Versicherungsmakler. Die Entscheidung hängt vom tatsächlichen Haftungsrisiko der Leistungen ab — bei reinen Textleistungen ist das Risiko geringer als bei technischen oder finanziellen Beratungsleistungen.

**Konkrete nächste Schritte:**
- [ ] Leistungsprofil BertlClaw mit Versicherungsberater durchgehen (WKO bietet Erstberatung an)
- [ ] Mindestens 2–3 Vergleichsangebote einholen (WKO, Ergo, unabhängiger Makler)
- [ ] Entscheidung treffen und dokumentieren — auch eine bewusste Entscheidung gegen Versicherung ist besser als keine Entscheidung
- [ ] Falls Versicherung abgeschlossen: Policennummer im Impressum optional ergänzen

**Erfolgskriterium:**
Entscheidung für oder gegen Berufshaftpflicht ist aktiv und dokumentiert getroffen. Falls abgeschlossen: Police vorhanden und korrekt benannt.

---

### 7.7 Steuerliche Registrierung abschließen (Finanzamt Österreich)

**Status:** Teilweise erledigt
**Priorität:** Hoch
**Zeitrahmen:** Sofort

**Strategie:**
Als Kleinunternehmer in Österreich (Jahresumsatz unter €42.000 netto) ist keine UID-Nummer Pflicht für rein österreichische Kunden, aber empfehlenswert für professionellen Auftritt und für Fälle mit B2B-Kunden aus anderen EU-Ländern. Die Einnahmen-Ausgaben-Rechnung (EAR) ist die einfachste Buchhaltungsform für Kleinunternehmer. Das Finanzamt Weiz/Graz-Umgebung ist zuständig. Die steuerliche Erstregistrierung erfolgt über das Formular Verf24 (Fragebogen zur steuerlichen Erfassung) beim zuständigen Finanzamt. Wichtig: bereits mit dem ersten bezahlten Projekt besteht Steuerpflicht — nicht erst ab einer bestimmten Umsatzhöhe.

**Konkrete nächste Schritte:**
- [ ] Verf24-Fragebogen beim Finanzamt Weiz einreichen (falls noch nicht geschehen) — online über FinanzOnline möglich
- [ ] Steuerliche Betreuung klären: selbst via FinanzOnline oder Steuerberater (bei Kleinunternehmer-Pauschal oft günstig: €300–600/Jahr)
- [ ] Kleinunternehmerregelung formal bestätigen lassen — Umsatzschwelle 2025/2026 im Auge behalten
- [ ] UID-Nummer beantragen (optional, aber für B2B-Kunden aus dem EU-Ausland nötig) — über FinanzOnline kostenlos

**Erfolgskriterium:**
BertlClaw ist beim Finanzamt als Einzel- oder Kleinunternehmer steuerlich erfasst. Steuernummer und optionale UID liegen vor und sind in Rechnungsvorlagen korrekt eingebaut.

---

### 7.8 WKO-Mitgliedschaft und Eintrag

**Status:** Teilweise erledigt
**Priorität:** Mittel
**Zeitrahmen:** 1–2 Wochen

**Strategie:**
Der WKO-Eintrag ist im Workspace vorbereitet. Mit aktiver Gewerbeberechtigung erfolgt die WKO-Mitgliedschaft in der Regel automatisch — die Grundumlage ist für Kleinunternehmer gering. Der WKO-Eintrag auf „wko.at/firmen-az" ist wichtig als externes Vertrauenssignal und Backlink für die SEO-Entity-Dominance-Strategie. Der Eintrag sollte konsistente Daten zu Impressum und JSON-LD aufweisen: Name (Dominic Reisenbichler / BertlClaw), Adresse (Goettelsberg 11a/6, 8160 Mortantsch), URL (bertlclaw.at), Tätigkeitsbeschreibung. Sobald Gewerbe und steuerliche Registrierung abgeschlossen sind, kann auch ein Eintrag im Firmen A-Z und in branchenspezifischen WKO-Verzeichnissen beantragt werden.

**Konkrete nächste Schritte:**
- [ ] Gewerbeberechtigung (7.1) und Finanzamt-Registrierung (7.7) vorher abschließen
- [ ] WKO Steiermark bestätigen, dass Mitgliedschaft aktiv ist
- [ ] Eintrag im WKO Firmen A-Z einreichen/aktualisieren mit konsistenten Daten (Name, Adresse, URL, Tätigkeit)
- [ ] Eintrag in weiteren Verzeichnissen: Herold.at, MeinBezirk.at (lokal Steiermark), AboutMe-Profil als zusätzliche Entity-Signale
- [ ] WKO-Link in `sameAs`-Feld des JSON-LD auf `index.html` ergänzen, sobald Eintrag live ist

**Erfolgskriterium:**
BertlClaw ist im WKO Firmen A-Z mit korrekten, zur Website konsistenten Daten eingetragen. Der Eintrag ist öffentlich abrufbar und verlinkt auf `bertlclaw.at`.

---

## SECTION 8 — DIGITALE INFRASTRUKTUR

---

### 8.1 Website: live, performant, sicher (HTTPS, Custom Domain)

**Status:** Teilweise erledigt
**Priorität:** Hoch
**Zeitrahmen:** Sofort

**Strategie:**
Die Website ist auf GitHub Pages mit CNAME für `bertlclaw.at` konfiguriert. HTTPS wird von GitHub Pages automatisch über Let's Encrypt aktiviert, sobald die DNS-Propagation abgeschlossen ist — das dauert typisch 24–72 Stunden nach CNAME-Setzen. Bis HTTPS aktiv ist, keine großen externen Pushes machen (LinkedIn, Visitenkarten, etc.), da Browser-Warnungen das Vertrauen schädigen. Performance ist bei statischen GitHub-Pages-Sites generell gut; regelmäßige Checks mit PageSpeed Insights oder GTmetrix empfehlenswert, um Bilder und CSS-Ladeverhalten zu optimieren.

**Konkrete nächste Schritte:**
- [ ] DNS-Propagation prüfen: `dig bertlclaw.at` oder `whatsmydns.net` verwenden — warten bis vollständig propagiert
- [ ] HTTPS-Aktivierung in GitHub Pages Settings bestätigen (grüner Haken bei „Enforce HTTPS")
- [ ] PageSpeed Insights-Test für `bertlclaw.at` durchführen und etwaige kritische Fehler beheben
- [ ] Regelmäßiger Check: monatlich kurzer Uptime-/Performance-Check (manuell oder via kostenlosem Dienst wie UptimeRobot)

**Erfolgskriterium:**
`https://bertlclaw.at` lädt ohne Browser-Warnung, HTTPS ist aktiv (grünes Schloss), PageSpeed Score >80 für Mobile.

---

### 8.2 Analytics: Daten erheben und auswerten

**Status:** Teilweise erledigt
**Priorität:** Hoch
**Zeitrahmen:** Sofort

**Strategie:**
GoatCounter ist auf 16+ Seiten eingebaut — das ist die richtige Wahl: cookiefrei, DSGVO-konform, kein Cookie-Banner nötig, minimaler Overhead. Die einzig offene Aufgabe ist die E-Mail-Verifikation, nach der GoatCounter Daten zu erheben beginnt. Parallel dazu sollte Google Search Console eingerichtet werden — nicht für User-Analytics, sondern für Suchanfragen, Ranking-Daten und Indexierungs-Status. Diese beiden Tools zusammen (GoatCounter für Traffic, Search Console für SEO-Sichtbarkeit) sind für BertlClaw in dieser Phase völlig ausreichend. Kein GA4, kein Pixel — das wäre unnötige Komplexität mit Compliance-Kosten.

**Konkrete nächste Schritte:**
- [ ] GoatCounter E-Mail-Verifikation abschließen (E-Mail prüfen, Link klicken)
- [ ] Google Search Console: `bertlclaw.at` als Property hinzufügen (via DNS-TXT-Record oder HTML-Meta-Tag)
- [ ] Sitemap bei Google Search Console einreichen: `https://bertlclaw.at/sitemap.xml`
- [ ] GoatCounter-Abschnitt in `datenschutz.html` ergänzen (cookiefreies Analytics, transparente Erwähnung)
- [ ] Wöchentlicher Kurzblick auf GoatCounter-Dashboard einrichten (welche Seiten, woher Traffic)

**Erfolgskriterium:**
GoatCounter zeigt erste Echtdaten. Google Search Console hat `bertlclaw.at` erfasst und Sitemap ist eingereicht. Wöchentliche Datenauswertung ist Teil der Routine.

---

### 8.3 CRM / Lead-Management-System einrichten

**Status:** Offen
**Priorität:** Hoch
**Zeitrahmen:** Sofort

**Strategie:**
Laut BERTLCLAW-SYSTEM-ARCHITECTURE.md ist ein Google Sheet als „Source of Truth" die richtige Wahl für diese Phase — kein CRM-Overkill, aber klare Struktur. Die CSV-Vorlage `bertlclaw-leads-template.csv` ist bereits im Workspace. Das Sheet muss angelegt und aktiv genutzt werden. Die wichtigste Disziplin: jede ernsthafte Anfrage — ob per Formular, WhatsApp, Telefon oder E-Mail — landet innerhalb desselben Tages in der Lead-Liste mit Status, Kanal und Next Step. Erst wenn die manuelle Disziplin funktioniert, lohnt eine Automatisierung (Formspree → Google Sheets via Make/Zapier).

**Konkrete nächste Schritte:**
- [ ] Google Sheet anlegen mit Spalten gemäß `bertlclaw-leads-template.csv` (created_at, status, name, email, topic, source_channel, next_step, etc.)
- [ ] Sheet-Link sicher speichern (Lesezeichen, TOOLS.md)
- [ ] SOP definieren: bei jeder Anfrage innerhalb von max. 4 Stunden in das Sheet eintragen
- [ ] Status-Werte festlegen: Neu → Qualifiziert → In Gespräch → Angebot → Gewonnen/Verloren
- [ ] Später: Formspree → Google Sheets Automatisierung via Make (kostenloser Plan reicht für kleines Volumen)

**Erfolgskriterium:**
Google Sheet ist angelegt, aktiv befüllt, und enthält alle bisherigen und zukünftigen Leads. Kein Lead geht mehr verloren oder liegt nur im E-Mail-Postfach.

---

### 8.4 E-Mail-Domain (professionelle E-Mail @bertlclaw.at)

**Status:** Offen
**Priorität:** Hoch
**Zeitrahmen:** 1–2 Wochen

**Strategie:**
Eine professionelle E-Mail-Adresse wie `hallo@bertlclaw.at` oder `dominic@bertlclaw.at` ist ein starkes Vertrauenssignal — besonders wichtig wenn man Angebote und Verträge verschickt. Optionen: (1) Google Workspace (€6/Monat/User) — einfachste Lösung, Gmail-Interface, gute Deliverability; (2) Zoho Mail (kostenlos für 1 User mit eigener Domain) — günstigste Option; (3) MXroute oder Fastmail als kostengünstige Alternativen. Für BertlClaw als Kleinunternehmer ist Zoho Mail (Gratis) oder Google Workspace Individual die pragmatischste Wahl. DNS-Setup ist einfach und gut dokumentiert.

**Konkrete nächste Schritte:**
- [ ] Zoho Mail Free einrichten (hallo@bertlclaw.at) ODER Google Workspace Individual bestellen
- [ ] MX-Records bei Domain-Registrar (Hosteurope oder wo `bertlclaw.at` registriert ist) setzen
- [ ] E-Mail-Adresse in Impressum, Kontaktseite und Formspree-Konfiguration eintragen
- [ ] E-Mail-Signatur einrichten (Name, Titel, Website, Telefon)
- [ ] Alte/private E-Mail-Adresse in bisherigen Dokumenten durch neue ersetzen

**Erfolgskriterium:**
`hallo@bertlclaw.at` (oder ähnlich) ist aktiv, empfängt E-Mails, und alle externen Dokumente (Angebote, Impressum, Formspree) verwenden diese Adresse.

---

### 8.5 Backup- und Versionierungsstrategie (GitHub)

**Status:** Teilweise erledigt
**Priorität:** Mittel
**Zeitrahmen:** 1–2 Wochen

**Strategie:**
Der gesamte Website-Code liegt auf GitHub — das ist per se schon eine gute Versionierungsbasis. Die Lücke: der lokale Workspace (diese Strategiedokumente, Templates, Angebotsvorlagen) ist nicht vollständig gesichert, wenn er nur lokal liegt. Empfehlung: regelmäßige Commits und Pushes aller relevanten Workspace-Dokumente als privates GitHub-Repo. Zusätzlich sollten kritische Dokumente (AGB, Vertragsvorlagen, Kundenverträge) in einem lokalen Backup oder Cloud-Drive (Nextcloud, Google Drive) liegen. Für die Website selbst: jeder Deploy-Stand ist durch Git-History versioniert — kein extra Backup-System nötig.

**Konkrete nächste Schritte:**
- [ ] Privates GitHub-Repo für den BertlClaw-Workspace anlegen (Strategiedokumente, Templates, interne Docs)
- [ ] Regelmäßige Commits des Workspace definieren: bei jedem wichtigen Änderungsstand pushen
- [ ] Kritische Dokumente (Verträge, AGBs) zusätzlich in Google Drive oder Nextcloud ablegen
- [ ] .gitignore im Workspace prüfen: keine sensiblen Kundendaten ins Repo

**Erfolgskriterium:**
Alle wichtigen BertlClaw-Dokumente sind entweder versioniert auf GitHub oder separat gesichert. Ein Geräteverlust würde nicht zu Datenverlust führen.

---

### 8.6 GitHub Organisation einrichten

**Status:** Offen
**Priorität:** Mittel
**Zeitrahmen:** 1–3 Monate

**Strategie:**
Die Migration von persönlichem GitHub-Account zur BertlClaw-Organisation ist vollständig in `BERTLCLAW-GITHUB-ORG-MIGRATION-PLAN.md` dokumentiert. Der Aufwand ist ~2–3 Stunden, der kommerzielle Nutzen signifikant: professionellerer Auftritt, Namenskonflikt gelöst, Org-Profil-README möglich, Domain-Verifikation mit grünem Badge möglich. Der empfohlene Weg: neuen persönlichen Account für Dominic Reisenbichler anlegen, dann BertlClaw-Personal-Account zu Org konvertieren. Der beste Zeitpunkt: nach Abschluss der DNS-Propagation und HTTPS-Aktivierung, damit keine laufenden Deploy-Prozesse unterbrochen werden.

**Konkrete nächste Schritte:**
- [ ] Neuen persönlichen GitHub-Account für Dominic Reisenbichler anlegen (z. B. `dominicreisenbichler`)
- [ ] BertlClaw Personal Account zu GitHub Organisation konvertieren (Settings → Convert to Organization)
- [ ] Org-Profil README in `.github/profile/README.md` anlegen (Inhalt aus GITHUB-PROFILE-README-DRAFT.md)
- [ ] Website-Repo unter Org konfigurieren, GitHub Pages weiter auf `bertlclaw.at` zeigend
- [ ] Domain `bertlclaw.at` bei Org verifizieren (DNS TXT-Record → grüner Badge)

**Erfolgskriterium:**
`github.com/BertlClaw` ist eine offizielle GitHub-Organisation mit Org-Profil, verifizieter Domain `bertlclaw.at` und Website-Repo ohne Namenskonflikt.

---

### 8.7 Domain-Portfolio sichern (bertlclaw.at, .com, .ai)

**Status:** Teilweise erledigt
**Priorität:** Mittel
**Zeitrahmen:** 1–3 Monate

**Strategie:**
`bertlclaw.at` ist live, `bertlclaw.com` ist registriert und Redirect-Setup ist dokumentiert. `bertlclaw.ai` ist noch nicht registriert. Für die .com-Domain: der Redirect auf .at sollte als 301-Redirect konfiguriert werden — entweder via DNS-Weiterleitung beim Registrar oder via GitHub Pages + Custom Domain. Für .ai: die Registrierung kostet ~€60–90/Jahr (je nach Registrar) und ist angesichts des KI-Positionierungs-Elements von BertlClaw langfristig sinnvoll — aber nicht dringend. Priorität: erst .com-Redirect aktivieren, dann .ai evaluieren.

**Konkrete nächste Schritte:**
- [ ] `bertlclaw.com` Redirect aktivieren gemäß `BERTLCLAW-COM-SETUP-INSTRUCTIONS.md` (301 auf `bertlclaw.at`)
- [ ] Redirect testen: `https://bertlclaw.com` soll auf `https://bertlclaw.at` weiterleiten
- [ ] `bertlclaw.ai` bei namecheap.com oder Porkbun recherchieren (Preis, Verfügbarkeit)
- [ ] Entscheidung für .ai: wenn Preis <€80/Jahr und Name verfügbar → registrieren und ebenfalls als 301-Redirect konfigurieren

**Erfolgskriterium:**
`bertlclaw.com` leitet via 301 korrekt auf `bertlclaw.at` weiter. Entscheidung über `bertlclaw.ai` ist dokumentiert getroffen.

---

### 8.8 Tool-Kosten optimieren (nur bezahlen was genutzt wird)

**Status:** Offen
**Priorität:** Niedrig
**Zeitrahmen:** laufend

**Strategie:**
BertlClaw ist auf bewusst minimalem Stack aufgebaut: GitHub Pages (kostenlos), Formspree Free Tier, GoatCounter (kostenlos für kleine Volumina). Dieses Prinzip beibehalten. Regelmäßige Überprüfung, ob der Formspree Free Tier (50 Submissions/Monat) ausreicht — wenn das Volumen steigt, Upgrade auf Formspree Basic (~€10/Monat) oder Wechsel auf Alternative (Netlify Forms, Basin). Für professionelle E-Mail: Zoho Free als kostenlose Option prüfen, bevor kostenpflichtige Lösungen eingekauft werden. Zukünftige Tools nur einführen, wenn sie einen konkreten Prozess ersetzen oder verbessern — nicht weil sie interessant klingen.

**Konkrete nächste Schritte:**
- [ ] Aktuelle Tool-Liste vollständig dokumentieren (Name, Kosten, Nutzungsgrad, Alternative)
- [ ] Formspree-Tier prüfen: wie viele Submissions/Monat kommen rein? Genügt Free Tier noch?
- [ ] Halbjährliche Kosten-Review einrichten (alle 6 Monate: welche Tools werden wirklich genutzt?)
- [ ] Vor Einführung neuer Tools: schriftliche Entscheidung (Nutzen, Kosten, Alternative) dokumentieren

**Erfolgskriterium:**
Monatliche Tool-Kosten sind dokumentiert. Es wird kein Tool bezahlt, das nicht aktiv genutzt wird. Free-Tier-Grenzwerte sind bekannt.

---

## SECTION 9 — NETZWERK & PARTNERSCHAFTEN

---

### 9.1 Bestehendes Netzwerk aktivieren (erste Outreach-Welle)

**Status:** Offen
**Priorität:** Hoch
**Zeitrahmen:** Sofort

**Strategie:**
Die erste Akquisitionswelle kommt nicht von Fremden, sondern vom bestehenden Netzwerk — das ist statistisch belegt und im 30-Tage-Plan klar dokumentiert. Die Voraussetzungen sind bereits geschaffen: Referral-Scripts für WhatsApp, LinkedIn und E-Mail liegen fertig vor. Was fehlt, ist die Ausführung. Die Outreach-Welle sollte systematisch sein: zunächst 20–30 Kontakte in die Lead-Liste aufnehmen (Typ A: potenzielle direkte Kunden, Typ B: Multiplikatoren die empfehlen können), dann täglich 2–3 persönliche Nachrichten verschicken — keine Massenmails, keine Vorlagen ohne Personalisierung. Ein echter Gesprächsanlass (aktuelles Projekt, Beobachtung, konkrete Person die passt) erhöht die Antwortquote drastisch.

**Konkrete nächste Schritte:**
- [ ] Kontaktliste anlegen: 25–30 Personen aus Netzwerk aufschreiben (ehemalige Kollegen, Studienbekannte, Freelancer im Umfeld, lokale Betriebe)
- [ ] Kontakte in Lead-Liste eintragen mit Status = Netzwerk, Score A/B/C
- [ ] Woche 1: erste 5 Nachrichten verschicken — WhatsApp oder LinkedIn DM, personalised mit echtem Kontext
- [ ] Referral-Script als Basis nutzen, aber immer um 1–2 persönliche Sätze ergänzen
- [ ] Reaktionen in Lead-Liste tracken, Follow-up in 7 Tagen einplanen

**Erfolgskriterium:**
Innerhalb von 30 Tagen: 20+ direkte Outreach-Kontakte durchgeführt, 5+ echte Antwortgespräche geführt, mind. 1 konkreter Projektlead generiert.

---

### 9.2 LinkedIn: aktive Vernetzung in Zielgruppe

**Status:** Offen
**Priorität:** Hoch
**Zeitrahmen:** 1–2 Wochen

**Strategie:**
LinkedIn ist für B2B-Akquise im DACH-Raum der relevanteste Social-Channel — besonders für Selbstständige, Freelancer und Gründer als Zielgruppe. Aktuell ist das LinkedIn-Profil von Dominic Reisenbichler noch nicht mit BertlClaw als aktuelle Tätigkeit aktualisiert. Das ist der erste Schritt. Danach: regelmäßige Inhalte (1–2 Posts/Woche, wie im 4-Wochen-Content-Kalender vorbereitet), aktive Vernetzung mit Zielgruppenprofilen, und gezielte Kommentare bei relevanten Beiträgen. Der LinkedIn-Profil-Text ist bereits im Workspace vorbereitet.

**Konkrete nächste Schritte:**
- [ ] LinkedIn-Profil aktualisieren: BertlClaw als aktuelle Position eintragen, `bertlclaw.at` als URL
- [ ] About-Sektion mit vorbereitetem LinkedIn-Profil-Text aktualisieren
- [ ] Ersten LinkedIn-Post publizieren (aus 4-Wochen-Content-Kalender — „Was mir bei Websites von Selbstständigen auffällt")
- [ ] Täglich 5–10 neue Vernetzungsanfragen an relevante Profile (Freelancer, Gründer, Selbstständige, Coaches, Berater im DACH-Raum)
- [ ] Pro Woche 1 Post + 5–10 durchdachte Kommentare bei fremden Beiträgen (Sichtbarkeit aufbauen)

**Erfolgskriterium:**
LinkedIn-Profil zeigt BertlClaw als aktuelle Tätigkeit mit Link zur Website. Innerhalb von 4 Wochen: 4+ Posts publiziert, 100+ neue Vernetzungen, erste Profilbesuche aus Zielgruppe nachweisbar.

---

### 9.3 Komplementäre Anbieter identifizieren (Web-Entwickler, Designer, Fotografen)

**Status:** Offen
**Priorität:** Mittel
**Zeitrahmen:** 1–3 Monate

**Strategie:**
BertlClaw positioniert sich als Anbieter für Konzeption, Texte und Positionierung — nicht für technische Entwicklung oder Fotografie. Das bedeutet: es gibt natürliche Kooperationspartner, die komplementäre Leistungen erbringen und die gleiche Zielgruppe ansprechen. Ein Web-Entwickler braucht gute Texte für seine Kunden; ein Fotograf kennt viele Selbstständige, die ihre Online-Präsenz verbessern wollen; ein Business-Coach hat Klienten, die Klarheit in ihrer Kommunikation suchen. Diese Partnerschaften müssen identifiziert, angesprochen und mit einer klaren gegenseitigen Empfehlungslogik aufgebaut werden.

**Konkrete nächste Schritte:**
- [ ] Shortlist von 5–10 komplementären Anbietern im Umfeld Wien/Steiermark erstellen (LinkedIn-Suche, persönliches Netzwerk)
- [ ] Kategorien: Web-Entwickler, Grafikdesigner, Fotografen, Business-Coaches, Unternehmensberater
- [ ] 3–5 davon direkt ansprechen — nicht mit Pitch, sondern mit echtem Austausch: „Was machst du, wie läuft's, wo ist deine Zielgruppe?"
- [ ] Gemeinsame Empfehlungslogik definieren: „Ich schicke dir Kunden, die Entwicklung brauchen — du schickst mir Kunden, die Texte/Konzepte brauchen"
- [ ] Partner-Seite oder einfache Empfehlungsliste intern dokumentieren (für Kundenanfragen, die nicht ins BertlClaw-Scope passen)

**Erfolgskriterium:**
Mindestens 3 aktive Empfehlungspartnerschaften bestehen (gegenseitig, informal dokumentiert). Erste gegenseitige Empfehlung hat stattgefunden.

---

### 9.4 Empfehlungspartnerschaften aufbauen

**Status:** Offen
**Priorität:** Mittel
**Zeitrahmen:** 1–3 Monate

**Strategie:**
Empfehlungspartnerschaften unterscheiden sich von komplementären Kooperationen dadurch, dass sie aktiver und systematischer sind: ein Partner bekommt einen Anlass oder Anreiz, BertlClaw aktiv weiterzuempfehlen. Das muss nicht finanziell sein — gegenseitige Empfehlungen, öffentliche Erwähnungen oder einfach gelebte Kollegialität reichen oft aus. Die Basis ist Vertrauen und Qualität: erst wenn Partner selbst von der Qualität der BertlClaw-Arbeit überzeugt sind (idealerweise kennen sie ein Beispielprojekt), werden sie aktiv empfehlen. Daher: Partnerschaften aufbauen und pflegen — nicht nur einmalig anschreiben.

**Konkrete nächste Schritte:**
- [ ] Aus dem Netzwerk 3–5 Personen identifizieren, die als aktive Empfehler (Multiplikatoren) in Frage kommen
- [ ] Diese gezielt mit Referenz-/Proof-Materialien versorgen (Kurzbeschreibung BertlClaw, Link zu `proof.html`, Referral-Script kopierbereit)
- [ ] Partnerschaft aktiv halten: gelegentlicher Check-in, gegenseitige LinkedIn-Erwähnungen
- [ ] Bei erstem erfolgreichen Referral: Partner aktiv bedanken (persönliche Nachricht, ggf. kleine Geste)

**Erfolgskriterium:**
Mindestens 1 zahlender Kunde kam über eine Empfehlung eines Empfehlungspartners. Empfehlungspfad ist in der Lead-Liste dokumentiert.

---

### 9.5 Community-Präsenz: relevante Gruppen, Foren, Events

**Status:** Offen
**Priorität:** Niedrig
**Zeitrahmen:** 1–3 Monate

**Strategie:**
Community-Präsenz ist ein mittel- bis langfristiger Kanal — zu früh investiert, zu wenig Return. Im DACH-Raum relevante Communities für die Zielgruppe: Slack-Gruppen für Freelancer (z. B. „Freelancer Österreich", Solo-Selbstständige-Gruppen), LinkedIn-Gruppen, lokale Gründer-Events (WKO-Veranstaltungen in Steiermark, Startup-Events in Graz/Wien), Xing (für ältere DACH-Zielgruppen). Strategie: erst in 2–3 Communities aktiv werden (nicht überall gleichzeitig), wertvolle Beiträge leisten (Fragen beantworten, Erfahrungen teilen), und organisch bekannt werden — nicht mit offensichtlichem Selbst-Promotion.

**Konkrete nächste Schritte:**
- [ ] 3 relevante Communities identifizieren (z. B. LinkedIn-Gruppe „Freelancer DACH", Slack-Community für Selbstständige, WKO-Gründer-Veranstaltungen Steiermark)
- [ ] Beitreten und 2–4 Wochen aktiv Mehrwert leisten (Fragen beantworten, kommentieren) — ohne offensichtliches Selbst-Promoten
- [ ] Bei erstem passenden Event in Graz oder Wien: teilnehmen und Kurzpitch (30 Sekunden, aus Referral-Script) üben
- [ ] Community-Aktivitäten in wöchentlicher Routine einplanen (max. 30 min/Woche)

**Erfolgskriterium:**
In mindestens 2 Communities aktiv präsent. Mindestens 1 Lead aus Community-Kontakt generiert innerhalb von 3 Monaten.

---

### 9.6 Erste Kunden zu Botschaftern entwickeln

**Status:** Offen
**Priorität:** Mittel
**Zeitrahmen:** laufend

**Strategie:**
Der wertvollste Marketing-Asset eines Kleinunternehmers ist ein begeisterter Erstkunde, der aktiv weiterempfiehlt. Das setzt voraus: erstklassige Lieferqualität, persönliche Beziehung, und ein gezielter Moment, in dem um die Empfehlung gebeten wird (idealerweise direkt nach einem positiven Projekt-Abschluss). Die `proof.html`-Seite zeigt bereits Case-Beispiele — diese sollten konkret mit Kundeneinverständnis angereichert werden. LinkedIn-Testimonials und Google-Bewertungen sind weitere Botschafter-Formate. Die einfachste Frage nach Projektabschluss: „Kennst du jemanden, dem ähnliches helfen würde?"

**Konkrete nächste Schritte:**
- [ ] Nach jedem Projektabschluss: aktiv um kurzes Feedback bitten (E-Mail, 2–3 Sätze reichen)
- [ ] Feedback-Einverständnis für Verwendung auf `proof.html` einholen
- [ ] LinkedIn-Empfehlungen aktiv anfragen (LinkedIn „Empfehlung erbitten"-Funktion)
- [ ] Nach positivem Abschluss: gezielt fragen ob Kunde jemanden kennt, für den BertlClaw relevant sein könnte (Referral-Script verwenden)
- [ ] Google Business Profile anlegen (kostenlos) und erste Bewertungen einsammeln

**Erfolgskriterium:**
Mindestens 2 öffentliche Testimonials/Referenzen (auf Website oder LinkedIn) von echten Kunden. Mindestens 1 Folgeprojekt kam durch Kundenempfehlung.

---

## SECTION 10 — WACHSTUM & SKALIERUNG

---

### 10.1 Wachstumsziele 12 Monate definieren

**Status:** Offen
**Priorität:** Hoch
**Zeitrahmen:** Sofort

**Strategie:**
Ohne definierte Ziele gibt es kein Tracking und keine Kurskorrektur. Für BertlClaw sind die relevanten Dimensionen: Umsatz, Kundenzahl, Angebotsauslastung und Sichtbarkeit. Basierend auf der Long-Term-Strategy: Near-term Ziel €1.000–6.000/Monat (Projektbasis), Medium-term +€1.000–5.000/Monat (Retainer). Diese Ziele müssen auf konkrete monatliche und quartalsweise Meilensteine heruntergebrochen werden — nicht als Wunschdenken, sondern als Orientierungssystem. Wichtig: Ziele realistisch setzen (Monat 1–3 oft langsamer als erhofft) und quartalsweise anpassen.

**Konkrete nächste Schritte:**
- [ ] 12-Monats-Umsatzziel festlegen (z. B.: Q1: erster zahlender Kunde; Q2: €1.500/Monat; Q3: €3.000/Monat; Q4: €5.000/Monat)
- [ ] Kundenzahl-Ziel: wie viele aktive Projekte gleichzeitig sind realistisch als Solooperator?
- [ ] KPI-Set definieren (monatlich): Leads, Gespräche, Angebote, Abschlüsse, Umsatz — in einem einfachen Google Sheet
- [ ] Quartalsweise Review-Termin im Kalender eintragen (30 min, Zahlen durchgehen, Kurs anpassen)

**Erfolgskriterium:**
Schriftliches 12-Monats-Zieldokument mit monatlichen Umsatzmeilensteinen existiert. Monatlicher KPI-Review ist etablierte Routine.

---

### 10.2 Engpass-Analyse: wo limitiert das Wachstum?

**Status:** Offen
**Priorität:** Hoch
**Zeitrahmen:** 1–3 Monate

**Strategie:**
Wachstum wird immer durch einen spezifischen Engpass limitiert — und dieser Engpass wechselt mit jeder Wachstumsphase. In Phase 1 (jetzt) ist der Engpass wahrscheinlich Sichtbarkeit: zu wenig Menschen wissen von BertlClaw. In Phase 2 könnte es Conversion sein: Menschen kommen auf die Website, fragen aber nicht an. In Phase 3 könnte es Kapazität sein: zu viele Anfragen für einen Solooperator. Die Engpass-Analyse kann nicht theoretisch passieren — sie braucht echte Daten aus GoatCounter und der Lead-Liste. Erst nach 6–8 Wochen Datenbasis ist eine valide Analyse möglich.

**Konkrete nächste Schritte:**
- [ ] Engpass-Framework dokumentieren: die 4 möglichen Engpässe (Traffic, Conversion, Qualifizierung, Abschluss) beschreiben
- [ ] Nach 6–8 Wochen mit GoatCounter-Daten und Lead-Liste-Daten erste Analyse durchführen
- [ ] Hypothese aufstellen: welcher Engpass ist aktuell dominant?
- [ ] Auf Basis der Hypothese 1 konkrete Maßnahme testen (z. B. wenn Conversion-Problem: CTA-Wording testen)
- [ ] Ergebnis nach 4 Wochen evaluieren

**Erfolgskriterium:**
Engpass ist identifiziert, dokumentiert und es läuft mindestens eine gezielte Gegenmaßnahme. Kein blindes „überall gleichzeitig optimieren".

---

### 10.3 Erste Automatisierungen identifizieren

**Status:** Offen
**Priorität:** Mittel
**Zeitrahmen:** 1–3 Monate

**Strategie:**
Als Solooperator ist Zeit das knappste Gut. Automatisierungen sollen repetitive Aufgaben abnehmen — aber erst nachdem der manuelle Prozess klar und bewährt ist. Die vielversprechendsten Automatisierungen für BertlClaw: (1) Formspree → Google Sheets via Make (Leads automatisch erfassen), (2) Follow-up-E-Mails mit Vorlage + Calendar-Link nach erstem Gespräch, (3) Danke-Seite mit klarem Next-Step statt manuellem Bestätigungs-E-Mail. Die KI-gestützte Arbeitsweise (als Differenzierungsmerkmal) kann auch intern genutzt werden: Briefing-Auswertung, Textdrafts, Konzeptentwürfe mit KI-Unterstützung.

**Konkrete nächste Schritte:**
- [ ] Manuelle Prozesse zuerst stabilisieren (Lead-Liste, Follow-up, Angebotsprozess) — keine Automatisierung vorzeitig einbauen
- [ ] Nach 4–6 Wochen: welche Aufgabe wiederholt sich wöchentlich und kostet 30+ Minuten? → Automatisierungskandidat
- [ ] Formspree → Google Sheets via Make (kostenloser Plan, 1000 Operationen/Monat): einrichten wenn Volumen es rechtfertigt
- [ ] E-Mail-Vorlagen für häufige Kommunikationssituationen finalisieren (bereits 5 Vorlagen im Workspace — sicherstellen dass alle genutzt werden)
- [ ] KI-Tools intern nutzen: Claude für Briefing-Auswertung, Textdrafts, Strategieentwürfe — Zeitersparnis dokumentieren

**Erfolgskriterium:**
Mindestens 1 repetitive Aufgabe ist automatisiert oder deutlich vereinfacht. KI-unterstützte Arbeitsweise ist dokumentierter Teil des Produktionsprozesses.

---

### 10.4 Mögliche Kollaborationen / Subcontracting evaluieren

**Status:** Offen
**Priorität:** Niedrig
**Zeitrahmen:** 1–3 Monate

**Strategie:**
Als Solooperator ist Subcontracting der Weg, Kapazitätsgrenzen zu überwinden ohne ein eigenes Team aufzubauen. Mögliche Subcontracting-Kandidaten: Texter für Rohtext-Produktion (wenn Konzeption bei Dominic bleibt), Webentwickler für technische Umsetzung von Landingpages, Designer für visuelle Elemente. Wichtig: Subcontracting erst evaluieren wenn tatsächliche Kapazitätsprobleme entstehen — nicht vorauseilend. Und: Qualitätskontrolle und Kundenbeziehung bleiben immer bei Dominic. Erste Kollaborationen könnten auch Koautorenschaften bei Projekten sein, die den eigenen Scope überschreiten.

**Konkrete nächste Schritte:**
- [ ] Eigene Kapazitätsgrenze realistisch einschätzen: wie viele Projekte gleichzeitig sind komfortabel möglich?
- [ ] Shortlist von 2–3 potenziellen Kollaborations-Partnern (Texter, Designer, Entwickler) aus dem Netzwerk
- [ ] Bei erstem Kapazitätsengpass: gezielt einen Partner anfragen statt Auftrag ablehnen
- [ ] Klare Regel: BertlClaw-Qualitätsstandard gilt auch für Subcontractors — Briefing, Review, Freigabe immer durch Dominic

**Erfolgskriterium:**
Shortlist von Subcontracting-Kandidaten existiert. Erstes Projekt mit externer Unterstützung wurde erfolgreich abgewickelt, ohne Qualitätsverlust.

---

### 10.5 Digitale Produkte als passive Einkommensquelle prüfen

**Status:** Offen
**Priorität:** Niedrig
**Zeitrahmen:** 1–3 Monate

**Strategie:**
Digitale Produkte (Templates, Guides, Mini-Kurse) können passives Einkommen generieren und gleichzeitig als Marketing-Flywheel wirken (Lead-Magnet, Vertrauensaufbau). Für BertlClaw relevante Produkte: Landingpage-Template-Bundle (für Selbstständige die selbst umsetzen wollen), „Positionierungs-Workbook" als PDF, Mini-Kurs „Website-Texte für Freelancer selbst schreiben". Aber: digitale Produkte kosten Erstellungsaufwand und brauchen eine Audience — ohne bestehende Reichweite oder E-Mail-Liste ist der Verkaufsstart schwierig. Daher: erst Dienstleistungsgeschäft stabilisieren, dann digitale Produkte evaluieren.

**Konkrete nächste Schritte:**
- [ ] Ideen-Liste für 3–5 mögliche digitale Produkte erstellen (was wird am häufigsten gefragt? welches Problem tritt immer wieder auf?)
- [ ] Evaluation: für welches dieser Produkte gibt es die stärkste Nachfrage (aus bisherigen Gesprächen ableiten)?
- [ ] Kleinstes Minimum Viable Product identifizieren: z. B. ein 5-seitiges PDF-Guide als kostenpflichtiger Download
- [ ] Erst umsetzen wenn: regelmäßige Besucher auf der Website (>500/Monat) UND erste Dienstleistungskunden gewonnen

**Erfolgskriterium:**
Entscheidung über digitale Produkte ist getroffen und begründet dokumentiert. Falls ja: erstes Produkt ist definiert und Umsetzungsplan besteht.

---

### 10.6 Internationalisierung / englischsprachiger Markt langfristig prüfen

**Status:** Offen
**Priorität:** Niedrig
**Zeitrahmen:** laufend

**Strategie:**
`bertlclaw.com` ist registriert und kann als englischsprachige Plattform genutzt werden — das ist ein gutes Asset für die Zukunft. Der englische Markt ist deutlich größer als DACH, aber auch deutlich wettbewerbsintensiver. Für BertlClaw mit dem KI-gestützten Differenzierungsmerkmal gibt es eine mögliche internationale Nische: „AI-assisted positioning and website copy for solo founders". Das ist aber eine 18-Monats-Vision, keine unmittelbare Priorität. Jetzt: DACH-Markt solidify, erste Revenues erreichen, dann Internationalisierung mit echter Datenbasis evaluieren.

**Konkrete nächste Schritte:**
- [ ] `bertlclaw.com` als 301-Redirect auf `bertlclaw.at` konfigurieren (kurzfristig)
- [ ] In 6–12 Monaten: evaluieren ob englischsprachige Clients aus der Arbeit entstehen (z. B. über GitHub-Profil oder LinkedIn)
- [ ] Falls Interesse: Landing Page auf Englisch auf `bertlclaw.com` testen (kein Fullsite-Aufwand, nur 1 Seite)
- [ ] Entscheidungskriterium für aktive Internationalisierung: stabile €3.000+/Monat im DACH-Markt, vor dann Expansion

**Erfolgskriterium:**
Klares Trigger-Kriterium für Internationalisierung ist definiert und dokumentiert. Bis dahin: kein unnötiger Aufwand in .com-Market.

---

### 10.7 Exit-Optionen und langfristige Richtung klären (Solopreneur vs. Team)

**Status:** Offen
**Priorität:** Niedrig
**Zeitrahmen:** laufend

**Strategie:**
Die langfristige Richtung beeinflusst schon heute Entscheidungen: Wer immer Solopreneur bleiben will, optimiert auf Lifestyle und Marge — und hält den Overhead minimal. Wer langfristig ein kleines Team aufbauen will, investiert früher in Strukturen, Prozesse und Skalierbarkeit. Laut Long-Term-Strategy ist für BertlClaw in 18+ Monaten ein Setup mit 1–2 Freelancer-Kollaboratoren denkbar — aber kein klassisches Agentur-Wachstum. Exit-Optionen (Verkauf, Übernahme) sind bei Solopreneur-Brands mit personengebundener Reputation schwer — aber ein gut dokumentiertes Business mit Systemen und Kundenstamm ist prinzipiell übergebar. Jetzt: diese Frage jährlich reviewen, nicht operationalisieren.

**Konkrete nächste Schritte:**
- [ ] Persönliche Vision-Frage beantworten: Solopreneur-Lifestyle, kleines Team (3–5), oder etwas anderes?
- [ ] Antwort dokumentieren (in MEMORY.md oder separater Strategiedatei) — für Konsistenz bei künftigen Entscheidungen
- [ ] Operativer Fokus jetzt: Prozesse dokumentieren (6.1–6.8) und Qualitätsstandards definieren — das erhöht spätere Flexibilität unabhängig von der Richtungsentscheidung
- [ ] Jährliche Revisit: stimmt die Richtung noch? Welche neuen Optionen sind entstanden?

**Erfolgskriterium:**
Persönliche Langfrist-Vision ist schriftlich festgehalten. Operative Entscheidungen (Tool-Stack, Prozess-Investitionen, Pricing) sind konsistent mit dieser Vision.

---

*Dokument erstellt: 2026-04-04 | Nächstes Review empfohlen: 2026-05-01*
