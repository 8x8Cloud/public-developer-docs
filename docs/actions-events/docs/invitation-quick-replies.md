# Invitation quick replies

## Introduction

When using the chat invitation, you can configure quick reply suggestions that are displayed to the customer. These are predefined response options that make it easier for customers to start a conversation without typing.

The `setInvitationQuickReplies()` method allows you to set these suggestions programmatically via the API.

### Script config

Here is an example of how to set quick reply suggestions for the invitation

```javascript
function fn(chatApp) {
  chatApp.setInvitationQuickReplies([
    "I need help with my order",
    "I have a billing question",
    "I want to speak to an agent"
  ]);
}
```

You can also set them dynamically based on the page the customer is viewing

```javascript
function fn(chatApp) {
  window.chatApp = chatApp;
}

// On a product page
window.chatApp.setInvitationQuickReplies([
  "Tell me more about this product",
  "Is this item in stock?",
  "I need help choosing"
]);
```

### Important Notes

* Pass an array of strings, where each string is a quick reply option displayed to the customer.
* Quick replies are shown in the invitation UI before the customer enters the chat.
* The method returns the `chatApp` instance, so it can be chained with other methods.
