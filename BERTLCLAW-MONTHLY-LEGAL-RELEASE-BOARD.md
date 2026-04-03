# BertlClaw Monthly Legal Release Board

Stand: 2026-04-02
Owner: Dominic Reisenbichler / BertlClaw
Purpose: kompaktes operatives Board für den monatlichen Legal-/Compliance-Review und für Release-Freigaben mit Außenwirkung.

Dieses Dokument verbindet die bereits vorhandenen Artefakte:
- `BERTLCLAW-TOOL-AND-PROCESSOR-REGISTER.md`
- `BERTLCLAW-PRIVACY-TEXT-SYNC-CHECKLIST.md`
- `BERTLCLAW-TOOL-DEPLOYMENT-CONSENT-WORKSHEET.md`
- `BERTLCLAW-LEGAL-DEPLOYMENT-GATE-AND-CHANGE-TRIGGERS.md`

Es ist absichtlich knapp gehalten. Ziel ist nicht neue Theorie, sondern ein Board, das man tatsächlich jeden Monat und vor relevanten Releases ausfüllt.

Kein Ersatz für Rechtsberatung. Aber das operative Freigabeformat für BertlClaw.

---

## 1) Wann dieses Board benutzt wird

### A. Monatlich
Einmal pro Monat als kurzer Reality-Check:
- stimmen Website und Rechtstexte noch zusammen?
- wurden neue Tools, Kanäle oder Scripts ergänzt?
- ist ein geplanter Ausbau in ORANGE/ROT gelandet?
- gibt es offene DPA-/Transfer-/Consent-Baustellen?

### B. Vor jedem relevanten Release
Pflicht, wenn mindestens einer dieser Punkte betroffen ist:
- neues Tool / neuer Dienstleister
- neues Formularfeld / neuer Lead-Prozess
- neue Automatisierung / CRM / Newsletter / Scheduling
- neue Embeds / Tracking / Analytics / Pixel / Spam-Schutz
- neuer Chat / KI-Backend / externer Kommunikationsdienst
- neue Testimonials / Referenzen / Kundenlogos mit Freigabebedarf
- Änderungen an `datenschutz.html`, `impressum.html` oder Erhebungspunkt-Texten

Wenn nur reine Copy- oder Design-Änderungen ohne Datenfluss erfolgen: Kurzvermerk `No legal trigger affected` reicht.

---

## 2) Board-Regel: fünf Pflichtquellen

Vor einer Freigabe müssen diese fünf Dinge zusammenpassen:

1. **Technische Realität**
2. **Tool-/Processor-Register**
3. **Privacy-Text-Sync**
4. **Consent-/Tool-Worksheet**
5. **Deployment-Gate-Status**

Wenn eine Ebene fehlt oder widersprüchlich ist, geht das Board automatisch auf **ORANGE** oder **ROT**.

---

## 3) Schnellansicht: Board auf einer Seite

```text
Board-Zeitraum / Release:
Datum:
Verantwortlich:

Typ:
- Monatsreview
- Release-Freigabe
- Sonderprüfung

Kurzbeschreibung der Änderung / des Review-Scopes:

Betroffene Seiten / Touchpoints:

Betroffene Register-IDs:

Statusübersicht:
- Tool-Register aktuell? ja / nein
- Privacy-Sync vollständig? ja / nein
- Consent-Worksheet nötig? ja / nein
- Consent-Worksheet abgeschlossen? ja / nein / nicht nötig
- Deployment-Gate-Status: GRÜN / GELB / ORANGE / ROT

Gesamtentscheidung:
- FREIGEGEBEN
- FREIGEGEBEN UNTER BEDINGUNGEN
- NICHT FREIGEGEBEN
```

---

## 4) Operatives Review-Board

### Block A — Reality Check

```text
1. Was ist seit dem letzten Review real neu?
- neues Tool:
- neuer Kanal:
- neues Formularfeld:
- neuer Empfänger:
- neues Script/Embed:
- neuer Datenfluss:
- keine Änderung:

2. Gibt es etwas, das schon live ist, aber bisher nicht dokumentiert war?
- nein
- ja: ______

3. Gibt es ein Tool im Register mit Status UNDER-REVIEW / BLOCKED / APPROVED-NOT-LIVE,
   das technisch versehentlich schon aktiv ist?
- nein
- ja: ______
```

**Stop-Regel:** Wenn etwas real live ist, aber im Register fehlt oder falsch klassifiziert ist, mindestens **ORANGE**.

---

### Block B — Register Sync

Prüfen gegen `BERTLCLAW-TOOL-AND-PROCESSOR-REGISTER.md` und optional `bertlclaw-tool-register.csv`.

