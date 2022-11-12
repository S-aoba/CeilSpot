import React, { ComponentProps, ReactNode } from 'react'

type Props = {
  children: ReactNode
} & ComponentProps<'button'>

export const Button: React.FC<Props> = ({ children, ...props }) => {
  return <button {...props}>{children}</button>
}
