import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import DarkModeToggle from '../components/DarkModeToggle'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import BalanceChart from '../features/dashboard/components/BalanceChart'
import ExpensePieChart from '../features/dashboard/components/ExpensePieChart'
import SummaryCards from '../features/dashboard/components/SummaryCard'
import Insights from '../features/insights/components/Insights'
import RoleSwitcher from '../features/role/RoleSwitcher'
import AddTransactionForm from '../features/transactions/components/AddTransactionForm'
import TransactionsControls from '../features/transactions/components/TransactionsControl'
import TransactionsTable from '../features/transactions/components/TransactionsTable'
import { setTransactions } from '../features/transactions/transactionsSlice'
import { fetchTransactions } from '../utils/mockApi'
import {
  formatCompactCurrency,
  formatCurrency,
  formatLongDate,
} from '../utils/formatters'

const Dashboard = () => {
  const dispatch = useAppDispatch()
  const role = useAppSelector((state) => state.role.role)
  const transactions = useAppSelector((state) => state.transactions.transactions)
  const [loading, setLoading] = useState(transactions.length === 0)

  useEffect(() => {
    if (transactions.length > 0) {
      setLoading(false)
      return
    }

    let isMounted = true

    const loadData = async () => {
      const data = await fetchTransactions()

      if (!isMounted) return

      dispatch(setTransactions(data))
      setLoading(false)
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [dispatch, transactions.length])

  const balance = transactions.reduce(
    (sum, transaction) =>
      sum +
      (transaction.type === 'income' ? transaction.amount : -transaction.amount),
    0,
  )
  const totalVolume = transactions.reduce(
    (sum, transaction) => sum + transaction.amount,
    0,
  )
  const categories = new Set(transactions.map((transaction) => transaction.category))
  const latestTransaction = [...transactions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  )[0]

  if (loading) {
    return (
      <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl animate-pulse space-y-6">
          <div className="glass-panel h-72 bg-white/70 dark:bg-white/[0.04]" />
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <div
                key={index}
                className="h-36 rounded-[28px] bg-white/70 shadow-sm dark:bg-white/[0.04]"
              />
            ))}
          </div>
          <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
            <div className="glass-panel h-96 bg-white/70 dark:bg-white/[0.04]" />
            <div className="space-y-6">
              <div className="glass-panel h-80 bg-white/70 dark:bg-white/[0.04]" />
              <div className="glass-panel h-64 bg-white/70 dark:bg-white/[0.04]" />
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen px-4 py-6 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl space-y-6">
        <motion.section
          className="glass-panel relative overflow-hidden p-6 sm:p-8 lg:p-10"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45 }}
        >
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-sky-400/80 to-transparent" />
          <div className="absolute -left-16 top-8 h-48 w-48 rounded-full bg-sky-400/20 blur-3xl" />
          <div className="absolute right-0 top-0 h-56 w-56 rounded-full bg-blue-500/15 blur-3xl" />

          <div className="relative grid gap-8 xl:grid-cols-[1.6fr_0.9fr]">
            <div className="space-y-6">
              <div className="space-y-4">
                <p className="eyebrow">Finance command center</p>
                <div className="space-y-4">
                  <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-slate-950 dark:text-white sm:text-5xl">
                    Clean cash-flow visibility, designed like a modern SaaS
                    workspace.
                  </h1>
                  <p className="max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
                    Monitor balance, spending, and transaction activity from one
                    polished dashboard with stronger hierarchy, smoother motion,
                    and clearer next actions.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                <span className="pill-badge">
                  Portfolio balance {formatCompactCurrency(balance)}
                </span>
                <span className="pill-badge">
                  Transaction volume {formatCompactCurrency(totalVolume)}
                </span>
                <span className="pill-badge">
                  {categories.size} active categories
                </span>
                <span className="pill-badge">
                  {transactions.length} records synced
                </span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="glass-subpanel p-4 sm:p-5">
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="space-y-2">
                    <p className="eyebrow">Workspace controls</p>
                    <p className="section-copy max-w-sm">
                      Switch theme and permissions without leaving your primary
                      finance view.
                    </p>
                  </div>

                  <DarkModeToggle />
                </div>

                <div className="mt-4">
                  <RoleSwitcher />
                </div>
              </div>

              <div className="glass-subpanel p-5">
                <p className="eyebrow">Operational snapshot</p>

                <div className="mt-4 grid gap-4 sm:grid-cols-2">
                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Net position
                    </p>
                    <p className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">
                      {formatCurrency(balance)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Latest activity
                    </p>
                    <p className="mt-2 text-base font-semibold text-slate-900 dark:text-white">
                      {latestTransaction?.category ?? 'Awaiting activity'}
                    </p>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                      {latestTransaction
                        ? formatLongDate(latestTransaction.date)
                        : 'Add or sync your first transaction'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        <SummaryCards />

        <div className="grid gap-6 xl:grid-cols-[1.5fr_1fr]">
          <BalanceChart />

          <div className="space-y-6">
            <ExpensePieChart />
            <Insights />
          </div>
        </div>

        {role === 'admin' && <AddTransactionForm />}

        <section className="space-y-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div className="space-y-2">
              <p className="eyebrow">Transactions</p>
              <div>
                <h2 className="section-title text-2xl">Activity ledger</h2>
                <p className="section-copy">
                  Search, sort, and scan every movement with a cleaner data-table
                  experience.
                </p>
              </div>
            </div>

            <span className="pill-badge">
              Last updated{' '}
              {latestTransaction
                ? formatLongDate(latestTransaction.date)
                : 'waiting for data'}
            </span>
          </div>

          <TransactionsControls />
          <TransactionsTable />
        </section>
      </div>
    </div>
  )
}

export default Dashboard
