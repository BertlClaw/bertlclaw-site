# BertlClaw Lead-to-Offer Workflow

Ziel: aus einem strukturierten Lead-Eintrag in 1-3 Minuten zu belastbaren Inputs für `quote-advisor.js` und `offer-builder.js` kommen — ohne doppelte Handarbeit.

Ergänzt:
- `bertlclaw-leads-template.csv`
- `bertlclaw-tools/lead-to-offer-inputs.js`
- `bertlclaw-tools/quote-advisor.js`
- `bertlclaw-tools/offer-builder.js`
- `BERTLCLAW-SALES-OPERATING-SYSTEM.md`

---

## 1. Wofür dieser Layer da ist

Die Lead-Liste enthält bereits die wichtigsten Vorentscheidungen für Angebotserstellung:
- `kernangebot`
- `problem_clarity`
- `offer_fit`
- `material_readiness`
- `timing`
- `decision_readiness`
- `topic`
- `message`

Der neue Layer übersetzt diese Felder direkt in:
- Kernangebot für den Builder (`landingpage|positioning|order`)
- Bewertungswerte 1-5 für Deal-Scoring
- Vorschlag für Angebotsgröße (`small|standard|expanded`)
- vorformulierte `situation` und `goal`
- ausführbare CLI-Commands für Quote Advisor und Offer Builder

Damit wird aus Lead-Pflege ein direkter Angebots-Startpunkt.

---

## 2. Minimalprozess

### Schritt 1 — Lead sauber pflegen
Vor allem diese Felder ausfüllen:
- `kernangebot`
- `problem_clarity`
- `offer_fit`
- `material_readiness`
- `timing`
- `decision_readiness`
- `topic`
- `message`

Wenn diese Felder leer oder `unknown` bleiben, ist der Output nutzbar, aber eher nur ein Startpunkt.

### Schritt 2 — Mapping ausführen

```bash
node bertlclaw-tools/lead-to-offer-inputs.js --lead-id=BC-2026-0001
```

Optional mit anderem CSV-Pfad:

```bash
node bertlclaw-tools/lead-to-offer-inputs.js \
  --csv=/pfad/zur/leads.csv \
  --lead-id=BC-2026-0001
```

### Schritt 3 — Readout prüfen
Das Script liefert:
- `recommended` → fertige Bewertungsinputs
- `commands.quoteAdvisor` → schneller Preis-/Form-Check
- `commands.offerBuilder` → direkt ausführbarer Angebots-Command
- `missingSignals` → welche Lead-Felder noch zu schwach oder offen sind

### Schritt 4 — Angebot erzeugen
Erst `quoteAdvisor`, dann `offerBuilder` oder direkt `offerBuilder`.

---

## 3. Mapping-Logik

## Lead-Felder → Builder-Werte

### Kernangebot
- `landingpage` / verwandte Begriffe → `landingpage`
- `positionierung`, `website-texte`, `copy` → `positioning`
- `ordnung`, `klarheit` → `order`
- wenn leer: heuristische Ableitung aus `topic`, `message`, `notes`

### Qualitative Felder → Scores
- `low` / `niedrig` → `2`
- `medium` / `mittel` → `3`
- `high` / `hoch` → `5`
- `unknown` / leer → `3` als neutrale Arbeitsannahme

### Abgeleitete Felder
- `scope` = Durchschnitt aus Problemklarheit, Angebots-Fit, Materiallage
- `friction` = Durchschnitt aus Materiallage, Entscheidungsreife, Timing
- `upsell` = Durchschnitt aus Fit, Timing, Entscheidungsreife
- `size`:
  - `expanded`, wenn fast alle Signale stark sind
  - `standard`, wenn die Lage insgesamt brauchbar ist
  - `small`, wenn die Lage noch zu wacklig ist

Wichtig: Das ist bewusst **nicht perfekt**, sondern operativ schnell. Bei Grenzfällen lieber manuell überschreiben.

---

## 4. Praktische Nutzung

## Nur Input-Mapping erzeugen

```bash
node bertlclaw-tools/lead-to-offer-inputs.js --lead-id=BC-2026-0007
```

## Mit manuellem Override für Deal-Lage

```bash
node bertlclaw-tools/lead-to-offer-inputs.js \
  --lead-id=BC-2026-0007 \
  --offer=landingpage \
  --size=standard \
  --scope=4 \
  --friction=3
```

## Danach direkt Angebot bauen
Das Script gibt einen fixfertigen `offerBuilder`-Command aus, z. B.:

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
  --name='Max Muster' \
  --situation='Die bestehende Seite erklärt das Angebot noch nicht klar genug.' \
  --goal='Nach dem Sprint soll die Seite verständlicher sein und Anfragen besser vorbereiten.'
```

---

## 5. Teamregel für saubere Outputs

Wenn ein Lead wirklich angebotstauglich sein soll, diese sechs Felder nicht offen lassen:
- `kernangebot`
- `problem_clarity`
- `offer_fit`
- `material_readiness`
- `timing`
- `decision_readiness`

Das sind die kleinsten nötigen Vertriebsdaten, um Preislogik und Angebotsform nicht jedes Mal neu aus dem Bauch heraus zu bauen.

---

## 6. Empfohlener Einsatzpunkt im Funnel

Diesen Workflow einsetzen, sobald ein Lead von **Neu** auf **Qualifiziert** geht und klar ist:
- es gibt grundsätzlich Fit
- ein Kernangebot ist vorne
- der nächste Schritt ist nicht nur Rückfrage, sondern Angebotsvorbereitung

Nicht einsetzen bei:
- C-Leads ohne brauchbaren Fit
- stark diffuser Mischlage
- Fällen, in denen zuerst ein Scoping-Call nötig ist und die Felder noch kaum belastbar sind

---

## 7. Business-Nutzen

Dieser Layer spart vor allem drei Arten von Verschwendung:
1. **kein Copy-Paste-Neudenken** zwischen Lead-Liste und Angebot
2. **weniger Bauchgefühl-Preising**, weil die Deal-Scores direkt vorbereitet sind
3. **schnellerer Versand**, weil `situation`, `goal` und CLI-Inputs schon vorliegen

Der Effekt ist simpel: bessere Reaktionsgeschwindigkeit, konsistentere Angebotslogik, weniger Scope-Nebel.
