# 21 June 2023 Release

## Release Highlights

**Highlights**

* Enables peer-to-peer for Safari
* Prevents screen lock / turn off while in a conference
* Fixes an issue seen in p2p connections where sources of the initiator are not signaled to the remote since the tracks are added while the initiator is waiting for a session-accept from the peer
* Fixes an issue where media gets sent on video bridge connection even when the connection is suspended
* Fixes an edge case where the main room is locked and everyone leaves it to a breakout room and then coming back breaks the meeting
* Fixes audio output device for notifications

**UX improvements**

* Fixes horizontal filmstrip
* Raise hand and reactions buttons re-organized
* Fixes bottom toolbar not hiding properly in some cases
* Polishes chat UI
* Fixes a visual issue where the whole window jumps up after a dialog is closed
* Fixes handling of duplicates in invite dialog
* Properly hide recording and live stream buttons for non-moderators
* Fixes video device used in Virtual Backgrounds setting
* Adds unsafe room warning in pre-join screen for short room names
* Updates the Farsi, Portuguese, Spanish and Swedish translations
* Toolbar moving up to allow display names to show for participants on the bottom row
* Fixes password input to use the numeric input mode when only digits are required

**JaaS API**

* Adds support for assumed bandwidth bps config and command
* Allows to configure new raise hand / reactions appearance
* Adds an optional "sandbox" option to the external API which will be applied to the iframe
* Fixes setLargeVideoParticipant staying on stage
* Аdds a function and event to check p2p status

## Versions

**Release version**

* Release: 4245
* Jitsi Meet: 7322
* Jitsi Videobridge: 2.3-25-g1da507fa
* Jicofo: 1038

**Changelog**

* [Jitsi Meet](https://github.com/jitsi/jitsi-meet/compare/release-7207...release-7322)
* [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge/compare/b286dc0c...1da507fa)
* [Jicofo](https://github.com/jitsi/jicofo/compare/1027...1038)

Follow us on [Twitter](https://twitter.com/JaaSOfficial) to get the news about our latest releases!
