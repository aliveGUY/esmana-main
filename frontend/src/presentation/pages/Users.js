import React from 'react'

import { Box, Stack } from '@mui/material'
import { useGetAllUsersQuery } from '../../state/asynchronous'
import SectionWrapper from '../common/SectionWrapper'
import SearchHeader from '../components/SearchHeader'
import UsersTable from '../components/UsersTable'
import { useNavigate } from 'react-router-dom'

const Users = () => {
  const { data } = useGetAllUsersQuery()
  const navigate = useNavigate()

  const handleRedirect = () => {
    navigate('/dashboard/users/new')
  }

  return (
    <Stack height="100%">
      <SearchHeader title="Users" buttonText="Add User" onPrimaryActionClick={handleRedirect} />
      <SectionWrapper>
        <Box px={2} pb={10}>
          <UsersTable users={data} />
        </Box>
      </SectionWrapper>
    </Stack>
  )
}

export default Users
