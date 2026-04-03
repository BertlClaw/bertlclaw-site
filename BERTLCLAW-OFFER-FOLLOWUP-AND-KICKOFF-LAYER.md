# BertlClaw Offer Follow-up & Kickoff Layer

Praktische Schicht nach Angebotsversand: aus einem bereits gebauten Angebot werden **entscheidungsstarke Nachfassungen, Einwandantworten, Annahmebestätigung und kickoff-fähige Scope-Sicherung**.

Ergänzt:
- `BERTLCLAW-OFFER-EXECUTION-LAYER.md`
- `BERTLCLAW-OFFER-CLOSE-OBJECTION-PLAYBOOK.md`
- `bertlclaw-tools/offer-builder.js`
- `bertlclaw-tools/close-builder.js`

---

## 1. Ziel

Nach dem Angebot entstehen die teuersten Vertriebsfehler oft **nicht** beim Pricing selbst, sondern direkt danach:
- zu weiche Follow-ups
- improvisierte Einwandantworten
- unnötige Rabatte
- unsaubere Annahmebestätigung
- Kickoff ohne klare Scope-Grenzen

Diese Schicht soll genau das verhindern.

---

## 2. Wofür sie da ist

Aus wenigen Inputs wird ein kompakter Commercial-Output erzeugt für vier Situationen:

1. **No-response Follow-up** nach Angebotsversand
2. **Objection Reply** bei Preis-, Timing-, Scope- oder Abstimmungseinwand
3. **Acceptance Message** sobald der Lead zusagt
4. **Kickoff Prep Message** mit klaren Inputs und Scope-Schutz

Das Ziel ist nicht mehr Text, sondern **mehr Entscheidungsklarheit bei weniger Marge-Verlust**.

---

## 3. Standard-Inputs

Minimal sinnvoll:
- `offer` → `landingpage|positioning|order`
- `size` → `small|standard|expanded`
- `price` → vereinbarter oder vorgeschlagener Preis
- `name` → Ansprechperson
- `stage` → `nudge|followup|accept|kickoff`
- optional `objection` → `price|timing|scope|internal|unclear`
- optional `situation`
- optional `goal`
- optional `needs`
- optional `timeframe`

Wenn `objection` gesetzt ist, soll primär auf **Klarheit und nächste Entscheidung** optimiert werden — nicht auf Rechtfertigung.

---

## 4. Kernregeln

### Regel 1 — Follow-up nie als bloßes "wollte mal nachfragen"
Jede Nachricht muss eine Entscheidung strukturieren:
- passt der Rahmen?
- ist eher Umfang, Timing oder interner Pfad das Thema?
- ist kleinere Phase 1 sinnvoll?

### Regel 2 — Rabatt ist fast nie der erste Zug
Vor Rabatt immer prüfen:
- ist der Umfang zu groß?
- ist der Nutzen noch nicht sauber genug?
- fehlt nur intern weiterleitbares Material?
- ist eigentlich das Timing das Problem?

### Regel 3 — Zusage sofort in Scope-Sicherung übersetzen
Sobald jemand zusagt, nicht in lockere Unschärfe rutschen.
Es braucht direkt:
- bestätigten Startpunkt
- bestätigten Output
- benötigte Inputs
- Verantwortlichkeit / Freigabeweg
- Timing

### Regel 4 — Kickoff dient nicht nur Delivery, sondern auch Marge
Ein gutes Kickoff schützt vor:
- nachträglicher Scope-Ausweitung
- vagen Zusatzwünschen
- fehlenden Materialien
- mehreren informellen Review-Schleifen

---

## 5. Die vier Output-Typen

## A. `nudge`
Kurz nach 2-3 Tagen, wenn der Deal stark ist.

Ziel:
- Momentum halten
- Startentscheidung erleichtern
- keine neue Debatte öffnen

## B. `followup`
Nach 3-5 Tagen oder bei wackligerer Lage.

Ziel:
- Reibung lokalisieren
- Scope ggf. verkleinern
- Entscheidung forcieren, ohne zu drücken

