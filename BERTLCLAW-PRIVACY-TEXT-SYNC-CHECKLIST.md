# BertlClaw Privacy Text Synchronization Checklist

Stand: 2026-04-02

Zweck: Diese Checkliste verhindert, dass Website-Realität, Tool-/Processor-Register, Formularhinweise und `datenschutz.html` auseinanderlaufen.

Sie ist für genau den Moment gedacht, in dem ein neuer Kontaktkanal, ein neues Tool, ein neuer Datenfluss oder eine Änderung am Lead-Prozess geplant ist.

Kein Ersatz für Rechtsberatung. Aber operativ genau das Dokument, das vor jedem Livegang einmal durchgehakt werden sollte.

---

## 1) Wann diese Checkliste Pflicht ist

Immer verwenden, wenn mindestens einer dieser Punkte betroffen ist:

- neues Tool oder neuer Dienstleister
- neues Script / Embed / Pixel / Widget
- neuer Kontaktkanal
- neues Formularfeld
- neue Automatisierung / Weiterleitung / CRM-Sync
- geänderte Speicherlogik
- geänderte Empfänger / neues Drittland
- neuer Chat / Terminbuchung / Newsletter / Tracking-Setup
- stärkere Nutzung von WhatsApp, E-Mail-Automation oder Lead-Listen

Wenn nur ein Tippfehler in normalem Seitencontent korrigiert wird: nicht nötig.

---

## 2) Das Synchronisationsprinzip

Vor Go-Live müssen diese 4 Ebenen zusammenpassen:

1. **Technische Realität**  
   Was die Website oder der Prozess wirklich tut
2. **Tool-/Processor-Register**  
   `BERTLCLAW-TOOL-AND-PROCESSOR-REGISTER.md`
3. **Erhebungspunkt-Text**  
   Formularhinweis, CTA-Nähe, Mikrocopy, ggf. Zwei-Klick-Hinweis
4. **Datenschutzerklärung**  
   `datenschutz.html`

Wenn eine Ebene abweicht, ist der Stand **nicht synchron**.

---

## 3) Schnelltest: Ist etwas textrelevant?

Beantworte für die Änderung diese Fragen:

- Werden personenbezogene Daten neu erhoben?
- Werden vorhandene Daten anders genutzt?
- Gehen Daten an einen neuen Empfänger?
- Wird ein Dienst technisch schon beim Seitenaufruf geladen?
- Kann der Nutzer die Änderung an einem Formular, Button oder Kanal direkt spüren?
- Entsteht ein neuer Erklärungsbedarf zu Zweck, Empfänger, Speicherdauer oder Consent?

Wenn **eine** Frage mit Ja beantwortet wird, muss diese Checkliste durchlaufen werden.

---

## 4) Kern-Checkliste vor Livegang

### A. Realität zuerst klären
- [ ] Wie heißt das Tool / der Prozess konkret?
- [ ] Was ist der genaue Zweck?
- [ ] Welche Daten sind tatsächlich betroffen?
- [ ] Wer ist Empfänger / Anbieter?
- [ ] Wann startet der Datenfluss: Seitenaufruf, Klick, Submit, intern manuell, Automation?
- [ ] Wo sitzt der Anbieter grob: AT / EU-EWR / Drittland / unklar?
- [ ] Bleibt es bei einer reinen Kontaktabwicklung oder kommt Tracking / Profiling / Scoring dazu?
- [ ] Werden Cookies, LocalStorage, Identifier oder externe Requests beim Aufruf ausgelöst?

Wenn diese Basisfragen nicht klar beantwortbar sind: **kein Livegang**.

### B. Register synchronisieren
- [ ] Bestehenden Register-Eintrag in `BERTLCLAW-TOOL-AND-PROCESSOR-REGISTER.md` gefunden oder neuen Eintrag angelegt
- [ ] Status korrekt gesetzt (`ACTIVE`, `APPROVED-NOT-LIVE`, `UNDER-REVIEW`, `BLOCKED`, `REMOVED`)
- [ ] Zweck aktualisiert
- [ ] Datenkategorien aktualisiert
- [ ] Trigger / Startpunkt korrekt eingetragen
- [ ] Empfängerregion / Transfer-Hinweis aktualisiert
- [ ] Consent-Status gesetzt
- [ ] DPA/AVV-Status gesetzt oder bewusst als offen markiert
- [ ] `Privacy-Text-Status` korrekt gesetzt (`erfasst`, `Update nötig`, `vor Live anpassen`)
- [ ] Nächster Review-Trigger ergänzt

**Stop-Regel:** Kein Tool auf `ACTIVE` setzen, solange `Privacy-Text-Status` nicht sauber geklärt ist.

