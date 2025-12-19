---
sidebar_label: 'Advanced Capabilities'
---

# Advanced Capabilities

Beyond sending and receiving individual messages, the 8x8 platform enables you to build sophisticated, multi-step customer journeys and rich interactive experiences. This section covers how to use 8x8's tools to create guided conversations that automate common tasks.

## Interactive Journeys with 8x8 Automation Builder

While WhatsApp offers a feature called "WhatsApp Flows," you can build powerful, custom interactive journeys today using the **[8x8 Automation Builder](/connect/docs/automation-builder)** in the 8x8 Connect portal.

### Overview & Use Cases

The Automation Builder is a visual, no-code tool that allows you to design stateful conversations that react to customer input. Instead of just sending a single message, you can create a complete, automated workflow.

**Common use cases include:**

- **Appointment Booking:** Guide a user through selecting a service, finding an available time, and confirming a booking, all within WhatsApp.

- **Onboarding Flows:** Welcome a new user, ask for their preferences (e.g., "What topics are you interested in?"), and save their answers.

- **Surveys & Feedback:** Create multi-step surveys to capture customer satisfaction after a purchase or support interaction.

- **Automated Triage:** Ask a user a series of diagnostic questions ("Are you an existing customer?", "What product is this about?") before routing them to the correct agent or department.

### Scenario Example: Appointment Booking Bot

A powerful example is the "WhatsApp + Google Calendar Chat Bot" workflow. This demonstrates how to connect WhatsApp to an external system (your server) to perform complex tasks.

The flow for this scenario is as follows:

1. **Trigger:** A customer sends a keyword like "book appointment" to your WhatsApp number. This starts the workflow in the **[Automation Builder](/connect/docs/automation-builder)**.

2. **Send Menu:** The automation replies with an **Interactive Message** (a list or buttons) asking the user to select a service.

3. **Wait for Reply:** The automation pauses and waits for the user's selection.

4. **Call API (HTTP Request):** Once the user replies, the automation uses the **HTTP Request** step to send the user's choice to your backend server.

5. **Fetch Data:** Your server logic checks Google Calendar for available time slots and returns them to the automation as a JSON response.

6. **Send Time Slots:** The automation parses the JSON and sends a new interactive list message to the user with the available time slots (e.g., "1. Monday 9 AM", "2. Monday 10 AM").

7. **Wait for Confirmation:** The automation waits for the user to select a time slot.

8. **Book Appointment (HTTP Request):** When the user replies, the automation sends a final **HTTP Request** to your server with the chosen time slot. Your server then creates the event in Google Calendar.

9. **Confirm:** The automation sends a final text message: "Your appointment is confirmed!"

### Configuration & API/Flow Examples

This entire journey is built in the **[8x8 Automation Builder](/connect/docs/automation-builder)** using the following key steps:

- **Trigger:** `Inbound Chat Apps`

- **Action:** `ChatApps Message` (to send menus and text)

- **Action:** `Wait For Reply` (to pause the flow and wait for user input)

- **Action:** `Branch` (to make decisions based on the user's reply)

- **Action:** `HTTP Request` (to communicate with your backend server or any third-party API)

## Rich Interactive Experiences

You can create rich experiences by using advanced message types and combining business-initiated templates with user-initiated interactive messages.

### Carousels and Lists

As detailed in the API and Template guides, you can send rich messages designed for user selection:

- **Carousel Templates:** A horizontally-scrolling set of up to 10 cards, each with its own image/video, text, and buttons. Ideal for product discovery or marketing showcases.

- **Interactive List Messages:** A pop-up menu of up to 10 items. Ideal for presenting options in a support menu or for appointment selection.

### Combining Templates + Interactivity (The 3-Step Flow)

The most powerful interactive experiences start with a template and transition into an interactive, freeform conversation.

This model is the foundation for almost all automated user journeys:

1. **Step 1: Business Initiates (Template)**

    - You cannot send an interactive list or button menu to start a conversation. You **must** send a pre-approved **Template Message**.

    - **Example:** You send a `UTILITY` template: "Your order has shipped! Would you like to track it or view related products? Reply 'TRACK' or 'PRODUCTS'."

2. **Step 2: User Replies (Service Window Opens)**

    - The customer replies with "TRACK".

    - This user reply opens the 24-hour customer service window.

    - Your webhook (see [Webhooks Reference](./whatsapp-webhooks.md#inbound-messages)) receives the `inbound_message_received` payload with `content.text: "TRACK"`.

3. **Step 3: Business Responds (Interactive)**

    - Your server receives the webhook and can now reply with a **freeform interactive message** (no template required).

    - **Example:** You send an **Interactive Button Message**: "Here is your tracking info: [LINK]. What else can I help with? [Button: 'Main Menu'] [Button: 'Contact Support']".

This combination allows you to proactively engage a user with a template, then seamlessly transition them into an automated, interactive flow once they reply.
