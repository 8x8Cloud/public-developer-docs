---
sidebar_label: 'Vertical Playbooks'
---

# Vertical Playbooks

These vertical playbooks provide deep, practical examples of how the 8x8 WhatsApp solution can be applied to solve specific industry challenges. Each playbook includes a common scenario, a high-level flow, and the complete, end-to-end JSON payloads required to build it, from template creation to the final automated reply.

## Retail & eCommerce

**Value:** Drive sales, reduce cart abandonment, and provide instant post-purchase support.

#### Scenario: Abandoned Cart Recovery

**Flow:** A `MARKETING` carousel template is sent 2 hours after a customer abandons their cart. If they reply, an automation sends them a direct link to their saved cart.

**Tools Used:** **API** (or **Automation Builder** with HTTP Trigger)

#### 1. Step 1: Create the Carousel Template

First, create a `MARKETING` template with a carousel to showcase the items left in the cart.

<details> <summary>Click to view `Template Creation Payload` (API Request)</summary>

`POST https://chatapps.8x8.com/api/v1/accounts/{accountId}/channels/{channelId}/templates`

```json
{
    "language": "en_US",
    "name": "retail_abandoned_cart_v1",
    "category": "MARKETING",
    "components": [
        {
            "type": "BODY",
            "text": "Hi {{1}}, you left some items in your cart! Are you ready to complete your purchase?",
            "examples": ["Alex"]
        },
        {
            "type": "CAROUSEL",
            "cards": [
                {
                    "components": [
                        {
                            "type": "HEADER",
                            "format": "IMAGE",
                            "examples": ["https://.../product_A.png"]
                        },
                        {
                            "type": "BODY",
                            "text": "Item 1: Running Shoes"
                        },
                        {
                            "type": "BUTTONS",
                            "buttons": [
                                {
                                    "type": "quick_reply",
                                    "text": "Complete My Order"
                                }
                            ]
                        }
                    ]
                },
                {
                    "components": [
                        {
                            "type": "HEADER",
                            "format": "IMAGE",
                            "examples": ["https://.../product_B.png"]
                        },
                        {
                            "type": "BODY",
                            "text": "Item 2: Sports Jacket"
                        },
                        {
                            "type": "BUTTONS",
                            "buttons": [
                                {
                                    "type": "quick_reply",
                                    "text": "Complete My Order"
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    ]
}
```

</details>

#### 2. Step 2: Send the Template

Your e-commerce platform's automation triggers this API call when a cart is abandoned for 2 hours.

<details> <summary>Click to view `Template Sending Payload` (API Request)</summary>

`POST https://chatapps.8x8.com/api/v1/subaccounts/{subAccountId}/messages`

```json
{
    "user": {
        "msisdn": "+15551234567"
    },
    "type": "template",
    "content": {
        "template": {
            "language": "en_US",
            "name": "retail_abandoned_cart_v1",
            "components": [
                {
                    "type": "body",
                    "parameters": [ { "type": "text", "text": "Alex" } ]
                },
                {
                    "type": "carousel",
                    "cards": [
                        {
                            "cardIndex": 0,
                            "components": [
                                {
                                    "type": "header",
                                    "parameters": [
                                        {
                                            "type": "image",
                                            "url": "https://.../item_1_live.png"
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            "cardIndex": 1,
                            "components": [
                                {
                                    "type": "header",
                                    "parameters": [
                                        {
                                            "type": "image",
                                            "url": "https://.../item_2_live.png"
                                        }
                                    ]
                                }
                            ]
                        }
                    ]
                }
            ]
        }
    }
}
```

</details>

#### 3. Step 3: Handle the Reply

The customer clicks "Complete My Order." An **Automation Builder** workflow (or your webhook) receives this reply, opening the 24-hour service window.

<details> <summary>Click to view `Inbound Webhook Payload` (User taps button)</summary>
```json
{
  "namespace": "ChatApps",
  "eventType": "inbound_message_received",
  "payload": {
    ...
    "type": "Text",
    "content": {
      "text": "Complete My Order"
    }
  }
}
```

