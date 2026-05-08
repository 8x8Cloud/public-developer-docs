# Design: Contact Center Campaigns API Documentation (BETA)

**Date:** 2026-04-22
**Author:** Claude Opus 4.7 (1M context) with John Kirk
**Status:** Draft — pending user review

## Purpose

Author customer-facing documentation for a new REST API that controls Contact Center campaign lifecycle and record management. The API is sourced from `vcc-cloud8-campaign-service` at `api/src/main/java/com/_8x8/cc/campaign/external/v1/` and publicly exposed at `https://api.8x8.com/cc/{customer-site}/campaigns/v1/`.

The new documentation set is modelled on — but not identical to — the existing Event Streaming documentation at `docs/actions-events/docs/streaming/`. The streaming set is expansive because it documents a streaming service with multi-language client code; the Campaigns API is two simple REST endpoints and warrants a slimmer treatment.

## Scope

**In scope:**
- Seven new documentation pages under `docs/actions-events/docs/cc-campaigns/`
- One sidebar edit adding a new category in `docusaurus/sidebars/actions-events/docs.js`

**Out of scope:**
- OpenAPI spec under `docs_oas/` (not available to customers per product decision)
- Multi-language client code examples (REST + curl is enough for two endpoints)
- New images (reuse existing Admin Console screenshots from `docs/actions-events/images/`)
- Redirects (no existing URLs are moving)
- `technical-notes/area-specific-guidelines.md` entry (no upstream source-of-truth repo like `pulsar-demo-client`)
- Touching the legacy "Contact Center Dynamic Campaigns API" docs (`cc-managing-campaign-*.md`) — they stay untouched

## Source API surface

**Endpoints** (from `CustomerCampaignApi.java`):
- `PATCH /campaigns/{campaignId}` — modify campaign state (body: `ExternalModifyCampaignRequest` or `ExternalStartCampaignRequest`)
- `POST /campaigns/{campaignId}/records` — add 1-100 records (body: `ExternalAddRecordsRequest`)

**Public URL pattern:** `https://api.8x8.com/cc/{customer-site}/campaigns/v1/{campaignId}`, where `{customer-site}` is `US1`, `US2`, or `UK3` per tenant configuration.

**Authentication:**
- `X-API-Key` header — Admin Console API Key with the **"Contact Center Campaigns"** API Product attached to the app
- `X-8x8-Tenant` header — 8x8 tenant name
- Basic auth (legacy) is NOT supported

**Request/response media type:** `application/vnd.campaigns.v1+json` (document this, not `application/json`).

**Value objects** (all in `com._8x8.cc.campaign.external.v1.vo`):
- `ExternalCampaign` (response) — with nested `RecordCount`
- `ExternalModifyCampaignRequest` (request) + `ExternalStartCampaignRequest` subtype for `action=START` with optional `buildOnStart`
- `ExternalAddRecordRequest` / `ExternalAddRecordsRequest` (request)
- `ExternalAddRecordsResponse` (response) — wraps `List<ExternalRecord>`
- `ExternalRecord` (response item)
- `ExternalErrorMessage` (RFC 9457 Problem JSON) + nested `FieldError`

**Enums** (from `com._8x8.cc.campaign.v1.vo.campaign.*`, shared with the internal API):
- `CampaignState` (11 values): CREATED, BUILDING, READY, PENDING, STARTING, RUNNING, PAUSED, COMPLETE, BUILD_ERROR, RUN_ERROR, DELETED
- `CampaignAction` (8 values): BUILD, RESET, START, PAUSE, RESUME, RETRY, CANCEL, PURGE — each with a `validFor` predicate over states
- `CampaignDisplayStatus` (13 values): NEW, BUILDING, BUILD_FAILED, READY_TO_RUN, SCHEDULED, RUNNING, PAUSED, PURGED, ERROR, ERROR_PURGED, COMPLETED, STOPPED, DISABLED — derived view
- `RecordType` (2): CRM_QUERY, DYNAMIC
- `RecordState` (9): PENDING, REQUESTED, QUEUED, CANCEL_REQUESTED, AGENT_ACCEPTED, COMPLETE, REJECTED, DELETED, ERROR
- `RecordResult` (7): SUCCESS, NO_VALID_NUMBER, SCHEDULE_COMPLETE, INTERACTION_FAILED, MAX_ATTEMPTS_REACHED, INTERACTION_SKIPPED, CALLBACK_SCHEDULED
- `RecordPriority` (3): HIGH, MEDIUM, LOW

