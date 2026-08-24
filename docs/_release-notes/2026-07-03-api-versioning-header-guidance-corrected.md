---
date: 2026-07-03
products: ["Administration"]
changeType: Fixed
title: "API versioning header guidance corrected"
---

We have corrected the **API versioning** guidance for the Administration API Suite to make clear which header carries the version on which kind of request.

The version is specified in the `Content-Type` header on requests that send a payload (such as `POST` and `PUT`), and in the `Accept` header on requests that return a payload (such as `GET`). Endpoints that have neither a request nor a response payload — for example a synchronous `DELETE` that returns no content — are not versioned.

The media type itself is unchanged: it still follows the pattern `application/vnd.{resource}.v{major}+json`, using major version numbers only.

- [API Versioning — Administration API Essentials](/administration/docs/suite-common#api-versioning)
