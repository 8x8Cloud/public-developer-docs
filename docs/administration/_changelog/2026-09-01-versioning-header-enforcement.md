---
date: 2026-09-01
api: general
changeType: non-breaking
version: v1
title: Enforced explicit API version headers
---

The Administration API Suite now enforces explicit [API versioning](/administration/docs/suite-common#api-versioning)
headers on every request. Previously, the `Content-Type` header was not mandatory on requests
with a payload, and a default `Accept` value of `*/*` was accepted on requests that return a
payload.

Consumers must now explicitly declare their required version:

- Requests with a payload (`POST`, `PUT`) must include a versioned `Content-Type` header.
- Requests that return a payload (`GET`, and asynchronous `DELETE` operations that return an
  operation) must include a versioned `Accept` header — a generic `Accept: */*` is no longer
  accepted.

Both follow the `application/vnd.{resource}.v{major}+json` pattern described in
[API Versioning](/administration/docs/suite-common#api-versioning).

This is a non-breaking change for integrations that already specify a version. It ensures API
behavior is deterministic and reduces the impact of future breaking changes by requiring
consumers to opt into a specific version rather than an implicit default.