- [ ] alle realen ACTIVE-Tools/Kanäle sind im Register enthalten
- [ ] Status je Eintrag stimmt mit der Realität überein
- [ ] neue oder geänderte Einträge haben klare Datenkategorien
- [ ] Trigger / Startpunkt ist korrekt eingetragen
- [ ] Empfängerregion / Transferhinweis ist nicht offensichtlich falsch
- [ ] Consent-Status ist gesetzt
- [ ] DPA/AVV-Status ist gesetzt oder bewusst als offen markiert
- [ ] `Privacy-Text-Status` ist nicht veraltet
- [ ] nächster Review-Trigger ist dokumentiert

**Board-Ergebnis Register:**
- GRÜN = vollständig aktuell
- GELB = kleinere Doku-Nachzüge nötig
- ORANGE = reale Lücke oder unklare Tool-Lage
- ROT = Live-Tool ohne Register-/Statusklarheit

---

### Block C — Privacy Sync

Prüfen gegen `BERTLCLAW-PRIVACY-TEXT-SYNC-CHECKLIST.md`.

- [ ] `datenschutz.html` bildet die reale Verarbeitung ab
- [ ] Erhebungspunkt-Hinweise passen noch zur aktuellen Formular-/CTA-Realität
- [ ] WhatsApp / E-Mail / Telefon / Formular stimmen mit dem Text überein
- [ ] neue Empfänger / Anbieter sind transparent erklärt
- [ ] Speicher-/Löschlogik ist nicht offensichtlich überholt
- [ ] Consent-/Cookie-Logik im Text passt zur realen Einbindung
- [ ] `impressum.html` und `datenschutz.html` sind erreichbar
- [ ] Footer-/Legal-Links funktionieren auf Desktop und mobil

**Board-Ergebnis Privacy Sync:**
- GRÜN = synchron
- GELB = Textupdate vor/nach kleinem Release nötig
- ORANGE = Texte und Realität laufen auseinander
- ROT = Live-Verarbeitung ohne passende Transparenzbasis

---

### Block D — Consent / ePrivacy / Trigger Review

Prüfen gegen `BERTLCLAW-TOOL-DEPLOYMENT-CONSENT-WORKSHEET.md` und `BERTLCLAW-LEGAL-DEPLOYMENT-GATE-AND-CHANGE-TRIGGERS.md`.

Für jede neue oder geänderte Verarbeitung kurz markieren:

| Thema | Nein | Ja | Unklar |
|---|---|---|---|
| Lädt ein externer Dienst schon beim Seitenaufruf? | [ ] | [ ] | [ ] |
| Werden Cookies / Identifier / Endgeräteinfos gesetzt oder gelesen? | [ ] | [ ] | [ ] |
| Wird Verhalten gemessen, analysiert oder Profiling möglich? | [ ] | [ ] | [ ] |
| Gehen Daten an neuen externen Anbieter / Prozessor? | [ ] | [ ] | [ ] |
| Gibt es Drittland-/Transferbezug oder unklare Anbieterregion? | [ ] | [ ] | [ ] |
| Wurde ein DPA/AVV-Thema ausgelöst? | [ ] | [ ] | [ ] |
| Wäre eine Zwei-Klick- oder Blockierlösung nötig/sinnvoll? | [ ] | [ ] | [ ] |

### Entscheidungslogik
- Wenn alles klar auf **Nein** steht: meist **GRÜN** oder **GELB**
- Wenn irgendwo **Ja** oder **Unklar** bei Tracking/Identifier/Seitenaufruf/Drittland steht: mindestens **ORANGE**
- Wenn das Thema schon live ist, obwohl Consent-/Trigger-Fragen offen sind: **ROT**

---

### Block E — Außenwirkung / Belegbarkeit

- [ ] neue Testimonials / Kundenlogos / Reviews wurden geprüft
- [ ] Freigaben sind dokumentiert
- [ ] keine neuen absoluten oder schwer belegbaren Claims live gegangen
- [ ] Case-/Proof-Nutzung passt zur Freigabelage

Wenn hier etwas offen ist: mindestens **GELB**, bei Personenbezug oder unklarer Freigabe ggf. **ORANGE/ROT**.

---

## 5) Monatsboard: Ampelmatrix

### GRÜN
Alles Wesentliche stimmt:
- Register aktuell
- Rechtstexte synchron
- keine neuen problematischen Trigger
- keine offenen Live-Themen mit Consent-/Transfer-/Freigabelücke

**Aktion:** weiter betreiben, nächstes Monatsreview planen.

### GELB
Beherrschbar, aber Nacharbeit nötig:
- Text-/Register-Update offen
- Mikrohinweis oder Impressum-/Datenschutzpflege offen
- kleiner DPA-/Provider-Nachzug offen

