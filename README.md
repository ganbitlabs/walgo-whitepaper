<h1 align="center">Walgo Whitepaper</h1>

<p align="center">
  <strong>An academic-style whitepaper <a href="https://gohugo.io">Hugo</a> theme for blockchain projects.</strong><br>
  Deploy your whitepaper on-chain via <a href="https://walrus.xyz">Walrus</a> with <a href="https://github.com/selimozten/walgo">Walgo</a>.
</p>

<p align="center">
  <a href="#quick-start">Quick Start</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#configuration">Configuration</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="exampleSite/hugo.toml">Example Config</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a href="#license">License</a>
</p>

---

## Overview

Walgo Whitepaper turns Markdown into a navigable, multi-section document with sidebar navigation, scroll spy, reading progress tracking, and print-ready output. Built with [Hugo](https://gohugo.io) for blockchain whitepapers, technical documentation, and research papers.

Optimized for deployment on [Walrus](https://walrus.xyz) decentralized storage via the [Walgo CLI](https://github.com/selimozten/walgo).

### Highlights

| | Feature | Details |
|---|---|---|
| **Navigation** | Sidebar + scroll spy | Fixed sidebar with IntersectionObserver-based active tracking |
| **Reading** | Progress bar | Visual scroll progress indicator at the top |
| **Sections** | Auto-numbering | Automatic section numbers derived from page weight |
| **Cover** | Landing page | Logo, version badge, authors, abstract, and CTA button |
| **Code** | Syntax highlighting | Chroma-powered with copy-to-clipboard on every block |
| **PDF** | Download button | Optional header button linking to a PDF version |
| **Contracts** | Footer display | Wallet addresses with copy button and explorer links |
| **Socials** | 10 platforms | X · GitHub · Discord · Telegram · YouTube · LinkedIn · Reddit · Instagram · Medium · Website |
| **Theming** | Dark / light | System preference detection, custom accent, Google Fonts |
| **Print** | Clean output | Hides UI, white background, link footnotes, page breaks |
| **Mobile** | Responsive | Hamburger sidebar, inline ToC, adapted typography |
| **Performance** | Zero deps | Vanilla JS < 3KB · No frameworks · Walrus-optimized |

---

## Quick Start

```bash
hugo new site my-whitepaper && cd my-whitepaper

git submodule add https://github.com/ganbitlabs/walgo-whitepaper themes/walgo-whitepaper

cp -r themes/walgo-whitepaper/exampleSite/* .

hugo server
```

Open `http://localhost:1313` — you should see the full demo whitepaper with 11 sections, sidebar navigation, and cover page.

---

## Configuration

Everything lives in `hugo.toml` under `[params]`. The [example config](exampleSite/hugo.toml) is fully commented and production-ready.

### Identity & Document Info

```toml
[params]
  projectName = "My Protocol"
  tagline     = "A short tagline"
  logo        = "/favicon.svg"
  favicon     = "/favicon.svg"
  version     = "1.0.0"
  date        = "2026-01-01"
  authors     = ["Author One", "Author Two"]
  license     = "MIT"
```

### Cover Page

```toml
[params]
  coverLogo       = "/logo.png"
  coverLogoHeight = "120px"         # default: 80px
  ctaText         = "Read Whitepaper"
  abstractTitle   = "Abstract"
```

### Feature Toggles

```toml
[params]
  showReadingTime      = true       # estimated reading time per section
  showLastUpdated      = true       # last modified date
  showSectionNumbers   = true       # "1. Abstract", "2. Introduction", etc.
  showProgressBar      = true       # reading progress bar at top
  showFullDocumentView = true       # "Read All" single-page view
```

### Social Links

```toml
[params]
  github   = "https://github.com/yourorg/yourproject"
  twitter  = "https://x.com/yourhandle"
  discord  = "https://discord.gg/yourserver"
  telegram = "https://t.me/yourchannel"
  website  = "https://yourproject.xyz"
```

Also available: `youtube` · `linkedin` · `reddit` · `instagram` · `medium`

### PDF Download

```toml
[params.pdf]
  enabled = true
  url     = "/whitepaper.pdf"
```

### Contract Addresses

```toml
[params.contracts.sui]
  label    = "Sui"
  address  = "0x1234...abcd"
  explorer = "https://suiscan.xyz/mainnet/object/"

[params.contracts.ethereum]
  label    = "ETH"
  address  = "0xabcd...1234"
  explorer = "https://etherscan.io/address/"
```

### Sidebar Menu

Each entry maps to a content file. `weight` controls the order and section numbering:

```toml
[[menu.whitepaper]]
  name   = "Abstract"
  url    = "/whitepaper/01-abstract/"
  weight = 1

[[menu.whitepaper]]
  name   = "Introduction"
  url    = "/whitepaper/02-introduction/"
  weight = 2
```

---

## Content Structure

```
content/
├── _index.md                       Cover page frontmatter
├── whitepaper/
│   ├── _index.md                   Section index
│   ├── 01-abstract.md
│   ├── 02-introduction.md
│   ├── 03-problem.md
│   ├── 04-solution.md
│   ├── 05-architecture.md
│   └── ...
└── appendix/
    ├── _index.md
    ├── glossary.md
    └── cli-reference.md
```

### Archetypes

Scaffold new sections with built-in archetypes:

```bash
hugo new whitepaper/my-section.md       # generic
hugo new whitepaper/abstract.md         # abstract
hugo new whitepaper/architecture.md     # architecture
hugo new whitepaper/tokenomics.md       # token economics
hugo new whitepaper/roadmap.md          # roadmap
hugo new whitepaper/team.md            # team
hugo new whitepaper/references.md       # references
hugo new whitepaper/changelog.md        # changelog
```

---

## Theme Structure

```
walgo-whitepaper/
├── archetypes/
│   ├── default.md
│   └── whitepaper/             8 section-specific templates
├── assets/
│   ├── css/main.css            Styles — dark/light, sidebar, print, responsive
│   └── js/main.js              Vanilla JS — scroll spy, progress, sidebar, clipboard
├── exampleSite/                Full 11-section demo whitepaper
├── layouts/
│   ├── _default/               Base templates
│   ├── whitepaper/             Section page + full document view
│   ├── appendix/               Appendix layout
│   ├── partials/               Header, sidebar, footer, meta, ToC, progress bar
│   ├── index.html              Cover page
│   └── 404.html                Error page
└── static/
    ├── favicon.svg
    └── github_walgo.png
```

---

## Requirements

[Hugo](https://gohugo.io) **0.112.0** or later. Extended edition recommended for asset processing.

## Contributing

Contributions are welcome. Please open an issue or submit a pull request on [GitHub](https://github.com/ganbitlabs/walgo-whitepaper).

## License

[MIT](LICENSE)
