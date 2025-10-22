# How to manage UI buttons

UI buttons visibility is controlled through a *configOverwrite* property called **`toolbarButtons`**

* not passing this property at all enables all buttons on the UI
* passing this property with an empty array hides all buttons from the conference's UI
* passing this property with certain values will only enable buttons corresponding to the given values

For a list of all controllable buttons please check the **`toolbarButtons`** property of [config.js](https://github.com/jitsi/jitsi-meet/blob/master/config.js)

Example snippet for showing only the main meeting control buttons: hangup and mute/unmute audio and video:

```javascript
const domain = '8x8.vc';
const options = {
    ...
    configOverwrite: { toolbarButtons: ['hangup', 'microphone', 'camera'], },
    ...
};

const api = new JitsiMeetExternalAPI(domain, options);

```
