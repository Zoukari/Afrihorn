import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { SectionTitle } from './SectionTitle';
import { Globe } from './Globe';
import { REGIONS } from '../data/geo';
import styles from './Markets.module.css';

const CLIENTS = ['ports', 'navies', 'coast-guards', 'railways'];

export function Markets() {
  const { t } = useLanguage();
  const [active, setActive] = useState(REGIONS[0].id);

  return (
    <section id="markets" className={styles.section}>
      <SectionTitle tone="dark" subtitle={t('markets.subtitle')}>
        {t('nav.locations')}
      </SectionTitle>

      <div className={styles.container}>
        <div className={styles.globeCol}>
          <div className={styles.globeFrame}>
            <span className={styles.cornerTL} aria-hidden="true" />
            <span className={styles.cornerBR} aria-hidden="true" />
            <div className={styles.globe}>
              <Globe active={active} label={t('markets.regionsTitle')} />
            </div>
          </div>
          <p className={styles.legend}>
            <span className={styles.keyActive} aria-hidden="true" /> {t(`markets.regions.${active}.title`)}
            <span className={styles.keyZone} aria-hidden="true" /> {t('markets.regionsTitle')}
            <span className={styles.keyHq} aria-hidden="true" /> {t('markets.hq')}
          </p>
        </div>

        <div className={styles.side}>
          <h3 className={styles.label}>{t('markets.regionsTitle')}</h3>
          <p className={styles.hint}>{t('markets.globeHint')}</p>
          <ul className={styles.regions}>
            {REGIONS.map((r) => (
              <li key={r.id}>
                <button
                  type="button"
                  className={`${styles.region} ${active === r.id ? styles.regionActive : ''}`}
                  aria-pressed={active === r.id}
                  onClick={() => setActive(r.id)}
                  onMouseEnter={() => setActive(r.id)}
                >
                  <span className={styles.regionName}>{t(`markets.regions.${r.id}.title`)}</span>
                  <span className={styles.regionDetails}>{t(`markets.regions.${r.id}.description`)}</span>
                </button>
              </li>
            ))}
          </ul>

          <h3 className={styles.label}>{t('markets.clientsTitle')}</h3>
          <dl className={styles.clients}>
            {CLIENTS.map((c) => (
              <div key={c} className={styles.client}>
                <dt>{t(`markets.clients.${c}.title`)}</dt>
                <dd>{t(`markets.clients.${c}.description`)}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
