# Cloud Storage Service Overview

8x8 Cloud Storage Service (CSS) gives you a single point of access to your stored 8x8 data objects: 8x8 Work call recordings, Contact Center call and screen recordings, voicemails, transcripts, meeting recordings and more. You can search for objects, download them individually or in bulk, restore archived objects from cold storage, and delete objects you no longer need.

> 📘 **You will need a working API key to begin**
>
> [How to get API Keys](/analytics/docs/how-to-get-api-keys)
>
> To create "Call Recording & Storage" API keys, the user must first have the 'Cloud Storage API' assignment. This assignment must be granted by the Super Admin.
>
>

## Base URL

Every request uses a regional base URL:

* `https://api.8x8.com/storage/{region}/v{version}/`

Where:

* `{region}` is one of your provisioned regions. Discover them with the [Find My Regions](/analytics/docs/cloud-storage-service-regions) request. Data is stored per region, so a search only returns objects held in that region.
* `{version}` is the current API version. This is currently `3`, resulting in `/v3/`.

## Authentication

Requests are authenticated with a Bearer `access_token`. See [OAuth Authentication for 8x8 XCaaS APIs](/analytics/docs/oauth-authentication-for-8x8-xcaas-apis) for how to obtain one. All requests must be made over HTTPS.

## Object states and archived objects

Each object has an `objectState`. A search returns only `AVAILABLE` objects unless you request another state in the `filter`. Objects moved to cold storage have the state `ARCHIVED` and cannot be downloaded directly: restore them first with the [Restore an archived object](/analytics/reference/restoreobject) endpoint. Restore is asynchronous and can take several hours (up to 24 hours) to complete; once the object is `AVAILABLE` again, download its content. See [Cloud Storage Service Objects](/analytics/docs/cloud-storage-service-objects) for filter examples.

## Guides in this section

| Guide | Description |
| --- | --- |
| [Find My Regions](/analytics/docs/cloud-storage-service-regions) | Discover which regions hold your data before searching or downloading. |
| [Cloud Storage Service Objects](/analytics/docs/cloud-storage-service-objects) | Object types and FIQL filter examples for searching your stored data. |
| [Cloud Storage Service Bulk Download](/analytics/docs/cloud-storage-service-bulk-download) | Step-by-step flow for downloading many objects in a single Zip file. |

## API reference

The full endpoint reference is in the [Cloud Storage Service Public API](/analytics/reference/cloud-storage-service-public-api) section:

| Group | Operations |
| --- | --- |
| [Regions](/analytics/reference/getregions) | Discover the regions provisioned for your account. |
| [Objects](/analytics/reference/searchobject) | Search, retrieve, download metadata and content, and restore archived objects. |
| [Buckets](/analytics/reference/searchbucket) | Search buckets and retrieve the contents of a bucket. |
| [Bulk Downloads](/analytics/reference/startdownload) | Start a bulk download, poll its status, and download the resulting Zip file. |
| [Bulk Delete](/analytics/reference/removecontent) | Delete objects and their content in bulk. |
