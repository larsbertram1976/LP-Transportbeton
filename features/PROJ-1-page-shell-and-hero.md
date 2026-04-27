# PROJ-1: Page Shell & Hero-Sektion

## Status: Deployed
**Created:** 2026-04-27
**Last Updated:** 2026-04-27

## Dependencies
- None (Fundament für alle weiteren Features)

## Beschreibung
Grundgerüst der Transportbeton-Landingpage: markenkonformes Layout (Header, Footer, Container, Typografie, Farbpalette) plus Hero-Sektion als "Above-the-fold"-Einstieg. Definiert das Design-System, an dem sich PROJ-2 und alle späteren Features orientieren.

## User Stories
- Als **Bauunternehmer** möchte ich beim Aufruf der Seite sofort erkennen, dass ich bei Mölders bin, damit ich Vertrauen in den regionalen Anbieter habe.
- Als **Privatkunde / Bauherr** möchte ich in den ersten 5 Sekunden verstehen, dass es hier um Transportbeton geht und welche zentralen Vorteile Mölders bietet, damit ich einschätzen kann, ob die Seite für mich relevant ist.
- Als **mobiler Nutzer** möchte ich die Seite auf dem Smartphone vollständig und ohne horizontales Scrollen lesen können, damit ich auch unterwegs informiert werde.
- Als **Suchmaschinen-/LLM-Crawler** möchte ich klare Meta-Daten, semantisches HTML und eine sinnvolle Heading-Struktur vorfinden, damit ich die Seite korrekt indexieren kann.
- Als **Marketing-Verantwortlicher bei Mölders** möchte ich die Seite an das bestehende Mölders-Corporate-Design angelehnt sehen (Rot/Weiß, Tonalität), damit Markenkonsistenz gewahrt bleibt.

## Acceptance Criteria
- [ ] Page Shell enthält Header (Mölders-Logo, schlanke Navigation oder Sprungmarken), Main-Content-Bereich und Footer (Impressum-/Datenschutz-Links auf moelders.de, Standort-Hinweis, Copyright)
- [ ] Mölders-Markenfarben (Rot/Weiß) sind als Tailwind-Theme-Token definiert und werden in Hero, Buttons und Akzenten konsistent verwendet
- [ ] Hero-Sektion enthält: H1 mit Hauptkeyword "Transportbeton", aussagekräftige Subline (1–2 Sätze), 3–5 Vertrauensanker (z.B. "Familienunternehmen seit …", "5 Standorte zwischen Hamburg, Hannover und Berlin", "Beton vom regionalen Spezialisten") und ein Hero-Visual (Bild oder Illustration)
- [ ] Hero ist auf Desktop (≥ 1280 px), Tablet (768–1279 px) und Mobile (< 768 px) optimal lesbar — keine Layout-Brüche, keine horizontalen Scrollbalken
- [ ] Heading-Hierarchie: genau **eine** H1 (im Hero), H2 für nachfolgende Sektionen
- [ ] Page-Title und Meta-Description sind definiert (Stub für SEO-Skill, finalisiert in /seo)
- [ ] Lighthouse-Score auf der reinen Shell+Hero (ohne weitere Sektionen) ≥ 95 in Performance, Accessibility, Best Practices, SEO
- [ ] Alle Texte in Deutsch, kein "Lorem Ipsum" — finale Inhalte stehen mit dem User abgestimmt im Code

## Edge Cases
- **Sehr lange Markennamen / Keywords:** Hero-H1 darf auf Mobile nicht mehr als 4 Zeilen brechen — Breakpoints prüfen.
- **Hero-Bild lädt langsam / fehlt:** Fallback-Hintergrundfarbe oder CSS-Gradient muss greifen, damit Above-the-fold nicht weiß bleibt; `next/image` mit `priority` und Blur-Placeholder.
- **Reduzierte Bewegung (`prefers-reduced-motion`):** Eventuelle Hero-Animationen müssen abschaltbar sein.
- **JavaScript deaktiviert:** Hero, Logo und Vertrauensanker müssen ohne JS lesbar sein (SSG-Output).
- **Sehr breite Monitore (> 1920 px):** Container-Max-Width verhindert, dass Inhalte unangenehm auseinandergezogen werden.
- **Hoher Kontrast / Screenreader:** Logo hat alt-Text, Vertrauensanker sind keine reinen Icons ohne Text.

