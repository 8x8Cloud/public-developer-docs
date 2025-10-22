/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check
import sidebarActionsEventsDocs from './actions-events/docs';
import sidebarActionsEventsReference from './actions-events/reference';
import sidebarAnalyticsDocs from './analytics/docs';
import sidebarAnalyticsReference from './analytics/reference';
import sidebarConnectDocs from './connect/docs';
import sidebarConnectReference from './connect/reference';
import sidebarContactCenterDocs from './contactcenter/docs';
import sidebarContactCenterReference from './contactcenter/reference';
import sidebarJaas from './jaas';
import sidebarTechPartner from './tech-partner';

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const index = {
  sidebarActionsEventsDocs,
  sidebarActionsEventsReference,
  sidebarAnalyticsDocs,
  sidebarAnalyticsReference,
  sidebarConnectDocs,
  sidebarConnectReference,
  sidebarContactCenterDocs,
  sidebarContactCenterReference,
  sidebarJaas,
  sidebarTechPartner,
};

module.exports = index;
