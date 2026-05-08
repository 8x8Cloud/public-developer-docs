---
sidebar_position: 1
---

# Overview

:::warning BETA

**The Contact Center Campaigns API is currently in Beta.**

:::

The 8x8 Contact Center Campaigns API is a REST API for programmatically controlling the lifecycle of campaigns and for adding records to dynamic campaigns.

## What is the Contact Center Campaigns API?

The API covers two responsibilities:

- **Campaign lifecycle control** — transition a campaign through its state machine using explicit actions (`BUILD`, `RESET`, `START`, `PAUSE`, `RESUME`, `RETRY`, `CANCEL`, `PURGE`).
- **Record management** — add 1 to 100 records at a time to a dynamic campaign's call list, each with an optional schedule, priority, and rank.

Campaign *creation* and *configuration* still happen in Contact Center Configuration Manager. This API controls lifecycle and records for campaigns that already exist.

## When to use this API

Use the Contact Center Campaigns API when you need to:

- Drive campaign lifecycle programmatically from an external system
- Add records in batches of up to 100 in a single request

## Relationship to the legacy Contact Center Dynamic Campaigns API

This API is part of an entirely new campaigns service. It does not share data with the legacy [Contact Center Dynamic Campaigns API](/actions-events/docs/cc-managing-campaign-status) — the two APIs manage completely separate campaigns.

- Campaigns belonging to the new service appear in the **New Campaigns** section of Configuration Manager. They are created, configured, and managed there — and programmatically via this API.

There is no crossover in either direction. Changes made through this API are only reflected in the **New Campaigns** section of Configuration Manager and are invisible to the legacy Campaign Manager; the reverse is also true.

> ✅ **Recommendation for beta customers**
>
> If you are participating in the beta, create new campaigns in the new service (through the **New Campaigns** section of Configuration Manager) rather than in the legacy Campaign Manager. The legacy API remains available only for customers who already have legacy campaigns to manage.

The two APIs differ in a number of ways:

| Aspect              | Legacy Dynamic Campaigns API                                            | Contact Center Campaigns API (BETA)                             |
|---------------------|-------------------------------------------------------------------------|-----------------------------------------------------------------|
| Campaigns managed   | Legacy Campaign Manager                                                 | New Campaigns section of Configuration Manager                  |
| Authentication      | HTTP Basic with Data/Action Request Tokens                              | `X-API-Key` with an Admin Console API Key                       |
| Base URL            | `https://vcc-{ccPlatform}.8x8.com/api/tstats/campaigns/`                | `https://api.8x8.com/cc/{customer-site}/campaigns/v1/`          |
| Record batch size   | Single record per request                                               | 1-100 records per request                                       |

## Getting started

To start using the API:

1. **[Set up authentication](./authentication.mdx)** — create an Admin Console API Key and attach the **Contact Center Campaigns** API Product
2. **[Work through the Getting Started guide](./getting-started.mdx)** — an end-to-end walkthrough using curl
3. **[Review the endpoints reference](./endpoints.md)** — full request and response detail

## Next steps

- [Getting Started](./getting-started.mdx) - End-to-end quick start
- [Authentication](./authentication.mdx) - Admin Console API Key setup
- [Endpoints](./endpoints.md) - Full endpoint reference
- [Campaign State Machine](./state-machine.md) - States, actions, and transitions
- [Field Reference](./field-reference.md) - Object schemas and enum values
- [Troubleshooting](./troubleshooting.md) - Error format and common issues
