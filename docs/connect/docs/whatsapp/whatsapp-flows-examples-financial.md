---
sidebar_label: 'Financial Services'
---

# Financial Services Flow Examples

## Loan Application

![Loan Application Flow](./images/loan-application.webp)

**Business Value:** Streamline loan application process, reduce drop-off rates, and collect comprehensive applicant information including ID verification for KYC compliance.

**Scenario:** A customer needs a loan and completes a WhatsApp Flow that guides them through personal information, ID verification, employment details, and loan requirements. The Flow includes conditional logic, image upload for ID verification, and a comprehensive summary screen before submission.

**Tools Used:** Interactive Flow (within service window) + Loan processing system integration

---

### Step 1: Create the Flow

Multi-screen Flow with routing: Welcome → [Terms, Personal Info] → ID Verification → Employment → Loan Details → Summary

This Flow demonstrates advanced features including:
- Image component with base64 encoding
- OptIn component for terms agreement
- EmbeddedLink navigation to Terms screen
- PhotoPicker for ID card upload
- Conditional fields (If component)
- RichText with markdown formatting
- Complex routing model with multiple paths

<details>
<summary>Click to view **Flow JSON Definition**</summary>

**Endpoint:** `POST https://chatapps.8x8.com/config/v1/channels/whatsapp/{channelId}/flows`

```json
{
  "name": "BankSmart Loan Application",
  "categories": ["OTHER"],
  "flowJson": "{\"version\":\"7.2\",\"routing_model\":{\"WELCOME_SCREEN\":[\"TOC_SCREEN\",\"PERSONAL_INFO_SCREEN\"],\"PERSONAL_INFO_SCREEN\":[\"ID_VERIFICATION_SCREEN\"],\"ID_VERIFICATION_SCREEN\":[\"EMPLOYMENT_INFO_SCREEN\"],\"EMPLOYMENT_INFO_SCREEN\":[\"LOAN_DETAILS_SCREEN\"],\"LOAN_DETAILS_SCREEN\":[\"SUMMARY_SCREEN\"]},\"screens\":[{\"id\":\"WELCOME_SCREEN\",\"title\":\"BankSmart Loan\",\"layout\":{\"type\":\"SingleColumnLayout\",\"children\":[{\"type\":\"Image\",\"src\":\"/9j/4AAQSkZJRgABAQAASABIAAD/4QBYRXhpZgAATU0AKgAAAAgAAgESAAMAAAABAAEAAIdpAAQAAAABAAAAJgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAACgKADAAQAAAABAAABXQAAAAD/wAARCAFdAoADASIAAhEBAxEB/8QAHwAAAQUBAQEBAQEAAAAAAAAAAAECAwQFBgcICQoL/8QAtRAAAgEDAwIEAwUFBAQAAAF9AQIDAAQRBRIhMUEGE1FhByJxFDKBkaEII0KxwRVS0fAkM2JyggkKFhcYGRolJicoKSo0NTY3ODk6Q0RFRkdISUpTVFVWV1hZWmNkZWZnaGlqc3R1dnd4eXqDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uHi4+Tl5ufo6erx8vP09fb3+Pn6/8QAHwEAAwEBAQEBAQEBAQAAAAAAAAECAwQFBgcICQoL/8QAtREAAgECBAQDBAcFBAQAAQJ3AAECAxEEBSExBhJBUQdhcRMiMoEIFEKRobHBCSMzUvAVYnLRChYkNOEl8RcYGRomJygpKjU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6goOEhYaHiImKkpOUlZaXmJmaoqOkpaanqKmqsrO0tba3uLm6wsPExcbHyMnK0tPU1dbX2Nna4uPk5ebn6Onq8vP09fb3+Pn6/9sAQwACAgICAgIDAgIDBQMDAwUGBQUFBQYIBgYGBgYICggICAgICAoKCgoKCgoKDAwMDAwMDg4ODg4PDw8PDw8PDw8P/9sAQwECAgIEBAQHBAQHEAsJCxAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQ/90ABAAo/9oADAMBAAIRAxEAPwD9PY727HyiZiPRjuH61bS9fnzURx34x/n8qzAMfWpF3c14+YcJ5bir/WMPF/JX+85cPmWIp/BNo0i1lMclCh9sH/CozaWkuQrgH34qEelWIlB9q+BzPwTySvrTg4PyZ72G4wxkN5XKc2jnHyYYeoOayJNOIbGK7GONSSevvUOoIYbWSZeCo4zzXwGZfR7ktcHiPlJf5H0GG48W1aH3HJjTnYEqhYL1wM4/Kq7WgBOe1fTukWNrFplhJDEqF0UsQOpI7+tXrnQtKvuLq0jkPqVGfzGK2q/R9/dLkxHv9dNCocce9rDQ+V1th6Ukqmedo+ZrD4nXPxTvvtFroejiRR87Q22w4zjcfMbGPTmv2rL/AIfoZtR1goS9H/kfn+acFU8PDnhJt9kz1v7ZI3yvIMgZyf8A9dMN+rHarucn3r5z0fx34k0hFj0zU5UAzw24H8j0r0TTPiNfxsrXu1yOp2jP4gYr8PzfwBp0ajjh6/4H1WC4+i2ueFj//Uk75/xO9sb1bhfle68wP1ZT09T9K4zXPFVzZTNbkR3TFcsq8BlJ9PQU7Tp/FniZRcajI1okzDZbIhJYDqTgZ/KvTvDfwZ0eG08zU4o4mJ5TbgjGc5+tfj3jFxngcFl8sLhppyktbbHq5DkeKxeIjWqQaS6n5+fHj4i3/wARfELKFAl1R1e1t2YZZCdgKjPRQq9cH1NeAE815x+0fJBH8VNUiiAiMcscYA4UxBNuFznHHPtXP6j4v1+7IHn+UoOfLQZx+JBr/WvwqyF5TwtThON5PVv1Z+HcS42GNxMpQdlshmQOea+hfDc1vH4XsNT8Q3cNjp8dsklxfyyLHHFCUG98sSfpX5yT2dzPJ5tzO8z9cuxLY+g4FUppGgjimhcxyRuskbqSCrKcqwI6gg8ivf8AEPDkuH8XXo0HzqDs77pNJ6ep0ZLjFh8ZTnPV7n7d6n8RdW1fQm0mWyFrE0m9byL7y8DbkdFJPp1616N8MrPw9d6vbyacS1z9qlguXI5MTgHZGw6jy8K3HOGr+cO98Qa1qxY3d/c3G/ndLK7Y9eScCuZ+wXY4FrP+TL/WvzT6WvBn9hcRRx1JPkrx3tpzLb1uj67hHPpV8N7KT1jt8j//0/04bB7VG4boBzQ3Wjmu5s88cT709BgVFuqaNs1d2b02S9TUyn+GkVsnipB9KrcvkLFpcKoK8muisvlSsaI9q3bI/vV+lTYGbM8Y44rYt+x9awlbDgitG3kVq1GbEuL+dXrdbm2s5tQk1Jx5EBkeQq5+UNGDJgdN5jRvcrXxh/wUe8Xt4Z/Zv+wWwcXPiS5is1KDOYwxln/8dj2/jX0hr+u2fhfQr7xJqODa6bC88o3YJVVJxXgP/BPX4J6x428Ty/HD4lhW1DXIfs+kxpyY7NFJ+Zh/FKS7M3Xl1zzXvP8A2J38zLqFR93ov1Oanz08VKHy/Q/Kr9mP4OWup2a/EPx0m61tXkmji2ncvmlQqhgTgEBnJGAQpGcgYN58QPjv4x8ba/qWieGr11gju5LS3t7VghRIZNpGFAA3FQPyrD/aN/ah
}

```

