import { useSelector } from 'react-redux'

import { useAuth } from './useAuth'
import { useParams } from 'react-router-dom'
import { filter, find, flatMap, head, isEmpty, last, map, sortBy } from 'lodash'
import dayjs from 'dayjs'

function getUserCourses(courses, userId) {
  return courses.filter((course) =>
    course.lectures.some((lecture) => lecture.users.some((userLecture) => userLecture.user.id === userId)),
  )
}

function getOtherCourses(courses, userId) {
  return courses.filter((course) =>
    course.lectures.every((lecture) => lecture.users.every((userLecture) => userLecture.user.id !== userId)),
  )
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

export function useCourses() {
  const courses = useSelector((state) => state.courses.collection)
  const { user, isAuthorized } = useAuth()
  const { courseId, lectureId } = useParams()

  let availableCourses = null
  let ownedCourses = null
  let sortedLectures = []
  let blockedLectures = []
  let userLectures = []
  let blockedLectureIds = []
  let isFirstLecture = false
  let isLastLecture = false
  let currentLecture = null
  let firstIncompleteLectureId = null

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

  const getFirstIncompleteLectureId = (lectures) => {
    const sortedLectures = sortLectures(lectures)
    return _getFirstIncompleteLectureId(sortedLectures)
  }

  if (isAuthorized) {
    ownedCourses = getUserCourses(courses, user.id)
    const course = find(ownedCourses, (course) => course.id === Number(courseId))

    availableCourses = getOtherCourses(courses, user.id)
    sortedLectures = sortBy(course?.lectures, (item) => dayjs(item?.startTime).valueOf())
  }

  if (!isEmpty(sortedLectures)) {
    currentLecture = find(sortedLectures, (lecture) => lecture.id === Number(lectureId))
    userLectures = filter(flatMap(sortedLectures, 'users'), (userLecture) => userLecture.user.id === user.id)
    isFirstLecture = head(sortedLectures).id === Number(lectureId)
    isLastLecture = last(sortedLectures).id === Number(lectureId)
    blockedLectureIds = getIncompleteLectureIds(userLectures)
    firstIncompleteLectureId = _getFirstIncompleteLectureId(sortedLectures)
  }

  return {
    availableCourses,
    ownedCourses,
    userLectures,
    blockedLectures,
    sortedLectures,
    blockedLectureIds,
    currentLecture,
    firstIncompleteLectureId,
    getFirstIncompleteLectureId,
    sortLectures,
  }
}
