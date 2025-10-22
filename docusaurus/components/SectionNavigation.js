import React, { useMemo } from 'react';
import { useLocation } from '@docusaurus/router';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

// Constants for tab labels
const TAB_LABELS = {
  GUIDES: 'Guides',
  API_REFERENCE: 'API Reference',
  SUPPORT: 'Support',
  FEEDBACK: 'Feedback',
  CONTACT_CENTER: 'Contact Center',
  CHANGELOG: 'Changelog',
};

// Constants for icon classes
const ICON_CLASSES = {
  GUIDES: 'icon-guides',
  REFERENCES: 'icon-references',
};

// Base configuration for section navigation (without baseUrl)
const BASE_SECTION_NAV_CONFIG = {
  'actions-events': {
    tabs: [
      {
        label: TAB_LABELS.GUIDES,
        path: '/actions-events/docs',
        iconClass: ICON_CLASSES.GUIDES,
      },
      {
        label: TAB_LABELS.API_REFERENCE,
        path: '/actions-events/reference',
        iconClass: ICON_CLASSES.REFERENCES,
      },
    ],
  },
  analytics: {
    tabs: [
      {
        label: TAB_LABELS.GUIDES,
        path: '/analytics/docs',
        iconClass: ICON_CLASSES.GUIDES,
      },
      {
        label: TAB_LABELS.API_REFERENCE,
        path: '/analytics/reference',
        iconClass: ICON_CLASSES.REFERENCES,
      },
    ],
  },
  connect: {
    tabs: [
      {
        label: TAB_LABELS.GUIDES,
        path: '/connect/docs',
        iconClass: ICON_CLASSES.GUIDES,
      },
      {
        label: TAB_LABELS.API_REFERENCE,
        path: '/connect/reference',
        iconClass: ICON_CLASSES.REFERENCES,
      },
      {
        label: TAB_LABELS.CONTACT_CENTER,
        path: '/contactcenter',
      },
      {
        label: TAB_LABELS.SUPPORT,
        path: 'https://support.cpaas.8x8.com/hc/en-us',
      },
      {
        label: TAB_LABELS.FEEDBACK,
        path: 'https://8x8cpaas.canny.io/',
      },
    ],
  },
  contactcenter: {
    tabs: [
      {
        label: TAB_LABELS.GUIDES,
        path: '/contactcenter/docs',
        iconClass: ICON_CLASSES.GUIDES,
      },
      {
        label: TAB_LABELS.API_REFERENCE,
        path: '/contactcenter/reference',
        iconClass: ICON_CLASSES.REFERENCES,
      },
      {
        label: TAB_LABELS.CHANGELOG,
        path: '/contactcenter/changelog',
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

  // Determine active tab based on current path
  const getActiveTab = () => {
    // Check if we're in docs vs reference
    if (pathname.includes('/reference/') || pathname.includes('/reference')) {
      return config.tabs.findIndex(tab => tab.path.includes('/reference'));
    }
    if (pathname.includes('/docs/') || pathname.includes('/docs')) {
      return config.tabs.findIndex(tab => tab.path.includes('/docs'));
    }
    // Default to first tab
    return 0;
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
