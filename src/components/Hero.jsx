import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import styles from './Hero.module.css';

// Secteurs clients, avec un pictogramme simple pour chacun.
const SECTORS = [
  { id: 'ports', icon: <><path d="M4 21h16" /><path d="M6 21V9h4v12" /><path d="M10 9l7-5v3" /><path d="M17 7v4" /><rect x="14" y="11" width="6" height="4" /></> },
  { id: 'navies', icon: <><path d="M3 16l2 4h14l2-4H3Z" /><path d="M6 16v-4h12v4" /><path d="M12 12V5" /><path d="M9 8h6" /></> },
  { id: 'coast-guards', icon: <><circle cx="12" cy="12" r="8" /><circle cx="12" cy="12" r="3.5" /><path d="M6.3 6.3l3.2 3.2M14.5 14.5l3.2 3.2M17.7 6.3l-3.2 3.2M9.5 14.5l-3.2 3.2" /></> },
  { id: 'railways', icon: <><rect x="6" y="3" width="12" height="13" rx="2" /><path d="M6 10h12" /><circle cx="9" cy="13" r="0.6" /><circle cx="15" cy="13" r="0.6" /><path d="M8 20l2-4M16 20l-2-4" /></> },
];

function go(e, id) {
  e.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
}

export function Hero() {
  const { t } = useLanguage();
  const reduce = useReducedMotion();
  const rise = (delay) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section className={styles.hero} aria-label="Afrihorn">
      <div className={styles.bg} aria-hidden="true" />
      <div className={styles.shade} aria-hidden="true" />

      <div className={styles.inner}>
        <div className={styles.content}>
          <motion.p className={styles.kicker} {...rise(0.1)}>
            <span className={styles.kickerBar} aria-hidden="true" />
            {t('hero.kicker')}
          </motion.p>

          <motion.h1 className={styles.title} {...rise(0.2)}>
            {t('hero.title')}
          </motion.h1>

          <motion.p className={styles.subtitle} {...rise(0.35)}>
            {t('hero.subtitle')}
          </motion.p>

          <motion.div className={styles.actions} {...rise(0.5)}>
            <a href="#services" className={styles.primary} onClick={(e) => go(e, 'services')}>
              {t('hero.cta')}
            </a>
            <a href="#contact" className={styles.secondary} onClick={(e) => go(e, 'contact')}>
              {t('nav.contact')}
            </a>
          </motion.div>
        </div>

      </div>

      <motion.ul
        className={styles.sectors}
        aria-label={t('markets.clientsTitle')}
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
      >
        {SECTORS.map((s) => (
          <li key={s.id}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {s.icon}
            </svg>
            <span>{t(`markets.clients.${s.id}.title`)}</span>
          </li>
        ))}
      </motion.ul>

      <div className={styles.waterline} aria-hidden="true" />
    </section>
  );
}
