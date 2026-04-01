import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { useAppSelector } from '../../../app/hooks'
import { motion } from 'framer-motion'

const BalanceChart = () => {
  const transactions = useAppSelector(
    (state) => state.transactions.transactions,
  )

  const sortedTransactions = [...transactions].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
  )

  let runningBalance = 0

  const data = sortedTransactions.map((t) => {
    runningBalance += t.type === 'income' ? t.amount : -t.amount

    return {
      date: t.date.slice(5),
      balance: runningBalance,
    }
  })

  return (
    <motion.div
      className="bg-white p-4 rounded-2xl shadow w-full"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="font-semibold mb-4">Balance Trend</h2>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#3b82f6"
              strokeWidth={3}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  )
}

export default BalanceChart
