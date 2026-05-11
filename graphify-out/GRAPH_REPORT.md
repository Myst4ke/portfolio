# Graph Report - .  (2026-05-06)

## Corpus Check
- Corpus is ~9,174 words - fits in a single context window. You may not need a graph.

## Summary
- 93 nodes · 133 edges · 10 communities detected
- Extraction: 83% EXTRACTED · 17% INFERRED · 0% AMBIGUOUS · INFERRED: 22 edges (avg confidence: 0.84)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Project Documentation & Setup|Project Documentation & Setup]]
- [[_COMMUNITY_Entry, Branding & Theming|Entry, Branding & Theming]]
- [[_COMMUNITY_UI Components|UI Components]]
- [[_COMMUNITY_Scroll Effects & Charts|Scroll Effects & Charts]]
- [[_COMMUNITY_SkillsExperienceContact Pages|Skills/Experience/Contact Pages]]
- [[_COMMUNITY_Architecture & Lineage Diagrams|Architecture & Lineage Diagrams]]
- [[_COMMUNITY_I18n & Theme Providers|I18n & Theme Providers]]
- [[_COMMUNITY_Data Engineering Identity|Data Engineering Identity]]
- [[_COMMUNITY_Home Page|Home Page]]
- [[_COMMUNITY_App Root|App Root]]

## God Nodes (most connected - your core abstractions)
1. `Portfolio Project Overview` - 13 edges
2. `useI18n()` - 11 edges
3. `useScrollProgress()` - 7 edges
4. `Portfolio Entry HTML` - 7 edges
5. `OG Social Card — Donnees fiables, ingenierie discrete` - 7 edges
6. `Theme Init Script (pre-paint)` - 5 edges
7. `useInViewProgress()` - 4 edges
8. `CSS Theme Variables (light/dark)` - 4 edges
9. `Florian Posez — Data Engineer Paris` - 4 edges
10. `ThemeToggle()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `Decorative lineage/data curve with nodes` --semantically_similar_to--> `src/diagrams.jsx — Architecture/Migration/Lineage`  [INFERRED] [semantically similar]
  public/og-image.svg → README.md
- `CSS Theme Variables (light/dark)` --shares_data_with--> `Brand Accent Color #169cdf`  [INFERRED]
  index.html → public/favicon.svg
- `CSS Theme Variables (light/dark)` --shares_data_with--> `Brand Ink Color #15161a`  [INFERRED]
  index.html → public/favicon.svg
- `Open Graph + Twitter Meta` --references--> `OG Social Card — Donnees fiables, ingenierie discrete`  [EXTRACTED]
  index.html → public/og-image.svg
- `Florian Posez — Data Engineer Paris` --conceptually_related_to--> `Tagline: Donnees fiables, ingenierie discrete`  [INFERRED]
  index.html → public/og-image.svg

## Hyperedges (group relationships)
- **Shared brand visual system across HTML CSS, favicon and OG image** — index_html_css_variables, favicon_svg_logo, og_image_social_card, favicon_accent_color, favicon_ink_color [INFERRED 0.90]
- **Pre-paint theme switching flow (no FOUC)** — index_html_theme_init_script, theme_persistence_localstorage, theme_prefers_color_scheme, index_html_css_variables, rationale_no_flash_theme [EXTRACTED 0.95]
- **SPA module structure described in README** — readme_src_app_jsx, readme_src_i18n_jsx, readme_src_components_jsx, readme_src_scroll_fx_jsx, readme_src_diagrams_jsx, readme_pages_modules [EXTRACTED 0.95]

## Communities

### Community 0 - "Project Documentation & Setup"
Cohesion: 0.14
Nodes (17): Open Graph + Twitter Meta, CV Filename Convention (cv-florian-posez-{lang}.pdf), Rationale: CV download matches active UI language, CV PDFs in public/, Dark Mode Support, Five-Page SPA (Home/Skills/Experience/Case/Contact), GitHub Pages Deploy via Actions, FR/EN i18n (+9 more)

