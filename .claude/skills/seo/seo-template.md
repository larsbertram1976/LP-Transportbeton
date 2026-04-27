# SEO Section Template

Add this section to the END of the feature spec `/features/PROJ-X.md`:

```markdown
---

## SEO & GEO

**Optimized:** YYYY-MM-DD
**Engineer:** SEO Engineer (AI)

### Pages Optimized

| Path | Metadata | JSON-LD | OG Image | Lighthouse SEO |
|------|----------|---------|----------|----------------|
| `/path-1` | ✅ | Article | ✅ dynamic | 100 |
| `/path-2` | ✅ | FAQPage + BreadcrumbList | ✅ static | 98 |

### Site Baseline (only fill if first run on this project)

- [ ] `src/app/layout.tsx` — `metadataBase`, `title.template`, OG/Twitter defaults set
- [ ] `src/app/sitemap.ts` — created
- [ ] `src/app/robots.ts` — created
- [ ] `public/llms.txt` — created
- [ ] `src/app/manifest.ts` — created (optional)

### JSON-LD Schemas Added

- `[Schema type]` on `[page path]` — [why this schema fits]
- e.g. `Article` on `/blog/[slug]` — for article pages with author + publish date

### Validators

- [ ] Google Rich Results Test passed for [path]
- [ ] Schema.org Validator passed for [path]
- [ ] `sitemap.xml` reachable and valid XML
- [ ] `robots.txt` reachable with expected policy
- [ ] `llms.txt` reachable (markdown loads)

### Lighthouse SEO Audit

| Page | Score | Notes |
|------|-------|-------|
| `/path-1` | 100 | — |
| `/path-2` | 98 | -2 from missing `lang` attribute, fixed |

Target: ≥ 95 per page.

### GEO Notes (LLM Optimization)

- **LLM crawlability:** [pass / issues — e.g. "client-only rendering on /dashboard, but it's behind login so OK"]
- **E-E-A-T signals:**
  - `Organization` schema in root layout: ✅
  - `Person` schema on author pages: ✅
  - `sameAs` array (social links): ✅
  - Author byline + `datePublished`/`dateModified` on articles: ✅
- **Content structure:** Single `<h1>`, semantic `<article>`/`<section>`, FAQ Q&A paired with schema
- **`llms.txt` updated:** Yes — added [N] new URLs

### Outstanding / Manual Review

- [Item] — [reason still pending, e.g. "OG image copy needs final approval from marketing"]

### Notes for Future Maintenance

- GEO standards (`llms.txt`) are still evolving — revisit at next major content addition
- Lighthouse SEO is a hard gate; do not deploy below 95 without explicit reason
```
