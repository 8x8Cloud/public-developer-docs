# Writing Guidelines

Guidelines for writing and formatting documentation in this repository. Follow these when creating or editing any Markdown content under `docs/`.

---

## Terminology

### Platform region

The canonical term for 8x8 CPaaS geographic deployment locations is **"platform deployment region"**. A shorter form, **"platform region"**, is acceptable after the first mention.

| Context | Term to use |
| --- | --- |
| Page title, `##` section headings | "Platform Deployment Region(s)" |
| First mention in a page or section | "platform deployment region" |
| Subsequent mentions in the same page or section | "platform region" |

Do not use "data center region" — this was the old term and is no longer used.

The canonical reference page is [Platform Deployment Regions](/connect/docs/platform-deployment-regions).

---

## Writing Style

### Voice and tone

- Write for a **technical audience** (developers, integrators, platform engineers)
- Be direct and concise — lead with the answer, not the background
- Use active voice and present tense
- Avoid filler phrases: "please note that", "it is important to", "as mentioned above"

### Page introductions

Every page should open with two short paragraphs:

1. **What it is** — describe the feature/protocol/API from a technical angle, not just a definition
2. **Who it's for** — describe the use case and audience; include a pointer to simpler alternatives where relevant

### Competitor references

When using competitor documentation as inspiration, rewrite completely. Do not mirror their sentence structure, framing, or vocabulary. Lead with the 8x8 technical angle rather than a generic protocol definition.

---

## Formatting

### Admonitions

Use the blockquote-with-emoji format (not Docusaurus `:::` syntax):

| Type | Format | Use for |
| --- | --- | --- |
| Info / Note | `> 📘` | Tips, version requirements, clarifications |
| Warning / Caution | `> 🚧` | Limits, deprecated behaviour, production warnings |

**Example:**

```markdown
> 📘
>
> Connect to 8x8 SMPP servers using **SMPP version 3.4**.
```

### Tables vs bullet lists

Prefer **tables** over bullet lists when presenting structured data (settings, parameters, states, error codes). Tables are easier to scan and better for reference material.

Use bullet lists only for unordered conceptual points or steps where order doesn't matter.

### Data presentation

- Show **both** values when there are regional or conditional variants (e.g., two hostnames in the same table labelled by region)
- Add brief descriptions as a second column rather than leaving bare values
- Mark deprecated values inline in the table (e.g., `2775 *(deprecated — unencrypted)*`) and reinforce with a `🚧` callout below

### Section dividers

Use `---` between major `##` sections to improve scannability. Always surround `---` with blank lines.

---

## Internal Links

Always use **absolute paths** for internal links (starting with `/`). Bare relative paths resolve incorrectly in production — Docusaurus treats them as relative to the rendered URL, not the filesystem.

| Pattern | Example | Result |
| --- | --- | --- |
| Absolute (correct) | `/connect/docs/platform-deployment-regions` | Always resolves correctly |
| Bare relative (wrong) | `platform-deployment-regions` | Breaks in production — appends to current page URL |

---

## Markdown Linting Rules

The build runs `markdownlint-cli2` and will fail on these common violations:

| Rule | Requirement | Common mistake |
| --- | --- | --- |
| MD009 | No trailing spaces | Space after last word on a line |
| MD022 | Blank line required above **and** below every heading | Content immediately after a `###` heading |
| MD058 | Blank line required above **and** below every table | Table immediately followed by `---` or text |

Always run `yarn validate && yarn build` before committing to catch these. `yarn build` alone does not run the markdown or link validators.

---

## Sidebar Entries

When removing a page (e.g., after merging), always remove its entry from the corresponding sidebar file in `docusaurus/sidebars/`. Leaving orphaned entries causes build errors.

---

## Page Structure Patterns

### Reference / connection pages

Recommended section order:

1. Intro (what it is + who it's for)
2. Connection Details (table)
3. Server Regions (table)
4. Credentials
5. Core concepts (e.g., Binding)
6. Throughput & Performance
7. Supported PDUs (table)
8. Related topics (e.g., Data Encoding, Delivery Receipts)

### Merging small pages

Standalone pages with fewer than ~15 lines of content (e.g., data encoding, delivery receipts) should be merged into their parent topic page as `##` sections rather than maintained as separate files. Remove the source file and its sidebar entry when merging.
