# Telephony access with Docker

## Prerequisites

* Ensure you have a valid certificate for the host domain.
* Use the stable release [2.0.7648](https://github.com/jitsi/docker-jitsi-meet/releases/tag/stable-7648-4) or newer.

## Steps

* In your **.env** file, set the **PUBLIC_URL** to the host domain and **`ENABLE_JAAS_COMPONENTS=1`**
* Run **`docker-compose up --force-recreate -d`**