## Technical Requirements
- **Framework:** Next.js 16 App Router, React Server Components, statisches Rendering (SSG)
- **Styling:** Tailwind CSS, shadcn/ui für Buttons / strukturelle Komponenten (keine Eigenbauten, wenn shadcn vorhanden)
- **Bilder:** `next/image`, optimiertes Format (AVIF/WebP), `priority` auf Hero
- **Performance:** LCP < 2.5 s, CLS < 0.1
- **Accessibility:** WCAG 2.1 AA (Farbkontrast, Fokus-Stile, semantische Landmarks)
- **Browser-Support:** aktuelle Versionen Chrome, Firefox, Safari, Edge (jeweils letzte 2 Major-Versionen); Mobile Safari iOS 15+

---
<!-- Sections below are added by subsequent skills -->

## Implementation Notes (Frontend)
**Implementiert am 2026-04-27.**

**Geänderte Dateien:**
- [src/app/layout.tsx](../src/app/layout.tsx) — `lang="de"`, Inter via `next/font/google`, Default-Metadata (Title-Template, OpenGraph, canonical)
- [src/app/page.tsx](../src/app/page.tsx) — Komposition Header + Hero + Footer
- [src/app/globals.css](../src/app/globals.css) — Mölders CSS-Variablen (`--brand-red`, `--brand-red-dark`, `--brand-cream`, `--brand-ink`), `--primary` an Mölders-Rot gemappt, `scroll-behavior: smooth` mit `prefers-reduced-motion`-Fallback
- [tailwind.config.ts](../tailwind.config.ts) — `brand`-Farb-Token erweitert
- [next.config.ts](../next.config.ts) — `turbopack.root` gesetzt, um Workspace-Warnung wegen parent Lockfile zu eliminieren

**Neue Dateien:**
- [src/lib/site-config.ts](../src/lib/site-config.ts) — zentrale Site-Config (Name, URLs, Region)
- [src/data/trust-anchors.ts](../src/data/trust-anchors.ts), [src/data/navigation.ts](../src/data/navigation.ts), [src/data/footer-links.ts](../src/data/footer-links.ts) — getypte Inhalts-Datenstrukturen
- [src/components/layout/moelders-logo.tsx](../src/components/layout/moelders-logo.tsx) — typografische Wortmarke (Platzhalter, ersetzt durch SVG sobald geliefert)
- [src/components/layout/site-header.tsx](../src/components/layout/site-header.tsx) — Sticky Header, Desktop-Nav + MobileNav-Slot
- [src/components/layout/mobile-nav.tsx](../src/components/layout/mobile-nav.tsx) — Client-Component, shadcn `Sheet`
- [src/components/layout/site-footer.tsx](../src/components/layout/site-footer.tsx) — Footer mit Outbound-Links zu moelders.de
- [src/components/sections/hero-section.tsx](../src/components/sections/hero-section.tsx) — Hero mit H1, Subline, zwei CTAs (Sorten / Kontakt), 4 Trust-Anker, CSS-only Hero-Visual als Bild-Platzhalter

**Abweichungen vom Tech-Design:**
- **Kein `next/image` für Hero** im MVP. Da kein echtes Foto vorliegt, wurde ein CSS-Gradient/Typografie-Visual (`HeroVisual`) gebaut. Sobald der Bild-Asset geliefert ist, wird er als `next/image priority` ausgetauscht (eine Stelle in `hero-section.tsx`).
- **Sprungmarken-Ziele `#sorten` / `#service`** existieren noch nicht — werden durch PROJ-2 aktiviert. Dokumentiert in `src/data/navigation.ts`.

