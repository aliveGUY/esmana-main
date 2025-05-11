import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'

import { Box, Paper, Stack, Typography } from '@mui/material'
import { ENGLISH } from '../../../constants'
import SectionWrapper from '../../common/SectionWrapper'
import RichTextEditor from '../RichTextEditor'
import LanguageToggle from '../RichTextEditor/LanguageToggle'

const LectureMaterialSection = () => {
  const { setValue, getValues } = useFormContext()
  const [richText, setRichText] = useState(getValues('richText'))
  const [selectedLang, setSelectedLang] = useState(ENGLISH)

  const handleChange = (data) => {
    setValue(`richText.${selectedLang}`, data)
    setRichText((prev) => ({
      ...prev,
      [selectedLang]: data,
    }))
  }

  const setLanguage = (lang) => {
    setSelectedLang(lang)
  }

  if (!richText) return

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