Read-side endpoint for observing campaign state: **does not exist in this release**. Each `PATCH` response returns the current `ExternalCampaign`, which is the only way to observe state through this API. Documentation must not imply a GET exists.

## Deliverables

### New directory and files

```
docs/actions-events/docs/cc-campaigns/
├── overview.md               (sidebar_position: 1)
├── getting-started.mdx       (sidebar_position: 2)
├── authentication.mdx        (sidebar_position: 3)
├── endpoints.md              (sidebar_position: 4)
├── state-machine.md          (sidebar_position: 5)
├── field-reference.md        (sidebar_position: 6)
└── troubleshooting.md        (sidebar_position: 7)
```

### Sidebar change

In `docusaurus/sidebars/actions-events/docs.js`, insert a new category immediately after the existing `"Contact Center Dynamic Campaigns API"` block:

```js
{
  type: 'category',
  label: 'Contact Center Campaigns API (BETA)',
  collapsed: true,
  items: [
    'actions-events/docs/cc-campaigns/overview',
    'actions-events/docs/cc-campaigns/getting-started',
    'actions-events/docs/cc-campaigns/authentication',
    'actions-events/docs/cc-campaigns/endpoints',
    'actions-events/docs/cc-campaigns/state-machine',
    'actions-events/docs/cc-campaigns/field-reference',
    'actions-events/docs/cc-campaigns/troubleshooting',
  ],
},
```

## Page specifications

### `overview.md` (sidebar_position: 1)

Title: **"Overview"**.

Sections:
1. BETA `:::warning` admonition at the top. Text: API is in beta; production customers may stay on the legacy "Contact Center Dynamic Campaigns API" until GA. Link to legacy overview.
2. **What is the Contact Center Campaigns API?** — one paragraph: new REST API for programmatically controlling campaign lifecycle (build/start/pause/resume/cancel/purge) and adding records to campaigns. Replaces the functional scope of legacy `/api/tstats/campaigns/` and records endpoints.
3. **When to use this API** — bullets: managing dynamic campaigns programmatically, adding records from external CRM/automation, responding to real-time triggers. Explicit callout: campaign *creation* itself still happens in Configuration Manager; this API controls lifecycle and records only.
4. **Relationship to the legacy Contact Center Dynamic Campaigns API** — comparison table:
   | Aspect | Legacy | This API |
   | Auth | Basic (Data/Action Request Tokens) | `X-API-Key` (Admin Console) |
   | Base URL | `https://vcc-{ccPlatform}.8x8.com/api/tstats/campaigns/` | `https://api.8x8.com/cc/{customer-site}/campaigns/v1/` |
   | Status model | 4 states (RUNNING/PAUSED/PURGED/STOPPED) | 11 states / 8 actions |
   | Record batch size | single | 1-100 |
   | Error format | ad hoc | RFC 9457 Problem JSON |
   Link to legacy overview.
5. **Key capabilities** — bullets: state-machine-driven lifecycle, batch record addition (1-100), RFC 9457 errors, regional endpoints.
6. **Getting started** — numbered list linking to: `authentication.mdx` → `getting-started.mdx` → `endpoints.md`.
7. **Service availability** — US1, US2, UK3 based on tenant configuration. Link to `getting-started.mdx` for URL construction.

### `getting-started.mdx` (sidebar_position: 2)

Title: **"Getting Started"**. MDX for future Tabs compatibility.

Sections:
1. **Prerequisites** — numbered list:
   - 8x8 tenant name
   - Admin Console API Key with **"Contact Center Campaigns"** API Product (link to authentication page)
   - An existing Dynamic Campaign (created in Configuration Manager) and its campaign ID (UUID)
   - Customer site identifier: US1, US2, or UK3
2. **Base URL and customer site** — prose explaining pattern `https://api.8x8.com/cc/{customer-site}/campaigns/v1/`. Table:
   | Customer site | Region  |
   | `US1`         | US East |
   | `US2`         | US West |
   | `UK3`         | UK      |
3. **Quick start — end-to-end curl walkthrough.** Steps, each with a curl block followed by an example JSON response:
   - A: `PATCH .../{campaignId}` with `{"action":"BUILD"}`
   - B: `PATCH .../{campaignId}` with `{"action":"START"}`
   - C: `POST .../{campaignId}/records` with a 1-record batch
   - D: `PATCH .../{campaignId}` with `{"action":"PAUSE"}`
   Every curl sends `X-API-Key`, `X-8x8-Tenant`, and (on bodies) `Content-Type: application/vnd.campaigns.v1+json`. Do NOT mention `buildOnStart` here — endpoints page only.
4. **Next steps** — links to authentication, endpoints, state-machine, troubleshooting.

