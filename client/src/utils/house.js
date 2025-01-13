const meterToPyung = (area) => Math.floor(area * 0.3025 * 10) / 10
const koreanPrice = (price) => {
  const units = ['', '만', '억', '조']

  price = Math.floor(price / 10000) * 10000

  let res = ''
  let values = []
  while (price > 0) {
    values.push(price % 10000)
    price = Math.floor(price / 10000)
  }

  for (let i = values.length - 1; i >= 0; i--) {
    if (values[i] > 0) {
      res += values[i] + units[i] + ' '
    }
  }
  return res
}

const simplePrice = (price) => {
  return Math.floor(price / 10000000) / 10 + '억'
}

const defineSaleType = (type) => {
  switch (type) {
    case 'SALE':
      return '매매'
    case 'RENT':
      return '전세'
    case 'MONTHLY_RENT':
      return '월세'

    default:
      break
  }
}

export { meterToPyung, koreanPrice, simplePrice, defineSaleType }
