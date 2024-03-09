import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import kzTranslation from './translation/kz.json';
import ruTranslation from './translation/ru.json';
import enTranslation from './translation/en.json';

i18n.use(initReactI18next).init({
  resources: {
    kz: {
      translation: kzTranslation,
    },
    ru: {
      translation: ruTranslation,
    },
    en: {
      translation: enTranslation,
    },
  },
  lng: 'ru',
  fallbackLng: 'ru',

  interpolation: {
    escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
  },
});

export { i18n };
