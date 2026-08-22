import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./translation/en/translation.json";
import ar from "./translation/ar/translation.json";
import fr from "./translation/fn/translation.json";

if (!i18n.isInitialized) {
  i18n.use(initReactI18next);

  i18n.init({
    resources: {
      en: { translation: en },
      ar: { translation: ar },
      fr: { translation: fr },
    },
    fallbackLng: "en",
    lng: "en",
    interpolation: { escapeValue: false },
    react: { useSuspense: false },
  });
}

export function normalizeLng(lng) {
  if (!lng) return "en";
  const lower = String(lng).toLowerCase();
  if (lower.startsWith("ar")) return "ar";
  if (lower.startsWith("fr")) return "fr";
  return "en";
}

export default i18n;
