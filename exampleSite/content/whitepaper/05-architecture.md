---
title: "Technical Architecture"
date: 2026-02-06
draft: false
weight: 5
description: "System design and internal architecture of Walgo"
---

## System Overview

Walgo's architecture consists of five layers:

1. **CLI Layer** — Cobra-based command framework with 30+ commands
2. **Hugo Layer** — Site generation, theme management, and content scaffolding
3. **Optimizer Layer** — HTML, CSS, and JavaScript minification with Brotli compression
4. **Walrus Layer** — Deployment, updates, and cost calculation via site-builder and walrus CLI
5. **AI Layer** — Content planning, generation, and validation through LLM providers

```
┌─────────────────────────────────────────────┐
│                  CLI Layer                   │
│         (cobra commands, UI helpers)         │
├──────────┬──────────┬───────────┬───────────┤
│   Hugo   │Optimizer │  Walrus   │    AI     │
│  Layer   │  Layer   │  Layer    │  Layer    │
├──────────┼──────────┼───────────┼───────────┤
│  hugo    │ brotli   │site-builder│ OpenAI   │
│  binary  │ minifier │walrus CLI │OpenRouter │
└──────────┴──────────┴───────────┴───────────┘
```

## CLI Layer

Walgo uses the Cobra framework for command parsing and Viper for configuration management. The CLI provides:

### Command Categories

- **Site Management** — `quickstart`, `init`, `new`, `serve`, `build`, `import`
- **Deployment** — `launch`, `deploy`, `deploy-http`, `update`, `status`
- **Projects** — `list`, `show`, `update`, `edit`, `archive`, `delete`
- **AI** — `configure`, `generate`, `update`, `pipeline`, `plan`, `resume`, `fix`
- **Setup** — `setup`, `setup-deps`, `doctor`, `domain`, `uninstall`

### Configuration System

Walgo uses a layered configuration approach:

```yaml
# walgo.yaml — per-project configuration
hugo:
  publishDir: "public"
  minify: true
walrus:
  epochs: 5
  entrypoint: "index.html"
optimizer:
  enabled: true
compress:
  enabled: true
  brotli_level: 6
```

Global settings (AI credentials, project database) are stored in `~/.walgo/`.

## Hugo Layer

The Hugo layer manages the complete lifecycle of a Hugo site:

### Site Detection

Walgo automatically detects the site type from the Hugo configuration or content structure:

- Theme name in `hugo.toml` (e.g., `walgo-biolink`, `walgo-whitepaper`, `ananke`, `book`)
- Content directory patterns (e.g., `content/whitepaper/` indicates a whitepaper site)
- Fallback to user selection via interactive prompt

### Theme Management

Themes are either downloaded from GitHub (Ananke, Book) or extracted from embedded assets (Biolink, Whitepaper). Each theme includes:

- Hugo templates and partials
- CSS and JavaScript assets processed through Hugo Pipes
- Archetypes for content scaffolding
- Example site with reference configuration

### Obsidian Import

The import system converts Obsidian vaults to Hugo sites:

- Converts wikilinks to standard markdown links
- Processes attachments and images
- Generates Hugo-compatible frontmatter
- Preserves directory structure as content sections

## Optimizer Layer

The optimizer processes compiled Hugo output in three stages:

### HTML Optimization

```go
// Minifies whitespace, removes comments, preserves critical formatting
optimizer.OptimizeHTML(directory, config)
```

### CSS Optimization

Minifies CSS files, optionally removing unused rules. The optimizer is conservative by default to avoid breaking dynamically-applied classes.

### JavaScript Optimization

Minifies JavaScript by removing whitespace, comments, and unnecessary semicolons.

### Brotli Compression

After optimization, Walgo applies Brotli compression at a configurable level (0-11, default 6):

```go
// Creates .br files alongside originals
compressor.CompressDirectory(directory, level)
```

Walrus serves `.br` files automatically when the client supports Brotli, reducing bandwidth and improving load times.

## Walrus Layer

The Walrus layer handles all interactions with the Sui blockchain and Walrus storage:

### Deployment Pipeline

1. **Cost Calculation** — Estimates storage cost (WAL tokens) and gas fees (SUI tokens) based on file count and total size
2. **Site Publishing** — Invokes site-builder to upload files and create a site object on Sui
3. **Resource Mapping** — Generates `ws-resources.json` mapping URL paths to Walrus blob IDs
4. **Status Tracking** — Records deployment metadata in the local project database

### Cost Model

Storage costs are calculated as:

```
total_cost = base_fee + (num_blobs × per_blob_fee) + (total_size × size_fee)
```

The cost breakdown is displayed before deployment, giving users full transparency:

```
Storage:  0.25 WAL (5 blobs, 148 KB)
Gas:      0.02 SUI
Total:    0.25 WAL + 0.02 SUI
```

### Update Mechanism

Sites can be updated without changing their object ID or URL:

```bash
walgo projects update --id 5
```

This rebuilds the site, pushes changed blobs to Walrus, and updates the on-chain resource mapping. Only modified files are re-uploaded.

## AI Layer

The AI layer integrates with external LLM providers for content generation:

### Provider Architecture

```go
type AIClient struct {
    Provider    string  // "openai" or "openrouter"
    Model       string  // e.g., "gpt-4"
    APIKey      string
    RateLimit   int     // requests per minute
}
```

### Pipeline Phases

1. **Planning** — The planner creates a site structure (pages, titles, descriptions) and saves it to `.walgo/plan.json`
2. **Generation** — The generator creates each page with proper Hugo frontmatter and SEO optimization
3. **Validation** — The content fixer verifies theme requirements, fixes frontmatter, and removes duplicate headings

### Resumability

If the pipeline is interrupted (network error, rate limit, etc.), the plan file tracks which pages have been generated. Running `walgo ai resume` continues from the last successful page.

## Dependency Management

Walgo manages its external tool dependencies through the `setup-deps` command:

| Dependency | Purpose | Installation |
|---|---|---|
| Hugo Extended | Site compilation | Auto-downloaded |
| site-builder | Walrus deployment | Auto-downloaded |
| walrus | Storage operations | Auto-downloaded |
| Sui CLI | Wallet management | Auto-downloaded |
| Git | Version control | User-provided |

The `doctor` command diagnoses the environment, checking all dependencies, wallet configuration, network connectivity, and account balance.