</details>

#### 4. Step 4: Send the Checkout Link

The automation replies with an **Interactive Button Message** containing the dynamic checkout link.

<details> <summary>Click to view `Automated Response Payload` (Interactive CTA Button)</summary>
```json
{
    "user": {
        "msisdn": "+15551234567"
    },
    "type": "interactive",
    "content": {
        "interactive": {
            "type": "cta_url",
            "body": {
                "text": "Great! Your cart is saved. Click here to check out."
            },
            "action": {
                "parameters": {
                    "display_text": "Go to Checkout",
                    "url": "[https://your-store.com/checkout/cart/a1b2c3d4e5](https://your-store.com/checkout/cart/a1b2c3d4e5)"
                }
            }
        }
    }
}
```

</details>

## Financial Services / Fintech

**Value:** Securely authenticate users, provide real-time fraud alerts, and deliver account updates.

#### Scenario: Transaction One-Time Passcode (OTP)

**Flow:** A user attempts a high-value transaction. Your system calls the 8x8 API to send an `AUTHENTICATION` template with a "Copy Code" button for a seamless user experience.

**Tools Used:** **API**

#### 1. Step 1: Create the Authentication Template

This template uses the special `COPY_CODE` button.

<details> <summary>Click to view `Template Creation Payload` (API Request)</summary>

`POST https://chatapps.8x8.com/api/v1/accounts/{accountId}/channels/{channelId}/templates`

```json
{
    "language": "en_US",
    "name": "finance_otp_v3",
    "category": "AUTHENTICATION",
    "components": [
        {
            "type": "BODY",
            "text": "Your one-time passcode for your transaction is {{1}}.",
            "examples": [
                "123456"
            ]
        },
        {
            "type": "FOOTER",
            "text": "This code expires in 5 minutes. Do not share it with anyone."
        },
        {
            "type": "BUTTONS",
            "buttons": [
                {
                    "type": "COPY_CODE",
                    "examples": [
                        "123456"
                    ]
                }
            ]
        }
    ]
}
```

</details>

#### 2. Step 2: Send the OTP Message

When the transaction is initiated, your server generates a code and sends this API request.

<details> <summary>Click to view `Template Sending Payload` (API Request)</summary>

`POST https://chatapps.8x8.com/api/v1/subaccounts/{subAccountId}/messages`

```json
{
    "user": {
        "msisdn": "+15552223333"
    },
    "type": "template",
    "content": {
        "template": {
            "language": "en_US",
            "name": "finance_otp_v3",
            "components": [
                {
                    "type": "body",
                    "parameters": [
                        {
                            "type": "text",
                            "text": "852913"
                        }
                    ]
                },
                {
                    "type": "button",
                    "index": "0",
    
                    "subType": "copyCode",
                    "parameters": [
                        {
                            "type": "couponCode",
                            "couponCode": "852913"
                        }
                    ]
                }
            ]
        }
    }
}
```

</details>

## Logistics & Delivery

**Value:** Automate delivery notifications, provide proof of delivery, and manage rescheduling requests.

#### Scenario: Failed Delivery & Rescheduling

**Flow:** A driver marks a delivery as "failed." An automated `UTILITY` template is sent with a `DOCUMENT` header (the "missed delivery" note) and quick reply options to reschedule.

**Tools Used:** **API** + **[8x8 Automation Builder](/connect/docs/automation-builder)**

#### 1. Step 1: Create the Failed Delivery Template

<details> <summary>Click to view `Template Creation Payload` (API Request)</summary>

`POST https://chatapps.8x8.com/api/v1/accounts/{accountId}/channels/{channelId}/templates`

