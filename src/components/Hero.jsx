import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { RadiantText } from './RadiantText';
import { InteractiveHoverButton } from './InteractiveHoverButton';
import styles from './Hero.module.css';

export function Hero() {
  const { t } = useLanguage();

  return (
    <section className={styles.hero} aria-label="Hero">
      <div className={styles.bg}>
        <motion.div
          className={styles.gradient}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2 }}
        />
        <motion.div
          className={styles.shapes}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.3 }}
        >
          <div className={styles.shape1} />
          <div className={styles.shape2} />
          <div className={styles.shape3} />
        </motion.div>
        <div className={styles.particles}>
          {[...Array(20)].map((_, i) => (
            <div key={i} className={styles.particle} style={{ '--i': i }} />
          ))}
        </div>
      </div>

      <div className={styles.content}>
        <motion.div
          className={styles.logoWrap}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <img
            src="/logo-afrihorn.png"
            alt="Afrihorn"
            className={styles.logo}
          />
        </motion.div>

        <motion.h1
          className={styles.tagline}
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
        >
          <RadiantText variant="light" duration={5} as="span">
            {t('hero.tagline')}
          </RadiantText>
        </motion.h1>

        <motion.p
          className={styles.subtitle}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
        >
          <RadiantText variant="light" duration={6} radiantWidth={120} as="span">
            {t('hero.subtitle')}
          </RadiantText>
        </motion.p>

        <motion.div
          className={styles.ctaWrap}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <InteractiveHoverButton
            as="a"
            href="#services"
            variant="primary"
            className={styles.ctaHero}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('services')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {t('hero.cta')}
          </InteractiveHoverButton>
          <InteractiveHoverButton
            as="a"
            href="#contact"
            variant="secondary"
            className={styles.ctaHero}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            {t('nav.contact')}
          </InteractiveHoverButton>
        </motion.div>
      </div>

      <motion.div
        className={styles.scrollHint}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className={styles.scrollLine} />
      </motion.div>
    </section>
  );
}
