import React, { Fragment } from 'react'

import { Box, Checkbox, Divider, IconButton, Paper, Stack, Typography } from '@mui/material'
import SectionWrapper from '../../common/SectionWrapper'

import MoreVertIcon from '@mui/icons-material/MoreVert'

const PeopleItem = () => {
  return (
    <Stack direction="row" justifyContent="space-between" sx={{ p: 1 }}>
      <Stack direction="row" spacing={1} alignItems="center">
        <Checkbox />
        <Typography>John Doe</Typography>
      </Stack>
      <IconButton>
        <MoreVertIcon />
      </IconButton>
    </Stack>
  )
}

const PeopleSection = () => {
  return (
    <Box px={2}>
      <SectionWrapper>
        <Paper>
          <Box p={2}>
            <Typography>Students</Typography>
            <Stack
              sx={{
                border: '1px solid',
                borderColor: 'stormWave.main',
                borderRadius: '12px',
                p: 1,
                'hr:last-of-type': {
                  display: 'none',
                },
              }}
            >
              {new Array(5).fill(null).map(() => (
                <Fragment>
                  <PeopleItem />
                  <Divider sx={{ borderColor: 'stormWave.main', mx: 1 }} />
                </Fragment>
              ))}
            </Stack>
          </Box>
        </Paper>
      </SectionWrapper>
    </Box>
  )
}

export default PeopleSection
