import { defineStore } from 'pinia'
import type { TransactionEntry } from '@/types/transaction/TransactionEntry'
import Papa from 'papaparse'

export const useTransactionsStore = defineStore('transactions', {
  state: () => ({
    transactions: [] as TransactionEntry[],
  }),
  getters: {
    lastNTransactions: (state) => {
      return (n: number) => state.transactions.slice(0, n)
    },
    incomeEntries: ({ transactions }) =>
      transactions.filter((transaction) => transaction.type === 'income'),
    expenseEntries: ({ transactions }) =>
      transactions.filter((transaction) => transaction.type === 'expense'),
    transactionsAsCsvString: ({ transactions }) => Papa.unparse(transactions),
  },
  actions: {
    addTransaction(transaction: TransactionEntry) {
      this.transactions.push(transaction)
    },
    setTransactions(transactions: TransactionEntry[]) {
      this.transactions = transactions
    },
  },
})
