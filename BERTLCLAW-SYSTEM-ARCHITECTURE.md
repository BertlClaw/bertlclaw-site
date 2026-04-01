# BertlClaw System Architecture (pragmatisch, low complexity)

## Kurzfazit
Die aktuelle BertlClaw-Website ist bereits als **einfacher Lead-Einstieg** brauchbar:
- **Hosting:** GitHub Pages
- **Primäres Formular:** Formspree (`xnjoapve`)
- **Alternative Einstiegskanäle:** E-Mail, Telefon, WhatsApp
- **Website-Chat:** rein clientseitiger FAQ-/Prefill-Chat, **kein echter Konversationskanal mit Speicherung**
- **Nachgelagerte Lead-Bearbeitung:** derzeit dokumentiert, aber noch nicht als einheitliche operative Datenbasis umgesetzt

Die größte Lücke ist nicht Design oder Copy, sondern **Systemklarheit**:
1. Wo entsteht ein Lead offiziell?
2. Was ist die **Source of Truth**?
3. Wie wird Herkunft / Kanal / Thema konsistent erfasst?
4. Wie verhindert man, dass WhatsApp / Mail / Formular / Chat nebeneinander herlaufen?

---

## 1. Audit des aktuellen Stacks

### Was aktuell schon gut ist
- Die Website funktioniert statisch und passt gut zu GitHub Pages.
- Das Formular ist niedrigschwellig und ausreichend kurz.
- Formspree ist für kleines Lead-Volumen vollkommen okay.
- Die Danke-Seite ist vorhanden.
- WhatsApp / Telefon / E-Mail sind sichtbar und mobil gut nutzbar.
- Der Chat hilft bei Einordnung und kann Nutzer ins Formular schieben.

### Was aktuell technisch passiert
#### Website
- `index.html` enthält das Hauptformular.
- Formular geht an Formspree:
  - `action="https://formspree.io/f/xnjoapve"`
- Nach erfolgreichem Submit geht es auf:
  - `danke.html`

#### Formularfelder aktuell
- Name
- E-Mail
- Telefon / WhatsApp (optional)
- Thema
- bevorzugter Rückweg
- Nachricht
- versteckte Felder:
  - `_subject`
  - `_next`

#### Chat
- Der Chat ist derzeit **kein persistenter Chat mit Backend**.
- Er ist ein lokales JS-Wissensmodul mit vordefinierten Antworten.
- Eine Nutzerfrage wird nur dann Teil des Lead-Flows, wenn der Nutzer:
  - auf **"Frage ins Formular übernehmen"** klickt, oder
  - zu WhatsApp / Mail / Telefon wechselt.
- Es gibt aktuell **keine automatische Speicherung von Chat-Interaktionen**.

#### Tracking / Attribution
- Ich sehe aktuell **kein Analytics-/Attribution-Setup** in den HTML-Dateien.
- Keine UTM-Erfassung im Formular.
- Keine erkennbare Speicherung von Landingpage / Referrer / Erstquelle.

---

## 2. Architekturproblem in einem Satz
Aktuell gibt es **mehrere Eingangskanäle**, aber noch **keine explizit definierte operative Lead-Quelle**, in der alle Anfragen zuverlässig zusammenlaufen.

---

## 3. Empfohlene Zielarchitektur (bewusst einfach)

## Prinzip
Nicht sofort CRM einführen.
Erst ein **sauberes Mini-System** bauen:

### Öffentlich / Frontend
- **GitHub Pages** bleibt Website-Host
- **Formspree** bleibt Formular-Backend
- **Chat** bleibt leichtgewichtig und clientseitig

### Operativ / intern
- **Eine zentrale Lead-Liste** als Source of Truth
- Manuelle oder halbmanuelle Übernahme aller Leads in diese Liste
- E-Mail / WhatsApp / Telefon bleiben Kommunikationskanäle, aber **nicht** die Datenbasis

### Empfohlene Source of Truth
Für die aktuelle Phase am sinnvollsten:
- **Google Sheet** oder
- eine einfache tabellarische Datei, die später in Google Sheet übernommen wird

Warum nicht sofort CRM?
- zu früh
- zu viel Admin
- kein klarer Mehrwert bei kleinem Volumen
- Formspree + Sheet + klare SOP reicht vorerst

