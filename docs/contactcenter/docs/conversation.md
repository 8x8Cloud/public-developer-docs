# Conversation

> ❗️ **PLEASE NOTE - This API is going to be deprecated on 30th September 2023, it will no longer work after this date. Please use our [Chat Gateway](/actions-events/docs/chat-gateway) which offers all of the Chat API's functionalities as well as additional features.**
>
>

After you have created:

* [**Webhooks**](/contactcenter/docs/create-a-webhook)
* A [**chat queue**](https://support.8x8.com/cloud-contact-center/virtual-contact-center/administrators/how-to-create-inbound-queue-8x8-contact-center) with assigned agents
* A [**channel**](/contactcenter/docs/create-a-chat-api-channel) with associated webhook and chat queue

you can begin testing the Chat API flow through the creation of a conversation.

## Create a conversation

Complete the following steps to create a conversation:

1. Obtain your [**API key**](/contactcenter/v2.0/docs/api-key)
2. Call [**create a new conversation**](/contactcenter/reference/createcctransaction) using the channel you created.
3. Obtain the **`conversationId`** value from the generated response

The created conversation triggers a new interaction linked to the conversation. The interaction is enqueued to the specified chat queue.

An available agent is offered the interaction. Once an agent has accepted the interaction, it joins the conversation thread and the agent sees all the messages added to the conversation.

8x8 sends an [**`AGENT_JOINED`**](/contactcenter/docs/webhook-events-reference#agent_joined) event on the webhook associated with the channel.

Any message added by the agent in the conversation triggers a new [**`TEXT`**](/contactcenter/docs/webhook-events-reference#text) notification.

Any new message added to the conversation using [**send a message**](/contactcenter/reference/sendmessagetocctransaction) API is displayed to the agent.

If the agent ends the interaction, you receive an [**`AGENT_LEFT`**](/contactcenter/docs/webhook-events-reference#agent_left) event notification.

You need to prompt the conversation ending from your bot or integration by calling the [**customers leaves conversation**](/contactcenter/reference/customerparticipantleavecctransaction) API. This frees the agent to take on other assignments.

You receive an [**`AGENT_LEFT`**](/contactcenter/docs/webhook-events-reference#agent_left) event.

Using the [**Conversations APIs**](/contactcenter/reference/getcctransactions) you can see the conversation information and the created messages as well as information about how an agent handled a conversation and the specific interactions.

If the conversation ended before achieving the desired outcome, and you would like to continue the conversation without creating a new one, you can do so just by adding a new message after the **`AGENT_LEFT`** event. This will create a new interaction associated with the conversation which is enqueued in the queue from your last interaction so the right team can handle the case. The new(or the same) agent who accepts the interaction sees all the previous messages in the conversation thread and continues from there.
