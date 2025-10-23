# Enabling with lib-jitsi-meet sdk

JaaS clients using the low level lib-jitsi-meet sdk can enable rtcstats analytics and the associated analytics web hook by simply adding the following fields to existing options.

```javascript
…

const  initOptions =  {  
  …,  
  analytics: {  
    rtcstatsEnabled: true ,  
    rtcstatsEndpoint: "wss://rtcstats-server-8x8.jitsi.net/"  
  }  
}

JitsiMeetJS.init(initOptions);

…

```

This will cause clients to start sending rtcstats data, however this will not send client logs as this functionality is tied to the jitsi-meet client.  

Integrating application can send custom data points by using the following endpoint:

```javascript
JitsiMeetJS.rtcstats.sendStatsEntry(type: string, data: Object) :void

```

For example, logs could be send by calling:

```javascript
JitsiMeetJS.rtcstats.sendStatsEntry("logs", { key: "value" });

```

The line will appear in the JaaS statistics file available via the **RTCSTATS_UPLOADED** webhook.
