const sidebarConfig = [
  {
    type: 'category',
    label: 'Actions & Events',
    collapsed: true,
    items: ['actions-events/docs/introduction'],
  },
  {
    type: 'category',
    label: 'CHAPI - Work Chat API',
    collapsed: true,
    items: [
      {
        type: 'category',
        label: 'Getting Started with 8x8 Chat',
        link: { type: 'doc', id: 'actions-events/docs/getting-started-chapi' },
        collapsed: true,
        items: [
          'actions-events/docs/chat-api-key',
          'actions-events/docs/chat-things-you-should-know',
        ],
      },
    ],
  },
  {
    type: 'category',
    label: 'CC Chat Gateway',
    collapsed: true,
    items: [
      'actions-events/docs/chat-gateway',
      'actions-events/docs/key-elements',
      'actions-events/docs/api-key',
      'actions-events/docs/chat-workflow',
      {
        type: 'category',
        label: 'Webhooks',
        link: { type: 'doc', id: 'actions-events/docs/webhooks-2' },
        collapsed: true,
        items: [
          'actions-events/docs/webhooks-events-reference',
          'actions-events/docs/validating-webhook-events',
        ],
      },
      'actions-events/docs/channel',
      'actions-events/docs/troubleshooting',
    ],
  },
  {
    type: 'category',
    label: 'Contact Center Dynamic Campaigns API',
    collapsed: true,
    items: [
      'actions-events/docs/cc-managing-campaign-status',
      'actions-events/docs/cc-managing-campaign-records',
    ],
  },
  {
    type: 'category',
    label: 'Contact Center Agent Status',
    collapsed: true,
    items: ['actions-events/docs/cc-managing-agent-status'],
  },
  {
    type: 'category',
    label: 'Contact Center Phone Call API',
    collapsed: true,
    items: ['actions-events/docs/cc-manage-phone-calls'],
  },
  {
    type: 'category',
    label: 'Contact Center - Event Streaming (BETA)',
    collapsed: true,
    items: [
      'actions-events/docs/streaming/overview',
      'actions-events/docs/streaming/getting-started',
      'actions-events/docs/streaming/authentication',
      'actions-events/docs/streaming/connection',
      'actions-events/docs/streaming/message-format',
      'actions-events/docs/streaming/event-lifecycle',
      'actions-events/docs/streaming/event-reference',
      'actions-events/docs/streaming/field-reference',
      'actions-events/docs/streaming/troubleshooting',
      'actions-events/docs/streaming/migration',
      {
        type: 'category',
        label: 'Code Examples',
        collapsed: true,
        items: [
          'actions-events/docs/streaming/examples/golang',
          'actions-events/docs/streaming/examples/java',
          'actions-events/docs/streaming/examples/python',
          'actions-events/docs/streaming/examples/nodejs',
          'actions-events/docs/streaming/examples/browser',
        ],
      },
      'actions-events/docs/legacy-streaming-api-overview',
    ],
  },
  {
    type: 'category',
    label: 'Webchat API v2',
    collapsed: true,
    items: [
      'actions-events/docs/introduction-1',
      'actions-events/docs/webchat-script',
      'actions-events/docs/customer-information',
      'actions-events/docs/chat-language',
      'actions-events/docs/chat-language-copy',
      'actions-events/docs/trigger-webchat',
      {
        type: 'category',
        label: 'Theming',
        link: { type: 'doc', id: 'actions-events/docs/theming' },
        collapsed: true,
        items: [
          'actions-events/docs/button-theming',
          'actions-events/docs/glossary-of-theming-items',
          'actions-events/docs/dark-mode-example',
        ],
      },
    ],
  },
  {
    type: 'category',
    label: 'Contact Centre Data Augmentation',
    collapsed: true,
    items: ['actions-events/docs/8x8-contact-center-data-augmentation-api'],
  },
];

module.exports = sidebarConfig;
