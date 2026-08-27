import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "category",
      label: "Converse 2.0 Bot Response API",
      items: [
        {
          type: "doc",
          id: "converse/reference/bot-response-reply",
          label: "Reply to the customer",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "converse/reference/bot-response-transfer",
          label: "Transfer the conversation",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "converse/reference/bot-response-close",
          label: "Close the conversation",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "converse/reference/bot-response-list",
          label: "Look up queues, agents and dispositions",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Converse 2.0 Conversation API",
      items: [
        {
          type: "doc",
          id: "converse/reference/close-conversation",
          label: "Close a conversation",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "converse/reference/transfer-conversation",
          label: "Transfer a conversation",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "converse/reference/list-active-conversations-by-contact",
          label: "List a contact's active conversations",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Converse 2.0 MT Messaging API",
      items: [
        {
          type: "doc",
          id: "converse/reference/send-mt-message",
          label: "Send a message to a customer",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Converse 2.0 Reporting API",
      items: [
        {
          type: "doc",
          id: "converse/reference/get-conversations-report",
          label: "Get conversations data",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "converse/reference/get-chats-report",
          label: "Get chats data",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "converse/reference/get-agents-report",
          label: "Get agent data",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "Converse 2.0 Setup API",
      items: [
        {
          type: "doc",
          id: "converse/reference/list-channel-accounts",
          label: "List channel accounts",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "converse/reference/list-agents",
          label: "List agents",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "converse/reference/list-queues",
          label: "List queues",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "converse/reference/add-queue-disposition",
          label: "Add a disposition to a queue",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "converse/reference/check-autoresponder",
          label: "Check business hours and get the autoresponder message",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
