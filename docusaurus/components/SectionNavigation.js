import React, { useMemo } from 'react';
import { useLocation } from '@docusaurus/router';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import sidebars from '@site/docusaurus/sidebars';

// Constants for tab labels
const TAB_LABELS = {
  GUIDES: 'Guides',
  API_REFERENCE: 'API Reference',
  SUPPORT: 'Support',
  CHANGELOG: 'Changelog',
};

// Constants for icon classes
const ICON_CLASSES = {
  GUIDES: 'icon-guides',
  REFERENCES: 'icon-references',
  SUPPORT: 'icon-support',
};

// Helper function to recursively search for a doc ID in a sidebar structure
function findDocInSidebar(items, docId) {
  if (!items || !Array.isArray(items)) {
    return false;
  }

  for (const item of items) {
    // Handle simple string doc IDs (e.g., 'connect/docs/getting-started')
    if (typeof item === 'string' && item === docId) {
      return true;
    }
    // Handle object doc IDs (e.g., {type: 'doc', id: 'connect/docs/getting-started'})
    if (item.type === 'doc' && item.id === docId) {
      return true;
    }
    // Handle category with link (e.g., {type: 'category', link: {type: 'doc', id: '...'}, items: [...]})
    if (
      item.type === 'category' &&
      item.link?.type === 'doc' &&
      item.link?.id === docId
    ) {
      return true;
    }
    // Recursively search category items
    if (item.type === 'category' && item.items) {
      if (findDocInSidebar(item.items, docId)) {
        return true;
      }
    }
  }
  return false;
}

// Function to find which sidebar contains a given doc ID
function findSidebarForDoc(docId) {
  for (const [sidebarName, sidebarItems] of Object.entries(sidebars)) {
    if (findDocInSidebar(sidebarItems, docId)) {
      return sidebarName;
    }
  }
  return null;
}

// Base configuration for section navigation (without baseUrl)
const BASE_SECTION_NAV_CONFIG = {
  'actions-events': {
    tabs: [
      {
        label: TAB_LABELS.GUIDES,
        path: '/actions-events/docs',
        iconClass: ICON_CLASSES.GUIDES,
        sidebar: 'sidebarActionsEventsDocs',
      },
      {
        label: TAB_LABELS.API_REFERENCE,
        path: '/actions-events/reference',
        iconClass: ICON_CLASSES.REFERENCES,
        sidebar: 'sidebarActionsEventsReference',
      },
    ],
  },
  analytics: {
    tabs: [
      {
        label: TAB_LABELS.GUIDES,
        path: '/analytics/docs',
        iconClass: ICON_CLASSES.GUIDES,
        sidebar: 'sidebarAnalyticsDocs',
      },
      {
        label: TAB_LABELS.API_REFERENCE,
        path: '/analytics/reference',
        iconClass: ICON_CLASSES.REFERENCES,
        sidebar: 'sidebarAnalyticsReference',
      },
    ],
  },
  connect: {
    tabs: [
      {
        label: TAB_LABELS.GUIDES,
        path: '/connect/docs',
        iconClass: ICON_CLASSES.GUIDES,
        sidebar: 'sidebarConnectDocs',
      },
      {
        label: TAB_LABELS.API_REFERENCE,
        path: '/connect/reference',
        iconClass: ICON_CLASSES.REFERENCES,
        sidebar: 'sidebarConnectReference',
      },
      {
        label: TAB_LABELS.SUPPORT,
        path: 'https://support.cpaas.8x8.com/hc/en-us',
        iconClass: ICON_CLASSES.SUPPORT,
      },
    ],
  },
  contactcenter: {
    tabs: [
      {
        label: TAB_LABELS.GUIDES,
        path: '/contactcenter/docs',
        iconClass: ICON_CLASSES.GUIDES,
        sidebar: 'sidebarContactCenterDocs',
      },
      {
        label: TAB_LABELS.API_REFERENCE,
        path: '/contactcenter/reference',
        iconClass: ICON_CLASSES.REFERENCES,
        sidebar: 'sidebarContactCenterReference',
      },
      {
        label: TAB_LABELS.CHANGELOG,
        path: '/contactcenter/changelog',
        // No sidebar property for changelog
      },
    ],
  },
};

