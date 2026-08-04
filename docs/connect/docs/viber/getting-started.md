---
slug: /connect/docs/viber/getting-started
sidebar_label: 'Getting Started'
---

# Getting Started

Once your Viber channel is provisioned, sending your first message takes an API key and one API call. This page covers authentication, the base URL for your platform region, and two working requests: a free-form text message and a template message.

---

## Prerequisites

Viber is not self-serve. Confirm each of the following is in place before you send.

| Requirement | How to get it |
| :--- | :--- |
| 8x8 Connect account | Sign up at [connect.8x8.com](https://connect.8x8.com) |
| Messaging subaccount | Requested through your account manager. It must be a dedicated messaging subaccount, not an existing SMS subaccount |
| Viber channel | Provisioned by 8x8 against a Viber Service ID once Viber approves your business sender. See [Account Onboarding](/connect/docs/viber/account-onboarding) for what to submit |
| API key | Generated in the Customer Portal at [connect.8x8.com](https://connect.8x8.com) |
| SMS fallback | Optional. Configured by 8x8 as part of channel setup, including channel order and retry timing. Contact your account manager to enable it |

> 📘
>
> Already sending WhatsApp or RCS through the Messaging Apps API? The request envelope is identical here, only the `content` shape differs for Viber. Skip to [Send Your First Message](#send-your-first-message).

---

## Authentication

The Messaging Apps API uses ApiKey Bearer Token authentication. Include your key on every request:

```http
Authorization: Bearer {apiKey}
```

Generate and rotate keys in the Customer Portal.

---

## Base URLs

Use the base URL matching the platform deployment region your account is provisioned in. Sending to the wrong region fails authentication.

| Platform region | Base URL |
| :--- | :--- |
| Asia (default) | `https://chatapps.8x8.com` |
| Europe | `https://chatapps.8x8.uk` |
| North America | `https://chatapps.us.8x8.com` |
| Indonesia | `https://chatapps.8x8.id` |

For more detail, see [Platform Deployment Regions](/connect/docs/platform-deployment-regions#api-endpoints-and-platform-region).

---

## Send Your First Message

Send a free-form text message by posting to the messages endpoint for your subaccount:

```bash
curl -X POST "https://chatapps.8x8.com/api/v1/subaccounts/{subAccountId}/messages" \
  -H "Authorization: Bearer {apiKey}" \
  -H "Content-Type: application/json" \
  -d '{
    "user": {
      "msisdn": "+6512345678"
    },
    "type": "text",
    "content": {
      "text": "Here is your booking reference: ABC1234."
    }
  }'
```

Replace `{subAccountId}` with your messaging subaccount and `{apiKey}` with your key.

> 📘
>
> This free-form path is valid for promotional content. Transactional and OTP messages must use a registered template. See [Viber Templates](/connect/docs/viber/templates).

---

## Send a Template Message

Transactional and OTP content must go through a registered template instead of free-form text. This example sends a one-time password using an approved `otp_login_en` template, with SMS fallback if the Viber send fails:

```bash
curl -X POST "https://chatapps.8x8.com/api/v1/subaccounts/{subAccountId}/messages" \
  -H "Authorization: Bearer {apiKey}" \
  -H "Content-Type: application/json" \
  -d '{
    "user": {
      "msisdn": "+6512345678"
    },
    "type": "template",
    "content": {
      "template": {
        "name": "otp_login_en",
        "language": "en",
        "components": [
          {
            "type": "body",
            "parameters": [
              { "type": "text", "name": "pin", "text": "1234" }
            ]
          }
        ]
      },
      "fallbackText": "Your code is 1234. Team 8x8",
      "sms": {
        "source": "8x8"
      }
    },
    "channels": [
      { "channel": "Viber", "channelId": "{viberChannelId}" }
    ]
  }'
```

Replace `{subAccountId}`, `{apiKey}`, and `{viberChannelId}` with your own values, and `otp_login_en` with the name of a template you registered on this channel.

> 🚧
>
> Template send is rolling out and may not yet be available on your account. Contact your account manager to confirm availability. Before you send, confirm the template's status is `Approved`: a `Pending` or `Declined` template fails validation before 8x8 forwards the request to Viber. See [Viber Templates](/connect/docs/viber/templates).

---

## Where to Go Next

| If you want to | Read |
| :--- | :--- |
| See all promotional message formats with screenshots and payloads | [Promotional Message API Library](/connect/docs/viber/message-types) |
| Send transactional or OTP traffic | [Transactional Message API Library](/connect/docs/viber/templates) |
| Receive replies and delivery receipts | [Webhooks and Delivery Receipts](/connect/docs/viber/webhooks-delivery-receipts) |
| Understand how traffic is rated | [Billing](/connect/docs/viber/billing) |
| Revisit the business case and full page map | [Viber Hub](/connect/docs/viber/viber-hub) |
