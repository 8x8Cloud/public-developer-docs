// Contact Center API Reference Sidebar
// Based on structure from https://developer.8x8.com/contactcenter/reference/

const sidebarConfig = [
  {
    type: 'category',
    label: '8x8 Contact Center Chat API',
    collapsed: true,
    items: [
      {
        type: 'category',
        label: 'Authentication',
        collapsed: true,
        items: ['contactcenter/reference/createaccesstoken'],
      },
    ],
  },
  {
    type: 'category',
    label: 'WebHooks',
    collapsed: true,
    items: [
      'contactcenter/reference/getwebhooks',
      'contactcenter/reference/createwebhook',
      'contactcenter/reference/getwebhookbyid',
      'contactcenter/reference/updatewebhook',
      'contactcenter/reference/deletewebhookbyid',
      'contactcenter/reference/verifywebhook',
    ],
  },
  {
    type: 'category',
    label: 'JwkKeys',
    collapsed: true,
    items: ['contactcenter/reference/getjwkpublickey'],
  },
  {
    type: 'category',
    label: 'Channels',
    collapsed: true,
    items: [
      'contactcenter/reference/getchatapichannels',
      'contactcenter/reference/createchatapichannel',
      'contactcenter/reference/getchatapichannel',
      'contactcenter/reference/updatechatapichannel',
      'contactcenter/reference/deletechatapichannelbyid',
    ],
  },
  {
    type: 'category',
    label: 'Conversations',
    collapsed: true,
    items: [
      'contactcenter/reference/getcctransactions',
      'contactcenter/reference/createcctransaction',
      'contactcenter/reference/getcctransaction',
      'contactcenter/reference/getparticipantsforcctransaction',
      'contactcenter/reference/customerparticipantleavecctransaction',
      'contactcenter/reference/getmessagesforcctransaction',
      'contactcenter/reference/sendmessagetocctransaction',
    ],
  },
];

module.exports = sidebarConfig;
