export type Side = "debit" | "credit";

export type AccountId =
  | "cash"
  | "ar"
  | "equity"
  | "loan"
  | "revenue"
  | "expense";

export type AccountDef = {
  id: AccountId;
};

export type ChipDef = {
  id: string;
  amount: number;
  /** Optional i18n key under `chips` in messages */
  labelKey?: string;
};

export type Placement = {
  accountId: AccountId;
  side: Side;
};

export type ScenarioSolutionEntry = {
  chipId: string;
  accountId: AccountId;
  side: Side;
};

export type Scenario = {
  id: string;
  accounts: AccountDef[];
  chips: ChipDef[];
  solution: ScenarioSolutionEntry[];
  /** Partial starting placements; missing chips start in the bank */
  initialPlacements?: Partial<Record<string, Placement>>;
};

export type PlacementsState = Map<string, Placement | null>;
