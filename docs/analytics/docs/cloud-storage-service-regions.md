# Find My Regions

8x8 Cloud Storage Service stores your data regionally, based on your account setup. Some accounts use a single region, others use several. Each region holds its own metadata and storage only: you cannot search in one region (for example `us-east`) and find objects held in another (for example `uk`), because that would involve a data export.

Use this call to discover which regions are provisioned for your account. Run it once, then use one of the returned regions as the `{region}` in the base URL for your object, download and delete requests.

> 📘 **You will need an access token**
>
> Use [OAuth Authentication for 8x8 XCaaS APIs](/analytics/docs/oauth-authentication-for-8x8-xcaas-apis) to get a temporary `access_token`, and pass it as a Bearer token on the request below.

## Parameters

**Method: GET**

#### Headers

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| Authorization | ✓ | Pass the access_token returned from the authentication request as a Bearer token `Bearer {access_token}` | Bearer kfjdfi3jfopajdkf93fa9pjfdoiap |

#### Path

| Name | Required | Description | Example |
| --- | --- | --- | --- |
| region | ✓ | Pass any valid region for the discovery process, for example `us-east` or `uk`. The region does not need to be one of your regions for this request. | `us-east` |
| version | ✓ | The current version is `v3` | v3 |

## Regions Request

```bash
curl --location --request GET 'https://api.8x8.com/storage/{region}/v3/regions' \
--header 'Accept: application/json' \
--header 'Authorization: Bearer {access_token}'
```

## Regions Response

```json
[
    "us-east",
    "uk"
]
```

> 📘 **Only one region can be searched at a time.**
>
> If your use case spans multiple regions, repeat your object, download or delete steps once per region.

For the full endpoint details, see [List available regions](/analytics/reference/getregions) in the API reference.
