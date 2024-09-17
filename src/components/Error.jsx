import React from 'react'
import Button from './Button'

function Error({message}) {
  return (
    <div className='err'>
        <p className='output-field-err'><span>{message}</span></p>
        <Button className='btn-err'>Click to retry</Button>
    </div>
  )
} 

export default Error