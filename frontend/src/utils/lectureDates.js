import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import timezone from 'dayjs/plugin/timezone'
import utc from 'dayjs/plugin/utc'

import 'dayjs/locale/en-gb'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(localizedFormat)

dayjs.locale('en-gb')

export function convertLectureDatesFormToStorage({ date, startTime, endTime }) {
  const baseDate = dayjs(date)

  const _startTime = baseDate
    .hour(dayjs(startTime).hour())
    .minute(dayjs(startTime).minute())
    .second(0)
    .millisecond(0)
    .utc()

  const _endTime = baseDate.hour(dayjs(endTime).hour()).minute(dayjs(endTime).minute()).second(0).millisecond(0).utc() // Convert to UTC

  return {
    startTime: _startTime.toISOString(),
    endTime: _endTime.toISOString(),
  }
}

export function convertLectureDatesStorageToInterface({ startTime, endTime }) {
  const start = dayjs.utc(startTime).local()
  const end = dayjs.utc(endTime).local()

  return {
    date: start.format('DD.MM.YYYY'),
    startTime: start.format('HH:mm'),
    endTime: end.format('HH:mm'),
  }
}

export function convertLectureDatesStorageToForm({ startTime, endTime }) {
  const start = dayjs.utc(startTime).local()
  const end = dayjs.utc(endTime).local()

  return {
    date: start.format('YYYY-MM-DD'),
    startTime: start.toISOString(),
    endTime: end.toISOString(),
  }
}

export function useFormattedDates({ startTime = dayjs(), endTime = dayjs() }) {
  const start = dayjs.utc(startTime).local().locale('en-gb')
  const end = dayjs.utc(endTime).local().locale('en-gb')

  return {
    date: start.format('D MMMM YYYY'),
    hoursStart: start.format('HH:mm'),
    hoursEnd: end.format('HH:mm'),
  }
}
