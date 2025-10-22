# Recording

## Overview

JaaS allows meeting recording, but it only stores it for 24 hours. In order to preserve the recording, you must listen for ***RECORDING_UPLOADED*** event on a [webhook](/jaas/docs/webhooks-overview) and download the recording from the **`preAuthenticatedLink`** of the [payload](/jaas/docs/webhooks-payload#recording_uploaded). In normal cases the recording will be uploaded within a minute of the room ending.

A recording session is limited to a maximum of 6 hours. If there is a need for a longer recording, simply start recording/streaming again using start recording event
## Video Demo

This quick video demo will take you through how recording works within JaaS, including receiving the necessary webhooks for downloading the recordings and chat transcripts, viewing a sample recording file and viewing a chat transcript.

<iframe
  src="https://www.youtube.com/embed/OQEDpfyOBWI?si=t-Ewz46SEx9vIy1v"
  height="500px"
  width="100%"
  allow="picture-in-picture; web-share"
  allowFullScreen>
</iframe>

## Recording File

The Recording file will be available once you receive the **RECORDING_UPLOADED** webhook.

The file will be saved as an **.mp4** file. The recording file will show the perspective of the participant who started the recording. 

<iframe
  src="https://www.youtube.com/embed/R0p6ppj-ebE?si=J_T-r_EFWe6uJ2Tn"
  height="500px"
  width="100%"
  allow="picture-in-picture; web-share"
  allowFullScreen>
</iframe>
## Chat Transcript

The Chat Transcript will be available for download once you receive the **CHAT_UPLOADED** webhook.

The file will be a JSON file, a sample of which is provided below. The **<app_id>** will be substituted with your JaaS App ID. The **messages** array will contain the message body that was sent under **content**.

Chat Transcript from CHAT_UPLOADED Webhook
```json
{
    "roomAddress": "[<app_id>]sampleappexplosivecertaintiesresultuneasily@conference.8x8.vc",
    "meetingFqn": "<app_id>/sampleappexplosivecertaintiesresultuneasily",
    "sessionId": "bcf942bf-e274-4a2b-bd7d-b34c44106add",
    "timestamp": 1719366188545,
    "messageType": "CHAT",
    "messages": [
        {
            "jid": "8e1fd0e1-990e-4093-9ab9-3e31a0ae87ba@8x8.vc/IE3VvYnRfMgt",
            "content": "hello",
            "timestamp": 1719366173483
        },
        {
            "jid": "8e1fd0e1-990e-4093-9ab9-3e31a0ae87ba@8x8.vc/IE3VvYnRfMgt",
            "content": "this is a test message",
            "timestamp": 1719366177102
        },
        {
            "jid": "c97cc007-f4ed-4102-b84e-d2a6ff42e6c7@8x8.vc/wc-hPesDyaYW",
            "content": "this is a test message",
            "timestamp": 1719366182937
        }
    ]
}

```

## Match Chat Transcript Message to Participant

In order to match the participant with their message, you can use the **jid** field insisde the **messages** array to match the participant to the **participantFullJid** field from the **PARTICIPANT_JOINED** webhook event.

In this case we can see the **participantFullJid** field matches the jid in the chat transcript so we can match this chat transcript message to this participant.

PARTICIPANT_JOINED Webhook
```json
{
    "appId": "<app_id>",
    "customerId": "60d15ff098c04d71aa5fe31e06bf866e",
    "data": {
        "avatar": "",
        "conference": "sampleappexplosivecertaintiesresultuneasily@conference.<app_id>.8x8.vc",
        "email": "redacted@8x8.com",
        "flip": false,
        "hidden-from-recorder": false,
        "id": "google-oauth2|112808115779146378286",
        "isBreakout": false,
        "moderator": true,
        "name": "rommel.sunga",
        "participantFullJid": "c97cc007-f4ed-4102-b84e-d2a6ff42e6c7@8x8.vc/wc-hPesDyaYW",
        "participantId": "c97cc007",
        "participantJid": "c97cc007-f4ed-4102-b84e-d2a6ff42e6c7@8x8.vc"
    },
    "eventType": "PARTICIPANT_JOINED",
    "fqn": "<app_id>/sampleappexplosivecertaintiesresultuneasily",
    "idempotencyKey": "58cda65b-434c-4332-a1a1-d3e10dae9b1e",
    "sessionId": "bcf942bf-e274-4a2b-bd7d-b34c44106add",
    "timestamp": 1719366103829
}

```
