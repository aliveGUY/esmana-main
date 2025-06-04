import React from 'react'

const ExampleCertificate = ({
  studentName = "Ім'я Студента",
  courseName = 'Міжнародна фахова школа "Медицина сну"',
  date = '10.07.2025',
  city = 'КИЇВ',
  certificateNumber = '2025-0000-0000000-000000',
  duration = '5 місяців',
  academicHours = '40',
  bprPoints = '20',
  instructorName = 'ДАРІЯ КОСТЮКОВА',
  instructorTitle = 'Президентка Європейської асоціації медицини сну та нейрофізіології (ESMANA)',
}) => {
  const styles = {
    container: {
      width: '842px',
      height: '595px',
      backgroundColor: '#ffffff',
      position: 'relative',
      fontFamily: 'Arial, sans-serif',
      overflow: 'hidden',
      margin: '0 auto',
      boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    },
    backgroundPattern: {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'linear-gradient(135deg, rgba(172, 206, 116, 0.1) 0%, rgba(0, 149, 223, 0.1) 100%)',
      zIndex: 1,
    },
    logo: {
      position: 'absolute',
      top: '20px',
      left: '30px',
      width: '200px',
      height: '80px',
      backgroundColor: '#f0f0f0',
      border: '2px solid #ddd',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      color: '#666',
      zIndex: 3,
    },
    certificateTitle: {
      position: 'absolute',
      top: '120px',
      left: '50%',
      transform: 'translateX(-50%)',
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '16px',
      fontWeight: '500',
      color: '#1ba0ee',
      letterSpacing: '2px',
      zIndex: 3,
    },
    participantTitle: {
      position: 'absolute',
      top: '180px',
      left: '50%',
      transform: 'translateX(-50%)',
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '32px',
      fontWeight: '500',
      color: '#1ba0ee',
      letterSpacing: '1px',
      zIndex: 3,
    },
    courseName: {
      position: 'absolute',
      top: '250px',
      left: '50%',
      transform: 'translateX(-50%)',
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '18px',
      fontWeight: '700',
      color: '#071f2e',
      textAlign: 'center',
      zIndex: 3,
      maxWidth: '600px',
    },
    description: {
      position: 'absolute',
      top: '290px',
      left: '50%',
      transform: 'translateX(-50%)',
      fontFamily: 'Open Sans, sans-serif',
      fontSize: '12px',
      fontWeight: '300',
      color: '#071f2e',
      textAlign: 'center',
      lineHeight: '16px',
      maxWidth: '500px',
      zIndex: 3,
    },
    specialties: {
      position: 'absolute',
      top: '340px',
      left: '50%',
      transform: 'translateX(-50%)',
      fontFamily: 'Open Sans, sans-serif',
      fontSize: '12px',
      fontWeight: '300',
      color: '#071f2e',
      textAlign: 'center',
      lineHeight: '16px',
      maxWidth: '600px',
      zIndex: 3,
    },
    certificateNumber: {
      position: 'absolute',
      top: '420px',
      left: '50%',
      transform: 'translateX(-50%)',
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '12px',
      fontWeight: '700',
      color: '#0095df',
      zIndex: 3,
    },
    leftInfo: {
      position: 'absolute',
      bottom: '80px',
      left: '80px',
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '12px',
      color: '#7f8d99',
      zIndex: 3,
    },
    rightInfo: {
      position: 'absolute',
      bottom: '80px',
      right: '80px',
      textAlign: 'right',
      zIndex: 3,
    },
    instructorName: {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '12px',
      fontWeight: '700',
      color: '#071f2e',
      marginBottom: '5px',
    },
    instructorTitle: {
      fontFamily: 'Montserrat, sans-serif',
      fontSize: '12px',
      fontWeight: '400',
      color: '#7f8d99',
      lineHeight: '16px',
      maxWidth: '200px',
    },
    signature: {
      position: 'absolute',
      bottom: '120px',
      right: '80px',
      width: '120px',
      height: '60px',
      backgroundColor: '#f9f9f9',
      border: '1px solid #ddd',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '10px',
      color: '#999',
      zIndex: 3,
    },
    decorativeLine: {
      position: 'absolute',
      bottom: '100px',
      left: '50%',
      transform: 'translateX(-50%)',
      width: '200px',
      height: '1px',
      backgroundColor: '#ddd',
      zIndex: 3,
    },
  }

  return (
    <div style={styles.container}>
      {/* Background Pattern */}
      <div style={styles.backgroundPattern}></div>

      {/* Logo Placeholder */}
      <div style={styles.logo}>LOGO</div>

      {/* Certificate Title */}
      <div style={styles.certificateTitle}>С Е Р Т И Ф І К А Т / C E R T I F I C A T E</div>

      {/* Participant Title */}
      <div style={styles.participantTitle}>У Ч А С Н И К А</div>

      {/* Course Name */}
      <div style={styles.courseName}>{courseName}</div>

      {/* Description */}
      <div style={styles.description}>
        Сертифікат підтверджує участь у заході, акредитованому
        <br />в системі безперервного професійного розвитку (БПР)
      </div>

      {/* Specialties */}
      <div style={styles.specialties}>
        <strong>Спеціальності:</strong>
        <br />
        лікарі всіх спеціальностей, включаючи середній медичний персонал;
        <br />
        професіонали у галузі охорони здоров'я у закладах охорони здоров'я;
        <br />
        професіонали з вищою немедичною освітою, які працюють в системі охорони здоров'я.
      </div>

      {/* Certificate Number */}
      <div style={styles.certificateNumber}>{certificateNumber}</div>

      {/* Left Info */}
      <div style={styles.leftInfo}>
        <div style={{ fontWeight: '700', color: '#071f2e', marginBottom: '5px' }}>
          {city}, {date}
        </div>
        <div>
          Тривалість навчання <strong>{duration}</strong>
        </div>
        <div>
          Академічних годин <strong>{academicHours}</strong>
        </div>
        <div>
          Балів БПР <strong>{bprPoints}</strong>
        </div>
      </div>

      {/* Right Info */}
      <div style={styles.rightInfo}>
        <div style={styles.instructorName}>{instructorName}</div>
        <div style={styles.instructorTitle}>{instructorTitle}</div>
      </div>

      {/* Signature Placeholder */}
      <div style={styles.signature}>Підпис</div>

      {/* Decorative Line */}
      <div style={styles.decorativeLine}></div>

      {/* Student Name (if provided) */}
      {studentName && studentName !== "Ім'я Студента" && (
        <div
          style={{
            position: 'absolute',
            top: '220px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'Montserrat, sans-serif',
            fontSize: '20px',
            fontWeight: '700',
            color: '#071f2e',
            textAlign: 'center',
            zIndex: 3,
            textDecoration: 'underline',
          }}
        >
          {studentName}
        </div>
      )}
    </div>
  )
}

// PropTypes for better development experience
ExampleCertificate.propTypes = {
  studentName: typeof window !== 'undefined' && window.PropTypes ? window.PropTypes.string : null,
  courseName: typeof window !== 'undefined' && window.PropTypes ? window.PropTypes.string : null,
  date: typeof window !== 'undefined' && window.PropTypes ? window.PropTypes.string : null,
  city: typeof window !== 'undefined' && window.PropTypes ? window.PropTypes.string : null,
  certificateNumber: typeof window !== 'undefined' && window.PropTypes ? window.PropTypes.string : null,
  duration: typeof window !== 'undefined' && window.PropTypes ? window.PropTypes.string : null,
  academicHours: typeof window !== 'undefined' && window.PropTypes ? window.PropTypes.string : null,
  bprPoints: typeof window !== 'undefined' && window.PropTypes ? window.PropTypes.string : null,
  instructorName: typeof window !== 'undefined' && window.PropTypes ? window.PropTypes.string : null,
  instructorTitle: typeof window !== 'undefined' && window.PropTypes ? window.PropTypes.string : null,
}

export default ExampleCertificate