**Verifikation:**
- `npm run build` ✓ (Compiled successfully, TypeScript ✓, `/` als statische Seite vorgerendert)
- `npm run dev` ✓ (Ready in 385ms, GET / → 200, keine Warnings)
- HTML-Output enthält H1, alle 4 Trust-Anker, Footer-Links — alles SSR-fähig (kein JS-Zwang).

**Offene Punkte (Content/Assets, kein Code-Blocker):**
- Mölders-Logo SVG fehlt → typografischer Platzhalter aktiv
- Hero-Foto fehlt → CSS-Gradient-Visual aktiv
- Exakter Mölders-Rot-HEX (aktuell `#E2001A` ≈ HSL `353 100% 44%`) muss von Marketing bestätigt werden
- Footer-Links zu Impressum/Datenschutz auf moelders.de — exakte URLs final prüfen (`/impressum`, `/datenschutz` als Annahme)

## Tech Design (Solution Architect)

### Überblick
Die Seite ist eine **statisch gerenderte Landingpage** ohne Backend. Sie besteht aus einem Markenrahmen (Header + Footer) und einer Hero-Sektion. Alle Inhalte sind Teil des Codes (kein CMS), die Auslieferung erfolgt als vorgerenderte HTML-Datei + minimales JavaScript.

### Komponentenstruktur (UI-Baum)

```
RootLayout                         (deutsche Sprache, Schriftart, globale Marke)
└─ HomePage                        (Komposition aus Header + Hero + Footer)
   ├─ SiteHeader
   │  ├─ Logo (Mölders-Wortmarke, klickbar zur Startseite)
   │  ├─ DesktopNav (schlanke Sprungmarken-Links: "Sorten", "Service" usw.)
   │  └─ MobileNav (Hamburger → Sheet, nur auf < 768px sichtbar)
   ├─ <main>
   │  └─ HeroSection
   │     ├─ Headline (H1, Hauptkeyword "Transportbeton")
   │     ├─ Subline (1–2 Sätze)
   │     ├─ Vertrauensanker-Liste (3–5 USPs mit Icon + Text)
   │     └─ Hero-Bild (responsiv, AVIF/WebP, Blur-Fallback)
   └─ SiteFooter
      ├─ Standort-Hinweis (Region Hamburg–Hannover–Berlin)
      ├─ Outbound-Links (Impressum & Datenschutz auf moelders.de)
      └─ Copyright-Zeile
```

### Datenmodell
Diese Seite hat **keine Datenbank, keinen Server, kein localStorage**. Was wir "Daten" nennen, sind getypte Konstanten im Code:

- **Marken-Tokens** (Farben, Schrift) — als Tailwind-Theme-Erweiterung + CSS-Variablen, damit sich alle shadcn-Komponenten automatisch in Mölders-Optik einfügen
- **Vertrauensanker** (3–5 Einträge: Icon-Name + kurzer Text) — eine getypte Liste in `src/data/trust-anchors.ts`
- **Header-Navigation** (Label + Sprungmarken-Anker) — eine getypte Liste in `src/data/navigation.ts`
- **Footer-Links** (Label + URL auf moelders.de) — eine getypte Liste in `src/data/footer-links.ts`
- **Seiten-Metadaten** (Title, Description, Open Graph) — über die Next.js-Metadata-API in `src/app/page.tsx` (Endwerte kommen vom `/seo`-Skill)

Alle Listen sind statisch im Build enthalten — keine Laufzeit-Aufrufe, keine API.

### Tech-Entscheidungen (mit Begründung)

