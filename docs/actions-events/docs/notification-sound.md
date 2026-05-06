# Notification sound

## Introduction

By default, the webchat widget plays a sound when a new message arrives. Using the `setNotificationSoundToggle()` method, you can control whether this notification sound is enabled or disabled.

This is useful when your website has its own notification system, or when you want to give customers a quieter experience.

### Script config

Here is an example of how to disable the notification sound during initialization

```javascript
function fn(chatApp) {
  chatApp.setNotificationSoundToggle(false);
}
```

You can also toggle it dynamically based on user preference

```javascript
function fn(chatApp) {
  window.chatApp = chatApp;
}

document.getElementById('mute-toggle').addEventListener('change', function (e) {
  window.chatApp.setNotificationSoundToggle(e.target.checked);
});
```

### Important Notes

* Pass `true` to enable notification sounds or `false` to disable them.
* This preference is persisted for the duration of the chat session.
* The method returns the `chatApp` instance, so it can be chained with other methods.
