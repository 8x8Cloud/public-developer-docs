---
date: 2026-10-02
api: user-management
changeType: docs
version: v1
title: Clarified that CC attributes are not supported in the User Management API
---

Clarified in the [User Management API Guide](/administration/docs/user-management-api-guide) that
Contact Center (CC) attributes (`extensionType = "CC"`) cannot be created or updated through the
User Management API. The one exception is `serviceInfo.extensions[].displayInDirectory`, which
controls contact center agent directory visibility.

This is a documentation clarification only. API behavior is unchanged.
