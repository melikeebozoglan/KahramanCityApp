import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import * as Localization from 'expo-localization'; // expo-localization'ı import ediyoruz
import en from '../assets/i18n/en.json';
import tr from '../assets/i18n/tr.json';

const resources = {
  en: {
    translation: en,
  },
  tr: {
    translation: tr,
  },
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: Localization.locale && Localization.locale.startsWith('tr') ? 'tr' : 'en', // Cihazın diline göre
    fallbackLng: 'en', // Varsayılan dil
    interpolation: {
      escapeValue: false, // XSS koruması
    },
  });

export default i18n;
