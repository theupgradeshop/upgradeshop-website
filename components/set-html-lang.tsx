"use client";
import { useEffect } from "react";
import { useLocale } from "next-intl";

export function SetHtmlLang() {
  const locale = useLocale();
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "he" ? "rtl" : "ltr";
  }, [locale]);
  return null;
}
