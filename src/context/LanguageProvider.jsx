import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { LanguageContext } from './LanguageContext';
import { translations } from '../translations/dictionary';
import {
  capturePreLanguageSnapshot,
  runLanguageTypingTransition,
  cancelLanguageTypingTransition
} from '../utils/languageTypingTransition';

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    try {
      const params = new URLSearchParams(window.location.search);
      const urlLang = params.get('lang')?.toLowerCase();
      if (urlLang === 'en' || urlLang === 'es') {
        return urlLang;
      }
      return localStorage.getItem('language') || 'es';
    } catch {
      return 'es';
    }
  });

  const isFirstMountRef = useRef(true);
  const shouldAnimateTypingRef = useRef(false);

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  useLayoutEffect(() => {
    if (isFirstMountRef.current) {
      isFirstMountRef.current = false;
      return;
    }

    if (shouldAnimateTypingRef.current) {
      shouldAnimateTypingRef.current = false;
      runLanguageTypingTransition();
    }

    return () => {
      cancelLanguageTypingTransition();
    };
  }, [language]);

  const toggleLanguage = () => {
    capturePreLanguageSnapshot();
    shouldAnimateTypingRef.current = true;
    setLanguage((prev) => (prev === 'en' ? 'es' : 'en'));
  };

  const t = (path) => {
    const keys = path.split('.');
    let result = translations[language];
    for (const key of keys) {
      if (result && result[key] !== undefined) {
        result = result[key];
      } else {
        return path;
      }
    }
    return result;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
