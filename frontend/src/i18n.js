import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import Backend from 'i18next-http-backend'
import { initReactI18next } from 'react-i18next'

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    supportedLngs: ['en', 'uk'],
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
  getAvailableLanguages: () => ['en', 'uk'],
}

export default i18n
