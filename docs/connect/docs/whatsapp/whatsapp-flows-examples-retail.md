---
sidebar_label: 'Retail & eCommerce'
---

# Retail & eCommerce Flow Examples

## Product Return & Exchange

![Product Return & Exchange Flow](./images/product-return-exchange.webp)

**Business Value:** Automate returns processing, reduce support tickets by 40%, capture structured data for quality insights, and improve customer satisfaction.

**Scenario:** A customer wants to return or exchange a product. Instead of calling support or filling out web forms, they complete a WhatsApp Flow that collects order details, return reason, and resolution preference. Upon submission, your system validates the order, generates a return authorization, and sends the return label.

**Tools Used:** Flow Configuration API + Messaging API + Webhook handler

---

### Step 1: Create the Flow

<details>
<summary>Click to view **Flow JSON Definition**</summary>

This Flow collects order information, return reason, and preferred resolution across 3 screens.

**Endpoint:** `POST https://chatapps.8x8.com/config/v1/channels/whatsapp/{channelId}/flows`

```json
{
  "name": "Product Return & Exchange",
  "categories": ["OTHER"],
  "flowJson": "{\"version\":\"7.2\",\"routing_model\":{\"ORDER_INFO\":[\"RETURN_DETAILS\"],\"RETURN_DETAILS\":[\"RESOLUTION\"],\"RESOLUTION\":[]},\"screens\":[{\"id\":\"ORDER_INFO\",\"title\":\"Return Request\",\"layout\":{\"type\":\"SingleColumnLayout\",\"children\":[{\"type\":\"TextHeading\",\"text\":\"Find Your Order\"},{\"type\":\"TextBody\",\"text\":\"Please enter the details exactly as they appear in your confirmation email.\"},{\"type\":\"Form\",\"name\":\"order_form\",\"children\":[{\"type\":\"TextInput\",\"name\":\"order_number\",\"label\":\"Order Number\",\"input-type\":\"text\",\"required\":true,\"helper-text\":\"Example: ORD-12345\"},{\"type\":\"TextInput\",\"name\":\"item_name\",\"label\":\"Item Name\",\"input-type\":\"text\",\"required\":true,\"helper-text\":\"Product name and size\"},{\"type\":\"TextInput\",\"name\":\"customer_email\",\"label\":\"Email Address\",\"input-type\":\"email\",\"required\":true},{\"type\":\"Footer\",\"label\":\"Continue\",\"on-click-action\":{\"name\":\"navigate\",\"next\":{\"type\":\"screen\",\"name\":\"RETURN_DETAILS\"},\"payload\":{\"order_number\":\"${form.order_number}\",\"item_name\":\"${form.item_name}\",\"customer_email\":\"${form.customer_email}\"}}}]}]}},{\"id\":\"RETURN_DETAILS\",\"title\":\"Return Reason\",\"data\":{\"order_number\":{\"type\":\"string\",\"__example__\":\"ORD-12345\"},\"item_name\":{\"type\":\"string\",\"__example__\":\"Denim Jacket\"},\"customer_email\":{\"type\":\"string\",\"__example__\":\"user@example.com\"}},\"layout\":{\"type\":\"SingleColumnLayout\",\"children\":[{\"type\":\"Form\",\"name\":\"details_form\",\"children\":[{\"type\":\"RadioButtonsGroup\",\"name\":\"return_reason\",\"label\":\"Reason for Return\",\"required\":true,\"data-source\":[{\"id\":\"wrong_size\",\"title\":\"Wrong Size\"},{\"id\":\"defective\",\"title\":\"Defective/Damaged\"},{\"id\":\"not_as_described\",\"title\":\"Not As Described\"},{\"id\":\"changed_mind\",\"title\":\"Changed My Mind\"}]},{\"type\":\"TextArea\",\"name\":\"additional_details\",\"label\":\"Additional Info\",\"required\":false,\"max-length\":500,\"helper-text\":\"Please provide more details (optional)\"},{\"type\":\"Footer\",\"label\":\"Continue\",\"on-click-action\":{\"name\":\"navigate\",\"next\":{\"type\":\"screen\",\"name\":\"RESOLUTION\"},\"payload\":{\"order_number\":\"${data.order_number}\",\"item_name\":\"${data.item_name}\",\"customer_email\":\"${data.customer_email}\",\"return_reason\":\"${form.return_reason}\",\"additional_details\":\"${form.additional_details}\"}}}]}]}},{\"id\":\"RESOLUTION\",\"title\":\"Resolution\",\"terminal\":true,\"data\":{\"order_number\":{\"type\":\"string\",\"__example__\":\"ORD-12345\"},\"item_name\":{\"type\":\"string\",\"__example__\":\"Denim Jacket\"},\"customer_email\":{\"type\":\"string\",\"__example__\":\"user@example.com\"},\"return_reason\":{\"type\":\"string\",\"__example__\":\"wrong_size\"},\"additional_details\":{\"type\":\"string\",\"__example__\":\"Fits too tight\"}},\"layout\":{\"type\":\"SingleColumnLayout\",\"children\":[{\"type\":\"TextHeading\",\"text\":\"Select Resolution\"},{\"type\":\"TextBody\",\"text\":\"How can we make this right? Please choose your preferred resolution method below.\"},{\"type\":\"Form\",\"name\":\"resolution_form\",\"children\":[{\"type\":\"RadioButtonsGroup\",\"name\":\"resolution_type\",\"label\":\"Preferred Solution\",\"required\":true,\"data-source\":[{\"id\":\"refund\",\"title\":\"Original Refund\"},{\"id\":\"exchange\",\"title\":\"Product Exchange\"},{\"id\":\"store_credit\",\"title\":\"Store Credit (+10%)\"}]},{\"type\":\"TextInput\",\"name\":\"exchange_pref\",\"label\":\"Exchange Item\",\"required\":false,\"helper-text\":\"Specify the new size or color\"},{\"type\":\"RadioButtonsGroup\",\"name\":\"contact_method\",\"label\":\"Contact Method\",\"required\":true,\"data-source\":[{\"id\":\"whatsapp\",\"title\":\"WhatsApp\"},{\"id\":\"email\",\"title\":\"Email\"}]},{\"type\":\"Footer\",\"label\":\"Submit Return\",\"on-click-action\":{\"name\":\"complete\",\"payload\":{\"order_number\":\"${data.order_number}\",\"item_name\":\"${data.item_name}\",\"customer_email\":\"${data.customer_email}\",\"return_reason\":\"${data.return_reason}\",\"additional_details\":\"${data.additional_details}\",\"resolution_type\":\"${form.resolution_type}\",\"exchange_pref\":\"${form.exchange_pref}\",\"contact_method\":\"${form.contact_method}\"}}}]}]}}]}"
}

```