### C. Erhebungspunkt prüfen
Diese Ebene wird oft vergessen. Sie ist wichtig, wenn der Nutzer Daten aktiv eingibt oder auf einen risikoreicheren Kanal gelenkt wird.

- [ ] Gibt es einen sichtbaren Hinweis direkt dort, wo die Daten eingegeben oder ausgelöst werden?
- [ ] Wird ein externer Empfänger genannt, wenn das praktisch relevant ist (z. B. Formspree)?
- [ ] Wird ein sensiblerer Kanal kenntlich gemacht, wenn sinnvoll (z. B. WhatsApp nicht für sensible Inhalte)?
- [ ] Ist der Link zur `datenschutz.html` direkt am Erhebungspunkt vorhanden?
- [ ] Falls Consent nötig ist: wird vor Aktivierung blockiert statt nur erklärt?
- [ ] Falls Zwei-Klick-Lösung genutzt wird: ist der erste Klick informierend und nicht schon datenübertragend?

### D. Datenschutzerklärung synchronisieren
Für jede Änderung prüfen:

- [ ] Tool / Kanal / Prozess ist in `datenschutz.html` inhaltlich erfasst
- [ ] Zweck ist verständlich beschrieben
- [ ] betroffene Datenarten sind grob passend beschrieben
- [ ] Empfänger / Anbieter ist genannt oder sinnvoll beschrieben
- [ ] Drittland-/Transfer-Hinweis ist konsistent zum Register
- [ ] Rechtsgrundlage ist intern konsistent zur aktuellen Arbeitsannahme
- [ ] Speicherlogik / Löschlogik ist zumindest grob abgebildet
- [ ] Consent-/Cookie-/Einwilligungslogik passt zur technischen Realität
- [ ] Datenschutztext behauptet nichts, was technisch nicht mehr stimmt

### E. Live-Website gegentesten
- [ ] `datenschutz.html` ist erreichbar
- [ ] `impressum.html` ist erreichbar
- [ ] Formularhinweis ist sichtbar
- [ ] Footer-/Legal-Links funktionieren auf Desktop und mobil
- [ ] neuer Kanal / neues Tool ist nicht live, bevor Textanpassung sichtbar ist
- [ ] keine alte Aussage blieb an anderer Stelle stehen (z. B. Unterseite, Danke-Seite, CTA-Box, FAQ)

---

## 5) Feld-zu-Text-Mapping

Diese Tabelle macht die Synchronisation schnell prüfbar.

| Wenn sich im Register ändert … | Dann mindestens prüfen in … | Typischer Anpassungspunkt |
|---|---|---|
| Tool / Verarbeitung | `datenschutz.html` | eigener Abschnitt oder bestehender Absatz |
| Anbieter / Empfänger | `datenschutz.html` | Empfänger-/Dienstleisterbeschreibung |
| Zweck | `datenschutz.html`, ggf. Formularhinweis | Zwecktext / Transparenztext |
| Datenkategorien | `datenschutz.html` | Beschreibung der verarbeiteten Daten |
| Trigger / Startpunkt | `datenschutz.html`, Consent-Logik, Einbindung | „bei Aufruf“, „nach Klick“, „bei Absenden“ |
| Consent-Status | Banner-/Blockierlogik, `datenschutz.html`, Erhebungspunkt | Einwilligung vor Aktivierung |
| Privacy-Text-Status | Release-Entscheidung | darf nicht offen bleiben |
| DPA/AVV-Status | interne Doku, Register | nicht zwingend in Website-Text, aber für Freigabe relevant |
| Speicherlogik | `datenschutz.html` | Aufbewahrung / Löschlogik |
| Notes zu Risiken | Gate-Entscheidung | GELB / ORANGE / ROT |

---

## 6) Typische BertlClaw-Szenarien

### Szenario 1 — Neues Formularfeld
Beispiele: Budget, Branche, Upload, gewünschter Termin.

Pflicht:
- [ ] Register-Zeile BCL-002 prüfen/aktualisieren
- [ ] Formularhinweis prüfen, ob neue Sensitivität entsteht
- [ ] `datenschutz.html` bei Datenarten oder Zweck nachziehen
- [ ] prüfen, ob das Feld wirklich nötig ist

Meist: **GELB**.

### Szenario 2 — Analytics einbauen
Beispiele: Plausible, GA4, Clarity.

Pflicht:
- [ ] neue Register-Zeile aktiv pflegen (`BCL-101`/`BCL-102` oder neue ID)
- [ ] Consent-Frage vorab entscheiden
- [ ] `datenschutz.html` um Analytics-Logik ergänzen
- [ ] prüfen, ob schon beim Seitenaufruf geladen wird
- [ ] prüfen, ob Banner / Consent-Blocker nötig ist

Meist: **ORANGE**.

