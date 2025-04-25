import React, { Fragment } from 'react'

import { Chip, IconButton, Stack, Typography, useTheme } from '@mui/material'
import Checkbox from '../../common/inputs/Checkbox'

import MoreVertIcon from '@mui/icons-material/MoreVert'

const TableRow = ({ user }) => {
  const theme = useTheme()

  const rowStyles = {
    borderTop: `1px solid ${theme.palette.stormWave.main}`,
    p: 2,
  }

  return (
    <Fragment>
      <Stack sx={{ ...rowStyles, justifyContent: 'center' }} alignItems="center" direction="row">
        <Checkbox />
      </Stack>
      <Stack sx={rowStyles} alignItems="center" direction="row">
        <Typography whiteSpace="nowrap">{user.name}</Typography>
      </Stack>
      <Stack sx={rowStyles} alignItems="center" direction="row">
        <Typography color="stormWave.main" whiteSpace="nowrap">
          {user.phone}
        </Typography>
      </Stack>
      <Stack sx={rowStyles} alignItems="center" direction="row">
        <Typography color="stormWave.main" whiteSpace="nowrap">
          {user.email}
        </Typography>
      </Stack>
      <Stack sx={rowStyles} alignItems="center" direction="row">
        <Chip label={user.membership} />
      </Stack>
      <Stack sx={rowStyles} alignItems="center" direction="row">
        <Chip label={user.role} />
      </Stack>
      <Stack sx={{ ...rowStyles, justifyContent: 'end' }} alignItems="center" direction="row">
        <IconButton>
          <MoreVertIcon />
        </IconButton>
      </Stack>
    </Fragment>
  )
}

export default TableRow
