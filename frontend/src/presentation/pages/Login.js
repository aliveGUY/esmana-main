import { Fragment, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { isArray, map } from 'lodash'
import { FormProvider, useForm } from 'react-hook-form'

import { Box, Button, Divider, FormHelperText, Grid2, Stack, Typography } from '@mui/material'
import { useGoogleLoginMutation, useLoginMutation } from '../../state/asynchronous'
import LoginImage from '../../static/images/image1_0.jpg'
import Password from '../common/inputs/Password'
import TextField from '../common/inputs/TextField'
import GoogleAuthButton from '../components/GoogleAuthButton'
import TopBarUnauthorized from '../components/TopBarUnauthorized'

const Login = () => {
  const navigate = useNavigate()
  const [login, { isLoading, isSuccess, error }] = useLoginMutation()
  const [googleLogin, { isLoading: isGoogleLoginLoading, isSuccess: isGoogleLoginSuccess, error: googleLoginError }] =
    useGoogleLoginMutation()

  const methods = useForm({ defaultValues: { email: '', password: '' } })

  const displayServerError = (error) => {
    if (!error?.data) return null

    if (isArray(error.data.message)) {
      return map(error.data.message, (message, index) => <FormHelperText key={index}>{message}</FormHelperText>)
    }

    return <FormHelperText>{error.data.message}</FormHelperText>
  }

  useEffect(() => {
    if (isSuccess || isGoogleLoginSuccess) {
      navigate('dashboard/profile')
    }
  }, [isSuccess, isGoogleLoginSuccess])

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
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(login)}>
              <Stack p={4} spacing={2}>
                <Typography variant="h4">Login</Typography>

                <TextField name="email" label="Email" required="Email is required" />

                <Password name="password" label="Password" required="Password is required" />

                {displayServerError(error)}
                {displayServerError(googleLoginError)}
                <Button type="submit" variant="primary" disabled={isLoading || isGoogleLoginLoading}>
                  {isLoading || isGoogleLoginLoading ? 'Loading...' : 'Login'}
                </Button>

                <Box sx={{ my: 2 }}>
                  <Divider>
                    <Typography variant="body2" color="text.secondary">
                      OR
                    </Typography>
                  </Divider>
                </Box>

                <GoogleAuthButton onClick={googleLogin} />
              </Stack>
            </form>
          </FormProvider>
        </Grid2>
      </Grid2>
    </Fragment>
  )
}

export default Login
