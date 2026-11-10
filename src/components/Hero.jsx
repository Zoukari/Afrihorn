import { motion, useReducedMotion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import styles from './Hero.module.css';

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

      <div className={styles.waterline} aria-hidden="true" />
    </section>
  );
}
