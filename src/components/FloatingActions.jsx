import { useLanguage } from '../context/LanguageContext';
import { whatsappLink } from '../config/site';
import styles from './FloatingActions.module.css';

const LANGS = ['en', 'fr', 'ar'];

export function FloatingActions() {
  const { lang, setLanguage } = useLanguage();
  const waLink = whatsappLink();

  return (
    <div className={styles.dock}>
      <div className={styles.lang} role="radiogroup" aria-label="Language" style={{ '--i': LANGS.indexOf(lang) }}>
        <span className={styles.thumb} aria-hidden="true" />
        {LANGS.map((code) => (
          <button
            key={code}
            type="button"
            role="radio"
            aria-checked={lang === code}
            className={lang === code ? styles.on : ''}
            onClick={() => setLanguage(code)}
          >
            {code.toUpperCase()}
          </button>
        ))}
      </div>

      {waLink && (
        <a href={waLink} target="_blank" rel="noopener noreferrer" className={styles.whatsapp} aria-label="WhatsApp">
          <svg viewBox="0 0 24 24" fill="currentColor" width="26" height="26" aria-hidden="true">
            <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91A9.85 9.85 0 0 0 12.04 2Zm5.8 14.06c-.24.68-1.42 1.32-1.96 1.38-.5.06-1.13.09-1.83-.12-.42-.13-.96-.31-1.65-.61-2.9-1.25-4.8-4.18-4.94-4.37-.14-.19-1.18-1.57-1.18-3s.75-2.13 1.02-2.42c.27-.29.58-.36.78-.36h.56c.18 0 .42-.07.66.5.24.58.82 2 .89 2.15.07.14.12.31.02.5-.1.19-.14.31-.29.48l-.43.5c-.14.14-.29.3-.13.59.17.29.74 1.22 1.59 1.97 1.09.97 2.01 1.27 2.3 1.42.29.14.46.12.63-.07.17-.19.72-.84.92-1.13.19-.29.38-.24.65-.14.27.1 1.7.8 1.99.95.29.14.48.22.55.34.07.12.07.7-.17 1.38Z" />
          </svg>
        </a>
      )}
    </div>
  );
}
