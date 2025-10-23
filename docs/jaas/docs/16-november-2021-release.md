---
id: 16-november-2021-release
---

# 16 November 2021 Release

## Release Highlights

**UX improvements**

* Search participants added in the Participants list
* "Performance settings" on the top bar replaces "Video quality"
* Show participants context menu overlaid in a portal
* Make pre-join avatar match the other avatars
* Places dominant speaker first in the Participants list
* Fixes filmstrip scrolling issue (disables default over-scrolling policy)
* Polls UI improvements
* New default colors for avatar backgrounds
* New raise hand indicator background color
* Pre-join screen alignment improvements
* Sorting the raised hand participants in Participants list in the order they raised their hand
* Removes participant left from raised hand queue
* Drawer component improvement
* Hides/Shows toolbar on tap on mobile web

**Quality improvements**

* Fixes screen sharing not shown for some participants ([https://github.com/jitsi/lib-jitsi-meet/commit/cee62a61b45e56c4d0adc61beb2b78091ec30684](https://github.com/jitsi/lib-jitsi-meet/commit/cee62a61b45e56c4d0adc61beb2b78091ec30684))
* Fixes delay in pre-join screen when joining a conference (especially visible in large conferences)
* Performance optimizations for large calls
* Fixes a bug in Safari where remote audio is not being played out if the user joins audio and video muted from pre-join screen
* Fixes an issue on Safari where black video is rendered sometimes
* Fixes an issue with recorders showing "All recorders are busy" even after recording has started

**JaaS APIs**

* Exposes Advanced Moderation to the iFrame API
* Gets brandingDataUrl & dynamicBrandingUrl directly from the config
* Adds config for enabling disabling VP9
* Exposes knocking event and approve/reject command
* Adds config to disable screen sharing as virtual background
* Adds recording download link available event

## Versions

**Release version**

* Jitsi Meet: 5478
* Jitsi Videobridge: 575
* Jicofo: 814

**Changelog**

* [Jitsi Meet](https://github.com/jitsi/jitsi-meet/compare/release-5415-br...release-5478-br)
* [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge/compare/b802be83...ae3ffe7e)
* [Jicofo](https://github.com/jitsi/jicofo/compare/798...814)

Follow us on [Twitter](https://twitter.com/JaaSOfficial) to get the news about our latest releases!