---

## 4. Klare Systemrollen

### GitHub Pages
**Rolle:** statische Präsentation und Einstiegspunkt

### Formspree
**Rolle:** nimmt strukturierte Website-Anfragen entgegen

### WhatsApp / Telefon / direkte E-Mail
**Rolle:** alternative Einstiegskanäle für Menschen, die keinen Formularflow wollen

### Website-Chat
**Rolle:** Vorqualifizierung, Einordnung, Reibung senken

### Zentrale Lead-Liste
**Rolle:** einzig verbindliche interne Übersicht aller Leads

### Dominic / operative Bearbeitung
**Rolle:** Qualifizierung, Antwort, Follow-up, Abschluss

---

## 5. Source-of-Truth-Empfehlung

## Empfehlung
**Die zentrale Lead-Liste ist die Source of Truth.**

Nicht:
- das Postfach
- nicht WhatsApp
- nicht Formspree allein
- nicht der Chat

### Warum?
Weil nur dort der Lead-Zustand sauber geführt werden kann:
- Neu
- Qualifiziert
- Wartet auf Antwort Kunde
- Angebot offen
- Gewonnen
- Verloren / nicht passend

### Minimale Pflichtregel
**Jede ernsthafte Anfrage wird innerhalb weniger Minuten oder spätestens am selben Tag in die Lead-Liste eingetragen.**

Das ist wichtiger als jede neue Software.

---

## 6. Lead Routing: empfohlene Logik

## Eingangskanal → Routing

### A. Website-Formular
Flow:
1. Besucher sendet Formular
2. Formspree liefert Nachricht per Mail / Dashboard
3. Lead wird in Lead-Liste eingetragen
4. Kanal = `Website-Formular`
5. Seite / Thema / Quelle mit erfassen
6. Antwort senden

### B. WhatsApp
Flow:
1. Nachricht kommt direkt auf WhatsApp
2. Lead sofort in Lead-Liste eintragen
3. Kanal = `WhatsApp`
4. Kurzinhalt + gewünschter Rückweg notieren
5. Status setzen

### C. E-Mail direkt
Flow:
1. Mail kommt direkt rein
2. Lead in Lead-Liste eintragen
3. Kanal = `E-Mail direkt`

### D. Telefon / verpasster Anruf
Flow:
1. Lead in Liste
2. Kanal = `Telefon`
3. Rückruf / WhatsApp / Mail dokumentieren

### E. Website-Chat
Wichtig:
- Der Chat selbst ist aktuell nur ein Helfer.
- Erst wenn die Person ins Formular / WhatsApp / Mail wechselt, entsteht ein belastbarer Lead.

Daher pragmatische Regel:
- **Chat ohne Übergabe = noch kein Lead in der zentralen Liste**
- **Chat mit Formularübernahme = Lead-Kanal `Website-Chat → Formular`**

---

## 7. Tracking: was jetzt sinnvoll ist und was noch nicht

## Was aktuell fehlt
- keine UTM-Erfassung
- keine Seitenquelle pro Lead
- keine dokumentierte Erstquelle bei Chat-/WhatsApp-Wechseln

## Was ich jetzt empfehlen würde
### Sofort sinnvoll
1. **UTM-Parameter im Formular mit erfassen**
   - `utm_source`
   - `utm_medium`
   - `utm_campaign`
   - optional `utm_content`
2. **Landingpage / Seitenpfad mitgeben**
   - z. B. `page_path`
3. **Referrer mitgeben**
   - wenn vorhanden
4. **Chat-Herkunft markieren**
   - z. B. `lead_entry=chat_to_form`
5. **Danke-Seite als Conversion-Ziel beibehalten**

### Noch nicht nötig
- vollwertiges Marketing-Automation-System
- komplexes Event-Tracking
- schweres CRM
- Multi-step Funnel-Analytics

---

## 8. Konkrete Low-Complexity-Implementierung

## Phase 1 — sofort
### 1. Lead-Liste verbindlich anlegen
Empfohlen als Google Sheet mit Spalten:
- created_at
- lead_id
- status
- score
- name
- company
- email
- phone
- preferred_contact
- topic
- message
- source_channel
- source_detail
- landing_page
- referrer
- utm_source
- utm_medium
- utm_campaign
- utm_content
- next_step
- next_followup_date
- last_contact_at
- owner
- notes

