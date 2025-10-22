# Contributing to 8x8 Developer Documentation

Welcome to the 8x8 Developer Documentation repository. This guide provides comprehensive instructions for contributing high-quality documentation to the 8x8 Developer Portal.

## Table of Contents

- [Overview](#overview)
- [Team Ownership Model](#team-ownership-model)
- [Getting Started](#getting-started)
- [Documentation Architecture](#documentation-architecture)
- [API Documentation with OpenAPI](#api-documentation-with-openapi)
- [Documentation Standards](#documentation-standards)
- [Content Creation Process](#content-creation-process)
- [Review Process](#review-process)
- [Quality Standards](#quality-standards)
- [Templates and Examples](#templates-and-examples)
- [Style Guide](#style-guide)
- [Tools and Resources](#tools-and-resources)
- [Support and Escalation](#support-and-escalation)

## Overview

This repository serves as the source for the 8x8 Developer Portal (developer.8x8.com), providing APIs, SDKs, guides, and integration resources. Each development team owns and maintains their documentation within dedicated directories.

### Key Principles

- **Team Ownership**: Each team is responsible for their documentation quality and accuracy
- **API-First**: API documentation is generated from OpenAPI Specification (OAS) files
- **Peer Review**: All changes require review from team members before merging
- **Industry Standards**: Follow established documentation practices and accessibility guidelines
- **User-Centric**: Prioritize developer experience and usability
- **Consistency**: Maintain uniform structure, style, and formatting across all documentation

### Technology Stack

- **Static Site Generator**: Docusaurus
- **API Documentation**: OpenAPI Specification (OAS) files with Docusaurus OpenAPI plugin
- **Content Format**: Markdown for guides, YAML/JSON for API specifications
- **Validation**: Automated linting and validation for both content and API specs

## Team Ownership Model

### Directory Structure

Each team has a dedicated directory under `./docs/`:

```
docs/
├── analytics/           # Analytics team documentation
├── contactcenter/       # Contact Center team documentation
├── connect/            # Connect team documentation
├── jaas/               # JaaS team documentation
├── actions-events/     # Actions & Events team documentation
├── tech-partner/       # Tech Partner team documentation
└── [team-name]/        # Additional team directories
```

### Ownership Responsibilities

Team owners are responsible for:

- **Content Accuracy**: Ensuring technical correctness and currency
- **Quality Control**: Reviewing all changes before merge
- **User Experience**: Maintaining clear, helpful documentation
- **Maintenance**: Regular updates and improvements
- **Compliance**: Adhering to documentation standards and guidelines

### CODEOWNERS Integration

**Note:** CODEOWNERS file is planned for future implementation to enforce team ownership.

Planned features:
- Teams will have write access only to their designated directories
- Changes will require approval from designated team reviewers
- Cross-team changes will require additional approvals
- Administrative changes will require platform team approval

## Getting Started

### Prerequisites

- GitHub account with repository access
- Familiarity with Git and Markdown
- Understanding of your team's product/service
- Node.js 18+ (for local Docusaurus development)
- Understanding of OpenAPI/Swagger specifications (for API docs)
- Review of this contributing guide

### Initial Setup

1. **Clone the repository**:
   ```bash
   # HTTPS
   git clone https://github.com/8x8/developer-docs.git
   cd developer-docs

   # SSH (recommended for contributors with SSH keys configured)
   git clone git@github.com:8x8/developer-docs.git
   cd developer-docs
   ```

2. **Install dependencies**:
   ```bash
   yarn install
   ```

3. **Start local development server**:
   ```bash
   yarn start
   ```
   This starts Docusaurus and opens http://localhost:3000

   For detailed information on all available commands, see [Development Scripts](technical-notes/development-scripts.md).

4. **Create a feature branch**:
   ```bash
   git checkout -b [team-name]/[feature-description]
   ```

5. **Review existing content** in your team's directory to understand current patterns

### Making Changes

1. Navigate to your team's directory: `docs/[team-name]/`
2. For API docs: Edit OpenAPI spec files in `docs_oas/[team-name]/` directory
3. For guides: Create or edit Markdown files in `docs/[team-name]/docs/`
4. Test your changes locally with `yarn start`
5. Validate API specs with `yarn validate:openapi` (see [OpenAPI Validation](technical-notes/openapi-validation.md))
6. Commit with descriptive messages following our [commit guidelines](#commit-guidelines)

## Documentation Architecture

### Docusaurus Integration

This site is built with [Docusaurus](https://docusaurus.io/), a modern static site generator optimized for documentation sites.

#### Key Features:
- **Fast builds**: Optimized for large documentation sites
- **Search integration**: Built-in search functionality
- **Responsive design**: Mobile-friendly by default
- **Dark mode support**: Automatic theme switching
- **OpenAPI integration**: Native API documentation rendering

#### Site Configuration

The main configuration is in `docusaurus.config.js`:
- Site metadata and branding
- Navigation structure
- Plugin configurations
- Theme customizations

### Directory Structure with Docusaurus

```
developer-docs/
├── docs/                    # Main documentation content
│   ├── [team-name]/
│   │   ├── docs/           # Markdown guides and tutorials
│   │   ├── reference/      # Auto-generated API reference docs
│   │   └── images/         # Team-specific images
├── docs_oas/               # OpenAPI specification source files
│   └── [team-name]/        # Team's OpenAPI specs
│       ├── *.yaml         # API specification files
│       └── *.json         # Alternative JSON format specs
├── docusaurus/             # Docusaurus configuration
│   ├── sidebars/          # Sidebar configurations
│   │   └── index.js       # Main sidebar index
│   ├── static/            # Static assets
│   └── css/               # Custom styles
├── docusaurus.config.js   # Site configuration
└── package.json           # Dependencies and scripts
```

For a complete overview of the repository structure, see [Project Structure](technical-notes/project-structure.md).

### Content Organization

#### Team-Specific Structure:
```
docs/[team-name]/
├── docs/                 # Guides, tutorials, and documentation
│   ├── getting-started.md
│   ├── authentication.md
│   ├── webhooks.md
│   └── troubleshooting.md
├── reference/            # Auto-generated API reference (from OpenAPI specs)
│   └── [generated files]
└── images/               # Team-specific images and diagrams
```

#### OpenAPI Source Files:
```
docs_oas/[team-name]/
├── *.yaml                # OpenAPI specification files
├── *.json                # Alternative JSON format
└── [multiple files]      # Can be split into multiple spec files
```

**Workflow:** Edit OpenAPI specs in `docs_oas/[team-name]/`, then run `yarn reference` to create documentation in `docs/[team-name]/reference/`. See [Development Scripts](technical-notes/development-scripts.md) for details.

## API Documentation with OpenAPI

### Overview

API documentation is generated from OpenAPI Specification (OAS) files using the [Docusaurus OpenAPI plugin](https://github.com/PaloAltoNetworks/docusaurus-openapi-docs). This ensures:

- **Single source of truth**: API specs serve both documentation and implementation
- **Interactive documentation**: Built-in API explorer and testing interface
- **Consistency**: Standardized format across all team APIs
- **Validation**: Automatic validation of API specifications

### OpenAPI File Management

#### Main Specification File

Each team maintains their API specification in `docs_oas/[team-name]/` directory:

```yaml
openapi: 3.0.3
info:
  title: [Team Name] API
  version: 1.0.0
  description: |
    [Brief description of your API]

    ## Authentication
    [Authentication details]

  contact:
    name: [Team Name] Team
    email: [team-email]@8x8.com
  license:
    name: MIT
servers:
  - url: https://api.8x8.com/v1/[service]
    description: Production server
  - url: https://api-staging.8x8.com/v1/[service]
    description: Staging server
```

#### Schema Organization

Break down complex schemas into separate files for maintainability:

```yaml
# docs_oas/[team-name]/common-schemas.yaml
components:
  schemas:
    Error:
      type: object
      properties:
        code:
          type: string
          description: Error code
        message:
          type: string
          description: Human-readable error message
      required:
        - code
        - message

    PaginationMeta:
      type: object
      properties:
        page:
          type: integer
          minimum: 1
        per_page:
          type: integer
          minimum: 1
          maximum: 100
        total:
          type: integer
        total_pages:
          type: integer
```

#### Reference External Schemas

In your main OpenAPI file, reference external schema files:

```yaml
paths:
  /resources:
    get:
      responses:
        '200':
          content:
            application/json:
              schema:
                type: object
                properties:
                  data:
                    type: array
                    items:
                      $ref: './common-schemas.yaml#/components/schemas/Resource'
                  meta:
                    $ref: './common-schemas.yaml#/components/schemas/PaginationMeta'
        '400':
          content:
            application/json:
              schema:
                $ref: './common-schemas.yaml#/components/schemas/Error'
```

### OpenAPI Best Practices

#### 1. Comprehensive Descriptions

```yaml
paths:
  /webhooks:
    post:
      summary: Create webhook
      description: |
        Creates a new webhook endpoint for receiving real-time notifications.

        Webhooks allow your application to receive notifications when specific
        events occur in the 8x8 platform. This is more efficient than polling
        for changes.

        ## Webhook Security

        All webhook payloads are signed with HMAC-SHA256 using your webhook secret.
        Verify the signature to ensure the request is from 8x8.

        ## Retry Policy

        If your endpoint returns a non-2xx status code, we will retry the webhook
        delivery up to 5 times with exponential backoff.
      operationId: createWebhook
```

#### 2. Detailed Examples

```yaml
requestBody:
  content:
    application/json:
      schema:
        $ref: '#/components/schemas/CreateWebhookRequest'
      examples:
        basic_webhook:
          summary: Basic webhook setup
          value:
            url: "https://api.example.com/webhooks/8x8"
            events: ["call.started", "call.ended"]
            secret: "your-webhook-secret"
        advanced_webhook:
          summary: Advanced webhook with filters
          value:
            url: "https://api.example.com/webhooks/8x8"
            events: ["call.started", "call.ended", "call.recording.ready"]
            secret: "your-webhook-secret"
            filters:
              user_groups: ["sales", "support"]
              call_duration_min: 30
```

#### 3. Proper Error Documentation

```yaml
responses:
  '400':
    description: Bad Request - Invalid input parameters
    content:
      application/json:
        schema:
          $ref: '#/components/schemas/Error'
        examples:
          validation_error:
            summary: Validation failed
            value:
              code: "VALIDATION_ERROR"
              message: "Invalid webhook URL format"
              details:
                field: "url"
                reason: "Must be a valid HTTPS URL"
          rate_limit_error:
            summary: Rate limit exceeded
            value:
              code: "RATE_LIMIT_EXCEEDED"
              message: "Too many webhook creation requests"
              details:
                retry_after: 300
```

### OpenAPI Validation and Testing

#### Local Validation

```bash
# Validate with folder filtering (custom script)
yarn validate:openapi                     # Validate all folders
yarn validate:openapi connect             # Validate only connect/ folder
yarn validate:openapi analytics           # Validate only analytics/ folder
```

For detailed validation options and troubleshooting, see [OpenAPI Validation](technical-notes/openapi-validation.md).

#### Pre-commit Validation

OpenAPI files are automatically validated on:
- Git pre-commit hooks
- Pull request creation
- CI/CD pipeline runs

#### Testing API Documentation

1. **Local Preview**:
   ```bash
   yarn start
   # Navigate to http://localhost:3000/[team-name]/reference
   ```

2. **Interactive Testing**:
    - Use the built-in API explorer
    - Test endpoints with different parameters
    - Verify response schemas match actual API responses

### Integration with Docusaurus

#### Plugin Configuration

In `docusaurus.config.js`:

```javascript
module.exports = {
  plugins: [
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: 'api',
        docsPluginId: 'classic',
        config: {
          // Auto-generate API docs from OpenAPI specs
          analyticsContentApis: {
            specPath: 'docs_oas/analytics',
            outputDir: 'docs/analytics/reference',
            sidebarOptions: {
              groupPathsBy: 'tag',
            },
          },
          connectApis: {
            specPath: 'docs_oas/connect',
            outputDir: 'docs/connect/reference',
            sidebarOptions: {
              groupPathsBy: 'tag',
            },
          },
          // Add other teams...
        },
      },
    ],
  ],
};
```

**Note:** OpenAPI source files are in `docs_oas/[team]/`, generated documentation outputs to `docs/[team]/reference/`. Run `yarn reference:generate` to regenerate API documentation.

#### Sidebar Integration

OpenAPI-generated pages are automatically integrated into the site navigation based on your sidebar configuration in `docusaurus/sidebars/index.js`.

For detailed information on sidebar configuration, see:
- [Sidebar Validation](technical-notes/sidebar-validation.md) - Validate sidebar consistency
- [Sidebar Deprecation Pattern](technical-notes/sidebar-deprecation-pattern.md) - Mark deprecated content

## Documentation Standards

### File Organization

#### Directory Structure
```
docs/[team-name]/
├── docs/                 # Guides, tutorials, and documentation
│   ├── getting-started.md
│   ├── authentication.md
│   └── troubleshooting.md
├── reference/            # Auto-generated API reference
└── images/               # Team-specific images
```

See [Project Structure](technical-notes/project-structure.md) for complete repository structure.

#### File Naming Conventions
- Use lowercase with hyphens: `getting-started.md`
- Be descriptive and specific: `webhook-configuration.md`
- Group related files in subdirectories
- Use consistent naming across teams

### Content Types

#### API Documentation
- **Reference**: Complete API endpoint documentation
- **Guides**: Step-by-step implementation tutorials
- **Examples**: Working code samples in multiple languages
- **Authentication**: Security and authentication details

#### SDK Documentation
- **Installation**: Setup and installation instructions
- **Quick Start**: Basic usage examples
- **API Reference**: Method and class documentation
- **Examples**: Real-world implementation scenarios

#### Integration Guides
- **Overview**: High-level integration concepts
- **Step-by-step**: Detailed implementation instructions
- **Code Examples**: Working samples with explanations
- **Best Practices**: Recommended approaches and patterns

### Markdown Standards

#### Document Structure
```markdown
# Page Title (H1 - only one per document)

Brief description of the page content.

## Section Heading (H2)

Content organized in logical sections.

### Subsection (H3)

More detailed information.

#### Sub-subsection (H4)

Specific details or examples.
```

#### Required Elements
- **Title**: Clear, descriptive H1 heading
- **Description**: Brief overview of content purpose
- **Table of Contents**: For documents > 500 words
- **Code Examples**: Properly formatted and tested
- **Cross-references**: Links to related documentation

## Content Creation Process

### Planning Phase

1. **Define Scope**: Clearly outline what the documentation will cover
2. **Identify Audience**: Understand who will use this documentation
3. **Review Existing Content**: Avoid duplication and ensure consistency
4. **Create Outline**: Structure content logically before writing

### Writing Phase

1. **Use Templates**: Start with appropriate templates (see [Templates](#templates-and-examples))
2. **Follow Style Guide**: Adhere to voice, tone, and formatting standards
3. **Include Examples**: Provide working code samples and real-world scenarios
4. **Add Visual Elements**: Use diagrams, screenshots, and illustrations appropriately

### Review Phase

1. **Self-Review**: Check for accuracy, clarity, and completeness
2. **Technical Review**: Verify all code examples and technical details
3. **Editorial Review**: Check grammar, style, and consistency
4. **User Testing**: Validate with actual developers when possible

## Review Process

### Peer Review Requirements

All documentation changes require review and approval from:

1. **Primary Reviewer**: Team member familiar with the content area
2. **Secondary Reviewer**: Additional team member for quality assurance
3. **Subject Matter Expert**: For technical accuracy (if different from above)

### Review Criteria

Reviewers should evaluate:

- **Accuracy**: Technical correctness and currency
- **Clarity**: Clear, understandable language and structure
- **Completeness**: All necessary information included
- **Consistency**: Adherence to style and formatting standards
- **Usability**: Developer-friendly and actionable content

### Review Process Steps

1. **Create Pull Request**: Include detailed description of changes
2. **Assign Reviewers**: Tag appropriate team members
3. **Address Feedback**: Respond to all reviewer comments
4. **Obtain Approvals**: Secure required approvals before merging
5. **Merge Changes**: Use squash merge to maintain clean history

### Cross-Team Reviews

Changes affecting multiple teams or shared resources require:

- Notification to affected teams via GitHub mentions
- Additional approval from platform team
- Extended review period for stakeholder input
- Documentation of impact assessment

## Quality Standards

### Content Quality

- **Accuracy**: Information must be technically correct and current
- **Clarity**: Content should be easily understood by target audience
- **Completeness**: All necessary information provided without gaps
- **Conciseness**: Clear and direct without unnecessary complexity
- **Actionability**: Readers should be able to successfully follow instructions

### Technical Standards

#### Code Examples
- Must be working, tested code
- Include error handling where appropriate
- Provide examples in multiple languages when relevant
- Include expected outputs and responses
- Use realistic, meaningful example data

#### Links and References
- All internal links must be valid and current
- External links should be to authoritative sources
- Use relative links for internal documentation
- Include link text that describes the destination

#### Images and Media
- High-quality, professional images
- Include alt text for accessibility
- Use consistent styling and branding
- Optimize file sizes for web delivery
- Store in appropriate `/assets` directory

### Accessibility Requirements

- Use semantic HTML structure
- Provide alt text for all images
- Ensure sufficient color contrast
- Use descriptive link text
- Structure content with proper headings
- Test with screen readers when possible

## Templates and Examples

We provide comprehensive templates to ensure consistency across all documentation:

### OpenAPI Templates

- **[OpenAPI Template](docs/templates/openapi-template.yaml)** - Complete OpenAPI 3.0.3 specification template
- **[Schema Template](docs/templates/openapi-schemas-template.yaml)** - Reusable schema definitions
- **Usage**: Copy and customize these templates for your team's API documentation

### Document Templates

#### API Reference Template
```markdown
# [API Name] API Reference

Brief description of the API's purpose and capabilities.

## Authentication

Details about authentication requirements and methods.

## Endpoints

### GET /endpoint
Description of what this endpoint does.

**Parameters:**
- `param1` (string, required): Description
- `param2` (integer, optional): Description

**Response:**
```json
{
  "example": "response"
}
```

**Example Request:**
```bash
curl -X GET "https://api.8x8.com/endpoint" \
  -H "Authorization: Bearer YOUR_TOKEN"
```
```

#### Getting Started Template
```markdown
# Getting Started with [Product/Service]

This guide will help you get up and running with [Product/Service] in just a few minutes.

## Prerequisites

- List required knowledge or setup
- Include links to prerequisite documentation

## Quick Start

### Step 1: Setup
Instructions for initial setup.

### Step 2: Configuration
Configuration details with examples.

### Step 3: First Implementation
Basic implementation example.

## Next Steps

- Link to advanced guides
- Link to API reference
- Link to examples repository
```

### Code Example Standards

#### Multi-language Examples
```markdown
**JavaScript:**
```javascript
// Descriptive comment
const client = new API8x8Client({
  apiKey: 'your-api-key'
});
```

**Python:**
```python
# Descriptive comment
client = API8x8Client(api_key='your-api-key')
```

**cURL:**
```bash
# Descriptive comment
curl -X POST "https://api.8x8.com/v1/resource" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"example": "data"}'
```
```

## Style Guide

### Voice and Tone

- **Professional**: Maintain authoritative, expert voice
- **Helpful**: Focus on enabling developer success
- **Clear**: Use simple, direct language
- **Consistent**: Maintain uniform style across all content

### Writing Guidelines

#### Language Usage
- Use active voice: "Configure the webhook" not "The webhook should be configured"
- Write in second person: "You can configure..." not "One can configure..."
- Use present tense: "The API returns..." not "The API will return..."
- Avoid jargon without explanation
- Define technical terms on first use

#### Formatting Standards
- Use sentence case for headings: "Getting started" not "Getting Started"
- Bold for UI elements: **Save** button
- Code formatting for: `code`, `filenames`, `endpoints`
- Italic for emphasis and *first use of terms*

### Terminology

#### Consistent Terms
- Use "8x8" not "8X8" or "8*8"
- "API key" not "api key" or "API Key"
- "webhook" not "web hook" or "WebHook"
- "JavaScript" not "Javascript" or "java script"

#### Abbreviations
- Spell out on first use: "Application Programming Interface (API)"
- Use common abbreviations sparingly
- Maintain consistency across all documentation

## Tools and Resources

### Required Tools

- **Text Editor**: VS Code, Sublime Text, or similar with Markdown support
- **Git Client**: Command line Git or GUI client
- **Markdown Linter**: For consistency checking
- **Link Checker**: To validate all links

### Recommended Tools

- **Grammarly or LanguageTool**: Grammar and style checking
- **Markdown Preview**: Real-time preview while editing
- **Image Optimization**: Tools for optimizing images and diagrams
- **Diagramming**: Lucidchart, Draw.io, or Mermaid for technical diagrams

### Testing and Validation

#### Local Testing
- Preview Markdown rendering locally
- Test all code examples in appropriate environments
- Validate all internal and external links
- Check images display correctly

#### Automated Checks

The repository includes several validation scripts to ensure content quality:

```bash
# Validate documentation content against quality rules
yarn validate:content

# Validate sidebar configuration consistency
yarn validate:sidebar

# Validate OpenAPI specifications
yarn validate:openapi [folder]         # Custom validation with filtering

# Check for broken links and anchors
yarn analyze-links

# Format code files
yarn format:check                      # Check formatting
yarn format:write                      # Auto-format files
```

**Detailed documentation:**
- [Content Validation](technical-notes/content-validation.md) - Content quality rules and extensible validation system
- [Sidebar Validation](technical-notes/sidebar-validation.md) - Sidebar consistency checking
- [OpenAPI Validation](technical-notes/openapi-validation.md) - OpenAPI specification validation
- [Analyze Broken Links](technical-notes/analyze-broken-links.md) - Link validation and analysis
- [Development Scripts](technical-notes/development-scripts.md) - Complete command reference

### Useful Resources

- [Markdown Guide](https://www.markdownguide.org/)
- [Google Developer Documentation Style Guide](https://developers.google.com/style)
- [Microsoft Writing Style Guide](https://docs.microsoft.com/en-us/style-guide/)
- [Inclusive Language Guidelines](https://developers.google.com/style/inclusive-documentation)

## Support and Escalation

### Getting Help

1. **Team Support**: Reach out to your team's documentation lead
2. **Platform Team**: Contact for cross-team issues or technical problems
3. **Community**: Use internal Slack channels for quick questions
4. **Documentation Office Hours**: Weekly sessions for guidance and support

### Issue Escalation

#### When to Escalate
- Cross-team content conflicts
- Technical platform issues
- Style guide clarifications
- Process improvement suggestions

#### Escalation Process
1. Document the issue clearly
2. Contact your team lead first
3. If unresolved, escalate to platform team
4. Create GitHub issue for tracking
5. Follow up until resolution

### Contact Information

- **Platform Team**: @platform-team
- **Documentation Leads**: See team README files
- **Technical Issues**: Create issue in this repository
- **Process Questions**: Contact platform team directly

## Commit Guidelines

### Commit Message Format
```
[team-name] Brief description of change

Optional longer description explaining the what and why.
Include any breaking changes or important notes.

Closes #issue-number (if applicable)
```

### Commit Message Examples
```
[analytics] Add webhook configuration guide

Added comprehensive guide for configuring webhooks including
authentication, payload structure, and error handling.

[contactcenter] Fix broken links in API reference

Updated all internal links to use relative paths and verified
external links are still valid.
```

---

## Quick Reference

### Checklist for New Contributors

- [ ] Read this contributing guide completely
- [ ] Set up local development environment
- [ ] Review existing documentation in your team's directory
- [ ] Understand team-specific processes and requirements
- [ ] Identify subject matter experts for your content area
- [ ] Create test branch for first contribution

### Checklist for Content Creation

- [ ] Used appropriate template as starting point
- [ ] Followed directory structure and naming conventions
- [ ] Included all required elements (title, description, examples)
- [ ] Tested all code examples
- [ ] Validated all links
- [ ] Optimized any images or media
- [ ] Reviewed for accuracy, clarity, and completeness
- [ ] Checked spelling and grammar
- [ ] Verified accessibility compliance

### Checklist for Pull Requests

- [ ] Descriptive title and detailed description
- [ ] Assigned appropriate reviewers
- [ ] All code examples tested and working
- [ ] Links validated and functional
- [ ] Images optimized and have alt text
- [ ] Followed style guide and formatting standards
- [ ] Addressed all reviewer feedback
- [ ] Obtained required approvals

---

## Additional Resources

For more detailed information about the repository and development workflow:

### Repository Documentation
- **[CLAUDE.md](CLAUDE.md)** - Repository overview and quick reference guide
- **[README.md](README.md)** - Project introduction and getting started

### Technical Notes
Detailed technical documentation in `technical-notes/`:
- **[Project Structure](technical-notes/project-structure.md)** - Comprehensive repository structure documentation
- **[Development Scripts](technical-notes/development-scripts.md)** - Complete yarn command reference
- **[Content Validation](technical-notes/content-validation.md)** - Extensible content validation system
- **[Sidebar Validation](technical-notes/sidebar-validation.md)** - Sidebar consistency checking
- **[Sidebar Deprecation Pattern](technical-notes/sidebar-deprecation-pattern.md)** - How to mark deprecated documentation
- **[OpenAPI Validation](technical-notes/openapi-validation.md)** - Validating OpenAPI specification files
- **[Lowercase Operation IDs](technical-notes/lowercase-operation-ids.md)** - OpenAPI operation ID processing
- **[Analyze Broken Links](technical-notes/analyze-broken-links.md)** - Link validation and analysis tool
- **[Redirects](technical-notes/redirects.md)** - URL redirect management
- **[Search Functionality](technical-notes/search.md)** - Client-side search configuration
- **[Known Issues](technical-notes/known-issues.md)** - Known limitations and workarounds

### External Resources
- [Docusaurus Documentation](https://docusaurus.io/docs) - Official Docusaurus guide
- [OpenAPI Specification](https://spec.openapis.org/oas/latest.html) - OpenAPI 3.0+ specification
- [Markdown Guide](https://www.markdownguide.org/) - Markdown syntax reference

---

*This contributing guide is a living document. Please suggest improvements by creating an issue or submitting a pull request.*
