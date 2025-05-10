import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

import { ENGLISH, UKRAINIAN } from './constants'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: ENGLISH,
    supportedLngs: [ENGLISH, UKRAINIAN],
    ns: ['common'],
    defaultNS: 'common',
    debug: process.env.NODE_ENV === 'development',

    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },

    interpolation: {
      escapeValue: false,
    },
    keySeparator: false,
  })

export const languageUtils = {
  changeLanguage: (lng) => i18n.changeLanguage(lng),
  getCurrentLanguage: () => i18n.language,
  getAvailableLanguages: () => [ENGLISH, UKRAINIAN],
}

export default i18n
