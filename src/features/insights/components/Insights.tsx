import { useAppSelector } from '../../../app/hooks'
import { motion } from 'framer-motion'

const Insights = () => {
  const transactions = useAppSelector(
    (state) => state.transactions.transactions,
  )

  const expenses = transactions.filter((t) => t.type === 'expense')
  const income = transactions.filter((t) => t.type === 'income')

  // 🥇 Highest spending category
  const categoryMap: Record<string, number> = {}

  expenses.forEach((t) => {
    categoryMap[t.category] = (categoryMap[t.category] || 0) + t.amount
  })

  let topCategory = 'N/A'
  let maxSpend = 0

  Object.entries(categoryMap).forEach(([cat, value]) => {
    if (value > maxSpend) {
      maxSpend = value
      topCategory = cat
    }
  })

  // 📅 Monthly grouping
  const getMonthKey = (date: string) => date.slice(0, 7) // YYYY-MM

  const monthlyData: Record<string, { income: number; expense: number }> = {}

  transactions.forEach((t) => {
    const key = getMonthKey(t.date)

    if (!monthlyData[key]) {
      monthlyData[key] = { income: 0, expense: 0 }
    }

    if (t.type === 'income') {
      monthlyData[key].income += t.amount
    } else {
      monthlyData[key].expense += t.amount
    }
  })

  const months = Object.keys(monthlyData).sort()

  const currentMonth = months[months.length - 1]
  const prevMonth = months[months.length - 2]

  const current = currentMonth ? monthlyData[currentMonth] : null
  const previous = prevMonth ? monthlyData[prevMonth] : null

  const expenseChange =
    current && previous ? current.expense - previous.expense : 0

  // 💡 Smart Observation
  let observation =
    'Add transactions across multiple months to see spending trends.'

  if (current && previous) {
    if (expenseChange > 0) {
      observation = `Your spending increased by ₹ ${expenseChange.toLocaleString()} compared to last month.`
    } else if (expenseChange < 0) {
      observation = `Great! You reduced spending by ₹ ${Math.abs(
        expenseChange,
      ).toLocaleString()} compared to last month.`
    } else {
      observation = 'Your spending remained consistent month over month.'
    }
  }

  // 💰 Totals
  const totalIncome = income.reduce((acc, t) => acc + t.amount, 0)
  const totalExpense = expenses.reduce((acc, t) => acc + t.amount, 0)
  const savings = totalIncome - totalExpense

  return (
    <motion.div
      className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow space-y-3"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="font-semibold text-lg">Insights</h2>

      {/* Highest Category */}
      <p>
        🥇 Highest Spending Category:{' '}
        <span className="font-medium">
          {topCategory} (₹ {maxSpend.toLocaleString()})
        </span>
      </p>

      {/* Monthly Comparison */}
      {current && previous && (
        <p>
          📅 Monthly Comparison:{' '}
          <span className="font-medium">
            {expenseChange > 0 ? '↑' : expenseChange < 0 ? '↓' : '→'} ₹{' '}
            {Math.abs(expenseChange).toLocaleString()} in expenses
          </span>
        </p>
      )}

      {/* Totals */}
      <p>
        💰 Income:{' '}
        <span className="text-green-600 font-medium">
          ₹ {totalIncome.toLocaleString()}
        </span>
      </p>

      <p>
        💸 Expenses:{' '}
        <span className="text-red-600 font-medium">
          ₹ {totalExpense.toLocaleString()}
        </span>
      </p>

      <p>
        📊 Net Savings:{' '}
        <span
          className={`font-medium ${
            savings >= 0 ? 'text-green-600' : 'text-red-600'
          }`}
        >
          ₹ {savings.toLocaleString()}
        </span>
      </p>

      {/* Observation */}
      <p className="italic text-gray-600">💡 {observation}</p>
    </motion.div>
  )
}

export default Insights
