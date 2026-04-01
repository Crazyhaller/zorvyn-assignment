import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../app/hooks'
import { setTransactions } from '../features/transactions/transactionsSlice'
// import { mockTransactions } from '../data/mockData'
import BalanceChart from '../features/dashboard/components/BalanceChart'
import ExpensePieChart from '../features/dashboard/components/ExpensePieChart'
import SummaryCards from '../features/dashboard/components/SummaryCard'
import TransactionsControls from '../features/transactions/components/TransactionsControl'
import TransactionsTable from '../features/transactions/components/TransactionsTable'
import RoleSwitcher from '../features/role/RoleSwitcher'
import AddTransactionForm from '../features/transactions/components/AddTransactionForm'
import Insights from '../features/insights/components/Insights'
import DarkModeToggle from '../components/DarkModeToggle'
import { fetchTransactions } from '../utils/mockApi'

const Dashboard = () => {
  const dispatch = useAppDispatch()
  const role = useAppSelector((state) => state.role.role)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchTransactions()
      dispatch(setTransactions(data))
      setLoading(false)
    }

    loadData()
  }, [])

  useEffect(() => {
    const loadData = async () => {
      const data = await fetchTransactions()
      dispatch(setTransactions(data))
    }

    loadData()
  }, [dispatch])

  if (loading) return <p className="p-6">Loading...</p>

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Finance Dashboard</h1>
        <div className="flex items-center gap-3">
          <DarkModeToggle />
          <RoleSwitcher />
        </div>
      </div>

      <SummaryCards />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 min-w-0">
        <BalanceChart />
        <ExpensePieChart />
      </div>

      <Insights />

      {role === 'admin' && <AddTransactionForm />}

      <TransactionsControls />
      <TransactionsTable />
    </div>
  )
}

export default Dashboard
