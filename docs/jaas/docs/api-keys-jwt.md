# The Jitsi JSON Web Token (JWT)

## Integration

For each user endpoint you enable for a meeting, you must generate a JWT token and sign it with a Private Key.

The JWT token is passed as a parameter to either the IFrame or Mobile SDK as described in the following sections.

### The Jitsi JWT

The header of the JWT contains 3 claims:

* #### **`alg`**

The algorithm used for signing the JWT

* #### **`kid`**

The kid listed for the uploaded API Key see [Generating the API key](/jaas/docs/api-keys-generate-add)

* #### **`typ`**

The JWT type

For example:

```json
{
  "alg": "RS256",
  "kid": "vpaas-magic-cookie-1fc542a3e4414a44b2611668195e2bfe/4f4910",
  "typ": "JWT"
}

```

The following claims are expected in the JWT body:

* #### **`aud`**: **`“jitsi”`**

This value is hardcoded in the body

* #### **`context`**

  * #### **`user`**
  
    * #### **`id`**

    The user's unique identifier

    * #### **`name`**

    The user name

    * #### **`avatar`**

     The publicly available URL that points to the user avatar picture

    * #### **`email`**

    The user email

    * #### **`moderator`**

      * If the user is the moderator set to **`“true“`**
      * If this value is missing or is set to **`“false“`** the user will not have moderator permissions.

    * #### **`hidden-from-recorder`**

    If set to true, the user will not show up on meeting recording/streaming.

  * #### **`features`**
  
   The permissions given to the user for accessing specified features.
  * The key represents the permission name. The value can be either **`“true“`** or **`“false“`**.

* #### Supported keys

* #### **`livestreaming`**

* #### **`recording`**

* #### **`transcription`**

* #### **`sip-inbound-call`**

* #### **`sip-outbound-call`**

* #### **`inbound-call`**

* #### **`outbound-call`**

* #### **`file-upload`**

* #### **`list-visitors`**

* #### Additional supported keys (related to special chat and polls permissions set through advanced branding)

* #### **`send-groupchat`**

  Whether the moderator can send group chat messages if [group chat requires permission](/jaas/docs/jaas-prefs-advanced-branding#groupchatrequirespermission).

* #### **`create-polls`**

  Whether the moderator can create polls if [creating polls requires permission](/jaas/docs/jaas-prefs-advanced-branding#pollcreationrequirespermission).

  * #### **`room`**
  
   (optional) The configuration at the room level.
  * **`regex`**: If the value is **`true`**, the `room` field below is a pattern with one **`.*`** or less. Otherwise, the room name must be equal to the `room` field.

* #### **`exp`**

The time after which the JWT expires

* #### **`iss`**: **`“chat”`**

This is a hardcoded value

* #### **`nbf`**

The time before which the JWT must not be accepted for processing

* #### **`room`**

 This field is one of:

 * The meeting room name, for a literal match.
 * A pattern, if `context.room.regex` is **`true`**.
 * A wildcard (**“\*”**), if the token gives access to all rooms.

 A pattern can contain at most one **`.*`**. The `.*` matches any sequence of characters, including an empty one. All other characters must match literally. The pattern must match the whole room name. The match is not case-sensitive. For example:

 * `team_42.*` matches `team_42`, `team_42_standup` and `team_420`. It does not match `myteam_42`.
 * `team_.*_standup` matches `team_42_standup`. It does not match `team_42_standup_2`.

 The token is not accepted if the pattern contains a second `.*`, or any of the characters `^ $ ( ) % . [ ] * + - ?` outside the `.*`. For a room name that contains one of these characters, use a literal match or the wildcard.

* #### **`sub`**

 The AppID unique identifier (see [Webhooks](/jaas/docs/webhooks-overview) for more information)

For example:

```json
{
  "aud": "jitsi",
  "context": {
    "user": {
      "id": "0f8b7760-c17f-4a12-b134-c6ac37167144",
      "name": "John Doe",
      "avatar": "https://link.to/user/avatar/picture",
      "email": "user@example.com",
      "moderator": "true"
    },
    "features": {
      "livestreaming": false,
      "outbound-call": false,
      "transcription": false,
      "recording": false
    },
    "room": {
      "regex": false
    }
  },
  "exp": 1696284052,
  "iss": "chat",
  "nbf": 1596197652,
  "room": "*",
  "sub": "vpaas-magic-cookie-1fc542a3e4414a44b2611668195e2bfe"
}

```

For the above examples, a JWT example can be found on the [jwt.io](https://jwt.io/) Auth0 JWT site and accessing the [debugger](https://jwt.io/#debugger-io?token=eyJhbGciOiJS) as shown in the following screenshot:

![image](../images/92bbd66c039ec6adaf735216dc67aeca695fc04b92c594e843d75e80d9e7ec1a-screencapture-jwt-io-2025-07-17-15_04_40.jpg "encoded.png")
