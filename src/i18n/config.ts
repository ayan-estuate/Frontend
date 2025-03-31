import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './locales/en.json';
import es from './locales/es.json';
import fr from './locales/fr.json';
import de from './locales/de.json';
import it from './locales/it.json';
import pt from './locales/pt.json';
import nl from './locales/nl.json';
import pl from './locales/pl.json';
import ru from './locales/ru.json';
import zh from './locales/zh.json';

const resources = {
  en,
  es,
  fr,
  de,
  it,
  pt,
  nl,
  pl,
  ru,
  zh
};

let savedLanguage = 'en';
if (typeof window !== 'undefined') {
  savedLanguage = localStorage.getItem('language') || 'en';
}

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: 'en',
  lng: savedLanguage,
  ns: ['translations'],
  defaultNS: 'translations',
  interpolation: {
    escapeValue: false
  }
});

export default i18n;
