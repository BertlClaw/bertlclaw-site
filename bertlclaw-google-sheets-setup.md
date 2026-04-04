# BertlClaw Lead-Liste — Google Sheets Setup Guide

Interne Arbeitsanleitung für das Lead-Management in Google Sheets.

---

## 1. Tabellenstruktur — Spalten & Beschreibungen

Erstelle ein Sheet mit folgenden Spalten (in dieser Reihenfolge, Zeile 1 = Header):

| Spalte | Header | Beschreibung |
|--------|--------|--------------|
| A | created_at | Datum, wann der Lead eingegangen ist (Format: YYYY-MM-DD) |
| B | lead_id | Fortlaufende ID, z. B. BC-001, BC-002 usw. |
| C | status | Aktueller Status im Prozess (Dropdown) |
| D | score | Qualifizierungsbewertung A / B / C (Dropdown) |
| E | name | Vor- und Nachname der Person |
| F | company | Unternehmen oder Projektname (falls vorhanden) |
| G | email | E-Mail-Adresse |
| H | phone | Telefonnummer |
| I | preferred_contact | Bevorzugter Kontaktweg: E-Mail / WhatsApp / Telefon / LinkedIn |
| J | topic | Kurzes Thema / Stichwort des Anliegens (z. B. "Landingpage", "Positionierung") |
| K | message_summary | Zusammenfassung der ersten Nachricht / des Anliegens in 1-3 Sätzen |
| L | source_channel | Woher kam der Lead (Dropdown) |
| M | source_detail | Konkrete Quelle, z. B. "Google-Suche", "Empfehlung von Max M.", "LinkedIn-Post vom 2026-03-15" |
| N | landing_page | Welche Seite hat der Lead zuerst gesehen / von welcher Seite kam das Formular |
| O | utm_source | UTM Source-Parameter (falls vorhanden) |
| P | utm_medium | UTM Medium-Parameter (falls vorhanden) |
| Q | utm_campaign | UTM Campaign-Parameter (falls vorhanden) |
| R | next_step | Was ist der konkrete nächste Schritt (z. B. "Angebot schicken", "Rückruf Mo 14h") |
| S | next_followup_date | Datum des nächsten geplanten Follow-ups (Format: YYYY-MM-DD) |
| T | last_contact_at | Datum des letzten Kontakts (Format: YYYY-MM-DD) |
| U | notes | Freie Notizen, Gesprächsnotizen, Besonderheiten |
| V | won_lost_reason | Warum gewonnen oder verloren? Kurze Begründung |

---

## 2. Dropdown-Werte

### Status (Spalte C)
```
Neu
Qualifiziert
In Gespräch
Angebot gesendet
Gewonnen
Verloren
Nicht passend
```

### Score (Spalte D)
```
A – sofort qualifiziert
B – interessant, noch unklar
C – eher nicht passend
```

### Source Channel (Spalte L)
```
Website-Formular
Website-Chat→Formular
WhatsApp
E-Mail direkt
Telefon
Empfehlung
LinkedIn
Sonstige
```

---

## 3. Conditional Formatting — Farbschema

