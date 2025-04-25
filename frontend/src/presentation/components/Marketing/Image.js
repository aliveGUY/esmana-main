import React from 'react'

import GradientPng from '../../../static/images/marketing-background.png'
import FlagPng from '../../../static/images/marketing-flag.png'
import { Box } from '@mui/material'

const Image = () => {
  return (
    <Box
      sx={{
        marginTop: { xs: 5, md: 10 },
        height: { xs: 64, md: 144 },
        position: 'relative',

        '& .background': {
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          right: 0,
          height: '100%',
          width: '100%',
          objectFit: 'cover',
        },

        '& .flag': {
          height: { xs: 100, md: 200 },
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
        },
      }}
    >
      <img alt="GRadient" src={GradientPng} className="background" />
      <img alt="Flag" src={FlagPng} className="flag" />
    </Box>
  )
}

export default Image