export default function SectionNavigation() {
  const location = useLocation();
  const pathname = location.pathname;
  const { siteConfig } = useDocusaurusContext();
  const baseUrl = siteConfig.baseUrl;

  // Remove trailing slash from baseUrl for consistent comparisons
  const normalizedBaseUrl = baseUrl.replace(/\/$/, '');

  // Apply baseUrl to all paths in the configuration using useMemo
  const SECTION_NAV_CONFIG = useMemo(() => {
    const config = {};
    for (const section in BASE_SECTION_NAV_CONFIG) {
      config[section] = {
        ...BASE_SECTION_NAV_CONFIG[section],
        tabs: BASE_SECTION_NAV_CONFIG[section].tabs.map(tab => {
          // Check if path is an absolute URL (starts with http:// or https://)
          const isAbsoluteUrl = /^https?:\/\//.test(tab.path);
          return {
            ...tab,
            // Only prepend baseUrl to relative paths, not absolute URLs
            path:
              isAbsoluteUrl || !normalizedBaseUrl
                ? tab.path
                : `${normalizedBaseUrl}${tab.path}`,
          };
        }),
      };
    }
    return config;
  }, [normalizedBaseUrl]);

  // Determine current section from pathname
  const getCurrentSection = () => {
    // Remove baseUrl from pathname to get the relative path
    const relativePath = normalizedBaseUrl
      ? pathname.replace(normalizedBaseUrl, '')
      : pathname;

    for (const section in BASE_SECTION_NAV_CONFIG) {
      if (relativePath.startsWith(`/${section}`)) {
        return section;
      }
    }
    return null;
  };

  const currentSection = getCurrentSection();

  // Don't render anything if not in a configured section
  if (!currentSection || !SECTION_NAV_CONFIG[currentSection]) {
    return null;
  }

  const config = SECTION_NAV_CONFIG[currentSection];

  // Don't render if there's only one tab or no tabs
  if (!config.tabs || config.tabs.length <= 1) {
    return null;
  }

  // Determine active tab based on sidebar membership
  const getActiveTab = () => {
    // Extract doc ID from pathname
    // Remove baseUrl and convert path to doc ID format
    // Example: /connect/docs/getting-started-with-sms-api -> connect/docs/getting-started-with-sms-api
    let relativePath = normalizedBaseUrl
      ? pathname.replace(normalizedBaseUrl, '')
      : pathname;

    // Remove leading slash
    relativePath = relativePath.replace(/^\//, '');

    // Remove trailing slash
    relativePath = relativePath.replace(/\/$/, '');

    // The doc ID is the path without extension
    const docId = relativePath;

    // Find which sidebar contains this doc
    const sidebarName = findSidebarForDoc(docId);

    if (sidebarName) {
      // Find the tab that has this sidebar
      const tabIndex = config.tabs.findIndex(
        tab => tab.sidebar === sidebarName,
      );
      // Return the tab index, or -1 if not found (no highlight)
      return tabIndex !== -1 ? tabIndex : -1;
    }

    // If no sidebar is detected, don't highlight any tab
    return -1;
  };

  const activeTabIndex = getActiveTab();

  return (
    <div className="section-navigation">
      <div className="section-navigation__container">
        <div className="section-navigation__tabs">
          {config.tabs.map((tab, index) => (
            <Link
              key={index}
              to={tab.path}
              className={`section-navigation__tab ${tab.iconClass || ''} ${
                index === activeTabIndex
                  ? 'section-navigation__tab--active'
                  : ''
              }`}
            >
              {tab.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
