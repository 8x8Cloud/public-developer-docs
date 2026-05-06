# Reset customer information

## Introduction

If you have previously set customer information using `setCustomerInfo()`, you may need to clear it. For example, when a different customer logs into your website during the same browser session, or when you want to ensure no stale data is carried over into a new chat.

The `resetCustomerInfo()` method clears all previously set customer information.

### Script config

Here is an example of how to reset the customer information

```javascript
function fn(chatApp) {
  window.chatApp = chatApp;
}

// Set initial customer info
window.chatApp.setCustomerInfo({
  "First name": "James",
  "Email address": "james@example.com"
});

// Later, clear it when the user logs out
window.chatApp.resetCustomerInfo();
```

### Important Notes

* After calling `resetCustomerInfo()`, any new chat session will not include the previously set customer data.
* You can call `setCustomerInfo()` again after resetting to provide new data.
* The method returns the `chatApp` instance, so it can be chained with other methods.
