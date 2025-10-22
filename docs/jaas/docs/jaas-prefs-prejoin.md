# Prejoin page

The prejoin page is displayed before joining a meeting and it allows you to enter a display name and select certain video/audio devices and gives you the option to mute/unmute devices before joining. Since for JaaS joing a meeting is always authenticated because of the JWT, we might not want our users to change their display name since it is already encoded into the JWT. Also since we use the [IFrame API](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe) in order to embed the meeting in our application, we can manage the selected audio/video devices and their muted state from within our application. In order to achieve this, we set **`prejoinPageEnabled`** which will disable the prejoin page, and we can pass the devices and the mute state from our application:

```javascript
const options = {
    ...,
    configOverwrite: {
      ...
      // disable the prejoin page
      prejoinPageEnabled: false,
      ...,
      //optionally we can control the mute state on join from the emebedding application
      startWithAudioMuted: [true/false],
      startWithVideoMuted: [true/false]
    },
    ...,
    // optionally, we can have the meeting select the devices we want
    devices: {
      audioInput: '\<deviceLabel\>',
      audioOutput: '\<deviceLabel\>',
      videoInput: '\<deviceLabel\>'
    },
    ...
};
const api = new JitsiMeetExternalAPI(domain, options);

```
