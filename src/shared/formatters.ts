const locales: string | string[] = 'en-US'

export const formatCurrency = (value: number) => currencyFormatter.format(value)

const currencyFormatter = new Intl.NumberFormat(locales, {
  style: 'currency',
  currency: 'USD',
})

export const formatCurrencyCompact = (value: number) => compactCurrencyFormatter.format(value)

const compactCurrencyFormatter = new Intl.NumberFormat(locales, {
  style: 'currency',
  currency: 'USD',
  notation: 'compact',
})

export const formatPercent = (value: number) => percentFormatter.format(value)

const percentFormatter = new Intl.NumberFormat(locales, {
  style: 'percent',
  minimumFractionDigits: 2,
})
