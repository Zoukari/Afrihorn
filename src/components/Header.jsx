
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import styles from './Header.module.css';

function scrollToSection(id) {
  const el = document.getElementById(id);
  el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

export function Header() {
  const { t } = useLanguage();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'about', label: t('nav.about') },
    { id: 'markets', label: t('nav.locations') },
    { id: 'services', label: t('nav.services') },
    { id: 'contact', label: t('nav.contact') },
  ];

  return (
    <motion.header
      className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className={styles.inner}>
        <motion.a
          href="#"
          className={styles.logoLink}
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.98 }}
        >
          <img
            src="/logo-afrihorn.png"
            alt="Afrihorn"
            className={styles.logoImg}
          />
        </motion.a>

        <nav className={styles.nav} role="navigation">
          <div className={styles.navGroup}>
            {navItems.map((item) => (
              <button
                key={item.id}
                type="button"
                className={styles.navLink}
                onClick={() => {
                  scrollToSection(item.id);
                  setMenuOpen(false);
                }}
              >
                {item.label}
              </button>
            ))}
          </div>
        </nav>

        <button
          type="button"
          className={styles.burger}
          onClick={() => setMenuOpen((o) => !o)}
          aria-expanded={menuOpen}
          aria-label="Menu"
        >
          <span className={menuOpen ? styles.burgerOpen : ''} />
          <span className={menuOpen ? styles.burgerOpen : ''} />
          <span className={menuOpen ? styles.burgerOpen : ''} />
        </button>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            {navItems.map((item, i) => (
              <motion.button
                key={item.id}
                type="button"
                className={styles.mobileNavLink}
                onClick={() => {
                  scrollToSection(item.id);
                  setMenuOpen(false);
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                {item.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
