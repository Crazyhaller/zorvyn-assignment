import { createSlice, type PayloadAction } from '@reduxjs/toolkit'

type Role = 'viewer' | 'admin'

interface RoleState {
  role: Role
}

const initialState: RoleState = {
  role: 'viewer',
}

const roleSlice = createSlice({
  name: 'role',
  initialState,
  reducers: {
    setRole: (state, action: PayloadAction<Role>) => {
      state.role = action.payload
    },
  },
})

export const { setRole } = roleSlice.actions
export default roleSlice.reducer
