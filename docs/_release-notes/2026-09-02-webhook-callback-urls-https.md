---
date: 2026-09-02
products: ["Connect", "APIs"]
changeType: Changed
title: "Webhook and callback URL sample values updated to HTTPS"
---

Sample URL values across the SMS and Business Messaging (Chat Apps) API documentation — webhook configuration, `dlrCallbackUrl`, delivery-receipt callback overrides, and rich-content URL fields — now use `https://example.com` instead of `http://example.com`, so the examples no longer read as an endorsement of plain HTTP for callback URLs.

The OAuth token endpoint description on the webhook configuration endpoints has also been clarified: the token endpoint URL **must use the `https` scheme**; `http` URLs are rejected.

## Read more

- [Create or Replace webhooks (Business Messaging)](/connect/reference/add-webhooks-1)
- [Create or Replace webhooks (SMS)](/connect/reference/add-webhooks-2)
