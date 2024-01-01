export const EXPENSE_CATEGORIES = [
  'grocery',
  'general-household',
  'eat-outs',
  'home',
  'transportation',
  'rent',
  'utilities',
  'travel',
  'savings',
  'sport',
  'health',
] as const

export type ExpenseCategory = (typeof EXPENSE_CATEGORIES)[number]
