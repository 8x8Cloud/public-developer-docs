#!/usr/bin/env node

'use strict';

/**
 * generate-events-overview.js
 *
 * Reads from scripts/.partner-events-manifest.json (deposited by platform-ui-events'
 * expose-public script) and:
 *   1. Regenerates partner-sdk-events.md and partner-sdk-maestro-sdk-events.md
 *   2. Regenerates the tech-partner.js sidebar
 *
 * Usage: node scripts/generate-events-overview.js
 *
 * Run 'yarn expose-public' from the platform-ui-events repo first to populate
 * the manifest and event detail files.
 */

const fs = require('fs');
const path = require('path');

// ---------------------------------------------------------------------------
// Paths
// ---------------------------------------------------------------------------

const repoRoot = path.resolve(__dirname, '..');
const manifestPath = path.join(__dirname, '.partner-events-manifest.json');
const partnerEventsDoc = path.join(repoRoot, 'docs', 'tech-partner', 'docs', 'partner-sdk-events.md');
const maestroEventsDoc = path.join(repoRoot, 'docs', 'tech-partner', 'docs', 'partner-sdk-maestro-sdk-events.md');
const sidebarPath = path.join(repoRoot, 'docusaurus', 'sidebars', 'tech-partner.js');

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------

// Namespace metadata, keyed by the namespace value from the manifest. Insertion
// order here is the order sections appear in the docs and sidebar. Add a new
// namespace by adding one entry.
const NAMESPACES = {
  shell: {
    label: 'Global',
    description: 'The Platform UI Shell is the host application that frames every 8x8 product and embeds partner integrations. It provides cross-product context such as the current user\'s identity and session state.',
  },
  agentWorkspace: {
    label: 'Agent Workspace',
    description: 'The 8x8 Agent Workspace is the agent-facing application of 8x8 Contact Center, where agents handle customer interactions across voice, chat, and other channels. It acts as a parent application that can embed partner integrations alongside the agent\'s active interactions.',
  },
  callManager: {
    label: 'Call Manager',
    description: 'The 8x8 Call Manager is the embedded call-control application that manages the agent\'s voice calls within the 8x8 experience — placing, receiving, and controlling active calls and conferences.',
  },
};

const NAMESPACE_ORDER = Object.keys(NAMESPACES);

// Shown when a namespace has events but no description in NAMESPACES yet (e.g. a
// new namespace added upstream). Change this string to adjust the wording.
const NAMESPACE_DESCRIPTION_PLACEHOLDER = '_Description coming soon._';

const namespaceLabel = (ns) => NAMESPACES[ns]?.label || ns;
const namespaceDescription = (ns) => NAMESPACES[ns]?.description || NAMESPACE_DESCRIPTION_PLACEHOLDER;

const TABLE_HEADER =
  '| event name | schema versions | status | active date | deprecation date | sunset date |\n' +
  '|---|---|---|---|---|---|';

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

// Events whose name ends in `-received-vN` are events the partner SENDS via
// `system.sendEvent` (the suffix refers to 8x8 receiving them). They appear
// under the "Send" table; everything else is a "Received" event.
function isSendEvent(event) {
  return /-received-v\d+$/.test(event.name);
}

function groupByNamespace(events) {
  const map = new Map();
  for (const e of events) {
    const ns = e.namespace || 'other';
    if (!map.has(ns)) map.set(ns, []);
    map.get(ns).push(e);
  }
  return map;
}

function sortedNamespaces(map) {
  return [
    ...NAMESPACE_ORDER.filter((ns) => map.has(ns)),
    ...[...map.keys()].filter((ns) => !NAMESPACE_ORDER.includes(ns)).sort(),
  ];
}

function tableRow(event) {
  const link = `[${event.name}](/tech-partner/docs/events/${event.name})`;
  const versions = event.versions?.join(', ') || '1.0.0';
  return `| ${link} | ${versions} | ${event.status} | ${event.activeDate || '-'} | ${event.deprecationDate || '-'} | ${event.sunsetDate || '-'} |`;
}

function sortEvents(events) {
  return [...events].sort((a, b) => {
    if (a.status === 'deprecated' && b.status !== 'deprecated') return 1;
    if (a.status !== 'deprecated' && b.status === 'deprecated') return -1;
    return a.name.localeCompare(b.name);
  });
}

// ---------------------------------------------------------------------------
// Document builders
// ---------------------------------------------------------------------------

function buildPartnerEventsDoc(partnerEvents) {
  const byNs = groupByNamespace(partnerEvents);

  const sections = sortedNamespaces(byNs).map((ns) => {
    const label = namespaceLabel(ns);
    const description = namespaceDescription(ns);
    const events = byNs.get(ns);
    const received = events.filter((e) => !isSendEvent(e)).sort((a, b) => a.name.localeCompare(b.name));
    const send = events.filter((e) => isSendEvent(e)).sort((a, b) => a.name.localeCompare(b.name));

    let section = `## ${label}\n`;
    if (description) section += `\n${description}\n`;
    if (received.length) {
      section += `\n### Received\n\nThe following table lists the events that can be received:\n\n${TABLE_HEADER}\n${received.map(tableRow).join('\n')}\n`;
    }
    if (send.length) {
      section += `\n### Send\n\nThe following table lists the events that can be sent using the \`system.sendEvent\` method:\n\n${TABLE_HEADER}\n${send.map(tableRow).join('\n')}\n`;
    }
    return section;
  });

  const maestroSection = `## Maestro SDK Events

Mashell events are emitted by the embedded 8x8 experience within third-party CRMs and external applications. See the [Maestro SDK Events](/tech-partner/docs/partner-sdk-maestro-sdk-events) page for the full list.
`;

  return `# Events

8x8 products provide a comprehensive set of events that partners can receive, enabling enhanced integration capabilities. Partners also have the ability to send events to the 8x8 platform.

>
> Note: Event availability varies by integration type. To determine which events are available for a specific integration, use the \`partnerSDK.system.getEvents()\` method from the [SDK](https://www.npmjs.com/package/@8x8/pui-partner-comm#getevents).
>
>
>

${sections.join('\n')}
${maestroSection}`;
}

