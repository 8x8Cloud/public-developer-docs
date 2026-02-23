---
sidebar_label: 'Sales & Marketing'
---

# Sales & Marketing Flow Examples

## CPaaS Lead Generation

![CPaaS Lead Generation Flow](./images/lead-generation.webp)

**Business Value:** Capture qualified leads with structured data, showcase product features, enable multi-select interest tracking, and route leads to sales teams based on company size and use case.

**Scenario:** A potential customer is interested in a CPaaS (Communications Platform as a Service) solution. Instead of filling out a generic contact form, they complete a WhatsApp Flow that presents product features, collects company details, captures specific use case interests, and schedules a personalized demo. The system qualifies leads and routes to appropriate sales representatives.

**Tools Used:** Flow Configuration API + Messaging API + CRM integration + Demo scheduling system

---

### Step 1: Create the Flow

<details>
<summary>Click to view **Flow JSON Definition**</summary>

This Flow showcases product features, collects company information, and schedules demos across 4 screens.

**Endpoint:** `POST https://chatapps.8x8.com/config/v1/channels/whatsapp/{channelId}/flows`

```json
{
  "name": "CPaaS Lead Generation & Demo Booking",
  "categories": ["OTHER"],
  "flowJson": "{\"version\":\"7.2\",\"routing_model\":{\"PRODUCT_SHOWCASE\":[\"COMPANY_INFO\"],\"COMPANY_INFO\":[\"USE_CASES\"],\"USE_CASES\":[\"SCHEDULE_DEMO\"],\"SCHEDULE_DEMO\":[]},\"screens\":[{\"id\":\"PRODUCT_SHOWCASE\",\"title\":\"8x8 Connect CPaaS\",\"layout\":{\"type\":\"SingleColumnLayout\",\"children\":[{\"type\":\"TextHeading\",\"text\":\"Build powerful communication experiences\"},{\"type\":\"TextBody\",\"text\":\"8x8 Connect provides enterprise-grade APIs for SMS, WhatsApp, voice, and more. Trusted by thousands of businesses worldwide.\"},{\"type\":\"Form\",\"name\":\"product_form\",\"children\":[{\"type\":\"CheckboxGroup\",\"name\":\"interested_channels\",\"label\":\"Which channels interest you?\",\"required\":true,\"data-source\":[{\"id\":\"whatsapp\",\"title\":\"WhatsApp Business\",\"description\":\"Rich messaging with 2B+ users\"},{\"id\":\"sms\",\"title\":\"SMS\",\"description\":\"Global reach, 98% open rate\"},{\"id\":\"voice\",\"title\":\"Voice & SIP\",\"description\":\"Programmable voice calls\"},{\"id\":\"verify\",\"title\":\"Verification\",\"description\":\"OTP & 2FA authentication\"}]},{\"type\":\"RadioButtonsGroup\",\"name\":\"implementation_timeline\",\"label\":\"When do you plan to implement?\",\"required\":true,\"data-source\":[{\"id\":\"immediate\",\"title\":\"Immediately (0-30 days)\"},{\"id\":\"short_term\",\"title\":\"1-3 months\"},{\"id\":\"long_term\",\"title\":\"3-6 months\"},{\"id\":\"exploring\",\"title\":\"Just exploring\"}]},{\"type\":\"Footer\",\"label\":\"Continue\",\"on-click-action\":{\"name\":\"navigate\",\"next\":{\"type\":\"screen\",\"name\":\"COMPANY_INFO\"},\"payload\":{\"interested_channels\":\"${form.interested_channels}\",\"implementation_timeline\":\"${form.implementation_timeline}\"}}}]}]}},{\"id\":\"COMPANY_INFO\",\"title\":\"Company Details\",\"data\":{\"interested_channels\":{\"type\":\"array\",\"items\":{\"type\":\"string\"},\"__example__\":[\"whatsapp\",\"sms\"]},\"implementation_timeline\":{\"type\":\"string\",\"__example__\":\"immediate\"}},\"layout\":{\"type\":\"SingleColumnLayout\",\"children\":[{\"type\":\"TextHeading\",\"text\":\"Tell us about your company\"},{\"type\":\"Form\",\"name\":\"company_form\",\"children\":[{\"type\":\"TextInput\",\"name\":\"company_name\",\"label\":\"Company Name\",\"input-type\":\"text\",\"required\":true},{\"type\":\"TextInput\",\"name\":\"website\",\"label\":\"Company Website\",\"input-type\":\"text\",\"required\":false,\"helper-text\":\"Optional\"},{\"type\":\"Dropdown\",\"name\":\"company_size\",\"label\":\"Company Size\",\"required\":true,\"data-source\":[{\"id\":\"1-10\",\"title\":\"1-10 employees\"},{\"id\":\"11-50\",\"title\":\"11-50 employees\"},{\"id\":\"51-200\",\"title\":\"51-200 employees\"},{\"id\":\"201-500\",\"title\":\"201-500 employees\"},{\"id\":\"500+\",\"title\":\"500+ employees\"}]},{\"type\":\"Dropdown\",\"name\":\"industry\",\"label\":\"Industry\",\"required\":true,\"data-source\":[{\"id\":\"ecommerce\",\"title\":\"eCommerce/Retail\"},{\"id\":\"fintech\",\"title\":\"Financial Services/Fintech\"},{\"id\":\"healthcare\",\"title\":\"Healthcare\"},{\"id\":\"logistics\",\"title\":\"Logistics/Delivery\"},{\"id\":\"saas\",\"title\":\"SaaS/Technology\"},{\"id\":\"other\",\"title\":\"Other\"}]},{\"type\":\"TextInput\",\"name\":\"contact_name\",\"label\":\"Your Name\",\"input-type\":\"text\",\"required\":true},{\"type\":\"TextInput\",\"name\":\"job_title\",\"label\":\"Job Title\",\"input-type\":\"text\",\"required\":true},{\"type\":\"TextInput\",\"name\":\"email\",\"label\":\"Business Email\",\"input-type\":\"email\",\"required\":true},{\"type\":\"Footer\",\"label\":\"Continue\",\"on-click-action\":{\"name\":\"navigate\",\"next\":{\"type\":\"screen\",\"name\":\"USE_CASES\"},\"payload\":{\"interested_channels\":\"${data.interested_channels}\",\"implementation_timeline\":\"${data.implementation_timeline}\",\"company_name\":\"${form.company_name}\",\"website\":\"${form.website}\",\"company_size\":\"${form.company_size}\",\"industry\":\"${form.industry}\",\"contact_name\":\"${form.contact_name}\",\"job_title\":\"${form.job_title}\",\"email\":\"${form.email}\"}}}]}]}},{\"id\":\"USE_CASES\",\"title\":\"Your Use Cases\",\"data\":{\"interested_channels\":{\"type\":\"array\",\"items\":{\"type\":\"string\"},\"__example__\":[\"whatsapp\",\"sms\"]},\"implementation_timeline\":{\"type\":\"string\",\"__example__\":\"immediate\"},\"company_name\":{\"type\":\"string\",\"__example__\":\"TechCorp\"},\"website\":{\"type\":\"string\",\"__example__\":\"techcorp.com\"},\"company_size\":{\"type\":\"string\",\"__example__\":\"51-200\"},\"industry\":{\"type\":\"string\",\"__example__\":\"saas\"},\"contact_name\":{\"type\":\"string\",\"__example__\":\"Sarah Johnson\"},\"job_title\":{\"type\":\"string\",\"__example__\":\"CTO\"},\"email\":{\"type\":\"string\",\"__example__\":\"sarah@techcorp.com\"}},\"layout\":{\"type\":\"SingleColumnLayout\",\"children\":[{\"type\":\"TextHeading\",\"text\":\"What are your main use cases?\"},{\"type\":\"TextBody\",\"text\":\"Select all that apply. This helps us tailor the demo to your needs.\"},{\"type\":\"Form\",\"name\":\"usecase_form\",\"children\":[{\"type\":\"CheckboxGroup\",\"name\":\"use_cases\",\"label\":\"Primary Use Cases\",\"required\":true,\"data-source\":[{\"id\":\"marketing\",\"title\":\"Marketing & Campaigns\",\"description\":\"Promotional messaging, drip campaigns\"},{\"id\":\"transactional\",\"title\":\"Transactional Messages\",\"description\":\"Order updates, confirmations, receipts\"},{\"id\":\"support\",\"title\":\"Customer Support\",\"description\":\"Service tickets, FAQs, chatbot\"},{\"id\":\"notifications\",\"title\":\"Notifications & Alerts\",\"description\":\"Reminders, status updates, alerts\"},{\"id\":\"authentication\",\"title\":\"Authentication\",\"description\":\"OTP, 2FA, login verification\"},{\"id\":\"conversational\",\"title\":\"Conversational Commerce\",\"description\":\"In-chat shopping, bookings, payments\"}]},{\"type\":\"Dropdown\",\"name\":\"monthly_volume\",\"label\":\"Expected Monthly Message Volume\",\"required\":true,\"data-source\":[{\"id\":\"0-10k\",\"title\":\"0 - 10,000\"},{\"id\":\"10k-50k\",\"title\":\"10,000 - 50,000\"},{\"id\":\"50k-100k\",\"title\":\"50,000 - 100,000\"},{\"id\":\"100k-500k\",\"title\":\"100,000 - 500,000\"},{\"id\":\"500k+\",\"title\":\"500,000+\"}]},{\"type\":\"TextArea\",\"name\":\"additional_requirements\",\"label\":\"Additional Requirements\",\"required\":false,\"max-length\":400,\"helper-text\":\"Any specific features or integrations you need?\"},{\"type\":\"Footer\",\"label\":\"Continue\",\"on-click-action\":{\"name\":\"navigate\",\"next\":{\"type\":\"screen\",\"name\":\"SCHEDULE_DEMO\"},\"payload\":{\"interested_channels\":\"${data.interested_channels}\",\"implementation_timeline\":\"${data.implementation_timeline}\",\"company_name\":\"${data.company_name}\",\"website\":\"${data.website}\",\"company_size\":\"${data.company_size}\",\"industry\":\"${data.industry}\",\"contact_name\":\"${data.contact_name}\",\"job_title\":\"${data.job_title}\",\"email\":\"${data.email}\",\"use_cases\":\"${form.use_cases}\",\"monthly_volume\":\"${form.monthly_volume}\",\"additional_requirements\":\"${form.additional_requirements}\"}}}]}]}},{\"id\":\"SCHEDULE_DEMO\",\"title\":\"Schedule Demo\",\"terminal\":true,\"data\":{\"interested_channels\":{\"type\":\"array\",\"items\":{\"type\":\"string\"},\"__example__\":[\"whatsapp\",\"sms\"]},\"implementation_timeline\":{\"type\":\"string\",\"__example__\":\"immediate\"},\"company_name\":{\"type\":\"string\",\"__example__\":\"TechCorp\"},\"website\":{\"type\":\"string\",\"__example__\":\"techcorp.com\"},\"company_size\":{\"type\":\"string\",\"__example__\":\"51-200\"},\"industry\":{\"type\":\"string\",\"__example__\":\"saas\"},\"contact_name\":{\"type\":\"string\",\"__example__\":\"Sarah Johnson\"},\"job_title\":{\"type\":\"string\",\"__example__\":\"CTO\"},\"email\":{\"type\":\"string\",\"__example__\":\"sarah@techcorp.com\"},\"use_cases\":{\"type\":\"array\",\"items\":{\"type\":\"string\"},\"__example__\":[\"marketing\",\"transactional\",\"support\"]},\"monthly_volume\":{\"type\":\"string\",\"__example__\":\"50k-100k\"},\"additional_requirements\":{\"type\":\"string\",\"__example__\":\"Need Salesforce integration\"}},\"layout\":{\"type\":\"SingleColumnLayout\",\"children\":[{\"type\":\"TextHeading\",\"text\":\"Book Your Personalized Demo\"},{\"type\":\"TextBody\",\"text\":\"Choose a time that works for you. Our solution engineer will prepare a custom demo based on your use cases.\"},{\"type\":\"Form\",\"name\":\"demo_form\",\"children\":[{\"type\":\"DatePicker\",\"name\":\"demo_date\",\"label\":\"Preferred Date\",\"required\":true,\"min-date\":\"2026-02-10\",\"max-date\":\"2026-03-10\",\"helper-text\":\"We'll confirm availability within 1 hour\"},{\"type\":\"Dropdown\",\"name\":\"demo_time\",\"label\":\"Preferred Time (Pacific Time)\",\"required\":true,\"data-source\":[{\"id\":\"0900\",\"title\":\"9:00 AM\"},{\"id\":\"1000\",\"title\":\"10:00 AM\"},{\"id\":\"1100\",\"title\":\"11:00 AM\"},{\"id\":\"1300\",\"title\":\"1:00 PM\"},{\"id\":\"1400\",\"title\":\"2:00 PM\"},{\"id\":\"1500\",\"title\":\"3:00 PM\"},{\"id\":\"1600\",\"title\":\"4:00 PM\"}]},{\"type\":\"Dropdown\",\"name\":\"demo_duration\",\"label\":\"Preferred Duration\",\"required\":true,\"data-source\":[{\"id\":\"30\",\"title\":\"30 minutes\"},{\"id\":\"60\",\"title\":\"1 hour\"}]},{\"type\":\"CheckboxGroup\",\"name\":\"demo_topics\",\"label\":\"Focus Areas for Demo\",\"required\":false,\"data-source\":[{\"id\":\"api_overview\",\"title\":\"API Overview & Capabilities\"},{\"id\":\"integration\",\"title\":\"Integration & Technical Setup\"},{\"id\":\"pricing\",\"title\":\"Pricing & ROI\"},{\"id\":\"compliance\",\"title\":\"Compliance & Security\"}]},{\"type\":\"RadioButtonsGroup\",\"name\":\"how_heard\",\"label\":\"How did you hear about us?\",\"required\":false,\"data-source\":[{\"id\":\"search\",\"title\":\"Google Search\"},{\"id\":\"referral\",\"title\":\"Referral\"},{\"id\":\"event\",\"title\":\"Event/Conference\"},{\"id\":\"social\",\"title\":\"Social Media\"},{\"id\":\"other\",\"title\":\"Other\"}]},{\"type\":\"Footer\",\"label\":\"Book Demo\",\"on-click-action\":{\"name\":\"complete\",\"payload\":{\"interested_channels\":\"${data.interested_channels}\",\"implementation_timeline\":\"${data.implementation_timeline}\",\"company_name\":\"${data.company_name}\",\"website\":\"${data.website}\",\"company_size\":\"${data.company_size}\",\"industry\":\"${data.industry}\",\"contact_name\":\"${data.contact_name}\",\"job_title\":\"${data.job_title}\",\"email\":\"${data.email}\",\"use_cases\":\"${data.use_cases}\",\"monthly_volume\":\"${data.monthly_volume}\",\"additional_requirements\":\"${data.additional_requirements}\",\"demo_date\":\"${form.demo_date}\",\"demo_time\":\"${form.demo_time}\",\"demo_duration\":\"${form.demo_duration}\",\"demo_topics\":\"${form.demo_topics}\",\"how_heard\":\"${form.how_heard}\"}}}]}]}}]}"
}
```

