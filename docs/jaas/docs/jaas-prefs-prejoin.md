# Prejoin page

The prejoin page comes before the meeting. On that page the user can type a display name, select audio and video devices, and mute or unmute those devices before the join.

For JaaS, the join is always authenticated with a JWT, so you can keep the display name that the token already holds. You also embed the meeting with the [IFrame API](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe), so your application can select the devices and set the muted state. To skip the prejoin page, set `prejoinConfig.enabled` to false and pass the devices and the mute state from your application:

```javascript
const options = {
    ...,
    configOverwrite: {
      ...
      // disable the prejoin page
      prejoinConfig: {
        enabled: false
      },
      ...,
      // optionally we can control the mute state on join from the embedding application
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

:::note
The old option `prejoinPageEnabled` does not work any more. The IFrame API checks each `configOverwrite` key against an allow-list, and it drops keys that it does not know. If you set `prejoinPageEnabled`, the prejoin page stays and you get no error.
:::

## Display name

A meeting needs a display name for each user. The prejoin page is the place where the user types that name, so with the page disabled your application must supply it. You have two options:

* Set the claim `context.user.name` in the JWT.
* Or pass `userInfo` to the IFrame API, as in the example below. A name in the JWT has priority over this option.

```javascript
const options = {
    ...,
    userInfo: {
      displayName: '\<displayName\>',
      email: '\<email\>'
    },
    ...
};
```

If neither the JWT nor `userInfo` holds a name, the client joins the meeting and then asks for a name in a dialog. The user must type a name, so the join is not free of user action.

## Camera and microphone permission

The browser asks for camera and microphone permission when the page requests media. With the prejoin page disabled, that request happens at page load. To move the request to the first unmute, set `disableInitialGUM` to true:

```javascript
const options = {
    ...,
    configOverwrite: {
      ...
      prejoinConfig: {
        enabled: false
      },
      disableInitialGUM: true,
      startWithAudioMuted: true,
      startWithVideoMuted: true
    },
    ...
};
```
