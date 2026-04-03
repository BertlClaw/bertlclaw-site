# BertlClaw Legal Deployment Gate & Change Trigger System (AT/EU)

Stand: 2026-04-02

Ziel: Ein schlankes, operatives System, das verhindert, dass BertlClaw beim Wachstum versehentlich neue Rechts-/Compliance-Risiken live schaltet. Fokus: DSGVO/ePrivacy, Impressum-/Transparenzpflichten, Kontakt-/Lead-Prozesse, Dritttools, Beweisbarkeit.

Kein Ersatz für anwaltliche Beratung. Aber als internes Release-Gate direkt verwendbar.

---

## 1) Einsatzbereich

Dieses Gate ist **vor jedem Livegang** oder jeder wesentlichen Änderung zu prüfen, wenn mindestens einer dieser Punkte betroffen ist:

- Website-Inhalte oder Seitenstruktur
- neue Kontaktwege oder Lead-Prozesse
- neue Drittanbieter / SaaS / Plugins / Scripts
- Formulare / CRM / Newsletter / Automationen
- Tracking / Analytics / Ads / Consent-Mechaniken
- Testimonials / Referenzen / Cases mit Personenbezug
- Preis-/Angebotsdarstellung mit rechtlicher Außenwirkung
- neue Länder, Zielgruppen oder skalierte Vermarktung

Wenn **keiner** dieser Punkte betroffen ist und nur rein redaktionelle Textfehler korrigiert werden, genügt ein kurzer Vermerk: `No legal trigger affected`.

---

## 2) Release-Entscheidung in 4 Stufen

### GRÜN — direkt releasefähig
Nur wenn alle folgenden Aussagen stimmen:
- keine neuen Dritttools
- keine neuen Tracking-/Marketing-Funktionen
- keine neuen Datenfelder / Formänderungen
- Impressum/Datenschutz weiterhin korrekt verlinkt
- keine neuen Aussagen mit Beleg-/Freigabebedarf

### GELB — Release erst nach Dokumentations-Update
Wenn die Änderung zwar beherrschbar ist, aber Texte/Doku angepasst werden müssen, z. B.:
- neues Formularfeld
- neuer Kontaktkanal
- neuer Dienstleister ohne Consent-Pflicht, aber mit Erwähnungspflicht
- neue Speicherlogik / Weiterleitungslogik

Erforderlich vor Go-Live:
- `datenschutz.html` anpassen
- ggf. Formularhinweis anpassen
- internen Vermerk im Change-Log setzen

### ORANGE — Release erst nach Legal/Tech-Check
Wenn die Änderung wahrscheinlich stärkere DSGVO/ePrivacy-Folgen hat, z. B.:
- Analytics
- Consent-Banner / CMP
- Einbettungen (Maps, Videos, Kalender, Social)
- CRM mit Profilbildung / Lead-Scoring
- Newsletter-Tracking
- neue US-/Drittländer-Transfers

Erforderlich vor Go-Live:
- Rechts-/Tech-Prüfung
- Datenschutztext aktualisieren
- Consent-Frage sauber entscheiden
- DPA/AVV-Status dokumentieren
- erst dann live

### ROT — nicht veröffentlichen
Wenn einer der folgenden Punkte offen ist:
- neue Dritttools aktiv, aber nicht dokumentiert
- Tracking/Marketing läuft ohne belastbare Consent-Prüfung
- Kontaktformular erhebt Daten ohne passenden Hinweis
- Testimonials/Personenbezug ohne Freigabe
- Impressum/Datenschutz defekt oder nicht erreichbar
- Daten fließen an Anbieter, ohne dass Zweck/Empfänger/Rechtsgrundlage intern klar sind

---

## 3) Sofortige Legal Change Trigger

Wenn einer dieser Trigger ausgelöst wird, muss vor Veröffentlichung mindestens ein GELB- oder ORANGE-Check erfolgen.

### A. Tracking / Marketing / Reichweite
- Google Analytics / GA4
- Google Tag Manager
- Meta Pixel
- LinkedIn Insight Tag
- TikTok Pixel
- Hotjar / Microsoft Clarity / Session Recording
- A/B-Testing-Tools
- Affiliate-/Retargeting-Skripte

**Standardannahme:** ORANGE.

### B. Embeds / externe Frontend-Dienste
- YouTube / Vimeo
- Google Maps
- Calendly / Terminbuchung
- Trustpilot / Bewertungswidgets
- externe Chat-Widgets
- reCAPTCHA / Turnstile / Anti-Spam-Dienste
- externe Webfonts / Skripte / CDNs mit personenbezogenen Abrufdaten

**Standardannahme:** ORANGE.

### C. Lead-Erhebung / CRM / Automatisierung
- neue Formularfelder
- Datei-Uploads
- Pflichtfelder werden erweitert
- CRM-Anbindung
- automatische Follow-up-Mails
- Lead-Scoring
- Segmentierung nach Verhalten/Quelle
- Newsletter-Anmeldung

**Standardannahme:** GELB bis ORANGE, je nach Umfang.

