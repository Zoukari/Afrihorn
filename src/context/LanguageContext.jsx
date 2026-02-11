import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import en from '../i18n/en.json';
import fr from '../i18n/fr.json';
import ar from '../i18n/ar.json';

const translations = { en, fr, ar };

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('afrihorn-lang');
        if (stored === 'en' || stored === 'fr' || stored === 'ar') return stored;
      }
    } catch (_) {}
    return 'en';
  });

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
      document.documentElement.setAttribute('lang', lang === 'ar' ? 'ar' : lang === 'fr' ? 'fr' : 'en');
    }
  }, [lang]);

  const setLanguage = useCallback((newLang) => {
    if (newLang !== 'en' && newLang !== 'fr' && newLang !== 'ar') return;
    setLang(newLang);
    try {
      localStorage.setItem('afrihorn-lang', newLang);
    } catch (_) {}
  }, []);

  const t = useCallback(
    (path) => {
      const keys = path.split('.');
      let value = translations[lang];
      for (const key of keys) {
        value = value?.[key];
      }
      return value ?? path;
    },
    [lang]
  );

  return (
    <LanguageContext.Provider value={{ lang, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider');
  return ctx;
}