1. **Statisches Rendern (SSG)** — Die Seite ändert sich nicht je Besucher. Vorrendering bedeutet: schnellste Auslieferung, beste Lighthouse-Werte, keine Server-Kosten pro Aufruf. Das deckt das AC "Lighthouse ≥ 95" ab.
2. **React Server Components als Default** — Fast alles läuft serverseitig vorgerendert. Nur das Mobile-Menü (öffnen/schließen) braucht Browser-Interaktivität — dieser eine Teil wird als Client-Component isoliert. Vorteil: minimaler JavaScript-Code im Browser → besser für Performance und SEO.
3. **Tailwind-Theme + CSS-Variablen für Mölders-Marke** — Statt Markenfarben hartcodiert zu verteilen, werden sie zentral als Tokens (`--brand-red`, `--brand-cream` o.ä.) definiert. shadcn/ui bezieht seine Hauptfarbe (`--primary`) automatisch daraus → alle bestehenden Buttons/Cards/Badges sehen ohne Mehraufwand markenkonform aus. Vorteil: Wenn der Marketingbereich später z.B. das Mölders-Rot anpasst, ändert eine einzige Zeile die ganze Seite.
4. **shadcn/ui-Komponenten wiederverwenden** — Header-Navigation nutzt `NavigationMenu`, Mobile-Menü nutzt `Sheet`, Buttons nutzen `Button`. Alles bereits installiert. Keine Eigenbauten — entspricht der Frontend-Regel.
5. **`next/image` mit `priority`-Flag für das Hero-Bild** — Das Hero-Bild ist das LCP-Element (das, was zur Performance-Note zählt). `priority` lädt es bevorzugt, AVIF/WebP halten die Dateigröße klein, ein Blur-Placeholder verhindert weiße Lücken beim Laden.
6. **Lokale Schriftart über `next/font`** — Verhindert "Font Flash" (Schriftwechsel beim Laden). Eine professionelle Sans-Serif (z.B. Inter) trifft die Mölders-Tonalität "professionell, regional".
7. **Seitensprache `de`** — `<html lang="de">` für korrekte Aussprache durch Screenreader und richtige Indexierung.
8. **Sprungmarken statt Multi-Page** — Da die Landingpage thematisch eine Einheit ist, sind Anchor-Links (`#sorten`, `#service`) sinnvoller als Unterseiten. Spätere Features (PROJ-2 etc.) hängen sich als zusätzliche Sektionen an dieselbe Seite.

### Routing
- **Eine einzige Route:** `/` (Startseite des Projekts). Andere URLs sind im MVP nicht vorgesehen.
- Header-Links sind reine **Sprungmarken** (`#sorten`, `#service`, …) — keine Page-Navigation.

### Backend-Bedarf
**Kein Backend.** Keine Authentifizierung, kein Datenbankzugriff, keine Formularverarbeitung. Die in `package.json` enthaltene Supabase-Abhängigkeit wird in PROJ-1 nicht genutzt (kann später für P1-Kontaktformular relevant werden).

### Datei-Struktur (geplante Erweiterungen unter `src/`)

```
src/
├─ app/
│  ├─ layout.tsx          (anpassen: lang="de", Schriftart, Default-Metadata)
│  ├─ page.tsx            (anpassen: Komposition Header + Hero + Footer)
│  └─ globals.css         (anpassen: Mölders CSS-Variablen, shadcn-Theme-Override)
├─ components/
│  ├─ layout/
│  │  ├─ site-header.tsx
│  │  ├─ site-footer.tsx
│  │  └─ mobile-nav.tsx   (Client-Component, nutzt Sheet)
│  └─ sections/
│     └─ hero-section.tsx
├─ data/
│  ├─ trust-anchors.ts
│  ├─ navigation.ts
│  └─ footer-links.ts
public/
├─ images/
│  └─ hero-transportbeton.* (Asset noch zu liefern)
└─ logo/
   └─ moelders-logo.svg     (Asset noch zu liefern)
```
`tailwind.config.ts` wird um `brand`-Farb-Tokens erweitert.

