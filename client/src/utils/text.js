export const trimText = (text, maxLength) => {
  if (text.length > maxLength) {
    return `${text.substring(0, maxLength)}...`
  }
  return text
}

export const regionToString = (region) => {
  return `${region.sido} ${region.gugun} ${region.dong}`
}
