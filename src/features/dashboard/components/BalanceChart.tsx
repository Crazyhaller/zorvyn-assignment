import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { motion } from 'motion/react'
import { useAppSelector } from '../../../app/hooks'
import {
  formatCompactCurrency,
  formatCurrency,
  formatLongDate,
  formatShortDate,
} from '../../../utils/formatters'

const BalanceChart = () => {
  const transactions = useAppSelector(
    (state) => state.transactions.transactions,
  )

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  )

  let runningBalance = 0

  const data = sortedTransactions.map((transaction) => {
    runningBalance +=
      transaction.type === 'income' ? transaction.amount : -transaction.amount

    return {
      date: transaction.date,
      balance: runningBalance,
    }
  })

  const latestBalance = data[data.length - 1]?.balance ?? 0
  const peakBalance = data.reduce(
    (highest, point) => Math.max(highest, point.balance),
    0,
  )

  if (data.length === 0) {
    return (
      <div className="glass-panel p-5 sm:p-6">
        <div className="flex h-72 items-center justify-center rounded-[24px] border border-dashed border-slate-300/70 bg-slate-50/70 text-center dark:border-white/10 dark:bg-white/[0.03]">
          <div className="space-y-2">
            <p className="section-title">Balance trend</p>
            <p className="section-copy">
              Add more transactions to unlock your running cash-balance view.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      className="glass-panel min-w-0 p-5 sm:p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.08 }}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-2">
          <p className="eyebrow">Cash flow</p>
          <div>
            <h2 className="section-title text-2xl">Balance trend</h2>
            <p className="section-copy">
              Running balance across your full transaction timeline.
            </p>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div className="glass-subpanel px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
              Current
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">
              {formatCompactCurrency(latestBalance)}
            </p>
          </div>
          <div className="glass-subpanel px-4 py-3">
            <p className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
              Peak
            </p>
            <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">
              {formatCompactCurrency(peakBalance)}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 4, left: -20, bottom: 0 }}
          >
            <defs>
              <linearGradient id="balanceFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.35} />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid
              vertical={false}
              strokeDasharray="4 4"
              stroke="rgba(148, 163, 184, 0.28)"
            />
            <XAxis
              dataKey="date"
              tickFormatter={formatShortDate}
              tick={{ fill: '#64748b', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tickFormatter={(value) => formatCompactCurrency(Number(value))}
              tick={{ fill: '#64748b', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={76}
            />
            <Tooltip
              cursor={{ stroke: '#0ea5e9', strokeOpacity: 0.18, strokeWidth: 10 }}
              formatter={(value) => formatCurrency(Number(value))}
              labelFormatter={(label) => formatLongDate(String(label))}
              contentStyle={{
                borderRadius: '20px',
                border: '1px solid rgba(148, 163, 184, 0.22)',
                background: 'rgba(15, 23, 42, 0.92)',
                boxShadow: '0 20px 45px -28px rgba(15, 23, 42, 0.85)',
              }}
              itemStyle={{ color: '#e2e8f0' }}
              labelStyle={{ color: '#94a3b8', marginBottom: '6px' }}
            />
            <Area
              type="monotone"
              dataKey="balance"
              stroke="#38bdf8"
              strokeWidth={3}
              fill="url(#balanceFill)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

export default BalanceChart
