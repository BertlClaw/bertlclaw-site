# BertlClaw QA Next Actions — 2026-04-02

Zweck: die aktuellen P0/P1-Themen aus dem aktiven QA-Plan sofort in konkrete Arbeits- und Retest-Schritte übersetzen.

## 1. Priorisierung jetzt

### P0 — sofort
1. **BCQA-001 — Form submit delivery real bestätigen**
   - Risiko: echter Lead-Verlust möglich
   - Status: `blocked_manual_access`
   - Ohne diesen Check ist der Contact Flow nicht wirklich freigegeben

### P1 — direkt danach
2. **BCQA-002 — Reminder-System technisch verdrahten**
   - Risiko: Reporting/Reminder nur disziplinbasiert, nicht verlässlich
3. **BCQA-006 — Reporting-Reliability nachweisbar machen**
   - Risiko: volle-Stunden-Updates sind nicht auditierbar abgesichert
4. **BCQA-003 — SearchAction/schema realitätscheck abschließen**
   - Risiko: strukturierte Daten behaupten vermutlich eine Funktion, die es nicht gibt
5. **BCQA-004 — real-device Mobile-Kollisionen im Chat/CTA→Kontakt-Flow prüfen**
   - Risiko: statisch verbessert, aber auf echten Geräten könnten Sticky-/Floating-Elemente weiterhin Felder oder CTAs verdecken

---

## 2. Sofort ausführbare Next Steps pro Ticket

## BCQA-001 — Form submit delivery not yet manually confirmed

### Was sofort zu tun ist
- echten End-to-End-Test auf Live-/Preview-URL ausführen
- Formular auf `index.html` mit Testdaten absenden
- Weiterleitung zu `danke.html` bestätigen
- **danach echten Eingang in Formspree oder Ziel-Mailbox verifizieren**

### Testdaten-Vorschlag
- Name: `BertlClaw QA Test`
- E-Mail: eigene kontrollierte Testadresse
- Nachricht: `Testanfrage BertlClaw QA 2026-04-02 – bitte ignorieren.`

### Pass-Kriterien
- Submit feuert ohne JS-/Netzwerkfehler
- Nutzer landet auf `danke.html`
- Nachricht kommt real im Zielsystem an
- Inhalt ist vollständig und korrekt zuordenbar

### Wenn Fail
- unterscheiden zwischen:
  1. Frontend-Validation-Fehler
  2. POST/Fetch/Formspree-Fehler
  3. Redirect-Fehler
  4. Zustellungs-/Mailbox-Fehler
- Ergebnis sofort als `retested_fail` oder mit neuem Bug dokumentieren

### Wer/was nötig ist
- menschlicher Zugriff auf Formspree/Mailbox oder manuell nutzbare echte Empfangsbestätigung

---

## BCQA-002 — Reminder system is policy-defined but not technically scheduled

### Beobachtung
`BERTLCLAW-REMINDER-SYSTEM.md` dokumentiert Zielzustand, nennt aber die technische Verdrahtung explizit als offen.

### Konkrete nächste Umsetzung
**Minimal sinnvolle technische Lösung:**
1. stündlichen Trigger definieren
2. täglichen Trigger für GitHub-Ticket-Reminder definieren
3. jeden Trigger mit Logeintrag koppeln
4. Audit-Check ergänzen: letzte erfolgreiche Ausführung prüfbar machen

### Empfohlene Deliverables
- kleines Scheduler-Script oder Heartbeat-/Cron-Hook
- einfache Zustandsdatei mit:
  - `last_hourly_update_at`
  - `last_daily_github_ticket_reminder_at`
- Logformat strikt vereinheitlichen

### Close-Kriterien
- es gibt nicht nur Policy, sondern einen echten maschinischen Trigger
- ein verpasster Lauf wäre sichtbar
- QA kann anhand von Artefakten prüfen, ob der letzte Lauf stattgefunden hat

---

## BCQA-006 — Hourly reporting reliability not yet proven by repeatable check routine

### Beobachtung
Das Ops-Log enthält Einträge, aber keinen klaren Audit-Mechanismus, der die stündliche Verlässlichkeit belegt.

### Konkrete nächste Schritte
1. **Audit-Regel definieren:**
   - zu jeder vollen Stunde muss ein zugehöriger Logeintrag existieren
2. **Prüfskript oder Check-Routine anlegen:**
   - liest `logs/bertlclaw-operations.log`
   - meldet fehlende Stundenfenster
3. **QA-Retest ergänzen:**
   - letzter Laufzeitpunkt
   - nächstes erwartetes Stundenfenster
   - Abweichung ja/nein

### Praktische Abgrenzung zu BCQA-002
- **BCQA-002** = Trigger bauen
- **BCQA-006** = Nachweis/Audit, dass Trigger verlässlich läuft

### Close-Kriterien
- verpasste volle Stunde wäre maschinisch erkennbar
- QA kann Reliability wiederholbar prüfen statt nur subjektiv zu bewerten

---

## BCQA-003 — Startpage JSON-LD SearchAction likely does not match a real site search

### Verifikationsergebnis aus aktuellem Sweep
- `index.html` enthält im `WebSite`-JSON-LD eine `SearchAction`
- Ziel: `https://bertlclaw.github.io/bertlclaw-site/?q={search_term_string}`
- im sichtbaren Workspace gibt es **keine echte Site Search UI** und keinen belegten Search-Flow
- damit ist der derzeitige Stand **wahrscheinlich nicht realitätskonform**

### Empfohlene Entscheidung
**SearchAction entfernen**, solange keine echte Suchfunktion existiert.

