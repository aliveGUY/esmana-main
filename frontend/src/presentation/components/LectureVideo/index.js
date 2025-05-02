import React from 'react'

import { Box, Stack, Typography } from '@mui/material'

import LockIcon from '@mui/icons-material/Lock'

const LectureVideo = ({ embeddedVideo, isPurchased }) => {
  if (!isPurchased) {
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          height: 240,
          borderRadius: '24px',
          backgroundColor: 'snowFog.main',
        }}
      >
        <Box
          sx={{
            svg: {
              fontSize: 56,
              color: 'stormWave.main',
            },
          }}
        >
          <LockIcon />
        </Box>
        <Typography color="stormWave.main" fontWeight="medium">
          Please purchase this lecture to see more content
        </Typography>
      </Stack>
    )
  }

  if (!embeddedVideo) {
    return (
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{
          height: 240,
          borderRadius: '24px',
          backgroundColor: 'snowFog.main',
        }}
      >
        <Typography color="stormWave.main" fontWeight="medium">
          No Video is Available
        </Typography>
      </Stack>
    )
  }
  return (
    <Box
      sx={{
        width: '100%',
        aspectRatio: '16 / 9',
      }}
    >
      <iframe
        width="100%"
        height="100%"
        src={embeddedVideo}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowfullscreen
      ></iframe>
    </Box>
  )
}

export default LectureVideo
