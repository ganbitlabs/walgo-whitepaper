---
title: "Desktop Application"
date: 2026-02-06
draft: false
weight: 8
description: "Walgo desktop app built with Wails"
---

## Overview

Walgo includes a cross-platform desktop application that provides a graphical interface for all core functionality. Built with Wails (Go backend + React/TypeScript frontend), the desktop app makes decentralized web publishing accessible to users who prefer visual tools over the command line.

## Technology Stack

| Component | Technology |
|---|---|
| Backend | Go (shared with CLI) |
| Framework | Wails v2 |
| Frontend | React + TypeScript |
| Styling | CSS with custom design system |
| State Management | React Context + custom hooks |
| Platform Binaries | macOS (universal), Windows (amd64), Linux (amd64) |

The desktop app shares its Go backend with the CLI, ensuring identical behavior for all operations. The React frontend communicates with the Go backend through Wails' native binding system — no HTTP server or WebSocket layer required.

## Application Pages

### Dashboard

The dashboard provides an overview of the user's Walgo environment:

- **Wallet status** — Current address, balance (SUI and WAL), network (testnet/mainnet)
- **Account management** — Create, import, and switch between Sui accounts
- **Network switching** — Toggle between testnet and mainnet
- **Quick actions** — One-click access to common operations

### Create

The create page offers four paths to a new site:

1. **QuickStart** — One-click site creation with sensible defaults
2. **AI Pipeline** — AI-powered site generation with customizable parameters
3. **Init Site** — Manual Hugo site initialization with theme selection
4. **Obsidian Import** — Convert an Obsidian vault into a Hugo site

Each path guides the user through the necessary inputs with form validation and real-time feedback.

### Projects

The projects page displays all deployed sites with:

- **List view** — Sortable table with name, category, network, status, and deployment date
- **Search and filter** — Find projects by name, category, or network
- **Project details** — Object ID, browse URL, deployment history, gas fees spent
- **Actions** — Edit metadata, redeploy, archive, delete, open site folder

### Edit

The edit page provides in-app content editing:

- **File browser** — Navigate the site's content directory
- **Markdown editor** — Edit content files with syntax highlighting
- **Build and deploy** — Rebuild and redeploy directly from the editor
- **Drag-and-drop** — Drop files into the site's static directory

### AI Configuration

The AI configuration page manages LLM provider settings:

- **Provider selection** — OpenAI or OpenRouter
- **API key management** — Securely store and test credentials
- **Model selection** — Choose from available models per provider

### System Health

The system health page runs diagnostics equivalent to `walgo doctor`:

- **Dependency checks** — Hugo, Sui CLI, site-builder, walrus binary status
- **Auto-install** — One-click installation of missing dependencies
- **Version information** — Current versions of all tools
- **Network connectivity** — Testnet and mainnet endpoint status

## Progress Tracking

Long-running operations (build, deploy, AI generation) display real-time progress:

- Visual progress bars with step indicators
- Log output streaming from the Go backend
- Error messages with actionable suggestions
- Success confirmations with deployment URLs

## Platform Support

### macOS

- Universal binary (Intel + Apple Silicon)
- Requires manual trust on first launch (unsigned binary)
- Use `xattr -cr` to remove quarantine attribute

### Windows

- AMD64 binary
- SmartScreen warning on first run — click "More info" then "Run anyway"
- No additional dependencies required

### Linux

- AMD64 binary
- No special requirements
- Works on all major distributions with X11 or Wayland

## Installation

The desktop app is installed alongside the CLI:

```bash
# Install both CLI and desktop app
curl -fsSL https://raw.githubusercontent.com/selimozten/walgo/main/install.sh | bash

# Launch the desktop app
walgo desktop
```

Alternatively, the desktop app can be downloaded as a standalone binary from the GitHub releases page.
