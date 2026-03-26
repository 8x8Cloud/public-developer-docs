# 11 November 2025 Release

## Release Highlights

### New Features

#### Webinars & Moderation

* **Viewer Role Enhancements:** Expanded controls for demoting users to viewers, including new options in moderation menus.
* **Desktop Sharing Moderation:** Desktop sharing controls now allow moderators to enable or disable screen sharing for participants.
* **Audio Track Management:** Improved conference join/leave logic to reliably stop and remove audio tracks.
* **Polls Component (Jitsi Meet & Videobridge):** Polls now handled as a dedicated XMPP component for improved separation and scalability.
* **Configurable Participant Permissions:** New options for managing participant controls, including disabling private chat and synchronizing mute states.

#### Architecture & Build Tools

* **Developer Guide:** Added architecture documentation for contributors and code assistants (CLAUDE.md).
* **Flexible Page Sizes:** Android SDK builds now support flexible page size and C++17.
* **ELF Alignment Tool:** New script for verifying ELF alignment in Android builds.

### Bug Fixes

* **Audio Muted Bug:** Fixed rare issue where remote user appears muted despite being the dominant speaker.
* **Fresco/Giphy Conflict:** Removed forced dependency resolution for Fresco to fix GIF animation bugs with Giphy SDK on Android.
* **Proguard & Build Cleanup:** Tidied up Android Proguard rules and build scripts to fix obsolete exclusions and Dropbox build issues.
* **JavaScript Sandbox Removal:** Deprecated and removed JS sandbox modules for security and simplicity across platforms.
* **Participant Pane UI:** Improved handling of viewer and moderator roles, removed label duplication, and updated icon usage.

### Language Support

* **Standardized Language Keys:** Language file keys now use standardized format (e.g., `es-US`, `fr-CA`, `pt-BR`, `zh-CN`, `zh-TW`).
* **Expanded Translations:** Major updates and new translations for Bulgarian, French, Italian, Latvian, Portuguese, Sardinian, Spanish, Chinese, and more.
* **Accessibility:** More UI elements now have descriptive accessibility labels and strings.
* **Chat & Communication:** Added new strings for chat status, reactions, file sharing, subtitles, and participant controls.

### Miscellaneous

* **Config & Example Updates:** Clarified and expanded configuration options (desktop sharing frame rate, lobby hangup button, private chat disable, language keys).
* **Build System:** Improved Makefile, Webpack, and Metro configuration for easier multiplatform builds.
* **Giphy Analytics Stub:** Added stub to prevent unnecessary event handlers and improve privacy.

## Versions

**Release version**

* Release: 6393
* Jitsi Meet: release-8860
* Jitsi Videobridge: 2.3-259-g22868ff7d
* Jicofo: 1161

**Changelog**

* [Jitsi Meet](https://github.com/jitsi/jitsi-meet/compare/release-8717...release-8860)
* [Jitsi Videobridge](https://github.com/jitsi/jitsi-videobridge/compare/9a2123ad4...22868ff7d)

Follow us on [Twitter](https://twitter.com/JaaSOfficial) to get the news about our latest releases!
