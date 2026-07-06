---
date: 2026-07-03
api: ring-group-management
changeType: non-breaking
version: v1
title: Targeted ring group membership updates
---

The Ring Group Management API adds a new endpoint for targeted membership changes:
`POST /ring-groups/{ringGroupId}/update-members`. It applies an atomic add/update/remove
delta to a ring group's members in a single request, so you no longer need to read the full
ring group and resend the entire member list to add, reorder, or remove members. The request
uses the media type `application/vnd.ringgroups.update-members.v1+json` and returns an
operation to poll to completion.

This is a non-breaking addition — existing endpoints are unchanged. See
[Manage Ring Group Members](/administration/docs/ring-group-management-api-guide#use-case-4-manage-ring-group-members)
in the guide for usage, including how `sequenceNumber` is resolved.
