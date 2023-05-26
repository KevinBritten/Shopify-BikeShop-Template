import i18n from "i18next"
import { initReactI18next } from "react-i18next"

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        // English strings go here
      },
    },
    fr: {
      translation: {
        // French strings go here
      },
    },
  },
  lng: "en", // language to use, more information below
  interpolation: {
    escapeValue: false, // react is already safe from xss
  },
})

export default i18n
