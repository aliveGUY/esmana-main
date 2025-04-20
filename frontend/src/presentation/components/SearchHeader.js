import React from 'react'
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material'
import SectionWrapper from '../common/SectionWrapper'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import SortIcon from '@mui/icons-material/Sort'
import AddIcon from '@mui/icons-material/Add'
import { isEmpty } from 'lodash'
import SearchIcon from '@mui/icons-material/Search'

const SearchHeader = ({ title, buttonText }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  if (isMobile) {
    return (
      <Stack px={2} pt={3} pb={2} spacing={2}>
        <Stack direction="row" alignItems="center">
          <IconButton>
            <FilterAltIcon />
          </IconButton>
          <Typography flex={1} variant="title" fontWeight="bold" textAlign="center">
            {title}
          </Typography>
          {isEmpty(buttonText) ? (
            <IconButton>
              <SortIcon />
            </IconButton>
          ) : (
            <IconButton variant="primary">
              <AddIcon sx={{ color: 'white' }} />
            </IconButton>
          )}
        </Stack>
        <TextField
          variant="filled"
          placeholder="Search"
          slotProps={{
            input: {
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            },
          }}
        />
      </Stack>
    )
  }

  return (
    <Box sx={{ backgroundColor: 'white', pt: 2, pb: 1, px: 2 }}>
      <SectionWrapper>
        <Stack spacing={3}>
          <Stack direction="row" alignItems="center" spacing={3}>
            <Typography variant="title" fontWeight="bold">
              {title}
            </Typography>
            <Box flex={1}>
              <TextField
                variant="filled"
                placeholder="Search"
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </Box>
            {buttonText && (
              <Button variant="primary" endIcon={<AddIcon />}>
                {buttonText}
              </Button>
            )}
          </Stack>
          <Stack direction="row" spacing={2}>
            <IconButton>
              <SortIcon />
            </IconButton>
            <IconButton>
              <FilterAltIcon />
            </IconButton>
          </Stack>
        </Stack>
      </SectionWrapper>
    </Box>
  )
}

export default SearchHeader
