import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'

import { Button, Chip, Stack, Typography, useTheme } from '@mui/material'
import Checkbox from '../../common/inputs/Checkbox'

const TableRow = ({ user }) => {
  const { firstName, middleName, lastName, email, phone, roles, id } = user
  const name = [firstName, middleName, lastName].join(' ')
  const role = roles.join(', ')

  const theme = useTheme()

  const rowStyles = {
    borderTop: `1px solid ${theme.palette.stormWave.main}`,
    p: 2,
  }

  return (
    <Fragment>
      <Stack sx={{ ...rowStyles, justifyContent: 'center' }} alignItems="center" direction="row">
        <Checkbox size="small" />
      </Stack>
      <Stack sx={rowStyles} alignItems="center" direction="row">
        <Typography whiteSpace="nowrap">{name}</Typography>
      </Stack>
      <Stack sx={rowStyles} alignItems="center" direction="row">
        <Typography color="stormWave.main" whiteSpace="nowrap">
          {phone || 'N/A'}
        </Typography>
      </Stack>
      <Stack sx={rowStyles} alignItems="center" direction="row">
        <Typography color="stormWave.main" whiteSpace="nowrap">
          {email}
        </Typography>
      </Stack>
      <Stack sx={rowStyles} alignItems="center" direction="row">
        <Chip label="N/A" />
      </Stack>
      <Stack sx={rowStyles} alignItems="center" direction="row">
        <Chip label={role} />
      </Stack>
      <Stack sx={{ ...rowStyles, justifyContent: 'end' }} alignItems="center" direction="row">
        <Button variant="outlined" to={`/dashboard/users/${id}`} component={Link}>
          Edit
        </Button>
      </Stack>
    </Fragment>
  )
}

export default TableRow
