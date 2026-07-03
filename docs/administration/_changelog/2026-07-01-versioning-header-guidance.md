---
date: 2026-07-01
api: general
changeType: docs
version: v1
title: Clarified API versioning header guidance
---

Clarified the [API Versioning](/administration/docs/suite-common#api-versioning) guidance for the
Administration API Suite. The version is carried in the `Content-Type` header on requests with a
payload (`POST`, `PUT`) and in the `Accept` header on requests that return a payload (`GET`, and
asynchronous `DELETE` operations that return an operation). The synchronous Address `DELETE`
returns no content and is not versioned.

The media type `application/vnd.{resource}.v{major}+json` is unchanged.
