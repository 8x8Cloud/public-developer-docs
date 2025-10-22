---
id: 14-december-2021-release
title: "14 December 2021 Release"
---

# 14 December 2021 Release

## Release Highlights

**New features**

* Breakout rooms support
* New improved tile view layout
* New display name UI

**UX improvements**

* Improves notification timeouts and makes them configurable
* Fix to avoid double permission prompts on Firefox after choosing non-default device
* Allows hide/show toolbar on tap on mobile web
* Adds keyboard shortcuts for Polls
* Accessibility improvements
* Advanced moderation improvements
* Fixes slider appearance on Firefox
* Hides indicator circle when ghost icon is hidden
* Polls UI fixes on Firefox
* Displays Poll creator and more polls UI improvements
* Speaker stats fixes
* Removes device notifications in the pre-join screen
* Calculates avatar color based on display name
* Adds support for special characters and emojis in avatar initials
* Updates reaction sounds
* Fixes recording already started error
* Fix private message reply button not working
* Responsive UI improvements in pre-join screen
* Show raise hand status live in participants pane
* Allows to stop shared video from the participants pane
* Fix chat and polls title
* Allow moderators to mute reaction sounds
* Hides email field under profile settings

**Quality improvements**

* Adds a config to allow enabling/disabling RTCStats on the server
* Don't set the MAX over-send limit for non-scalable streams
* Fixes error message when a recorder session already exists
* Adds a limit for audio/video senders in a large conference (current limit is set to a 100 by default)
* Large conferences performance improvements
* Fixes a condition in which a participant can join when a videobridge is shutting down
* Fixes an issue on Safari where black video is rendered sometimes whenever a new stream is attached to the large video container
* RTX with Firefox from 96 on only - RTX in combination with simulcast on Firefox results in bad video quality, therefore we only enable it for version >= 96
* Fixes a bug where remote audio is not being played out if the user joins audio and video muted from pre-join screen on Safari
* E2EE fixes and improvements
* Don't stop local screen-sharing on mute all
* Always prioritize screen-sharing even in tile view
* Enables XMPP MUC rate limit for lobby and breakout MUC components
* Marks safari <14 as unsupported
* Exposes supported mobile browsers

**JaaS APIs**

* Adds recording download link available event
* Keep URL params on iframe reload
* Adds config to disable screen sharing as virtual background
* Trigger events for poll created and answered
* Adds config option to disable indicator popover
* Adds support for dynamic branding
* Adds externally managed key mode
* Adds lobby auto-knock config
* Add *disableBeforeUnloadHandlers* option
* Allows disabling mode where video can be zoomed in the thumbnail
* Improves *recordingLinkAvailable* to provide TTL info
* Adds the possibility to hide extra join options' buttons
* Adds the ability to hide self view (*disableSelfView*)

## Versions

**Release version**

* Jitsi Meet: 5675.2385
* Jitsi Videobridge: 595
* Jicofo: 832

**Changelog**

* [Jitsi Meet](https://github.com/jitsi/jitsi-meet/compare/5478...5638)
* [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge/compare/ae3ffe7e...3637fda4)
* [Jicofo](https://github.com/jitsi/jicofo/compare/814...832)

Follow us on [Twitter](https://twitter.com/JaaSOfficial) to get the news about our latest releases!