### `authentication.mdx` (sidebar_position: 3)

Title: **"Authentication"**. MDX for consistency.

Sections:
1. **Overview** — one paragraph: API uses `X-API-Key` (Admin Console) + `X-8x8-Tenant`. Unlike the legacy API, Basic auth is not supported.
2. **Admin Console Key with Contact Center Campaigns API Product** — step-by-step:
   - Log into admin.8x8.com
   - SETUP → API Keys
   - Create App (or edit existing)
   - In **API Products**, select **"Contact Center Campaigns"**
   - Save
   - Reuse existing screenshots `docs/actions-events/images/admin-console-create-app.png` and `admin-console-generated-key.png`; call out explicitly that the product to choose is "Contact Center Campaigns" (the screenshot's dropdown shows a different product as example but the process is identical).
   - Required permission: Application Credentials role
   - Link to `/analytics/docs/how-to-get-api-keys`
3. **Tenant identification** — `X-8x8-Tenant` header required on every request; value is tenant name (not customer site).
4. **Combined header usage** — single example:
   ```
   X-API-Key: eght_your_admin_console_key
   X-8x8-Tenant: your-tenant-name
   Content-Type: application/vnd.campaigns.v1+json
   ```
5. **Troubleshooting authentication** — brief list:
   - 401: missing/invalid `X-API-Key`; key doesn't start with `eght_`
   - 403: key valid but "Contact Center Campaigns" API Product not attached
   - 404 on all requests: wrong tenant name in `X-8x8-Tenant` or wrong `{customer-site}`
6. **Next steps** — links to endpoints, state-machine, troubleshooting.

### `endpoints.md` (sidebar_position: 4)

Title: **"Endpoints"**.

Sections:
1. **Common request conventions** — base URL pattern, required headers on every request (`X-API-Key`, `X-8x8-Tenant`), `Content-Type: application/vnd.campaigns.v1+json` on any body, all IDs are UUIDs, all timestamps are ISO 8601 with offset.
2. **`PATCH /campaigns/{campaignId}` — Modify Campaign**
   - Purpose, path parameter table (`campaignId` UUID required), request body table (`action` required, `enabled` optional), response (`ExternalCampaign`), status codes (200, 400, 401, 403, 404, 409).
   - **START variant** sub-section: when `action:"START"`, body may include `buildOnStart` (Boolean, optional) to auto-build-then-start; overrides campaign's configured "build on start" value.
   - Three curl + example response pairs: simple `BUILD`, toggle `enabled`, combined START+buildOnStart.
   - Cross-link to `state-machine.md` for which actions are valid in which states (409 cause).
3. **`POST /campaigns/{campaignId}/records` — Add Records**
   - Purpose, path parameter, body (`records` array 1-100) with per-item field table:
     | Field | Type | Required | Constraints | Description |
     | `crmRecordId` | string | yes | 1-32 chars; unique in campaign | CRM record identifier |
     | `scheduleAt` | timestamp | no | ISO 8601 | Earliest attempt time |
     | `priority` | enum | no | default HIGH | HIGH / MEDIUM / LOW |
     | `rank` | number | no | auto-assigned | Ordering within priority group |
   - Note: campaign state must allow record edits (not BUILDING/STARTING/DELETED/COMPLETE).
   - Two curl + example response pairs: single-record add, multi-record mixed batch.
   - Status codes: 200, 400 (validation — includes duplicate `crmRecordId` within batch, >100, blank), 401, 403, 404, 409 (campaign state rejects records; `crmRecordId` duplicate of existing record).
4. **Error responses** — one-paragraph pointer to `troubleshooting.md` for RFC 9457 body format.

### `state-machine.md` (sidebar_position: 5)

Title: **"Campaign State Machine"**.

Sections:
1. **Why this matters** — every `PATCH` action is rejected with 409 if the campaign isn't in a state that allows it. Understanding the state machine is a prerequisite.
2. **States** — table of all 11 `CampaignState` values with description and transient-state flag (BUILDING, STARTING are transient).
3. **Actions** — table of all 8 `CampaignAction` values with valid-from-states column and expected result state:
   | Action | Valid from | Result |
   | BUILD | CREATED, READY, BUILD_ERROR | BUILDING → READY (or BUILD_ERROR) |
   | RESET | READY, BUILD_ERROR | CREATED |
   | START | READY | PENDING or STARTING → RUNNING |
   | PAUSE | RUNNING | PAUSED |
   | RESUME | PAUSED | RUNNING |
   | RETRY | RUN_ERROR | (resumes processing) |
   | CANCEL | PENDING, RUNNING, PAUSED, RUN_ERROR | COMPLETE |
   | PURGE | PAUSED, RUN_ERROR, COMPLETE | (clears queued interactions) |
4. **Visual diagram** — ` ```mermaid ` fenced `stateDiagram-v2` block covering the transitions (mermaid works — `event-lifecycle.mdx` uses it).
5. **The `enabled` flag** — independent of state; only BUILD and RESET are allowed when disabled. Set `enabled` in PATCH body to toggle.
6. **Display status vs actual state** — short section: `CampaignDisplayStatus` is a UI-oriented derived view; automation should branch on `state`, not `displayStatus`. Link to the full mapping in `field-reference.md`.
7. **Observing state** — one short paragraph: the response to every `PATCH` returns the current `ExternalCampaign` including its `state` field. There is no separate read-only query endpoint in this release; callers observe state through the action responses they trigger.

### `field-reference.md` (sidebar_position: 6)

Title: **"Field Reference"**.

Sections:
1. **`ExternalCampaign`** — field table (name / type / description / example) from `@Schema` annotations, including nested `RecordCount` (type / state / result / count).
2. **`ExternalRecord`** — field table from `@Schema`.
3. **`ExternalAddRecordRequest`** (inbound record shape) — field table with constraints.
4. **Enums** — one sub-section per enum, each with a value-and-description table:
   - `CampaignState` (11 values; descriptions lifted from the schema block)
   - `CampaignAction` (8 values; cross-link to `state-machine.md` for valid-from rules)
   - `CampaignDisplayStatus` (13 values; each with its derivation rule — e.g. `SCHEDULED` ← state=PENDING; `PURGED` ← state=PAUSED and lastPurgeRequestedTime != null)
   - `RecordType` (CRM_QUERY, DYNAMIC)
   - `RecordState` (9 values)
   - `RecordResult` (7 values)
   - `RecordPriority` (HIGH, MEDIUM, LOW — "dialed HIGH first within priority group, by rank")

### `troubleshooting.md` (sidebar_position: 7)

Title: **"Troubleshooting"**.

Sections:
1. **Error response format** — RFC 9457 Problem JSON explanation, sample body, field table for `ExternalErrorMessage` + nested `FieldError`, link to RFC 9457.
2. **Common errors by status code** — sub-sections for 400, 401, 403, 404, 409, 5xx with likely causes for each, drawn from validation annotations (`@NotBlank`, `@Size`, `@NotEmpty`) and state-machine constraints.
3. **Debugging checklist** — numbered list: verify tenant, customer site, API Product name, campaign state, media type.
4. **Getting help** — pointer to 8x8 support; mention `instance` and `time` fields in the error body as context.

## Style and conventions

- Follow the streaming docs' voice: second-person ("you"), admonitions via `:::warning`/`:::info`, sidebar positions as numeric frontmatter.
- Use `.mdx` only where MDX features are needed (Tabs, imports) — `getting-started.mdx` and `authentication.mdx`. Everything else is `.md`.
- Curl blocks use `bash` fences; JSON bodies and responses use `json` fences; headers-only examples use `text` fences.
- Tables use GitHub-flavored markdown pipes.
- Every page ends with a "Next steps" or "Related" list of intra-section links.
- Relative links between sibling pages use `./filename.md(x)` to match the streaming docs.

## Validation

After writing:
1. `yarn build` succeeds with no broken-link or missing-page warnings for the new section.
2. Sidebar navigation renders the new "Contact Center Campaigns API (BETA)" category immediately below "Contact Center Dynamic Campaigns API" and above "Contact Center Agent Status".
3. All 7 pages are reachable and render without MDX compile errors.
4. The mermaid state diagram on `state-machine.md` renders.
5. Images referenced from `authentication.mdx` resolve.

## Risks and open items

- **Screenshots show "Pulsar Event Stream" in the dropdown, not "Contact Center Campaigns".** The authentication page must make the product-name substitution explicit in prose. If screenshots become misleading in practice, we can capture new ones in a follow-up — not blocking for this work.
- **Exact 409 error text for invalid state transitions** is inferred from code, not confirmed. Troubleshooting examples will describe the *cause* ("action X is not valid from state Y") rather than quote exact server messages.
- **`CampaignDisplayStatus` derivation rules** are pulled from enum javadoc comments; if the actual mapping logic in the service diverges, the field reference will need correction.
- **"Contact Center Campaigns" as the exact Admin Console API Product name** — using the user's stated name verbatim. If the Product is labelled differently in Admin Console production, the authentication page will need a string fix.