**Response:**

```json
{
  "id": "1234567890123456",
  "success": true
}

```

</details>

### Step 2: Publish the Flow

<details>
<summary>Click to view **Publish Flow Request**</summary>

**Endpoint:** `POST https://chatapps.8x8.com/config/v1/channels/whatsapp/{channelId}/flows/1234567890123456/publish`

**Response:** `200 OK` (no response body)
</details>

---

### Step 3: Send the Flow (Interactive Message)

This example uses an Interactive Flow message, sent within the 24-hour customer service window after the customer initiates a return request.

<details>
<summary>Click to view **Send Interactive Flow Message**</summary>

**Endpoint:** `POST https://chatapps.8x8.com/api/v1/subaccounts/{subAccountId}/messages`

```json
{
  "user": {
    "msisdn": "+15551234567"
  },
  "type": "Interactive",
  "content": {
    "interactive": {
      "type": "flow",
      "header": {
        "type": "text",
        "text": "Return or Exchange"
      },
      "body": {
        "text": "We're sorry your purchase didn't work out. Let's make it right. Complete this form to start your return or exchange."
      },
      "action": {
        "parameters": {
          "flowId": "1234567890123456",
          "flowCta": "Start Return"
        }
      },
      "footer": {
        "text": "Takes less than 2 minutes"
      }
    }
  }
}

```