```json
{
    "language": "en_US",
    "name": "delivery_failed_v1",
    "category": "UTILITY",
    "components": [
        {
            "type": "HEADER",
            "format": "DOCUMENT",
            "examples": [
                "https://.../delivery_note.pdf"
            ]
        },
        {
            "type": "BODY",
            "text": "Hi {{1}}, we're sorry we missed you for your delivery (Order #{{2}}). We've attached the delivery note. What would you like to do?",
            "examples": [
                "Carlos",
                "774-ABC"
            ]
        },
        {
            "type": "BUTTONS",
            "buttons": [
                {
                    "type": "quick_reply",
                    "text": "Reschedule"
                },
                {
                    "type": "quick_reply",
                    "text": "Change Address"
                },
                {
                    "type": "quick_reply",
                    "text": "Contact Support"
                }
            ]
        }
    ]
}
```

</details>

#### 2. Step 2: Send the Notification

The driver's app calls an API endpoint that triggers this message.

<details> <summary>Click to view `Template Sending Payload` (API Request)</summary>

`POST https://chatapps.8x8.com/api/v1/subaccounts/{subAccountId}/messages`

```json
{
    "user": {
        "msisdn": "+15554445555"
    },
    "type": "template",
    "content": {
        "template": {
            "language": "en_US",
            "name": "delivery_failed_v1",
            "components": [
                {
                    "type": "header",
                    "parameters": [
                        {
                            "type": "document",
                            "url": "https://.../live-delivery-note-774-ABC.pdf"
                        }
                    ]
                },
                {
                    "type": "body",
                    "parameters": [
                        {
                            "type": "text",
                            "text": "Carlos"
                        },
                        {
                            "type": "text",
                            "text": "774-ABC"
                        }
                    ]
                }
            ]
        }
    }
}
```

</details>

#### 3. Step 3: Handle the "Reschedule" Reply

The customer taps "Reschedule." An **Automation Builder** workflow receives this reply.

<details> <summary>Click to view `Inbound Webhook Payload` (User taps button)</summary>
```json
{
  "namespace": "ChatApps",
  "eventType": "inbound_message_received",
  "payload": {
    ...
    "type": "Text",
    "content": {
      "text": "Reschedule"
    }
  }
}
```

</details>

#### 4. Step 4: Offer New Time Slots

The automation replies with an **Interactive List Message** showing the next available slots.

<details> <summary>Click to view `Automated Response Payload` (Interactive List)</summary>
```json
{
    "user": {
        "msisdn": "+15554445555"
    },
    "type": "interactive",
    "content": {
        "interactive": {
            "type": "list",
            "header": { "type": "text", "text": "Reschedule Delivery" },
            "body": { "text": "Please select a new time slot for order #774-ABC." },
            "action": {
                "button": "Select Slot",
                "sections": [
                    {
                        "title": "Available Times",
                        "rows": [
                            {
                                "id": "slot_1",
                                "title": "Tomorrow (Nov 7)",
                                "description": "10:00 AM - 12:00 PM"
                            },
                            {
                                "id": "slot_2",
                                "title": "Tomorrow (Nov 7)",
                                "description": "2:00 PM - 4:00 PM"
                            },
                            {
                                "id": "slot_3",
                                "title": "Day After (Nov 8)",
                                "description": "10:00 AM - 12:00 PM"
                            }
                        ]
                    }
                ]
            }
        }
    }
}
```

</details>

## Healthcare & Clinics

**Value:** Securely remind patients of appointments, send pre-visit instructions, and manage confirmations.

#### Scenario: Appointment Reminder with Location

**Flow:** Send a `UTILITY` template 48 hours before an appointment that includes the clinic's location as a `LOCATION` header.

**Tools Used:** **API** or **Campaigns**

#### 1. Step 1: Create the Reminder Template

This template uses the `LOCATION` header type.

<details> <summary>Click to view `Template Creation Payload` (API Request)</summary>

`POST https://chatapps.8x8.com/api/v1/accounts/{accountId}/channels/{channelId}/templates`

