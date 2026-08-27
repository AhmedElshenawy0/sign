"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n, { normalizeLng } from "@/i18n";

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
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
  }, [i18nInstance.language]);

  return <>{children}</>;
}