### Community 1 - "Entry, Branding & Theming"
Cohesion: 0.15
Nodes (16): Brand Accent Color #169cdf, Brand Ink Color #15161a, Favicon — F monogram with accent dot, CSS Theme Variables (light/dark), Portfolio Entry HTML, Favicon Link, Google Fonts (Inter Tight + JetBrains Mono), React Mount via main.jsx (+8 more)

### Community 2 - "UI Components"
Cohesion: 0.28
Nodes (11): Chip(), CVButton(), Dot(), Footer(), Header(), Logo(), PageHeader(), Pill() (+3 more)

### Community 3 - "Scroll Effects & Charts"
Cohesion: 0.44
Nodes (9): BarChart(), CountUp(), DataPrintLive(), DonutChart(), HBar(), PageScrollBar(), Reveal(), useInViewProgress() (+1 more)

### Community 4 - "Skills/Experience/Contact Pages"
Cohesion: 0.33
Nodes (6): useI18n(), CasePage(), ContactForm(), ContactPage(), ExperiencePage(), SkillsPage()

### Community 5 - "Architecture & Lineage Diagrams"
Cohesion: 0.6
Nodes (3): ArchitectureDiagram(), LineageGraph(), MigrationTimeline()

### Community 6 - "I18n & Theme Providers"
Cohesion: 0.6
Nodes (3): I18nProvider(), ThemeProvider(), useTheme()

### Community 7 - "Data Engineering Identity"
Cohesion: 0.4
Nodes (5): Concept: Data Observability, Concept: Lakehouse Platform, Concept: Real-time Pipelines, Tagline: Donnees fiables, ingenierie discrete, Florian Posez — Data Engineer Paris

### Community 8 - "Home Page"
Cohesion: 0.67
Nodes (2): HomePage(), StatBand()

### Community 9 - "App Root"
Cohesion: 0.67
Nodes (1): App()

## Knowledge Gaps
- **17 isolated node(s):** `React Mount via main.jsx`, `Google Fonts (Inter Tight + JetBrains Mono)`, `Vite + React Stack`, `Five-Page SPA (Home/Skills/Experience/Case/Contact)`, `VITE_BASE Environment Variable` (+12 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **Thin community `Home Page`** (4 nodes): `page-home.jsx`, `HomePage()`, `StatBand()`, `page-home.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.
- **Thin community `App Root`** (3 nodes): `App()`, `App.jsx`, `App.jsx`
  Too small to be a meaningful cluster - may be noise or needs more connections extracted.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Portfolio Project Overview` connect `Project Documentation & Setup` to `Entry, Branding & Theming`?**
  _High betweenness centrality (0.092) - this node is a cross-community bridge._
- **Why does `useI18n()` connect `Skills/Experience/Contact Pages` to `Home Page`, `UI Components`, `I18n & Theme Providers`?**
  _High betweenness centrality (0.080) - this node is a cross-community bridge._
- **Why does `Portfolio Entry HTML` connect `Entry, Branding & Theming` to `Project Documentation & Setup`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **Are the 9 inferred relationships involving `useI18n()` (e.g. with `CVButton()` and `Header()`) actually correct?**
  _`useI18n()` has 9 INFERRED edges - model-reasoned connections that need verification._
- **Are the 3 inferred relationships involving `OG Social Card — Donnees fiables, ingenierie discrete` (e.g. with `Favicon — F monogram with accent dot` and `Brand Accent Color #169cdf`) actually correct?**
  _`OG Social Card — Donnees fiables, ingenierie discrete` has 3 INFERRED edges - model-reasoned connections that need verification._
- **What connects `React Mount via main.jsx`, `Google Fonts (Inter Tight + JetBrains Mono)`, `Vite + React Stack` to the rest of the system?**
  _17 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Project Documentation & Setup` be split into smaller, more focused modules?**
  _Cohesion score 0.14 - nodes in this community are weakly interconnected._