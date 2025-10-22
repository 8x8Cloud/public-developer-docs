// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const path = require('path');
const { themes } = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

// Import redirects array
const redirects = require('./docusaurus/redirects/index.js');

// Determine baseUrl early so we can use it
const baseUrl = process.env.BASE_URL || '/';
const isPrBuild = baseUrl !== '/';

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: '8x8 Developer Portal',
  tagline: 'APIs, SDKs, guides, and integration resources for the 8x8 platform',
  url: 'https://developer.8x8.com',
  baseUrl: baseUrl,
  onBrokenLinks: 'warn',
  favicon: 'img/favicon.ico',

  // Disable client-side JavaScript for PR builds to prevent hydration errors
  ...(isPrBuild && {
    noIndex: true, // Prevent search engines from indexing PR previews
    clientModules: [], // Remove client-side modules
  }),

  markdown: {
    format: 'detect',
    hooks: {
      onBrokenMarkdownLinks: 'warn',
    },
  },

  // GitHub pages deployment config.
  organizationName: '8x8', // Usually your GitHub org/user name.
  projectName: 'developer-docs', // Usually your repo name.

  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          routeBasePath: '/',
          path: 'docs',
          sidebarPath: require.resolve('./docusaurus/sidebars/index.js'),
          breadcrumbs: false,
          // Required for docusaurus-theme-openapi-docs to render .api.mdx files.
          // This component detects the 'api:' frontmatter field and activates OpenAPI rendering.
          // Regular .md files render normally (backwards compatible).
          docItemComponent: '@theme/ApiItem',
        },
        blog: false, // Disable blog for now
        pages: {
          path: 'docusaurus/pages',
        },
        theme: {
          customCss: require.resolve('./docusaurus/css/custom.css'),
        },
      }),
    ],
  ],

  plugins: [
    [
      'docusaurus-plugin-openapi-docs',
      {
        id: 'api',
        docsPluginId: 'classic',
        config: {
          actionsEventsApis: {
            specPath: 'docs_oas/actions-events',
            outputDir: 'docs/actions-events/reference',
            sidebarOptions: {
              groupPathsBy: 'tag',
            },
          },
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
          contactCenterApis: {
            specPath: 'docs_oas/contactcenter',
            outputDir: 'docs/contactcenter/reference',
            sidebarOptions: {
              groupPathsBy: 'tag',
            },
          },
        },
      },
    ],
    [
      '@docusaurus/plugin-client-redirects',
      {
        redirects,
      },
    ],
    // Custom plugin for client-side redirects (React Router level)
    path.resolve(__dirname, 'docusaurus/plugins/client-side-redirects'),
  ],

  staticDirectories: [path.resolve(__dirname, 'docusaurus/static')],

  themes: [
    'docusaurus-theme-openapi-docs',
    !isPrBuild && [
      require.resolve('@easyops-cn/docusaurus-search-local'),
      {
        hashed: true,
        indexBlog: false,
        language: ['en'],
        highlightSearchTermsOnTargetPage: true,
        explicitSearchResultPath: true,
        docsRouteBasePath: '/',
      },
    ],
  ].filter(Boolean),

  themeConfig: {
    docs: {
      sidebar: {
        hideable: true,
        autoCollapseCategories: true,
      },
    },
    // Configure scroll behavior for anchor links
    // This ensures proper scrolling to anchors on page load and navigation
    tableOfContents: {
      minHeadingLevel: 2,
      maxHeadingLevel: 3,
    },
    colorMode: {
      respectPrefersColorScheme: true,
    },
    navbar: {
      title: '8x8 Developer Portal',
      logo: {
        alt: '8x8',
        src: 'img/Logo8x8Light.svg',
        srcDark: 'img/Logo8x8Dark.svg',
      },
      items: [
        {
          to: '/actions-events',
          position: 'left',
          label: 'Actions & Events',
        },
        {
          to: '/analytics',
          position: 'left',
          label: 'Analytics',
        },
        {
          to: '/connect',
          position: 'left',
          label: 'Connect CPaaS',
        },
        {
          to: '/jaas',
          position: 'left',
          label: 'JaaS',
        },
        {
          to: '/tech-partner',
          position: 'left',
          label: 'Tech Partners',
        },
        {
          href: 'https://github.com/8x8Cloud/public-developer-docs',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      copyright: `© ${new Date().getFullYear()} by 8x8. All rights reserved. | <a href="/license">8x8 API License Agreement</a> | <a href="/page/sdk-license">8x8 SDK License Agreement</a>`,
    },
    prism: {
      theme: lightCodeTheme,
      darkTheme: darkCodeTheme,
    },
  },

  stylesheets: [
    'https://fonts.googleapis.com/css?family=Source+Sans+Pro:400,400i,700',
    'https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700&display=swap',
  ],
};

module.exports = config;
