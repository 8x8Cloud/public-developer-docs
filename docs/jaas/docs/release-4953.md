# 2 April 2024 Release

## Release Highlights

**UX/UI**

* Adds a Whiteboard feature
* Adds the conference duration timer in the observer/visitor view in a large call
* Adds the ability to switch participants to observers/visitors
* Optimizing calculations of available buttons set in toolbar
* Enables the following new buttons/features for observers/visitors: full screen, speaker stats, video quality

**Quality**

* Fixes a rare race condition that could cause a user join failure
* Fixes an issue with delayed audio in some cases
* Fixes an issue with recording link being generated with a wrong region in some cases
* Performance optimization when approving multiple participants from lobby
* Fixes an issue when p2p connection with Firefox version 123 fails in some cases
* Fixes an issue with stopping the screen share on Safari browser
* Improves rate limiting mechanisms

**JaaS APIs**

* Fixes an issue with creating a duplicate entries for custom buttons in config
* Exposes the meeting session via the API

## Client version update Apr 17, 2024

* Fixes an edge case where the large video is showing an avatar
* Adds camera and mic configs allowing force mute/unmute in visitor/observer promotion flow

## Client version update May 2, 2024

* Adds guardrails for visitors/observers to join a meeting before an active participant

## Versions

**Release version**

* Release: 4953
* Jitsi Meet: 7874
* Jitsi Videobridge: 2.3-92-g64f9f34f
* Jicofo: 1075

**Changelog**

* [Jitsi Meet](https://github.com/jitsi/jitsi-meet/compare/release-7790...release-7874)
* [Jicofo](https://github.com/jitsi/jicofo/compare/1067...1075)
* [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge/compare/a015be96...64f9f34f)

Follow us on [Twitter](https://twitter.com/JaaSOfficial) to get the news about our latest releases!
