---
sidebar_label: 'Advanced Capabilities'
---

# Advanced Capabilities

Beyond sending and receiving individual messages, the 8x8 platform enables you to build sophisticated, multi-step customer journeys and rich interactive experiences. This section covers how to use 8x8's tools to create guided conversations that automate common tasks.

## Rich Interactive Experiences

WhatsApp provides native interactive components that enable rich, engaging customer experiences without leaving the chat interface. These interactive elements can be combined to create seamless, guided conversations.

### Interactive Message Types

WhatsApp supports several interactive message types for collecting user input and presenting options:

#### Carousels

Horizontally-scrolling sets of up to 10 cards, each with its own image/video, text, and buttons. Ideal for product discovery, marketing showcases, or presenting multiple options visually.

**Use Cases:**
- Product catalogs
- Service packages
- Featured offers
- Multi-option comparisons

**See:** [Template Message API Library](./template-message-api-library.mdx#carousel-template) for complete carousel implementation.

#### Interactive Lists

Pop-up menus displaying up to 10 selectable items, perfect for structured option selection without cluttering the chat.

**Use Cases:**
- Support menu navigation
- Appointment time selection
- Department routing
- FAQ topic selection

**See:** [Interactive Message API Library](./interactive-message-api-library.mdx) for list implementation examples.

#### Reply Buttons

Quick-reply buttons (up to 3) that users can tap to respond instantly, ideal for simple choices or confirmations.

**Use Cases:**
- Yes/No confirmations
- Quick action triggers
- Simple menu options
- Callback requests

**See:** [Interactive Message API Library](./interactive-message-api-library.mdx) for button examples.

### WhatsApp Flows

WhatsApp Flows take interactive experiences to the next level by enabling **structured form-based data collection** within the WhatsApp conversation. Unlike button or list messages that capture single selections, Flows provide a complete form interface with validation, multi-screen navigation, and complex data structures.

#### What Makes Flows Different

Flows are designed for scenarios requiring **structured, validated multi-field input**:

| Feature | Interactive Buttons/Lists | WhatsApp Flows |
|---------|--------------------------|----------------|
| **Input Method** | Single tap selection | Multi-field forms with text inputs, dropdowns, date pickers, checkboxes |
| **Validation** | None (any button tap is valid) | Built-in validation (required fields, format checking, conditional logic) |
| **Data Collection** | One choice per message | Multiple fields in single submission |
| **User Experience** | Chat-based taps | Native form UI with screens and navigation |
| **Best For** | Quick selections, menus | Data capture, onboarding, complex forms |

#### Key Benefits

- **Native Form Experience:** Professional, mobile-optimized forms inside WhatsApp
- **Built-in Validation:** Ensure data quality before submission reaches your backend
- **Reduced Message Volume:** Collect 10+ data points in one Flow instead of 10+ messages
- **Structured Output:** Receive consistent JSON payloads for easy processing

#### Common Use Cases

- **Product Preference Capture:** Size, style, budget, preferences
- **Appointment Scheduling:** Location, service type, date/time selection
- **Lead Qualification:** Company info, needs assessment, timeline
- **Account Onboarding:** Profile creation, document collection, consent capture
- **Customer Feedback:** Multi-question surveys with ratings and comments
- **Service Requests:** Issue details, category selection, priority level

#### When to Use Flows vs. Buttons/Lists

**Use Flows when you need to:**
- Collect multiple related fields (3+ inputs)
- Validate input format (email, phone, date)
- Guide users through multi-step processes
- Capture both selections AND free-text input
- Ensure data completeness before submission

**Use Buttons/Lists when you need to:**
- Get a single quick selection
- Provide simple menu navigation
- Trigger an action (not collect data)
- Keep conversation flow lightweight

#### Getting Started with Flows

Flows require design, configuration, and integration work:

1. **Design:** Build Flow UI using [Meta's WhatsApp Flows Playground](https://developers.facebook.com/docs/whatsapp/flows/playground/) or JSON editor
2. **Create:** Upload Flow definition via Flow Configuration API
3. **Publish:** Make Flow available for use
4. **Send:** Trigger Flow via Template button or Interactive message
5. **Receive:** Process structured submissions via webhook

**See:** [WhatsApp Flows](./whatsapp-flows.md) for complete documentation on creating, managing, and sending Flows, including API reference and integration patterns.

**See:** [Flow Examples Library](./whatsapp-flows-examples.md) for production-ready implementations across retail, healthcare, financial services, logistics, and more.

### Combining Templates + Interactivity

The most powerful experiences combine business-initiated templates with user-initiated interactive messages. This pattern is the foundation for almost all automated customer journeys.

#### The Template-to-Interactive Pattern

**Step 1: Business Initiates (Template Message)**

You cannot send interactive messages to start a conversation. You **must** send a pre-approved Template Message.

**Example:**

```text
Template (UTILITY): "Your order has shipped!
Would you like to track it or see related products?"
[Button: Track Order] [Button: View Products]
```

**Step 2: User Replies (Service Window Opens)**

The customer taps a button or replies with text. This opens the 24-hour customer service window.

Your webhook receives the `inbound_message_received` event with the user's choice.

**Step 3: Business Responds (Interactive)**

Now you can reply with freeform interactive messages—buttons, lists, or even Flows—without template approval.

**Example:**

```text
Interactive List: "Select a product category:"
- Electronics
- Clothing
- Home & Garden
- Sports Equipment
```

Or trigger a Flow for detailed preference collection.

#### Advanced Pattern: Template → Interactive → Flow

For complex data collection journeys:

1. **Template:** Initiate conversation - "Ready to schedule your appointment?"
2. **Interactive Buttons:** Quick pre-qualification - "New patient or returning?"
3. **Flow:** Detailed data capture - Appointment form with location, date, time, reason

This layered approach balances engagement (quick wins with buttons) and data quality (comprehensive capture with Flows).

**See:** [Scenarios & Tutorials](./scenarios-tutorials.md) for complete end-to-end examples of template-to-interactive patterns.

## Interactive Journeys with 8x8 Automation Builder

While WhatsApp provides native interactive components (buttons, lists, Flows), the **[8x8 Automation Builder](/connect/docs/automation-builder)** orchestrates complete multi-step journeys by combining these components with business logic, external APIs, and conditional branching.

### What is Automation Builder?

A visual, no-code workflow builder that creates **stateful conversational journeys** that react to customer input in real-time.

**Key Difference from Interactive Components:**

| WhatsApp Interactive Components | 8x8 Automation Builder |
|--------------------------------|------------------------|
| Single interaction (one button tap, one Flow submission) | Multi-step workflows with branching logic |
| WhatsApp-native UI (buttons, Flows) | Orchestration layer combining messages, APIs, data |
| Data collection | Data processing + decision-making |

### How They Work Together

Automation Builder **uses** WhatsApp interactive components as building blocks:

1. **Send Interactive Message** → Wait for user selection
2. **Branch on Response** → Different paths based on user choice
3. **Call External API** → Fetch data or perform action
4. **Send Flow** → Collect detailed information
5. **Process Flow Submission** → Store data, trigger workflows
6. **Send Confirmation** → Complete the journey

### Common Use Cases

#### Appointment Booking with API Integration

**Flow:**
1. User sends "book appointment" → Automation triggers
2. Automation sends interactive list → User selects service type
3. Automation calls your API → Fetch available time slots
4. Automation sends Flow → User fills appointment details
5. Flow submitted → Automation calls booking API
6. Automation sends confirmation message

#### Lead Qualification & Routing

**Flow:**
1. User replies to marketing template → Automation triggers
2. Automation sends buttons → "Existing customer?" Yes/No
3. Branch on response:
   - **Yes:** Send login Flow → Route to support
   - **No:** Send qualification Flow → Route to sales
4. Flow submitted → Automation calls CRM API
5. Automation sends personalized next steps

#### Customer Feedback Loop

**Flow:**
1. Order delivered → Automation triggers (time-based)
2. Automation sends template → "Rate your experience"
3. User taps button → Automation sends NPS Flow
4. Flow submitted → Automation analyzes score
5. Branch on score:
   - **High:** Thank you message
   - **Low:** Route to customer success team
6. Store feedback in analytics system

### Key Automation Builder Steps

- **Trigger:** `Inbound Chat Apps` - Start on message received
- **Action:** `ChatApps Message` - Send templates, interactive messages, Flows
- **Action:** `Wait For Reply` - Pause workflow until user responds
- **Action:** `Branch` - Conditional logic based on user input
- **Action:** `HTTP Request` - Call your APIs or third-party services
- **Action:** `Delay` - Time-based actions (send reminder in 24 hours)

### Configuration Example: Appointment Booking

**Scenario:** Customer wants to book an appointment. Automation Builder orchestrates the entire journey.

**Workflow Steps:**

1. **Trigger:** Inbound message containing "book"
2. **Send Interactive List:** "What service do you need?"
   - General Consultation
   - Specialist Visit
   - Follow-up Appointment
3. **Wait For Reply**
4. **HTTP Request:** `POST /api/availability` with selected service
5. **Send Flow:** Appointment booking Flow with available slots
6. **Wait For Flow Submission**
7. **HTTP Request:** `POST /api/bookings` to create appointment
8. **Send Confirmation:** "Appointment confirmed for {date} at {time}"

**See:** [Automation Builder Documentation](/connect/docs/automation-builder) for complete configuration guides and workflow examples.

## Choosing the Right Approach

Use this guide to select the best tool for your use case:

### Use Interactive Buttons/Lists When

- ✅ You need a single quick selection
- ✅ Presenting 2-10 clear options
- ✅ Navigation or menu purposes
- ✅ Simple user actions (yes/no, select topic)

**Example:** "Would you like to track your order or contact support?"

### Use WhatsApp Flows When

- ✅ Collecting multiple related fields (3+ inputs)
- ✅ Data validation is critical (email, phone, dates)
- ✅ Multi-screen guided processes
- ✅ Combining selections with free-text input
- ✅ Structured form submissions needed

**Example:** Account onboarding with name, email, company, preferences, consents

### Use Automation Builder When

- ✅ Multi-step journeys with branching logic
- ✅ External API calls needed (fetch data, create records)
- ✅ Stateful workflows (remember previous answers)
- ✅ Conditional paths based on user input
- ✅ Time-based triggers or delays
- ✅ Orchestrating multiple interactive components

**Example:** Complete appointment booking system with service selection → availability check → scheduling → confirmation → reminder

### Combine All Three When

- ✅ Building complete customer journeys
- ✅ High complexity with multiple decision points
- ✅ Need both quick wins and deep data collection

**Example:** E-commerce post-purchase flow:
1. **Template:** "Your order shipped! Track it?"
2. **Button Reply:** Opens service window
3. **Automation Builder:** Branches based on user journey
4. **Interactive List:** "Need help with: Returns, Support, Feedback"
5. **Flow:** Detailed return request form OR feedback survey
6. **Automation Builder:** Processes submission, calls APIs, sends confirmation

## Next Steps

**Explore Interactive Components:**
- [Interactive Message API Library](./interactive-message-api-library.mdx)
- [Template Message API Library](./template-message-api-library.mdx)

**Implement WhatsApp Flows:**
- [WhatsApp Flows Documentation](./whatsapp-flows.md)
- [Flow Examples Library](./whatsapp-flows-examples.md)

**Build Complete Journeys:**
- [8x8 Automation Builder](/connect/docs/automation-builder)
- [Scenarios & Tutorials](./scenarios-tutorials.md)
- [Vertical Playbooks](./vertical-playbooks.md)
