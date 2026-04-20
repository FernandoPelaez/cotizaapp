export const cleanNumber = (value: string) => {
  const num = Number(value)
  return Number.isNaN(num) ? 0 : num
}

export const formatMoney = (value: number) => {
  return new Intl.NumberFormat("es-MX", {
    style: "currency",
    currency: "MXN",
    minimumFractionDigits: 2,
  }).format(value || 0)
}
