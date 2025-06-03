import React, { useState } from 'react'

import { Box, Button, Paper, Stack } from '@mui/material'
import SectionWrapper from '../../common/SectionWrapper'
import { useFormContext } from 'react-hook-form'
import { ENGLISH, UKRAINIAN } from '../../../constants'
import LanguageToggle from '../RichTextEditor/LanguageToggle'
import RichTextEditor from '../RichTextEditor'
import TextArea from '../../common/inputs/TextArea'

const LectorSection = () => {
  const { setValue, watch } = useFormContext()
  const lectorDetails = watch('lectorDetails')
  const [selectedLang, setSelectedLang] = useState(ENGLISH)

  const createEmptyLectorDetails = () => {
    setValue('lectorDetails', {
      credentials: '',
      biography: {
        [ENGLISH]: '',
        [UKRAINIAN]: '',
      },
    })
  }

  const handleChange = (data) => {
    setValue(`lectorDetails.biography.${selectedLang}`, data)
  }

  const setLanguage = (lang) => {
    setSelectedLang(lang)
  }

  if (!lectorDetails) {
    return (
      <Box px={2}>
        <SectionWrapper>
          <Paper>
            <Stack p={2} spacing={2} alignItems="end">
              <Button variant="outlined" onClick={createEmptyLectorDetails}>
                Create Lector Biography
              </Button>
            </Stack>
          </Paper>
        </SectionWrapper>
      </Box>
    )
  }

  return (
    <Box px={2}>
      <SectionWrapper>
        <Paper>
          <Stack p={2} spacing={2}>
            <TextArea name="lectorDetails.credentials" label="Credentials" />

            <LanguageToggle currentLanguage={selectedLang} onClick={setLanguage} />
            <RichTextEditor
              key={selectedLang}
              onChange={handleChange}
              content={lectorDetails?.biography[selectedLang]}
            />
          </Stack>
        </Paper>
      </SectionWrapper>
    </Box>
  )
}

export default LectorSection