</details>

---

### Step 4: Handle the Submission

<details>
<summary>Click to view **Webhook Payload (Flow Submission)**</summary>

```json
{
  "namespace": "ChatApps",
  "eventType": "inbound_message_received",
  "payload": {
    "umid": "abc-123-def-456",
    "subAccountId": "your-subaccount-id",
    "timestamp": "2026-01-20T14:30:00.000Z",
    "user": {
      "msisdn": "+15551234567",
      "channelUserId": "15551234567"
    },
    "recipient": {
      "channel": "whatsapp",
      "channelId": "your-channel-id"
    },
    "type": "Interactive",
    "content": {
      "interactive": {
        "type": "nfmReply",
        "nfmReply": {
          "responseJson": "{\"order_number\":\"ORD-98765\",\"item_name\":\"Blue Denim Jacket - Size M\",\"customer_email\":\"customer@example.com\",\"return_reason\":\"wrong_size\",\"additional_details\":\"Fits too small, need size L\",\"resolution_type\":\"exchange\",\"exchange_pref\":\"Same item in size L\",\"contact_method\":\"whatsapp\",\"flow_token\":\"<TOKEN>\"}"
        }
      }
    }
  }
}

```

**Processing the Submission:**

```javascript
// Parse the Flow submission
const data = JSON.parse(payload.content.interactive.nfmReply.responseJson);

// Validate order exists and is eligible for return
const order = await validateOrder(data.order_number, data.customer_email);

if (!order.exists) {
  await sendMessage(payload.user.msisdn,
    "We couldn't find that order. Please check your order number and try again.");
  return;
}

if (!order.eligibleForReturn) {
  await sendMessage(payload.user.msisdn,
    "This order is outside the 30-day return window. Please contact support for assistance.");
  return;
}

// Generate return authorization
const returnAuth = await createReturnAuthorization({
  orderId: order.id,
  itemName: data.item_name,
  reason: data.return_reason,
  additionalDetails: data.additional_details,
  resolutionType: data.resolution_type,
  exchangePreference: data.exchange_pref,
  customerEmail: data.customer_email
});

// Generate and send return shipping label
const shippingLabel = await generateShippingLabel({
  returnAuthNumber: returnAuth.number,
  customerAddress: order.shippingAddress
});

// Send confirmation with return label
await sendMessage(payload.user.msisdn, {
  type: "document",
  document: {
    link: shippingLabel.url,
    filename: `Return_Label_${returnAuth.number}.pdf`
  },
  caption: `Return authorized! Return #${returnAuth.number}\n\nPrint this label and attach it to your package. Drop it off at any shipping location.\n\nYou'll receive your ${data.resolution_type === 'refund' ? 'refund' : 'exchange'} within 5-7 business days after we receive your return.`
});

// Log for analytics and quality tracking
await logReturnRequest({
  returnReason: data.return_reason,
  resolutionType: data.resolution_type,
  itemSku: order.itemSku,
  orderDate: order.createdAt
});

```

**Best Practices:**
- **Validate Immediately:** Check order eligibility in real-time to prevent invalid returns
- **Return Window:** Enforce your return policy (e.g., 30 days from delivery)
- **Fraud Prevention:** Match email/phone to original order to prevent abuse
- **Quality Insights:** Track return reasons by product/SKU to identify quality issues
- **Automation:** Auto-approve simple returns (wrong size), flag complex ones (defective) for review
- **Customer Experience:** Send return label immediately, provide tracking updates
</details>

---

## Related Resources

- **[WhatsApp Flows in 8x8 Connect](./whatsapp-flows-ui-guide.md)** - Complete guide for creating Flows using 8x8 Connect portal
- **[WhatsApp Flows API Reference](./whatsapp-flows-api.md)** - API documentation for programmatic Flow management
- **[All Flow Examples](./whatsapp-flows-examples.md)** - Browse examples from other industries
