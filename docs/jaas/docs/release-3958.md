# 17 March 2023 Release

## Release Highlights

**Highlights**

* Fixes occasional "no audio" issue in large meetings
* Removes DTLS 1.0 support (require 1.2). All browsers support 1.2
* Fixes "last N" not being filled in correctly in certain corner cases
* Allows the proxied Colibri websocket to be disabled (and a direct videobridge address used)
* Add an option to assume a given value for BWE. (#1997): Feature that might be useful when testing bandwidth or video quality related issues
* Fixes an issue where the audio playback for a remote participant doesn't happen when the browser fires an error event on the audio element that the audio track is attached to
* Try to re-establish bridge websocket connection when there are remote endpoints in the call ([GitHub](https://github.com/jitsi/lib-jitsi-meet/commit/df2c3096589f25cb6680d2d618ceaed6b59b842a))
* Fixes a screen sharing issue when a call moves from p2p to videobridge (after a 3rd participant joins) ([GitHib](https://github.com/jitsi/lib-jitsi-meet/commit/0b9ab37cfeb7ea08da9bf4b2db8321f354d6b543))
* Sets a bandwidth limit for the BOSH connection
* Makes sure that pinned participants are part of selected sources and always forwarded even in low bandwidth conditions
* Fixes encordings for p2p
* Fixes pin/unpin when follow-me is enabled
* Makes screen share bitrate configurable via config.js
* Fixes local recording mic permission error handling

**UX improvements**

* Audio / video device selectors redesign
* Deep linking re-design
* Polls re-design
* Fixes always-on-top window to show participant avatar
* Fixes a virtual background issue when dynamic branding is used
* Shows a sticky notification for copying the recording link
* Updates Dutch, German and Portugese translation
* Context menu UI fixes
* Virtual background dialog fixes
* Participant count styling fixes
* Do not show hangup menu for non-moderators
* Fit the overflow menu on small heights
* Fixes chat and breaks long text in multiple lines
* Fixes sending forms after introduction of sandbox
* Improves narrow screen layout
* Chat redesign

**JaaS API**

* Makes sure that that the knocking participant event is always fired
* Unpin all participants when participant id is not provided
* Аllows to disable lobby password & group lobby config flags
* Adds custom buttons for participant menu and toolbar via config
* Face-landmarks: set session id for webhook using a function

**MISC**

* Updates gapi to use new google identity service
* Allows a different set of dial-out destinations based on AppID

## Versions

**Release version**

* Release: 3958
* Jitsi Meet: 7016
* Jitsi Videobridge: 2.2-81-g99b20c62
* Jicofo: 996

**Changelog**

* [Jitsi Meet](https://github.com/jitsi/jitsi-meet/compare/release-6909...release-7016)
* [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge/compare/c7f2b2d5...99b20c62)
* [Jicofo](https://github.com/jitsi/jicofo/compare/979...996)

Follow us on [Twitter](https://twitter.com/JaaSOfficial) to get the news about our latest releases!
