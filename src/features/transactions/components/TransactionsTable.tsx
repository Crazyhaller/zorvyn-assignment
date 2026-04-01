import { useAppSelector } from '../../../app/hooks'
import { motion } from 'framer-motion'

const TransactionsTable = () => {
  const { transactions, search, filter, sort } = useAppSelector(
    (state) => state.transactions,
  )

  let filtered = [...transactions]

  // Search
  if (search) {
    filtered = filtered.filter((t) =>
      t.category.toLowerCase().includes(search.toLowerCase()),
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

  return (
    <motion.div
      className="bg-white p-4 rounded-2xl shadow"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <h2 className="font-semibold mb-4">Transactions</h2>

      {filtered.length === 0 ? (
        <p className="text-gray-500">No transactions found</p>
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
