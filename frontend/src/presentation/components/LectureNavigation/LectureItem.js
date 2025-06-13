import React, { Fragment, useRef } from 'react'
import { find, some } from 'lodash'
import { useNavigate, useParams } from 'react-router'

import TouchRipple from '@mui/material/ButtonBase/TouchRipple'

import { Box, Stack, Typography } from '@mui/material'
import { useAuth } from '../../../hooks/useAuth'
import { useFormattedDates } from '../../../utils/lectureDates'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import LockIcon from '@mui/icons-material/Lock'
import dayjs from 'dayjs'

const itemStylesFactory = ({ isPurchased, isAvailable, isCompleted }) => {
  if (!isPurchased) {
    return {
      color: 'stormWave.main',
      backgroundColor: 'snowFog.main',
      icon: <LockIcon />,
    }
  }

  if (!isAvailable) {
    return {
      color: 'black',
      backgroundColor: 'snowFog.main',
      icon: <Fragment />,
    }
  }

  if (isCompleted) {
    return {
      color: 'black',
      backgroundColor: 'white',
      icon: <CheckCircleIcon color="success" />,
    }
  }

  return {
    color: 'black',
    backgroundColor: 'white',
    icon: <Fragment />,
  }
}

const LectureItem = ({ lecture, isIncomplete }) => {
  const { title, startTime, endTime, users, id } = lecture
  const rippleRef = useRef(null)
  const { lectureId, courseId } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()

  const { date, hoursStart, hoursEnd } = useFormattedDates({ startTime, endTime })

  const status = find(users, (u) => u.user.id === user.id)

  const isPurchased = some(users, (userLecture) => userLecture.user.id === user?.id)
  const isCompleted = isPurchased && status.isCompleted
  const isSelected = Number(lectureId) === id
  const isAvailable = isPurchased && !isIncomplete
  const isEndInPast = dayjs(endTime).isBefore(dayjs(), 'day')

  const { color, backgroundColor, icon } = itemStylesFactory({
    isPurchased,
    isAvailable,
    isCompleted,
  })

  const onRippleStart = (e) => {
    if (!(isAvailable || !isPurchased)) return
    rippleRef.current.start(e)
  }

  const onRippleStop = (e) => {
    if (!(isAvailable || !isPurchased)) return
    rippleRef.current.stop(e)
    navigate(`/dashboard/course/${courseId}/${id}`)
  }

  return (
    <Stack
      sx={{
        flex: 1,
        borderRadius: '12px',
        overflow: 'hidden',
        backgroundColor,
        color,
        px: 2,
        py: 1,
        position: 'relative',
        display: 'inline-block',
        border: '4px solid',
        borderColor: isSelected ? 'primary.main' : backgroundColor,
        transition: 'border-color .3s',

        ...((isAvailable || !isPurchased) && {
          cursor: 'pointer',
          '&:hover': {
            borderColor: isSelected ? 'primary.main' : 'snowFog.dark',
          },
        }),
      }}
      onMouseDown={onRippleStart}
      onMouseUp={onRippleStop}
    >
      <Box
        width="100%"
        sx={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 1,
        }}
      >
        <Typography fontWeight="bold" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
          {title}
        </Typography>
        {icon}
      </Box>

      <Stack direction="row" justifyContent="space-between" display={{ xs: 'none', md: 'flex' }} sx={{ pt: 1 }}>
        <Typography>{date}</Typography>

        {isEndInPast ? (
          <Typography>Video</Typography>
        ) : (
          <Typography>
            {hoursStart} - {hoursEnd}
          </Typography>
        )}
      </Stack>

      <Box sx={{ color: 'stormWave.light' }}>
        <TouchRipple ref={rippleRef} center={false} />
      </Box>
    </Stack>
  )
}

export default LectureItem
