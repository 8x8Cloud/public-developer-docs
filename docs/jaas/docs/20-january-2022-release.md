---
id: 20-january-2022-release
title: "20 January 2022 Release"
---

# 20 January 2022 Release

## Release Highlights

**UX improvements**

* Video thumbnails redesign
* Raise hand redesign
* Conference title bar redesign
* Overflow-menu - pin reactions on menu bottom on mobile web, fixes scrolling
* Speaker-stats - prevent search from closing when enter pressed and from keeping previous state
* Avatar - fixes initials when avatar contains multiple special characters
* Fix to respects disable reactions moderation flag for popups
* Uses default remote display name in speaker stats when one is missing
* Updates for Dutch, Portuguese, Spanish, Catalan, Arabic, Russian, French, Polish, Occitan Persian and German translations
* Adds ephemeral chat notifications with user settings support
* Fixes polls usage in breakout rooms
* Allow participant search in breakout rooms
* Fixes handling of long strings in the conference info dialog
* Fixes search value clear when closing the participants panel
* Changes poll notifications to medium timeout
* Participants-pane - hides "Admit all" if knocking part < 2
* New fixed context menus for thumbnails
* Hides volume meter when audio levels are disabled
* Hides the filmstrip toggle in recordings
* Participants pane - separates participants into collapsible lists
* Fixes raise hand behaviour with regard to breakout rooms
* Virtual backgrounds - prevent buttons repositioning on click action
* Hides email field under profile settings

**JaaS APIs**

* Allow label rewrite via advanced branding
* Adds option to disable reaction moderation
* Pre-join screen - allow changing 'Enable pre meeting screen' option while pre-join screen visible
* Adds local subject config
* Adds flag to hide the participant display name
* Adds possibility to allow execution of the button's routine besides triggering `toolbarButtonClicked` API event
* Fixes startWithAudioMuted when quickly moving away from pre-join screen
* Fixes disableSelfView overwrite
* Fixes JaaS logs settings error

**Security**

* Prosody security update
* CORS mode support for avatars

## Versions

**Release version**

* Jitsi Meet: 5764
* Jitsi Videobridge: 2.1.607-g153f7e4e
* Jicofo: 840

**Changelog**

* [Jitsi Meet](https://github.com/jitsi/jitsi-meet/compare/release-5675...release-5764)
* [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge/compare/3637fda4...153f7e4e)
* [Jicofo](https://github.com/jitsi/jicofo/compare/832...840)

Follow us on [Twitter](https://twitter.com/JaaSOfficial) to get the news about our latest releases!
