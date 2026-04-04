# Professionelle E-Mail @bertlclaw.at — Setup Guide

*Stand: April 2026 | Ziel: dominic@bertlclaw.at (oder hallo@bertlclaw.at) einrichten*

---

## Übersicht: Optionen im Vergleich

| Option | Kosten | Aufwand | Empfehlung |
|---|---|---|---|
| A: world4you (Domain-Provider) | Evtl. inklusive / ab €1/Monat | Niedrig | Prüfen zuerst |
| B: Zoho Mail (kostenlos) | Gratis für 1 User | Mittel | Beste Gratis-Option |
| C: Google Workspace | €6/Monat | Niedrig | Beste Usability |
| D: Fastmail | €3,50/Monat | Niedrig | Gutes Preisleistungs-Verhältnis |

---

## Option A: world4you E-Mail Hosting

### Was prüfen?
- Gehe zu: https://www.world4you.com → Mein Account → Domain-Verwaltung
- Prüfe ob `bertlclaw.at` dort registriert ist (wenn nicht, ist world4you nicht dein Provider)
- Falls ja: Prüfe ob E-Mail-Hosting im Paket enthalten ist (viele Pakete bei world4you beinhalten kostenlos 5–10 Postfächer)

### Setup (wenn verfügbar):
1. Einloggen bei world4you-Kontrollpanel
2. Unter "E-Mail" → "Neues Postfach erstellen"
3. Adresse eingeben: `dominic@bertlclaw.at` oder `hallo@bertlclaw.at`
4. Passwort setzen
5. MX-Records sind bei world4you automatisch konfiguriert (wenn Hosting dort)
6. E-Mail-Client konfigurieren: IMAP/SMTP-Daten von world4you verwenden

**Vorteil:** Möglicherweise schon bezahlt! Einfachste Lösung wenn Domain bei world4you liegt.

---

## Option B: Zoho Mail (Kostenlos — Empfehlung wenn kein world4you)

### Warum Zoho Mail?
- Kostenlos für 1 Benutzer mit eigener Domain
- Professionelles Webinterface
- Gut für Kleinunternehmer in der Startphase
- DSGVO-konform (europäische Rechenzentren verfügbar)

### Step-by-Step Setup:

**Schritt 1: Zoho Mail Account anlegen**
1. Gehe zu: https://www.zoho.com/mail/
2. Klicke "Sign Up" → Wähle "Forever Free" Plan
3. Konto anlegen mit einer bestehenden E-Mail-Adresse

**Schritt 2: Domain verbinden**
1. Im Zoho Mail Dashboard: "Add Domain" → `bertlclaw.at` eingeben
2. Domain-Eigentümerschaft verifizieren (Zoho gibt dir einen TXT-Record)
3. TXT-Record bei deinem Domain-Registrar hinzufügen (wo auch immer bertlclaw.at registriert ist)
4. Warte auf Bestätigung (meist 5–30 Minuten)

**Schritt 3: MX-Records setzen**
Bei deinem Domain-Registrar folgende MX-Records setzen:
```
mx.zoho.eu   Priorität 10
mx2.zoho.eu  Priorität 20
mx3.zoho.eu  Priorität 50
```

**Schritt 4: E-Mail-Adresse erstellen**
1. Im Zoho-Dashboard: "Mail Accounts" → "Add Account"
2. Username: `dominic` oder `hallo` → ergibt `dominic@bertlclaw.at`
3. Passwort setzen

**Schritt 5: E-Mail-Client einrichten (optional)**
- Zoho Mail hat eine gute Weboberfläche
- Für Mobile: Zoho Mail App (Android/iOS)
- Für Desktop: IMAP/SMTP-Daten aus Zoho-Einstellungen in Outlook/Thunderbird eintragen

**Schritt 6: SPF- und DKIM-Records setzen** (für E-Mail-Deliverability)
- Zoho gibt dir diese Records direkt in den Setup-Anweisungen
- Unbedingt setzen! Ohne SPF/DKIM landen E-Mails im Spam.

---

## Option C: Google Workspace (€6/Monat)

**Wann sinnvoll:** Wenn du Gmail-Interface liebst, Google Docs/Drive bereits nutzt, oder professionelle Deliverability wichtig ist.

### Setup:
1. https://workspace.google.com → "Get Started" → "Business Starter" (€6/Monat/User)
2. Domain `bertlclaw.at` eingeben
3. Google führt dich durch MX-Record-Setup (sehr benutzerfreundlich)
4. Ergebnis: Gmail mit `dominic@bertlclaw.at` — vertraute Oberfläche, maximale Kompatibilität

**Vorteil:** Beste Deliverability, Integration mit Google Calendar/Drive, sehr einfaches Setup

---

## Option D: Fastmail (€3,50/Monat)

**Wann sinnvoll:** Wenn du Datenschutz priorisierst und eine günstige bezahlte Option willst.

- Australisches Unternehmen, ausgezeichneter Datenschutz
- Sehr gute IMAP-Unterstützung
- https://www.fastmail.com → Plans → Individual Basic (€3,50/Monat)
- Custom Domain Setup: ähnlich wie Zoho, gut dokumentiert

---

## 🏆 Empfehlung für BertlClaw

**Priorität 1:** Erst prüfen, ob world4you (oder dein Domain-Provider) E-Mail-Hosting inklusive hat — das ist die günstigste Option.

**Wenn nicht:** → **Zoho Mail Free** (Option B)
- Kostenlos, ausreichend für Startphase
- Gute Weboberfläche
- Upgrade jederzeit möglich

**Wenn professioneller Auftritt wichtiger als Kosten:** → **Google Workspace** (€6/Monat)
- Beste Usability und Deliverability
- Lohnt sich ab dem ersten zahlenden Kunden

---

## Nach dem Setup: Alle Materialen aktualisieren

Nach Einrichtung der neuen E-Mail-Adresse folgende Stellen aktualisieren:

### Website & Online-Präsenz
- [ ] `impressum.html` — E-Mail-Adresse aktualisieren
- [ ] `index.html` / Kontaktformular — neue E-Mail in Formspree eintragen
- [ ] Formspree-Konfiguration: neue E-Mail als Zieladresse hinterlegen
- [ ] Google Business Profile (wenn vorhanden)
- [ ] LinkedIn-Profil

### E-Mail-Signatur erstellen
Vorlage für E-Mail-Signatur:

```
---
Dominic Reisenbichler
BertlClaw — Positionierung & digitale Texte für Selbstständige

🌐 bertlclaw.at
📧 dominic@bertlclaw.at
📱 +43 [Telefonnummer]

---
```

### Dokumente im Workspace
- [ ] Alle Angebotsvorlagen und Rechnungsvorlagen
- [ ] BERTLCLAW-PROJECT-AGREEMENT-TEMPLATE.md
- [ ] BERTLCLAW-AGB.md (Kontaktangaben)

### Alte E-Mail-Weiterleitungen
- Alte private E-Mail-Adresse: Weiterleitung auf neue Adresse einrichten (übergangsweise), damit keine Anfragen verloren gehen

---

*Stand: April 2026 | BertlClaw — Dominic Reisenbichler*
