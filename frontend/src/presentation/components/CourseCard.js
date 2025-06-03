import React, { Fragment, useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { Box, Divider, Grid2, Paper, Stack, Typography } from '@mui/material'
import { highlightCourse, removeHighlightedCourse } from '../../state/reducers/courses'
import EmptyImage from '../../static/images/no-image.jpg'
import { getTotalHours } from './OwnedCourseCard'
import { serveStaticImage } from '../../state/asynchronous'

export const getTotalPrice = (lectures) => {
  return lectures.reduce((sum, lecture) => {
    const price = Number(lecture.price)
    return sum + (isNaN(price) ? 0 : price)
  }, 0)
}

const CourseCard = ({ course }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { title, description, id, lectures, thumbnailUrl } = course

  const price = getTotalPrice(lectures)
  const lecturesCount = lectures.length
  const hoursCount = getTotalHours(lectures)

  const handleCourseHighlight = () => {
    dispatch(highlightCourse(course))
  }

  const handleRemoveHighlightedCourse = () => {
    dispatch(removeHighlightedCourse())
  }

  const redirect = useCallback(() => {
    handleRemoveHighlightedCourse()
    navigate(`/dashboard/course-details/${id}`)
  }, [navigate])

  return (
    <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
      <Paper
        onClick={redirect}
        onMouseEnter={handleCourseHighlight}
        onMouseLeave={handleRemoveHighlightedCourse}
        sx={{
          height: 400,
          overflow: 'hidden',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',

          '&:hover .image': {
            height: '20%',

            '&::after': {
              opacity: 1,
            },
          },
          '&:hover .body': {
            height: '80%',

            '& .details': {
              transform: 'translateY(100%)',
              boxShadow: 'none',
            },
          },
        }}
      >
        <Box
          className="image"
          sx={{
            transition: 'height .3s',
            height: '50%',
            overflow: 'hidden',
            position: 'relative',
            img: {
              position: 'absolute',
              top: 0,
              left: '50%',
              bottom: 0,
              right: 0,
              height: '100%',
              width: '100%',
              objectFit: 'cover',
              transform: 'translateX(-50%)',
            },

            '&::after': {
              transition: 'opacity .3s',
              content: '""',
              top: 0,
              bottom: 0,
              left: 0,
              position: 'absolute',
              right: 0,
              opacity: 0,
              background: 'linear-gradient(0deg,rgba(179, 158, 220, 1) 0%, rgba(0, 0, 0, 0) 100%);',
            },
          }}
        >
          <img alt="ESMANA logo" src={thumbnailUrl ? serveStaticImage(thumbnailUrl) : EmptyImage} />
        </Box>
        <Box
          className="body"
          sx={{
            px: 2,
            display: 'grid',
            gridTemplateRows: 'auto 1fr auto',
            transition: 'height .3s',
            height: '50%',
          }}
        >
          <Typography fontWeight="bold">{title}</Typography>
          <Typography sx={{ overflow: 'hidden' }} color="stormWave.main">
            {description}
          </Typography>
          <Box
            className="details"
            sx={{
              boxShadow: '0px -20px 90px 20px #FFF',
              transition: 'transform .3s',
              pb: 2,
            }}
          >
            <Stack direction="row" justifyContent="space-between">
              <Typography>{lecturesCount} Lectures</Typography>
              <Typography>{hoursCount} Hours</Typography>
            </Stack>
            <Fragment>
              <Divider />
              <Typography fontSize={24} fontWeight="bold" textAlign="end">
                {price} UAH
              </Typography>
            </Fragment>
          </Box>
        </Box>
      </Paper>
    </Grid2>
  )
}

export default CourseCard
