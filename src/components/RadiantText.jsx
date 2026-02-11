import styles from './RadiantText.module.css';

const ROSE = '#e11d48';
const ROSE_LIGHT = '#f43f5e';

export function RadiantText({
  children,
  className = '',
  duration = 10,
  radiantWidth = 100,
  variant = 'dark',
  as: Tag = 'span'
}) {
  const style = {
    '--radiant-duration': `${duration}s`,
    '--radiant-width': `${radiantWidth}px`,
    '--radiant-rose': ROSE,
    '--radiant-rose-light': ROSE_LIGHT
  };
  return (
    <Tag
      className={`${styles.wrap} ${variant === 'light' ? styles.wrapLight : ''} ${className}`.trim()}
      style={style}
    >
      <span className={variant === 'light' ? styles.baseLight : styles.base}>
        {children}
      </span>
      <span className={variant === 'light' ? styles.sweepLight : styles.sweep} aria-hidden="true">
        {children}
      </span>
    </Tag>
  );
}
