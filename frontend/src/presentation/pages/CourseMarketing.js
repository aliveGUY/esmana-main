import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

import { Stack } from '@mui/material'
import Hero from '../components/Marketing/Hero'
import Image from '../components/Marketing/Image'
import Lectures from '../components/Marketing/Lectures'
import Lectors from '../components/Marketing/Lectors'

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
    </Stack>
  )
}

export default CourseMarketing