### Abhängigkeiten (Pakete)
**Nichts neu zu installieren.** Alle benötigten Pakete sind bereits in `package.json`:
- `next` (16.x) — Framework
- `react` (19.x) — UI-Bibliothek
- `tailwindcss` (3.4) — Styling
- `lucide-react` — Icons für Vertrauensanker und Mobile-Menü
- `@radix-ui/react-navigation-menu`, `@radix-ui/react-dialog` — Primitives für shadcn `NavigationMenu` / `Sheet`
- `class-variance-authority`, `clsx`, `tailwind-merge` — bereits via shadcn-Setup vorhanden

### Performance-Strategie (zur Erfüllung der ACs)
- **LCP < 2.5 s:** Hero-Bild als `priority`, AVIF mit Fallback, korrekt dimensioniert (`sizes`-Attribut). Schrift via `next/font` mit `display: swap`.
- **CLS < 0.1:** Feste Breitenverhältnisse für Hero-Bild, keine nachladenden Web-Fonts ohne Reserve, Header mit fester Höhe.
- **Lighthouse ≥ 95:** Statische Auslieferung + minimaler Client-JS + semantisches HTML + WCAG-konforme Farb-Kontraste.

### Offene Punkte (Content/Assets — kein Architektur-Blocker)
- **Mölders-Logo (SVG)** muss vom Marketing geliefert werden.
- **Hero-Bild** (Transportbeton, regional, hochauflösend) muss geliefert werden — Platzhalter im ersten Build erlaubt.
- **Exakter HEX-Wert des Mölders-Rots** — Marketing-Abstimmung; bis dahin Platzhalter (≈ `#E2001A`).
- **Finale Tonalität von Headline & Subline** — Erstentwurf im Code, danach Review mit Mölders-Marketing.


## QA Test Results

**Tested:** 2026-04-27
**App URL:** http://localhost:3000
**Tester:** QA Engineer (AI)
**Tests:** [tests/PROJ-1-page-shell-and-hero.spec.ts](../tests/PROJ-1-page-shell-and-hero.spec.ts) — 32 Playwright tests across Desktop Chrome and Mobile Safari (iPhone 13)

### Acceptance Criteria Status

#### AC-1: Page Shell mit Header, Main-Content, Footer
- [x] `<header>`, `<main>`, `<footer>` als semantische Landmarks vorhanden
- [x] Mölders-Logo im Header, klickbarer Link "Zur Startseite"
- [x] Header-Navigation (Desktop: Sprungmarken + externer Link, Mobile: Sheet)
- [x] Footer enthält Outbound-Links zu `moelders.de/impressum` und `moelders.de/datenschutz`
- [x] Standort-Hinweis ("zwischen Hamburg, Hannover und Berlin") + Copyright "Mölders Holding"

