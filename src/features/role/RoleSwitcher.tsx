import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setRole } from './roleSlice'

const RoleSwitcher = () => {
  const dispatch = useAppDispatch()
  const role = useAppSelector((state) => state.role.role)

  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-gray-600">Role:</span>

      <select
        value={role}
        onChange={(e) =>
          dispatch(setRole(e.target.value as 'viewer' | 'admin'))
        }
        className="p-2 border rounded-lg"
      >
        <option value="viewer">Viewer</option>
        <option value="admin">Admin</option>
      </select>
    </div>
  )
}

export default RoleSwitcher
