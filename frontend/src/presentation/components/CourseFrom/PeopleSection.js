import React, { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'
import { includes, isEmpty } from 'lodash'
import debounce from 'lodash.debounce'
import { useFormContext } from 'react-hook-form'

import {
  Autocomplete,
  Box,
  Checkbox,
  FormControl,
  IconButton,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
} from '@mui/material'
import { useSearchUsersMutation } from '../../../state/asynchronous'
import generateRandomString from '../../../utils/generateRandomString'
import SectionWrapper from '../../common/SectionWrapper'

import DeleteIcon from '@mui/icons-material/Delete'

const UsersTableRow = ({ row }) => {
  const { setValue, getValues } = useFormContext()
  const { user, isCompleted, isGotAcademicHours, isLector } = row

  const name = [user.firstName, user.middleName, user.lastName].join(' ')

  const updateRow = (changes) => {
    const users = getValues('users')
    const updatedUsers = users.map((u) => (u.user.id === user.id ? { ...u, ...changes } : u))
    setValue('users', updatedUsers)
  }

  const handleLectorChange = (e) => {
    updateRow({ isLector: e.target.checked })
  }

  const handleAcademicHoursChange = (e) => {
    updateRow({ isGotAcademicHours: e.target.checked })
  }

  const handleCompletedChange = (e) => {
    updateRow({ isCompleted: e.target.checked })
  }

  const handleDelete = () => {
    const users = getValues('users')
    const filtered = users.filter((u) => u.user.id !== user.id)
    setValue('users', filtered)
  }

  return (
    <TableRow key={row.name} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component="th" scope="row">
        {name}
      </TableCell>
      <TableCell align="right">
        <Stack alignItems="end">
          <Checkbox checked={isLector} onChange={handleLectorChange} />
        </Stack>
      </TableCell>
      <TableCell align="right">
        <Stack alignItems="end">
          <Checkbox checked={isGotAcademicHours} onChange={handleAcademicHoursChange} />
        </Stack>
      </TableCell>
      <TableCell align="right">
        <Stack alignItems="end">
          <Checkbox checked={isCompleted} onChange={handleCompletedChange} />
        </Stack>
      </TableCell>
      <TableCell align="right">
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

const PeopleSection = () => {
  const { setValue, watch } = useFormContext()
  const { lectureId } = useParams()

  const [searchUsers] = useSearchUsersMutation()
  const [inputValue, setInputValue] = useState('')
  const [options, setOptions] = useState([])
  const [selectedValue, setSelectedValue] = useState(null)
  const users = watch('users')

  const debouncedSearch = useMemo(
    () =>
      debounce(async (value) => {
        try {
          const result = await searchUsers(value).unwrap()
          setOptions(result || [])
        } catch (err) {
          setOptions([])
        }
      }, 300),
    [searchUsers],
  )

  const addNewUser = (user) => {
    const userDto = {
      id: generateRandomString(10),
      userId: user.id,
      lectureId: Number(lectureId),
      isCompleted: false,
      isGotAcademicHours: false,
      isLector: false,
      user,
    }

    setValue('users', [...users, userDto])
  }

  const handleChange = (event, newValue) => {
    if (!newValue) return

    const currentUsers = users.map((obj) => obj?.user?.email)
    if (!includes(currentUsers, newValue.email)) {
      addNewUser(newValue)
    }

    setSelectedValue(null)
    setInputValue('')
    setOptions([])
  }

  useEffect(() => {
    if (inputValue) debouncedSearch(inputValue)
    else setOptions([])
  }, [inputValue, debouncedSearch])

  return (
    <Box px={2}>
      <SectionWrapper>
        <Paper>
          <Stack p={2} spacing={2} alignItems="center">
            <Autocomplete
              disablePortal
              options={options}
              value={selectedValue}
              inputValue={inputValue}
              onChange={handleChange}
              onInputChange={(e, value) => setInputValue(value)}
              getOptionLabel={(option) => option?.email || ''}
              renderOption={(props, option) => (
                <Box component="li" {...props}>
                  {option.email} - {[option.firstName, option.middleName, option.lastName].join(' ')}
                </Box>
              )}
              renderInput={(params) => (
                <FormControl fullWidth>
                  <TextField {...params} label="Users" />
                </FormControl>
              )}
            />

            {!isEmpty(users) && (
              <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell>Name</TableCell>
                      <TableCell align="right">Is Lector</TableCell>
                      <TableCell align="right">Academic hours</TableCell>
                      <TableCell align="right">Completed</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {users.map((row, index) => (
                      <UsersTableRow row={row} key={index} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </Stack>
        </Paper>
      </SectionWrapper>
    </Box>
  )
}

export default PeopleSection
