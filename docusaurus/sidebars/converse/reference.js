// Converse API Reference Sidebar
// Reference pages under converse/reference/ are generated from docs_oas/converse/
// by `yarn reference` — do not edit those files by hand.
// Webhook APIs are hand-written guides under converse/docs/ and are listed here
// alongside the API they belong to.

const sidebarConfig = [
  {
    type: 'category',
    label: 'Converse 2.0 API',
    collapsed: false,
    items: [
      {
        type: 'doc',
        id: 'converse/docs/api-overview',
      },
      {
        type: 'category',
        label: 'Conversation API',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'converse/reference/close-conversation',
          },
          {
            type: 'doc',
            id: 'converse/reference/transfer-conversation',
          },
          {
            type: 'doc',
            id: 'converse/reference/list-active-conversations-by-contact',
          },
        ],
      },
      {
        type: 'category',
        label: 'Messaging API',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'converse/reference/send-mt-message',
          },
        ],
      },
      {
        type: 'category',
        label: 'Notifications',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'converse/docs/conversation-status-update-notification',
          },
        ],
      },
      {
        type: 'category',
        label: 'Bot',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'converse/docs/bot-integration',
          },
          {
            type: 'doc',
            id: 'converse/reference/bot-response-reply',
          },
          {
            type: 'doc',
            id: 'converse/reference/bot-response-transfer',
          },
          {
            type: 'doc',
            id: 'converse/reference/bot-response-close',
          },
          {
            type: 'doc',
            id: 'converse/reference/bot-response-list',
          },
        ],
      },
      {
        type: 'category',
        label: 'Reporting API',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'converse/reference/get-conversations-report',
          },
          {
            type: 'doc',
            id: 'converse/reference/get-chats-report',
          },
          {
            type: 'doc',
            id: 'converse/reference/get-agents-report',
          },
        ],
      },
      {
        type: 'category',
        label: 'Setup API',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'converse/reference/list-channel-accounts',
          },
          {
            type: 'doc',
            id: 'converse/reference/list-agents',
          },
          {
            type: 'doc',
            id: 'converse/reference/list-queues',
          },
          {
            type: 'doc',
            id: 'converse/reference/add-queue-disposition',
          },
          {
            type: 'doc',
            id: 'converse/reference/check-autoresponder',
          },
        ],
      },
    ],
  },
];

module.exports = sidebarConfig;
