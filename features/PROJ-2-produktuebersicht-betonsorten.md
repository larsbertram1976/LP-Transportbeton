# PROJ-2: Produktübersicht Transportbeton-Sorten

## Status: Planned
**Created:** 2026-04-27
**Last Updated:** 2026-04-27

## Dependencies
- Requires: PROJ-1 (Page Shell & Hero) — nutzt das definierte Layout, Theme und die Container-/Typografie-Vorgaben.

## Beschreibung
Inhaltlicher Kern der Landingpage: strukturierte Übersicht der gängigen Transportbeton-Sorten von Mölders, jeweils mit Festigkeitsklasse, Expositionsklasse, typischen Anwendungsfällen und kurzer, laienverständlicher Erklärung. Dient als Orientierung für Profi- und Privatkunden gleichermaßen.

## User Stories
- Als **Privatkunde mit Bauvorhaben Bodenplatte** möchte ich anhand von Anwendungsfällen ("Bodenplatte für Garage / Carport") die passende Betonsorte erkennen, ohne Fachbegriffe nachschlagen zu müssen.
- Als **Bauunternehmer** möchte ich Festigkeits- und Expositionsklassen (z.B. C25/30 XC2) auf einen Blick sehen, damit ich schnell prüfen kann, ob Mölders meine Standardsorten anbietet.
- Als **suchender Nutzer aus Google** möchte ich auf dieser Seite konkrete Antworten zu typischen Sorten finden, damit ich nicht weitersuchen muss.
- Als **mobiler Nutzer** möchte ich die Sortenübersicht bequem durchscrollen können, ohne dass Tabellen horizontal überlaufen.
- Als **LLM-/AI-Crawler** möchte ich die Sorten als sauber strukturierte Inhalte (semantisches HTML, ggf. JSON-LD `Product`/`Offer`-Schema) finden, damit ich die Informationen korrekt zitieren kann.

## Acceptance Criteria
- [ ] Sektion ist als H2-Block "Transportbeton-Sorten im Überblick" (oder vergleichbar) angelegt
- [ ] Es werden mindestens 4 typische Sorten dargestellt (Vorschlag: C12/15, C20/25, C25/30, C30/37 — finale Auswahl mit Mölders abgestimmt)
- [ ] Pro Sorte werden mindestens dargestellt: **Festigkeitsklasse**, **Expositionsklasse(n)**, **Konsistenzklasse** (z.B. F3), **typische Anwendungsfälle** (2–4 Beispiele), **kurze Beschreibung** (1–2 Sätze laienverständlich)
- [ ] Darstellung als responsives Grid bzw. Cards: Desktop 2–3 Spalten, Tablet 2 Spalten, Mobile 1 Spalte
- [ ] Cards verwenden shadcn/ui-`Card` als Basis; keine custom Card-Variante, wenn shadcn-Card installiert ist
- [ ] Inhalte sind als typisierte Datenstruktur im Code abgelegt (z.B. `src/data/concrete-grades.ts`), nicht als duplizierter JSX-Inhalt
- [ ] Optional: dezente Filter/Tabs nach Anwendungsbereich ("Hochbau", "Tiefbau", "Garten/Außen") — nur wenn Aufwand klein bleibt; sonst in P2 verschieben
- [ ] Hinweis-Block am Ende der Sektion: "Welche Sorte passt zu meinem Vorhaben? — Sprechen Sie unsere Standorte an" mit Verlinkung auf moelders.de Standortseite (kein eigener Werksfinder)
- [ ] Texte sind faktisch korrekt und mit Mölders Vertrieb abgestimmt, bevor Live-Gang erfolgt — Status im Spec dokumentieren

## Edge Cases
- **Sortenliste wächst/verändert sich:** Datenstruktur muss erweiterbar sein, ohne JSX umzubauen (Konfigurations-Datei + Map über Cards).
- **Lange Anwendungs-Listen:** Maximal 4 Bullet Points pro Sorte; alles darüber wird gekürzt oder in einen Tooltip / Detail-Toggle ausgelagert.
- **Fehlende Werte:** Falls eine Sorte z.B. nur eine Expositionsklasse hat, darf das Layout der Card nicht "kaputtgehen" — leere Felder werden weggelassen, nicht mit "—" gefüllt.
- **Print/Screenreader:** Sortenkarten müssen als Liste vorlesbar sein; Reihenfolge logisch (Festigkeit aufsteigend).
- **Inhaltliche Aktualisierung:** Stichprobenartiges Review-Datum im Code-Kommentar / Daten-File hinterlegen, damit erkennbar ist, wann zuletzt geprüft wurde (Wartungs-Hinweis).
- **Verständlichkeit für Laien:** Begriffe wie "C25/30" werden beim ersten Auftreten erklärt (Tooltip oder kurze Glossar-Zeile direkt in der Sektion).

## Technical Requirements
- **Daten-Quelle:** Statisch im Code (TypeScript-Modul), kein Headless CMS im MVP
- **Komponenten:** shadcn/ui-`Card`, ggf. `Badge` für Klassen
- **Performance:** Sektion wird im SSG gerendert, keine Client-Side-Daten-Fetches
- **SEO/GEO:** Sortenstruktur eignet sich für `Product`-/`ItemList`-JSON-LD (final durch /seo-Skill)
- **Accessibility:** Cards haben sinnvolle Heading-Struktur (H3 pro Sorte), Listen sind als `<ul>`/`<li>` ausgezeichnet

---
<!-- Sections below are added by subsequent skills -->

## Tech Design (Solution Architect)
_To be added by /architecture_

## QA Test Results
_To be added by /qa_

## Deployment
_To be added by /deploy_
