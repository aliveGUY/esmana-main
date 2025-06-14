import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import dayjs from 'dayjs'
import { filter, find, findIndex, flatMap, head, isEmpty, last, map, slice, sortBy } from 'lodash'

import { useAuth } from './useAuth'

function getSubarrayBetweenIds(array, startId, endId, offset = 0) {
  const startIndex = findIndex(array, { id: startId })
  const endIndex = findIndex(array, { id: endId })
  if (startIndex === -1 || endIndex === -1 || endIndex <= startIndex) {
    return []
  }

  return slice(array, startIndex + offset, endIndex + offset)
}

const getIncompleteLectureIds = (userLectures) => {
  const firstIncompleteLecture = find(userLectures, (userLecture) => {
    return !userLecture.isCompleted
  })

  const incompleteLectures = filter(
    userLectures,
    (userLecture) => !userLecture.isCompleted && userLecture.lecture !== firstIncompleteLecture?.lecture,
  )

  return map(incompleteLectures, 'lecture')
}

export function useLectures() {
  const courses = useSelector((state) => state.courses.collection)
  const { courseId, lectureId } = useParams()
  const { user } = useAuth()

  const currentCourse = find(courses, (course) => course.id === Number(courseId))

  let sortedLectures = []
  let userLectures = []
  let blockedLectureIds = []
  let isFirstLecture = false
  let isLastLecture = false
  let currentLecture = null
  let currentUserLecture = null
  let firstIncompleteLectureId = null
  let nextAvailableLectureLink = null
  let previousAvailableLectureLink = null

  const sortLectures = (lectures) => {
    return sortBy(lectures, (item) => dayjs(item?.startTime).valueOf())
  }

  const _getFirstIncompleteLectureId = (sortedLectures) => {
    return find(sortedLectures, (lecture) =>
      lecture.users?.some((userLecture) => {
        return userLecture.user.id === user?.id && !userLecture.isCompleted
      }),
    ).id
  }
  const _getNextAvailableLecture = (sortedLectures, firstIncompleteLectureId) => {
    const nextLectures = getSubarrayBetweenIds(sortedLectures, Number(lectureId), firstIncompleteLectureId, 1)

    if (isEmpty(nextLectures)) return null

    const nextNavigableLecture = head(nextLectures)
    return `/dashboard/course/${courseId}/${nextNavigableLecture.id}`
  }

  const _getPreviousLecture = (sortedLectures) => {
    const firstLecture = head(sortedLectures)
    const previousLectures = getSubarrayBetweenIds(sortedLectures, firstLecture.id, Number(lectureId))
    if (isEmpty(previousLectures)) return null

    const previousLecture = last(previousLectures)
    return `/dashboard/course/${courseId}/${previousLecture.id}`
  }

  const getFirstIncompleteLectureId = (lectures) => {
    const sortedLectures = sortLectures(lectures)
    return _getFirstIncompleteLectureId(sortedLectures)
  }

  if (currentCourse && lectureId) {
    sortedLectures = sortBy(currentCourse?.lectures, (item) => dayjs(item?.startTime).valueOf())
    currentLecture = find(sortedLectures, (lecture) => lecture.id === Number(lectureId))
    currentUserLecture = find(currentLecture.users, (userLecture) => userLecture.user.id === user.id)
    userLectures = filter(flatMap(sortedLectures, 'users'), (userLecture) => userLecture.user.id === user.id)
    isFirstLecture = head(sortedLectures).id === Number(lectureId)
    isLastLecture = last(sortedLectures).id === Number(lectureId)
    blockedLectureIds = getIncompleteLectureIds(userLectures)
    firstIncompleteLectureId = _getFirstIncompleteLectureId(sortedLectures)
    nextAvailableLectureLink = _getNextAvailableLecture(sortedLectures, firstIncompleteLectureId)
    previousAvailableLectureLink = _getPreviousLecture(sortedLectures)
  }

  return {
    sortedLectures,
    userLectures,
    blockedLectureIds,
    isFirstLecture,
    isLastLecture,
    currentLecture,
    currentUserLecture,
    firstIncompleteLectureId,
    nextAvailableLectureLink,
    previousAvailableLectureLink,
    sortLectures,
    getFirstIncompleteLectureId,
  }
}
