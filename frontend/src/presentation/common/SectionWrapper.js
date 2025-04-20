import React from 'react'

import { Box } from '@mui/material'

const SectionWrapper = ({ children }) => {
  return (
    <Box mx="auto">
      <Box sx={{ maxWidth: 1400, mx: 'auto' }}>{children}</Box>
    </Box>
  )
}

export default SectionWrapper
