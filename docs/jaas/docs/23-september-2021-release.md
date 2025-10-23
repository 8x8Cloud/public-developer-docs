---
id: 23-september-2021-release
---

# 23 September 2021 Release

## Release Highlights

**New Features**

* Advanced moderation allowing moderator to restrict audio and video access for any number of participants
* Adds ability to send reactions
* Adds ability to create polls
* Reorders the visible participants in the filmstrip in alphabetical order

**Quality improvements**

* Fixes the position for horizontal filmstrip view
* Fixes an error `Cannot convert undefined or null to object` on load
* Fixes shared video links not being trimmed
* Fixes alphabetical sort in participant list
* Displays green mic icon only for the active speaker
* Fixes participants pane button toggle state
* E2EE UI fixes
* Fixes recording start notification not disappearing
* Scrolls to the top when opening feedback dialog
* Don't show volume slider on iOS web

**JaaS APIs**

* Adds callStatsConfigParams config
* Adds connection indicators flags
* Adds configuration to disable removing raised hand on dominant speaker
* Adds configuration to disable chat emoticons
* Adds additional setting to order participants in speaker stats
* Adds command to set participant volume
* Makes conference info header configurable
* Exposes event used for sending browser support
* Do not show overwritten unsupported browser page for JaaS users

**MISC**

* Works around an edge case where browser bandwidth estimations get stuck. This could lead to a lot of ghosts appearing for some users
* Fixes screen sharing not appearing for certain users in a multi-regional conference
* Fixes flickering from avatar to video reported from some users when their bandwidth goes down for a short period
* Large conference signalling optimizations
* Fixes bandwidth estimation on Firefox
* Fixes audio / video delay

## Versions

**Release version**

* Jitsi Meet: 5322
* Jitsi Videobridge: 2.1-555-g692f270f
* Jicofo: 798

**Changelog**

* [Jitsi Meet](https://github.com/jitsi/jitsi-meet/compare/release-5216-hf...release-5322-hf)
* [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge/compare/062e9f56...2ad6eb0b)
* [Jicofo](https://github.com/jitsi/jicofo/compare/786...798)

Follow us on [Twitter](https://twitter.com/JaaSOfficial) to get the news about our latest releases!