### D. Kommunikationskanäle
- neuer Messenger (Telegram, Signal, etc.)
- neue Hotline / externe Call-Dienste
- Terminbuchungstools
- KI-Chat mit Server-Backend
- Social-DM-Prozesse als Leadkanal

**Standardannahme:** GELB.

### E. Inhalte mit Freigabe-/Belegbedarf
- Kundenlogos
- Testimonials
- Vorher/Nachher-Darstellungen
- Cases mit identifizierbaren Kundendaten
- Erfolgsversprechen / absolute Aussagen
- Gesundheits-/Finanz-/sonstige sensible Nähe

**Standardannahme:** GELB; bei sensiblen Daten oder aggressiven Claims ORANGE.

---

## 4) Operative Go-Live-Checkliste

Vor jedem größeren Release diese Liste abhaken.

### Block 1 — Basis-Sichtprüfung
- [ ] `impressum.html` verlinkt und erreichbar
- [ ] `datenschutz.html` verlinkt und erreichbar
- [ ] Kontaktwege auf Website stimmen mit Datenschutzerklärung überein
- [ ] keine toten/alten Rechtstexte auf Unterseiten

### Block 2 — Datenfluss
- [ ] Welche personenbezogenen Daten werden neu erhoben oder verarbeitet?
- [ ] Woher kommen sie?
- [ ] Wohin gehen sie?
- [ ] Wer empfängt sie?
- [ ] Wozu werden sie genutzt?
- [ ] Wie lange werden sie gespeichert?

Wenn eine dieser Fragen nicht beantwortbar ist: **kein Release**.

### Block 3 — Rechtsgrundlage & Transparenz
- [ ] Rechtsgrundlage intern benannt (z. B. vorvertraglich, berechtigtes Interesse, Einwilligung)
- [ ] Datenschutzerklärung enthält die reale Verarbeitung
- [ ] Erhebungspunkt-Hinweis ist vorhanden, falls nötig
- [ ] optional angebotene risikoreichere Kanäle (z. B. WhatsApp) werden transparent erklärt

### Block 4 — Drittanbieter / AVV / Transfers
- [ ] neue Tools/Dienstleister erfasst
- [ ] Privacy Policy des Anbieters geprüft
- [ ] AVV/DPA nötig? Status dokumentiert
- [ ] Drittlandtransfer-Risiko geprüft
- [ ] technische Einbindung verstanden (lädt bei Seitenaufruf? erst nach Klick? serverseitig?)

### Block 5 — Consent / ePrivacy
- [ ] setzt das Tool Cookies / Identifier oder liest Endgeräteinformationen?
- [ ] wird beim Seitenaufruf schon etwas an Dritte geladen?
- [ ] ist ein Banner / Consent vor Aktivierung nötig?
- [ ] wurde ggf. eine Zwei-Klick-Lösung statt Soforteinbettung gewählt?

Wenn unklar: **ORANGE, nicht einfach live schalten**.

### Block 6 — Aussagen / Nachweise
- [ ] Testimonials/Fotos/Fallstudien freigegeben und dokumentiert
- [ ] keine unhaltbaren Versprechen oder irreführenden Claims
- [ ] Branchen-/Spezialclaims sind belegbar

---

## 5) Minimaler Tool-Register-Standard

Sobald BertlClaw über GitHub Pages + Formspree + Basis-Kontakt hinauswächst, sollte jedes neue Tool in einer einfachen Liste erfasst werden.

Pflichtfelder pro Tool:

| Feld | Inhalt |
|---|---|
| Tool/Anbieter | Name des Dienstes |
| Funktion | Wofür wird es eingesetzt? |
| Datenarten | Welche personenbezogenen Daten sind betroffen? |
| Startpunkt | Lädt bei Seitenaufruf / nach Klick / serverseitig |
| Empfängerland | EU/EWR oder Drittland |
| Rechtsgrundlage | intern benennen |
| Consent nötig? | ja / nein / prüfen |
| Datenschutzerklärung angepasst? | ja / nein |
| DPA/AVV-Status | vorhanden / offen / nicht nötig |
| Go-Live-Freigabe | Datum + Kürzel |

---

## 6) Praktische Deployment-Gates nach Wachstumsszenario

### Szenario 1 — Neues Formular oder neue Felder
Vor Go-Live:
- Datenfelder prüfen
- `datenschutz.html` aktualisieren
- Formulartext am Erhebungspunkt prüfen
- Speicher-/Weiterleitungsweg klären

**Default:** GELB.

### Szenario 2 — Analytics / Heatmaps / Werbepixel
Vor Go-Live:
- Consent-Frage entscheiden
- Einbindung technisch prüfen
- Datenschutztext erweitern
- möglichst erst nach dokumentierter Freigabe live

**Default:** ORANGE.

### Szenario 3 — Newsletter / CRM / Automationen
Vor Go-Live:
- Double-Opt-in-/Nachweislogik prüfen
- Tracking im Mailing klären
- Empfängerlisten-/Löschlogik festlegen
- Anbieter + DPA + Transfers erfassen

**Default:** ORANGE.

