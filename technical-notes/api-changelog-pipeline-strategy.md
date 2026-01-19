# API Changelog Publication Pipeline - Strategy Document

**Document Status:** Proposal
**Date:** December 23, 2025
**Scope:** Administration APIs (Users, Sites, Phone Numbers, Ring Groups, Addresses)

## Executive Summary

This document proposes three strategic approaches for implementing an automated API changelog publication pipeline that:

1. **Enables easy discovery** of API change history (major and minor revisions)
2. **Automates changelog generation** through the CD pipeline with optional control gates
3. **Uses LLM-based content generation** with mandatory Product Manager review
4. **Coordinates releases** with documentation updates via the RP (Release Process) Jira workflow

## Current State Analysis

### Documentation Repository (`developer-docs`)
- **Framework:** Docusaurus with GitHub Pages deployment
- **CI/CD:** GitHub Actions (PR previews + master deployments)
- **OpenAPI Specs:** 5 Administration APIs in `docs_oas/administration/`
- **Existing Changelog:** Single legacy changelog at `docs/contactcenter/changelog.md`

### Service Repository (`platform_provisioning_facade`)
- **CI/CD:** Jenkins with build8/GDS workflow
- **API Generation:** Java-based, appears to use code-first approach
- **Versioning:** Semantic versioning with git tags
- **Release Coordination:** RP Jira ticket workflow

### Key Constraints & Decisions
- ✅ Changelog storage: Developer-docs repository (co-located with documentation)
- ✅ Content generation: LLM-based with guided prompts/skills
- ✅ PM Review: GitHub Pull Request workflow
- ✅ Triggers: OpenAPI spec changes, manual trigger, semantic commits
- ✅ Coordination: RP Jira ticket workflow

## Requirements Summary

### Functional Requirements
| ID | Requirement | Priority |
|----|-------------|----------|
| FR-1 | Easy discovery of API-specific change history | MUST |
| FR-2 | Automated generation from service CD pipeline | MUST |
| FR-3 | Optional control gate in service pipeline | SHOULD |
| FR-4 | LLM-generated changelog content | MUST |
| FR-5 | Mandatory PM review and edit capability | MUST |
| FR-6 | Coordinated release with documentation updates | MUST |
| FR-7 | Support for major and minor version tracking | MUST |
| FR-8 | Backward compatibility with existing URLs | SHOULD |

### Non-Functional Requirements
| ID | Requirement | Priority |
|----|-------------|----------|
| NFR-1 | Generation latency < 5 minutes | SHOULD |
| NFR-2 | Pipeline reliability > 99% | SHOULD |
| NFR-3 | Zero manual file manipulation required | MUST |
| NFR-4 | Audit trail of all changelog changes | MUST |
| NFR-5 | Rollback capability for published changelogs | SHOULD |

---

## Approach 1: Service-Initiated Cross-Repo Pipeline (RECOMMENDED)

### Overview
Service repository triggers changelog generation in the docs repository via webhook/API call, leveraging GitHub Actions for LLM generation and PR-based review.

### Architecture

```
┌─────────────────────────────────────────┐
│  platform_provisioning_facade (Service) │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │ Jenkins Pipeline (build8/GDS)    │  │
│  │                                  │  │
│  │ 1. Detect API Changes            │  │
│  │    - OpenAPI spec diff           │  │
│  │    - Semantic commits            │  │
│  │    - Version tags                │  │
│  │                                  │  │
│  │ 2. Optional Control Gate         │  │
│  │    - Continue/Abort decision     │  │
│  │                                  │  │
│  │ 3. Trigger Docs Webhook ─────────┼─┐│
│  └──────────────────────────────────┘ ││
└─────────────────────────────────────────┘│
                                          │
                ┌─────────────────────────┘
                │ GitHub Repository Dispatch Event
                │ {
                │   "api": "user-api",
                │   "version": "1.1.0",
                │   "spec_url": "...",
                │   "rp_ticket": "RP-12345"
                │ }
                │
                ▼
┌─────────────────────────────────────────────────┐
│  developer-docs (Documentation)                 │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │ GitHub Actions Workflow                  │  │
│  │                                          │  │
│  │ 1. Fetch OpenAPI Specs                   │  │
│  │    - Current: docs_oas/administration/   │  │
│  │    - Previous: git history or artifact   │  │
│  │                                          │  │
│  │ 2. Generate Diff                         │  │
│  │    - Use openapi-diff or oasdiff        │  │
│  │                                          │  │
│  │ 3. LLM Changelog Generation              │  │
│  │    - Claude Agent with guided prompt     │  │
│  │    - Input: diff + context + templates   │  │
│  │    - Output: Markdown changelog entry    │  │
│  │                                          │  │
│  │ 4. Create Branch & PR                    │  │
│  │    - Branch: changelog/user-api-v1.1.0   │  │
│  │    - Link to RP Jira ticket             │  │
│  │    - Request PM review                   │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │ Product Manager Review                   │  │
│  │                                          │  │
│  │ - Review generated changelog             │  │
│  │ - Edit content directly in PR            │  │
│  │ - Approve when satisfied                 │  │
│  │ - Link to RP ticket for coordination     │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │ Merge & Deploy                           │  │
│  │                                          │  │
│  │ - PR merged to master                    │  │
│  │ - Deployed to GitHub Pages               │  │
│  │ - RP Jira ticket updated                 │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

### Technical Implementation

#### 1. Service Repository (platform_provisioning_facade)

**Jenkinsfile Addition:**
```groovy
stage('API Changelog Notification') {
    when {
        anyOf {
            // Trigger on version tags
            buildingTag()
            // Or manual trigger
            expression { params.TRIGGER_CHANGELOG == true }
            // Or when OpenAPI specs changed
            changeset "api/**/*.yaml"
        }
    }
    steps {
        script {
            // Optional control gate
            if (params.SKIP_CHANGELOG != true) {
                def specChanges = detectOpenAPIChanges()

                if (specChanges.hasChanges) {
                    // Trigger GitHub Actions via repository dispatch
                    triggerChangelogGeneration(
                        api: specChanges.apiName,
                        version: env.VERSION,
                        specUrl: specChanges.specUrl,
                        rpTicket: env.RP_TICKET,
                        changes: specChanges.summary
                    )
                }
            }
        }
    }
}
```

**Helper Functions:**
```groovy
def detectOpenAPIChanges() {
    // Compare current OpenAPI specs with previous version
    // Return structured data about changes
    sh """
        # Download openapi-diff or oasdiff
        # Compare specs
        # Generate summary
    """
}

