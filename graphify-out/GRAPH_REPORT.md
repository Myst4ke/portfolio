# Graph Report - portfolio  (2026-09-25)

## Corpus Check
- 10 files · ~17,781 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 78 nodes · 89 edges · 7 communities detected
- Extraction: 76% EXTRACTED · 24% INFERRED · 0% AMBIGUOUS · INFERRED: 21 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]

## God Nodes (most connected - your core abstractions)
1. `Portfolio Project Overview` - 12 edges
2. `useI18n()` - 11 edges
3. `OG Social Card — Donnees fiables, ingenierie discrete` - 6 edges
4. `useScrollProgress()` - 5 edges
5. `useInViewProgress()` - 4 edges
6. `Florian Posez — Data Engineer Paris` - 4 edges
7. `HomePage()` - 3 edges
8. `FR/EN i18n` - 3 edges
9. `src/i18n.jsx — strings + Theme provider` - 3 edges
10. `CV PDFs in public/` - 3 edges

## Surprising Connections (you probably didn't know these)
- `src/diagrams.jsx — Architecture/Migration/Lineage` --semantically_similar_to--> `Decorative lineage/data curve with nodes`  [INFERRED] [semantically similar]
  README.md → public/og-image.svg
- `CVButton()` --calls--> `useI18n()`  [INFERRED]
  src\components.jsx → src\i18n.jsx
- `Header()` --calls--> `useI18n()`  [INFERRED]
  src\components.jsx → src\i18n.jsx
- `Footer()` --calls--> `useI18n()`  [INFERRED]
  src\components.jsx → src\i18n.jsx
- `MigrationTimeline()` --calls--> `useScrollProgress()`  [INFERRED]
  src\diagrams.jsx → src\scroll-fx.jsx

## Hyperedges (group relationships)
- **Shared brand visual system across HTML CSS, favicon and OG image** — index_html_css_variables, favicon_svg_logo, og_image_social_card, favicon_accent_color, favicon_ink_color [INFERRED 0.90]
- **Pre-paint theme switching flow (no FOUC)** — index_html_theme_init_script, theme_persistence_localstorage, theme_prefers_color_scheme, index_html_css_variables, rationale_no_flash_theme [EXTRACTED 0.95]
- **SPA module structure described in README** — readme_src_app_jsx, readme_src_i18n_jsx, readme_src_components_jsx, readme_src_scroll_fx_jsx, readme_src_diagrams_jsx, readme_pages_modules [EXTRACTED 0.95]

## Communities

### Community 0 - "Community 0"
Cohesion: 0.15
Nodes (16): CV Filename Convention (cv-florian-posez-{lang}.pdf), Rationale: CV download matches active UI language, CV PDFs in public/, Dark Mode Support, Five-Page SPA (Home/Skills/Experience/Case/Contact), GitHub Pages Deploy via Actions, FR/EN i18n, Page Modules (home/skills-exp/case-contact) (+8 more)

### Community 1 - "Community 1"
Cohesion: 0.17
Nodes (12): Concept: Data Observability, Concept: Lakehouse Platform, Concept: Real-time Pipelines, Brand Accent Color #169cdf, Brand Ink Color #15161a, Favicon — F monogram with accent dot, Background horizontal grid lines, Decorative lineage/data curve with nodes (+4 more)

### Community 2 - "Community 2"
Cohesion: 0.18
Nodes (3): CVButton(), Footer(), Header()

### Community 3 - "Community 3"
Cohesion: 0.33
Nodes (8): BarChart(), CountUp(), DataPrintLive(), DonutChart(), HBar(), Reveal(), useInViewProgress(), useScrollProgress()

### Community 4 - "Community 4"
Cohesion: 0.22
Nodes (4): ThemeToggle(), computeExperienceMonths(), useTheme(), HomePage()

### Community 5 - "Community 5"
Cohesion: 0.33
Nodes (7): useI18n(), CasePage(), CaseSwitcher(), ContactForm(), ContactPage(), ExperiencePage(), SkillsPage()

### Community 6 - "Community 6"
Cohesion: 0.29
Nodes (1): MigrationTimeline()

## Knowledge Gaps
- **16 isolated node(s):** `Vite + React Stack`, `Five-Page SPA (Home/Skills/Experience/Case/Contact)`, `VITE_BASE Environment Variable`, `src/App.jsx — page state + providers`, `src/components.jsx — Header/Footer/Logo` (+11 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Community 6`** (7 nodes): `ArchitectureDiagram()`, `BoundaryDiagram()`, `FlowGraph()`, `LineageGraph()`, `MigrationTimeline()`, `ModulePipeline()`, `diagrams.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Portfolio Project Overview` connect `Community 0` to `Community 1`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **Why does `useI18n()` connect `Community 5` to `Community 2`, `Community 4`?**
  _High betweenness centrality (0.089) - this node is a cross-community bridge._
- **Are the 10 inferred relationships involving `useI18n()` (e.g. with `CVButton()` and `Header()`) actually correct?**
  _`useI18n()` has 10 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `OG Social Card — Donnees fiables, ingenierie discrete` (e.g. with `Favicon — F monogram with accent dot` and `Brand Accent Color #169cdf`) actually correct?**
  _`OG Social Card — Donnees fiables, ingenierie discrete` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `Vite + React Stack`, `Five-Page SPA (Home/Skills/Experience/Case/Contact)`, `VITE_BASE Environment Variable` to the rest of the system?**
  _16 weakly-connected nodes found - possible documentation gaps or missing edges._