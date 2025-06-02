import React from 'react'

import { Box } from '@mui/material'

const EmbeddedVideo = ({ videoId }) => (
  <Box
    sx={{
      height: 300,
      aspectRatio: '16 / 9',
    }}
  >
    <Box
      sx={{
        position: 'relative',
        paddingBottom: '56.25%',
        width: '100%',
        height: 0,
      }}
    >
      <iframe
        src={`https://www.youtube.com/embed/${videoId}`}
        title="YouTube video"
        allowFullScreen
        frameBorder="0"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
        }}
      />
    </Box>
  </Box>
)

export default EmbeddedVideo
