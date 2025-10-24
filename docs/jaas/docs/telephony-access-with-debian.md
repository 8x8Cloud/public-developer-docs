# Telephony access with Debian

## Prerequisites

* Use the stable release [2.0.7830](https://download.jitsi.org/stable/jitsi-meet_2.0.7830-1_all.deb) or newer.

## Steps

### Automatic setup

During the jitsi-meet installation, you will be prompted to enable telephony.  

If you selected `Yes`, then the setup was made automatically for you, and you are ready to go.

### Manual setup

Follow these steps if you did not opt in for telephony during the jitsi-meet installation process, or if something is not working as expected.

#### 1. Jitsi-Meet Configuration

Make sure the following properties exist in the **/etc/jitsi/meet/&lt;your domain&gt;-config.js** file:

/etc/jitsi/meet/&lt;your domain&gt;-config.js

```javascript
dialInConfCodeUrl: 'https://8x8.vc/v1/_jaas/vmms-conference-mapper/v1/access',
dialInNumbersUrl: 'https://8x8.vc/v1/_jaas/vmms-conference-mapper/v1/access/dids',

```

#### 2. Prosody Configuration

* Make sure the VirtualHost "jigasi.meet.jitsi" exists in the **/etc/prosody/conf.d/jaas.cfg.lua** file.
* Check the **asap_accepted_audiences** value to contain your actual domain (e.g. meet.example.com).

/etc/prosody/conf.d/jaas.cfg.lua

```javascript
VirtualHost "jigasi.meet.jitsi"
    enabled = true
    modules_enabled = {
      "ping";
      "bosh";
    }
    authentication = "token"
    app_id = "jitsi";
    asap_key_server = "https://jaas-public-keys.jitsi.net/jitsi-components/prod-8x8"
    asap_accepted_issuers = { "jaas-components" }
    asap_accepted_audiences = { "jigasi.<your domain>" }

```

* Restart prosody: **`service prosody restart`**
