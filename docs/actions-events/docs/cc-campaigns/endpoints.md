---
sidebar_position: 4
---

# Endpoints

:::warning BETA

**The Contact Center Campaigns API is currently in Beta.** See the [Overview](./overview.md) for details.

:::

The Contact Center Campaigns API exposes two endpoints:

| Endpoint                                                                          | Purpose                                                    |
|-----------------------------------------------------------------------------------|------------------------------------------------------------|
| [`PATCH /campaigns/{campaignId}`](./endpoints/modify-campaign.md)                 | Transition campaign state and toggle the `enabled` flag    |
| [`POST /campaigns/{campaignId}/records`](./endpoints/add-records.md)              | Add 1-100 records to a campaign's work list                |

## Common request conventions

All endpoints are rooted at:

```text
https://api.8x8.com/cc/{customer-site}/campaigns/v1
```

| Convention                | Value                                                                                                                        |
|---------------------------|------------------------------------------------------------------------------------------------------------------------------|
| `{customer-site}` segment | `US1`, `US2`, or `UK3` — see [Getting Started](./getting-started.mdx#base-url)                                               |
| Authentication            | `X-API-Key` header — see [Authentication](./authentication.mdx)                                                              |
| Tenant header             | `X-8x8-Tenant` — required on every request                                                                                   |
| Request body media type   | `Content-Type: application/vnd.campaigns.v1+json` — required on any request with a body                                      |
| Identifiers               | Server-generated identifiers (`id`, `campaignId`) are UUIDs. `crmRecordId` is a customer-supplied string (1-32 characters).  |
| Timestamps                | ISO 8601 with offset (e.g. `2026-04-22T10:00:00Z`)                                                                           |

## Next steps

- [Modify Campaign](./endpoints/modify-campaign.md) - `PATCH /campaigns/{campaignId}`
- [Add Records](./endpoints/add-records.md) - `POST /campaigns/{campaignId}/records`
- [Campaign State Machine](./state-machine.md) - When each action is valid
- [Field Reference](./field-reference.md) - Full schema for every object and enum
- [Troubleshooting](./troubleshooting.md) - Debugging guide
