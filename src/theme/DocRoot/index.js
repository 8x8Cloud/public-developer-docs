import React from 'react';
import DocRoot from '@theme-original/DocRoot';
import Layout from '@site/docusaurus/components/Layout';
import SectionNavigation from '@site/docusaurus/components/SectionNavigation';
import { OxygenProvider } from '@8x8/oxygen-config';
import { useColorMode } from '@docusaurus/theme-common';

export default function DocRootWrapper(props) {
  const { colorMode } = useColorMode();

  return (
    <OxygenProvider themeName={colorMode}>
      <Layout>
        <SectionNavigation />
        <DocRoot {...props} />
      </Layout>
    </OxygenProvider>
  );
}
