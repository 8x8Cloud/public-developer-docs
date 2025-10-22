# Advanced branding

Advanced branding allows you to configure elements on your meeting's UI per-room.

Configuring the advanced branding consist in setting up an endpoint on your backend which will serve the branding data payload.

* You need to authenticate your endpoint with an Authorization header. The string token set in the authorization section of advanced branding will be present on all requests to your service as the Authorization header value.
* Your endpoint should process the room/conference name which you will receive as a query parameter in the request: **`GET`** **`[your_endpoint]?conference=[AppID]/[room_name]`** and it should return the **branding data payload** for that specific conference as json, or a default (could be empty) payload in case you don't want any branding or you want a default generic branding applied to it.

This will result in the room from the **`conference`** query parameter having applied the branding configuration corresponding to the settings you have on your response payload.

**Note:**

In case you setup an advanced branding URL, your global Branding configurator settings will be ignored, even when your advanced branding endpoint fails to respond or errors out.
## Video Demo

Please see the video below for an example of **Advanced Branding** used to modify room properties based on the room name.

<iframe
  src="https://www.youtube.com/embed/4KsaxRo-l_s?si=LOOoitvkqD4-CHEa"
  height="500px"
  width="100%"
  allow="picture-in-picture; web-share"
  allowFullScreen>
</iframe>

## Branding data payload

All the branding data fields are optional:

* #### **`backgroundColor`**

(string): The background color
* #### **`backgroundImageUrl`**

(string): The URL for the background image
* #### **`didPageUrl`**

(string): The URL for a custom DID's page hosted by you
* #### **`groupChatRequiresPermission`**

(boolean): Whether participant can only send group chat message if [send-groupchat](/jaas/docs/api-keys-jwt#send-groupchat) feature is enabled in jwt
* #### **`pollCreationRequiresPermission`**

(boolean): Whether participant can only create polls if [create-polls](/jaas/docs/api-keys-jwt#create-polls) feature is enabled in jwt
* #### **`inviteDomain`**

(string): The base URL of the meeting invite link. For more details on custom invite links please check the  

[configuring the invite link](/jaas/docs/iframe-api-invite) section
* #### **`logoClickUrl`**

(string): The URL which should open on clicking the logo image. Usually your Company's URL
* #### **`logoImageUrl`**

(string): The URL of the logo image for the meeting
* #### **`avatarBackgrounds`**

(Array[string]): Backgrounds list overwriting the default avatar backgrounds pool
* #### **`premeetingBackground`**

(string): Custom background for prejoin/lobby screens. It maps to the **`background`** css property of the premeeting screens container.
* #### **`virtualBackgrounds`**

(Array[string]): A list of images that can be used as video backgrounds. When this field is present, the default images will be replaced with those provided. (**NOTE**: Fetching the images must not be protected by CORS.)
* ##### **`customIcons`**

(Object): Object containing customized icons that should replace the default ones. The object keys need to be the exact same icon names used in here: [https://github.com/jitsi/jitsi-meet/blob/master/react/features/base/icons/svg/index.ts](https://github.com/jitsi/jitsi-meet/blob/master/react/features/base/icons/svg/index.ts). To avoid having the icons trimmed or displayed in an unexpected way, please provide svg files containing svg xml icons in the size that the default icons come in.
* #### **`customTheme`**

(Object): Object containing a theme's properties. It also supports partial overwrites of the main theme. For a list of all possible theme tokens and their current defaults, please check: [https://github.com/jitsi/jitsi-meet/tree/master/resources/custom-theme/custom-theme.json](https://github.com/jitsi/jitsi-meet/tree/master/resources/custom-theme/custom-theme.json) . For a short explanation on each of the tokens, please check: [https://github.com/jitsi/jitsi-meet/blob/master/react/features/base/ui/Tokens.ts](https://github.com/jitsi/jitsi-meet/blob/master/react/features/base/ui/Tokens.ts) .  

**Note:**

This is work in progress so many of the various tokens are not yet applied in code or they are partially applied.
* #### **`labels`**

(Object): An object containing a mapping between the language and the link that contains a json with the translation labels to be overwritten. For the shape of the json check [https://github.com/jitsi/jitsi-meet/blob/master/lang/main.json](https://github.com/jitsi/jitsi-meet/blob/master/lang/main.json). For a list of supported languages check [https://github.com/jitsi/jitsi-meet/blob/master/lang/languages.json](https://github.com/jitsi/jitsi-meet/blob/master/lang/languages.json).

Example payload:

```json
{
  "backgroundColor":"#FFF",
  "backgroundImageUrl":"https://mycompany.com/images/background.png",
  "didPageUrl":"https://mycompany.com/dids",
  "inviteDomain":"https://mycompany.com/invite",
  "logoClickUrl":"https://mycompany.com",
  "logoImageUrl":"https://mycompany.com/images/logo.png",
  "avatarBackgrounds": ["#12A378", "linear-gradient(125.83deg, #000 0%, #FFF 99.09%)"],
  "premeetingBackground": "url(https://mycompany.com/images/premeetingBackground.png)",
  "virtualBackgrounds": ["https://my.img01.jpg", "https://my.img02.jpg"],
  "labels": {
    "en": "https://myenglishlabels.json",
    "fr": "https://myfrenchlabels.json",
    "ptBR": "https://mybrazilianlabels.json"
  },
  "customIcons": {
    "IconArrowUp": "https://example.com/arrow-up.svg",
    "IconDownload": "https://example.com/download.svg",
    "IconRemoteControlStart": "https://example.com/remote-start.svg"
  },
  "customTheme": {
    "palette": {
      "ui01": "orange !important",
      "ui02": "maroon",
      "surface02": "darkgreen",
      "ui03": "violet",
      "ui04": "magenta",
      "ui05": "blueviolet",
      "field02Hover": "red",
      "action01": "green",
      "action01Hover": "lightgreen",
      "action02Disabled": "beige",
      "success02": "cadetblue",
      "action02Hover": "liceblue"
    },
    "typography": {
      "labelRegular": {
        "fontSize": 25,
        "lineHeight": 30,
        "fontWeight": 500
      }
    }
  }
}

```
