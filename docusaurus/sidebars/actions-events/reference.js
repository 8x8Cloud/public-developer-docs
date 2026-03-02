// Actions & Events API Reference Sidebar
// Based on structure from https://developer.8x8.com/actions-events/reference/

const sidebarConfig = [
  {
    type: 'category',
    label: 'Contact Center Chat Gateway',
    collapsed: true,
    items: [
      {
        type: 'category',
        label: 'WebHooks',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'actions-events/reference/getwebhooks-1',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/createwebhook-1',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/getwebhookbyid-1',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/updatewebhook-1',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/deletewebhookbyid-1',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/verifywebhook-1',
          },
        ],
      },
      {
        type: 'category',
        label: 'JwkKeys',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'actions-events/reference/getjwkpublickey-1',
          },
        ],
      },
      {
        type: 'category',
        label: 'Channels',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'actions-events/reference/getchatapichannels-1',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/createchatapichannel-1',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/getchatapichannel-1',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/updatechatapichannel-1',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/deletechatapichannelbyid-1',
          },
        ],
      },
      {
        type: 'category',
        label: 'Conversations',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'actions-events/reference/getcctransactions-1',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/createcctransaction-1',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/putcctransaction',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/patchcctransaction',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/getcctransaction-1',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/getccinteractions',
          },
          {
            type: 'doc',
            id: "actions-events/reference/createpostagentassignment",
          }
        ],
      },
      {
        type: 'category',
        label: 'Participants',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'actions-events/reference/getparticipantsforcctransaction-1',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/userparticipantleavecctransaction',
          },
        ],
      },
      {
        type: 'category',
        label: 'Messages',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'actions-events/reference/getmessagesforcctransaction-1',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/sendmessagetocctransaction-1',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/getmessagebyidforcctransaction',
          },
        ],
      },
      {
        type: 'category',
        label: 'Attachments',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'actions-events/reference/getconversationattachments',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/addconversationattachments',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/getconversationattachment',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/downloadattachmentforchatapiconversation',
          },
        ],
      },
      {
        type: "category",
        label: "Cards",
        collapsed: true,
        items: [
          {
            type: "doc",
            id: "actions-events/reference/getcardsforcctransaction",
          },
          {
            type: "doc",
            id: "actions-events/reference/updatecardactionsubmit",
          },
          {
            type: "doc",
            id: "actions-events/reference/updatecardactionexecute",
          },
        ],
      }
    ],
  },
  {
    type: 'category',
    label: 'Chapi - Chat API',
    collapsed: true,
    items: [
      {
        type: 'category',
        label: 'chat',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'actions-events/reference/sendmessageusingpost',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/getmessagesusingget-1',
          },
        ],
      },
    ],
  },
  {
    type: 'category',
    label: '8x8 Contact Center Dynamic Campaigns',
    collapsed: true,
    items: [
      {
        type: 'category',
        label: 'Campaign Control',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'actions-events/reference/changecampaignstatus',
          },
        ],
      },
      {
        type: 'category',
        label: 'Record Management',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'actions-events/reference/addcustomer',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/deletecustomer',
          },
        ],
      },
    ],
  },
  {
    type: 'category',
    label: 'Contact Center Agent Status API',
    collapsed: true,
    items: [
      {
        type: 'category',
        label: 'Agent status',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'actions-events/reference/getagentsstatus',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/setagentsstatuses',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/getagentstatus',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/setagentstatus',
          },
        ],
      },
    ],
  },
  {
    type: 'category',
    label: '8x8 Contact Center Call API',
    collapsed: true,
    items: [
      {
        type: 'category',
        label: 'Phone calls',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'actions-events/reference/place-phone-call',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/add-transaction-codes',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/delete-phone-interaction',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/hangup-agent-handling-interaction',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/hangup-agent-line',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/hangup-agent-lines',
          },
        ],
      },
    ],
  },
  {
    type: 'category',
    label: '8x8 Contact Center Chat API V2',
    collapsed: true,
    items: [
      {
        type: 'category',
        label: 'Authentication',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'actions-events/reference/createaccesstoken',
          },
        ],
      },
      {
        type: 'category',
        label: 'WebHooks',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'actions-events/reference/getwebhooks',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/createwebhook',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/getwebhookbyid',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/updatewebhook',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/deletewebhookbyid',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/verifywebhook',
          },
        ],
      },
      {
        type: 'category',
        label: 'JwkKeys',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'actions-events/reference/getjwkpublickey',
          },
        ],
      },
      {
        type: 'category',
        label: 'Channels',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'actions-events/reference/getchatapichannels',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/createchatapichannel',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/getchatapichannel',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/updatechatapichannel',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/deletechatapichannelbyid',
          },
        ],
      },
      {
        type: 'category',
        label: 'Conversations',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'actions-events/reference/getcctransactions',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/createcctransaction',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/getcctransaction',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/getparticipantsforcctransaction',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/customerparticipantleavecctransaction',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/getmessagesforcctransaction',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/sendmessagetocctransaction',
          },
        ],
      },
    ],
  },
];

module.exports = sidebarConfig;
