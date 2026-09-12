---
date: 2026-08-24
products: ["JaaS"]
changeType: Added
title: "Override the TURN relay region"
---

You can now pin a meeting's TURN relay to a specific region using the experimental `iceServers` option on the `JitsiMeetExternalAPI` constructor. This is separate from pinning the meeting to a regional data center: that controls where the media bridge (JVB) lives, while `iceServers` controls which TURN relay a participant's media is routed through when they can't reach the bridge directly (for example, behind a restrictive firewall). By default, JaaS selects the relay it considers optimal for each participant.

## How it works

The `iceServers` option takes a list of `replace` rules. Each rule matches existing ICE servers by `targetType` (`stun`, `turn`, or `turns`) and replaces their `urls`:

```javascript
const api = new JitsiMeetExternalAPI("8x8.vc", {
    roomName: "vpaas-magic-cookie-YOUR_APP_ID/YOUR_ROOM",
    jwt: "YOUR_JWT",
    parentNode: document.querySelector('#jaas-container'),

    iceServers: {
        replace: [
            {
                targetType: 'turn',
                urls: 'turn:prod-8x8-eu-central-1-turnrelay-oracle.jitsi.net:443?transport=udp'
            },
            {
                targetType: 'turns',
                urls: 'turns:prod-8x8-eu-central-1-turnrelay-oracle.jitsi.net:443?transport=tcp'
            }
        ]
    }
});
```

- `targetType` — which ICE server entry to match: `stun`, `turn`, or `turns`.
- `urls` — the replacement URL(s), as a string or array of strings. Set to `null` to remove the entry.
- `username` / `credential` — leave unchanged so the relay keeps using the short-lived credentials JaaS issues for the meeting.

The regional TURN relay hostnames are documented in the [FAQ](/jaas/docs/faq), covering Tokyo, Mumbai, Sydney, Toronto, Frankfurt, London, Bahrain, São Paulo, N. Virginia, and Oregon.

`iceServers` is experimental, only takes effect via the iFrame API, and may change in a future release.
