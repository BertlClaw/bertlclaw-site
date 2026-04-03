# BertlClaw Tool & Processor Register (live working version)

Stand: 2026-04-02
Owner: Dominic Reisenbichler / BertlClaw
Purpose: laufendes internes Register für tatsächlich eingesetzte und konkret geplante Tools/Verarbeitungen rund um Website, Lead-Erfassung, Kontaktkanäle und spätere Marketing-/CRM-/Chat-Erweiterungen.

Dieses Dokument ist kein juristisches Gutachten. Es ist das operative Arbeitsregister hinter `BERTLCLAW-LEGAL-DEPLOYMENT-GATE-AND-CHANGE-TRIGGERS.md`.

---

## 1) Wie dieses Register benutzt wird

### Statuslogik
- **ACTIVE** = derzeit im Einsatz / realer Datenfluss
- **APPROVED-NOT-LIVE** = bewusst vorgesehen, aber noch nicht eingebaut
- **UNDER-REVIEW** = konkret im Gespräch, vor Einsatz noch offen
- **BLOCKED** = aktuell nicht freigegeben
- **REMOVED** = früher genutzt, jetzt abgeschaltet

### Reviewlogik
Ein Eintrag muss aktualisiert werden, wenn sich eines davon ändert:
- neuer Zweck
- neue Datenfelder
- neuer Anbieter / neuer Unterauftragsverarbeiter
- neues Empfängerland / Drittlandtransfer
- Consent-Lage ändert sich
- DPA/AVV-Status ändert sich
- Tool lädt neu schon beim Seitenaufruf statt erst nach Klick / serverseitig

### Minimalregel
**Kein neues Tool live schalten, bevor mindestens eine Zeile in diesem Register ausgefüllt wurde.**

---

## 2) Felddefinitionen

| Feld | Bedeutung |
|---|---|
| Register ID | stabile interne Kurzkennung |
| Tool / Verarbeitung | Name des Dienstes oder des Kanals |
| Anbieter / Empfänger | wer die Daten erhält oder technisch verarbeitet |
| Kategorie | Hosting / Formular / Kontaktkanal / Analytics / CRM / Chat / Newsletter / Sonstiges |
| Status | ACTIVE / APPROVED-NOT-LIVE / UNDER-REVIEW / BLOCKED / REMOVED |
| Einsatzort | welche Seite / welcher Prozess |
| Zweck | warum das Tool eingesetzt wird |
| Datenkategorien | welche personenbezogenen Daten typischerweise betroffen sind |
| Betroffene Personen | Besucher, Leads, Kunden etc. |
| Trigger / Startpunkt | Seitenaufruf / nach Klick / Formular-Submit / direkte Kontaktaufnahme / intern manuell |
| Empfängerregion | AT / EU-EWR / Drittland / unklar |
| Transfer-Hinweis | SCCs / Angemessenheit / US-Bezug / offen etc. |
| Rechtsgrundlage | operative Arbeitsannahme, kein Ersatz für Rechtsberatung |
| Consent-Status | nein / ja / prüfen / nicht anwendbar |
| DPA/AVV-Status | vorhanden / offen / nicht nötig / unbekannt |
| Privacy-Text-Status | erfasst / Update nötig / vor Live anpassen |
| Speicherlogik | grobe Lösch- oder Aufbewahrungslogik |
| Owner | wer intern aufpasst |
| Nächster Review-Trigger | wann die Zeile zwingend erneut angefasst werden muss |
| Notes | knappe operative Hinweise |

---

## 3) Aktueller Register-Stand

