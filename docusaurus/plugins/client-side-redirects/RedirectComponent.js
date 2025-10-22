/**
 * Redirect component for client-side navigation.
 *
 * This component is used by the client-side-redirects plugin to perform
 * React Router redirects during client-side navigation.
 *
 * The redirect target is passed via the 'redirectTarget' module prop,
 * which contains a JSON object with a 'to' property.
 */

import React from 'react';
import { Redirect } from '@docusaurus/router';

export default function RedirectComponent(props) {
  const { redirectTarget } = props;

  // redirectTarget is loaded from the JSON file created by createData
  // It contains {to: '/target/path'}
  const redirectTo = redirectTarget?.to;

  if (!redirectTo) {
    // Fallback to home if no redirect target is provided
    console.error('RedirectComponent: No redirect target provided', props);
    return <Redirect to="/" />;
  }

  return <Redirect to={redirectTo} />;
}
