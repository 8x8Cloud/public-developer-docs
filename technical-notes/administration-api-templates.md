# Administration API Reference Templates

## Overview

The Administration API reference pages use custom templates to generate introduction pages for each API. Instead of using a single generic template, each API has its own custom template to provide API-specific information about endpoints, accept headers, and functionality.

## Why Custom Templates?

Initially, we attempted to use a single template for all Administration APIs. However, this approach had limitations:

1. **Static Content Problem**: A single template led to generic content that didn't accurately describe each API's specific endpoints and capabilities
2. **Accept Header Variations**: Each API uses a different accept header format (e.g., `application/vnd.users.v1+json` vs `application/vnd.ringgroups.v1+json`)
3. **Endpoint Differences**: Each API has different endpoints, HTTP methods, and async operation patterns
4. **Maintainability**: Custom templates make it easier to update API-specific documentation without affecting other APIs

## Template Location

All Administration API templates are stored in:

```
docusaurus/templates/
├── user-management-api-info.mdx
├── ring-group-management-api-info.mdx
├── site-management-api-info.mdx
├── phone-number-management-api-info.mdx
└── address-management-api-info.mdx
```

## Template Structure

Each template follows this consistent structure:

### Frontmatter

```yaml
---
id: {{id}}                      # Generated from OpenAPI spec
title: "{{info.title}}"         # Generated from OpenAPI spec
description: "{{info.description}}"  # Generated from OpenAPI spec
sidebar_label: Introduction
sidebar_position: 0
hide_title: true
custom_edit_url: null
---
```

### Page Title

The page uses a clean title without the "8x8 Admin Provisioning" prefix:

```jsx
<Heading as={"h1"} className={"openapi__heading"}>
  User Management API
</Heading>
```

This aligns with the corresponding guide titles (e.g., "User Management API Guide").

### Content Sections

Each template includes:

1. **API Description** - Pulled from OpenAPI spec via `{{info.description}}`
2. **Authentication** - Standard x-api-key header explanation
3. **Versioning** - API-specific accept header format
4. **Base URL** - Single production URL (no staging)
5. **Endpoints** - Table of API-specific endpoints with async indicators
6. **OpenAPI Specification** - Download link to YAML file

## Template Variables

Templates use Docusaurus OpenAPI plugin variables:

- `{{id}}` - Document ID generated from spec
- `{{info.title}}` - API title from OpenAPI spec
- `{{info.version}}` - API version from OpenAPI spec
- `{{info.description}}` - API description from OpenAPI spec

## API-Specific Configuration

### Accept Headers

Each API uses a resource-specific accept header following the pattern:

```
Accept: application/vnd.{resource}.v{version}+json
```

Examples:
- **User Management API**: `application/vnd.users.v1+json`
- **Ring Group Management API**: `application/vnd.ringgroups.v1+json`
- **Site Management API**: `application/vnd.sites.v1+json`
- **Phone Number Management API**: `application/vnd.phonenumbers.v1+json`
- **Address Management API**: `application/vnd.addresses.v1+json`

Reference: See [suite-common.mdx](../docs/administration/docs/suite-common.mdx) lines 176-196 for canonical documentation.

### Base URL

All Administration APIs use a single production base URL:

```
https://api.8x8.com/admin-provisioning
```

**Important**: Do not include a "Production:" label or mention staging environments, as there is only one environment available.

Reference: See [suite-common.mdx](../docs/administration/docs/suite-common.mdx) line 144.

### Endpoint Tables

Each template includes an endpoints table with:

- **Endpoint** - Path with link to operation page
- **Method** - HTTP method (GET, POST, PUT, DELETE)
- **Purpose** - Brief description of the operation
- **Async?** - Indicates if operation is asynchronous (Yes/No)

**Async Operations Pattern**:
- GET operations: typically **No** (synchronous)
- POST, PUT, DELETE operations: typically **Yes** (asynchronous)
- Exceptions: Read-only APIs like Phone Numbers may have all synchronous operations

## Endpoints by API

### User Management API

| Endpoint | Method | Operations |
|----------|--------|------------|
| `/users` | GET, POST | Search, Create |
| `/users/{userId}` | GET, PUT, DELETE | Get, Update, Delete |

### Ring Group Management API

| Endpoint | Method | Operations |
|----------|--------|------------|
| `/ring-groups` | GET, POST | Search, Create |
| `/ring-groups/{ringGroupId}` | GET, PUT, DELETE | Get, Update, Delete |

### Site Management API

| Endpoint | Method | Operations |
|----------|--------|------------|
| `/sites` | GET, POST | Search, Create |
| `/sites/{siteId}` | GET, PUT, DELETE | Get, Update, Delete |

### Phone Number Management API

| Endpoint | Method | Operations |
|----------|--------|------------|
| `/phone-numbers` | GET | Search |
| `/phone-numbers/{phoneNumber}` | GET | Get |

*Note: Phone Number API is read-only (no mutations)*

### Address Management API

| Endpoint | Method | Operations |
|----------|--------|------------|
| `/addresses` | GET, POST | Search, Create |
| `/addresses/{addressId}` | GET, DELETE | Get, Delete |