| Register ID | Tool / Verarbeitung | Anbieter / Empfänger | Kategorie | Status | Einsatzort | Zweck | Datenkategorien | Betroffene Personen | Trigger / Startpunkt | Empfängerregion | Transfer-Hinweis | Rechtsgrundlage | Consent-Status | DPA/AVV-Status | Privacy-Text-Status | Speicherlogik | Owner | Nächster Review-Trigger | Notes |
|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|
| BCL-001 | Website-Hosting | GitHub Pages / GitHub | Hosting | ACTIVE | gesamte Website | Bereitstellung der Website, Stabilität, Sicherheit | IP-Adresse, Abrufdaten, Browser-/Zeitstempel, technische Logdaten | Website-Besucher | Seitenaufruf | Drittland / internationaler Anbieter | US-/Drittlandbezug möglich, Anbieterunterlagen beachten | berechtigtes Interesse an sicherer Bereitstellung | nein | nicht klassisch DPA-klar im Workspace dokumentiert, prüfen bei Härtung | erfasst | nach Hosting-/Providerlogik; extern nicht voll steuerbar | Dominic | Hosting-Wechsel, CDN-/Script-Änderung, neue Logik | Baseline aus Compliance-Pack und Datenschutztext |
| BCL-002 | Kontaktformular-Verarbeitung | Formspree | Formular | ACTIVE | Hauptformular auf Website | strukturierte Anfrageannahme und Weiterleitung | Name, E-Mail, Telefon/WhatsApp optional, Thema, bevorzugter Rückweg, Nachricht, technische Übermittlungsdaten | Interessenten / Leads | Formular-Submit | Drittland / internationaler Anbieter | Drittlandbezug möglich; Anbieterunterlagen und DPA separat dokumentieren | vorvertragliche Maßnahmen / Anfragebearbeitung; hilfsweise berechtigtes Interesse | nein für rein angefragte Kontaktabwicklung, aber Änderung bei Tracking/Add-ons prüfen | offen | erfasst | bis Bearbeitung und danach nach betrieblicher Löschlogik | Dominic | neue Felder, Datei-Upload, CRM-Anbindung, Autoresponder, Spam-Schutz | stärkster aktueller strukturierter Lead-Prozessor |
| BCL-003 | Direkte E-Mail-Kommunikation | Mailprovider von Dominic + beteiligte Mailserver | Kontaktkanal | ACTIVE | mailto-Links / direkte Kontaktaufnahme | individuelle Kommunikation, Anfragebearbeitung | E-Mail-Adresse, Nachricht, Signaturen, freiwillige Zusatzangaben | Interessenten / Leads / Kunden | direkte Kontaktaufnahme | EU oder Drittland je nach Mailrouting/Provider | abhängig vom konkret genutzten Mailstack | vorvertragliche Maßnahmen / berechtigtes Interesse | nicht anwendbar | offen | erfasst auf Kanalebene, Providerdetails ggf. nachziehen | nach Mailarchiv-/Postfachlogik | Dominic | Providerwechsel, Shared Inbox, Helpdesk, CRM-Sync | Im Register bewusst als echter Kanal geführt, auch wenn Providerdetails noch offen sind |
| BCL-004 | Telefonkontakt | Telefonanbieter / Netzbetreiber | Kontaktkanal | ACTIVE | Click-to-call / direkter Anruf | direkte Kommunikation und Rückruf | Telefonnummer, Gesprächsnotizen, Zeitpunkte | Interessenten / Leads / Kunden | direkte Kontaktaufnahme | EU oder Drittland unklar je nach Carrier | carrier-abhängig, hier nicht weiter ausdokumentiert | vorvertragliche Maßnahmen / berechtigtes Interesse | nicht anwendbar | nicht nötig für reinen Kanal, soweit kein externer Call-Center-Dienst | erfasst auf Kanalebene | nach betrieblicher Kontakt- und Notizlogik | Dominic | Call-Tracking, virtuelle Telefonanlage, Recording, externe Weiterleitung | Wenn Recording oder VoIP-SaaS dazukommt, neuer Eintrag nötig |
| BCL-005 | WhatsApp-Kontakt | WhatsApp / Meta | Kontaktkanal | ACTIVE | wa.me-Links und laufende Chats | niedrigschwellige Kommunikation | Telefonnummer, Profil-/Kommunikationsdaten, Nachrichteninhalte, Meta-/Link-Metadaten | Interessenten / Leads / Kunden | nach Klick / bei Nutzung des Kanals | Drittland / internationaler Anbieter | Meta-/Drittlandbezug beachten | vorvertragliche Maßnahmen / berechtigtes Interesse bei freiwilliger Kanalnutzung | nicht anwendbar für bloßen Link; keine Website-Consent-Pflicht ersichtlich, solange kein Embed/Widget lädt | nicht nötig als bloßer externer Kanal; keine AVV-Annahme | erfasst | nach Chatverlauf und betrieblicher Kommunikationslogik | Dominic | WhatsApp-Business-API, CRM-Sync, Chatbot, Multi-Agent-Zugriff | Sensible Daten aktiv vermeiden; stärkerer Hinweis sinnvoll, wenn Kanal ausgebaut wird |
| BCL-006 | Lokaler Website-FAQ-/Prefill-Chat | clientseitiges JS in Website | Chat / UX | ACTIVE | Website-Chat | Orientierung, Vorqualifizierung, ggf. Übergabe ins Formular | aktuell keine automatische Persistenz; nur bewusst übernommene Frage bei Formularübergabe | Website-Besucher | lokale Interaktion im Browser; erst bei Übernahme ins Formular wird es ein Lead | lokal im Browser; kein separater externer Empfänger erkennbar | kein externer Transfer erkennbar, solange rein clientseitig | berechtigtes Interesse an UX / freiwillige Nutzerinteraktion | nein | nicht nötig, solange kein externer Backend-Dienst | teilweise indirekt abgedeckt; Update nötig falls Chat-Felder systematisch übernommen werden | keine serverseitige Speicherung ersichtlich | Dominic | Backend-Anbindung, Chat-Logs, KI-API, LocalStorage/Cookies, Widget-Ersatz | Bei echtem AI-/Support-Chat sofort ORANGE-Trigger |
| BCL-007 | Manueller Lead-Transfer in zentrale Lead-Liste | intern, zukünftige Source of Truth z. B. Google Sheet oder lokale Tabelle | Interner Prozess / CRM-light | APPROVED-NOT-LIVE | internes Lead-Management | alle ernsthaften Leads zentral erfassen und statusfähig machen | Kontaktdaten, Kanal, Nachrichtsauszug, Status, Follow-up-Daten, Notizen | Leads / Kunden | intern manuell nach Eingang | offen | abhängig vom finalen Tool | vorvertragliche Maßnahmen / berechtigtes Interesse an Vertriebsorganisation | nein bei rein internem Register; Toolfrage separat bewerten | offen | vor Live anpassen | definierte Lösch- und Archivlogik vor Nutzung festlegen | Dominic | Auswahl des konkreten Systems, Multiuser-Zugriff, Automatisierung | Prozess gewünscht, Tool aber noch nicht final fixiert |

