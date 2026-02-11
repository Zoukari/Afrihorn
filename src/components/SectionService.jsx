import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import styles from './SectionService.module.css';

// Map each section to a different crop of the services visual (0.png)
const bgPositions = {
  1: '10% 10%',
  2: '50% 10%',
  3: '90% 10%',
  4: '10% 50%',
  5: '50% 50%',
  6: '90% 50%',
  7: '10% 90%',
  8: '50% 90%',
  9: '90% 90%',
  10: '30% 30%',
  11: '70% 30%',
  12: '50% 70%',
};

export function SectionService({ id, alternate }) {
  const { t } = useLanguage();
  const title = t(`sections.${id}.title`);
  const description = t(`sections.${id}.description`);
  const bullets = t(`sections.${id}.bullets`);
  const list = Array.isArray(bullets) ? bullets : (bullets ? [bullets] : []);

  const bgPos = bgPositions[id] ?? '50% 50%';

  return (
    <section
      id={`section-${id}`}
      className={`${styles.section} ${alternate ? styles.alternate : ''}`}
    >
      <div className={styles.container}>
        <motion.article
          className={styles.card}
          style={{ '--service-bg-pos': bgPos }}
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5 }}
          whileHover={{ scale: 1.03, boxShadow: '0 28px 60px rgba(0,0,0,0.24)' }}
        >
          <motion.h3
            className={styles.title}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            {title}
          </motion.h3>
          <motion.p
            className={styles.description}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            {description}
          </motion.p>
          <ul className={styles.list}>
            {list.map((item, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -15 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: 0.15 + i * 0.05 }}
              >
                {item}
              </motion.li>
            ))}
          </ul>
        </motion.article>
      </div>
    </section>
  );
}
