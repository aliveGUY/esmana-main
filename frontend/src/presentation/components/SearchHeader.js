import React from 'react'
import { isEmpty } from 'lodash'

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
import LargePopover from '../common/LargePopover'
import SectionWrapper from '../common/SectionWrapper'

import AddIcon from '@mui/icons-material/Add'
import FilterAltIcon from '@mui/icons-material/FilterAlt'
import SearchIcon from '@mui/icons-material/Search'
import SortIcon from '@mui/icons-material/Sort'

const FilterAction = () => {
  return (
    <LargePopover>
      <IconButton>
        <FilterAltIcon />
      </IconButton>
    </LargePopover>
  )
}

const SortAction = () => {
  return (
    <LargePopover>
      <IconButton>
        <SortIcon />
      </IconButton>
    </LargePopover>
  )
}

const SearchHeader = ({ title, buttonText, onPrimaryActionClick }) => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  if (isMobile) {
    return (
      <Stack px={2} pt={3} pb={2} spacing={2}>
        <Stack direction="row" alignItems="center">
          <FilterAction />
          <Typography flex={1} variant="title" fontWeight="bold" textAlign="center">
            {title}
          </Typography>
          {isEmpty(buttonText) ? (
            <SortAction />
          ) : (
            <IconButton variant="primary" onClick={onPrimaryActionClick}>
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
    <Box sx={{ backgroundColor: 'white', pt: 2, pb: 3, px: 2 }}>
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
              <Button variant="primary" endIcon={<AddIcon />} onClick={onPrimaryActionClick}>
                {buttonText}
              </Button>
            )}
          </Stack>
          <Stack direction="row" spacing={2}>
            <SortAction />
            <FilterAction />
          </Stack>
        </Stack>
      </SectionWrapper>
    </Box>
  )
}

export default SearchHeader
