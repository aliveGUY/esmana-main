import React, { useState } from 'react'

import { Box, Paper, Stack, Typography } from '@mui/material'
import { ENGLISH, UKRAINIAN } from '../../../constants'
import SectionWrapper from '../../common/SectionWrapper'
import RichTextEditor from '../RichTextEditor'
import LanguageToggle from '../RichTextEditor/LanguageToggle'

const LectureMaterialSection = () => {
  const [richText, setRichText] = useState({ [UKRAINIAN]: '', [ENGLISH]: '' })
  const [selectedLang, setSelectedLang] = useState(ENGLISH)

  const handleChange = (data) => {
    setRichText((prev) => ({
      ...prev,
      [selectedLang]: data,
    }))
  }

  const setLanguage = (lang) => {
    setSelectedLang(lang)
  }

  return (
    <Box px={2}>
      <SectionWrapper>
        <Paper>
          <Stack p={2} spacing={2}>
            <Typography fontWeight="bold">Lecture Materials</Typography>
            <LanguageToggle currentLanguage={selectedLang} onClick={setLanguage} />
            <RichTextEditor key={selectedLang} onChange={handleChange} content={richText[selectedLang]} />
          </Stack>
        </Paper>
      </SectionWrapper>
    </Box>
  )
}

export default LectureMaterialSection
