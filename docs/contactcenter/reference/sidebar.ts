import type { SidebarsConfig } from "@docusaurus/plugin-content-docs";

const sidebar: SidebarsConfig = {
  apisidebar: [
    {
      type: "doc",
      id: "contactcenter/reference/8-x-8-contact-center-chat-api",
    },
    {
      type: "category",
      label: "Authentication",
      items: [
        {
          type: "doc",
          id: "contactcenter/reference/createaccesstoken",
          label: "Creates a new access token that can be used for API access.",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "WebHooks",
      items: [
        {
          type: "doc",
          id: "contactcenter/reference/getwebhooks",
          label: "Retrieves all customer webhooks based on the associated token information.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contactcenter/reference/createwebhook",
          label: "Creates a new customer webhook.",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "contactcenter/reference/getwebhookbyid",
          label: "Get webhook by Id.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contactcenter/reference/updatewebhook",
          label: "Updates the full webhook resource by Id.",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "contactcenter/reference/deletewebhookbyid",
          label: "Deletes the webhook by Id.",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "contactcenter/reference/verifywebhook",
          label: "The endpoint used to validate that the webhook is working and reachable.",
          className: "api-method post",
        },
      ],
    },
    {
      type: "category",
      label: "JwkKeys",
      items: [
        {
          type: "doc",
          id: "contactcenter/reference/getjwkpublickey",
          label: "Returns the public JWK.",
          className: "api-method get",
        },
      ],
    },
    {
      type: "category",
      label: "Channels",
      items: [
        {
          type: "doc",
          id: "contactcenter/reference/getchatapichannels",
          label: "Retrieves all customer Chat API channels.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contactcenter/reference/createchatapichannel",
          label: "Creates a channel.",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "contactcenter/reference/getchatapichannel",
          label: "Get ChatAPI channel by Id.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contactcenter/reference/updatechatapichannel",
          label: "Update ChatAPI channel by Id.",
          className: "api-method put",
        },
        {
          type: "doc",
          id: "contactcenter/reference/deletechatapichannelbyid",
          label: "Delete ChatAPI channel by Id.",
          className: "api-method delete",
        },
      ],
    },
    {
      type: "category",
      label: "Conversations",
      items: [
        {
          type: "doc",
          id: "contactcenter/reference/getcctransactions",
          label: "Returns all conversations belonging to the customer.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contactcenter/reference/createcctransaction",
          label: "Creates a new conversation.",
          className: "api-method post",
        },
        {
          type: "doc",
          id: "contactcenter/reference/getcctransaction",
          label: "Retrieves conversation details.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contactcenter/reference/getparticipantsforcctransaction",
          label: "Retrieve the conversation participants.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contactcenter/reference/customerparticipantleavecctransaction",
          label: "Customers leaves conversation.",
          className: "api-method delete",
        },
        {
          type: "doc",
          id: "contactcenter/reference/getmessagesforcctransaction",
          label: "Retrieves the conversation messages.",
          className: "api-method get",
        },
        {
          type: "doc",
          id: "contactcenter/reference/sendmessagetocctransaction",
          label: "Send a message.",
          className: "api-method post",
        },
      ],
    },
  ],
};

export default sidebar.apisidebar;
