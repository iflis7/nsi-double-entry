"use client";

import { useDroppable } from "@dnd-kit/core";

import type { ChipDef } from "@/lib/types";
import { BANK_ID } from "@/lib/dndIds";
import { useI18n } from "@/lib/i18n";

import { Chip } from "./Chip";

type Props = {
  chips: ChipDef[];
};

export function ChipBank({ chips }: Props) {
  const { setNodeRef, isOver } = useDroppable({ id: BANK_ID });
  const { t } = useI18n();

  return (
    <div className="space-y-2">
      <h2 className="text-sm font-semibold text-slate-700">
        {t("ui.bankTitle")}
      </h2>
      <p className="text-xs text-slate-500">{t("ui.dragHelp")}</p>
      <div
        ref={setNodeRef}
        className={`flex min-h-[5rem] flex-wrap content-start gap-3 rounded-xl border-2 border-dashed p-4 transition-colors ${
          isOver
            ? "border-slate-500 bg-slate-100"
            : "border-slate-300 bg-white"
        }`}
      >
        {chips.length === 0 ? (
          <span className="text-sm text-slate-400">—</span>
        ) : (
          chips.map((chip) => <Chip key={chip.id} chip={chip} />)
        )}
      </div>
    </div>
  );
}
