---
sidebar_label: 'Learning Paths'
---

# Learning Paths

This documentation is comprehensive, but not all sections are relevant to every role. Use these learning paths as a "fast track" to the sections that matter most to you.

We recommend all users start with **[Concepts & Fundamentals](./concepts-fundamentals.md)** to understand the 24-hour window, message types, and platform rules.

## Business User Path (Campaigns & Support)

This path is for non-technical users, marketers, and support managers who will use the 8x8 Connect portal to manage campaigns and agent-based support.

1. **Start Here:**

    - [Concepts & Fundamentals](./concepts-fundamentals.md): Understand the core rules of WhatsApp.

    - [Getting Started with WhatsApp (Portal-first)](./getting-started.md): Learn how to get your account set up using the 8x8 Connect portal.

2. **Learn Portal Tools:**

    - [Message Types & Templates](./message-types-templates.md): Learn how to create and manage the templates you will use in your campaigns.

    - [WhatsApp in 8x8 Connect](./whatsapp-in-8x8-connect.md): This is your primary guide to using the **Campaigns** tool, **8x8 Converse** for agents, and the **Automation Builder**.

3. **See it in Action:**

    - [Scenarios & Tutorials](./scenarios-tutorials.md): Review these practical, step-by-step guides for appointment reminders, support bots, and marketing campaigns.

    - [Vertical Playbooks](./vertical-playbooks.md): Find examples specific to your industry, such as Retail or Healthcare.

## Developer Path (API & Automation)

This path is for software developers and integrators who will automate WhatsApp messaging by integrating the 8x8 Messaging App API into backend systems.

1. **Understand the Core:**

    - [Concepts & Fundamentals](./concepts-fundamentals.md): Understand the 24-hour window, template categories, and portfolio-based limits.

    - [WhatsApp over 8x8 API](./whatsapp-over-8x8-api.md): This is your primary technical guide. Pay close attention to:

        - [Authentication](./whatsapp-over-8x8-api.md#authentication)

        - [Business-initiated Conversations: Templates](./whatsapp-over-8x8-api.md#business-initiated-conversations-templates) (Creating vs. Sending Templates)

        - [User-initiated Conversations: Interactive Messages](./whatsapp-over-8x8-api.md#user-initiated-conversations-interactive-messages) (Sending Interactive Messages)

        - [Webhooks Reference](./whatsapp-webhooks.md) (Receiving Webhooks and Event Handling)

2. **Master Templates & Media:**

    - [Message Types & Templates](./message-types-templates.md): Understand template categories, use cases, and portal management.

    - [Template Components Reference](./template-components-reference.mdx): Detailed technical specifications for all component constraints (character limits, button types, header formats, parameter rules).

    - [Template Message API Library](./template-message-api-library.mdx): Use this as your quick reference for the exact `Create` and `Send` JSON payloads for every template type (Auth, Media, Carousel, etc.).

    - [Interactive Message API Library](./interactive-message-api-library.mdx): Complete reference for all interactive message types with JSON examples.

3. **Build & Troubleshoot:**

    - [Advanced Capabilities](./advanced-capabilities.md): Learn how to combine templates and interactive messages to build conversational journeys.

    - [Operations, Monitoring & Troubleshooting](./operations-monitoring.md): This is your guide for debugging. Use the API/webhook error code matrix to understand why a message failed.

    - [Governance, Security & Compliance](./governance-security.md): Review the compliance and security (e.g., AIT prevention) rules.
