---
sidebar_label: 'Best Practices'
---

# WhatsApp Flow Best Practices & Governance

Comprehensive guidelines for designing effective, secure, and compliant WhatsApp Flows. Follow these best practices to create Flows that deliver great user experiences while maintaining security and regulatory compliance.

## Design Best Practices

### Keep Flows Focused

**Do:**
- Limit Flows to 3-5 screens maximum
- Collect only essential data for the next action
- Use clear, concise field labels
- Group related fields on the same screen

**Don't:**
- Create 10+ screen flows (users abandon long forms)
- Ask for data you won't immediately use
- Mix unrelated topics in one Flow
- Overwhelm users with too many fields per screen

### Validate Input Appropriately

Use built-in field validation to prevent errors:

- Set `required: true` for mandatory fields
- Use `input-type: "email"` for email fields with automatic validation
- Use `input-type: "number"` for numeric fields
- Use `input-type: "phone"` for phone numbers
- Use Dropdown/RadioButton for constrained choices (prevents invalid input)
- Set `min-chars` and `max-chars` for text length validation
- Set `min-date` and `max-date` for date restrictions

**Example:**

```json
{
  "type": "TextInput",
  "name": "email",
  "label": "Email Address",
  "input-type": "email",
  "required": true,
  "helper-text": "We'll send confirmation to this address"
}
```

### Provide Clear Instructions

- Use `TextHeading` and `TextBody` components to explain each screen's purpose
- Set descriptive `label` attributes on all input fields
- Use `helper-text` to provide examples or clarifications
- Include `footer` text to guide next steps

**Example:**

```json
{
  "type": "TextInput",
  "name": "order_number",
  "label": "Order Number",
  "input-type": "text",
  "required": true,
  "helper-text": "Example: ORD-12345"
}
```

### Plan for Mobile

- **Keep text concise** - Users are on small screens
- **Avoid long dropdown lists** - Use search or radio buttons for 5+ options
- **Test on actual WhatsApp** - Validate UX on real devices
- **Optimize images** - Ensure images load quickly on mobile data
- **Use appropriate keyboards** - `input-type` controls mobile keyboard type

### Screen-by-Screen Design

**Welcome Screen:**
- Clearly state the Flow's purpose
- Set expectations (e.g., "Takes 2 minutes")
- Use friendly, conversational tone
- Include visual elements (Image, ImageCarousel) if appropriate

