import React from 'react'
import { Spinner } from 'react-bootstrap'

function Loader() {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Spinner animation="border" role="status" style={{ width: '4rem', height: '4rem' }}>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  )
}

export default Loader
