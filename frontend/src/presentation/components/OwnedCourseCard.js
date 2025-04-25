import React, { useCallback } from 'react'
import { useNavigate } from 'react-router-dom'

import { Box, Grid2, Paper, Stack, Typography } from '@mui/material'
import LoginImage from '../../static/images/image1_0.jpg'

const OwnedCourseCard = ({ course }) => {
  const navigate = useNavigate()

  const { title, description } = course
  const lecturesCount = 20
  const hoursCount = 40

  const redirect = useCallback(() => {
    navigate('/dashboard/course/0')
  }, [navigate])

  return (
    <Grid2 size={{ xs: 12, md: 6, lg: 3 }}>
      <Paper
        onClick={redirect}
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
          <img alt="ESMANA logo" src={LoginImage} />
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
          </Box>
        </Box>
      </Paper>
    </Grid2>
  )
}

export default OwnedCourseCard
