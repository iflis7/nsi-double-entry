"use client";

import { useI18n } from "@/lib/i18n";

import { LanguageToggle } from "./LanguageToggle";

type Props = {
  onStart: () => void;
};

function ArrowUp({ label }: { label: string }) {
  return (
    <span className="inline-flex align-middle" aria-label={label} title={label}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-[1.2em] w-[1.2em] shrink-0 text-emerald-600"
        aria-hidden
      >
        <path
          fillRule="evenodd"
          d="M11.47 2.47a.75.75 0 0 1 1.06 0l7.5 7.5a.75.75 0 1 1-1.06 1.06l-6.22-6.22V21a.75.75 0 0 1-1.5 0V4.81l-6.22 6.22a.75.75 0 1 1-1.06-1.06l7.5-7.5Z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
}

function ArrowDown({ label }: { label: string }) {
  return (
    <span className="inline-flex align-middle" aria-label={label} title={label}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        className="h-[1.2em] w-[1.2em] shrink-0 text-red-600"
        aria-hidden
      >
        <path
          fillRule="evenodd"
          d="M12 2.25a.75.75 0 0 1 .75.75v16.19l6.22-6.22a.75.75 0 1 1 1.06 1.06l-7.5 7.5a.75.75 0 0 1-1.06 0l-7.5-7.5a.75.75 0 1 1 1.06-1.06l6.22 6.22V3a.75.75 0 0 1 .75-.75Z"
          clipRule="evenodd"
        />
      </svg>
    </span>
  );
}

function RuleLine({
  prefixKey,
  incKey,
  decKey,
}: {
  prefixKey: string;
  incKey: string;
  decKey: string;
}) {
  const { t } = useI18n();
  const incAria = t("intro.ariaIncrease");
  const decAria = t("intro.ariaDecrease");
  return (
    <li className="text-slate-700">
      {t(prefixKey)}
      <ArrowUp label={incAria} /> {t(incKey)}
      <span className="text-slate-500"> · </span>
      <ArrowDown label={decAria} /> {t(decKey)}
    </li>
  );
}

function RevenueExpenseRule() {
  const { t } = useI18n();
  const incAria = t("intro.ariaIncrease");
  return (
    <li className="text-slate-700">
      {t("intro.ruleRevPrefix")}
      <ArrowUp label={incAria} /> {t("intro.ruleRevAfterInc")}
      {t("intro.ruleExpMid")}
      <ArrowUp label={incAria} /> {t("intro.ruleExpAfterInc")}
    </li>
  );
}

export function IntroScreen({ onStart }: Props) {
  const { t } = useI18n();

  return (
    <div className="mx-auto max-w-2xl space-y-8 px-4 py-10">
      <div className="flex justify-end">
        <LanguageToggle />
      </div>

      <div className="space-y-3">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900">
          {t("intro.title")}
        </h1>
        <p className="text-lg leading-relaxed text-slate-700">{t("intro.lead")}</p>
      </div>

      <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-4 text-center text-base font-semibold text-slate-900">
        {t("intro.equation")}
      </div>

      <div className="space-y-3">
        <p className="font-semibold text-slate-900">{t("intro.rulesIntro")}</p>
        <ul className="list-disc space-y-2 pl-5">
          <RuleLine
            prefixKey="intro.ruleAssetsPrefix"
            incKey="intro.ruleAssetsInc"
            decKey="intro.ruleAssetsDec"
          />
          <RuleLine
            prefixKey="intro.ruleLiabilitiesPrefix"
            incKey="intro.ruleLiabilitiesInc"
            decKey="intro.ruleLiabilitiesDec"
          />
          <RuleLine
            prefixKey="intro.ruleEquityPrefix"
            incKey="intro.ruleEquityInc"
            decKey="intro.ruleEquityDec"
          />
          <RevenueExpenseRule />
        </ul>
      </div>

      <button
        type="button"
        onClick={onStart}
        className="w-full rounded-xl bg-emerald-700 px-6 py-4 text-lg font-semibold text-white hover:bg-emerald-800 sm:w-auto"
      >
        {t("intro.start")}
      </button>
    </div>
  );
}