---

## 4) Vorbereitete Kandidaten für nächste Ausbaustufe

Diese Einträge sind absichtlich schon vorstrukturiert. Sie bleiben **nicht live**, bis Zweck, Datenfluss, Privacy-Text, Consent-Lage und DPA-Status konkret geklärt sind.

| Register ID | Tool / Verarbeitung | Anbieter / Empfänger | Kategorie | Status | Typischer Zweck | Erwartete Hauptdaten | Consent-Status | DPA/AVV-Status | Vor Live zwingend klären |
|---|---|---|---|---|---|---|---|---|---|
| BCL-101 | Webanalyse (cookiefrei/lightweight) | noch offen, z. B. Plausible / Simple Analytics / Matomo self-hosted | Analytics | UNDER-REVIEW | Reichweitenmessung, Seitenverständnis | IP/gekürzte IP, Nutzungsdaten, Seitenaufrufe, Referrer, evtl. UTM-Daten | prüfen | offen | lädt beim Seitenaufruf? cookies? Serverstandort? Self-hosted möglich? Datenschutzerklärung erweitern |
| BCL-102 | Klassische Analytics-/Tag-Layer | GA4 / GTM o. ä. | Analytics / Tag Management | BLOCKED | Marketing- und Verhaltensanalyse | Identifier, Ereignisdaten, Nutzungsprofile, Referrer, Geräteinfos | ja bzw. sehr wahrscheinlich | offen | nur nach ORANGE-Check; Consent-Mechanik, DPA und Transfers sauber dokumentieren |
| BCL-103 | CRM / Pipeline-System | noch offen, z. B. HubSpot / Pipedrive / Airtable / Notion / Google Sheets | CRM | UNDER-REVIEW | Lead-Status, Follow-ups, Angebotsverfolgung | Kontaktdaten, Kommunikationshistorie, Pipeline-Status, interne Notizen | meist nein für reine interne Verarbeitung, aber Tracking/Add-ons prüfen | offen | welches System, wo gehostet, welche Add-ons aktiv, wer hat Zugriff, Löschkonzept |
| BCL-104 | Newsletter-Tool | noch offen, z. B. Brevo / Mailchimp / ConvertKit | Newsletter | UNDER-REVIEW | Versand von Mailings / Follow-up-Sequenzen | E-Mail, Opt-in-Nachweis, Öffnungen/Klicks falls Tracking aktiv | prüfen bis häufig ja | offen | DOI, Tracking-Status, Abmeldung, Empfängerlogik, DPA, Transfers, Privacy-Text |
| BCL-105 | Terminbuchung | noch offen, z. B. Calendly / Cal.com | Scheduling | UNDER-REVIEW | Terminvereinbarung | Name, E-Mail, Terminpräferenzen, Freitext, Metadaten | oft prüfen bis ja | offen | Seitenaufruf vs. Zwei-Klick-Lösung, Kalenderzugriff, Erinnerungsmails, DPA |
| BCL-106 | Externes Chat-Widget / Live-Chat | noch offen, z. B. Crisp / Tawk / Intercom | Chat | UNDER-REVIEW | Live-Support, Lead-Erfassung | Chatinhalte, Nutzungsdaten, IP, evtl. Cookies/Identifiers | oft ja bzw. prüfen | offen | lädt sofort? speichert chats? Bot/KI? Transfers? Erhebungshinweise? |
| BCL-107 | KI-gestützter Website- oder Support-Chat mit API | noch offen, z. B. OpenAI-gestütztes Backend oder SaaS | KI / Chat | UNDER-REVIEW | automatisierte Beantwortung, Vorqualifizierung | Chatinhalte, Kontaktdaten, ggf. Gesprächsverläufe, technische Metadaten | prüfen, oft ORANGE | offen | Modellanbieter, Training-/Retention-Fragen, sensible Daten, Prompt-Logging, Transfers |
| BCL-108 | Spam-/Missbrauchsschutz | reCAPTCHA / Turnstile / alternatives Tool | Security / Formularschutz | UNDER-REVIEW | Missbrauchsreduktion | IP, Browserdaten, Verhaltens-/Risikodaten | oft prüfen | offen | ob wirklich nötig, ob datensparsamer Ersatz möglich, Datenschutzerklärung |
| BCL-109 | Social / Review / Video / Map Embeds | YouTube / Vimeo / Google Maps / Trustpilot etc. | Embed | UNDER-REVIEW | Social Proof, Lage, Medieninhalte | IP, Nutzungsdaten, Cookies/Identifiers möglich | meist prüfen bis ja | offen | Zwei-Klick-Lösung, Ladeverhalten, Consent, Privacy-Text |

