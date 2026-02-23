---
sidebar_label: 'Healthcare'
---

# Healthcare Flow Examples

## Appointment Scheduling

![Appointment Scheduling Flow](./images/appointment-scheduling.webp)

**Business Value:** Reduce phone volume by 50%, eliminate scheduling errors with structured data collection, improve patient intake efficiency, and enable 24/7 appointment booking.

**Scenario:** A patient needs to schedule a medical appointment. Instead of waiting on hold or navigating complex web forms, they complete a WhatsApp Flow that collects appointment type, provider preference, insurance information, and available time slots. The system validates insurance eligibility and confirms appointments in real-time.

**Tools Used:** Flow Configuration API + Messaging API + EMR/Scheduling system integration

---

### Step 1: Create the Flow

<details>
<summary>Click to view **Flow JSON Definition**</summary>

This Flow collects appointment details, patient information, and insurance details across 3 screens.

**Endpoint:** `POST https://chatapps.8x8.com/config/v1/channels/whatsapp/{channelId}/flows`

```json
{
  "name": "Medical Appointment Scheduling",
  "categories": ["OTHER"],
  "flowJson": "{\"version\":\"7.2\",\"routing_model\":{\"APPOINTMENT_TYPE\":[\"PATIENT_INFO\"],\"PATIENT_INFO\":[\"SCHEDULE\"],\"SCHEDULE\":[]},\"screens\":[{\"id\":\"APPOINTMENT_TYPE\",\"title\":\"Schedule Appointment\",\"layout\":{\"type\":\"SingleColumnLayout\",\"children\":[{\"type\":\"TextHeading\",\"text\":\"What brings you in?\"},{\"type\":\"TextBody\",\"text\":\"Select the type of appointment you need. We'll match you with the right provider.\"},{\"type\":\"Form\",\"name\":\"appointment_form\",\"children\":[{\"type\":\"RadioButtonsGroup\",\"name\":\"appointment_type\",\"label\":\"Appointment Type\",\"required\":true,\"data-source\":[{\"id\":\"annual_checkup\",\"title\":\"Annual Checkup/Physical\"},{\"id\":\"sick_visit\",\"title\":\"Sick Visit\"},{\"id\":\"follow_up\",\"title\":\"Follow-up Appointment\"},{\"id\":\"vaccination\",\"title\":\"Vaccination\"},{\"id\":\"specialist\",\"title\":\"Specialist Consultation\"}]},{\"type\":\"Dropdown\",\"name\":\"provider_preference\",\"label\":\"Provider Preference\",\"required\":false,\"data-source\":[{\"id\":\"any\",\"title\":\"Any Available Provider\"},{\"id\":\"dr_smith\",\"title\":\"Dr. Sarah Smith (Family Medicine)\"},{\"id\":\"dr_johnson\",\"title\":\"Dr. Michael Johnson (Internal Medicine)\"},{\"id\":\"dr_patel\",\"title\":\"Dr. Priya Patel (Pediatrics)\"}]},{\"type\":\"RadioButtonsGroup\",\"name\":\"visit_reason_category\",\"label\":\"Reason for Visit\",\"required\":true,\"data-source\":[{\"id\":\"preventive\",\"title\":\"Preventive Care\"},{\"id\":\"illness\",\"title\":\"Illness/Symptoms\"},{\"id\":\"chronic\",\"title\":\"Chronic Condition Management\"},{\"id\":\"other\",\"title\":\"Other\"}]},{\"type\":\"TextArea\",\"name\":\"visit_notes\",\"label\":\"Additional Details\",\"required\":false,\"max-length\":300,\"helper-text\":\"Briefly describe your symptoms or reason (optional)\"},{\"type\":\"Footer\",\"label\":\"Continue\",\"on-click-action\":{\"name\":\"navigate\",\"next\":{\"type\":\"screen\",\"name\":\"PATIENT_INFO\"},\"payload\":{\"appointment_type\":\"${form.appointment_type}\",\"provider_preference\":\"${form.provider_preference}\",\"visit_reason_category\":\"${form.visit_reason_category}\",\"visit_notes\":\"${form.visit_notes}\"}}}]}]}},{\"id\":\"PATIENT_INFO\",\"title\":\"Patient Information\",\"data\":{\"appointment_type\":{\"type\":\"string\",\"__example__\":\"sick_visit\"},\"provider_preference\":{\"type\":\"string\",\"__example__\":\"any\"},\"visit_reason_category\":{\"type\":\"string\",\"__example__\":\"illness\"},\"visit_notes\":{\"type\":\"string\",\"__example__\":\"Persistent cough for 3 days\"}},\"layout\":{\"type\":\"SingleColumnLayout\",\"children\":[{\"type\":\"TextHeading\",\"text\":\"Patient Details\"},{\"type\":\"Form\",\"name\":\"patient_form\",\"children\":[{\"type\":\"TextInput\",\"name\":\"patient_first_name\",\"label\":\"First Name\",\"input-type\":\"text\",\"required\":true},{\"type\":\"TextInput\",\"name\":\"patient_last_name\",\"label\":\"Last Name\",\"input-type\":\"text\",\"required\":true},{\"type\":\"DatePicker\",\"name\":\"date_of_birth\",\"label\":\"Date of Birth\",\"required\":true,\"min-date\":\"1920-01-01\",\"max-date\":\"2026-02-10\"},{\"type\":\"TextInput\",\"name\":\"patient_email\",\"label\":\"Email\",\"input-type\":\"email\",\"required\":true,\"helper-text\":\"For appointment reminders\"},{\"type\":\"RadioButtonsGroup\",\"name\":\"insurance_status\",\"label\":\"Insurance\",\"required\":true,\"data-source\":[{\"id\":\"insured\",\"title\":\"I have insurance\"},{\"id\":\"self_pay\",\"title\":\"Self-pay/No insurance\"}]},{\"type\":\"TextInput\",\"name\":\"insurance_provider\",\"label\":\"Insurance Provider\",\"input-type\":\"text\",\"required\":false,\"helper-text\":\"e.g., Blue Cross, Aetna, UnitedHealthcare\"},{\"type\":\"TextInput\",\"name\":\"member_id\",\"label\":\"Member ID\",\"input-type\":\"text\",\"required\":false},{\"type\":\"Footer\",\"label\":\"Continue\",\"on-click-action\":{\"name\":\"navigate\",\"next\":{\"type\":\"screen\",\"name\":\"SCHEDULE\"},\"payload\":{\"appointment_type\":\"${data.appointment_type}\",\"provider_preference\":\"${data.provider_preference}\",\"visit_reason_category\":\"${data.visit_reason_category}\",\"visit_notes\":\"${data.visit_notes}\",\"patient_first_name\":\"${form.patient_first_name}\",\"patient_last_name\":\"${form.patient_last_name}\",\"date_of_birth\":\"${form.date_of_birth}\",\"patient_email\":\"${form.patient_email}\",\"insurance_status\":\"${form.insurance_status}\",\"insurance_provider\":\"${form.insurance_provider}\",\"member_id\":\"${form.member_id}\"}}}]}]}},{\"id\":\"SCHEDULE\",\"title\":\"Select Time\",\"terminal\":true,\"data\":{\"appointment_type\":{\"type\":\"string\",\"__example__\":\"sick_visit\"},\"provider_preference\":{\"type\":\"string\",\"__example__\":\"any\"},\"visit_reason_category\":{\"type\":\"string\",\"__example__\":\"illness\"},\"visit_notes\":{\"type\":\"string\",\"__example__\":\"Persistent cough for 3 days\"},\"patient_first_name\":{\"type\":\"string\",\"__example__\":\"John\"},\"patient_last_name\":{\"type\":\"string\",\"__example__\":\"Doe\"},\"date_of_birth\":{\"type\":\"string\",\"__example__\":\"1985-05-15\"},\"patient_email\":{\"type\":\"string\",\"__example__\":\"john@example.com\"},\"insurance_status\":{\"type\":\"string\",\"__example__\":\"insured\"},\"insurance_provider\":{\"type\":\"string\",\"__example__\":\"Blue Cross\"},\"member_id\":{\"type\":\"string\",\"__example__\":\"BC123456789\"}},\"layout\":{\"type\":\"SingleColumnLayout\",\"children\":[{\"type\":\"TextHeading\",\"text\":\"Choose Your Appointment Time\"},{\"type\":\"Form\",\"name\":\"schedule_form\",\"children\":[{\"type\":\"DatePicker\",\"name\":\"appointment_date\",\"label\":\"Preferred Date\",\"required\":true,\"min-date\":\"2026-02-10\",\"max-date\":\"2026-04-10\",\"helper-text\":\"We have appointments available within 2 weeks\"},{\"type\":\"Dropdown\",\"name\":\"time_slot\",\"label\":\"Time Slot\",\"required\":true,\"data-source\":[{\"id\":\"0800\",\"title\":\"8:00 AM\"},{\"id\":\"0900\",\"title\":\"9:00 AM\"},{\"id\":\"1000\",\"title\":\"10:00 AM\"},{\"id\":\"1100\",\"title\":\"11:00 AM\"},{\"id\":\"1300\",\"title\":\"1:00 PM\"},{\"id\":\"1400\",\"title\":\"2:00 PM\"},{\"id\":\"1500\",\"title\":\"3:00 PM\"},{\"id\":\"1600\",\"title\":\"4:00 PM\"}]},{\"type\":\"RadioButtonsGroup\",\"name\":\"visit_type\",\"label\":\"Visit Type\",\"required\":true,\"data-source\":[{\"id\":\"in_person\",\"title\":\"In-Person Visit\"},{\"id\":\"telehealth\",\"title\":\"Telehealth (Video Call)\"}]},{\"type\":\"CheckboxGroup\",\"name\":\"contact_preferences\",\"label\":\"Reminder Preferences\",\"required\":false,\"data-source\":[{\"id\":\"whatsapp\",\"title\":\"WhatsApp\",\"enabled\":true},{\"id\":\"email\",\"title\":\"Email\"},{\"id\":\"sms\",\"title\":\"SMS\"}]},{\"type\":\"Footer\",\"label\":\"Book Appointment\",\"on-click-action\":{\"name\":\"complete\",\"payload\":{\"appointment_type\":\"${data.appointment_type}\",\"provider_preference\":\"${data.provider_preference}\",\"visit_reason_category\":\"${data.visit_reason_category}\",\"visit_notes\":\"${data.visit_notes}\",\"patient_first_name\":\"${data.patient_first_name}\",\"patient_last_name\":\"${data.patient_last_name}\",\"date_of_birth\":\"${data.date_of_birth}\",\"patient_email\":\"${data.patient_email}\",\"insurance_status\":\"${data.insurance_status}\",\"insurance_provider\":\"${data.insurance_provider}\",\"member_id\":\"${data.member_id}\",\"appointment_date\":\"${form.appointment_date}\",\"time_slot\":\"${form.time_slot}\",\"visit_type\":\"${form.visit_type}\",\"contact_preferences\":\"${form.contact_preferences}\"}}}]}]}}]}"
}
```

