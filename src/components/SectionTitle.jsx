import styles from './SectionTitle.module.css';

/**
 * Titre de section industriel : bloc hachuré (motif du logo) + titre condensé,
 * aligné à gauche. `tone="dark"` pour les sections sur fond sombre.
 */
export function SectionTitle({ children, subtitle, tone = 'light', aside }) {
  return (
    <div className={`${styles.container} ${tone === 'dark' ? styles.dark : ''}`}>
      <div className={styles.head}>
        <span className={styles.hatch} aria-hidden="true" />
        <h2 className={styles.title}>{children}</h2>
      </div>
      {(subtitle || aside) && (
        <div className={styles.sub}>
          {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          {aside}
        </div>
      )}
    </div>
  );
}
