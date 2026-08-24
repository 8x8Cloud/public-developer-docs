---
date: 2026-08-03
products: ["Connect"]
channel: "LINE"
changeType: Added
title: "LINE channel documentation"
---

The full **LINE channel documentation** is now published. LINE is the most popular chat app in Japan, Thailand, and Taiwan, and it reaches users through the same 8x8 Messaging Apps API and webhook envelope you already use for SMS, WhatsApp, Viber, and RCS.

## Two LINE products, one platform

The docs cover both LINE products on 8x8 — they have different endpoints, different recipient keys, and different capabilities, so choose deliberately:

- **LINE Official Account (LOA)** — the two-way channel for inbound and outbound conversations (support and service journeys).
- **LINE Official Notification (LON)** — the one-way notification product.

## What's covered

Onboarding (8x8 is a LINE-registered Agency/AGP partner and can provision an Official Account for you, or connect one you already own), concepts & fundamentals, the LOA and LON webhooks, governance & security, and the message API library.

Two things to plan for up front: the LOA channel needs a **registered webhook** before you can obtain a recipient's `channelUserId`, and each product needs its **own 8x8 sub-account** (a LINE sub-account cannot reuse an existing SMS sub-account).

Start at the [LINE hub](/connect/docs/line/line-hub) or jump into [Getting Started with LINE](/connect/docs/line/getting-started).
