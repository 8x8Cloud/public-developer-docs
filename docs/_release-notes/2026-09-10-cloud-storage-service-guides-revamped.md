---
date: 2026-09-10
products: ["Analytics"]
changeType: Changed
title: "Cloud Storage Service guides and API reference revamped"
---

The Cloud Storage Service guides and API reference have been reorganized and expanded, adding documentation for region discovery and archived-object restoration, and reordering both the guides and the reference navigation around them.

## What's new

- A new **Cloud Storage Service** overview guide ties together authentication, the regional base URL, object states — including the `ARCHIVED` state used for cold storage — and links to every guide and reference group.
- A new **Find My Regions** guide documents the region-discovery request that previously lived inline inside the bulk download guide.
- **Restore an archived object** (`POST /objects/{objectId}/restore`) is now documented in the API reference, including the `expirationDays` option (1–10 days, default 7) that controls how long a restored copy is kept before removal.
- **List available regions** (`GET /regions`) now has its own reference page and sidebar category.

## What changed

- Bucket search previously took no query parameters; it now documents `filter`, `pageKey`, `limit`, `sortField`, and `sortDirection`.
- List responses, including bucket search, are now documented as a paginated page object (`content`, `pageKey`, `pageSize`, `lastPage`, `total`) rather than a bare array.
- The object `objectState` enum now includes `ARCHIVED`, with a note that archived objects must be restored before they can be downloaded.
- The bulk-download status and download requests are now correctly documented as `GET` (previously listed as `POST`).
- Guides and the API reference navigation were reordered: the Cloud Storage Service guides now lead with the overview and region discovery before object search and bulk download; the reference sidebar groups endpoints under Regions, Objects, Buckets, Bulk Downloads, and Bulk Delete.

See:

- [Cloud Storage Service overview](/analytics/docs/cloud-storage-service)
- [Find My Regions](/analytics/docs/cloud-storage-service-regions)
- [Restore an archived object](/analytics/reference/restoreobject)
- [List available regions](/analytics/reference/getregions)
