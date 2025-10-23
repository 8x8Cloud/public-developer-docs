---
id: 24-february-2022-release
---

# 24 February 2022 Release

## Release Highlights

**UX improvements**

* Filmstrip improvements
* Updates Dutch, French, Japanese, Occitan and Spanish translations
* Fixes overflow-menu: hides "more moderation controls" option if moderator settings tab is disabled
* Removes Youtube reference where not accurate in translations
* Adds validation to shared video URLs
* Lowers raised hand by local audio level changes when participant is dominant speaker.
* Improves lobby notifications
* Hides Advanced moderation, Ask to Unmute and Grant Moderator when the local participant is a moderator and is in a breakout room
* Fixes video-quality-label to open dialog also in audio-only mode

**JaaS APIs**

* Adds ability to hide dominant speaker badge.
* Adds a startShareVideo command
* Deprecates startScreenSharing config option for web browsers - This is no longer supported as per the w3c spec for getDisplayMedia
* Adds hidden-from-recorder token parameter allowing to exclude a (moderator) participant from a recording or live streaming

## Versions

**Release version**

* Jitsi Meet: 5852
* Jitsi Videobridge: 2.1-620-g93f4d88c
* Jicofo: 854

**Changelog**

* [Jitsi Meet](https://github.com/jitsi/jitsi-meet/compare/release-5764...release-5852)
* [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge/compare/153f7e4e...93f4d88c)
* [Jicofo](https://github.com/jitsi/jicofo/compare/840...854)

Follow us on [Twitter](https://twitter.com/JaaSOfficial) to get the news about our latest releases!
