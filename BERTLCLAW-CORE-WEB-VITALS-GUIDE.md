# BertlClaw — Core Web Vitals Guide

## Was sind Core Web Vitals?
Google bewertet Websites nach 3 Hauptmetriken:
- **LCP** (Largest Contentful Paint): Wie schnell lädt das größte sichtbare Element? Ziel: < 2,5s
- **FID/INP** (Interaction to Next Paint): Wie schnell reagiert die Seite auf Eingaben? Ziel: < 200ms
- **CLS** (Cumulative Layout Shift): Springen Elemente beim Laden? Ziel: < 0,1

## So prüfst du BertlClaw
1. https://pagespeed.web.dev → URL eingeben → "Analysieren"
2. Mobile-Score und Desktop-Score ansehen
3. Unter "Verbesserungsmöglichkeiten" schauen

## Häufige Probleme und Fixes

### Bilder zu groß (LCP)
- Alle Bilder sollten WebP-Format haben (kleinere Dateigröße)
- Hero-Bilder: max. 200KB
- Alle anderen: max. 100KB
- Prüfen: `find . -name "*.jpg" -o -name "*.png" | head -20`

### Kein `loading="lazy"` (LCP)
- Bereits implementiert auf index, services, proof, use-cases ✅
- Neue Seiten prüfen

### Render-blocking Resources
- CSS und JS im `<head>` können das Laden verlangsamen
- BertlClaw nutzt Inline-CSS → kein externes CSS → kein Problem ✅

### Font Loading
- System fonts (Inter, ui-sans-serif) werden verwendet → kein Google Fonts → kein Problem ✅

## Aktueller Status BertlClaw
- Inline CSS: ✅ (kein externes Stylesheet)
- System Fonts: ✅ (kein Font-Loading)
- Lazy Images: ✅ (bereits implementiert)
- WebP-Bilder: ⚠️ noch nicht geprüft
- Hero-Bildgröße: ⚠️ noch nicht geprüft

## Empfehlung
1. PageSpeed Insights einmal ausführen für https://bertlclaw.at
2. Score notieren (Baseline)
3. Größte Bilder prüfen und ggf. komprimieren
4. Monatlich wiederholen

## Tools
- https://pagespeed.web.dev (Google PageSpeed Insights)
- https://squoosh.app (Bilder komprimieren, kostenlos)
- https://webpagetest.org (detaillierter Waterfall)
