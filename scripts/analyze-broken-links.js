#!/usr/bin/env node

const { spawn } = require('child_process');

// =====================================================================
// CONFIGURATION - Customize these arrays to filter out known issues
// =====================================================================

/**
 * Links to ignore from the broken links report.
 * We need to work on making this array empty,
 *  links are added here so we can enable the check and
 *  from now on all the added links should be valid.
 */
const IGNORE_BROKEN_LINKS = [
  // actions & events
  '/actions-events/reference/placephonecall',
  // analytics
  '/analytics/docs/contact-search',
  // contact center
  '/contactcenter/docs/getting-started',
  '/contactcenter/reference/getusingget',
  '/contactcenter/reference/subscribeusingpost',
  '/contactcenter/reference/authorizeusingpost',
  // connect
  '/connect/reference/chatapps-send-api',
  '/connect/reference/send-single-1',
  '/connect/reference/send-api-1',
  '/sms/API-Reference/mobile-verification-api/send-otp',
  '/sms/API-Reference/mobile-verification-api/verify-otp',
  '/connect/reference/create-a-new-voice-webhook',
  '/connect/reference/send-sms-batch',
  '/connect/reference/webhook-configuration-api-sms',
  '/connect/reference/call-flow-actions-say',
  '/connect/reference/call-flow-actions-sayandcapture',
  '/connect/reference/voice-message-copy',
  '/connect/reference/call-flow-actions-playfile',
  '/connect/reference/vm-voice-languages-and-profiles',
  // jaas
  '/jaas/docs/jaas-prefs-dial-in',
];

/**
 * Anchors to ignore from the broken anchors report.
 * Add anchor links (with #) that should not be reported as broken.
 *
 * We need to work on making this array empty,
 *  links are added here so we can enable the check and
 *  from now on all the added links should be valid.
 */
const IGNORE_BROKEN_LINK_ANCHORS = [
  // actions & events
  '/actions-events/docs/cc-manage-phone-calls#exttransationdata-details',
  '/actions-events/docs/cc-managing-agent-status#status-values',
  '/actions-events/docs/cc-managing-agent-status##status-code-list-reference',
  // connect
  '/connect/docs/data-center-region#api-endpoints-and-data-center-region',
  // jaas
  '/jaas/docs/webhooks-payload#recording_uploaded',
  '/jaas/docs/api-keys-jwt#create-polls',
  '/jaas/docs/api-keys-jwt#send-groupchat',
  '/jaas/docs/jaas-onboarding#the-jitsi-jwt1',
];

/**
 * Source pages to ignore - broken links/anchors from these pages won't be reported.
 *
 * We need to maintain this array empty, all the pages should have the validation in place.
 */
const IGNORE_BROKEN_PAGES = [];

// =====================================================================
// MAIN SCRIPT - Runs yarn build and analyzes broken links
// =====================================================================

console.log('🔍 Running yarn build to detect broken links...\n');

const buildProcess = spawn('yarn', ['build'], {
  stdio: 'pipe',
  shell: true,
});

let buildOutput = '';

// Capture both stdout and stderr
buildProcess.stdout.on('data', data => {
  buildOutput += data.toString();
});

buildProcess.stderr.on('data', data => {
  buildOutput += data.toString();
});

buildProcess.on('close', code => {
  console.log(`\n✅ Build process completed (exit code: ${code})\n`);
  console.log('📊 Analyzing broken links and anchors...\n');

  analyzeBrokenLinks(buildOutput);
});

buildProcess.on('error', error => {
  console.error(`❌ Failed to start build process: ${error.message}`);
  process.exit(1);
});

// =====================================================================
// PARSING AND ANALYSIS FUNCTIONS
// =====================================================================

/**
 * Main analysis function that parses build output and generates report
 */
function analyzeBrokenLinks(output) {
  const brokenLinks = parseBrokenLinks(output);
  const brokenAnchors = parseBrokenAnchors(output);

  const filteredLinks = filterBrokenLinks(brokenLinks);
  const filteredAnchors = filterBrokenAnchors(brokenAnchors);

  // Add type indicator to distinguish between broken links and anchors
  const linksWithType = filteredLinks.map(item => ({
    ...item,
    type: 'broken link',
  }));
  const anchorsWithType = filteredAnchors.map(item => ({
    ...item,
    type: 'broken anchor',
  }));

  // Merge both types into a unified list
  const allIssues = [...linksWithType, ...anchorsWithType];

  const aggregatedBySource = aggregateBySource(allIssues);

  const hasIssues = generateReport(
    aggregatedBySource,
    filteredLinks.length,
    filteredAnchors.length,
  );

  // Exit with non-zero code if broken links/anchors were found
  if (hasIssues) {
    console.log('❌ Failed: Broken links or anchors detected');
    console.log();
    process.exit(1);
  }

  // No issues found - exit successfully
  process.exit(0);
}

/**
 * Parses the "Exhaustive list of all broken links found:" section
 * Returns array of { source, target } objects
 */
