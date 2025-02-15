import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import translationEN from './constants/en/en_translation.json';
import translationHU from './constants/hu/hu_translation.json';

i18n
  .use(initReactI18next) // A react-i18next integrációja
  .init({
    resources: {
      en: {
        translation: translationEN,
      },
      hu: {
        translation: translationHU,
      },
    },
    lng: 'en', // Alapértelmezett nyelv (itt magyar)
    fallbackLng: 'hu', // Ha nincs fordítás, akkor angolra vált
    interpolation: {
      escapeValue: false, // React-ban nincs szükség a szövegek escape-elésére
    },
  });

export default i18n;
