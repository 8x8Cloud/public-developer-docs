# Event callbacks

## Introduction

The webchat widget emits lifecycle events as the chat progresses through different stages. Using the `setProxy()` method, you can register callback functions to respond to these events on your website. This is useful for analytics tracking, updating your page UI, or coordinating the chat lifecycle with your application logic.

### Script config

Here is an example of how to register event callbacks

```javascript
function fn(chatApp) {
  chatApp.setProxy({
    onAppStart: function () {
      console.log('Chat widget initialized');
    },
    onAppEnd: function (endChatReason) {
      console.log('Chat ended, reason:', endChatReason);
    },
    onOpenChat: function () {
      console.log('Chat window opened');
    }
  });
}
```

You only need to register the callbacks you are interested in. Any callbacks not provided will be ignored.

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
  chatApp.setProxy({
    onAppStart: function () {
      console.log('Chat widget initialized');
    },
    onAppEnd: function (endChatReason) {
      console.log('Chat ended, reason:', endChatReason);
    },
    onOpenChat: function () {
      console.log('Chat window opened');
    }
  });
});
    </script>

```

### Available callbacks

| Callback | Parameters | Description |
|---|---|---|
| `onAppStart` | None | Fired when the chat widget initialization completes. |
| `onAppEnd` | `endChatReason` | Fired when the chat widget closes. The `endChatReason` parameter is either `'user'` (customer clicked the close button) or `'chat-api'` (ended programmatically via `endChat()`). |
| `onOpenInvitation` | None | Fired when the invitation UI is displayed to the customer. |
| `onOpenOnlineForm` | None | Fired when the pre-chat form is displayed. |
| `onOpenChat` | None | Fired when the chat window opens and the customer enters a queue or starts chatting. |
| `onOpenOfflineForm` | None | Fired when the offline form is displayed (when no agents are available). |
| `onSkipQueue` | None | Fired when the skip queue option is used. |
| `onCustomerInfoSent` | None | Fired when customer information (set via `setCustomerInfo`) has been transmitted to the server. |
| `onSessionCreated` | None | Fired when a chat session is successfully created on the server. |
| `onSessionEnd` | None | Fired when the chat session ends on the server. |
| `onSessionError` | None | Fired when the chat session encounters an error. |

### Combining with other API methods

The `setProxy()` method returns the `chatApp` instance, so it can be chained with other methods

```javascript
function fn(chatApp) {
  chatApp
    .setCustomerInfo({
      "First name": "James",
      "Email address": "james@example.com"
    })
    .setProxy({
      onAppStart: function () {
        console.log('Chat is ready');
      },
      onAppEnd: function (endChatReason) {
        if (endChatReason === 'chat-api') {
          // Chat was ended programmatically via endChat()
          console.log('Chat ended by application');
        } else {
          // Chat was ended by the customer clicking the close button
          console.log('Chat ended by user');
        }
      }
    });
}
```

### Important Notes

* Callbacks are registered once and remain active for the entire chat session lifecycle.
* You only need to provide the callbacks you want to use. Any missing callbacks are ignored.
* The `onAppEnd` callback fires regardless of how the chat was ended (by the user or via the API). Use the `endChatReason` parameter to differentiate.
* The `setProxy()` method should be called during initialization (inside the callback function), before the chat starts.
