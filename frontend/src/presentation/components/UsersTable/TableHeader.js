import React, { Fragment } from 'react'

import { Stack, Typography } from '@mui/material'
import Checkbox from '../../common/inputs/Checkbox'

const TableHeader = () => {
  const rowStyles = {
    px: 2,
    py: 1,
  }
  return (
    <Fragment>
      <Stack sx={rowStyles} alignItems="center" direction="row">
        <Checkbox />
      </Stack>
      <Stack sx={rowStyles} alignItems="center" direction="row">
        <Typography fontWeight={500}>Name</Typography>
      </Stack>
      <Stack sx={rowStyles} alignItems="center" direction="row">
        <Typography fontWeight={500}>Phone</Typography>
      </Stack>
      <Stack sx={rowStyles} alignItems="center" direction="row">
        <Typography fontWeight={500}>Email</Typography>
      </Stack>
      <Stack sx={rowStyles} alignItems="center" direction="row">
        <Typography fontWeight={500}>Status</Typography>
      </Stack>
      <Stack sx={rowStyles} alignItems="center" direction="row">
        <Typography fontWeight={500}>Role</Typography>
      </Stack>
      <Stack sx={rowStyles} alignItems="center" direction="row">
        <Typography fontWeight={500}>Action</Typography>
      </Stack>
    </Fragment>
  )
}

export default TableHeader