**Response:**

```json
{
  "id": "loan_app_flow_123",
  "success": true
}

```

</details>

---

### Step 2: Publish the Flow

<details>
<summary>Click to view **Publish Flow Request**</summary>

**Endpoint:** `POST https://chatapps.8x8.com/config/v1/channels/whatsapp/{channelId}/flows/loan_app_flow_123/publish`

**Response:** `200 OK` (no response body)

</details>

---

### Step 3: Send the Flow (Interactive Message)

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
        "text": "Apply for a Loan"
      },
      "body": {
        "text": "Get approved in minutes. Complete your loan application with BankSmart - fast, secure, and simple."
      },
      "footer": {
        "text": "Secure application process"
      },
      "action": {
        "parameters": {
          "flowId": "loan_app_flow_123",
          "flowCta": "Apply Now"
        }
      }
    }
  }
}

```

</details>

---

### Step 4: Handle the Submission

<details>
<summary>Click to view **Webhook Payload and Processing Logic**</summary>

**Webhook Payload (Flow Submission):**

```json
{
  "namespace": "ChatApps",
  "eventType": "inbound_message_received",
  "payload": {
    "umid": "abc-123-def-456",
    "subAccountId": "your-subaccount-id",
    "user": {
      "msisdn": "+15551234567"
    },
    "type": "Interactive",
    "content": {
      "interactive": {
        "type": "nfmReply",
        "nfmReply": {
          "responseJson": "{\"full_name\":\"Jane Doe\",\"email\":\"jane@example.com\",\"phone\":\"12345678\",\"dob\":\"1990-01-01\",\"id_photo\":\"base64_encoded_image_data\",\"employment_status\":\"Employed\",\"employer_name\":\"TechCorp\",\"monthly_income\":\"6000\",\"loan_amount\":\"20000\",\"loan_term\":\"5\"}"
        }
      }
    }
  }
}

