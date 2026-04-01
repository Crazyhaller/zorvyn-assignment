import { useAppSelector } from '../../../app/hooks'

const SummaryCards = () => {
  const transactions = useAppSelector(
    (state) => state.transactions.transactions,
  )

  const income = transactions
    .filter((t) => t.type === 'income')
    .reduce((acc, t) => acc + t.amount, 0)

  const expenses = transactions
    .filter((t) => t.type === 'expense')
    .reduce((acc, t) => acc + t.amount, 0)

  const balance = income - expenses

  const cards = [
    {
      title: 'Total Balance',
      value: balance,
      color: 'bg-blue-500',
    },
    {
      title: 'Income',
      value: income,
      color: 'bg-green-500',
    },
    {
      title: 'Expenses',
      value: expenses,
      color: 'bg-red-500',
    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className={`p-5 rounded-2xl text-white shadow-md ${card.color}`}
        >
          <h2 className="text-sm opacity-80">{card.title}</h2>
          <p className="text-2xl font-semibold mt-2">
            ₹ {card.value.toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  )
}

export default SummaryCards
