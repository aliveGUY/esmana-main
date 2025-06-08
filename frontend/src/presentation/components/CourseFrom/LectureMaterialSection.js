import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { Box, Paper, Stack, Typography } from '@mui/material'
import { ENGLISH } from '../../../constants'
import SectionWrapper from '../../common/SectionWrapper'
import RichTextEditor from '../RichTextEditor'
import LanguageToggle from '../RichTextEditor/LanguageToggle'

const LectureMaterialSection = () => {
  const { setValue, watch } = useFormContext()
  const [selectedLang, setSelectedLang] = useState(ENGLISH)
  const richTextForm = watch('richText')
  const richText = richTextForm ? richTextForm[selectedLang] : ''

  const handleChange = (data) => {
    setValue(`richText.${selectedLang}`, data)
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
            <RichTextEditor key={selectedLang} onChange={handleChange} content={richText} />
          </Stack>
        </Paper>
      </SectionWrapper>
    </Box>
  )
}

export default LectureMaterialSection
