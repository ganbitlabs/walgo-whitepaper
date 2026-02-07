---
title: "Storage & Economics"
date: 2026-02-06
draft: false
weight: 6
description: "Walrus storage model, cost structure, and economic considerations"
---

## Walrus Storage Model

Walrus is a decentralized storage protocol built on the Sui blockchain. Unlike traditional file storage, Walrus uses erasure coding to distribute data across a network of independent storage nodes, achieving both redundancy and cost efficiency.

### Erasure Coding

Walrus employs Reed-Solomon erasure coding to split each file (blob) into fragments:

- Original data is encoded into `n` fragments
- Any `k` fragments (where `k < n`) are sufficient to reconstruct the original
- The remaining `n - k` fragments provide redundancy

This means the network can tolerate the failure of up to 30% of storage nodes without any data loss. Content persists as long as a sufficient number of nodes remain operational.

### Blob Storage

Every file in a Walgo deployment becomes a Walrus blob:

| File Type | Example | Typical Size |
|---|---|---|
| HTML page | `index.html` | 2-10 KB |
| CSS bundle | `main.min.css` | 5-30 KB |
| JavaScript | `main.min.js` | 2-15 KB |
| Images | `logo.svg` | 1-50 KB |
| Fonts (if used) | `inter.woff2` | 50-200 KB |
| Compressed variants | `*.br` | 40-70% of original |

Walgo's optimization pipeline ensures that each blob is as small as possible before upload, directly reducing storage costs.

## Cost Structure

### Storage Costs

Walrus storage is priced in WAL tokens, based on:

- **Number of blobs** — Each file uploaded incurs a per-blob fee
- **Total data size** — Larger files cost proportionally more
- **Storage duration** — Measured in epochs (each epoch is a fixed time period)

```
storage_cost = base_fee + (blob_count × per_blob_fee) + (total_bytes × byte_fee) × epochs
```

### Gas Costs

On-chain operations (creating the site object, updating resource mappings) consume SUI gas:

- **Site creation** — One-time gas cost for the initial deployment
- **Site updates** — Gas for modifying the resource mapping
- **Smaller than typical DeFi transactions** — Site operations are simple object mutations

### Cost Comparison

| Hosting Method | Monthly Cost (small site) | Permanence | Censorship Resistant |
|---|---|---|---|
| Shared hosting | $5-20/mo | While paying | No |
| Static hosting (Vercel) | Free-$20/mo | While paying | No |
| AWS S3 + CloudFront | $1-10/mo | While paying | No |
| IPFS pinning | $5-20/mo | While paying | Partially |
| **Walrus (via Walgo)** | **< 1 WAL one-time** | **Per-epoch guarantee** | **Yes** |

### Typical Deployment Costs

Based on real deployments, a typical Walgo site costs:

| Site Type | Files | Total Size | Estimated Cost |
|---|---|---|---|
| Biolink (single page) | 4-5 | < 15 KB | < 0.1 WAL |
| Blog (10 posts) | 15-25 | 100-300 KB | 0.2-0.5 WAL |
| Documentation (50 pages) | 60-100 | 500 KB-2 MB | 0.5-2 WAL |
| Whitepaper | 15-20 | 100-500 KB | 0.2-0.8 WAL |

## Epoch-Based Persistence

Walrus storage is committed in epochs — fixed time periods during which storage nodes are economically incentivized to maintain data availability. When deploying with Walgo:

```bash
walgo deploy --epochs 5
```

The `--epochs` flag determines how long the content is guaranteed to persist. After the specified epochs expire, storage nodes may garbage-collect the data unless the storage is renewed.

### Renewal Strategy

For sites that should persist indefinitely, users can:

1. Deploy with a high epoch count for long-term storage
2. Use `walgo projects update` to redeploy and extend storage
3. Monitor epoch expiration through `walgo status`

## HTTP vs On-Chain Economics

| Factor | HTTP Deploy | On-Chain Deploy |
|---|---|---|
| Wallet required | No | Yes |
| Storage cost | Free (testnet) | WAL tokens |
| Gas cost | None | SUI tokens |
| Duration | ~30 days | Configurable epochs |
| Updatable | No | Yes |
| SuiNS domains | No | Yes |
| Network | Testnet only | Testnet or mainnet |

HTTP deployment is ideal for testing and development. On-chain deployment is the production path for permanent, updatable sites with custom domain support.

## Optimization Impact on Cost

Walgo's build pipeline significantly reduces deployment costs by minimizing blob sizes:

```
Before optimization:  450 KB (12 files)
After minification:   280 KB (12 files)  — 38% reduction
After Brotli:         95 KB  (12 files)  — 79% total reduction
```

This means the same site costs roughly 5x less to store on Walrus compared to deploying unoptimized output.
