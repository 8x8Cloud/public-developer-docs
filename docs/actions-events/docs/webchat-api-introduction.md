# Introduction and Use Cases

The webchat API, also known as Embedded Chat API, allows configuration via the webchat script that meet some of the following use cases. All methods are available on the `chatApp` instance and return `this`, so they can be chained.

```javascript
function fn(chatApp) {
  chatApp
    .setCustomerInfo({ "Name": "James" })
    .setCustomerLanguage("fr")
    .setVariables({ "_VIP": "YES" })
    .setProxy({ onAppEnd: function () { console.log('Chat ended'); } });
}
```

## Use cases

### Pass customer data into the webchat script from a website

A customer may already be logged into the website, therefore you want to pass across the customer details, as well as details that they are already authenticated into the webchat, so this information can be given to the agent when they accept an interaction, or even passed into the ICA chatbot.

### Trigger the invitation based on an event

When a customer is on a set page on your website, you want to go straight into the webchat invitation to help engage them with a product on that page.

### Custom Branding: Allow extra configuration on the web widget to allow you to meet brand guidelines

A business wants all of the colors on the webchat, including the send, confirm and cancel button to meet their brand guidelines, so using this configuration will help meet that.

### End a chat session programmatically

Your application needs to close the webchat when a customer logs out, navigates away, or based on other business logic, without requiring the customer to click the close button inside the widget.

### React to chat lifecycle events

You want to track when the chat widget opens, when a session is created, or when the chat ends, so you can update your page UI, trigger analytics events, or coordinate with other parts of your application.

## Available commands

| Method | Parameters | Description |
|---|---|---|
| [`startChat()`](trigger-webchat) | None | Triggers the chat window, simulating a button click. |
| [`endChat()`](end-chat) | None | Programmatically ends the active chat session. |
| [`setCustomerInfo(info)`](customer-information) | `{ key: value }` | Sets customer information to be forwarded to the agent. Values must be primitives (string, number, boolean). |
| [`resetCustomerInfo()`](reset-customer-information) | None | Clears all previously set customer information. |
| [`setCustomerLanguage(lang)`](chat-language) | Language code (e.g. `"fr"`, `"es"`) | Sets the customer language for real-time translation. |
| [`setVariables(vars)`](set-chat-variables) | `{ key: value }` | Sets CRM and custom script variables. Keys must be prefixed with `$` (CRM) or `_` (custom). |
| [`setInvitationQuickReplies(replies)`](invitation-quick-replies) | `["reply1", "reply2"]` | Sets quick reply suggestions shown in the invitation UI. |
| [`setNotificationSoundToggle(enabled)`](notification-sound) | `true` or `false` | Enables or disables notification sounds for incoming messages. |
| [`setProxy(callbacks)`](event-callbacks) | `{ onAppEnd: fn, ... }` | Registers lifecycle event callbacks. See [Event callbacks](event-callbacks) for the full list. |

## Getting started

Before using the API, you need to set up the [webchat script](webchat-script) on your website. Once the script is loaded, the `chatApp` instance is passed to your callback function, where you can call any of the methods above.

### Prerequisite

Before using this document, you should refer to [here](https://docs.8x8.com/8x8WebHelp/VCC/configuration-manager-general/content/enhancedchatscript.htm) to configure your webchat widget.
