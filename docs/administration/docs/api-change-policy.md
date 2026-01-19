# API Change Policy

**Last Updated:** December 23, 2025
**Applies to:** All Administration API Suite APIs

## Overview

At 8x8, we recognize that API stability is critical to your business operations. Changes to APIs, particularly breaking changes, can require significant development effort, testing, and coordination on your part. We take this responsibility seriously and are committed to minimizing disruption to your integrations.

**Our commitments to you:**

- **Minimize change volume and breaking changes** - We strive to limit the frequency of changes and avoid breaking changes whenever possible by designing APIs with extensibility in mind
- **Transparent communication** - We provide clear documentation and advance notice so you can plan accordingly
- **Balanced evolution** - While we maintain stability, we continue evolving our APIs to deliver new features and capabilities that add value to your integrations

This document outlines how we manage changes to Administration APIs, including our approach to versioning, breaking changes, and how we communicate updates to API consumers. Our goal is to provide you with predictable, well-communicated changes that respect your investment in our platform while enabling continued innovation.

## Change Categories

### Non-Breaking Changes

Non-breaking changes enhance existing functionality without disrupting current integrations. These changes include:

**Examples:**
- **Addition of new attributes** - New fields added to API responses (e.g., adding a `phoneNumberType` field to user objects)
- **Addition of enum values** - New possible values for existing enumerated fields (e.g., adding "MOBILE_APP" to existing values "DESKTOP" and "WEB")
- **Relaxation of validation rules** - Making requirements less restrictive (e.g., reducing minimum password length from 12 to 8 characters)
- **Addition of optional request parameters** - New optional query parameters or request body fields

**Important:** Non-breaking changes:
- Are applied to the current API version
- Do not trigger a version increment
- Do not require advance notification
- Are documented in the changelog at the time they go live

### Breaking Changes

Breaking changes modify existing behavior in ways that may disrupt current integrations. These changes include:

**Examples:**
- **Removal of attributes** - Deleting fields from API responses
- **Removal of enum values** - Removing possible values from enumerated fields
- **Renaming of attributes** - Changing field names in requests or responses
- **Change in data types** - Modifying the data type of existing fields (e.g., string to integer)
- **Stricter validation rules** - Making requirements more restrictive (e.g., increasing minimum password length)
- **Removal of endpoints** - Deprecating and removing API operations
- **Change in HTTP methods** - Modifying the HTTP verb for existing endpoints
- **Change in response status codes** - Altering success or error response codes for existing operations

## API Versioning

### Version Format

When breaking changes are necessary, we release a new API version. Versions are specified using the Accept header with vendor-specific media types:

```text
Accept: application/vnd.{resource}.v{major}+json
```

**Example:**

```text
Accept: application/vnd.users.v1+json
```

### New Version Release Process

When a new API version is published:

1. **Testing availability** - The new version becomes available for testing
2. **Parallel operation** - Both old and new versions remain fully functional
3. **Consumer control** - You control the transition by adjusting the Accept header in your requests
4. **No impact to current version** - Existing implementations continue working unchanged

### Version Support and Deprecation

- **Current versions** remain supported until formally deprecated
- **Deprecation notice** - When a version is deprecated, we provide **12 months advance notice**
- **Continued operation** - Deprecated versions continue functioning during the notice period
- **Retirement** - After the notice period expires, the deprecated version is retired

## Change Notifications

### Non-Breaking Changes

- **No advance notification** provided
- **Changelog publication** - Changes are documented in the API changelog on the developer portal at the time they go live
- **Location** - Changelog available on the respective API documentation page on developer.8x8.com

### Breaking Changes

#### Standard Process (New Version)

- **Changelog publication** - New version documented in the API changelog when released
- **Version deprecation notice** - 12-month advance notice via email to administrative users when old versions are deprecated

#### Emergency Changes (Unavoidable Breaking Change to Current Version)

In rare circumstances where a breaking change cannot be avoided on the current API version (e.g., critical security vulnerabilities):

- **Advance notice** - **90 days minimum** before change implementation
- **Notification method** - Email sent to all administrative users with API key creation permissions
- **Change details** - Comprehensive description of the change and required client modifications

## Client Implementation Guidance

To ensure your integrations remain resilient to non-breaking changes, follow these best practices:

### Handling Unknown Attributes

**Ignore unexpected fields in API responses:**

```json
// API may add new fields at any time
{
  "userId": "12345",
  "email": "user@example.com",
  "phoneNumberType": "MOBILE"  // New field - your client should tolerate this
}
```

Your client should process known fields and gracefully ignore any unexpected attributes.

### Get-Modify-Put Operations

**Preserve all attributes when updating resources:**

1. **GET** the current resource state
2. **Modify** only the fields you need to change
3. **PUT** the entire resource back, including all fields (even new ones you don't recognize)

**Example:**

```javascript
// 1. GET the user
const user = await getUser(userId);

// 2. Modify only the fields you need
user.email = "newemail@example.com";

// 3. PUT back the entire object (including any new fields)
await updateUser(userId, user);
```

This pattern ensures compatibility when new attributes are added to resources.

:::danger CRITICAL: Understanding PUT Semantics

Administration APIs do NOT support partial updates via PATCH. PUT operations require the COMPLETE resource object.

Be sure to familiarise yourself with the correct update pattern in the [Administration API Essentials - Understanding PUT Semantics](./suite-common.mdx#understanding-put-semantics) section to avoid unintended data loss.

:::

### Enum Value Handling

**Handle unexpected enum values gracefully:**
- Use defensive coding practices (default cases, unknown value handlers)
- Don't fail when encountering new enum values you don't recognize
- Log unknown values for future investigation but continue processing

## Support and Questions

For questions about API changes or to provide feedback on this policy, please contact 8x8 Support.
