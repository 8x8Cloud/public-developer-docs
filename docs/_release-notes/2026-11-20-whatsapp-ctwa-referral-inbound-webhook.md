---
date: 2026-11-20
products: ["Connect"]
channel: "WhatsApp"
changeType: Added
title: "Click-to-WhatsApp ad details in the inbound Messaging Apps webhook"
---

The [inbound Messaging Apps webhook](/connect/docs/inbound-chatapps-message) now tells you when a WhatsApp conversation started from a Click-to-WhatsApp ad or a Facebook or Instagram post.

The message a user sends right after tapping the ad includes a new optional `referral` object with the details WhatsApp sends about the ad: `sourceType`, `sourceId`, `sourceUrl`, `headline`, `body`, `mediaType`, `imageUrl`, `videoUrl`, `thumbnailUrl`, `ctwaClid` and `welcomeMessage`. Store it when it arrives if you want to tag the whole conversation as an ad lead or attribute it to a campaign.

The field is available in webhook formats v2 and v3. Messages that do not come from an ad are unchanged: the `referral` key is left out.
