# BertlClaw Manual Retest Pack — Contact / Mobile / Reminder Reliability

Stand: 2026-04-02

Zweck: exaktes manuelles Retest-Paket für die Punkte, die lokal vorbereitet wurden, aber teilweise echte manuelle Live-Bestätigung brauchen.

---

## 1. Blocker zuerst: BCQA-001 — echte Formular-Zustellung bestätigen

### Testumgebung
- Live oder Preview-URL der aktuellen Website
- Desktop **und** Mobile mindestens einmal
- Zugriff auf Formspree oder Ziel-Mailbox

### Exakte Testdaten
- Name: `BertlClaw QA Test`
- E-Mail: kontrollierte Testadresse
- Telefon / WhatsApp: `+43 660 0000000` oder leer
- Thema: `Allgemeine Anfrage`
- Bevorzugte Rückmeldung: `E-Mail`
- Nachricht: `Testanfrage BertlClaw QA 2026-04-02 – bitte ignorieren.`

### Schritte
1. `index.html#kontakt` öffnen
2. alle Felder mit obigen Daten füllen
3. Formular absenden
4. prüfen, ob Redirect auf `danke.html` erfolgt
5. Formspree/Mailbox öffnen
6. prüfen, ob Nachricht real angekommen ist
7. Inhalt mit Testdaten abgleichen

### PASS
- kein JS-/Netzwerkfehler sichtbar
- Redirect auf `danke.html`
- reale Zustellung vorhanden
- Inhalt vollständig und korrekt

### FAIL-Kategorien
- Validation fail
- Submit/Network fail
- Redirect fail
- Delivery fail

### Retest-Notizvorlage
- Datum/Zeit:
- URL:
- Gerät:
- Ergebnis:
- Evidence:
- Folgeaktion:

---

## 2. BCQA-004 — Real-Device Mobile Collision Retest (Chat / Sticky CTA / Kontaktbereich)

### Pflicht-Geräte / Größen
- iPhone-ähnliches Gerät (`390x844`)
- Android-ähnliches Gerät (`360x800`)

Nur Emulator reicht hier nicht als Abschlussbeweis — mindestens ein echter Handset-Run mit Screenshot oder Screen Recording.

### Pflicht-Seiten
1. `services.html`
2. `landingpage-sprint.html`
3. `digital-clarity-setup.html`

### Einheitliche Testnachricht
`Ich möchte kurz prüfen, ob meine Nachricht sauber ins Kontaktformular übernommen wird.`

### Schritte pro Seite
1. Seite im Mobile-Viewport öffnen
2. bis erste sinnvolle CTA/Chat-Nähe scrollen
3. Chat öffnen
4. Testnachricht eingeben
5. `Projekt anfragen` klicken
6. prüfen, ob Redirect zu `index.html?chat=...#kontakt` erfolgt
7. prüfen, ob Kontaktsektion direkt sichtbar ist
8. prüfen, ob Nachricht im Feld `Nachricht` übernommen wurde
9. prüfen, ob Sticky-Bar / Chat / Floating-Elemente etwas verdecken
10. subjektiv bewerten: wirkt der Übergang klar oder irritierend?

### UX-Fragen, die explizit beantwortet werden sollen
- Versteht man sofort, warum man auf die Startseite springt?
- Ist die übernommene Nachricht direkt sichtbar genug?
- Fühlt sich der Flow wie eine Fortsetzung oder wie ein Bruch an?
- Verdeckt auf Mobile etwas Relevantes den Kontaktbereich?

### PASS
- Redirect/Handoff klappt
- Prefill klappt, falls dieser Pfad genutzt wird
- Kontaktbereich ist sofort nutzbar
- kein relevanter Mobile-Overlap auf echtem Gerät
- Screenshot/Video zeigt, dass keine wichtigen Controls verdeckt sind
- Flow wirkt verständlich

### PARTIAL
- technisch okay, aber UX wirkt überraschend oder leicht verwirrend

### FAIL
- Redirect/Prefill bricht
- Nutzer landet nicht sichtbar bei `#kontakt`
- UI verdeckt wichtige Inhalte/Bedienelemente

### Retest-Protokoll pro Seite
- Seite:
- Viewport:
- Redirect: pass/fail
- Prefill: pass/fail
- Kontakt sofort sichtbar: yes/no
- UI-Overlap: yes/no
- UX-Eindruck: klar / partial / fail
- Notizen:

---

## 3. BCQA-003 — Schema Hygiene Quick Retest

### Ziel
Sicherstellen, dass auf der Startseite keine irreale SearchAction mehr behauptet wird.

### Schritte
1. `index.html` öffnen
2. JSON-LD prüfen
3. `WebSite`-Objekt prüfen
4. bestätigen, dass **kein** `SearchAction` mehr vorhanden ist
5. auf kaputte JSON-Syntax achten

### PASS
- kein `SearchAction`
- JSON-LD weiterhin sauber/parst plausibel

---

## 4. BCQA-002 / BCQA-006 — Reminder + Audit Retest

### Lokal vorbereitete Artefakte
- `bertlclaw-tools/reminder-heartbeat.js`
- `bertlclaw-tools/reminder-audit.js`
- `state/bertlclaw-reminders.json`
- `qa-artifacts/reminder-audit/latest.json`

### Lokale Ausführung
```bash
node bertlclaw-tools/reminder-heartbeat.js
node bertlclaw-tools/reminder-audit.js --hours=6
```

### Was geprüft werden soll
- erzeugt der Heartbeat maschinische Zustandsdaten?
- entstehen konsistente Logeinträge?
- meldet der Audit fehlende Stundenfenster reproduzierbar?
- ist die nächste erwartete volle Stunde sichtbar?

### PASS
- State-Datei wird fortgeschrieben
- Logeinträge entstehen mit klarer Typisierung
- Audit report wird geschrieben
- fehlende Stunden sind maschinisch sichtbar

---

## 5. Empfohlene Ticket-Status nach Retest
- `BCQA-001` → `retested_pass` nur bei echter Zustellungsbestätigung in Formspree/Mailbox, sonst `blocked_manual_access` oder `retested_fail`
- `BCQA-003` → `retested_pass`, wenn SearchAction weg und JSON-LD sauber
- `BCQA-004` → `retested_pass` / `partial` / `retested_fail` je Real-Device-Collision-Ergebnis
- `BCQA-005` → `retested_pass` / `partial` / `retested_fail` je Proof-Visibility-Ergebnis
- `BCQA-002` → `ready_for_retest`, sobald Heartbeat lokal bestätigt ist
- `BCQA-006` → `ready_for_retest`, sobald Audit report lokal bestätigt ist
