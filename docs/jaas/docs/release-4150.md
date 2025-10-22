# 3 May 2023 Release

## Release Highlights

**Highlights**

* Fix missing video in some corner cases after a participant leaves
* Fix an issue where the screen sharing tile stays after a participant has stopped screen sharing
* Fix receiving videos at startup when lastn=0 (or 1, etc)
* Fix entire conference reloading when one endpoint times out
* Fix multiple reloads when video bridge (colibri) requests timeout
* Fix a race condition leading to requests for a conference not being handled
* Participant join time optimizations
* Optimize the time to switch between different media streams
* Fix in connection re-establishment
* Workaround for browser audio element error handling resulting in no audio
* Improve time to receive media when joining big calls
* Fix for an issue where p2p clients (with different codec preferences) fail to decode video

**UX improvements**

* Top toolbar UI improvements
* Accessibility improvements
* Disable checkbox for disabled sounds
* Improve streaming icon and tooltip
* Settings dialog redesign
* Audio/video moderation UI improvements
* Updates avatar styles
* Device selection re-design
* Fix notification overflow issue when displaying a long URL
* Fix conference time in the case of coming back from a breakout room
* Fix auto-select of the remote control participant
* Update pre-join dialogs design
* Make dial-in numbers and pin code selectable
* Fix for focus chat input field on open
* Update Albanian, Finish, French, German, Greek, Japanese, Portuguese, Russian, Spanish and Ukranian translations

**JaaS API**

* Fix linking to the Jitsi mobile application
* Add support for assumed bandwidth

## Versions

**Release version**

* Release: 4150
* Jitsi Meet: 7207
* Jitsi Videobridge: 2.3-19-gb286dc0c
* Jicofo: 1027

**Changelog**

* [Jitsi Meet](https://github.com/jitsi/jitsi-meet/compare/release-7016...release-7207)
* [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge/compare/99b20c62...b286dc0c)
* [Jicofo](https://github.com/jitsi/jicofo/compare/996...1027)

Follow us on [Twitter](https://twitter.com/JaaSOfficial) to get the news about our latest releases!