---

## 5) Priorisierte To-dos aus Register-Sicht

### Sofort sinnvoll
1. **DPA/AVV-Status für Formspree konkret dokumentieren**
   - Link zur DPA/Privacy-Doku
   - Status: vorhanden / offen / nicht verfügbar
2. **Mail-Provider konkretisieren**
   - damit BCL-003 nicht nur als generischer Kanal bleibt
3. **Entscheiden, wo die zentrale Lead-Liste lebt**
   - lokales CSV / Google Sheet / Airtable / CRM
4. **Einmal pro Monat Register-Review**
   - parallel zum Legal Change Trigger Monatscheck

### Vor jedem Tool-Ausbau
- Zeile zuerst anlegen oder updaten
- dann Datenschutztext / Erhebungspunkt / Consent-Frage abgleichen
- erst danach live

---

## 6) Praktische Freigabe-Regel pro Eintrag

Ein Eintrag darf nur auf **ACTIVE** wechseln, wenn alle diese Punkte nicht mehr offen sind:
- Zweck ist konkret beschrieben
- reale Datenkategorien sind benannt
- Empfängerregion / Transferlage ist zumindest grob verstanden
- Rechtsgrundlage ist intern benannt
- Consent-Frage ist entschieden
- Privacy-Text-Status ist nicht mehr „vor Live anpassen"
- DPA/AVV-Status ist dokumentiert oder nachvollziehbar als „nicht nötig“ markiert

Wenn einer dieser Punkte fehlt: **nicht auf ACTIVE setzen**.

---

## 7) Wartungsrhythmus

### Monatlich
- prüfen, ob alle aktuell sichtbaren Tools/Kanäle erfasst sind
- prüfen, ob Seiten real mehr tun als die Registerzeilen sagen
- prüfen, ob ein UNDER-REVIEW-Tool versehentlich schon eingebaut wurde

### Bei jedem Release
- passt der Register-Stand noch zur Website?
- braucht `datenschutz.html` ein Update?
- ist ein Consent-/ePrivacy-Trigger neu entstanden?

---

## 8) Empfohlene Anschlussdatei

Für echte operative Pflege zusätzlich nutzbar:
- `bertlclaw-tool-register.csv`

Das CSV ist für Sortierung, Filter, Freigabedatum und spätere Übernahme in Google Sheets/Airtable gedacht.
