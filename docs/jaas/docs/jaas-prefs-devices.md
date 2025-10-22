# Setting up audio/video devices

You can set the initial media devices for the call using the following:

```javascript
const options = {
    ...
    devices: {
        audioInput: '\<deviceLabel\>',
        audioOutput: '\<deviceLabel\>',
        videoInput: '\<deviceLabel\>'
    },
    ...
};
const api = new JitsiMeetExternalAPI(domain, options);

```

You can get the media devices by using *WebApi*'s `navigator.mediaDevices.enumerateDevices()`.
