# BertlClaw Offer Execution Layer

Praktische Ausführungsschicht zwischen Qualifizierung, Pricing-Logik und versandfertigem Angebot.

Ergänzt:
- `BERTLCLAW-DEAL-DESIGN-AND-QUOTE-ADVISOR.md`
- `BERTLCLAW-OFFER-PRICING-MATRIX.md`
- `BERTLCLAW-SHORT-OFFER-AND-SCOPED-PROPOSAL-TEMPLATES.md`
- `bertlclaw-tools/quote-advisor.js`
- `bertlclaw-tools/offer-builder.js`

---

## 1. Ziel

Nicht nur intern bewerten, sondern in wenigen Minuten zu einem belastbaren Angebotsausgang kommen:
- Angebotsform bestimmen
- Preis sauber einordnen
- Scope aktiv schützen
- Downscope griffbereit haben
- Follow-up und Closing-Frage direkt miterzeugen

---

## 2. Standard-Flow in 5 Schritten

### Schritt 1 — Kernangebot festlegen
Nur **ein** Kernangebot als Front-Offer wählen:
- `landingpage`
- `positioning`
- `order`

Wenn zwei Themen gleich stark wirken:
- nicht beides in ein Small-Angebot pressen
- eher Phase 1 / Phase 2 denken
- oder zuerst Scoping

### Schritt 2 — Deal in 6 Feldern scoren
Je 1 bis 5 vergeben:
- Fit
- Scope
- Material
- Decision
- Friction
- Upsell

### Schritt 3 — Preisrange wählen
- `small`
- `standard`
- `expanded`

### Schritt 4 — Offer Builder laufen lassen

Beispiel:

```bash
node bertlclaw-tools/offer-builder.js \
  --offer=landingpage \
  --size=standard \
  --fit=5 \
  --scope=4 \
  --material=3 \
  --decision=4 \
  --friction=3 \
  --upsell=4 \
  --name="Max" \
  --situation="Das Angebot ist grundsätzlich da, die aktuelle Seite erklärt Nutzen und Ablauf aber noch nicht klar genug." \
  --goal="Nach dem Sprint soll die Seite schneller verständlich sein, mehr Vertrauen erzeugen und Anfragen sauber vorbereiten."
```

### Schritt 5 — Ergebnis nur noch feinziehen, nicht neu erfinden
Bearbeiten:
- Lagebeschreibung
- Zielbild
- ein bis zwei Scope-Grenzen
- konkreten nächsten Schritt

Nicht neu diskutieren:
- Angebotsform
- Preislogik
- Downscope
- Closing-Frage

---

## 3. Output, den der Builder liefern soll

Der Builder erzeugt vier Dinge:

### A. `summary`
Interner Readout für Pricing und Deal-Lage.

### B. `snippets.primary`
Der primäre versandfähige Text:
- Kurzangebot oder
- Scoped-Startvorschlag oder
- Downscope-Text

### C. `snippets.downscope`
Sofort einsetzbare kleinere Variante bei Budget- oder Reifeeinwand.

### D. `snippets.followup`
Passendes Nachfass-Skript je nach Deal-Stärke.

Plus:
- `closingQuestion`

---

## 4. Guardrails je Angebotsgröße

## Small
Darf enthalten:
- 1 enger Engpass
- 1 Hauptoutput
- 1 Ansprechpartner
- wenig Schleifen

Nicht hineinquetschen:
- mehrere Seiten
- Strategie + Umsetzung + Technik gemischt
- unklare Komplettwünsche

## Standard
Darf enthalten:
- 1 Kernangebot mit substanzieller Arbeit
- moderate Verdichtung
- klaren Materialinput
- 1 Hauptreview

Achtung bei:
- schlechter Materiallage
- mehreren Entscheidern
- hohem Präzisionsbedarf

## Expanded
Nur wenn klar abgegrenzt.

Pflicht dabei:
- schriftliche Scope-Grenzen
- explizite Exclusions
- Review-/Freigabelogik
- saubere Add-on-Logik statt Gratis-Ausweitung

---

## 5. Angebotsform-Regeln

### Kurzangebot per Mail
Nutzen, wenn:
- Fit hoch
- Scope klein bis mittel
- ein Entscheider drin
- Problem bereits verständlich
- kein formaler Beschaffungsapparat nötig

