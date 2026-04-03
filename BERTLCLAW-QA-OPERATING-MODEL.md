# BertlClaw QA Operating Model

Pragmatisches Betriebsmodell für einen permanenten Test-/Operator-Loop rund um die BertlClaw-Website und ihre angrenzenden Lead-Wege.

Ziel: **kein Leerlauf, keine unklaren Zuständigkeiten, keine Bugs ohne nächsten Schritt.**

---

## 1. Zweck

Die QA-Funktion bei BertlClaw soll nicht nur "testen", sondern aktiv dafür sorgen, dass:

- die öffentliche Website laufend benutzbar bleibt
- Formulare, CTAs und Kontaktwege funktionieren
- neue Probleme sauber dokumentiert und priorisiert werden
- Fixes zuverlässig retestet werden
- manuelle Blocker schnell eskaliert werden
- zwischen Testzyklen kein unnötiger Leerlauf entsteht

QA ist hier **Operator + Tester + Triage-Instanz**, nicht bloß ein passiver Abnahmepunkt.

---

## 2. Grundprinzipien

1. **Immer ein nächster Schritt.**
   Kein Fund bleibt ohne Owner, Status oder Follow-up.
2. **Klein, schnell, wiederholbar.**
   Lieber viele kurze Loops als seltene große Testtage.
3. **Öffentliche Risiken zuerst.**
   Alles, was Leads, Vertrauen oder Kontaktaufnahme blockiert, hat Vorrang.
4. **Reproduzierbarkeit vor Meinung.**
   Bugs brauchen URL, Gerät, Schrittfolge, erwartetes Verhalten, tatsächliches Verhalten.
5. **Retest ist Pflicht.**
   Ein gemeldeter Fix gilt erst nach Verifikation als erledigt.
6. **Wenn QA nichts Offenes hat, sucht QA aktiv nach dem nächsten wertvollen Check.**
   Kein Idle-Modus.

---

## 3. Scope: Was permanent geprüft wird

## Kritische Oberfläche
- Startseite
- Leistungsseiten
- Kontaktformular
- Danke-Seite
- Mailto-/WhatsApp-/Telefon-Links
- mobile Navigation / CTA-Erreichbarkeit
- sichtbare Copy-/Layout-Brüche
- offensichtliche Lade-/Rendering-Probleme

## Kritische Journeys
- Hero -> CTA -> Kontakt
- Service-Seite -> CTA -> Kontakt
- Chat -> Formularübernahme
- Formular -> Submit -> Danke-Seite
- WhatsApp-Link -> vorbefüllte Nachricht / sinnvoller Einstieg
- E-Mail-CTA -> korrektes Ziel / Betreff

## Operativ angrenzend
- Lead-Eingänge werden nicht "verschluckt"
- Form-/Kontaktweg bleibt vertrauenswürdig
- Freigaben / manuelle Inputs werden sauber angefordert

---

## 4. Rollenmodell

### QA Operator
Verantwortlich für:
- Test-Loops durchführen
- Bugs dokumentieren
- Schweregrad einschätzen
- Retest durchführen
- Blocker eskalieren
- Warteschlange aktiv leerhalten

### Builder / Fix-Owner
Verantwortlich für:
- Ursache beheben
- auf Rückfragen von QA reagieren
- bei Fixes klar markieren, was geändert wurde
- Status auf "ready for retest" setzen

### Human Operator (Dominic)
Verantwortlich für:
- echte manuelle Freigaben
- Zugriff auf externe Systeme / Geräte / Konten
- Entscheidungen bei Graubereichen
- Priorisierung, wenn mehrere kritische Themen gleichzeitig offen sind

Wichtig: **QA darf priorisieren und eskalieren, aber nicht so tun, als hätte manuelle Freigabe bereits stattgefunden.**

---

## 5. Source of Truth für QA

Empfehlung: eine einzige zentrale QA-/Bug-Liste.

Minimal nötige Spalten:
- `bug_id`
- `created_at`
- `title`
- `type` (bug / ux-risk / content / tracking / access-blocker)
- `severity` (P0 / P1 / P2 / P3)
- `status`
- `page_or_flow`
- `environment`
- `steps_to_reproduce`
- `expected`
- `actual`
- `evidence`
- `owner`
- `needs_manual_access` (yes/no)
- `next_action`
- `retest_after`
- `closed_at`
- `notes`

### Empfohlene Statuswerte
- `new`
- `triaged`
- `in_progress`
- `blocked_manual_access`
- `ready_for_retest`
- `retested_pass`
- `retested_fail`
- `closed`
- `won't_fix_for_now`

Kein Bug ohne Status. Kein Status ohne Owner oder nächsten Schritt.

---

## 6. Priorisierung

### P0 — sofort
Blockiert Kernfunktion oder zerstört Vertrauen direkt.

