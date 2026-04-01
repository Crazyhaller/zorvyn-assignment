import { configureStore } from '@reduxjs/toolkit'
import transactionsReducer from '../features/transactions/transactionsSlice'
import roleReducer from '../features/role/roleSlice'

// ✅ Load from localStorage
const loadState = () => {
  try {
    const serialized = localStorage.getItem('financeState')
    if (!serialized) return undefined
    return JSON.parse(serialized)
  } catch {
    return undefined
  }
}

// ✅ Save to localStorage
const saveState = (state: any) => {
  try {
    localStorage.setItem('financeState', JSON.stringify(state))
  } catch {}
}

export const store = configureStore({
  reducer: {
    transactions: transactionsReducer,
    role: roleReducer,
  },
  preloadedState: loadState(),
})

// persist on change
store.subscribe(() => {
  saveState({
    transactions: store.getState().transactions,
    role: store.getState().role,
  })
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
