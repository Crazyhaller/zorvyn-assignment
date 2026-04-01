import { type Transaction } from '../features/transactions/transactionsSlice'

export const mockTransactions: Transaction[] = [
  {
    id: '1',
    date: '2026-03-01',
    amount: 50000,
    category: 'Salary',
    type: 'income',
  },
  {
    id: '2',
    date: '2026-03-03',
    amount: 2000,
    category: 'Groceries',
    type: 'expense',
  },
  {
    id: '3',
    date: '2026-03-05',
    amount: 1500,
    category: 'Transport',
    type: 'expense',
  },
  {
    id: '4',
    date: '2026-03-10',
    amount: 8000,
    category: 'Freelance',
    type: 'income',
  },
  {
    id: '5',
    date: '2026-03-12',
    amount: 3000,
    category: 'Shopping',
    type: 'expense',
  },
  {
    id: '6',
    date: '2026-03-15',
    amount: 1200,
    category: 'Food',
    type: 'expense',
  },
]
