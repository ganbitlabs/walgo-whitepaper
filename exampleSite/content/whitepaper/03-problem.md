---
title: "Problem Statement"
date: 2026-02-06
draft: false
weight: 3
description: "Current limitations of web hosting and decentralized publishing"
---

## Centralized Hosting Fragility

The vast majority of websites depend on a handful of cloud providers. When these providers experience outages, entire regions of the internet go dark. In recent years, single-provider failures have taken down millions of websites simultaneously, sometimes for hours.

More insidiously, centralized hosting creates a power asymmetry. The hosting provider — not the content creator — ultimately controls whether content remains accessible. Platforms routinely:

- **Shut down services** — GeoCities, Google+, and dozens of blogging platforms have deleted user content permanently
- **Change terms** — Pricing increases, policy changes, or feature removals can force migrations on short notice
- **Censor selectively** — Content that is legal but controversial may be removed at the provider's discretion
- **Suffer data loss** — Even enterprise providers have lost customer data through operational errors

| Hosting Model | Uptime Guarantee | Content Ownership | Censorship Resistance | Cost |
|---|---|---|---|---|
| Shared hosting | 99.9% | Partial | None | $5-20/mo |
| Cloud (AWS/GCP) | 99.99% | Contractual | None | Variable |
| Static hosting (Vercel) | 99.99% | Contractual | None | Free-$20/mo |
| **Walrus (via Walgo)** | **Network-level** | **Full** | **By design** | **Per-epoch** |

## The Complexity Barrier

For developers who want to use decentralized storage, the current workflow is fragmented and manual:

1. **Install Hugo** — Download and configure the static site generator
2. **Create content** — Write markdown and configure themes
3. **Build the site** — Run Hugo to compile static files
4. **Optimize assets** — Manually minify HTML, CSS, and JavaScript
5. **Compress files** — Apply Brotli compression for Walrus efficiency
6. **Install Sui CLI** — Set up blockchain tooling
7. **Create a wallet** — Generate keypair and acquire tokens
8. **Install site-builder** — Download the Walrus Sites deployment tool
9. **Configure networking** — Set up testnet or mainnet endpoints
10. **Deploy** — Run site-builder with correct flags and parameters
11. **Track the deployment** — Manually record object IDs and URLs

Each step has its own documentation, error modes, and version compatibility concerns. A single misconfiguration can cause the entire pipeline to fail silently.

## No Project Continuity

Even after a successful first deployment, updating a site on Walrus requires remembering the original object ID, rebuilding with the correct configuration, and running the update command with matching parameters. There is no built-in way to:

- Track which sites you have deployed
- View deployment history and status
- Update a site by name instead of object ID
- Manage multiple sites across networks

## Content Creation Bottleneck

Many potential users of decentralized web hosting are not developers. Writers, researchers, artists, and organizations want to publish content but lack the technical skills to create Hugo sites from scratch. They need:

- Scaffolding that creates a complete, deployable site structure
- Content templates appropriate for their use case (blog, portfolio, documentation, whitepaper)
- AI assistance for generating and refining content
- A visual interface as an alternative to the command line

## The Missing Tool

The ideal solution would be a single tool that:

- **Handles the entire pipeline** from markdown to deployed site
- **Abstracts blockchain complexity** behind familiar CLI patterns
- **Manages projects** with persistent tracking and easy updates
- **Generates content** using AI for users who need help getting started
- **Works on every platform** with both CLI and desktop interfaces

Walgo is designed to be that tool.
