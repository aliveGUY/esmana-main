import React from 'react'

import { Box, Stack } from '@mui/material'
import SectionWrapper from '../common/SectionWrapper'
import SearchHeader from '../components/SearchHeader'
import UsersTable from '../components/UsersTable'

const Users = () => {
  const users = [
    {
      name: 'John Doe',
      phone: '+1 234 56789',
      email: 'john.doe@gmail.com',
      membership: 'inactive',
      role: 'Admin',
    },
    {
      name: 'Jane Smith',
      phone: '+1 987 65432',
      email: 'jane.smith@outlook.com',
      membership: 'inactive',
      role: 'Admin',
    },
    {
      name: 'Michael Johnson',
      phone: '+44 7700 900123',
      email: 'michael.j@company.co.uk',
      membership: 'inactive',
      role: 'Admin',
    },
    {
      name: 'Emily Davis',
      phone: '+1 555 123456',
      email: 'emily.davis@yahoo.com',
      membership: 'inactive',
      role: 'Admin',
    },
    {
      name: 'Robert Wilson',
      phone: '+61 4 1234 5678',
      email: 'rwilson@example.com.au',
      membership: 'inactive',
      role: 'Admin',
    },
    {
      name: 'Sarah Brown',
      phone: '+33 6 12 34 56 78',
      email: 'sarah.brown@gmail.com',
      membership: 'inactive',
      role: 'Admin',
    },
    {
      name: 'David Martinez',
      phone: '+34 612 345 678',
      email: 'david.m@corporation.es',
      membership: 'inactive',
      role: 'Admin',
    },
    {
      name: 'Lisa Anderson',
      phone: '+1 212 555 7890',
      email: 'lisa.anderson@hotmail.com',
      membership: 'inactive',
      role: 'Admin',
    },
    {
      name: 'James Taylor',
      phone: '+49 151 12345678',
      email: 'james.taylor@company.de',
      membership: 'inactive',
      role: 'Admin',
    },
    {
      name: 'Jennifer Garcia',
      phone: '+1 408 555 1234',
      email: 'j.garcia@tech-firm.com',
      membership: 'inactive',
      role: 'Admin',
    },
    {
      name: 'Thomas Rodriguez',
      phone: '+39 312 345 6789',
      email: 'thomas.r@example.it',
      membership: 'inactive',
      role: 'Admin',
    },
    {
      name: 'Maria Hernandez',
      phone: '+52 55 1234 5678',
      email: 'maria.h@universidad.mx',
      membership: 'inactive',
      role: 'Admin',
    },
    {
      name: 'Daniel Lee',
      phone: '+82 10 1234 5678',
      email: 'daniel.lee@corp.kr',
      membership: 'inactive',
      role: 'Admin',
    },
    {
      name: 'Sophia Kim',
      phone: '+1 650 123 4567',
      email: 'sophia.kim@startup.io',
      membership: 'inactive',
      role: 'Admin',
    },
    {
      name: 'William Chen',
      phone: '+86 138 1234 5678',
      email: 'william.chen@business.cn',
      membership: 'inactive',
      role: 'Admin',
    },
  ]
  return (
    <Stack height="100%">
      <SearchHeader title="Users" buttonText="Add User" />
      <SectionWrapper>
        <Box px={2} pb={10}>
          <UsersTable users={users} />
        </Box>
      </SectionWrapper>
    </Stack>
  )
}

export default Users