```json
{
    "language": "en_US",
    "name": "clinic_reminder_v1",
    "category": "UTILITY",
    "components": [
        {
            "type": "HEADER",
            "format": "LOCATION"
        },
        {
            "type": "BODY",
            "text": "Hi {{1}}, this is a reminder of your appointment with {{2}} on {{3}} at {{4}}.",
            "examples": [
                "Lee",
                "Dr. Smith",
                "Nov 10, 2025",
                "3:00 PM"
            ]
        },
        {
            "type": "FOOTER",
            "text": "Please reply to confirm or call to reschedule."
        }
    ]
}
```

</details>

#### 2. Step 2: Send the Reminder

Your scheduling system triggers this API call 48 hours before the appointment.

<details> <summary>Click to view `Template Sending Payload` (API Request)</summary>

`POST https://chatapps.8x8.com/api/v1/subaccounts/{subAccountId}/messages`

```json
{
    "user": {
        "msisdn": "+15556667777"
    },
    "type": "template",
    "content": {
        "template": {
            "language": "en_US",
            "name": "clinic_reminder_v1",
            "components": [
                {
                    "type": "header",
                    "parameters": [
                        {
                            "type": "location",
                            "location": {
                                "latitude": "1.2857",
                                "longitude": "103.8479",
                                "name": "Downtown Medical Clinic",
                                "address": "123 Health St, Medical Tower, #05-01"
                            }
                        }
                    ]
                },
                {
                    "type": "body",
                    "parameters": [
                        { "type": "text", "text": "Lee" },
                        { "type": "text", "text": "Dr. Smith" },
                        { "type": "text", "text": "Nov 10, 2025" },
                        { "type": "text", "text": "3:00 PM" }
                    ]
                }
            ]
        }
    }
}
```

</details>

## Education & Training

**Value:** Engage new students, send course materials, and provide event reminders.

#### Scenario: New Student Welcome & Orientation

**Flow:** A `UTILITY` template is sent upon enrollment, featuring a `VIDEO` header (a welcome message from the director) and a `URL` button linking to the new student portal.

**Tools Used:** **API** or **Campaigns**

#### 1. Step 1: Create the Welcome Template

<details> <summary>Click to view `Template Creation Payload` (API Request)</summary>

`POST https://chatapps.8x8.com/api/v1/accounts/{accountId}/channels/{channelId}/templates`

```json
{
    "language": "en_US",
    "name": "student_welcome_v1",
    "category": "UTILITY",
    "components": [
        {
            "type": "HEADER",
            "format": "VIDEO",
            "examples": [
                "https://.../welcome_video.mp4"
            ]
        },
        {
            "type": "BODY",
            "text": "Welcome to the university, {{1}}! We're thrilled to have you. Your student ID is {{2}}. Get started by visiting your student portal.",
            "examples": [
                "Sam",
                "S98765A"
            ]
        },
        {
            "type": "BUTTONS",
            "buttons": [
                {
                    "type": "URL",
                    "text": "Go to Student Portal",
                    "url": "[https://portal.university.edu/login/](https://portal.university.edu/login/){{1}}",
                    "examples": [
                        "S98765A"
                    ]
                }
            ]
        }
    ]
}
```

</details>

#### 2. Step 2: Send the Welcome Message

Your Student Information System (SIS) triggers this API call upon successful enrollment.

<details> <summary>Click to view `Template Sending Payload` (API Request)</summary>

`POST https://chatapps.8x8.com/api/v1/subaccounts/{subAccountId}/messages`

```json
{
    "user": {
        "msisdn": "+15558889999"
    },
    "type": "template",
    "content": {
        "template": {
            "language": "en_US",
            "name": "student_welcome_v1",
            "components": [
                {
                    "type": "header",
                    "parameters": [
                        {
                            "type": "video",
                            "url": "https://.../live_welcome_video.mp4"
                        }
                    ]
                },
                {
                    "type": "body",
                    "parameters": [
                        { "type": "text", "text": "Sam" },
                        { "type": "text", "text": "S98765A" }
                    ]
                },
                {
                    "type": "button",
                    "index": "0",
                    "subType": "url",
                    "parameters": [
                        {
                            "type": "text",
                            "text": "S98765A"
                        }
                    ]
                }
            ]
        }
    }
}
```

</details>
