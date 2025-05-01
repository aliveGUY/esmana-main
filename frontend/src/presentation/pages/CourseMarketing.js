import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

import { Stack } from '@mui/material'
import Conditions from '../components/Marketing/Conditions'
import Hero from '../components/Marketing/Hero'
import Image from '../components/Marketing/Image'
import Lectors from '../components/Marketing/Lectors'
import Lectures from '../components/Marketing/Lectures'

const CourseMarketing = () => {
  const { id } = useParams()
  const { availableCourses } = useSelector((state) => state.courses)
  const { title, description, mobileDescription, lectures, lectors } = availableCourses[id]

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