```

**Processing Logic:**

```javascript
app.post('/webhook', async (req, res) => {
  const payload = req.body.payload;

  // Identify Flow submission
  if (payload.type === 'Interactive' &&
      payload.content.interactive.type === 'nfmReply') {

    // Parse submission
    const data = JSON.parse(payload.content.interactive.nfmReply.responseJson);

    // Extract ID photo (base64 encoded)
    const idPhoto = data.id_photo;

    // Upload ID photo to secure storage
    const idPhotoUrl = await uploadToSecureStorage(idPhoto, {
      userId: payload.user.msisdn,
      type: 'kyc_document',
      timestamp: new Date()
    });

    // Calculate loan eligibility
    const monthlyIncome = parseFloat(data.monthly_income);
    const loanAmount = parseFloat(data.loan_amount);
    const loanTerm = parseInt(data.loan_term);

    // Simple DTI ratio check (30% max)
    const monthlyPayment = loanAmount / (loanTerm * 12);
    const dtiRatio = monthlyPayment / monthlyIncome;
    const preliminaryApproval = dtiRatio <= 0.3;

    // Create loan application in system
    const applicationId = await createLoanApplication({
      applicantName: data.full_name,
      email: data.email,
      phone: data.phone,
      dateOfBirth: data.dob,
      idPhotoUrl: idPhotoUrl,
      employmentStatus: data.employment_status,
      employerName: data.employer_name,
      monthlyIncome: monthlyIncome,
      loanAmount: loanAmount,
      loanTerm: loanTerm,
      dtiRatio: dtiRatio,
      preliminaryStatus: preliminaryApproval ? 'approved' : 'pending_review',
      source: 'whatsapp_flow',
      createdAt: new Date()
    });

    // Trigger KYC verification workflow
    await triggerKYCVerification(applicationId, idPhotoUrl);

    // Send confirmation message
    let responseMessage = '';
    if (preliminaryApproval) {
      responseMessage = `Great news, ${data.full_name}! Your loan application #${applicationId} has been preliminarily approved. \\n\\nLoan Amount: Rp ${loanAmount}\\nTerm: ${loanTerm} years\\n\\nWe're verifying your documents and will contact you within 24 hours to finalize your loan.`;
    } else {
      responseMessage = `Thank you, ${data.full_name}! Your loan application #${applicationId} has been received and is under review. \\n\\nLoan Amount: Rp ${loanAmount}\\nTerm: ${loanTerm} years\\n\\nOur team will contact you within 24-48 hours to discuss your options.`;
    }

    await sendMessage({
      user: { msisdn: payload.user.msisdn },
      type: 'text',
      content: {
        text: responseMessage
      }
    });

    // Send notification to loan team
    await notifyLoanTeam({
      applicationId: applicationId,
      applicantName: data.full_name,
      loanAmount: loanAmount,
      status: preliminaryApproval ? 'pre_approved' : 'pending_review'
    });
  }

  res.status(200).send('OK');
});

```

**Best Practices:**
- **Security:** Store ID photos and sensitive data in encrypted storage with proper access controls
- **KYC Compliance:** Implement automated ID verification (OCR, face matching) to streamline processing
- **Risk Assessment:** Use credit scoring APIs and DTI ratio calculations for preliminary approval
- **Transparency:** Clearly communicate loan terms, interest rates, and repayment schedules
- **Follow-up:** Set up automated reminders for document completion and application status updates
- **Fraud Detection:** Cross-reference applicant information with credit bureaus and fraud databases
- **Customer Experience:** Provide real-time application status updates via WhatsApp
- **Data Retention:** Comply with financial regulations for document storage and retention periods
</details>

---

## Related Resources

- **[WhatsApp Flows in 8x8 Connect](./whatsapp-flows-ui-guide.md)** - Complete guide for creating Flows using 8x8 Connect portal
- **[WhatsApp Flows API Reference](./whatsapp-flows-api.md)** - API documentation for programmatic Flow management
- **[All Flow Examples](./whatsapp-flows-examples.md)** - Browse examples from other industries
