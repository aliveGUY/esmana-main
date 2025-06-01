import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { map } from 'lodash'

import { Box, Button, Paper, Stack, Typography } from '@mui/material'
import { CERTIFICATE_TEMPLATE_ALL } from '../../../constants/certificates'
import { setBprCertificate, setParticipationCertificate } from '../../../state/reducers/courseForm'
import CertificateWrapper from '../../common/CertificateWrapper'
import RightHandFlyoutMenu from '../../common/RightHandFlyoutMenu'
import SectionWrapper from '../../common/SectionWrapper'

const TYPE_PARTICIPATION = 'TYPE_PARTICIPATION'
const TYPE_BPR = 'TYPE_BPR'

const CertificatesSection = () => {
  const courseForm = useSelector((state) => state.courseForm)
  const [menuState, setMenuState] = useState({ closed: true, purpose: null })
  const dispatch = useDispatch()

  const handleOpenParticipation = useCallback(() => {
    setMenuState({ closed: false, purpose: TYPE_PARTICIPATION })
  }, [])

  const handleOpenBpr = useCallback(() => {
    setMenuState({ closed: false, purpose: TYPE_BPR })
  }, [])

  const handleClose = useCallback(() => {
    setMenuState({ closed: true })
  }, [])

  const handleTemplateSelect = (e) => {
    if (menuState.purpose === TYPE_PARTICIPATION) {
      dispatch(setParticipationCertificate(e.target.id))
    }

    if (menuState.purpose === TYPE_BPR) {
      dispatch(setBprCertificate(e.target.id))
    }

    handleClose()
  }

  const isActive = (template) => {
    if (menuState.purpose === TYPE_PARTICIPATION) {
      return courseForm.participationCertificate === template
    }

    if (menuState.purpose === TYPE_BPR) {
      return courseForm.bprCertificate === template
    }

    return false
  }

  return (
    <Box px={2}>
      <SectionWrapper>
        <Paper>
          <Stack p={2} spacing={2}>
            <Stack direction="row" spacing={1}>
              <Button variant="primary" sx={{ mr: 1 }} onClick={handleOpenBpr}>
                Select BPR Certificate
              </Button>
              <Button variant="primary" onClick={handleOpenParticipation}>
                Select Participation Certificate
              </Button>
            </Stack>
            <Stack direction="row" justifyContent="center" spacing={2}>
              <CertificateWrapper
                key={courseForm.bprCertificate}
                certificateTemplate={courseForm.bprCertificate}
                studentName="[NAME]"
                date="[DATE]"
                courseName="[COURSE NAME]"
              />
              <CertificateWrapper
                key={courseForm.participationCertificate}
                certificateTemplate={courseForm.participationCertificate}
                studentName="[NAME]"
                date="[DATE]"
                courseName="[COURSE NAME]"
              />
            </Stack>
          </Stack>
          <RightHandFlyoutMenu isCollapsed={menuState.closed} onClose={handleClose}>
            <Stack px={2} spacing={2}>
              <Typography fontWeight="bold">Templates</Typography>
              <Stack alignItems="center" spacing={1}>
                {map(CERTIFICATE_TEMPLATE_ALL, (template) => (
                  <Box
                    onClick={handleTemplateSelect}
                    id={template}
                    sx={{
                      p: 1,
                      borderRadius: '12px',
                      cursor: 'pointer',
                      border: '2px dashed white',

                      '&:hover': {
                        borderColor: 'primary.main',
                      },

                      ...(isActive(template) && {
                        border: '2px solid',
                        borderColor: 'primary.main',
                      }),
                    }}
                  >
                    <CertificateWrapper
                      certificateTemplate={template}
                      studentName="[NAME]"
                      date="[DATE]"
                      courseName="[COURSE NAME]"
                    />
                  </Box>
                ))}
              </Stack>
            </Stack>
          </RightHandFlyoutMenu>
        </Paper>
      </SectionWrapper>
    </Box>
  )
}

export default CertificatesSection
