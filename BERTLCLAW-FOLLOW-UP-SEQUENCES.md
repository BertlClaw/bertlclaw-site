# BertlClaw Follow-up Sequences

Ziel: konsistente Nachfasslogik mit wenig Druck, aber klarer Entscheidungsführung.

Kernregel: **Jede Nachfassung muss eine Entscheidung strukturieren, nicht nur Gesprächsbereitschaft signalisieren.**

---

## 1. Fehlende Infos nach Erstkontakt

### Touch 1 — Tag 0
Hallo {Name}, danke für deine Nachricht.
Damit ich dein Anliegen sauber einordnen kann, schick mir bitte noch kurz:
- {Frage 1}
- {Frage 2}
- {Frage 3}

2–4 Sätze oder ein Link reichen völlig.

### Touch 2 — nach 2 Werktagen
Hallo {Name}, ich wollte kurz nachfassen.
Wenn das Thema noch aktuell ist: Reichen mir ein paar Stichworte oder ein Link — dann schätze ich direkt ein, ob und wie wir da sinnvoll ansetzen können.
Falls gerade nicht der richtige Moment ist, sag kurz Bescheid — dann stelle ich mir eine Wiedervorlage.

**Entscheidungspunkt hier:** Sollen wir einen ersten Schritt konkret besprechen, oder wäre Wiedervorlage für [Zeitraum] sinnvoller?

### Touch 3 — nach weiteren 4–5 Tagen
Hallo {Name}, ich melde mich noch einmal kurz.
Wenn das Thema weiterhin relevant ist, würde ich gern einschätzen, welcher erste Schritt tatsächlich Sinn macht — ohne gleich alles aufzumachen.
Falls der Zeitpunkt gerade nicht passt, kein Problem. Ich halte das im Blick und melde mich bei Wiedervorlage wieder.

**Danach:** Status auf `pausiert` oder `verloren`. Wiedervorlage in 30–60 Tagen wenn sinnvoll.

---

## 2. Termin angeboten, aber keine Reaktion

### Touch 1 — Tag 0
Hallo {Name}, das Thema passt grundsätzlich gut.
Wenn du willst, besprechen wir es kurz direkt — schick mir einfach 2–3 Zeitfenster, die für dich passen.

### Touch 2 — nach 3 Tagen
Hallo {Name}, kurze Nachfrage: Passt es gerade oder ist der Zeitpunkt noch nicht ideal?
Wenn ja — einfach 2–3 Zeitfenster schicken oder sagen, ob Mail-Abstimmung praktischer ist.
Wenn nein — kein Problem, sag kurz wann eher passend wäre, dann melde ich mich zu dem Zeitpunkt nochmal.

**Entscheidungspunkt:** Termin jetzt, oder bewusst Wiedervorlage mit Datum?

### Touch 3 — nach weiteren 5–7 Tagen
Hallo {Name}, ich lasse das bewusst offen, statt weiter zu drängeln.
Falls du das Thema später wieder aufnehmen willst, kannst du dich jederzeit melden. Ich kann schnell einordnen, ob und wie ein sinnvoller Start aussieht.

**Danach:** pausieren. Wiedervorlage nur wenn ein konkreter Anlass entsteht.

---

## 3. Angebot / Einordnung verschickt

### Touch 1 (Nudge) — nach 2–3 Tagen bei starkem Deal
Hallo {Name}, ich wollte kurz prüfen, ob du schon Gelegenheit hattest, dir die Einordnung anzusehen.
Falls Fragen offen sind oder ich irgendetwas direkt klären kann, gern. Wenn das für dich so passt, können wir den Start auch direkt fix machen.

**Nur bei starkem A-Deal nutzen. Nicht bei B/C.**

### Touch 2 (Follow-up) — nach 3–5 Tagen oder bei wackligerem Deal
Hallo {Name}, ich melde mich kurz nach.
Falls der Umfang noch nicht ganz passt oder ein Punkt offen ist: Ich kann das auch enger zuschneiden und würde dann eher mit einem klar begrenzten Phase-1-Start anfangen.
Alternativ: Ist der Zeitpunkt das eigentliche Thema? Dann machen wir das gern mit einer Wiedervorlage.

**Entscheidungsfrage direkt stellen:** Ist eher Umfang, Timing oder etwas anderes noch offen?

### Touch 3 (Letzte Nachfassung) — nach weiteren 5–7 Tagen
Hallo {Name}, ich lasse es bewusst offen, statt weiter nachzufassen.
Falls du das Thema zu einem späteren Zeitpunkt angehen willst, kannst du dich jederzeit melden — ich starte gern mit einer kurzen Einordnung, damit der Wiedereinstieg leicht ist.

**Danach:** `verloren` oder `pausiert` mit explizitem Wiedervorlage-Datum.

---

## 4. Aktiver Einwand in der Follow-up-Phase

Wenn auf eine Nachfassung ein Einwand kommt (Preis, Timing, Scope), nicht neu erklären.

### Muster: Preis-Einwand
Verstanden. Ich würde das nicht am Preis drehen, sondern eher fragen: Wenn wir den Einstieg auf [Kernhebel] eng halten und den Rest als späteren optionalen Schritt anlegen — wäre das leichter entscheidbar?

### Muster: Timing-Einwand
Macht Sinn. Dann kein Druck. Die Frage wäre nur: komplett auf später, oder ein kleiner Vorbereitungsschritt jetzt damit der Start später leichter wird? Beides ist okay.

### Muster: Scope-Unsicherheit
Genau dafür würde ich den Einstieg bewusst nicht zu groß machen. Der sauberste Start wäre [X], weil damit der Hauptengpass zuerst gelöst wird. Macht das als Phase 1 Sinn?

### Muster: Interne Abstimmung
Klar. Wenn es hilft, fasse ich das in 5–7 Sätzen zusammen, die intern leicht prüfbar sind: Problem, Umfang, Ergebnis, Zeitraum, Preis. Dann setzen wir direkt einen Zeitpunkt, wann wir danach wieder kurz draufschauen.

---

## 5. Wiedervorlage für spätere Leads

### 30–90 Tage später
Hallo {Name}, wir hatten vor einiger Zeit wegen {Thema} Kontakt.
Ich wollte kurz nachfragen, ob das Thema inzwischen wieder aktueller ist.
Falls ja, kann ich dir den nächsten sinnvollen Schritt dazu direkt einordnen — ohne lange Anlaufzeit.

---

## 6. Dokumentationspflicht nach jedem Touch

Nach jeder Nachricht in der Lead-Liste aktualisieren:
- `last_contact_at`
- `next_followup_date`
- `status`
- `notes` (inkl. ob Einwand geäußert wurde und welcher)
- falls relevant: `reason_lost`
- bei Einwand: `objection_type` notieren

Ohne diese Pflege wird Follow-up chaotisch und Leads bleiben unsichtbar liegen.

---

## 7. Wann Follow-up-Sequenz verlassen und entscheiden

Nach spätestens **3 Kontaktversuchen ohne klare Reaktion**:

| Situation | Richtige Aktion |
|---|---|
| Lead kalt, kein Einwand | `verloren` oder `pausiert` mit Datum |
| Lead signalisiert später | `pausiert`, Wiedervorlage setzen |
| Lead gibt Einwand | Einwand direkt adressieren, dann Entscheidung forcieren |
| Lead gibt unklares Halb-Ja | Direktfrage: Umfang oder Timing das Thema? |

Nicht endlos in höflicher Unschärfe hängenbleiben.
