import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import styles from './layout.module.css';

export default function Layout({ children }) {
  const location = useLocation();
  const { siteConfig } = useDocusaurusContext();
  const { baseUrl } = siteConfig;

  // Homepage - works with any baseUrl configuration
  const isHomepage =
    location.pathname === baseUrl ||
    location.pathname === baseUrl.replace(/\/$/, '');

  if (isHomepage) {
    return <div className={styles.home}>{children}</div>;
  }

  return children;
}