Im Workspace liegt dafür schon eine CSV-Vorlage:
- `bertlclaw-leads-template.csv`

### 2. Eingangskanäle hart definieren
Vokabular nicht jedes Mal neu erfinden. Nur feste Werte nutzen:
- `Website-Formular`
- `Website-Chat -> Formular`
- `WhatsApp`
- `E-Mail direkt`
- `Telefon`
- `Empfehlung / Netzwerk`

### 3. Source Detail mitschreiben
Beispiele:
- `index.html kontaktformular`
- `services.html whatsapp-link`
- `landingpages.html chat-prefill`
- `persoenliche-empfehlung`

---

## Phase 2 — kleine technische Ergänzungen auf der Website
### 4. Hidden Fields für Attribution ergänzen
In `index.html` im Formular ergänzen:
- `page_path`
- `page_title`
- `referrer`
- `utm_source`
- `utm_medium`
- `utm_campaign`
- `utm_content`
- `lead_entry`

Per kleinem Inline-Script beim Laden befüllen.

### 5. Chat → Formular sauber markieren
Wenn aus dem Chat ins Formular übernommen wird, zusätzlich setzen:
- `lead_entry = chat_to_form`
- optional `chat_question = ...`

Wichtig: nur die vom Nutzer bewusst übergebene Nachricht speichern, nicht heimlich den ganzen Chat.

### 6. WhatsApp-Link optional mit Vorbefüllung
Beispielhaft:
- "Hallo, ich komme über die BertlClaw-Website und interessiere mich für {Thema}."

Damit im WhatsApp-Verlauf die Website-Herkunft sofort sichtbar ist.

---

## Phase 3 — erst wenn Volumen steigt
### Dann sinnvoll
- Formspree → Google Sheets / Zapier / Make Automatisierung
- Kalenderlink für qualifizierte Leads
- einfache Lead-Pipeline in Airtable / Notion / CRM

### Noch immer vermeiden, solange unnötig
- HubSpot-/Salesforce-Denken bei Mini-Volumen
- komplexe Scoring-Modelle
- kanalabhängige Sonderprozesse

---

## 9. Konkrete Empfehlung zur Systemarchitektur

## Empfohlenes Betriebsmodell
### Public stack
- GitHub Pages
- statische HTML-Seiten
- Formspree
- leichter JS-Chat

### Internal ops stack
- Google Sheet als Lead-Register
- E-Mail / WhatsApp für Kommunikation
- manuelle SOP aus `LEAD-WORKFLOW.md`

### Architektur in einem Satz
**Website und Formspree erzeugen Anfragen; die Lead-Liste ist die operative Wahrheit; Kommunikation läuft über E-Mail/WhatsApp/Telefon.**

---

## 10. Wichtigste nächsten Schritte in sinnvoller Reihenfolge

## Jetzt als Nächstes tun
1. **Lead-Liste tatsächlich anlegen und benutzen**
   - nicht nur dokumentieren
2. **Feste Kanalwerte definieren**
   - für konsistente Einträge
3. **Attribution-Hidden-Fields im Formular ergänzen**
4. **Chat-zu-Form explizit kennzeichnen**
5. **Danke-Seite optional um nächsten Erwartungsschritt ergänzen**
   - z. B. "Rückmeldung üblicherweise innerhalb von 24h"

## Danach
6. Prüfen, ob Formspree-Mailbenachrichtigungen für den Workflow reichen
7. Wenn nicht: einfache Automatisierung ins Sheet
8. Erst dann über CRM nachdenken

---

## 11. Meine klare Empfehlung
Wenn BertlClaw in den nächsten Wochen nur wenige bis moderate Leads erwartet, ist die beste Architektur:

- **GitHub Pages beibehalten**
- **Formspree beibehalten**
- **Chat beibehalten, aber als Einordnungshelfer verstehen**
- **ein einziges Lead-Sheet als Source of Truth einführen**
- **UTM- und Seitenquelle leicht nachrüsten**
- **keine zusätzliche Komplexität einbauen, bevor die manuelle Disziplin sauber funktioniert**

Das ist robust, billig, wartbar und passt zum aktuellen Reifegrad deutlich besser als ein zu frühes CRM.
