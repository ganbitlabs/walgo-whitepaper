---
title: "CLI Reference"
date: 2026-02-06
draft: false
weight: 2
description: "Complete command reference for the Walgo CLI"
---

## Site Management

### walgo quickstart

One-command site creation, configuration, and deployment.

```bash
walgo quickstart <name>
```

Creates a Hugo site, installs a theme, adds sample content, builds with optimization, and offers deployment.

### walgo init

Initialize a new Hugo site.

```bash
walgo init <name> [--format toml|yaml|json] [--force]
```

### walgo new

Create new content using Hugo archetypes.

```bash
walgo new <path>
```

### walgo serve

Start the Hugo development server with live reload.

```bash
walgo serve [-D] [-p port] [--bind address] [--no-live-reload]
```

### walgo build

Build the site with optimization and compression.

```bash
walgo build [-c|--clean] [--no-optimize] [--no-compress] [-v] [--draft]
             [--source dir] [--destination dir] [--base-url url] [--minify]
```

### walgo import

Import an Obsidian vault as a Hugo site.

```bash
walgo import <vault-path> [-n name] [-p parent-dir] [-o output-dir]
             [--attachment-dir dir] [--convert-wikilinks] [--dry-run]
```

## Deployment

### walgo launch

Interactive 8-step deployment wizard (recommended for first-time users).

```bash
walgo launch
```

### walgo deploy

Direct on-chain deployment (requires Sui wallet).

```bash
walgo deploy [--epochs n] [--network testnet|mainnet]
             [--wallet path] [--gas-budget amount] [--directory dir]
```

### walgo deploy-http

HTTP deployment for testing (no wallet required, testnet only).

```bash
walgo deploy-http [--publisher url] [--aggregator url] [--epochs n]
                  [--mode blobs|files] [--workers n] [--directory dir]
```

### walgo update

Update an existing Walrus site by object ID.

```bash
walgo update <object-id> [--epochs n] [--directory dir]
             [--network network] [--gas-budget amount]
```

### walgo status

Check the deployment status of a site.

```bash
walgo status <object-id> [--network network] [--json]
```

## Project Management

### walgo projects list

List all deployed projects.

```bash
walgo projects list [--network network] [--status active|archived]
```

### walgo projects show

Show detailed project information.

```bash
walgo projects show [--id n | --name "name" | name]
```

### walgo projects update

Redeploy an existing project with new content.

```bash
walgo projects update [--id n | --name "name"] [--epochs n]
```

### walgo projects edit

Edit project metadata locally.

```bash
walgo projects edit --id n [--new-name name] [--category cat]
                    [--description text] [--image-url url] [--suins domain]
```

### walgo projects archive

Archive a project (hidden from default list).

```bash
walgo projects archive [--id n | --name "name"]
```

### walgo projects delete

Permanently delete a project record (local only).

```bash
walgo projects delete [--id n | --name "name"]
```

## AI Commands

### walgo ai configure

Interactive setup wizard for AI provider credentials.

```bash
walgo ai configure
```

### walgo ai generate

Generate a single content file with AI.

```bash
walgo ai generate [--type post|page]
```

### walgo ai update

Update an existing content file using AI.

```bash
walgo ai update <file>
```

### walgo ai pipeline

Generate a complete site (plan + generate + validate).

```bash
walgo ai pipeline
```

### walgo ai plan

Create a site plan without generating content.

```bash
walgo ai plan
```

### walgo ai resume

Resume content generation from an existing plan.

```bash
walgo ai resume
```

### walgo ai fix

Validate and fix content files for theme requirements.

```bash
walgo ai fix [--validate]
```

## Setup & Diagnostics

### walgo setup

Configure site-builder for Walrus Sites deployment.

```bash
walgo setup [--network testnet|mainnet] [--force]
            [--wallet-path path] [--key-scheme ed25519|secp256k1]
```

### walgo setup-deps

Download and install Walgo dependencies.

```bash
walgo setup-deps [--hugo] [--site-builder] [--sui] [--all]
```

### walgo doctor

Diagnose environment and configuration.

```bash
walgo doctor [--fix-paths] [--network network] [--verbose] [--fix]
```

### walgo domain

Manage SuiNS domains.

```bash
walgo domain list
walgo domain link <domain> <object-id>
walgo domain unlink <domain>
walgo domain info <domain>
```

## Utilities

### walgo optimize

Optimize HTML, CSS, and JavaScript files.

```bash
walgo optimize <directory> [--aggressive] [--html] [--css] [--js]
               [--remove-unused-css] [--verbose]
```

### walgo compress

Compress files with Brotli.

```bash
walgo compress <directory> [--level 0-11] [--verbose]
```

### walgo version

Show version information.

```bash
walgo version
```

### walgo uninstall

Uninstall Walgo CLI and/or desktop app.

```bash
walgo uninstall [-a|--all] [--cli] [--desktop] [-f|--force] [--keep-cache]
```

### walgo completion

Generate shell autocompletion scripts.

```bash
walgo completion [bash|zsh|fish|powershell]
```

### walgo desktop

Launch the Walgo desktop application.

```bash
walgo desktop
```
