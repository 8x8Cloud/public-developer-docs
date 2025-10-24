# Configuring the invite link

The in-meeting controls offer your meeting users the option to invite participants into the same session.

To implement a functional invite flow, perform the following steps:

1. Configure the **base** URL of the meeting invite link (e.g. [https://application.com/meet](https://application.com/meet)) in the *Customise your meeting invite URL* [Branding](https://jaas.8x8.vc/#/branding) section.
2. Define an **alias** name for your meeting room in your IFrame instantiation code.

The **alias** must be a single-level (no slash) string composed of legitimate, safe URL characters. (You can make it identical to the meeting room name as well). This definition is described in the [iFrame documentation](https://github.com/jitsi/jitsi-meet/blob/master/config.js) as the *brandingRoomAlias* property. An example code block is as follows:

```json
  configOverwrite: {
       brandingRoomAlias: 'anInterestingMeeting'
  }

```

>
> The preceding steps result in the meeting *Invite more people* dialog which generates an invite link comprised of the **base**/**alias** pair(e.g. [https://application.com/meet/anInterestingMeeting](https://application.com/meet/anInterestingMeeting) for the values used above)
>
>
>

3. In your integrating application implement the logic that maps the resulting invite link (**base**/**alias**) to your application and handles the users that land on it.  

By doing this the integrating application is in control of who is allowed to join a meeting by authorizing any user (including guests) and then generating a valid JWT.
