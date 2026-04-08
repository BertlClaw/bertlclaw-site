# BertlClaw — Redirect Plan

## Aktuell geplante Redirects (für spätere Server-Migration)

| Von | Nach | Typ |
|-----|------|-----|
| http://bertlclaw.at/* | https://bertlclaw.at/* | 301 (HTTPS enforce — GitHub macht das automatisch) |
| https://www.bertlclaw.at/* | https://bertlclaw.at/* | 301 (www → non-www) |
| https://bertlclaw.com/* | https://bertlclaw.at/* | 301 (TODO: bertlclaw.com redirect) |

## GitHub Pages Limitation
GitHub Pages unterstützt keine server-seitigen Redirects. HTTPS-Redirect wird automatisch durch "Enforce HTTPS" in GitHub Pages Settings gesetzt.

## www.bertlclaw.at
Prüfen ob `www.bertlclaw.at` korrekt auf `bertlclaw.at` weiterleitet. DNS-Eintrag: CNAME www → BertlClaw.github.io

## bertlclaw.com
Offenes TODO: Domain registrieren und auf bertlclaw.at weiterleiten.
