import styles from './InteractiveHoverButton.module.css';

export function InteractiveHoverButton({
  children,
  className = '',
  variant = 'default', // 'default' | 'primary' | 'secondary'
  as: Component = 'button',
  ...props
}) {
  const variantClass = variant === 'primary' ? styles.btnPrimary : variant === 'secondary' ? styles.btnSecondary : '';
  return (
    <Component
      className={`${styles.btn} ${variantClass} ${className}`.trim()}
      {...props}
    >
      <div className={styles.content}>
        <span className={styles.dot} />
        <span className={styles.textStatic}>{children}</span>
      </div>
      <div className={styles.contentHover}>
        <span className={styles.textHover}>{children}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className={styles.arrow}
        >
          <path d="M5 12h14" />
          <path d="m12 5 7 7-7 7" />
        </svg>
      </div>
    </Component>
  );
}
