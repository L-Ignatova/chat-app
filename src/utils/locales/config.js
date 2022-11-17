import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const translationsEn = require("./en/en.json");
const translationsBg = require("./bg/bg.json");

i18n.use(initReactI18next).init({
  lng: 'en',
  fallbackLng: "en",
  resources: {
    "en": {
      translation: translationsEn
    },
    "bg": {
      translation: translationsBg
    }
  },
});

export default i18n;