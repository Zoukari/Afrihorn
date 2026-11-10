import { useLanguage } from '../context/LanguageContext';
import { SITE, whatsappLink } from '../config/site';
import styles from './Footer.module.css';

const NAV = [
  ['about', 'nav.about'],
  ['markets', 'nav.locations'],
  ['services', 'nav.services'],
  ['contact', 'nav.contact'],
];

export function Footer() {
  const { t } = useLanguage();
  const wa = whatsappLink();

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <nav className={styles.nav} aria-label="Footer">
          {NAV.map(([id, key]) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); }}
            >
              {t(key)}
            </a>
          ))}
        </nav>

        <div className={styles.contact}>
          {SITE.phone && <a href={`tel:${SITE.phone.replace(/\s/g, '')}`}>{SITE.phone}</a>}
          {SITE.email && <a href={`mailto:${SITE.email}`}>{SITE.email}</a>}
          {wa && <a href={wa} target="_blank" rel="noopener noreferrer">WhatsApp</a>}
        </div>

        <p className={styles.copy}>
          © {new Date().getFullYear()} Afrihorn <span aria-hidden="true">|</span>{' '}
          <a href="https://klikdj.com" target="_blank" rel="noopener noreferrer">Klik</a>
        </p>
      </div>
    </footer>
  );
}
