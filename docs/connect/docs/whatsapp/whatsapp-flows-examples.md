---
sidebar_label: 'Flow Examples'
---

# WhatsApp Flow Examples

This library provides production-ready WhatsApp Flow implementations for common industry use cases. Each example includes the complete Flow JSON definition, API implementation steps, webhook handling guidance, and industry-specific best practices.

These examples demonstrate real-world patterns you can adapt to your specific business needs. All payloads are tested and match the 8x8 Connect API specifications.

## Available Examples by Industry

### Retail & eCommerce

- **[Product Return & Exchange](./whatsapp-flows-examples-retail.md)** - Automate returns processing, reduce support tickets by 40%, and capture structured data for quality insights.

### Financial Services

- **[Loan Application](./whatsapp-flows-examples-financial.md)** - Streamline loan applications with KYC document upload, employment verification, and automated eligibility checks.

### Professional Services

- **[Service Appointment Booking](./whatsapp-flows-examples-professional-services.md)** - Collect service requests, property details, and schedule technician appointments with skill-based routing.

### Healthcare

- **[Appointment Scheduling](./whatsapp-flows-examples-healthcare.md)** - Reduce phone volume and scheduling errors with structured appointment data collection.

### Sales & Marketing

- **[CPaaS Lead Generation](./whatsapp-flows-examples-sales.md)** - Capture qualified leads with product showcases, multi-select interests, and demo scheduling.

---

## How to Use These Examples

Each example provides complete Flow JSON and implementation guidance. You can use them in two ways:

### Option 1: 8x8 Connect UI (Recommended for Getting Started)

Use the visual interface to create and deploy Flows without code:

1. Copy the Flow JSON from Step 1 of any example
2. Navigate to [8x8 Connect](https://connect.8x8.com/) > **Messaging Apps** > **WhatsApp flows** at [https://connect.8x8.com/chat/flows](https://connect.8x8.com/chat/flows)
3. Click **+ Create a WhatsApp Flow** or go directly to [https://connect.8x8.com/chat/flows/create](https://connect.8x8.com/chat/flows/create)
4. Paste the JSON into the editor
5. Use the preview to test the Flow interactively
6. Click **Publish** when ready
7. Create a template with Flow button (or use Interactive messages within service window)
8. Send via Campaigns for bulk sends, or directly to individual customers

**Full walkthrough:** [WhatsApp Flows in 8x8 Connect](./whatsapp-flows-ui-guide.md)

### Option 2: API Integration (For Developers)

Use programmatic API calls for automation and CI/CD:

1. Use the complete API calls shown in each step of the examples
2. Authenticate with your API key (Bearer token)
3. Create Flow via POST request (Step 1 in each example)
4. Publish via POST request (Step 2 in each example)
5. Send Flow via Template or Interactive message (Step 3)
6. Handle webhook submissions in your backend (Step 4)

**Full API reference:** [WhatsApp Flows API Documentation](./whatsapp-flows-api.md)

---

## Example Structure

Each example follows this consistent format:

1. **Scenario Overview:** Business problem and solution approach
2. **Flow JSON:** Complete Flow definition with screens and validation
3. **Template Creation:** API payload for creating the template (if using business-initiated approach)
4. **Sending the Flow:** Complete request payloads for template or interactive messages
5. **Webhook Handling:** Expected submission payload and processing guidance

**Tips:**
- Adapt field names and labels to match your business requirements
- Test Flows in preview mode before publishing to production
- Start with a similar example and customize from there
- **Note:** [Meta's WhatsApp Flows Playground](https://developers.facebook.com/docs/whatsapp/flows/playground/) is a one-way tool for building flows visually and exporting to JSON. It does not support importing/pasting JSON.

---

## Best Practices Across All Examples

### Flow Design

- **Keep it focused:** Limit Flows to 3-5 screens maximum for better completion rates
- **Mobile-first:** Design for small screens, keep text concise
- **Progressive disclosure:** Ask for basic info first, complex details later
- **Clear CTAs:** Use action-oriented button labels ("Book Now" vs "Submit")

### Error Handling

- **Validate early:** Check order numbers, emails, phone formats before submission
- **Graceful failures:** If validation fails, explain clearly and offer alternatives
- **Idempotency:** Use `umid` to prevent duplicate processing
- **Timeout handling:** Webhook must respond within 5 seconds
- **Retry logic:** Implement exponential backoff for downstream API calls

### Implementation Tips

1. **Keep it Short:** Limit to 3-5 screens maximum
2. **Show Progress:** Use screen titles like "Step 1 of 3"
3. **Pre-populate When Possible:** Pass known data via `flowActionData`
4. **Validate Appropriately:** Use `required: true` and appropriate `input-type`

```javascript
// Wrap parsing in try-catch
try {
  const data = JSON.parse(payload.content.interactive.nfmReply.responseJson);
  await processSubmission(data);
} catch (error) {
  console.error('Flow submission parsing error:', error);
  // Log for debugging but don't crash
}
```

### Testing

- Test all Flows with preview URL before publishing
- Send to test numbers and complete full journey
- Verify webhook receives correct payload structure
- Test error scenarios (missing fields, invalid data)
- Track Flow completion rates
- A/B test different Flow designs

### Monitoring

- **Track completion rates:** Identify where users abandon Flows
- **Response times:** Monitor webhook processing duration
- **Error rates:** Alert on parsing failures
- **A/B testing:** Test different Flow designs and button labels to optimize conversion

---

## Additional Resources

- **[WhatsApp Flows in 8x8 Connect](./whatsapp-flows-ui-guide.md)** - Complete guide for creating Flows using 8x8 Connect portal
- **[WhatsApp Flows API Reference](./whatsapp-flows-api.md)** - API documentation for programmatic Flow management
- **[Meta WhatsApp Flows Playground](https://developers.facebook.com/docs/whatsapp/flows/playground/)** - Visual Flow design tool
- **[WhatsApp Webhooks](./whatsapp-webhooks.md)** - Webhook setup and all event types
- **[Template Message API](./template-message-api-library.mdx)** - Complete template syntax reference
