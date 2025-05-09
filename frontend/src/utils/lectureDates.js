import dayjs from 'dayjs'

export function convertLectureDatesFormToStorage({ date, startHour, endHour }) {
  const year = new Date(date).getFullYear()
  const month = new Date(date).getMonth()
  const _date = new Date(date).getDate()
  const startHours = new Date(startHour).getHours()
  const startMinutes = new Date(startHour).getMinutes()
  const endHours = new Date(endHour).getHours()
  const endMinutes = new Date(endHour).getMinutes()

  const _startHour = new Date()
  _startHour.setFullYear(year)
  _startHour.setMonth(month)
  _startHour.setDate(_date)
  _startHour.setHours(startHours)
  _startHour.setMinutes(startMinutes)

  const _endHour = new Date()
  _endHour.setFullYear(year)
  _endHour.setMonth(month)
  _endHour.setDate(_date)
  _endHour.setHours(endHours)
  _endHour.setMinutes(endMinutes)

  return { startHour: _startHour, endHour: _endHour }
}

export function convertLectureDatesStorageToInterface({ startHour, endHour }) {
  const date = dayjs(new Date(startHour)).format('DD.MM.YYYY')
  const _startHour = dayjs(new Date(startHour)).format('HH:mm')
  const _endHour = dayjs(new Date(endHour)).format('HH:mm')

  return { date, startHour: _startHour, endHour: _endHour }
}

export function convertLectureDatesStorageToForm({ startHour, endHour }) {
  const date = dayjs(new Date(startHour)).format('DD.MM.YYYY')

  return { date, startHour, endHour }
}
