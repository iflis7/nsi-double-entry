"use client";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";

import type { ChipDef } from "@/lib/types";
import { useI18n } from "@/lib/i18n";

type Props = {
  chip: ChipDef;
};

export function Chip({ chip }: Props) {
  const { t } = useI18n();
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({ id: chip.id });

  const style = transform
    ? { transform: CSS.Translate.toString(transform) }
    : undefined;

  const label = chip.labelKey ? t(`chips.${chip.labelKey}`) : null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`touch-none rounded-lg border-2 border-slate-800 bg-amber-100 px-3 py-2 shadow-sm transition-shadow ${
        isDragging ? "z-50 cursor-grabbing opacity-90 shadow-lg" : "cursor-grab"
      }`}
      {...listeners}
      {...attributes}
    >
      <p className="text-lg font-bold tabular-nums text-slate-900">
        {formatMoney(chip.amount)}
      </p>
      {label ? (
        <p className="text-xs font-medium text-slate-600">{label}</p>
      ) : null}
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