### Szenario 4 — Testimonials / Cases / Kundennamen
Vor Go-Live:
- Freigabe schriftlich dokumentieren
- Umfang der Veröffentlichung prüfen
- ggf. Bild-/Namensnutzung extra absichern

**Default:** GELB.

### Szenario 5 — Chatbot mit Backend / KI-Assistenz / Gesprächsspeicherung
Vor Go-Live:
- Datenkategorien klären
- Speicherdauer klären
- Anbieter/DPA/Transfer prüfen
- Erhebungspunkt-Hinweis und Datenschutztext ergänzen
- keine sensiblen Daten ohne bewusste Prüfung

**Default:** ORANGE.

---

## 7) Fast-Decision-Tree für Releases

### Frage 1
Ändert sich ein Datenfluss, Kontaktweg oder Drittanbieter?
- Nein → meist GRÜN
- Ja → weiter zu Frage 2

### Frage 2
Wird ein externer Dienst technisch eingebunden oder werden neue personenbezogene Daten erhoben?
- Nein → meist GRÜN bis GELB
- Ja → weiter zu Frage 3

### Frage 3
Lädt der Dienst beim Seitenaufruf, setzt Cookies/Identifier oder ermöglicht Tracking/Profiling?
- Nein / nur serverseitige Anfrageabwicklung → GELB prüfen
- Ja / unklar → ORANGE

### Frage 4
Ist die Dokumentation vollständig (Datenschutz, Erhebungspunkt, Empfänger, Zweck, Rechtsgrundlage, DPA-Status)?
- Ja → nach Freigabe releasefähig
- Nein → ROT bis behoben

---

## 8) Interner Monats-Check (leichtgewichtig)

Einmal pro Monat kurz durchgehen:
- [ ] Sind alle aktuell eingebauten Tools noch im Rechtstext erfasst?
- [ ] Wurde heimlich/versehentlich ein neues Script/Embed ergänzt?
- [ ] Stimmt die Liste der Kontaktkanäle noch?
- [ ] Gibt es neue Testimonials/Kundenlogos ohne dokumentierte Freigabe?
- [ ] Nutzt jemand neue Automationen oder CRM-Felder?
- [ ] Stimmt die Datenschutzerklärung noch mit der Realität überein?

Wenn hier etwas auffällt: sofort als Change Trigger behandeln.

---

## 9) Konkrete aktuelle BertlClaw-Baseline (heute)

Nach aktuellem Workspace-Stand:
- Hosting: GitHub Pages
- Kontaktformular: Formspree
- Kontaktkanäle: E-Mail, Telefon, WhatsApp
- aktuell kein klar ersichtliches Analytics-/Pixel-/Embed-Setup im Review-Dokument

Daraus folgt operativ:
- derzeit **kein automatischer Cookie-Banner-Zwang erkennbar**, solange das technisch so bleibt
- größte künftige Trigger-Risiken: Analytics, Embeds, CRM, Newsletter-Tracking, Chat-Widgets, reCAPTCHA

---

## 10) Freigabe-Template für interne Nutzung

```text
Release/Änderung:
Datum:
Verantwortlich:

Betroffene Seiten/Tools:

Neue Datenflüsse?
- ja/nein
Wenn ja: welche?

Neue Drittanbieter?
- ja/nein
Wenn ja: welche?

Consent-/ePrivacy-Risiko?
- nein / prüfen / ja

Datenschutzerklärung angepasst?
- ja/nein

Erhebungspunkt-Hinweis angepasst?
- ja/nein/nicht nötig

AVV/DPA-Status dokumentiert?
- ja/nein/nicht nötig

Testimonials/Freigaben betroffen?
- ja/nein

Freigabestatus:
- GRÜN / GELB / ORANGE / ROT

Offene Punkte vor Go-Live:
- ...
```

---

## 11) Empfohlene nächste Anschluss-Artefakte

Wenn der Stream weiterläuft, sinnvoll als Nächstes:
1. `BERTLCLAW-TOOL-AND-PROCESSOR-REGISTER.md` — echte laufende Tool-/DPA-Liste
2. `BERTLCLAW-PRIVACY-TEXT-SYNC-CHECKLIST.md` — Abgleich zwischen Register, Erhebungspunkt und `datenschutz.html`
3. `BERTLCLAW-TESTIMONIAL-AND-REFERENCE-RELEASE-CHECK.md` — Freigaben für Cases/Logos/Reviews
4. `BERTLCLAW-NEWSLETTER-AND-CRM-COMPLIANCE-GATE.md` — falls Lead-Nurturing kommt
5. kleiner technischer Scan-Check, der eingebundene externe Domains/Scripts vor Release sichtbar macht

---

## Kurzfazit

Dieses Dokument ist das operative Stoppschild gegen "schnell noch eingebaut". Für BertlClaw ist der wichtigste Nutzen nicht abstrakte Theorie, sondern ein einfacher Standard:

- keine neuen Tools ohne Trigger-Check
- keine neuen Datenflüsse ohne Text-/Dokumentationsabgleich
- keine Tracking-/Embed-Sachen ohne ORANGE-Prüfung
- kein Release bei unklaren Empfängern, Zwecken oder Consent-Fragen
