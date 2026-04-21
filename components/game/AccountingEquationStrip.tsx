"use client";

import { useI18n } from "@/lib/i18n";

export function AccountingEquationStrip() {
  const { t } = useI18n();
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-center text-sm font-medium text-slate-800">
      {t("equation")}
    </div>
  );
}
