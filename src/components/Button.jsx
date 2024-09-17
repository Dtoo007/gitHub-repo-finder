import React from 'react'


function Button({children, onClick, disabled, className}) {

  return (
    <button className={className} onClick={onClick} disabled={disabled}>{children}</button>
  )
}

export default Button