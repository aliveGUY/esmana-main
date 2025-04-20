import React from 'react'

import { Box } from '@mui/material'

const SectionWrapper = ({ children }) => {
  return <Box sx={{ maxWidth: 1400, mx: 'auto', px: 3 }}>{children}</Box>
}

export default SectionWrapper
