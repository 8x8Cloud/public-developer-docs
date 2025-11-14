import React from 'react';
import Link from '@docusaurus/Link';

import styles from './card.module.css';

/**
 * Unified Card component that supports two display modes:
 * 1. Description card: Shows title + description, entire card is clickable
 * 2. List card: Shows title + list of links
 *
 * @param {Object} props - Component props
 * @param {string} props.title - Card title displayed at the top (required)
 * @param {string} [props.description] - Description text for description-based cards (optional)
 * @param {string} [props.link] - Single URL that makes the entire card clickable, used with description cards (optional)
 * @param {Array<{label: string, link: string}>} [props.items] - Array of link objects for list-based cards with multiple links (optional)
 * @param {string} [props.className] - Additional CSS class name for custom styling (optional)
 * @returns {JSX.Element} Card component
 *
 * @example
 * // Description card (entire card clickable)
 * <Card
 *   title="XCaaS Analytics"
 *   description="Access to analytics and recordings"
 *   link="/analytics"
 *   className="custom-card"
 * />
 *
 * @example
 * // List card (multiple links)
 * <Card
 *   title="SMS API"
 *   items={[
 *     {label: 'Getting started', link: '/connect/docs/sms'},
 *     {label: 'Send SMS', link: '/connect/reference/send-sms'}
 *   ]}
 * />
 */
export default function Card({
  title,
  description,
  link,
  items,
  className = '',
}) {
  // Description card: entire card is a link
  if (description && link) {
    return (
      <Link
        to={link}
        className={`${styles.card} ${styles.cardClickable} ${className}`.trim()}
      >
        <h3>{title}</h3>
        <p className={styles.cardDescription}>{description}</p>
      </Link>
    );
  }

  // List card: contains multiple links
  if (items && items.length > 0) {
    return (
      <div className={`${styles.card} ${className}`.trim()}>
        <h3>{title}</h3>
        <ul className={styles.cardList}>
          {items.map((item, index) => (
            <li key={index}>
              <Link to={item.link}>{item.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  // Fallback: simple card with just title
  return (
    <div className={`${styles.card} ${className}`.trim()}>
      <h3>{title}</h3>
      {description && <p className={styles.cardDescription}>{description}</p>}
    </div>
  );
}
