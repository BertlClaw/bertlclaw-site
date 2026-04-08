# BertlClaw — E-Mail Setup: hallo@bertlclaw.at (Zoho Mail)

## Warum Zoho Mail?
- Kostenlos für 1 Nutzer
- Eigene Domain möglich (hallo@bertlclaw.at)
- Professioneller als GMX oder Gmail
- Kein Zoho-Branding in ausgehenden Mails (Free Plan)

## Schritt-für-Schritt

### 1. Account erstellen
- URL: https://www.zoho.com/mail/
- "Kostenlos starten" → Plan "Forever Free" (1 Nutzer, 5GB)
- Mit der bestehenden Gmail-Adresse oder neu registrieren

### 2. Domain hinzufügen
- "Ich besitze eine Domain" → bertlclaw.at eingeben
- "Weiter"

### 3. DNS-Einträge setzen (bei DNS-Anbieter)
Zoho zeigt folgende Einträge die du bei deinem DNS-Anbieter eintragen musst:

**MX-Einträge** (für E-Mail-Empfang):
| Typ | Name | Wert | Priorität |
|-----|------|------|-----------|
| MX | @ | mx.zoho.eu | 10 |
| MX | @ | mx2.zoho.eu | 20 |
| MX | @ | mx3.zoho.eu | 50 |

**TXT-Eintrag** (SPF, für bessere Zustellbarkeit):
| Typ | Name | Wert |
|-----|------|------|
| TXT | @ | v=spf1 include:zoho.eu ~all |

**CNAME** (für DKIM, optional aber empfohlen):
- Zoho zeigt diesen Wert individuell nach dem Setup an

### 4. E-Mail-Adresse anlegen
- Nach DNS-Bestätigung: "Nutzer hinzufügen"
- E-Mail: hallo@bertlclaw.at
- Passwort setzen

### 5. Webmail testen
- URL: https://mail.zoho.eu
- Mit hallo@bertlclaw.at einloggen
- Testmail schicken

### 6. Auf Mobilgerät einrichten (optional)
- Zoho Mail App (iOS/Android) herunterladen
- Login mit hallo@bertlclaw.at

## Nach dem Setup: E-Mail in Website einbauen
Alle Stellen in der Website wo noch `dominic-reisenbichler@gmx.at` steht müssen auf `hallo@bertlclaw.at` geändert werden.

Relevante Dateien prüfen:
- kontakt.html
- impressum.html
- datenschutz.html
- alle Service-Seiten mit mailto: Links

## Zeitaufwand
- Setup: ~20 Minuten
- DNS-Propagation: 1-24 Stunden

## Dateien die nach E-Mail-Wechsel zu aktualisieren sind

Gefunden: **20 HTML-Dateien** mit der alten E-Mail-Adresse (`dominic-reisenbichler@gmx.at`):

1. arbeitsweise.html
2. danke.html
3. datenschutz.html
4. digital-clarity-setup.html
5. digitale-struktur-systeme.html
6. erstgespraech.html
7. faq.html
8. impressum.html
9. index.html
10. ki-fuer-selbststaendige.html
11. kontakt.html
12. landingpages.html
13. landingpage-sprint.html
14. mvp-digitale-produktideen.html
15. positionierung-website-texte.html
16. proof.html
17. services.html
18. ueber-bertlclaw.html
19. use-cases.html
20. website-texte-positionierung.html

> **Hinweis:** Noch nichts geändert. Erst nach erfolgreicher Einrichtung von hallo@bertlclaw.at alle 20 Dateien mit Suchen & Ersetzen aktualisieren:
> `dominic-reisenbichler@gmx.at` → `hallo@bertlclaw.at`
