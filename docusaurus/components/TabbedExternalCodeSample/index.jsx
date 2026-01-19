import React, { useState } from 'react';
import Tabs, { Tab } from '@8x8/oxygen-tabs';
import { Spinner } from '@8x8/oxygen-loaders';
import CodeBlock from '@theme/CodeBlock';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import logger from './logger';

/**
 * TabbedExternalCodeSample - Fetches and displays code samples from external files
 *
 * Fetches and displays code samples for explicitly specified languages using 8x8 Oxygen
 * design system components. Maintains collapsible, tabbed UX with runtime code fetching
 * for always-fresh examples.
 *
 * Features:
 * - Lazy-loads code samples only when details element is expanded
 * - Displays loading spinner during fetch
 * - Remembers last-used language globally across all code samples
 * - Auto-adapts to Docusaurus light/dark theme (via useColorMode hook)
 * - Browser caching (1-hour TTL)
 *
 * @param {string} path - Path to code sample directory (e.g., "example_code/users-api/auth-example")
 * @param {string} title - Display title for collapsible section
 * @param {Array} languages - REQUIRED language config array (e.g., [{ext: 'py', label: 'Python', syntax: 'python'}])
 * @param {string} defaultLanguage - Default tab extension to show (e.g., "py", "js")
 */
export default function TabbedExternalCodeSample({
  path,
  title = 'Code Example',
  languages,
  defaultLanguage = 'py',
}) {
  // Validate required prop
  if (!languages || !Array.isArray(languages) || languages.length === 0) {
    logger.error('languages prop is required and must be a non-empty array');
    return (
      <details>
        <summary>{title} (click to expand)</summary>
        <div style={{ padding: '1rem', color: '#d32f2f' }}>
          ⚠️ Configuration error: languages prop is required
        </div>
      </details>
    );
  }

  const { siteConfig } = useDocusaurusContext();
  const [code, setCode] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasFetched, setHasFetched] = useState(false);
  const [activeTab, setActiveTab] = useState(null);

  const getInitialTab = availableLangs => {
    if (availableLangs.length === 0) return null;

    // Priority 1: Check global last-used language
    try {
      const lastUsed = localStorage.getItem('docusaurus.tab.lastUsed');
      if (lastUsed && availableLangs.includes(lastUsed)) {
        return lastUsed;
      }
    } catch (e) {
      logger.warn('Failed to read last-used language:', e);
    }

    // Priority 2: Use defaultLanguage
    const defaultLang = availableLangs.find(ext => ext === defaultLanguage);
    if (defaultLang) {
      return defaultLang;
    }

    // Priority 3: Fallback to first available
    return availableLangs[0];
  };

  const fetchCode = async () => {
    // Only fetch once
    if (hasFetched) return;

    setHasFetched(true);
    setLoading(true);

    const cacheKey = `code_${path}`;

    // Check browser cache first (1 hour TTL)
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const { code: cachedCode, timestamp } = JSON.parse(cached);
        if (Date.now() - timestamp < 3600000) {
          // 1 hour
          setCode(cachedCode);

          // Initialize active tab from cached data
          const availableLangs = languages
            .filter(lang => cachedCode[lang.ext])
            .map(lang => lang.ext);
          setActiveTab(getInitialTab(availableLangs));

          setLoading(false);
          return;
        }
      }
    } catch (e) {
      // Cache read failed, continue with fetch
      logger.warn('Cache read failed:', e);
    }

    try {
      // Get base URL from Docusaurus site config
      // In production: siteConfig.baseUrl = '/'
      // In test/staging: siteConfig.baseUrl could be '/subfolder/' or custom domain
      const baseUrl = siteConfig.baseUrl || '/';

      // Strip 'example_code/' prefix since staticDirectories serves directory contents at root
      // Path: "example_code/administration/users-api/..." -> "administration/users-api/..."
      const cleanPath = path.replace(/^example_code\//, '');

      // Construct fetch URL: {baseUrl}{cleanPath}
      // Example production: /administration/users-api/auth-example
      // Example staging: /subfolder/administration/users-api/auth-example
      const fetchBaseUrl = `${baseUrl}${cleanPath}`.replace(/\/+/g, '/'); // Remove duplicate slashes

      // Helper function to fetch a single language
      const fetchLanguage = async lang => {
        try {
          const response = await fetch(`${fetchBaseUrl}/example.${lang.ext}`);
          if (response.ok) {
            const code = await response.text();

            // Detect if we got HTML instead of code (Docusaurus serves 200 with HTML for missing files)
            if (
              code.trim().startsWith('<!DOCTYPE') ||
              code.trim().startsWith('<html')
            ) {
              logger.warn(`${lang.label} sample not found (got HTML response)`);
              return null;
            }

            return { lang, code };
          }
          return null; // File doesn't exist (404), skip silently
        } catch (err) {
          logger.warn(`Failed to fetch ${lang.label} sample:`, err);
          return null;
        }
      };

      // Fetch all languages in parallel
      const results = await Promise.all(languages.map(fetchLanguage));

      const fetchedCode = {};
      results.forEach(result => {
        if (result && result.code) {
          fetchedCode[result.lang.ext] = {
            code: result.code,
            label: result.lang.label,
            syntax: result.lang.syntax,
          };
        }
      });

      setCode(fetchedCode);

      // Initialize active tab
      const availableLangs = languages
        .filter(lang => fetchedCode[lang.ext])
        .map(lang => lang.ext);
      setActiveTab(getInitialTab(availableLangs));

      // Cache for 1 hour
      try {
        localStorage.setItem(
          cacheKey,
          JSON.stringify({
            code: fetchedCode,
            timestamp: Date.now(),
          }),
        );
      } catch (e) {
        // Cache write failed (quota exceeded?), but we have the code
        logger.warn('Cache write failed:', e);
      }
    } catch (err) {
      setError(err.message);
      logger.error('Error fetching code samples:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleToggle = event => {
    // Fetch code when details element is opened
    if (event.target.open && !hasFetched) {
      fetchCode();
    }
  };

  const handleTabClick = (event, value) => {
    setActiveTab(value);

    // Always store last-used language globally
    try {
      localStorage.setItem('docusaurus.tab.lastUsed', value);
    } catch (e) {
      logger.warn('Failed to store last-used language:', e);
    }
  };

  // Get available languages in the order they appear in the languages array
  // This ensures consistent tab ordering regardless of fetch order
  const availableLanguages = languages
    .filter(lang => code[lang.ext])
    .map(lang => lang.ext);

  // Not yet expanded - show collapsed state
  if (!hasFetched && availableLanguages.length === 0) {
    return (
      <details onToggle={handleToggle}>
        <summary>{title} (click to expand)</summary>
      </details>
    );
  }

  // Loading state - expanded but still fetching
  if (loading && availableLanguages.length === 0) {
    return (
      <details open onToggle={handleToggle}>
        <summary>{title} (click to expand)</summary>
        <div
          style={{ padding: '1rem', display: 'flex', justifyContent: 'center' }}
        >
          <Spinner
            size="default"
            text="Loading code samples..."
            hasAnimation={true}
          />
        </div>
      </details>
    );
  }

  // Error state
  if (error && availableLanguages.length === 0) {
    return (
      <details open onToggle={handleToggle}>
        <summary>{title} (click to expand)</summary>
        <div style={{ padding: '1rem', color: '#d32f2f' }}>
          ⚠️ Error loading code samples
        </div>
      </details>
    );
  }

  // No code available
  if (hasFetched && availableLanguages.length === 0) {
    const expectedFiles = languages
      .map(lang => `example.${lang.ext}`)
      .join(', ');
    logger.warn(`No code samples found at ${path}`);
    logger.warn(`Expected files: ${expectedFiles}`);
    return (
      <details open onToggle={handleToggle}>
        <summary>{title} (click to expand)</summary>
        <div style={{ padding: '1rem', color: '#ff9800' }}>
          ⚠️ No code samples found
        </div>
      </details>
    );
  }

  // Render code samples in collapsible tabs (with partial or complete data)
  return (
    <details open={hasFetched} onToggle={handleToggle}>
      <summary>{title} (click to expand)</summary>
      {availableLanguages.length > 0 ? (
        <>
          <Tabs>
            {availableLanguages.map(ext => {
              const langData = code[ext];
              const tabId = `tab-${path}-${ext}`.replace(/[^a-zA-Z0-9-]/g, '-');
              const panelId = `panel-${path}-${ext}`.replace(
                /[^a-zA-Z0-9-]/g,
                '-',
              );

              return (
                <Tab
                  key={ext}
                  value={ext}
                  isActive={activeTab === ext}
                  onClick={handleTabClick}
                  aria-controls={panelId}
                  id={tabId}
                >
                  {langData.label}
                </Tab>
              );
            })}
          </Tabs>

          {/* Tab panels */}
          <div style={{ marginTop: '0.5rem' }}>
            {availableLanguages.map(ext => {
              const langData = code[ext];
              const panelId = `panel-${path}-${ext}`.replace(
                /[^a-zA-Z0-9-]/g,
                '-',
              );
              const tabId = `tab-${path}-${ext}`.replace(/[^a-zA-Z0-9-]/g, '-');

              return (
                <div
                  key={ext}
                  id={panelId}
                  role="tabpanel"
                  hidden={activeTab !== ext}
                  aria-labelledby={tabId}
                >
                  {activeTab === ext && (
                    <CodeBlock language={langData.syntax}>
                      {langData.code}
                    </CodeBlock>
                  )}
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div
          style={{ padding: '1rem', display: 'flex', justifyContent: 'center' }}
        >
          <Spinner
            size="default"
            text="Loading code samples..."
            hasAnimation={true}
          />
        </div>
      )}
    </details>
  );
}