**Aktion:** To-do mit Frist setzen; Release nur, wenn die Nacharbeit vor Go-Live abgeschlossen wird.

### ORANGE
Relevante Prüfung oder technische Klarstellung fehlt:
- Consent-/ePrivacy-Frage offen
- Tool lädt evtl. schon beim Seitenaufruf
- neuer Anbieter / Drittland / DPA-Lage unklar
- Register und Website laufen auseinander

**Aktion:** kein stiller Release. Erst Worksheet, Text-Sync und technische Klärung abschließen.

### ROT
Nicht freigeben:
- neues Tool live ohne Register/Doku
- Tracking/Embed/Chat/Spam-Schutz live ohne saubere Prüfung
- Datenschutzerklärung widerspricht realem Verhalten
- Rechts-/Freigabelage bei Testimonials/Personenbezug unklar
- Impressum/Datenschutz defekt oder nicht erreichbar

**Aktion:** stoppen, zurückbauen oder vor Live vollständig klären.

---

## 6) Monatsprotokoll-Vorlage

Diesen Block kann BertlClaw monatlich kopieren und unten anhängen.

```text
## Monatsreview — YYYY-MM

Review-Datum:
Reviewer:

Scope:
- Website / Landingpages
- Kontaktformular
- Kontaktkanäle
- Register / Rechtstexte
- geplante Tools / Releases

1. Neue reale Änderungen seit letztem Review
- ...

2. Register-Status
- vollständig aktuell / kleine Updates nötig / Lücke gefunden
Details:
- ...

3. Privacy-Sync-Status
- synchron / teilweise offen / nicht synchron
Details:
- ...

4. Consent-/Trigger-Lage
- keine neuen Trigger / Trigger in Prüfung / kritischer Trigger offen
Details:
- ...

5. DPA-/Transfer-/Anbieter-Themen offen
- ...

6. Proof-/Claim-/Freigabe-Themen offen
- ...

Monatsampel:
- GRÜN / GELB / ORANGE / ROT

Entscheidung:
- weiter wie geplant
- nur mit Nacharbeit
- kein Release bis Klärung

Konkrete To-dos bis nächstes Review:
1. ...
2. ...
3. ...
```

---

## 7) Release-Freigabe-Vorlage

Diesen Block nur nutzen, wenn ein echter Go-Live oder eine relevante Änderung ansteht.

```text
## Release-Freigabe — [Name / Datum]

Änderung:
Betroffene Seiten / Prozesse:
Verantwortlich:

Ausgelöste Register-IDs:
- ...

Consent-Worksheet nötig?
- ja / nein
Wenn ja: abgeschlossen am ______

Privacy-Sync geprüft?
- ja / nein

Deployment-Gate-Ampel:
- GRÜN / GELB / ORANGE / ROT

Offene Punkte vor Live:
1. ...
2. ...
3. ...

Freigabeentscheidung:
- FREIGEGEBEN
- FREIGEGEBEN UNTER BEDINGUNGEN
- NICHT FREIGEGEBEN

Bedingungen / Auflagen:
- ...

Freigegeben von:
Datum:
```

---

## 8) Minimalrhythmus für BertlClaw

### Jeden Monat
1. dieses Board durchgehen
2. Register gegen reale Website prüfen
3. `datenschutz.html` gegen Register prüfen
4. offene UNDER-REVIEW-Kandidaten gegen tatsächliche Einbauten prüfen
5. Ampel setzen

### Vor jedem Tool-Rollout
1. Register-Eintrag anlegen/aktualisieren
2. Consent-Worksheet ausfüllen
3. Privacy-Sync prüfen
4. Release-Freigabe hier dokumentieren
5. erst dann live

---

## 9) Konkrete aktuelle Baseline für BertlClaw

Nach aktuellem Workspace-Stand ist die saubere Baseline:
- Hosting über GitHub Pages
- Kontaktformular über Formspree
- Kontaktkanäle E-Mail, Telefon, WhatsApp
- lokaler clientseitiger FAQ-/Prefill-Chat ohne externes Backend
- aktuell keine freigegebene Analytics-/Pixel-/Embed-/reCAPTCHA-/Backend-Chat-Live-Lage im Register

Daraus folgt für dieses Board aktuell:
- größter künftiger ORANGE-Trigger: Analytics, Embeds, Scheduling, Newsletter, externer Chat, Spam-Schutz, CRM mit Add-ons
- größte monatliche Routinefrage: stimmt die Live-Seite noch mit Register und `datenschutz.html` überein?

---

## 10) Praktische Regel in einem Satz

**Kein BertlClaw-Release mit neuem Datenfluss, neuem Tool oder neuer Außenwirkung ohne grünen oder bewusst akzeptierten gelb/orange dokumentierten Board-Stand.**
