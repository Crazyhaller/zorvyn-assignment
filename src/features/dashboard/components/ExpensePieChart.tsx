import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { motion } from 'motion/react'
import { useAppSelector } from '../../../app/hooks'
import {
  formatCompactCurrency,
  formatCurrency,
  formatPercent,
} from '../../../utils/formatters'

const COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6']

type ExpenseDatum = {
  name: string
  value: number
}

const ExpensePieChart = () => {
  const transactions = useAppSelector(
    (state) => state.transactions.transactions,
  )

  const expenseData = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc: ExpenseDatum[], curr) => {
      const existing = acc.find((item) => item.name === curr.category)

      if (existing) {
        existing.value += curr.amount
      } else {
        acc.push({ name: curr.category, value: curr.amount })
      }

      return acc
    }, [])
    .sort((a, b) => b.value - a.value)

  const totalExpenses = expenseData.reduce(
    (sum, expense) => sum + expense.value,
    0,
  )

  if (expenseData.length === 0) {
    return (
      <div className="glass-panel p-5 sm:p-6">
        <div className="flex h-72 items-center justify-center rounded-[24px] border border-dashed border-slate-300/70 bg-slate-50/70 text-center dark:border-white/10 dark:bg-white/[0.03]">
          <div className="space-y-2">
            <p className="section-title">Spending mix</p>
            <p className="section-copy">
              Expense categories will appear here once you record some outflow.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className="glass-panel p-5 sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.14 }}
    >
      <div className="space-y-2">
        <p className="eyebrow">Spend analysis</p>
        <div>
          <h2 className="section-title text-2xl">Spending breakdown</h2>
          <p className="section-copy">
            Category-level visibility across all expense activity.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_1.05fr] lg:items-center">
        <div className="relative h-72">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={expenseData}
                dataKey="value"
                nameKey="name"
                innerRadius={72}
                outerRadius={102}
                paddingAngle={4}
                stroke="rgba(255, 255, 255, 0.35)"
                strokeWidth={2}
              >
                {expenseData.map((_, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => formatCurrency(Number(value))}
                contentStyle={{
                  borderRadius: '20px',
                  border: '1px solid rgba(148, 163, 184, 0.22)',
                  background: 'rgba(15, 23, 42, 0.92)',
                  boxShadow: '0 20px 45px -28px rgba(15, 23, 42, 0.85)',
                }}
                itemStyle={{ color: '#e2e8f0' }}
                labelStyle={{ color: '#94a3b8', marginBottom: '6px' }}
              />
            </PieChart>
          </ResponsiveContainer>

          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="rounded-full border border-white/70 bg-white/80 px-6 py-4 text-center shadow-lg backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/70">
              <p className="text-xs font-medium uppercase tracking-[0.26em] text-slate-400 dark:text-slate-500">
                Total spend
              </p>
              <p className="mt-2 text-xl font-semibold tracking-tight text-slate-950 dark:text-white">
                {formatCompactCurrency(totalExpenses)}
              </p>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          {expenseData.map((item, index) => (
            <div
              key={item.name}
              className="glass-subpanel flex items-center justify-between gap-3 px-4 py-3"
            >
              <div className="flex items-center gap-3">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                />
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">
                    {item.name}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {formatPercent(item.value / totalExpenses)} of expenses
                  </p>
                </div>
              </div>

              <p className="text-sm font-semibold text-slate-950 dark:text-white">
                {formatCurrency(item.value)}
              </p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  )
}

export default ExpensePieChart
