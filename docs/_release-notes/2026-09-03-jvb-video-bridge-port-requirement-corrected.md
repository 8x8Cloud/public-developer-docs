---
date: 2026-09-03
products: ["JaaS"]
changeType: Fixed
title: "JVB video bridge port requirement corrected"
---

The [technical requirements & whitelists](/jaas/docs/technical-requirements-whitelists) page previously listed TCP port 443 as required for JVB video bridges. That was inaccurate — JVB media only requires UDP port 10000, and TCP 443 is not a valid destination port for it. The Video Bridges section has been corrected accordingly.

Other TCP/UDP 443 references on the page are unaffected: HTTPS (TCP 443) is still required for the domain whitelists, and TURN relay servers still require TCP 443 and UDP 443.
