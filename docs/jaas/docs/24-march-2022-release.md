# 24 March 2022 Release

## Release Highlights

**UX improvements**

* Resizable filmstrip in stage view allowing to see the rest of the participants in a tile view layout
* Tile view thumbnail space optimizations allowing to use available space more efficiently
* Remove tile view reordering in small meetings
* Lobby chat support. Lobby messages from / to moderators.
* Allows desktop sharing in audio-only mode on the web and disables audio-only mode when the user switches to screen share
* Speaker stats UI improvements
* Makes lobby notifications transient
* Enables polls for breakout rooms by default
* Improve pre-meeting responsiveness for screens less than 1000px
* Improves recording dialog UI
* Improves pre-join screen layout in a reduced height window
* Updates Arabic, French, German, Portuguese and Swedish translations
* Fixes participant volume indicator to show the correct value after setting volume to 0
* Fixes a welcome page bug in a large call setting when the maximum number of participants is reached
* Fixes scroll for video devices
* Fixes MAX height for context menus
* Fixes quality dialog opening in audio-only mode
* Fixes private messages in breakout rooms
* Fixes break out room close before remove
* Fixes dynamic branding permissions screen not accounting for custom backgrounds

**Quality improvements**

* Improves performance for large meetings
* Improves token verification time
* Fixes incorrect packet loss stats shown in participants stats UI
* Fixes an issue where if the user joins the call and mutes themselves before others join then unmuting later doesn’t work. Firefox and Safari users affected
* Fixes a bug where camera unmute doesn't work after screen sharing in p2p
* Fixes an issue where audio is lost after a call switches from p2p to jvb

**JaaS APIs**

* Adds support for Jigasi/dial-in as a service
* Adds a hidden moderator option with "hidden-from-recorder" property
* Exposes a config for breakout rooms
* Adds "lang" API config
* Adds an "autoHideWhileChatIsOpen" option allowing to hide the chat when the toolbar is open
* Adds remote thumbnail menu configs allowing to disable the menu and hide the private chat options
* Adds missing notify.hostAskedUnmute

## Versions

**Release version**

* Jitsi Meet: 5960
* Jitsi Videobridge: 2.1-642-gcb298254
* Jicofo: 867

**Changelog**

* [Jitsi Meet](https://github.com/jitsi/jitsi-meet/compare/release-5852...release-5960)
* [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge/compare/93f4d88c...cb298254)
* [Jicofo](https://github.com/jitsi/jicofo/compare/854...867)

Follow us on [Twitter](https://twitter.com/JaaSOfficial) to get the news about our latest releases!
