import React from 'react';
import DocRoot from '@theme-original/DocRoot';
import SectionNavigation from '@site/docusaurus/components/SectionNavigation';

export default function DocRootWrapper(props) {
  return (
    <>
      <SectionNavigation />
      <DocRoot {...props} />
    </>
  );
}
