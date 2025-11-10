// MaestroSDK Interactive Demo
const MaestroSDKDemo = {
  frame: null,
  sentEvents: null,
  receivedEvents: null,
  phoneInput: null,
  externalOrigin: '',

  init() {
    this.frame = document.getElementById('mapanelFrame');
    this.sentEvents = document.getElementById('sentEvents');
    this.receivedEvents = document.getElementById('receivedEvents');
    this.phoneInput = document.getElementById('phoneInput');
    
    if (this.frame) {
      const url = new URL(this.frame.src);
      this.externalOrigin = url.origin;
      
      // Listen for messages from iframe
      window.addEventListener("message", (event) => {
        if (event.origin !== this.externalOrigin) return;
        this.logEvent('received', event.data);
      });
    }
  },

  logEvent(type, data) {
    const div = document.createElement('div');
    if (type === 'sent') {
      div.className = 'event-sent';
      div.textContent = "Sent: " + JSON.stringify(data, null, 2);
      if (this.sentEvents) {
        this.sentEvents.appendChild(div);
        this.sentEvents.scrollTop = this.sentEvents.scrollHeight;
      }
    } else {
      div.className = 'event-received';
      div.textContent = "Received: " + JSON.stringify(data, null, 2);
      if (this.receivedEvents) {
        this.receivedEvents.appendChild(div);
        this.receivedEvents.scrollTop = this.receivedEvents.scrollHeight;
      }
    }
  },

  sendPhoneEvent(action) {
    if (!this.phoneInput || !this.frame) return;
    
    const phone = this.phoneInput.value.trim();
    if (!phone) {
      alert("Please enter a phone number.");
      this.phoneInput.focus();
      return;
    }
    
    const event = {
      eventName: 'maEvent',
      family: 'external',
      bus: 'global',
      content: {
        'eventName': 'startCall',
        'method': 'mapDirective',
        'phoneNumber': phone
      }
    };
    
    this.frame.contentWindow.postMessage(event, this.externalOrigin);
    this.logEvent('sent', event);
  },

  clearSentEvents() {
    if (this.sentEvents) {
      this.sentEvents.innerHTML = "";
    }
  },

  clearReceivedEvents() {
    if (this.receivedEvents) {
      this.receivedEvents.innerHTML = "";
    }
  }
};

// Auto-initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => MaestroSDKDemo.init());
} else {
  MaestroSDKDemo.init();
}

// Make it globally available for inline event handlers
window.MaestroSDKDemo = MaestroSDKDemo;