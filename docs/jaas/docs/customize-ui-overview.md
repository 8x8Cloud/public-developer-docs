# Overview

The meeting's UI can be customised through the *configOverwrite* and *interfaceConfigOverwrite* objects which are part of the **`JitsiMeetExternalAPI`**'s *options* object. For a list of all possible values, please refer to :

* [config.js](https://github.com/jitsi/jitsi-meet/blob/master/config.js) for possible configOverwrite object values.
* [interface_config.js](https://github.com/jitsi/jitsi-meet/blob/master/interface_config.js) for possible interfaceConfigOverwrite object values.

Note that not all options found in the two config files are overwritable.

Please see below a snippet on how to use the config and interface config overwrites in your application:

```javascript
const domain = '8x8.vc';
const options = {
    ...
    configOverwrite: { startWithAudioMuted: true },
    interfaceConfigOverwrite: { DISABLE_DOMINANT_SPEAKER_INDICATOR: true },
    ...
};
const api = new JitsiMeetExternalAPI(domain, options);

```

There is a wide array of configurable things for the conference, some of which are described in the following subsections.