def triggerChangelogGeneration(Map config) {
    // Use GitHub CLI or API to trigger repository dispatch
    withCredentials([string(credentialsId: 'github-token', variable: 'GITHUB_TOKEN')]) {
        sh """
            gh api repos/8x8/developer-docs/dispatches \
                -X POST \
                -f event_type='changelog_request' \
                -f payload='${JsonOutput.toJson(config)}'
        """
    }
}
```

#### 2. Documentation Repository (developer-docs)

**New Workflow: `.github/workflows/changelog-generation.yml`**
```yaml
name: API Changelog Generation

on:
  repository_dispatch:
    types: [changelog_request]
  workflow_dispatch:
    inputs:
      api:
        description: 'API name (e.g., user-api)'
        required: true
      version:
        description: 'API version (e.g., 1.1.0)'
        required: true
      rp_ticket:
        description: 'RP Jira ticket (e.g., RP-12345)'
        required: true

jobs:
  generate_changelog:
    runs-on: build8-linux-x64
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: 22.17.0

      - name: Install Dependencies
        run: |
          yarn install
          npm install -g openapi-diff

      - name: Fetch OpenAPI Specs
        id: fetch_specs
        run: |
          API=${{ github.event.client_payload.api || github.event.inputs.api }}
          VERSION=${{ github.event.client_payload.version || github.event.inputs.version }}

          # Current spec
          CURRENT_SPEC="docs_oas/administration/${API}-v1.yaml"

          # Previous spec from git history
          git fetch --tags
          PREV_TAG=$(git describe --tags --abbrev=0 HEAD^)
          git show ${PREV_TAG}:${CURRENT_SPEC} > /tmp/prev-spec.yaml

          echo "current_spec=${CURRENT_SPEC}" >> $GITHUB_OUTPUT
          echo "prev_spec=/tmp/prev-spec.yaml" >> $GITHUB_OUTPUT

      - name: Generate OpenAPI Diff
        id: generate_diff
        run: |
          openapi-diff \
            ${{ steps.fetch_specs.outputs.prev_spec }} \
            ${{ steps.fetch_specs.outputs.current_spec }} \
            --format markdown \
            --output /tmp/api-diff.md

      - name: Generate Changelog with LLM
        id: generate_changelog
        env:
          ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}
        run: |
          node scripts/generate-changelog-with-llm.js \
            --api "${{ github.event.client_payload.api }}" \
            --version "${{ github.event.client_payload.version }}" \
            --diff /tmp/api-diff.md \
            --rp-ticket "${{ github.event.client_payload.rp_ticket }}" \
            --output /tmp/changelog-entry.md

      - name: Create Changelog Branch & PR
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
        run: |
          API=${{ github.event.client_payload.api }}
          VERSION=${{ github.event.client_payload.version }}
          RP_TICKET=${{ github.event.client_payload.rp_ticket }}

          BRANCH="changelog/${API}-v${VERSION}"

          git config user.name "8x8-changelog-bot"
          git config user.email "changelog-bot@8x8.com"

          git checkout -b ${BRANCH}

          # Insert changelog entry at the top of the file
          node scripts/insert-changelog-entry.js \
            --api ${API} \
            --entry /tmp/changelog-entry.md

          git add .
          git commit -m "Add changelog for ${API} v${VERSION}

Related: ${RP_TICKET}"

          git push origin ${BRANCH}

          # Create PR with PM assignee
          gh pr create \
            --title "Changelog: ${API} v${VERSION}" \
            --body "$(cat <<EOF
## Automated Changelog Generation

**API:** ${API}
**Version:** ${VERSION}
**RP Ticket:** [${RP_TICKET}](https://8x8.atlassian.net/browse/${RP_TICKET})

### Generated Content

This changelog entry was automatically generated by analyzing OpenAPI specification changes.

### Product Manager Review Required

Please review the generated changelog entry for:
- [ ] Accuracy of technical details
- [ ] Clarity for developers
- [ ] Appropriate breaking change warnings
- [ ] Migration guidance (if applicable)
- [ ] Tone and messaging

You can edit the changelog entry directly in this PR before approving.

### Coordination

This PR should be merged in coordination with the RP ticket timeline.

---
Generated by: changelog-generation.yml
EOF
)" \
            --reviewer "@pm-team" \
            --label "changelog,needs-pm-review,${RP_TICKET}"
```

**LLM Generation Script: `scripts/generate-changelog-with-llm.js`**
```javascript
#!/usr/bin/env node

const Anthropic = require('@anthropic-ai/sdk');
const fs = require('fs');
const path = require('path');
const yargs = require('yargs/yargs');
const { hideBin } = require('yargs/helpers');

