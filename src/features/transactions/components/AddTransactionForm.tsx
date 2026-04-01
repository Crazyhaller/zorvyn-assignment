import { useState } from 'react'
import { useAppDispatch } from '../../../app/hooks'
import { addTransaction } from '../transactionsSlice'

const AddTransactionForm = () => {
  const dispatch = useAppDispatch()

  const [form, setForm] = useState({
    amount: '',
    category: '',
    type: 'expense',
    date: '',
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
      date: '',
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow flex flex-col md:flex-row gap-3"
    >
      <input
        type="number"
        placeholder="Amount"
        value={form.amount}
        onChange={(e) => setForm({ ...form, amount: e.target.value })}
        className="p-2 border rounded-lg"
      />

      <input
        type="text"
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        className="p-2 border rounded-lg"
      />

      <input
        type="date"
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
        className="p-2 border rounded-lg"
      />

      <select
        value={form.type}
        onChange={(e) => setForm({ ...form, type: e.target.value })}
        className="p-2 border rounded-lg"
      >
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>

      <button type="submit" className="bg-blue-500 text-white px-4 rounded-lg">
        Add
      </button>
    </form>
  )
}

export default AddTransactionForm
