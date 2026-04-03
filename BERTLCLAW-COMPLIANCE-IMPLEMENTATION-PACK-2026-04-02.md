# BertlClaw Compliance Implementation Pack — 2026-04-02

Praktischer Arbeitsstand für die aktuelle österreichisch/europäische Basis. Kein Ersatz für anwaltliche Beratung, aber direkt umsetzbar.

## Bereits umgesetzt im Workspace

- `index.html`
  - Pflichtnaher Datenschutzhinweis direkt am Erhebungspunkt ergänzt.
  - verpflichtende Kenntnisnahme der Datenschutzerklärung per Checkbox ergänzt.
  - Formspree-Übermittlung im Formulartext ausdrücklich benannt.
  - Hinweis ergänzt, dass sensible Inhalte besser nicht per WhatsApp geschickt werden.
  - Hidden field `_language=de` ergänzt.
- `datenschutz.html`
  - GitHub-Pages-Hostingzweck und Rechtsgrundlage konkretisiert.
  - Formspree-Abschnitt um Empfänger, Drittlandhinweis und Speicherdauer konkretisiert.
  - WhatsApp-Abschnitt um Meta-/Link-Metadatenhinweis und Speicherdauer konkretisiert.

## Aktueller Rechts-/Compliance-Status in der Praxis

### 1) Cookie-Banner / Consent-Trigger-Status

**Derzeit aus den gesichteten HTML-Dateien kein Consent-Banner zwingend erkennbar**, solange das so bleibt:
- kein Google Analytics
- kein Google Tag Manager
- kein Meta Pixel
- kein Hotjar
- kein reCAPTCHA
- keine eingebetteten Maps/Videos/Social Widgets
- kein externer Chat mit Backend
- keine Marketing-/Retargeting-Skripte
- kein Tracking über Drittfonts oder ähnliche clientseitige Einbindungen

### 2) Was sofort Consent-pflichtig neu geprüft werden muss

Wenn einer der folgenden Punkte eingebaut wird, vor Veröffentlichung neu rechtlich/technisch prüfen:

- Analytics oder Tag Manager
- Ads / Remarketing / Pixel
- YouTube, Vimeo, Google Maps, Calendly oder ähnliche Embeds
- Cookie-Consent-Tool selbst
- externe Chat-Widgets
- Newsletter-/CRM-Tracking
- A/B-Testing-Tools
- reCAPTCHA
- externe Webfonts oder Skripte, die beim Seitenaufruf Drittdaten ziehen

## Consent Trigger Matrix

| Trigger | Typisches Tool | Vor Einbau nötig | Banner/Consent wahrscheinlich? | Bemerkung |
|---|---|---|---|---|
| Webanalyse | GA4, Plausible mit Cookies, Matomo mit Cookies | Rechts-/Tech-Check | Ja, meistens ja | nur cookiefreie Setups gesondert prüfen |
| Marketing/Retargeting | Meta Pixel, Google Ads | Rechts-/Tech-Check | Ja | klare Einwilligung vor Aktivierung |
| Tag-Ausspielung | GTM | Rechts-/Tech-Check | Fast immer ja | wegen nachgelagerten Tags besonders riskant |
| Spam-Schutz | reCAPTCHA | Rechts-/Tech-Check | oft ja / zumindest intensive Prüfung | lädt Google-Ressourcen |
| Video/Maps/Widgets | YouTube, Vimeo, Maps, Social embeds | Rechts-/Tech-Check | meist ja | am besten Zwei-Klick-Lösung |
| Chat-Widget | Intercom, Crisp, Tawk etc. | Rechts-/Tech-Check | oft ja | Datenfluss + Auftragsverarbeitung prüfen |
| Newsletter-Tracking | Mailchimp, Brevo, HubSpot | Rechts-/Tech-Check | oft ja | zusätzliche Opt-in-/Dokupflichten |

## Kontakt- und Datenfluss-Map

### Besucher → Website
- Hosting: GitHub Pages
- mögliche technische Daten: IP, Zeitstempel, Browser-/Abrufdaten
- Zweck: Bereitstellung, Stabilität, Sicherheit

### Besucher → Kontaktformular
- Eingaben: Name, E-Mail, Telefon/WhatsApp optional, Thema, Rückweg, Nachricht
- Transport: Browser → Formspree → Dominic Reisenbichler
- Zweck: Anfragebearbeitung, vorvertragliche Kommunikation

### Besucher → direkte Kontaktkanäle
- E-Mail: direkter Mailkontakt
- Telefon: direkter Telefonkontakt
- WhatsApp: externer Meta-Kommunikationskanal, nicht für sensible Inhalte empfohlen

## Offene sinnvolle nächste Schritte

### A. Website / UX
- Footer auf allen Seiten weiter auf `Impressum` + `Datenschutz` konsistent halten.
- Auf Unterseiten mit besonders aggressiven WhatsApp-CTAs optional kurzen Mikrohinweis ergänzen: „Bitte keine sensiblen Daten per WhatsApp senden.“
- Danke-Seite optional um kleinen Datenschutz-/Kommunikationshinweis ergänzen.

### B. Dokumentation / Betrieb
- Vor jedem neuen Dritttool diese Fragen schriftlich abhaken:
  1. Lädt das Tool schon beim Seitenaufruf?
  2. Setzt es Cookies oder ähnliche Identifier?
  3. Gehen Daten an Drittanbieter außerhalb der Kernfunktion?
  4. Braucht es Consent vor Aktivierung?
  5. Muss `datenschutz.html` erweitert werden?
- Falls künftig echte Auftragsverarbeiter hinzukommen: Liste pflegen (Tool, Zweck, Datenarten, Rechtsgrundlage, Link zur Privacy Policy, AVV/DPA-Status).

### C. Rechtliche Härterung
- Prüfen, ob für das konkrete Angebot noch zusätzliche Unternehmensangaben bestehen (z. B. UID, Register, Kammer) — nur falls tatsächlich einschlägig.
- Bei stärkerem Leadbetrieb oder CRM-Einsatz Double-Opt-in-/Dokuniveau mitdenken.
- Vor Einbau von Testimonials/Case Studies mit Personenbezug Freigaben dokumentieren.

## Minimaler Release Gate für Compliance

Vor Livegang oder größerem Update nicht freigeben, wenn einer dieser Punkte offen ist:

- kein funktionierender Link zu `impressum.html`
- kein funktionierender Link zu `datenschutz.html`
- Formular ohne Datenschutzhinweis am Absende-Punkt
- neue Dritttools eingebaut, aber Privacy/Consent nicht nachgezogen
- WhatsApp als Kontaktkanal prominent, aber ohne Erwähnung in der Datenschutzerklärung

## Kurzfazit

Die größte unmittelbare Baustelle war nicht ein Cookie-Banner, sondern die saubere Erhebungspunkt-Transparenz und die Konkretisierung der realen Datenflüsse. Das ist jetzt im Workspace deutlich sauberer vorbereitet. Der nächste echte Risikotreiber wäre die spätere Nachrüstung von Analytics/Embeds/Marketingtools ohne erneuten Consent- und Datenschutz-Check.
