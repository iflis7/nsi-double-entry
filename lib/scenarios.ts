import type { Scenario } from "./types";

/**
 * Five progressive scenarios. Amounts are chosen so debits = credits per puzzle.
 */
export const scenarios: Scenario[] = [
  {
    id: "capital-investment",
    accounts: [{ id: "cash" }, { id: "equity" }],
    chips: [
      { id: "c1", amount: 5000, labelKey: "investment" },
      { id: "c2", amount: 5000, labelKey: "investment" },
    ],
    solution: [
      { chipId: "c1", accountId: "cash", side: "debit" },
      { chipId: "c2", accountId: "equity", side: "credit" },
    ],
  },
  {
    id: "service-on-account",
    accounts: [{ id: "ar" }, { id: "revenue" }],
    chips: [
      { id: "c1", amount: 2400, labelKey: "invoice" },
      { id: "c2", amount: 2400, labelKey: "invoice" },
    ],
    solution: [
      { chipId: "c1", accountId: "ar", side: "debit" },
      { chipId: "c2", accountId: "revenue", side: "credit" },
    ],
  },
  {
    id: "pay-rent",
    accounts: [{ id: "expense" }, { id: "cash" }],
    chips: [
      { id: "c1", amount: 800, labelKey: "rent" },
      { id: "c2", amount: 800, labelKey: "rent" },
    ],
    solution: [
      { chipId: "c1", accountId: "expense", side: "debit" },
      { chipId: "c2", accountId: "cash", side: "credit" },
    ],
  },
  {
    id: "loan-deposit",
    accounts: [{ id: "cash" }, { id: "loan" }],
    chips: [
      { id: "c1", amount: 10000, labelKey: "loan" },
      { id: "c2", amount: 10000, labelKey: "loan" },
    ],
    solution: [
      { chipId: "c1", accountId: "cash", side: "debit" },
      { chipId: "c2", accountId: "loan", side: "credit" },
    ],
  },
  {
    id: "fix-the-error",
    accounts: [{ id: "ar" }, { id: "revenue" }],
    chips: [
      { id: "c1", amount: 1800, labelKey: "invoice" },
      { id: "c2", amount: 1800, labelKey: "invoice" },
    ],
    solution: [
      { chipId: "c1", accountId: "ar", side: "debit" },
      { chipId: "c2", accountId: "revenue", side: "credit" },
    ],
    initialPlacements: {
      // Wrong: A/R should be debited, not credited
      c1: { accountId: "ar", side: "credit" },
      c2: { accountId: "revenue", side: "credit" },
    },
  },
];
