import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { useAppSelector } from '../../../app/hooks'
import { motion } from 'framer-motion'

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6']

const ExpensePieChart = () => {
  const transactions = useAppSelector(
    (state) => state.transactions.transactions,
  )

  const expenseData = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc: any[], curr) => {
      const existing = acc.find((item) => item.name === curr.category)

      if (existing) {
        existing.value += curr.amount
      } else {
        acc.push({ name: curr.category, value: curr.amount })
      }

      return acc
    }, [])

  if (expenseData.length === 0) {
    return (
      <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow">
        <p className="text-gray-500 text-center">No expense data available</p>
      </div>
    )
  }

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="font-semibold mb-4">Spending Breakdown</h2>

      <div className="h-64">
        <ResponsiveContainer>
          <PieChart>
            <Pie
              data={expenseData}
              dataKey="value"
              nameKey="name"
              outerRadius={80}
            >
              {expenseData.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

export default ExpensePieChart
