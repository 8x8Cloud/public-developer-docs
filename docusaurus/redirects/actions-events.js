// Actions & Events redirects
const redirects = [
  // docs -> docs
  {
    from: ['/actions-events', '/actions-events/docs'],
    to: '/actions-events/docs/introduction',
  },
  // reference -> reference
  {
    from: '/actions-events/reference',
    to: '/actions-events/reference/getwebhooks-1',
  },
  {
    from: '/actions-events/reference/getmessagesusingget_1',
    to: '/actions-events/reference/getmessagesusingget-1',
  },
  {
    from: '/actions-events/reference/agent-status',
    to: '/actions-events/reference/getagentsstatus',
  },
  // Redirect for renamed streaming API overview
  {
    from: '/actions-events/docs/streaming-api-overview',
    to: '/actions-events/docs/legacy-streaming-api-overview',
  },
];

module.exports = redirects;
