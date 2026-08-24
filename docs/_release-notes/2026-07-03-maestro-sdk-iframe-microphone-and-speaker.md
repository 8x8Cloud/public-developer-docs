---
date: 2026-07-03
products: ["Tech Partner"]
changeType: Added
title: "Maestro SDK iframe microphone and speaker"
---

When you embed the Maestro SDK in an `<iframe>`, loading the URL on its own isn't enough to enable audio — modern browsers block microphone capture and speaker selection unless the embedding page explicitly grants them. The Maestro SDK overview now documents the `allow` attribute you need so that call and audio features work inside the iframe.

## Grant microphone and speaker permissions

Add both permissions to the iframe's `allow` attribute:

```html
<iframe allow="microphone *; speaker-selection *;"></iframe>
```

- **`microphone *`** — lets the embedded app request microphone access to capture the user's audio. Without it, microphone input is blocked by the browser.
- **`speaker-selection *`** — lets the embedded app offer a choice of audio output device (speakers, headphones, and so on).

## The browser still prompts the user

Even with the correct iframe permissions, browsers such as Google Chrome still ask the user to allow microphone access before audio capture can begin. The user must accept that browser prompt for audio features to work.

For the full embedding requirements, the CTI URL, and screenshots of the speaker-selection and microphone prompts, see the [Maestro SDK overview](/tech-partner/docs/partner-sdk-maestro-sdk-overview).
