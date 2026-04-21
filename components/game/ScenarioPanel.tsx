"use client";

import { useI18n } from "@/lib/i18n";

type Props = {
  scenarioId: string;
  current: number;
  total: number;
};

export function ScenarioPanel({ scenarioId, current, total }: Props) {
  const { t } = useI18n();

  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-slate-500">
        {t("ui.step", { current, total })}
      </p>
      <h1 className="text-2xl font-semibold tracking-tight text-slate-900">
        {t(`scenarios.${scenarioId}.title`)}
      </h1>
      <p className="text-base leading-relaxed text-slate-600">
        {t(`scenarios.${scenarioId}.description`)}
      </p>
    </div>
  );
}
