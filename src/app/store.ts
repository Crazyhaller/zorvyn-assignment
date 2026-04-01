import { configureStore } from '@reduxjs/toolkit'
import transactionsReducer from '../features/transactions/transactionsSlice'
import roleReducer from '../features/role/roleSlice'

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    role: roleReducer,
  },
})

// types for TS (important for clean code)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
