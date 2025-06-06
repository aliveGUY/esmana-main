import React from 'react'
import { Link, useParams } from 'react-router'

import { Button, Stack } from '@mui/material'
import { useAuth } from '../../../hooks/useAuth'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const LectureTopControls = ({ lecture }) => {
  const { user } = useAuth()
  const isPurchased = find(lecture.users, (u) => u.user.id === user?.id)
  const { courseId } = useParams()

  return (
    <Stack direction="row" justifyContent="space-between">
      <Button startIcon={<ArrowBackIcon />} to="/dashboard/courses" component={Link} variant="outlined">
        Back
      </Button>
      <Stack direction="row" spacing={2}>
        <Button variant="outlined" to={`/dashboard/course/edit/${courseId}`} component={Link}>
          Edit
        </Button>
        {!isPurchased && <Button variant="primary">Purchase</Button>}
      </Stack>
    </Stack>
  )
}

export default LectureTopControls
