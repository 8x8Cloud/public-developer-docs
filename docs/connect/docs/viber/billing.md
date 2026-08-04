---
slug: /connect/docs/viber/billing
sidebar_label: 'Billing'
---

# Billing

[Concepts & Fundamentals](/connect/docs/viber/concepts-fundamentals#message-categories) introduces Promotional, Transactional, and OTP as the three message categories that determine whether you need a template. Billing uses a related but distinct set of categories: Transactional, Promotional, and Session. OTP shares the Transactional rate, and an open session overrides whatever category the content would otherwise carry. This page covers how 8x8 arrives at that rating, what changed when Viber's template mandate took effect, and how session messaging and SMS fallback affect what you are charged.

> 📘
>
> This page explains the rating model, not the prices. Rates are set per country and by domestic versus international routing. For your account's actual rates, see your rate card or contact your account manager.

---

## Rating Categories

Every Viber message you send is rated as one of these three categories.

| Category | Applies to |
| :--- | :--- |
| **Transactional** | Template messages (Transactional or OTP), and free-form file messages |
| **Promotional** | Free-form text, image, video, or button content, sent with no open session |
| **Session** | The first outbound message inside an open 24 hour session window |

Template-based Transactional and OTP messages share the same rate. Inbound messages from customers carry no Viber message fee.

---

## How a Message Is Rated

| What you send | Session open | Rated as |
| :--- | :--- | :--- |
| Template message (Transactional or OTP) | No | Transactional |
| Free-form text, no template | No | Promotional |
| Free-form file | No | Transactional |
| Free-form image, video, or button | No | Promotional |
| Any outbound message, first in the window | Yes | Session, charged once |
| Any outbound message, later in the window | Yes | Session, no additional charge |

Template sends are rated identically whether they target the recipient's primary device only or all their devices.

> 🚧
>
> Free-form file breaks the pattern above: it is rated as Transactional even without a template, unlike free-form text. See [How 8x8 Classifies Viber Traffic](#how-8x8-classifies-viber-traffic) below for why.

---

## How 8x8 Classifies Viber Traffic

Internally, 8x8's platform tags every Viber message you send with a Content Type, based on the message format and whether a session is open. That Content Type is what determines the rating category above. You do not set it directly, but it is useful for reconciling usage data against what you sent.

| Content type | Billing category | Applies to |
| :--- | :--- | :--- |
| `OUT-TXT` | `ViberTransactional` | Text and file messages |
| `OUT-MEDIA` | `ViberPromotional` | Image, button, and video messages |
| `VBS-SES` | `ViberSession` | Any content sent inside an active session |
| `OUT-TPL` | Template messages | Template type `1701` (OTP) or `1702` (Transactional) |

### Raw Code Mapping

8x8 differentiates free-form and session Viber messages at the platform level using a raw numeric code per message type. Each code resolves to one of the Content Types above. Template messages use the separate type codes shown above, `1701` and `1702`, instead of a code from the list below.

| Raw code | Message type | Content type |
| :--- | :--- | :--- |
| `106` | `TxtOneWay` | `OUT-TXT` |
| `206` | `TxtTwoWay` | `OUT-TXT` |
| `220` | `FileTwoWay` | `OUT-TXT` |
| `222` | `FileOneWay` | `OUT-TXT` |
| `107` | `ImgOneWay` | `OUT-MEDIA` |
| `207` | `ImgTwoWay` | `OUT-MEDIA` |
| `108` | `TxtImgBtnOneWay` | `OUT-MEDIA` |
| `208` | `TxtImgBtnTwoWay` | `OUT-MEDIA` |
| `109` | `TxtBtnOneWay` | `OUT-MEDIA` |
| `209` | `TxtBtnTwoWay` | `OUT-MEDIA` |
| `230` | `VideoTwoWay` | `OUT-MEDIA` |
| `231` | `VideoTextTwoWay` | `OUT-MEDIA` |
| `233` | `VideoTextBtnTwoWay` | `OUT-MEDIA` |
| `306` | `TxtSession` | `VBS-SES` |
| `307` | `ImgSession` | `VBS-SES` |
| `221` | `FileSession` | `VBS-SES` |

- **File is billed as `OUT-TXT`, not `OUT-MEDIA`.** A free-form file message rates as text-type content, at the Transactional rate, even though it is not plain text.
- **An open session always takes priority.** Content sent inside an active session is coded `VBS-SES` regardless of its format: a text message inside a session is `VBS-SES`, not `OUT-TXT`.
- **The billing category comes from the Content Type and the session state together, not the raw code alone.** 8x8 resolves the raw code to a Content Type first, then applies session state to reach the final rating category.

> 📘
>
> This mapping is for teams reconciling usage data against 8x8's platform codes. It does not change what you send: see [How a Message Is Rated](#how-a-message-is-rated) above for the categories that matter when you are planning a message.

---

## What Changed on July 16, 2026

Viber's template mandate took effect on July 15, 2026. From July 16, free-form text is no longer rated as Transactional. It is rated as Promotional instead.

| Traffic | Before July 15, 2026 | From July 16, 2026 |
| :--- | :--- | :--- |
| Free-form text | Transactional | Promotional |
| Free-form file | Transactional | Transactional, unchanged |
| Free-form image, video, or button | Promotional | Promotional, unchanged |
| Template message | Not available | Transactional |

> 🚧
>
> If you send transactional or OTP content as free-form text, it is now rated as Promotional. Registering that content as a template restores Transactional rating. See [Viber Templates: What Changed on July 15, 2026](/connect/docs/viber/templates#what-changed-on-july-15-2026).

---

## Sessions and Cost

A session is charged once, on the first outbound message in the window. Every later outbound message in the same 24 hour window carries no additional Viber message fee, whatever its content or category.

This is what makes support conversations practical on Viber: the cost of a conversation is largely independent of how many messages it takes to resolve. See [Conversational Messaging](/connect/docs/viber/sessions) for the full session model, limits, and how to enable sessions on your channel.

---

## SMS Fallback

When a Viber send fails and your channel has SMS fallback configured, the fallback SMS is rated as SMS traffic, separately from the Viber attempt that failed.

See [Concepts & Fundamentals: SMS Fallback](/connect/docs/viber/concepts-fundamentals#sms-fallback) for how fallback is configured.

---

## Seeing How a Message Was Rated

> 🚧 **Coming soon**
>
> Delivery receipts will report the rating category and whether a specific message was billable, in a `viber` object with `pricingCategory` and `billable` fields. These fields are still in development and not yet present in delivery receipts.

See [Webhooks and Delivery Receipts: Viber-Specific Receipt Fields](/connect/docs/viber/webhooks-delivery-receipts#viber-specific-receipt-fields) for the full field reference, and [Conversational Messaging: Identifying Session Messages in Delivery Receipts](/connect/docs/viber/sessions#identifying-session-messages-in-delivery-receipts) for how `billable` behaves inside a session.

---

## Next Steps

| If you want to | Read |
| :--- | :--- |
| Review the message categories this page rates | [Concepts & Fundamentals: Message Categories](/connect/docs/viber/concepts-fundamentals#message-categories) |
| Understand session limits, economics, and how to enable sessions | [Conversational Messaging](/connect/docs/viber/sessions) |
| Move transactional or OTP content onto a template | [Viber Templates](/connect/docs/viber/templates) |
| See the receipt fields that will report rating category and billable status | [Webhooks and Delivery Receipts: Viber-Specific Receipt Fields](/connect/docs/viber/webhooks-delivery-receipts#viber-specific-receipt-fields) |
| Revisit the business case and full page map | [Viber Hub](/connect/docs/viber/viber-hub) |