## C. `accept`
Direkt nach Zusage.

Ziel:
- Zusage in geordneten Projektstart übersetzen
- Scope und Input-Anforderungen sauber fixieren

## D. `kickoff`
Vor oder direkt zum Start.

Ziel:
- Inputs einsammeln
- Verantwortlichkeiten klären
- mobile / Review / Exclusions sichtbar machen

---

## 6. Einwandführung nach Typ

### Preis
Nicht mit Rabatt antworten, sondern mit:
- engerem Start
- klarerer Phase 1
- bewusster Abgrenzung

### Timing
Nicht künstlich drücken. Entweder:
- kleiner Vorbereitungsstart
- oder sauber pausieren mit Wiedervorlage

### Scope-Unsicherheit
Nicht fünf Optionen öffnen. Eine klare Empfehlung geben:
- kleinster sinnvoller Start
- warum genau dieser zuerst

### Interne Abstimmung
Nicht warten ohne Struktur. Stattdessen:
- weiterleitbare Kurzfassung liefern
- konkreten Wiedereinstieg setzen

### Unklarheit allgemein
Nicht komplexer erklären. Problem und nächsten Hebel vereinfachen.

---

## 7. Acceptance-to-Kickoff Guardrails

Sobald der Lead zusagt, direkt intern und extern gegenprüfen:
- ist klar, **welcher Startpunkt** bestätigt wurde?
- ist klar, **was nicht enthalten** ist?
- ist klar, **welche Inputs bis wann** gebraucht werden?
- gibt es **eine finale Freigabeperson**?
- ist bei Seiten-/Copy-Arbeit **Mobile mitgemeint**?
- ist klar, wie viele Review-Schleifen enthalten sind?

Wenn einer dieser Punkte fehlt, ist das kein sauberer Start.

---

## 8. Empfohlene CLI-Nutzung

### Follow-up ohne Einwand

```bash
node bertlclaw-tools/close-builder.js \
  --offer=landingpage \
  --size=standard \
  --price=1500 \
  --name="Max" \
  --stage=followup \
  --situation="Die aktuelle Seite erklärt Angebot und nächsten Schritt noch nicht klar genug." \
  --goal="Die Seite soll Vertrauen schneller aufbauen und Anfragen besser vorbereiten."
```

### Preis-Einwand

```bash
node bertlclaw-tools/close-builder.js \
  --offer=positioning \
  --size=standard \
  --price=1200 \
  --name="Julia" \
  --stage=followup \
  --objection=price \
  --situation="Das Angebot ist relevant, wirkt aktuell aber noch zu groß für den direkten Einstieg." \
  --goal="Ein engerer Start soll Nutzen und Entscheidung leichter machen."
```

### Zusage → Annahmebestätigung

```bash
node bertlclaw-tools/close-builder.js \
  --offer=landingpage \
  --size=standard \
  --price=1500 \
  --name="Max" \
  --stage=accept
```

### Kickoff-Vorbereitung

```bash
node bertlclaw-tools/close-builder.js \
  --offer=landingpage \
  --size=standard \
  --price=1500 \
  --name="Max" \
  --stage=kickoff
```

---

## 9. Arbeitsregel für Dominic

Wenn schon ein Angebot existiert, sollte die nächste Nachricht **nie aus dem Bauch** geschrieben werden.

Mindestens diese drei Dinge müssen vor Versand klar sein:
- Welcher Einwand oder welche Reibung ist wahrscheinlich?
- Wie sähe die kleinere sinnvolle Startversion aus?
- Welche konkrete Entscheidung soll die Nachricht jetzt auslösen?

---

## 10. Kerngedanke

Nach dem Angebot wird nicht durch mehr Erklären gewonnen, sondern durch **saubere Entscheidungsführung und sauberen Startschutz**.

BertlClaw sollte deshalb nicht nur gute Angebote bauen, sondern auch:
- gut nachfassen,
- gut auf Einwände reagieren,
- und Zusagen sofort in einen klar begrenzten Projektstart übersetzen.
