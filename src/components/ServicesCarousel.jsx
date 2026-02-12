import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { RadiantText } from './RadiantText';
import styles from './ServicesCarousel.module.css';

const services = [
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

function ServiceCard({ service, index, onClick }) {
  const { t } = useLanguage();

  return (
    <motion.div
      className={styles.card}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 * index }}
      onClick={() => onClick(index)}
    >
      <div className={styles.cardImageContainer}>
        <img
          src={service.image}
          alt={t(`services.${service.id}.title`)}
          className={styles.cardImage}
          loading="lazy"
        />
        <div className={styles.cardOverlay} />
      </div>
      <div className={styles.cardContent}>
        <span className={styles.cardNumber}>
          #{String(index + 1).padStart(2, '0')}
        </span>
        <h3 className={styles.cardTitle}>
          {t(`services.${service.id}.title`)}
        </h3>
      </div>
    </motion.div>
  );
}

function ServiceModal({ service, index, onClose }) {
  const { t } = useLanguage();

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

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

export function ServicesCarousel() {
  const carouselRef = useRef(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [selectedService, setSelectedService] = useState(null);

  const checkScrollability = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  useEffect(() => {
    checkScrollability();
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', checkScrollability);
      return () => carousel.removeEventListener('scroll', checkScrollability);
    }
  }, []);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className={styles.container}>
      <div ref={carouselRef} className={styles.carousel}>
        <div className={styles.carouselInner}>
          {services.map((service, index) => (
            <ServiceCard
              key={service.id}
              service={service}
              index={index}
              onClick={setSelectedService}
            />
          ))}
        </div>
      </div>

      <div className={styles.controls}>
        <button
          className={styles.controlButton}
          disabled={!canScrollLeft}
          onClick={scrollLeft}
          aria-label="Scroll left"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </button>
        <button
          className={styles.controlButton}
          disabled={!canScrollRight}
          onClick={scrollRight}
          aria-label="Scroll right"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </div>

      <AnimatePresence>
        {selectedService !== null && (
          <ServiceModal
            service={services[selectedService]}
            index={selectedService}
            onClose={() => setSelectedService(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
