import React from 'react'

import { GoogleLogin } from '@react-oauth/google'

const GoogleAuthButton = ({ onClick, text }) => {
  const handleSuccess = async (credentialResponse) => {
    const credential = credentialResponse.credential
    onClick({ token: credential })
  }

  return (
    <GoogleLogin
      shape="pill"
      size="large"
      theme="filled_black"
      onSuccess={handleSuccess}
      text={text}
      onError={() => console.error('Google login failed')}
      useOneTap
    />
  )
}

export default GoogleAuthButton
