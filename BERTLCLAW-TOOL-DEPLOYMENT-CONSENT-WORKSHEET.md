# BertlClaw Tool Deployment & Consent Worksheet

Stand: 2026-04-02

Zweck: Dieses Dokument ist die praktische Ausfüllvorlage, bevor bei BertlClaw ein neues Tool, Script, Widget, CRM, Analytics-Setup oder externer Kommunikationsdienst live geht.

Es schließt die Lücke zwischen:
- `BERTLCLAW-LEGAL-DEPLOYMENT-GATE-AND-CHANGE-TRIGGERS.md`
- `BERTLCLAW-PRIVACY-TEXT-SYNC-CHECKLIST.md`
- künftigem Tool-/Processor-Register

Kein Ersatz für Rechtsberatung. Aber genau die operative Vorlage, die ein „wir bauen das schnell ein“ abbremsen soll.

---

## 1) Wann dieses Worksheet Pflicht ist

Immer ausfüllen, wenn mindestens einer dieser Fälle vorliegt:

- neues Analytics- oder Tracking-Tool
- neues CRM oder Lead-Management-System
- neues Chat-Widget oder KI-Chat
- neues Newsletter-/Automation-Tool
- neue Terminbuchung
- Spam-/Captcha-Dienst
- Karten-, Video-, Social-, Bewertungs- oder Kalender-Embed
- Pixel, Tag Manager, Session Recording, Heatmap
- neuer externer Kommunikationskanal oder Drittanbieter im Lead-Prozess
- bestehendes Tool bekommt neue Funktionen, z. B. Tracking, Profiling, Scoring oder Syncs

Wenn nur rein interne redaktionelle Website-Texte geändert werden: nicht nötig.

---

## 2) Quick outcome: Was soll am Ende feststehen?

Nach dem Ausfüllen muss für die konkrete Änderung klar sein:

- darf das Tool überhaupt live?
- wenn ja: unter welchen Bedingungen?
- braucht es Consent vor Aktivierung?
- braucht es eine Zwei-Klick-Lösung statt Sofortladen?
- muss `datenschutz.html` angepasst werden?
- braucht der Erhebungspunkt einen sichtbaren Hinweis?
- muss ein DPA/AVV geklärt werden?
- ist die Änderung **GRÜN, GELB, ORANGE oder ROT**?

Wenn diese Punkte nach dem Worksheet nicht klar sind: **kein Livegang**.

---

## 3) Tool-Steckbrief

```text
Tool-/Projektname:
Anbieter:
Geplantes Go-Live-Datum:
Verantwortlich:
Betroffene Seite(n)/Touchpoints:
Kategorie:
- Analytics
- CRM
- Chat
- Embed
- Newsletter
- Anti-Spam
- Automation
- Sonstiges: ______

Kurzbeschreibung:
Warum will BertlClaw das einsetzen?
Welches Business-Ziel wird verfolgt?
```

---

## 4) Reality Check — Was passiert technisch wirklich?

```text
1. Wann startet der Datenfluss?
- beim Seitenaufruf
- erst nach Klick
- erst nach Formular-Submit
- serverseitig im Hintergrund
- unklar

2. Welche Daten sind betroffen?
- IP-Adresse
- Gerät/Browser
- Cookie-/Identifier-Daten
- Formularangaben
- E-Mail-Adresse
- Telefonnummer
- Inhalte aus Nachrichten
- Nutzungsverhalten / Events
- Referrer / Kampagnendaten
- Sonstiges: ______

3. Was macht das Tool konkret?
- reine Anfrageweiterleitung
- Reichweitenmessung
- Conversion-Messung
- Profilbildung / Lead-Scoring
- Kommunikation mit Nutzern
- Terminorganisation
- Spam-Schutz
- Content-/Widget-Auslieferung
- Sonstiges: ______

4. Wohin fließen die Daten?
- nur zu BertlClaw / Dominic
- an externen Auftragsverarbeiter
- an Drittanbieter mit eigener Rolle
- in Drittländer / unklar

5. Speichert oder liest das Tool auf dem Endgerät?
- Cookies
- LocalStorage
- SessionStorage
- Fingerprinting / Identifier
- unklar

6. Lädt das Tool externe Ressourcen von Drittservern?
- ja
- nein
- unklar
```

