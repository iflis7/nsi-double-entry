"use client";

import { useDroppable } from "@dnd-kit/core";

import type { AccountId, ChipDef, Placement } from "@/lib/types";
import { slotId } from "@/lib/dndIds";
import { useI18n } from "@/lib/i18n";

import { Chip } from "./Chip";

type Props = {
  accountId: AccountId;
  debitChips: ChipDef[];
  creditChips: ChipDef[];
};

function Column({
  accountId,
  side,
  chips,
}: {
  accountId: AccountId;
  side: "debit" | "credit";
  chips: ChipDef[];
}) {
  const id = slotId(accountId, side);
  const { setNodeRef, isOver } = useDroppable({ id });
  const { t } = useI18n();
  const subtotal = chips.reduce((s, c) => s + c.amount, 0);

  return (
    <div className="flex min-h-[8rem] flex-1 flex-col border-slate-200">
      <div className="border-b border-slate-200 bg-slate-50 py-1 text-center text-xs font-semibold uppercase tracking-wide text-slate-600">
        {t(`ui.${side}`)}
      </div>
      <div
        ref={setNodeRef}
        className={`flex flex-1 flex-col gap-2 p-2 transition-colors ${
          isOver ? "bg-sky-50" : "bg-white"
        }`}
      >
        {chips.map((chip) => (
          <Chip key={chip.id} chip={chip} />
        ))}
      </div>
      <div className="border-t border-slate-100 px-2 py-1 text-right text-xs text-slate-500">
        {formatMoney(subtotal)}
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

export function TAccount({ accountId, debitChips, creditChips }: Props) {
  const { t } = useI18n();
  const title = t(`accounts.${accountId}`);

  return (
    <div className="overflow-hidden rounded-xl border-2 border-slate-800 bg-white shadow-sm">
      <div className="border-b-2 border-slate-800 bg-slate-100 px-3 py-2 text-center text-sm font-semibold text-slate-900">
        {title}
      </div>
      <div className="flex divide-x-2 divide-slate-800">
        <Column accountId={accountId} side="debit" chips={debitChips} />
        <Column accountId={accountId} side="credit" chips={creditChips} />
      </div>
    </div>
  );
}
