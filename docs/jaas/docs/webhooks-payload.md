# Payload structure

The JaaS webhook requests have the following payload structure types:

- **`idempotencyKey`** (string): The GUID value identifying the request. Two requests having the same **`idempotencyKey`** are duplicated, thus the latter needs to be ignored. JaaS recommends using an internal map in order to keep track of duplicate requests.
- **`customerId`** (string): The ID of the current JaaS implementation user
- **`eventType`** (enum: one of **`eventTypes`**): The current request type as described in the **`eventTypes`** section.
- **`sessionId`** (string): The identifier for the current meeting session.
- **`timestamp`** (long): The unique Unix timestamp for the event. Since events are not guaranteed to be cataloged in chronological order on the listening Webhook endpoint, consider this notation as the source of truth.
- **`fqn`** (string): The fully qualified name (fqn) of the meeting in the format **`[AppID]/[room name]`**
- **`data`** (object): This object contains data specific to each of the noted **`eventTypes`**.

The following shows the object structure per event type:

## **_ROOM_CREATED_**

The webhook is called when a conference is created.

- **`conference`** (string): The full room name.
- **`isBreakout`** (boolean): Identifies whether the event happened in a breakout room.
- **`breakoutRoomId`** (string): The identifier for the room, in case the event happened in a breakout room.

For example:

```json
{
    "idempotencyKey": "d11f155d-ced5-4a7e-b6d9-aaa135c64f65",
    "customerId": "c2824d584eac4489a1e32e4e164d5a3c",
    "appId": "vpaas-magic-cookie-c2824d584eac4489a1e32e4e164d5a3c",
    "eventType": "ROOM_CREATED",
    "sessionId": "c3348153-1027-4382-afad-5ae91b433c26",
    "timestamp": 1600951800112,
    "fqn": "vpaas-magic-cookie-c2824d584eac4489a1e32e4e164d5a3c/testroom2",
    "data": {
        "conference": "testroom2@conference.vpaas-magic-cookie-c2824d584eac4489a1e32e4e164d5a3c.stage.8x8.vc",
        "isBreakout": true,
        "breakoutRoomId": "e0f49fd5-c3dc-4f36-9612-8cdab4d8ccfd"
    }
}
```

## **_PARTICIPANT_LEFT_**

The webhook is called when a participant left the meeting.