### Scoped Proposal / strukturierter Startvorschlag
Nutzen, wenn:
- scoping noch nicht sauber genug ist
- mehrere Richtungen möglich sind
- Preis erklärungsbedürftig wird
- Abgrenzung schriftlich geschützt werden muss

### Downscope oder bewusst offen lassen
Nutzen, wenn:
- niedriger Score
- früher Rabattdruck
- unklare Verantwortlichkeit
- hoher Kommunikationsaufwand bei schwachem Ergebnisbild

---

## 6. Preis-Guardrails je Kernangebot

## Landingpage Sprint
Preis eher oben, wenn:
- starke Re-Strukturierung nötig
- Vertrauen erst aufgebaut werden muss
- mehrere CTA-/Einwandfragen offen sind

Nicht gratis mitverkaufen:
- Mehrseiten-Relaunch
- tiefe technische Umsetzung
- Designsystem-Arbeit

## Positionierung & Website-Texte
Preis eher oben, wenn:
- Nutzen / Zielgruppe / Abgrenzung unscharf sind
- viel Verdichtung vor dem Schreiben nötig ist
- mehrere Leistungsbereiche sprachlich zusammengezogen werden müssen

Nicht gratis mitverkaufen:
- komplette Markenstrategie
- große Research-Strecke
- umfangreiche Variantenproduktion

## Digitale Ordnung & Klarheit
Preis eher oben, wenn:
- mehrere Themencluster zusammenlaufen
- viel Vorordnung fehlt
- Abstimmung über Teamschnittstellen nötig wird

Nicht gratis mitverkaufen:
- PMO auf Zuruf
- Tool-Migrationen
- dauerhafte operative Begleitung

---

## 7. Ready-to-send Mini-Snippets je Situation

### Wenn Preis nicht das Kernproblem ist
"Wenn der Rahmen für dich so passt, können wir den Start jetzt fix machen und ich plane den Slot ein."

### Wenn eher Umfang wackelt
"Wenn dir der jetzige Rahmen noch zu groß wirkt, kann ich das auch bewusst auf eine kleinere Phase 1 zuschneiden, damit der Einstieg leichter wird."

### Wenn interne Weiterleitung nötig ist
"Wenn hilfreich, formuliere ich dir das auch noch als kurze weiterleitbare Zusammenfassung mit Problem, Umfang, Zeitrahmen und Investition."

### Wenn der Deal nach Scope-Drift riecht
"Ich würde es bewusst eng halten, damit der erste Schritt sauber bleibt und wir nicht zu viele Baustellen in ein Paket pressen."

---

## 8. Empfohlene CLI-Nutzung

## Nur schneller Preis-/Form-Check

```bash
node bertlclaw-tools/quote-advisor.js \
  --offer=positioning \
  --size=standard \
  --fit=4 --scope=3 --material=3 --decision=4 --friction=3 --upsell=4
```

## Voller Angebots-Output

```bash
node bertlclaw-tools/offer-builder.js \
  --offer=positioning \
  --size=standard \
  --fit=4 --scope=3 --material=3 --decision=4 --friction=3 --upsell=4 \
  --name="Julia" \
  --situation="Das Angebot ist fachlich gut, wirkt auf der Website aber noch generisch und nicht klar genug zugespitzt." \
  --goal="Nach dem ersten Schritt sollen Nutzen, Abgrenzung und Haupttexte deutlich verständlicher und vertrauenswürdiger sein."
```

---

## 9. Interne Sendefreigabe vor Versand

Vor dem Senden kurz prüfen:
- Ist nur **ein** Kernangebot vorne?
- Ist die Preisrange logisch und verteidigbar?
- Ist explizit klar, was **nicht** enthalten ist?
- Ist ein kleinerer Start direkt vorbereitet?
- Ist die Closing-Frage passend zur Deal-Stärke?

Wenn eine dieser Antworten fehlt, nicht schicken.

---

## 10. Kerngedanke

Der kommerzielle Vorteil entsteht nicht durch kompliziertere Proposal-Dokumente, sondern durch eine **schnelle, disziplinierte Übersetzung von Deal-Lage in sendefähigen Scope, Preis und nächsten Schritt**.
