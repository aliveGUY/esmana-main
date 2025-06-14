import React from 'react'
import { some } from 'lodash'
import { Link, useParams } from 'react-router'

import { Button, Stack } from '@mui/material'
import { useAuth, useLectures } from '../../../hooks'

import ArrowBackIcon from '@mui/icons-material/ArrowBack'

const LectureTopControls = () => {
  const { currentLecture } = useLectures()
  const { user, isAdmin } = useAuth()
  const { courseId } = useParams()

  const isPurchased = some(currentLecture.users, (userLecture) => userLecture.user.id === user?.id)

  return (
    <Stack direction="row" justifyContent="space-between">
      <Button startIcon={<ArrowBackIcon />} to="/dashboard/courses" component={Link} variant="outlined">
        Back
      </Button>
      <Stack direction="row" spacing={2}>
        {isAdmin && (
          <Button variant="outlined" to={`/dashboard/course/edit/${courseId}`} component={Link}>
            Edit
          </Button>
        )}
        {!isPurchased && <Button variant="primary">Purchase</Button>}
      </Stack>
    </Stack>
  )
}

export default LectureTopControls
