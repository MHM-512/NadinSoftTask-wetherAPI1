import i18n from "i18next";
import { initReactI18next } from "react-i18next";
// import en from "./locales/en.json";
// import fa from "./locales/fa.json";
import en from "./en.json"
import fa from "./fa.json"

export const LANGUAGE_STORAGE_KEY = "weather-dashboard-lang";

export type AppLanguage = "en" | "fa";

function readStoredLanguage(): AppLanguage {
  try {
    const stored = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (stored === "fa" || stored === "en") {
      return stored;
    }
  } catch {

  }
  return "en";
}

void i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en },
    fa: { translation: fa },
  },
  lng: readStoredLanguage(),
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

i18n.on("languageChanged", (language) => {
  try {
    localStorage.setItem(LANGUAGE_STORAGE_KEY, language);
  } catch {
  }
});

export default i18n;
