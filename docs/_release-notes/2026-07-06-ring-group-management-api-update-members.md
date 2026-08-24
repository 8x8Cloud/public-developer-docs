---
date: 2026-07-06
products: ["Administration"]
changeType: Changed
title: "Ring Group Management API update-members"
---

The Ring Group Management API guide now documents a dedicated endpoint for **targeted membership changes**. Instead of reading a ring group, mutating its full member list, and writing the whole object back with `PUT`, you can send only the members that are changing.

## Apply a targeted, atomic delta

```http
POST /ring-groups/{ringGroupId}/update-members
Content-Type: application/vnd.ringgroups.update-members.v1+json
```

The request body carries up to three optional lists — `add`, `update`, and `remove` — and at least one must be non-empty. Each list accepts up to 200 members, and you identify each member by either its `extensionId` or `extensionNumber`. The same identifier must not appear in more than one list. The whole delta is applied atomically: either every change succeeds or none do.

```json
{
  "add": [
    { "extensionNumber": "1005", "sequenceNumber": 4, "voicemailAccessEnabled": true }
  ],
  "update": [
    { "extensionNumber": "1002", "sequenceNumber": 1 }
  ],
  "remove": [
    { "extensionNumber": "1003" }
  ]
}
```

Like the other write operations in the suite, the endpoint responds `202 Accepted` with an Operation resource (`operationType: UPDATE_MEMBERS`) that you poll to completion. This is a non-breaking addition — the existing endpoints, including full-object `PUT`, are unchanged, so if you genuinely need to replace the entire member list you can still do so.

The guide also explains how `sequenceNumber` is resolved for `ROUND_ROBIN` and `SEQUENTIAL` ring patterns: supplied values are treated as desired positions, must be unique within a single request, and may collide with an existing member's position (existing members shuffle down to make space). Omitting `sequenceNumber` on an `add` appends the new member to the end of the sequence.

- [Use Case 4: Manage Ring Group Members — Ring Group Management API Guide](/administration/docs/ring-group-management-api-guide#use-case-4-manage-ring-group-members)
- [Administration API Changelog](/administration/changelog)
