import React, { Fragment } from 'react'
import { isEmpty, map } from 'lodash'

import { Box, Button, Checkbox, Divider, IconButton, Paper, Stack, Typography } from '@mui/material'
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

const PeopleSection = ({ title, actionText, data }) => {
  return (
    <Box px={2}>
      <SectionWrapper>
        <Paper>
          <Stack p={2} spacing={2}>
            <Stack direction="row" justifyContent="space-between">
              <Typography fontWeight="bold">{title}</Typography>
              <Button variant="primary">{actionText}</Button>
            </Stack>
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
              {isEmpty(data) ? (
                <Typography color="stormWave.main" textAlign="center" fontWeight="bold" py={2}>
                  *empty*
                </Typography>
              ) : (
                map(data, () => (
                  <Fragment>
                    <PeopleItem />
                    <Divider sx={{ borderColor: 'stormWave.main', mx: 1 }} />
                  </Fragment>
                ))
              )}
            </Stack>
          </Stack>
        </Paper>
      </SectionWrapper>
    </Box>
  )
}

export default PeopleSection
