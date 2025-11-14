import React from 'react';
import DocRoot from '@theme-original/DocRoot';
import Layout from '@site/docusaurus/components/Layout';
import SectionNavigation from '@site/docusaurus/components/SectionNavigation';

export default function DocRootWrapper(props) {
  return (
    <Layout>
      <SectionNavigation />
      <DocRoot {...props} />
    </Layout>
  );
}