- **`moderator`** (boolean or string: **`“true”`**\|**`”false”`**\`): Identifies whether the participant is a moderator for the meeting
- **`name`** (string): The full name of the participant
- **`group`** (string): The participant's group affiliation
- **`email`** (string): The participant’s email
- **`id`** (string): The participant’s **`userId`** from the JWT payload
- **`participantJid`** (string): The participant’s **`xmpp`** (prosody) **`jid`** (jabber id)
- **`participantId`** (string): The participant's universal unique identifier used across the whole infrastructure (jitsi meet, events, webhooks)
- **`avatar`** (string): The participant’s avatar URL.
- **`disconnectReason`** (string: **`“left”`**\|**`”kicked”`**\|**`”unknown”`**\|**`”switch_room”`**\|**`”unrecoverable_error”`**): The reason why a participant left the meeting. **`Unknown`** means that a participant experienced a connection issue and **`switch_room`** is used when a participant joins a breakout room from the main room or vice versa.
- **`isBreakout`** (boolean): Identifies whether the event happened in a breakout room.
- **`breakoutRoomId`** (string): The identifier for the room, in case the event happened in a breakout room.

For example:

```json
{
   "idempotencyKey":"0de492ee-1efa-4a50-8b41-66904e12e282",
   "customerId":"c2824d584eac4489a1e32e4e164d5a3c",
   "appId":"vpaas-magic-cookie-c2824d584eac4489a1e32e4e164d5a3c",
   "eventType":"PARTICIPANT_LEFT",
   "sessionId":"c3348153-1027-4382-afad-5ae91b433c26",
   "timestamp":1600952723655,
   "fqn":"vpaas-magic-cookie-c2824d584eac4489a1e32e4e164d5a3c/testroom2",
   "data":{
      "moderator":"true",
      "name":"John Doe",
      "disconnectReason":"left",
      "group":"vpaas-magic-cookie-c2824d584eac4489a1e32e4e164d5a3c",
      "email":"john.dow@company.com",
      "id":"uniqueUserIdentifier",
      "participantJid":"3988218d-a6ef-40cf-8b1b-f5097f46fbf7@stage.8x8.vc",
      "participantId":"3988218d",
      "avatar":"https://link.to/user/avatar/picture",
      "isBreakout":true,
      "breakoutRoomId":"e0f49fd5-c3dc-4f36-9612-8cdab4d8ccfd"
   }
}
```

## **_PARTICIPANT_LEFT_LOBBY_**

The webhook is called when a participant leaves the lobby.

- **`moderator`** (boolean or string: **`“true”`**\|**`”false”`**\`): Identifies whether the participant is a moderator for the meeting
- **`name`** (string): The full name of the participant
- **`group`** (string): The participant's group affiliation
- **`email`** (string): The participant’s email
- **`id`** (string): The participant’s **`userId`** from the JWT payload
- **`participantJid`** (string): The participant’s **`xmpp`** (prosody) **`jid`** (jabber id)
- **`participantId`** (string): The participant's universal unique identifier used across the whole infrastructure (jitsi meet, events, webhooks)
- **`avatar`** (string): The participant’s avatar URL.
- **`disconnectReason`** (string: **`“left”`**\|**`”kicked”`**): The reason why a participant left the lobby.
- **`isBreakout`** (boolean): Identifies whether the event happened in a breakout room.
- **`breakoutRoomId`** (string): The identifier for the room, in case the event happened in a breakout room.

For example:

```json
{
   "eventType":"PARTICIPANT_LEFT_LOBBY",
   "sessionId":"e0654474-eadc-4e1b-99a2-878a4969e475",
   "timestamp":1692167572145,
   "fqn":"vpaas-magic-cookie-0f53759e44204b26ad74e6315a5bf83a/lobbymeeting",
   "idempotencyKey":"547c5388-cec3-4530-9381-480e1fcf372d",
   "customerId":"0f53759e44204b26ad74e6315a5bf83a",
   "appId":"vpaas-magic-cookie-0f53759e44204b26ad74e6315a5bf83a",
   "data":{
      "moderator":false,
      "hidden-from-recorder":false,
      "id":"22efffd2458f483ab3706ebcb9a8cf57",
      "disconnectReason":"left",
      "name":"John",
      "participantJid":"10a78ee2-5805-45fe-a99fc147a8d07e77@8x8.vc",
      "participantId":"3988218d",
      "avatar":"https://link.to/user/avatar/picture",
      "email":"john.dow@company.com"
   }
}
```

## **_TRANSCRIPTION_UPLOADED_**

The webhook is called when the meeting ends.

- **`preAuthenticatedLink`** (string): The preauthenticated download URL for the meeting transcriptions file. The URL link is valid for 24 hours.

For example:

```json
{
  "idempotencyKey": "e9536d20-41e3-4944-9c37-46b786abf793",
  "customerId": "c2824d584eac4489a1e32e4e164d5a3c",
  "appId": "vpaas-magic-cookie-c2824d584eac4489a1e32e4e164d5a3c",
  "eventType": "TRANSCRIPTION_UPLOADED",
  "sessionId": "38e68a1f-8975-4518-99df-5f151eaf31e3",
  "timestamp": 1612352845815,
  "fqn": "vpaas-magic-cookie-c2824d584eac4489a1e32e4e164d5a3c/testroom",
  "data": {
    "preAuthenticatedLink": "https://link.to/transcriptions/file"
  }
}
```

## **_CHAT_UPLOADED_**

The webhook is called when the meeting ends.

- **`preAuthenticatedLink`** (string): The preauthenticated download URL for the meeting chat file. The URL link is valid for 24 hours.

For example:

```json
{
  "idempotencyKey": "e9536d20-41e3-4944-9c37-46b786abf793",
  "customerId": "c2824d584eac4489a1e32e4e164d5a3c",
  "appId": "vpaas-magic-cookie-c2824d584eac4489a1e32e4e164d5a3c",
  "eventType": "CHAT_UPLOADED",
  "sessionId": "38e68a1f-8975-4518-99df-5f151eaf31e3",
  "timestamp": 1612352845815,
  "fqn": "vpaas-magic-cookie-c2824d584eac4489a1e32e4e164d5a3c/testroom",
  "data": {
    "preAuthenticatedLink": "https://link.to/chat/file"
  }
}
```

## **_ROOM_DESTROYED_**

The webhook is called when the room is destroyed.

- **`conference`** (string): The full room name.
- **`isBreakout`** (boolean): Identifies whether the event happened in a breakout room.
- **`breakoutRoomId`** (string): The identifier for the room, in case the event happened in a breakout room.

For example:

```json
{
    "idempotencyKey": "251d4ca8-6192-403c-9098-645042679257",
    "customerId": "c2824d584eac4489a1e32e4e164d5a3c",
    "appId": "vpaas-magic-cookie-c2824d584eac4489a1e32e4e164d5a3c",
    "eventType": "ROOM_DESTROYED",
    "sessionId": "c3348153-1027-4382-afad-5ae91b433c26",
    "timestamp": 1600952155289,
    "fqn": "vpaas-magic-cookie-c2824d584eac4489a1e32e4e164d5a3c/testroom2",
    "data": {
        "conference": "testroom2@conference.vpaas-magic-cookie-c2824d584eac4489a1e32e4e164d5a3c.stage.8x8.vc",
        "isBreakout": true,
        "breakoutRoomId": "e0f49fd5-c3dc-4f36-9612-8cdab4d8ccfd"
    }
}
```

## **_PARTICIPANT_JOINED_**

The webhook is called when a participant joined the meeting.

- **`moderator`** (boolean or string: **`“true”`**\|**`”false”`**\`): Identifies whether the participant is a moderator for the meeting
- **`name`** (string): The full name of the participant
- **`group`** (string): The participant’s group name
- **`email`** (string): The participant’s email of the participant
- **`id`** (string): The participant’s **`userId`** from the JWT payload
- **`participantJid`** (string): The participant’s **`xmpp`** (prosody) **`jid`** (jabber id)
- **`participantId`** (string): The participant's universal unique identifier used across the whole infrastructure (jitsi meet, events, webhooks)
- **`avatar`** (string): The participant’s avatar URL
- **`isBreakout`** (boolean): Identifies whether the event happened in a breakout room.
- **`breakoutRoomId`** (string): The identifier for the room, in case the event happened in a breakout room.

For example:

```json
{
   "idempotencyKey":"45892714-7bf6-49b8-8c6a-856a92ff6d8a",
   "customerId":"c2824d584eac4489a1e32e4e164d5a3c",
   "appId":"vpaas-magic-cookie-c2824d584eac4489a1e32e4e164d5a3c",
   "eventType":"PARTICIPANT_JOINED",
   "sessionId":"c3348153-1027-4382-afad-5ae91b433c26",
   "timestamp":1600951818143,
   "fqn":"vpaas-magic-cookie-c2824d584eac4489a1e32e4e164d5a3c/testroom2",
   "data":{
      "moderator":"true",
      "name":"John Doe",
      "group":"vpaas-magic-cookie-c2824d584eac4489a1e32e4e164d5a3c",
      "email":"john.dow@company.com",
      "id":"uniqueUserIdentifier",
      "participantJid":"3988218d-a6ef-40cf-8b1b-f5097f46fbf7@stage.8x8.vc",
      "participantId":"3988218d",
      "avatar":"https://link.to/user/avatar/picture",
      "isBreakout":true,
      "breakoutRoomId":"e0f49fd5-c3dc-4f36-9612-8cdab4d8ccfd"
   }
}
```

## **_PARTICIPANT_JOINED_LOBBY_**

The webhook is called when a participant joins the lobby.

- **`moderator`** (boolean or string: **`“true”`**\|**`”false”`**\`): Identifies whether the participant is a moderator for the meeting
- **`name`** (string): The full name of the participant
- **`group`** (string): The participant’s group name
- **`email`** (string): The participant’s email of the participant
- **`id`** (string): The participant’s **`userId`** from the JWT payload
- **`participantJid`** (string): The participant’s **`xmpp`** (prosody) **`jid`** (jabber id)
- **`participantId`** (string): The participant's universal unique identifier used across the whole infrastructure (jitsi meet, events, webhooks)
- **`avatar`** (string): The participant’s avatar URL
- **`isBreakout`** (boolean): Identifies whether the event happened in a breakout room.
- **`breakoutRoomId`** (string): The identifier for the room, in case the event happened in a breakout room.

For example:

```json
{
   "eventType":"PARTICIPANT_JOINED_LOBBY",
   "sessionId":"e0654474-eadc-4e1b-99a2-878a4969e475",
   "timestamp":1692167567853,
   "fqn":"vpaas-magic-cookie-0f53759e44204b26ad74e6315a5bf83a/lobbymeeting",
   "idempotencyKey":"ed74529e-7491-4bc0-aa7a-e3406fbaf385",
   "customerId":"0f53759e44204b26ad74e6315a5bf83a",
   "appId":"vpaas-magic-cookie-0f53759e44204b26ad74e6315a5bf83a",
   "data":{
      "moderator":false,
      "hidden-from-recorder":false,
      "id":"22efffd2458f483ab3706ebcb9a8cf57",
      "name":"John",
      "participantJid":"10a78ee2-5805-45fe-a99f-c147a8d07e77@8x8.vc",
      "participantId":"3988218d",
      "avatar":"https://link.to/user/avatar/picture",
      "email":"john.dow@company.com"
   }
}
```

## **_RECORDING_STARTED_**

The webhook is called when recording is started.

- **`conference`** (string): The full room name

For example:

```json
{
   "idempotencyKey":"2a2ad143-fb2b-409e-995d-9e2fd74b8792",
   "customerId":"143ce1379c35426aa80a902a0204ed09",
   "appId": "vpaas-magic-cookie-143ce1379c35426aa80a902a0204ed09",
   "eventType":"RECORDING_STARTED",
   "sessionId":"be4d177c-a342-41e6-a9b9-8be7ff0b0cc8",
   "timestamp":1623751315624,
   "appId":"vpaas-magic-cookie-c2824d584eac4489a1e32e4e164d5a3c",
   "fqn":"vpaas-magic-cookie-c2824d584eac4489a1e32e4e164d5a3c/testroom2",
   "data":{
      "conference":"testroom2@conference.vpaas-magic-cookie-c2824d584eac4489a1e32e4e164d5a3c.stage.8x8.vc"
   }
}
```

## **_RECORDING_ENDED_**

The webhook is called when recording is ended.

- **`conference`** (string): The full room name

For example:

```json
{
   "idempotencyKey":"12e2181c-c5b1-4421-9d6c-5d9784a0fc9b",
   "customerId":"143ce1379c35426aa80a902a0204ed09",
   "appId": "vpaas-magic-cookie-143ce1379c35426aa80a902a0204ed09",
   "eventType":"RECORDING_ENDED",
   "sessionId":"be4d177c-a342-41e6-a9b9-8be7ff0b0cc8",
   "timestamp":1623751329561,
   "appId":"vpaas-magic-cookie-c2824d584eac4489a1e32e4e164d5a3c",
   "fqn":"vpaas-magic-cookie-c2824d584eac4489a1e32e4e164d5a3c/testroom2",
   "data":{
      "conference":"testroom2@conference.vpaas-magic-cookie-c2824d584eac4489a1e32e4e164d5a3c.stage.8x8.vc"
   }
}
```

## **_RECORDING_UPLOADED_**

The webhook is called when the meeting ends.

- **`participants`** (an array of objects): The list of participants in a meeting when recording was uploaded.
- **`name`** (string): The full name of the user
- **`avatar`** (string): The user’s avatar URL
- **`id`** (string): The **`userId`**
- **`preAuthenticatedLink`** (string): The preauthenticated download URL for the meeting recording. The URL link is valid for 24 hours.
- **`share`** (boolean): Identifies whether the recording is shared
- **`initiatorId`** (string): The **`id`** of the recording initiator
- **`durationSec`** (long): The duration of the recording in seconds
- **`startTimestamp`** (long): The UNIX timestamp in milliseconds when the recording has started
- **`endTimestamp`** (long): The UNIX timestamp in milliseconds when the recording has ended
- **`recordingSessionId`** (string): Identifier for recording session

For example:

```json
{
    "idempotencyKey": "c2b42ad3d-12a6-5908-cf38-f21ae2451fc0",
    "customerId": "c2824d584eac4489a1e32e4e164d5a3c",
    "appId": "vpaas-magic-cookie-c2824d584eac4489a1e32e4e164d5a3c",
    "eventType": "RECORDING_UPLOADED",
    "sessionId": "c3348153-1027-4382-afad-5ae91b433c26",
    "timestamp": 1600952817465,
    "fqn": "vpaas-magic-cookie-c2824d584eac4489a1e32e4e164d5a3c/testroom2",
    "data": {
        "participants": [
            {
                "name": "Jane Doe",
                "avatar": "https://link.to/user/avatar/picture1",
                "id": "uniqueUserIdentifier1"
            },
            {
                "name": "John Doe ",
                "avatar": "https://link.to/user/avatar/picture2",
                "id": "uniqueUserIdentifier2"
            }
        ],
        "preAuthenticatedLink": "https://objectstorage.us-phoenix-1.oraclecloud.com/p/hrnGsHYw-ct5undQ5eL3zK1r1UzqHlnYMwRtCdDgn22qx7GZTOl_NDL5ACC4UbJk/n/fr4eeztjonbe/b/vpaas-recordings-stage-8x8-us-phoenix-1/o/vpaas-magic-cookie-c2824d584eac4489a1e32e4e164d5a3c/testroom2_2020-09-24-12-01-07.mp4",
        "share": true,
        "initiatorId": "uniqueUserIdentifier1",
        "durationSec": 15,
        "startTimestamp": 1612175247396,
        "endTimestamp": 1612175263000,
        "recordingSessionId": "nkdsnfkdfkjdsfdsjklds"
    }
}
```

## **_LIVE_STREAM_STARTED_**

The webhook is called when a live stream is started.

- **`conference`** (string): The full room name

For example:

```json
{
  "idempotencyKey": "251d4ca8-6192-403c-9098-645042679257",
  "customerId": "c2824d584eac4489a1e32e4e164d5a3c",
  "appId": "vpaas-magic-cookie-c2824d584eac4489a1e32e4e164d5a3c",
  "eventType": "LIVE_STREAM_STARTED",
  "sessionId": "c3348153-1027-4382-afad-5ae91b433c26",
  "timestamp": 1612354430008,
  "fqn": "vpaas-magic-cookie-c2824d584eac4489a1e32e4e164d5a3c/testroom2",
  "data": {
    "conference": "testroom2@conference.vpaas-magic-cookie-c2824d584eac4489a1e32e4e164d5a3c.stage.8x8.vc"
  }
}
```

## **_LIVE_STREAM_ENDED_**

The webhook is called when a live stream has ended.

- **`conference`** (string): The full room name

For example:

```json
{
  "idempotencyKey": "251d4ca8-6192-403c-9098-645042679257",
  "customerId": "c2824d584eac4489a1e32e4e164d5a3c",
  "eventType": "LIVE_STREAM_ENDED",
  "sessionId": "c3348153-1027-4382-afad-5ae91b433c26",
  "timestamp": 1612354445154,
  "fqn": "vpaas-magic-cookie-c2824d584eac4489a1e32e4e164d5a3c/testroom2",
  "data": {
    "conference": "testroom2@conference.vpaas-magic-cookie-c2824d584eac4489a1e32e4e164d5a3c.stage.8x8.vc"
  }
}
```

## **_SETTINGS_PROVISIONING_**

Before every meeting the registered `URL` will be called using a `POST` request with payload:

```json
{
  "fqn": "AppID/roomName"
}
```

- The expected json response from the registered `URL`:

```json
{
  "lobbyEnabled": true,
  "passcode": "0000",
  "lobbyType": "WAIT_FOR_APPROVAL",
  "maxOccupants": 4,
  "transcriberType": "EGHT_WHISPER",
  "participantsSoftLimit": 3,
  "visitorsEnabled": true,
  "hideDisplayName": "GUEST"
}
```

- **`lobbyEnabled`** (boolean: **`true`**\|**`false`**): If the value is `true` the meeting will start with lobby enabled and only moderators can join, participants will wait in the lobby until a moderator give them access. If `false` or the field is `missing` from the response the meeting will start without a lobby.
- **`passcode`** (string: digits only): The passcode that the meeting will start with. If `empty` or the field is `missing` the meeting will start without a passcode.
- **`lobbyType`** (string (optional): **`WAIT_FOR_APPROVAL`** \| **`WAIT_FOR_MODERATOR`**): if `WAIT_FOR_MODERATOR` is returned the lobby is automatically disabled after the first moderator joins. If `WAIT_FOR_APPROVAL` is returned or the `lobbyType` field is missing, non-moderator participants must ask to join and be approved by a moderator from the room.
- **`maxOccupants`** (integer (optional)): The maximum number of participants that can be at the same time in a meeting. Should be a value between 2 and 500.
- **`transcriberType`** (string (optional)): **`GOOGLE`** \| **`ORACLE_CLOUD_AI_SPEECH`** \| **`EGHT_WHISPER`**: if the field is missing, it will default to the option selected in the JaaS Admin Panel under the AI Services section.
- **`participantsSoftLimit`** (number (optional)): the number of spots available for participants. Anyone joining after that will be considered a visitor, if the visitor functionality is enabled (see below). Otherwise, the field will be ignored.
- **`visitorsEnabled`** (boolean (optional)): whether the visitor functionality is enabled. The feature is disabled by default.
- **`hideDisplayName`** (string (optional)): **`GUEST`** : when specified, it will hide the participant names for non-moderators.

## **_SIP_CALL_IN_STARTED_**

The webhook is called when a sip call-in is started.

- **`sipAddress`** (string): The sip address of the caller
- **`participantJid`** (string): The participant’s **`xmpp`** (prosody) **`jid`** (jabber id)
- **`participantId`** (string): The participant's universal unique identifier used across the whole infrastructure (jitsi meet, events, webhooks)
- **`nick`** (string): The name of the caller. Normally it's a human-readable version of the caller id

For example:

```json
{
  "idempotencyKey": "6f36a817-a220-471f-bd51-f0fdb53e09c9",
  "customerId": "9708f84c111b4c54a8e0374fa4bcb15a",
  "appId": "vpaas-magic-cookie-9708f84c111b4c54a8e0374fa4bcb15a",
  "eventType": "SIP_CALL_IN_STARTED",
  "sessionId": "98e91f3d-0de7-4a17-b4ce-cd8fbe497d3e",
  "timestamp": 1621857054828,
  "fqn": "vpaas-magic-cookie-9708f84c111b4c54a8e0374fa4bcb15a/sampleappshyadviceprograminside",
  "data": {
    "sipAddress": "sip:username@somesipprovider.com",
    "participantJid": "92b9a1d6-9339-4f42-b51e-a190a386140b@stage.8x8.vc",
    "participantId": "10a78ee2",
    "nick": "nickname"
  }
}
```

## **_SIP_CALL_IN_ENDED_**

The webhook is called when a sip call-in is ended.

- **`participantJid`** (string): The participant’s **`xmpp`** (prosody) **`jid`** (jabber id)
- **`participantId`** (string): The participant's universal unique identifier used across the whole infrastructure (jitsi meet, events, webhooks)

For example:

```json
{
  "idempotencyKey": "6f36a817-a220-471f-bd51-f0fdb53e09c9",
  "customerId": "9708f84c111b4c54a8e0374fa4bcb15a",
  "appId": "vpaas-magic-cookie-9708f84c111b4c54a8e0374fa4bcb15a",
  "eventType": "SIP_CALL_IN_ENDED",
  "sessionId": "98e91f3d-0de7-4a17-b4ce-cd8fbe497d3e",
  "timestamp": 1621857054828,
  "fqn": "vpaas-magic-cookie-9708f84c111b4c54a8e0374fa4bcb15a/sampleappshyadviceprograminside",
  "data": {
    "participantJid": "92b9a1d6-9339-4f42-b51e-a190a386140b@stage.8x8.vc",
    "participantId": "10a78ee2"
  }
}
```

## **_SIP_CALL_OUT_STARTED_**

The webhook is called when a sip call-out is started.

- **`sipAddress`** (string): The sip address of the callee
- **`participantJid`** (string): The participant’s **`xmpp`** (prosody) **`jid`** (jabber id)
- **`participantId`** (string): The participant's universal unique identifier used across the whole infrastructure (jitsi meet, events, webhooks)
- **`nick`** (string): The name of the callee. Normally it's the sip address's username

For example:

```json
{
  "idempotencyKey": "6f36a817-a220-471f-bd51-f0fdb53e09c9",
  "customerId": "9708f84c111b4c54a8e0374fa4bcb15a",
  "appId": "vpaas-magic-cookie-9708f84c111b4c54a8e0374fa4bcb15a",
  "eventType": "SIP_CALL_OUT_STARTED",
  "sessionId": "98e91f3d-0de7-4a17-b4ce-cd8fbe497d3e",
  "timestamp": 1621857054828,
  "fqn": "vpaas-magic-cookie-9708f84c111b4c54a8e0374fa4bcb15a/sampleappshyadviceprograminside",
  "data": {
    "sipAddress": "sip:username@somesipprovider.com",
    "participantJid": "92b9a1d6-9339-4f42-b51e-a190a386140b@stage.8x8.vc",
    "participantId": "10a78ee2",
    "nick": "nickname"
  }
}
```

## **_SIP_CALL_OUT_ENDED_**

The webhook is called when a sip call-out is ended.

- **`participantJid`** (string): The participant’s **`xmpp`** (prosody) **`jid`** (jabber id)
- **`participantId`** (string): The participant's universal unique identifier used across the whole infrastructure (jitsi meet, events, webhooks)

For example:

```json
{
  "idempotencyKey": "6f36a817-a220-471f-bd51-f0fdb53e09c9",
  "customerId": "9708f84c111b4c54a8e0374fa4bcb15a",
  "appId": "vpaas-magic-cookie-9708f84c111b4c54a8e0374fa4bcb15a",
  "eventType": "SIP_CALL_OUT_ENDED",
  "sessionId": "98e91f3d-0de7-4a17-b4ce-cd8fbe497d3e",
  "timestamp": 1621857054828,
  "fqn": "vpaas-magic-cookie-9708f84c111b4c54a8e0374fa4bcb15a/sampleappshyadviceprograminside",
  "data": {
    "participantJid": "92b9a1d6-9339-4f42-b51e-a190a386140b@stage.8x8.vc",
    "participantId": "10a78ee2"
  }
}
```

## **_FEEDBACK_**

The webhook is called when a feedback is submitted.

- **`rating`** (number:**`1`** to **`5`** or **`-1`** if not specified): The feedback rating score.
- **`comments`** (string): The feedback comment
- **`userId`** (string): The userId from the JWT

For example:

```json
{
   "idempotencyKey":"347cc653-c66c-4ddd-9f89-cd0bbc7a6034",
   "customerId":"143ce1379c35426aa80a902a0204ed09",
   "eventType":"FEEDBACK",
   "sessionId":"be4d177c-a342-41e6-a9b9-8be7ff0b0cc8",
   "timestamp":1623751337550,
   "appId":"vpaas-magic-cookie-143ce1379c35426aa80a902a0204ed09",
   "fqn":"vpaas-magic-cookie-143ce1379c35426aa80a902a0204ed09/testroom2",
   "data":{
      "rating":5,
      "comments":"test feedback",
      "userId":"cd4d177c-b342-41e6-a9b9-8be7ff0b0cc8"
   }
}
```

## **_DIAL_IN_STARTED_**

- **`direction`** (string: **`in`**): the direction of the call
- **`nick`** (string): phone number that identifies the caller
- **`participantJid`** (string): unique id of the dial participant
- **`participantId`** (string): The participant's universal unique identifier used across the whole infrastructure (jitsi meet, events, webhooks)

For example:

```json
{
  "timestamp" : 1617182201627,
  "customerId" : "9708f84c111b4c54a8e0374fa4bcb15a",
  "appId":"vpaas-magic-cookie-9708f84c111b4c54a8e0374fa4bcb15a",
  "eventType" : "DIAL_IN_STARTED",
  "idempotencyKey" : "4431e735-b327-4e38-9e29-a8136d4d3624",
  "fqn" : "vpaas-magic-cookie-9708f84c111b4c54a8e0374fa4bcb15a/sampleappempiricalrolesgrabforward",
  "sessionId" : "c808aef2-9bb0-4328-ae1a-dd8bac4dbc66",
  "data" : {
    "direction" : "in",
    "nick" : "40364630871 (+40364630871)",
    "participantJid" : "47bc002e-3473-4e39-8001-c487e0622542@stage.8x8.vc",
    "participantId": "47bc002e"
  }
}
```

## **_DIAL_IN_ENDED_**

- **`participantJid`** (string): unique id of the dial participant
- **`participantId`** (string): The participant's universal unique identifier used across the whole infrastructure (jitsi meet, events, webhooks)

For example:

```json
{
  "timestamp" : 1617182201627,
  "customerId" : "9708f84c111b4c54a8e0374fa4bcb15a",
  "appId": "vpaas-magic-cookie-9708f84c111b4c54a8e0374fa4bcb15a",
  "eventType" : "DIAL_IN_ENDED",
  "idempotencyKey" : "4431e735-b327-4e38-9e29-a8136d4d3624",
  "fqn" : "vpaas-magic-cookie-9708f84c111b4c54a8e0374fa4bcb15a/sampleappempiricalrolesgrabforward",
  "sessionId" : "c808aef2-9bb0-4328-ae1a-dd8bac4dbc66",
  "data" : {
    "participantJid" : "47bc002e-3473-4e39-8001-c487e0622542@stage.8x8.vc",
    "participantId": "47bc002e"
  }
}
```

## **_DIAL_OUT_STARTED_**

- **`direction`** (string: **`out`**): the direction of the call
- **`nick`** (string): phone number that identifies the caller
- **`participantJid`** (string): unique id of the dial participant
- **`participantId`** (string): The participant's universal unique identifier used across the whole infrastructure (jitsi meet, events, webhooks)

For example:

```json
{
  "timestamp" : 1617182201627,
  "customerId" : "9708f84c111b4c54a8e0374fa4bcb15a",
  "appId": "vpaas-magic-cookie-9708f84c111b4c54a8e0374fa4bcb15a",
  "eventType" : "DIAL_OUT_STARTED",
  "idempotencyKey" : "4431e735-b327-4e38-9e29-a8136d4d3624",
  "fqn" : "vpaas-magic-cookie-9708f84c111b4c54a8e0374fa4bcb15a/sampleappempiricalrolesgrabforward",
  "sessionId" : "c808aef2-9bb0-4328-ae1a-dd8bac4dbc66",
  "data" : {
    "direction" : "out",
    "nick" : "40364630871 (+40364630871)",
    "participantJid" : "47bc002e-3473-4e39-8001-c487e0622542@stage.8x8.vc",
    "participantId": "47bc002e"
  }
}
```

## **_DIAL_OUT_ENDED_**

- **`participantJid`** (string): unique id of the dial participant
- **`participantId`** (string): The participant's universal unique identifier used across the whole infrastructure (jitsi meet, events, webhooks)

For example:

```json
{
  "timestamp" : 1617182201627,
  "customerId" : "9708f84c111b4c54a8e0374fa4bcb15a",
  "appId": "vpaas-magic-cookie-9708f84c111b4c54a8e0374fa4bcb15a",
  "eventType" : "DIAL_OUT_ENDED",
  "idempotencyKey" : "4431e735-b327-4e38-9e29-a8136d4d3624",
  "fqn" : "vpaas-magic-cookie-9708f84c111b4c54a8e0374fa4bcb15a/sampleappempiricalrolesgrabforward",
  "sessionId" : "c808aef2-9bb0-4328-ae1a-dd8bac4dbc66",
  "data" : {
    "participantJid" : "47bc002e-3473-4e39-8001-c487e0622542@stage.8x8.vc",
    "participantId": "47bc002e"
  }
}
```

## **_USAGE_**

- The event happens when each participant joins the meeting. When the first participant joins, MAU notifications are not invoked until the next participants join.
- **`data`** (list) the list contains information about the user that joined. When the second participant joins, the list will have the first two participants. After that, the list will contain only the current participant that joined the meeting.
- **`customerId`** (string): the tenant ID
- **`deviceId`** (string): the random UUID assignment for each participant's device. The UUID identification is not changeable unless the device's local storage is cleared or the participant uses another device (e.g. different browser, phone)
- **`email`** (string): this value can be null if it is not present in the JWT token's context user section.
- **`kid`** (string): the ID that identifies the customer's public key value.
- **`userId`** (string): this value can be null if it is not present in the JWT token's context user section.
- **`callDirection`** (enum: **`in`**\|**`out`** ): this value is for participants that join using their phone. If the participant calls into the meeting `callDirection` is `in`. If the participant calls from the meeting `callDirection` is `out`. For dial participants, the deviceId is the phone number with JWT related fields not present.

For example:

```json
{
  "idempotencyKey": "251d4ca8-6192-403c-9098-645042679257",
  "customerId": "c2824d584eac4489a1e32e4e164d5a3c",
  "appId": "vpaas-magic-cookie-c2824d584eac4489a1e32e4e164d5a3c",
  "eventType": "USAGE",
  "sessionId": "c3348153-1027-4382-afad-5ae91b433c26",
  "timestamp": 1612354445154,
  "fqn": "vpaas-magic-cookie-c2824d584eac4489a1e32e4e164d5a3c/testroom2",
  "data": [
    {
      "customerId" : "1d2e6a201d594c8f87a630e3f70826d2",
      "deviceId" : "349304d3627f59eac2015f29a9ade613",
      "email" : "user@test.com",
      "kid" : "vpaas-magic-cookie-1d2e6a201d594c8f87a630e3f70826d2/5b3c5a",
      "userId" : "google-oauth2|114025754820379595029"
    }
  ]
}
```

## **_SPEAKER_STATS_**

- **`data`** (map): map between a participant unique identifier (full jid) and the speaker extra information.
- **`name`** (string): The full name of the user
- **`avatar`** (string): The user’s avatar URL
- **`id`** (string): The **`userId`** from the jwt
- **`time`** (long): The total time a user spoke in milliseconds.

For example:

```json
{
  "timestamp" : 1617182201627,
  "customerId" : "9708f84c111b4c54a8e0374fa4bcb15a",
  "appId": "vpaas-magic-cookie-9708f84c111b4c54a8e0374fa4bcb15a",
  "eventType" : "SPEAKER_STATS",
  "idempotencyKey" : "4431e735-b327-4e38-9e29-a8136d4d3624",
  "fqn" : "vpaas-magic-cookie-9708f84c111b4c54a8e0374fa4bcb15a/sampleappempiricalrolesgrabforward",
  "sessionId" : "c808aef2-9bb0-4328-ae1a-dd8bac4dbc66",
  "data": {
    "d8d82941-dc81-4c34-a4f7-6012d7dfb30c@8x8.vc/66wbG6MC": {
      "time": 10089,
      "id": "google-oauth2|114025754820379595029",
      "name": "Test user 1",
      "email": "test.user1@mail.com"
    },
    "84d90bac-22ab-4ea1-af98-967450b81d99@8x8.vc/N6GjCJU9": {
      "time": 11277,
      "id": "google-oauth2|114025754820379595030",
      "name": "Test user 2",
      "email": "test.user2@mail.com"
    }
  }
}
```

## **_POLL_CREATED_**

- **`data`** (map): Poll data
- **`question`** (string): Question that was asked
- **`answers`** (list): List of possible answer values
- **`key`** (integer): Answer key
- **`name`** (string): Answer text
- **`pollId`** (string): Unique identifier for the poll
- **`user`** (map): Data about the user that created the poll
- **`participantJid`** (string): The participant’s **`xmpp`** (prosody) **`jid`** (jabber id)
- **`currentName`** (string): The display name the user had in the moment of poll creation
- **`id`** (string): The **`userId`** from the jwt
- **`name`** (string): The **`name`** from the jwt
- **`email`** (string): The **`email`** from the jwt
- **`isBreakout`** (boolean): Identifies whether the event happened in a breakout room.
- **`breakoutRoomId`** (string): The identifier for the room, in case the event happened in a breakout room.

For example:

```json
{
  "idempotencyKey": "d312c671-251a-47a1-b602-38b578a942c1",
  "customerId": "a062b751172947d3832406582153a4c8",
  "sessionId": "e1a019ec-72a3-419d-8e98-8c69fd7f4c0d",
  "fqn": "vpaas-magic-cookie-a062b751172947d3832406582153a4c8/meetingname",
  "eventType": "POLL_CREATED",
  "data": {
    "question": "What is your opinion about ... ?",
    "answers": [
      { "key": 1, "name": "Answer 1" },
      { "key": 2, "name": "Answer 2" },
      { "key": 3, "name": "Answer 3" },
      { "key": 4, "name": "Answer 4" }
    ],
    "user": {
      "participantJid": "a7b62236-d3de-40a3-a879-01fc76759fb1@dev-brt.8x8.vc",
      "currentName": "My Current Name",
      "id": "8847db5c-7093-4f93-b91a-4186c10e2e72",
      "name": "Jwt Name",
      "email": "a@b.com"
    },
    "pollId": "9fpjw0bmwf",
    "isBreakout": true,
    "breakoutRoomId": "e0f49fd5-c3dc-4f36-9612-8cdab4d8ccfd"
  },
  "timestamp": 1636107397904
}
```

## **_POLL_ANSWER_**

- **`data`** (map): Poll Answer data
- **`answers`** (list): List of possible answer values
- **`key`** (integer): Answer key
- **`name`** (string): Answer text
- **`value`** (boolean): Value showing whether the user checked the corresponding answer
- **`user`** (map): Data about the user that answered the poll
- **`participantJid`** (string): The participant’s **`xmpp`** (prosody) **`jid`** (jabber id)
- **`currentName`** (string): The display name the user had in the moment of poll answer
- **`id`** (string): The **`userId`** from the jwt
- **`name`** (string): The **`name`** from the jwt
- **`email`** (string): The **`email`** from the jwt
- **`pollId`** (string): Unique identifier for the poll
- **`isBreakout`** (boolean): Identifies whether the event happened in a breakout room.
- **`breakoutRoomId`** (string): The identifier for the room, in case the event happened in a breakout room.

For example:

```json
{
  "idempotencyKey": "9baec0e6-0fd0-4d08-b828-49a5e59ae429",
  "customerId": "a062b751172947d3832406582153a4c8",
  "sessionId": "e1a019ec-72a3-419d-8e98-8c69fd7f4c0d",
  "fqn": "vpaas-magic-cookie-a062b751172947d3832406582153a4c8/meetingname",
  "eventType": "POLL_ANSWER",
  "data": {
    "answers": [
      { "key": 1, "name": "Answer 1", "value": false },
      { "key": 2, "name": "Answer 2", "value": true },
      { "key": 3, "name": "Answer 3", "value": false },
      { "key": 4, "name": "Answer 4", "value": true }
    ],
    "user": {
      "participantJid": "a7b62236-d3de-40a3-a879-01fc76759fb1@dev-brt.8x8.vc",
      "currentName": "My Current Name",
      "id": "8847db5c-7093-4f93-b91a-4186c10e2e72",
      "name": "Jwt Name",
      "email": "a@b.com"
    },
    "pollId": "9fpjw0bmwf",
    "isBreakout": true,
    "breakoutRoomId": "e0f49fd5-c3dc-4f36-9612-8cdab4d8ccfd"
  },
  "timestamp": 1636107419904
}
```

## **_REACTIONS_**

- **`participantId`** (string): The **`userId`** from the jwt
- **`participantJid`** (string): The participant’s unique identifier on the **`xmpp`** server
- **`participantName`** (string): The **`name`** from the jwt
- **`reactions`** (list): List of reactions that are sent in a short interval

For example:

```json
{
    "eventType": "REACTIONS",
    "sessionId": "e83f75a8-9427-449e-b03a-a4c2274e1dd8",
    "timestamp": 1641896906336,
    "fqn": "vpaas-magic-cookie-a062b751172947d3832406582153a4c8/meetingname",
    "idempotencyKey": "bed2f7b5-fe28-40f7-8c56-66bb34edfbcb",
    "customerId": "a062b751172947d3832406582153a4c8",
    "appId": "vpaas-magic-cookie-a062b751172947d3832406582153a4c8",
    "data": {
      "participantId": "114025754820379595029",
      "participantJid": "5e06d899-a16f-4775-84f5-4ddf28015301@8x8.vc/1H9RJFvI",
      "participantName": "Test user",
      "reactions": [
        "surprised"
      ]
    }
}
```

## **_AGGREGATED_REACTIONS_**

- All the reactions that happened during the meeting. Will be delivered only after the ROOM_DESTROYED event.
- **`participantId`** (string): The **`userId`** from the jwt
- **`participantName`** (string): The **`name`** from the jwt
- **`timestamp`** (long):  The Unix **`timestamp`** in milliseconds when the reaction happened.
- **`reaction`** (string): The type of reaction

For example:

```json
{
    "eventType": "AGGREGATED_REACTIONS",
    "sessionId": "e83f75a8-9427-449e-b03a-a4c2274e1dd8",
    "timestamp": 1641896906336,
    "fqn": "vpaas-magic-cookie-a062b751172947d3832406582153a4c8/meetingname",
    "idempotencyKey": "bed2f7b5-fe28-40f7-8c56-66bb34edfbcb",
    "customerId": "a062b751172947d3832406582153a4c8",
    "appId": "vpaas-magic-cookie-a062b751172947d3832406582153a4c8",
    "data": [
         {
           "participantId": "114025754820379595029",
           "participantName": "Test user 1",
           "timestamp": 1648810299482,
           "reaction": "surprised"
         },
         {
           "participantId": "114025754820379595029",
           "participantName": "Test user 1",
           "timestamp": 1648810301066,
           "reaction": "silence"
         },
         {
           "participantId": "114025754820379595030",
           "participantName": "Test user 2",
           "timestamp": 1648810305680,
           "reaction": "like"
         }
    ]
}
```

## **_SCREEN_SHARING_HISTORY_**

- During a recording if there is a screen sharing session at a given interval screenshots will be taken and delivered after the ROOM_DESTROYED event. The default screenshot capture mode is during recordings. To enable screenshots during any screen sharing session, the config needs to be overwritten to `mode: 'always`. More information [here](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-configuration/#screenshotcapture).
- **`preAuthenticatedLink`** (string): The pre-authenticated download URL for the screenshots. The URL link is valid for 24 hours. This will return a list containing short lived pre-authentication URL links for every screenshot.
- **`preAuthenticatedLinkV2`** (string): The pre-authenticated download URL for the screenshots with **pagination**. The URL link is valid for 24 hours. This will return a list containing short lived pre-authentication URL links for every screenshot.
- **`linkExpiration`** (long): The Unix **`timestamp`** in milliseconds when the `preAuthenticatedLink` will expire.

For example:

```json
{
    "eventType": "SCREEN_SHARING_HISTORY",
    "sessionId": "e83f75a8-9427-449e-b03a-a4c2274e1dd8",
    "timestamp": 1641896906336,
    "fqn": "vpaas-magic-cookie-a062b751172947d3832406582153a4c8/meetingname",
    "idempotencyKey": "bed2f7b5-fe28-40f7-8c56-66bb34edfbcb",
    "customerId": "a062b751172947d3832406582153a4c8",
    "appId": "vpaas-magic-cookie-a062b751172947d3832406582153a4c8",
    "data": {
        "preAuthenticatedLink": "https://8x8.vc/v1/_jaas/vo-content-sharing-history/v1/file-metadata/jaas/d34b2e53-1b70-4d20-a511-444521ce3e2a?X-JaaS-Key=6ca1e11fe2bb-2b4f-123a-9499-6ca1e11fe2bb",
        "linkExpiration": 1648983143647
    }
}
```

## **_VIDEO_SEGMENT_UPLOADED_**

- Webhook containing 90 seconds segment that is taken from the recording. Note that they will be delivered after the RECORDING_UPLOADED event. The algorithm for determining from where to extract a segment is the following: the recording is divided into 10 min intervals and for every interval, a random point will be chosen. The algorithm will change in the future.
- **`preAuthenticatedLink`** (string): The pre-authenticated download URL for the segment. The URL link is valid for 24 hours.
- **`linkExpiration`** (long): The Unix **`timestamp`** in milliseconds when the `preAuthenticatedLink` will expire.
- **`recordingSessionId`** (string): Identifier for recording session

For example:

```json
{
    "eventType": "VIDEO_SEGMENT_UPLOADED",
    "sessionId": "e83f75a8-9427-449e-b03a-a4c2274e1dd8",
    "timestamp": 1641896906336,
    "fqn": "vpaas-magic-cookie-a062b751172947d3832406582153a4c8/meetingname",
    "idempotencyKey": "bed2f7b5-fe28-40f7-8c56-66bb34edfbcb",
    "customerId": "a062b751172947d3832406582153a4c8",
    "appId": "vpaas-magic-cookie-a062b751172947d3832406582153a4c8",
    "data": {
         "preAuthenticatedLink": "https://objectstorage.eu-frankfurt-1.oraclecloud.com/p/k1KPEqTtfFRIyhtf0_3umOdIVD6GUgcmZ1cBmMjb7nVRkeipg-IMnEVoKjDX9WUn/n/fr4eeztjonbe/b/vpaas-segments-prod-8x8-eu-frankfurt-1/o/vpaas-magic-cookie-a062b751172947d3832406582153a4c8/cc3d835b-d319-4db9-ba1c-e76c0d7e11aa/8e9d7e87-a150-4901-bc01-851e093b6136.mp4",
         "startTimestamp": 1648810728279,
         "endTimestamp": 1648810818279,
         "recordingSessionId": "nkdsnfkdfkjdsfdsjklds"
    }
}
```

## **_ROLE_CHANGED_**

This webhook is called when a non-moderator participant is given moderator rights.

- **`grantedBy`** (object): Object containing a **`participantJid`** field (string), that represents the participant’s **`xmpp`** (prosody) **`jid`** (jabber id) of the user who gives moderator rights.
- **`grantedTo`** (object): Object containing a **`participantJid`** field (string), that represents the participant’s **`xmpp`** (prosody) **`jid`** (jabber id) of the user who receives moderator rights.

For example:

```json
{
    "eventType":"ROLE_CHANGED",
    "sessionId":"64aa6549-8e80-47aa-a63e-151eedd74fbf",
    "timestamp":1659683984807,
    "fqn":"vpaas-magic-cookie-ea0dbb6e93e94e60a6168953b068f7ad/automation",
    "idempotencyKey":"17aba8d3-1658-4e01-a791-f204a5b6b597",
    "customerId":"ea0dbb6e93e94e60a6168953b068f7ad",
    "appId":"vpaas-magic-cookie-ea0dbb6e93e94e60a6168953b068f7ad",
    "data": {
        "role":"moderator",
        "grantedTo": {
            "participantJid":"77cc1552-bb8e-4aba-be7f-4f17992ab1bc@8x8.vc/oGHh5j2yMsyj"
        },
        "grantedBy": {
            "participantJid":"9a7f7974-b7f9-4037-b0fd-517d148eac08@8x8.vc/dF6pUxzZMaFk"
        }
    }
}
```

## **_RTCSTATS_UPLOADED_**

This webhook is called when a participant leaves the meeting and the statistics server uploads the associated stats file.

- **`statsUrl`** (string): The pre-authenticated download URL for the statistics file. The URL link is valid for 48 hours.
- **`participantId`** (string): The **`userId`** from the jwt
- **`participantName`** (string): The **`name`** from the jwt
- **`endpointId`** (string): The participant’s **`xmpp`** (prosody) endpoint id

For example:

```json
{
    "eventType":"RTCSTATS_UPLOADED",
    "sessionId":"64aa6549-8e80-47aa-a63e-151eedd74fbf",
    "timestamp":1659683984807,
    "fqn":"vpaas-magic-cookie-ea0dbb6e93e94e60a6168953b068f7ad/automation",
    "idempotencyKey":"17aba8d3-1658-4e01-a791-f204a5b6b597",
    "customerId":"ea0dbb6e93e94e60a6168953b068f7ad",
    "appId":"vpaas-magic-cookie-ea0dbb6e93e94e60a6168953b068f7ad",
    "data": {
        "statsUrl":"https://jitsi-micros-rtcstats-server.s3.us-west-2.amazonaws.com/fq21314-r1234-fefwe-31gga-2aab57bc904b.gz?AWSAccessKeyId=ASIARQFE5ERASRN4AH3D&Expires=1671269761&Signature=ivDs97zaHEYhbW5%2Bj0iWhiTXTFY%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEL7%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLXdlc3QtMiJGMEQCIAUTQk2OoWhmB6wBrXa7BRMRzF5teQb2jz19Bxo7tsHsAiAXGhARLXfuz4oP%2BhEuA5ZhZ9csuR5OMPp5AEY%2Bulv7QCrVBAjn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAQaDDEwMzQyNTA1Nzg1NyIMcatIlnAlt%2Bgvc3XcKqkE5OSPMqQFN8BMUeBsM4KkBhxmgqEYlmWRLuGtp%2BrqNTKysa3Ez%2BenpZlHiHFxlIKyiza%2FUkXGZFupjO1cbe7h01WG3DepT%2FK5MJagpTGOklkswXfL%2B%2B77gHxRq%2F2lC4Jq%2FfI%2F2FlwN%2BwJ%2BxGFfgjif2MhyAQTHkmEZvP7C49S7wKqGMh5V2ytWPTuOcXeD7IDLEhrzahD0sVan1ChxF%2BPdloNMKMc63oiyEicgIawlIXuVFINmrKqZ3Nj%2F5xKpvKVntXrMN%2FtU1Z3B%2FBTLRn49NNU%2FTYfapWNTjXYFiFLYTkKX1c%2FNBbXnzQ0WXGAR1hpo3Mmhnmouja8cLShNybJjDW%2BLIjy3aM7XgTR0QiY%2FBNS%2Ff%2FMG4kyCbElx8nsg7cZomhphzgrKgi8MnUDtLV9IhUprela77JW54%2B50xI3gs1wdbQUMCCl0SEcWhXl7lKvKQGdZNHpp6Y8pPc6%2FnlPAwUlR%2BCPOQBEldVAKCyy20RfUSbS8jwGC799f8hoDnHZITuhSqYcW2Gg2FDnd9MzlXr2ACwlAb%2FiMr0yfyVwstvl0tEvRuoaCWh9ZydNXixl3BiyEceop4pPI56fZVioYbTGsiXcJY5RJqasioxvy13ldP1iFEFmp8Vnzrmg1FTcizml9Fr2%2FtPosIn7NRm0lRB3ZSK10ud9XpTa9uzMjyZlioQ7ifIRp4qhItfASRiCgiEfDHJzDZLY4yiIIF5kS%2FAI6Xu8m8W6vzCy8eqcBjqqAQ15yT1yD%2Ba3GE5HQ0QzNEgAMDEOhg3BCh%2FnRcn6OxUamF%2BtvVja9jl8mtdRXj95y9TTJtivPF%2F3syP%2FB4DwoDvqPYYHZko0jwc%2FKU3PDv%2BcZOuyY4zP2TMJ2TFA0r6%2F2CVNzzbwc94G7u2ZhQ23vd%2FXlaqiwqbvjRk2gMbOS85MJvsDZ3WdiItG8Z8LWh7FeT9rhFRmkh0bdyn9Un8kUv5W1kkA8n5JBABQ",
        "participantId": "114025754820379595029",
        "participantName": "Test user",
        "endpointId": "231ffc"
    }
}
```

Note. The file contains various entry types. WebRTC statistic data is classified as `getStats` entries and are delta compressed, i.e. only the difference from the previous entry is stored, thus some custom logic is required to make sense of them. The following code snipped when applied on a `getStats` entry will generate the complete data view. Please be advised that the snippet is meant as a guideline.

```javascript
/**
  * The function will use `baseStats` as the base line for decompression, where
  * `newStats` is expected to contain just the differences from the base line.
  * It will go through each entry of `newStats` and reconstruct data.
  *
  * @param {Object} baseStats - Complete WebRTC statistics entry.
  * @param {Object} newStats - Delta compressed statistics entry.
  * @returns {Object} - Decompressed `newStats` entry.
  */
decompress(baseStats, newStats) {
    const timestamp = newStats.timestamp;
    Object.keys(baseStats).forEach(id => {
        // If the new statistic data does not contain a certain report we consider it was removed.
        // e.g. a ssrc was removed from the connection.
        if (!newStats[id]) {
            delete baseStats[id];
        }
    });
    // Iterate through the new entry and reconstruct it with data that hasn't changed from the base
    // stat
    Object.keys(newStats).forEach(id => {
        if (baseStats[id]) {
            const report = newStats[id];
            // Timestamp will usually be set to 0 in reports but will be saved at the stats level
            // so we don't send it unecessarely for each report in the stats object.
            report.timestamp = timestamp;
            Object.keys(report).forEach(name => {
                baseStats[id][name] = report[name];
            });
        // If there is a new report in the stats data we add the complete structure as there is no
        // base line to construct it from.
        } else {
            if (newStats[id].timestamp === 0) {
                newStats[id].timestamp = timestamp;
            }
            baseStats[id] = newStats[id];
        }
    });
    return baseStats;
},
```

## **_TRANSCRIPTION_CHUNK_RECEIVED_**

The webhook is called when a final transcription phrase is available during the meeting.

- **`final`** (string): The transcription phrase.
- **`language`** (string): The language used for the transcription.
- **`messageID`** (string): The unique id of the message.
- **`participant`** (object): The participant data.
	- **`id`** (string): The Jitsi id of the participant.
	- **`name`** (string): The name of the participant.
	- **`userId`** (string): The userId from the JWT.
	- **`email`** (string): The email address of the participant.
	- **`avatarUrl`** (string): The avatar of the participant.

For example:

```json
{
  "idempotencyKey": "e95c6d20-41e3-4944-9c37-46b786abf1113",
  "customerId": "c2824d584eac4489a1e32e4e164d5a3c",
  "appId": "vpaas-magic-cookie-c2824d584eac4489a1e32e4e164d5a3c",
  "eventType": "TRANSCRIPTION_CHUNK_RECEIVED",
  "sessionId": "38e68a1f-8975-4518-99df-5f151eaf31e3",
  "timestamp": 1702473369467,
  "fqn": "vpaas-magic-cookie-c2824d584eac4489a1e32e4e164d5a3c/testroom",
  "data": {
    "final": " This is a final transcription phrase.",
    "language": "en",
    "messageID": "018c57d5-c800-72db-94fe-454a891790f3",
    "participant": {
      "id": "abcd1234",
      "name": "Jane Doe",
      "userId": "abcdefgh-1234-5678-abcd-9012345abcde",
      "email": "jane@doe.com",
      "avatarUrl": "https://www.gravatar.com/avatar/a1b2c3d4e5?d=wavatar&size=200"
    }
  }
}
```

## **_DOCUMENT_ADDED_**

The webhook is called when a new file/document has been added.

- **`preAuthenticatedLink`** (string): The pre-authenticated download URL for the document. The URL link is valid for 24 hours.
- **`linkExpiration`** (long): The Unix **`timestamp`** in milliseconds when the `preAuthenticatedLink` will expire.
- **`fileName`** (string): The document name.
- **`fileId`** (string): Identifier for the document.
- **`fileSize`** (long): The document file size, expressed in bytes.
- **`initiatorId`** (string): Identifier of the participant that uploaded the document.
- **`fileCreatedAt`** (long): The timestamp of the document upload.

For example:

```json
{
  "eventType": "DOCUMENT_ADDED",
  "sessionId": "86ec8bd0-7d9f-426a-b488-5bc1fa7d9c05",
  "timestamp": 1751289050905,
  "fqn": "vpaas-magic-cookie-9e520cbefd5844a3ab54ca5303adc1f8/transcript300card",
  "idempotencyKey": "a9c1cbe0-4a32-4040-b633-85efd7e7db9f",
  "customerId": "9e520cbefd5844a3ab54ca5303adc1f8",
  "appId": "vpaas-magic-cookie-9e520cbefd5844a3ab54ca5303adc1f8",
  "data": {
    "preAuthenticatedLink": "https://objectstorage.eu-frankfurt-1.oraclecloud.com/p/QcjU-Ahx3xY-osepRFZb7RxekKlpnQpntl5o0enp9ecOUiksoucpBDJ0SID_FDlA/n/fr4eeztjonbe/b/vpaas-documents-stage-8x8-eu-frankfurt-1/o/vpaas-magic-cookie-9e520cbefd5844a3ab54ca5303adc1f8/86ec8bd0-7d9f-426a-b488-5bc1fa7d9c05/1d4d5220-7d4b-4bf4-b125-6c4daf8754c5.png",
    "fileName": "Screenshot 2025-06-30 at 16.03.37.png",
    "fileId": "1d4d5220-7d4b-4bf4-b125-6c4daf8754c5",
    "linkExpiration": 1751375450905,
    "fileSize": 510460,
    "initiatorId": "auth0|68552f5520ac82f00451858d",
    "fileCreatedAt": 1751289043562
  }
}
```

## **_DOCUMENT_DELETED_**

The webhook is called when a file/document has been deleted.

- **`initiatorId`** (string): Identifier of the participant that deleted the document.
- **`fileId`** (string): Identifier for the document.
- **`fileName`** (string): The document name.

For example:

```json
{
  "eventType": "DOCUMENT_DELETED",
  "sessionId": "86ec8bd0-7d9f-426a-b488-5bc1fa7d9c05",
  "timestamp": 1751289155462,
  "fqn": "vpaas-magic-cookie-9e520cbefd5844a3ab54ca5303adc1f8/transcript300card",
  "idempotencyKey": "76430bfe-18e4-44cd-924c-81a92871fc20",
  "customerId": "9e520cbefd5844a3ab54ca5303adc1f8",
  "appId": "vpaas-magic-cookie-9e520cbefd5844a3ab54ca5303adc1f8",
  "data": {
    "initiatorId": "auth0|68552f5520ac82f00451858d",
    "fileId": "1d4d5220-7d4b-4bf4-b125-6c4daf8754c5",
    "fileName": "Screenshot 2025-06-30 at 16.03.37.png"
  }
}
```
