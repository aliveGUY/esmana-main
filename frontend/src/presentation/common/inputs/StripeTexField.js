import React from 'react'

import { Box, Typography } from '@mui/material'

const StripeTexField = ({ children, label }) => {
  return (
    <Box>
      <Typography variant="body2" component="label" sx={{ mb: 0.5 }}>
        {label}
      </Typography>
      <Box
        sx={{
          border: '1px solid #ced4da',
          borderRadius: 1,
          padding: 2,
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

export default StripeTexField
