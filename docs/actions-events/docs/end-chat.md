# End chat

## Introduction

There are scenarios where you may need to programmatically end a webchat session from your website. For example, when a customer navigates away from a support page, logs out of their account, or when your application determines the conversation should be closed based on business logic.

The `endChat()` method allows you to terminate the chat session via the API, without requiring the customer to click the close button inside the widget.

### Script config

Here is an example of how to end the chat programmatically

```javascript
function fn(chatApp) {
  window.chatApp = chatApp;
}

// Later, when you want to end the chat:
window.chatApp.endChat();
```

A common use case is ending the chat when the customer logs out of your website

```javascript
function fn(chatApp) {
  window.chatApp = chatApp;
}

document.getElementById('logout-button').addEventListener('click', function () {
  window.chatApp.endChat();
});
```

To add this, you need to add it at the bottom of the script in this area here

```html
})(  
--ADD THE FUNCTION CHATAPP CODE HERE  
);  
    </script>
```

Then, the full script will look like this

```html
    <!-- Place this code snippet anywhere you want the button to appear in your page. If no button has been configured in the chat script, it will not show up nor take any space. -->
    <div id="__8x8-chat-button-container-script_1333070733643e5b8fa7a791.52161248"></div>

    <!-- This script will not interfere with the button layout, you just need to include it in the same page. It must also be within the <body> section of the page, preferably just before the ending tag. -->
    <script type="text/javascript">
    (function(c, f, ef){
        var typeofC = Object.prototype.toString.call(c);
        var props = (typeofC === '[object Object]' && c) || {};
        var cb = f || (typeofC === '[object Function]' && c);
        var config = {
            scriptUuid: "script_1333070733643e5b8fa7a791.52161248",
            tenant: "Y2hyaXNjcm9tYmllZGVtbzAx",
            channelName: "WebChatChannel",
            channelUuid: "Ak3ULjXFQx-unSA6ebdW8A",
            domain: "https://vcc-eu11.8x8.com",
            buttonContainerId: "__8x8-chat-button-container-script_1333070733643e5b8fa7a791.52161248",
            align: "right",
        };

        var url = new URL("https://cloud8-cc-geo.8x8.com/vcc-chat-channels/public/webchat/discovery");
        var params = { domain: config.domain, tenant: config.tenant, channelUuid: config.channelUuid };
        url.search = new URLSearchParams(params).toString();
        fetch(url)
            .then(response => response.json())
            .then(data => config.domain = !data.domain ? config.domain : data.domain)
            .catch(error => console.warn('Failed to retrieve override domain, will continue using ', config.domain, error))
            .finally(() => loadChat());

        function loadChat() {
            var se = document.createElement("script");
            se.type = "text/javascript";
            se.async = true;
            se.src = props.loaderURL || (config.domain + "/CHAT/common/js/chatv3.js");
            Object.keys(config).forEach(function (k) { se.dataset[k] = config[k] });
            Object.keys(props).forEach(function (k) { se.dataset[k] = props[k] });
            function handleInitEvent(e) {
                var initFn = e.detail.init;
                initFn(config, cb);
                se.removeEventListener('init', handleInitEvent)
            }
            function handleErrorEvent(e) {
                ef && ef(e);
                se.removeEventListener('customerror', handleErrorEvent);
            }
            se.addEventListener('init', handleInitEvent);
            se.addEventListener('customerror', handleErrorEvent);
            var os = document.getElementsByTagName("script")[0];
            os.parentNode.insertBefore(se, os);
        }
    })(function (chatApp) {
  window.chatApp = chatApp;
});
    </script>

    <!-- Somewhere else on your page -->
    <button id="logout-button">Log out</button>
    <script>
      document.getElementById('logout-button').addEventListener('click', function () {
        window.chatApp.endChat();
      });
    </script>
```

### Behaviour

The `endChat()` method works differently depending on the current state of the webchat:

* **During pre-chat stages** (button, invitation, or pre-chat form): The chat UI is closed immediately. No API calls to the server are made since no conversation exists yet.
* **During an active chat session**: The active interaction is terminated via the server API, the chat window is closed, and the agent is notified that the conversation has ended.

### Detecting how the chat ended

When using `endChat()`, the `onAppEnd` callback receives an `endChatReason` parameter that indicates whether the chat was ended by the customer (via the close button) or programmatically (via the API). See [Event callbacks](event-callbacks) for details on all available callbacks.

```javascript
chatApp.setProxy({
  onAppEnd: function (endChatReason) {
    if (endChatReason === 'chat-api') {
      console.log('Chat was ended programmatically');
    } else {
      console.log('Chat was ended by the user');
    }
  }
});
```

### Waiting for the chat to fully terminate

The `endChat()` method initiates the termination process but returns immediately — it does not wait for the server to finish closing the conversation. If your page navigates away or redirects before the chat has fully terminated, the server-side cleanup may not complete, which can leave the interaction in an unfinished state for the user.

To avoid this, use the `onAppEnd` callback to wait for the chat to fully close before performing any navigation or page unload:

```javascript
function fn(chatApp) {
  window.chatApp = chatApp;

  chatApp.setProxy({
    onAppEnd: function (endChatReason) {
      if (endChatReason === 'chat-api') {
        // Safe to navigate — the chat has fully terminated
        window.location.href = '/logged-out';
      }
    }
  });
}

document.getElementById('logout-button').addEventListener('click', function () {
  window.chatApp.endChat();
  // Do NOT redirect here — wait for onAppEnd instead
});
```

### Important Notes

* The `endChat()` method can be called at any point during the chat lifecycle, including before the chat window is opened.
* When called during an active session, the chat ends without showing a confirmation dialog to the customer.
* Always listen for `onAppEnd` before redirecting or unloading the page, to ensure the conversation is properly closed on the server. See [Event callbacks](event-callbacks) for details.
* The method returns the `chatApp` instance, so it can be chained with other methods.
* If `endChat()` is called when no chat is active, it has no effect.
