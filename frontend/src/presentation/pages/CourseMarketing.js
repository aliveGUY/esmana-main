import React, { useEffect } from 'react'
import { find, flatMap } from 'lodash'
import { useParams } from 'react-router'

import { Stack } from '@mui/material'
import { useCourses } from '../../hooks/useCourses'
import { useGetCourseByIdMutation } from '../../state/asynchronous'
import Conditions from '../components/Marketing/Conditions'
import Hero from '../components/Marketing/Hero'
import Image from '../components/Marketing/Image'
import Lectors from '../components/Marketing/Lectors'
import Lectures from '../components/Marketing/Lectures'

const CourseMarketing = () => {
  const { id } = useParams()
  const { availableCourses } = useCourses()
  const course = find(availableCourses, (course) => course.id === Number(id))
  const [getCourseById] = useGetCourseByIdMutation()

  useEffect(() => {
    if (!course) {
      getCourseById(id)
    }
  }, [course])

  if (!course) return

  const { title, description, mobileDescription, lectures } = course

  const lectors = flatMap(lectures, (lecture) => lecture.users.map((entry) => entry.user))

  return (
    <Stack>
      <Hero title={title} description={description} mobileDescription={mobileDescription} />
      <Image />
      <Lectures lectures={lectures} />
      <Lectors lectors={lectors} />
      <Conditions />
    </Stack>
  )
}

export default CourseMarketing
