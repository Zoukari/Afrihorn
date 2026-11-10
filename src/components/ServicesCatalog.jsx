import { useEffect, useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SectionTitle } from './SectionTitle';
import styles from './ServicesCatalog.module.css';

// Ordre identique à sections.1 … sections.12 dans les fichiers de traduction.
const IMAGES = [
  '/port_operations.avif',
  '/marine_services.avif',
  '/shipyard.jpg',
  '/docking_bethering_support.jpg',
  '/engineering.jpg',
  '/safety_compliance_inspection.jpg',
  '/equipment_supply.jpg',
  '/project_technical_support.jpeg',
  '/trading_agencies.jpeg',
  '/offshore_support.jpg',
  '/trading_agencies.jpeg',
  '/project_technical_support.jpeg',
];

function useIsNarrow(query = '(max-width: 900px)') {
  const [narrow, setNarrow] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setNarrow(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, [query]);
  return narrow;
}

function Detail({ n }) {
  const { t } = useLanguage();
  const title = t(`sections.${n}.title`);
  const bullets = t(`sections.${n}.bullets`);

  const requestQuote = () => {
    window.dispatchEvent(new CustomEvent('afrihorn:quote', { detail: title }));
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <article className={styles.detail} key={n}>
      <div className={styles.media}>
        <img src={IMAGES[n - 1]} alt="" loading="lazy" decoding="async" />
      </div>
      <div className={styles.body}>
        <h3 className={styles.detailTitle}>{title}</h3>
        <p className={styles.desc}>{t(`sections.${n}.description`)}</p>
        {Array.isArray(bullets) && (
          <>
            <h4 className={styles.pointsLabel}>{t('services.keyPoints')}</h4>
            <ul className={styles.points}>
              {bullets.map((b) => {
                const [head, ...rest] = b.split(' – ');
                return (
                  <li key={b}>
                    <strong>{head}</strong>
                    {rest.length > 0 && <span>{rest.join(' – ')}</span>}
                  </li>
                );
              })}
            </ul>
          </>
        )}
        <button type="button" className={styles.quote} onClick={requestQuote}>
          {t('services.quote')}
        </button>
      </div>
    </article>
  );
}

export function ServicesCatalog() {
  const { t } = useLanguage();
  const narrow = useIsNarrow();
  const [active, setActive] = useState(1);

  return (
    <section id="services" className={styles.section}>
      <SectionTitle subtitle={t('services.subtitle')}>{t('nav.services')}</SectionTitle>

      <div className={styles.container}>
        <ul className={styles.list} aria-label={t('services.listLabel')}>
          {IMAGES.map((_, i) => {
            const n = i + 1;
            const on = active === n;
            return (
              <li key={n}>
                <button
                  type="button"
                  className={`${styles.item} ${on ? styles.itemActive : ''}`}
                  aria-expanded={on}
                  onClick={() => setActive(narrow && on ? 0 : n)}
                  onMouseEnter={() => !narrow && setActive(n)}
                >
                  <span>{t(`sections.${n}.title`)}</span>
                  <svg className={styles.chev} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden="true"><path d="M9 6l6 6-6 6" /></svg>
                </button>
                {narrow && on && <Detail n={n} />}
              </li>
            );
          })}
        </ul>

        {!narrow && (
          <div className={styles.panel}>
            <Detail n={active || 1} />
          </div>
        )}
      </div>
    </section>
  );
}