function buildMaestroEventsDoc(maestroEvents) {
  return `# Events

MaestroSDK provide a comprehensive set of events that partners can receive, enabling enhanced integration capabilities. Partners also have the ability to send events to the MaestroSDK.

## Received

The following table lists the events that can be received:

${TABLE_HEADER}
${maestroEvents.map(tableRow).join('\n')}
`;
}

// ---------------------------------------------------------------------------
// Sidebar builder
// ---------------------------------------------------------------------------

function sidebarDocItem(event) {
  if (event.status === 'deprecated') {
    return {
      type: 'doc',
      id: `tech-partner/docs/events/${event.name}`,
      label: `[Deprecated] ${event.name}`,
      className: 'deprecated-sidebar-item',
    };
  }
  return `tech-partner/docs/events/${event.name}`;
}

function buildSidebar(partnerEvents, maestroEvents) {
  const byNs = groupByNamespace(partnerEvents);

  const partnerCategories = sortedNamespaces(byNs).map((ns) => ({
    type: 'category',
    label: namespaceLabel(ns),
    collapsed: true,
    items: sortEvents(byNs.get(ns)).map(sidebarDocItem),
  }));

  const config = [
    {
      type: 'category',
      label: 'Getting Started',
      collapsed: true,
      link: { type: 'doc', id: 'tech-partner/docs/getting-started-overview' },
      items: [
        { type: 'doc', id: 'tech-partner/docs/getting-started-overview', label: 'Overview' },
        { type: 'doc', id: 'tech-partner/docs/ui-guidelines', label: 'UI Guidelines' },
      ],
    },
    {
      type: 'category',
      label: 'Partner SDK',
      collapsed: true,
      items: [
        'tech-partner/docs/partner-sdk-integration-guide',
        {
          type: 'category',
          label: 'Events',
          link: { type: 'doc', id: 'tech-partner/docs/partner-sdk-events' },
          collapsed: true,
          items: partnerCategories,
        },
      ],
    },
    {
      type: 'category',
      label: 'Maestro SDK',
      collapsed: true,
      items: [
        'tech-partner/docs/partner-sdk-maestro-sdk-overview',
        {
          type: 'category',
          label: 'Events',
          link: { type: 'doc', id: 'tech-partner/docs/partner-sdk-maestro-sdk-events' },
          collapsed: true,
          items: maestroEvents.map((e) => `tech-partner/docs/events/${e.name}`),
        },
      ],
    },
  ];

  return `const sidebarConfig = ${JSON.stringify(config, null, 2)};\n\nmodule.exports = sidebarConfig;\n`;
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function main() {
  if (!fs.existsSync(manifestPath)) {
    console.error(
      'ERROR: scripts/.partner-events-manifest.json not found.\n' +
      'Run \'yarn expose-public\' from the platform-ui-events repo first.'
    );
    process.exit(1);
  }

  let manifest;
  try {
    manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'));
  } catch (err) {
    console.error(`ERROR: failed to parse ${manifestPath}: ${err.message}`);
    process.exit(1);
  }

  if (!Array.isArray(manifest.events)) {
    console.error('ERROR: manifest is missing an "events" array. Re-run \'yarn expose-public\'.');
    process.exit(1);
  }

  const events = manifest.events;
  const partnerEvents = events.filter((e) => e.category === 'partner-integration');
  const maestroEvents = events.filter((e) => e.category === 'maestro');

  // Events with no resolved category (e.g. no emitter upstream) belong to no
  // table and would silently vanish — surface them so the data can be fixed.
  const uncategorized = events.filter(
    (e) => e.category !== 'partner-integration' && e.category !== 'maestro'
  );
  if (uncategorized.length) {
    console.warn(
      `WARNING: ${uncategorized.length} event(s) have no recognized category and were excluded:\n` +
      uncategorized.map((e) => `  - ${e.name} (category: ${e.category ?? 'null'})`).join('\n')
    );
  }

  // Partner namespaces with events but no description fall back to a placeholder
  // (Maestro renders flat and uses no namespace label/description). Surface them
  // so a real description gets added.
  const undocumentedNamespaces = [
    ...new Set(partnerEvents.map((e) => e.namespace || 'other')),
  ].filter((ns) => !NAMESPACES[ns]?.description);
  if (undocumentedNamespaces.length) {
    console.warn(
      `WARNING: ${undocumentedNamespaces.length} namespace(s) have no description and use a placeholder:\n` +
      undocumentedNamespaces.map((ns) => `  - ${ns}`).join('\n') + '\n' +
      'Add them to the NAMESPACES map in scripts/generate-events-overview.js.'
    );
  }

  console.log(`Found ${partnerEvents.length} partner events, ${maestroEvents.length} Maestro events.`);

  fs.writeFileSync(partnerEventsDoc, buildPartnerEventsDoc(partnerEvents));
  fs.writeFileSync(maestroEventsDoc, buildMaestroEventsDoc(maestroEvents));
  console.log('Updated partner-sdk-events.md and partner-sdk-maestro-sdk-events.md.');

  fs.writeFileSync(sidebarPath, buildSidebar(partnerEvents, maestroEvents));
  console.log('Updated tech-partner.js sidebar.');

  console.log('Done.');
}

main();