### Szenario 3 — CRM / Lead-Liste live schalten
Beispiele: Google Sheet, Airtable, HubSpot, Pipedrive.

Pflicht:
- [ ] BCL-007 oder BCL-103 konkretisieren
- [ ] realen Empfänger und Speicherlogik benennen
- [ ] interne Zugriffskreise klären
- [ ] `datenschutz.html` ergänzen, wenn externe Dienstleister real eingebunden sind
- [ ] bei Tracking-/Scoring-Funktionen gesondert prüfen

Meist: **GELB bis ORANGE**.

### Szenario 4 — WhatsApp wird stärker gepusht
Beispiele: prominenter CTA, mehrere Unterseiten, Standardkanal in der Hero-Section.

Pflicht:
- [ ] prüfen, ob aktueller WhatsApp-Hinweis noch ausreicht
- [ ] prüfen, ob Mikrohinweis an CTA-nahen Stellen sinnvoll ist
- [ ] Datenschutztext und echte Kanal-Nutzung gegentesten
- [ ] keine sensiblen Inhalte aktiv anregen

Meist: **GELB**.

### Szenario 5 — Externes Chat-Widget oder KI-Chat
Beispiele: Intercom, Tawk, Crisp, API-Chat.

Pflicht:
- [ ] BCL-106/BCL-107 konkretisieren
- [ ] Startpunkt des Datenflusses technisch klären
- [ ] Logging / Speicherlogik / Training / Retention prüfen
- [ ] `datenschutz.html` ergänzen
- [ ] Consent-/ePrivacy-Frage prüfen
- [ ] Erhebungspunkt-Hinweis direkt am Chat/Launcher bedenken

Meist: **ORANGE**.

### Szenario 6 — Embed wie Calendly / Maps / Video
Pflicht:
- [ ] Register-Eintrag ergänzen oder schärfen
- [ ] prüfen, ob Zwei-Klick-Lösung nötig/sinnvoll ist
- [ ] `datenschutz.html` ergänzen
- [ ] Consent-/Load-Verhalten technisch prüfen

Meist: **ORANGE**.

---

## 7) Red Flags: sofort stoppen

Nicht live schalten, wenn einer dieser Punkte zutrifft:

- [ ] Tool ist technisch schon eingebaut, aber im Register nicht vorhanden
- [ ] Register sagt „nicht live“, Website lädt es trotzdem
- [ ] `datenschutz.html` erwähnt einen Prozess nicht, der real schon läuft
- [ ] Formular oder Chat erhebt Daten ohne sichtbaren Kontext-Hinweis
- [ ] Consent wäre wahrscheinlich nötig, wurde aber nicht entschieden
- [ ] Empfänger / Drittland / Zweck ist intern unklar
- [ ] Text behauptet „keine Tracking-Tools“, obwohl eines live ist
- [ ] WhatsApp / Chat / Newsletter wird aggressiv gepusht, aber rechtlich kaum erklärt

---

## 8) 5-Minuten-Sync-Review vor jedem Release

Diese Mini-Version reicht oft schon als letzte Bremse:

1. **Was ist neu?**  
   Tool, Kanal, Feld, Script, Empfänger?
2. **Steht es im Register?**  
   Wenn nein: zuerst dort eintragen.
3. **Muss der Nutzer es am Erhebungspunkt verstehen?**  
   Wenn ja: Mikrotext ergänzen.
4. **Steht es in `datenschutz.html` realistisch drin?**  
   Wenn nein: nachziehen.
5. **Lädt etwas schon beim Seitenaufruf oder setzt Identifier?**  
   Wenn ja/unklar: ORANGE.

---

## 9) Kurzprotokoll für Änderungen

```text
Änderung:
Datum:
Verantwortlich:

Betroffener Register-Eintrag:

Was ändert sich real?
- ...

Welche Texte wurden geprüft?
- [ ] Register
- [ ] Formular-/Erhebungspunkt-Hinweis
- [ ] datenschutz.html
- [ ] weitere betroffene Unterseiten / CTA-Bereiche

Consent-/ePrivacy-Risiko:
- nein / prüfen / ja

Synchronisationsstatus:
- vollständig / offen

Offene Punkte vor Live:
- ...
```

---

## 10) Empfehlung für den praktischen Einsatz

Einfacher Betriebsstandard für BertlClaw:

- **Kein neues Tool ohne Register-Zeile**
- **Kein neuer Datenfluss ohne Textabgleich**
- **Kein ORANGE-Thema ohne bewusste Freigabe**
- **Kein Release, wenn Register und `datenschutz.html` sich widersprechen**

Das Ziel ist nicht Papierproduktion, sondern: Die Website soll nach außen nur das versprechen und erklären, was intern und technisch auch wirklich passiert.
