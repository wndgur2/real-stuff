export const secondsToTime = (seconds) => {
  const min = Math.floor((seconds % 3600) / 60)
  let sec = seconds % 60
  if (sec < 10) sec = '0' + sec
  return { min, sec }
}
