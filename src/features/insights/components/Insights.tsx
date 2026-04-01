import { motion } from 'motion/react'
import { useAppSelector } from '../../../app/hooks'
import {
  formatCurrency,
  formatMonthLabel,
} from '../../../utils/formatters'

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
  const coverage = totalExpense > 0 ? totalIncome / totalExpense : 0

  let observationTone = 'text-slate-600 dark:text-slate-300'

  if (current && previous) {
    if (expenseChange > 0) {
      observation = `Spending increased by ${formatCurrency(
        expenseChange,
      )} compared with last month. Review the categories driving the jump.`
      observationTone = 'text-amber-700 dark:text-amber-300'
    } else if (expenseChange < 0) {
      observation = `Spending is down by ${formatCurrency(
        Math.abs(expenseChange),
      )} month over month. Your current trajectory is improving.`
      observationTone = 'text-emerald-700 dark:text-emerald-300'
    } else {
      observation =
        'Spending stayed stable month over month, which is useful for forecasting.'
    }
  }

  const insightCards = [
    {
      label: 'Top spend',
      value: topCategory,
      detail:
        maxSpend > 0 ? formatCurrency(maxSpend) : 'No expense history available',
    },
    {
      label: 'Month over month',
      value:
        current && previous
          ? `${expenseChange > 0 ? '+' : expenseChange < 0 ? '-' : ''}${formatCurrency(
              Math.abs(expenseChange),
            )}`
          : 'Not enough history',
      detail:
        current && previous
          ? `${formatMonthLabel(`${prevMonth}-01`)} vs ${formatMonthLabel(
              `${currentMonth}-01`,
            )}`
          : 'Track multiple months to compare',
    },
    {
      label: 'Net savings',
      value: formatCurrency(savings),
      detail:
        savings >= 0
          ? 'Positive spread between income and expenses'
          : 'Expenses are ahead of income',
    },
    {
      label: 'Income coverage',
      value: totalExpense > 0 ? `${coverage.toFixed(1)}x` : 'N/A',
      detail: 'How much income covers outgoing spend',
    },
  ]

  return (
    <motion.div
      className="glass-panel p-5 sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.18 }}
    >
      <div className="space-y-2">
        <p className="eyebrow">Insights</p>
        <div>
          <h2 className="section-title text-2xl">Smart observations</h2>
          <p className="section-copy">
            A quick strategic read on where your money is moving.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {insightCards.map((card) => (
          <div key={card.label} className="glass-subpanel p-4">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
              {card.label}
            </p>
            <p className="mt-3 text-lg font-semibold tracking-tight text-slate-950 dark:text-white">
              {card.value}
            </p>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
              {card.detail}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-[24px] border border-slate-200/70 bg-slate-50/80 p-4 dark:border-white/10 dark:bg-white/[0.04]">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
              Advisory note
            </p>
            <p className={`mt-2 text-sm leading-6 ${observationTone}`}>
              {observation}
            </p>
          </div>

          <div className="flex gap-2">
            <span className="pill-badge">Income {formatCurrency(totalIncome)}</span>
            <span className="pill-badge">
              Expense {formatCurrency(totalExpense)}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )

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
