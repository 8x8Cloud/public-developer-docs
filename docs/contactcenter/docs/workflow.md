# Chat Workflow

> ❗️ **PLEASE NOTE - This API is going to be deprecated on 30th September 2023, it will no longer work after this date. Please use our [Chat Gateway](/actions-events/docs/chat-gateway) which offers all of the Chat API's functionalities as well as additional features.**
> 
> 

## Prerequisites

To use the Chat API you must have the following:

* At least one configured queue so that any interactions coming from your customers can be routed to your agents.
* At least one agent is assigned to your queue, so they can pick up the queued interactions and connect with your customers.
* A client application that calls the Chat API and listens for messages (i.e., events) that are returned.

## Setup flow

To set up the Chat API do the following:

* [Authenticate](/contactcenter/v2.0/docs/api-key) via your access token obtained from using your [API Key & Secret](/contactcenter/v2.0/docs/api-key)  

Access to the API is only for authenticated client applications.
* Provide a subscription webhook so that Contact Center can use it to provide real-time information to your application
* Create a channel to open up real-time communication from your application to the Contact Center.

> 📘 **Note**
> 
> You can also integrate a 3rd-party chatbot service, or make use of our other 8x8 Contact Center APIs (e.g., [Real Time Statistics Reporting API](https://support.8x8.com/cloud-contact-center/virtual-contact-center/developers/8x8-contact-center-real-time-statistics-reporting-api)), to retrieve customer information, make routing decisions, and further enhance the customer experience.
> 
> 

## Operational flow

Two-way communication is achieved by using web calls and callbacks. All messages or events must be exchanged within the context of a conversation. Multiple conversations can happen at any given time, depending on how many customers are engaging your contact center simultaneously.

Complete the following steps:

1. Create a new conversation for each user and for each of their chat sessions.

Creating a conversation (i.e., interaction) routes it to the configured queue on the Chat API Channel. Contact Center then assigns it to an agent, based on availability and experience. Interactions with the agent within a conversation are ended when the customer-leave endpoint is triggered via the API.  

Conversations can be reused by sending new messages on behalf of the user after a previous customer-leave action was made. The user rejoins the conversation and a new interaction is created and routed to the previously routed queue.

2. Once the agent is assigned, the agent can then interact with the customer using real-time chat. As part of the conversation, send messages from the customer with agent replies from your webhook.

You also receive events like an agent joining the conversation or leaving (ending) it.

3. Conversations are forever lasting. In order to end a conversation and to notify the Contact Center and your agents when customers leave, you need to call the customer-leave endpoint via the API. If your customers return later, you can always create a new conversation (chat session) and repeat these steps or reuse an existing conversation (suitable for reopened issues). For reopening a conversation, just add a new message after its closure and we will re-queue it in the last queue it was handled; it will then be re-offered to the next available agent assigned to that queue, who will have access to the full conversation history.

> 📘 **Note:**
> 
> Depending on your Contact Center schedule and agent availability, returning customers might be assigned to different agents at different times; however, your agents will always get the full conversational history including previous interactions.
> 
>