Beispiele:
- Formular sendet nicht
- Kontaktwege kaputt
- schwere Mobile-Unbenutzbarkeit
- falsche oder kaputte Kern-CTA-Links
- blank page / starke Rendering-Ausfälle

**Ziel:** sofort aufnehmen, sofort eskalieren, Fix/Reaktion noch im selben Loop anstoßen.

### P1 — hoch
Wichtige Journey funktioniert, aber mit deutlicher Reibung oder Fehlverhalten.

Beispiele:
- Chat-zu-Form verliert Inhalt
- CTA sichtbar, aber schlecht bedienbar
- Danke-Seite fehlerhaft
- Layout bricht auf häufigen Mobile-Größen

**Ziel:** heute triagieren, zeitnah fixen / retesten.

### P2 — mittel
Kein Blocker, aber klarer Qualitätsverlust.

Beispiele:
- Copy-Fehler, kleinere visuelle Bugs, inkonsistente Abstände, nicht-kritische UI-Probleme

### P3 — niedrig
Polish, Nice-to-have, Beobachtung.

---

## 7. Der permanente QA-Loop

## Standardreihenfolge pro Loop
1. **Queue prüfen**
   - offene Bugs
   - offene Retests
   - blockierte Themen
2. **Kritische Smoke-Checks fahren**
   - Homepage
   - 1-2 Service-Seiten
   - Kontaktflow
3. **Gezielte Tiefenchecks**
   - auf geänderte Bereiche
   - auf bekannte Risikozonen
4. **Funde sofort dokumentieren**
5. **Triage + Priorisierung direkt beim Fund**
6. **Falls Fix gemeldet wurde: Retest zuerst**
7. **Wenn nichts offen ist: proaktiv nächstes Prüffeld wählen**

## Was "kein Idle" konkret heißt
Wenn keine offenen P0/P1-Bugs und keine Retests da sind, dann geht QA in dieser Reihenfolge weiter:
1. kritische Journey auf Mobile prüfen
2. kritische Journey auf Desktop prüfen
3. letzte geänderte Seite prüfen
4. ältere Service-Seite gegen Qualitätsdrift prüfen
5. CTA-/Link-Audit
6. Formular-/Nachrichtentexte auf Klarheit prüfen
7. Backlog-P2/P3 neu bewerten

QA wartet nicht passiv auf Tickets.

---

## 8. Bug-Erfassung: Pflichtstandard

Jeder echte Fund braucht mindestens:

- **Titel:** kurz und konkret
- **Seite / Flow:** wo genau?
- **Umgebung:** Desktop/Mobile, Browser, falls relevant Displaygröße
- **Schritte:** 3-7 klare Schritte
- **Erwartet:** was sollte passieren?
- **Ist:** was passiert stattdessen?
- **Schweregrad:** P0-P3
- **Beleg:** Screenshot, Textausschnitt oder klare Beobachtung
- **Nächster Schritt:** fixen, beobachten, manuelle Freigabe holen, retest planen

Schwache Tickets erzeugen Schleifen. QA soll lieber 2 Minuten mehr dokumentieren als 20 Minuten Rückfragen provozieren.

---

## 9. Triage-Regeln

Bei jedem Fund sofort klären:

1. **Ist es reproduzierbar?**
2. **Wie viele Nutzer/Journeys betrifft es?**
3. **Betrifft es Lead-Erzeugung, Vertrauen oder Conversion direkt?**
4. **Ist ein Fix ohne menschlichen Zugriff möglich?**
5. **Braucht es nur Retest oder echte Ursachenanalyse?**

### Triage-Entscheidungsmatrix
- **reproduzierbar + conversion-kritisch** -> P0/P1
- **reproduzierbar + nicht-kritisch** -> P2/P3
- **nicht sicher reproduzierbar** -> Beobachtung anlegen + gezielten Wiederholungstest planen
- **manueller Zugang nötig** -> `blocked_manual_access` + Escalation Pack senden

---

## 10. Retest-Prozess

Fixes gelten erst als fertig, wenn QA aktiv retestet hat.

## Ablauf
1. Fix-Owner meldet: was geändert wurde
2. QA öffnet Originalticket
3. QA reproduziert den ursprünglichen Fehlerpfad erneut
4. QA prüft zusätzlich 1-2 angrenzende Pfade
5. QA dokumentiert Ergebnis

## Mögliche Retest-Ergebnisse
### Pass
- Originalproblem weg
- keine offensichtliche Regression im benachbarten Flow
- Status -> `retested_pass` -> `closed`

### Fail
- Bug besteht weiter, oder
- ursprünglicher Fehler weg, aber neuer Bruch entstanden
- Status -> `retested_fail`
- Notiz: was genau noch falsch ist
- Ticket bleibt offen oder wird aufgesplittet

