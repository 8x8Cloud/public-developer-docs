# `email-accepted-cc-v1` Event

The `email-accepted-cc-v1` event is triggered when an inbound email is accepted in the 8x8 Contact Center agent panel.

## Properties

*Object containing the following properties:*

| Property                          | Description                                                                                              | Type                                                                                                                                                                                                                 |
| :-------------------------------- | :------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`eventName`** (\*)              | Name of the event                                                                                        | `'accepted'`                                                                                                                                                                                                         |
| **`eventId`** (\*)                | Unique Id generated for each event at runtime                                                            | `string`                                                                                                                                                                                                             |
| **`method`** (\*)                 | Events published to third party are named as mapEvent                                                    | `'mapEvent'`                                                                                                                                                                                                         |
| **`direction`** (\*)              | When agent receives an email from customer,here it is inbound                                            | `'inbound' \| 'outbound'`                                                                                                                                                                                            |
| **`media`** (\*)                  | The media type, here it is email                                                                         | `'email'`                                                                                                                                                                                                            |
| **`searchContext`** (\*)          | It will hold the customer's email address for fresh inbound email or <br /> mainNumberId for reply email | `string`                                                                                                                                                                                                             |
| **`mainNumberId`** (\*)           | Id assigned to fresh email                                                                               | `string`                                                                                                                                                                                                             |
| `childNumberId`                   | Id assigned to reply email                                                                               | `string`                                                                                                                                                                                                             |
| **`url`** (\*)                    | Email url where it is stored on server                                                                   | `string`                                                                                                                                                                                                             |
| **`isReplyEmail`** (\*)           | It will hold true when it is reply email, here it can be true/false                                      | `boolean`                                                                                                                                                                                                            |
| **`isStandAloneTerminated`** (\*) | It will hold true when an agent replies to customer email from saved drafts.                             | `boolean`                                                                                                                                                                                                            |
| **`contact`** (\*)                | It will hold contact details of customer such as emailAddress, firstName and LastName                    | *Object with properties:*<ul><li>**`emailAddress`** (\*): `string` - Email address of customer</li><li>`firstName`: `string` - First name of customer</li><li>`lastName`: `string` - Last name of customer</li></ul> |
| **`schemaVersion`** (\*)          | Current schema version of the event                                                                      | `'1.0.0'`                                                                                                                                                                                                            |

*(\*) Required.*

## Event Emission

The `email-accepted-cc-v1` event is emitted by the 8x8 Mashell UI component when an inbound email is accepted.

## Listeners

The event is consumed by the third-party system, which processes it accordingly.

## Additional Information

Sample event payload:

```json
{
  eventType: "mashell-email-accepted-cc-event-v1",
  status: "success",
  data: {
    eventName: 'accepted',
    eventId: 'eventIDString',
    method: 'mapEvent',
    direction: 'inbound',
    media: 'email',
    searchContext: 'test@email.com',
    mainNumberId: '1234',
    childNumberId: '',
    url:'http://<vccCssServerURL>/presignedURL',
    isReplyEmail: true/false,
    isStandAloneTerminated: true/false,
    contact: {
      emailAddress: 'test@email.com',
      firstName: '',
      lastName: ''
    }
  }
}
```
