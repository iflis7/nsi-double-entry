import type { AccountId, Placement, Side } from "./types";

export const BANK_ID = "bank";

export function slotId(accountId: AccountId, side: Side): string {
  return `slot-${accountId}-${side}`;
}

export function parseSlotId(
  id: string | undefined | null,
): Placement | null {
  if (!id || id === BANK_ID) return null;
  const m = /^slot-([a-z]+)-(debit|credit)$/.exec(id);
  if (!m) return null;
  return {
    accountId: m[1] as AccountId,
    side: m[2] as Side,
  };
}
