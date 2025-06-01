export function useFormattedDates({ startTime = new Date(), endTime = new Date() }) {
  const date = new Date(startTime).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const hoursStart = new Date(startTime).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  const hoursEnd = new Date(endTime).toLocaleTimeString('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })

  return { date, hoursStart, hoursEnd }
}
