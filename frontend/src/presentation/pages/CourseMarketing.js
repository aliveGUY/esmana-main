import React from 'react'
import { useParams } from 'react-router'

import { Stack } from '@mui/material'
import Conditions from '../components/Marketing/Conditions'
import Hero from '../components/Marketing/Hero'
import Image from '../components/Marketing/Image'
import Lectors from '../components/Marketing/Lectors'
import Lectures from '../components/Marketing/Lectures'
import { useCourses } from '../../hooks/useCourses'
import { find } from 'lodash'

const CourseMarketing = () => {
  const { id } = useParams()
  const { availableCourses } = useCourses()
  const course = find(availableCourses, (course) => course.id === Number(id))

  if (!course) return

  const { title, description, mobileDescription, lectures, lectors } = course

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
