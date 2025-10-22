# Overview

JaaS features [Mobile SDKs](https://jitsi.github.io/handbook/docs/category/mobile) that enable integration of Jitsi into your mobile app.

To use the mobile SDKs you need to set the following fields in **`JitsiMeetConferenceOptions`**:

* Set the **`serverURL`** to **`“https://8x8.vc”`**
* Set **`token`** to your generated and signed JWT
* Set **`roomName`** to **`“\<AppID\>/\<room\>”`** with the following details:
	+ The rooms must be defined in the namespace of your AppID
	+ The **AppID** can be retrieved from the [API Key](/jaas/docs/jaas-console-api-keys) page
	+ The room should be a single-level (no slash) string composed of legitimate, safe URL characters.

You can find sample code for both Android and iOS at [**https://github.com/jitsi/jitsi-meet-sdk-samples**](https://github.com/jitsi/jitsi-meet-sdk-samples) which includes:

* [**Android** JaaS example initialization](https://github.com/jitsi/jitsi-meet-sdk-samples/blob/master/android/java/JitsiSDKTest)
* [**iOS** JaaS example initialization](https://github.com/jitsi/jitsi-meet-sdk-samples/tree/master/ios/swift/JitsiSDKTest)
