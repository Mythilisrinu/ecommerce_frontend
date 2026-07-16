import React from 'react'
import { Alert } from 'react-bootstrap'

function Message({ variant, children }) {
  return (
    <div>
      <Alert key={variant} variant={variant}>
        {children}
      </Alert>
    </div>
  )
}

export default Message
