# 20 November 2023 Release

## Release Highlights

**UX/UI**

* Improves accessibility in breakout rooms list, welcome page and more
* Inherit moderator capabilities when granted moderator rights
* Fixes timer handling in breakout rooms
* Fixes toggled state for screen sharing button appearance
* Fixes feedback not showing in certain cases due to CallStats being disabled
* Fixes a placeholder not replaced in an input notification
* Updates the German, Portuguese, Taiwan and Turkish translations

**Quality**

* Fixes the resolution in certain cases on mobile web
* Fixes an issue with MS teams virtual audio device interfering with selected meeting audio device
* Fixes an issue where a live streaming is started for a second time in a meeting with lobby turned on
* Device handling improvements
* Analytics stats improvements
* Improved logging around audio track states
* Improved signalling server logging
* Screenshots performance improvements
* Fixes an issue where screen share from Firefox appears blurry on other endpoints in the call
* Large meetings improvements
* Browser detection improvements
* Updates the optimal browser support list
* Workaround a Chromium issue with end-to-end latency regression in combination with 0Hz and desktop screen sharing (Chromium issue: #15539)
* Fixes rare race condition on joining a room that is being cleared at the same moment
* Improves reload experience (enable re-connect without page reload)

**JaaS API**

* Adds ability to prefer BOSH over WebSocket
* Adds config for initial camera facing mode (front or rear)
* Adds event with transcription chunks

## Versions

**Release version**

* Release: 4546
* Jitsi Meet: 7629
* Jitsi Videobridge: 2.3-59-g5c48e421
* Jicofo: 1055

**Changelog**

* [Jitsi Meet](https://github.com/jitsi/jitsi-meet/compare/release-7542...release-7629)
* [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge/compare/8983b11f...5c48e421)
* [Jicofo](https://github.com/jitsi/jicofo/compare/1050...1055)

Follow us on [Twitter](https://twitter.com/JaaSOfficial) to get the news about our latest releases!

## Minor Update, Dec 5, 2023

* Fixes getCurrentDevices() in the case a new device is selected and then a call is restarted
* Fixes a rare issue when starting the conference with video muted
* Fixes login UI in settings
