import React, { Fragment } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, Grid2, Stack, TextField, Typography } from '@mui/material'
import TopBarUnauthorized from '../components/TopBarUnauthorized'

import LoginImage from '../../static/images/image1_0.jpg'

const Login = () => {
  const navigate = useNavigate()

  const onLogin = () => {
    navigate('dashboard/profile')
  }

  return (
    <Fragment>
      <TopBarUnauthorized />
      <Grid2 container minHeight="calc(100vh - 64px)">
        <Grid2
          size={{ xs: 8 }}
          sx={{
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
          }}
        >
          <img alt="ESMANA logo" src={LoginImage} />
        </Grid2>
        <Grid2 size={{ xs: 4 }}>
          <Stack p={4} spacing={2}>
            <Typography variant="h4">Login</Typography>
            <TextField />
            <TextField />
            <Button onClick={onLogin}>Login</Button>
          </Stack>
        </Grid2>
      </Grid2>
    </Fragment>
  )
}

export default Login
