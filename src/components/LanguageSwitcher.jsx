import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import styles from './LanguageSwitcher.module.css';

export function LanguageSwitcher() {
  const { lang, setLanguage } = useLanguage();

  return (
    <motion.div
      className={styles.wrapper}
      initial={{ opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <button
        type="button"
        className={`${styles.btn} ${lang === 'en' ? styles.active : ''}`}
        onClick={() => setLanguage('en')}
        aria-pressed={lang === 'en'}
        aria-label="English"
      >
        EN
      </button>
      <button
        type="button"
        className={`${styles.btn} ${lang === 'fr' ? styles.active : ''}`}
        onClick={() => setLanguage('fr')}
        aria-pressed={lang === 'fr'}
        aria-label="Français"
      >
        FR
      </button>
    </motion.div>
  );
}
