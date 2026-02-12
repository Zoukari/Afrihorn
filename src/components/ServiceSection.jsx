import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { RadiantText } from './RadiantText';
import styles from './ServicesGrid.module.css';

export function ServiceSection({ service, index }) {
  const { t } = useLanguage();

  return (
    <section className={styles.serviceSection}>
      <div className={styles.imageContainer}>
        <motion.img
          src={service.image}
          alt={t(`services.${service.id}.title`)}
          className={styles.bgImage}
          loading="lazy"
          initial={{ scale: 1.2 }}
          whileInView={{ scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
        <div className={styles.overlay} />
      </div>

      <motion.div
        className={styles.contentWrap}
        initial={{ opacity: 0, y: 80 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: '-200px' }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <motion.h2
          className={styles.serviceTitle}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
        >
          <RadiantText variant="light" duration={5} as="span">
            {t(`services.${service.id}.title`)}
          </RadiantText>
        </motion.h2>
        <motion.p
          className={styles.serviceText}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {t(`services.${service.id}.shortDesc`)}
        </motion.p>
      </motion.div>

      <span className={styles.serviceNumber}>
        #{String(index + 1).padStart(2, '0')}
      </span>
    </section>
  );
}
