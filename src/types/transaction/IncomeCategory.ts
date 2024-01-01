export const INCOME_CATEGORIES = ['salary', 'refund'] as const

export type IncomeCategory = (typeof INCOME_CATEGORIES)[number]
