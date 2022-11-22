import React, { ReactNode } from 'react'

type Props = {
  children: ReactNode
}
export const Title: React.FC<Props> = ({ children }) => {
  return (
    <div className=' w-11/12 py-3 text-4xl font-bold xl:w-full'>
      <p>{children}</p>
    </div>
  )
}
