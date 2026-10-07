"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n, { normalizeLng } from "@/i18n";
import en from "@/translation/en/translation.json";
import ar from "@/translation/ar/translation.json";

i18n.addResourceBundle("en", "translation", en, true, true);
i18n.addResourceBundle("ar", "translation", ar, true, true);

export function Providers({ children }: { children: React.ReactNode }) {
  const { i18n: i18nInstance } = useTranslation();

  useEffect(() => {
    const saved = localStorage.getItem("i18nextLng");
    const next = normalizeLng(saved || "en");
    if (next !== i18n.language) {
      i18n.changeLanguage(next);
    }
  }, []);

  useEffect(() => {
    const lang = normalizeLng(i18nInstance.language);
    const isAdmin = window.location.pathname.startsWith("/admin");
    const isStudio = window.location.pathname.startsWith("/studio");
    document.documentElement.lang = isAdmin || isStudio ? "en" : lang;
    document.documentElement.dir = isAdmin || isStudio || lang !== "ar" ? "ltr" : "rtl";
  }, [i18nInstance.language]);

  return <>{children}</>;
}
