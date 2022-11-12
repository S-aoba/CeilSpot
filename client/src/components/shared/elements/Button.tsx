import React, { ComponentPropsWithoutRef, ReactNode } from 'react'

type Props = {
  children: ReactNode
} & ComponentPropsWithoutRef<'button'>

export const Button: React.FC<Props> = ({ children, ...props }) => {
  return <button {...props}>{children}</button>
}
