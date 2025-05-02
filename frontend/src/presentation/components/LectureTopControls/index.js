import React from 'react'
import { isNull } from 'lodash'
import { Link } from 'react-router'

import { Button, Stack } from '@mui/material'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const LectureTopControls = ({ lecture }) => {
  const isNotPurchased = isNull(lecture.status)

  return (
    <Stack direction="row" justifyContent="space-between">
      <Button startIcon={<ArrowBackIcon />} to="/dashboard/courses" component={Link} variant="outlined">
        Back
      </Button>
      <Stack direction="row">{isNotPurchased && <Button variant="primary">Purchase</Button>}</Stack>
    </Stack>
  )
}

export default LectureTopControls
