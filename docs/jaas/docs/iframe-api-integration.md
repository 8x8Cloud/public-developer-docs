# Integration

## Integrate JaaS using the Jitsi IFrame API

To enable the Jitsi Meet API in your application you must use the following JavaScript (JS) Jitsi Meet API library script and integrate it into your application:

```html
<script src='https://8x8.vc/<AppID>/external_api.js'></script>
```

## Creating the Jitsi Meet API object

After you have integrated the Meet API library, you must then create the Jitsi Meet API object.

The Meet API object takes the following form:

**`api = new JitsiMeetExternalAPI(domain, options)`**

The API object constructor uses the following parameters:

* **domain**: The domain used to build the conference URL: **`8x8.vc`**.
* **options**: The object with properties. 

IFrame arguments include:

	+ **roomName**: The name of the room to join. It must be in the format: **`“<AppID>/<room>”`**`
	+ **width**: *Optional.* The created IFrame width.
	
	
	The width argument has the following characteristics:
	
	
		- A numerical value indicates the width in pixel units.
		- If a string is specified the format is a number followed by **`px`**, **`em`**, **`pt`**, or **`%`**.
	+ **height**: *Optional.* The height for the created IFrame. 
	
	
	The height argument has the following characteristics: 
	
	
		- A numerical value indicates the height in pixel units.
		- If a string is specified the format is a number followed by **`px`**, **`em`**, **`pt`**, or **`%`**.
	+ **parentNode**: The HTML DOM Element where the IFrame is added as a child. If not provided, `body` will be used as parent element.
	+ **jwt**: *Optional.* The JaaS **JWT** you have generated and signed.
	+ **configOverwrite**: *Optional.* An object containing The JS object with overrides for options defined in the [config.js](https://github.com/jitsi/jitsi-meet/blob/master/config.js) file.
	+ **interfaceConfigOverwrite**: *Optional.* The JS object with overrides for options defined in the [interface_config.js](https://github.com/jitsi/jitsi-meet/blob/master/interface_config.js) file.
	+ **onload**: *Optional.* The IFrame onload event handler.
	+ **devices**: *Optional.* Information map about the devices used in a call. More about devices [here](/jaas/docs/jaas-prefs-devices).
	+ **userInfo**: *Optional.* The JS object that contains information about the participant starting the meeting (e.g., email). This is not normally needed for JaaS since the user info is  
	
	already found in the provided JWT.
	+ **lang**: *Optional*. The default meeting language.

Example instantiating the iFrame API for AppID **`vpaas-magic-cookie-96f0941768964ab380ed0fbada7a502f`** and an endpoint(participant) with jwt **`eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtOTZmMDk0MTc2ODk2NGFiMzgwZWQwZmJhZGE3YTUwMmYvMGQ4ODVjLVNBTVBMRV9BUFAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJqaXRzaSIsImV4cCI6MTYxNDAwNTI4OCwibmJmIjoxNjEzOTk4MDgzLCJpc3MiOiJjaGF0Iiwicm9vbSI6IioiLCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtOTZmMDk0MTc2ODk2NGFiMzgwZWQwZmJhZGE3YTUwMmYiLCJjb250ZXh0Ijp7ImZlYXR1cmVzIjp7ImxpdmVzdHJlYW1pbmciOmZhbHNlLCJvdXRib3VuZC1jYWxsIjpmYWxzZSwidHJhbnNjcmlwdGlvbiI6ZmFsc2UsInJlY29yZGluZyI6ZmFsc2V9LCJ1c2VyIjp7Im1vZGVyYXRvciI6dHJ1ZSwibmFtZSI6IlRlc3QgVXNlciIsImlkIjoiYXV0aDB8NWY5MDNkN2E3N2YzYjQwMDZlYjhlNjdkIiwiYXZhdGFyIjoiIiwiZW1haWwiOiJ0ZXN0LnVzZXJAY29tcGFueS5jb20ifX19.XZTZVSVeFgGNim8YZKLwt37mcc8xkf3oSjuR28KeW8If1Xq5XI7w7K2GnsqZjF0S4XbmZzsswmfh2m9UI7Od_p3USv95Xq6gRjS6KUed5neXTs1k8rtKEtvRjHMpMPTanckTm4ol8GYi0z8Rwq7FQqRr9D8LYXWqNW7sA9pG16GXrhQMBPWEYm4usxZe5QP36PnoV-15xZ6leQ7KF3woRScxPcPb7L81bACsT0GjBzIBg_dEMpLG0ckRl4w1LW8YfnYUrbmLK4gE5FwlD8hjJOBW4z_Tm_KGu8-gYE1zzb5KlOCeVGVcik2dUEP7U4zy20iDaBXLIDoD-ayZBKkwiw`**:

```html
<script src='https://8x8.vc/vpaas-magic-cookie-96f0941768964ab380ed0fbada7a502f/external_api.js'></script>
.....
<script type="text/javascript">
  let api;

  const initIframeAPI = () => {
    const domain = '8x8.vc';
    const options = {
      roomName: 'vpaas-magic-cookie-1fc542a3e4414a44b2611668195e2bfe/ExampleRoom',
      jwt: 'eyJraWQiOiJ2cGFhcy1tYWdpYy1jb29raWUtOTZmMDk0MTc2ODk2NGFiMzgwZWQwZmJhZGE3YTUwMmYvMGQ4ODVjLVNBTVBMRV9BUFAiLCJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiJqaXRzaSIsImV4cCI6MTYxNDAwNTI4OCwibmJmIjoxNjEzOTk4MDgzLCJpc3MiOiJjaGF0Iiwicm9vbSI6IioiLCJzdWIiOiJ2cGFhcy1tYWdpYy1jb29raWUtOTZmMDk0MTc2ODk2NGFiMzgwZWQwZmJhZGE3YTUwMmYiLCJjb250ZXh0Ijp7ImZlYXR1cmVzIjp7ImxpdmVzdHJlYW1pbmciOmZhbHNlLCJvdXRib3VuZC1jYWxsIjpmYWxzZSwidHJhbnNjcmlwdGlvbiI6ZmFsc2UsInJlY29yZGluZyI6ZmFsc2V9LCJ1c2VyIjp7Im1vZGVyYXRvciI6dHJ1ZSwibmFtZSI6IlRlc3QgVXNlciIsImlkIjoiYXV0aDB8NWY5MDNkN2E3N2YzYjQwMDZlYjhlNjdkIiwiYXZhdGFyIjoiIiwiZW1haWwiOiJ0ZXN0LnVzZXJAY29tcGFueS5jb20ifX19.XZTZVSVeFgGNim8YZKLwt37mcc8xkf3oSjuR28KeW8If1Xq5XI7w7K2GnsqZjF0S4XbmZzsswmfh2m9UI7Od_p3USv95Xq6gRjS6KUed5neXTs1k8rtKEtvRjHMpMPTanckTm4ol8GYi0z8Rwq7FQqRr9D8LYXWqNW7sA9pG16GXrhQMBPWEYm4usxZe5QP36PnoV-15xZ6leQ7KF3woRScxPcPb7L81bACsT0GjBzIBg_dEMpLG0ckRl4w1LW8YfnYUrbmLK4gE5FwlD8hjJOBW4z_Tm_KGu8-gYE1zzb5KlOCeVGVcik2dUEP7U4zy20iDaBXLIDoD-ayZBKkwiw',
      width: 700,
      height: 700,
      parentNode: document.querySelector('#meet')
    };
    api = new JitsiMeetExternalAPI(domain, options);
  }

  window.onload = () => {
    initIframeAPI();
  }
</script>
...
<body><div id="meet" /></body>

```

The above will inject the meeting iframe as a child of the div with the id `meet`.
