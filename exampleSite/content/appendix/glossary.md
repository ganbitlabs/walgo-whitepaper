---
title: "Glossary"
date: 2026-02-06
draft: false
weight: 1
description: "Definitions of key terms used in this whitepaper"
---

**Aggregator** — A Walrus network node that serves stored content over HTTP. Walgo sites are accessible through aggregator URLs after deployment.

**Blob** — A binary large object stored on Walrus. Each file in a Walgo deployment (HTML, CSS, JS, images) becomes a separate blob with a unique identifier.

**Brotli** — A compression algorithm developed by Google that achieves 20-40% better compression than gzip. Walgo applies Brotli compression to all site assets before deployment.

**CLI (Command-Line Interface)** — A text-based interface for interacting with software. Walgo's primary interface is a CLI built with the Cobra framework.

**Cobra** — A Go library for creating command-line applications. Walgo uses Cobra for command parsing, flag handling, and help generation.

**Epoch** — A fixed time period in the Walrus storage network. Storage is committed and priced in epochs. Content persists for the number of epochs specified at deployment.

**Erasure Coding** — A data protection method that splits data into fragments with redundant pieces distributed across storage nodes. Walrus uses Reed-Solomon erasure coding for fault tolerance.

**Frontmatter** — Metadata at the top of a markdown file (in YAML, TOML, or JSON format) that Hugo uses for page configuration. Includes title, date, description, tags, and other fields.

**Gas** — The unit measuring computational effort required to execute operations on the Sui blockchain. Deploying and updating Walgo sites consumes gas paid in SUI tokens.

**Hugo** — The world's fastest static site generator, written in Go. Walgo uses Hugo to compile markdown content into optimized HTML, CSS, and JavaScript.

**Hugo Pipes** — Hugo's built-in asset processing pipeline for CSS and JavaScript bundling, minification, and fingerprinting. Walgo's themes use Hugo Pipes for zero-dependency asset management.

**LLM (Large Language Model)** — An AI model trained on large text datasets for natural language understanding and generation. Walgo integrates with LLMs (GPT-4, OpenRouter models) for content generation.

**Markdown** — A lightweight markup language for creating formatted text. Walgo sites are authored in markdown and compiled to HTML by Hugo.

**Minification** — The process of removing unnecessary characters (whitespace, comments) from code without changing functionality. Walgo minifies HTML, CSS, and JavaScript to reduce file sizes.

**Object ID** — A unique identifier for an object on the Sui blockchain. Each Walgo site deployment creates a site object with an Object ID used for updates and domain linking.

**OpenRouter** — An API aggregator that provides access to multiple LLM providers through a single interface. Walgo supports OpenRouter as an AI provider.

**Publisher** — A Walrus network endpoint that accepts file uploads and distributes them across storage nodes. Used by Walgo's HTTP deployment mode.

**QuickStart** — Walgo's one-command site creation flow that initializes a Hugo site, installs a theme, adds sample content, builds, and offers deployment.

**Reed-Solomon Coding** — A specific type of erasure coding used by Walrus. It generates redundant data fragments so that the original can be reconstructed from any sufficient subset.

**Site Object** — A Sui blockchain object that maps URL paths to Walrus blob IDs. Created during on-chain deployment, it serves as the on-chain representation of a Walgo site.

**site-builder** — The official CLI tool for publishing Walrus Sites on the Sui blockchain. Walgo wraps site-builder for on-chain deployment operations.

**SQLite** — An embedded relational database. Walgo uses SQLite to store project metadata, deployment history, and configuration locally.

**Static Site Generator (SSG)** — A tool that compiles source files (markdown, templates) into static HTML pages. Hugo is the SSG used by Walgo.

**Sui** — A Layer 1 blockchain developed by Mysten Labs featuring parallel execution, sub-second finality, and an object-centric data model. Walgo deploys sites as Sui objects.

**SuiNS** — The Sui Name Service, providing human-readable domain names (`.sui`, `.wal.app`) for Sui objects. Walgo supports linking sites to SuiNS domains.

**Viper** — A Go library for application configuration. Walgo uses Viper to manage `walgo.yaml` project configuration files.

**WAL** — The native token of the Walrus storage network, used to pay for blob storage.

**Wails** — A Go framework for building desktop applications using web technologies. Walgo's desktop app uses Wails with a React/TypeScript frontend.

**Walrus** — A decentralized storage protocol built on Sui. Content is erasure-coded and distributed across independent storage nodes for fault tolerance and permanence.

**Walrus Sites** — A standard for hosting static websites on Walrus, where a Sui object maps URL paths to Walrus blob IDs. Walgo creates and manages Walrus Sites.

**ws-resources.json** — The resource mapping file that defines which URL paths correspond to which Walrus blob IDs. Generated by Walgo during deployment.
