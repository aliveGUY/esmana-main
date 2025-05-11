import React, { forwardRef, Fragment, useEffect, useImperativeHandle, useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

import { Box } from '@mui/material'
import { useCertificateFactory } from '../../hooks/useCertificateFactory'

const CertificateWrapper = forwardRef(({ certificateTemplate, studentName, date, courseName }, ref) => {
  const certificateRef = useRef(null)
  const [certificateImg, setCertificateImg] = useState(null)
  const TemplateComponent = useCertificateFactory(certificateTemplate)

  useEffect(() => {
    const generateCertificateImage = async () => {
      const canvas = await html2canvas(certificateRef.current, { scale: 3 })
      setCertificateImg(canvas.toDataURL('image/png'))
    }

    generateCertificateImage()
  }, [studentName, date, courseName])

  const downloadPdf = () => {
    const pdf = new jsPDF({
      orientation: 'landscape',
      unit: 'px',
      format: [1200, 800],
    })
    pdf.addImage(certificateImg, 'PNG', 0, 0, 1200, 800)
    pdf.save('certificate.pdf')
  }

  useImperativeHandle(ref, () => {
    downloadPdf
  })

  return (
    <Fragment>
      <div style={{ position: 'absolute', top: '-9999px', left: '-9999px' }}>
        <div ref={certificateRef}>
          <TemplateComponent studentName={studentName} date={date} courseName={courseName} />
        </div>
      </div>

      {certificateImg && (
        <Box
          component="img"
          src={certificateImg}
          alt="Certificate"
          sx={{
            width: '100%',
            maxWidth: '250px',
            boxShadow: '0px 5px 10px rgba(31, 35, 62, 0.15)',
            pointerEvents: 'none',
          }}
        />
      )}
    </Fragment>
  )
})

CertificateWrapper.displayName = 'CertificateWrapper'

export default CertificateWrapper
