import { type Transaction } from '../features/transactions/transactionsSlice'
import { mockTransactions } from '../data/mockData'

export const fetchTransactions = (): Promise<Transaction[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockTransactions)
    }, 800) // simulate network delay
  })
}
