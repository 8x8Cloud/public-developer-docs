---
date: 2026-10-16
products: ["Connect"]
channel: "WhatsApp"
changeType: Changed
title: "Button replies in the inbound Messaging Apps webhook clarified"
---

The [inbound Messaging Apps webhook](/connect/docs/inbound-chatapps-message) page now explains how to tell which WhatsApp button a customer tapped, with sample payloads for both kinds of button.

- **Reply buttons on interactive messages:** the `id` you set on each button (`action.buttons[].reply.id`) comes back in `content.interactive.button_reply.id`.
- **Quick-reply buttons on template messages:** the message arrives with type `Buttons`. The `payload` parameter you set for that button when sending the template comes back in `content.payload`, and the button label is in `content.text`.
- **`replyToUmid`** is the UMID of the message you sent that the customer replied to. It was previously described as referring to an earlier inbound message. Use it to link a button tap back to the original send or campaign.

No webhook fields changed. This is a documentation correction only.