**Response:**

```json
{
  "id": "healthcare_appt_flow_789",
  "success": true
}
```

</details>

### Step 2: Publish the Flow

<details>
<summary>Click to view **Publish Flow Request**</summary>

**Endpoint:** `POST https://chatapps.8x8.com/config/v1/channels/whatsapp/{channelId}/flows/healthcare_appt_flow_789/publish`

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
        "text": "Schedule an Appointment"
      },
      "body": {
        "text": "Book your medical appointment in minutes. In-person and telehealth options available. Same-day appointments often available for sick visits."
      },
      "action": {
        "parameters": {
          "flowId": "healthcare_appt_flow_789",
          "flowCta": "Book Now"
        }
      },
      "footer": {
        "text": "Most insurance plans accepted"
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
    "umid": "health-xyz-789",
    "subAccountId": "your-subaccount-id",
    "timestamp": "2026-02-10T14:00:00.000Z",
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
          "responseJson": "{\"appointment_type\":\"sick_visit\",\"provider_preference\":\"dr_smith\",\"visit_reason_category\":\"illness\",\"visit_notes\":\"Persistent cough and fever for 3 days\",\"patient_first_name\":\"Emily\",\"patient_last_name\":\"Chen\",\"date_of_birth\":\"1992-08-22\",\"patient_email\":\"emily.chen@example.com\",\"insurance_status\":\"insured\",\"insurance_provider\":\"Blue Cross Blue Shield\",\"member_id\":\"BCBS987654321\",\"appointment_date\":\"2026-02-12\",\"time_slot\":\"1000\",\"visit_type\":\"in_person\",\"contact_preferences\":[\"whatsapp\",\"email\"],\"flow_token\":\"<TOKEN>\"}"
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

// Check if patient exists in EMR system
let patientRecord = await findPatient({
  firstName: data.patient_first_name,
  lastName: data.patient_last_name,
  dateOfBirth: data.date_of_birth
});

// Create new patient record if doesn't exist
if (!patientRecord) {
  patientRecord = await createPatient({
    firstName: data.patient_first_name,
    lastName: data.patient_last_name,
    dateOfBirth: data.date_of_birth,
    email: data.patient_email,
    phone: payload.user.msisdn,
    insuranceStatus: data.insurance_status,
    insuranceProvider: data.insurance_provider,
    memberId: data.member_id,
    contactPreferences: data.contact_preferences || ['whatsapp'],
    source: 'whatsapp_flow'
  });
}

// Verify insurance eligibility (if applicable)
let insuranceVerified = true;
let copay = 0;

if (data.insurance_status === 'insured' && data.member_id) {
  const insuranceCheck = await verifyInsurance({
    provider: data.insurance_provider,
    memberId: data.member_id,
    serviceType: data.appointment_type,
    patientDOB: data.date_of_birth
  });

  insuranceVerified = insuranceCheck.active;
  copay = insuranceCheck.copay || 0;

  if (!insuranceVerified) {
    await sendMessage(payload.user.msisdn, {
      type: 'text',
      content: {
        text: `Hi ${data.patient_first_name}, we couldn't verify your insurance (${data.insurance_provider} - ${data.member_id}).\n\nPlease call our office at (555) 123-4567 to confirm your coverage before your appointment.\n\nYou can still keep your ${data.appointment_date} at ${data.time_slot} appointment, but payment may be required at check-in.`
      }
    });
  }
}

// Check provider availability
const providerId = data.provider_preference !== 'any'
  ? data.provider_preference
  : await findAvailableProvider({
      appointmentType: data.appointment_type,
      date: data.appointment_date,
      timeSlot: data.time_slot,
      visitType: data.visit_type
    });

const providerAvailable = await checkProviderAvailability({
  providerId: providerId,
  date: data.appointment_date,
  timeSlot: data.time_slot
});

if (!providerAvailable) {
  // Offer alternative times
  const alternativeSlots = await getAvailableSlots({
    providerId: providerId,
    appointmentType: data.appointment_type,
    preferredDate: data.appointment_date,
    visitType: data.visit_type,
    daysAhead: 14
  });

  await sendMessage(payload.user.msisdn, {
    type: 'text',
    content: {
      text: `Hi ${data.patient_first_name}, unfortunately ${data.time_slot} on ${data.appointment_date} is no longer available.\n\nAlternative times:\n${alternativeSlots.slice(0, 5).map(s => `• ${s.date} at ${s.time}`).join('\n')}\n\nWould you like one of these times? Reply with the number.`
    }
  });

  return;
}

// Create appointment in EMR/scheduling system
const appointment = await createAppointment({
  patientId: patientRecord.id,
  providerId: providerId,
  appointmentType: data.appointment_type,
  visitReasonCategory: data.visit_reason_category,
  visitNotes: data.visit_notes,
  scheduledDate: data.appointment_date,
  scheduledTime: data.time_slot,
  visitType: data.visit_type, // in_person or telehealth
  insuranceVerified: insuranceVerified,
  estimatedCopay: copay,
  contactPreferences: data.contact_preferences,
  source: 'whatsapp_flow',
  status: 'confirmed'
});

// Get provider details
const provider = await getProviderDetails(providerId);

// Send confirmation message
const appointmentTime = formatTime(data.time_slot); // "10:00 AM"
let confirmationMsg = `✅ Appointment Confirmed!\n\n`;
confirmationMsg += `Patient: ${data.patient_first_name} ${data.patient_last_name}\n`;
confirmationMsg += `Date: ${data.appointment_date}\n`;
confirmationMsg += `Time: ${appointmentTime}\n`;
confirmationMsg += `Provider: ${provider.name}\n`;
confirmationMsg += `Type: ${data.visit_type === 'in_person' ? 'In-Person Visit' : 'Telehealth (Video)'}\n`;
confirmationMsg += `\nAppointment #${appointment.id}\n\n`;

if (data.visit_type === 'in_person') {
  confirmationMsg += `📍 Location:\nHealthCare Clinic\n123 Medical Center Dr\nSan Jose, CA 95110\n\n`;
  confirmationMsg += `Please arrive 15 minutes early to complete check-in.`;
} else {
  confirmationMsg += `💻 You'll receive a video call link 1 hour before your appointment.`;
}

if (insuranceVerified && copay > 0) {
  confirmationMsg += `\n\nEstimated copay: $${copay}`;
}

confirmationMsg += `\n\nNeed to reschedule or cancel? Reply to this message.`;

await sendMessage(payload.user.msisdn, {
  type: 'text',
  content: { text: confirmationMsg }
});

// Schedule automated reminders
await scheduleReminders({
  appointmentId: appointment.id,
  patientPhone: payload.user.msisdn,
  patientEmail: data.patient_email,
  appointmentDate: data.appointment_date,
  appointmentTime: data.time_slot,
  contactPreferences: data.contact_preferences || ['whatsapp'],
  visitType: data.visit_type,
  reminders: [
    { timing: '24_hours_before', channels: ['whatsapp', 'email'] },
    { timing: '2_hours_before', channels: ['whatsapp'] }
  ]
});

// Send intake forms if first visit
if (!patientRecord.hasCompletedIntake) {
  await sendMessage(payload.user.msisdn, {
    type: 'text',
    content: {
      text: `📋 One more step! Please complete your medical history forms before your visit:\n\n${process.env.INTAKE_FORM_URL}?patient=${patientRecord.id}\n\nThis will save time at check-in.`
    }
  });
}

// Log for analytics
await logAppointmentBooking({
  appointmentType: data.appointment_type,
  visitType: data.visit_type,
  providerId: providerId,
  insuranceStatus: data.insurance_status,
  source: 'whatsapp_flow',
  leadTime: calculateLeadTime(data.appointment_date), // days in advance
  newPatient: !patientRecord.hasCompletedIntake,
  createdAt: new Date()
});
```

**Best Practices:**
- **HIPAA Compliance:** Ensure all patient data is encrypted in transit and at rest
- **Insurance Verification:** Validate coverage in real-time to prevent billing issues
- **Smart Scheduling:** Check provider availability before confirming appointments
- **Patient Identification:** Match patients by name + DOB to avoid duplicate records
- **Intake Forms:** Send pre-visit forms for new patients to streamline check-in
- **Automated Reminders:** Send 24-hour and 2-hour reminders to reduce no-shows
- **Telehealth Setup:** Send video link 1 hour before telehealth appointments with tech check instructions
- **Cancellation Policy:** Clearly communicate 24-hour cancellation requirement
- **Follow-up:** Send post-visit satisfaction survey and care instructions
- **Analytics:** Track no-show rates, appointment types, and booking lead times
</details>

---

## Related Resources

- **[WhatsApp Flows in 8x8 Connect](./whatsapp-flows-ui-guide.md)** - Complete guide for creating Flows using 8x8 Connect portal
- **[WhatsApp Flows API Reference](./whatsapp-flows-api.md)** - API documentation for programmatic Flow management
- **[All Flow Examples](./whatsapp-flows-examples.md)** - Browse examples from other industries
