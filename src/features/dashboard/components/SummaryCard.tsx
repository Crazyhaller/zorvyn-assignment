import { motion } from 'motion/react'
import { useAppSelector } from '../../../app/hooks'
import {
  formatCompactCurrency,
  formatPercent,
} from '../../../utils/formatters'

const SummaryCards = () => {
  const transactions = useAppSelector(
    (state) => state.transactions.transactions,
  )

  const income = transactions
    .filter((transaction) => transaction.type === 'income')
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  const expenses = transactions
    .filter((transaction) => transaction.type === 'expense')
    .reduce((sum, transaction) => sum + transaction.amount, 0)

  const balance = income - expenses
  const incomeEntries = transactions.filter(
    (transaction) => transaction.type === 'income',
  ).length
  const expenseEntries = transactions.filter(
    (transaction) => transaction.type === 'expense',
  ).length
  const averageTransaction =
    transactions.length > 0
      ? transactions.reduce((sum, transaction) => sum + transaction.amount, 0) /
        transactions.length
      : 0
  const savingsRate = income > 0 ? balance / income : 0
  const categories = new Set(
    transactions.map((transaction) => transaction.category),
  )

  const showcaseCards = [
    {
      title: 'Net Balance',
      value: formatCompactCurrency(balance),
      caption:
        balance >= 0 ? 'Healthy cash position' : 'Outflow is ahead of inflow',
      detail: `${transactions.length} total entries tracked`,
      accent: 'bg-sky-400',
      theme: 'from-slate-950 via-slate-900 to-sky-900',
    },
    {
      title: 'Total Income',
      value: formatCompactCurrency(income),
      caption: `${incomeEntries} income event${incomeEntries === 1 ? '' : 's'}`,
      detail: 'Cash coming into the business',
      accent: 'bg-emerald-400',
      theme: 'from-emerald-600 via-emerald-500 to-teal-500',
    },
    {
      title: 'Total Expenses',
      value: formatCompactCurrency(expenses),
      caption: `${expenseEntries} outgoing payment${
        expenseEntries === 1 ? '' : 's'
      }`,
      detail: 'Visibility into where cash is leaving',
      accent: 'bg-rose-400',
      theme: 'from-rose-600 via-orange-500 to-amber-500',
    },
    {
      title: 'Efficiency',
      value: transactions.length > 0 ? formatPercent(savingsRate) : '0%',
      caption: `${formatCompactCurrency(averageTransaction)} avg. transaction`,
      detail: `${categories.size} categories in active rotation`,
      accent: 'bg-violet-400',
      theme: 'from-violet-700 via-indigo-600 to-blue-500',
    },
  ]

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {showcaseCards.map((card, index) => (
        <motion.div
          key={card.title}
          className={`relative overflow-hidden rounded-[28px] border border-white/12 bg-gradient-to-br ${card.theme} p-5 text-white shadow-[0_24px_50px_-28px_rgba(15,23,42,0.7)]`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, delay: index * 0.06 }}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-white/60" />
          <div className="absolute -right-8 top-6 h-24 w-24 rounded-full bg-white/12 blur-2xl" />

          <div className="relative flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-white/75">{card.title}</p>
              <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                {card.value}
              </p>
            </div>

            <span
              className={`mt-1 flex h-10 w-10 items-center justify-center rounded-2xl ${card.accent} shadow-[0_10px_25px_-12px_rgba(255,255,255,0.65)]`}
            >
              <span className="h-2.5 w-2.5 rounded-full bg-white" />
            </span>
          </div>

          <div className="relative mt-8 space-y-2">
            <p className="text-sm font-medium text-white/90">{card.caption}</p>
            <p className="text-sm text-white/70">{card.detail}</p>
          </div>
        </motion.div>
      ))}
    </div>
  )
}

export default SummaryCards