const argv = yargs(hideBin(process.argv))
  .option('api', { type: 'string', demandOption: true })
  .option('version', { type: 'string', demandOption: true })
  .option('diff', { type: 'string', demandOption: true })
  .option('rp-ticket', { type: 'string', demandOption: true })
  .option('output', { type: 'string', demandOption: true })
  .argv;

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY
});

const CHANGELOG_GENERATION_PROMPT = `You are an expert technical writer for API documentation at 8x8. Your task is to generate a changelog entry for an API update.

**Context:**
- API Name: ${argv.api}
- New Version: ${argv.version}
- RP Ticket: ${argv.rpTicket}

**OpenAPI Specification Changes:**
\`\`\`
${fs.readFileSync(argv.diff, 'utf-8')}
\`\`\`

**Guidelines:**
1. **Structure:** Use clear headings: "Added", "Changed", "Deprecated", "Removed", "Fixed", "Security"
2. **Developer Focus:** Write for developers who consume the API. Be clear about impact.
3. **Breaking Changes:** Clearly mark breaking changes with ⚠️ emoji
4. **Migration Guide:** If breaking changes exist, provide migration steps
5. **Technical Accuracy:** Be precise about endpoints, parameters, and behavior changes
6. **Tone:** Professional, clear, and helpful
7. **Format:** Use Markdown with proper formatting
8. **Code Examples:** Include before/after examples for significant changes if helpful

**Output Format:**
Generate ONLY the changelog entry content (do not include the date or version header - these will be added automatically).

Begin your response with the changelog content:`;

async function generateChangelog() {
  try {
    const message = await anthropic.messages.create({
      model: 'claude-sonnet-4-5-20251101',
      max_tokens: 4096,
      messages: [{
        role: 'user',
        content: CHANGELOG_GENERATION_PROMPT
      }]
    });

    const changelogContent = message.content[0].text;

    // Format with metadata header
    const formattedChangelog = `## [${argv.version}] - ${new Date().toISOString().split('T')[0]}

> **RP Ticket:** [${argv.rpTicket}](https://8x8.atlassian.net/browse/${argv.rpTicket})

${changelogContent}

---
`;

    fs.writeFileSync(argv.output, formattedChangelog);
    console.log(`✅ Changelog generated: ${argv.output}`);
  } catch (error) {
    console.error('❌ Failed to generate changelog:', error);
    process.exit(1);
  }
}

generateChangelog();
```

#### 3. Changelog File Structure

**Proposed Structure:**
```
docs/
└── administration/
    ├── docs/
    │   ├── user-management-api-guide.mdx
    │   └── ...
    ├── changelogs/
    │   ├── user-api-changelog.md
    │   ├── site-api-changelog.md
    │   ├── phonenumber-api-changelog.md
    │   ├── ringgroup-api-changelog.md
    │   └── address-api-changelog.md
    └── api-change-policy.md
```

**Changelog File Template (`user-api-changelog.md`):**
```markdown
---
sidebar_position: 99
title: User Management API - Changelog
---

# User Management API Changelog

This page documents all notable changes to the User Management API.

