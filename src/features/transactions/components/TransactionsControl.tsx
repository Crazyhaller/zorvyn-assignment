import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { setSearch, setFilter, setSort } from '../transactionsSlice'

const TransactionsControls = () => {
  const dispatch = useAppDispatch()
  const { search, filter, sort } = useAppSelector((state) => state.transactions)
  const hasActiveFilters = search.length > 0 || filter !== 'all' || sort !== 'date'

  return (
    <div className="glass-panel p-4 sm:p-5">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-title">Refine results</p>
          <p className="section-copy">
            Narrow the ledger by category, type, or sort priority.
          </p>
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={() => {
              dispatch(setSearch(''))
              dispatch(setFilter('all'))
              dispatch(setSort('date'))
            }}
            className="inline-flex h-11 items-center justify-center rounded-2xl border border-slate-200/80 bg-white/80 px-4 text-sm font-medium text-slate-600 shadow-sm hover:-translate-y-0.5 hover:text-slate-950 dark:border-white/10 dark:bg-white/[0.05] dark:text-slate-300 dark:hover:text-white"
          >
            Reset view
          </button>
        )}
      </div>

      <div className="mt-5 grid gap-3 lg:grid-cols-[1.5fr_0.7fr_0.7fr]">
        <label className="space-y-2">
          <span className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
            Search
          </span>

          <div className="relative">
            <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-slate-400">
              <svg
                aria-hidden="true"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                viewBox="0 0 24 24"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </span>

            <input
              type="text"
              placeholder="Search category..."
              value={search}
              onChange={(e) => dispatch(setSearch(e.target.value))}
              className="control-input pl-11"
            />
          </div>
        </label>

        <label className="space-y-2">
          <span className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
            Type
          </span>
          <select
            value={filter}
            onChange={(e) =>
              dispatch(setFilter(e.target.value as 'all' | 'income' | 'expense'))
            }
            className="control-input appearance-none"
          >
            <option value="all">All activity</option>
            <option value="income">Income only</option>
            <option value="expense">Expenses only</option>
          </select>
        </label>

        <label className="space-y-2">
          <span className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
            Sort
          </span>
          <select
            value={sort}
            onChange={(e) =>
              dispatch(setSort(e.target.value as 'date' | 'amount'))
            }
            className="control-input appearance-none"
          >
            <option value="date">Latest first</option>
            <option value="amount">Largest amount</option>
          </select>
        </label>
      </div>
    </div>
  )
}

export default TransactionsControls
