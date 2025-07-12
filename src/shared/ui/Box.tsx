import React, { type ReactNode } from 'react'

const Box = ({children, className}:{children:ReactNode,className?:undefined | string}) => {
  return (
    <div className={`bg-white md:p-6 p-3 rounded shadow ${className}`}>{children}</div>
  )
}

export default React.memo(Box)