import { useParams } from 'react-router-dom'
import { useAuth } from './useAuth'
import { useSelector } from 'react-redux'
import { filter, find, flatMap, head, last, map, sortBy } from 'lodash'
import dayjs from 'dayjs'

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

  const course = find(courses, (course) => course.id === Number(courseId))

  let sortedLectures = []
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

  if (course) {
    sortedLectures = sortBy(course?.lectures, (item) => dayjs(item?.startTime).valueOf())
    currentLecture = find(sortedLectures, (lecture) => lecture.id === Number(lectureId))
    userLectures = filter(flatMap(sortedLectures, 'users'), (userLecture) => userLecture.user.id === user.id)
    isFirstLecture = head(sortedLectures).id === Number(lectureId)
    isLastLecture = last(sortedLectures).id === Number(lectureId)
    blockedLectureIds = getIncompleteLectureIds(userLectures)
    firstIncompleteLectureId = _getFirstIncompleteLectureId(sortedLectures)
  }

  return {
    sortedLectures,
    userLectures,
    blockedLectureIds,
    isFirstLecture,
    isLastLecture,
    currentLecture,
    firstIncompleteLectureId,
    sortLectures,
    getFirstIncompleteLectureId,
  }
}
