// Contact Center redirects
const redirects = [
  // docs -> docs
  {
    from: ['/contactcenter/docs', '/contactcenter/v2.0/docs'],
    to: '/contactcenter/docs/contact-center-chat',
  },
  {
    from: '/contactcenter/v2.0/docs/api-key',
    to: '/contactcenter/docs/api-key',
  },
  {
    from: '/contactcenter/v2.0/docs/conversation',
    to: '/contactcenter/docs/conversation',
  },
  {
    from: '/contactcenter/v2.0/docs/create-a-chat-api-channel',
    to: '/contactcenter/docs/create-a-chat-api-channel',
  },
  {
    from: '/contactcenter/v2.0/docs/create-a-webhook',
    to: '/contactcenter/docs/create-a-webhook',
  },
  {
    from: '/contactcenter/v2.0/docs/troubleshooting',
    to: '/contactcenter/docs/troubleshooting',
  },
  {
    from: '/contactcenter/v2.0/docs/verify-webhook-callbacks',
    to: '/contactcenter/docs/verify-webhook-callbacks',
  },
  {
    from: '/contactcenter/v2.0/docs/webhook-events-reference',
    to: '/contactcenter/docs/webhook-events-reference',
  },
  {
    from: '/contactcenter/v2.0/docs/workflow',
    to: '/contactcenter/docs/workflow',
  },
  // reference -> reference
  {
    from: [
      '/contactcenter',
      '/contactcenter/reference',
      '/contactcenter/v2.0/reference',
    ],
    to: '/contactcenter/reference/createaccesstoken',
  },
  {
    from: '/contactcenter/v2.0/reference/getchatapichannels',
    to: '/contactcenter/reference/getchatapichannels',
  },
  {
    from: '/contactcenter/v2.0/reference/updatechatapichannel',
    to: '/contactcenter/reference/updatechatapichannel',
  },
  {
    from: '/contactcenter/v2.0/reference/updatewebhook',
    to: '/contactcenter/reference/updatewebhook',
  },
  {
    from: '/contactcenter/v2.0/reference/createwebhook',
    to: '/contactcenter/reference/createwebhook',
  },
  {
    from: '/contactcenter/v2.0/reference/createchatapichannel',
    to: '/contactcenter/reference/createchatapichannel',
  },
  {
    from: '/contactcenter/v2.0/reference/createaccesstoken',
    to: '/contactcenter/reference/createaccesstoken',
  },
  {
    from: '/contactcenter/v2.0/reference/getjwkpublickey',
    to: '/contactcenter/reference/getjwkpublickey',
  },
  {
    from: '/contactcenter/v2.0/reference/createcctransaction',
    to: '/contactcenter/reference/createcctransaction',
  },
  {
    from: '/contactcenter/v2.0/reference/getcctransactions',
    to: '/contactcenter/reference/getcctransactions',
  },
];

module.exports = redirects;
