# BertlClaw QA Checklists

Direkt nutzbare Arbeitsvorlagen für den permanenten QA-/Operator-Loop.

---

## 1. New Bug Intake Checklist

Bei jedem neuen Fund sofort abhaken:

- [ ] echte Seite / echter Flow identifiziert
- [ ] URL notiert
- [ ] Gerät / Browser / Kontext notiert
- [ ] klare Schrittfolge notiert
- [ ] erwartetes Verhalten formuliert
- [ ] tatsächliches Verhalten formuliert
- [ ] Screenshot / Beleg gesichert
- [ ] Schweregrad gesetzt: P0 / P1 / P2 / P3
- [ ] Owner oder Zielperson klar
- [ ] nächster Schritt gesetzt
- [ ] Retest-Bedarf markiert
- [ ] falls nötig: manueller Zugriff als Blocker markiert

---

## 2. Quick Triage Checklist

- [ ] Ist der Fehler reproduzierbar?
- [ ] Ist Lead-Erzeugung oder Kontaktaufnahme betroffen?
- [ ] Ist Vertrauen / Außenwirkung sichtbar beschädigt?
- [ ] Betrifft es Mobile, Desktop oder beides?
- [ ] Ist nur eine Seite betroffen oder ein Muster?
- [ ] Kann ohne manuellen Zugriff weitergearbeitet werden?
- [ ] Muss sofort eskaliert werden?
- [ ] Ist der richtige Severity-Level gesetzt?

### Severity-Kurzregel
- **P0** = Kontakt / Lead / Kernfunktion kaputt
- **P1** = wichtige Journey deutlich gestört
- **P2** = klarer Qualitätsmangel ohne Blocker
- **P3** = Feinschliff / Beobachtung

---

## 3. 5-Minuten Smoke Test

### Startseite
- [ ] lädt ohne sichtbaren Bruch
- [ ] Hero verständlich
- [ ] primäre CTA sichtbar

### Service-Journey
- [ ] mindestens 1 Service-Seite lädt sauber
- [ ] CTA führt sinnvoll weiter

### Kontakt
- [ ] Kontaktbereich erreichbar
- [ ] Formularfelder fokussierbar / ausfüllbar
- [ ] Absenden grundsätzlich plausibel
- [ ] Danke-Seite oder Erfolgszustand erreichbar

### Vertrauenselemente
- [ ] Impressum / Datenschutz nicht kaputt
- [ ] Footer-Links funktionieren sichtbar

---

## 4. Mobile Conversion Checklist

- [ ] Headline/Value klar ohne Zoomen
- [ ] erste CTA im oberen Bereich oder schnell erreichbar
- [ ] Buttons groß genug zum Tippen
- [ ] kein abgeschnittener Text / horizontaler Scroll
- [ ] Chat/Panel/Sticky-Elemente blockieren nichts Wichtiges
- [ ] Formular auf Mobile bedienbar
- [ ] WhatsApp-/Telefon-Link sinnvoll tappbar
- [ ] nach CTA bleibt der nächste Schritt klar

---

## 5. Retest Checklist

Vor dem Schließen eines Tickets:

- [ ] Originalticket gelesen
- [ ] ursprüngliche Schritte erneut ausgeführt
- [ ] ursprünglicher Fehler nicht mehr vorhanden
- [ ] 1 angrenzender Pfad mitgeprüft
- [ ] keine offensichtliche Regression gesehen
- [ ] Ergebnis dokumentiert: pass / fail / partial
- [ ] Status sauber aktualisiert
- [ ] falls fail: Restproblem klar beschrieben

---

## 6. Manual Access Escalation Checklist

Wenn QA alleine nicht weiterkommt:

- [ ] exakter Blocker formuliert
- [ ] Auswirkung beschrieben
- [ ] bereits geprüfte Schritte dokumentiert
- [ ] konkret benannt, was manuell gebraucht wird
- [ ] Dringlichkeit gesetzt
- [ ] kleinster sinnvoller nächster Schritt formuliert
- [ ] Ticketstatus auf `blocked_manual_access`
- [ ] Follow-up-Termin gesetzt

### Mini-Template
**Blocker:**

**Auswirkung:**

**Schon geprüft:**

**Manuell benötigt:**

**Priorität:**

**Nächster Schritt:**

---

## 7. No-Idle Queue Checklist

Wenn keine akuten Bugs offen sind:

- [ ] offene Retests prüfen
- [ ] letzte Änderungen prüfen
- [ ] kritische Mobile-Journey prüfen
- [ ] kritische Desktop-Journey prüfen
- [ ] CTA-/Link-Audit machen
- [ ] ältere Service-Seite auf Drift prüfen
- [ ] P2/P3-Tickets neu bewerten
- [ ] mind. einen nützlichen Qualitätscheck dokumentieren

QA ist erst "fertig", wenn es **wirklich nichts Wertvolles mehr zu prüfen oder voranzuschieben gibt**.

---

## 8. End-of-Loop Checklist

Vor Abschluss eines QA-Loops:

- [ ] jeder neue Fund dokumentiert
- [ ] jeder offene Bug hat Status
- [ ] jeder offene Bug hat nächsten Schritt
- [ ] jeder offene Bug hat Owner oder Eskalation
- [ ] Retests nicht vergessen
- [ ] manuelle Blocker sauber eskaliert
- [ ] keine stillen TODOs nur im Kopf behalten

---

## 9. Ticket Template

```md
## [BUG_ID] Kurzer, konkreter Titel

- Status:
- Severity:
- Type:
- Page / Flow:
- Environment:
- Owner:
- Needs manual access:

### Steps to reproduce
1.
2.
3.

### Expected

### Actual

### Evidence

### Next action

### Retest notes
```
