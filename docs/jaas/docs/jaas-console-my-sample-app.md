# My sample app

The **My sample app** page presents an example of integrating a JaaS meeting into an application. It uses the [**IFrame API**](https://jitsi.github.io/handbook/docs/dev-guide/dev-guide-iframe) to render two users joining the same meeting authenticated with a JaaS JWT valid for 2 hours.

It also shows an example code for rendering the meeting. It can be used in your application with simply replacing the JWT with your own generated JWT signed with your Private Key and with providing your own room name in the format **`[AppID]/[room_name]`**
