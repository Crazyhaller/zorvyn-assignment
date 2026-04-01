import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { setRole } from './roleSlice'

const RoleSwitcher = () => {
  const dispatch = useAppDispatch()
  const role = useAppSelector((state) => state.role.role)
  const roles = [
    {
      value: 'viewer',
      label: 'Viewer',
      description: 'Read-only dashboard',
    },
    {
      value: 'admin',
      label: 'Admin',
      description: 'Can add transactions',
    },
  ] as const

  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <div>
        <p className="text-sm font-semibold text-slate-950 dark:text-white">
          Access mode
        </p>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          {role === 'admin'
            ? 'Editing tools and quick-add actions are enabled.'
            : 'Viewing mode keeps the workspace focused on analytics.'}
        </p>
      </div>

      <div className="inline-flex rounded-[20px] border border-slate-200/80 bg-slate-50/80 p-1 dark:border-white/10 dark:bg-white/[0.04]">
        {roles.map((option) => {
          const active = option.value === role

          return (
            <button
              key={option.value}
              type="button"
              onClick={() => dispatch(setRole(option.value))}
              className={`min-w-[132px] rounded-2xl px-4 py-3 text-left ${
                active
                  ? 'bg-slate-950 text-white shadow-[0_18px_32px_-24px_rgba(15,23,42,0.85)] dark:bg-sky-500 dark:text-slate-950'
                  : 'text-slate-600 hover:bg-white/80 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/[0.06] dark:hover:text-white'
              }`}
            >
              <span className="block text-sm font-semibold">{option.label}</span>
              <span
                className={`mt-1 block text-xs ${
                  active
                    ? 'text-white/75 dark:text-slate-950/75'
                    : 'text-slate-400 dark:text-slate-500'
                }`}
              >
                {option.description}
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default RoleSwitcher
