"use client";

import { useI18n } from "@/lib/i18n";

export function LanguageToggle() {
  const { language, setLanguage, t } = useI18n();

  return (
    <div className="flex items-center gap-2 text-sm">
      <span className="text-slate-500">{t("ui.language")}:</span>
      {(["en", "fr"] as const).map((lang) => (
        <button
          key={lang}
          type="button"
          onClick={() => setLanguage(lang)}
          className={`rounded-md px-3 py-1 font-medium transition-colors ${
            language === lang
              ? "bg-slate-900 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
        >
          {t(`ui.${lang}`)}
        </button>
      ))}
    </div>
  );
}
