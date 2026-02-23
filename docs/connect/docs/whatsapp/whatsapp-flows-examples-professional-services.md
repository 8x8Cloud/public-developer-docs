---
sidebar_label: 'Professional Services'
---

# Professional Services Flow Examples

## Service Appointment Booking

![Service Appointment Booking Flow](./images/service-appointment-booking.webp)

**Business Value:** Reduce scheduling phone calls by 60%, capture structured service requests with property details, enable skill-based technician routing, and improve first-time fix rates.

**Scenario:** A customer needs a plumbing, electrical, or HVAC service. Instead of making multiple phone calls, they complete a WhatsApp Flow that collects service type, property details, problem description with photo upload, and preferred appointment times. The system automatically routes to qualified technicians based on service type and availability.

**Tools Used:** Flow Configuration API + Messaging API + Scheduling system integration

---

### Step 1: Create the Flow

<details>
<summary>Click to view **Flow JSON Definition**</summary>

This Flow collects service request details, property information, and appointment preferences across 4 screens.

**Endpoint:** `POST https://chatapps.8x8.com/config/v1/channels/whatsapp/{channelId}/flows`

```json
{
  "name": "Service Appointment Booking",
  "categories": ["OTHER"],
  "flowJson": "{\"version\":\"7.2\",\"routing_model\":{\"SERVICE_TYPE\":[\"PROPERTY_INFO\"],\"PROPERTY_INFO\":[\"PROBLEM_DETAILS\"],\"PROBLEM_DETAILS\":[\"SCHEDULE\"],\"SCHEDULE\":[]},\"screens\":[{\"id\":\"SERVICE_TYPE\",\"title\":\"Service Request\",\"layout\":{\"type\":\"SingleColumnLayout\",\"children\":[{\"type\":\"TextHeading\",\"text\":\"What service do you need?\"},{\"type\":\"TextBody\",\"text\":\"Select the type of service you require. Our technicians are available 7 days a week.\"},{\"type\":\"Form\",\"name\":\"service_form\",\"children\":[{\"type\":\"RadioButtonsGroup\",\"name\":\"service_type\",\"label\":\"Service Type\",\"required\":true,\"data-source\":[{\"id\":\"plumbing\",\"title\":\"Plumbing\"},{\"id\":\"electrical\",\"title\":\"Electrical\"},{\"id\":\"hvac\",\"title\":\"HVAC/Heating\"},{\"id\":\"appliance\",\"title\":\"Appliance Repair\"}]},{\"type\":\"RadioButtonsGroup\",\"name\":\"urgency\",\"label\":\"Urgency Level\",\"required\":true,\"data-source\":[{\"id\":\"emergency\",\"title\":\"Emergency (Same Day)\",\"description\":\"Water leak, no power, no heat\"},{\"id\":\"urgent\",\"title\":\"Urgent (1-2 days)\",\"description\":\"Issue needs quick attention\"},{\"id\":\"standard\",\"title\":\"Standard (3-5 days)\",\"description\":\"Routine maintenance or non-urgent\"}]},{\"type\":\"Footer\",\"label\":\"Continue\",\"on-click-action\":{\"name\":\"navigate\",\"next\":{\"type\":\"screen\",\"name\":\"PROPERTY_INFO\"},\"payload\":{\"service_type\":\"${form.service_type}\",\"urgency\":\"${form.urgency}\"}}}]}]}},{\"id\":\"PROPERTY_INFO\",\"title\":\"Property Details\",\"data\":{\"service_type\":{\"type\":\"string\",\"__example__\":\"plumbing\"},\"urgency\":{\"type\":\"string\",\"__example__\":\"urgent\"}},\"layout\":{\"type\":\"SingleColumnLayout\",\"children\":[{\"type\":\"TextHeading\",\"text\":\"Tell us about your property\"},{\"type\":\"Form\",\"name\":\"property_form\",\"children\":[{\"type\":\"TextInput\",\"name\":\"street_address\",\"label\":\"Street Address\",\"input-type\":\"text\",\"required\":true,\"helper-text\":\"Where should the technician visit?\"},{\"type\":\"TextInput\",\"name\":\"apt_unit\",\"label\":\"Apt/Unit Number\",\"input-type\":\"text\",\"required\":false},{\"type\":\"TextInput\",\"name\":\"city\",\"label\":\"City\",\"input-type\":\"text\",\"required\":true},{\"type\":\"TextInput\",\"name\":\"postal_code\",\"label\":\"ZIP/Postal Code\",\"input-type\":\"text\",\"required\":true},{\"type\":\"RadioButtonsGroup\",\"name\":\"property_type\",\"label\":\"Property Type\",\"required\":true,\"data-source\":[{\"id\":\"residential\",\"title\":\"Residential Home\"},{\"id\":\"apartment\",\"title\":\"Apartment/Condo\"},{\"id\":\"commercial\",\"title\":\"Commercial Property\"}]},{\"type\":\"Footer\",\"label\":\"Continue\",\"on-click-action\":{\"name\":\"navigate\",\"next\":{\"type\":\"screen\",\"name\":\"PROBLEM_DETAILS\"},\"payload\":{\"service_type\":\"${data.service_type}\",\"urgency\":\"${data.urgency}\",\"street_address\":\"${form.street_address}\",\"apt_unit\":\"${form.apt_unit}\",\"city\":\"${form.city}\",\"postal_code\":\"${form.postal_code}\",\"property_type\":\"${form.property_type}\"}}}]}]}},{\"id\":\"PROBLEM_DETAILS\",\"title\":\"Problem Description\",\"data\":{\"service_type\":{\"type\":\"string\",\"__example__\":\"plumbing\"},\"urgency\":{\"type\":\"string\",\"__example__\":\"urgent\"},\"street_address\":{\"type\":\"string\",\"__example__\":\"123 Main St\"},\"apt_unit\":{\"type\":\"string\",\"__example__\":\"4B\"},\"city\":{\"type\":\"string\",\"__example__\":\"San Jose\"},\"postal_code\":{\"type\":\"string\",\"__example__\":\"95110\"},\"property_type\":{\"type\":\"string\",\"__example__\":\"apartment\"}},\"layout\":{\"type\":\"SingleColumnLayout\",\"children\":[{\"type\":\"TextHeading\",\"text\":\"Describe the problem\"},{\"type\":\"TextBody\",\"text\":\"The more details you provide, the better we can prepare.\"},{\"type\":\"Form\",\"name\":\"problem_form\",\"children\":[{\"type\":\"TextArea\",\"name\":\"problem_description\",\"label\":\"What's the issue?\",\"required\":true,\"max-length\":500,\"helper-text\":\"Be specific about symptoms, location, when it started\"},{\"type\":\"PhotoPicker\",\"name\":\"problem_photo\",\"label\":\"Upload Photo (Optional)\",\"description\":\"A photo helps our technicians prepare\",\"required\":false},{\"type\":\"CheckboxGroup\",\"name\":\"access_requirements\",\"label\":\"Special Access Requirements\",\"required\":false,\"data-source\":[{\"id\":\"building_code\",\"title\":\"Building/Gate Code Required\"},{\"id\":\"contact_first\",\"title\":\"Call Before Arrival\"},{\"id\":\"pets\",\"title\":\"Pets On-Site\"}]},{\"type\":\"Footer\",\"label\":\"Continue\",\"on-click-action\":{\"name\":\"navigate\",\"next\":{\"type\":\"screen\",\"name\":\"SCHEDULE\"},\"payload\":{\"service_type\":\"${data.service_type}\",\"urgency\":\"${data.urgency}\",\"street_address\":\"${data.street_address}\",\"apt_unit\":\"${data.apt_unit}\",\"city\":\"${data.city}\",\"postal_code\":\"${data.postal_code}\",\"property_type\":\"${data.property_type}\",\"problem_description\":\"${form.problem_description}\",\"problem_photo\":\"${form.problem_photo}\",\"access_requirements\":\"${form.access_requirements}\"}}}]}]}},{\"id\":\"SCHEDULE\",\"title\":\"Schedule Appointment\",\"terminal\":true,\"data\":{\"service_type\":{\"type\":\"string\",\"__example__\":\"plumbing\"},\"urgency\":{\"type\":\"string\",\"__example__\":\"urgent\"},\"street_address\":{\"type\":\"string\",\"__example__\":\"123 Main St\"},\"apt_unit\":{\"type\":\"string\",\"__example__\":\"4B\"},\"city\":{\"type\":\"string\",\"__example__\":\"San Jose\"},\"postal_code\":{\"type\":\"string\",\"__example__\":\"95110\"},\"property_type\":{\"type\":\"string\",\"__example__\":\"apartment\"},\"problem_description\":{\"type\":\"string\",\"__example__\":\"Kitchen sink dripping constantly\"},\"problem_photo\":{\"type\":\"string\",\"__example__\":\"\"},\"access_requirements\":{\"type\":\"array\",\"items\":{\"type\":\"string\"},\"__example__\":[\"building_code\"]}},\"layout\":{\"type\":\"SingleColumnLayout\",\"children\":[{\"type\":\"TextHeading\",\"text\":\"Preferred Appointment Time\"},{\"type\":\"Form\",\"name\":\"schedule_form\",\"children\":[{\"type\":\"DatePicker\",\"name\":\"preferred_date\",\"label\":\"Preferred Date\",\"required\":true,\"min-date\":\"2026-02-10\",\"max-date\":\"2026-03-10\",\"helper-text\":\"Select your preferred date\"},{\"type\":\"RadioButtonsGroup\",\"name\":\"time_slot\",\"label\":\"Time Preference\",\"required\":true,\"data-source\":[{\"id\":\"morning\",\"title\":\"Morning (8AM-12PM)\"},{\"id\":\"afternoon\",\"title\":\"Afternoon (12PM-4PM)\"},{\"id\":\"evening\",\"title\":\"Evening (4PM-8PM)\"}]},{\"type\":\"TextInput\",\"name\":\"contact_name\",\"label\":\"Contact Name\",\"input-type\":\"text\",\"required\":true},{\"type\":\"TextInput\",\"name\":\"contact_phone\",\"label\":\"Contact Phone\",\"input-type\":\"phone\",\"required\":true},{\"type\":\"TextInput\",\"name\":\"contact_email\",\"label\":\"Email\",\"input-type\":\"email\",\"required\":false,\"helper-text\":\"For appointment confirmation\"},{\"type\":\"Footer\",\"label\":\"Book Appointment\",\"on-click-action\":{\"name\":\"complete\",\"payload\":{\"service_type\":\"${data.service_type}\",\"urgency\":\"${data.urgency}\",\"street_address\":\"${data.street_address}\",\"apt_unit\":\"${data.apt_unit}\",\"city\":\"${data.city}\",\"postal_code\":\"${data.postal_code}\",\"property_type\":\"${data.property_type}\",\"problem_description\":\"${data.problem_description}\",\"problem_photo\":\"${data.problem_photo}\",\"access_requirements\":\"${data.access_requirements}\",\"preferred_date\":\"${form.preferred_date}\",\"time_slot\":\"${form.time_slot}\",\"contact_name\":\"${form.contact_name}\",\"contact_phone\":\"${form.contact_phone}\",\"contact_email\":\"${form.contact_email}\"}}}]}]}}]}"
}
```

