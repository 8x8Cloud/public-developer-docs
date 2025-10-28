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
  {
    type: 'category',
    label: 'Fax as a Service (FaaS) API',
    collapsed: true,
    items: [
      {
        type: 'category',
        label: 'Webhook Fax Event Notification Controller',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'actions-events/reference/getcustomerdidfaxeventswebhooks',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/createconfigurationforfaxeventdidwebhook',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/getcustomerdefaultfaxeventswebhooks',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/createconfigurationforfaxeventdefaultwebhook',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/deleteconfigurationforfaxeventdidwebhook',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/updateconfigurationforfaxeventdidwebhook',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/deleteconfigurationforfaxeventdefaultwebhook',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/updateconfigurationforfaxeventdefaultwebhook',
          },
        ],
      },
      {
        type: 'category',
        label: 'Phones Controller',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'actions-events/reference/getcustomerassociateddidsinfo',
          },
        ],
      },
      {
        type: 'category',
        label: 'Webhook Controller',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'actions-events/reference/getcustomerwebhooks',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/createcustomerwebhook',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/getcustomerwebhook',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/deletecustomerwebhook',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/updatecustomerwebhookconfiguration',
          },
        ],
      },
      {
        type: 'category',
        label: 'health',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'actions-events/reference/getping',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/gethealth',
          },
        ],
      },
      {
        type: 'category',
        label: 'Faxes Controller',
        collapsed: true,
        items: [
          {
            type: 'doc',
            id: 'actions-events/reference/getcustomerfaxlist',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/sendfax',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/cancelfax',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/deletemultiplefaxes',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/getfaxinformation',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/deletefax',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/getfaxfile',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/getcustomerunreadfaxlist',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/getcustomerdidfaxlist',
          },
          {
            type: 'doc',
            id: 'actions-events/reference/getcustomerdidunreadfaxlist',
          },
        ],
      },
    ],
  },
];

module.exports = sidebarConfig;
