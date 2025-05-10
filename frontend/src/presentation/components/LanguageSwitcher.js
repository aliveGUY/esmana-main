import React, { Fragment, useState } from 'react'
import { find, map } from 'lodash'

import { IconButton, MenuItem, Popover, Stack, Typography } from '@mui/material'
import { ENGLISH, UKRAINIAN } from '../../constants'
import { languageUtils } from '../../i18n'

function LanguageSwitcher() {
  const [anchorEl, setAnchorEl] = useState(null)

  const config = [
    {
      emoji: '🇺🇦',
      title: 'Українська',
      value: UKRAINIAN,
    },
    {
      emoji: '🇬🇧',
      title: 'English',
      value: ENGLISH,
    },
  ]

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleLanguageChange = (en) => {
    return () => {
      languageUtils.changeLanguage(en)
      handleClose()
    }
  }

  const getCurrentEmoji = () => {
    const currentLanguage = languageUtils.getCurrentLanguage()
    return find(config, (lang) => lang.value === currentLanguage).emoji
  }

  const open = Boolean(anchorEl)
  const id = open ? 'simple-popover' : undefined

  return (
    <Fragment>
      <IconButton onClick={handleClick} anchorEl={anchorEl}>
        <Stack width={24} height={24} alignItems="center" justifyContent="center">
          <Typography fontSize={22}>{getCurrentEmoji()}</Typography>
        </Stack>
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {map(config, (lang, index) => (
          <MenuItem key={index} onClick={handleLanguageChange(lang.value)}>
            {lang.title}
          </MenuItem>
        ))}
      </Popover>
    </Fragment>
  )
}

export default LanguageSwitcher