**Data Collection Screens:**
- One topic per screen (don't mix personal info with preferences)
- Progress indicators if multiple screens (e.g., "Step 2 of 4")
- Default values when possible to reduce typing
- Logical field ordering (name before email, email before phone)

**Terminal Screen:**
- Summarize what will happen next
- Show submitted data for review (optional)
- Thank the user for their time
- Set expectations for follow-up

---

## Governance and Security

### Data Collection Principles

**Minimize Data Collection:**
- Only request data necessary for the immediate next step
- Don't collect sensitive data (SSN, full credit card numbers) via Flows
- Clearly state why you're requesting each field
- Consider privacy implications of each field

**Transparency:**
- Explain how you'll use submitted data
- Link to privacy policy if collecting personal information
- Allow users to review data before final submission (add summary screen)
- Obtain explicit consent for data processing where required

**Example:**

```json
{
  "type": "OptIn",
  "name": "privacy_consent",
  "label": "I agree to the Privacy Policy",
  "required": true,
  "on-click-action": {
    "name": "navigate",
    "next": {
      "type": "screen",
      "name": "PRIVACY_POLICY_SCREEN"
    }
  }
}
```

### Input Validation

**Server-Side Validation:**

Always validate Flow submissions on your backend, even though Flows have client-side validation:

```javascript
function validateFlowSubmission(data) {
  // Validate required fields exist
  if (!data.email || !isValidEmail(data.email)) {
    throw new Error('Invalid email');
  }

  // Validate data types
  if (typeof data.age !== 'number' || data.age < 0) {
    throw new Error('Invalid age');
  }

  // Sanitize inputs before storage
  const sanitized = {
    email: sanitizeEmail(data.email),
    feedback: sanitizeText(data.feedback),
    age: parseInt(data.age)
  };

  return sanitized;
}
```

**Treat Submissions as Untrusted Input:**
- Validate data types and formats
- Sanitize before database insertion
- Check for injection attacks (SQL, XSS)
- Rate limit submission processing
- Log suspicious submissions for review

### Sensitive Data Handling

**For KYC/Identity Verification:**
- Use `PhotoPicker` for ID document upload
- Store images in encrypted storage with access controls
- Implement automated verification (OCR, face matching) when possible
- Set data retention policies compliant with regulations
- Log all access to sensitive documents

**Example:**

```javascript
// Upload ID photo to secure storage
const idPhotoUrl = await uploadToSecureStorage(data.id_photo, {
  userId: payload.user.msisdn,
  type: 'kyc_document',
  encrypted: true,
  retentionDays: 90,
  timestamp: new Date()
});
```

**Never Collect via Flows:**
- Full credit card numbers (use payment gateways instead)
- Social Security Numbers in full (use last 4 digits if needed)
- Passwords or PINs
- Biometric data beyond photos for ID verification
- Protected health information (unless HIPAA compliant)

### Compliance

**Template Approval:**
- Templates with Flow buttons require Meta approval (typically 24-48 hours)
- **Choose the appropriate category to avoid template rejection:**
  - `UTILITY` - For transactional/service Flows (data collection, appointments, customer service, feedback)
  - `MARKETING` - For promotional Flows (offers, campaigns, product announcements)
  - `AUTHENTICATION` - For OTP and verification (special requirements)
- See [Template Categories](./concepts-fundamentals.md#2-template-categories) for complete guidelines

**User Consent:**
- Ensure users opted in to receive messages
- Respect opt-out requests immediately
- Maintain opt-in records for compliance audits
- Provide easy opt-out mechanism in every message

**Data Retention:**
- Store Flow submissions according to your privacy policy
- Implement data deletion on user request (GDPR right to deletion)
- Comply with GDPR, CCPA, and local regulations
- Document data flows for compliance reporting
- Set retention periods and automated deletion

**GDPR Considerations:**
- Obtain explicit consent for data processing
- Provide clear privacy notices
- Allow users to access their data
- Enable data portability
- Implement right to be forgotten

---

## Testing and Quality Assurance

### Testing Checklist

Before launching a Flow to production:

- [ ] **Preview Testing**
  - [ ] All screens render correctly on mobile layout
  - [ ] Navigation works as expected (forward and back)
  - [ ] Conditional logic behaves correctly
  - [ ] Required fields are enforced
  - [ ] Field validation works (email, phone, date formats)

- [ ] **End-to-End Testing**
  - [ ] Create test template with Flow button
  - [ ] Send to test WhatsApp numbers
  - [ ] Complete Flow with valid data
  - [ ] Complete Flow with invalid/edge case data
  - [ ] Verify webhook receives correct payload
  - [ ] Confirm data parsing works correctly

- [ ] **User Experience Testing**
  - [ ] Text fits on mobile screens without truncation
  - [ ] Images load quickly
  - [ ] Helper text is clear and helpful
  - [ ] Error messages are understandable
  - [ ] Overall completion time is reasonable (< 5 minutes)

- [ ] **Integration Testing**
  - [ ] Webhook processes submissions successfully
  - [ ] Data saves to CRM/database correctly
  - [ ] Confirmation messages send to users
  - [ ] Error handling works gracefully
  - [ ] Duplicate submissions are handled (idempotency)

- [ ] **Security Testing**
  - [ ] Input validation catches malicious input
  - [ ] SQL injection attempts are blocked
  - [ ] XSS attempts are sanitized
  - [ ] Rate limiting works
  - [ ] Sensitive data is encrypted in transit and at rest

### Common Issues and Solutions

| Issue | Likely Cause | Solution |
|-------|--------------|----------|
| **High abandonment rate** | Too long, confusing navigation | Reduce screens, simplify language, add progress indicators |
| **Invalid data submissions** | Weak validation, unclear instructions | Add field validation, improve helper-text, use constrained inputs |
| **Webhook timeouts** | Slow processing, no async handling | Respond 200 OK immediately, process asynchronously |
| **Duplicate submissions** | No idempotency check | Use `umid` to track processed submissions |
| **Low completion rate** | Poor mobile UX, too many required fields | Test on real devices, make more fields optional |

### Monitoring and Analytics

Track these metrics to optimize your Flows:

**Completion Metrics:**
- **Start rate** - % of users who click the Flow button
- **Completion rate** - % of users who submit the Flow
- **Abandonment by screen** - Where users drop off
- **Average completion time** - How long users take

**Quality Metrics:**
- **Invalid submissions** - Data that fails validation
- **Webhook errors** - Processing failures
- **Response time** - How quickly webhooks process
- **User feedback** - Complaints or confusion reports

**Optimization Actions:**
- A/B test different Flow designs
- Remove or simplify high-abandonment screens
- Improve helper text for fields with high error rates
- Add more constrained inputs (dropdown vs text)

---

## Error Handling

### Client-Side Validation

WhatsApp Flows provide built-in validation:

- Required fields prevent submission if empty
- Email/phone/number input types validate format
- Date pickers constrain to valid dates
- Min/max character limits prevent oversized input

**Users see validation errors immediately** without submitting.

### Server-Side Validation

Always validate on your backend:

```javascript
app.post('/webhook', async (req, res) => {
  const { payload } = req.body;

  // Acknowledge immediately
  res.status(200).send('OK');

  try {
    // Parse submission
    const data = JSON.parse(payload.content.interactive.nfmReply.responseJson);

    // Validate
    if (!data.email || !isValidEmail(data.email)) {
      await logInvalidSubmission(payload.umid, 'invalid_email', data);
      await sendMessage(payload.user.msisdn,
        "We couldn't process your submission. Please check your email and try again.");
      return;
    }

    // Process valid submission
    await processFlowSubmission(data, payload);

  } catch (error) {
    console.error('Flow processing error:', error);
    await logError(payload.umid, error);
    await sendMessage(payload.user.msisdn,
      "We encountered an error. Our team has been notified and will follow up shortly.");
  }
});
```

### Graceful Degradation

When errors occur:

1. **Log the error** with full context (umid, payload, user)
2. **Notify the user** with a helpful message
3. **Alert your team** for high-priority issues
4. **Provide alternatives** (phone number, email for support)

**Example:**

```javascript
await sendMessage(payload.user.msisdn,
  "We're having trouble processing your request right now. " +
  "Please try again in a few minutes, or contact us at support@example.com.");
```

---

## Accessibility

### Text Clarity

- Use simple, clear language
- Avoid jargon and technical terms
- Keep sentences short (< 20 words)
- Use active voice ("Enter your email" vs "Email should be entered")

### Visual Design

- Ensure sufficient contrast for text
- Use descriptive alt-text for images
- Don't rely solely on color to convey meaning
- Test with screen readers if possible

### Progressive Enhancement

- Design for users with limited literacy
- Use visual cues (icons, images) alongside text
- Provide examples in helper-text
- Use radio buttons with clear labels for complex choices

---

## Performance Optimization

### Image Optimization

- **Compress images** before base64 encoding
- **Use appropriate formats** (WebP for photos, PNG for logos)
- **Limit image sizes** (< 500KB recommended)
- **Consider mobile data** - Large images slow Flow loading

### Flow JSON Size

- **Keep Flow JSON concise** (< 100KB recommended)
- **Minimize base64-encoded images** in JSON when possible
- **Use URLs for large images** instead of embedding
- **Remove unnecessary whitespace** in production JSON

### Webhook Performance

- **Respond within 5 seconds** - Acknowledge receipt immediately
- **Process asynchronously** - Queue long-running tasks
- **Implement caching** - Cache frequently accessed data
- **Use connection pooling** - Reuse database connections
- **Monitor response times** - Alert on slow webhooks

---

## Documentation

### Internal Documentation

Document each Flow for your team:

- **Purpose** - What problem does this Flow solve?
- **Target audience** - Who will use this Flow?
- **Data collected** - What fields and why?
- **Processing logic** - What happens to submissions?
- **Dependencies** - What systems does this integrate with?
- **Owner** - Who maintains this Flow?

### User-Facing Documentation

Help users understand your Flows:

- **What to expect** - How long will it take?
- **What you need** - What information should users have ready?
- **Privacy** - How will their data be used?
- **Support** - Who to contact with questions?

---

## Troubleshooting Guide

### Flow Won't Publish

**Symptoms:** Error when clicking Publish button

**Common Causes:**
- Invalid JSON structure
- Missing required fields
- Screen IDs don't match routing model
- Invalid component properties

**Solution:**
1. Validate JSON syntax (use online validator)
2. Check all screen IDs exist in routing_model
3. Verify all required component properties are set
4. Test in preview before publishing

### Users Can't Open Flow

**Symptoms:** Flow button appears but nothing happens when clicked

**Common Causes:**
- Flow not published
- Flow deprecated
- Incorrect Flow ID in template
- User's WhatsApp version too old

**Solution:**
1. Verify Flow status is PUBLISHED
2. Check Flow ID matches template
3. Test on updated WhatsApp version
4. Recreate and republish Flow if needed

### Webhook Not Receiving Submissions

**Symptoms:** Flow completes but webhook never fires

**Common Causes:**
- Webhook URL incorrect
- Webhook endpoint not HTTPS
- Endpoint not returning 200 OK
- Firewall blocking requests

**Solution:**
1. Verify webhook URL in portal settings
2. Ensure endpoint uses HTTPS
3. Test endpoint responds with 200 OK
4. Check server logs for incoming requests
5. Verify firewall/security group allows WhatsApp IPs

### Parsing Errors

**Symptoms:** `responseJson` won't parse or missing fields

**Common Causes:**
- Not parsing JSON string (it's double-encoded)
- Field names don't match Flow definition
- Optional fields missing from payload
- Unicode/encoding issues

**Solution:**

```javascript
try {
  // responseJson is a STRING, must parse it
  const data = JSON.parse(payload.content.interactive.nfmReply.responseJson);

  // Check for required fields
  if (!data.email) {
    console.error('Missing email field');
    return;
  }

  // Handle optional fields safely
  const preferences = data.preferences || [];

} catch (error) {
  console.error('JSON parsing error:', error);
  console.log('Raw payload:', payload.content.interactive.nfmReply.responseJson);
}
```

---

## Next Steps

### Related Documentation

- **[Creating Flows with Connect UI](./whatsapp-flows-ui-guide.md)** - Step-by-step Flow creation guide
- **[Flow Component Reference](./whatsapp-flows-components.md)** - Complete component documentation
- **[Flow API Reference](./whatsapp-flows-api.md)** - Programmatic Flow management
- **[Flow Examples](./whatsapp-flows-examples.md)** - Production-ready industry examples

### Additional Resources

- **[WhatsApp Webhooks](./whatsapp-webhooks.md)** - Webhook configuration and event types
- **[Template Message API](./template-message-api-library.mdx)** - Template syntax and approval
- **[Meta WhatsApp Flows Documentation](https://developers.facebook.com/docs/whatsapp/flows)** - Official WhatsApp guidelines
- **[GDPR Compliance Guide](https://gdpr.eu/)** - EU data protection regulations
- **[CCPA Compliance Guide](https://oag.ca.gov/privacy/ccpa)** - California privacy regulations
