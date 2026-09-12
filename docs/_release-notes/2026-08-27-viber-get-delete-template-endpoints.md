---
date: 2026-08-27
products: ["Connect", "APIs"]
channel: "Viber"
changeType: Added
title: "Get and Delete Viber template endpoints"
---

You can now retrieve and delete Viber message templates via API, in addition to creating them.

## Retrieve templates

```http
GET /api/v1/accounts/{accountId}/channels/{channelId}/templates
```

Returns a `templates` array with one entry per template/language combination:

| Field | Description |
| --- | --- |
| `templateId` | Viber's internal identifier for the template. |
| `name` | The template name. |
| `text` | The template message text. |
| `language` | Language code for the template. |
| `category` | Template category (`Transactional` or `OTP`). |
| `params` | Parameter definitions used in the template text. |
| `status` | Current approval status with Viber: `Approved`, `Pending`, or `Rejected`. |
| `createdAt` / `updatedAt` | Timestamps for creation and last update. |

## Delete a template

```http
DELETE /api/v1/accounts/{accountId}/channels/{channelId}/templates/{templateName}?language={language}
```

Because each language variant of a Viber template is stored as its own template, the `language` query parameter is required to identify which variant to delete. A successful deletion returns `200 OK` with an empty body; if the template/language pair doesn't exist, the endpoint returns `404 Not Found`.

Deleting templates is rate-limited to **20 requests per minute per partner**.

## Read more

- [Viber Templates Management guide](/connect/docs/viber-templates-management)
- [Get Viber templates — API reference](/connect/reference/get-viber-templates)
- [Delete Viber template — API reference](/connect/reference/delete-viber-template)
