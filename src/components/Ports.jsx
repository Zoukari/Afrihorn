import { useLanguage } from '../context/LanguageContext';
import { PORTS } from '../data/geo';
import styles from './Ports.module.css';

const tel = (n) => `tel:${n.replace(/\s/g, '')}`;

export function Ports() {
  const { t, lang } = useLanguage();

  return (
    <section id="ports" className={styles.section} aria-labelledby="ports-title">
      <div className={styles.inner}>
        <header className={styles.head}>
          <img src="/logo-afrihorn.png" alt="Afrihorn" className={styles.logo} loading="lazy" />
          <h2 id="ports-title" className={styles.title}>{t('portsSection.title')}</h2>
        </header>

        <div className={styles.grid}>
          {PORTS.map((p) => {
            const hasDetails = p.address.length > 0 || p.phone || p.email;
            return (
              <article key={p.id} className={styles.port}>
                <h3 className={styles.name}>Afrihorn – {p.city[lang] || p.city.en}</h3>
                <address className={styles.lines}>
                  <span>{t(`markets.ports.${p.id}`)}</span>
                  {p.address.map((line) => <span key={line}>{line}</span>)}
                  {p.phone && <a href={tel(p.phone)}>{p.phone}</a>}
                  {p.email && <a className={styles.email} href={`mailto:${p.email}`}>{p.email}</a>}
                  {!hasDetails && <span className={styles.soon}>{t('portsSection.placeholder')}</span>}
                </address>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
