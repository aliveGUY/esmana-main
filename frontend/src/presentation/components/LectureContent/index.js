import React from 'react'
import { isNull } from 'lodash'

import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import RichTextViewer from '../RichTextViewer'

import '../RichTextEditor/editor-styles.css'

const LectureContent = ({ lecture }) => {
  const { description, title, materials } = lecture
  const isAvailable = !isNull(materials)

  return (
    <Stack sx={{ pr: 2, pb: 5 }}>
      <Paper
        elevation={2}
        sx={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 240,
          borderRadius: '8px',
          backgroundColor: '#f8f9fa',
          mb: 3,
        }}
      >
        <Typography color="#5f6368" fontWeight="medium">
          No Video is Available
        </Typography>
      </Paper>

      <Stack direction="row" sx={{ mb: 4 }}>
        <Box width="100%">
          <Typography fontWeight="bold" variant="h5" sx={{ color: '#202124' }}>
            {title}
          </Typography>
          <Typography sx={{ color: '#5f6368', mt: 1 }}>{description}</Typography>
        </Box>
        <Box>
          <Typography sx={{ color: '#5f6368', mb: 1 }}>Meeting will start at 12.04.2025 14:00</Typography>
          <Button
            variant="contained"
            sx={{
              backgroundColor: '#1a73e8',
              '&:hover': { backgroundColor: '#1765cc' },
            }}
          >
            Join Lecture
          </Button>
        </Box>
      </Stack>

      <Box height="100%">
        {isAvailable && (
          <Stack spacing={4}>
            <RichTextViewer content={materials.richText} />
          </Stack>
        )}
      </Box>

      <Stack direction="row" justifyContent="space-between" sx={{ mt: 4 }}>
        <Button
          variant="outlined"
          sx={{
            borderColor: '#dadce0',
            color: '#5f6368',
            '&:hover': { borderColor: '#1a73e8', color: '#1a73e8' },
          }}
        >
          Previous
        </Button>
        <Button
          variant="contained"
          sx={{
            backgroundColor: '#1a73e8',
            '&:hover': { backgroundColor: '#1765cc' },
            textTransform: 'none',
            fontWeight: 500,
          }}
        >
          Next
        </Button>
      </Stack>
    </Stack>
  )
}

export default LectureContent