**Stop-Regel:** Wenn Trigger, Datenarten, Empfänger oder Ladeverhalten unklar sind, ist der Status mindestens **ORANGE**.

---

## 5) BertlClaw Legal Classification

### A. Tool-Typ

Markiere, was am ehesten passt:

- [ ] **A1 Reine Kontaktabwicklung**  
  Beispiel: Formularweiterleitung ohne Trackinglogik
- [ ] **A2 CRM / Lead-Verwaltung**  
  Beispiel: HubSpot, Pipedrive, Airtable, Google Sheets mit Lead-Sync
- [ ] **A3 Analytics / Reichweitenmessung**  
  Beispiel: GA4, Plausible, Clarity, Hotjar
- [ ] **A4 Marketing / Retargeting / Ad Attribution**  
  Beispiel: Meta Pixel, LinkedIn Insight Tag, Google Ads Tracking
- [ ] **A5 Chat / Messenger / KI-Interaktion**  
  Beispiel: Tawk, Crisp, Intercom, AI chat backend
- [ ] **A6 Embed / externer Frontend-Dienst**  
  Beispiel: Maps, YouTube, Calendly, Trustpilot, Social embeds
- [ ] **A7 Anti-Spam / Security Service**  
  Beispiel: reCAPTCHA, Turnstile
- [ ] **A8 Newsletter / Automation / Nurturing**  
  Beispiel: Brevo, Mailchimp, ActiveCampaign

### B. Risikostufe als erste Arbeitshypothese

- A1 → meist **GELB**
- A2 → meist **GELB bis ORANGE**
- A3 → meist **ORANGE**
- A4 → fast immer **ORANGE**
- A5 → meist **ORANGE**
- A6 → meist **ORANGE**
- A7 → meist **ORANGE**
- A8 → meist **ORANGE**

---

## 6) Consent & ePrivacy Worksheet

Diese Fragen sind der Kern. Eine einzige problematische Antwort kann Consent vor Aktivierung nötig machen.

```text
1. Wird das Tool schon vor aktiver Nutzerhandlung geladen?
- ja / nein / unklar

2. Werden Cookies, Identifier oder ähnliche Endgeräteinformationen gesetzt/ausgelesen?
- ja / nein / unklar

3. Wird Nutzungsverhalten gemessen oder einem Nutzer/Besucher zugeordnet?
- ja / nein / unklar

4. Ist Reichweitenmessung, Conversion-Messung, Retargeting oder Profiling Teil des Zwecks?
- ja / nein / unklar

5. Lädt das Tool Ressourcen von Dritten schon bei bloßem Seitenaufruf?
- ja / nein / unklar

6. Wäre eine Zwei-Klick-Lösung technisch möglich?
- ja / nein / unklar

7. Kann BertlClaw das Tool bis zur Zustimmung blockieren?
- ja / nein / unklar
```

### Entscheidungsregel

Wenn bei 1, 2, 3, 4 oder 5 ein **ja** oder **unklar** steht:
- Default: **ORANGE**
- Consent-Frage aktiv entscheiden
- keine vorschnelle Freigabe
- ggf. Zwei-Klick-/Blockierlösung bevorzugen

### BertlClaw-Faustregel

- **Kontaktformular-Weiterleitung ohne Tracking** → eher GELB
- **Analytics / Heatmap / Session Recording / Pixel** → ORANGE
- **Chat-Widget mit externem Backend** → ORANGE
- **Embed, der direkt extern lädt** → ORANGE
- **CRM nur intern nach Formular-Submit** → GELB bis ORANGE

---

## 7) Datenschutztext- und UX-Folgen

Für jedes neue Tool konkret abhaken:

