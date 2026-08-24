---
date: 2026-08-04
products: ["Connect"]
channel: "WhatsApp"
changeType: Added
title: "templateId in Direct Send delivery receipts"
---

WhatsApp delivery receipts now include a **`templateId`** field for messages sent via the WhatsApp Direct Send API, so you can correlate a receipt back to the exact template that was delivered.

`templateId` (string) is the template ID WhatsApp used to deliver the message. It appears inside the `whatsapp` object of the delivery receipt and is **only present for messages sent through the Direct Send API**:

```json
"whatsapp": {
  "pricingCategory": "marketing",
  "templateId": "1281032340757288"
}
```

The field is documented in the WhatsApp object table alongside `providerErrorCode` and `pricingCategory`, and shown in the delivery-receipt examples (template with image header and buttons, interactive list message, and so on).

See [Delivery receipts for outbound Chat Apps](/connect/docs/delivery-receipts-for-outbound-chatapps).