**Response:**

```json
{
  "id": "cpaas_lead_gen_flow_999",
  "success": true
}
```

</details>

### Step 2: Publish the Flow

<details>
<summary>Click to view **Publish Flow Request**</summary>

**Endpoint:** `POST https://chatapps.8x8.com/config/v1/channels/whatsapp/{channelId}/flows/cpaas_lead_gen_flow_999/publish`

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
        "text": "Explore 8x8 Connect CPaaS"
      },
      "body": {
        "text": "Build powerful communication experiences with enterprise-grade WhatsApp, SMS, Voice, and Verification APIs. Trusted by thousands of businesses worldwide.\n\nBook a personalized demo to see how we can power your use case."
      },
      "action": {
        "parameters": {
          "flowId": "cpaas_lead_gen_flow_999",
          "flowCta": "Get Started"
        }
      },
      "footer": {
        "text": "Free demo • No commitment"
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
    "umid": "lead-xyz-999",
    "subAccountId": "your-subaccount-id",
    "timestamp": "2026-02-10T16:00:00.000Z",
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
          "responseJson": "{\"interested_channels\":[\"whatsapp\",\"sms\",\"verify\"],\"implementation_timeline\":\"immediate\",\"company_name\":\"RetailCo\",\"website\":\"retailco.com\",\"company_size\":\"201-500\",\"industry\":\"ecommerce\",\"contact_name\":\"Michael Chen\",\"job_title\":\"VP of Engineering\",\"email\":\"michael@retailco.com\",\"use_cases\":[\"transactional\",\"notifications\",\"authentication\"],\"monthly_volume\":\"100k-500k\",\"additional_requirements\":\"Need Shopify integration and multi-region support\",\"demo_date\":\"2026-02-14\",\"demo_time\":\"1400\",\"demo_duration\":\"60\",\"demo_topics\":[\"api_overview\",\"integration\",\"compliance\"],\"how_heard\":\"referral\",\"flow_token\":\"<TOKEN>\"}"
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

// Calculate lead score based on qualification criteria
const leadScore = calculateLeadScore({
  companySize: data.company_size,
  monthlyVolume: data.monthly_volume,
  implementationTimeline: data.implementation_timeline,
  industry: data.industry,
  useCaseCount: data.use_cases.length
});

// Determine lead quality tier
let leadTier = 'cold';
if (leadScore >= 80) leadTier = 'hot';
else if (leadScore >= 60) leadTier = 'warm';

// Assign to sales rep based on territory, company size, and industry
const assignedSalesRep = await assignLeadToSalesRep({
  companySize: data.company_size,
  industry: data.industry,
  monthlyVolume: data.monthly_volume,
  leadScore: leadScore
});

// Create lead in CRM (Salesforce, HubSpot, etc.)
const crmLead = await createCRMLead({
  // Contact Info
  firstName: data.contact_name.split(' ')[0],
  lastName: data.contact_name.split(' ').slice(1).join(' '),
  email: data.email,
  phone: payload.user.msisdn,
  jobTitle: data.job_title,

  // Company Info
  companyName: data.company_name,
  website: data.website,
  companySize: data.company_size,
  industry: data.industry,

  // Qualification Data
  interestedChannels: data.interested_channels,
  useCases: data.use_cases,
  monthlyVolume: data.monthly_volume,
  implementationTimeline: data.implementation_timeline,
  additionalRequirements: data.additional_requirements,

  // Demo Preferences
  requestedDemoDate: data.demo_date,
  requestedDemoTime: data.demo_time,
  demoDuration: data.demo_duration,
  demoTopics: data.demo_topics || [],

  // Lead Metadata
  leadSource: 'whatsapp_flow',
  leadTier: leadTier,
  leadScore: leadScore,
  howHeard: data.how_heard,
  assignedTo: assignedSalesRep.id,
  createdAt: new Date()
});

// Check demo slot availability
const demoAvailable = await checkDemoSlotAvailability({
  salesRepId: assignedSalesRep.id,
  requestedDate: data.demo_date,
  requestedTime: data.demo_time,
  duration: data.demo_duration
});

let demoConfirmed = false;
let confirmedDateTime = null;

if (demoAvailable) {
  // Book the demo
  const demo = await bookDemo({
    leadId: crmLead.id,
    salesRepId: assignedSalesRep.id,
    date: data.demo_date,
    time: data.demo_time,
    duration: data.demo_duration,
    topics: data.demo_topics,
    customerEmail: data.email,
    customerPhone: payload.user.msisdn,
    companyName: data.company_name,
    useCases: data.use_cases,
    requirements: data.additional_requirements
  });

  demoConfirmed = true;
  confirmedDateTime = `${data.demo_date} at ${formatTime(data.demo_time)} PT`;

  // Send calendar invite
  await sendCalendarInvite({
    to: data.email,
    subject: `8x8 Connect Demo - ${data.company_name}`,
    date: data.demo_date,
    time: data.demo_time,
    duration: data.demo_duration,
    attendees: [data.email, assignedSalesRep.email],
    meetingLink: demo.videoCallLink,
    description: `Personalized demo of 8x8 Connect CPaaS\n\nFocus areas:\n${data.use_cases.join(', ')}\n\nYour Solution Engineer: ${assignedSalesRep.name}`
  });
} else {
  // Requested time not available - sales rep will reach out
  await notifySalesRepForManualScheduling({
    salesRepId: assignedSalesRep.id,
    leadId: crmLead.id,
    requestedDate: data.demo_date,
    requestedTime: data.demo_time,
    contactName: data.contact_name,
    contactEmail: data.email,
    contactPhone: payload.user.msisdn
  });
}

// Send confirmation message to lead
let confirmationMsg = `Thank you, ${data.contact_name}! 🎉\n\n`;

if (demoConfirmed) {
  confirmationMsg += `Your demo is confirmed for ${confirmedDateTime}.\n\n`;
  confirmationMsg += `📧 Calendar invite sent to ${data.email}\n`;
  confirmationMsg += `👤 Your Solution Engineer: ${assignedSalesRep.name}\n\n`;
  confirmationMsg += `Demo Focus:\n`;
  confirmationMsg += data.use_cases.map(uc => `• ${formatUseCase(uc)}`).join('\n');
  confirmationMsg += `\n\nWe'll prepare a custom demo showcasing how 8x8 Connect can power your ${data.industry} use cases with ${data.monthly_volume} monthly messages.`;
} else {
  confirmationMsg += `We've received your demo request for ${data.demo_date}.\n\n`;
  confirmationMsg += `${assignedSalesRep.name} from our sales team will contact you within 1 hour to confirm the best time.\n\n`;
  confirmationMsg += `📧 ${assignedSalesRep.email}\n`;
  confirmationMsg += `📞 ${assignedSalesRep.phone}`;
}

confirmationMsg += `\n\nIn the meantime, explore our documentation: developer.8x8.com\n\nQuestions? Reply here anytime.`;

await sendMessage(payload.user.msisdn, {
  type: 'text',
  content: { text: confirmationMsg }
});

// Send internal notification to sales rep
await notifySalesRep({
  salesRepId: assignedSalesRep.id,
  notification: {
    type: 'new_hot_lead',
    leadId: crmLead.id,
    leadTier: leadTier,
    leadScore: leadScore,
    companyName: data.company_name,
    contactName: data.contact_name,
    interestedChannels: data.interested_channels,
    implementationTimeline: data.implementation_timeline,
    monthlyVolume: data.monthly_volume,
    demoScheduled: demoConfirmed,
    demoDateTime: confirmedDateTime,
    priority: leadScore >= 80 ? 'high' : 'medium'
  }
});

// Trigger marketing automation workflows
await triggerMarketingAutomation({
  leadId: crmLead.id,
  email: data.email,
  workflows: [
    { type: 'welcome_series', delay: '1_hour' },
    { type: 'technical_resources', condition: 'if_demo_scheduled' },
    { type: 'case_studies', filter: `industry_${data.industry}` }
  ]
});

// Log for sales analytics
await logLeadCapture({
  leadId: crmLead.id,
  source: 'whatsapp_flow',
  leadTier: leadTier,
  leadScore: leadScore,
  companySize: data.company_size,
  industry: data.industry,
  interestedChannels: data.interested_channels,
  useCases: data.use_cases,
  monthlyVolume: data.monthly_volume,
  implementationTimeline: data.implementation_timeline,
  demoScheduled: demoConfirmed,
  assignedSalesRep: assignedSalesRep.id,
  createdAt: new Date()
});
```

**Helper Functions:**

```javascript
function calculateLeadScore(criteria) {
  let score = 0;

  // Company size scoring
  const sizeScores = {
    '1-10': 10,
    '11-50': 20,
    '51-200': 40,
    '201-500': 60,
    '500+': 80
  };
  score += sizeScores[criteria.companySize] || 0;

  // Volume scoring
  const volumeScores = {
    '0-10k': 5,
    '10k-50k': 15,
    '50k-100k': 25,
    '100k-500k': 40,
    '500k+': 50
  };
  score += volumeScores[criteria.monthlyVolume] || 0;

  // Timeline urgency
  const timelineScores = {
    'immediate': 30,
    'short_term': 20,
    'long_term': 10,
    'exploring': 5
  };
  score += timelineScores[criteria.implementationTimeline] || 0;

  // Multiple use cases indicate serious interest
  score += Math.min(criteria.useCaseCount * 5, 20);

  return Math.min(score, 100);
}

function formatUseCase(useCaseId) {
  const labels = {
    'marketing': 'Marketing & Campaigns',
    'transactional': 'Transactional Messages',
    'support': 'Customer Support',
    'notifications': 'Notifications & Alerts',
    'authentication': 'Authentication',
    'conversational': 'Conversational Commerce'
  };
  return labels[useCaseId] || useCaseId;
}

function formatTime(timeSlot) {
  const hour = parseInt(timeSlot.substring(0, 2));
  const ampm = hour >= 12 ? 'PM' : 'AM';
  const displayHour = hour > 12 ? hour - 12 : hour;
  return `${displayHour}:00 ${ampm}`;
}
```

**Best Practices:**
- **Lead Scoring:** Automatically qualify leads based on company size, volume, and timeline
- **Smart Routing:** Assign leads to sales reps by territory, industry expertise, or account size
- **Product Showcase:** Use CheckboxGroup to let prospects select multiple areas of interest
- **Qualification Data:** Collect company size, industry, and use cases to personalize demos
- **Demo Automation:** Integrate with calendaring systems (Calendly, HubSpot Meetings) for instant booking
- **Multi-Channel Follow-up:** Send confirmation via WhatsApp + email calendar invite
- **CRM Integration:** Sync all lead data to Salesforce, HubSpot, or Pipedrive in real-time
- **Marketing Automation:** Trigger nurture campaigns based on lead tier and interests
- **Analytics:** Track conversion rates by channel interest, industry, and lead source
- **Speed to Lead:** Notify sales reps immediately for hot leads (score >= 80)
</details>

---

## Related Resources

- **[WhatsApp Flows in 8x8 Connect](./whatsapp-flows-ui-guide.md)** - Complete guide for creating Flows using 8x8 Connect portal
- **[WhatsApp Flows API Reference](./whatsapp-flows-api.md)** - API documentation for programmatic Flow management
- **[All Flow Examples](./whatsapp-flows-examples.md)** - Browse examples from other industries
