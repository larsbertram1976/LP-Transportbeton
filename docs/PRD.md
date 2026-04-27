# Product Requirements Document

## Vision
Eine markenkonforme Informations-Landingpage für die **Mölders Holding** zum Thema **Transportbeton**. Sie informiert Profi- und Privatkunden in der Region zwischen Hamburg, Hannover und Berlin über das Transportbeton-Angebot und stärkt Mölders als regionalen Ansprechpartner für Beton.

Ziel ist nicht der Direkt-Verkauf oder die Lead-Erfassung, sondern Aufklärung, Markenpräsenz und SEO-/GEO-Sichtbarkeit für Suchanfragen rund um Transportbeton im Mölders-Liefergebiet.

## Target Users

**Profi-Kunden (B2B)**
- Bauunternehmen, Hochbau, GaLaBau, Tiefbauer, Handwerker
- Brauchen schnellen Überblick über verfügbare Betonsorten und Eignung für ihren Anwendungsfall
- Pain Point: Fachliche Klarheit (Sorten, Festigkeitsklassen) und Vertrauen in regionalen Lieferanten

**Privatkunden (B2C)**
- Bauherren, Heimwerker, Selbstbauer (z.B. Fundament für Carport, Bodenplatte)
- Brauchen Orientierung: "Welche Sorte für meinen Zweck?"
- Pain Point: Unsicherheit bei Begriffen (C20/25, F3, XC1) und Sorge um falsche Bestellung

Beide Gruppen bekommen die gleiche Seite, die Inhalte sind so geschrieben, dass Laien sie verstehen und Profis die nötigen Fachangaben finden.

## Core Features (Roadmap)

| Priority | Feature | Status |
|----------|---------|--------|
| P0 (MVP) | PROJ-1 Page Shell & Hero (Layout, Branding, Hero-Sektion) | Planned |
| P0 (MVP) | PROJ-2 Produktübersicht Transportbeton-Sorten | Planned |
| P1 | Service-Übersicht (Betontankstelle, Lieferung, Pumpe) | Planned |
| P1 | Kontaktformular (Anfrage per E-Mail) | Planned |
| P2 | Beton-Mengenrechner | Planned |
| P2 | Standortfinder / Werksfinder mit Karte | Planned |
| P2 | FAQ-Sektion | Planned |

## Success Metrics
- **SEO/GEO-Sichtbarkeit:** Top-10-Rankings für Kern-Keywords (z.B. "Transportbeton Lüneburg", "Beton kaufen Uelzen", regionale Long-Tail-Keywords)
- **Performance:** Core Web Vitals "Good" (LCP < 2.5 s, CLS < 0.1, INP < 200 ms)
- **Engagement:** Durchschnittliche Verweildauer > 45 s, Scroll-Tiefe > 60 %
- **Brand:** Wiedererkennbarkeit als Mölders-Auftritt (qualitative Bewertung im Review)
- **Traffic:** Outbound-Klicks auf moelders.de (Standort-/Kontaktseiten) als Soft-Conversion

## Constraints
- **Tech-Stack:** Next.js 16 (App Router), TypeScript, Tailwind CSS, shadcn/ui, Deployment via Vercel
- **Branding:** Mölders-Markenfarben (Rot/Weiß), Tonalität "professionell, regional, familiengeführt"
- **Sprache:** Deutsch (kein i18n)
- **DSGVO:** Da im MVP kein Formular und keine Datenerfassung, minimaler Aufwand — Cookie/Tracking nur falls explizit gewünscht
- **Backend:** Im MVP keines (rein statisch / SSG)
- **Content-Quelle:** Faktische Angaben zu Betonsorten/Anwendung müssen mit Mölders Vertrieb abgeglichen werden, bevor live gegangen wird

## Non-Goals
- Kein Online-Shop, keine Online-Bestellung
- Keine Konto-/Login-Funktionalität
- Kein Echtzeit-Verfügbarkeits- oder Lieferslot-System
- Keine native App
- Keine Mehrsprachigkeit
- Kein interaktiver Standortfinder im MVP (statische Liste/Verlinkung auf moelders.de reicht)
- Keine 1:1-Übernahme von Header/Footer von moelders.de — nur markenkonforme Eigenständigkeit

---

Use `/requirements` to create detailed feature specifications for each item in the roadmap above.
