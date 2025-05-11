import React from 'react'

const ExampleCertificate = ({ studentName, courseName, date }) => (
  <div style={{ width: '1200px', height: '800px', padding: '20px', background: '#fff' }}>
    <h1 style={{ textAlign: 'center', fontSize: '48px' }}>Certificate of Completion</h1>
    <p style={{ textAlign: 'center', fontSize: '24px' }}>This certifies that</p>
    <h2 style={{ textAlign: 'center', fontSize: '36px' }}>{studentName}</h2>
    <p style={{ textAlign: 'center', fontSize: '24px' }}>successfully completed the course</p>
    <h3 style={{ textAlign: 'center', fontSize: '32px' }}>{courseName}</h3>
    <p style={{ textAlign: 'center', fontSize: '20px' }}>Date: {date}</p>
  </div>
)

export default ExampleCertificate
