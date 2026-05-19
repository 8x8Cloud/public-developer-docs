# Getting started with Messaging API

Before you get started, please contact your account manager to ensure that your account has access to this product and that the following points have been managed:

- You will need a **new sub-account id** to use this API endpoint - it can’t be an existing SMS SubAccount.
- In order to use your existing channels such as WhatsApp, Viber, Zalo, Line, etc, we will have to configure them for you.
- The fallback mechanism has to be set up by the 8x8 team. You have to define which channels you want to use (and in which order) and the time between each channel is triggered.

> 📘 Downloading Messaging APIs (OAS File)
>
> You can download the OAS File - **[Click Here](https://github.com/8x8Cloud/public-developer-docs/blob/master/docs_oas/connect/business_messaging_api.json)**  
>
> **_ Please do take note that the file provides all the Messaging APIs so please look through the .OAS file and select the specific Messaging API(s) required._**

> 🚧 WhatsApp Message Validity Period (TTL)
>
> The message Time-To-Live (TTL) for WhatsApp Utility/Authentication templates is now customizable. To avoid duplicate messages, ensure your fallback duration exceeds the template's configured TTL. See our [guide](/connect/docs/guide-whatsapp-template-validity-period-ttl) on configuring TTL. Contact your account manager or our [support team](https://connect.8x8.com/support/tickets/create) for further optimization help.

Once this is done, you can use Messaging API. The API key is available in the Customer Portal.

### Authentication

- 8x8 Messaging API accepts an **ApiKey Bearer Token** authentication method.
- You can generate tokens from your customer portal  <https://connect.8x8.com/>
- You need to include the following header in your requests: `Authorization: Bearer {apiKey}`

> 📘
>
> Replace the `{apiKey}` placeholder with the key generated from the customer portal.
>

***

If you haven't created your account yet, please go to 8x8 website [https://connect.8x8.com](https://connect.8x8.com) to sign up.

### URL

The 8x8 `subAccountId` to use is defined in the URL where you send your request as shown below:  
`https://chatapps.8x8.com/api/v1/subaccounts/{subAccountId}/messages`

> 📘
>
> You must replace `{subAccountId}` in the URL above with the sub-account id that you want to use.
>

## Server Regions

To ensure the use of the correct platform deployment region, it is necessary to modify the base URL to correspond with the provisioned region of your account. Refer to the table below for the appropriate base URL associated with each platform region.

For more information on platform regions, please visit the following [page](/connect/docs/platform-deployment-regions#api-endpoints-and-platform-region).

**List of server URLs:**

| API Region     | Base URL                          |
| :------------- | :-------------------------------- |
| Asia (default) | <https://chatapps.8x8.com> |
| Europe         | <https://chatapps.8x8.uk>  |
| North America  | <https://chatapps.us.8x8.com> |
| Indonesia      | <https://chatapps.8x8.id>  |
