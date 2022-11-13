import React, { ComponentPropsWithoutRef, ReactNode } from 'react'

type Props = {
  children: ReactNode
} & ComponentPropsWithoutRef<'div'>

export const Title: React.FC<Props> = ({ children, ...props }) => {
  return (
    <div {...props}>
      <p>{children}</p>
    </div>
  )
}
