import { useDeferredValue } from 'react'
import { motion } from 'motion/react'
import { useAppSelector } from '../../../app/hooks'
import {
  formatCompactCurrency,
  formatCurrency,
  formatLongDate,
} from '../../../utils/formatters'

const TransactionsTable = () => {
  const { transactions, search, filter, sort } = useAppSelector(
    (state) => state.transactions,
  )
  const deferredSearch = useDeferredValue(search)

  let filtered = [...transactions]

  // Search
  if (deferredSearch) {
    filtered = filtered.filter((t) =>
      t.category.toLowerCase().includes(deferredSearch.toLowerCase()),
    )
  }

  // Filter
  if (filter !== 'all') {
    filtered = filtered.filter((t) => t.type === filter)
  }

  // Sort
  filtered.sort((a, b) => {
    if (sort === 'amount') return b.amount - a.amount
    return new Date(b.date).getTime() - new Date(a.date).getTime()
  })

  const netFlow = filtered.reduce(
    (sum, transaction) =>
      sum +
      (transaction.type === 'income'
        ? transaction.amount
        : -transaction.amount),
    0,
  )

  return (
    <motion.div
      className="glass-panel overflow-hidden p-4 sm:p-6"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.22 }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-title">Transaction list</p>
          <p className="section-copy">
            Clean, readable movement history with stronger emphasis on category,
            status, and value.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <span className="pill-badge">{filtered.length} visible</span>
          <span className="pill-badge">
            Net flow {formatCompactCurrency(netFlow)}
          </span>
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className="mt-6 rounded-[24px] border border-dashed border-slate-300/70 bg-slate-50/70 py-14 text-center dark:border-white/10 dark:bg-white/[0.03]">
          <p className="text-lg font-semibold text-slate-900 dark:text-white">
            No transactions found
          </p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Try a broader search or clear the active filters.
          </p>
        </div>
      ) : (
        <>
          <div className="mt-6 space-y-3 md:hidden">
            {filtered.map((transaction) => (
              <article key={transaction.id} className="glass-subpanel p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-sm font-semibold text-slate-700 dark:bg-white/[0.07] dark:text-slate-100">
                      {transaction.category.slice(0, 1).toUpperCase()}
                    </div>
                    <div>
                      <p className="font-semibold text-slate-950 dark:text-white">
                        {transaction.category}
                      </p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">
                        {formatLongDate(transaction.date)}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                      transaction.type === 'income'
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300'
                        : 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300'
                    }`}
                  >
                    {transaction.type}
                  </span>
                </div>

                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-slate-500 dark:text-slate-400">
                    Amount
                  </span>
                  <p className="text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
                    {formatCurrency(transaction.amount)}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-6 hidden overflow-hidden rounded-[24px] border border-slate-200/70 md:block dark:border-white/10">
            <div className="overflow-x-auto">
              <table className="min-w-full text-left">
                <thead className="bg-slate-50/85 dark:bg-white/[0.04]">
                  <tr className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
                    <th className="px-6 py-4">Category</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4">Type</th>
                    <th className="px-6 py-4 text-right">Amount</th>
                  </tr>
                </thead>

                <tbody>
                  {filtered.map((transaction) => (
                    <tr
                      key={transaction.id}
                      className="border-t border-slate-200/70 transition hover:bg-slate-50/80 dark:border-white/10 dark:hover:bg-white/[0.03]"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-100 text-sm font-semibold text-slate-700 dark:bg-white/[0.07] dark:text-slate-100">
                            {transaction.category.slice(0, 1).toUpperCase()}
                          </div>
                          <div>
                            <p className="font-semibold text-slate-950 dark:text-white">
                              {transaction.category}
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">
                              ID {transaction.id}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-300">
                        {formatLongDate(transaction.date)}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-medium ${
                            transaction.type === 'income'
                              ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-300'
                              : 'bg-rose-100 text-rose-700 dark:bg-rose-500/10 dark:text-rose-300'
                          }`}
                        >
                          {transaction.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right text-sm font-semibold text-slate-950 dark:text-white">
                        {formatCurrency(transaction.amount)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </motion.div>
  )

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="font-semibold mb-4">Transactions</h2>

      {filtered.length === 0 ? (
        <div className="text-center py-10 text-gray-500">
          <p className="text-lg font-medium">No transactions found</p>
          <p className="text-sm">
            Try adjusting filters or add a new transaction
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="text-sm text-gray-500 border-b">
                <th className="py-2">Date</th>
                <th>Category</th>
                <th>Type</th>
                <th className="text-right">Amount</th>
              </tr>
            </thead>

            <tbody>
              {filtered.map((t) => (
                <tr key={t.id} className="border-b hover:bg-gray-50">
                  <td className="py-2">
                    {new Date(t.date).toLocaleDateString()}
                  </td>
                  <td>{t.category}</td>
                  <td
                    className={
                      t.type === 'income' ? 'text-green-600' : 'text-red-600'
                    }
                  >
                    {t.type}
                  </td>
                  <td className="text-right font-medium">
                    ₹ {t.amount.toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  )
}

export default TransactionsTable
