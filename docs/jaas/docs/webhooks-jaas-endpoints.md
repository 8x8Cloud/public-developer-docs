# JaaS endpoints

The following endpoints are exposed by JaaS services for conference management options:

The endpoints require a JWT that contains the claim: `admin: true`. The JWT token has to be signed with a private key that has the corresponding public key uploaded in the jaas api-keys section of the console.

JWT payload example:

```
{
  "aud": "jitsi",
  "exp": 1696284052,
  "iss": "chat",
  "admin":true,
  "nbf": 1596197652,
  "sub": "vpaas-magic-cookie-1d2e6a201d594c8f87a630e3f71826d3"
}

```

* ***BAN_USER***: ban a user based on the user id

 Endpoint: [https://8x8.vc/v1/_jaas/jaccess/v1/access-management/{appId}/ban/user/{userId}](https://8x8.vc/v1/_jaas/jaccess/v1/access-management/%7BappId%7D/ban/user/%7BuserId%7D)

 Path Variables:

  + ***appId***: application Id
  + ***userId***: user id to ban
  
  
  Request example:

```
curl -X POST "https://8x8.vc/v1/_jaas/jaccess/v1/access-management/vpaas-magic-cookie-1d2e6a201d594c8f87a630e3f71826d3/ban/user/userIdValue" -H "accept: */*" -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6InZwYWFzLW1hZ2ljLWNvb2tpZS0xZDJlNmEyMDFkNTk0YzhmODdhNjMwZTNmNzE4MjZkMy9lZDg1YjYiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJqaXRzaSIsImV4cCI6MTY1MDMyNTUwNiwiaXNzIjoiY2hhdCIsImFkbWluIjp0cnVlLCJuYmYiOjE1OTYxOTc2NTIsInN1YiI6InZwYWFzLW1hZ2ljLWNvb2tpZS0xZDJlNmEyMDFkNTk0YzhmODdhNjMwZTNmNzE4MjZkMyJ9.iw0rbDonLpNAfY8681VtzM0fLhKH5pPjraaR5Yb6yEgGW2ghkfExJ7ldKnhvFJOQ-YrahQhWhUbr-j8OKkggZum_YLY_AOk5qos-CGLMjM1Q_OQ94-EATi6e3Ca0rkfhm4qmgx7B_I0dqCro_F2F5ABoMOdkqPRwWF5NAC5-O317wrAR69Hi6RzWwXvzhZ75BJkZRQ7bqJEz62L_gcl3u9_g6aziRsLzJMg7-mK7LVTRThOBeHGhl07OnPx79Xu65LumDecqdlyyaTYPEHUsfRdOxxUCwpopQHWHVfEqESMH0p1fUK-P3Yl8mAEBmCVuLAIYtq6R8Ejsps5zlAIcDA"

```

* ***BAN_JWT***: ban a jwt

 Endpoint: [https://8x8.vc/v1/_jaas/jaccess/v1/access-management/{appId}/ban/jwt](https://8x8.vc/v1/_jaas/jaccess/v1/access-management/%7BappId%7D/ban/jwt)

 Path Variables:

  + ***appId***: application Id
  
  
  Body (JSON)
  + ***jwt***: jwt to ban
  
  
  Request example:

```
curl -X POST "https://8x8.vc/v1/_jaas/jaccess/v1/access-management/vpaas-magic-cookie-1d2e6a201d594c8f87a630e3f71826d3/ban/jwt" -H "accept: */*" -H "Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6InZwYWFzLW1hZ2ljLWNvb2tpZS0xZDJlNmEyMDFkNTk0YzhmODdhNjMwZTNmNzE4MjZkMy9lZDg1YjYiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJqaXRzaSIsImV4cCI6MTY1MDMyNTUwNiwiaXNzIjoiY2hhdCIsImFkbWluIjp0cnVlLCJuYmYiOjE1OTYxOTc2NTIsInN1YiI6InZwYWFzLW1hZ2ljLWNvb2tpZS0xZDJlNmEyMDFkNTk0YzhmODdhNjMwZTNmNzE4MjZkMyJ9.iw0rbDonLpNAfY8681VtzM0fLhKH5pPjraaR5Yb6yEgGW2ghkfExJ7ldKnhvFJOQ-YrahQhWhUbr-j8OKkggZum_YLY_AOk5qos-CGLMjM1Q_OQ94-EATi6e3Ca0rkfhm4qmgx7B_I0dqCro_F2F5ABoMOdkqPRwWF5NAC5-O317wrAR69Hi6RzWwXvzhZ75BJkZRQ7bqJEz62L_gcl3u9_g6aziRsLzJMg7-mK7LVTRThOBeHGhl07OnPx79Xu65LumDecqdlyyaTYPEHUsfRdOxxUCwpopQHWHVfEqESMH0p1fUK-P3Yl8mAEBmCVuLAIYtq6R8Ejsps5zlAIcDA"}"

```

* ***DESTROY_ROOM***: Terminate an ongoing meeting

 Endpoint: [https://8x8.vc/v1/_jaas/conference-commands/v1/meeting](https://8x8.vc/v1/_jaas/conference-commands/v1/meeting)

 Request type: POST

 Body (JSON):

  + **`action`** (string): Must have `DESTROY` value
  + **`conferenceFullName`** (string): The full name of the conference that is constructed using the following rule: [roomName@conference.appId.8x8.vc](mailto:roomName@conference.appId.8x8.vc) 
  
  
  Note: The appId part from the conferenceFullName must be the same as the `sub` claim from the admin JWT.JSON

```json
  {
    "action": "DESTROY",
    "payload": {
      "conferenceFullName": "testRoom@conference.vpaas-magic-cookie-1d2e6a201d594c8f87a630e3f71826d3.8x8.vc"
    }
  }

```

 Request example:

```bash
curl -X 'POST' \
  'https://8x8.vc/v1/_jaas/conference-commands/v1/meeting' \
  -H 'accept: */*' \
  -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6InZwYWFzLW1hZ2ljLWNvb2tpZS0xZDJlNmEyMDFkNTk0YzhmODdhNjMwZTNmNzE4MjZkMy9lZDg1YjYiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJqaXRzaSIsImV4cCI6MTY1MDMyNTUwNiwiaXNzIjoiY2hhdCIsImFkbWluIjp0cnVlLCJuYmYiOjE1OTYxOTc2NTIsInN1YiI6InZwYWFzLW1hZ2ljLWNvb2tpZS0xZDJlNmEyMDFkNTk0YzhmODdhNjMwZTNmNzE4MjZkMyJ9.iw0rbDonLpNAfY8681VtzM0fLhKH5pPjraaR5Yb6yEgGW2ghkfExJ7ldKnhvFJOQ-YrahQhWhUbr-j8OKkggZum_YLY_AOk5qos-CGLMjM1Q_OQ94-EATi6e3Ca0rkfhm4qmgx7B_I0dqCro_F2F5ABoMOdkqPRwWF5NAC5-O317wrAR69Hi6RzWwXvzhZ75BJkZRQ7bqJEz62L_gcl3u9_g6aziRsLzJMg7-mK7LVTRThOBeHGhl07OnPx79Xu65LumDecqdlyyaTYPEHUsfRdOxxUCwpopQHWHVfEqESMH0p1fUK-P3Yl8mAEBmCVuLAIYtq6R8Ejsps5zlAIcDA' \
  -H 'Content-Type: application/json' \
  -d '{
  "action": "DESTROY",
  "payload": {
    "conferenceFullName": "testRoom@conference.vpaas-magic-cookie-1d2e6a201d594c8f87a630e3f71826d3.8x8.vc"
  }
}'

```

* ***DIAL_OUT_PARTICIPANT***: Dial out a participant from the meeting.

Endpoint: [https://8x8.vc/v1/_jaas/conference-commands/v1/meeting](https://8x8.vc/v1/_jaas/conference-commands/v1/meeting)

Request type: POST

Body (JSON):

  + **`action`** (string): Must have `DIAL_OUT_PARTICIPANT` value
  + **`conferenceFullName`** (string): The full name of the conference that is constructed using the following rule: [roomName@conference.appId.8x8.vc](mailto:roomName@conference.appId.8x8.vc)
  + **`phoneNo`** (string): The phone number that will be called from the meeting.Note: 

  1. The appId part from the conferenceFullName must be the same as the `sub` claim from the admin JWT.
  2. When the API is called if there aren't any participants in the room, the outbound call is not performed until the first participant joins.
  3. JaaS billing rates apply for using this endpoint

```json
    {
      "action": "DIAL_OUT_PARTICIPANT",
      "payload": {
        "conferenceFullName": "testRoom@conference.vpaas-magic-cookie-1d2e6a201d594c8f87a630e3f71826d3.8x8.vc",
        "phoneNo": "+40747777777"
      }
    }

```

 Request example:

```
  curl -X 'POST' \
    'https://8x8.vc/v1/_jaas/conference-commands/v1/meeting' \
    -H 'accept: */*' \
    -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6InZwYWFzLW1hZ2ljLWNvb2tpZS0xZDJlNmEyMDFkNTk0YzhmODdhNjMwZTNmNzE4MjZkMy9lZDg1YjYiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJqaXRzaSIsImV4cCI6MTY1MDMyNTUwNiwiaXNzIjoiY2hhdCIsImFkbWluIjp0cnVlLCJuYmYiOjE1OTYxOTc2NTIsInN1YiI6InZwYWFzLW1hZ2ljLWNvb2tpZS0xZDJlNmEyMDFkNTk0YzhmODdhNjMwZTNmNzE4MjZkMyJ9.iw0rbDonLpNAfY8681VtzM0fLhKH5pPjraaR5Yb6yEgGW2ghkfExJ7ldKnhvFJOQ-YrahQhWhUbr-j8OKkggZum_YLY_AOk5qos-CGLMjM1Q_OQ94-EATi6e3Ca0rkfhm4qmgx7B_I0dqCro_F2F5ABoMOdkqPRwWF5NAC5-O317wrAR69Hi6RzWwXvzhZ75BJkZRQ7bqJEz62L_gcl3u9_g6aziRsLzJMg7-mK7LVTRThOBeHGhl07OnPx79Xu65LumDecqdlyyaTYPEHUsfRdOxxUCwpopQHWHVfEqESMH0p1fUK-P3Yl8mAEBmCVuLAIYtq6R8Ejsps5zlAIcDA' \
    -H 'Content-Type: application/json' \
    -d '{
    "action": "DIAL_OUT_PARTICIPANT",
    "payload": {
      "conferenceFullName": "testRoom@conference.vpaas-magic-cookie-1d2e6a201d594c8f87a630e3f71826d3.8x8.vc",
      "phoneNo": "+40747777777"
    }
  }'

```

* ***HANG_UP_CALL***: Cancel an initiated outbound call or kick the dialed-out participant if is already joined

Endpoint: [https://8x8.vc/v1/_jaas/conference-commands/v1/meeting](https://8x8.vc/v1/_jaas/conference-commands/v1/meeting)

Request type: POST

Body (JSON):

  + **`action`** (string): Must have `HANG_UP_CALL` value
  + **`conferenceFullName`** (string): The full name of the conference that is constructed using the following rule: [roomName@conference.appId.8x8.vc](mailto:roomName@conference.appId.8x8.vc)
  + **`phoneNo`** (string): The phone number corresponding to the call that will be canceled or terminated.Note:

  1. The appId part from the conferenceFullName must be the same as the `sub` claim from the admin JWT.
  2. If the participant corresponding to the phone number is in the room, calling the endpoint will kick the participant, but if the participant did not receive the call yet, it is canceled.

```json
    {
      "action": "HANG_UP_CALL",
      "payload": {
        "conferenceFullName": "testRoom@conference.vpaas-magic-cookie-1d2e6a201d594c8f87a630e3f71826d3.8x8.vc",
        "phoneNo": "+40747777777"
      }
    }

```

 Request example:

```
  curl -X 'POST' \
    'https://8x8.vc/v1/_jaas/conference-commands/v1/meeting' \
    -H 'accept: */*' \
    -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6InZwYWFzLW1hZ2ljLWNvb2tpZS0xZDJlNmEyMDFkNTk0YzhmODdhNjMwZTNmNzE4MjZkMy9lZDg1YjYiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJqaXRzaSIsImV4cCI6MTY1MDMyNTUwNiwiaXNzIjoiY2hhdCIsImFkbWluIjp0cnVlLCJuYmYiOjE1OTYxOTc2NTIsInN1YiI6InZwYWFzLW1hZ2ljLWNvb2tpZS0xZDJlNmEyMDFkNTk0YzhmODdhNjMwZTNmNzE4MjZkMyJ9.iw0rbDonLpNAfY8681VtzM0fLhKH5pPjraaR5Yb6yEgGW2ghkfExJ7ldKnhvFJOQ-YrahQhWhUbr-j8OKkggZum_YLY_AOk5qos-CGLMjM1Q_OQ94-EATi6e3Ca0rkfhm4qmgx7B_I0dqCro_F2F5ABoMOdkqPRwWF5NAC5-O317wrAR69Hi6RzWwXvzhZ75BJkZRQ7bqJEz62L_gcl3u9_g6aziRsLzJMg7-mK7LVTRThOBeHGhl07OnPx79Xu65LumDecqdlyyaTYPEHUsfRdOxxUCwpopQHWHVfEqESMH0p1fUK-P3Yl8mAEBmCVuLAIYtq6R8Ejsps5zlAIcDA' \
    -H 'Content-Type: application/json' \
    -d '{
    "action": "HANG_UP_CALL",
    "payload": {
      "conferenceFullName": "testRoom@conference.vpaas-magic-cookie-1d2e6a201d594c8f87a630e3f71826d3.8x8.vc",
      "phoneNo": "+40747777777"
    }
  }'

```

* ***KICK_PARTICIPANT***: Kick a participant from the meeting.

Endpoint: [https://8x8.vc/v1/_jaas/conference-commands/v1/meeting](https://8x8.vc/v1/_jaas/conference-commands/v1/meeting)

Request type: POST

Body (JSON):

  + **`action`** (string): Must have `KICK_PARTICIPANT` value
  + **`conferenceFullName`** (string): The full name of the conference that is constructed using the following rule: [roomName@conference.appId.8x8.vc](mailto:roomName@conference.appId.8x8.vc)
  + **`participantId`** (string): The participant's universal unique identifier used across the whole infrastructure (jitsi meet, events, webhooks)Note:

  1. The appId part from the conferenceFullName must be the same as the `sub` claim from the admin JWT.
  2. If the participant corresponding to the participantId is present in the meeting, calling the endpoint will kick them from the meeting. Additionally, a notification message will be shown on their interface upon being removed.

```json
    {
      "action": "KICK_PARTICIPANT",
      "payload": {
        "conferenceFullName": "testRoom@conference.vpaas-magic-cookie-1d2e6a201d594c8f87a630e3f71826d3.8x8.vc",
        "participantId": "f0aa9e1e"
      }
    }

```

 Request example:

```
  curl -X 'POST' \
    'https://8x8.vc/v1/_jaas/conference-commands/v1/meeting' \
    -H 'accept: */*' \
    -H 'Authorization: Bearer eyJhbGciOiJSUzI1NiIsImtpZCI6InZwYWFzLW1hZ2ljLWNvb2tpZS0xZDJlNmEyMDFkNTk0YzhmODdhNjMwZTNmNzE4MjZkMy9lZDg1YjYiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJqaXRzaSIsImV4cCI6MTY1MDMyNTUwNiwiaXNzIjoiY2hhdCIsImFkbWluIjp0cnVlLCJuYmYiOjE1OTYxOTc2NTIsInN1YiI6InZwYWFzLW1hZ2ljLWNvb2tpZS0xZDJlNmEyMDFkNTk0YzhmODdhNjMwZTNmNzE4MjZkMyJ9.iw0rbDonLpNAfY8681VtzM0fLhKH5pPjraaR5Yb6yEgGW2ghkfExJ7ldKnhvFJOQ-YrahQhWhUbr-j8OKkggZum_YLY_AOk5qos-CGLMjM1Q_OQ94-EATi6e3Ca0rkfhm4qmgx7B_I0dqCro_F2F5ABoMOdkqPRwWF5NAC5-O317wrAR69Hi6RzWwXvzhZ75BJkZRQ7bqJEz62L_gcl3u9_g6aziRsLzJMg7-mK7LVTRThOBeHGhl07OnPx79Xu65LumDecqdlyyaTYPEHUsfRdOxxUCwpopQHWHVfEqESMH0p1fUK-P3Yl8mAEBmCVuLAIYtq6R8Ejsps5zlAIcDA' \
    -H 'Content-Type: application/json' \
    -d '{
    "action": "KICK_PARTICIPANT",
    "payload": {
      "conferenceFullName": "testRoom@conference.vpaas-magic-cookie-1d2e6a201d594c8f87a630e3f71826d3.8x8.vc",
      "participantId": "f0aa9e1e"
    }
  }'

```
