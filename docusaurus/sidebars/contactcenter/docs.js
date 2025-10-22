const sidebarConfig = [
  {
    type: 'category',
    label: 'Contact Center Chat API',
    collapsed: true,
    items: [
      {
        type: 'doc',
        id: 'contactcenter/docs/contact-center-chat',
        label: '[Deprecated] Contact Center Chat API',
        className: 'deprecated-sidebar-item',
      },
      {
        type: 'doc',
        id: 'contactcenter/docs/key-elements-in-chat-api',
        label: '[Deprecated] Key Elements',
        className: 'deprecated-sidebar-item',
      },
      {
        type: 'doc',
        id: 'contactcenter/docs/workflow',
        label: '[Deprecated] Chat Workflow',
        className: 'deprecated-sidebar-item',
      },
      {
        type: 'doc',
        id: 'contactcenter/docs/api-key',
        label: '[Deprecated] API key',
        className: 'deprecated-sidebar-item',
      },
      {
        type: 'category',
        label: '[Deprecated] Webhooks',
        link: { type: 'doc', id: 'contactcenter/docs/create-a-webhook' },
        collapsed: true,
        className: 'deprecated-sidebar-item',
        items: [
          {
            type: 'doc',
            id: 'contactcenter/docs/webhook-events-reference',
            label: '[Deprecated] Webhook Events Reference',
            className: 'deprecated-sidebar-item',
          },
          {
            type: 'doc',
            id: 'contactcenter/docs/verify-webhook-callbacks',
            label: '[Deprecated] Validating webhook events',
            className: 'deprecated-sidebar-item',
          },
        ],
      },
      {
        type: 'doc',
        id: 'contactcenter/docs/create-a-chat-api-channel',
        label: '[Deprecated] Channel',
        className: 'deprecated-sidebar-item',
      },
      {
        type: 'doc',
        id: 'contactcenter/docs/conversation',
        label: '[Deprecated] Conversation',
        className: 'deprecated-sidebar-item',
      },
      {
        type: 'doc',
        id: 'contactcenter/docs/troubleshooting',
        label: '[Deprecated] Troubleshooting',
        className: 'deprecated-sidebar-item',
      },
    ],
  },
];

module.exports = sidebarConfig;
