"use client";

import { useI18n } from "@/lib/i18n";
import type { PostingStatus, TotalsResult } from "@/lib/validate";

type Props = {
  totals: TotalsResult;
  postingStatus: PostingStatus;
};

const statusStyles: Record<
  PostingStatus,
  { box: string; label: string; messageKey: string }
> = {
  incomplete: {
    box: "border-slate-200 bg-slate-50",
    label: "text-slate-600",
    messageKey: "ui.totalsIncomplete",
  },
  unbalanced: {
    box: "border-amber-200 bg-amber-50",
    label: "text-amber-900",
    messageKey: "ui.unbalanced",
  },
  balancedWrong: {
    box: "border-orange-300 bg-orange-50",
    label: "text-orange-900",
    messageKey: "ui.balancedButWrongAccounts",
  },
  correct: {
    box: "border-emerald-200 bg-emerald-50",
    label: "text-emerald-800",
    messageKey: "ui.postingCorrect",
  },
};

export function BalanceMeter({ totals, postingStatus }: Props) {
  const { t } = useI18n();
  const st = statusStyles[postingStatus];

  return (
    <div className={`rounded-lg border px-4 py-3 ${st.box}`}>
      <div className="flex flex-wrap items-baseline justify-between gap-2 text-sm">
        <span className="font-medium text-slate-700">{t("ui.totals")}</span>
        <span className={`font-medium ${st.label}`}>{t(st.messageKey)}</span>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-4 text-sm sm:grid-cols-3">
        <div>
          <span className="text-slate-500">{t("ui.debit")}</span>
          <p className="text-lg font-semibold tabular-nums text-slate-900">
            {formatMoney(totals.debitTotal)}
          </p>
        </div>
        <div>
          <span className="text-slate-500">{t("ui.credit")}</span>
          <p className="text-lg font-semibold tabular-nums text-slate-900">
            {formatMoney(totals.creditTotal)}
          </p>
        </div>
        <div className="col-span-2 sm:col-span-1">
          <span className="text-slate-500">{t("ui.difference")}</span>
          <p className="text-lg font-semibold tabular-nums text-slate-900">
            {formatMoney(totals.difference)}
          </p>
        </div>
      </div>
    </div>
  );
}

function formatMoney(n: number): string {
  return n.toLocaleString(undefined, {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
}
