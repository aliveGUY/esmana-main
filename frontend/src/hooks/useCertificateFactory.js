import { CERTIFICATE_TEMPLATE_ANOTHER_EXAMPLE, CERTIFICATE_TEMPLATE_EXAMPLE } from '../constants/certificates'
import AnotherExampleCertificate from '../presentation/certificates/AnotherExampleCertificate'
import ExampleCertificate from '../presentation/certificates/ExampleCertificate'

export function useCertificateFactory(type) {
  const certificates = {
    [CERTIFICATE_TEMPLATE_EXAMPLE]: ExampleCertificate,
    [CERTIFICATE_TEMPLATE_ANOTHER_EXAMPLE]: AnotherExampleCertificate,
  }

  return certificates[type] || certificates[CERTIFICATE_TEMPLATE_EXAMPLE]
}
