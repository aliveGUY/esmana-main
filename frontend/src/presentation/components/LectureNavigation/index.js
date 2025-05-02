import React from 'react'
import { map } from 'lodash'

import { Stack } from '@mui/material'
import LectureItem from './LectureItem'

const LectureNavigation = ({ lectures }) => {
  return (
    <Stack
      spacing={1}
      sx={{
        backgroundColor: 'snowFog.main',
        borderRadius: '12px',
        px: 1,
        py: 2,
        height: 'min-content',
      }}
    >
      {map(lectures, (lecture) => (
        <LectureItem lecture={lecture} />
      ))}
    </Stack>
  )
}

export default LectureNavigation
