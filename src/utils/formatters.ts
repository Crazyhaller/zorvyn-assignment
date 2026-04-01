const currencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 0,
})

const compactCurrencyFormatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  notation: 'compact',
  maximumFractionDigits: 1,
})

const percentFormatter = new Intl.NumberFormat('en-IN', {
  style: 'percent',
  maximumFractionDigits: 0,
})

const shortDateFormatter = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'short',
})

const longDateFormatter = new Intl.DateTimeFormat('en-IN', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

const monthLabelFormatter = new Intl.DateTimeFormat('en-IN', {
  month: 'short',
  year: 'numeric',
})

export const formatCurrency = (value: number) => currencyFormatter.format(value)

export const formatCompactCurrency = (value: number) =>
  compactCurrencyFormatter.format(value)

export const formatPercent = (value: number) =>
  percentFormatter.format(Number.isFinite(value) ? value : 0)

export const formatShortDate = (date: string) =>
  shortDateFormatter.format(new Date(date))

export const formatLongDate = (date: string) =>
  longDateFormatter.format(new Date(date))

export const formatMonthLabel = (date: string) =>
  monthLabelFormatter.format(new Date(date))
