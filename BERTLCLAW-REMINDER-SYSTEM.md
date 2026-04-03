# BERTLCLAW-REMINDER-SYSTEM

Ziel: stündliche Fortschrittsupdates zu jeder vollen Stunde (CEST), tägliche Erinnerung an das offene GitHub-Support-Ticket und ein verlässlicher Status-/Log-Rhythmus.

## 1. Reminder-Typen

### A. Stündliches Fortschrittsupdate
- Frequenz: jede volle Stunde
- Inhalt:
  - was seit dem letzten Update erledigt wurde
  - was gepusht wurde
  - welcher Stream woran arbeitet
  - offene To-dos / nächster wirtschaftlicher Hebel

### B. Tägliche GitHub-Ticket-Erinnerung
- Frequenz: 1x täglich
- Inhalt:
  - Status des offenen GitHub-Support-Tickets
  - ob Antwort eingegangen ist
  - was als Nächstes nötig ist

## 2. Minimaler technischer Zielzustand

Der Minimalpfad ist jetzt lokal vorbereitet:
- `bertlclaw-tools/reminder-heartbeat.js` schreibt maschinische Reminder-State-Daten und Logeinträge
- `state/bertlclaw-reminders.json` hält `last_hourly_update_at` und `last_daily_github_ticket_reminder_at`
- `bertlclaw-tools/reminder-audit.js` prüft fehlende Stundenfenster gegen `logs/bertlclaw-operations.log`
- `qa-artifacts/reminder-audit/latest.json` dient als prüfbares Audit-Artefakt

Für echte Verlässlichkeit muss dieses System noch per externer Trigger-Logik laufen (Cron / Heartbeat / Scheduler). Bis dahin ist die technische Basis aber nicht mehr nur Policy, sondern lokal ausführbar und auditierbar.

## 3. Reminder-Inhalte

### Stündliches Update – Format
- Zeitstempel in CEST
- Fortschritt je Stream
- neue Commits / Pushes
- aktuelle Blocker
- nächster Schritt

### Tägliche Ticket-Erinnerung – Format
- Zeitstempel in CEST
- Ticket noch offen: ja/nein
- Antwort eingegangen: ja/nein
- nächste Aktion

## 4. Log-Verknüpfung
- zu jedem Reminder soll ein Logeintrag in `logs/bertlclaw-operations.log` entstehen
- Format:
  - `[YYYY-MM-DD HH:MM CEST] hourly update sent ...`
  - `[YYYY-MM-DD HH:MM CEST] daily ticket reminder sent ...`

## 5. Offene technische Umsetzung

### Bereits lokal umgesetzt
- Heartbeat-Script mit Log-Kopplung (`bertlclaw-tools/reminder-heartbeat.js`) — verifiziert funktionsfähig am 2026-04-03
- State-Datei für letzte erfolgreiche Stunden-/Tagesausführung (`state/bertlclaw-reminders.json`)
- Audit-Script für fehlende Stundenfenster (`bertlclaw-tools/reminder-audit.js`) — verifiziert funktionsfähig
- prüfbares JSON-Audit-Artefakt (`qa-artifacts/reminder-audit/latest.json`)

### Noch nötig (BCQA-002)
- echte Scheduler-/Cron-/Heartbeat-Anbindung
- klarer Trigger für jede volle Stunde außerhalb manueller CLI-Ausführung
- klarer Trigger für 1x tägliche GitHub-Ticket-Erinnerung außerhalb manueller CLI-Ausführung
- optional: separater Alert, wenn das Audit fehlende Stunden meldet

### Lückenanalyse (Stand 2026-04-03)
Das Audit zeigt: am 2026-04-03 wurden 5 von 6 Stunden-Slots (08:00–12:00) nicht bedient.
Ursache: `reminder-heartbeat.js` wird nur manuell/durch Subagenten ausgeführt — kein dauerhafter Scheduler aktiv.
Audit-Status: **FAIL** (5 fehlende Slots im 6h-Fenster).
Bestehende OpenClaw Cron Jobs für BertlClaw: **keine**.

## 5a. Fix-Pfad: Scheduler-Verdrahtung

### Option A — OpenClaw Cron (empfohlen, native Integration)

**Stündlicher Heartbeat via System-Event:**
```
openclaw cron add \
  --name "bertlclaw-reminder-heartbeat" \
  --cron "0 * * * *" \
  --tz "Europe/Vienna" \
  --exact \
  --system-event "BertlClaw stündlicher Reminder-Heartbeat: node bertlclaw-tools/reminder-heartbeat.js ausführen und Audit-Status prüfen" \
  --description "Stündlicher BertlClaw Reminder-Heartbeat (BCQA-002)"
```

**Alternativ mit --every:**
```
openclaw cron add \
  --name "bertlclaw-reminder-heartbeat" \
  --every 1h \
  --exact \
  --system-event "BertlClaw stündlicher Reminder-Heartbeat: node bertlclaw-tools/reminder-heartbeat.js ausführen" \
  --description "Stündlicher BertlClaw Reminder-Heartbeat (BCQA-002)"
```

### Option B — System-Crontab (direkte Shell-Ausführung, kein Agent-Overhead)

Eintrag via `crontab -e`:
```
# BertlClaw hourly reminder heartbeat (BCQA-002)
0 * * * * cd /home/dominic/.openclaw/workspace && node bertlclaw-tools/reminder-heartbeat.js >> logs/bertlclaw-cron.log 2>&1
```

**Empfehlung:** Option A (openclaw cron) für native Integration und Sichtbarkeit im OpenClaw Dashboard. Option B als schnellster Sofort-Fix ohne Gateway-Abhängigkeit.

### Aktivierungsreihenfolge
1. Einen der beiden obigen Befehle ausführen
2. Prüfen mit `openclaw cron list` (Option A) oder `crontab -l` (Option B)
3. Nächste volle Stunde abwarten und `node bertlclaw-tools/reminder-audit.js` ausführen → Status muss auf `pass` wechseln

## 6. Übergangsregel bis zur technischen Verdrahtung
- volle Stunden als feste Reporting-Zeitpunkte behandeln
- GitHub-Ticket täglich erwähnen, bis es gelöst ist
- Reminder-System als aktiven offenen To-do-Punkt führen (BCQA-002)
- Subagenten führen `reminder-heartbeat.js` manuell aus, bis Cron aktiv ist
