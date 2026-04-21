"use client";

import { useEffect, useId, useRef } from "react";

import { useI18n } from "@/lib/i18n";

type Props = {
  open: boolean;
  onClose: () => void;
  scenarioId: string;
};

export function HintModal({ open, onClose, scenarioId }: Props) {
  const { t } = useI18n();
  const titleId = useId();
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    closeBtnRef.current?.focus();
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      role="presentation"
    >
      <button
        type="button"
        className="absolute inset-0 bg-black/40"
        aria-label={t("ui.close")}
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-slate-200 bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id={titleId} className="text-lg font-semibold text-slate-900">
          {t(`scenarios.${scenarioId}.hintTitle`)}
        </h2>
        <p className="mt-4 leading-relaxed text-slate-700">
          {t(`scenarios.${scenarioId}.hintBody`)}
        </p>
        <button
          ref={closeBtnRef}
          type="button"
          onClick={onClose}
          className="mt-6 rounded-lg bg-slate-900 px-5 py-2.5 font-semibold text-white hover:bg-slate-800"
        >
          {t("ui.close")}
        </button>
      </div>
    </div>
  );
}