The format follows [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this API adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-01-15

> **RP Ticket:** [RP-12345](https://8x8.atlassian.net/browse/RP-12345)

### Added
- New `GET /users/{userId}/permissions` endpoint for retrieving user permissions
- Added `permissions` field to User resource schema
- Support for filtering users by `department` in search endpoint

### Changed
- ⚠️ **BREAKING:** Search pagination changed from offset-based to scrollId-based
  - **Migration Guide:**
    - Old: `GET /users?page=1&size=100`
    - New: `GET /users?pageSize=100&scrollId={scrollId}`
- Response time improved by 40% for search operations

### Deprecated
- `page` and `size` query parameters in `GET /users` (use `scrollId` pagination)
- Will be removed in v2.0.0 (planned for Q3 2025)

### Fixed
- Resolved issue where users with special characters in email addresses couldn't be searched

---

## [1.0.0] - 2024-11-01

> **RP Ticket:** [RP-11000](https://8x8.atlassian.net/browse/RP-11000)

Initial release of User Management API.

### Added
- Complete CRUD operations for user management
- Search with RSQL filtering
- Sorting capabilities
- Error handling with detailed error responses
```

#### 4. Sidebar Integration

**Update `docusaurus/sidebars/administration.js`:**
```javascript
{
  type: 'category',
  label: 'Changelogs',
  collapsible: true,
  collapsed: false,
  items: [
    'administration/changelogs/user-api-changelog',
    'administration/changelogs/site-api-changelog',
    'administration/changelogs/phonenumber-api-changelog',
    'administration/changelogs/ringgroup-api-changelog',
    'administration/changelogs/address-api-changelog',
  ],
}
```

### Integration with RP Jira Workflow

**Jira Automation Rules:**

1. **When RP ticket moves to "Ready for Deployment":**
   - Check for linked changelog PR
   - If PR exists and approved: Add comment with PR link
   - If PR missing: Warn in ticket

2. **When RP ticket moves to "Deployed":**
   - Check if changelog PR is merged
   - Update ticket with published changelog URL

3. **Notification Strategy:**
   - Jenkins sends RP ticket ID with webhook
   - GitHub PR links to RP ticket
   - Jira webhook watches for PR merge

### Pros
✅ **Clean separation of concerns** - service generates trigger, docs repo handles content
✅ **Leverages existing GitHub PR workflow** - familiar for PM review
✅ **LLM generation in docs repo** - close to content, easier to iterate
✅ **Git history audit trail** - all changes tracked
✅ **No new infrastructure** - uses existing GitHub Actions
✅ **Easy rollback** - standard git revert
✅ **Coordinated releases** - PR can wait for RP ticket approval

### Cons
❌ **Cross-repo coordination complexity** - webhook reliability critical
❌ **GitHub token management** - service needs auth to trigger workflows
❌ **Potential failure points** - webhook, API call, GitHub Actions
❌ **Manual RP ticket linking** - requires discipline to maintain

### Risk Mitigation
- **Webhook failures:** Implement retry logic + manual trigger fallback
- **Token expiry:** Use GitHub App with automatic token refresh
- **Lost context:** Store full request payload in workflow artifacts
- **RP coordination:** Automated Jira integration via webhooks

### Estimated Effort
- **Jenkins integration:** 2-3 days
- **GitHub Actions workflow:** 3-4 days
- **LLM generation script:** 2-3 days
- **Sidebar + file structure:** 1 day
- **Jira integration:** 2-3 days
- **Testing & documentation:** 2-3 days
- **Total:** ~12-17 days

---

## Approach 2: Cross-Repo Sync with Staging Area

### Overview
Generate changelog in the service repository, sync to docs repository via automated workflow, stage until coordinated release via RP ticket.

### Architecture

```
┌─────────────────────────────────────────┐
│  platform_provisioning_facade           │
│                                         │
│  ┌──────────────────────────────────┐  │
│  │ Jenkins Pipeline                 │  │
│  │                                  │  │
│  │ 1. Detect Changes                │  │
│  │ 2. Generate Diff                 │  │
│  │ 3. Run LLM Generation (in-place) │  │
│  │ 4. Create changelog.md           │  │
│  │ 5. Commit to changelog/ branch   │  │
│  │ 6. Trigger Sync ──────────────────┼─┐│
│  └──────────────────────────────────┘ ││
└─────────────────────────────────────────┘│
                                          │
                ┌─────────────────────────┘
                │
                ▼
┌─────────────────────────────────────────────────┐
│  developer-docs                                 │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │ GitHub Actions: Sync Workflow            │  │
│  │                                          │  │
│  │ 1. Triggered by service repo webhook     │  │
│  │ 2. Fetch changelog from service repo     │  │
│  │ 3. Create staging branch                 │  │
│  │ 4. Create PR with PM review              │  │
│  │ 5. Link to RP ticket                     │  │
│  │ 6. Wait for PM approval                  │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │ Staging Area                             │  │
│  │                                          │  │
│  │ - Branch: staging/changelog-{RP-TICKET}  │  │
│  │ - Holds changelog until release          │  │
│  │ - Can accumulate multiple API changes    │  │
│  └──────────────────────────────────────────┘  │
│                                                 │
│  ┌──────────────────────────────────────────┐  │
│  │ Release Coordination                     │  │
│  │                                          │  │
│  │ - RP ticket transitions to "Deploy"      │  │
│  │ - Automated merge of staging branch      │  │
│  │ - Deploy to production                   │  │
│  └──────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

### Key Differences from Approach 1

1. **LLM Generation Location:** Runs in Jenkins (service repo) not GitHub Actions
2. **Staging Model:** Changes accumulate in staging branch until coordinated release
3. **Sync Mechanism:** Automated sync workflow pulls from service repo
4. **Release Trigger:** Jira automation triggers final merge when RP ticket approved

### Technical Implementation Highlights

**Jenkins LLM Generation:**
```groovy
stage('Generate Changelog') {
    steps {
        script {
            // Run LLM generation in Jenkins
            docker.image('anthropic/claude-sdk').inside {
                sh """
                    node /scripts/generate-changelog.js \
                        --api ${API_NAME} \
                        --version ${VERSION} \
                        --diff /tmp/api-diff.md \
                        --output changelog/entry.md
                """
            }

            // Commit to service repo
            sh """
                git add changelog/
                git commit -m "Generate changelog for ${VERSION}"
                git push origin changelog/${VERSION}
            """

            // Trigger docs sync
            triggerDocsSync()
        }
    }
}
```

**Sync Workflow (developer-docs):**
```yaml
- name: Fetch Changelog from Service Repo
  run: |
    # Clone service repo (or use API)
    gh repo clone 8x8/platform_provisioning_facade /tmp/service

    # Copy changelog
    cp /tmp/service/changelog/${VERSION}.md \
       docs/administration/changelogs/${API}-changelog-${VERSION}.md

    # Create staging branch
    git checkout -b staging/changelog-${RP_TICKET}
```

### Pros
✅ **Self-contained service generation** - service owns LLM execution
✅ **Explicit staging area** - clear separation of prepared vs. published
✅ **Batch releases possible** - accumulate multiple API changes
✅ **Service repo maintains changelog source** - single source of truth

### Cons
❌ **Duplicate changelog storage** - exists in both repos
❌ **Synchronization complexity** - more moving parts
❌ **Jenkins LLM setup** - requires Anthropic SDK in Jenkins
❌ **Two-phase approval** - service commit + docs PR
❌ **Potential drift** - syncing issues between repos

### Estimated Effort
- **Jenkins LLM integration:** 3-4 days
- **Sync workflow:** 3-4 days
- **Staging branch management:** 2-3 days
- **Jira automation:** 2-3 days
- **Testing:** 2-3 days
- **Total:** ~12-17 days

---

## Approach 3: Centralized Changelog Service with GitHub App

### Overview
Build a dedicated microservice or GitHub App that acts as a centralized changelog hub, coordinating between service deployments, docs updates, and Jira workflow.

### Architecture

```
┌──────────────────────────────────────┐
│  Changelog Service (GitHub App)      │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ API Endpoints                  │ │
│  │ - POST /changelog/generate     │ │
│  │ - GET /changelog/{api}/{ver}   │ │
│  │ - POST /changelog/approve      │ │
│  │ - POST /changelog/publish      │ │
│  └────────────────────────────────┘ │
│                                      │
│  ┌────────────────────────────────┐ │
│  │ Core Features                  │ │
│  │ - OpenAPI diff engine          │ │
│  │ - LLM generation (Claude SDK)  │ │
│  │ - GitHub API integration       │ │
│  │ - Jira API integration         │ │
│  │ - Changelog database           │ │
│  └────────────────────────────────┘ │
└──────────────────────────────────────┘
         ▲              ▲             ▲
         │              │             │
    ┌────┴────┐    ┌────┴────┐   ┌───┴────┐
    │ Jenkins │    │ GitHub  │   │  Jira  │
    │ Webhook │    │ Webhooks│   │ Events │
    └─────────┘    └─────────┘   └────────┘

Workflow:
1. Jenkins triggers service → POST /changelog/generate
2. Service generates changelog → stores in DB
3. Service creates GitHub PR → with generated content
4. PM reviews/edits PR → approves
5. Jira RP ticket transitions → triggers publish
6. Service merges PR → updates Jira
```

### Key Features

**Centralized State Management:**
- Database tracks changelog lifecycle: draft → pending_review → approved → published
- Maintains relationship between: API version ↔ RP ticket ↔ GitHub PR ↔ Deployment
- Historical audit log of all changes and approvals

**Intelligent Orchestration:**
- Detects when all coordinated changes are ready (API + docs + tests)
- Prevents premature publication
- Rollback support via versioned changelog state

**GitHub App Capabilities:**
- Installed in both service and docs repos
- Automatic token management (no manual secrets)
- Fine-grained permissions
- Bot comments with status updates

### Technical Implementation

**Service API:**
```typescript
interface ChangelogService {
  // Called by Jenkins after detecting API changes
  generateChangelog(request: {
    api: string;
    version: string;
    specUrl: string;
    rpTicket: string;
    triggerType: 'auto' | 'manual';
  }): Promise<ChangelogDraft>;

  // PM edits changelog via UI or PR
  updateChangelog(id: string, content: string): Promise<void>;

  // PM approves changelog
  approveChangelog(id: string, pmUserId: string): Promise<void>;

  // Jira automation calls when RP ticket ready
  publishChangelog(rpTicket: string): Promise<PublishedChangelog>;

  // Query changelog status
  getChangelogStatus(rpTicket: string): Promise<ChangelogStatus>;
}

interface ChangelogStatus {
  api: string;
  version: string;
  state: 'draft' | 'pending_review' | 'approved' | 'published';
  rpTicket: string;
  githubPR?: string;
  approvedBy?: string;
  approvedAt?: Date;
  publishedAt?: Date;
}
```

**Database Schema:**
```sql
CREATE TABLE changelogs (
  id UUID PRIMARY KEY,
  api_name VARCHAR(100) NOT NULL,
  api_version VARCHAR(20) NOT NULL,
  rp_ticket VARCHAR(50) NOT NULL,
  state VARCHAR(20) NOT NULL,
  content_draft TEXT,
  content_published TEXT,
  spec_diff JSON,
  github_pr_url VARCHAR(255),
  github_pr_number INTEGER,
  approved_by VARCHAR(100),
  approved_at TIMESTAMP,
  published_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(api_name, api_version)
);

CREATE TABLE changelog_events (
  id UUID PRIMARY KEY,
  changelog_id UUID REFERENCES changelogs(id),
  event_type VARCHAR(50) NOT NULL,
  actor VARCHAR(100),
  metadata JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**GitHub App Workflow:**
```javascript
// When Jenkins calls /changelog/generate
async function handleChangelogGeneration(request) {
  // 1. Generate changelog using LLM
  const content = await generateWithLLM(request);

  // 2. Save draft to database
  const changelog = await db.changelogs.create({
    apiName: request.api,
    apiVersion: request.version,
    rpTicket: request.rpTicket,
    state: 'draft',
    contentDraft: content,
    specDiff: await generateDiff(request.specUrl)
  });

  // 3. Create PR in docs repo using GitHub App
  const pr = await githubApp.createPR({
    repo: '8x8/developer-docs',
    branch: `changelog/${request.api}-v${request.version}`,
    title: `Changelog: ${request.api} v${request.version}`,
    body: generatePRBody(changelog),
    files: {
      [`docs/administration/changelogs/${request.api}-changelog.md`]: {
        content: await insertChangelogEntry(request.api, content)
      }
    }
  });

  // 4. Update database with PR info
  await db.changelogs.update(changelog.id, {
    githubPrUrl: pr.html_url,
    githubPrNumber: pr.number,
    state: 'pending_review'
  });

  // 5. Request PM review
  await githubApp.requestReview(pr.number, 'pm-team');

  // 6. Update Jira ticket
  await jiraAPI.addComment(request.rpTicket, {
    body: `Changelog PR created: ${pr.html_url}`
  });

  return changelog;
}

// When PM approves PR
async function handlePRApproval(event) {
  const prNumber = event.pull_request.number;
  const approver = event.review.user.login;

  // Update changelog state
  const changelog = await db.changelogs.findByPR(prNumber);
  await db.changelogs.update(changelog.id, {
    state: 'approved',
    approvedBy: approver,
    approvedAt: new Date()
  });

  // Don't merge yet - wait for RP ticket coordination
  await githubApp.addComment(prNumber, {
    body: `✅ Approved by ${approver}. Waiting for ${changelog.rpTicket} deployment coordination.`
  });

  // Update Jira
  await jiraAPI.transition(changelog.rpTicket, {
    status: 'Changelog Approved'
  });
}

// When Jira RP ticket moves to "Deploy"
async function handleRPDeployment(rpTicket) {
  // Find all approved changelogs for this RP ticket
  const changelogs = await db.changelogs.findByRPTicket(rpTicket, {
    state: 'approved'
  });

  // Merge all associated PRs
  for (const changelog of changelogs) {
    await githubApp.mergePR(changelog.githubPrNumber, {
      method: 'squash',
      message: `Publish changelog for ${changelog.apiName} v${changelog.apiVersion}`
    });

    // Update state to published
    await db.changelogs.update(changelog.id, {
      state: 'published',
      publishedAt: new Date(),
      contentPublished: changelog.contentDraft
    });
  }

  // Update Jira
  await jiraAPI.addComment(rpTicket, {
    body: `✅ Changelogs published:\n${changelogs.map(c =>
      `- ${c.apiName} v${c.apiVersion}: ${c.githubPrUrl}`
    ).join('\n')}`
  });
}
```

**Deployment Options:**

1. **Serverless (AWS Lambda + API Gateway):**
   - Low maintenance
   - Auto-scaling
   - Cost-effective for low volume

2. **Containerized (ECS/Kubernetes):**
   - Full control
   - Better for complex workflows
   - Easier local development

3. **GitHub Actions as Service:**
   - No separate infrastructure
   - Workflow-based state machine
   - Limited by GitHub Actions constraints

### Pros
✅ **Centralized control** - single source of truth for all changelogs
✅ **Rich orchestration** - coordinates across repos, Jira, deployments
✅ **Advanced features** - rollback, audit logs, batch operations
✅ **Scalable** - can support multiple services and APIs
✅ **UI potential** - can add web UI for changelog management
✅ **Consistent process** - enforced workflow across all APIs

### Cons
❌ **New infrastructure** - requires deployment, monitoring, maintenance
❌ **Development overhead** - ~4-6 weeks to build and test
❌ **Operational burden** - another service to maintain
❌ **Database required** - adds complexity and failure points
❌ **Over-engineering?** - may be too complex for initial needs
❌ **Single point of failure** - service outage blocks changelog updates

### Estimated Effort
- **Service core implementation:** 5-7 days
- **GitHub App development:** 3-4 days
- **LLM integration:** 2-3 days
- **Database + migrations:** 2-3 days
- **Jira integration:** 3-4 days
- **Testing + CI/CD:** 3-4 days
- **Documentation:** 2 days
- **Total:** ~20-27 days (4-6 weeks)

---

## Comparison Matrix

| Criteria | Approach 1: Cross-Repo Pipeline | Approach 2: Sync with Staging | Approach 3: Centralized Service |
|----------|--------------------------------|-------------------------------|--------------------------------|
| **Implementation Complexity** | ⭐⭐ Medium | ⭐⭐⭐ Medium-High | ⭐⭐⭐⭐ High |
| **Time to MVP** | ~2-3 weeks | ~2-3 weeks | ~4-6 weeks |
| **Operational Overhead** | ⭐ Low | ⭐⭐ Medium | ⭐⭐⭐⭐ High |
| **Scalability** | ⭐⭐⭐ Good | ⭐⭐ Fair | ⭐⭐⭐⭐⭐ Excellent |
| **Maintainability** | ⭐⭐⭐⭐ Good | ⭐⭐⭐ Fair | ⭐⭐⭐ Fair |
| **PM Review Experience** | ⭐⭐⭐⭐ Excellent (GitHub PR) | ⭐⭐⭐⭐ Excellent (GitHub PR) | ⭐⭐⭐⭐ Excellent (GitHub PR) |
| **RP Coordination** | ⭐⭐⭐ Good (Jira links) | ⭐⭐⭐⭐ Very Good (staging + automation) | ⭐⭐⭐⭐⭐ Excellent (API integration) |
| **Failure Recovery** | ⭐⭐⭐ Good (manual trigger) | ⭐⭐ Fair (multiple points) | ⭐⭐⭐⭐ Very Good (centralized retry) |
| **Audit Trail** | ⭐⭐⭐⭐ Excellent (git history) | ⭐⭐⭐⭐ Excellent (git history) | ⭐⭐⭐⭐⭐ Excellent (DB + git) |
| **Rollback Capability** | ⭐⭐⭐⭐ Good (git revert) | ⭐⭐⭐⭐ Good (git revert) | ⭐⭐⭐⭐⭐ Excellent (versioned state) |
| **Multi-API Support** | ⭐⭐⭐⭐ Good | ⭐⭐⭐⭐ Good | ⭐⭐⭐⭐⭐ Excellent |
| **Future Extensibility** | ⭐⭐⭐ Fair | ⭐⭐ Fair | ⭐⭐⭐⭐⭐ Excellent |
| **Testing Ease** | ⭐⭐⭐⭐ Good | ⭐⭐⭐ Fair | ⭐⭐⭐ Fair |
| **Infrastructure Cost** | ⭐⭐⭐⭐⭐ Minimal (GitHub Actions) | ⭐⭐⭐⭐⭐ Minimal (GitHub Actions) | ⭐⭐ Medium (servers + DB) |

### Key Differentiators

**Choose Approach 1 if:**
- ✅ Need to ship quickly (2-3 weeks)
- ✅ Want minimal operational overhead
- ✅ Prefer simple, maintainable solution
- ✅ GitHub Actions is acceptable infrastructure
- ✅ Current 5 APIs are the primary focus

**Choose Approach 2 if:**
- ✅ Need explicit staging/review separation
- ✅ Want service repo to own changelog source
- ✅ Batch releases are common
- ✅ Jenkins-based LLM execution is preferred
- ✅ OK with some sync complexity

**Choose Approach 3 if:**
- ✅ Planning to scale to many APIs (10+ services)
- ✅ Need advanced orchestration features
- ✅ Have resources for 4-6 week development
- ✅ Want centralized control and monitoring
- ✅ Future features matter (UI, analytics, etc.)
- ✅ Can maintain additional infrastructure

---

## Recommendation

### Primary Recommendation: **Approach 1 - Service-Initiated Cross-Repo Pipeline**

**Rationale:**

1. **Best Balance:** Optimal tradeoff between functionality and complexity
2. **Time to Value:** 2-3 weeks to MVP vs. 4-6 weeks for Approach 3
3. **Familiar Workflow:** Leverages existing GitHub PR process for PM review
4. **Low Risk:** Minimal new infrastructure, uses proven GitHub Actions
5. **Scalable Enough:** Can handle 5 Administration APIs + future expansion
6. **Easy Iteration:** Simple to add features incrementally
7. **Developer-Friendly:** Clear, debuggable workflow

**Migration Path:**
If needs grow significantly (20+ APIs, complex multi-team coordination), can migrate to Approach 3:
- Changelog files remain compatible
- PR workflow stays same for PMs
- Service triggers can be upgraded to call centralized API
- Incremental migration possible

### Alternative: **Approach 3 for Long-Term Vision**

If 8x8 plans to:
- Scale to 20+ APIs across multiple services
- Build a developer portal with advanced changelog features
- Integrate changelogs into customer notifications
- Provide changelog API for programmatic access

Then Approach 3's upfront investment pays off.

**Hybrid Strategy:**
- Phase 1: Implement Approach 1 for Administration APIs (Q1 2025)
- Phase 2: Evaluate adoption and pain points (Q2 2025)
- Phase 3: Migrate to Approach 3 if justified by scale (Q3 2025)

---

## Implementation Roadmap (Approach 1)

### Phase 1: Foundation (Week 1-2)
- [ ] Create changelog file structure in docs repo
- [ ] Update sidebar configuration
- [ ] Build OpenAPI diff detection script
- [ ] Implement LLM generation script (Node.js)
- [ ] Create GitHub Actions workflow
- [ ] Write helper scripts (insert-changelog-entry.js)

### Phase 2: Service Integration (Week 2-3)
- [ ] Add Jenkins stage for changelog trigger
- [ ] Implement webhook/repository dispatch
- [ ] Test end-to-end flow (service → docs)
- [ ] Error handling and retry logic
- [ ] Manual trigger fallback

### Phase 3: Coordination & Polish (Week 3-4)
- [ ] Jira integration (webhooks + automation)
- [ ] PM review documentation and training
- [ ] Runbook for troubleshooting
- [ ] Monitoring and alerting setup
- [ ] Security review (token access, secrets)

### Phase 4: Pilot (Week 4-5)
- [ ] Run pilot with User API v1.1.0 release
- [ ] Gather PM feedback
- [ ] Iterate on LLM prompts
- [ ] Refine workflow based on learnings
- [ ] Document lessons learned

### Phase 5: Rollout (Week 5-6)
- [ ] Roll out to remaining 4 Administration APIs
- [ ] Create migration guide for other API teams
- [ ] Finalize documentation
- [ ] Knowledge transfer to ops team
- [ ] Retrospective and improvements backlog

---

## Open Questions & Decisions Needed

### Technical Decisions
1. **OpenAPI diff tool:** openapi-diff vs. oasdiff vs. custom?
2. **LLM model:** Claude Sonnet 4.5 vs. Haiku for cost optimization?
3. **Token storage:** GitHub secret vs. HashiCorp Vault?
4. **Changelog format:** Markdown only or support JSON/YAML for API access?

### Process Decisions
5. **PM approval SLA:** How quickly must PMs review? 24h? 48h?
6. **Emergency hotfixes:** Can changelog generation be skipped for critical fixes?
7. **Multiple APIs in one release:** Single RP ticket or one per API?
8. **Changelog visibility:** Public immediately or only after approval?

### Coordination Decisions
9. **RP ticket lifecycle:** At what status does changelog merge happen?
10. **Documentation updates:** Who ensures guide updates match changelog?
11. **Breaking changes:** Special approval process for breaking changes?
12. **Version skipping:** What if a version is pulled from release?

---

## Success Metrics

### Quantitative KPIs
- **Automation Rate:** % of changelog entries auto-generated (target: >90%)
- **Review Time:** Median time from generation to PM approval (target: <24h)
- **Coordination Accuracy:** % of changelogs published same day as API release (target: >95%)
- **Error Rate:** Failed changelog generations per month (target: <5%)
- **Developer Satisfaction:** Survey score on changelog usefulness (target: >4/5)

### Qualitative Goals
- PMs spend <30 minutes per changelog review
- Developers find changelogs before contacting support
- Zero customer complaints about undocumented breaking changes
- PM team reports improved efficiency

---

## Appendices

### Appendix A: Example LLM Prompts

**System Prompt for Changelog Generation:**
```
You are an expert technical writer specializing in API documentation for enterprise communication platforms. Your task is to transform OpenAPI specification changes into clear, developer-friendly changelog entries.

**Audience:** Backend and frontend developers integrating with 8x8 APIs
**Tone:** Professional, precise, helpful
**Format:** Markdown following Keep a Changelog conventions

**Critical Rules:**
1. Be accurate - never invent features or changes
2. Highlight breaking changes with ⚠️ emoji
3. Provide migration examples for breaking changes
4. Use present tense ("adds", "changes", "removes")
5. Link to relevant documentation
6. Keep entries concise but complete
```

**Few-Shot Examples:**
```markdown
## Good Example - Clear Breaking Change

### Changed
- ⚠️ **BREAKING:** Authentication now requires Bearer token instead of API key

  **Migration Guide:**
  ```
  # Before
  curl -H "X-API-Key: abc123" https://api.8x8.com/users

  # After
  curl -H "Authorization: Bearer your-token" https://api.8x8.com/users
  ```

  See [Authentication Guide](/docs/auth) for obtaining tokens.

## Bad Example - Vague and Unhelpful

### Changed
- Updated authentication
- Fixed some bugs
```

### Appendix B: Integration Patterns for Other Services

**For services beyond platform_provisioning_facade:**

1. **Java Spring Boot Services:**
   ```groovy
   // Add to Jenkinsfile
   @Library('changelog-pipeline') _

   pipeline {
       stages {
           stage('Deploy') {
               post {
                   success {
                       changelogNotification(
                           api: 'my-api',
                           version: env.VERSION
                       )
                   }
               }
           }
       }
   }
   ```

2. **Node.js Services:**
   ```yaml
   # Add to .github/workflows/deploy.yml
   - name: Trigger Changelog
     if: contains(github.event.commits.*.modified, 'openapi.yaml')
     uses: 8x8/changelog-action@v1
     with:
       api-name: my-api
       version: ${{ steps.version.outputs.version }}
   ```

3. **Python Services:**
   ```python
   # In deployment script
   from changelog_client import ChangelogClient

   client = ChangelogClient(token=os.getenv('GITHUB_TOKEN'))
   client.trigger_generation(
       api='my-api',
       version=version,
       rp_ticket=rp_ticket
   )
   ```

### Appendix C: Jira Automation Examples

**Automation Rule 1: Notify on Changelog PR**
```yaml
Trigger: Issue transitioned to "Ready for Deployment"
Conditions:
  - Project = "RP"
  - Issue Type = "Release Process"
Actions:
  - Check for linked GitHub PRs with label "changelog"
  - If found: Add comment "✅ Changelog PR ready: {PR URL}"
  - If not found: Add comment "⚠️ No changelog PR found. Please verify."
```

**Automation Rule 2: Auto-merge on Deployment**
```yaml
Trigger: Issue transitioned to "Deployed"
Conditions:
  - Project = "RP"
  - Issue has linked GitHub PR with label "changelog,approved"
Actions:
  - Call webhook to changelog service
  - POST https://changelog-service.8x8.com/publish
  - Body: { "rpTicket": "{{issue.key}}" }
  - Add comment with published URLs
```

### Appendix D: Rollback Procedures

**Scenario 1: Bad changelog content published**
```bash
# Revert the PR that merged the changelog
git revert <commit-hash> -m 1

# Create new PR with revert
git push origin hotfix/revert-bad-changelog

# Fast-track PM approval
gh pr create --title "Revert incorrect changelog" --emergency
```

**Scenario 2: Changelog published before API deployed**
```bash
# Option A: Hide the changelog entry temporarily
# Edit file to comment out the entry
# Deploy fix immediately

# Option B: Add correction notice
## [1.1.0] - DEPLOYMENT DELAYED
> ⚠️ This release has been delayed. Changes will be available on [DATE].
```

**Scenario 3: LLM generated incorrect information**
```bash
# Fix the entry in the PR before merge
# PM should catch this during review

# If already merged:
# - Create hotfix PR with correction
# - Fast-track through approval
# - Add internal incident report to improve prompts
```

---

## References & Research

### Industry Best Practices
- [Keep a Changelog](https://keepachangelog.com/en/1.0.0/) - Changelog format standard
- [Semantic Versioning](https://semver.org/) - Version numbering conventions
- [The Ultimate Guide to API Documentation Best Practices (2025 Edition)](https://www.theneo.io/blog/api-documentation-best-practices-guide-2025)
- [8 API Documentation Best Practices for 2025](https://deepdocs.dev/api-documentation-best-practices/)

### Tools & Technologies
- **OpenAPI Diff:** [openapi-diff](https://github.com/OpenAPITools/openapi-diff), [oasdiff](https://github.com/Tufin/oasdiff)
- **LLM Integration:** [Anthropic Claude SDK](https://docs.anthropic.com/en/api/client-sdks)
- **GitHub Apps:** [GitHub Apps Documentation](https://docs.github.com/en/apps)
- **Jira Automation:** [Jira Automation Rules](https://support.atlassian.com/cloud-automation/)

### Competitive Analysis
- **Stripe:** [API Changelog](https://stripe.com/docs/upgrades) - Versioned with migration guides
- **Twilio:** [API Changelog](https://www.twilio.com/docs/api/changelog) - Date-based with impact levels
- **GitHub:** [API Changelog](https://github.blog/changelog/) - Blog-style with rich formatting
- **OpenAI:** [API Changelog](https://platform.openai.com/docs/changelog) - Structured with breaking change alerts

---

## Document Change History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2025-12-23 | Claude (8x8-changelog-bot) | Initial strategy document |

---

**Next Steps:**
1. Review this strategy document with stakeholders
2. Select preferred approach based on priorities
3. Schedule kickoff meeting for implementation
4. Assign development team and resources
5. Begin Phase 1 implementation

**Questions or Feedback:**
Please direct questions to the Developer Experience team or comment on the related Jira epic.
