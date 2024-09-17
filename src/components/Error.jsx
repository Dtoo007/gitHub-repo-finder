import React from 'react'
import Button from './Button'

function Error({message}) {
  return (
    <div className='err'>
        <p className='output-field-err'><span>{message}</span></p>
    </div>
  )
} 

export default Error