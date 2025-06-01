import dayjs from 'dayjs'

export function convertLectureDatesFormToStorage({ date, startTime, endTime }) {
  const year = new Date(date).getFullYear()
  const month = new Date(date).getMonth()
  const _date = new Date(date).getDate()
  const startHours = new Date(startTime).getHours()
  const startMinutes = new Date(startTime).getMinutes()
  const endHours = new Date(endTime).getHours()
  const endMinutes = new Date(endTime).getMinutes()

  const _startTime = new Date()
  _startTime.setFullYear(year)
  _startTime.setMonth(month)
  _startTime.setDate(_date)
  _startTime.setHours(startHours)
  _startTime.setMinutes(startMinutes)

  const _endTime = new Date()
  _endTime.setFullYear(year)
  _endTime.setMonth(month)
  _endTime.setDate(_date)
  _endTime.setHours(endHours)
  _endTime.setMinutes(endMinutes)

  return { startTime: _startTime, endTime: _endTime }
}

export function convertLectureDatesStorageToInterface({ startTime, endTime }) {
  const date = dayjs(new Date(startTime)).format('DD.MM.YYYY')
  const _startTime = dayjs(new Date(startTime)).format('HH:mm')
  const _endTime = dayjs(new Date(endTime)).format('HH:mm')

  return { date, startTime: _startTime, endTime: _endTime }
}

export function convertLectureDatesStorageToForm({ startTime, endTime }) {
  const date = dayjs(new Date(startTime)).format('DD.MM.YYYY')

  return { date, startTime, endTime }
}
