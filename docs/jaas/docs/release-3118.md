# 12 July 2022 Release

## Highlights

**UX improvements**

* Adds support for new release testing
* Adds support for emotions. To further configure this feature please visit our [documentation guidelines](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-configuration/#facelandmarks)
* Allows moderators to move participants across breakout rooms without being in them
* Addresses underlying jetty CVE: [https://www.cve.org/CVERecord?id=CVE-2022-2191](https://www.cve.org/CVERecord?id=CVE-2022-2191)
* Updates the Arabic, Portuguese translation

**Quality improvements**

* Fixes an issue where screen sharing is not visible for some participants
* Fixes an issue, where the user is not able to stop the screen sharing in presenter mode
* Face centering improvements
* Fixes high fps screen capture
* Fixes for screen share in audio-only mode
* Fixes auto-knock feature in lobby
* Fixes chat scrolling in Safari
* Updates polls answer and character limits
* Fixes around removing participant from recording

**JaaS APIs**

* Allow to specify a *userDocumentationURL* and *downloadAppsUrl*
* Adds participants pane toggled event
* Exposes *setClosedCaptionsEnabled* config
* Adds an option to mute lobby knocking sounds
* New transcription configs

## Versions

**Release version**

* Jitsi Meet: 6305
* Jitsi Videobridge: 2.2-12-gcae5ea42
* Jicofo: 907

**Changelog**

* [Jitsi Meet](https://github.com/jitsi/jitsi-meet/compare/release-6214...release-6305)
* [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge/compare/acabb2a7-hf...cae5ea42)
* [Jicofo](https://github.com/jitsi/jicofo/compare/877...907)

Follow us on [Twitter](https://twitter.com/JaaSOfficial) to get the news about our latest releases!
