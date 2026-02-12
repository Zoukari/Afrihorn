import { useLanguage } from '../context/LanguageContext';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RadiantText } from './RadiantText';
import { SectionTitle } from './SectionTitle';
import styles from './ServicesMarquee.module.css';

const servicesData = [
  { id: 'port-operations', image: '/port_operations.avif' },
  { id: 'marine-services', image: '/marine_services.avif' },
  { id: 'shipyard-operations', image: '/shipyard.jpg' },
  { id: 'docking-berthing', image: '/docking_bethering_support.jpg' },
  { id: 'engineering-fabrication', image: '/engineering.jpg' },
  { id: 'safety-compliance', image: '/safety_compliance_inspection.jpg' },
  { id: 'equipment-supply', image: '/equipment_supply.jpg' },
  { id: 'project-technical', image: '/project_technical_support.jpeg' },
  { id: 'logistics-supply', image: '/trading_agencies.jpeg' },
  { id: 'offshore-support', image: '/offshore_support.jpg' },
  { id: 'trading-agencies', image: '/trading_agencies.jpeg' },
  { id: 'consultancies-research', image: '/project_technical_support.jpeg' },
];

const firstRow = servicesData.slice(0, 6);
const secondRow = servicesData.slice(6, 12);

function ServiceCard({ service, index, onClick }) {
  const { t } = useLanguage();

  return (
    <div className={styles.card} onClick={() => onClick(index)}>
      <div className={styles.cardImageContainer}>
        <img
          src={service.image}
          alt={t(`services.${service.id}.title`)}
          className={styles.cardImage}
          loading="lazy"
        />
        <div className={styles.cardOverlay} />
        <div className={styles.cardClickLabel}>
          {t('services.clickForMore')}
        </div>
      </div>
      <div className={styles.cardContent}>
        <span className={styles.cardNumber}>
          #{String(index + 1).padStart(2, '0')}
        </span>
        <h3 className={styles.cardTitle}>
          {t(`services.${service.id}.title`)}
        </h3>
      </div>
    </div>
  );
}

function ServiceModal({ service, index, onClose }) {
  const { t } = useLanguage();

  return (
    <motion.div
      className={styles.modalOverlay}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div
        className={styles.modalContent}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.closeButton} onClick={onClose}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        
        <div className={styles.modalImageContainer}>
          <img
            src={service.image}
            alt={t(`services.${service.id}.title`)}
            className={styles.modalImage}
          />
          <div className={styles.modalImageOverlay} />
        </div>

        <div className={styles.modalTextContent}>
          <span className={styles.modalNumber}>
            #{String(index + 1).padStart(2, '0')}
          </span>
          <h2 className={styles.modalTitle}>
            <RadiantText variant="dark" duration={5} as="span">
              {t(`services.${service.id}.title`)}
            </RadiantText>
          </h2>
          <p className={styles.modalDescription}>
            {t(`services.${service.id}.shortDesc`)}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function ServicesMarquee() {
  const { t } = useLanguage();
  const [selectedService, setSelectedService] = useState(null);

  return (
    <section className={styles.section} id="services">
      <SectionTitle>
        {t('nav.services')}
      </SectionTitle>

      <div className={styles.marqueeContainer}>
        {/* Premier marquee */}
        <div className={styles.marquee}>
          {[...Array(4)].map((_, repeatIndex) => (
            <div key={repeatIndex} className={styles.marqueeContent}>
              {firstRow.map((service, idx) => (
                <ServiceCard
                  key={`${service.id}-${repeatIndex}`}
                  service={service}
                  index={idx}
                  onClick={setSelectedService}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Deuxième marquee (inverse) */}
        <div className={`${styles.marquee} ${styles.marqueeReverse}`}>
          {[...Array(4)].map((_, repeatIndex) => (
            <div key={repeatIndex} className={styles.marqueeContent}>
              {secondRow.map((service, idx) => (
                <ServiceCard
                  key={`${service.id}-${repeatIndex}`}
                  service={service}
                  index={idx + 6}
                  onClick={setSelectedService}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Gradients sur les côtés */}
        <div className={styles.gradientLeft} />
        <div className={styles.gradientRight} />
      </div>

      <AnimatePresence>
        {selectedService !== null && (
          <ServiceModal
            service={servicesData[selectedService]}
            index={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}
