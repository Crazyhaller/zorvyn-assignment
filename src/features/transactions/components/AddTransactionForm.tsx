import { useState } from 'react'
import { useAppDispatch } from '../../../app/hooks'
import { addTransaction } from '../transactionsSlice'

const getToday = () => new Date().toISOString().slice(0, 10)

const AddTransactionForm = () => {
  const dispatch = useAppDispatch()

  const [form, setForm] = useState({
    amount: '',
    category: '',
    type: 'expense',
    date: getToday(),
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!form.amount || !form.category || !form.date) return

    dispatch(
      addTransaction({
        id: Date.now().toString(),
        amount: Number(form.amount),
        category: form.category,
        type: form.type as 'income' | 'expense',
        date: form.date,
      }),
    )

    setForm({
      amount: '',
      category: '',
      type: 'expense',
      date: getToday(),
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-panel p-5 sm:p-6"
    >
      <div className="flex flex-col gap-3 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="eyebrow">Admin tools</p>
          <div className="mt-2">
            <h2 className="section-title text-2xl">Quick-add transaction</h2>
            <p className="section-copy">
              Capture a new movement without leaving the dashboard flow.
            </p>
          </div>
        </div>

        <span className="pill-badge">Admin access enabled</span>
      </div>

      <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-[1fr_1fr_0.9fr_0.8fr_auto]">
        <label className="space-y-2">
          <span className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
            Amount
          </span>
          <input
            type="number"
            min="0"
            placeholder="25000"
            value={form.amount}
            onChange={(e) => setForm({ ...form, amount: e.target.value })}
            className="control-input"
          />
        </label>

        <label className="space-y-2">
          <span className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
            Category
          </span>
          <input
            type="text"
            placeholder="Salary, rent, software..."
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="control-input"
          />
        </label>

        <label className="space-y-2">
          <span className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
            Date
          </span>
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="control-input"
          />
        </label>

        <label className="space-y-2">
          <span className="text-xs font-medium uppercase tracking-[0.24em] text-slate-400 dark:text-slate-500">
            Type
          </span>
          <select
            value={form.type}
            onChange={(e) => setForm({ ...form, type: e.target.value })}
            className="control-input appearance-none"
          >
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
        </label>

        <div className="space-y-2">
          <span className="block text-xs font-medium uppercase tracking-[0.24em] text-transparent">
            Submit
          </span>
          <button
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white shadow-[0_18px_35px_-20px_rgba(15,23,42,0.9)] hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-sky-500 dark:text-slate-950 dark:hover:bg-sky-400"
          >
            Add transaction
          </button>
        </div>
      </div>
    </form>
  )
}

export default AddTransactionForm
