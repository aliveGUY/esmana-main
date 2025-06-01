import React from 'react'
import { GoogleLogin } from '@react-oauth/google'

const GoogleAuthButton = ({ onClick }) => {
  const handleSuccess = async (credentialResponse) => {
    const credential = credentialResponse.credential
    onClick({ token: credential })
  }

  return <GoogleLogin onSuccess={handleSuccess} onError={() => console.error('Google login failed')} useOneTap />
}

export default GoogleAuthButton
