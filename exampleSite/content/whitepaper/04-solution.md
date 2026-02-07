---
title: "Solution"
date: 2026-02-06
draft: false
weight: 4
description: "Walgo's approach to decentralized web publishing"
---

## Overview

Walgo combines four capabilities into a single CLI to make decentralized web publishing accessible to everyone:

1. **Unified Pipeline** — Build, optimize, compress, and deploy in one command
2. **Dual Deployment Modes** — HTTP deployment for quick testing, on-chain deployment for permanent publishing
3. **AI Content Generation** — Generate complete websites from natural language descriptions
4. **Project Management** — Track, update, and manage all deployed sites

## Unified Build Pipeline

Walgo wraps Hugo's static site generation with automatic optimization and compression:

```bash
walgo build
```

This single command:

1. Runs Hugo to compile markdown into static HTML
2. Minifies HTML, CSS, and JavaScript (removing whitespace, comments, unused code)
3. Applies Brotli compression (typically 20-40% smaller than gzip)
4. Reports optimization statistics (files processed, bytes saved)

The result is a production-ready output directory that is as small as possible — minimizing both Walrus storage costs and page load times.

### Optimization Statistics

| Optimization Step | Typical Reduction |
|---|---|
| HTML minification | 15-30% |
| CSS minification | 20-40% |
| JavaScript minification | 25-50% |
| Brotli compression | 60-80% total |

## Dual Deployment Modes

### HTTP Deployment (No Wallet Required)

For testing and quick publishing, Walgo supports HTTP-based deployment that requires no blockchain wallet:

```bash
walgo deploy-http
```

This mode uploads files directly to Walrus through HTTP publisher endpoints. It is ideal for:

- First-time users exploring decentralized hosting
- Testing site builds before committing to on-chain deployment
- Development workflows where permanence is not required

### On-Chain Deployment (Permanent)

For production use, Walgo deploys sites as first-class objects on the Sui blockchain:

```bash
walgo setup --network testnet
walgo deploy --epochs 5
```

On-chain deployment creates a Sui object that maps URL paths to Walrus blob IDs. The site persists for the specified number of epochs and can be updated, transferred, or linked to a SuiNS domain.

### Interactive Launch Wizard

For users who prefer guided deployment, the `launch` command provides an 8-step interactive wizard:

```bash
walgo launch
```

The wizard walks through: network selection, wallet setup, project naming, storage duration, build verification, cost review, deployment, and success confirmation with SuiNS instructions.

## AI Content Pipeline

Walgo integrates with large language models to generate complete websites from descriptions:

```bash
walgo ai configure    # Set up API credentials
walgo ai pipeline     # Generate a complete site
```

The AI pipeline supports six site types — blog, portfolio, documentation, business, biolink, and whitepaper — each with theme-appropriate content structure, SEO optimization, and proper Hugo frontmatter.

The pipeline is resumable: if generation is interrupted, `walgo ai resume` continues from where it left off.

## Project Management

Every deployment is tracked in a local SQLite database:

```bash
walgo projects list              # View all projects
walgo projects show --name blog  # View details
walgo projects update --id 3     # Redeploy with changes
walgo projects edit --id 3       # Edit metadata
```

Projects store the site name, category, network, object ID, deployment history, gas fees spent, and SuiNS domain. This eliminates the need to manually track deployment artifacts.

## Built-in Themes

Walgo ships with two custom Hugo themes optimized for minimal Walrus storage:

| Theme | Use Case | Size | Blobs |
|---|---|---|---|
| Walgo Biolink | Link-in-bio pages | < 15 KB | 4-5 |
| Walgo Whitepaper | Academic documents | < 100 KB | ~17 |

Both themes use system fonts by default (zero extra bytes), Hugo Pipes for asset bundling, and dark-first design with full light mode support.

## QuickStart

The fastest path from zero to a live decentralized website:

```bash
# Install Walgo
curl -fsSL https://raw.githubusercontent.com/selimozten/walgo/main/install.sh | bash

# Create, build, and deploy in one command
walgo quickstart my-site
```

This creates a complete Hugo site, installs a theme, adds sample content, builds with optimization, and offers deployment — all in under two minutes.
