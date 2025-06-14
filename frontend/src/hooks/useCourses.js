import { useSelector } from 'react-redux'

import { useAuth } from './useAuth'

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

export function useCourses() {
  const courses = useSelector((state) => state.courses.collection)
  const { user, isAuthorized } = useAuth()

  let availableCourses = []
  let ownedCourses = []

  if (isAuthorized) {
    ownedCourses = getUserCourses(courses, user.id)
    availableCourses = getOtherCourses(courses, user.id)
  }

  return {
    availableCourses,
    ownedCourses,
  }
}
