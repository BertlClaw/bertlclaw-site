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

Für echte Verlässlichkeit sollte dieses System später per externer Trigger-Logik laufen (Cron / Heartbeat / Scheduler). Solange das nicht systemseitig verdrahtet ist, dient dieses Dokument als definierte Reminder-Policy und als Vorlage für die technische Umsetzung.

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

### Noch nötig
- echte Scheduler-/Cron-/Heartbeat-Anbindung
- klarer Trigger für jede volle Stunde
- klarer Trigger für 1x tägliche GitHub-Ticket-Erinnerung

## 6. Übergangsregel bis zur technischen Verdrahtung
- volle Stunden als feste Reporting-Zeitpunkte behandeln
- GitHub-Ticket täglich erwähnen, bis es gelöst ist
- Reminder-System als aktiven offenen To-do-Punkt führen
