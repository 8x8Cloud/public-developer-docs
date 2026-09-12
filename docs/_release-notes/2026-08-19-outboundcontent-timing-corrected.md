---
date: 2026-08-19
products: ["Connect", "APIs"]
changeType: Fixed
title: "outboundContent timing corrected on WhatsApp delivery receipts"
---

The [Delivery receipts for Outbound Messaging Apps](/connect/docs/delivery-receipts-for-outbound-chatapps) guide previously stated that the `outboundContent` object is attached to the receipt confirming delivery to the recipient (`delivered_to_recipient`). That was inaccurate.

`outboundContent` is **WhatsApp only**, and it is attached to the **first receipt for the message**, when `status.state` is `queued`. It is omitted from all subsequent receipts — `delivered_to_operator`, `delivered_to_recipient`, `read`, and so on. When the content cannot be reconstructed it is left out entirely.

No API behavior changed — this is a documentation accuracy fix. If you were previously looking for `outboundContent` on the delivered receipt, update your integration to read it from the `queued` receipt instead.

## Read more

- [Delivery receipts for Outbound Messaging Apps](/connect/docs/delivery-receipts-for-outbound-chatapps)
