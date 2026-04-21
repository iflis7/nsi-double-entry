import type { ChipDef, Placement, Scenario } from "./types";

export type ValidateResult = {
  ok: boolean;
  errors: string[];
};

/** Compare user placements to scenario solution (by chip id). */
export function validateScenario(
  scenario: Scenario,
  chips: ChipDef[],
  placements: Map<string, Placement | null>,
): ValidateResult {
  const errors: string[] = [];

  for (const chip of chips) {
    const placement = placements.get(chip.id);
    const expected = scenario.solution.find((s) => s.chipId === chip.id);
    if (!expected) {
      errors.push(`missing_solution:${chip.id}`);
      continue;
    }
    if (!placement) {
      errors.push(`unplaced:${chip.id}`);
      continue;
    }
    if (
      placement.accountId !== expected.accountId ||
      placement.side !== expected.side
    ) {
      errors.push(`wrong:${chip.id}`);
    }
  }

  return { ok: errors.length === 0, errors };
}

export type TotalsResult = {
  debitTotal: number;
  creditTotal: number;
  difference: number;
  balanced: boolean;
};

/** Sum amounts on debit vs credit for placed chips only. */
export function computeTotals(
  chips: ChipDef[],
  placements: Map<string, Placement | null>,
): TotalsResult {
  let debitTotal = 0;
  let creditTotal = 0;

  for (const chip of chips) {
    const p = placements.get(chip.id);
    if (!p) continue;
    if (p.side === "debit") debitTotal += chip.amount;
    else creditTotal += chip.amount;
  }

  const difference = Math.abs(debitTotal - creditTotal);
  return {
    debitTotal,
    creditTotal,
    difference,
    balanced: debitTotal === creditTotal,
  };
}

/** True if every chip has a non-null placement. */
export function allChipsPlaced(
  chips: ChipDef[],
  placements: Map<string, Placement | null>,
): boolean {
  return chips.every((c) => placements.get(c.id) != null);
}

export type PostingStatus =
  | "incomplete"
  | "unbalanced"
  | "balancedWrong"
  | "correct";

/**
 * Drives the totals footer: incomplete → neutral; unbalanced → amber;
 * balanced but wrong accounts → warning; full solution → success.
 */
export function getPostingStatus(
  scenario: Scenario,
  chips: ChipDef[],
  placements: Map<string, Placement | null>,
): PostingStatus {
  if (!allChipsPlaced(chips, placements)) return "incomplete";
  if (validateScenario(scenario, chips, placements).ok) return "correct";
  const totals = computeTotals(chips, placements);
  if (!totals.balanced) return "unbalanced";
  return "balancedWrong";
}
