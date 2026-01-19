// Administration redirects
const redirects = [
  // docs -> docs
  {
    from: ['/administration', '/administration/docs'],
    to: '/administration/docs/overview',
  },
  // reference landing page
  {
    from: '/administration/reference',
    to: '/administration/docs/api-reference-overview',
  },
  // Contact Management - moved from analytics
  {
    from: '/analytics/docs/search-contacts',
    to: '/administration/docs/search-contacts',
  },
  {
    from: '/analytics/docs/create-contact',
    to: '/administration/docs/create-contact',
  },
  {
    from: '/analytics/docs/contact-object-structure-guide',
    to: '/administration/docs/contact-object-structure-guide',
  },
  {
    from: '/analytics/docs/contact-search',
    to: '/administration/docs/search-contacts',
  },
];

module.exports = redirects;
