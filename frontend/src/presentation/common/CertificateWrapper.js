import React from 'react'

import { Box } from '@mui/material'

const CertificateWrapper = ({ image }) => {
  if (!image) return
  return (
    <Box
      component="img"
      src={image}
      alt="Certificate"
      sx={{
        width: '100%',
        maxWidth: '300px',
        boxShadow: '0px 5px 10px rgba(31, 35, 62, 0.15)',
        pointerEvents: 'none',
      }}
    />
  )
}

export default CertificateWrapper