### A. `datenschutz.html`
- [ ] eigener Abschnitt nötig
- [ ] bestehender Abschnitt reicht, muss aber ergänzt werden
- [ ] Zwecktext ergänzen
- [ ] Datenkategorien ergänzen
- [ ] Empfänger/Anbieter ergänzen
- [ ] Drittland-/Transferhinweis ergänzen
- [ ] Speicher-/Löschlogik ergänzen
- [ ] Rechtsgrundlage intern abgestimmt

### B. Erhebungspunkt / UI / Frontend
- [ ] Hinweis direkt am Formular nötig
- [ ] Hinweis direkt am Chat-/Launcher nötig
- [ ] Hinweis direkt am CTA nötig
- [ ] Zwei-Klick-Hinweis nötig
- [ ] Consent-Banner/CMP-Anpassung nötig
- [ ] Blockierung vor Zustimmung nötig
- [ ] Warnhinweis bei sensiblen Inhalten sinnvoll

### C. Interne Doku
- [ ] Tool-/Processor-Register-Eintrag anlegen/aktualisieren
- [ ] DPA/AVV-Status dokumentieren
- [ ] Privacy Policy des Anbieters prüfen
- [ ] technisches Ladeverhalten notieren
- [ ] Review-Trigger für spätere Änderungen festhalten

---

## 8) Anbieter- und Transfer-Check

```text
Anbieter / Company:
Sitz laut aktuellem Stand:
Region:
- AT
- EU/EWR
- UK
- USA
- sonstiges Drittland
- unklar

Privacy Policy geprüft?
- ja / nein

DPA/AVV verfügbar?
- ja / nein / unklar

DPA/AVV abgeschlossen?
- ja / nein / offen

Subprocessor-/Transfer-Thema sichtbar?
- ja / nein / unklar

Bemerkungen:
- ...
```

Wenn Region, Transferlage oder DPA-Status unklar sind, nicht stillschweigend live schalten.

---

## 9) Datenminimierung für BertlClaw

Vor Freigabe kurz beantworten:

```text
Braucht BertlClaw dieses Tool wirklich?
- ja / nein / fraglich

Gibt es eine datenschutzärmere Alternative?
- nein / ja: ______

Kann der Zweck auch ohne Seitenaufruf-Tracking erreicht werden?
- ja / nein / teilweise

Kann der Dienst erst nach Klick oder Einwilligung geladen werden?
- ja / nein

Kann BertlClaw auf einzelne Datenfelder/Funktionen verzichten?
- ja / nein

Ist Lead-Scoring / Profiling wirklich nötig?
- ja / nein / aktuell nein
```

Wenn der Zweck auch einfacher, lokaler oder mit weniger Drittzugriff erreichbar ist, sollte das als bevorzugte Variante festgehalten werden.

---

## 10) Release-Freigabeformular

```text
Tool:
Datum:
Verantwortlich:

Ergebnis Consent-/ePrivacy-Check:
- kein Trigger erkennbar
- Trigger möglich
- Trigger klar vorhanden
- unklar

Datenschutztext-Anpassung:
- nicht nötig
- vor Live nötig
- offen

Erhebungspunkt-Hinweis:
- nicht nötig
- vor Live nötig
- offen

DPA/AVV:
- nicht nötig
- vorhanden
- offen

Transfer-/Anbieterlage:
- geklärt
- offen
- kritisch

Technische Einbindung verstanden:
- ja
- nein
- teilweise

Freigabestatus:
- GRÜN
- GELB
- ORANGE
- ROT

Freigabe nur unter Bedingungen:
- ...

Offene Punkte vor Live:
- ...

Freigegeben von:
```

---

## 11) Schnelle Bewertungslogik für typische BertlClaw-Fälle

### Fall 1 — Analytics-Tool für Website-Messung
Beispiele: GA4, Plausible, Clarity, Hotjar.

Fast immer prüfen:
- lädt es beim Aufruf?
- setzt es Cookies/Identifier?
- misst es Verhalten / Conversions?
- braucht es Banner/Consent?
- passt `datenschutz.html` schon?

**Default:** ORANGE.