**Response:**

```json
{
  "id": "service_booking_flow_456",
  "success": true
}
```

</details>

### Step 2: Publish the Flow

<details>
<summary>Click to view **Publish Flow Request**</summary>

**Endpoint:** `POST https://chatapps.8x8.com/config/v1/channels/whatsapp/{channelId}/flows/service_booking_flow_456/publish`

**Response:** `200 OK` (no response body)
</details>

---

### Step 3: Send the Flow (Interactive Message)

This example uses an Interactive Flow message, sent within the 24-hour service window.

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
        "text": "Book a Service Call"
      },
      "body": {
        "text": "Need plumbing, electrical, or HVAC service? Book a qualified technician in minutes. We're available 7 days a week with same-day emergency service."
      },
      "action": {
        "parameters": {
          "flowId": "service_booking_flow_456",
          "flowCta": "Book Now"
        }
      },
      "footer": {
        "text": "Licensed & Insured Technicians"
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
    "umid": "service-abc-123",
    "subAccountId": "your-subaccount-id",
    "timestamp": "2026-02-10T10:30:00.000Z",
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
          "responseJson": "{\"service_type\":\"plumbing\",\"urgency\":\"emergency\",\"street_address\":\"456 Oak Avenue\",\"apt_unit\":\"2A\",\"city\":\"San Jose\",\"postal_code\":\"95110\",\"property_type\":\"apartment\",\"problem_description\":\"Kitchen sink pipe burst, water leaking heavily\",\"problem_photo\":\"base64_encoded_photo_data\",\"access_requirements\":[\"building_code\",\"contact_first\"],\"preferred_date\":\"2026-02-10\",\"time_slot\":\"morning\",\"contact_name\":\"Maria Garcia\",\"contact_phone\":\"+15559876543\",\"contact_email\":\"maria@example.com\",\"flow_token\":\"<TOKEN>\"}"
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

// Upload problem photo to storage
let problemPhotoUrl = null;
if (data.problem_photo) {
  problemPhotoUrl = await uploadToStorage(data.problem_photo, {
    folder: 'service-requests',
    filename: `${payload.umid}_problem.jpg`
  });
}

// Determine service urgency and SLA
const slaTimes = {
  emergency: 4, // hours
  urgent: 48,   // hours
  standard: 120 // hours (5 days)
};
const slaHours = slaTimes[data.urgency] || 120;

// Check technician availability for requested service type
const availableTechs = await findAvailableTechnicians({
  serviceType: data.service_type,
  postalCode: data.postal_code,
  preferredDate: data.preferred_date,
  timeSlot: data.time_slot,
  urgency: data.urgency
});

if (!availableTechs || availableTechs.length === 0) {
  // No availability - offer alternative times
  const alternativeTimes = await getAlternativeTimeSlots({
    serviceType: data.service_type,
    postalCode: data.postal_code,
    urgency: data.urgency
  });

  await sendMessage(payload.user.msisdn, {
    type: 'text',
    content: {
      text: `Thank you, ${data.contact_name}! Unfortunately we don't have availability for ${data.time_slot} on ${data.preferred_date}.\n\nAlternative times available:\n${alternativeTimes.map(t => `• ${t.date} ${t.slot}`).join('\n')}\n\nOur team will call you within 1 hour to schedule the best time.`
    }
  });

  // Queue for manual scheduling
  await queueForManualScheduling({
    requestData: data,
    photoUrl: problemPhotoUrl,
    customerPhone: payload.user.msisdn,
    alternativeTimes: alternativeTimes
  });

  return;
}

// Assign best-match technician (skill-based routing)
const assignedTech = await assignTechnician({
  technicians: availableTechs,
  serviceType: data.service_type,
  problemDescription: data.problem_description,
  urgency: data.urgency
});

// Create service appointment in scheduling system
const appointment = await createServiceAppointment({
  customerId: payload.user.msisdn,
  technicianId: assignedTech.id,
  serviceType: data.service_type,
  urgency: data.urgency,
  propertyAddress: {
    street: data.street_address,
    aptUnit: data.apt_unit,
    city: data.city,
    postalCode: data.postal_code,
    type: data.property_type
  },
  problemDescription: data.problem_description,
  problemPhotoUrl: problemPhotoUrl,
  accessRequirements: data.access_requirements || [],
  scheduledDate: data.preferred_date,
  timeSlot: data.time_slot,
  contactInfo: {
    name: data.contact_name,
    phone: data.contact_phone,
    email: data.contact_email
  },
  slaDeadline: new Date(Date.now() + slaHours * 60 * 60 * 1000),
  source: 'whatsapp_flow'
});

// Send confirmation to customer
const confirmationMessage = `✅ Appointment Confirmed!\n\nService: ${data.service_type.toUpperCase()}\nDate: ${data.preferred_date}\nTime: ${data.time_slot}\nTechnician: ${assignedTech.name}\n\nAddress: ${data.street_address}${data.apt_unit ? ' ' + data.apt_unit : ''}, ${data.city}\n\nAppointment #${appointment.id}\n\n${assignedTech.name} will arrive during your ${data.time_slot} window. You'll receive a notification 30 minutes before arrival.\n\nQuestions? Reply here anytime.`;

await sendMessage(payload.user.msisdn, {
  type: 'text',
  content: { text: confirmationMessage }
});

// Send appointment details to technician
await notifyTechnician(assignedTech.id, {
  appointmentId: appointment.id,
  serviceType: data.service_type,
  urgency: data.urgency,
  address: `${data.street_address}${data.apt_unit ? ' ' + data.apt_unit : ''}, ${data.city}`,
  problemDescription: data.problem_description,
  problemPhoto: problemPhotoUrl,
  accessNotes: data.access_requirements,
  customerContact: data.contact_phone,
  scheduledTime: `${data.preferred_date} ${data.time_slot}`
});

// Log for analytics
await logServiceRequest({
  serviceType: data.service_type,
  urgency: data.urgency,
  propertyType: data.property_type,
  postalCode: data.postal_code,
  source: 'whatsapp_flow',
  assignedTechId: assignedTech.id,
  createdAt: new Date()
});
```

**Best Practices:**
- **Skill-Based Routing:** Match technicians to service type (plumber, electrician, HVAC specialist)
- **Geographic Optimization:** Route to nearest available technician to reduce travel time
- **Photo Upload:** Request problem photos to help technicians prepare proper tools/parts
- **Access Requirements:** Collect building codes, parking info, pet warnings upfront
- **SLA Tracking:** Set and monitor response time commitments based on urgency
- **Proactive Updates:** Send "technician on the way" notifications 30 mins before arrival
- **First-Time Fix Rate:** Use problem descriptions and photos to bring right parts
- **Follow-up:** Send satisfaction survey 24 hours after service completion
</details>

---

## Related Resources

- **[WhatsApp Flows in 8x8 Connect](./whatsapp-flows-ui-guide.md)** - Complete guide for creating Flows using 8x8 Connect portal
- **[WhatsApp Flows API Reference](./whatsapp-flows-api.md)** - API documentation for programmatic Flow management
- **[All Flow Examples](./whatsapp-flows-examples.md)** - Browse examples from other industries
