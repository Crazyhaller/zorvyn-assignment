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

  const expenses = transactions.filter((transaction) => transaction.type === 'expense')
  const income = transactions.filter((transaction) => transaction.type === 'income')

  const categoryMap: Record<string, number> = {}

  expenses.forEach((transaction) => {
    categoryMap[transaction.category] =
      (categoryMap[transaction.category] || 0) + transaction.amount
  })

  let topCategory = 'N/A'
  let maxSpend = 0

  Object.entries(categoryMap).forEach(([category, value]) => {
    if (value > maxSpend) {
      maxSpend = value
      topCategory = category
    }
  })

  const getMonthKey = (date: string) => date.slice(0, 7)

  const monthlyData: Record<string, { income: number; expense: number }> = {}

  transactions.forEach((transaction) => {
    const key = getMonthKey(transaction.date)

    if (!monthlyData[key]) {
      monthlyData[key] = { income: 0, expense: 0 }
    }

    if (transaction.type === 'income') {
      monthlyData[key].income += transaction.amount
    } else {
      monthlyData[key].expense += transaction.amount
    }
  })

  const months = Object.keys(monthlyData).sort()
  const currentMonth = months[months.length - 1]
  const prevMonth = months[months.length - 2]
  const current = currentMonth ? monthlyData[currentMonth] : null
  const previous = prevMonth ? monthlyData[prevMonth] : null
  const expenseChange =
    current && previous ? current.expense - previous.expense : 0

  let observation =
    'Add transactions across multiple months to see spending trends.'
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

  const totalIncome = income.reduce((sum, transaction) => sum + transaction.amount, 0)
  const totalExpense = expenses.reduce(
    (sum, transaction) => sum + transaction.amount,
    0,
  )
  const savings = totalIncome - totalExpense
  const coverage = totalExpense > 0 ? totalIncome / totalExpense : 0

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
}

export default Insights
