import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import styles from './Header.module.css';

const LANGS = [
  ['en', 'English'],
  ['fr', 'Français'],
  ['ar', 'العربية'],
];

function scrollToSection(id) {
  document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function Header() {
  const { t, lang, setLanguage } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Fermeture au clic extérieur et avec Échap
  useEffect(() => {
    if (!menuOpen) return;
    const onDown = (e) => { if (!menuRef.current?.contains(e.target)) setMenuOpen(false); };
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
    <header className={`${styles.header} ${scrolled || menuOpen ? styles.scrolled : ''}`}>
      <div className={styles.inner} ref={menuRef}>
        <a
          href="#"
          className={styles.logoLink}
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
        >
          <img src="/logo-afrihorn.png" alt="Afrihorn" className={styles.logoImg} />
        </a>

        <button
          type="button"
          className={styles.toggle}
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-controls="site-menu"
        >
          <span className={styles.toggleLabel}>Menu</span>
          <span className={`${styles.burger} ${menuOpen ? styles.burgerOpen : ''}`} aria-hidden="true">
            <span /><span /><span />
          </span>
        </button>

        <AnimatePresence>
          {menuOpen && (
            <motion.nav
              id="site-menu"
              className={styles.menu}
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.18 }}
            >
              <ul className={styles.links}>
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => { scrollToSection(item.id); setMenuOpen(false); }}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>

              <div className={styles.langs} role="group" aria-label="Language">
                {LANGS.map(([code, name]) => (
                  <button
                    key={code}
                    type="button"
                    aria-pressed={lang === code}
                    className={lang === code ? styles.langActive : ''}
                    onClick={() => { setLanguage(code); setMenuOpen(false); }}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </motion.nav>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
