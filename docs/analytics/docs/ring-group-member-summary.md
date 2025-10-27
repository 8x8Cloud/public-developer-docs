# Ring Group Member Summary

> 📘 **Updated Endpoint**
>
> The [Ring Group Member Summary](/analytics/docs/ring-group-member-summary) and [Ring Group Summary](/analytics/docs/wa-ring-group-summary) are dedicated endpoints to replace the previous [Ring Group & Ring Group Member Summary](/analytics/docs/work-analytics-ring-group-summary) endpoint which served both purposes
>
>

> 📘
>
> Note: This API provides access to data from the past 2 years only in accordance with Analytics for Work data compliance policies; queries spanning more than 2 years will return only the most recent 2 years of data, and queries outside this range will return no results
>
>

> 📘 **You will need a working API key to begin**
>
> You can generate API credentials from [How to get API Keys](/analytics/docs/how-to-get-api-keys)
>
> The `8x8-api-key` will be the `Key` generated. For Work Analytics the Secret from Admin Console is not required.
>
>

Use the following base URL during this process:

* `https://api.8x8.com/analytics/work`

## 1. Authenticate to retrieve access token

You will use your API key combined with the user credentials of a user with permission and access to Work Analytics to authenticate, this user **does not need to be** the one who generated the API credentials

> 🚧 **User must access Analytics at least once via browser**
>
> The users credentials will not be able to leverage the API until they have used Work Analytics via browser at least once
>
>

### Parameters

**Method: POST**

#### Headers

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| 8x8-apikey | ✓ | The 8x8-api key provided | test_key_kjdfidj238jf9123df221 |
| Content-Type | ✓ | Set content type to form-urlencoded | application/x-www-form-urlencoded |

#### Body

| Name     | Required | Description                                                        | Example                                             |
|----------|----------|--------------------------------------------------------------------|-----------------------------------------------------|
| username | ✓        | The 8x8 username of a user with Work Analytics access privileges   | [someuser@acme.fakeco](mailto:someuser@acme.fakeco) |
| password | ✓        | The 8x8 password of the user with Work Analytics access privileges | Rrnp5QBW6dTbx^TP                                    |

### Authentication Request

```bash
curl --location --request POST 'https://api.8x8.com/analytics/work/v1/oauth/token' \
--header '8x8-apikey: {8x8-apikey input here}' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'username={8x8 username of user input here}' \
--data-urlencode 'password={8x8 password of user input here}'

```

### Authentication Response

**Response**

```json
{
    "access_token": "eyJhbGciOiJSUzI1NiJ9.yyyyyyyyy.zzzzzzzzzzzzzzzzzz",
    "token_type": "bearer",
    "expires_in": 1800

```

**Outputs For Next Step:**

* access_token
* expires_in

The token will expire in the number of seconds specified in expires_in.

The following steps will use the access_token as a Bearer Token form of authentication. This takes the form of the  

`Authorization` header being set to `Bearer access_token` (Space between Bearer and the access_token)

## 2. Run Ring Group Member Summary

This will return a summary each member of each Ring Group in the specified PBXs for the duration specified.

> 📘 **Ring Group Member Summary Reference**
>
> You can check out [Ring Group Member Summary Reference](/analytics/docs/ring-group-member-summary) but you won't be able to try it yet.
>
>

### Parameters

**Method:** GET

#### Headers

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| Authorization | ✓ | Pass the access_token returned from the authentication request as a Bearer token `Bearer {access_token}` | Bearer eyJhbGciOiJSUzI1NiJ9.yyyyyyyyy.zzzzzzzzzzzzzzzzzz |

#### Path

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| version | ✓ | The current version for ring group summary is v2 | v2 |

#### Query

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| pbxId | ✓ | Pass the pbxId (PBX Name) of the requested pbx or comma separated list of pbxIds or `allpbxes` for all of the pbxs in the customer account. PBX names can be found [here in Admin Console](https://admin.8x8.com/company/pbx) | acmecorp,acmecorp2 |
| startTime | ✓ | The interval start time for CDR searches - the format is YYYY-MM-DD HH:MM:SS. | 2022-10-20 08:30:00 |
| endTime | ✓ | The interval end time for CDR searches - the format is YYYY-MM-DD HH:MM:SS. | 2022-10-20 19:00:00 |
| timeZone | ✓ | [IANA Time Zones](https://www.iana.org/time-zones). Examples America/New_York, Europe/London [Wikipedia Time Zone List](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones) | America/New_York |
| extId | ✓ | The extension number of the ring group. Only a single ring group extension can be specified. | 100169 |
| collapse | ☐ | This true or false value determines whether to collapse ring group member summaries into a single summary, even if the user information has changed during the date range selected; otherwise a distinct summary will be created for each distinct set of member data. Default is true | true |

### Ring Group Member Summary Request

As per the Open API specification guidelines, we have migrated the URLs for Ring Group Member Summary Report as give in the below table :

| Deprecated URL Version | Migrated URL (Current version) |
| --- | --- |
| v2/rgsum?extId={extId} | v2/rgsum-members?extId={extId} |

> 📘 **Try out the Ring Group Member Summary**
>
> How does average talk time compare across users? Lets find out @ [Ring Group Member Summary Reference](/analytics/docs/ring-group-member-summary)
>
>

```bash
curl --location --request GET 'https://api.8x8.com/analytics/work/v{version}/rgsum-members?pbxId={pbxId here}&startTime=2022-01-03 00:00:00&endTime=2022-05-03 10:00:00&timeZone=America/New_York&extId={extId here}' \
--header 'Authorization: Bearer {access_token here}' \
--header '8x8-apikey: {8x8-apikey input here}'

```

### Ring Group Member Summary Response

For details on the company summary metrics please refer to [Ring Group Member Summary Glossary](https://docs.8x8.com/8x8WebHelp/8x8analytics-virtual-office/Content/VOA/ring-group-summary.htm#Glossary)

> 📘 **Durations are in milliseconds**
>
>

```json
[
    {
        "pbxId": "acpmecorp",
        "site": "West",
        "firstName": "Marty",
        "lastName": "McFly",
        "ringGroupName": "Management",
        "ringGroupExtension": "100169",
        "extension": "100065",
        "totalAnswered": 0,
        "totalAdvanced": 5,
        "totalTalkTime": 0,
        "totalRingTime": 53821,
        "totalCalls": 5,
        "avgRingTime": 10764,
        "avgTalkTime": 0,
        "offered": 5
    },
    {
        "pbxId": "acpmecorp",
        "site": "West",
        "firstName": "Jane",
        "lastName": "Li",
        "ringGroupName": "Managementz",
        "ringGroupExtension": "100169",
        "extension": "100066",
        "totalAnswered": 2,
        "totalAdvanced": 1,
        "totalTalkTime": 148789,
        "totalRingTime": 31380,
        "totalCalls": 3,
        "avgRingTime": 10460,
        "avgTalkTime": 74394,
        "offered": 3
    }
]

```
