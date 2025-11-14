import styles from './hero.module.css';

export default function Hero({ children }) {
  return <div className={styles.hero}>{children}</div>;
}

export function Logo({ children }) {
  return <div className={styles.logo}>{children}</div>;
}
