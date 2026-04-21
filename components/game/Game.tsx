"use client";

import {
  closestCorners,
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useCallback, useEffect, useMemo, useState } from "react";

import { BANK_ID, parseSlotId } from "@/lib/dndIds";
import { scenarios } from "@/lib/scenarios";
import type { Placement } from "@/lib/types";
import {
  allChipsPlaced,
  computeTotals,
  getPostingStatus,
  validateScenario,
} from "@/lib/validate";
import { useI18n } from "@/lib/i18n";

import { AccountingEquationStrip } from "./AccountingEquationStrip";
import { BalanceMeter } from "./BalanceMeter";
import { ChipBank } from "./ChipBank";
import { HintModal } from "./HintModal";
import { IntroScreen } from "./IntroScreen";
import { SuccessModal } from "./SuccessModal";
import { LanguageToggle } from "./LanguageToggle";
import { ScenarioPanel } from "./ScenarioPanel";
import { TAccountGrid } from "./TAccountGrid";

type Phase = "intro" | "playing" | "finished";

function initPlacements(scenario: (typeof scenarios)[number]) {
  const m = new Map<string, Placement | null>();
  for (const c of scenario.chips) {
    const initial = scenario.initialPlacements?.[c.id];
    m.set(c.id, initial !== undefined ? initial : null);
  }
  return m;
}

export function Game() {
  const { t } = useI18n();
  const [phase, setPhase] = useState<Phase>("intro");
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [placements, setPlacements] = useState(() =>
    initPlacements(scenarios[0]),
  );
  const [feedback, setFeedback] = useState<"idle" | "wrong" | "success">(
    "idle",
  );
  const [hintOpen, setHintOpen] = useState(false);
  const [successOpen, setSuccessOpen] = useState(false);

  const scenario = scenarios[scenarioIndex];
  const chips = scenario.chips;
  const totalScenarios = scenarios.length;

  useEffect(() => {
    if (phase !== "playing") return;
    setPlacements(initPlacements(scenario));
    setFeedback("idle");
    setHintOpen(false);
    setSuccessOpen(false);
  }, [scenario.id, phase]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  const bankChips = useMemo(() => {
    return chips.filter((c) => placements.get(c.id) == null);
  }, [chips, placements]);

  const totals = useMemo(
    () => computeTotals(chips, placements),
    [chips, placements],
  );

  const postingStatus = useMemo(
    () => getPostingStatus(scenario, chips, placements),
    [scenario, chips, placements],
  );

  const handleDragEnd = useCallback(
    (event: DragEndEvent) => {
      const { active, over } = event;
      if (!over) return;
      const chipId = String(active.id);
      const overId = String(over.id);
      const chipIdSet = new Set(chips.map((c) => c.id));

      setPlacements((prev) => {
        const next = new Map(prev);
        if (overId === BANK_ID) {
          next.set(chipId, null);
          return next;
        }
        let slot = parseSlotId(overId);
        if (!slot && chipIdSet.has(overId)) {
          slot = prev.get(overId) ?? null;
        }
        if (slot) {
          next.set(chipId, slot);
        }
        return next;
      });
      setFeedback("idle");
    },
    [chips],
  );

  const handleCheck = () => {
    const result = validateScenario(scenario, chips, placements);
    if (result.ok) {
      setFeedback("success");
      setSuccessOpen(true);
    } else {
      setFeedback("wrong");
    }
  };

  const handleSuccessModalClose = () => {
    setSuccessOpen(false);
    if (scenarioIndex >= totalScenarios - 1) {
      setPhase("finished");
    }
  };

  const handleNext = () => {
    setSuccessOpen(false);
    if (scenarioIndex < totalScenarios - 1) {
      setScenarioIndex((i) => i + 1);
    }
  };

  const handleStart = () => {
    setScenarioIndex(0);
    setPlacements(initPlacements(scenarios[0]));
    setFeedback("idle");
    setHintOpen(false);
    setSuccessOpen(false);
    setPhase("playing");
  };

  const handlePlayAgain = () => {
    setScenarioIndex(0);
    setPlacements(initPlacements(scenarios[0]));
    setFeedback("idle");
    setHintOpen(false);
    setSuccessOpen(false);
    setPhase("intro");
  };

  if (phase === "intro") {
    return <IntroScreen onStart={handleStart} />;
  }

  if (phase === "finished") {
    return (
      <div className="mx-auto max-w-xl space-y-6 px-4 py-12">
        <LanguageToggle />
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-8 text-center shadow-sm">
          <h2 className="text-2xl font-semibold text-emerald-900">
            {t("ui.completionTitle")}
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-emerald-800">
            {t("ui.completionBody")}
          </p>
          <button
            type="button"
            onClick={handlePlayAgain}
            className="mt-8 rounded-lg bg-emerald-700 px-6 py-3 font-semibold text-white hover:bg-emerald-800"
          >
            {t("ui.playAgain")}
          </button>
        </div>
      </div>
    );
  }

  const canCheck = allChipsPlaced(chips, placements);
  const showNext = feedback === "success" && scenarioIndex < totalScenarios - 1;

  return (
    <div className="mx-auto max-w-5xl space-y-8 px-4 py-8">
      <HintModal
        open={hintOpen}
        onClose={() => setHintOpen(false)}
        scenarioId={scenario.id}
      />
      <SuccessModal
        open={successOpen}
        onClose={handleSuccessModalClose}
        scenarioId={scenario.id}
      />

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <p className="text-lg font-semibold text-slate-800">
          {t("ui.gameTitle")}
        </p>
        <LanguageToggle />
      </div>

      <AccountingEquationStrip />

      <ScenarioPanel
        scenarioId={scenario.id}
        current={scenarioIndex + 1}
        total={totalScenarios}
      />

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <TAccountGrid
          accounts={scenario.accounts}
          chips={chips}
          placements={placements}
        />

        <ChipBank chips={bankChips} />
      </DndContext>

      <BalanceMeter totals={totals} postingStatus={postingStatus} />

      {feedback === "wrong" ? (
        <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-900">
          {t("ui.wrong")}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <button
          type="button"
          disabled={!canCheck}
          onClick={handleCheck}
          className="rounded-lg bg-slate-900 px-5 py-2.5 font-semibold text-white disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          {t("ui.check")}
        </button>
        <button
          type="button"
          onClick={() => setHintOpen(true)}
          className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 font-semibold text-slate-800 hover:bg-slate-50"
        >
          {t("ui.hint")}
        </button>
        {showNext ? (
          <button
            type="button"
            onClick={handleNext}
            className="rounded-lg bg-emerald-700 px-5 py-2.5 font-semibold text-white hover:bg-emerald-800"
          >
            {t("ui.next")}
          </button>
        ) : null}
      </div>
    </div>
  );
}