function parseBrokenLinks(output) {
  const brokenLinks = [];
  const linksSectionRegex =
    /Exhaustive list of all broken links found:([\s\S]*?)(?=Exhaustive list of all broken anchors found:|$)/i;
  const match = output.match(linksSectionRegex);

  if (!match) {
    return brokenLinks;
  }

  const linksSection = match[1];
  const lines = linksSection.split('\n');

  let currentSource = null;

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Match source page line: "- Broken link on source page path = /path:"
    const sourceMatch = trimmedLine.match(
      /^-\s+Broken link on source page path\s*=\s*(.+):$/,
    );
    if (sourceMatch) {
      currentSource = sourceMatch[1].trim();
      continue;
    }

    // Match target link line: "   -> linking to /target/path"
    const targetMatch = trimmedLine.match(
      /^->\s+linking to\s+(.+?)(?:\s+\(resolved as:.*\))?$/,
    );
    if (targetMatch && currentSource) {
      const target = targetMatch[1].trim();
      brokenLinks.push({ source: currentSource, target });
    }
  }

  return brokenLinks;
}

/**
 * Parses the "Exhaustive list of all broken anchors found:" section
 * Returns array of { source, target } objects
 */
function parseBrokenAnchors(output) {
  const brokenAnchors = [];
  const anchorsSectionRegex =
    /Exhaustive list of all broken anchors found:([\s\S]*?)$/i;
  const match = output.match(anchorsSectionRegex);

  if (!match) {
    return brokenAnchors;
  }

  const anchorsSection = match[1];
  const lines = anchorsSection.split('\n');

  let currentSource = null;

  for (const line of lines) {
    const trimmedLine = line.trim();

    // Match source page line: "- Broken anchor on source page path = /path:"
    const sourceMatch = trimmedLine.match(
      /^-\s+Broken anchor on source page path\s*=\s*(.+):$/,
    );
    if (sourceMatch) {
      currentSource = sourceMatch[1].trim();
      continue;
    }

    // Match target anchor line: "   -> linking to /target/path#anchor"
    const targetMatch = trimmedLine.match(
      /^->\s+linking to\s+(.+?)(?:\s+\(resolved as:.*\))?$/,
    );
    if (targetMatch && currentSource) {
      const target = targetMatch[1].trim();
      brokenAnchors.push({ source: currentSource, target });
    }
  }

  return brokenAnchors;
}

/**
 * Filters broken links based on IGNORE lists
 */
function filterBrokenLinks(brokenLinks) {
  return brokenLinks.filter(({ source, target }) => {
    // Check if source page should be ignored
    if (shouldIgnorePage(source)) {
      return false;
    }

    // Check if target link should be ignored
    if (shouldIgnoreLink(target)) {
      return false;
    }

    return true;
  });
}

/**
 * Filters broken anchors based on IGNORE lists
 */
function filterBrokenAnchors(brokenAnchors) {
  return brokenAnchors.filter(({ source, target }) => {
    // Check if source page should be ignored
    if (shouldIgnorePage(source)) {
      return false;
    }

    // Check if target anchor should be ignored
    if (shouldIgnoreAnchor(target)) {
      return false;
    }

    return true;
  });
}

/**
 * Checks if a source page should be ignored
 */
function shouldIgnorePage(sourcePath) {
  return IGNORE_BROKEN_PAGES.some(ignoredPage =>
    sourcePath.includes(ignoredPage),
  );
}

/**
 * Checks if a link target should be ignored
 */
function shouldIgnoreLink(targetPath) {
  return IGNORE_BROKEN_LINKS.some(ignoredLink =>
    targetPath.includes(ignoredLink),
  );
}

/**
 * Checks if an anchor target should be ignored
 */
function shouldIgnoreAnchor(targetPath) {
  return IGNORE_BROKEN_LINK_ANCHORS.some(ignoredAnchor =>
    targetPath.includes(ignoredAnchor),
  );
}

/**
 * Aggregates broken links/anchors by source page with list of broken targets
 * Returns: { 'source-page': { count: N, targets: [{target: 'url', type: 'broken link|broken anchor'}, ...] } }
 */
function aggregateBySource(items) {
  const aggregated = {};

  for (const { source, target, type } of items) {
    if (!aggregated[source]) {
      aggregated[source] = {
        count: 0,
        targets: [],
      };
    }

    aggregated[source].count++;
    aggregated[source].targets.push({ target, type });
  }

  return aggregated;
}

/**
 * Generates and prints the formatted report
 * Returns true if issues were found, false otherwise
 */
function generateReport(aggregatedBySource, totalLinks, totalAnchors) {
  console.log('═'.repeat(80));
  console.log('# Report on links');
  console.log('═'.repeat(80));
  console.log();

  // Pages with Broken Links Section
  console.log('## Pages with broken links');
  console.log();

  const sourceEntries = Object.entries(aggregatedBySource);

  if (sourceEntries.length === 0) {
    console.log('  ✅ No broken links found (after filtering)');
  } else {
    // Sort by count (descending) for most problematic pages first
    sourceEntries.sort((a, b) => b[1].count - a[1].count);

    for (const [source, { count, targets }] of sourceEntries) {
      console.log(`  ${source} (${count} ${count === 1 ? 'issue' : 'issues'})`);

      // Sort targets alphabetically for consistency
      targets.sort((a, b) => a.target.localeCompare(b.target));

      for (const { target, type } of targets) {
        console.log(`    - ${target} (${type})`);
      }
      console.log();
    }
  }

  console.log('═'.repeat(80));

  // Summary statistics
  const totalIssues = sourceEntries.reduce(
    (sum, [, { count }]) => sum + count,
    0,
  );

  console.log();
  console.log('📈 Summary:');
  console.log(`   Pages with broken links: ${sourceEntries.length}`);
  console.log(`   Total broken links: ${totalLinks}`);
  console.log(`   Total broken anchors: ${totalAnchors}`);
  console.log(`   Total issues: ${totalIssues}`);
  console.log();

  return totalIssues > 0;
}
