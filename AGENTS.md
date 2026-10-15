# AGENTS.md

Instructions for coding agents working in this repo.

walgo-whitepaper is an academic-style, multi-section whitepaper [Hugo](https://gohugo.io) theme (Hugo >= 0.112.0), built for deployment to Walrus with the walgo CLI. Users install it as `themes/walgo-whitepaper`, write sections as Markdown under `content/whitepaper/`, and configure the theme under `[params]` in their `hugo.toml`.

## Layout

- `layouts/index.html`: cover page; `layouts/whitepaper/` and `layouts/appendix/`: section list and single pages; `layouts/partials/`: sidebar, header, inline ToC, reading progress, section numbering, meta, head, footer.
- `layouts/_default/_markup/render-image.html`: Markdown image render hook.
- `assets/css/main.css`, `assets/js/main.js`: the stylesheet and main script (vanilla JS: scroll spy, copy buttons, theme toggle), inlined by the templates. `layouts/partials/head.html` also inlines a small script that restores the saved light/dark theme before paint.
- `archetypes/whitepaper/`: starter sections (abstract, introduction, architecture, tokenomics, roadmap, team, references, changelog).
- `static/`: favicon, images, and self-hosted fonts. External font CSS loads only when a user opts in with `customFonts` (Google Fonts or `fontUrl`).
- `exampleSite/`: a fully commented demo config (`exampleSite/hugo.toml`) and an 11-section demo whitepaper.
- `theme.toml`: theme metadata.

## Commands

There is no test suite. Check changes by building the example site:

```bash
cd exampleSite
hugo server --themesDir ../..   # live preview
hugo --themesDir ../..          # one-off build into exampleSite/public (gitignored)
```

`--themesDir ../..` works when this repo is checked out in a directory named `walgo-whitepaper`.

## Care points

- `[params]` keys, front matter fields (such as `weight` for section numbering), and the `whitepaper`/`appendix` section names are a public contract with users' existing sites. Keep old keys working; document new ones in `exampleSite/hugo.toml` and the README.
- Keep the theme dependency-free and small; it is served from decentralized storage. Print styles are a feature: check print output when changing layout.

## Agent skills

### Issue tracker

GitHub Issues in `ganbitlabs/walgo-whitepaper`, through the `gh` CLI. See [`docs/agents/issue-tracker.md`](docs/agents/issue-tracker.md).

### Triage labels

The five canonical defaults: `needs-triage`, `needs-info`, `ready-for-agent`, `ready-for-human`, `wontfix`. See [`docs/agents/triage-labels.md`](docs/agents/triage-labels.md).

### Domain docs

Single-context: `GLOSSARY.md` + `docs/adr/` at the repo root, created lazily as terms and decisions get resolved. See [`docs/agents/domain.md`](docs/agents/domain.md).
