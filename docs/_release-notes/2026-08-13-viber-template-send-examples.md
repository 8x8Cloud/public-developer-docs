---
date: 2026-08-13
products: ["Connect", "APIs"]
channel: "Viber"
changeType: Added
title: "Viber template send examples in the Send message reference"
---

The **Send message** API reference now includes worked request examples for sending Viber template messages, covering both template categories: transactional templates and OTP templates.

## Transactional template example

```json
{
  "user": { "msisdn": "+6500000" },
  "type": "template",
  "content": {
    "template": {
      "name": "<Insert Template Name>",
      "language": "en",
      "components": [
        {
          "type": "body",
          "parameters": [
            { "type": "text", "name": "name", "text": "Ana" },
            { "type": "text", "name": "orderId", "text": "10293847" },
            { "type": "text", "name": "date", "text": "15 Aug 2026" }
          ]
        }
      ]
    }
  }
}
```

## OTP template example

```json
{
  "user": { "msisdn": "+6500000" },
  "type": "template",
  "content": {
    "template": {
      "name": "<Insert Template Name>",
      "language": "en",
      "components": [
        {
          "type": "body",
          "parameters": [
            { "type": "text", "name": "pin", "text": "1234" }
          ]
        }
      ]
    }
  }
}
```

Both examples are available directly in the request body examples dropdown on the Send message endpoint.

## Read more

- [Send message — API reference](/connect/reference/send-message)
- [Viber Templates Management](/connect/docs/viber-templates-management)
