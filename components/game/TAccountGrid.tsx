"use client";

import type { AccountId, ChipDef, Placement } from "@/lib/types";

import { TAccount } from "./TAccount";

type Props = {
  accounts: { id: AccountId }[];
  chips: ChipDef[];
  placements: Map<string, Placement | null>;
};

export function TAccountGrid({ accounts, chips, placements }: Props) {
  return (
    <div className="grid gap-6 sm:grid-cols-2">
      {accounts.map((a) => {
        const debitChips: ChipDef[] = [];
        const creditChips: ChipDef[] = [];
        for (const chip of chips) {
          const p = placements.get(chip.id);
          if (!p || p.accountId !== a.id) continue;
          if (p.side === "debit") debitChips.push(chip);
          else creditChips.push(chip);
        }
        return (
          <TAccount
            key={a.id}
            accountId={a.id}
            debitChips={debitChips}
            creditChips={creditChips}
          />
        );
      })}
    </div>
  );
}