### Warum das Priorität hat
- kein Render-Bug, aber strukturelle Vertrauens-/Sauberkeitsfrage
- unnötige Schema-Felder erzeugen falsche Signale für Suchmaschinen und QA

### Konkrete nächste Schritte
1. `index.html` JSON-LD anpassen
2. `potentialAction/SearchAction` entfernen
3. danach Spot-Check auf JSON-LD-Syntax und übrige Metadaten
4. Ticket auf `ready_for_retest` setzen

### Retest nach Fix
- `index.html` JSON-LD erneut prüfen
- sicherstellen, dass `WebSite`-Objekt ohne SearchAction valide/plausibel bleibt
- keine kaputten Kommata/JSON-LD-Syntaxfehler

---

## BCQA-004 — real-device Mobile-Kollisionen im Chat/CTA→Kontakt-Flow bestätigen

### Bereits lokal vorbereitet
Mehrere Unterseiten enthalten denselben Kontakt-Handoff bzw. dieselbe mobile CTA-/Spacing-Logik:
- `services.html`
- `landingpage-sprint.html`
- `landingpages.html`
- `positionierung-website-texte.html`
- `digital-clarity-setup.html`
- weitere Angebotsseiten

Zusätzlich wurden mobile Spacing-/Safe-Area-Anpassungen eingebaut.

### Noch offen
Der offene Punkt ist jetzt **enger und konkreter**:
- nicht mehr nur „mobile UX mal anschauen“
- sondern **auf echten Geräten prüfen, ob Sticky-Bar, Chat, Floating-Elemente oder der Kontaktbereich kollidieren / etwas verdecken**

### Konkreter Retest-Plan
Auf **mindestens 2 echten Geräten** prüfen:
1. iPhone-ähnliche Größe (z. B. 390x844)
2. Android-ähnliche Größe (z. B. 360x800)

Pflichtseiten:
- `services.html`
- `landingpage-sprint.html`
- `digital-clarity-setup.html`

### Für jeden Test dokumentieren
- echtes Gerät + Browser
- Seite
- Zustand vor Klick
- Zustand direkt nach Chat-/CTA-Handoff
- ist das Nachrichtenfeld sichtbar?
- ist der Submit-/Kontaktbereich ohne Scroll-Falle / UI-Überlagerung erreichbar?
- verdeckt die mobile Sticky-Bar oder der Chat irgendetwas Relevantes?
- Screenshot oder kurzes Video vom kritischen Zustand

### Spezifische Prüf-Fragen
- ist der relevante Kontaktbereich **wirklich** sichtbar und tappable?
- verdecken Sticky-/Floating-Elemente das Nachrichtenfeld, Consent oder den Haupt-CTA?
- bleibt genug vertikaler Raum, um den Handoff verständlich abzuschließen?
- wirkt der Flow auf dem echten Gerät klar oder gequetscht?

### Pass-Kriterien
- kein relevanter Overlap auf echtem Gerät
- Kontaktbereich bleibt nutzbar
- zentrale Felder/CTAs/Consent sind sichtbar erreichbar
- Screenshot-/Videobeweis liegt vor

### Wenn Partial/Fail
Wahrscheinlichste Fixrichtungen:
- mobile bottom spacing weiter erhöhen
- Sticky-Bar beim Eintritt in den Kontaktbereich verkleinern/ausblenden
- Chat-Launcher im Kontaktzustand temporär entschärfen
- kurze Handoff-Erklärung sichtbar oberhalb des vorausgefüllten Feldes einblenden

---

## 3. Empfohlene Arbeitsreihenfolge für den nächsten QA-/Fix-Block

### Block A — harte Risiken zuerst
1. BCQA-001 manuell ausführen
2. BCQA-003 sofort fixen (niedriger Aufwand, saubere SEO-/Schema-Hygiene)
3. BCQA-004 mobile Retests fahren

### Block B — Betriebszuverlässigkeit absichern
4. BCQA-002 Scheduler/Trigger bauen
5. BCQA-006 Audit-/Proof-of-run-Check ergänzen

---

## 4. Schnellgewinne vs. Blocker

### Schnellgewinn
- **BCQA-003** ist der sauberste schnelle P1-Abschlusskandidat
  - statisch fast schon bestätigt
  - wenig Abhängigkeiten
  - klares Fix-Muster: entfernen, retesten, schließen

### Größter echter Business-Risk
- **BCQA-001** bleibt das wichtigste Thema
  - weil ein hübscher Frontend-Flow ohne reale Zustellung wertlos ist

### System-Reliability-Risk
- **BCQA-002 + BCQA-006** gehören praktisch zusammen
  - erst Trigger, dann Audit
  - beides zusammen macht Reporting belastbar statt nur gut gemeint

---

## 5. Empfohlene Ticket-Status-Nächste Schritte

- `BCQA-001` → bleibt `blocked_manual_access`, bis echter Empfang bestätigt ist
- `BCQA-003` → sollte nach Fix auf `ready_for_retest`
- `BCQA-004` → nach mobilem Live-Retest auf `retested_pass` oder `retested_fail`
- `BCQA-002` → nach technischer Implementierung auf `ready_for_retest`
- `BCQA-006` → nach Audit-Mechanismus auf `ready_for_retest`

---

## 6. Kurzfazit

Wenn jetzt nur ein kleiner QA-/Fix-Block möglich ist, dann ist die beste Reihenfolge:
1. **realen Form-Leadflow bestätigen**
2. **SearchAction entfernen**
3. **mobile Chat→Kontakt-Retests fahren**
4. **Reminder-Scheduler bauen**
5. **Reporting-Audit nachziehen**

Das reduziert gleichzeitig Lead-Risiko, Schema-Unsauberkeit und Prozess-Unzuverlässigkeit.