#### AC-2: Mölders-Markenfarben als Tailwind-Theme-Token
- [x] `--brand-red` = HSL `353 100% 44%` (≈ #E0001A) im DOM verfügbar
- [x] `--primary` ist auf `--brand-red` gemappt → shadcn-Komponenten erben automatisch
- [x] Brand-Klassen genutzt: `text-brand-red` (×30), `bg-brand-red` (×5), `bg-brand-red/10` (×10), `bg-brand-red-dark` (×5), `bg-brand-cream` (×2)
- [x] Logo-Wortmarke rendert in Mölders-Rot (computed color rgb(224, 0, 26))

#### AC-3: Hero mit H1, Subline, 3–5 Vertrauensankern, Visual
- [x] Genau 1 H1, enthält Hauptkeyword "Transportbeton"
- [x] Subline (1–2 Sätze) "Frischbeton in geprüfter Qualität …"
- [x] 4 Vertrauensanker als `<ul>` mit ARIA-Label "Vorteile auf einen Blick" (Regional verwurzelt, Frisch geliefert, Profi & Privat, Familienunternehmen)
- [x] Hero-Visual vorhanden (CSS-Gradient-Card mit "C20/25 bis C30/37" und DIN-EN-Hinweis als Platzhalter — Foto-Asset folgt)

#### AC-4: Responsiv ohne Layout-Brüche / horizontalen Scrollbalken
- [x] Mobile (iPhone 13, 390×844 via Mobile-Safari-Projekt): kein horizontaler Scroll
- [x] Tablet (768×1024): kein horizontaler Scroll
- [x] Desktop (Chrome, 1280×720): kein horizontaler Scroll
- [x] Ultrawide (2560×1440): Container respektiert max-w-6xl (≤ 1200 px), keine Über-Streckung

#### AC-5: Heading-Hierarchie
- [x] Genau **eine** H1 (im Hero, `id="hero-heading"`)
- [x] 0 H2 in PROJ-1 — korrekt, da keine weiteren Sektionen in Scope (PROJ-2 fügt H2 hinzu)

#### AC-6: Page-Title und Meta-Description
- [x] `<title>`: "Transportbeton von Mölders | Beton aus der Region"
- [x] `<meta name="description">` gesetzt (152 Zeichen, enthält "Transportbeton")
- [x] OpenGraph-Tags via Next-Metadata-API gesetzt (locale `de_DE`, type `website`)
- [ ] **Stub-Hinweis:** robots-Meta, Twitter-Cards, finale Description-Tonalität → kommt durch `/seo`

#### AC-7: Lighthouse-Score ≥ 95
- [ ] **Nicht automatisiert in QA gemessen.** Lighthouse-CLI ist nicht in den Dependencies — manueller Run empfohlen vor Deploy. **Indirekte Indikatoren positiv:**
  - Statisches Pre-Rendering (`/` als `○ Static` im Build) → optimal für Performance-Score
  - Single H1, semantische Landmarks, alt/aria-Labels → positiv für a11y und SEO
  - Inter via `next/font` mit `display:swap`, Preload-Header → kein Font-Flash
  - Keine externen Skripte, keine Render-Blocking-Resources außer dem CSS-Bundle
  - `<html lang="de">`, `<title>`, Meta-Description → SEO-Pflicht erfüllt
- → **Empfehlung:** vor Live-Gang einmal Lighthouse manuell laufen lassen (oder via `/deploy` prüfen).

#### AC-8: Texte in Deutsch, kein Lorem Ipsum
- [x] Body-Text enthält kein "Lorem Ipsum"
- [x] Alle sichtbaren Inhalte in Deutsch (CTAs, Trust-Anker, Footer)

### Edge Cases Status

#### EC-1: Lange H1 auf Mobile (max. 4 Zeilen)
- [x] H1 nutzt `text-balance` und responsive Sizes (`text-4xl sm:text-5xl lg:text-6xl`); aktueller Text bricht auf iPhone-13-Viewport sauber ohne horizontalen Scroll. Zeilenanzahl < 4.

#### EC-2: Hero-Visual Fallback
- [x] Aktuelles Visual ist CSS-only (Gradient + Typografie) → kein Lade-Risiko, kein weißes Loch.
- [ ] **Hinweis:** Sobald `next/image` mit echtem Foto eingebaut ist, muss `placeholder="blur"` + `priority` gesetzt werden. **Wird bei Bild-Tausch erneut zu prüfen.**

#### EC-3: `prefers-reduced-motion`
- [x] `scroll-behavior` fällt auf `auto` zurück (validiert in Playwright-Test mit `reducedMotion: 'reduce'`-Context).

#### EC-4: JavaScript deaktiviert
- [x] Server-gerendertes HTML enthält H1, alle 4 Trust-Anker, Footer-Links, Meta — alles ohne JS lesbar.

#### EC-5: Sehr breite Monitore (> 1920 px)
- [x] Container-Max-Width (max-w-6xl ≈ 1152 px) greift bei 2560 px-Viewport (Bounding-Box ≤ 1200 px gemessen).

#### EC-6: Logo / Screenreader / hoher Kontrast
- [x] Wortmarke hat `aria-label="Mölders"` → Screenreader liest "Mölders".
- [x] Vertrauensanker: Icons sind `aria-hidden="true"`, Titel und Beschreibung als Text vorhanden.
- [x] Mobile-Menü-Button hat `aria-label="Menü öffnen"`, externe Links haben `<span class="sr-only">(öffnet in neuem Tab)</span>`.

### Security Audit Results

- [x] **Authentifizierung/Autorisierung:** N/A — Seite ist rein statisch ohne User-Konzepte.
- [x] **Injection (XSS / SQL):** N/A — keine User-Eingaben, keine dynamischen Queries.
- [x] **Outbound-Links:** Alle 6 externen `moelders.de`-Links haben `target="_blank"` + `rel="noopener noreferrer"` (Tab-Napping-Schutz).
- [x] **Exposed Secrets:** HTML-Payload enthält keine `NEXT_PUBLIC_*`-Variablen, keine Supabase-/API-Keys, keine sk-* Patterns.
- [x] **CSRF:** N/A — keine state-ändernden Requests.
- [x] **Iframes/Clickjacking:** Keine Iframes auf der Seite.
- [ ] **Security-Headers (HSTS, X-Frame-Options, X-Content-Type-Options, Referrer-Policy, CSP):** **Nicht gesetzt im Dev-Server.** Per [.claude/rules/security.md](../.claude/rules/security.md) sind sie für Production gefordert — werden im `/deploy`-Skill via Vercel/`next.config.ts` Headers konfiguriert. **Nicht blockierend für QA.**

### Bugs Found

#### BUG-1: Möglicher Kontrast-Mangel der "Transportbeton"-Badge im Hero
- **Severity:** Low
- **Steps to Reproduce:**
  1. Öffne http://localhost:3000
  2. Schau auf das kleine Pille-Element direkt über der H1: Text "Transportbeton" in Rot auf hellrosa Hintergrund (`bg-brand-red/10` + `text-brand-red`)
  3. Erwartet: WCAG-AA-Kontrast ≥ 4.5:1 für normalen Text
  4. Tatsächlich: Errechneter Kontrast ≈ 4.0:1 (text-brand-red ≈ #E0001A auf composited Hintergrund ≈ #F9E1DE)
- **Empfohlene Fixes (im Frontend, nicht hier):**
  - `text-brand-red-dark` statt `text-brand-red` für die Badge → Kontrast steigt auf > 6:1
  - oder bg-Helligkeit reduzieren (z.B. `bg-brand-red/15` mit `text-brand-red-dark`)
- **Priority:** Fix in next sprint — nicht blockierend, aber für volle WCAG-AA-Konformität wünschenswert.
- **Hinweis:** Mathematisch geschätzt; eine echte Lighthouse-/axe-DevTools-Messung empfiehlt sich.

#### BUG-2: Header-Sprungmarken `#sorten` / `#service` ohne Ziel
- **Severity:** Low (bekannt/geplant)
- **Beschreibung:** Klickt ein Nutzer im Desktop-Header oder Mobile-Sheet auf "Sorten" oder "Service", passiert visuell nichts — die Anker existieren in PROJ-1 noch nicht. Wird durch PROJ-2 (Produktübersicht) und ggf. einem späteren Service-Feature gelöst.
- **Priority:** Wird mit PROJ-2 automatisch behoben.

### Regression Tests
- N/A — PROJ-1 ist das erste Feature im Projekt, keine vorhandenen Features zu prüfen.

### Test Suite
- **Vitest (Unit):** Keine Unit-Tests in PROJ-1 — Komponenten sind rein präsentational, Daten-Module sind Konstanten. `npm test` exit 0 (passWithNoTests aktiviert in [vitest.config.ts](../vitest.config.ts)).
- **Playwright (E2E):** 32 Tests, **31 passed, 1 skipped** (intentional: `EC-MobileMenu` läuft nur auf Mobile-Safari-Projekt). Beide Browser-Projekte grün.
- **Build:** `npm run build` ✓ — `/` als statisches Pre-Render.

### Summary
- **Acceptance Criteria:** 7 / 8 voll bestanden, **AC-7 (Lighthouse) nicht automatisiert gemessen** — manueller Run vor Deploy empfohlen, alle Indikatoren positiv.
- **Bugs Found:** 2 total (0 Critical, 0 High, 0 Medium, 2 Low)
- **Security:** Pass für PROJ-1-Scope (keine Auth, kein Input, keine Secrets im Bundle). Production-Header werden in `/deploy` ergänzt.
- **Production Ready:** **YES** — keine Critical/High Bugs.
- **Recommendation:** Status auf **Approved**. Vor Live-Gang: (1) BUG-1 Kontrast prüfen/fixen, (2) Lighthouse manuell laufen lassen, (3) `/seo` für robots-Meta + finale OG-Tags, (4) `/deploy` für Security-Headers.

## Deployment

**Deployed:** 2026-04-27
**Production URL:** https://moelders-transportbeton.vercel.app
**Vercel Project:** [moelders-transportbeton](https://vercel.com/larsbertrams-projects/moelders-transportbeton) (`prj_7vCmbiPPycvWRjCBp0NWL6kYShT9`)
**Deployment ID:** `dpl_A1GBMeFv33VWsohy5ozYk5BhipzQ` (commit `1984c55`)
**Build:** 41 s, Type `LAMBDAS`, Region `iad1`

### Aliases
- `moelders-transportbeton.vercel.app` (canonical)
- `moelders-transportbeton-larsbertrams-projects.vercel.app`
- `moelders-transportbeton-git-main-larsbertrams-projects.vercel.app`

### Auto-Deploy
GitHub `larsbertram1976/LP-Transportbeton` Branch `main` → Vercel Auto-Deploy via GitHub App.

### Deployment Notes
- Erstes Deployment (Commit `c6e43d7`) lief technisch sauber durch, lieferte aber 404 auf alle Routes, weil das Vercel-Projekt **vor** dem ersten Push erstellt wurde — `framework: null` blieb im Projekt-Setting hängen, Vercel wusste nicht, wie Next.js-Output zu routen ist.
- Fix in [vercel.json](../vercel.json): `{"framework": "nextjs"}` → Commit `1984c55` triggert automatisch ein zweites Deployment, das den Fix einspielt. State **READY**, Live-URL antwortet 200, korrektes SSG-Prerendering, Mölders-Branding sichtbar.

### Smoketest gegen Live (2026-04-27)
- HTTP 200 ✓
- `<html lang="de">` ✓
- Title, Meta-Description, OG-Tags, Twitter Card ✓
- H1 "Transportbeton aus der Region — geliefert von Mölders." ✓
- 4 Vertrauensanker, Hero-Visual ("C20/25 bis C30/37") ✓
- Footer + Outbound-Links zu moelders.de/impressum / /datenschutz ✓
- HSTS-Header von Vercel automatisch gesetzt
- `x-nextjs-prerender: 1` + `x-vercel-cache: PRERENDER` → SSG greift

### Offen (nicht blockierend)
- Production-Header X-Frame-Options, X-Content-Type-Options, Referrer-Policy, CSP — werden durch `next.config.ts` Headers oder `vercel.json` Headers nachgereicht (siehe [docs/production/security-headers.md](../docs/production/security-headers.md))
- Lighthouse-Run gegen Live-URL noch ausstehend
- BUG-1 Kontrast (Badge) — vom User auf "später" verschoben
- Vercel-Project-Setting `framework` ist im Dashboard immer noch `null` — vercel.json überschreibt das, aber für Konsistenz im Dashboard auf "Next.js" umstellen
- SEO/GEO: `/seo` wurde übersprungen — `robots.txt`, `sitemap.xml`, JSON-LD und Schema-Markup fehlen noch
- Custom-Domain `transportbeton.moelders.de` (im canonical-Tag bereits referenziert) — DNS muss bei Mölders gepflegt werden, dann in Vercel als Domain hinzufügen
