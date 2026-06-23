# Line

> 👍 **Please see [Messaging API](/connect/reference/send-message) for the full API reference.**

## Getting Started

To start sending and receiving messages on LINE, you need a **LINE Official Account** with the **Messaging API** enabled.

### Prerequisites

- An **8x8 Connect account** with Messaging Apps enabled. [Sign up here](https://connect.8x8.com) if you haven't already.
- A **LINE Official Account** — create one at the [LINE Official Account Manager](https://manager.line.biz/).
- Access to the **LINE Developers Console** at [developers.line.biz](https://developers.line.biz/).

### Channel Setup

1. In the [LINE Official Account Manager](https://manager.line.biz/), go to **Settings** > **Messaging API** and enable it.
2. In the [LINE Developers Console](https://developers.line.biz/), navigate to your Messaging API Channel and retrieve your:
   - **Channel ID** — a unique identifier for your LINE channel
   - **Channel Secret** — a secret key used to generate access tokens
3. Provide the **Channel ID** and **Channel Secret** to 8x8 — contact your account manager or [cpaas-support@8x8.com](mailto:cpaas-support@8x8.com) to configure the LINE channel on your sub-account.

### Webhook Configuration

To receive inbound messages from LINE users:

1. In the [LINE Developers Console](https://developers.line.biz/), go to your Messaging API Channel
2. Under **Webhook settings**, set the **Webhook URL** to the URL provided by 8x8
3. Enable **Use webhook**

> 📘 **Contact [cpaas-support@8x8.com](mailto:cpaas-support@8x8.com) to obtain the correct webhook URL for your account.**

---

## Sending a Text Message

```json
{
    "user": {
        "lineUserId": "Ua12b345678c1de0fg1a1234567891011"
    },
    "type": "Text",
    "content": {
        "text": "Hello from 8x8 Messaging API"
    }
}
```

---

## Sending an Image Message

```json
{
    "user": {
        "lineUserId": "Ua12b345678c1de0fg1a1234567891011"
    },
    "type": "Image",
    "content": {
        "url": "https://samplelib.com/png/sample-boat-400x300.png",
        "image": {
            "thumbnail": "https://samplelib.com/jpeg/sample-clouds-400x300.jpg"
        }
    }
}
```

| Field | Description |
| :---- | :---------- |
| `content.url` | URL of the full-size image |
| `content.image.thumbnail` | URL of the thumbnail preview image |

---

## Sending a Video Message

```json
{
    "user": {
        "lineUserId": "Ua12b345678c1de0fg1a1234567891011"
    },
    "type": "Video",
    "content": {
        "url": "https://samplelib.com/mp4/sample-5s.mp4",
        "video": {
            "thumbnail": "https://samplelib.com/png/sample-boat-400x300.png"
        }
    }
}
```

| Field | Description |
| :---- | :---------- |
| `content.url` | URL of the video file |
| `content.video.thumbnail` | URL of the thumbnail preview image |

---

## Sending an Audio Message

```json
{
    "user": {
        "lineUserId": "Ua12b345678c1de0fg1a1234567891011"
    },
    "type": "Audio",
    "content": {
        "url": "https://samplelib.com/mp3/sample-speech-5m.mp3",
        "audio": {
            "duration": 300
        }
    }
}
```

| Field | Description |
| :---- | :---------- |
| `content.url` | URL of the audio file |
| `content.audio.duration` | Duration of the audio in seconds (required) |

---

## Sending a Location Message

```json
{
    "user": {
        "lineUserId": "Ua12b345678c1de0fg1a1234567891011"
    },
    "type": "Location",
    "content": {
        "location": {
            "latitude": 1.285651,
            "longitude": 103.847564,
            "name": "8x8 Office Singapore",
            "address": "One George Street, Singapore 049145"
        }
    }
}
```

| Field | Description |
| :---- | :---------- |
| `content.location.latitude` | Latitude of the location |
| `content.location.longitude` | Longitude of the location |
| `content.location.name` | Name or title of the location |
| `content.location.address` | Street address of the location |

---

## Receiving Inbound Messages

When a LINE user sends a message to your LINE Official Account, 8x8 forwards it to your configured webhook URL.

> 📘 You can configure your callback using the [Webhook Configuration API](/connect/reference/webhooks-configuration-api).

### Inbound Webhook Format

| Field | Type | Description |
| :---- | :--- | :---------- |
| `eventType` | string | Always `inboundMessage` for inbound messages |
| `channel` | string | Always `line` for Line messages |
| `user.channelUserId` | string | The LINE user ID of the sender |
| `umid` | uuid | Unique message ID for the inbound message |
| `subAccountId` | string | ID of the sub-account receiving the message |
| `timestamp` | string | UTC date and time in ISO 8601 format |
| `type` | string | Message type: `Text`, `Image`, `Video`, `Audio`, `File`, or `Location` |
| `content` | object | Message content (varies by type) |
| `version` | integer | Webhook format version |
| `recipient.recipientId` | string | ID of the LINE channel that received the message |

### Inbound Text Message

```json
{
    "eventType": "inboundMessage",
    "channel": "line",
    "user": {
        "channelUserId": "Ua12b345678c1de0fg1a1234567891011"
    },
    "umid": "9e09ac86-bd74-5465-851d-1eb5a5fdbb9a",
    "subAccountId": "yourSubAccountId",
    "timestamp": "2026-06-18T05:15:30.00Z",
    "type": "Text",
    "content": {
        "text": "Hello from LINE"
    },
    "version": 1,
    "recipient": {
        "recipientId": "7ee31a3f-9ed7-49f6-800f-a697e687553f"
    }
}
```

### Inbound Image Message

```json
{
    "eventType": "inboundMessage",
    "channel": "line",
    "user": {
        "channelUserId": "Ua12b345678c1de0fg1a1234567891011"
    },
    "umid": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "subAccountId": "yourSubAccountId",
    "timestamp": "2026-06-18T05:16:10.00Z",
    "type": "Image",
    "content": {
        "url": "https://s3.ap-southeast-1.amazonaws.com/wavecell.chatapps/20260618/18289/a1b2c3d4-e5f6-7890-abcd-ef1234567890.jpg?X-Amz-Expires=86400&..."
    },
    "version": 1,
    "recipient": {
        "recipientId": "7ee31a3f-9ed7-49f6-800f-a697e687553f"
    }
}
```

> 📘 Media URLs (image, video, audio, file) are pre-signed S3 URLs that expire after 24 hours.

### Inbound Video Message

```json
{
    "eventType": "inboundMessage",
    "channel": "line",
    "user": {
        "channelUserId": "Ua12b345678c1de0fg1a1234567891011"
    },
    "umid": "e7dc3fb1-d2e5-404c-927c-b46d0056fa6e",
    "subAccountId": "yourSubAccountId",
    "timestamp": "2026-06-18T05:16:40.63Z",
    "type": "Video",
    "content": {
        "url": "https://s3.ap-southeast-1.amazonaws.com/wavecell.chatapps/20260618/18289/e7dc3fb1-d2e5-404c-927c-b46d0056fa6e.mp4?X-Amz-Expires=86400&..."
    },
    "version": 1,
    "recipient": {
        "recipientId": "7ee31a3f-9ed7-49f6-800f-a697e687553f"
    }
}
```

### Inbound Audio Message

```json
{
    "eventType": "inboundMessage",
    "channel": "line",
    "user": {
        "channelUserId": "Ua12b345678c1de0fg1a1234567891011"
    },
    "umid": "b2c3d4e5-f6a7-8901-bcde-f12345678901",
    "subAccountId": "yourSubAccountId",
    "timestamp": "2026-06-18T05:17:10.00Z",
    "type": "Audio",
    "content": {
        "url": "https://s3.ap-southeast-1.amazonaws.com/wavecell.chatapps/20260618/18289/b2c3d4e5-f6a7-8901-bcde-f12345678901.m4a?X-Amz-Expires=86400&..."
    },
    "version": 1,
    "recipient": {
        "recipientId": "7ee31a3f-9ed7-49f6-800f-a697e687553f"
    }
}
```

### Inbound File Message

```json
{
    "eventType": "inboundMessage",
    "channel": "line",
    "user": {
        "channelUserId": "Ua12b345678c1de0fg1a1234567891011"
    },
    "umid": "c3d4e5f6-a7b8-9012-cdef-123456789012",
    "subAccountId": "yourSubAccountId",
    "timestamp": "2026-06-18T05:17:30.00Z",
    "type": "File",
    "content": {
        "url": "https://s3.ap-southeast-1.amazonaws.com/wavecell.chatapps/20260618/18289/c3d4e5f6-a7b8-9012-cdef-123456789012.jpg?X-Amz-Expires=86400&..."
    },
    "version": 1,
    "recipient": {
        "recipientId": "7ee31a3f-9ed7-49f6-800f-a697e687553f"
    }
}
```

### Inbound Location Message

```json
{
    "eventType": "inboundMessage",
    "channel": "line",
    "user": {
        "channelUserId": "Ua12b345678c1de0fg1a1234567891011"
    },
    "umid": "46d27247-ecda-4bdd-8b17-b46d00575299",
    "subAccountId": "yourSubAccountId",
    "timestamp": "2026-06-18T05:17:55.35Z",
    "type": "Location",
    "content": {
        "location": {
            "longitude": 103.846375,
            "latitude": 1.289563,
            "name": "Clarke Quay Riverside",
            "address": "Clarke Quay, 179019"
        }
    },
    "version": 1,
    "recipient": {
        "recipientId": "7ee31a3f-9ed7-49f6-800f-a697e687553f"
    }
}
```
