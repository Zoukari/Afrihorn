import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import styles from './Header.module.css';

const LANGS = ['en', 'fr', 'ar'];

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function LangToggle() {
  const { lang, setLanguage } = useLanguage();
  const i = LANGS.indexOf(lang);
  return (
    <div className={styles.lang} role="radiogroup" aria-label="Language" style={{ '--i': i }}>
      <span className={styles.langThumb} aria-hidden="true" />
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          role="radio"
          aria-checked={lang === code}
          className={lang === code ? styles.langOn : ''}
          onClick={() => setLanguage(code)}
        >
          {code.toUpperCase()}
        </button>
      ))}
    </div>
  );
}

export function Header() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e) => { if (!ref.current?.contains(e.target)) setMenuOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setMenuOpen(false); };
    document.addEventListener('pointerdown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('pointerdown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [menuOpen]);

  const navItems = [
    { id: 'about', label: t('nav.about') },
    { id: 'markets', label: t('nav.locations') },
    { id: 'services', label: t('nav.services') },
    { id: 'contact', label: t('nav.contact') },
  ];

  return (
    <header className={`${styles.header} ${scrolled || menuOpen ? styles.scrolled : ''}`} ref={ref}>
      <div className={styles.inner}>
        <a
          href="#"
          className={styles.logoLink}
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <img src="/logo-afrihorn.png" alt="Afrihorn" className={styles.logoImg} />
        </a>

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <button key={item.id} type="button" className={styles.navLink} onClick={() => scrollToSection(item.id)}>
              {item.label}
            </button>
          ))}
        </nav>

        <LangToggle />

        <button
          type="button"
          className={styles.burger}
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label="Menu"
        >
          <span className={menuOpen ? styles.burgerOpen : ''} aria-hidden="true">
            <i /><i /><i />
          </span>
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-menu"
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
          >
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={styles.mobileLink}
                onClick={() => { scrollToSection(item.id); setMenuOpen(false); }}
              >
                {item.label}
              </button>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
