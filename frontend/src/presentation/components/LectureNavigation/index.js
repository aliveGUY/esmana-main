import React, { Fragment, useRef } from 'react'
import { isNull, map } from 'lodash'
import { useNavigate, useParams } from 'react-router'

import TouchRipple from '@mui/material/ButtonBase/TouchRipple'

import { Box, Stack, Typography } from '@mui/material'
import { useFormattedDates } from '../../../hooks/useFormattedDates'

import CheckCircleIcon from '@mui/icons-material/CheckCircle'
import LockIcon from '@mui/icons-material/Lock'

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

const LectureItem = ({ lecture }) => {
  const { title, startTime, endTime, status, materials, id } = lecture
  const rippleRef = useRef(null)
  const { lectureId, courseId } = useParams()
  const navigate = useNavigate()

  const { date, hoursStart, hoursEnd } = useFormattedDates({ startTime, endTime })

  const isPurchased = !isNull(status)
  const isAvailable = !isNull(materials)
  const isCompleted = isPurchased && status.completed
  const isSelected = Number(lectureId) === id

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
      <Stack direction="row" justifyContent="space-between" spacing={2}>
        <Typography fontWeight="bold" textOverflow="ellipsis" overflow="hidden" whiteSpace="nowrap">
          {title}
        </Typography>
        {icon}
      </Stack>
      <Stack direction="row" justifyContent="space-between">
        <Typography>{date}</Typography>
        <Typography>
          {hoursStart} - {hoursEnd}
        </Typography>
      </Stack>
      <Box sx={{ color: 'stormWave.light' }}>
        <TouchRipple ref={rippleRef} center={false} />
      </Box>
    </Stack>
  )
}

const LectureNavigation = ({ lectures }) => {
  return (
    <Stack
      spacing={1}
      sx={{
        backgroundColor: 'snowFog.main',
        borderRadius: '12px',
        px: 1,
        py: 2,
      }}
    >
      {map(lectures, (lecture) => (
        <LectureItem lecture={lecture} />
      ))}
    </Stack>
  )
}

export default LectureNavigation
