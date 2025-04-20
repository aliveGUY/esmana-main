import {
  Checkbox,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material'
import React from 'react'
import SearchHeader from '../components/SearchHeader'
import MoreVertIcon from '@mui/icons-material/MoreVert'
import SectionWrapper from '../common/SectionWrapper'
const mockedUsers = [
  {
    name: 'Lucas Reed',
    phone: '+1 234 56789',
    email: 'noah.harper@example.com',
    status: 'Inactive',
    role: 'Admin',
  },
  {
    name: 'Lucas Reed',
    phone: '+1 234 56789',
    email: 'noah.harper@example.com',
    status: 'Inactive',
    role: 'Admin',
  },
  {
    name: 'Lucas Reed',
    phone: '+1 234 56789',
    email: 'noah.harper@example.com',
    status: 'Inactive',
    role: 'Admin',
  },
]

const Courses = () => {
  return (
    <Stack>
      <SearchHeader title="Courses" />
      <SectionWrapper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <Checkbox />
                </TableCell>
                <TableCell>Name</TableCell>
                <TableCell align="right">Phone</TableCell>
                <TableCell align="right">Email</TableCell>
                <TableCell align="right">Status</TableCell>
                <TableCell align="right">Role</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mockedUsers.map(({ name, phone, email, status, role }, index) => (
                <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                  <TableCell>
                    <Checkbox />
                  </TableCell>
                  <TableCell component="th" scope="row">
                    {name}
                  </TableCell>
                  <TableCell align="right">{phone}</TableCell>
                  <TableCell align="right">{email}</TableCell>
                  <TableCell align="right">{status}</TableCell>
                  <TableCell align="right">{role}</TableCell>
                  <TableCell align="right">
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </SectionWrapper>
    </Stack>
  )
}

export default Courses