### Fall 2 — CRM nach Formular-Submit
Beispiele: HubSpot, Pipedrive, Airtable, Google Sheet.

Prüfen:
- kommt das CRM nur nach aktiver Anfrage ins Spiel oder schon davor?
- gibt es Profiling / Lead-Scoring?
- wer hat Zugriff?
- was steht in `datenschutz.html` und im Register?

**Default:** GELB bis ORANGE.

### Fall 3 — Chat-Widget auf der Seite
Beispiele: Crisp, Intercom, Tawk, AI chat.

Prüfen:
- lädt der Launcher schon beim Seitenaufruf?
- werden Metadaten schon ohne Chat-Start übertragen?
- wird Konversation gespeichert/trainiert?
- ist ein Hinweis direkt am Chat sinnvoll?

**Default:** ORANGE.

### Fall 4 — Calendly / Maps / YouTube / Trustpilot Embed
Prüfen:
- Sofortladung oder Zwei-Klick?
- externer Drittaufruf schon vor Interaktion?
- Consent nötig?
- Transparenztext vorhanden?

**Default:** ORANGE.

### Fall 5 — reCAPTCHA / Anti-Spam
Prüfen:
- lädt Google/Cloudflare schon beim Formularaufruf?
- gibt es datenschutzärmere Alternativen?
- ist Consent-/Blockierfrage sauber geklärt?

**Default:** ORANGE.

### Fall 6 — Newsletter-Tool mit Öffnungs-/Klicktracking
Prüfen:
- Double-Opt-in
- Tracking standardmäßig aktiv?
- DPA/Transfers
- Abmeldung, Löschung, Speicherdauer

**Default:** ORANGE.

---

## 12) BertlClaw-No-Go-Liste

Nicht live schalten, wenn einer dieser Punkte offen bleibt:

- [ ] niemand kann erklären, was das Tool technisch wirklich tut
- [ ] unklar, ob es schon beim Seitenaufruf Drittanfragen auslöst
- [ ] Tool misst Verhalten oder setzt Identifier, aber Consent-Frage wurde nicht entschieden
- [ ] Tool ist real eingebaut, aber `datenschutz.html` bleibt alt
- [ ] Tool ist real eingebaut, aber Register/Doku fehlt
- [ ] Anbieter-/Transferlage ist unklar
- [ ] Chat-/Formular-/CTA-Hinweis wäre nötig, fehlt aber
- [ ] BertlClaw will „später noch die Rechtstexte machen“

---

## 13) Minimaler Workflow für die Praxis

1. Tool-Idee entsteht  
2. Dieses Worksheet ausfüllen  
3. Risikostufe festlegen  
4. `BERTLCLAW-PRIVACY-TEXT-SYNC-CHECKLIST.md` durchgehen  
5. Register-Eintrag anlegen/aktualisieren  
6. `datenschutz.html` / UI / Consent-Logik anpassen  
7. erst dann live

---

## 14) Empfohlene Ablage pro Tool-Entscheidung

Wenn BertlClaw das sauber betreiben will, kann pro größerem Tool eine kurze Notiz nach diesem Muster gespeichert werden:

```text
2026-04-xx — Tool-Freigabe: [Toolname]
Status: GRÜN / GELB / ORANGE / ROT
Kurzbegründung:
Consent nötig?:
DPA/AVV-Status:
Datenschutztext angepasst?:
Erhebungspunkt angepasst?:
Nächster Review-Trigger:
```

So bleibt später nachvollziehbar, warum etwas freigegeben oder gestoppt wurde.

---

## Kurzfazit

Dieses Worksheet ist der praktische Freigabebogen für BertlClaw-Wachstum. Es ist besonders relevant, sobald Analytics, CRM, Chat, Newsletter, Captcha, Embeds oder Tracking-Ideen dazukommen. Ziel ist nicht Bürokratie, sondern ein klarer Standard:

- erst verstehen
- dann klassifizieren
- dann Consent-/Textfolge klären
- dann dokumentieren
- dann live