| Bedingung | Farbe | Beschreibung |
|-----------|-------|--------------|
| Status = Neu | Gelb (#FFF9C4) | Neue Leads, noch nicht bearbeitet |
| Status = Gewonnen | Grün (#C8E6C9) | Abgeschlossene, gewonnene Deals |
| Status = Verloren | Grau (#E0E0E0) | Nicht konvertierte Leads |
| Status = Nicht passend | Grau (#E0E0E0) | Qualifiziert als nicht relevant |
| next_followup_date = heute | Orange (#FFE0B2) | Heute fällige Follow-ups |

---

## 4. Schritt-für-Schritt-Setup-Anleitung

### Schritt 1: Neues Google Sheet anlegen
1. Öffne [sheets.google.com](https://sheets.google.com)
2. Erstelle ein neues leeres Sheet
3. Benenne es: **BertlClaw Leads 2026**
4. Benenne das erste Tab unten: **Leads**

### Schritt 2: Header-Zeile anlegen
1. Klicke auf Zelle A1
2. Gib alle 22 Spaltenheader ein (wie oben in Tabelle angegeben)
3. Markiere Zeile 1 → **Fett** formatieren
4. Fixiere die erste Zeile: Menü → Ansicht → Zeilen und Spalten fixieren → 1 Zeile fixieren
5. Setze Spaltenbreiten angemessen (Doppelklick auf Spaltenrand zum Auto-Fit)

### Schritt 3: Dropdowns erstellen

**Status-Dropdown (Spalte C):**
1. Spalte C markieren (ab C2 bis C500)
2. Menü → Daten → Datenvalidierung
3. Kriterien: **Liste aus einem Bereich** oder **Liste von Elementen**
4. Bei „Liste von Elementen" eingeben:
   ```
   Neu,Qualifiziert,In Gespräch,Angebot gesendet,Gewonnen,Verloren,Nicht passend
   ```
5. „Ungültige Daten anzeigen" → Warnung
6. Speichern

**Score-Dropdown (Spalte D):**
1. Spalte D markieren (ab D2 bis D500)
2. Datenvalidierung → Liste von Elementen:
   ```
   A – sofort qualifiziert,B – interessant noch unklar,C – eher nicht passend
   ```

**Source Channel-Dropdown (Spalte L):**
1. Spalte L markieren (ab L2 bis L500)
2. Datenvalidierung → Liste von Elementen:
   ```
   Website-Formular,Website-Chat→Formular,WhatsApp,E-Mail direkt,Telefon,Empfehlung,LinkedIn,Sonstige
   ```

### Schritt 4: Conditional Formatting einrichten

**Status = Neu → Gelb:**
1. Gesamte Zeile markieren (A2:V500 oder eine einzelne Spalte als Trigger)
   - Tipp: Markiere A2:V2, halte Shift und markiere bis V500
2. Menü → Format → Bedingte Formatierung
3. **Regeln auf Bereich:** A2:V500
4. Formatierungsregel: „Benutzerdefinierte Formel"
5. Formel: `=$C2="Neu"`
6. Farbe: Gelb (#FFF9C4)

**Status = Gewonnen → Grün:**
1. Gleicher Bereich, neue Regel hinzufügen
2. Formel: `=$C2="Gewonnen"`
3. Farbe: Grün (#C8E6C9)

**Status = Verloren oder Nicht passend → Grau:**
1. Neue Regel
2. Formel: `=OR($C2="Verloren",$C2="Nicht passend")`
3. Farbe: Hellgrau (#E0E0E0)

**Followup heute → Orange (Spalte S):**
1. Bereich: S2:S500
2. Formatierungsregel: „Datum ist" → „heute"
   - oder benutzerdefinierte Formel: `=$S2=TODAY()`
3. Farbe: Orange (#FFE0B2)

### Schritt 5: Hilfs-Tab für Referenzwerte (optional, aber empfohlen)
1. Erstelle ein zweites Tab: **Referenz**
2. Trage dort alle Dropdown-Werte in separaten Spalten ein
3. Diese kannst du dann als „Liste aus einem Bereich" für die Datenvalidierung nutzen — einfacher zu pflegen

### Schritt 6: Header-Zeile einfrieren und Ansicht optimieren
1. Zeile 1 einfrieren (Ansicht → Zeilen fixieren → 1 Zeile)
2. Optional: Filter aktivieren für alle Spalten (Menü → Daten → Filter erstellen)
3. Spaltenbreiten anpassen

---

## 5. Täglicher Workflow

### Morgens (5-10 Minuten)
1. **Filter auf `next_followup_date = heute`** setzen → alle fälligen Follow-ups sehen
2. **Neue Leads prüfen** (Status = Neu) → sofort score vergeben und next_step setzen
3. **Offene „Angebot gesendet"** prüfen — wie lange schon? Nachfassen nötig?

### Nach jedem Kontakt (sofort, 2-3 Minuten)
1. `last_contact_at` aktualisieren
2. `notes` ergänzen (kurz, was besprochen wurde)
3. `next_step` und `next_followup_date` setzen
4. Status aktualisieren

### Wöchentlich (Freitag, 15 Minuten)
1. Alle Leads in Status „In Gespräch" und „Angebot gesendet" reviewen
2. Scores überprüfen — hat sich etwas verändert?
3. Leads mit Status „C" und kein Kontakt seit >2 Wochen → auf „Nicht passend" setzen
4. Kurze Notiz: was war diese Woche, welche Deals sind in Bewegung?

### Priorisierungslogik
1. **A-Leads zuerst** — sofort kontaktieren, gleicher Tag
2. **B-Leads** — innerhalb von 24-48 Stunden
3. **C-Leads** — nur wenn Zeit, oder auf passende Gelegenheit warten
4. **Fällige Follow-ups** — heute erledigen, nicht verschieben
5. **Neue unbearbeitete Leads (Neu)** — nie länger als 24h unbearbeitet lassen

---

## 6. lead_id — Nummernschema

Verwende das Format: `BC-001`, `BC-002`, `BC-003` usw.

- BC = BertlClaw
- 3-stellige Nummer, aufsteigend
- Nie wiederverwenden, auch bei Verlust / Nicht passend

---

## 7. Tipps für sauberes Lead-Management

- **Nie löschen** — Leads, die nicht passen, bekommen Status „Nicht passend" oder „Verloren" und bleiben in der Liste. Die Daten sind wertvoll für Rückblicke.
- **Kurznotizen schlagen keine Notizen** — auch 1-2 Sätze helfen 3 Monate später
- **`message_summary`** beim ersten Eintrag sofort ausfüllen — aus der Erinnerung ist es 2 Tage später schlechter
- **UTM-Werte** nur ausfüllen, wenn ein aktives Tracking-System läuft. Sonst leer lassen — keine Pflicht.
- Das Sheet ist ein Werkzeug, kein Kunstwerk. Pragmatismus geht vor Perfektion.
