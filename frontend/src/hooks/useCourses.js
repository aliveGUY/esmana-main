import { useAuth } from './useAuth'
import { useSelector } from 'react-redux'

function getUserCourses(courses, userId) {
  return courses.filter((course) =>
    course.lectures.some((lecture) => lecture.users.some((userLecture) => userLecture.userId === userId)),
  )
}

function getOtherCourses(courses, userId) {
  return courses.filter((course) =>
    course.lectures.every((lecture) => lecture.users.every((userLecture) => userLecture.userId !== userId)),
  )
}

export function useCourses() {
  const courses = useSelector((state) => state.courses.collection)
  const { user, isAuthorized } = useAuth()

  let availableCourses = null
  let ownedCourses = null

  if (!isAuthorized) return { availableCourses, ownedCourses }

  availableCourses = getOtherCourses(courses, user.id)
  ownedCourses = getUserCourses(courses, user.id)

  console.log({ availableCourses, ownedCourses })

  return { availableCourses, ownedCourses }
}
