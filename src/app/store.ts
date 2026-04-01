import { combineReducers, configureStore } from '@reduxjs/toolkit'
import transactionsReducer from '../features/transactions/transactionsSlice'
import roleReducer from '../features/role/roleSlice'

const rootReducer = combineReducers({
  transactions: transactionsReducer,
  role: roleReducer,
})

type PersistedState = ReturnType<typeof rootReducer>

// ✅ Load from localStorage
const loadState = (): Partial<PersistedState> | undefined => {
  if (typeof window === 'undefined') return undefined

  try {
    const serialized = window.localStorage.getItem('financeState')
    if (!serialized) return undefined
    return JSON.parse(serialized) as Partial<PersistedState>
  } catch {
    return undefined
  }
}

// ✅ Save to localStorage
const saveState = (state: PersistedState) => {
  if (typeof window === 'undefined') return

  try {
    window.localStorage.setItem('financeState', JSON.stringify(state))
  } catch {}
}

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: loadState(),
})

// persist on change
store.subscribe(() => {
  saveState(store.getState())
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
