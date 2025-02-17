import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './constants/en/en_translation.json';
import translationHU from './constants/hu/hu_translation.json';

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: translationEN,
    },
    hu: {
      translation: translationHU,
    },
  },
  lng: 'en',
  fallbackLng: 'hu',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
