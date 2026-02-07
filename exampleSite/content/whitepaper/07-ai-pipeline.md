---
title: "AI Pipeline"
date: 2026-02-06
draft: false
weight: 7
description: "AI-powered content generation and site creation"
---

## Overview

Walgo integrates with large language models to automate content creation. The AI pipeline can generate a complete, deployable website from a natural language description — handling site planning, content writing, frontmatter generation, and theme-specific validation.

## Supported Providers

| Provider | Models | Configuration |
|---|---|---|
| OpenAI | GPT-3.5, GPT-4 | API key via `walgo ai configure` |
| OpenRouter | Multiple models | API key via `walgo ai configure` |

Credentials are stored locally in `~/.walgo/ai-credentials.yaml` and never transmitted to Walgo's servers.

## Site Types

The AI pipeline supports six site types, each with tailored content structure and theme integration:

| Site Type | Theme | Content Structure |
|---|---|---|
| Blog | Ananke | Posts with tags, categories, featured images |
| Portfolio | Ananke | Project showcases with descriptions and links |
| Documentation | Book | Hierarchical pages with sidebar navigation |
| Business | Ananke | Landing page, about, services, contact |
| Biolink | Walgo Biolink | Single-page link-in-bio (TOML configuration) |
| Whitepaper | Walgo Whitepaper | Multi-section academic document with sidebar |

## Pipeline Architecture

The AI pipeline consists of three phases that execute sequentially:

### Phase 1: Planning

```bash
walgo ai plan
```

The planner takes a site description and generates a complete content plan:

- **Input:** Site name, type, description, target audience, desired features, tone
- **Processing:** The LLM generates a structured plan with page titles, descriptions, and ordering
- **Output:** A JSON plan file saved to `.walgo/plan.json`

Example plan output:

```json
{
  "site_name": "My Tech Blog",
  "site_type": "blog",
  "pages": [
    {
      "title": "Getting Started with Sui Development",
      "filename": "getting-started-sui.md",
      "description": "Beginner guide to building on Sui",
      "section": "posts",
      "status": "pending"
    }
  ]
}
```

### Phase 2: Generation

```bash
walgo ai pipeline
```

The generator creates each page sequentially, producing:

- **Hugo-compatible frontmatter** — Title, date, description, tags, categories, weight
- **SEO-optimized content** — Headings, meta descriptions, keyword placement
- **Theme-specific structure** — Content formatted for the selected theme's templates
- **Markdown best practices** — Proper heading hierarchy, code blocks, tables, lists

### Phase 3: Validation

```bash
walgo ai fix
```

The content fixer validates and repairs generated content:

- Ensures frontmatter syntax is valid YAML
- Removes duplicate H1 headings (Hugo generates these from the title)
- Verifies theme-specific requirements (e.g., biolink content goes in `hugo.toml`, not markdown)
- Sets draft status appropriately

## Rate Limiting and Reliability

The pipeline includes built-in protections for API reliability:

- **Rate limiting** — Default 30 requests per minute, configurable per provider
- **Retry logic** — Exponential backoff on transient failures (429, 500, 503)
- **Resumability** — Each page's generation status is tracked in the plan file
- **Parallel generation** — For large sites, multiple pages generate concurrently

## Resumability

If the pipeline is interrupted at any point, progress is preserved:

```bash
# Start generation (interrupted after 5 of 10 pages)
walgo ai pipeline

# Resume from page 6
walgo ai resume
```

The plan file at `.walgo/plan.json` tracks which pages have been successfully generated, allowing the pipeline to continue exactly where it left off.

## Content Update

For existing content, the AI can update individual files while preserving style and tone:

```bash
walgo ai update content/posts/my-article.md
```

The update command reads the existing content, sends it to the LLM with update instructions, and writes the improved version back — preserving the original frontmatter and structural elements.

## Single Content Generation

For adding individual pieces of content to an existing site:

```bash
walgo ai generate --type post
```

This generates a single page using the site's existing theme and content patterns as context, ensuring consistency with the rest of the site.

## Workflow Integration

The AI pipeline integrates naturally with the rest of Walgo's toolchain:

```bash
# Complete AI-powered workflow
walgo ai configure          # One-time setup
walgo ai pipeline           # Generate complete site
walgo serve                 # Preview locally
walgo build                 # Build with optimization
walgo launch                # Deploy to Walrus
```

From zero to a live, AI-generated website on decentralized storage — in five commands.
