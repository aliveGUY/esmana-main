import { useEffect, useState } from 'react'
import { toPng } from 'html-to-image'
import { useGetCertificateHtmlQuery } from '../state/asynchronous'

export function useGetAllCertificateTemplates() {
  const { data, isLoading } = useGetCertificateHtmlQuery()
  const [certificates, setCertificates] = useState([])

  const generateImage = (t) =>
    new Promise((resolve) => {
      const frame = document.createElement('iframe')
      frame.srcdoc = t.html

      Object.assign(frame.style, {
        position: 'absolute',
        top: '-9999px',
        left: '-9999px',
        width: '1000px',
        height: '1000px',
        visibility: 'hidden',
      })

      document.body.appendChild(frame)

      frame.onload = async () => {
        const el = frame.contentDocument?.querySelector('#certificate-container')
        await new Promise((r) => setTimeout(r, 100))
        const img = el ? await toPng(el) : null
        frame.remove()
        resolve({
          image: img,
          value: t.template,
        })
      }
    })

  useEffect(() => {
    if (!data || isLoading) return
    ;(async () => {
      const imgs = await Promise.all(data.map(generateImage))
      setCertificates(imgs.filter(Boolean))
    })()
  }, [data, isLoading])

  return { certificates, isLoading }
}
