# Telephony access with Manual Installation

## Steps

### 1. Jitsi-Meet Configuration

Update the following urls in **config.js**:

config.js

```
dialInConfCodeUrl:  'https://8x8.vc/v1/_jaas/vmms-conference-mapper/v1/access',
dialInNumbersUrl: 'https://8x8.vc/v1/_jaas/vmms-conference-mapper/v1/access/dids',

```

### 2. Prosody Configuration

Edit the prosody configuration file by adding the VirtualHost "jigasi.meet.jitsi":

* Make sure to set the **enabled** field to **true**.
* Update the **asap_accepted_audiences** by replacing `<your domain>` with your actual domain (e.g. meet.example.com).

/etc/prosody/conf.avail/&lt;your domain&gt;.cfg.lua

```
VirtualHost "jigasi.meet.jitsi"
    enabled = true
    modules_enabled = {
      "ping";
      "bosh";
      "muc_password_check";
    }
    authentication = "token"
    app_id = "jitsi";
    asap_key_server = "https://jaas-public-keys.jitsi.net/jitsi-components/prod-8x8"
    asap_accepted_issuers = { "jaas-components" }
    asap_accepted_audiences = { "jigasi.<your domain>" }

```

* Run **`ln -s /etc/prosody/conf.avail/jaas.cfg.lua /etc/prosody/conf.d/jaas.cfg.lua`**
* Restart prosody: **`service prosody restart`**

## Password protected rooms

* Skip instructions if using clean install of stable release [2.0.7648](https://github.com/jitsi/jitsi-meet/releases/tag/stable%2Fjitsi-meet_7648) or newer
* Make sure `muc_password_check` module is enabled under `jigasi.meet.jitsi` virtual host in prosody config.
* Make sure the nginx config contains `/_api/room-info` endpoints:

```
    location = /_api/room-info {
        proxy_pass http://prosody/room-info?prefix=$prefix&$args;
        proxy_http_version 1.1;
        proxy_set_header X-Forwarded-For $remote_addr;
        proxy_set_header Host $http_host;
    }
    
    location ~ ^/([^/?&:'"]+)/_api/room-info {
        set $subdomain "$1.";
        set $subdir "$1/";
        set $prefix "$1";

        rewrite ^/(.*)$ /_api/room-info;
    }

```

 For reference look at [default nginx config template](https://github.com/jitsi/jitsi-meet/blob/master/doc/debian/jitsi-meet/jitsi-meet.example).
