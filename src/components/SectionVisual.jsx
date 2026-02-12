import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import styles from './SectionVisual.module.css';

export function SectionVisual() {
  const { t } = useLanguage();

  return (
    <section className={styles.section} aria-label="Our services visual">
      <div className={styles.container}>
        <motion.h2
          className={styles.title}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {t('visualSection.title')}
        </motion.h2>
        <motion.div
          className={styles.imageWrap}
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6 }}
        >
          <img
            src="/0.png"
            alt="Afrihorn services - Port operations, Marine services, Shipyard and more"
            className={styles.img}
            loading="lazy"
          />
        </motion.div>
      </div>
    </section>
  );
}
