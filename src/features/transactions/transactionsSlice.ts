import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

export type Transaction = {
  id: string
  date: string
  amount: number
  category: string
  type: 'income' | 'expense'
}

type FilterType = 'all' | 'income' | 'expense'
type SortType = 'date' | 'amount'

interface TransactionsState {
  transactions: Transaction[]
  search: string
  filter: FilterType
  sort: SortType
}

const initialState: TransactionsState = {
  transactions: [],
  search: '',
  filter: 'all',
  sort: 'date',
}

const transactionsSlice = createSlice({
  name: 'transactions',
  initialState,
  reducers: {
    setTransactions: (state, action: PayloadAction<Transaction[]>) => {
      state.transactions = action.payload
    },
    addTransaction: (state, action: PayloadAction<Transaction>) => {
      state.transactions.push(action.payload)
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },
    setFilter: (state, action: PayloadAction<FilterType>) => {
      state.filter = action.payload
    },
    setSort: (state, action: PayloadAction<SortType>) => {
      state.sort = action.payload
    },
  },
})

export const {
  setTransactions,
  addTransaction,
  setSearch,
  setFilter,
  setSort,
} = transactionsSlice.actions

export default transactionsSlice.reducer
