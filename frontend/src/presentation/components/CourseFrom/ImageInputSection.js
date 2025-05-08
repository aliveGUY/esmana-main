import React from 'react'

import { Box, Stack, Typography } from '@mui/material'
import SectionWrapper from '../../common/SectionWrapper'

import ImageIcon from '@mui/icons-material/Image'
const ImageInputSection = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'snowFog.main',
        p: 2,
      }}
    >
      <SectionWrapper>
        <Stack
          justifyContent="center"
          alignItems="center"
          sx={{
            color: 'stormWave.main',
            p: 5,
            border: '2px dashed',
            borderColor: 'stormWave.main',
            borderRadius: '12px',
          }}
        >
          <ImageIcon sx={{ width: 40, height: 40 }} />
          <Typography fontWeight="bold">Select Image</Typography>
        </Stack>
      </SectionWrapper>
    </Box>
  )
}

export default ImageInputSection
