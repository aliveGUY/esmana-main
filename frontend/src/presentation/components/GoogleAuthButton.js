import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { Box } from '@mui/material'

const GoogleAuthButton = ({ onClick, text }) => {
  const handleSuccess = async (credentialResponse) => {
    const credential = credentialResponse.credential
    onClick({ token: credential })
  }

  return (
    <Box width="100%" display="flex" justifyContent="center">
      <Box width="100%">
        <GoogleLogin
          shape="pill"
          size="large"
          theme="filled_black"
          text={text}
          onSuccess={handleSuccess}
          onError={() => console.error('Google login failed')}
          useOneTap
        />
      </Box>
    </Box>
  )
}

export default GoogleAuthButton
