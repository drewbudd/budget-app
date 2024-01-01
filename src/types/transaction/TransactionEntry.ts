export type TransactionEntry = {
  type: 'expense' | 'income'
  date: string
  amount: number
  description?: string
  category: string
}