### Partial
- Hauptproblem verbessert, aber nicht sauber gelöst
- nicht einfach schließen
- entweder neues Subticket oder Rückgabe mit klarer Restarbeit

## Retest-Regel
**Nie nur den Happy Path retesten.**
Mindestens ein angrenzender Pfad mitprüfen:
- gleiche Journey auf Mobile/Desktop
- ähnliche CTA derselben Seite
- Submit + Danke-Seite statt nur Klick auf Button

---

## 11. Escalation: wenn manueller Zugriff nötig ist

Manche Themen kann QA nicht selbst sauber abschließen.

Beispiele:
- Zugriff auf Formspree / Mailbox / externe Accounts fehlt
- WhatsApp-/Telefon-Verhalten muss auf realem Gerät geprüft werden
- DNS / GitHub / Hosting / Search Console / Meta- oder Google-Einstellungen brauchen Human-Zugriff
- jurische / inhaltliche Freigabe nötig

## Dann gilt
QA darf nicht warten und hoffen.
QA erstellt sofort ein **Escalation Pack** mit:

- **Problem:** was ist blockiert?
- **Auswirkung:** warum relevant?
- **Was schon geprüft wurde:** um Doppelschleifen zu vermeiden
- **Was manuell gebraucht wird:** Login, Gerät, Screenshot, Freigabe, Testsendung etc.
- **Wie dringend:** P0/P1/P2/P3
- **Kleinster sinnvoller nächster Schritt:** exakt formuliert

### Gute Eskalation
"Kontaktformular funktioniert optisch, aber tatsächlicher Eingang kann ohne Zugriff auf Formspree/Postfach nicht bestätigt werden. Bitte 1 Test-Submit manuell verifizieren oder Postfach-Resultat prüfen. Priorität P0, weil Lead-Verlust nicht ausgeschlossen werden kann."

### Schlechte Eskalation
"Kannst du mal schauen?"

---

## 12. Standard-SLA intern

Pragmatische Zielwerte, nicht Bürokratie:

- **P0:** sofort in Arbeit / sofort eskalieren
- **P1:** am selben Tag triagieren, Retest nach Fix priorisieren
- **P2:** bündeln, aber nicht vergessen
- **P3:** in ruhigen Phasen abarbeiten oder bewusst parken

- **Retest ready** sollte nicht lange liegen bleiben.
- Ein Fix ohne Retest ist operativ nur "behauptet", nicht bestätigt.

---

## 13. Standard-Testpakete

## A. 5-Minuten-Smoke-Test
- Startseite lädt
- Haupt-CTA sichtbar
- mindestens 1 Service-Seite okay
- Kontaktbereich erreichbar
- Formularfelder bedienbar
- Submit-Pfad plausibel / Danke-Seite erreichbar

## B. Mobile Conversion Check
- Hero verständlich ohne Zoomen
- CTA früh sichtbar
- Navigation / Buttons tappable
- Formular auf Mobile nicht nervig oder kaputt
- WhatsApp-/Telefon-Links sinnvoll

## C. Post-Change Retest Pack
- direkt geänderte Stelle
- voriger Bugpfad
- 1 angrenzende Seite
- 1 angrenzender CTA oder Formularschritt

## D. Weekly Confidence Sweep
- Startseite
- alle Service-Seiten
- Kontaktformular
- Danke-Seite
- Footer-Links
- Impressum / Datenschutz / zentrale Vertrauenselemente

---

## 14. Definition of Done für QA

Ein Thema ist erst wirklich fertig, wenn:

- der Fund dokumentiert wurde
- der Schweregrad gesetzt wurde
- der Owner klar ist
- der Fix erfolgt ist oder bewusst verschoben wurde
- der Retest erledigt wurde
- das Ergebnis dokumentiert ist
- kein unklarer Reststatus mehr offen ist

---

## 15. Minimaler täglicher Betriebsrhythmus

### Start des Tages / der QA-Phase
- offene P0/P1 prüfen
- offene Retests zuerst
- blockierte Tickets mit manueller Abhängigkeit prüfen
- dann Smoke-Test

### Mitte des Tages / nächster Loop
- neue Änderungen gezielt prüfen
- offene Rückläufer retesten
- P2/P3-Bundle oder Exploratory Check

### Ende des Tages / Loop-Abschluss
- alles Offene mit Status und nächstem Schritt versehen
- keine "still offenen" Bugs ohne Datum
- Blocker sauber eskaliert

---

## 16. Praktische Leitlinie für BertlClaw

Wenn Volumen klein bis mittel ist, ist das beste QA-System:

- **eine zentrale Bug-/QA-Liste**
- **kurze wiederholbare Smoke-Loops**
- **harte Retest-Disziplin**
- **klare Eskalation bei manuellem Zugriff**
- **kein Leerlauf: immer nächster wertvoller Check**

Das ist deutlich besser als ein kompliziertes QA-Tool ohne echte Disziplin.
