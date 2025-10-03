import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

// Import translation files
import challengesEN from '@/locales/en/challenges.json';
import commonEN from '@/locales/en/common.json';
import navigationEN from '@/locales/en/navigation.json';
import vocabularyEN from '@/locales/en/vocabulary.json';

import challengesZH from '@/locales/zh/challenges.json';
import commonZH from '@/locales/zh/common.json';
import navigationZH from '@/locales/zh/navigation.json';
import vocabularyZH from '@/locales/zh/vocabulary.json';

const resources = {
  en: {
    common: commonEN,
    navigation: navigationEN,
    vocabulary: vocabularyEN,
    challenges: challengesEN,
  },
  zh: {
    common: commonZH,
    navigation: navigationZH,
    vocabulary: vocabularyZH,
    challenges: challengesZH,
  },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    supportedLngs: ['en', 'zh'],
    defaultNS: 'common',
    ns: ['common', 'navigation', 'vocabulary', 'challenges'],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
      lookupLocalStorage: 'app-language',
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;

