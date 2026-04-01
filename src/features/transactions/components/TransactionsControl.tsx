import { useAppDispatch, useAppSelector } from '../../../app/hooks'
import { setSearch, setFilter, setSort } from '../transactionsSlice'

const TransactionsControls = () => {
  const dispatch = useAppDispatch()
  const { search, filter, sort } = useAppSelector((state) => state.transactions)

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Search */}
      <input
        type="text"
        placeholder="Search category..."
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
        className="p-2 border rounded-lg w-full md:w-1/3"
      />

      {/* Filter */}
      <select
        value={filter}
        onChange={(e) => dispatch(setFilter(e.target.value as any))}
        className="p-2 border rounded-lg"
      >
        <option value="all">All</option>
        <option value="income">Income</option>
        <option value="expense">Expense</option>
      </select>

      {/* Sort */}
      <select
        value={sort}
        onChange={(e) => dispatch(setSort(e.target.value as any))}
        className="p-2 border rounded-lg"
      >
        <option value="date">Sort by Date</option>
        <option value="amount">Sort by Amount</option>
      </select>
    </div>
  )
}

export default TransactionsControls