*Note: Address API has no UPDATE operation*

## Naming Conventions

### Template Files

Template filenames follow the pattern:
```
{api-name}-management-api-info.mdx
```

Examples:
- `user-management-api-info.mdx`
- `ring-group-management-api-info.mdx`
- `site-management-api-info.mdx`
- `phone-number-management-api-info.mdx`
- `address-management-api-info.mdx`

### Generated Files

The Docusaurus OpenAPI plugin generates files in `docs/administration/reference/` with IDs like:

- `user-management-api.info.mdx` (generated from `user-management-api-info.mdx` template)
- `ring-group-management-api.info.mdx`
- etc.

Note: The old pattern with "8-x-8-admin-provisioning-" prefix is deprecated.

### Display Titles

Page titles are clean and concise:
- "User Management API" (not "8x8 Admin Provisioning - Users API")
- "Ring Group Management API" (not "8x8 Admin Provisioning - Ring Groups API")

This aligns with guide titles:
- "User Management API Guide"
- "Ring Group Management API Guide"

## Configuring Templates in docusaurus.config.js

The plugin supports per-spec templates via the `infoTemplate` option. Each API spec is configured as a separate entry in the `config` object:

```javascript
[
  'docusaurus-plugin-openapi-docs',
  {
    id: 'api',
    docsPluginId: 'classic',
    config: {
      administrationUserApi: {
        specPath: 'docs_oas/administration/user-api-v1.yaml',
        outputDir: 'docs/administration/reference',
        sidebarOptions: {
          groupPathsBy: 'tag',
        },
        infoTemplate: 'docusaurus/templates/user-management-api-info.mdx',
      },
      administrationRingGroupApi: {
        specPath: 'docs_oas/administration/ringgroup-api-v1.yaml',
        outputDir: 'docs/administration/reference',
        sidebarOptions: {
          groupPathsBy: 'tag',
        },
        infoTemplate: 'docusaurus/templates/ring-group-management-api-info.mdx',
      },
      administrationSiteApi: {
        specPath: 'docs_oas/administration/site-api-v1.yaml',
        outputDir: 'docs/administration/reference',
        sidebarOptions: {
          groupPathsBy: 'tag',
        },
        infoTemplate: 'docusaurus/templates/site-management-api-info.mdx',
      },
      administrationPhoneNumberApi: {
        specPath: 'docs_oas/administration/phonenumber-api-v1.yaml',
        outputDir: 'docs/administration/reference',
        sidebarOptions: {
          groupPathsBy: 'tag',
        },
        infoTemplate: 'docusaurus/templates/phone-number-management-api-info.mdx',
      },
      administrationAddressApi: {
        specPath: 'docs_oas/administration/address-api-v1.yaml',
        outputDir: 'docs/administration/reference',
        sidebarOptions: {
          groupPathsBy: 'tag',
        },
        infoTemplate: 'docusaurus/templates/address-management-api-info.mdx',
      },
      // ... other API sections
    }
  }
]
```

**Key Points**:
- Each API spec requires its own configuration entry (cannot use directory path with per-spec templates)
- The `infoTemplate` option specifies the custom template for that API's introduction page
- All specs targeting the same `outputDir` are combined in the generated reference documentation

## Updating Templates

When updating templates:

1. **Edit the Template**: Modify the template file in `docusaurus/templates/`
2. **Regenerate Reference**: Run the OpenAPI reference generation script:
   ```bash
   yarn reference:generate:administration
   ```
3. **Verify Output**: Check generated files in `docs/administration/reference/`
4. **Build and Test**: Run `yarn build` to validate

## Adding New APIs

To add a new Administration API:

1. **Create OpenAPI Spec**: Add YAML file to `docs_oas/administration/`
2. **Create Custom Template**: Create new template in `docusaurus/templates/` following the pattern
3. **Configure Plugin**: Add API configuration to `docusaurus.config.js`
4. **Update Suite Common**: Add API to the list in `suite-common.mdx`
5. **Create API Guide**: Create corresponding `-api-guide.mdx` in `docs/administration/docs/`
6. **Generate Reference**: Run `yarn reference:generate:administration`
7. **Update Sidebar**: Add new sections to `docusaurus/sidebars/administration.js`

## Related Documentation

- [OpenAPI Validation](./openapi-validation.md) - Validating OpenAPI specs
- [Development Scripts](./development-scripts.md) - Reference generation commands
- [Administration API Essentials](../docs/administration/docs/suite-common.mdx) - Common API patterns

## Maintenance Notes

- **Keep Templates Synchronized**: When updating one template, consider if other templates need similar updates
- **Validate Accept Headers**: Ensure accept headers match the suite-common.mdx documentation
- **Verify Links**: Ensure endpoint links match generated operation page filenames
- **Test All APIs**: When making template changes, regenerate and test all Administration API references

## History

- **December 2024**: Migrated from single generic template to custom per-API templates
- **Rationale**: Improve API-specific documentation accuracy and maintainability
- **Previous Template**: `docusaurus/templates/administration-api-info.mdx` (deprecated)
